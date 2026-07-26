import { cn } from '@/lib/utils';
import type { Priority } from '@/lib/types';

const priorityConfig: Record<Priority, { label: string; className: string; dot: string }> = {
  urgent: {
    label: 'Urgent',
    className: 'bg-destructive/10 text-destructive border-destructive/30',
    dot: 'bg-destructive',
  },
  high: {
    label: 'High',
    className: 'bg-warning/10 text-warning border-warning/30',
    dot: 'bg-warning',
  },
  medium: {
    label: 'Medium',
    className: 'bg-primary/10 text-primary border-primary/30',
    dot: 'bg-primary',
  },
  low: {
    label: 'Low',
    className: 'bg-muted text-muted-foreground border-border',
    dot: 'bg-muted-foreground',
  },
};

export function PriorityBadge({ priority, className }: { priority: Priority; className?: string }) {
  const cfg = priorityConfig[priority];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium',
        cfg.className,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', cfg.dot)} />
      {cfg.label}
    </span>
  );
}

export function EnergyDots({ energy }: { energy: 'low' | 'medium' | 'high' }) {
  const count = energy === 'high' ? 3 : energy === 'medium' ? 2 : 1;
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            i < count ? 'bg-primary' : 'bg-muted-foreground/30'
          )}
        />
      ))}
    </div>
  );
}
