# 🤝 Contributing to BankX Digital Banking Platform

Thank you for your interest in contributing to BankX! We welcome contributions from the community and are excited to see what you'll bring to this project.

## 🎯 How to Contribute

### 🐛 Reporting Bugs
- Use the GitHub Issues tab to report bugs
- Include detailed steps to reproduce the issue
- Provide screenshots if applicable
- Mention your environment (OS, browser, versions)

### 💡 Suggesting Features
- Open an issue with the "enhancement" label
- Describe the feature and its benefits
- Include mockups or examples if possible

### 🔧 Code Contributions

#### 1. Fork & Clone
```bash
git clone https://github.com/YOUR_USERNAME/BankX_Digital_Banking_Platform.git
cd BankX_Digital_Banking_Platform
```

#### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
```

#### 3. Make Changes
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

#### 4. Test Your Changes
```bash
# Backend tests
./mvnw test

# Frontend tests
cd frontend && npm test
```

#### 5. Commit & Push
```bash
git add .
git commit -m "feat: add amazing new feature"
git push origin feature/your-feature-name
```

#### 6. Create Pull Request
- Use a clear title and description
- Reference any related issues
- Include screenshots for UI changes

## 📝 Code Style Guidelines

### Backend (Java/Spring Boot)
- Follow Java naming conventions
- Use meaningful variable and method names
- Add JavaDoc comments for public methods
- Keep methods small and focused

### Frontend (React/JavaScript)
- Use functional components with hooks
- Follow React best practices
- Use meaningful component and variable names
- Add PropTypes or TypeScript for type safety

### CSS/Styling
- Use CSS custom properties for colors
- Follow BEM naming convention
- Keep animations smooth (60fps)
- Ensure responsive design

## 🎨 Animation Guidelines

When adding animations:
- Use `transform` and `opacity` for performance
- Keep animations under 300ms for micro-interactions
- Use easing functions for natural motion
- Test on mobile devices

## 🧪 Testing

### Backend Testing
- Write unit tests for service methods
- Add integration tests for controllers
- Test error scenarios
- Maintain test coverage above 80%

### Frontend Testing
- Test component rendering
- Test user interactions
- Mock API calls
- Test responsive behavior

## 📚 Documentation

- Update README.md for new features
- Add inline code comments
- Update API documentation
- Include examples in documentation

## 🚀 Development Setup

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 15+
- Maven 3.8+

### Quick Setup
```bash
# Database
createdb BankX

# Backend
./mvnw spring-boot:run

# Frontend
cd frontend
npm install --legacy-peer-deps
npm run dev
```

## 🎯 Areas We Need Help

- 🎨 UI/UX improvements
- 🔒 Security enhancements
- 📱 Mobile optimizations
- 🧪 Test coverage
- 📚 Documentation
- 🌐 Internationalization
- ♿ Accessibility improvements

## 💬 Community

- Join our discussions in GitHub Issues
- Share your ideas and feedback
- Help other contributors
- Review pull requests

## 🏆 Recognition

Contributors will be:
- Listed in our README
- Mentioned in release notes
- Invited to our contributor Discord (coming soon)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making BankX better! 🚀**