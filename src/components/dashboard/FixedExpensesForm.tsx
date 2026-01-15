import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Home, Plus, X } from "lucide-react";

interface FixedExpense {
  id: string;
  category: string;
  amount: number;
}

interface FixedExpensesData {
  expenses: FixedExpense[];
}

interface FixedExpensesFormProps {
  onSave: (data: FixedExpensesData) => void;
  initialData?: FixedExpensesData;
}

export const FixedExpensesForm = ({ onSave, initialData }: FixedExpensesFormProps) => {
  const [expenses, setExpenses] = useState<FixedExpense[]>(
    initialData?.expenses || [
      { id: "1", category: "Aluguel/Moradia", amount: 0 },
      { id: "2", category: "Água, Luz, Internet", amount: 0 },
      { id: "3", category: "Transporte", amount: 0 },
      { id: "4", category: "Alimentação Básica", amount: 0 },
      { id: "5", category: "Escola/Educação", amount: 0 },
    ]
  );
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState(0);

  const updateExpense = (id: string, amount: number) => {
    setExpenses(expenses.map((exp) => 
      exp.id === id ? { ...exp, amount } : exp
    ));
  };

  const addExpense = () => {
    if (newCategory && newAmount >= 0) {
      setExpenses([
        ...expenses,
        { id: Date.now().toString(), category: newCategory, amount: newAmount },
      ]);
      setNewCategory("");
      setNewAmount(0);
    }
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const handleSave = () => {
    onSave({ expenses });
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="w-5 h-5" />
          Gastos Fixos Mensais
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center gap-2">
            <div className="flex-1 space-y-1">
              <Label htmlFor={expense.id}>{expense.category} (Kz)</Label>
              <Input
                id={expense.id}
                type="number"
                value={expense.amount}
                onChange={(e) => updateExpense(expense.id, Number(e.target.value))}
                placeholder="0,00"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="mt-6"
              onClick={() => removeExpense(expense.id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <div className="space-y-2 pt-4 border-t">
          <h4 className="font-semibold text-sm">Adicionar Novo Gasto Fixo</h4>
          <div className="flex gap-2">
            <Input
              placeholder="Categoria"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Valor"
              value={newAmount || ""}
              onChange={(e) => setNewAmount(Number(e.target.value))}
              className="w-32"
            />
            <Button onClick={addExpense} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total Gastos Fixos:</span>
            <span className="text-2xl font-bold text-destructive">Kz {total.toFixed(2)}</span>
          </div>
          <Button onClick={handleSave} className="w-full">
            Salvar Gastos Fixos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
