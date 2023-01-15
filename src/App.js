import './App.css';
import Header from './components/Header';
import Expenses from './components/Expense/Expenses';
import Earnings from './components/Earnings/Earnings';
import AddRecord from './components/Earnings/AddRecord';
import AddExpense from './components/Expense/AddExpense';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './Signup';
import BarGraph from './components/Dashboard/dashboard';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/' element={<Expenses />} />
          <Route path='/earnings' element={<Earnings />} />
          <Route path='/addearning' element={<AddRecord />} />
          <Route path='/addexpense' element={<AddExpense />} />
          <Route path='/home' element={<BarGraph />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
