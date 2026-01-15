import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Calendar, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Goal {
  id: string;
  name: string;
  type: string;
  targetAmount: number;
  deadline?: string;
}

interface GoalsProjectionProps {
  goals: Goal[];
  monthlyAvailable: number;
}

export const GoalsProjection = ({ goals, monthlyAvailable }: GoalsProjectionProps) => {
  const calculateMonthsToGoal = (targetAmount: number) => {
    if (monthlyAvailable <= 0) return Infinity;
    return Math.ceil(targetAmount / monthlyAvailable);
  };

  const calculateProjectedDate = (months: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  const priorityGoals = goals.slice(0, 3); // Mostrar até 3 metas principais

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Projeção de Metas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {monthlyAvailable > 0 ? (
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="font-semibold text-success">Disponível para Metas</span>
            </div>
            <p className="text-2xl font-bold text-success">
              {formatCurrency(monthlyAvailable)}/mês
            </p>
          </div>
        ) : (
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-sm text-warning">
              Você precisa ter saldo disponível para investir em suas metas.
            </p>
          </div>
        )}

        {priorityGoals.length > 0 ? (
          <div className="space-y-4">
            {priorityGoals.map((goal) => {
              const monthsNeeded = calculateMonthsToGoal(goal.targetAmount);
              const projectedDate = monthsNeeded !== Infinity ? calculateProjectedDate(monthsNeeded) : null;
              const hasDeadline = goal.deadline;
              const deadlineDate = hasDeadline ? new Date(goal.deadline!) : null;
              const isAchievable = deadlineDate && monthsNeeded !== Infinity
                ? new Date(projectedDate!) <= deadlineDate
                : true;

              return (
                <div key={goal.id} className="p-4 border rounded-lg space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">{goal.name}</h4>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(goal.targetAmount)}
                    </p>
                  </div>

                  {monthsNeeded !== Infinity ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Tempo estimado</span>
                          <span className="font-semibold">
                            {monthsNeeded} {monthsNeeded === 1 ? 'mês' : 'meses'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            Previsão: <span className="font-semibold">{projectedDate}</span>
                          </span>
                        </div>
                      </div>

                      {hasDeadline && (
                        <div className={`p-2 rounded ${isAchievable ? 'bg-success/10' : 'bg-warning/10'}`}>
                          <p className={`text-xs ${isAchievable ? 'text-success' : 'text-warning'}`}>
                            {isAchievable
                              ? `✓ Você conseguirá atingir esta meta antes do prazo!`
                              : `⚠ Aumente o valor mensal para atingir no prazo desejado`}
                          </p>
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Progresso simulado (1 mês)</span>
                          <span>{((monthlyAvailable / goal.targetAmount) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={(monthlyAvailable / goal.targetAmount) * 100} 
                          className="h-2"
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Não é possível calcular. Ajuste seu orçamento para ter saldo disponível.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Nenhuma meta cadastrada ainda.</p>
            <p className="text-sm">Cadastre suas metas financeiras para ver as projeções.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
