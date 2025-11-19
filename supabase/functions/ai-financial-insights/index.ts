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

    const { financialData, type } = await req.json();

    const systemPrompt = `Você é um assistente financeiro inteligente especializado em análise de dados financeiros pessoais. 
    Forneça insights práticos, identificando padrões de gastos, oportunidades de economia e recomendações personalizadas.
    Seja direto, claro e objetivo nas suas análises.`;

    let userPrompt = '';
    
    if (type === 'insights') {
      userPrompt = `Analise os seguintes dados financeiros e forneça 3-5 insights importantes:
      
Renda Total: R$ ${financialData.totalIncome}
Gastos Fixos: R$ ${financialData.totalFixedExpenses}
Gastos Variáveis: R$ ${financialData.totalVariableExpenses}
Disponível: R$ ${financialData.monthlyAvailable}
Metas: ${JSON.stringify(financialData.goals)}

Forneça insights sobre:
1. Saúde financeira geral
2. Padrões de gastos preocupantes
3. Oportunidades de economia
4. Progresso em direção às metas
5. Recomendações de ação imediata`;
    } else if (type === 'investment') {
      userPrompt = `Com base nos dados financeiros abaixo, forneça recomendações de investimento personalizadas:
      
Valor Disponível Mensal: R$ ${financialData.monthlyAvailable}
Perfil de Risco: ${financialData.riskProfile || 'Moderado'}
Idade: ${financialData.age || 'não informada'}
Objetivos: ${JSON.stringify(financialData.goals)}

Forneça:
1. Alocação sugerida de portfólio (percentuais)
2. Tipos de investimento recomendados
3. Horizonte de tempo apropriado
4. Projeção de retorno estimada
5. Alertas e cuidados importantes`;
    } else if (type === 'projection') {
      userPrompt = `Faça projeções financeiras baseadas nos dados:
      
Renda: R$ ${financialData.totalIncome}
Gastos Totais: R$ ${financialData.totalFixedExpenses + financialData.totalVariableExpenses}
Disponível: R$ ${financialData.monthlyAvailable}
Metas: ${JSON.stringify(financialData.goals)}

Projete:
1. Evolução patrimonial nos próximos 12, 24 e 36 meses
2. Quando cada meta será atingida
3. Impacto de diferentes cenários (aumento/redução de renda ou gastos)
4. Sugestões para acelerar o atingimento de metas`;
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    // Salvar insights no banco
    if (type === 'insights') {
      const insightLines = analysis.split('\n').filter((line: string) => line.trim());
      
      for (const line of insightLines.slice(0, 5)) {
        if (line.length > 20) {
          await supabaseClient.from('ai_insights').insert({
            user_id: user.id,
            insight_type: 'financial_analysis',
            title: line.substring(0, 100),
            content: line,
            priority: 'medium'
          });
        }
      }
    }

    return new Response(JSON.stringify({ analysis }), {
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
