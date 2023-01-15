import React, { useEffect, useState } from 'react';
import '../../App.js';
import EarningRecord from './EarningRecord.jsx';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import Expenses from '../Expense/Expenses.js';
import Pagination from './Pagination';

export default function Earnings(props) {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [earnings, setEarning] = useState([
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
            description: 'Freelancing',
            payment_method: 'Bank',
            date: '8-Jan-2022',
        },
        {
            record_name: 3,
            amount: 100.4,
            description: 'Mobile Book',
            payment_method: 'Paytm',
            date: '8-Jan-2022',
        }
    ]);

   // let size = 3;

    useEffect(() => {
        fetch('http://192.168.29.13:8000/usersList')
            .then((response) => response.json())
            .then((data) => {
                setEarning(data)
            });
        console.log(earnings);
        setData(earnings);
        setTotalPages(3);
       //size = earnings.size
    }, [currentPage]
    )

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };

    const handleRecordsPerPageChange = e => {
        setRecordsPerPage(e.target.value);
    }

    const addRecord = (() => {
        return (
            <Routes>
                <Route path="/" element={<Expenses />} />
            </Routes>
        );
    });

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">My Earnings</h1>
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
                                    earnings.map((
                                        (earning) => {
                                            return <EarningRecord earning={earning} />
                                        }
                                        )   
                                    )
                                }
                            </tbody>
                        </table>
                        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} recordsPerPage={recordsPerPage} />
                        <br />
                    </div>
                    <div className='flex flex-col items-center'>
                        <Link className="flex items-center text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" to="/addearning">Add Earning</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
