import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Award, Users, BookOpen, Star, Heart, Send, ArrowLeft, ArrowRight, Quote, Instagram, Twitter, Facebook } from 'lucide-react';

// Types
interface Book {
  id: number;
  title: string;
  cover: string;
  genre: string;
  year: number;
  rating: number;
  description: string;
}




// About Page Component
const AboutPage: React.FC = () => {
  const achievements = [
    { icon: BookOpen, label: "Books Published", value: "12" },
    { icon: Award, label: "Literary Awards", value: "5" },
    { icon: Users, label: "Happy Readers", value: "50K+" },
    { icon: Star, label: "Average Rating", value: "4.7" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Meet the Author
              </h1>
              <p className="text-xl lg:text-2xl text-indigo-100 mb-8 leading-relaxed">
                Crafting stories that transport readers to extraordinary worlds
              </p>
              <div className="flex space-x-4">
                <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-all transform hover:scale-105">
                  Read Biography
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all">
                  Download Press Kit
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-full overflow-hidden border-8 border-white/20 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Author"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-indigo-900 p-4 rounded-full">
                <Heart className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.value}</div>
                  <div className="text-gray-600 font-medium">{achievement.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Biography Section */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">My Journey</h2>
            <p className="text-xl text-gray-600">From imagination to publication</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="flex items-center mb-8">
              <Quote className="w-12 h-12 text-indigo-600 mr-4" />
              <p className="text-2xl text-gray-700 italic">
                "Every story begins with a single word, but it's the journey that makes it extraordinary."
              </p>
            </div>
            
            <div className="prose prose-lg text-gray-700 leading-relaxed space-y-6">
              <p>
                Welcome to my world of storytelling. I'm a passionate author who believes in the transformative power of literature. 
                My journey began in childhood, where I found solace and adventure within the pages of countless books, sparking a 
                lifelong love affair with the written word.
              </p>
              
              <p>
                Over the past decade, I've had the privilege of crafting stories that span multiple genres, from heart-pounding 
                science fiction to soul-stirring contemporary fiction. Each book represents a piece of my heart, carefully woven 
                with characters who feel like old friends and worlds that readers can call home.
              </p>
              
              <p>
                When I'm not writing, you'll find me exploring new coffee shops, hiking mountain trails, or getting lost in 
                bookstores. I believe that life's experiences fuel creativity, and every conversation, every sunset, every 
                moment of wonder finds its way into my stories.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">Science Fiction</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">Fantasy</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">Contemporary Fiction</span>
              <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">Young Adult</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
