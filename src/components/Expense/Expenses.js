import React from 'react';
import '../../App.js';
import ExpenseRecord from './ExpenseRecord.jsx';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import _ from 'lodash';
import ipaddress from 'C:/Users/HP/OneDrive/Desktop/git/Khatabook_Frontend/src/setip.jsx';

const addExpense = require('./AddExpense')



export default function Expenses(props) {
    const ip = ipaddress();
    const [selectedDate, setSelectedDate] = useState(null);
    const inputRef = useRef(null);
    const [expenses, setExpenses] = useState([]);
    const [user_data] = useState(sessionStorage.getItem("user_data"))
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedPosts, setPaginatedPosts] = useState([]);
    const page_size = 5;
    const [refresh, setRefresh] = useState(false);
    let location = useLocation()
    console.log(location.state)
    // if(location.state !== null) {
    //     setRefresh(false)
    // }


    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: {
            // JSONstringify({"user_id": user_data.id})
        }
    }



    useEffect(() => {
        const userData = JSON.parse(user_data)
        fetch(ip + '/getExpense', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userData.id }),
        })
            .then((response) => response.json())
            .then((data) => {
                setExpenses(data)
                setPaginatedPosts(_(data).slice(0).take(page_size).value());
            });

        setPaginatedPosts(_(expenses).slice(0).take(page_size).value());
    }, [refresh]);

    let index;

    const getIndex = (i) => {
        index = i
    }

    const page_count = expenses ? Math.ceil(expenses.length / page_size) : 0;
    const pages = _.range(1, page_count + 1)

    const pagination = (page_no) => {
        setCurrentPage(page_no)
        const start_index = (page_no - 1) * page_size;
        const paginatedPosts = _(expenses).slice(start_index).take(page_size).value()
        setPaginatedPosts(paginatedPosts)
    }

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">My Expenses</h1>
                    </div>
                    <div className="lg:w-1/3 w-full mx-auto overflow-auto">
                        <input className="px-4 py-3" placeholder="Select a date" type="text" value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                            onClick={() => inputRef.current.focus()}
                            readOnly />
                        <input className="hidden" ref={inputRef} type="date" value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''} onChange={e => setSelectedDate(e.target.value)}
                        />
                        <input className="px-4 py-3" type="date" placeholder="Select a date" />
                    </div>
                    <br></br>

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
                                    paginatedPosts.map(
                                        (expense) => {
                                            return <ExpenseRecord expense={expense} getIndex={getIndex} refresh={setRefresh} />
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                        <br></br>
                        {paginatedPosts.length === 0 ? <div className='flex flex-col items-center'>No Records Found</div> : <div />}
                        <br />
                        <div className='flex flex-col items-center'>
                            <Link className="flex items-center text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" 
                                to='/addexpense'>
                                Add Expense</Link>
                        </div>

                        <br></br>

                        <div class="flex justify-center">
                            <nav>
                                <ul className="flex list-style-none">
                                    {
                                        pages.map((page) => (
                                            <li className={page === currentPage ? "page-item active" : "page-item"} onClick={() => pagination(page)} >
                                                {<a
                                                    className={page === currentPage ? "page-link relative block py-1.5 px-3 rounded border-0 bg-red-400 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-red-600 shadow-md focus:shadow-md" :
                                                        "page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"}
                                                >
                                                    {page}
                                                </a>}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
