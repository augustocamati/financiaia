import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wallet, Plus, X } from "lucide-react";

interface AdditionalIncome {
  id: string;
  source: string;
  amount: number;
}

interface IncomeData {
  mainIncome: number;
  paymentDay: number;
  additionalIncomes: AdditionalIncome[];
}

interface IncomeFormProps {
  onSave: (data: IncomeData) => void;
  initialData?: IncomeData;
}

export const IncomeForm = ({ onSave, initialData }: IncomeFormProps) => {
  const [mainIncome, setMainIncome] = useState(initialData?.mainIncome || 0);
  const [paymentDay, setPaymentDay] = useState(initialData?.paymentDay || 1);
  const [additionalIncomes, setAdditionalIncomes] = useState<AdditionalIncome[]>(
    initialData?.additionalIncomes || []
  );
  const [newSource, setNewSource] = useState("");
  const [newAmount, setNewAmount] = useState(0);

  const addIncome = () => {
    if (newSource && newAmount > 0) {
      setAdditionalIncomes([
        ...additionalIncomes,
        { id: Date.now().toString(), source: newSource, amount: newAmount },
      ]);
      setNewSource("");
      setNewAmount(0);
    }
  };

  const removeIncome = (id: string) => {
    setAdditionalIncomes(additionalIncomes.filter((income) => income.id !== id));
  };

  const handleSave = () => {
    onSave({ mainIncome, paymentDay, additionalIncomes });
  };

  const totalIncome = mainIncome + additionalIncomes.reduce((sum, inc) => sum + inc.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Cadastro de Renda
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mainIncome">Renda Mensal Fixa (Kz)</Label>
            <Input
              id="mainIncome"
              type="number"
              value={mainIncome}
              onChange={(e) => setMainIncome(Number(e.target.value))}
              placeholder="0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentDay">Dia de Recebimento do Salário</Label>
            <Input
              id="paymentDay"
              type="number"
              min="1"
              max="31"
              value={paymentDay}
              onChange={(e) => setPaymentDay(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Fontes de Renda Adicionais</h4>
          
          {additionalIncomes.map((income) => (
            <div key={income.id} className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">{income.source}</p>
                <p className="text-sm text-muted-foreground">Kz {income.amount.toFixed(2)}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeIncome(income.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <div className="flex gap-2">
            <Input
              placeholder="Fonte de renda"
              value={newSource}
              onChange={(e) => setNewSource(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Valor"
              value={newAmount || ""}
              onChange={(e) => setNewAmount(Number(e.target.value))}
              className="w-32"
            />
            <Button onClick={addIncome} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Renda Total:</span>
            <span className="text-2xl font-bold text-primary">Kz {totalIncome.toFixed(2)}</span>
          </div>
          <Button onClick={handleSave} className="w-full">
            Salvar Renda
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
