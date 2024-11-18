"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Upload, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/components/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <Compass className="h-6 w-6" />
          <span className="text-xl font-bold">That&apos;s Gas</span>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/submit">
                  <Upload className="h-5 w-5" />
                  <span className="sr-only">Upload</span>
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
