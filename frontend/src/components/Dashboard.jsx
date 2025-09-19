import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Shield,
  Clock,
  Users
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { accountAPI, transactionAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import anime from 'animejs';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    totalAccounts: 0
  });
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch accounts and transactions
        const [accountsData, transactionsData] = await Promise.all([
          accountAPI.getAccounts(),
          transactionAPI.getTransactions()
        ]);
        
        setAccounts(accountsData);
        setTransactions(transactionsData.slice(0, 4)); // Show only recent 4
        
        // Calculate stats
        const totalBalance = accountsData.reduce((sum, acc) => sum + acc.balance, 0);
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const monthlyTransactions = transactionsData.filter(t => {
          const transactionDate = new Date(t.date);
          return transactionDate.getMonth() === currentMonth && 
                 transactionDate.getFullYear() === currentYear;
        });
        
        const monthlyIncome = monthlyTransactions
          .filter(t => t.type === 'CREDIT')
          .reduce((sum, t) => sum + t.amount, 0);
          
        const monthlyExpenses = monthlyTransactions
          .filter(t => t.type === 'DEBIT')
          .reduce((sum, t) => sum + t.amount, 0);
        
        setStats({
          totalBalance,
          monthlyIncome,
          monthlyExpenses,
          totalAccounts: accountsData.length
        });
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (!loading) {
      // Animate stats cards
      anime({
        targets: '.stat-card',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutExpo'
      });

      // Animate balance number
      anime({
        targets: '.balance-amount',
        innerHTML: [0, stats.totalBalance],
        duration: 2000,
        round: 100,
        easing: 'easeOutExpo'
      });
    }
  }, [loading, stats.totalBalance]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(139, 92, 246, 0.1)',
        },
        ticks: {
          color: '#64748b',
        },
      },
      y: {
        grid: {
          color: 'rgba(139, 92, 246, 0.1)',
        },
        ticks: {
          color: '#64748b',
        },
      },
    },
  };

  const balanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [85000, 92000, 88000, 105000, 118000, 125430],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  const expenseData = {
    labels: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment'],
    datasets: [
      {
        data: [850, 420, 680, 1200, 270],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [7500, 8200, 7800, 8500, 8750, 8750],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderRadius: 8,
      },
      {
        label: 'Expenses',
        data: [3200, 3800, 3100, 3600, 3420, 3420],
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        borderRadius: 8,
      },
    ],
  };

  if (loading) {
    return <LoadingSpinner size="large" text="Loading your dashboard..." />;
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="gradient-text">Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</h1>
          <p className="header-subtitle">Here's what's happening with your money today</p>
        </div>
        <div className="header-actions">
          <motion.button 
            className="action-btn primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap size={18} />
            Quick Transfer
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <motion.div className="stat-card balance-card">
          <div className="stat-header">
            <div className="stat-icon balance">
              <DollarSign size={24} />
            </div>
            <div className="stat-trend positive">
              <TrendingUp size={16} />
              <span>+12.5%</span>
            </div>
          </div>
          <div className="stat-content">
            <h3>Total Balance</h3>
            <div className="balance-amount">${stats.totalBalance.toLocaleString()}</div>
            <p>Across all accounts</p>
          </div>
          <div className="stat-glow"></div>
        </motion.div>

        <motion.div className="stat-card income-card">
          <div className="stat-header">
            <div className="stat-icon income">
              <ArrowUpRight size={24} />
            </div>
            <div className="stat-trend positive">
              <TrendingUp size={16} />
              <span>+8.2%</span>
            </div>
          </div>
          <div className="stat-content">
            <h3>Monthly Income</h3>
            <div className="stat-value">${stats.monthlyIncome.toLocaleString()}</div>
            <p>This month</p>
          </div>
        </motion.div>

        <motion.div className="stat-card expense-card">
          <div className="stat-header">
            <div className="stat-icon expense">
              <ArrowDownRight size={24} />
            </div>
            <div className="stat-trend negative">
              <TrendingDown size={16} />
              <span>-3.1%</span>
            </div>
          </div>
          <div className="stat-content">
            <h3>Monthly Expenses</h3>
            <div className="stat-value">${stats.monthlyExpenses.toLocaleString()}</div>
            <p>This month</p>
          </div>
        </motion.div>

        <motion.div className="stat-card accounts-card">
          <div className="stat-header">
            <div className="stat-icon accounts">
              <CreditCard size={24} />
            </div>
            <div className="stat-badge">
              <Shield size={14} />
              <span>Secured</span>
            </div>
          </div>
          <div className="stat-content">
            <h3>Active Accounts</h3>
            <div className="stat-value">{stats.totalAccounts}</div>
            <p>All verified</p>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <motion.div 
          className="chart-card balance-chart"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="chart-header">
            <h3>Balance Trend</h3>
            <div className="chart-period">
              <button className="period-btn active">6M</button>
              <button className="period-btn">1Y</button>
              <button className="period-btn">All</button>
            </div>
          </div>
          <div className="chart-container">
            <Line data={balanceData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div 
          className="chart-card expense-breakdown"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="chart-header">
            <h3>Expense Breakdown</h3>
            <span className="chart-subtitle">This month</span>
          </div>
          <div className="chart-container">
            <Doughnut 
              data={expenseData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: '#64748b',
                      usePointStyle: true,
                      padding: 20,
                    },
                  },
                },
              }} 
            />
          </div>
        </motion.div>

        <motion.div 
          className="chart-card monthly-comparison"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="chart-header">
            <h3>Income vs Expenses</h3>
            <span className="chart-subtitle">Last 6 months</span>
          </div>
          <div className="chart-container">
            <Bar data={monthlyData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div 
        className="transactions-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="section-header">
          <h3>Recent Transactions</h3>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="transactions-list">
          {transactions.map((transaction, index) => (
            <motion.div 
              key={transaction.id}
              className={`transaction-item ${transaction.type.toLowerCase()}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02, x: 8 }}
            >
              <div className="transaction-icon">
                {transaction.type === 'CREDIT' && <ArrowUpRight size={20} />}
                {transaction.type === 'DEBIT' && <ArrowDownRight size={20} />}
                {transaction.type === 'TRANSFER' && <ArrowUpRight size={20} />}
              </div>
              <div className="transaction-details">
                <h4>{transaction.description}</h4>
                <div className="transaction-meta">
                  <Clock size={12} />
                  <span>{transaction.time}</span>
                </div>
              </div>
              <div className="transaction-amount">
                <span className={`amount ${transaction.type.toLowerCase()}`}>
                  {transaction.type === 'DEBIT' ? '-' : '+'}${transaction.amount}
                </span>
                <span className="status success">Success</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;