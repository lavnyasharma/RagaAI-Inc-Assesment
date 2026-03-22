# MedDash — Healthcare SaaS Dashboard

MedDash is a premium, production-ready healthcare management dashboard built with React, TypeScript, and Firebase. It provides a centralized interface for monitoring facility performance, patient analytics, and medical records.

![Dashboard Preview](https://github.com/user-attachments/assets/c0fb0e38-8e6b-4e6f-96a8-6f6eb162649a)

## 🚀 Key Features

- **Advanced Authentication**: Secure Email/Password signup and Google OAuth integration using Firebase Auth.
- **Real-time Analytics**: High-performance data visualization for patient volume, admissions, and departmental load.
- **Patient Management**: Switchable **Grid** and **List** views for efficient record management.
- **Cloud Integration**: Powered by **Firestore** for data persistence and **Firebase Messaging** for push notifications.
- **Modern UI/UX**: A highly polished, accessible, and responsive dark-mode interface built with Vanilla CSS and Lucide icons.
- **Service Worker Notifications**: Foreground and background notification support for real-time alerts.

## 🛠️ Tech Stack

- **Framework**: [React 18+](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS (Modern CSS variables and utility-first patterns)
- **Backend**: [Firebase](https://firebase.google.com/) (Auth, Firestore, Analytics, Cloud Messaging)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd meddash-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```text
src/
├── app/          # Routing and Global Providers
├── components/   # Shared UI Primitives
├── features/     # Feature-based modules (Auth, Dashboard, Patients, Analytics)
├── hooks/        # Custom React hooks (Notifications, etc.)
├── layouts/      # Global Layout components (Sidebar, Topbar)
├── services/     # Firebase and external API logic
└── types/        # Global TypeScript interfaces
```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
