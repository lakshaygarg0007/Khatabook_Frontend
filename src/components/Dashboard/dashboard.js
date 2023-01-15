import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import './dashboard.css'

const data = [
    { name: 'Expenses', value: 4000 },
    { name: 'Earnings', value: 3000 },
];

const BarGraph = () => {
    return (
        <>
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-wrap -mx-4 -mb-10 text-center">
                        <div class="sm:w-1/2 mb-10 px-4">
                            <div class="rounded-lg h-64 overflow-hidden">
                                <BarChart width={335} height={300} data={data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Bar dataKey="value" fill="#ccaca9" />
                                </BarChart>
                            </div>
                            <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">My Expenses</h2>
                            <p class="leading-relaxed text-base">Williamsburg occupy sustainable snackwave gochujang. Pinterest cornhole brunch, slow-carb neutra irony.</p>
                            <button class="flex mx-auto mt-6 text-white bg-red-500 border-0 py-2 px-5 focus:outline-none hover:bg-red-600 rounded">Button</button>
                        </div>
                        <div class="sm:w-1/2 mb-10 px-4">
                            <div class="rounded-lg h-64 overflow-hidden">
                                <BarChart width={335} height={300} data={data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Bar dataKey="value" fill="#7d5f5c" />
                                </BarChart>
                            </div>
                            <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">The Catalyzer</h2>
                            <p class="leading-relaxed text-base">Williamsburg occupy sustainable snackwave gochujang. Pinterest cornhole brunch, slow-carb neutra irony.</p>
                            <button class="flex mx-auto mt-6 text-white bg-red-500 border-0 py-2 px-5 focus:outline-none hover:bg-red-600 rounded">Button</button>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default BarGraph;
