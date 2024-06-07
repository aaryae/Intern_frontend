import Footer from '@components/footer/Footer';
import Navbar from '@components/navvbar/Navbar';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Userpage: React.FC = () => {
    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Line Dataset',
                data: [65, 59, 80, 81, 56, 55],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
            },
        ],
    };

    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Bar Dataset',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Pie Dataset',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                ],
                hoverOffset: 4,
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
    };

    return (
        <>
            <Navbar />
            <div>


                <div>

                    <div className='bg-black   flex h-[100vh] max-w-8xl mx-auto'>
                        <div style={{ width: '600px', height: '600px', margin: ' auto', padding: '40px' }}>
                            <Line data={lineData} options={chartOptions} />
                        </div>
                        <div style={{ width: '600px', height: '600px', margin: ' auto', padding: '40px' }}>
                            <Bar data={barData} options={chartOptions} />
                        </div>
                        <div style={{ width: '600px', height: '600px', margin: 'auto', padding: '40px' }}>
                            <Pie data={pieData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Userpage;
