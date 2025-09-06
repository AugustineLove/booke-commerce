import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      books: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          author: string
          category_id: string | null
          price_usd: number
          price_ghs: number
          cover_front_url: string | null
          cover_back_url: string | null
          pdf_url: string | null
          preview_pdf_url: string | null
          isbn: string | null
          pages: number | null
          language: string
          published_date: string | null
          is_featured: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          author: string
          category_id?: string | null
          price_usd?: number
          price_ghs?: number
          cover_front_url?: string | null
          cover_back_url?: string | null
          pdf_url?: string | null
          preview_pdf_url?: string | null
          isbn?: string | null
          pages?: number | null
          language?: string
          published_date?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          author?: string
          category_id?: string | null
          price_usd?: number
          price_ghs?: number
          cover_front_url?: string | null
          cover_back_url?: string | null
          pdf_url?: string | null
          preview_pdf_url?: string | null
          isbn?: string | null
          pages?: number | null
          language?: string
          published_date?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          email: string
          full_name: string
          total_amount: number
          currency: string
          status: string
          payment_method: string | null
          payment_intent_id: string | null
          payment_reference: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          email: string
          full_name: string
          total_amount: number
          currency: string
          status?: string
          payment_method?: string | null
          payment_intent_id?: string | null
          payment_reference?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          email?: string
          full_name?: string
          total_amount?: number
          currency?: string
          status?: string
          payment_method?: string | null
          payment_intent_id?: string | null
          payment_reference?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}