# Pastel — Memory Journaling, Delivered to Your Future Self

Pastel is a privacy-first, production-ready journaling application that lets users write memories, schedule them for future delivery, and receive thoughtful AI-driven reflections when memories are delivered. Built with Next.js and TypeScript, Pastel combines a clean, distraction-free writing experience with a reliable, monitored backend suitable for real-world use.

Key highlights

- Production-ready: Deployed with automated CI/CD, database migrations, monitoring, and backups.
- Reliable delivery: Background delivery system that schedules and delivers time-capsule memories and updates capsule status automatically.
- Privacy & security focused: Authentication with Clerk, environment separation, and operational safeguards for user data.
- Thoughtful UX: Clean journaling interface with optional media attachments and analytics for user progress.
- Extensible stack: Type-safe codebase and modular integrations for email and AI services.

Core features

- Write and schedule time-capsule memories to be delivered at a chosen future date.
- AI-powered reflections generated on delivery to provide contextual insights.
- Email notifications for delivered capsules.
- Archive delivered memories and view analytics on writing patterns and emotional trends.
- Attach images and other media via the built-in upload system.
- Authentication and account management via Clerk.

Tech stack

- Next.js (React) & TypeScript — modern frontend and server-rendered pages
- Tailwind CSS, Shadcn UI, Framer Motion — consistent UI and animations
- Prisma ORM + PostgreSQL — robust data modeling and migrations
- Clerk — authentication and user management
- Vercel — hosting, CI/CD, and scheduled jobs (production deployment)

Deployment & operations

Pastel is operated with production-grade workflows: automated testing and deployment, database migration pipelines, scheduled background workers for reliable delivery, database backups, and production monitoring. Secrets and environment variables are managed separately for staging and production environments.

Security & privacy

User data is handled with care. Authentication is delegated to Clerk, production logs and monitoring are configured for observability, and database backups are maintained. The project supports data export and deletion workflows for compliance and user control.

Getting started (for developers)

1. Clone the repo

   git clone https://github.com/Ali-Hasan-Khan/pastel.git
2. Install dependencies

   pnpm install
3. Copy and configure environment variables

   cp .env.example .env
4. Start the development server

   pnpm dev

For production deployment, follow the deployment guide in the repo and ensure required environment variables and database credentials are configured in your hosting provider.

Contributing

Contributions are welcome. Please open issues for bugs or feature requests and submit pull requests for proposed changes. For larger changes, open an issue first to discuss design and migration plans.

License

MIT