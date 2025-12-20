# Smart Admission System

A professional web-based application and tracking system built with React, Tailwind CSS, and modern web technologies.

## Features

### 🎓 Application Management
- Complete application form with validation
- File upload support
- Application tracking with status updates
- Responsive design for all devices

### 📊 Analytics & Dashboard
- Real-time statistics and metrics
- Interactive charts and graphs (Chart.js)
- Application timeline visualization
- Course-wise application distribution

### 👨‍💼 Admin Dashboard
- Comprehensive admin panel
- Application management
- Status updates and review
- PDF report generation
- Advanced filtering and search

### 📄 PDF Generation
- Individual application PDF export
- Comprehensive reports with statistics
- Professional formatting with jsPDF

### 🎨 Modern UI/UX
- Beautiful gradient designs
- Smooth animations (Framer Motion)
- Responsive layout
- Dark mode ready (Tailwind CSS)

## Tech Stack

- **React 18** - UI Framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Chart.js** - Data Visualization
- **jsPDF** - PDF Generation
- **Vite** - Build Tool
- **Lucide React** - Icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Database Setup

The database schema is provided in `database/schema.sql`. It supports:
- MySQL
- PostgreSQL
- SQLite

To set up the database:

1. Create a new database
2. Run the SQL script from `database/schema.sql`
3. Update your backend connection settings (when integrating with a backend)

## Default Admin Credentials

- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Note:** Change these credentials in production!

## Project Structure

```
├── src/
│   ├── components/        # React components
│   │   ├── Header.jsx
│   │   ├── ApplicationForm.jsx
│   │   ├── TrackApplication.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── Login.jsx
│   ├── utils/            # Utility functions
│   │   ├── storage.js    # LocalStorage management
│   │   └── pdfGenerator.js  # PDF generation
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── database/
│   └── schema.sql        # Database schema
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Features in Detail

### Application Form
- Multi-step form with validation
- File upload with preview
- Real-time form validation
- Success notifications

### Tracking System
- Search by Application ID and Email
- Status visualization
- Detailed application view

### Admin Dashboard
- Overview with key metrics
- Application management table
- Status update functionality
- Delete applications
- View detailed application information
- Generate PDF reports

### Analytics
- Status distribution (Doughnut chart)
- Course-wise applications (Bar chart)
- Timeline analysis (Line chart)
- Real-time data updates

### PDF Generation
- Individual application PDFs
- Complete reports with statistics
- Professional formatting
- Automatic pagination

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme.

### Animations
Modify animation settings in component files using Framer Motion.

### Charts
Chart configurations can be customized in Dashboard and AdminDashboard components.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational/hackathon purposes.

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

---

Built with ❤️ for Smart Admission System

