import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import './dashboard.css'

const data = [
    { name: 'Page A', value: 4000 },
    { name: 'Page B', value: 3000 },
];

const BarGraph = () => {
    return (
        <div className='container'>
            <BarChart width={500} height={300} data={data} className="bar-chart">
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default BarGraph;
