import React, { useEffect, useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { supabase } from '../lib/supabase';
import BookGrid from '../components/Books/BookGrid';
import SEOHead from '../components/Common/SEOHead';

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

interface Category {
  id: string;
  name: string;
  slug: string;
}

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [currency, setCurrency] = useState<'USD' | 'GHS'>('USD');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, selectedCategory, sortBy]);

  const fetchBooks = async () => {
  setLoading(true);
  try {
    // Build query (but don't await yet)
    let query = supabase
      .from('books')
      .select('*')
      .eq('is_active', true);

    if (searchTerm) {
      query = query.or(
        `title.ilike.%${searchTerm}%,author.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
      );
    }

    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory);
    }

    // Sorting
    switch (sortBy) {
      case 'price_low':
        query = query.order('price_usd', { ascending: true });
        break;
      case 'price_high':
        query = query.order('price_usd', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      default:
        query = query.order('title', { ascending: true });
    }

    // Execute the query
    const { data: books, error } = await query;
    if (error) throw error;

    const { data: list, error: listError } = await supabase
  .storage
  .from('books')
  .list('covers');

    if(error){
      console.error('Error listing covers:', listError);
    }
    else{
      console.log('Covers in storage:', list);
    }


     // Attach signed URL to each book
    const booksWithUrls = await Promise.all(
      books.map(async (book) => {
        const { data: front, error: frontErr } = await supabase.storage
          .from('books')
          .createSignedUrl(book.cover_front_url, 60);
        console.log(`frontErr for ${book.title} signed ${book.cover_front_url}:`, frontErr);
        console.log(`${front}`)
        return {
          ...book,
          cover_front_url: !frontErr ? front.signedUrl : null,
        };
      })
    );

    setBooks(booksWithUrls);
  } catch (error) {
    console.error('Error fetching books:', error);
  } finally {
    setLoading(false);
  }
};

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <>
      <SEOHead 
        title="Books - Browse Our Complete Collection"
        description="Browse our complete collection of digital books. Find your next great read from our curated selection of fiction, non-fiction, and specialty titles."
        keywords="books, ebooks, digital books, browse books, book catalog, literature"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse Books
          </h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of digital books available for instant download
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-center">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search books, authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="title">Sort by Title</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>

            {/* Currency */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'USD' | 'GHS')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="USD">USD ($)</option>
              <option value="GHS">GHS (₵)</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${books.length} book${books.length !== 1 ? 's' : ''} found`}
          </p>
          {searchTerm && (
            <p className="text-sm text-gray-500">
              Search results for "{searchTerm}"
            </p>
          )}
        </div>

        {/* Books Grid/List */}
        <BookGrid books={books} currency={currency} loading={loading} />
      </div>
    </>
  );
};

export default BooksPage;