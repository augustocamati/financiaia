import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoAsset from "@/assets/logo.png.asset.json";
import userAvatar from "@/assets/user-avatar.png";

const demoUser = {
  name: "Ana Silva",
  email: "ana.demo@financeia.app",
};

const initialIncome = {
  mainIncome: 150000,
  paymentDay: 5,
  additionalIncomes: [
    { id: "a1", source: "Freelance Design", amount: 15000 },
  ],
};

const initialFixedExpenses = {
  expenses: [
    { id: "1", category: "Aluguel/Moradia", amount: 70000 },
    { id: "2", category: "Água, Luz, Internet", amount: 10000 },
    { id: "3", category: "Transporte", amount: 10000 },
    { id: "4", category: "Alimentação Básica", amount: 25000 },
    { id: "5", category: "Escola/Educação", amount: 12000 },
  ],
};

const initialVariableExpenses = {
  expenses: [
    { id: "v1", category: "Lazer", amount: 8000 },
    { id: "v2", category: "Restaurantes", amount: 5000 },
    { id: "v3", category: "Compras", amount: 4000 },
    { id: "v4", category: "Saúde", amount: 3000 },
  ],
};

type DemoGoal = { id: string; name: string; type: string; targetAmount: number; deadline?: string };

const initialGoals: DemoGoal[] = [
  { id: "g1", name: "Reserva de Emergência", type: "emergency", targetAmount: 500000, deadline: "2026-12-31" },
  { id: "g2", name: "Viagem Europa", type: "travel", targetAmount: 300000, deadline: "2027-07-01" },
  { id: "g3", name: "Entrada Apartamento", type: "property", targetAmount: 1500000, deadline: "2028-06-01" },
];

const Demo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Estado apenas em memória — nada é persistido no banco
  const [incomeData, setIncomeData] = useState(initialIncome);
  const [fixedExpenses, setFixedExpenses] = useState(initialFixedExpenses);
  const [variableExpenses, setVariableExpenses] = useState(initialVariableExpenses);
  const [goals, setGoals] = useState(initialGoals);

  const notifyMemoryOnly = () =>
    toast({
      title: "Alterações salvas em memória",
      description: "No modo demo, os dados não são gravados no banco.",
    });

  const totalIncome =
    incomeData.mainIncome + incomeData.additionalIncomes.reduce((s, i) => s + i.amount, 0);
  const totalFixedExpenses = fixedExpenses.expenses.reduce((s, e) => s + e.amount, 0);
  const totalVariableExpenses = variableExpenses.expenses.reduce((s, e) => s + e.amount, 0);
  const monthlyAvailable = totalIncome - totalFixedExpenses - totalVariableExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-medium">Modo Demonstração</span>
            <span className="text-muted-foreground hidden sm:inline">
              — edite à vontade; nada é gravado no banco
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Button size="sm" onClick={() => navigate("/auth")}>
              Criar minha conta
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <img
              src={userAvatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
            />
            <div>
              <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
                Olá, {demoUser.name} <Badge variant="secondary">Demo</Badge>
              </h1>
              <p className="text-muted-foreground">{demoUser.email}</p>
            </div>
          </div>
          <button onClick={() => navigate("/")} aria-label="Voltar ao início">
            <img
              src={logoAsset.url}
              alt="Logo FinanceIA"
              className="w-20 h-20 object-contain rounded-full bg-white shadow-glow ring-2 ring-primary/20"
            />
          </button>
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
              <IncomeForm
                initialData={incomeData}
                onSave={(data) => {
                  setIncomeData(data);
                  notifyMemoryOnly();
                }}
              />
              <FixedExpensesForm
                initialData={fixedExpenses}
                onSave={(data) => {
                  setFixedExpenses(data);
                  notifyMemoryOnly();
                }}
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <VariableExpensesForm
                initialData={variableExpenses}
                onSave={(data) => {
                  setVariableExpenses(data);
                  notifyMemoryOnly();
                }}
              />
              <DistributionPanel
                totalIncome={totalIncome}
                fixedExpenses={totalFixedExpenses}
                variableExpenses={totalVariableExpenses}
              />
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <GoalsForm
                initialData={goals}
                onSave={(data) => {
                  setGoals(data);
                  notifyMemoryOnly();
                }}
              />
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
                  goals,
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

export default Demo;
