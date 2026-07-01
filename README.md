# 🛡️ Trust Life — Full-Stack Insurance Management Platform

A modern, role-based insurance management system built with **React**, **Express**, and **MongoDB**. Customers can browse policies, get instant quotes, apply for coverage, and process payments. Agents manage assigned customers and claims. Admins oversee policies, applications, and user roles.

**🌐 Live Demo:** [https://b11-a12-trust-life-client.web.app](https://b11-a12-trust-life-client.web.app)

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev) [![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com) [![Express](https://img.shields.io/badge/Express.js-5-404040?logo=express&logoColor=white)](https://expressjs.com) [![MongoDB](https://img.shields.io/badge/MongoDB-6-47A248?logo=mongodb&logoColor=white)](https://mongodb.com) [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
<!-- - [Screenshots](#screenshots) -->
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 🏠 Public

- [x] Browse all insurance policies with pagination, category filtering, and full-text search
- [x] Sort policies by newest, premium (low/high), and popularity
- [x] View detailed policy information with eligibility and coverage details
- [x] Get a free instant premium quote based on age, gender, coverage, duration, and smoker status
- [x] Read blog articles and newsletter subscription

### 👤 Customer Dashboard

- [x] Apply for policies with nominee and health condition disclosures
- [x] View application status and payment history
- [x] Select monthly or yearly payment terms
- [x] Secure payment processing via **Stripe**
- [x] Submit and track insurance claims

### 🧑‍💼 Agent Dashboard

- [x] View assigned customer applications
- [x] Approve or reject customer applications
- [x] Manage and approve customer claim requests
- [x] View policy details for assigned customers

### 🛠️ Admin Dashboard

- [x] Create, update, and delete insurance policies
- [x] Manage all customer applications and assign agents
- [x] Promote/demote customers to agents
- [x] Manage blog posts and user reviews
- [x] View transaction and payment history

### 🔐 Security & Auth

- [x] Firebase Authentication (email/password, Google)
- [x] Role-based access control (Customer, Agent, Admin)
- [x] JWT token verification via Firebase Admin SDK
- [x] Protected API routes with middleware

---

## 🧰 Tech Stack

### Frontend

| Technology             | Purpose                                               |
| ---------------------- | ----------------------------------------------------- |
| **React 19**           | UI library with hooks and functional components       |
| **Vite**               | Fast development build tool                           |
| **React Router v7**    | Client-side routing                                   |
| **TanStack Query v5**  | Server-state management, caching, and synchronization |
| **Tailwind CSS v4**    | Utility-first CSS framework                           |
| **React Hook Form**    | Performant form validation and handling               |
| **Stripe React**       | Secure payment checkout integration                   |
| **Firebase Auth**      | Authentication and user management                    |
| **SweetAlert2**        | Beautiful alert and confirmation dialogs              |
| **React Helmet Async** | Dynamic document head management                      |

### Backend

| Technology             | Purpose                             |
| ---------------------- | ----------------------------------- |
| **Express.js 5**       | RESTful API framework               |
| **MongoDB + Mongoose** | NoSQL database with schema modeling |
| **Firebase Admin SDK** | Server-side token verification      |
| **Stripe Node.js SDK** | Payment intent and processing       |
| **CORS**               | Cross-origin resource sharing       |
| **dotenv**             | Environment variable management     |

---

## 📁 Project Structure

```
trust-life/
├── trust-Life-life-insurance-management-client/   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── context/             # Auth & global context providers
│   │   ├── hooks/               # Custom React hooks (axios, auth, etc.)
│   │   ├── pages/               # Route-level page components
│   │   │   ├── Home/
│   │   │   ├── AllPolicies/
│   │   │   ├── PolicyDetails/
│   │   │   └── DashBoard/
│   │   │       ├── DashBoardHome/
│   │   │       │   ├── AdminDashBoard/
│   │   │       │   ├── AgentDashBoard/
│   │   │       │   └── CustomerDashBoard/
│   │   ├── router/              # React Router configuration
│   │   └── main.jsx             # Application entry point
│   ├── index.html
│   └── package.json
│
├── trust-Life-life-insurance-management-server/   # Express backend
│   ├── config/
│   │   └── db.js                # MongoDB connection setup
│   ├── controllers/             # Route handlers (business logic)
│   ├── middleware/
│   │   └── verifyFBToken.js     # Firebase JWT verification
│   ├── models/                  # Mongoose schemas
│   │   ├── policy.js
│   │   ├── application.js
│   │   ├── customer.js
│   │   ├── payment.js
│   │   ├── blog.js
│   │   └── review.js
│   ├── routes/                  # API route definitions
│   ├── index.js                 # Server entry point
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** or **pnpm**
- **MongoDB Atlas** account (or local MongoDB instance)
- **Firebase** project with Authentication enabled
- **Stripe** account (for payment processing)

### Environment Variables

#### 🔧 Server (`trust-Life-life-insurance-management-server/.env`)

```bash
# MongoDB
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password

# Firebase Admin (Base64-encoded service account JSON)
FB_SERVICE_KEY=your_base64_firebase_service_account_key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

#### 🎨 Client (`trust-Life-life-insurance-management-client/.env`)

```bash
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project.appspot.com
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

> ⚠️ **Never commit `.env` files.** Both are already included in `.gitignore`.

### 🔑 Demo Admin Credentials

You can log in to the live demo using the following admin account:

| Field        | Value              |
| ------------ | ------------------ |
| **Email**    | `admin1@admin.com` |
| **Password** | `Admin12345`       |

> Use the admin dashboard to manage policies, applications, and user roles.

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/trust-life.git
cd trust-life
```

#### 2. Install server dependencies

```bash
cd trust-Life-life-insurance-management-server
npm install
```

#### 3. Install client dependencies

```bash
cd ../trust-Life-life-insurance-management-client
npm install
```

#### 4. Start the development servers

**Terminal 1 — Backend:**

```bash
cd trust-Life-life-insurance-management-server
npm run dev
```

Server runs at `http://localhost:3000`

**Terminal 2 — Frontend:**

```bash
cd trust-Life-life-insurance-management-client
npm run dev
```

Client runs at `http://localhost:5173`

---

## 🔌 API Endpoints

### Policies

| Method   | Endpoint            | Access | Description                                  |
| -------- | ------------------- | ------ | -------------------------------------------- |
| `GET`    | `/all-policies`     | Public | Paginated policies with filter, search, sort |
| `GET`    | `/popular-policies` | Public | Top 8 most purchased policies                |
| `GET`    | `/policies/:id`     | Public | Single policy details                        |
| `GET`    | `/policies`         | Admin  | All policies (admin view)                    |
| `POST`   | `/policies`         | Admin  | Create new policy                            |
| `PATCH`  | `/policies/:id`     | Admin  | Update a policy                              |
| `DELETE` | `/policies/:id`     | Admin  | Delete a policy                              |

### Applications

| Method  | Endpoint                                   | Access   | Description                 |
| ------- | ------------------------------------------ | -------- | --------------------------- |
| `POST`  | `/policy-applications`                     | Customer | Submit new application      |
| `GET`   | `/my-applications`                         | Customer | Get my applications         |
| `GET`   | `/policy-applications/:id`                 | Private  | Get single application      |
| `GET`   | `/applications/paid`                       | Admin    | All paid applications       |
| `PATCH` | `/policy-applications/:id/assign-agent`    | Admin    | Assign agent & approve      |
| `PATCH` | `/policy-applications/:id/reject`          | Admin    | Reject application          |
| `GET`   | `/assigned-applications`                   | Agent    | Applications by agent email |
| `PATCH` | `/assigned-applications/:id/update-status` | Agent    | Approve/reject agent status |
| `GET`   | `/claim-requests/claim`                    | Customer | Claimable applications      |
| `PATCH` | `/claim-request/:id`                       | Customer | Submit a claim              |
| `GET`   | `/claim-requests`                          | Agent    | Claims for agent approval   |

### Customers & Agents

| Method  | Endpoint                 | Access  | Description           |
| ------- | ------------------------ | ------- | --------------------- |
| `POST`  | `/customers`             | Public  | Register new customer |
| `GET`   | `/customers/:email`      | Private | Get customer profile  |
| `PUT`   | `/customers/:email`      | Private | Update profile        |
| `GET`   | `/customers/role/:email` | Private | Get user role         |
| `PATCH` | `/customers/:id/promote` | Admin   | Promote to agent      |
| `PATCH` | `/customers/:id/demote`  | Admin   | Demote to customer    |
| `GET`   | `/agents`                | Admin   | List all agents       |
| `GET`   | `/limited-agents`        | Public  | Top 3 agents          |

### Payments

| Method | Endpoint                 | Access   | Description                    |
| ------ | ------------------------ | -------- | ------------------------------ |
| `POST` | `/create-payment-intent` | Public   | Create Stripe payment intent   |
| `POST` | `/payments`              | Customer | Record payment & update status |
| `GET`  | `/transactions`          | Admin    | All payment transactions       |

### Blogs & Reviews

| Method   | Endpoint           | Access       | Description             |
| -------- | ------------------ | ------------ | ----------------------- |
| `POST`   | `/blogs`           | Admin/Author | Create blog post        |
| `GET`    | `/blogs`           | Private      | Blogs by role           |
| `GET`    | `/all-blogs`       | Public       | All blog posts          |
| `GET`    | `/blog-latest`     | Public       | Latest 8 blogs          |
| `PATCH`  | `/blogs/visit/:id` | Public       | Increment visit count   |
| `PUT`    | `/blogs/:id`       | Admin/Author | Update blog             |
| `DELETE` | `/blogs/:id`       | Admin        | Delete blog             |
| `POST`   | `/reviews`         | Customer     | Submit review           |
| `GET`    | `/reviews`         | Public       | All reviews             |
| `POST`   | `/newsletters`     | Public       | Subscribe to newsletter |

<!-- ---

## 📸 Screenshots

> *Screenshots will be added here. Suggested captures:*
> - 🏠 Home page with hero and popular policies
> - 📋 All policies page with filter and sort
> - 📄 Policy details page
> - 🧮 Free quote calculator
> - 📝 Policy application form
> - 💳 Stripe payment checkout
> - 📊 Admin dashboard — manage policies
> - 👥 Agent dashboard — assigned customers -->

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests where applicable.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://react.dev) — UI library
- [TanStack Query](https://tanstack.com/query) — Server-state management
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Stripe](https://stripe.com) — Payment processing
- [Firebase](https://firebase.google.com) — Authentication
- [MongoDB](https://mongodb.com) — Database

---

<p align="center">Built with ❤️ for Trust Life Insurance</p>
