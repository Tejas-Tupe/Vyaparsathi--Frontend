export default function formatDate(isoDate) {
  if (!isoDate) return 'N/A';

  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return 'Invalid Date';

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

