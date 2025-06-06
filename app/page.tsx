import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CauseCard from '@/components/CauseCard';
import Newsletter from '@/components/Newsletter';
import { HeartHandshake, Globe, HandCoins, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 md:py-28">
        {/* The change is on the next line: added 'relative' and 'z-10' */}
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Make a Difference <span className="text-primary">Today</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Support causes you care about and help create a better world for everyone.
                Every donation makes an impact.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/causes">Explore Causes</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="hsl(var(--background))" fillOpacity="1" 
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            </path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-12">
            <div className="flex flex-col items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
                <HeartHandshake className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold">120+</h3>
                <p className="text-sm text-muted-foreground">Causes Supported</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold">50+</h3>
                <p className="text-sm text-muted-foreground">Countries Reached</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
                <HandCoins className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold">$2.5M</h3>
                <p className="text-sm text-muted-foreground">Funds Raised</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold">15K+</h3>
                <p className="text-sm text-muted-foreground">Donors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Causes Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter flex items-center">
                Featured Causes <span className="ml-2 text-primary">❤</span>
              </h2>
              <p className="text-muted-foreground max-w-[700px]">
                Discover impactful projects supporting global communities
              </p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex">
              <Link href="/causes">View All Causes</Link>
            </Button>
          </div>
          
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <CauseCard 
              name="Ocean Cleanup"
              description="Fighting ocean plastic pollution"
              imageSrc="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg" 
              category="Environment"
              fundedPercentage={76}
            />
            <CauseCard 
              name="Reforestation Project"
              description="Planting trees in deforested areas"
              imageSrc="https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg" 
              category="Climate Action"
              fundedPercentage={83}
              featured={true}
            />
            <CauseCard 
              name="Clean Water Initiative"
              description="Providing clean water to rural communities"
              imageSrc="https://images.pexels.com/photos/1552941/pexels-photo-1552941.jpeg" 
              category="Humanitarian"
              fundedPercentage={65}
            />
            <CauseCard 
              name="Wildlife Conservation"
              description="Protecting endangered species"
              imageSrc="https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg" 
              category="Wildlife"
              fundedPercentage={42}
            />
          </div>
          
          <div className="mt-6 flex justify-center md:hidden">
            <Button asChild variant="outline">
              <Link href="/causes">View All Causes</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
            <p className="text-muted-foreground max-w-[600px]">
              Making a difference is simple. In just three steps, you can contribute to causes you care about.
            </p>
          </div>
          
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <span className="text-xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-bold">Choose a Cause</h3>
              <p className="mt-2 text-muted-foreground">
                Browse through our vetted charitable organizations and find causes that resonate with your values.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <span className="text-xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-bold">Make a Donation</h3>
              <p className="mt-2 text-muted-foreground">
                Contribute any amount you're comfortable with. Every donation, no matter how small, makes an impact.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <span className="text-xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-bold">Track Your Impact</h3>
              <p className="mt-2 text-muted-foreground">
                Follow the progress of the causes you've supported and see the real-world difference you're making.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}