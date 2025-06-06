"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DonateDialog from '@/components/DonateDialog';
import { Heart, Share2, Clock, Users, Globe, ChevronLeft } from 'lucide-react';

export default function CauseClientPage({ cause }: { cause: any }) {
  const [showDonateDialog, setShowDonateDialog] = useState(false);
  
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
                    {cause.updates.map((update: any) => (
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
                <span>{cause.raised.toLocaleString()} ETH</span>
                <span>
                  <span className="font-medium">{cause.fundedPercentage}%</span> of {cause.goal.toLocaleString()} ETH
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
          </div>
        </div>
      </div>

      <DonateDialog 
        open={showDonateDialog} 
        onOpenChange={setShowDonateDialog}
        causeName={cause.name}
      />
    </div>
  );
}
