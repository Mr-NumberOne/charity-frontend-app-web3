"use client"

import { useState } from 'react';
import Image from 'next/image';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check } from 'lucide-react';
import SuccessDialog from './SuccessDialog';

interface DonateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  causeName: string;
}

export default function DonateDialog({ open, onOpenChange, causeName }: DonateDialogProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processingDonation, setProcessingDonation] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  const presetAmounts = ["10", "25", "50", "100"];
  
  const handleDonate = () => {
    if (!amount) return;
    
    setProcessingDonation(true);
    
    // Simulate processing
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
              <Label htmlFor="amount">Donation Amount ($)</Label>
              <Input 
                id="amount" 
                placeholder="Enter amount" 
                type="number"
                min="1"
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
                    ${preset}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">Credit/Debit Card</Label>
                  <div className="flex space-x-1">
                    <div className="h-6 w-9 rounded border flex items-center justify-center bg-[#1434CB]">
                      <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 13H14.5V3H9.5V13Z" fill="#FF5F00"/>
                        <path d="M10 8C10 6 11 4.2 12.5 3C11.5 2.2 10.3 1.8 9 1.8C5.7 1.8 3 4.5 3 8C3 11.5 5.7 14.2 9 14.2C10.3 14.2 11.5 13.8 12.5 13C11 11.8 10 10 10 8Z" fill="#EB001B"/>
                        <path d="M21 8C21 11.5 18.3 14.2 15 14.2C13.7 14.2 12.5 13.8 11.5 13C13 11.8 14 10 14 8C14 6 13 4.2 11.5 3C12.5 2.2 13.7 1.8 15 1.8C18.3 1.8 21 4.6 21 8Z" fill="#F79E1B"/>
                      </svg>
                    </div>
                    <div className="h-6 w-9 rounded border flex items-center justify-center bg-[#172B85]">
                      <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 5.8H14.5L15.4 2.3H8.7L9.5 5.8Z" fill="#FFF"/>
                        <path d="M9.5 5.8H13.5L12.7 13.8H8.7L9.5 5.8Z" fill="#FFF"/>
                        <path d="M17.9 2.3L15.4 9.8L14.6 13.8H18.4L21.4 2.3H17.9Z" fill="#FFF"/>
                        <path d="M3 2.3L2.6 4.3L6.9 13.8H10.7L14.6 2.3H3Z" fill="#FFF"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex-1 cursor-pointer">PayPal</Label>
                  <div className="h-6 w-auto rounded">
                    <svg width="64" height="16" viewBox="0 0 64 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M28.4 4.8C28.4 3.4 27.2 2.4 25.5 2.4H22.1C21.8 2.4 21.5 2.7 21.4 3L19.5 14.6C19.5 14.8 19.6 15 19.8 15H21.7C22 15 22.3 14.7 22.4 14.4L22.9 11.1C22.9 10.8 23.2 10.5 23.6 10.5H24.7C26.9 10.5 28.3 9.3 28.7 7.2C28.8 6.4 28.7 5.7 28.4 5.2C28.4 5.1 28.4 4.9 28.4 4.8ZM25.8 7.3C25.6 8.4 24.7 8.4 23.9 8.4H23.3L23.8 5.4C23.8 5.2 24 5.1 24.2 5.1H24.4C25 5.1 25.5 5.1 25.8 5.4C26 5.7 26 6.4 25.8 7.3Z" fill="#009CDE"/>
                      <path d="M37.9 7.2H36C35.8 7.2 35.6 7.3 35.6 7.5L35.5 8L35.4 7.8C35 7.3 34.1 7.1 33.3 7.1C31.4 7.1 29.8 8.5 29.5 10.5C29.3 11.5 29.6 12.4 30.1 13C30.6 13.6 31.4 13.8 32.2 13.8C33.7 13.8 34.6 12.9 34.6 12.9L34.5 13.4C34.5 13.6 34.6 13.8 34.8 13.8H36.5C36.8 13.8 37.1 13.5 37.2 13.2L38.3 7.6C38.3 7.3 38.1 7.2 37.9 7.2ZM35.4 10.5C35.2 11.4 34.5 12 33.6 12C33.1 12 32.7 11.8 32.5 11.5C32.3 11.2 32.2 10.8 32.3 10.3C32.4 9.4 33.2 8.8 34.1 8.8C34.6 8.8 35 9 35.2 9.3C35.4 9.6 35.5 10.1 35.4 10.5Z" fill="#009CDE"/>
                      <path d="M48 7.2H46.1C45.9 7.2 45.7 7.3 45.6 7.5L43 11.2L42 7.6C42 7.4 41.8 7.2 41.5 7.2H39.7C39.5 7.2 39.3 7.4 39.4 7.6L41.3 13.1L39.6 15.6C39.4 15.8 39.6 16.2 39.9 16.2H41.8C42 16.2 42.2 16.1 42.3 15.9L48.3 7.8C48.6 7.6 48.4 7.2 48 7.2Z" fill="#009CDE"/>
                      <path d="M52.4 2.4H50.5C50.2 2.4 49.9 2.7 49.8 3L47.9 14.6C47.9 14.8 48 15 48.2 15H50.2C50.5 15 50.8 14.7 50.9 14.4L52.8 2.8C52.8 2.6 52.6 2.4 52.4 2.4Z" fill="#009CDE"/>
                      <path d="M8.8 4.8C8.8 3.4 7.6 2.4 5.9 2.4H2.5C2.2 2.4 1.9 2.7 1.8 3L0 14.6C0 14.8 0.1 15 0.3 15H2.3C2.5 15 2.7 14.8 2.7 14.6L3.2 11.1C3.2 10.8 3.5 10.5 3.9 10.5H5C7.2 10.5 8.6 9.3 9 7.2C9.1 6.4 9 5.7 8.7 5.2C8.8 5.1 8.8 4.9 8.8 4.8ZM6.2 7.3C6 8.4 5.1 8.4 4.3 8.4H3.7L4.2 5.4C4.2 5.2 4.4 5.1 4.6 5.1H4.8C5.4 5.1 5.9 5.1 6.2 5.4C6.3 5.7 6.3 6.4 6.2 7.3Z" fill="#003087"/>
                      <path d="M18.3 7.2H16.4C16.2 7.2 16 7.3 16 7.5L15.9 8L15.8 7.8C15.4 7.3 14.5 7.1 13.7 7.1C11.8 7.1 10.2 8.5 9.9 10.5C9.7 11.5 10 12.4 10.5 13C11 13.6 11.8 13.8 12.6 13.8C14.1 13.8 15 12.9 15 12.9L14.9 13.4C14.9 13.6 15 13.8 15.2 13.8H16.9C17.2 13.8 17.5 13.5 17.6 13.2L18.7 7.6C18.7 7.3 18.5 7.2 18.3 7.2ZM15.8 10.5C15.6 11.4 14.9 12 14 12C13.5 12 13.1 11.8 12.9 11.5C12.7 11.2 12.6 10.8 12.7 10.3C12.8 9.4 13.6 8.8 14.5 8.8C15 8.8 15.4 9 15.6 9.3C15.8 9.6 15.9 10.1 15.8 10.5Z" fill="#003087"/>
                    </svg>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="crypto" id="crypto" />
                  <Label htmlFor="crypto" className="flex-1 cursor-pointer">Cryptocurrency</Label>
                  <div className="h-6 w-6 rounded">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#627EEA"/>
                      <path d="M12.374 3V9.652L17.9968 12.1672L12.374 3Z" fill="white" fillOpacity="0.6"/>
                      <path d="M12.374 3L6.75 12.1672L12.374 9.652V3Z" fill="white"/>
                      <path d="M12.374 16.4756V21.0001L18.0002 13.2124L12.374 16.4756Z" fill="white" fillOpacity="0.6"/>
                      <path d="M12.374 21.0001V16.4756L6.75 13.2124L12.374 21.0001Z" fill="white"/>
                      <path d="M12.374 15.4297L17.9968 12.1665L12.374 9.65308V15.4297Z" fill="white" fillOpacity="0.2"/>
                      <path d="M6.75 12.1665L12.374 15.4297V9.65308L6.75 12.1665Z" fill="white" fillOpacity="0.6"/>
                    </svg>
                  </div>
                </div>
              </RadioGroup>
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
              {processingDonation ? "Processing..." : "Donate"}
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