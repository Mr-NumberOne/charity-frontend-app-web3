"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useWriteContract, useAccount } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { parseEther, type Address, isAddress } from "viem";
import { AlertCircle } from "lucide-react";

// Local Project Imports
import { type Cause } from "@/lib/types";
import { CauseRegistryABI as causeRegistryABI } from "@/lib/abi/CauseRegistry";
import { useToast } from "@/hooks/use-toast";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// --- CONSTANTS ---
const CATEGORIES = ["Education", "Health", "Environment", "Animal Welfare", "Human Rights", "Disaster Relief"];
const PLACEHOLDER_IMAGE_URL = 'https://placehold.co/600x400/EEE/31343C?text=Invalid+Image+URL';
const causeRegistryAddress = process.env.NEXT_PUBLIC_CAUSE_REGISTRY_ADDRESS as Address | undefined;
const causeIdsQueryKey = ['causeIds', causeRegistryAddress];

// --- ZOD SCHEMA ---
const contractCauseFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().min(10, "Description is too short."),
  longDescription: z.string().optional().default(""),
  imageSrc: z.string().url("Please enter a valid URL."),
  category: z.string({ required_error: "Please select a category." }),
  website: z.string().url("Please enter a valid URL."),
  goal: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Goal must be a positive number (in ETH).",
  }),
  walletAddress: z.custom<Address>(isAddress, {
    message: "Please enter a valid Ethereum wallet address.",
  }),
  isActive: z.boolean().default(true),
  featured: z.boolean().default(false),
});

type ContractCauseFormValues = z.infer<typeof contractCauseFormSchema>;

interface EditCauseContractDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    causeToEdit: Cause | null;
}

export function EditCauseContractDialog({ isOpen, setIsOpen, causeToEdit }: EditCauseContractDialogProps) {
  const { toast } = useToast();
  const { writeContract, isPending } = useWriteContract();
  const { isConnected } = useAccount();
  const queryClient = useQueryClient();

  const form = useForm<ContractCauseFormValues>({
    resolver: zodResolver(contractCauseFormSchema),
  });

  // Pre-fill the form when a cause is selected for editing
  useEffect(() => {
    if (causeToEdit) {
      form.reset({
        ...causeToEdit,
        goal: causeToEdit.goal.toString(), // Convert number back to string for the form
      });
    }
  }, [causeToEdit, form]);

  const [imageError, setImageError] = useState(false);
  const imageSrc = form.watch('imageSrc');

  useEffect(() => { setImageError(false); }, [imageSrc]);

  const onSubmit = (data: ContractCauseFormValues) => {
    if (!causeToEdit) return;
    if (!isConnected) {
        toast({ title: "Wallet Not Connected", description: "Please connect your wallet.", variant: "destructive"});
        return;
    }
    if (!causeRegistryAddress) {
      toast({ title: "Configuration Error", description: "Contract address not defined.", variant: "destructive" });
      return;
    }

    const causeParams = { ...data, goal: parseEther(data.goal) };

    writeContract({
      address: causeRegistryAddress,
      abi: causeRegistryABI,
      functionName: "updateCause",
      args: [BigInt(causeToEdit.id), causeParams], // Pass ID and params object
    }, {
      onSuccess: async (txHash) => {
        toast({ title: "Update Submitted!", description: `Tx: ${txHash.slice(0, 10)}...` });
        setIsOpen(false);
        await queryClient.invalidateQueries({ queryKey: causeIdsQueryKey });
      },
      onError: (err) => {
        toast({ title: "Transaction Error", description: err.message, variant: "destructive" });
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit On-Chain Cause</DialogTitle>
          <DialogDescription>
            Update the details for &quot;{causeToEdit?.name}&quot;. This will submit a transaction and require a gas fee.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-6">
            {!isConnected ? (
                <Alert variant="destructive" className="mt-4"><AlertCircle className="h-4 w-4" /><AlertTitle>Wallet Not Connected</AlertTitle><AlertDescription>Please connect your wallet before you can edit a cause.</AlertDescription></Alert>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                           <FormField control={form.control} name="name" render={({ field }) => ( <FormItem><FormLabel>Cause Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                           <FormField control={form.control} name="category" render={({ field }) => ( <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl><SelectContent>{CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem> )}/>
                        </div>
                        <FormField control={form.control} name="description" render={({ field }) => ( <FormItem><FormLabel>Short Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )}/>
                        <FormField control={form.control} name="longDescription" render={({ field }) => ( <FormItem><FormLabel>Long Description (Optional)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )}/>
                        <FormField control={form.control} name="website" render={({ field }) => ( <FormItem><FormLabel>Website URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                        <FormField control={form.control} name="imageSrc" render={({ field }) => ( <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                        {imageSrc && (<div className="rounded-md overflow-hidden border aspect-video w-full bg-muted"><img src={imageError ? PLACEHOLDER_IMAGE_URL : imageSrc} alt="Image Preview" className="w-full h-full object-cover" onError={() => setImageError(true)}/></div>)}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                           <FormField control={form.control} name="goal" render={({ field }) => ( <FormItem><FormLabel>Goal (ETH)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                           <FormField control={form.control} name="walletAddress" render={({ field }) => ( <FormItem><FormLabel>Donation Wallet Address</FormLabel><FormControl><Input placeholder="0x..." {...field} /></FormControl><FormMessage /></FormItem> )}/>
                        </div>
                        <div className="flex items-center space-x-4 pt-2">
                           <FormField control={form.control} name="isActive" render={({ field }) => ( <FormItem className="flex items-center space-x-2"><FormLabel>Active</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem> )}/>
                           <FormField control={form.control} name="featured" render={({ field }) => ( <FormItem className="flex items-center space-x-2"><FormLabel>Featured</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem> )}/>
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isPending || !causeRegistryAddress || !isConnected}>{isPending ? "Submitting Update..." : "Update Cause"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}