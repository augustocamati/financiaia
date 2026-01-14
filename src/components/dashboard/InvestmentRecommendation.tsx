import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Shield, Zap, BarChart3 } from "lucide-react";

interface InvestmentRecommendationProps {
  monthlyAvailable: number;
}

type RiskProfile = "conservative" | "moderate" | "aggressive";

interface PortfolioAllocation {
  fixedIncome: number;
  fundsETFs: number;
  stocks: number;
  crypto: number;
}

const PORTFOLIOS: Record<RiskProfile, PortfolioAllocation> = {
  conservative: { fixedIncome: 80, fundsETFs: 20, stocks: 0, crypto: 0 },
  moderate: { fixedIncome: 50, fundsETFs: 40, stocks: 10, crypto: 0 },
  aggressive: { fixedIncome: 20, fundsETFs: 40, stocks: 30, crypto: 10 },
};

const PROFILE_INFO: Record<RiskProfile, { label: string; description: string; icon: React.ReactNode; color: string }> = {
  conservative: {
    label: "Conservador",
    description: "Prioriza segurança e preservação do capital com baixa volatilidade.",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-blue-500",
  },
  moderate: {
    label: "Moderado",
    description: "Equilibra segurança e crescimento com volatilidade controlada.",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "bg-yellow-500",
  },
  aggressive: {
    label: "Agressivo",
    description: "Busca maiores retornos aceitando maior volatilidade.",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-red-500",
  },
};

export const InvestmentRecommendation = ({ monthlyAvailable }: InvestmentRecommendationProps) => {
  const [riskTolerance, setRiskTolerance] = useState<string>("low");
  const [experience, setExperience] = useState<string>("none");
  const [investmentGoal, setInvestmentGoal] = useState<string>("stability");

  const recommendedProfile = useMemo((): RiskProfile => {
    let score = 0;

    // Risk tolerance scoring
    if (riskTolerance === "none") score += 0;
    else if (riskTolerance === "low") score += 1;
    else if (riskTolerance === "medium") score += 2;
    else if (riskTolerance === "high") score += 3;

    // Experience scoring
    if (experience === "none") score += 0;
    else if (experience === "beginner") score += 1;
    else if (experience === "intermediate") score += 2;
    else if (experience === "advanced") score += 3;

    // Goal scoring
    if (investmentGoal === "security") score += 0;
    else if (investmentGoal === "stability") score += 1;
    else if (investmentGoal === "return") score += 2;

    // Determine profile based on score
    if (score <= 2) return "conservative";
    if (score <= 5) return "moderate";
    return "aggressive";
  }, [riskTolerance, experience, investmentGoal]);

  const portfolio = PORTFOLIOS[recommendedProfile];
  const profileInfo = PROFILE_INFO[recommendedProfile];

  const investmentAmount = Math.max(0, monthlyAvailable * 0.3); // Suggest 30% of available

  const projections = useMemo(() => {
    const monthlyInvestment = investmentAmount;
    const annualRates: Record<RiskProfile, number> = {
      conservative: 0.08,
      moderate: 0.12,
      aggressive: 0.18,
    };
    const rate = annualRates[recommendedProfile];
    const monthlyRate = rate / 12;

    const calculateFutureValue = (months: number) => {
      if (monthlyRate === 0) return monthlyInvestment * months;
      return monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    };

    return {
      oneYear: calculateFutureValue(12),
      threeYears: calculateFutureValue(36),
      fiveYears: calculateFutureValue(60),
    };
  }, [investmentAmount, recommendedProfile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Recomendação de Investimento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Questions */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Tolerância a perdas</Label>
            <RadioGroup value={riskTolerance} onValueChange={setRiskTolerance}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="inv-risk-none" />
                <Label htmlFor="inv-risk-none" className="font-normal cursor-pointer">
                  Nenhuma (0%)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="inv-risk-low" />
                <Label htmlFor="inv-risk-low" className="font-normal cursor-pointer">
                  Baixa (até 5%)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="inv-risk-medium" />
                <Label htmlFor="inv-risk-medium" className="font-normal cursor-pointer">
                  Média (até 10%)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="inv-risk-high" />
                <Label htmlFor="inv-risk-high" className="font-normal cursor-pointer">
                  Alta (+10%)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inv-experience">Experiência com Investimentos</Label>
            <Select value={experience} onValueChange={setExperience}>
              <SelectTrigger id="inv-experience">
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
            <Label>Objetivo do Investimento</Label>
            <RadioGroup value={investmentGoal} onValueChange={setInvestmentGoal}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="security" id="inv-goal-security" />
                <Label htmlFor="inv-goal-security" className="font-normal cursor-pointer">
                  Segurança
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stability" id="inv-goal-stability" />
                <Label htmlFor="inv-goal-stability" className="font-normal cursor-pointer">
                  Estabilidade
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="return" id="inv-goal-return" />
                <Label htmlFor="inv-goal-return" className="font-normal cursor-pointer">
                  Retorno
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Recommended Profile */}
        <div className={`p-4 rounded-lg border-2 ${recommendedProfile === 'conservative' ? 'border-blue-500 bg-blue-500/10' : recommendedProfile === 'moderate' ? 'border-yellow-500 bg-yellow-500/10' : 'border-red-500 bg-red-500/10'}`}>
          <div className="flex items-center gap-2 mb-2">
            {profileInfo.icon}
            <h3 className="font-bold text-lg">Perfil: {profileInfo.label}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{profileInfo.description}</p>
        </div>

        {/* Portfolio Distribution */}
        <div className="space-y-3">
          <h4 className="font-semibold">Distribuição Recomendada</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Renda Fixa (CDB, Tesouro)</span>
              <span className="font-medium">{portfolio.fixedIncome}%</span>
            </div>
            <Progress value={portfolio.fixedIncome} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Fundos/ETFs</span>
              <span className="font-medium">{portfolio.fundsETFs}%</span>
            </div>
            <Progress value={portfolio.fundsETFs} className="h-2" />
          </div>

          {portfolio.stocks > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ações</span>
                <span className="font-medium">{portfolio.stocks}%</span>
              </div>
              <Progress value={portfolio.stocks} className="h-2" />
            </div>
          )}

          {portfolio.crypto > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Criptomoedas</span>
                <span className="font-medium">{portfolio.crypto}%</span>
              </div>
              <Progress value={portfolio.crypto} className="h-2" />
            </div>
          )}
        </div>

        {/* Investment Suggestion */}
        <div className="p-4 bg-secondary/50 rounded-lg">
          <h4 className="font-semibold mb-2">Sugestão de Aporte Mensal</h4>
          <p className="text-2xl font-bold text-primary">
            R$ {investmentAmount.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            30% do seu valor disponível mensal de R$ {monthlyAvailable.toFixed(2)}
          </p>
        </div>

        {/* Projections */}
        {investmentAmount > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Projeção de Crescimento</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-secondary/30 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">1 Ano</p>
                <p className="font-bold text-sm">R$ {projections.oneYear.toFixed(0)}</p>
              </div>
              <div className="p-3 bg-secondary/30 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">3 Anos</p>
                <p className="font-bold text-sm">R$ {projections.threeYears.toFixed(0)}</p>
              </div>
              <div className="p-3 bg-secondary/30 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">5 Anos</p>
                <p className="font-bold text-sm">R$ {projections.fiveYears.toFixed(0)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              * Projeções baseadas em retornos históricos médios. Resultados passados não garantem retornos futuros.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
