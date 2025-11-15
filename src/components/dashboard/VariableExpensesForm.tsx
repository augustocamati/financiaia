import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

interface VariableExpenses {
  leisure: number;
  shopping: number;
  health: number;
}

interface VariableExpensesFormProps {
  onSave: (data: VariableExpenses) => void;
  initialData?: VariableExpenses;
}

export const VariableExpensesForm = ({ onSave, initialData }: VariableExpensesFormProps) => {
  const [expenses, setExpenses] = useState<VariableExpenses>(
    initialData || {
      leisure: 0,
      shopping: 0,
      health: 0,
    }
  );

  const updateExpense = (key: keyof VariableExpenses, value: number) => {
    setExpenses({ ...expenses, [key]: value });
  };

  const handleSave = () => {
    onSave(expenses);
  };

  const total = Object.values(expenses).reduce((sum, val) => sum + val, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Gastos Variáveis Estimados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="leisure">Lazer (R$)</Label>
          <Input
            id="leisure"
            type="number"
            value={expenses.leisure}
            onChange={(e) => updateExpense("leisure", Number(e.target.value))}
            placeholder="0,00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shopping">Compras Gerais (R$)</Label>
          <Input
            id="shopping"
            type="number"
            value={expenses.shopping}
            onChange={(e) => updateExpense("shopping", Number(e.target.value))}
            placeholder="0,00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="health">Saúde (R$)</Label>
          <Input
            id="health"
            type="number"
            value={expenses.health}
            onChange={(e) => updateExpense("health", Number(e.target.value))}
            placeholder="0,00"
          />
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total Gastos Variáveis:</span>
            <span className="text-2xl font-bold text-warning">R$ {total.toFixed(2)}</span>
          </div>
          <Button onClick={handleSave} className="w-full">
            Salvar Gastos Variáveis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
