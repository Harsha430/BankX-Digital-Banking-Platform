# 🚀 Deployment Guide

## 🌐 Production Deployment

### 📋 Prerequisites
- Java 17+
- PostgreSQL 15+
- Redis 6+
- Apache Kafka 3.0+
- Node.js 18+
- Docker (optional)

### 🔧 Environment Configuration

#### Backend Configuration
Create `application-prod.properties`:
```properties
# Database
spring.datasource.url=jdbc:postgresql://your-db-host:5432/bankx_prod
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

# Redis
spring.data.redis.host=${REDIS_HOST}
spring.data.redis.port=${REDIS_PORT}
spring.data.redis.password=${REDIS_PASSWORD}

# Kafka
spring.kafka.bootstrap-servers=${KAFKA_SERVERS}

# JWT
jwt.secret=${JWT_SECRET}
jwt.expiration=86400000

# Email
spring.mail.host=${SMTP_HOST}
spring.mail.username=${SMTP_USERNAME}
spring.mail.password=${SMTP_PASSWORD}

# Logging
logging.level.com.projecct.bankx=INFO
logging.file.name=logs/bankx.log
```

#### Frontend Configuration
Create `.env.production`:
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_APP_NAME=BankX Digital Banking
```

### 🐳 Docker Deployment

#### Docker Compose
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: bankx_prod
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:6-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    ports:
      - "6379:6379"

  kafka:
    image: confluentinc/cp-kafka:latest
    environment:
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    ports:
      - "9092:9092"

  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  bankx-backend:
    build: .
    environment:
      SPRING_PROFILES_ACTIVE: prod
      DB_USERNAME: ${DB_USERNAME}
      DB_PASSWORD: ${DB_PASSWORD}
      REDIS_HOST: redis
      KAFKA_SERVERS: kafka:9092
    ports:
      - "8080:8080"
    depends_on:
      - postgres
      - redis
      - kafka

  bankx-frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - bankx-backend

volumes:
  postgres_data:
```

#### Backend Dockerfile
```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/BankX_Digital_Banking_Platform-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### ☁️ Cloud Deployment

#### AWS Deployment
1. **RDS PostgreSQL** for database
2. **ElastiCache Redis** for caching
3. **Amazon MSK** for Kafka
4. **Elastic Beanstalk** for backend
5. **S3 + CloudFront** for frontend

#### Azure Deployment
1. **Azure Database for PostgreSQL**
2. **Azure Cache for Redis**
3. **Azure Event Hubs** (Kafka-compatible)
4. **Azure App Service** for backend
5. **Azure Static Web Apps** for frontend

#### Google Cloud Deployment
1. **Cloud SQL PostgreSQL**
2. **Memorystore Redis**
3. **Cloud Pub/Sub** for messaging
4. **Cloud Run** for backend
5. **Firebase Hosting** for frontend

### 🔒 Security Checklist

- [ ] Use HTTPS in production
- [ ] Set strong JWT secret
- [ ] Configure CORS properly
- [ ] Enable database SSL
- [ ] Set up firewall rules
- [ ] Use environment variables for secrets
- [ ] Enable audit logging
- [ ] Set up monitoring and alerts

### 📊 Monitoring

#### Health Checks
```bash
# Backend health
curl https://your-api-domain.com/actuator/health

# Database connection
curl https://your-api-domain.com/actuator/health/db
```

#### Metrics Endpoints
- `/actuator/metrics` - Application metrics
- `/actuator/prometheus` - Prometheus metrics
- `/actuator/info` - Application info

### 🔄 CI/CD Pipeline

#### GitHub Actions Example
```yaml
name: Deploy BankX

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Build Backend
      run: ./mvnw clean package
    
    - name: Build Frontend
      run: |
        cd frontend
        npm ci
        npm run build
    
    - name: Deploy to Production
      run: |
        # Your deployment script here
        docker-compose up -d
```

### 📈 Performance Optimization

#### Backend
- Enable JVM optimizations
- Configure connection pooling
- Set up Redis caching
- Enable gzip compression

#### Frontend
- Enable asset compression
- Use CDN for static files
- Implement lazy loading
- Optimize bundle size

### 🔧 Maintenance

#### Database Backup
```bash
# Daily backup
pg_dump -h localhost -U username bankx_prod > backup_$(date +%Y%m%d).sql
```

#### Log Rotation
```bash
# Configure logrotate
/var/log/bankx/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
}
```

### 🚨 Troubleshooting

#### Common Issues
1. **Database Connection**: Check connection string and credentials
2. **Redis Connection**: Verify Redis is running and accessible
3. **Kafka Issues**: Check Kafka broker status
4. **Frontend 404**: Ensure proper routing configuration
5. **CORS Errors**: Configure allowed origins

#### Logs Location
- Backend: `/var/log/bankx/application.log`
- Frontend: Browser console and network tab
- Database: PostgreSQL logs
- System: `/var/log/syslog`