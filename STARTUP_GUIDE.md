# 🚀 BankX Digital Banking Platform - Complete Setup Guide

## 🎯 Quick Start (5 Minutes)

### 1. 🗄️ Database Setup
```bash
# Start PostgreSQL (make sure it's running on localhost:5432)
# Create database
createdb BankX

# Or using psql:
psql -U postgres
CREATE DATABASE "BankX";
\q
```

### 2. 🔧 Backend Setup
```bash
# Navigate to project root
cd BankX_Digital_Banking_Platform

# Run the Spring Boot application
./mvnw spring-boot:run

# Or if you have Maven installed:
mvn spring-boot:run
```

### 3. 🎨 Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

### 4. 🌐 Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **Login Credentials**: 
  - Email: `admin@bankx.com`
  - Password: `admin123`

## 📊 Sample Data Included

### 👤 **Admin User (John Doe)**
- **4 Bank Accounts**: Savings, Current, Wallet, Emergency Fund
- **Total Balance**: $146,111.40
- **10+ Sample Transactions**: Credits, Debits, Transfers
- **KYC Status**: Verified

### 💳 **Account Details**
1. **Primary Savings** (****1234) - $85,430.50
2. **Business Current** (****5678) - $12,750.25  
3. **Digital Wallet** (****9012) - $2,249.75
4. **Emergency Fund** (****3456) - $45,680.90

### 📈 **Transaction Types**
- ✅ **Credits**: Salary deposits, cashback rewards
- ❌ **Debits**: Shopping, subscriptions, bills
- 🔄 **Transfers**: Between accounts
- 📊 **Status**: Success, Pending, Failed

## 🎨 UI Features

### ✨ **Stunning Animations**
- **Anime.js**: Staggered card animations, floating elements
- **Framer Motion**: Page transitions, hover effects
- **Chart.js**: Interactive data visualizations
- **CSS**: Neon glows, glass morphism, gradients

### 🎪 **Pages & Features**
1. **🔐 Login Page**: Cyberpunk design with social auth
2. **📊 Dashboard**: Real-time charts and statistics
3. **💳 Accounts**: 3D cards with balance management
4. **📈 Transactions**: Advanced filtering and search
5. **👤 Profile**: Tabbed settings with security options

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for all screen sizes
- **Collapsible Sidebar**: Smart navigation
- **Touch-Friendly**: Gesture interactions
- **Dark Theme**: Cyberpunk neon aesthetic

## 🔧 Technical Stack

### 🏗️ **Backend**
- **Spring Boot 3.5.5**: Modern Java framework
- **PostgreSQL**: Robust database
- **Spring Security**: JWT authentication
- **Flyway**: Database migrations
- **Redis**: Caching layer
- **Kafka**: Event streaming

### 🎨 **Frontend**
- **React 18**: Modern UI library
- **Vite**: Lightning-fast build tool
- **Framer Motion**: Production animations
- **Chart.js**: Data visualization
- **Anime.js**: Smooth animations
- **Lucide React**: Beautiful icons

## 🚀 Advanced Features

### 🔒 **Security**
- JWT token authentication
- Password encryption (BCrypt)
- Role-based access control
- Audit logging
- Session management

### 📊 **Data Visualization**
- Balance trend charts
- Expense breakdown (doughnut)
- Income vs expenses (bar)
- Real-time updates
- Interactive tooltips

### 🎭 **Animations**
- Page load animations
- Hover micro-interactions
- Loading states
- Transition effects
- Floating backgrounds

## 🐛 Troubleshooting

### Database Issues
```bash
# Check if PostgreSQL is running
pg_isready

# Reset database
dropdb BankX
createdb BankX
```

### Frontend Issues
```bash
# Clear node modules
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Clear browser cache
# Open DevTools > Application > Storage > Clear site data
```

### Backend Issues
```bash
# Clean and rebuild
./mvnw clean install

# Check logs
tail -f logs/application.log
```

## 🎯 Demo Credentials

### 🔑 **Login Options**
- **Email**: admin@bankx.com
- **Password**: admin123
- **Role**: USER (with admin privileges)

### 🎪 **Demo Features**
- View 4 different account types
- Browse 10+ sample transactions
- Interactive charts and graphs
- Mobile-responsive design
- Smooth animations throughout

## 🌟 What Makes This Special

### 🎨 **Visual Excellence**
- **Cyberpunk Aesthetic**: Neon colors, glass effects
- **Smooth Animations**: 60fps throughout
- **Interactive Elements**: Hover effects, transitions
- **Modern Design**: Clean, professional, futuristic

### ⚡ **Performance**
- **Fast Loading**: Optimized bundles
- **Smooth Animations**: GPU acceleration
- **Responsive**: Works on all devices
- **Accessible**: ARIA compliant

### 🔧 **Developer Experience**
- **Hot Reload**: Instant updates
- **Type Safety**: Modern JavaScript
- **Component Architecture**: Reusable UI
- **Clean Code**: Well-structured and documented

---

**🎉 Enjoy your stunning BankX Digital Banking Platform!**

*Built with ❤️ using cutting-edge technologies and beautiful animations*