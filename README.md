# BankX Digital Banking Platform

BankX is a digital banking platform built with Java and Spring Boot. It provides essential banking features such as account management, customer onboarding, transaction processing, notifications, and security.

## Features
- Account creation and management
- Customer onboarding
- Transaction processing
- Event-driven notifications (email alerts)
- Security and authentication
- Audit and reporting

## Technologies Used
- Java 17+
- Spring Boot
- Maven
- JPA/Hibernate
- Kafka (for event-driven architecture)

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.8+
- Git

### Setup Instructions
1. **Clone the repository:**
   ```
   git clone <your-repo-url>
   cd BankX-Digital-Banking-Platform
   ```
2. **Build the project:**
   ```
   mvn clean install
   ```
3. **Run the application:**
   ```
   mvn spring-boot:run
   ```

## Project Structure
- `src/main/java/com/projecct/bankx_digital_banking_platform/`
  - `account/` - Account domain logic
  - `customer/` - Customer domain logic
  - `transaction/` - Transaction domain logic
  - `notification/` - Event listeners and email service
  - `security/` - Security configuration and user details
  - `audit/` - Audit logging
  - `common/dto/` - Data transfer objects
- `src/main/resources/` - Application configuration and resources
- `src/test/java/` - Unit and integration tests

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Author
Harsha430

