import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";

interface AdditionalIncome {
  id: string;
  source: string;
  amount: number;
}

interface IncomeData {
  mainIncome: number;
  paymentDay: number;
  additionalIncomes: AdditionalIncome[];
}

interface FixedExpense {
  id: string;
  category: string;
  amount: number;
}

interface FixedExpensesData {
  expenses: FixedExpense[];
}

interface VariableExpense {
  id: string;
  category: string;
  amount: number;
}

interface VariableExpensesData {
  expenses: VariableExpense[];
}

interface Goal {
  id: string;
  name: string;
  type: string;
  targetAmount: number;
  deadline?: string;
}

const defaultIncomeData: IncomeData = {
  mainIncome: 0,
  paymentDay: 1,
  additionalIncomes: [],
};

const defaultFixedExpenses: FixedExpensesData = {
  expenses: [
    { id: "1", category: "Aluguel/Moradia", amount: 0 },
    { id: "2", category: "Água, Luz, Internet", amount: 0 },
    { id: "3", category: "Transporte", amount: 0 },
    { id: "4", category: "Alimentação Básica", amount: 0 },
    { id: "5", category: "Escola/Educação", amount: 0 },
  ],
};

const defaultVariableExpenses: VariableExpensesData = {
  expenses: [],
};

export const useFinancialData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [incomeData, setIncomeData] = useState<IncomeData>(defaultIncomeData);
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpensesData>(defaultFixedExpenses);
  const [variableExpenses, setVariableExpenses] = useState<VariableExpensesData>(defaultVariableExpenses);
  const [goals, setGoals] = useState<Goal[]>([]);

  const getCurrentMonthYear = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  };

  const loadData = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const monthYear = getCurrentMonthYear();
      
      const { data, error } = await supabase
        .from("financial_data")
        .select("*")
        .eq("user_id", user.id)
        .eq("month_year", monthYear)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const additionalIncomes = Array.isArray(data.additional_incomes) 
          ? (data.additional_incomes as unknown as AdditionalIncome[]) 
          : [];
        const fixedExp = Array.isArray(data.fixed_expenses) 
          ? (data.fixed_expenses as unknown as FixedExpense[]) 
          : defaultFixedExpenses.expenses;
        const variableExp = Array.isArray(data.variable_expenses) 
          ? (data.variable_expenses as unknown as VariableExpense[]) 
          : [];
        const goalsData = Array.isArray(data.goals) 
          ? (data.goals as unknown as Goal[]) 
          : [];

        setIncomeData({
          mainIncome: data.main_income || 0,
          paymentDay: data.payment_day || 1,
          additionalIncomes,
        });
        setFixedExpenses({ expenses: fixedExp });
        setVariableExpenses({ expenses: variableExp });
        setGoals(goalsData);
      }
    } catch (error) {
      console.error("Error loading financial data:", error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar seus dados financeiros.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveData = async (
    newIncomeData?: IncomeData,
    newFixedExpenses?: FixedExpensesData,
    newVariableExpenses?: VariableExpensesData,
    newGoals?: Goal[]
  ) => {
    if (!user) return;

    const dataToSave = {
      incomeData: newIncomeData || incomeData,
      fixedExpenses: newFixedExpenses || fixedExpenses,
      variableExpenses: newVariableExpenses || variableExpenses,
      goals: newGoals || goals,
    };

    try {
      setSaving(true);
      const monthYear = getCurrentMonthYear();

      const { data: existing } = await supabase
        .from("financial_data")
        .select("id")
        .eq("user_id", user.id)
        .eq("month_year", monthYear)
        .maybeSingle();

      const payload = {
        user_id: user.id,
        month_year: monthYear,
        main_income: dataToSave.incomeData.mainIncome,
        payment_day: dataToSave.incomeData.paymentDay,
        additional_incomes: dataToSave.incomeData.additionalIncomes as unknown as Json,
        fixed_expenses: dataToSave.fixedExpenses.expenses as unknown as Json,
        variable_expenses: dataToSave.variableExpenses.expenses as unknown as Json,
        goals: dataToSave.goals as unknown as Json,
      };

      if (existing) {
        const { error } = await supabase
          .from("financial_data")
          .update(payload)
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("financial_data")
          .insert(payload);
        if (error) throw error;
      }

      toast({
        title: "Dados salvos!",
        description: "Seus dados financeiros foram salvos com sucesso.",
      });
    } catch (error) {
      console.error("Error saving financial data:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar seus dados financeiros.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const saveIncome = async (data: IncomeData) => {
    setIncomeData(data);
    await saveData(data, undefined, undefined, undefined);
  };

  const saveFixedExpenses = async (data: FixedExpensesData) => {
    setFixedExpenses(data);
    await saveData(undefined, data, undefined, undefined);
  };

  const saveVariableExpenses = async (data: VariableExpensesData) => {
    setVariableExpenses(data);
    await saveData(undefined, undefined, data, undefined);
  };

  const saveGoals = async (data: Goal[]) => {
    setGoals(data);
    await saveData(undefined, undefined, undefined, data);
  };

  return {
    loading,
    saving,
    incomeData,
    fixedExpenses,
    variableExpenses,
    goals,
    saveIncome,
    saveFixedExpenses,
    saveVariableExpenses,
    saveGoals,
    refetch: loadData,
  };
};
