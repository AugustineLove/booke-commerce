import React from 'react';
import BookCard from './BookCard';

interface Book {
  id: string;
  title: string;
  author: string;
  price_usd: number;
  price_ghs: number;
  cover_front_url: string | null;
  description: string | null;
  slug: string;
  is_featured: boolean;
}

interface BookGridProps {
  books: Book[];
  currency?: 'USD' | 'GHS';
  loading?: boolean;
}

const BookGrid: React.FC<BookGridProps> = ({ books, currency = 'USD', loading = false }) => {
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg animate-pulse">
            <div className="aspect-[3/4] bg-gray-300 rounded-t-lg"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-8 bg-gray-300 rounded mt-3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No books found</div>
        <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} currency={currency} />
      ))}
    </div>
  );
};

export default BookGrid;