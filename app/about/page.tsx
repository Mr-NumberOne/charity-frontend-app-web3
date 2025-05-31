import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Newsletter from '@/components/Newsletter';
import { Heart, HandHeart, Globe, LucideShield, Users, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Mission to Make a <span className="text-primary">Difference</span>
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  We're dedicated to connecting passionate donors with impactful causes. 
                  Our platform makes it easy to contribute to positive change around the world.
                </p>
              </div>
              <Button className="w-fit" size="lg">
                Join Our Community
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg"
                  alt="People volunteering"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-[800px] space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2023, our platform was born from a simple yet powerful idea: to create a transparent, 
              efficient way for people to support the causes they care about. We identified challenges in traditional 
              charitable giving—lack of transparency, high overhead costs, and disconnection between donors and impact.
            </p>
            <p className="text-muted-foreground">
              Our team of passionate individuals from diverse backgrounds came together with a shared vision: to revolutionize 
              charitable giving by leveraging technology to create direct connections between donors and causes.
            </p>
            <p className="text-muted-foreground">
              Today, we've helped thousands of donors support hundreds of causes worldwide, with 100% of donations going 
              directly to the organizations doing the work. We're proud of what we've accomplished, but this is just the beginning.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter">Our Values</h2>
            <p className="text-muted-foreground max-w-[600px] mt-2">
              These core principles guide everything we do as we work to make giving more impactful and accessible.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 w-fit rounded-full bg-primary/10 p-2">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Compassion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe in the power of empathy and kindness to drive meaningful change in communities around the world.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 w-fit rounded-full bg-primary/10 p-2">
                  <LucideShield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're committed to complete transparency in all operations, ensuring donors know exactly where their contributions go.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 w-fit rounded-full bg-primary/10 p-2">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Global Perspective</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We recognize that challenges and solutions are interconnected across borders, cultures, and communities.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 w-fit rounded-full bg-primary/10 p-2">
                  <HandHeart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Impact-Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We focus on measurable outcomes and sustainable solutions that create lasting change for people and the planet.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 w-fit rounded-full bg-primary/10 p-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe in the collective power of people coming together to solve problems and support one another.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 w-fit rounded-full bg-primary/10 p-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We embrace new technologies and approaches to make giving more efficient, accessible, and impactful.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter">Our Team</h2>
            <p className="text-muted-foreground max-w-[600px] mt-2">
              Meet the passionate individuals behind our mission to transform charitable giving.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-bold">Alex Johnson</h3>
              <p className="text-sm text-primary">Founder & CEO</p>
              <p className="mt-2 text-sm text-muted-foreground max-w-[300px]">
                Former tech executive with a passion for leveraging technology to solve social problems.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-bold">Sophia Chen</h3>
              <p className="text-sm text-primary">Chief Impact Officer</p>
              <p className="mt-2 text-sm text-muted-foreground max-w-[300px]">
                Nonprofit veteran with 15+ years experience in international development.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src="https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-bold">Miguel Rodriguez</h3>
              <p className="text-sm text-primary">Head of Partnerships</p>
              <p className="mt-2 text-sm text-muted-foreground max-w-[300px]">
                Brings extensive experience in building strategic relationships with organizations worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Make an Impact?
              </h2>
              <p className="text-primary-foreground/90 md:text-lg">
                Join thousands of donors who are creating meaningful change through our platform.
                Start your giving journey today.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button variant="secondary">
                  Explore Causes
                </Button>
                <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:text-primary hover:bg-primary-foreground">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative aspect-video w-full max-w-[500px] overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/6994985/pexels-photo-6994985.jpeg"
                  alt="People volunteering together"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}