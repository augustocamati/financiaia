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
import { InvestmentRecommendation } from "@/components/dashboard/InvestmentRecommendation";
import { FinancialCharts } from "@/components/dashboard/FinancialCharts";
import { useAuth } from "@/contexts/AuthContext";
import { useFinancialData } from "@/hooks/useFinancialData";
import { LogOut, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import logo from "@/assets/logo.png";
import userAvatar from "@/assets/user-avatar.png";

const Dashboard = () => {
  const { signOut, user } = useAuth();
  const {
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
  } = useFinancialData();

  // Cálculos
  const totalIncome = incomeData.mainIncome + 
    incomeData.additionalIncomes.reduce((sum, inc) => sum + inc.amount, 0);
  
  const totalFixedExpenses = fixedExpenses.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalVariableExpenses = variableExpenses.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const monthlyAvailable = totalIncome - totalFixedExpenses - totalVariableExpenses;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <Skeleton className="h-9 w-64 mb-2" />
              <Skeleton className="h-5 w-48" />
            </div>
            <Skeleton className="h-10 w-20" />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              Painel Financeiro 💰
              {saving && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
            </h1>
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="budget">Orçamento</TabsTrigger>
            <TabsTrigger value="goals">Metas</TabsTrigger>
            <TabsTrigger value="investments">Investimentos</TabsTrigger>
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
            <FinancialCharts
              totalIncome={totalIncome}
              fixedExpenses={totalFixedExpenses}
              variableExpenses={totalVariableExpenses}
              fixedExpensesList={fixedExpenses.expenses}
              variableExpensesList={variableExpenses.expenses}
            />
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <IncomeForm onSave={saveIncome} initialData={incomeData} />
              <FixedExpensesForm onSave={saveFixedExpenses} initialData={fixedExpenses} />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <VariableExpensesForm onSave={saveVariableExpenses} initialData={variableExpenses} />
              <DistributionPanel
                totalIncome={totalIncome}
                fixedExpenses={totalFixedExpenses}
                variableExpenses={totalVariableExpenses}
              />
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <GoalsForm onSave={saveGoals} initialData={goals} />
              <GoalsProjection goals={goals} monthlyAvailable={monthlyAvailable} />
            </div>
          </TabsContent>

          <TabsContent value="investments" className="space-y-6">
            <InvestmentRecommendation monthlyAvailable={monthlyAvailable} />
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
