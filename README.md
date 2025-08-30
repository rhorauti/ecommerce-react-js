# Project Overview

E-commerce project is a modern, full-featured e-commerce platform built with React. This project serves as a comprehensive practice ground for integrating a wide array of web development technologies, from a dynamic frontend to a robust backend, third-party API integration, and cloud deployment.

The primary goal is to build a scalable and maintainable application that demonstrates proficiency in the entire development lifecycle.

Live Demo: To be defined.

# Key Features

Product Catalog: Browse products with detailed descriptions, images, and pricing.

Search & Filter: Easily find products using a search bar and advanced filtering options (e.g., by category, price).

Shopping Cart: Add/remove items and update quantities in a persistent shopping cart.

User Authentication: Secure user registration and login functionality.

Checkout Process: A multi-step, user-friendly checkout flow (placeholder for payment integration).

Responsive Design: A seamless user experience across all devices, from desktops to mobile phones, built with Tailwind CSS.

State Management: Centralized and predictable state management using Redux Toolkit.

🛠️ Technology Stack
This project leverages a modern and powerful set of tools to deliver a high-quality user experience and a robust developer workflow.

Frontend
Framework: React.js - A JavaScript library for building user interfaces.

Build Tool: Vite - For a lightning-fast development experience and optimized builds.

Styling: Tailwind CSS - A utility-first CSS framework for rapid UI development.

State Management: Redux Toolkit - The official, opinionated toolset for efficient Redux development.

Routing: React Router - For declarative routing in a React application.

HTTP Client: Axios - For making promise-based HTTP requests to external or internal APIs.

Testing
Test Runner: Jest - A delightful JavaScript Testing Framework with a focus on simplicity.

Utilities: React Testing Library - For testing React components in a user-centric way.

Backend & DevOps (Planned)
Backend Framework: Node.js with Express.js

Database: MongoDB with Mongoose

Authentication: JSON Web Tokens (JWT)

Cloud Deployment: Render

File Storage: Cloudinary / AWS S3 for product image uploads.

Payment Gateway: MercadoPago API integration.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
