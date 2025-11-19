import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, MessageSquare, Target, Sparkles } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AIInsightsPanelProps {
  financialData: {
    totalIncome: number;
    totalFixedExpenses: number;
    totalVariableExpenses: number;
    monthlyAvailable: number;
    goals: any[];
  };
}

export const AIInsightsPanel = ({ financialData }: AIInsightsPanelProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string>('');

  const generateInsights = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-financial-insights', {
        body: { financialData, type: 'insights' }
      });

      if (error) throw error;
      setInsights(data.analysis);
      
      toast({
        title: "Análise concluída!",
        description: "Insights gerados com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Insights Inteligentes
        </CardTitle>
        <CardDescription>Análise automatizada das suas finanças</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={generateInsights} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Analisando...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              Gerar Análise com IA
            </>
          )}
        </Button>

        {insights && (
          <div className="mt-4 p-4 bg-secondary/30 rounded-lg space-y-2">
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-sm">{insights}</pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
