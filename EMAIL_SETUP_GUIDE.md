# 📧 Email Notifications Setup Guide

## ✅ Current Status
**Email system is FULLY IMPLEMENTED and ready to use!**

When you create an account, the system will:
1. ✅ Create the account in database
2. ✅ Generate an outbox event
3. ✅ Send Kafka message to "account.events" topic
4. ✅ Email consumer processes the message
5. ✅ Send welcome email to your address

## 📨 Email You'll Receive

**Subject:** `Welcome to BankX, Harshasri`

**Content:** 
```
Your account [ACCOUNT_NUMBER] has been successfully created.
```

**Sent To:** `harshasrikarthikeyathumuluri@gmail.com`

## 🔧 To Enable Email Sending

### Option 1: Use Gmail SMTP (Recommended)

1. **Update application.properties:**
```properties
spring.mail.username=your-gmail@gmail.com
spring.mail.password=your-gmail-app-password
```

2. **Get Gmail App Password:**
   - Go to Google Account settings
   - Enable 2-Factor Authentication
   - Generate App Password for "Mail"
   - Use that password (not your regular Gmail password)

### Option 2: Use Other Email Providers

**Outlook/Hotmail:**
```properties
spring.mail.host=smtp-mail.outlook.com
spring.mail.port=587
spring.mail.username=your-email@outlook.com
spring.mail.password=your-password
```

**Yahoo:**
```properties
spring.mail.host=smtp.mail.yahoo.com
spring.mail.port=587
spring.mail.username=your-email@yahoo.com
spring.mail.password=your-app-password
```

## 🚀 Quick Setup Steps

### 1. Configure Email Credentials
Edit `src/main/resources/application.properties`:
```properties
spring.mail.username=your-actual-email@gmail.com
spring.mail.password=your-app-password
```

### 2. Restart Backend
```bash
# Stop current backend (Ctrl+C)
# Then restart:
mvn spring-boot:run
```

### 3. Test Email Notifications
1. Create a new account (Savings/Current/Wallet)
2. Check your email inbox
3. You should receive welcome email within seconds

## 📋 Email Templates

### Account Creation Email
- **Trigger:** When you create any account
- **Subject:** Welcome to BankX, [Your Name]
- **Content:** Account creation confirmation with account number

### Transaction Email (Also Available)
- **Trigger:** When you make transactions
- **Subject:** Transaction Alert
- **Content:** Transaction details and amount

## 🔍 Troubleshooting

### If Emails Don't Send

1. **Check Backend Logs:**
   - Look for email sending errors
   - Verify SMTP connection

2. **Verify Email Settings:**
   - Correct email/password
   - App password (not regular password)
   - SMTP host and port

3. **Check Spam Folder:**
   - Emails might go to spam initially
   - Mark as "Not Spam" to whitelist

### Common Issues

**"Authentication Failed":**
- Use App Password, not regular password
- Enable 2FA on Gmail first

**"Connection Timeout":**
- Check firewall settings
- Verify SMTP host and port

**"Email Not Received":**
- Check spam/junk folder
- Verify email address is correct

## 🎯 Testing Email System

### 1. Enable Email Configuration
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

### 2. Restart Backend
```bash
mvn spring-boot:run
```

### 3. Create Test Account
- Go to Accounts page
- Click "Create Your First Account"
- Choose account type and initial balance
- Submit form

### 4. Check Email
- Check your inbox: harshasrikarthikeyathumuluri@gmail.com
- Should receive welcome email within 30 seconds

## 🎉 Benefits of Email Notifications

### For Account Management
- **Welcome emails** for new accounts
- **Account confirmations** with details
- **Professional communication**

### For Transactions
- **Transaction alerts** for all operations
- **Security notifications** for account activity
- **Balance updates** and confirmations

### For Security
- **Login alerts** (can be added)
- **Password changes** (can be added)
- **Suspicious activity** notifications

## 🔒 Security Notes

### Email Security
- **Never share app passwords**
- **Use dedicated email for banking**
- **Enable 2FA on email account**

### Production Considerations
- **Use environment variables** for credentials
- **Set up proper email templates**
- **Configure email rate limiting**
- **Add unsubscribe options**

## 📞 Support

If you need help setting up emails:
1. **Check application logs** for errors
2. **Verify email provider settings**
3. **Test with simple email first**
4. **Check firewall/network settings**

**The email system is ready - just add your email credentials and restart!** 📧