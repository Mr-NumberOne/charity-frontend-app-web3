"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, PlusCircle } from 'lucide-react';

const charityFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  mission: z.string().min(10, { message: "Mission must be at least 10 characters" }),
  website: z.string().url({ message: "Please enter a valid URL" }),
  walletAddress: z.string().min(10, { message: "Wallet address is required" }),
  activateNow: z.boolean().default(false),
});

type CharityFormValues = z.infer<typeof charityFormSchema>;

export default function AdminPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const form = useForm<CharityFormValues>({
    resolver: zodResolver(charityFormSchema),
    defaultValues: {
      name: "",
      mission: "",
      website: "",
      walletAddress: "",
      activateNow: false,
    },
  });

  const onSubmit = (data: CharityFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      setShowSuccess(true);
      form.reset();
    }, 1500);
  };

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage charities, donations, and website content</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Charity
        </Button>
      </div>
      
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Create Charity</CardTitle>
              <CardDescription>
                Only admins are allowed to add a new charity organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter charity name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mission</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the charity's mission" 
                            {...field} 
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.org" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="walletAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wallet Address</FormLabel>
                        <FormControl>
                          <Input placeholder="0x000..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="activateNow"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Activate now</FormLabel>
                          <FormDescription>
                            If checked, this charity will be immediately visible on the platform.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : "Add"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Overview of your platform's performance</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">Total Charities</dt>
                  <dd className="text-2xl font-bold">12</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">Active Campaigns</dt>
                  <dd className="text-2xl font-bold">8</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">Total Donations</dt>
                  <dd className="text-2xl font-bold">$24,560</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">Monthly Growth</dt>
                  <dd className="text-lg font-bold text-emerald-600">+12.5%</dd>
                </div>
              </dl>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Detailed Reports</Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xs font-medium text-primary">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Doe donated $50</p>
                    <p className="text-xs text-muted-foreground">to Ocean Cleanup • 2 hours ago</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xs font-medium text-primary">AS</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Alice Smith donated $25</p>
                    <p className="text-xs text-muted-foreground">to Reforestation Project • 4 hours ago</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xs font-medium text-primary">Admin</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">New charity added</p>
                    <p className="text-xs text-muted-foreground">Healthcare Access • 1 day ago</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl">Charity Added</DialogTitle>
              <DialogDescription className="pt-2">
                The charity has been successfully added to the platform.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter className="mt-6 w-full">
              <Button className="w-full" onClick={() => setShowSuccess(false)}>
                Continue
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}