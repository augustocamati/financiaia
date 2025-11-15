import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StepProfile } from "@/components/onboarding/StepProfile";
import { StepBudget } from "@/components/onboarding/StepBudget";
import { StepGoals } from "@/components/onboarding/StepGoals";
import { StepInvestor } from "@/components/onboarding/StepInvestor";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;

  const steps = [
    { title: "Perfil Geral", component: StepProfile },
    { title: "Orçamento", component: StepBudget },
    { title: "Objetivos", component: StepGoals },
    { title: "Perfil de Investidor", component: StepInvestor },
  ];

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {steps[currentStep].title}
            </h2>
            <span className="text-sm text-muted-foreground">
              Passo {currentStep + 1} de {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mb-8">
          <CurrentStepComponent />
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Voltar
          </Button>
          <Button onClick={handleNext} className="bg-gradient-primary">
            {currentStep < totalSteps - 1 ? (
              <>
                Próximo
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            ) : (
              "Finalizar"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;
