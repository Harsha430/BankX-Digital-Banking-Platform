# 🚀 BankX Digital Banking Platform

<div align="center">

![BankX Logo](frontend/public/bankx-icon.svg)

**A Mind-Blowing, Cyberpunk-Inspired Digital Banking Platform**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[🎯 Demo](#-demo) • [✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [📱 Screenshots](#-screenshots) • [🛠️ Tech Stack](#️-tech-stack)

</div>

---

## 🎯 Demo

**🌐 Live Demo**: [Coming Soon]  
**🔑 Demo Credentials**: 
- Email: `admin@bankx.com`
- Password: `admin123`

## ✨ Features

### 🎨 **Stunning Cyberpunk UI**
- **🌈 Neon Color Palette**: Purple, Cyan, Pink, Green gradients
- **💎 Glass Morphism**: Translucent cards with blur effects  
- **✨ Smooth Animations**: 60fps animations using Anime.js & Framer Motion
- **📊 Interactive Charts**: Beautiful data visualizations with Chart.js
- **📱 Mobile-First**: Responsive design that works on all devices

### 🏦 **Complete Banking Features**
- **💳 Account Management**: Multiple account types (Savings, Current, Wallet)
- **📈 Transaction History**: Real-time transaction processing and tracking
- **👤 Customer Onboarding**: KYC verification and user management
- **🔐 Security**: JWT authentication with role-based access control
- **📧 Notifications**: Event-driven email alerts via Kafka
- **📊 Analytics**: Interactive dashboards with real-time data

### 🎭 **Animation Libraries**
- **Anime.js**: Staggered animations, floating elements, shimmer effects
- **Framer Motion**: Page transitions, hover effects, gesture interactions
- **Chart.js**: Interactive line charts, doughnut charts, bar charts
- **Custom CSS**: Neon glows, pulse animations, gradient shifts

## 🚀 Quick Start

### 📋 Prerequisites
- **Java 17+**
- **Node.js 18+**
- **PostgreSQL 15+**
- **Maven 3.8+**

### ⚡ 5-Minute Setup

1. **📥 Clone the repository**
   ```bash
   git clone https://github.com/Harsha430/BankX_Digital_Banking_Platform.git
   cd BankX_Digital_Banking_Platform
   ```

2. **🗄️ Setup Database**
   ```bash
   # Create PostgreSQL database
   createdb BankX
   ```

3. **🔧 Start Backend**
   ```bash
   # Run Spring Boot application
   ./mvnw spring-boot:run
   ```

4. **🎨 Start Frontend**
   ```bash
   # Navigate to frontend and install dependencies
   cd frontend
   npm install --legacy-peer-deps
   
   # Start development server
   npm run dev
   ```

5. **🌐 Access Application**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:8080
   - **Login**: admin@bankx.com / admin123

## 📱 Screenshots

### 🔐 Login Page
![Login Page](docs/screenshots/login.png)
*Cyberpunk-inspired login with animated backgrounds*

### 📊 Dashboard
![Dashboard](docs/screenshots/dashboard.png)
*Interactive charts and real-time statistics*

### 💳 Accounts
![Accounts](docs/screenshots/accounts.png)
*3D gradient cards with smooth animations*

### 📈 Transactions
![Transactions](docs/screenshots/transactions.png)
*Advanced filtering with beautiful transaction cards*

## 🛠️ Tech Stack

### 🏗️ **Backend**
- **Spring Boot 3.5.5** - Modern Java framework
- **PostgreSQL** - Robust relational database
- **Spring Security** - JWT authentication & authorization
- **Spring Data JPA** - Data persistence layer
- **Flyway** - Database migration management
- **Redis** - Caching layer
- **Apache Kafka** - Event streaming platform
- **Spring Mail** - Email notifications

### 🎨 **Frontend**
- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool
- **Framer Motion** - Production-ready animations
- **Anime.js** - Lightweight animation library
- **Chart.js** - Flexible charting library
- **Lucide React** - Beautiful icon library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### 🎯 **Key Integrations**
- **JWT Authentication** - Secure token-based auth
- **Real-time Charts** - Live data visualization
- **Responsive Design** - Mobile-first approach
- **Event-Driven Architecture** - Kafka messaging
- **Audit Logging** - Complete transaction trails

## 📁 Project Structure

```
BankX_Digital_Banking_Platform/
├── 🏗️ Backend (Spring Boot)
│   ├── src/main/java/com/projecct/bankx_digital_banking_platform/
│   │   ├── 💳 account/          # Account management
│   │   ├── 👤 customer/         # Customer operations  
│   │   ├── 📈 transaction/      # Transaction processing
│   │   ├── 🔐 security/         # Authentication & authorization
│   │   ├── 📧 notification/     # Email services
│   │   ├── 📊 audit/           # Audit logging
│   │   └── ⚙️ common/          # Shared utilities
│   └── src/main/resources/
│       ├── 🗄️ db/migration/    # Database migrations
│       └── ⚙️ application.properties
├── 🎨 Frontend (React + Vite)
│   ├── src/
│   │   ├── 🧩 components/      # UI components
│   │   ├── 🎭 context/         # React context
│   │   ├── 🔧 services/        # API services
│   │   └── 🎨 styles/          # CSS animations
│   └── public/                 # Static assets
└── 📚 docs/                    # Documentation
```

## 🎪 Sample Data

### 👤 **Demo User (John Doe)**
- **Email**: admin@bankx.com
- **Password**: admin123
- **KYC Status**: ✅ Verified
- **Total Balance**: $146,111.40

### 💳 **4 Bank Accounts**
1. **Primary Savings** (****1234) - $85,430.50
2. **Business Current** (****5678) - $12,750.25
3. **Digital Wallet** (****9012) - $2,249.75
4. **Emergency Fund** (****3456) - $45,680.90

### 📊 **10+ Sample Transactions**
- ✅ Salary deposits and cashback rewards
- ❌ Shopping, subscriptions, and bill payments
- 🔄 Inter-account transfers
- 📈 Success, pending, and failed statuses

## 🎨 Animation Showcase

### ✨ **Anime.js Features**
```javascript
// Staggered card animations
anime({
  targets: '.account-card',
  translateY: [50, 0],
  opacity: [0, 1],
  delay: anime.stagger(150),
  duration: 800,
  easing: 'easeOutExpo'
});
```

### 🎭 **Framer Motion Magic**
```javascript
// Smooth page transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

### 📊 **Chart.js Visualizations**
- **Balance Trends**: Gradient line charts
- **Expense Breakdown**: Interactive doughnut charts  
- **Income Analysis**: Animated bar charts
- **Real-time Updates**: Live data synchronization

## 🔧 Development

### 🏃‍♂️ **Running in Development**
```bash
# Backend (Terminal 1)
./mvnw spring-boot:run

# Frontend (Terminal 2)  
cd frontend && npm run dev
```

### 🧪 **Testing**
```bash
# Backend tests
./mvnw test

# Frontend tests
cd frontend && npm test
```

### 📦 **Building for Production**
```bash
# Backend
./mvnw clean package

# Frontend
cd frontend && npm run build
```

## 🌟 What Makes This Special

### 🎨 **Visual Excellence**
- **Cyberpunk Aesthetic**: Futuristic neon design
- **Smooth Animations**: Professional-grade transitions
- **Interactive Elements**: Engaging user experience
- **Modern UI/UX**: Clean, intuitive interface

### ⚡ **Performance**
- **60fps Animations**: GPU-accelerated transforms
- **Optimized Bundles**: Tree-shaking and code splitting
- **Fast Loading**: Minimal bundle sizes
- **Responsive**: Works perfectly on all devices

### 🔒 **Security**
- **JWT Authentication**: Secure token-based auth
- **Password Encryption**: BCrypt hashing
- **Role-based Access**: Granular permissions
- **Audit Trails**: Complete transaction logging

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Harsha Srikarthikeya Thumuluri**
- GitHub: [@Harsha430](https://github.com/Harsha430)
- Email: harshasrikarthikeyathumuluri@gmail.com

## 🙏 Acknowledgments

- **Spring Boot Team** - Amazing framework
- **React Team** - Powerful UI library  
- **Anime.js** - Smooth animations
- **Chart.js** - Beautiful charts
- **Framer Motion** - Professional animations

---

<div align="center">

**🎉 Built with ❤️ for the future of digital banking**

*Experience the most stunning banking UI ever created!*

[![⭐ Star this repo](https://img.shields.io/github/stars/Harsha430/BankX_Digital_Banking_Platform?style=social)](https://github.com/Harsha430/BankX_Digital_Banking_Platform)

</div>

