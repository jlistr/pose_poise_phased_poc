// ============================================================
// src/types/database.ts
// Matches the EXISTING schema + new PoC migration
// Enum values match the existing subscription_tier enum: FREE, PROFESSIONAL, DELUXE
// In production: npx supabase gen types typescript --linked > src/types/database.ts
// ============================================================

export type SubscriptionTier = 'FREE' | 'PROFESSIONAL' | 'DELUXE';
export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid';
export type ContainerSource = 'manual' | 'ai_generated';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          display_name: string | null;
          username: string | null;
          slug: string | null;
          avatar_url: string | null;
          overline: string | null;
          bio: string | null;
          instagram: string | null;
          tiktok: string | null;
          facebook: string | null;
          twitter: string | null;
          website: string | null;
          hourly_rate: string | null;
          day_rate: string | null;
          services: string | null;
          height_cm: number | null;
          bust_cm: number | null;
          waist_cm: number | null;
          hips_cm: number | null;
          shoe_size: string | null;
          hair_color: string | null;
          eye_color: string | null;
          location: string | null;
          agency: string | null;
          is_public: boolean;
          subscription_tier: SubscriptionTier;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          custom_domain: string | null;
          custom_domain_verified: boolean;
          is_admin: boolean;
          is_active: boolean;
          onboarding_completed: boolean;
          onboarding_step: number;
          onboarding_completed_at: string | null;
          selected_template: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          email?: string | null;
          display_name?: string | null;
          username?: string | null;
          slug?: string | null;
          avatar_url?: string | null;
          overline?: string | null;
          bio?: string | null;
          instagram?: string | null;
          tiktok?: string | null;
          facebook?: string | null;
          twitter?: string | null;
          website?: string | null;
          hourly_rate?: string | null;
          day_rate?: string | null;
          services?: string | null;
          subscription_tier?: SubscriptionTier;
          onboarding_step?: number;
          onboarding_completed_at?: string | null;
        };
        Update: {
          display_name?: string | null;
          username?: string | null;
          slug?: string | null;
          avatar_url?: string | null;
          overline?: string | null;
          bio?: string | null;
          instagram?: string | null;
          tiktok?: string | null;
          facebook?: string | null;
          twitter?: string | null;
          website?: string | null;
          hourly_rate?: string | null;
          day_rate?: string | null;
          services?: string | null;
          height_cm?: number | null;
          bust_cm?: number | null;
          waist_cm?: number | null;
          hips_cm?: number | null;
          shoe_size?: string | null;
          hair_color?: string | null;
          eye_color?: string | null;
          subscription_tier?: SubscriptionTier;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          custom_domain?: string | null;
          custom_domain_verified?: boolean;
          is_admin?: boolean;
          is_active?: boolean;
          is_public?: boolean;
          onboarding_completed?: boolean;
          onboarding_step?: number;
          onboarding_completed_at?: string | null;
          selected_template?: string | null;
        };
      };
      user_features: {
        Row: {
          tier: SubscriptionTier;
          max_portfolio_images: number;
          max_containers: number;
          max_comp_cards: number;
          can_use_custom_domain: boolean;
          can_use_ai_features: boolean;
          can_use_messaging: boolean;
          can_view_analytics: boolean;
          monthly_ai_credits: number;
        };
      };
      containers: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          event_date: string | null;
          photographer_name: string | null;
          photographer_url: string | null;
          is_default: boolean;
          source: ContainerSource;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          event_date?: string | null;
          photographer_name?: string | null;
          photographer_url?: string | null;
          is_default?: boolean;
          source?: ContainerSource;
          sort_order?: number;
        };
        Update: {
          name?: string;
          description?: string | null;
          is_default?: boolean;
          sort_order?: number;
        };
      };
      portfolio_images: {
        Row: {
          id: string;
          user_id: string;
          storage_path: string;
          original_filename: string | null;
          mime_type: string | null;
          file_size_bytes: number | null;
          width: number | null;
          height: number | null;
          upload_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          storage_path: string;
          original_filename?: string | null;
          mime_type?: string | null;
          file_size_bytes?: number | null;
          width?: number | null;
          height?: number | null;
          upload_order?: number;
        };
        Update: {
          storage_path?: string;
          original_filename?: string | null;
          upload_order?: number;
        };
      };
      container_images: {
        Row: {
          container_id: string;
          image_id: string;
          sort_order: number;
          added_at: string;
        };
        Insert: {
          container_id: string;
          image_id: string;
          sort_order?: number;
        };
        Update: {
          sort_order?: number;
        };
      };
      // Legacy tables (from existing migrations — still present)
      photos: {
        Row: {
          id: string;
          profile_id: string;
          url: string;
          thumbnail_url: string | null;
          caption: string | null;
          sort_order: number;
          width: number | null;
          height: number | null;
          size_bytes: number | null;
          created_at: string;
        };
      };
      waitlist: {
        Row: {
          id: string;
          email: string;
          created_at: string | null;
          converted_to_user?: boolean | null;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string | null;
          converted_to_user?: boolean | null;
        };
        Update: {
          email?: string;
          converted_to_user?: boolean | null;
        };
      };
    };
    Functions: {
      generate_slug: {
        Args: { p_display_name: string; p_user_id: string };
        Returns: string;
      };
      has_feature_access: {
        Args: { user_tier: SubscriptionTier; required_tier: SubscriptionTier };
        Returns: boolean;
      };
    };
    Enums: {
      subscription_tier: SubscriptionTier;
      container_source: ContainerSource;
    };
    Views: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// Convenience aliases
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
export type UserFeatures = Database['public']['Tables']['user_features']['Row'];
export type Container = Database['public']['Tables']['containers']['Row'];
export type ContainerInsert = Database['public']['Tables']['containers']['Insert'];
export type PortfolioImage = Database['public']['Tables']['portfolio_images']['Row'];
export type PortfolioImageInsert = Database['public']['Tables']['portfolio_images']['Insert'];
export type ContainerImage = Database['public']['Tables']['container_images']['Row'];
