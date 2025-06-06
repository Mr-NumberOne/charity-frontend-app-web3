import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandCoins, Target, Users, TrendingUp, CheckCircle, Quote } from "lucide-react";
import Newsletter from "@/components/Newsletter";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ImpactStoryCard = ({ imageSrc, title, quote, causeName }: { imageSrc: string, title: string, quote: string, causeName: string }) => (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="p-0">
            <div className="relative aspect-video">
                <Image src={imageSrc} alt={title} fill className="object-cover" />
            </div>
        </CardHeader>
        <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                <Quote className="h-5 w-5 text-primary/50 absolute -left-3 top-0" />
                {quote}
            </blockquote>
            <p className="text-sm font-medium text-primary mt-4">Supported Cause: {causeName}</p>
        </CardContent>
    </Card>
);


export default function ImpactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Collective Impact</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              See the tangible difference your contributions are making around the globe. Together, we are creating a better world.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
                <HandCoins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,250 ETH</div>
                <p className="text-xs text-muted-foreground">Across all campaigns</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Causes Funded</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+120</div>
                <p className="text-xs text-muted-foreground">Successfully funded projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Donors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+15,000</div>
                <p className="text-xs text-muted-foreground">Generous contributors</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+20%</div>
                <p className="text-xs text-muted-foreground">Month-over-month growth</p>
              </CardContent>
            </Card>
          </div>
          
           <div className="mt-20">
             <div className="flex flex-col items-center text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter">Success Stories</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl">
                    Behind every number is a story of change. Here are a few examples of how your generosity has transformed lives and communities.
                </p>
             </div>
             <div className="grid gap-8 lg:grid-cols-2">
                <ImpactStoryCard 
                    title="A New Well in Kajiado"
                    quote="The clean water well has changed everything. Our children are healthier, and they can now attend school regularly."
                    causeName="Clean Water Initiative"
                    imageSrc="https://images.pexels.com/photos/8474063/pexels-photo-8474063.jpeg"
                />
                 <ImpactStoryCard 
                    title="Protecting the Amazon"
                    quote="With the new equipment, our patrols can cover more ground and better protect the rainforest from illegal deforestation."
                    causeName="Reforestation Project"
                    imageSrc="https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg"
                />
             </div>
           </div>

            <div className="mt-16 text-center">
                <Button asChild size="lg">
                    <Link href="/causes">Find a Cause to Support</Link>
                </Button>
            </div>
        </div>
      </section>
      
      <Newsletter />
    </div>
  );
}
