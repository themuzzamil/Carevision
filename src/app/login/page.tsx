'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Stethoscope } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-2 text-center">
            <div className="inline-block rounded-lg bg-primary p-3 text-primary-foreground">
                <Stethoscope className="h-6 w-6" />
            </div>
          <CardTitle className="text-2xl font-bold">Welcome to CareVision</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="doctor@example.com" required defaultValue="evelyn.reed@carevision.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required defaultValue="password123" />
            </div>
            <Link href="/dashboard" className="w-full">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
