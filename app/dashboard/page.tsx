"use client";

import { Lock, ShieldAlert } from 'lucide-react';

// Local Project Imports
import { useIsOwner } from "@/hooks/useIsOwner"; // Import the new custom hook
import { CausesOverview } from "@/components/dashboard/CausesOverview";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * The main dashboard page, protected using the `useIsOwner` hook.
 */
export default function DashboardPage() {
    // Use our new custom hook to get the ownership status.
    // All the complex logic is now cleanly abstracted away.
    const { isOwner, isLoading, isError } = useIsOwner();

    // Show a loading skeleton while the ownership check is in progress.
    if (isLoading) {
        return <DashboardSkeleton />;
    }

    // Show a generic error message if the hook reports an error.
    if (isError) {
        return (
            <div className="container py-10">
                <Alert variant="destructive">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle>Contract Error</AlertTitle>
                    <AlertDescription>
                        Could not verify ownership. Please ensure the contract address is set and you are connected to the correct network.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    // If the user is the owner, render the admin dashboard components.
    if (isOwner) {
        return (
            <div className="container py-6">
                <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
                <CausesOverview />
            </div>
        );
    }

    // If the user is not the owner, render the "Access Denied" message.
    return (
        <div className="container py-20 flex flex-col items-center justify-center text-center">
            <Lock className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground mt-2 max-w-md">
                This dashboard is restricted to the contract owner. Please connect with the owner's wallet to gain access.
            </p>
        </div>
    );
}

// A simple skeleton component for the loading state.
function DashboardSkeleton() {
    return (
        <div className="container py-6 space-y-4">
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-64 w-full" />
        </div>
    );
}
