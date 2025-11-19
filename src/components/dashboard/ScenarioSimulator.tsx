import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ScenarioSimulatorProps {
  currentIncome: number;
  currentExpenses: number;
  goals: any[];
}

export const ScenarioSimulator = ({ currentIncome, currentExpenses, goals }: ScenarioSimulatorProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [incomeChange, setIncomeChange] = useState(0);
  const [expenseChange, setExpenseChange] = useState(0);
  const [results, setResults] = useState<any>(null);

  const simulate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('scenario-simulation', {
        body: {
          scenario: {
            name: `Simulação ${new Date().toLocaleDateString()}`,
            description: `Variação renda: R$ ${incomeChange}, Variação gastos: R$ ${expenseChange}`,
            currentIncome,
            currentExpenses,
            incomeChange,
            expenseChange,
            goals
          }
        }
      });

      if (error) throw error;
      setResults(data.results);
      
      toast({
        title: "Simulação concluída!",
        description: "Confira os resultados abaixo",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Simulador de Cenários
        </CardTitle>
        <CardDescription>Veja o impacto de mudanças nas suas finanças</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Mudança na Renda (R$)</Label>
            <Input
              type="number"
              value={incomeChange}
              onChange={(e) => setIncomeChange(Number(e.target.value))}
              placeholder="Ex: 500"
            />
          </div>
          <div className="space-y-2">
            <Label>Mudança nos Gastos (R$)</Label>
            <Input
              type="number"
              value={expenseChange}
              onChange={(e) => setExpenseChange(Number(e.target.value))}
              placeholder="Ex: -200"
            />
          </div>
        </div>

        <Button onClick={simulate} disabled={loading} className="w-full">
          {loading ? 'Simulando...' : 'Simular Cenário'}
        </Button>

        {results && (
          <div className="mt-4 space-y-3">
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <h4 className="font-semibold mb-2">Resumo</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Nova Renda:</span>
                  <span className="font-semibold">R$ {results.summary.newIncome.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Novos Gastos:</span>
                  <span className="font-semibold">R$ {results.summary.newExpenses.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Disponível:</span>
                  <span className="font-semibold flex items-center gap-1">
                    R$ {results.summary.newAvailable.toFixed(2)}
                    {results.summary.changeFromCurrent > 0 ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span>Mudança:</span>
                  <span className={`font-bold ${results.summary.changeFromCurrent > 0 ? 'text-success' : 'text-destructive'}`}>
                    {results.summary.changeFromCurrent > 0 ? '+' : ''}
                    R$ {results.summary.changeFromCurrent.toFixed(2)} 
                    ({results.summary.changePercent}%)
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-secondary/30 rounded-lg">
              <h4 className="font-semibold mb-2">Projeções de Investimento</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>6 meses: <span className="font-semibold">R$ {results.investmentProjections.months_6}</span></div>
                <div>12 meses: <span className="font-semibold">R$ {results.investmentProjections.months_12}</span></div>
                <div>24 meses: <span className="font-semibold">R$ {results.investmentProjections.months_24}</span></div>
                <div>36 meses: <span className="font-semibold">R$ {results.investmentProjections.months_36}</span></div>
              </div>
            </div>

            {results.goalProjections?.length > 0 && (
              <div className="p-4 bg-secondary/30 rounded-lg">
                <h4 className="font-semibold mb-2">Impacto nas Metas</h4>
                <div className="space-y-2">
                  {results.goalProjections.map((goal: any, index: number) => (
                    <div key={index} className="text-sm">
                      <div className="flex justify-between">
                        <span>{goal.name}</span>
                        <span className={goal.achievable ? 'text-success' : 'text-warning'}>
                          {goal.monthsToComplete === Infinity ? '∞' : goal.monthsToComplete} meses
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
