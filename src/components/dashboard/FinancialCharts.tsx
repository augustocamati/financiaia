import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, PieChartIcon } from "lucide-react";

interface FinancialChartsProps {
  totalIncome: number;
  fixedExpenses: number;
  variableExpenses: number;
  fixedExpensesList: { category: string; amount: number }[];
  variableExpensesList: { category: string; amount: number }[];
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--destructive))",
  "hsl(var(--warning, 38 92% 50%))",
  "hsl(var(--accent))",
  "hsl(var(--secondary))",
  "hsl(142 76% 36%)",
  "hsl(262 83% 58%)",
  "hsl(199 89% 48%)",
];

export const FinancialCharts = ({
  totalIncome,
  fixedExpenses,
  variableExpenses,
  fixedExpensesList,
  variableExpensesList,
}: FinancialChartsProps) => {
  const disponivel = Math.max(0, totalIncome - fixedExpenses - variableExpenses);

  const distributionData = [
    { name: "Gastos Fixos", value: fixedExpenses, color: "hsl(var(--destructive))" },
    { name: "Gastos Variáveis", value: variableExpenses, color: "hsl(var(--warning, 38 92% 50%))" },
    { name: "Disponível", value: disponivel, color: "hsl(142 76% 36%)" },
  ].filter(item => item.value > 0);

  const allExpenses = [
    ...fixedExpensesList.filter(e => e.amount > 0).map(e => ({ ...e, type: "Fixo" })),
    ...variableExpensesList.filter(e => e.amount > 0).map(e => ({ ...e, type: "Variável" })),
  ].sort((a, b) => b.amount - a.amount).slice(0, 8);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-primary font-bold">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  const BarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-primary font-bold">{formatCurrency(payload[0].value)}</p>
          <p className="text-xs text-muted-foreground">{payload[0].payload.type}</p>
        </div>
      );
    }
    return null;
  };

  if (totalIncome === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="w-5 h-5" />
            Gráficos Financeiros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 text-muted-foreground">
            <p>Adicione sua renda para visualizar os gráficos</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="w-5 h-5" />
            Distribuição do Orçamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {distributionData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Maiores Gastos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {allExpenses.length === 0 ? (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              <p>Adicione gastos para visualizar</p>
            </div>
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={allExpenses}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
                  <YAxis
                    type="category"
                    dataKey="category"
                    width={80}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<BarTooltip />} />
                  <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                    {allExpenses.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.type === "Fixo" ? "hsl(var(--destructive))" : "hsl(var(--warning, 38 92% 50%))"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="flex gap-4 justify-center mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-sm">Fixo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(38 92% 50%)" }} />
              <span className="text-sm">Variável</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
