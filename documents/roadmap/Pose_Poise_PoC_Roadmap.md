# Pose & Poise Studio: Proof of Concept Roadmap (v1.1)

**Date**: April 2026
**Status**: Confidential Internal Use Only

-----

## Executive Summary

This document outlines a phased development plan for Pose & Poise Studio, a multi-tenant SaaS platform designed for professional models, photographers, and creative artists. The platform focuses on AI-enhanced portfolio management, composite cards, and content curation. The roadmap is divided into four tiers of increasing complexity.

### Roadmap Tiers at a Glance

| Tier                             | Phases   | Focus                                       | Key Outcome                                       |
| :------------------------------- | :------- | :------------------------------------------ | :------------------------------------------------ |
| **Project Bootstrap**            | 0        | Next.js, Supabase, Stripe, legacy migration | A deployable app skeleton with connected services |
| **Core Platform & Monetization** | 1A - 2.5 | Auth, DB, Stripe, tier gates                | A paying PRO user with enforced feature limits    |
| **Core User Workflows**          | 3 - 6    | Portfolio, comp cards, PDF export           | A publishable portfolio and print-ready comp card |
| **Progressive AI Feature Flags** | 7 - 11   | LLM copy, vision analysis, CLIP vectors     | AI-curated portfolios with image clustering       |

-----

## Tier 0: Project Bootstrap

This tier establishes the development environment and migrates vetted assets from legacy code to ensure a solid foundation for future features.

### Phase 0: Project Scaffolding & Legacy Migration

  * **Application Scaffold**: Initialize Next.js 14+ with App Router, TypeScript, and Tailwind CSS. Establish a standard folder structure (src/app, src/components, etc.) and configure linting/formatting.
  * **Legacy Migration Audit**: Evaluate legacy files for App Router compatibility and dependency requirements. JS files must be converted to TS during this process.
  * **Migration Assets**:
      * **Landing Page**: Refactor hero section and layout for App Router.
      * **CSS**: Merge global styles and animations into Tailwind config and `globals.css`.
      * **Components**: Convert UI primitives (buttons, cards) to client components where necessary.
      * **Static Assets**: Optimize logos and photography; place in `/public/`.
  * **Design System**: Set a global color palette (cream, charcoal, camel) and a "sharp-edge" aesthetic with `border-radius: 0`. Use Cormorant Garamond for headings and Outfit for body text.
  * **Service Setup**:
      * **Supabase**: Initialize project, configure Auth middleware, and create a private storage bucket.
      * **Stripe**: Configure test mode, create a "PRO" product, and set up initial webhook endpoints.
      * **CI/CD**: Connect repository to Vercel/Netlify for preview and production deployments.

-----

## Tier 1: Core Platform & Monetization

Establishing the infrastructure for authentication, billing, and storage.

### Phase 1A: Zero-to-Auth PoC

  * **Authentication Flow**: Implement Supabase magic link login to prove out the end-to-end user registration and session management.

### Phase 1B: Database & Storage Infrastructure

  * **Foundation Setup**: Ensure the underlying database tables, columns, and storage folder(s) are actively in place and verified.
  * **RLS Policies & Limits**: Implement and test robust Row Level Security (RLS) policies. These policies must strictly limit the user's image upload to exactly ten (10) images, and no more.

### Phase 1C: Onboarding Component & Workflow

  * **Wizard Construction**: Build the multi-step onboarding wizard to collect the user data.
  * **Basic Portfolio Routing**: At the end of the onboarding process on the ABOUT section, navigate the user to a very basic portfolio page that just shows the information and images collected from the onboarding process. (We will add in the bells and whistles in a later phase).

### Phase 2 & 2.5: Monetization and Tier Enforcement

  * **Stripe Integration**: Enable a "Upgrade to PRO" flow that mutates the user's subscription tier via webhooks.
  * **PRO Benefits**: Increased image cap (100), premium layouts, comp card creation, and PDF exports.
  * **Tier Enforcement**: A dedicated verification phase to ensure the `user_features` table correctly gates all features.

-----

## Tier 2: Core User Workflows

Building primary user-facing features for portfolio and professional asset creation.

### Phase 3 & 4: Portfolio Management

  * **Creation & Preview**: PRO users can select images and choose from layout templates (grid, editorial, lookbook).
  * **Publishing**: Includes a public URL (e.g., `poseandpoise.studio/username`) with SEO meta tags and a draft/publish toggle.

### Phase 5 & 6: Composite Cards

  * **Digital Comp Cards**: Shareable layouts featuring headshots, body shots, and professional measurements (height, bust, waist, etc.).
  * **Print-Ready Export**: PRO-only feature to export comp cards as 300 DPI PDFs with CMYK-safe colors and bleed margins for physical printing.

-----

## Tier 3: Progressive AI Feature Flags

AI features are deployed behind flags and require PRO-tier access.

  * **Phase 7 (AI Content Curator)**: Generates brand voice-aligned bios and taglines from a brief questionnaire.
  * **Phase 8 (AI Hero Identification)**: Uses vision APIs (Claude Vision/GPT-4o) to suggest the strongest headshot or leading image.
  * **Phase 9 (AI Layout Recommendation)**: Analyzes image aspect ratios and user goals to recommend optimal portfolio templates.
  * **Phase 10 (AI Image Curation)**: Multi-image reasoning to evaluate style coherence and variety. *Requires \~20+ images.*
  * **Phase 11 (AI Vector Similarity)**: Generates CLIP embeddings stored via `pgvector` for likeness grouping and diversity selection. *Requires \~30-50 images.*

-----

## Appendix: Phase Dependency Map

| Phase             | Depends On   | Feeds Into       |
| :---------------- | :----------- | :--------------- |
| 0 (Bootstrap)     | (Foundation) | 1A, 1B, 2        |
| 1A (Auth)         | 0            | 1B, 2            |
| 1B (Infrastructure)| 1A          | 1C               |
| 1C (Onboarding)   | 1A, 1B       | 2, 3, 5          |
| 2 (Monetization)  | 0, 1A        | 2.5              |
| 2.5 (Enforcement) | 2            | 3, 4, 5, 6, 7-11 |
| 5 (Comp Card)     | 1C, 2.5      | 6                |
| 9 (AI Layout)     | 3, 7, 8      | 10               |

