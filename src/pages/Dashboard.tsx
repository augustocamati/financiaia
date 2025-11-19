import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { IncomeForm } from "@/components/dashboard/IncomeForm";
import { FixedExpensesForm } from "@/components/dashboard/FixedExpensesForm";
import { VariableExpensesForm } from "@/components/dashboard/VariableExpensesForm";
import { GoalsForm } from "@/components/dashboard/GoalsForm";
import { DistributionPanel } from "@/components/dashboard/DistributionPanel";
import { GoalsProjection } from "@/components/dashboard/GoalsProjection";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";
import { ScenarioSimulator } from "@/components/dashboard/ScenarioSimulator";
import { AIChatAssistant } from "@/components/dashboard/AIChatAssistant";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

interface IncomeData {
  mainIncome: number;
  paymentDay: number;
  additionalIncomes: { id: string; source: string; amount: number }[];
}

interface FixedExpenses {
  rent: number;
  utilities: number;
  transport: number;
  food: number;
  education: number;
  other: number;
}

interface VariableExpensesData {
  expenses: { id: string; category: string; amount: number }[];
}

interface Goal {
  id: string;
  name: string;
  type: string;
  targetAmount: number;
  deadline?: string;
}

const Dashboard = () => {
  const { toast } = useToast();
  const { signOut, user } = useAuth();
  
  const [incomeData, setIncomeData] = useState<IncomeData>({
    mainIncome: 0,
    paymentDay: 1,
    additionalIncomes: [],
  });

  const [fixedExpenses, setFixedExpenses] = useState<FixedExpenses>({
    rent: 0,
    utilities: 0,
    transport: 0,
    food: 0,
    education: 0,
    other: 0,
  });

  const [variableExpenses, setVariableExpenses] = useState<VariableExpensesData>({
    expenses: [],
  });

  const [goals, setGoals] = useState<Goal[]>([]);

  const handleSaveIncome = (data: IncomeData) => {
    setIncomeData(data);
    toast({
      title: "Renda salva!",
      description: "Seus dados de renda foram atualizados com sucesso.",
    });
  };

  const handleSaveFixedExpenses = (data: FixedExpenses) => {
    setFixedExpenses(data);
    toast({
      title: "Gastos fixos salvos!",
      description: "Seus gastos fixos foram atualizados com sucesso.",
    });
  };

  const handleSaveVariableExpenses = (data: VariableExpensesData) => {
    setVariableExpenses(data);
    toast({
      title: "Gastos variáveis salvos!",
      description: "Seus gastos variáveis foram atualizados com sucesso.",
    });
  };

  const handleSaveGoals = (data: Goal[]) => {
    setGoals(data);
    toast({
      title: "Objetivos salvos!",
      description: "Suas metas financeiras foram atualizadas com sucesso.",
    });
  };

  // Cálculos
  const totalIncome = incomeData.mainIncome + 
    incomeData.additionalIncomes.reduce((sum, inc) => sum + inc.amount, 0);
  
  const totalFixedExpenses = Object.values(fixedExpenses).reduce((sum, val) => sum + val, 0);
  const totalVariableExpenses = variableExpenses.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const monthlyAvailable = totalIncome - totalFixedExpenses - totalVariableExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel Financeiro 💰</h1>
            <p className="text-muted-foreground">
              Bem-vindo, {user?.email}
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="budget">Orçamento</TabsTrigger>
            <TabsTrigger value="goals">Metas</TabsTrigger>
            <TabsTrigger value="ai">IA & Projeções</TabsTrigger>
            <TabsTrigger value="chat">Assistente</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <DistributionPanel
                totalIncome={totalIncome}
                fixedExpenses={totalFixedExpenses}
                variableExpenses={totalVariableExpenses}
              />
              <GoalsProjection goals={goals} monthlyAvailable={monthlyAvailable} />
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <IncomeForm onSave={handleSaveIncome} initialData={incomeData} />
              <FixedExpensesForm onSave={handleSaveFixedExpenses} initialData={fixedExpenses} />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <VariableExpensesForm onSave={handleSaveVariableExpenses} initialData={variableExpenses} />
              <DistributionPanel
                totalIncome={totalIncome}
                fixedExpenses={totalFixedExpenses}
                variableExpenses={totalVariableExpenses}
              />
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <GoalsForm onSave={handleSaveGoals} initialData={goals} />
              <GoalsProjection goals={goals} monthlyAvailable={monthlyAvailable} />
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <AIInsightsPanel 
                financialData={{
                  totalIncome,
                  totalFixedExpenses,
                  totalVariableExpenses,
                  monthlyAvailable,
                  goals
                }}
              />
              <ScenarioSimulator 
                currentIncome={totalIncome}
                currentExpenses={totalFixedExpenses + totalVariableExpenses}
                goals={goals}
              />
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <AIChatAssistant />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
