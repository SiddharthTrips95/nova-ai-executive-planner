'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Flame,
  Brain,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  LineChart,
  Line,
} from 'recharts';
import { GlassCard, FadeIn, PageHeader, StaggerGroup, StaggerItem } from '@/components/motion';
import { cn } from '@/lib/utils';
import { weeklyAnalytics, energyCurve } from '@/lib/seed-data';

const radarData = [
  { area: 'Focus', value: 82 },
  { area: 'Execution', value: 74 },
  { area: 'Health', value: 68 },
  { area: 'Learning', value: 55 },
  { area: 'Relationships', value: 60 },
  { area: 'Recovery', value: 45 },
];

const monthlyTrend = [
  { month: 'Feb', score: 62 },
  { month: 'Mar', score: 68 },
  { month: 'Apr', score: 71 },
  { month: 'May', score: 69 },
  { month: 'Jun', score: 78 },
  { month: 'Jul', score: 84 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Nova turns your activity into insight — what's working, what's slipping, and what to change."
      />

      {/* KPI cards */}
      <StaggerGroup className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Productivity Score', value: 84, delta: '+6', up: true, icon: Brain },
          { label: 'Focus time (this week)', value: '27.6h', delta: '+3.2h', up: true, icon: Clock },
          { label: 'Completion rate', value: '78%', delta: '-4%', up: false, icon: CheckCircle2 },
          { label: 'Habit success', value: '73%', delta: '+8%', up: true, icon: Flame },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <StaggerItem key={kpi.label}>
              <GlassCard hover className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span
                    className={cn(
                      'flex items-center gap-0.5 text-[11px] font-medium',
                      kpi.up ? 'text-success' : 'text-destructive'
                    )}
                  >
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

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FadeIn>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Weekly focus & completion</h3>
            </div>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyAnalytics}>
                  <defs>
                    <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="focus"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#focusGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.05}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Life balance radar</h3>
            </div>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="area" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Radar
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.1}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Productivity score trend</h3>
            </div>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} domain={[50, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--chart-2))', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.15}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Nova's insights</h3>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { title: 'Your best focus days are Tuesday & Thursday', desc: 'You log 40% more deep work on these days. Nova will protect your mornings.' },
                { title: 'Habit slippage detected', desc: '"No phone before noon" dropped to 43% this week. Recovery plan ready.' },
                { title: 'Energy dip at 1pm is consistent', desc: 'Nova auto-schedules a walk or low-energy task in this window.' },
                { title: 'Goal at risk: $25K MRR', desc: 'Pace suggests $18K by year-end. Nova drafted a growth plan.' },
              ].map((insight) => (
                <div key={insight.title} className="rounded-xl border border-border/50 bg-card/30 p-3.5">
                  <p className="text-xs font-medium">{insight.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{insight.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
