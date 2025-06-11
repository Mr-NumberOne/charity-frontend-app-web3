import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import Newsletter from '@/components/Newsletter';
import { FeaturedCauses } from '@/components/FeaturedCauses';
import { ImpactStats } from '@/components/ImpactStats';
import { ShieldCheck, Zap, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[75vh] min-h-[500px] flex items-center justify-center text-center text-white px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop"
          alt="Hands holding soil with a young plant, symbolizing growth and charity"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 space-y-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            Transparent Giving, Real Impact
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 drop-shadow-md">
            Leveraging blockchain for a new era of charitable donations where every contribution is traceable and every outcome is clear.
          </p>
          <div className="space-x-4 pt-4">
            <Button size="lg" asChild>
              <Link href="/causes">Explore Causes</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 lg:py-28">
        <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left side with text content */}
                <div className="space-y-6">
                    <div className="bg-primary text-primary-foreground inline-block px-4 py-1.5 text-sm font-semibold rounded-full">
                        The Future of Charity
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">Why Give With Us?</h2>
                    <p className="text-muted-foreground text-lg">
                        We are rebuilding charity for the digital age, focusing on trust, efficiency, and direct impact.
                    </p>
                    <div className="space-y-8 pt-4">
                        <InfoPoint icon={<ShieldCheck size={32} className="text-primary"/>} title="Unmatched Transparency" text="Every donation is a transaction on the blockchain, publicly verifiable and impossible to tamper with." />
                        <InfoPoint icon={<Zap size={32} className="text-primary"/>} title="Direct & Efficient" text="Reduced overhead means more of your donation goes directly to the cause, not to administrative fees." />
                        <InfoPoint icon={<TrendingUp size={32} className="text-primary"/>} title="Verifiable Impact" text="Track the flow of funds and see real-time updates on how your contribution is making a difference." />
                    </div>
                </div>
                {/* Right side with the image */}
                <div className="relative h-96 lg:h-[450px] rounded-2xl shadow-xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
                     {/* UPDATE: Image source has been changed to the one you provided. */}
                    <Image 
                        src="https://blog.caionline.org/wp-content/uploads/2018/05/Volunteerism-1080x675.jpg" 
                        alt="A group of hands together, symbolizing community and volunteerism" 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Live Impact Stats Section */}
      <section className="py-20 lg:py-28 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_100%_200px,#1e40af_10%,transparent_50%)] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_800px_at_0%_-100px,#1e40af_10%,transparent_50%)] opacity-20"></div>
        <div className="container relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter text-white">Our Live Impact</h2>
                <p className="text-slate-300 max-w-[700px]">
                    Powered by the blockchain, these numbers reflect our community's collective effort in real-time.
                </p>
            </div>
            <ImpactStats />
        </div>
      </section>
      
      {/* Featured Causes - This uses the component we already built */}
      <FeaturedCauses />

      {/* Final CTA Section */}
      <section className="py-20 lg:py-28 bg-muted/20">
        <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Make a Difference?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg">
                Your contribution, no matter the size, can create a ripple of change. Join our community of givers today and be part of the movement.
            </p>
            <Button size="lg" className="mt-8" asChild>
                <Link href="/causes">Donate to a Cause</Link>
            </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  );
}


// A small helper component for the info points, now with better styling
const InfoPoint = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
    <div className="flex items-start gap-5">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h3 className="font-semibold text-xl mb-1">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{text}</p>
        </div>
    </div>
)
