'use client';

import { motion } from 'framer-motion';
import { Users, Shield, Activity, Server, Database, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';
import { GlassCard, FadeIn, PageHeader, StaggerGroup, StaggerItem } from '@/components/motion';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const users = [
  { name: 'Alex Kim', email: 'alex@nova.ai', role: 'Owner', status: 'active', color: 'hsl(199 89% 60%)' },
  { name: 'Maya Chen', email: 'maya@nova.ai', role: 'Admin', status: 'active', color: 'hsl(280 70% 65%)' },
  { name: 'Jordan Lee', email: 'jordan@nova.ai', role: 'Member', status: 'active', color: 'hsl(152 62% 48%)' },
  { name: 'Sam Rivera', email: 'sam@nova.ai', role: 'Member', status: 'invited', color: 'hsl(38 92% 55%)' },
];

const system = [
  { label: 'API latency', value: '42ms', status: 'ok', icon: Activity },
  { label: 'Database connections', value: '18 / 100', status: 'ok', icon: Database },
  { label: 'Queue depth', value: '3 jobs', status: 'ok', icon: Server },
  { label: 'AI token usage', value: '1.2M / 5M', status: 'ok', icon: Cpu },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Admin Panel" subtitle="Manage your workspace, team, and system health." />

      {/* System health */}
      <StaggerGroup className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {system.map((s) => {
          const Icon = s.icon;
          return (
            <StaggerItem key={s.label}>
              <GlassCard hover className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-success/15">
                    <Icon className="h-4 w-4 text-success" />
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
                <p className="mt-3 text-lg font-semibold">{s.value}</p>
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Team */}
        <FadeIn className="lg:col-span-2">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Team members</h3>
              </div>
              <span className="text-xs text-muted-foreground">4 of 10 seats</span>
            </div>
            <div className="mt-4 space-y-2">
              {users.map((u) => (
                <div key={u.email} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ background: u.color }}>
                    {u.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-[11px] text-muted-foreground">{u.email}</p>
                  </div>
                  <span
                    className={cn(
                      'rounded-full border px-2 py-0.5 text-[10px] font-medium',
                      u.role === 'Owner' && 'border-primary/30 bg-primary/10 text-primary',
                      u.role === 'Admin' && 'border-chart-4/30 bg-chart-4/10 text-chart-4',
                      u.role === 'Member' && 'border-border bg-muted text-muted-foreground'
                    )}
                  >
                    {u.role}
                  </span>
                  <span
                    className={cn(
                      'flex items-center gap-1 text-[10px]',
                      u.status === 'active' ? 'text-success' : 'text-warning'
                    )}
                  >
                    {u.status === 'active' ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                    {u.status}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* Roles & permissions */}
        <FadeIn delay={0.05}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Roles & permissions</h3>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { role: 'Owner', count: 1, perms: 'Full access' },
                { role: 'Admin', count: 1, perms: 'Manage team & billing' },
                { role: 'Member', count: 2, perms: 'Use Nova, manage own data' },
              ].map((r) => (
                <div key={r.role} className="rounded-xl border border-border/50 bg-card/30 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold">{r.role}</p>
                    <span className="text-[10px] text-muted-foreground">{r.count} {r.count === 1 ? 'user' : 'users'}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">{r.perms}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-[11px] text-muted-foreground">Workspace usage</p>
              <Progress value={40} className="mt-1.5 h-1.5" />
              <p className="mt-1 text-[10px] text-muted-foreground">4 / 10 seats used</p>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
