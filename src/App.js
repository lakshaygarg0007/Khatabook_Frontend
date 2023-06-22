import './App.css';
import Header from './components/Header';
import Expenses from './components/Expense/Expenses';
import Earnings from './components/Earnings/Earnings';
import AddEarning from './components/Earnings/AddEarning';
import AddExpense from './components/Expense/AddExpense';
import { Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Signup from './Signup';
// import BarGraph from './components/Dashboard/dashboard';
import Goto from './GoTo';

function App() {
  return (
    <>
      <Router>
          <Header />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/expenses' element={<Expenses />} />
            <Route path='/earnings' element={<Earnings />} />
            <Route path='/addearning' element={<AddEarning />} />
            <Route path='/addexpense' element={<AddExpense />} />
            <Route path='/' element={<Goto/>} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
