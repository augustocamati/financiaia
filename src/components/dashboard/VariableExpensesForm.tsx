import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Plus, X } from "lucide-react";

interface VariableExpense {
  id: string;
  category: string;
  amount: number;
}

interface VariableExpensesData {
  expenses: VariableExpense[];
}

interface VariableExpensesFormProps {
  onSave: (data: VariableExpensesData) => void;
  initialData?: VariableExpensesData;
}

export const VariableExpensesForm = ({ onSave, initialData }: VariableExpensesFormProps) => {
  const [expenses, setExpenses] = useState<VariableExpense[]>(
    initialData?.expenses || []
  );
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState(0);

  const addExpense = () => {
    if (newCategory && newAmount > 0) {
      setExpenses([
        ...expenses,
        { id: Date.now().toString(), category: newCategory, amount: newAmount },
      ]);
      setNewCategory("");
      setNewAmount(0);
    }
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleSave = () => {
    onSave({ expenses });
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Gastos Variáveis Estimados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Categorias de Gastos</h4>
          
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">{expense.category}</p>
                <p className="text-sm text-muted-foreground">R$ {expense.amount.toFixed(2)}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeExpense(expense.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <div className="flex gap-2">
            <Input
              placeholder="Categoria (ex: Lazer, Saúde)"
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
            <Button onClick={addExpense} size="icon" variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
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
