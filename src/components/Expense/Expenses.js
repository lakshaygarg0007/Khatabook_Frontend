import React from 'react';
import '../../App.js';
import ExpenseRecord from './ExpenseRecord.jsx';
import { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
const addExpense = require('./AddExpense')

export default function Expenses(props) {
    const [expenses, setExpenses] = useState([
        {
            record_name: 1,
            amount: 100.4,
            description: 'Spent on Domain Name',
            payment_method: 'Paytm',
            date: '8-Jan-2022',
        },
        {
            record_name: 2,
            amount: 100.4,
            description: 'Spent on Food',
            payment_method: 'Credit Card',
            date: '8-Jan-2022',
        },
        {
            record_name: 3,
            amount: 100.4,
            description: 'Spent on Domain Name',
            payment_method: 'Paytm',
            date: '8-Jan-2022',
        }
    ]);

    useEffect(() => {
        fetch('http://192.168.29.13:8000/getExpense')
            .then((response) => response.json())
            .then((data) => {
                setExpenses(data)
            });
    }
    )

    let index;
    const ondelete = () => {
        console.log("I am on delete", index)
        setExpenses(expenses.filter((e) => {
            return e !== index
        }

        )
        )
    }

    const getIndex = (i) => {
        index = i
    }

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">My Expenses</h1>
                    </div>
                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Amount</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Description</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Payment Method</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Date</th>
                                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    expenses.map(
                                        (expense) => {
                                            return <ExpenseRecord expense={expense} getIndex={getIndex} />
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                        <br></br>
                        <div className='flex flex-col items-center'>
                        <Link className="flex items-center text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" to='/addexpense'>Add Expense</Link>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
