# StellarPOS Frontend 🌟

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Stellar Network](https://img.shields.io/badge/Stellar-Testnet-08B5E5.svg?logo=stellar&logoColor=white)](https://stellar.org)

> **Modern, high-performance Point-of-Sale (POS) interface enabling merchants to accept USDC and XLM payments with instant finality on the Stellar blockchain.**

---

## 📌 Milestone Status (~20% Scope)

This repository represents the **Frontend Foundation (~15% of total project)**:
* **Merchant Dashboard (`/dashboard`)**: Metric overview (Revenue, Total Transactions, Pending, Successful) & recent transactions table.
* **POS Terminal (`/pos`)**: Fast charge amount entry, quick preset buttons ($5 – $100), settlement asset selector (USDC / XLM), and digital POS keypad.
* **Multi-State Payment Modal**: Real-time SEP-0007 QR code generation, 5-minute countdown expiry, URI copy action, live transaction listener status, and milestone simulation triggers.
* **Transaction History (`/transactions`)**: Searchable ledger with multi-criteria filtering by payment status and crypto asset.

---

## 🛠 Tech Stack

* **Core Framework**: React 18
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **Routing**: React Router v6
* **Icons**: Lucide React
* **QR Protocol**: `qrcode.react` (SEP-0007 URI generator)
* **HTTP Client**: Axios

---

## 📁 Project Architecture

```
frontend/
├── src/
│   ├── components/           # Reusable UI & Modal components
│   │   ├── EmptyState.jsx    # Empty state placeholder
│   │   ├── ErrorAlert.jsx    # Error alerts
│   │   ├── LoadingSpinner.jsx# Spinners
│   │   ├── Navbar.jsx        # Header with network & merchant vault status
│   │   ├── PaymentModal.jsx  # Multi-state payment modal & SEP-0007 QR
│   │   ├── Sidebar.jsx       # Responsive drawer navigation & testnet widget
│   │   └── StatusBadge.jsx   # Status pill (Completed, Pending, Failed, Expired)
│   ├── layouts/
│   │   └── DashboardLayout.jsx # Merchant shell layout
│   ├── pages/
│   │   ├── Dashboard.jsx     # Merchant stats & recent payments
│   │   ├── PosScreen.jsx     # POS terminal & keypad
│   │   └── TransactionsScreen.jsx # Full searchable ledger table
│   ├── services/
│   │   ├── api.js            # Axios client for backend API
│   │   └── stellar.js        # SEP-0007 payment URI & network helper
│   ├── utils/
│   │   └── formatters.js     # Currency, asset, date, and address formatters
│   ├── App.jsx               # Route definitions
│   ├── main.jsx              # Entry point
│   └── index.css             # Tailwind base & utilities
├── public/
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Quickstart Guide

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm** or **yarn** / **pnpm**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/StelarPOS/POS-Frontend.git
   cd POS-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Production build:
   ```bash
   npm run build
   ```

---

## ⚙️ Environment Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Backend Express API endpoint | `http://localhost:5000/api` |
| `VITE_STELLAR_NETWORK` | Stellar network environment | `testnet` |
| `VITE_STELLAR_HORIZON_URL` | Horizon API endpoint | `https://horizon-testnet.stellar.org` |
| `VITE_STELLAR_USDC_ISSUER` | Circle USDC Issuer address | `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5` |

---

## 🤝 Contributing

We welcome contributions from the open-source community! Please review our [CONTRIBUTING.md](CONTRIBUTING.md) guide before submitting pull requests.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
