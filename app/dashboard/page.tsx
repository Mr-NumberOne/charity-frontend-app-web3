"use client";

import { useState } from "react";
import { Lock, ShieldAlert, PlusCircle } from 'lucide-react';

// Local Project Imports
import { useIsOwner } from "@/hooks/useIsOwner";
import { CausesOverview } from "@/components/dashboard/CausesOverview";
import { AddCauseContractDialog } from "@/components/dialogs/AddCauseContractDialog";
import { EditCauseContractDialog } from "@/components/dialogs/EditCauseContractDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Cause } from "@/lib/types";

/**
 * The main dashboard page, protected using the `useIsOwner` hook.
 */
export default function DashboardPage() {
    // Use our custom hook to get the ownership status.
    const { isOwner, isLoading, isError } = useIsOwner();
    
    // State for dialogs
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [causeToEdit, setCauseToEdit] = useState<Cause | null>(null);

    const handleEditClick = (cause: Cause) => {
        setCauseToEdit(cause);
        setIsEditDialogOpen(true);
    };

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
            <>
                <div className="container py-6 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <Button onClick={() => setIsAddDialogOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Cause
                        </Button>
                    </div>
                    <Tabs defaultValue="overview">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="pt-4">
                            <CausesOverview onEditCause={handleEditClick} />
                        </TabsContent>
                        <TabsContent value="settings">
                            {/* Settings components will go here */}
                        </TabsContent>
                    </Tabs>
                </div>
                
                {/* Dialogs */}
                <AddCauseContractDialog isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen} />
                <EditCauseContractDialog isOpen={isEditDialogOpen} setIsOpen={setIsEditDialogOpen} causeToEdit={causeToEdit} />
            </>
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