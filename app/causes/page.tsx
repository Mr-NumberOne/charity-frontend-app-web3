"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import CauseCard from '@/components/CauseCard';
import { Search } from 'lucide-react';
import { causesData } from '@/lib/data'; // Import the centralized data

export default function CausesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const categories = ['All', 'Environment', 'Climate Action', 'Humanitarian', 'Wildlife', 'Education', 'Healthcare'];
  
  // Filter causes to only show active ones, and then apply search and category filters
  const filteredCauses = causesData.filter(cause => {
    const isActive = cause.isActive;
    const matchesSearch = cause.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         cause.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || cause.category === categoryFilter;
    return isActive && matchesSearch && matchesCategory;
  });

  // Group featured causes at the top
  const sortedCauses = [...filteredCauses].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter flex items-center">
          Explore Causes
        </h1>
        <p className="text-muted-foreground max-w-[700px]">
          Discover impactful projects supporting global communities. Find a cause that resonates with you.
        </p>
      </div>
      
      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search causes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Causes Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedCauses.map((cause) => (
          <CauseCard
            key={cause.id}
            name={cause.name}
            description={cause.description}
            imageSrc={cause.imageSrc}
            category={cause.category}
            fundedPercentage={cause.fundedPercentage}
            featured={cause.featured}
          />
        ))}
      </div>
      
      {/* No Results */}
      {sortedCauses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-muted-foreground">No active causes found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('All');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
