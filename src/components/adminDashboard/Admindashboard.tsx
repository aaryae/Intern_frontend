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

const ChartComponent: React.FC = () => {
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
        <div className='bg-[#d3d3d3a1] h-full p-4'>
            <div className='flex flex-wrap justify-center'>
                <div className='w-full sm:w-1/2 lg:w-1/3 '>
                    <div className=' p-4 rounded shadow-md'>
                        <div className='relative' style={{ paddingBottom: '100%' }}>
                            <div className='absolute inset-0'>
                                <Line data={lineData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full sm:w-1/2 lg:w-1/3 '>
                    <div className=' p-4 rounded shadow-md'>
                        <div className='relative' style={{ paddingBottom: '100%' }}>
                            <div className='absolute inset-0'>
                                <Bar data={barData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center '>
                <div className='w-full lg:w-1/3'>
                    <div className=' p-4 rounded shadow-md'>
                        <div className='relative' style={{ paddingBottom: '100%' }}>
                            <div className='absolute inset-0'>
                                <Pie data={pieData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;
