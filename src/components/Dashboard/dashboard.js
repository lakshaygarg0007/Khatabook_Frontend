import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Legend } from 'recharts';
import {useLocation} from 'react-router-dom';
import './dashboard.css'

// const data = [
//     { name: 'Expenses', value: 4000 },
//     { name: 'Earnings', value: 3000 },
// ];
const data1 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function BarGraph () {
    const location = useLocation();
    //const { id, color } = state;
    const user_data = JSON.parse(sessionStorage.getItem('user_data')) ?? {};
    const earning = user_data.earning
    const expense = user_data.expense
    const data = [
        { name: 'Expenses', value: earning},
        { name: 'Earnings', value: expense},
    ]

    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -mx-4 -mb-10 text-center">
                        <div className="sm:w-1/2 mb-10 px-4">
                            <div>
                                <BarChart width={335} height={300} data={data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Bar dataKey="value" fill="#ccaca9"/>
                                </BarChart>
                            </div>
                            <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">My Expenses</h2>
                            <button className="flex mx-auto mt-6 text-white bg-red-500 border-0 py-2 px-5 focus:outline-none hover:bg-red-600 rounded">Button</button>
                        </div>
                        <div className="sm:w-1/2 mb-10 px-4">
                            <div>
                                <div className="rounded-lg overflow-hidden">
                                    <PieChart width={400} height={400}>
                                        <Pie data={data1} dataKey="value" cx={200} cy={200} outerRadius={80} fill="#8884d8">
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Legend layout="vertical" align="right" payloadKey="name" />
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
};
