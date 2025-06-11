"use client";

import { useReadContract } from 'wagmi';
import { formatEther, type Address } from 'viem';
import Image from 'next/image';

// Local Project Imports
import { CauseRegistryABI } from '@/lib/abi/CauseRegistry';
import DonateDialog from '@/components/DonateDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Globe, Users, Target, AlertTriangle } from 'lucide-react';

interface ClientPageProps {
  causeId: number;
}

// Get the contract address from environment variables.
const causeRegistryAddress = process.env.NEXT_PUBLIC_CAUSE_REGISTRY_ADDRESS as Address | undefined;

/**
 * The client component responsible for displaying the detailed view of a single cause.
 * It fetches the cause's data directly from the smart contract using its ID.
 */
export default function ClientPage({ causeId }: ClientPageProps) {
  // --- Data Fetching ---
  // Use the `useReadContract` hook to fetch data for a single cause.
  const { data: cause, isLoading, isError, error } = useReadContract({
    address: causeRegistryAddress,
    abi: CauseRegistryABI,
    functionName: 'getCause',
    args: [BigInt(causeId)], // The contract function expects a BigInt.
    query: {
      // Only run this query if the contract address is available and the ID is valid.
      enabled: !!causeRegistryAddress && causeId > 0, 
    }
  });

  // Display a skeleton loader while the data is being fetched.
  if (isLoading) {
    return <CauseDetailSkeleton />;
  }

  // Display an error message if the fetch fails or the cause doesn't exist.
  if (isError || !cause) {
    return (
      <div className="container mx-auto max-w-4xl py-12">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Loading Cause</AlertTitle>
          <AlertDescription>
            Could not fetch the cause details from the contract. It may not exist or there might be a network issue.
            <p className="mt-2 text-xs font-mono">{(error as any)?.shortMessage || error?.message}</p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // --- Data Formatting ---
  // Once data is fetched, format it for display.
  const goal = parseFloat(formatEther(cause.goal));
  const raised = parseFloat(formatEther(cause.raised));
  const fundedPercentage = goal > 0 ? Math.round((raised / goal) * 100) : 100;
  
  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side: Image & Progress */}
        <div className="space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
            <Image 
              src={cause.imageSrc} 
              alt={cause.name} 
              fill 
              className="object-cover" 
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x450/EEE/31343C?text=Image+Not+Found'; }}
            />
          </div>
          <div className="space-y-2">
            <Progress value={fundedPercentage} className="h-3" />
            <div className="flex justify-between text-sm font-medium">
              <span>Raised: {raised.toFixed(4)} ETH</span>
              <span className="text-muted-foreground">{fundedPercentage}% Funded</span>
            </div>
          </div>
        </div>
        
        {/* Right Side: Details & Actions */}
        <div className="space-y-4 flex flex-col">
          <Badge variant="secondary" className="w-fit">{cause.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold">{cause.name}</h1>
          <p className="text-muted-foreground text-lg">{cause.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm py-4">
            <div className="flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground" /> <span>Goal: {goal.toFixed(2)} ETH</span></div>
            <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /> <span>{Number(cause.donorsCount)} Donors</span></div>
            {cause.website && <a href={cause.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary col-span-full"><Globe className="h-4 w-4 text-muted-foreground" /><span>{cause.website}</span></a>}
          </div>
          
          {/* The DonateDialog is triggered here. We can pass a custom button to it. */}
          <div className="mt-auto pt-4">
            <DonateDialog causeId={causeId} causeName={cause.name} triggerButton={<Button size="lg" className="w-full">Donate Now</Button>} />
          </div>
        </div>
      </div>
      
      {/* Long Description Section */}
      <div className="mt-12 border-t pt-8">
        <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold">About this Cause</h2>
            <p>{cause.longDescription}</p>
        </div>
      </div>
    </div>
  );
}

// A dedicated skeleton component for a clean loading state.
function CauseDetailSkeleton() {
  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12 animate-pulse">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <Skeleton className="h-3 w-full rounded" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-24 rounded" />
          <Skeleton className="h-10 w-3/4 rounded" />
          <Skeleton className="h-5 w-full rounded" />
          <Skeleton className="h-5 w-4/5 rounded" />
          <Skeleton className="h-12 w-full mt-4 rounded" />
        </div>
      </div>
      <div className="mt-12 border-t pt-8 space-y-4">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-5/6 rounded" />
      </div>
    </div>
  );
}
