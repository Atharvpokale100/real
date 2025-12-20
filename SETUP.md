# Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Default Credentials

**Admin Login:**
- Username: `admin`
- Password: `admin123`

## Features to Test

### Public Pages
1. **Application Form** (`/`)
   - Fill out the complete application form
   - Upload documents
   - Submit and get Application ID

2. **Track Application** (`/track`)
   - Enter Application ID and Email
   - View application status

3. **Dashboard** (`/dashboard`)
   - View statistics
   - See charts and graphs
   - Filter applications

### Admin Panel
1. **Login** (`/login`)
   - Use admin credentials
   - Access admin dashboard

2. **Admin Dashboard** (`/admin`)
   - View overview statistics
   - Manage applications
   - View analytics

3. **Applications Management** (`/admin/applications`)
   - Search and filter applications
   - Update application status
   - Delete applications
   - View details
   - Download PDFs

4. **Analytics** (`/admin/analytics`)
   - View comprehensive charts
   - Status distribution
   - Course-wise analysis
   - Timeline trends

## Database Setup (Optional)

If you want to integrate with a backend database:

1. Create a new database (MySQL/PostgreSQL/SQLite)
2. Run the SQL script from `database/schema.sql`
3. Update backend API endpoints in the code

## Troubleshooting

**Port already in use:**
- Change the port in `vite.config.js`

**Module not found errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**Styling issues:**
- Ensure Tailwind CSS is properly configured
- Check `tailwind.config.js` and `postcss.config.js`

## Project Structure

- `src/components/` - React components
- `src/utils/` - Utility functions (storage, PDF generation)
- `database/` - Database schema
- `public/` - Static assets

Enjoy building with Smart Admission System! 🚀

