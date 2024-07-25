import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputSearch = () => {
    const [selectedCity, setSelectedCity] = useState('');

    const navigate = useNavigate();

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleSearch = () => {
        navigate(`/get-data/location/${selectedCity}`)
    };

    return (
        <div className='my-5 mt-0'>
            <div className='my-5' style={{ backgroundImage: "url('https://sitaco.com.vn/public/upload/1kinh-doanh-bat-dong-san-16442251623421058320501.jpg')", backgroundSize: "cover", height: "800px", backgroundAttachment: 'local' }}>
                <div className="w-full flex items-baseline  justify-center justify-items-center container mx-auto">
                    <div className=' pt-96 pb-6 w-1/4'>
                        <div className='relative shadow-cyan-500/50'>
                            <select
                                value={selectedCity}
                                onChange={handleCityChange}
                                className="block w-full h-20 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Select city</option>
                                <option value="HCM">Hồ Chí Minh</option>
                                <option value="HN">Hà Nội</option>
                                <option value="DN">Đà Nẵng</option>
                            </select>

                            <button type="button" onClick={handleSearch} className="absolute top-0 end-0 p-2.5 text-sm font-medium h-20 text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InputSearch;
