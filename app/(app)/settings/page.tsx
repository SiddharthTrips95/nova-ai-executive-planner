'use client';

import { useState } from 'react';
import {
  User,
  Bell,
  Palette,
  Shield,
  Plug,
  CreditCard,
  Brain,
  Check,
  ChevronRight,
} from 'lucide-react';
import { GlassCard, FadeIn, PageHeader } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'ai', label: 'AI Behavior', icon: Brain },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

const integrations = [
  { name: 'Google Calendar', desc: 'Two-way sync with your primary calendar', connected: true, color: 'hsl(0 70% 55%)' },
  { name: 'Outlook Calendar', desc: 'Sync meetings and availability', connected: false, color: 'hsl(210 70% 55%)' },
  { name: 'Gmail', desc: 'Nova summarizes and drafts replies', connected: true, color: 'hsl(0 70% 55%)' },
  { name: 'Outlook Mail', desc: 'Email summarization and triage', connected: false, color: 'hsl(210 70% 55%)' },
  { name: 'Slack', desc: 'Nova can post summaries and reminders', connected: false, color: 'hsl(280 60% 55%)' },
  { name: 'Notion', desc: 'Sync documents and notes', connected: false, color: 'hsl(0 0% 30%)' },
];

export default function SettingsPage() {
  const [active, setActive] = useState('ai');

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Tune Nova to match how you think and work." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr]">
        {/* Section nav */}
        <FadeIn>
          <GlassCard className="p-2">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors',
                    active === s.id ? 'bg-primary/10 text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className={cn('h-4 w-4', active === s.id && 'text-primary')} />
                  <span className="font-medium">{s.label}</span>
                  <ChevronRight className={cn('ml-auto h-3.5 w-3.5', active === s.id ? 'opacity-100' : 'opacity-0')} />
                </button>
              );
            })}
          </GlassCard>
        </FadeIn>

        {/* Content */}
        <FadeIn delay={0.05}>
          <GlassCard className="p-6">
            {active === 'profile' && (
              <div className="space-y-5">
                <h3 className="text-base font-semibold">Profile</h3>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/50 text-xl font-semibold text-primary-foreground">
                    AK
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="rounded-xl">Change avatar</Button>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">JPG or PNG, max 2MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium">Full name</label>
                    <input defaultValue="Alex Kim" className="mt-1.5 w-full rounded-xl border border-border/60 bg-card/40 px-3 py-2 text-sm outline-none focus:border-primary/40" />
                  </div>
                  <div>
                    <label className="text-xs font-medium">Email</label>
                    <input defaultValue="alex@nova.ai" className="mt-1.5 w-full rounded-xl border border-border/60 bg-card/40 px-3 py-2 text-sm outline-none focus:border-primary/40" />
                  </div>
                  <div>
                    <label className="text-xs font-medium">Timezone</label>
                    <input defaultValue="America/Los_Angeles" className="mt-1.5 w-full rounded-xl border border-border/60 bg-card/40 px-3 py-2 text-sm outline-none focus:border-primary/40" />
                  </div>
                  <div>
                    <label className="text-xs font-medium">Role</label>
                    <input defaultValue="Founder & CEO" className="mt-1.5 w-full rounded-xl border border-border/60 bg-card/40 px-3 py-2 text-sm outline-none focus:border-primary/40" />
                  </div>
                </div>
              </div>
            )}

            {active === 'ai' && (
              <div className="space-y-5">
                <h3 className="text-base font-semibold">AI Behavior</h3>
                <p className="text-xs text-muted-foreground">Control how proactively Nova acts on your behalf.</p>
                {[
                  { label: 'Auto-schedule tasks', desc: 'Nova places tasks into your calendar based on priority and energy.', on: true },
                  { label: 'Auto-reschedule conflicts', desc: 'When meetings shift, Nova reflows your day automatically.', on: true },
                  { label: 'Extract tasks from chat', desc: 'Nova creates tasks from things you mention in conversation.', on: true },
                  { label: 'Draft email replies', desc: 'Nova drafts responses to emails it summarizes.', on: false },
                  { label: 'Proactive nudges', desc: 'Nova messages you before a streak breaks or a deadline slips.', on: true },
                  { label: 'Motivation coaching', desc: 'Nova offers encouragement when your energy or mood is low.', on: false },
                ].map((s) => (
                  <div key={s.label} className="flex items-start justify-between gap-4 border-b border-border/40 pb-4">
                    <div>
                      <p className="text-sm font-medium">{s.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                    <Switch defaultChecked={s.on} />
                  </div>
                ))}
              </div>
            )}

            {active === 'notifications' && (
              <div className="space-y-5">
                <h3 className="text-base font-semibold">Notifications</h3>
                {[
                  { label: 'Email notifications', desc: 'Daily briefing and important alerts.', on: true },
                  { label: 'Push notifications', desc: 'Real-time nudges on your devices.', on: true },
                  { label: 'SMS alerts', desc: 'Critical reminders by text message.', on: false },
                  { label: 'Morning briefing', desc: 'A summary of your day at 7am.', on: true },
                  { label: 'Evening review', desc: 'A reflection prompt at 9pm.', on: false },
                ].map((s) => (
                  <div key={s.label} className="flex items-start justify-between gap-4 border-b border-border/40 pb-4">
                    <div>
                      <p className="text-sm font-medium">{s.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                    <Switch defaultChecked={s.on} />
                  </div>
                ))}
              </div>
            )}

            {active === 'integrations' && (
              <div className="space-y-4">
                <h3 className="text-base font-semibold">Integrations</h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {integrations.map((int) => (
                    <div key={int.name} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 p-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `${int.color}20` }}>
                        <Plug className="h-4 w-4" style={{ color: int.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{int.name}</p>
                        <p className="text-[11px] text-muted-foreground">{int.desc}</p>
                      </div>
                      {int.connected ? (
                        <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-[10px] font-medium text-success">
                          <Check className="h-3 w-3" /> Connected
                        </span>
                      ) : (
                        <Button variant="outline" size="sm" className="rounded-lg text-xs">Connect</Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === 'appearance' && (
              <div className="space-y-5">
                <h3 className="text-base font-semibold">Appearance</h3>
                <div>
                  <p className="text-xs font-medium">Theme</p>
                  <div className="mt-2 flex gap-3">
                    {['Dark', 'Midnight', 'Aurora'].map((t, i) => (
                      <button
                        key={t}
                        className={cn(
                          'flex-1 rounded-xl border p-4 text-left transition-colors',
                          i === 0 ? 'border-primary/40 bg-primary/5' : 'border-border/60 hover:border-primary/30'
                        )}
                      >
                        <div className="mb-2 h-12 rounded-lg" style={{ background: i === 0 ? 'hsl(222 47% 8%)' : i === 1 ? 'hsl(240 50% 6%)' : 'linear-gradient(135deg, hsl(199 60% 12%), hsl(280 40% 12%))' }} />
                        <p className="text-xs font-medium">{t}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                  <div>
                    <p className="text-sm font-medium">Reduce motion</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Minimize animations across the app.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                  <div>
                    <p className="text-sm font-medium">Compact mode</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Tighter spacing for more content per screen.</p>
                  </div>
                  <Switch />
                </div>
              </div>
            )}

            {active === 'security' && (
              <div className="space-y-5">
                <h3 className="text-base font-semibold">Security</h3>
                {[
                  { label: 'Two-factor authentication', desc: 'Add an extra layer of security to your account.', on: true },
                  { label: 'Session timeout', desc: 'Automatically sign out after 30 days of inactivity.', on: true },
                  { label: 'Login alerts', desc: 'Email me when a new device signs in.', on: true },
                ].map((s) => (
                  <div key={s.label} className="flex items-start justify-between gap-4 border-b border-border/40 pb-4">
                    <div>
                      <p className="text-sm font-medium">{s.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                    <Switch defaultChecked={s.on} />
                  </div>
                ))}
                <Button variant="outline" size="sm" className="rounded-xl">View active sessions</Button>
              </div>
            )}

            {active === 'billing' && (
              <div className="space-y-5">
                <h3 className="text-base font-semibold">Billing</h3>
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-primary">Pro plan</p>
                      <p className="text-xs text-muted-foreground">$24/month · renews Aug 15, 2026</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl">Manage</Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border/50 bg-card/30 p-4">
                    <p className="text-[11px] text-muted-foreground">AI requests</p>
                    <p className="mt-1 text-lg font-semibold">1,240 / 5,000</p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-card/30 p-4">
                    <p className="text-[11px] text-muted-foreground">Storage used</p>
                    <p className="mt-1 text-lg font-semibold">3.2 / 50 GB</p>
                  </div>
                </div>
              </div>
            )}
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
