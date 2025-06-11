"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther, type Address } from 'viem';
import { toast } from '@/hooks/use-toast';

// Local Project Imports
import { CauseRegistryABI } from "@/lib/abi/CauseRegistry";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import SuccessDialog from './SuccessDialog';

// Get the contract address from environment variables.
const causeRegistryAddress = process.env.NEXT_PUBLIC_CAUSE_REGISTRY_ADDRESS as Address | undefined;

// Define the validation schema for the donation form.
const FormSchema = z.object({
  amount: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Amount must be a positive number.",
  }),
});

interface DonateDialogProps {
  causeId: number;
  causeName: string;
  open?: boolean; // Control the dialog's open state from the parent
  onOpenChange?: (open: boolean) => void; // Notify the parent when the open state changes
  triggerButton?: React.ReactNode; // Optional custom trigger button
}

/**
 * A dialog component for making a donation to a specific cause.
 * It handles form validation, transaction submission, and feedback to the user.
 */
export default function DonateDialog({ causeId, causeName, open, onOpenChange, triggerButton }: DonateDialogProps) {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

  // Determine if the dialog is controlled by parent or internally
  const isControlled = open !== undefined && onOpenChange !== undefined;
  const currentOpen = isControlled ? open : internalOpen;
  const setCurrentOpen = isControlled ? onOpenChange : setInternalOpen;

  const { isConnected } = useAccount();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { amount: '' },
  });

  // wagmi hook to send a transaction
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  // wagmi hook to wait for the transaction to be confirmed on the blockchain
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // Function to handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (!causeRegistryAddress) {
      toast({ title: "Error", description: "Contract address is not configured.", variant: "destructive" });
      return;
    }
    // Call the `donateToCause` function on the contract
    writeContract({
      address: causeRegistryAddress,
      abi: CauseRegistryABI,
      functionName: 'donateToCause',
      args: [BigInt(causeId)], // Pass the numeric cause ID
      value: parseEther(data.amount), // The amount to send with the transaction
    }, {
      onSuccess: () => {
        toast({ title: "Transaction Sent!", description: "Waiting for confirmation from your wallet..." });
        form.reset();
      },
      onError: (err) => {
        // Provide user-friendly error messages
        toast({ title: "Transaction Error", description: (err as any)?.shortMessage || err.message, variant: "destructive" });
      }
    });
  };

  // When the transaction is confirmed, close this dialog and show the success dialog.
  useEffect(() => {
    if (isConfirmed) {
      setCurrentOpen(false);
      // Use a timeout to ensure this dialog has time to close before the next one opens.
      setTimeout(() => setShowSuccessDialog(true), 100);
    }
  }, [isConfirmed, setCurrentOpen]);

  return (
    <>
      <Dialog open={currentOpen} onOpenChange={setCurrentOpen}>
        {/*
          FIX: Render a trigger only under specific conditions to avoid duplicates.
          1. If a custom `triggerButton` is provided, use it.
          2. If no `triggerButton` is provided AND the component is NOT controlled by a parent, render a default button.
          This prevents the default button from showing up when the dialog is controlled from `CauseCard`.
        */}
        {triggerButton && <DialogTrigger asChild>{triggerButton}</DialogTrigger>}
        {!triggerButton && !isControlled && (
          <DialogTrigger asChild>
            <Button>Donate</Button>
          </DialogTrigger>
        )}
        <DialogContent className="sm:max-w-[425px]">
          {isConnected ?
            <div>
              <DialogHeader>
                <DialogTitle>Donate to {causeName}</DialogTitle>
                <DialogDescription>
                  Your contribution will directly support this cause. Enter the amount in ETH you'd like to donate.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (ETH)</FormLabel>
                        <FormControl>
                          <Input placeholder="0.1" {...field} type="number" step="0.01" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isPending || isConfirming}>
                    {(isPending || isConfirming) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isConfirming ? 'Confirming Transaction...' : isPending ? 'Check Your Wallet' : 'Submit Donation'}
                  </Button>
                  {error && <p className="text-xs text-destructive text-center">{(error as any).shortMessage}</p>}
                </form>
              </Form>
            </div> :
            <div>
              <DialogHeader>
                <DialogTitle>Before you can donate</DialogTitle>
                <DialogDescription>
                  You have to connect you wallet
                </DialogDescription>
                <Button className='m-auto'>
                  <w3m-button size='xxl' />
                </Button>
              </DialogHeader>
            </div>}
        </DialogContent>
      </Dialog>

      {/* This dialog is shown after a successful transaction confirmation */}
      <SuccessDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog} txHash={hash} />
    </>
  );
}
