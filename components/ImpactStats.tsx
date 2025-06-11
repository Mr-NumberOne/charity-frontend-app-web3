"use client";

import { useMemo } from 'react';
import { useReadContracts } from 'wagmi';
import { formatEther, type Address } from 'viem';
import CountUp from 'react-countup';
import { PiggyBank, Users, Handshake } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Local Project Imports
import { CauseRegistryABI } from "@/lib/abi/CauseRegistry";

// Contract configuration
const causeRegistryAddress = process.env.NEXT_PUBLIC_CAUSE_REGISTRY_ADDRESS as Address | undefined;
const causeRegistryContract = {
  address: causeRegistryAddress,
  abi: CauseRegistryABI,
} as const;

/**
 * A component to display live statistics from the contract, such as total raised,
 * total donors, and number of causes, with an animated count-up effect.
 */
export function ImpactStats() {
  const { data: causeIdsResult, isLoading: isLoadingIds } = useReadContracts({
    contracts: [{ ...causeRegistryContract, functionName: 'getAllCauseIds', args: [] }],
  });
  const causeIds = causeIdsResult?.[0]?.result as readonly bigint[] | undefined;

  const { data: causesResult, isLoading: isLoadingCauses } = useReadContracts({
    contracts: causeIds?.map(id => ({ ...causeRegistryContract, functionName: 'getCause', args: [id] })),
    query: { enabled: !!causeIds && causeIds.length > 0 }
  });

  // Memoize the calculation of statistics.
  const stats = useMemo(() => {
    if (!causesResult) return { totalRaised: 0, totalDonors: 0, totalCauses: 0 };
    
    let totalRaised = 0;
    let totalDonors = 0;

    causesResult.forEach(res => {
      const causeData = res.result as any;
      if (causeData) {
        totalRaised += parseFloat(formatEther(causeData.raised));
        totalDonors += Number(causeData.donorsCount);
      }
    });

    return {
      totalRaised,
      totalDonors,
      totalCauses: causesResult.length,
    };
  }, [causesResult]);

  const isLoading = isLoadingIds || (!!causeIds && causeIds.length > 0 && isLoadingCauses);

  if (isLoading) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Skeleton className="h-40 w-full rounded-xl bg-slate-700/50" />
            <Skeleton className="h-40 w-full rounded-xl bg-slate-700/50" />
            <Skeleton className="h-40 w-full rounded-xl bg-slate-700/50" />
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <StatCard 
            icon={<PiggyBank size={36} />}
            label="Total ETH Raised"
            value={stats.totalRaised}
            decimals={4}
            prefix="Ξ "
        />
        <StatCard 
            icon={<Users size={36} />}
            label="Total Donations"
            value={stats.totalDonors}
        />
        <StatCard 
            icon={<Handshake size={36} />}
            label="Causes Supported"
            value={stats.totalCauses}
        />
    </div>
  );
}

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: number;
    prefix?: string;
    decimals?: number;
}

function StatCard({ icon, label, value, prefix, decimals }: StatCardProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/60 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 hover:bg-slate-800">
            <div className="flex justify-center mb-4 text-primary">{icon}</div>
            <h3 className="text-5xl font-bold text-white tracking-tight">
                <CountUp 
                    start={0}
                    end={value}
                    duration={2.75}
                    separator=","
                    decimals={decimals || 0}
                    prefix={prefix || ''}
                />
            </h3>
            <p className="text-slate-400 mt-2 text-sm uppercase tracking-wider">{label}</p>
        </div>
    );
}
