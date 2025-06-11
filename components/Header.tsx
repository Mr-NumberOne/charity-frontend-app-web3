"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { Menu, Github } from 'lucide-react';
import { CharityOneIcon } from './CharityOneIcon';
import { useIsOwner } from "@/hooks/useIsOwner"; // Import the hook

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isConnected } = useAccount();
  const { isOwner } = useIsOwner(); // Use the hook to check for ownership

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-all duration-200",
      isScrolled
        ? "bg-background/80 backdrop-blur-sm border-b shadow-sm"
        : "bg-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <CharityOneIcon className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden md:inline-block">CharityOne</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/causes" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Causes
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] grid-cols-2">
                     <ListItem href="/about" title="Our Story">Learn about our mission and vision</ListItem>
                     <ListItem href="/about#team" title="Our Team">Meet the people behind the platform</ListItem>
                     <ListItem href="/impact" title="Impact">See the difference we're making together</ListItem>
                     <ListItem href="/faq" title="FAQ">Answers to commonly asked questions</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="https://github.com/Mr-NumberOne/charity-frontend-app-web3" target="_blank" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Conditionally render the Dashboard button for desktop view */}
            {isOwner && (
                <Button variant="outline" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
            )}
            {/* These are the Web3Modal buttons from your provided code */}
            {isConnected && (
              <Button>
                <w3m-network-button />
              </Button>
            )}
            <Button>
              <w3m-button />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-2">
                  <CharityOneIcon className="h-5 w-5 text-primary" />
                  <span>CharityOne</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                <SheetClose asChild><Link href="/" className="py-2 hover:text-primary transition-colors">Home</Link></SheetClose>
                <SheetClose asChild><Link href="/causes" className="py-2 hover:text-primary transition-colors">Causes</Link></SheetClose>
                <SheetClose asChild><Link href="/about" className="py-2 hover:text-primary transition-colors">About</Link></SheetClose>
                <SheetClose asChild><Link href="https://github.com/Mr-NumberOne/charity-frontend-app-web3" target="_blank" className="py-2 hover:text-primary transition-colors flex items-center"><Github className="h-4 w-4 mr-2" />GitHub</Link></SheetClose>
                {/* Conditionally render the Dashboard link for mobile view */}
                {isOwner && (
                    <SheetClose asChild><Link href="/dashboard" className="py-2 hover:text-primary transition-colors">Dashboard</Link></SheetClose>
                )}
                <div className="flex flex-col space-y-2 pt-4">
                    {isConnected && <Button><w3m-network-button /></Button>}
                    <Button><w3m-button /></Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// Helper component for the navigation menu content
const ListItem = ({ href, title, children }: { href: string, title: string, children: React.ReactNode }) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="flex flex-col gap-1 p-3 hover:bg-muted rounded-md transition-colors"
                >
                    <div className="font-medium">{title}</div>
                    <p className="text-sm text-muted-foreground">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
};

