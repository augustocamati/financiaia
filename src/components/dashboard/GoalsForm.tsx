import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, Plus, X } from "lucide-react";

interface Goal {
  id: string;
  name: string;
  type: string;
  targetAmount: number;
  deadline?: string;
}

interface GoalsFormProps {
  onSave: (goals: Goal[]) => void;
  initialData?: Goal[];
}

export const GoalsForm = ({ onSave, initialData }: GoalsFormProps) => {
  const [goals, setGoals] = useState<Goal[]>(initialData || []);
  const [newGoal, setNewGoal] = useState({
    name: "",
    type: "emergency",
    targetAmount: 0,
    deadline: "",
  });

  const addGoal = () => {
    if (newGoal.name && newGoal.targetAmount > 0) {
      setGoals([
        ...goals,
        {
          id: Date.now().toString(),
          ...newGoal,
          deadline: newGoal.deadline || undefined,
        },
      ]);
      setNewGoal({
        name: "",
        type: "emergency",
        targetAmount: 0,
        deadline: "",
      });
    }
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const handleSave = () => {
    onSave(goals);
  };

  const goalTypes = [
    { value: "emergency", label: "Reserva de Emergência" },
    { value: "purchase", label: "Compra Específica" },
    { value: "debt", label: "Quitar Dívidas" },
    { value: "other", label: "Outro" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Objetivos Financeiros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.length > 0 && (
          <div className="space-y-3">
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold">{goal.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {goalTypes.find((t) => t.value === goal.type)?.label}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeGoal(goal.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">
                    R$ {goal.targetAmount.toFixed(2)}
                  </span>
                  {goal.deadline && (
                    <span className="text-sm text-muted-foreground">
                      até {new Date(goal.deadline).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-semibold text-sm">Adicionar Nova Meta</h4>
          
          <div className="space-y-2">
            <Label htmlFor="goalName">Nome da Meta</Label>
            <Input
              id="goalName"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              placeholder="Ex: Viagem para o exterior"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goalType">Tipo de Meta</Label>
            <Select
              value={newGoal.type}
              onValueChange={(value) => setNewGoal({ ...newGoal, type: value })}
            >
              <SelectTrigger id="goalType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {goalTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goalAmount">Valor Total (R$)</Label>
            <Input
              id="goalAmount"
              type="number"
              value={newGoal.targetAmount || ""}
              onChange={(e) =>
                setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })
              }
              placeholder="0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goalDeadline">Prazo (opcional)</Label>
            <Input
              id="goalDeadline"
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            />
          </div>

          <Button onClick={addGoal} className="w-full" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Meta
          </Button>
        </div>

        {goals.length > 0 && (
          <Button onClick={handleSave} className="w-full">
            Salvar Objetivos
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
