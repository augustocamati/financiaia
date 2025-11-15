import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const StepBudget = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Gastos Fixos Mensais (R$)</h3>
        
        <div className="space-y-2">
          <Label htmlFor="rent">Aluguel/Moradia</Label>
          <Input id="rent" type="number" placeholder="0,00" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="utilities">Água, Luz, Internet</Label>
          <Input id="utilities" type="number" placeholder="0,00" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transport">Transporte</Label>
          <Input id="transport" type="number" placeholder="0,00" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="food">Alimentação Básica</Label>
          <Input id="food" type="number" placeholder="0,00" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Situação Financeira</h3>
        
        <div className="space-y-2">
          <Label>Possui dívidas?</Label>
          <RadioGroup defaultValue="no">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="debt-yes" />
              <Label htmlFor="debt-yes" className="font-normal cursor-pointer">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="debt-no" />
              <Label htmlFor="debt-no" className="font-normal cursor-pointer">Não</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Possui reserva de emergência?</Label>
          <RadioGroup defaultValue="no">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="emergency-yes" />
              <Label htmlFor="emergency-yes" className="font-normal cursor-pointer">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="emergency-no" />
              <Label htmlFor="emergency-no" className="font-normal cursor-pointer">Não</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
