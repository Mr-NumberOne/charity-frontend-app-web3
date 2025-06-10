"use client";

import { useState } from "react";
import { PlusCircle, Star, DollarSign, Users, Hash } from "lucide-react";

// Local Project Imports
import { causesData } from "@/lib/data";
import { type Cause } from "@/lib/types";
import { cn } from "@/lib/utils";

// Dialog Component
import { AddCauseContractDialog } from "@/components/dialogs/AddCauseContractDialog";


// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


/**
 * =================================================================================
 * MAIN DASHBOARD PAGE COMPONENT
 * =================================================================================
 */
export default function DashboardPage() {
  const [causes, setCauses] = useState<Cause[]>(causesData);
  const [isContractCauseDialogOpen, setIsContractCauseDialogOpen] = useState(false);

  // Calculate stats from data
  const totalCauses = causes.length;
  const totalRaised = causes.reduce((acc, cause) => acc + cause.raised, 0);
  const totalDonors = causes.reduce((acc, cause) => acc + cause.donorsCount, 0);

  return (
    <TooltipProvider>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setIsContractCauseDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Cause to Contract
            </Button>
          </div>
        </div>
        
        {/* Key Metric Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">ETH {totalRaised.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Across all causes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDonors}</div>
              <p className="text-xs text-muted-foreground">Unique donors across all causes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Causes</CardTitle>
              <Hash className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCauses}</div>
              <p className="text-xs text-muted-foreground">Currently listed from static data</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Causes Table */}
        <Card>
          <CardHeader>
            <CardTitle>Causes Overview</CardTitle>
            <CardDescription>
              This is a list of causes currently sourced from the application's static data.
            </CardDescription>
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
                {causes.map((cause) => (
                  <TableRow key={cause.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Tooltip>
                          <TooltipTrigger>
                            <img 
                              src={cause.imageSrc} 
                              alt={cause.name}
                              className="h-10 w-10 rounded-full object-cover cursor-pointer"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; // prevent infinite loop
                                target.src = 'https://placehold.co/40x40/EEE/31343C?text=?';
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="p-0 border-0">
                            <img
                                  src={cause.imageSrc} 
                                  alt={cause.name}
                                  className="h-48 w-auto rounded-md object-cover"
                                  onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none'; // hide broken image in tooltip
                              }}
                            />
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
                    <TableCell>{cause.goal}</TableCell>
                    <TableCell>{cause.raised}</TableCell>
                    <TableCell>{cause.donorsCount}</TableCell>
                    <TableCell>
                      {cause.featured && <Star className="h-5 w-5 text-yellow-500" />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog for adding a cause to the contract */}
        <AddCauseContractDialog
          isOpen={isContractCauseDialogOpen}
          setIsOpen={setIsContractCauseDialogOpen}
        />
      </div>
    </TooltipProvider>
  );
}
