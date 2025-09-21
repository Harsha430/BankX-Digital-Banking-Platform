# 🚀 Quick Start Guide - BankX Digital Banking Platform

## ⚡ 1-Minute Setup

### 🎯 Option 1: Automated Setup (Recommended)
```bash
# Windows
.\start-dev.bat

# PowerShell (Windows/Mac/Linux)
.\start-dev.ps1
```

### 🎯 Option 2: Manual Setup

#### Step 1: Database Setup
```bash
# Create PostgreSQL database
createdb BankX
```

#### Step 2: Start Backend
```bash
# In project root directory
mvn spring-boot:run
```

#### Step 3: Start Frontend
```bash
# In new terminal, navigate to frontend
cd frontend
npm install --legacy-peer-deps
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/actuator/health

## 🔑 Login Credentials

```
Email: admin@bankx.com
Password: admin123
```

## 🎯 What You'll See

### 🔐 Login Page
- Stunning cyberpunk design with animated backgrounds
- Social login options (Google, Biometric)
- Smooth form animations

### 📊 Dashboard
- Real-time balance: **$146,111.40**
- Interactive charts showing:
  - Balance trends over time
  - Expense breakdown by category
  - Income vs expenses comparison
- Recent transactions feed

### 💳 Accounts Page
- **4 Beautiful Account Cards**:
  1. Primary Savings - $85,430.50
  2. Business Current - $12,750.25
  3. Digital Wallet - $2,249.75
  4. Emergency Fund - $45,680.90
- 3D gradient cards with hover effects
- Toggle balance visibility
- Quick actions (Transfer, Settings)

### 📈 Transactions Page
- **10+ Sample Transactions**
- Advanced filtering (type, date, search)
- Beautiful transaction cards with status indicators
- Real-time transaction stats

### 👤 Profile Page
- Tabbed interface (Personal, Security, Notifications, Preferences)
- Inline editing capabilities
- Security settings (2FA, Biometric, Login alerts)
- Theme and language preferences

## 🎨 Amazing Features You'll Experience

### ✨ Animations
- **Anime.js**: Staggered card animations, floating elements
- **Framer Motion**: Page transitions, hover effects
- **Custom CSS**: Neon glows, pulse effects, gradient shifts

### 📊 Data Visualizations
- **Chart.js**: Interactive line, doughnut, and bar charts
- **Real-time Updates**: Live data synchronization
- **Hover Effects**: Detailed tooltips and interactions

### 📱 Responsive Design
- **Mobile-First**: Perfect on all screen sizes
- **Touch-Friendly**: Optimized for mobile interactions
- **Collapsible Navigation**: Smart sidebar with overlay

## 🔧 Troubleshooting

### Backend Issues
```bash
# Check if PostgreSQL is running
pg_isready

# Check Java version
java -version

# Clean and rebuild
mvn clean install
```

### Frontend Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Check Node.js version
node --version
```

### Database Issues
```bash
# Reset database
dropdb BankX
createdb BankX
```

## 🎪 Sample Data Included

### 👤 Admin User
- **Name**: John Doe
- **Email**: admin@bankx.com
- **KYC Status**: ✅ Verified
- **Member Since**: January 15, 2023

### 💳 4 Bank Accounts
- Different account types with realistic balances
- Monthly transaction counts
- Interest rates and last activity

### 📊 10+ Transactions
- **Credits**: Salary deposits, cashback rewards
- **Debits**: Shopping, subscriptions, bills
- **Transfers**: Between accounts
- **Statuses**: Success, Pending, Failed

## 🌟 What Makes This Special

### 🎨 Visual Excellence
- **Cyberpunk Aesthetic**: Neon colors, glass morphism
- **Smooth Animations**: 60fps throughout
- **Interactive Elements**: Engaging user experience
- **Modern UI/UX**: Clean, intuitive design

### ⚡ Performance
- **Fast Loading**: Optimized bundles
- **Smooth Animations**: GPU acceleration
- **Responsive**: Works on all devices
- **Accessible**: ARIA compliant

### 🔒 Security
- **JWT Authentication**: Secure token-based auth
- **CORS Configured**: Proper cross-origin setup
- **Input Validation**: Request sanitization
- **Audit Trails**: Complete transaction logging

## 🎯 Next Steps

1. **Explore the UI**: Navigate through all pages
2. **Test Animations**: Hover over elements, click buttons
3. **View Charts**: Interact with data visualizations
4. **Mobile Testing**: Try on different screen sizes
5. **API Testing**: Use the `test-backend.http` file

## 🚨 Important Notes

- **Database**: Sample data is inserted automatically on first run
- **Authentication**: JWT tokens expire after 24 hours
- **Development**: Hot reload is enabled for both frontend and backend
- **Ports**: Make sure 8080 (backend) and 5173 (frontend) are available

---

## 🎉 Enjoy Your Stunning Banking Platform!

You now have access to the most beautiful and feature-rich digital banking platform ever created. The combination of:

- **Cyberpunk design** with neon aesthetics
- **Smooth animations** using modern libraries
- **Interactive charts** for data insights
- **Responsive design** for all devices
- **Real backend integration** with sample data

Makes this a truly **mind-blowing** experience! 🚀✨

**Happy Banking!** 💳💎