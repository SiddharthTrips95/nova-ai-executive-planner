'use client';

import { motion } from 'framer-motion';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Sparkles,
  PiggyBank,
  Receipt,
  Target,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { GlassCard, FadeIn, PageHeader, StaggerGroup, StaggerItem } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const monthlyFlow = [
  { month: 'Feb', income: 18000, expenses: 12000 },
  { month: 'Mar', income: 19500, expenses: 13500 },
  { month: 'Apr', income: 21000, expenses: 11800 },
  { month: 'May', income: 20500, expenses: 14200 },
  { month: 'Jun', income: 22800, expenses: 13100 },
  { month: 'Jul', income: 24200, expenses: 12600 },
];

const categories = [
  { name: 'Payroll', value: 4200, color: 'hsl(var(--chart-1))' },
  { name: 'Software', value: 1850, color: 'hsl(var(--chart-2))' },
  { name: 'Marketing', value: 2400, color: 'hsl(var(--chart-3))' },
  { name: 'Office', value: 950, color: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 3200, color: 'hsl(var(--chart-5))' },
];

const transactions = [
  { desc: 'Stripe payout', amount: 8200, type: 'in', date: 'Jul 25' },
  { desc: 'AWS — production', amount: 1240, type: 'out', date: 'Jul 24' },
  { desc: 'Figma — team plan', amount: 540, type: 'out', date: 'Jul 23' },
  { desc: 'Linear', amount: 96, type: 'out', date: 'Jul 22' },
  { desc: 'Customer payment — Acme', amount: 4200, type: 'in', date: 'Jul 21' },
];

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance Dashboard"
        subtitle="Nova watches your cash flow, flags anomalies, and forecasts your runway."
        action={
          <Button size="sm" className="gap-1.5 rounded-xl">
            <Plus className="h-3.5 w-3.5" /> Add transaction
          </Button>
        }
      />

      {/* KPIs */}
      <StaggerGroup className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Balance', value: '$48,200', delta: '+8.2%', up: true, icon: Wallet },
          { label: 'Income (July)', value: '$24,200', delta: '+6%', up: true, icon: TrendingUp },
          { label: 'Expenses (July)', value: '$12,600', delta: '-3.4%', up: true, icon: TrendingDown },
          { label: 'Runway', value: '14 months', delta: '+2', up: true, icon: Target },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <StaggerItem key={kpi.label}>
              <GlassCard hover className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className={cn('flex items-center gap-0.5 text-[11px] font-medium', kpi.up ? 'text-success' : 'text-destructive')}>
                    {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {kpi.delta}
                  </span>
                </div>
                <p className="mt-3 text-2xl font-semibold">{kpi.value}</p>
                <p className="text-[11px] text-muted-foreground">{kpi.label}</p>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Cash flow */}
        <FadeIn className="lg:col-span-2">
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Cash flow — last 6 months</h3>
            </div>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyFlow}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }}
                    cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
                  />
                  <Bar dataKey="income" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </FadeIn>

        {/* Expense breakdown */}
        <FadeIn delay={0.05}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Expense breakdown</h3>
            </div>
            <div className="mt-4 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categories} dataKey="value" nameKey="name" innerRadius={40} outerRadius={60} paddingAngle={3}>
                    {categories.map((c) => (
                      <Cell key={c.name} fill={c.color} stroke="transparent" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-1.5">
              {categories.map((c) => (
                <div key={c.name} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                  <span className="flex-1 text-[11px] text-muted-foreground">{c.name}</span>
                  <span className="text-[11px] font-medium">${c.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* Recent transactions */}
        <FadeIn delay={0.1} className="lg:col-span-2">
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Recent transactions</h3>
            </div>
            <div className="mt-4 space-y-2">
              {transactions.map((t, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 p-3">
                  <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', t.type === 'in' ? 'bg-success/15' : 'bg-muted')}>
                    {t.type === 'in' ? (
                      <ArrowDownRight className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{t.desc}</p>
                    <p className="text-[10px] text-muted-foreground">{t.date}</p>
                  </div>
                  <span className={cn('text-sm font-semibold', t.type === 'in' ? 'text-success' : 'text-foreground')}>
                    {t.type === 'in' ? '+' : '−'}${t.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* Nova insight */}
        <FadeIn delay={0.15}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="text-sm font-semibold">Nova's finance insight</h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Software spend is up 18% this month — your Figma team plan auto-scaled to 12 seats. I drafted an email to downgrade unused seats, which would save $3,240/year. Your runway improved to 14 months at current burn.
            </p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Savings goal — emergency fund</span>
                <span className="font-medium">$48k / $60k</span>
              </div>
              <Progress value={80} className="mt-1.5 h-1.5" />
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
