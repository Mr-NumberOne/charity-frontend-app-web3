import ClientPage from './client-page';

interface CauseDetailPageProps {
  params: {
    // The `id` from the URL, which will be a string.
    id: string;
  };
}

/**
 * This is the server component for the cause detail page.
 * Its primary job is to extract the `id` from the URL parameters,
 * convert it to a number, and pass it to the corresponding client component
 * which will handle the actual data fetching and rendering.
 */
export default function CauseDetailPage({ params }: CauseDetailPageProps) {
  // The ID from the dynamic route is a string, so we convert it to a number.
  const causeId = Number(params.id);

  // Render the client-side page, passing the numeric cause ID as a prop.
  return <ClientPage causeId={causeId} />;
}