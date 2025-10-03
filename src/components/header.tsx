import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelLeft, Stethoscope, LayoutDashboard, Users, UserCog, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { UserNav } from './user-nav';
import { mockUsers } from '@/lib/data';

interface HeaderProps {
    title: string;
}

const navItems = [
  // This would be dynamically generated based on user role
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', role: 'doctor' },
  { href: '/dashboard/patients', icon: Users, label: 'Patients', role: 'doctor' },
  { href: '/dashboard/admin/users', icon: UserCog, label: 'User Management', role: 'admin' },
  { href: '/dashboard/management/reports', icon: BarChart3, label: 'Reports', role: 'management' },
];

export function Header({ title }: HeaderProps) {
    const currentUser = mockUsers[0]; // Assuming Dr. Evelyn Reed is logged in

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/dashboard"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Stethoscope className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">CareVision</span>
                </Link>
                {navItems.map(item => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
          <div className="ml-auto">
            <UserNav user={currentUser} />
          </div>
        </header>
    );
}
