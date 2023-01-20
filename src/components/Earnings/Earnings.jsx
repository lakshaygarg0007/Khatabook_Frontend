import React, { useEffect, useState } from 'react';
import '../../App.js';
import EarningRecord from './EarningRecord.jsx';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import Expenses from '../Expense/Expenses.js';
import Pagination from './Pagination';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';

export default function Earnings(props) {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [paginatedPosts, setPaginatedPosts] = useState([]);
    const [user_data] = useState(sessionStorage.getItem("user_data"))

    const [earnings, setEarning] = useState([]);
    const page_size = 5;

    // let size = 3;

    const userData = JSON.parse(user_data)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userData.id })
    }

    useEffect(() => {
        console.log('iam')
        fetch('http://192.168.29.13:8000/getEarning', options)
            .then((response) => response.json())
            .then((data) => {
                setEarning(data)
                //(earnings)
                //console.log(earnings)
                console.log(data)
                setPaginatedPosts(_(data).slice(0).take(page_size).value());
                setTotalPages(3);
            });
        console.log(earnings);
        setData(earnings);
        setTotalPages(3);
        setPaginatedPosts(_(earnings).slice(0).take(page_size).value());
        //size = earnings.size
    }, []
    )

    let index;

    const getIndex = (i) => {
        index = i
    }

    const page_count = earnings ? Math.ceil(earnings.length / page_size) : 0;
    //if (page_count === 1) return null;
    const pages = _.range(1, page_count + 1)

    const pagination = (page_no) => {
        setCurrentPage(page_no)
        const start_index = (page_no - 1) * page_size;
        const paginatedPosts = _(earnings).slice(start_index).take(page_size).value()
        setPaginatedPosts(paginatedPosts)
    }

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
                                    paginatedPosts.map((
                                        (earning) => {
                                            return <EarningRecord earning={earning} />
                                        }
                                    )
                                    )
                                }
                            </tbody>
                        </table>
                        <br />
                    </div>
                    <div className='flex flex-col items-center'>
                        <Link className="flex items-center text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" to="/addearning">Add Earning</Link>
                    </div>
                    <br />
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
            </section>
        </div>
    )
}
