# ♻️ ReCycleHub – E-Waste Facility Finder

<p align="center">
  <strong>Find nearby e-waste recycling facilities and make responsible electronic waste disposal easier.</strong>
</p>

<p align="center">
  <a href="https://recycle-spotter-muf1.vercel.app/">
    <strong>🌐 Live Demo</strong>
  </a>
  &nbsp; | &nbsp;
  <a href="https://github.com/Apsar-0089/recycle-spotter">
    <strong>📂 GitHub Repository</strong>
  </a>
</p>

---

## 📌 About the Project

**ReCycleHub** is a responsive web application designed to help users discover e-waste recycling facilities across India.

Electronic waste, including old smartphones, laptops, batteries, chargers, and other electronic devices, can cause environmental damage when disposed of improperly.

ReCycleHub makes responsible disposal easier by allowing users to search for recycling facilities using their city or PIN code, explore accepted electronic waste categories, and find facility contact information.

The goal is to encourage sustainable electronic waste management and make recycling information more accessible.

## 🚀 Live Demo

**Explore the deployed application:**

👉 https://recycle-spotter-muf1.vercel.app/

The application is deployed using Vercel and is accessible through a web browser.

## ✨ Features

- **Facility Search:** Search recycling facilities using city names or 6-digit PIN codes.
- **E-Waste Categories:** Explore facilities based on the types of electronic waste they accept.
- **Certified Facility Filter:** Filter the displayed listings to show facilities marked as certified in the application data.
- **Facility Information:** View facility names, addresses, contact details, operating hours, and ratings.
- **Google Maps Navigation:** Open facility locations through Google Maps search links.
- **Responsive Design:** User-friendly interface for desktop, tablet, and mobile devices.
- **Interactive Interface:** Search controls, filters, facility cards, and navigation.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React, TypeScript |
| Framework | TanStack Start |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui, Radix UI |
| Icons | Lucide React |
| Package Manager | Bun |
| Deployment | Vercel |
| Version Control | Git and GitHub |

## 🏗️ Project Architecture

The current version uses a frontend-based architecture with locally maintained facility data.

```text
ReCycleHub/
│
├── public/
│
├── src/
│   ├── components/
│   │   └── ui/
│   │
│   ├── data/
│   │   └── facilities.ts
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │
│   ├── routes/
│   │   ├── __root.tsx
│   │   └── index.tsx
│   │
│   ├── router.tsx
│   └── routeTree.gen.ts
│
├── supabase/
├── package.json
├── bun.lock
├── vite.config.ts
└── README.md
```

*Note: This describes the main application structure; generated and configuration files may vary.*

## ⚙️ Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [Bun](https://bun.sh/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Apsar-0089/recycle-spotter.git
```

### 2. Navigate to the Project Directory

```bash
cd recycle-spotter
```

### 3. Install Dependencies

```bash
bun install
```

### 4. Start the Development Server

```bash
bun run dev
```

Open the local development URL displayed in your terminal, usually:

```text
http://localhost:3000
```

### 5. Create a Production Build

```bash
bun run build
```

## 📊 Facility Data

Facility information is currently maintained in:

```text
src/data/facilities.ts
```

The application uses this data to display facility listings and support search and filtering.

**Data note:** Listings are demonstration/sample project data. Users should independently verify facility details, accepted materials, operating hours, and certification before visiting or handing over electronic waste.

## ☁️ Deployment

The application is deployed on **Vercel** and connected to the GitHub repository.

Live URL:

https://recycle-spotter-muf1.vercel.app/

The deployment workflow:

1. Develop and test the application locally.
2. Commit changes to Git.
3. Push changes to the GitHub `main` branch.
4. Vercel automatically builds and deploys the latest changes.

## 🔮 Future Improvements

- Integrate the Supabase PostgreSQL database with the application.
- Implement dynamic facility management using database records.
- Add user authentication and an administrator dashboard.
- Enable facility registration and information management.
- Add location-based search and distance calculations.
- Improve map-based facility discovery.
- Introduce verified facility information and data maintenance workflows.

## 🎯 Project Objectives

- Promote responsible electronic waste disposal.
- Make recycling facility information easier to discover.
- Encourage sustainable environmental practices.
- Demonstrate modern frontend development and deployment skills.

## 👨‍💻 Author

**Apsar Basha**

B.Tech Graduate | Aspiring Software Developer

- GitHub: https://github.com/Apsar-0089
- Project: https://github.com/Apsar-0089/recycle-spotter
- Live Demo: https://recycle-spotter-muf1.vercel.app/

---

<p align="center">
  <strong>♻️ Recycle Responsibly. Protect the Planet. Build a Sustainable Future.</strong>
</p>
