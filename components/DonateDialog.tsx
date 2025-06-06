"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SuccessDialog from './SuccessDialog';

interface DonateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  causeName: string;
}

export default function DonateDialog({ open, onOpenChange, causeName }: DonateDialogProps) {
  const [amount, setAmount] = useState("");
  const [processingDonation, setProcessingDonation] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  const presetAmounts = ["0.01", "0.05", "0.1", "0.25"];
  
  const handleDonate = () => {
    if (!amount) return;
    
    setProcessingDonation(true);
    
    // Simulate processing a blockchain transaction
    setTimeout(() => {
      setProcessingDonation(false);
      onOpenChange(false);
      
      // Show success dialog
      setShowSuccessDialog(true);
    }, 2000);
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center">
              Donate to <span className="text-primary">{causeName}</span>
            </DialogTitle>
            <DialogDescription>
              You are about to support a valuable cause. Every donation makes a difference!
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center space-x-3 py-4">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">
                {causeName.charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="font-medium">{causeName}</h4>
              <p className="text-sm text-muted-foreground">Verified Organization</p>
            </div>
          </div>
          
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="amount">Donation Amount (ETH)</Label>
              <Input 
                id="amount" 
                placeholder="Enter amount in ETH" 
                type="number"
                step="0.01"
                min="0.001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1"
              />
              <div className="grid grid-cols-4 gap-2 mt-2">
                {presetAmounts.map((preset) => (
                  <Button 
                    key={preset} 
                    variant={amount === preset ? "default" : "outline"}
                    onClick={() => setAmount(preset)}
                    className="h-9"
                  >
                    {preset}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={processingDonation}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDonate} 
              disabled={!amount || processingDonation}
              className="min-w-[100px]"
            >
              {processingDonation ? "Processing..." : "Donate with Wallet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <SuccessDialog 
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        causeName={causeName}
        amount={amount}
      />
    </>
  );
}
