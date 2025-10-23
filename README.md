# Pastel - A Memory Journaling App

A beautiful and thoughtful journaling application that lets you send messages to your future self, built with Next.js and React.

## Features

- 🎨 **Beautiful Journaling Interface** - A calming, distraction-free environment for expressing your thoughts and feelings
- 📅 **Future Memory Delivery** - Schedule when your memories will be delivered back to you
- ✨ **AI-Powered Reflections** - Receive AI-generated insights about your emotional journey when memories are delivered
- 📊 **Progress Tracking** - Monitor your emotional growth and patterns over time

## Tech Stack

- [Next.js](https://nextjs.org) - React framework for web applications
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion) - Animation library
- [Lucide Icons](https://lucide.dev) - Beautiful and consistent icons
- [Shadcn UI](https://ui.shadcn.com) - UI component system
- [Prisma ORM](https://www.prisma.io) - Database ORM
- [PostgreSQL](https://www.postgresql.org) - Database
- [Clerk](https://clerk.com) - Authentication

## TODO

### 🔧 Core Backend Features
- [x] **Automatic Delivery System** - Implement background job processing to automatically deliver capsules when their delivery date arrives(using vercel cron jobs)
- [x] **Email Notifications** - Set up email service (Resend) for capsule delivery notifications
- [x] **Capsule Status Management** - Automatic status updates from 'scheduled' to 'delivered'
- [ ] **Database Cleanup** - Background tasks for data maintenance and cleanup

### 🤖 AI Integration
- [ ] **Sentiment Analysis** - Integrate OpenAI/Google Cloud AI for emotional analysis of journal entries
- [x] **AI Reflections** - Generate personalized insights when capsules are delivered
- [ ] **Emotion Tracking** - Store and track emotional patterns over time
- [ ] **Writing Pattern Analysis** - AI-powered analysis of writing habits and themes

### 📁 File Management
- [x] **Image Upload System** - Implement actual file upload functionality (currently placeholder)
- [ ] **File Storage** - Set up cloud storage (AWS S3/Cloudinary) for images and attachments
- [ ] **Multiple Media Types** - Support for audio recordings, videos, and documents
- [ ] **File Compression** - Optimize uploaded files for storage

### 📥 Import & Export
- [ ] **Import Functionality** - Actually implement file import system (currently UI only)
- [ ] **Multiple Format Support** - Import from .txt, .docx, .pdf, .json files
- [ ] **Bulk Import** - Allow importing multiple memories at once
- [ ] **Export Data** - Allow users to export their data in various formats
- [ ] **Migration Tools** - Import from other journaling apps

### 🤝 Sharing & Social
- [ ] **Share Functionality** - Implement actual sharing mechanisms (currently UI only)
- [ ] **Public Collections** - Allow users to create and share curated memory collections
- [ ] **Private Sharing** - Share specific memories with friends/family via secure links
- [ ] **Social Features** - Comments, reactions, and collaborative memories

### 📊 Analytics & Insights
- [x] **Real Analytics Data** - Connect analytics page to actual user data
- [ ] **Interactive Charts** - Implement Chart.js or similar for data visualization
- [ ] **Progress Tracking** - Track writing frequency, mood trends, and growth patterns
- [ ] **Comparative Analysis** - Year-over-year comparisons and insights
- [ ] **Export Analytics** - Allow users to export their analytics data

### 📚 Archive & History
- [x] **Archive API** - Implement backend for viewing delivered capsules
- [ ] **Search Functionality** - Full-text search across all memories
- [ ] **Filtering & Sorting** - Advanced filters by date, emotion, tags, etc.
- [ ] **Memory Timeline** - Visual timeline of user's memory journey
- [ ] **Tagging System** - Add tags to memories for better organization

### ⚙️ Settings & Preferences
- [ ] **User Preferences** - Implement actual settings functionality
- [ ] **Notification Settings** - Customize email/push notification preferences
- [ ] **Privacy Controls** - Data retention, deletion, and privacy settings
- [x] **Theme Customization** - More theme options and color schemes
- [ ] **Language Support** - Internationalization (i18n) support

### 🔐 Security & Privacy
- [ ] **End-to-End Encryption** - Encrypt memory contents at rest
- [ ] **Data Backup** - Automated backup systems
- [ ] **GDPR Compliance** - Data export, deletion, and privacy controls
- [ ] **Two-Factor Authentication** - Enhanced security options
- [ ] **Audit Logs** - Track user actions for security purposes

### 📱 Mobile & Performance
- [ ] **Progressive Web App (PWA)** - Offline support and app-like experience
- [ ] **Mobile Optimization** - Better responsive design for mobile devices
- [ ] **Push Notifications** - Browser/mobile push notifications for delivery
- [ ] **Performance Optimization** - Code splitting, lazy loading, caching strategies
- [ ] **SEO Optimization** - Meta tags, structured data, and search engine optimization

### 🧪 Testing & Quality
- [x] **Unit Tests** - Comprehensive test coverage for API routes and components
- [ ] **Integration Tests** - End-to-end testing with Playwright or Cypress
- [ ] **Error Handling** - Better error boundaries and user feedback
- [ ] **Monitoring** - Application monitoring and alerting (Sentry, DataDog)
- [ ] **Performance Monitoring** - Track app performance and user experience

### 🚀 Deployment & DevOps
- [x] **CI/CD Pipeline** - Automated testing and deployment via vercel
- [x] **Environment Management** - Proper staging and production environments
- [x] **Database Migrations** - Proper migration strategy for schema changes
- [x] **Monitoring & Logging** - Application and infrastructure monitoring
- [x] **Backup Strategy** - Automated database backups and disaster recovery

### 💡 Future Enhancements
- [ ] **Voice Recordings** - Audio memory capture with speech-to-text
- [ ] **Calendar Integration** - Sync with Google Calendar, Apple Calendar
- [ ] **API for Third-party Apps** - Public API for integrations
- [ ] **Machine Learning** - Personalized delivery timing based on user behavior
- [ ] **Collaborative Memories** - Shared time capsules with multiple contributors
- [ ] **Memory Prompts** - AI-generated writing prompts and suggestions
- [ ] **Mood Tracking Integration** - Connect with health apps and mood trackers
- [ ] **Advanced Analytics** - Predictive insights and personalized recommendations

---


**Next Steps:**
1. Build file upload and storage system
2. Create real analytics with data visualization
