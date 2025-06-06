import { notFound } from 'next/navigation';
import CauseClientPage from './client-page';
import { causesData } from '@/lib/data'; // Import the centralized data

export async function generateStaticParams() {
  return causesData.map((cause) => ({
    id: cause.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

const getCauseBySlug = (slug: string) => {
  return causesData.find(cause => cause.name.toLowerCase().replace(/\s+/g, '-') === slug);
}

export default function CausePage({ params }: { params: { id: string } }) {
  const cause = getCauseBySlug(params.id);

  if (!cause) {
    notFound();
  }

  return <CauseClientPage cause={cause} />;
}