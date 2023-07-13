import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';
import './dashboard.css';
import React, { useEffect, useState } from 'react';
import ipaddress from "../../setip";

const data1 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function BarGraph() {
    const location = useLocation();
    const [expenses, setExpenses] = useState(1000);
    const [earnings, setEarnings] = useState(0);
    const [data, setData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    //  const [chartData, setChartData] = useState([]);
    const user_data = JSON.parse(sessionStorage.getItem('user_data')) ?? {};
    const user_id = user_data.id;
    const request = {
        "id": user_id
    };

    const request1 = {
        "user_id": user_id
    };

    const options = {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json",
        },
    };

    const options1 = {
        method: "POST",
        body: JSON.stringify(request1),
        headers: {
            "Content-Type": "application/json",
        },
    };

    useEffect(() => {
        // Fetch data from the API
        async function EarnandExpense() {
            const baseUrl = ipaddress;
            try {
                const totalEarningsResponse = await fetch(baseUrl + '/getTotalEarning', options);
                const totalEarningsData = await totalEarningsResponse.json();
                const totalEarnings = totalEarningsData[0].total_earning;
                setEarnings(totalEarnings);
                const totalExpensesResponse = await fetch(baseUrl + '/getTotalExpense', options);
                const totalExpensesData = await totalExpensesResponse.json();
                const totalExpenses = totalExpensesData[0].total_expense;
                console.log(totalExpenses);
                setExpenses(totalExpenses);

                console.log('lakshay garg')
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        EarnandExpense();
    }, []);

    useEffect(() => {
        console.log('123456')
        if (expenses !== null && earnings !== null) {
            setData([
                { name: 'Expenses', value: expenses },
                { name: 'Earnings', value: earnings },
            ]);
        }
    }, [expenses, earnings]);

    useEffect(() => {
        // Fetch data for pie chart
        console.log('1w122')
        async function getPieChartData() {
            try {
                const response = await fetch(ipaddress + '/getPieChartData', options1);
                const chartData = await response.json();
                console.log('abcdw')
                setPieChartData(chartData);
            } catch (error) {
                console.error('Error fetching pie chart data:', error);
            }
        }

        getPieChartData()
    }, []);

    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -mx-4 -mb-10 text-center">
                        <div className="sm:w-1/2 mb-10 px-4">
                            <div>
                                <BarChart width={335} height={500} data={data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Bar dataKey="value" fill="#ccaca9" />
                                </BarChart>
                            </div>
                            <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">My Expenses</h2>
                            <button className="flex mx-auto mt-6 text-white bg-red-500 border-0 py-2 px-5 focus:outline-none hover:bg-red-600 rounded">Button</button>
                        </div>
                        <div className="sm:w-1/2 mb-10 px-4">
                            <div>
                                <div className="rounded-lg overflow-hidden">
                                    <PieChart width={400} height={500}>
                                        <Pie data={pieChartData} dataKey="amount" nameKey="payment_method" cx={200} cy={200} outerRadius={80} fill="#8884d8">
                                            {
                                                pieChartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))
                                            }
                                        </Pie>
                                        <Tooltip formatter={(value) => `${value}`} />
                                        <Legend layout="vertical" align="right" />
                                    </PieChart>
                                </div>
                            </div>
                            <button className="flex mx-auto mt-6 text-white bg-red-500 border-0 py-2 px-5 focus:outline-none hover:bg-red-600 rounded">Button</button>
                        </div>
                    </div>
                </div>
            </section>
        </>


    );
}
