import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const StepInvestor = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Tolerância a perdas</Label>
        <RadioGroup defaultValue="low">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="risk-none" />
            <Label htmlFor="risk-none" className="font-normal cursor-pointer">
              Nenhuma (0%) - Prefiro não arriscar
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="risk-low" />
            <Label htmlFor="risk-low" className="font-normal cursor-pointer">
              Baixa (até 5%) - Aceito pequenas oscilações
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="risk-medium" />
            <Label htmlFor="risk-medium" className="font-normal cursor-pointer">
              Média (até 10%) - Aceito oscilações moderadas
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="risk-high" />
            <Label htmlFor="risk-high" className="font-normal cursor-pointer">
              Alta (+10%) - Busco maiores retornos
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Experiência com Investimentos</Label>
        <Select>
          <SelectTrigger id="experience">
            <SelectValue placeholder="Selecione sua experiência" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Nenhuma</SelectItem>
            <SelectItem value="beginner">Iniciante</SelectItem>
            <SelectItem value="intermediate">Intermediário</SelectItem>
            <SelectItem value="advanced">Avançado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="invest-amount">Quanto deseja investir mensalmente? (Kz)</Label>
        <Input id="invest-amount" type="number" placeholder="0,00" />
      </div>

      <div className="space-y-2">
        <Label>Objetivo Principal do Investimento</Label>
        <RadioGroup defaultValue="stability">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="security" id="goal-security" />
            <Label htmlFor="goal-security" className="font-normal cursor-pointer">
              Segurança - Proteger meu capital
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="return" id="goal-return" />
            <Label htmlFor="goal-return" className="font-normal cursor-pointer">
              Retorno - Maximizar ganhos
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="stability" id="goal-stability" />
            <Label htmlFor="goal-stability" className="font-normal cursor-pointer">
              Estabilidade - Equilibrar risco e retorno
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
