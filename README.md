# 🧪 Admin Panel Web App Playground

<section align="center">
   <p>Admin Panel Web App Playground is a modern admin dashboard simulator developed to practice and learn web development with Nuxt and Vue 3. The application supports core admin functionalities such as dashboard overview, product management, and a real-time shop theme editor, emphasizing efficient state management and modern UI design.</p>
    <img alt="Vue 3 Badge" src="https://img.shields.io/badge/Vue%203-transparent?style=for-the-badge&color=%234FC08D">
    <img alt="Nuxt Badge" src="https://img.shields.io/badge/Nuxt-transparent?style=for-the-badge&color=%2300DC82">
    <img alt="Pinia Badge" src="https://img.shields.io/badge/Pinia-transparent?style=for-the-badge&color=%23FFD859">
    <img alt="Tailwind CSS Badge" src="https://img.shields.io/badge/Tailwind%20CSS-transparent?style=for-the-badge&color=%2338B2AC">
    <img alt="TypeScript Badge" src="https://img.shields.io/badge/TypeScript-transparent?style=for-the-badge&color=%233178C6">
    <img alt="Lucide Badge" src="https://img.shields.io/badge/Lucide-transparent?style=for-the-badge&color=%23F05133">
</section>

## 📖 Table of Contents

- ✨ [Key Features](#key-features)
- 🚀 [Getting Started](#getting-started)
- 📝 [Learning Log / Notes](#learning-log--notes)

## ✨ Key Features

- **Authentication:** Simulated login system with secure access control using Nuxt middleware (Default: `admin@shop.com` / `123456`).
- **Dashboard Overview:** Visualizes key business metrics including total sales, orders, and weekly performance charts.
- **Product Management:** Complete CRUD system for managing products, including stock updates, status toggling, and image upload simulation.
- **Shop Editor:** A real-time theme customizer allowing users to modify shop details and brand colors with instant live preview in both mobile and desktop modes.
- **Responsive Layout:** A modern, mobile-friendly interface built with Tailwind CSS, featuring a collapsible sidebar and smooth transitions.

## 🚀 Getting Started

### Prerequisites

- Node.js (Version 18.0.0 or higher recommended)
- npm (Comes installed with Node.js)

### Installation & Running

1. Clone this project to your local machine.
2. Navigate to the `client` folder:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the project in development mode:
   ```bash
   npm run dev
   ```
5. Open your browser and go to the displayed URL (usually `http://localhost:3000`).

## 📝 Learning Log / Notes

- **State Management with Pinia:** Utilizing Pinia stores (`product.ts`, `shop.ts`) to manage global application state, such as product lists and shop configuration, ensuring data consistency across pages.
- **Nuxt 3 Architecture:** Leveraging Nuxt's file-based routing, layouts, and auto-imports to structure the application efficiently.
- **Middleware for Auth:** Implementing `auth.global.ts` middleware to protect routes, ensuring only authenticated users can access the dashboard.
- **Tailwind CSS Customization:** Using Tailwind for rapid UI development, dynamic class binding for theme colors, and responsive design for different screen sizes.
- **Dynamic Components & Composition API:** Using `<script setup>` and Vue's Composition API for cleaner logic, along with dynamic component rendering for icons.

---

🤝 Open to any suggestions or feedback and feel free to contribute to this project.
