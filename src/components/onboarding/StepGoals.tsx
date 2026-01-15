import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const StepGoals = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="goals">Quais são seus principais objetivos financeiros?</Label>
        <Textarea 
          id="goals" 
          placeholder="Ex: Reserva de emergência, comprar um carro, viagem, aposentadoria..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeline">Prazo Estimado</Label>
        <Select>
          <SelectTrigger id="timeline">
            <SelectValue placeholder="Selecione o prazo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Curto prazo (até 1 ano)</SelectItem>
            <SelectItem value="medium">Médio prazo (1-3 anos)</SelectItem>
            <SelectItem value="long">Longo prazo (3-5 anos)</SelectItem>
            <SelectItem value="verylong">Muito longo prazo (5+ anos)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="monthly-save">Quanto deseja poupar mensalmente? (Kz)</Label>
        <Input id="monthly-save" type="number" placeholder="0,00" />
      </div>

      <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
        <p className="text-sm text-success-foreground">
          💡 <strong>Dica:</strong> Recomendamos poupar pelo menos 20% da sua renda mensal para atingir seus objetivos mais rapidamente.
        </p>
      </div>
    </div>
  );
};
