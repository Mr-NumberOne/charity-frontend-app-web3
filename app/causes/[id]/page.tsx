import { notFound } from 'next/navigation';
import CauseClientPage from './client-page'; // Import the new client component

// --- Data Fetching and Generation ---
// In a real app, this data would come from a database or CMS.
// For now, we are defining it here.
const causesData = [
    {
      id: 1, name: "Ocean Cleanup", description: "Fighting ocean plastic pollution and restoring marine ecosystems",
      longDescription: `The Ocean Cleanup is a non-profit organization developing advanced technologies to rid the world's oceans of plastic...`,
      imageSrc: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg", category: "Environment",
      fundedPercentage: 76, goal: 500000, raised: 380000, donors: 1245, daysLeft: 23, website: "https://theoceancleanup.com/",
      updates: [ { id: 1, date: "2025-05-01", title: "New cleanup vessel launched", content: "We're excited to announce that our new cleanup vessel has been deployed in the Great Pacific Garbage Patch." } ]
    },
    {
      id: 2, name: "Reforestation Project", description: "Planting trees in deforested areas",
      longDescription: `The Reforestation Project is dedicated to restoring forests around the globe...`,
      imageSrc: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg", category: "Climate Action",
      fundedPercentage: 83, goal: 200000, raised: 166000, donors: 850, daysLeft: 45, website: "https://onetreeplanted.org/",
      updates: [ { id: 1, date: "2025-05-10", title: "1 Million Trees Planted!", content: "We've reached a major milestone thanks to your support!" } ]
    },
    // Add other cause details here...
];

export async function generateStaticParams() {
  return causesData.map((cause) => ({
    id: cause.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

const getCauseBySlug = (slug: string) => {
  return causesData.find(cause => cause.name.toLowerCase().replace(/\s+/g, '-') === slug);
}

// This is the main Server Component for the page
export default function CausePage({ params }: { params: { id: string } }) {
  const cause = getCauseBySlug(params.id);

  if (!cause) {
    notFound();
  }

  // Pass the fetched cause data as a prop to the Client Component
  return <CauseClientPage cause={cause} />;
}