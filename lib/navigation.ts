import {
  LayoutDashboard,
  Sparkles,
  Calendar,
  ListTodo,
  Target,
  Repeat,
  StickyNote,
  BarChart3,
  Settings,
  FolderKanban,
  Clock,
  Briefcase,
  GraduationCap,
  Plane,
  HeartPulse,
  Wallet,
  FileText,
  Users,
  type LucideIcon,
} from 'lucide-react';

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const navSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'AI Chat', href: '/chat', icon: Sparkles },
      { label: 'Calendar', href: '/calendar', icon: Calendar },
      { label: 'Timeline', href: '/timeline', icon: Clock },
    ],
  },
  {
    title: 'Work',
    items: [
      { label: 'Tasks', href: '/tasks', icon: ListTodo, badge: '12' },
      { label: 'Projects', href: '/projects', icon: FolderKanban },
      { label: 'Goals', href: '/goals', icon: Target },
      { label: 'Habits', href: '/habits', icon: Repeat },
      { label: 'Notes', href: '/notes', icon: StickyNote },
      { label: 'Documents', href: '/documents', icon: FileText },
    ],
  },
  {
    title: 'Planners',
    items: [
      { label: 'Career', href: '/career', icon: Briefcase },
      { label: 'Study', href: '/study', icon: GraduationCap },
      { label: 'Travel', href: '/travel', icon: Plane },
      { label: 'Health', href: '/health', icon: HeartPulse },
      { label: 'Finance', href: '/finance', icon: Wallet },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Analytics', href: '/analytics', icon: BarChart3 },
      { label: 'Admin', href: '/admin', icon: Users },
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];

export const allNavItems = navSections.flatMap((s) => s.items);
