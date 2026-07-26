'use client';

import { motion } from 'framer-motion';
import { Plane, MapPin, Calendar, Sparkles, Plus, Clock, Sun, CloudRain, Hotel, Utensils } from 'lucide-react';
import { GlassCard, FadeIn, PageHeader, StaggerGroup, StaggerItem } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const trips = [
  { destination: 'Tokyo, Japan', dates: 'Sep 14 – 22', days: 8, status: 'Planning', color: 'hsl(280 70% 65%)', flight: 'SFO → NRT · 11h 30m' },
  { destination: 'Lisbon, Portugal', dates: 'Oct 5 – 12', days: 7, status: 'Booked', color: 'hsl(199 89% 60%)', flight: 'SFO → LIS · 13h 10m' },
  { destination: 'Banff, Canada', dates: 'Aug 8 – 12', days: 4, status: 'Confirmed', color: 'hsl(152 62% 48%)', flight: 'SFO → YYC · 2h 40m' },
];

const itinerary = [
  { time: '9:00am', title: 'Arrive at Haneda', desc: 'Narita Express to Shinjuku', icon: Plane },
  { time: '11:00am', title: 'Check in — Park Hyatt', desc: 'Nova negotiated early check-in', icon: Hotel, ai: true },
  { time: '1:00pm', title: 'Lunch — Ichiran Ramen', desc: 'Reserved by Nova', icon: Utensils, ai: true },
  { time: '3:00pm', title: 'Meiji Shrine + Harajuku', desc: '2 hour walk', icon: MapPin },
  { time: '7:00pm', title: 'Dinner — Sushi Saito', desc: 'Nova secured a cancellation', icon: Utensils, ai: true },
];

export default function TravelPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Travel Planner"
        subtitle="Nova books, optimizes, and negotiates your trips — and builds your itinerary."
        action={
          <Button size="sm" className="gap-1.5 rounded-xl">
            <Plus className="h-3.5 w-3.5" /> New trip
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Trips */}
        <FadeIn className="lg:col-span-1">
          <StaggerGroup className="space-y-3">
            {trips.map((trip) => (
              <StaggerItem key={trip.destination}>
                <GlassCard hover className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${trip.color}20` }}>
                      <Plane className="h-5 w-5" style={{ color: trip.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{trip.destination}</p>
                      <p className="text-[11px] text-muted-foreground">{trip.dates} · {trip.days} days</p>
                    </div>
                    <span
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-[9px] font-medium',
                        trip.status === 'Booked' && 'border-success/30 bg-success/10 text-success',
                        trip.status === 'Planning' && 'border-warning/30 bg-warning/10 text-warning',
                        trip.status === 'Confirmed' && 'border-primary/30 bg-primary/10 text-primary'
                      )}
                    >
                      {trip.status}
                    </span>
                  </div>
                  <p className="mt-3 text-[11px] text-muted-foreground">{trip.flight}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </FadeIn>

        {/* Itinerary */}
        <FadeIn delay={0.05} className="lg:col-span-2">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Tokyo — Day 1 itinerary</h3>
              </div>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Sun className="h-3.5 w-3.5" /> 26°C · clear
              </span>
            </div>
            <div className="mt-4 space-y-2.5">
              {itinerary.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex gap-3">
                    <div className="w-14 shrink-0 pt-1 text-right text-[11px] text-muted-foreground">{item.time}</div>
                    <div className="flex-1 rounded-xl border border-border/50 bg-card/30 p-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                        <p className="text-xs font-medium">{item.title}</p>
                        {item.ai && (
                          <span className="flex items-center gap-0.5 text-[9px] text-primary">
                            <Sparkles className="h-2.5 w-2.5" /> Nova
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
