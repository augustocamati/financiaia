import { Button } from "@/components/ui/button";
import { ArrowRight, PiggyBank, Target, Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import logoAsset from "@/assets/logo.png.asset.json";

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FinanceIA
            </span>
          </div>
          {user ? (
            <div className="flex gap-2">
              <Button onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="outline" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Entrar
            </Button>
          )}
        </nav>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Gestão inteligente de finanças</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Controle seu dinheiro,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              construa seu futuro
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gerencie sua renda, organize gastos e receba recomendações personalizadas de investimentos.
            Tudo em um só lugar, de forma simples e inteligente.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow group"
              onClick={() => navigate("/onboarding")}
            >
              Começar agora
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Ver demonstração
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-8 border shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <PiggyBank className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gestão de Renda</h3>
            <p className="text-muted-foreground">
              Organize suas receitas e despesas com categorias inteligentes e acompanhamento em tempo real.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Investimentos Personalizados</h3>
            <p className="text-muted-foreground">
              Receba sugestões de investimentos baseadas no seu perfil de risco e objetivos financeiros.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Metas Inteligentes</h3>
            <p className="text-muted-foreground">
              Defina objetivos e acompanhe seu progresso com projeções automáticas e conselhos personalizados.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="bg-gradient-hero rounded-3xl p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-12">Resultados que falam por si</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">50%</div>
                <div className="text-white/80">Redução média de gastos desnecessários</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">3x</div>
                <div className="text-white/80">Aumento na taxa de poupança mensal</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">12m</div>
                <div className="text-white/80">Tempo médio para atingir primeira meta</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-24 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 FinanceIA. Seu futuro financeiro começa aqui.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
