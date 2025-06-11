"use client";

import { useState, useMemo } from 'react';
import { useReadContracts } from 'wagmi';
import { formatEther, type Address } from 'viem';

// Local Project Imports
import { type Cause } from '@/lib/types';
import { CauseRegistryABI as causeRegistryABI } from "@/lib/abi/CauseRegistry";
import CauseCard from '@/components/CauseCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, AlertTriangle } from 'lucide-react';

// Get the contract address from environment variables. 
// It's crucial this is set in your .env.local file.
const causeRegistryAddress = process.env.NEXT_PUBLIC_CAUSE_REGISTRY_ADDRESS as Address | undefined;

// Define the contract configuration once to be reused by wagmi hooks.
const causeRegistryContract = {
  address: causeRegistryAddress,
  abi: causeRegistryABI,
} as const;

/**
 * A client component that fetches, filters, and displays all active causes
 * from the CauseRegistry smart contract.
 */
export function CausesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // 1. First, fetch the array of all cause IDs from the contract.
  // This is a lightweight call to know *what* to fetch next.
  const { data: causeIdsResult, isLoading: isLoadingIds, isError: isErrorIds } = useReadContracts({
    contracts: [{ ...causeRegistryContract, functionName: 'getAllCauseIds', args: [] }],
  });
  const causeIds = causeIdsResult?.[0]?.result as readonly bigint[] | undefined;

  // 2. Second, fetch the detailed data for each cause ID returned by the first call.
  // This hook creates a dynamic list of contract calls based on the `causeIds` array.
  const { data: causesResult, isLoading: isLoadingCauses, isError: isErrorCauses } = useReadContracts({
    contracts: causeIds?.map(id => ({ ...causeRegistryContract, functionName: 'getCause', args: [id] })),
    // This query is only enabled once `causeIds` has been successfully fetched.
    query: { enabled: !!causeIds && causeIds.length > 0 } 
  });
  
  // 3. Memoize the transformation of raw contract data into a structured `Cause[]` array.
  // This prevents re-computation on every render unless the source data `causesResult` changes.
  const allCauses: Cause[] = useMemo(() => {
    if (!causesResult) return [];
    return causesResult.map(res => {
      const causeData = res.result as any;
      if (!causeData) return null;
      
      // Format Wei values to Ether for display and calculation
      const goal = parseFloat(formatEther(causeData.goal));
      const raised = parseFloat(formatEther(causeData.raised));
      // Calculate the funding percentage, handling the case where the goal is 0.
      const fundedPercentage = goal > 0 ? Math.round((raised / goal) * 100) : 100;

      // Map contract data to our local Cause type
      return {
        id: Number(causeData.id),
        name: causeData.name,
        description: causeData.description,
        longDescription: causeData.longDescription,
        imageSrc: causeData.imageSrc,
        category: causeData.category,
        website: causeData.website,
        goal: goal,
        raised: raised,
        donorsCount: Number(causeData.donorsCount),
        walletAddress: causeData.walletAddress,
        isActive: causeData.isActive,
        featured: causeData.featured,
        fundedPercentage: fundedPercentage, // Add the calculated property
      };
      // Filter out any potential null values or causes with an ID of 0 (which is invalid).
    }).filter((cause): cause is Cause => cause !== null && cause.id > 0);
  }, [causesResult]);

  // 4. Memoize the client-side filtering and sorting logic.
  const filteredCauses = useMemo(() => {
    return allCauses.filter(cause => {
      // Only show active causes on this public page.
      const isActive = cause.isActive;
      // Check if the cause name or description matches the search query.
      const matchesSearch = cause.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           cause.description.toLowerCase().includes(searchQuery.toLowerCase());
      // Check if the cause category matches the filter.
      const matchesCategory = categoryFilter === 'All' || cause.category === categoryFilter;
      return isActive && matchesSearch && matchesCategory;
    }).sort((a, b) => { // Always display featured causes first.
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
    });
  }, [allCauses, searchQuery, categoryFilter]);

  // Derive unique categories from the fetched causes for the filter dropdown.
  const categories = useMemo(() => ['All', ...Array.from(new Set(allCauses.map(c => c.category)))], [allCauses]);
  
  // Combine loading states from both contract calls.
  const isLoading = isLoadingIds || (!!causeIds && causeIds.length > 0 && isLoadingCauses);
  const isError = isErrorIds || isErrorCauses;

  return (
    <>
      {/* Filter UI */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search causes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading || isError}
          />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={categoryFilter} onValueChange={setCategoryFilter} disabled={isLoading || isError}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid for displaying causes, with states for loading, error, and no results. */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
            // Show skeleton loaders while data is being fetched.
            [...Array(8)].map((_, i) => <Skeleton key={i} className="h-96 w-full" />)
        ) : isError || !causeRegistryAddress ? (
            // Show an error message if fetching fails or contract address is missing.
            <div className="col-span-full">
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error Fetching On-Chain Data</AlertTitle>
                    <AlertDescription>Could not fetch cause data from the contract. Ensure your wallet is connected and the contract address is correctly set in your environment variables.</AlertDescription>
                </Alert>
            </div>
        ) : filteredCauses.length === 0 ? (
            // Show a message when no causes match the current filters.
            <div className="col-span-full flex flex-col items-center justify-center py-12">
                <p className="text-lg text-muted-foreground">No active causes found matching your criteria.</p>
                <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(''); setCategoryFilter('All'); }}>Clear Filters</Button>
            </div>
        ) : (
            // Render the CauseCard for each filtered cause.
            filteredCauses.map((cause) => (
                <CauseCard
                    key={cause.id}
                    id={cause.id}
                    name={cause.name}
                    description={cause.description}
                    imageSrc={cause.imageSrc}
                    category={cause.category}
                    fundedPercentage={cause.fundedPercentage}
                    featured={cause.featured}
                />
            ))
        )}
      </div>
    </>
  );
}
