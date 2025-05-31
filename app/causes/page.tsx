"use client"

import { useState } from 'react';
import Link from 'next/link';
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
import { Search, ChevronDown } from 'lucide-react';

export default function CausesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const causes = [
    {
      id: 1,
      name: "Ocean Cleanup",
      description: "Fighting ocean plastic pollution",
      imageSrc: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg",
      category: "Environment",
      fundedPercentage: 76,
      featured: false,
    },
    {
      id: 2,
      name: "Reforestation Project",
      description: "Planting trees in deforested areas",
      imageSrc: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg",
      category: "Climate Action",
      fundedPercentage: 83,
      featured: true,
    },
    {
      id: 3,
      name: "Clean Water Initiative",
      description: "Providing clean water to rural communities",
      imageSrc: "https://images.pexels.com/photos/1552941/pexels-photo-1552941.jpeg",
      category: "Humanitarian",
      fundedPercentage: 65,
      featured: false,
    },
    {
      id: 4,
      name: "Wildlife Conservation",
      description: "Protecting endangered species",
      imageSrc: "https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg",
      category: "Wildlife",
      fundedPercentage: 42,
      featured: false,
    },
    {
      id: 5,
      name: "Education For All",
      description: "Providing quality education to underprivileged children",
      imageSrc: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
      category: "Education",
      fundedPercentage: 88,
      featured: true,
    },
    {
      id: 6,
      name: "Hunger Relief",
      description: "Providing meals to those in need",
      imageSrc: "https://images.pexels.com/photos/6995212/pexels-photo-6995212.jpeg",
      category: "Humanitarian",
      fundedPercentage: 71,
      featured: false,
    },
    {
      id: 7,
      name: "Renewable Energy",
      description: "Supporting clean energy projects",
      imageSrc: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg",
      category: "Climate Action",
      fundedPercentage: 59,
      featured: false,
    },
    {
      id: 8,
      name: "Healthcare Access",
      description: "Expanding medical services to remote areas",
      imageSrc: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg",
      category: "Healthcare",
      fundedPercentage: 67,
      featured: true,
    }
  ];

  const categories = ['All', 'Environment', 'Climate Action', 'Humanitarian', 'Wildlife', 'Education', 'Healthcare'];
  
  // Filter causes based on search and category
  const filteredCauses = causes.filter(cause => {
    const matchesSearch = cause.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         cause.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || cause.category === categoryFilter;
    return matchesSearch && matchesCategory;
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
          Featured Causes <span className="ml-2 text-primary">❤</span>
        </h1>
        <p className="text-muted-foreground max-w-[700px]">
          Discover impactful projects supporting global communities
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
        <div className="flex justify-end">
          <Button variant="outline" className="flex gap-1 items-center">
            <span>Create Cause</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
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
          <p className="text-lg text-muted-foreground">No causes found matching your criteria.</p>
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