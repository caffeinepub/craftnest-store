# CraftNest Store

## Current State
New project. Empty Motoko backend and React frontend scaffolded.

## Requested Changes (Diff)

### Add
- Full e-commerce storefront with pastel warm design
- Home page: hero section, categories grid, featured products, about us, reviews, contact form
- Shop page: product listing with category filter sidebar
- Admin panel: manage products, categories, and reviews (add/edit/remove)
- Motoko backend: product CRUD, category CRUD, review CRUD, cart state
- Authorization: admin role (principal-based) for protected admin panel
- Sample seed data: 4 categories, ~12 products, 6 reviews

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Select `authorization` and `blob-storage` components
2. Generate Motoko backend with:
   - Category type: id, name, description, imageUrl
   - Product type: id, name, categoryId, price, description, imageUrl, featured, stock
   - Review type: id, author, rating, comment, productId (optional)
   - Cart: per-session or frontend-only state
   - Admin-gated CRUD for products, categories, reviews
   - Public read queries
3. Frontend:
   - Sticky header with nav links (Home, Shop, About, Contact)
   - Hero section with tagline and CTA
   - Category cards grid
   - Featured products grid with add-to-cart
   - About Us section
   - Testimonials/reviews section with star ratings
   - Contact form
   - Footer with newsletter signup and links
   - Shop page with category filter
   - Admin panel (login-gated, list/add/edit/delete products, categories, reviews)
   - Cart drawer/modal
4. Fonts: Playfair Display (headings) + Lato (body) via Google Fonts
5. Pastel palette: peach #FFDAB9, lavender #E6E6FA, sage green #B2C5B2, cream #FFF8F0
