import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

interface FixedExpenses {
  rent: number;
  utilities: number;
  transport: number;
  food: number;
  education: number;
  other: number;
}

interface FixedExpensesFormProps {
  onSave: (data: FixedExpenses) => void;
  initialData?: FixedExpenses;
}

export const FixedExpensesForm = ({ onSave, initialData }: FixedExpensesFormProps) => {
  const [expenses, setExpenses] = useState<FixedExpenses>(
    initialData || {
      rent: 0,
      utilities: 0,
      transport: 0,
      food: 0,
      education: 0,
      other: 0,
    }
  );

  const updateExpense = (key: keyof FixedExpenses, value: number) => {
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
          <Home className="w-5 h-5" />
          Gastos Fixos Mensais
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="rent">Aluguel/Moradia (R$)</Label>
          <Input
            id="rent"
            type="number"
            value={expenses.rent}
            onChange={(e) => updateExpense("rent", Number(e.target.value))}
            placeholder="0,00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="utilities">Água, Luz, Internet (R$)</Label>
          <Input
            id="utilities"
            type="number"
            value={expenses.utilities}
            onChange={(e) => updateExpense("utilities", Number(e.target.value))}
            placeholder="0,00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transport">Transporte (R$)</Label>
          <Input
            id="transport"
            type="number"
            value={expenses.transport}
            onChange={(e) => updateExpense("transport", Number(e.target.value))}
            placeholder="0,00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="food">Alimentação Básica (R$)</Label>
          <Input
            id="food"
            type="number"
            value={expenses.food}
            onChange={(e) => updateExpense("food", Number(e.target.value))}
            placeholder="0,00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="education">Escola/Educação (R$)</Label>
          <Input
            id="education"
            type="number"
            value={expenses.education}
            onChange={(e) => updateExpense("education", Number(e.target.value))}
            placeholder="0,00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="other">Outros (R$)</Label>
          <Input
            id="other"
            type="number"
            value={expenses.other}
            onChange={(e) => updateExpense("other", Number(e.target.value))}
            placeholder="0,00"
          />
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total Gastos Fixos:</span>
            <span className="text-2xl font-bold text-destructive">R$ {total.toFixed(2)}</span>
          </div>
          <Button onClick={handleSave} className="w-full">
            Salvar Gastos Fixos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
