# 🏦 BankX Digital Banking Platform

A comprehensive full-stack digital banking application built with **Spring Boot** and **React**, featuring modern UI/UX, secure authentication, and real-time banking operations.

![BankX Banner](https://img.shields.io/badge/BankX-Digital%20Banking-blue?style=for-the-badge&logo=bank)

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based authentication** with secure token management
- **User registration** with email verification
- **Password encryption** using BCrypt
- **Role-based access control** (Admin/Customer)
- **CORS protection** for secure API access

### 💳 Account Management
- **Multiple account types**: Savings, Current, Digital Wallet
- **Real-time balance tracking**
- **Account creation** with initial deposit options
- **Account type upgrades**
- **Professional account cards** with modern UI

### 💰 Transaction System
- **Deposit operations** with instant balance updates
- **Withdrawal operations** with balance validation
- **Inter-account transfers** with real-time processing
- **Transaction history** with detailed records
- **Transaction status tracking** (Success/Pending/Failed)

### 📊 Dashboard & Analytics
- **Real-time financial overview**
- **Interactive charts** and visualizations
- **Monthly income/expense tracking**
- **Account balance trends**
- **Transaction categorization**

### 📧 Notifications
- **Email notifications** for account creation
- **Transaction alerts** via email
- **Kafka-based event processing**
- **Customizable notification preferences**

### 🎨 Modern UI/UX
- **Responsive design** for all devices
- **Dark/Light theme** support
- **Smooth animations** with Framer Motion
- **Professional banking interface**
- **Accessibility compliant**

## 🛠️ Technology Stack

### Backend
- **Java 17** - Modern Java features
- **Spring Boot 3.x** - Enterprise framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database operations
- **PostgreSQL** - Primary database
- **Redis** - Caching layer
- **Apache Kafka** - Event streaming
- **JWT** - Token-based authentication
- **Maven** - Dependency management

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **Axios** - HTTP client
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Chart.js** - Data visualization
- **CSS3** - Modern styling

### DevOps & Tools
- **Docker** - Containerization
- **Git** - Version control
- **GitHub Actions** - CI/CD (planned)
- **Postman** - API testing

## 🚀 Quick Start

### Prerequisites
- **Java 17+**
- **Node.js 16+**
- **PostgreSQL 12+**
- **Maven 3.6+**
- **Git**

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/bankx-digital-banking-platform.git
cd bankx-digital-banking-platform
```

### 2. Database Setup
```sql
-- Create PostgreSQL database
CREATE DATABASE "BankX";

-- Update credentials in src/main/resources/application.properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Backend Setup
```bash
# Install dependencies and start backend
mvn clean install
mvn spring-boot:run
```

### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 5. Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html

## 📋 Demo Credentials

### Admin Account
- **Email**: admin@bankx.com
- **Password**: admin123

### Test User Registration
Use the registration form to create new customer accounts with:
- Full name, email, phone
- Username and password
- Address information

## 🏗️ Project Structure

```
bankx-digital-banking-platform/
├── src/main/java/com/projecct/bankx_digital_banking_platform/
│   ├── account/           # Account management
│   ├── customer/          # Customer operations
│   ├── transaction/       # Transaction processing
│   ├── security/          # Authentication & authorization
│   ├── notification/      # Email services
│   └── kafka/            # Event processing
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API services
│   │   ├── context/      # React context
│   │   └── assets/       # Static assets
│   └── public/           # Public files
└── docs/                 # Documentation
```

## 🔧 Configuration

### Email Notifications
```properties
# Configure SMTP settings in application.properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

### Database Configuration
```properties
# PostgreSQL settings
spring.datasource.url=jdbc:postgresql://localhost:5432/BankX
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### JWT Configuration
```properties
# JWT settings
app.jwt.secret=your-secret-key
app.jwt.expiration=86400000
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Customer Endpoints
- `POST /api/customers/register` - Register new customer
- `GET /api/customers/{id}` - Get customer details

### Account Endpoints
- `GET /api/accounts/customer/{customerId}` - Get customer accounts
- `POST /api/accounts/customer/{customerId}` - Create new account
- `PUT /api/accounts/{id}/type` - Update account type

### Transaction Endpoints
- `POST /api/transactions/deposit` - Deposit money
- `POST /api/transactions/withdraw` - Withdraw money
- `POST /api/transactions/transfer` - Transfer between accounts
- `GET /api/transactions/account/{accountId}` - Get account transactions

## 🧪 Testing

### Backend Tests
```bash
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### API Testing
Use the provided `test-backend.http` file with REST Client or Postman.

## 🚀 Deployment

### Production Build
```bash
# Backend
mvn clean package -DskipTests

# Frontend
cd frontend
npm run build
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spring Boot** team for the excellent framework
- **React** team for the powerful UI library
- **PostgreSQL** for reliable database management
- **Apache Kafka** for event streaming capabilities

## 📞 Support

For support and questions:
- Create an [Issue](https://github.com/yourusername/bankx-digital-banking-platform/issues)
- Check the [Documentation](docs/)
- Review [Troubleshooting Guide](TROUBLESHOOTING.md)

---

**Built with ❤️ for modern digital banking**

![GitHub stars](https://img.shields.io/github/stars/yourusername/bankx-digital-banking-platform?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/bankx-digital-banking-platform?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/bankx-digital-banking-platform)
![GitHub license](https://img.shields.io/github/license/yourusername/bankx-digital-banking-platform)