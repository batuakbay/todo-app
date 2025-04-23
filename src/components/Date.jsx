import './Date.css';
const ExpenseDate = ({ date }) => {
    const newDate = new Date(date);
  
    const month = newDate.toLocaleDateString("en-US", { month: "numeric" });
    const day = newDate.toLocaleDateString("en-US", { day: "2-digit" });
    const year = newDate.getFullYear();
  
    return (
      <div className="expense-date">
        <div className="day">{day}</div>
        <div className="month">{month}</div>
        <div className="year">{year}</div>
        
        
      </div>
    );
  };
  
  export default ExpenseDate;