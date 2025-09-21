import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  compact = false, 
  hover = true,
  ...props 
}) => {
  const baseClass = compact ? 'card-compact' : 'card';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: hover ? { y: -4, boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' } : {}
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={classes}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
