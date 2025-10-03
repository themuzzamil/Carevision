import Link from 'next/link';
import { Stethoscope, LayoutDashboard, Users, UserCog, BarChart3, LogOut } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Header } from '@/components/header';
import { ReactNode } from 'react';

const navItems = [
  // This would be dynamically generated based on user role
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', role: 'doctor' },
  { href: '/dashboard/patients', icon: Users, label: 'Patients', role: 'doctor' },
  { href: '/dashboard/admin/users', icon: UserCog, label: 'User Management', role: 'admin' },
  { href: '/dashboard/management/reports', icon: BarChart3, label: 'Reports', role: 'management' },
];

export default function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { pageTitle?: string };
}) {
  const pageTitle = params.pageTitle || 'Dashboard';
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Stethoscope className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">CareVision</span>
          </Link>
          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Link
                        href="/login"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="sr-only">Logout</span>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Logout</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {/* The title here is a placeholder and will be set by each page */}
        <Header title="Dashboard" />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
        </main>
      </div>
    </div>
  );
}
