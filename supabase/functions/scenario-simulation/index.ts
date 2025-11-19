import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { scenario } = await req.json();

    // Cálculos de projeção
    const currentIncome = scenario.currentIncome;
    const currentExpenses = scenario.currentExpenses;
    const incomeChange = scenario.incomeChange || 0;
    const expenseChange = scenario.expenseChange || 0;

    const newIncome = currentIncome + incomeChange;
    const newExpenses = currentExpenses + expenseChange;
    const newAvailable = newIncome - newExpenses;
    const currentAvailable = currentIncome - currentExpenses;
    
    const changePercent = currentAvailable > 0 
      ? ((newAvailable - currentAvailable) / currentAvailable * 100).toFixed(1)
      : 0;

    // Projeções de investimentos
    const monthlyInvestment = newAvailable * 0.2; // 20% para investimentos
    const annualReturn = 0.08; // 8% a.a.
    const monthlyReturn = Math.pow(1 + annualReturn, 1/12) - 1;

    const projections = {
      months_6: 0,
      months_12: 0,
      months_24: 0,
      months_36: 0,
    };

    // Cálculo de juros compostos
    for (let period of [6, 12, 24, 36]) {
      let total = 0;
      for (let month = 0; month < period; month++) {
        total = (total + monthlyInvestment) * (1 + monthlyReturn);
      }
      projections[`months_${period}` as keyof typeof projections] = Math.round(total);
    }

    // Projeção de metas
    const goalProjections = scenario.goals?.map((goal: any) => {
      if (monthlyInvestment <= 0) {
        return {
          ...goal,
          monthsToComplete: Infinity,
          projectedDate: null,
          achievable: false
        };
      }

      const monthsNeeded = Math.ceil(goal.targetAmount / monthlyInvestment);
      const projectedDate = new Date();
      projectedDate.setMonth(projectedDate.getMonth() + monthsNeeded);

      return {
        ...goal,
        monthsToComplete: monthsNeeded,
        projectedDate: projectedDate.toISOString(),
        achievable: goal.deadline ? new Date(projectedDate) <= new Date(goal.deadline) : true
      };
    }) || [];

    const results = {
      summary: {
        newIncome,
        newExpenses,
        newAvailable,
        changeFromCurrent: newAvailable - currentAvailable,
        changePercent,
        monthlyInvestment
      },
      investmentProjections: projections,
      goalProjections,
      recommendations: []
    };

    // Salvar cenário no banco
    await supabaseClient.from('scenarios').insert({
      user_id: user.id,
      name: scenario.name,
      description: scenario.description,
      income_change: incomeChange,
      expense_change: expenseChange,
      investment_allocation: scenario.investmentAllocation || {},
      projected_results: results
    });

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
