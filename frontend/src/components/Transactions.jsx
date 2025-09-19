import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { transactionAPI } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import anime from 'animejs';
import './Transactions.css';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [dateRange, setDateRange] = useState('7d');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const transactionsData = await transactionAPI.getTransactions({
          type: filterType,
          search: searchTerm
        });
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [filterType, searchTerm]);

  useEffect(() => {
    if (!loading && transactions.length > 0) {
      // Animate transaction cards
      anime({
        targets: '.transaction-card',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(50),
        duration: 600,
        easing: 'easeOutExpo'
      });
    }
  }, [loading, transactions]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || transaction.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle size={16} className="status-icon success" />;
      case 'PENDING':
        return <AlertCircle size={16} className="status-icon pending" />;
      case 'FAILED':
        return <XCircle size={16} className="status-icon failed" />;
      default:
        return null;
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'CREDIT':
        return <ArrowUpRight size={20} className="transaction-type-icon credit" />;
      case 'DEBIT':
        return <ArrowDownRight size={20} className="transaction-type-icon debit" />;
      case 'TRANSFER':
        return <ArrowUpRight size={20} className="transaction-type-icon transfer" />;
      default:
        return <DollarSign size={20} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <LoadingSpinner size="large" text="Loading transactions..." />;
  }

  return (
    <div className="transactions-page">
      {/* Header */}
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <h1 className="gradient-text">Transaction History</h1>
          <p className="header-subtitle">Track all your financial activities</p>
        </div>
        <div className="header-actions">
          <motion.button 
            className="action-btn secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} />
            Export
          </motion.button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div 
        className="filters-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <Filter size={16} />
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">All Types</option>
              <option value="CREDIT">Credit</option>
              <option value="DEBIT">Debit</option>
              <option value="TRANSFER">Transfer</option>
            </select>
          </div>

          <div className="filter-group">
            <Calendar size={16} />
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="filter-select"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Transaction Stats */}
      <motion.div 
        className="transaction-stats"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="stat-item">
          <div className="stat-icon credit">
            <ArrowUpRight size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Credits</span>
            <span className="stat-value credit">+$2,625.00</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon debit">
            <ArrowDownRight size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Debits</span>
            <span className="stat-value debit">-$586.23</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon transfer">
            <ArrowUpRight size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Transfers</span>
            <span className="stat-value transfer">$1,000.00</span>
          </div>
        </div>
      </motion.div>

      {/* Transactions List */}
      <motion.div 
        className="transactions-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {filteredTransactions.map((transaction, index) => (
          <motion.div 
            key={transaction.id}
            className={`transaction-card ${transaction.type.toLowerCase()} ${transaction.status.toLowerCase()}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.02, x: 8 }}
          >
            <div className="transaction-main">
              <div className="transaction-icon-wrapper">
                {getTransactionIcon(transaction.type)}
                <div className="icon-glow"></div>
              </div>
              
              <div className="transaction-details">
                <div className="transaction-header">
                  <h4 className="transaction-description">{transaction.description}</h4>
                  <div className="transaction-status">
                    {getStatusIcon(transaction.status)}
                    <span className={`status-text ${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
                
                <div className="transaction-meta">
                  <span className="transaction-id">{transaction.id}</span>
                  <span className="transaction-account">{transaction.account}</span>
                  <span className="transaction-category">{transaction.category}</span>
                </div>
              </div>
            </div>

            <div className="transaction-right">
              <div className={`transaction-amount ${transaction.type.toLowerCase()}`}>
                {transaction.type === 'DEBIT' ? '-' : '+'}${transaction.amount.toFixed(2)}
              </div>
              <div className="transaction-date">
                <Clock size={12} />
                <span>{formatDate(transaction.date)}</span>
              </div>
            </div>

            <div className="transaction-glow"></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Load More */}
      <motion.div 
        className="load-more-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.button 
          className="load-more-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Load More Transactions
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Transactions;