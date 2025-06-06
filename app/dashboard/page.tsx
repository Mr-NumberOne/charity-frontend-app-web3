"use client"

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, PlusCircle, Edit, Search, HandCoins, ListChecks, CircleCheck, CircleX } from 'lucide-react';
import { causesData as initialCausesData } from '@/lib/data'; // Import the centralized data
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label'; // Added this import

// --- Types and Schemas ---
const charityFormSchema = z.object({
  id: z.number().optional(), // Keep track of the ID for editing
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Short description is required."}),
  longDescription: z.string().min(20, { message: "Detailed description is required." }),
  category: z.string().min(1, { message: "Category is required."}),
  walletAddress: z.string().min(10, { message: "Wallet address is required" }),
  website: z.string().url({ message: "Please enter a valid URL" }),
  imageSrc: z.string().url({ message: "Please enter a valid image URL" }),
  isActive: z.boolean().default(false),
});

type CharityFormValues = z.infer<typeof charityFormSchema>;

// Define a type for your cause data for better type safety
type Cause = typeof initialCausesData[0];

export default function DashboardPage() {
  // --- State Management ---
  const [charities, setCharities] = useState<Cause[]>(initialCausesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCharities, setFilteredCharities] = useState<Cause[]>(initialCausesData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCharity, setSelectedCharity] = useState<Cause | null>(null);

  const form = useForm<CharityFormValues>({
    resolver: zodResolver(charityFormSchema),
  });

  // --- Calculated Stats ---
  const stats = useMemo(() => {
    const totalDonations = charities.reduce((acc, cause) => acc + cause.raised, 0);
    const totalCharities = charities.length;
    const activeCharities = charities.filter(c => c.isActive).length;
    const inactiveCharities = totalCharities - activeCharities;
    return { totalDonations, totalCharities, activeCharities, inactiveCharities };
  }, [charities]);

  // --- Effects ---
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = charities.filter(cause => 
      cause.name.toLowerCase().includes(lowercasedQuery) ||
      cause.category.toLowerCase().includes(lowercasedQuery) ||
      cause.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredCharities(filtered);
  }, [searchQuery, charities]);

  // --- Handlers ---
  const handleAddNew = () => {
    form.reset({
      name: "", description: "", longDescription: "", category: "",
      walletAddress: "", website: "", imageSrc: "", isActive: false
    });
    setSelectedCharity(null);
    setIsEditDialogOpen(true);
  };
  
  const handleEdit = (charity: Cause) => {
    setSelectedCharity(charity);
    form.reset(charity);
    setIsEditDialogOpen(true);
  };

  const handleToggleActive = (charityId: number, isActive: boolean) => {
    setCharities(prev => prev.map(c => c.id === charityId ? { ...c, isActive } : c));
  };
  
  const onSubmit = (data: CharityFormValues) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (selectedCharity) {
        setCharities(prev => prev.map(c => c.id === selectedCharity.id ? { ...c, ...data } : c));
      } else {
        const newCharity = { ...data, id: Date.now(), fundedPercentage: 0, goal: 50000, raised: 0, donors: 0, daysLeft: 30, updates: [] , featured: false};
        setCharities(prev => [newCharity, ...prev]);
      }
      
      setIsSubmitting(false);
      setIsEditDialogOpen(false);
      setShowSuccess(true);
    }, 1500);
  };

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage charities, donations, and website content</p>
        </div>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Charity
        </Button>
      </div>

      {/* General Stats Section */}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <HandCoins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalDonations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all charities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Charities</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCharities}</div>
            <p className="text-xs text-muted-foreground">Managed on the platform</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Charities</CardTitle>
            <CircleCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCharities}</div>
            <p className="text-xs text-muted-foreground">Currently accepting donations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Charities</CardTitle>
            <CircleX className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inactiveCharities}</div>
            <p className="text-xs text-muted-foreground">Not currently visible</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Manage Charities</CardTitle>
            <CardDescription>View, edit, or toggle the status of existing charities.</CardDescription>
            <div className="relative pt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, category, or description..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCharities.map((cause) => (
              <Card key={cause.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-video">
                  <Image src={cause.imageSrc} alt={cause.name} fill className="object-cover" />
                  <Badge variant="secondary" className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">{cause.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="truncate">{cause.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{cause.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Raised</span>
                      <span className="font-medium">${cause.raised.toLocaleString()}</span>
                    </div>
                    <Progress value={cause.fundedPercentage} className="h-2" />
                     <p className="text-xs text-muted-foreground text-right mt-1">{cause.fundedPercentage}% of ${cause.goal.toLocaleString()}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center gap-2 bg-muted/50 p-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`active-switch-${cause.id}`}
                      checked={cause.isActive}
                      onCheckedChange={(checked) => handleToggleActive(cause.id, checked)}
                    />
                    <Label htmlFor={`active-switch-${cause.id}`} className="text-sm">{cause.isActive ? "Active" : "Inactive"}</Label>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(cause)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
           {filteredCharities.length === 0 && (
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                <p>No charities found for "{searchQuery}"</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
      
      {/* Edit/Create Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{selectedCharity ? 'Edit Charity' : 'Add New Charity'}</DialogTitle>
            <DialogDescription>
              {selectedCharity ? 'Update the details for this charity.' : 'Fill out the form to add a new charity to the platform.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
              <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Name</FormLabel> <FormControl><Input placeholder="Enter charity name" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
              <FormField control={form.control} name="description" render={({ field }) => ( <FormItem> <FormLabel>Short Description</FormLabel> <FormControl><Input placeholder="A short, catchy description" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
              <FormField control={form.control} name="longDescription" render={({ field }) => ( <FormItem> <FormLabel>Detailed Description</FormLabel> <FormControl><Textarea placeholder="Describe the charity's mission in detail" {...field} className="min-h-[120px]"/></FormControl> <FormMessage /> </FormItem> )}/>
              <FormField control={form.control} name="category" render={({ field }) => ( <FormItem> <FormLabel>Category</FormLabel> <FormControl><Input placeholder="e.g., Environment, Healthcare" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
              <FormField control={form.control} name="website" render={({ field }) => ( <FormItem> <FormLabel>Website</FormLabel> <FormControl><Input placeholder="https://example.org" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
              <FormField control={form.control} name="imageSrc" render={({ field }) => ( <FormItem> <FormLabel>Image URL</FormLabel> <FormControl><Input placeholder="https://images.pexels.com/..." {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
              <FormField control={form.control} name="walletAddress" render={({ field }) => ( <FormItem> <FormLabel>Wallet Address</FormLabel> <FormControl><Input placeholder="0x000..." {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
              <FormField control={form.control} name="isActive" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"> <div className="space-y-0.5"> <FormLabel>Status</FormLabel> <FormDescription>Activate this charity to make it visible to users.</FormDescription> </div> <FormControl><Switch checked={field.value} onCheckedChange={field.onChange}/></FormControl> </FormItem> )}/>
              <DialogFooter className="pt-4 sticky bottom-0 bg-background/95 pb-4">
                <Button variant="outline" type="button" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>) : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="rounded-full bg-green-100 p-3 mb-4"><CheckCircle2 className="h-12 w-12 text-primary" /></div>
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl">Success!</DialogTitle>
              <DialogDescription className="pt-2">The charity information has been updated.</DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 w-full"><Button className="w-full" onClick={() => setShowSuccess(false)}>Continue</Button></DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
