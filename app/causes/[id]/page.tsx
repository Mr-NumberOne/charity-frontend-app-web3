"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import DonateDialog from '@/components/DonateDialog';
import { Heart, Share2, Clock, Users, Globe, ChevronLeft } from 'lucide-react';

export default function CausePage({ params }: { params: { id: string } }) {
  const [showDonateDialog, setShowDonateDialog] = useState(false);
  
  // Mock data for a single cause
  // In a real app, this would come from an API based on the ID
  const cause = {
    id: params.id,
    name: "Ocean Cleanup",
    description: "Fighting ocean plastic pollution and restoring marine ecosystems",
    longDescription: `The Ocean Cleanup is a non-profit organization developing advanced technologies to rid the world's oceans of plastic. They aim to clean up 90% of floating ocean plastic pollution through their innovative cleanup systems.
    
    Every year, millions of tons of plastic enter the oceans primarily from rivers and coastal areas. The floating plastic accumulates in five ocean garbage patches, with the largest one being the Great Pacific Garbage Patch.
    
    Their cleanup approach involves two main strategies: cleaning up existing pollution in the ocean and intercepting plastic before it reaches the oceans through rivers. Their systems are designed to be environmentally friendly, safe for marine life, and powered by natural oceanic forces.`,
    imageSrc: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg",
    category: "Environment",
    fundedPercentage: 76,
    featured: true,
    goal: 500000,
    raised: 380000,
    donors: 1245,
    daysLeft: 23,
    website: "https://oceancleanup.org",
    updates: [
      {
        id: 1,
        date: "2025-05-01",
        title: "New cleanup vessel launched",
        content: "We're excited to announce that our new cleanup vessel has been deployed in the Great Pacific Garbage Patch. This new technology allows us to collect plastic 50% more efficiently."
      },
      {
        id: 2,
        date: "2025-04-15",
        title: "Q1 Impact Report",
        content: "In the first quarter of 2025, we've removed over 50,000 kg of plastic from the ocean. Thank you to all our supporters who made this possible!"
      }
    ]
  };

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <Link href="/causes" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" />
        <span>Back to all causes</span>
      </Link>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image 
              src={cause.imageSrc}
              alt={cause.name}
              fill
              className="object-cover"
              priority
            />
            <Badge variant="secondary" className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm">
              {cause.category}
            </Badge>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{cause.name}</h1>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="mt-4">
              <Tabs defaultValue="about">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                  <TabsTrigger value="donors">Donors</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="mt-4">
                  <p className="text-muted-foreground whitespace-pre-line">{cause.longDescription}</p>
                  
                  <div className="mt-6 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
                    <a 
                      href={cause.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                </TabsContent>
                <TabsContent value="updates" className="mt-4">
                  <div className="space-y-4">
                    {cause.updates.map((update) => (
                      <div key={update.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{update.title}</h3>
                          <span className="text-sm text-muted-foreground">{update.date}</span>
                        </div>
                        <p className="mt-2 text-muted-foreground">{update.content}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="donors" className="mt-4">
                  <p>Recent donors will appear here once they contribute to this cause.</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        <div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="font-semibold">Progress</h3>
              <Progress value={cause.fundedPercentage} className="h-2 mt-2" />
              <div className="mt-2 flex justify-between text-sm">
                <span>${cause.raised.toLocaleString()}</span>
                <span>
                  <span className="font-medium">{cause.fundedPercentage}%</span> of ${cause.goal.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-md bg-muted p-3 text-center">
                <div className="flex items-center justify-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="font-medium">{cause.donors}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Donors</p>
              </div>
              <div className="rounded-md bg-muted p-3 text-center">
                <div className="flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="font-medium">{cause.daysLeft}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Days Left</p>
              </div>
            </div>
            
            <Button className="w-full" size="lg" onClick={() => setShowDonateDialog(true)}>
              Donate Now
            </Button>
            
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">Share this cause</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-[#1877F2]">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-[#1DA1F2]">
                    <path d="M8.219 20.225c6.56 0 10.15-5.44 10.15-10.15 0-.153 0-.307-.01-.46A7.272 7.272 0 0 0 20 7.766c-.637.283-1.322.474-2.037.56a3.56 3.56 0 0 0 1.56-1.968 7.166 7.166 0 0 1-2.254.861 3.56 3.56 0 0 0-6.062 3.246 10.1 10.1 0 0 1-7.33-3.72 3.56 3.56 0 0 0 1.1 4.748 3.541 3.541 0 0 1-1.61-.445v.045a3.563 3.563 0 0 0 2.854 3.494 3.618 3.618 0 0 1-.935.123c-.229 0-.451-.021-.67-.06a3.563 3.563 0 0 0 3.324 2.471 7.144 7.144 0 0 1-4.414 1.52c-.287 0-.57-.015-.85-.048a10.071 10.071 0 0 0 5.453 1.596" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-[#0A66C2]">
                    <path d="M6.5 8h-3A.5.5 0 0 0 3 8.5v11a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-11A.5.5 0 0 0 6.5 8ZM5 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12 10c-1.103 0-2 .897-2 2v7.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V14.5a.5.5 0 0 1 .5-.5h1a2 2 0 0 1 2 2v3.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-4.8c0-2.316-1.615-5.2-4.944-5.2C15.5 9.5 14 10 13 10.5V10.2c0-.11-.09-.2-.2-.2h-2.6c-.11 0-.2.09-.2.2v.3Z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-[#E4405F]">
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.884 4.884 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2Zm0 1.802c-2.67 0-2.986.01-4.04.058-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.044.976.207 1.505.344 1.858.182.466.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.976-.044 1.504-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.044-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058m0 11.531a3.333 3.333 0 1 1 0-6.667 3.333 3.333 0 0 1 0 6.667m0-8.468a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27m6.538-.203a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Similar Causes</h3>
            <div className="space-y-4">
              <Link href="/causes/2" className="flex items-start gap-3 group">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                  <Image 
                    src="https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg"
                    alt="Reforestation Project"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium group-hover:text-primary transition-colors">Reforestation Project</h4>
                  <p className="text-sm text-muted-foreground">83% funded</p>
                </div>
              </Link>
              <Link href="/causes/7" className="flex items-start gap-3 group">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                  <Image 
                    src="https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg"
                    alt="Renewable Energy"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium group-hover:text-primary transition-colors">Renewable Energy</h4>
                  <p className="text-sm text-muted-foreground">59% funded</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Donate Dialog */}
      <DonateDialog 
        open={showDonateDialog} 
        onOpenChange={setShowDonateDialog}
        causeName={cause.name}
      />
    </div>
  );
}