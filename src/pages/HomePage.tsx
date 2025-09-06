import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Download, Shield, Users } from 'lucide-react';
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

const HomePage: React.FC = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  const fetchFeaturedBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('is_featured', true)
        .eq('is_active', true)
        .limit(4);

      if (error) throw error;
      setFeaturedBooks(data || []);
    } catch (error) {
      console.error('Error fetching featured books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead 
        title="BookStore - Discover Amazing Books"
        description="Discover incredible stories and knowledge through our carefully curated collection of digital books. Instant downloads available."
        keywords="bookstore, digital books, ebooks, literature, fiction, author books"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Discover Your Next
                <span className="block text-yellow-400">Great Read</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Explore our curated collection of digital books available for instant download. 
                From captivating fiction to insightful non-fiction, find your perfect book today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/books"
                  className="inline-flex items-center bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Browse Books
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Stack of books"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our BookStore?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the best reading experience with instant access to quality books
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Download</h3>
              <p className="text-gray-600">
                Get your books immediately after purchase. No waiting, no shipping delays.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Your transactions are protected with industry-standard security measures.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Content</h3>
              <p className="text-gray-600">
                Carefully curated books from talented authors across various genres.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                Join thousands of readers discovering amazing stories every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      {featuredBooks.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Featured Books
                </h2>
                <p className="text-xl text-gray-600">
                  Hand-picked selections from our collection
                </p>
              </div>
              <Link
                to="/books"
                className="hidden sm:inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
              >
                View All Books
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <BookGrid books={featuredBooks} loading={loading} />

            <div className="text-center mt-8 sm:hidden">
              <Link
                to="/books"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Books
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Author Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Author"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet the Author
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Welcome to my literary world! I'm passionate about crafting stories that inspire, 
                educate, and entertain. Each book in this collection represents hours of research, 
                writing, and dedication to bringing you quality content.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Whether you're looking for thought-provoking non-fiction or engaging fiction, 
                you'll find something here that resonates with your interests and curiosities.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Learn More About Me
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Be the first to know about new releases, special offers, and exclusive content.
          </p>
          <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default HomePage;