"use client";

import { useMemo } from 'react';
import { useReadContracts } from 'wagmi';
import { formatEther, type Address } from 'viem';
import Link from 'next/link';

// Local Project Imports
import { type Cause } from '@/lib/types';
import { CauseRegistryABI } from "@/lib/abi/CauseRegistry";
import CauseCard from '@/components/CauseCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Contract configuration
const causeRegistryAddress = process.env.NEXT_PUBLIC_CAUSE_REGISTRY_ADDRESS as Address | undefined;
const causeRegistryContract = {
  address: causeRegistryAddress,
  abi: CauseRegistryABI,
} as const;

/**
 * A component to display a carousel of featured causes fetched from the smart contract.
 */
export function FeaturedCauses() {
  // 1. Fetch all cause IDs from the contract.
  const { data: causeIdsResult, isLoading: isLoadingIds, isError: isErrorIds } = useReadContracts({
    contracts: [{ ...causeRegistryContract, functionName: 'getAllCauseIds', args: [] }],
  });
  const causeIds = causeIdsResult?.[0]?.result as readonly bigint[] | undefined;

  // 2. Fetch the full data for each cause ID.
  const { data: causesResult, isLoading: isLoadingCauses, isError: isErrorCauses } = useReadContracts({
    contracts: causeIds?.map(id => ({ ...causeRegistryContract, functionName: 'getCause', args: [id] })),
    query: { enabled: !!causeIds && causeIds.length > 0 }
  });

  // 3. Memoize the filtering and formatting of fetched data to get only featured causes.
  const featuredCauses: Cause[] = useMemo(() => {
    if (!causesResult) return [];
    return causesResult
      .map(res => {
        const causeData = res.result as any;
        // A cause is only featured if it's active AND has the featured flag set.
        if (!causeData || !causeData.featured || !causeData.isActive) return null; 
        
        const goal = parseFloat(formatEther(causeData.goal));
        const raised = parseFloat(formatEther(causeData.raised));
        const fundedPercentage = goal > 0 ? Math.round((raised / goal) * 100) : 100;

        return {
          id: Number(causeData.id),
          name: causeData.name,
          description: causeData.description,
          imageSrc: causeData.imageSrc,
          category: causeData.category,
          goal: goal,
          raised: raised,
          fundedPercentage: fundedPercentage,
          featured: causeData.featured,
          isActive: causeData.isActive,
          // Add other required fields from the Cause type if they exist on causeData
          longDescription: causeData.longDescription,
          website: causeData.website,
          donorsCount: Number(causeData.donorsCount),
          walletAddress: causeData.walletAddress,
        };
      })
      .filter((cause): cause is Cause => cause !== null); // Filter out the null entries
  }, [causesResult]);

  const isLoading = isLoadingIds || (!!causeIds && causeIds.length > 0 && isLoadingCauses);
  const isError = isErrorIds || isErrorCauses;

  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="flex flex-col items-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter">Featured Causes</h2>
          <p className="text-muted-foreground max-w-[700px]">
            Support these hand-picked causes making a significant impact on the ground.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-96 w-full" />)}
          </div>
        ) : isError ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Could not fetch featured causes. Please try again later.</AlertDescription>
          </Alert>
        ) : featuredCauses.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">
            No featured causes available at the moment.
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: featuredCauses.length > 4, // Only loop if there are more cards than can be shown at once
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredCauses.map((cause) => (
                // UPDATE: The responsive classes here now match the grid on the /causes page.
                <CarouselItem key={cause.id} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="p-1">
                    <CauseCard
                      id={cause.id}
                      name={cause.name}
                      description={cause.description}
                      imageSrc={cause.imageSrc}
                      category={cause.category}
                      fundedPercentage={cause.fundedPercentage}
                      featured={cause.featured}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-4" />
            <CarouselNext className="mr-4"/>
          </Carousel>
        )}
        <div className="text-center mt-12">
            <Button asChild size="lg">
                <Link href="/causes">View All Causes</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
