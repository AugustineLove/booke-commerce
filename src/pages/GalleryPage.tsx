import React, { useState } from 'react';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: 'events' | 'behind-scenes' | 'covers' | 'reviews';
}

// Gallery Page Component
const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'events' | 'behind-scenes' | 'covers' | 'reviews'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      title: "Book Signing Event - NYC",
      category: "events"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop",
      title: "Latest Novel Cover",
      category: "covers"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
      title: "Writing Space",
      category: "behind-scenes"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&h=400&fit=crop",
      title: "Literary Festival Reading",
      category: "events"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=600&h=400&fit=crop",
      title: "Fantasy Series Cover",
      category: "covers"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      title: "Morning Writing Routine",
      category: "behind-scenes"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
      title: "5-Star Review Feature",
      category: "reviews"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=400&fit=crop",
      title: "Book Club Visit",
      category: "events"
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=600&h=400&fit=crop",
      title: "Research Notes",
      category: "behind-scenes"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos', count: galleryImages.length },
    { id: 'events', label: 'Events', count: galleryImages.filter(img => img.category === 'events').length },
    { id: 'behind-scenes', label: 'Behind the Scenes', count: galleryImages.filter(img => img.category === 'behind-scenes').length },
    { id: 'covers', label: 'Book Covers', count: galleryImages.filter(img => img.category === 'covers').length },
    { id: 'reviews', label: 'Reviews & Features', count: galleryImages.filter(img => img.category === 'reviews').length }
  ] as const;

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Photo Gallery</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Explore moments from my writing journey, book events, and behind-the-scenes glimpses into the creative process.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 shadow-md'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-[1.02]">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                    <span className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                      {categories.find(cat => cat.id === image.category)?.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for selected image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            
            <div className="bg-white p-6 rounded-b-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
              <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                {categories.find(cat => cat.id === selectedImage.category)?.label}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;