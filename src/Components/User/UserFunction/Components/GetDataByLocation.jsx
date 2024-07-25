/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BASE_URL from '../../../../apiConfig';
import Menu from '../Menu/Menu';

const GetDataByLocation = () => {
    const { location } = useParams();

    const navigate = useNavigate();

    const [getData, setGetData] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}real-estate/location/${location}`, {
            });
            const data = await response.json();

            if (data.code === 1000) {
                const filteredData = data.result.filter(property => property.status !== false);
                setGetData(filteredData);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const convertLocation = (abbreviation) => {
        switch (abbreviation) {
            case 'HN':
                return 'Hà Nội';
            case 'HCM':
                return 'Hồ Chí Minh';
            case 'DN':
                return 'Đà Nẵng';
            default:
                return abbreviation; // Trả về nguyên mẫu nếu không có kết quả
        }
    }

    const locations = convertLocation(location)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleButtonClick = (id) => {
        // Xử lý khi nút được nhấp vào
        navigate(`/get-data/detail/${id}`)
    };

    return (
        <div>
            <Menu />
            <div className='mt-5 container mx-auto'>
                <h4 className='uppercase my-5 cursor-default text-2xl'> <b>danh sách bất động sản tại khu vực {locations}</b> </h4>
                <div className='grid grid-cols-3 gap-3'>
                    {getData.map((property) => (
                        <div key={property.id} class="max-w-sm p-6 cursor-default bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img src={property.img.split(',')[0].trim()} alt={`Image of ${property.title}`} />
                            <span className='mt-5'>
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{property.title}</h5>
                            </span>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{property.address}</p>
                            <p class="mb-3 font-normal text-red-700 dark:text-gray-400">{property.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            <button onClick={() => handleButtonClick(property.id)} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Detail
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default GetDataByLocation;
