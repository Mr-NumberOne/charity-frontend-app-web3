"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

// Dialog Component
import { AddCauseContractDialog } from "@/components/dialogs/AddCauseContractDialog";
// New Dashboard Component
import { CausesOverview } from "@/components/dashboard/CausesOverview";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

// Get the contract address from environment variables
const causeRegistryAddress = process.env.NEXT_PUBLIC_CAUSE_REGISTRY_ADDRESS;

/**
 * =================================================================================
 * MAIN DASHBOARD PAGE COMPONENT
 * =================================================================================
 */
export default function DashboardPage() {
  const [isContractCauseDialogOpen, setIsContractCauseDialogOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setIsContractCauseDialogOpen(true)} disabled={!causeRegistryAddress}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Cause to Contract
            </Button>
          </div>
        </div>
        
        {/* Render the self-contained overview component */}
        <CausesOverview />

        {/* Dialog for adding a cause to the contract */}
        <AddCauseContractDialog
          isOpen={isContractCauseDialogOpen}
          setIsOpen={setIsContractCauseDialogOpen}
        />
      </div>
    </TooltipProvider>
  );
}
