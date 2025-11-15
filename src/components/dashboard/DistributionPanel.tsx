import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, TrendingUp, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DistributionPanelProps {
  totalIncome: number;
  fixedExpenses: number;
  variableExpenses: number;
}

export const DistributionPanel = ({
  totalIncome,
  fixedExpenses,
  variableExpenses,
}: DistributionPanelProps) => {
  const totalExpenses = fixedExpenses + variableExpenses;
  const available = totalIncome - totalExpenses;

  // Regra 50/30/20
  const idealNeeds = totalIncome * 0.5;
  const idealLifestyle = totalIncome * 0.3;
  const idealSavings = totalIncome * 0.2;

  // Percentuais reais
  const needsPercent = totalIncome > 0 ? (fixedExpenses / totalIncome) * 100 : 0;
  const lifestylePercent = totalIncome > 0 ? (variableExpenses / totalIncome) * 100 : 0;
  const savingsPercent = totalIncome > 0 ? (available / totalIncome) * 100 : 0;

  const getStatusColor = (actual: number, ideal: number) => {
    if (actual <= ideal) return "text-success";
    if (actual <= ideal * 1.1) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="w-5 h-5" />
          Distribuição de Renda
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resumo Financeiro */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Renda Total</p>
            <p className="text-2xl font-bold text-primary">R$ {totalIncome.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-destructive/10 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Total Gastos</p>
            <p className="text-2xl font-bold text-destructive">R$ {totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        {/* Distribuição */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Necessidades (Gastos Fixos)</span>
              <span className={`text-sm font-bold ${getStatusColor(needsPercent, 50)}`}>
                {needsPercent.toFixed(1)}%
              </span>
            </div>
            <Progress value={needsPercent} className="h-2" />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">
                R$ {fixedExpenses.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground">
                Ideal: 50% (R$ {idealNeeds.toFixed(2)})
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Qualidade de Vida (Variáveis)</span>
              <span className={`text-sm font-bold ${getStatusColor(lifestylePercent, 30)}`}>
                {lifestylePercent.toFixed(1)}%
              </span>
            </div>
            <Progress value={lifestylePercent} className="h-2" />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">
                R$ {variableExpenses.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground">
                Ideal: 30% (R$ {idealLifestyle.toFixed(2)})
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Poupança/Investimentos</span>
              <span className={`text-sm font-bold ${available >= idealSavings ? 'text-success' : 'text-warning'}`}>
                {savingsPercent.toFixed(1)}%
              </span>
            </div>
            <Progress value={savingsPercent} className="h-2" />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">
                R$ {available.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground">
                Ideal: 20% (R$ {idealSavings.toFixed(2)})
              </span>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="pt-4 border-t space-y-3">
          {needsPercent > 60 && (
            <div className="flex gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-warning">Gastos fixos elevados</p>
                <p className="text-muted-foreground">
                  Seus gastos fixos estão acima do ideal. Considere revisar contratos e buscar opções mais econômicas.
                </p>
              </div>
            </div>
          )}

          {available >= idealSavings && (
            <div className="flex gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-success">Parabéns!</p>
                <p className="text-muted-foreground">
                  Você está conseguindo poupar {savingsPercent.toFixed(0)}% da sua renda. Continue assim!
                </p>
              </div>
            </div>
          )}

          {available < 0 && (
            <div className="flex gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-destructive">Atenção!</p>
                <p className="text-muted-foreground">
                  Seus gastos estão maiores que sua renda. É urgente revisar seu orçamento.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
