"use client";

import { useMemo } from "react";
import { Star, DollarSign, Users, Hash, AlertTriangle } from "lucide-react";
import { useReadContracts } from "wagmi";
import { formatEther, type Address } from "viem";

// Local Project Imports
import { type Cause } from "@/lib/types";
import { cn } from "@/lib/utils";
// Corrected ABI import to use the actual exported 'abi'
import { CauseRegistryABI as causeRegistryABI } from "@/lib/abi/CauseRegistry";

// Shadcn UI Components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


// Get the contract address from environment variables
const causeRegistryAddress = process.env.NEXT_PUBLIC_CAUSE_REGISTRY_ADDRESS as Address | undefined;

// Define the contract configuration for wagmi hooks
const causeRegistryContract = {
  address: causeRegistryAddress,
  abi: causeRegistryABI,
} as const;


export function CausesOverview() {
    // 1. First Read: Get all the cause IDs from the contract
    const { data: causeIdsResult, isLoading: isLoadingIds, isError: isErrorIds } = useReadContracts({
        contracts: [
        {
            ...causeRegistryContract,
            functionName: 'getAllCauseIds',
            args: [],
        },
        ],
    });

    const causeIds = causeIdsResult?.[0]?.result as readonly bigint[] | undefined;
    
    // 2. Second Read: Based on the IDs, create a batch call to get each cause's details
    const { data: causesResult, isLoading: isLoadingCauses, isError: isErrorCauses } = useReadContracts({
        contracts: causeIds?.map(id => ({
        ...causeRegistryContract,
        functionName: 'getCause',
        args: [id],
        })),
        // Only run this query if the causeIds have been successfully fetched
        query: {
            enabled: !!causeIds && causeIds.length > 0,
        }
    });
    
    // 3. Transform the contract data into a usable format for the UI
    const causes: Cause[] = useMemo(() => {
        if (!causesResult) return [];
        
        return causesResult.map(res => {
            const causeData = res.result as any;
            if (!causeData) return null; // Handle cases where a cause might not be found
            return {
                id: Number(causeData.id),
                name: causeData.name,
                description: causeData.description,
                longDescription: causeData.longDescription,
                imageSrc: causeData.imageSrc,
                category: causeData.category,
                website: causeData.website,
                goal: parseFloat(formatEther(causeData.goal)),
                raised: parseFloat(formatEther(causeData.raised)),
                donorsCount: Number(causeData.donorsCount),
                walletAddress: causeData.walletAddress,
                isActive: causeData.isActive,
                featured: causeData.featured,
            };
        }).filter((cause): cause is Cause => cause !== null && cause.id > 0);
    }, [causesResult]);


    // 4. Calculate stats from the fetched on-chain data
    const totalCauses = causes.length;
    const totalRaised = causes.reduce((acc, cause) => acc + cause.raised, 0);
    const totalDonors = causes.reduce((acc, cause) => acc + cause.donorsCount, 0);
    
    const isLoading = isLoadingIds || (!!causeIds && causeIds.length > 0 && isLoadingCauses);
    const isError = isErrorIds || isErrorCauses;

    return (
        <div className="space-y-4">
            {/* Key Metric Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {isLoading ? <Skeleton className="h-8 w-3/4" /> : <div className="text-2xl font-bold">ETH {totalRaised.toFixed(2)}</div>}
                    <p className="text-xs text-muted-foreground">Across all causes</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                {isLoading ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold">{totalDonors}</div>}
                <p className="text-xs text-muted-foreground">Unique donors across all causes</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">On-Chain Causes</CardTitle>
                <Hash className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                {isLoading ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold">{totalCauses}</div>}
                <p className="text-xs text-muted-foreground">Currently in the contract</p>
                </CardContent>
            </Card>
            </div>

            {/* Main Causes Table */}
            <Card>
            <CardHeader>
                <CardTitle>On-Chain Causes Overview</CardTitle>
                <CardDescription>This is a live list of causes fetched directly from the smart contract.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Cause</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Goal (ETH)</TableHead>
                    <TableHead>Raised (ETH)</TableHead>
                    <TableHead>Donors</TableHead>
                    <TableHead>Featured</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        [...Array(3)].map((_, i) => (
                            <TableRow key={i}>
                                <TableCell colSpan={7}><Skeleton className="h-10 w-full" /></TableCell>
                            </TableRow>
                        ))
                    ) : isError || !causeRegistryAddress ? (
                        <TableRow>
                            <TableCell colSpan={7}>
                                <Alert variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Error Fetching Data</AlertTitle>
                                    <AlertDescription>Could not fetch cause data from the contract. Ensure your wallet is connected to the correct network and the contract address is set in your environment variables.</AlertDescription>
                                </Alert>
                            </TableCell>
                        </TableRow>
                    ) : causes.length === 0 ? (
                        <TableRow><TableCell colSpan={7} className="text-center">No causes found on the contract.</TableCell></TableRow>
                    ) : (
                        causes.map((cause) => (
                            <TableRow key={cause.id}>
                                <TableCell>
                                    <div className="flex items-center space-x-3">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <img src={cause.imageSrc} alt={cause.name} className="h-10 w-10 rounded-full object-cover cursor-pointer" onError={(e) => { e.currentTarget.src = 'https://placehold.co/40x40/EEE/31343C?text=?'; }}/>
                                        </TooltipTrigger>
                                        <TooltipContent className="p-0 border-0">
                                            <img src={cause.imageSrc} alt={cause.name} className="h-48 w-auto rounded-md object-cover" onError={(e) => { e.currentTarget.style.display = 'none';}}/>
                                        </TooltipContent>
                                    </Tooltip>
                                    <span className="font-medium">{cause.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{cause.category}</TableCell>
                                <TableCell>
                                    <span className={cn("px-2 py-1 rounded-full text-xs", cause.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800")}>
                                    {cause.isActive ? "Active" : "Inactive"}
                                    </span>
                                </TableCell>
                                <TableCell>{cause.goal.toFixed(2)}</TableCell>
                                <TableCell>{cause.raised.toFixed(2)}</TableCell>
                                <TableCell>{cause.donorsCount}</TableCell>
                                <TableCell>{cause.featured && <Star className="h-5 w-5 text-yellow-500" />}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
                </Table>
            </CardContent>
            </Card>
        </div>
    );
}
