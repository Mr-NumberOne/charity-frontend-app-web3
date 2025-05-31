"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import DonateDialog from './DonateDialog';

interface CauseCardProps {
  name: string;
  description: string;
  imageSrc: string;
  category: string;
  fundedPercentage: number;
  featured?: boolean;
}

export default function CauseCard({
  name,
  description,
  imageSrc,
  category,
  fundedPercentage,
  featured = false,
}: CauseCardProps) {
  const [showDonateDialog, setShowDonateDialog] = useState(false);
  
  // Generate a deterministic ID for the link from the name
  const id = name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <>
      <Card className={`overflow-hidden transition-all hover:shadow-md ${featured ? 'border-primary/50 shadow-sm' : ''}`}>
        <div className="relative">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={imageSrc}
              alt={name}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {category}
            </Badge>
            {featured && (
              <Badge variant="default" className="bg-primary/90 backdrop-blur-sm">
                Featured
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-2">
            <Link href={`/causes/${id}`} className="block">
              <h3 className="line-clamp-1 font-semibold text-lg hover:text-primary transition-colors">{name}</h3>
            </Link>
            <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Funded</span>
              <span className="font-medium">{fundedPercentage}%</span>
            </div>
            <Progress value={fundedPercentage} className="h-2" />
          </div>
        </CardContent>
        
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <Button variant="ghost" asChild>
            <Link href={`/causes/${id}`}>See More</Link>
          </Button>
          <Button onClick={() => setShowDonateDialog(true)}>
            Donate
          </Button>
        </CardFooter>
      </Card>

      <DonateDialog 
        open={showDonateDialog} 
        onOpenChange={setShowDonateDialog}
        causeName={name}
      />
    </>
  );
}