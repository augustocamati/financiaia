import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const StepProfile = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="age">Idade</Label>
        <Input id="age" type="number" placeholder="Digite sua idade" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="occupation">Ocupação</Label>
        <Input id="occupation" placeholder="Ex: Desenvolvedor, Professor, etc." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="income">Renda Mensal (Kz)</Label>
        <Input id="income" type="number" placeholder="0,00" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="situation">Situação Financeira Atual</Label>
        <Select>
          <SelectTrigger id="situation">
            <SelectValue placeholder="Selecione sua situação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stable">Estável</SelectItem>
            <SelectItem value="tight">Apertado</SelectItem>
            <SelectItem value="debt">Com dívidas</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
