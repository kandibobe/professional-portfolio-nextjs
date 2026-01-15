# Kandibobe.ai | Professional Portfolio & AI Solutions

![Kandibobe.ai Preview](public/og-image.jpg)

**Kandibobe.ai** is a high-performance, professional portfolio and service platform for **Vladyslav Kobiakov**, an AI & Algo-Trading Developer. This project showcases advanced web development practices, real-time AI integration, and a modern, high-fashion aesthetic.

Built with **Next.js 15**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**, it features a fully responsive, bilingual (English/Italian) interface with smooth page transitions and interactive 3D elements.

---

## 🚀 Key Features

- **Modern & Minimalist Design**: A "High-Fashion Editorial" aesthetic with stark typography and glassmorphism effects.
- **Internationalization (i18n)**: Full support for English and Italian using `next-intl`.
- **Interactive UI**:
  - Smooth page transitions and scroll animations via `framer-motion`.
  - Custom magnetic buttons and 3D scenes using `@react-three/fiber`.
  - Glitch text effects and real-time data visualization components.
- **Client Portal**: A secure-looking client login interface with custom animations.
- **Project Showcase**: A dynamic, filterable portfolio grid with detailed project modals.
- **Performance Optimized**: Built on Next.js 15 App Router with server components and optimized assets.
- **Robust Error Handling**: Global error boundaries to prevent application crashes.
- **Accessibility**: Enhanced for screen readers and keyboard navigation.

## 🛠️ Technology Stack

| Category          | Technology                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| **Core**          | [Next.js 15](https://nextjs.org/), [React 19](https://react.dev/)                              |
| **Language**      | [TypeScript 5](https://www.typescriptlang.org/)                                                |
| **Styling**       | [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)   |
| **UI Components** | Custom + [Radix UI](https://www.radix-ui.com/)                                                 |
| **3D Graphics**   | [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) |
| **i18n**          | [next-intl](https://next-intl-docs.vercel.app/)                                                |
| **Testing**       | [Jest](https://jestjs.io/), [Playwright](https://playwright.dev/)                              |
| **Linting**       | [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)                                |
| **DevOps**        | [Docker](https://www.docker.com/), [Husky](https://typicode.github.io/husky/)                  |

## 📂 Architecture

The project follows the standard Next.js App Router structure with localized routes.

```text
├── app/
│   ├── [locale]/             # Localized routes (e.g., /en/about)
│   ├── api/                  # API routes (Auth, Contact)
│   └── global-error.tsx      # Global error boundary
├── components/
│   ├── ui/                   # Reusable base components
│   └── ...                   # Feature-specific components
├── lib/
│   ├── config.ts             # Site-wide configuration
│   └── projects.ts           # Portfolio data
├── messages/
│   ├── en.json               # English translations
│   └── it.json               # Italian translations
├── public/                   # Static assets
└── i18n/                     # Localization configuration
```

## 🏁 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Docker (optional)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/kandibobe/professional-portfolio-nextjs.git
    cd professional-portfolio-nextjs
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file from the example:
    ```bash
    cp .env.example .env.local
    ```
    Update the variables in `.env.local` as needed.

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Running with Docker

Build and run the Docker container:

```bash
docker build -t portfolio-site .
docker run -p 3000:3000 portfolio-site
```

## ⚙️ Available Scripts

| Script                    | Description                              |
| ------------------------- | ---------------------------------------- |
| `npm run dev`             | Starts the development server.           |
| `npm run build`           | Builds the application for production.   |
| `npm run start`           | Starts a production server.              |
| `npm run lint`            | Lints the codebase.                      |
| `npm run format`          | Formats the code with Prettier.          |
| `npm test`                | Runs unit tests with Jest.               |
| `npm run test:watch`      | Runs tests in watch mode.                |
| `npm run storybook`       | Starts the Storybook development server. |
| `npm run build-storybook` | Builds Storybook for deployment.         |
| `npm run analyze`         | Analyzes the bundle size after a build.  |

## 📝 Environment Variables

| Variable              | Description                             |
| --------------------- | --------------------------------------- |
| `NEXT_PUBLIC_APP_URL` | The public URL of the application.      |
| `NEXTAUTH_SECRET`     | A secret for NextAuth.js.               |
| `NEXTAUTH_URL`        | The URL for NextAuth.js callbacks.      |
| `GITHUB_ID`           | Your GitHub application ID.             |
| `GITHUB_SECRET`       | Your GitHub application secret.         |
| `RESEND_API_KEY`      | Your Resend API key for sending emails. |

## 🧪 Testing

- **Unit Tests**: Run `npm test` to execute Jest tests.
- **E2E Tests**: Run `npx playwright test` to execute Playwright tests.

## 🤝 Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to contribute.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🚀 Deployment (Professional Vercel Setup)

This project is optimized for Vercel deployment with a robust CI/CD pipeline.

### Prerequisites

- Vercel Account
- PostgreSQL Database (e.g., Vercel Postgres or Neon)
- Upstash Redis (for Rate Limiting)
- Resend API Key (for Contact Form)

### Vercel Configuration

The project includes a `vercel.json` for optimal regional performance (default: `fra1` - Frankfurt).

### GitHub Actions

A professional CI/CD pipeline is configured in `.github/workflows/deploy.yml`:

1. **Lint & Test**: Ensures code quality.
2. **Build**: Verifies the build process.
3. **Deploy**: Automatically deploys to Vercel production on push to `main`.

**Required GitHub Secrets:**

- `VERCEL_TOKEN`: Your Vercel API token.
- `DATABASE_URL`: PostgreSQL connection string.
- `NEXTAUTH_SECRET`: Secret for NextAuth.

## 👥 Instructions for the Client

### Accessing the Admin Panel

To manage your portfolio, go to `/login` and use your GitHub account or provided credentials.

### Updating Content

- **Translations**: Text can be edited in the `messages/` folder (`en.json` and `it.json`).
- **Projects**: Manage projects via the admin dashboard (ensure your database is connected).
- **Images**: Use Cloudinary for high-performance image hosting.

### Performance Monitoring

Real-time insights are available in your Vercel Dashboard under **Analytics** and **Speed Insights**.
