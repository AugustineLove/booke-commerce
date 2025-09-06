import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Download, Eye, Share2, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../contexts/CartContext';
import SEOHead from '../components/Common/SEOHead';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

interface Book {
  id: string;
  title: string;
  slug: string;
  author: string;
  description: string | null;
  price_usd: number;
  price_ghs: number;
  cover_front_url: string | null;
  cover_back_url: string | null;
  pdf_url: string | null;
  preview_pdf_url: string | null;
  isbn: string | null;
  pages: number | null;
  language: string;
  published_date: string | null;
  is_featured: boolean;
  created_at: string;
}

const BookDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState<'USD' | 'GHS'>('USD');
  const { addToCart } = useCart();

  useEffect(() => {
    if (slug) {
      fetchBook(slug);
    }
  }, [slug]);

  const fetchBook = async (bookSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('slug', bookSlug)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      setBook(data);
    } catch (error) {
      console.error('Error fetching book:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!book) return;
    
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

  const handlePreview = () => {
    if (book?.preview_pdf_url) {
      window.open(book.preview_pdf_url, '_blank');
    } else {
      toast.error('Preview not available for this book');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book?.title,
        text: `Check out "${book?.title}" by ${book?.author}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h1>
          <Link
            to="/books"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Browse all books
          </Link>
        </div>
      </div>
    );
  }

  const price = currency === 'USD' ? book.price_usd : book.price_ghs;
  const symbol = currency === 'USD' ? '$' : '₵';

  return (
    <>
      <SEOHead 
        title={`${book.title} by ${book.author}`}
        description={book.description || `Read ${book.title} by ${book.author}. Available for instant digital download.`}
        keywords={`${book.title}, ${book.author}, ebook, digital book`}
        image={book.cover_front_url || undefined}
        type="book"
        author={book.author}
        publishedTime={book.published_date || undefined}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/books"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Books
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Book Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={book.cover_front_url || 'https://images.pexels.com/photos/1261180/pexels-photo-1261180.jpeg?auto=compress&cs=tinysrgb&w=600'}
                alt={`${book.title} - Front Cover`}
                className="w-full h-full object-cover"
              />
            </div>
            {book.cover_back_url && (
              <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={book.cover_back_url}
                  alt={`${book.title} - Back Cover`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">(4.0 out of 5)</span>
              </div>

              {book.is_featured && (
                <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Featured Book
                </div>
              )}
            </div>

            {/* Price and Currency Selector */}
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold text-blue-600">
                {symbol}{price.toFixed(2)}
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'USD' | 'GHS')}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="USD">USD ($)</option>
                <option value="GHS">GHS (₵)</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handlePreview}
                className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <Eye className="h-5 w-5 mr-2" />
                Preview
              </button>
              <button
                onClick={handleShare}
                className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Book Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Book Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {book.isbn && (
                    <div>
                      <span className="font-medium text-gray-700">ISBN:</span>
                      <span className="ml-2 text-gray-600">{book.isbn}</span>
                    </div>
                  )}
                  {book.pages && (
                    <div>
                      <span className="font-medium text-gray-700">Pages:</span>
                      <span className="ml-2 text-gray-600">{book.pages}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-700">Language:</span>
                    <span className="ml-2 text-gray-600">{book.language}</span>
                  </div>
                  {book.published_date && (
                    <div>
                      <span className="font-medium text-gray-700">Published:</span>
                      <span className="ml-2 text-gray-600">
                        {new Date(book.published_date).getFullYear()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {book.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <div className="prose text-gray-700 leading-relaxed">
                    {book.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Digital Download Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Download className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Digital Download</h4>
                  <p className="text-blue-800 text-sm">
                    This is a digital product. After purchase, you'll receive a secure download link 
                    via email. You can download the PDF file immediately and read it on any device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetailPage;