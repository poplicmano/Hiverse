# Hiverse Discord Community Website - Design Guidelines

## Design Approach
**Reference-Based Approach**: Gaming/Discord community aesthetic with professional multiverse theme. Drawing inspiration from Discord's own branding, Riot Games' web presence, and premium gaming community sites. Focus on sleek, dark interfaces with strategic accent lighting.

## Color Palette
- **Primary Colors**: Dark blue, blue, and black
- **Accent**: Subtle blue aura effects (no flashy rainbow)
- **Background**: Dark galaxy/multiverse aesthetic
- **Contrast**: Minimal glow effects for CTAs and borders

## Typography
- **Primary Font**: Modern sans-serif for headings (e.g., Inter, Poppins via Google Fonts CDN)
- **Body Font**: Clean, readable sans-serif
- **Hiverse Name**: Sleek, bold typography for main branding
- **Hierarchy**: Clear distinction between section headings, card titles, and body text

## Layout System
- **Spacing**: Use Tailwind units of 4, 6, 8, 12, 16 for consistent rhythm (p-4, m-8, gap-6, etc.)
- **Container**: Max-width containers for content sections (max-w-7xl)
- **Grid**: Card-based layouts for Giveaways and Features sections

## Component Library

### Navigation
- **Fixed navbar** with centered circular logo
- **Navigation links** split left and right of logo
- **Blue aura effect** around logo (subtle, not overwhelming)
- Links: Home, About, Giveaways, Features, Join Us
- Responsive: Hamburger menu on mobile, logo remains centered
- Subtle hover effects on links

### Hero Section (Home)
- **Background**: Dark galaxy/multiverse with subtle particle effects
- **Layout**: Centered content with Hiverse name and CTA
- **Animation**: Smooth entrance animation, optional subtle parallax
- **CTA Button**: "Join Now" with minimal glow effect
- **Link**: https://discord.gg/JQ9RyTvE8w

### Profile Cards (About Section)
- **Owners**: Kuzma and Hamza
- **Style**: Round profile images with minimal glow border
- **Content**: Name, role ("Founder of Hiverse"), short description
- **Layout**: Side-by-side cards, clean spacing
- **Editable**: Data should be easily modifiable in code

### Giveaway Cards
- **Card Structure**: Image, title, description, "Join Giveaway" button
- **Layout**: Grid of cards (2-3 columns on desktop, single column mobile)
- **Status**: Visual distinction between active and past giveaways
- **Design**: Clean, professional, matching theme

### Admin Panel
- **Access**: Hidden "Giveaways Admin" button in footer (bottom-left)
- **Authentication**: Password popup (password: Hiverse2025)
- **Functions**: 
  - Add New Giveaway (title, description, image URL, end date/time)
  - End Giveaway (list active giveaways with end button)
- **Design**: Minimal, matching professional theme
- **Integration**: Discord webhook notifications on add/end actions

### Features Section
- **Content**: Active Community, Frequent Giveaways, Events & Contests, Partnership Opportunities, Multiverse-Themed Ranks & Roles
- **Layout**: Grid/cards with small icons
- **Styling**: Subtle accent colors, clean presentation

### Discord Invite Popup
- **Trigger**: Every 10 minutes
- **Position**: Bottom-left corner
- **Content**: Server name, member count, online members, "Join Now" button
- **Animation**: Subtle fade-in/out
- **Design**: Minimal, non-intrusive
- **Link**: https://discord.gg/JQ9RyTvE8w

## Animations & Interactions
- **Navbar**: Subtle hover effects on links
- **Buttons**: Minimal glow for CTAs
- **Hero**: Smooth entrance animation
- **Particles**: Subtle background movement
- **Popup**: Fade-in/out animations
- **Overall**: Professional, smooth transitions - avoid over-the-top effects

## Icons
Use Heroicons via CDN for feature icons and UI elements

## Images
- **Profile Images**: Circular avatars for founders (Kuzma and Hamza)
- **Giveaway Images**: Each giveaway card includes an image
- **Background**: Dark galaxy/multiverse texture for hero section
- **No large hero image** - using particle effect background instead

## Responsive Behavior
- **Desktop**: Full navbar with split links, multi-column grids
- **Tablet**: 2-column layouts, adjusted spacing
- **Mobile**: Hamburger menu, single-column layouts, logo stays centered, touch-friendly buttons

## Key Principles
- **Professional over flashy**: Sleek, clean aesthetic
- **Subtle effects**: Minimal glows, no disco vibes
- **Dark theme**: Maintain multiverse aesthetic throughout
- **Smooth UX**: Professional transitions and interactions
- **Hidden functionality**: Admin features invisible to regular users