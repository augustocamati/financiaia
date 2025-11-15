import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Wallet, Target, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Olá, João! 👋</h1>
          <p className="text-muted-foreground">Aqui está um resumo da sua situação financeira</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Renda Mensal
              </CardTitle>
              <Wallet className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 5.000,00</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-success flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  +12% vs mês anterior
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Gastos Fixos
              </CardTitle>
              <ArrowDownRight className="w-4 h-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 2.800,00</div>
              <p className="text-xs text-muted-foreground mt-1">
                56% da renda
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Disponível
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 2.200,00</div>
              <p className="text-xs text-muted-foreground mt-1">
                44% da renda
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Meta do Mês
              </CardTitle>
              <Target className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 1.000,00</div>
              <p className="text-xs text-muted-foreground mt-1">
                Reserva de emergência
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Budget Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Distribuição de Renda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Necessidades</span>
                    <span className="text-sm text-muted-foreground">56%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[56%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Qualidade de Vida</span>
                    <span className="text-sm text-muted-foreground">24%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[24%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Poupança/Investimentos</span>
                    <span className="text-sm text-muted-foreground">20%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[20%]"></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm">
                  ✨ <strong>Parabéns!</strong> Sua distribuição está dentro do recomendado pela regra 50/30/20.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Investment Recommendation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Perfil de Investidor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success mb-4">
                  <span className="font-semibold">Moderado</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Baseado no seu perfil e objetivos
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="text-sm">Renda Fixa</span>
                  <span className="text-sm font-semibold">40%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="text-sm">Fundos/ETFs</span>
                  <span className="text-sm font-semibold">40%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="text-sm">Ações</span>
                  <span className="text-sm font-semibold">20%</span>
                </div>
              </div>

              <div className="p-4 bg-success/10 border border-success/20 rounded-lg mb-4">
                <p className="text-sm text-success-foreground">
                  📈 Retorno estimado anual: <strong>8-12%</strong>
                </p>
              </div>

              <Button className="w-full bg-gradient-primary">
                Ver Recomendações Detalhadas
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Goals Progress */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Progresso das Metas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">Reserva de Emergência</p>
                    <p className="text-sm text-muted-foreground">Meta: R$ 15.000,00</p>
                  </div>
                  <span className="text-sm font-semibold">R$ 6.000,00</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-success w-[40%]"></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  40% concluído • Faltam aproximadamente 9 meses
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
