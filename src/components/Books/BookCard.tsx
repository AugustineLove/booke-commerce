import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import toast from 'react-hot-toast';

interface Book {
  id: string;
  title: string;
  author: string;
  price_usd: number;
  price_ghs: number;
  cover_front_url: string | null;
  pdf_path?: string | null;
  description: string | null;
  slug: string;
  is_featured: boolean;
}

interface BookCardProps {
  book: Book;
  currency?: 'USD' | 'GHS';
}

const BookCard: React.FC<BookCardProps> = ({ book, currency = 'USD' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price_usd: book.price_usd,
      price_ghs: book.price_ghs,
      cover_front_url: book.cover_front_url,
    });
    toast.success(`${book.title} added to cart!`);
  };

  const price = currency === 'USD' ? book.price_usd : book.price_ghs;
  const symbol = currency === 'USD' ? '$' : '₵';
  console.log(book.cover_front_url);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
           src={
          book.cover_front_url ||
          'https://cefuzwlpbqlhwfhjgpnh.supabase.co/storage/v1/object/sign/books/covers/front.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lZmQ5MjUzNS0wMzdiLTRjZDgtYWMwYS1lY2JmMTIyZmYxYTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJib29rcy9jb3ZlcnMvZnJvbnQuanBlZyIsImlhdCI6MTc1NzE3MzAzMywiZXhwIjoxNzg4NzA5MDMzfQ.wifbrxTgwV4qhm8UabYRjtKc9p5fUdZIQFIV2pCW_t4'
        } alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {book.is_featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
            <Link
              to={`/books/${book.pdf_path}`}
              className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Eye className="h-4 w-4" />
            </Link>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
              <Link to={`/books/${book.slug}`} className="hover:text-blue-600 transition-colors">
                {book.title}
              </Link>
            </h3>
            <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
          </div>
        </div>

        {book.description && (
          <p className="text-sm text-gray-700 line-clamp-2 mb-3">
            {book.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-blue-600">
            {symbol}{price.toFixed(2)}
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">(4.0)</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;