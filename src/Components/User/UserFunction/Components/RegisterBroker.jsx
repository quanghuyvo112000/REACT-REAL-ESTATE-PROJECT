import React from 'react';
import { toast } from 'react-toastify';
import BASE_URL from '../../../../apiConfig';
import decryptData from '../../../Encode/decryptData';

const RegisterBroker = () => {

    const encryptedRoleFromsessionStorage = sessionStorage.getItem("role");
    const decryptedRole = decryptData(encryptedRoleFromsessionStorage);


    const handleRegister = () => {
        const token = sessionStorage.getItem('token')
        const id = sessionStorage.getItem('id')
        const requestBody = {
            role: ["BROKER"]
        };
        // Đây là nơi bạn định nghĩa logic để xử lý việc đăng ký
        // Tạo options cho request
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Thêm token vào header
            },
            body: JSON.stringify(requestBody) // Chuyển đổi object thành chuỗi JSON
        };

        // Gọi fetch API
        fetch(BASE_URL + 'user/' + id + '/role', requestOptions)
            .then(response => {
                // Xử lý phản hồi từ server
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Trả về dữ liệu JSON từ phản hồi
            })
            .then(data => {
                // Xử lý dữ liệu nhận được từ server (nếu cần)
                toast.success("Update role success, \n You can log out. Go through the Broker interface", data); // In ra dữ liệu nhận được từ server (ví dụ)
            })
            .catch(error => {
                // Xử lý lỗi
                console.error('There was an error!', error);
            });

    };

    return (
        <div>
            <div className='my-5'>
                <h4 className='text-2xl cursor-default'> <b>INFORMATION ABOUT ROLES IN THE SYSTEM</b> </h4>
            </div>
            <div className='flex justify-center container mx-auto'>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-default">
                    <div className="p-5">
                        <span>
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">ROLE CUSTOMER</h5>
                        </span>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400c text-justify">With the Customer role, you only have the right to view information about real estate and make an appointment to view real estate land.</p>
                    </div>
                </div>

                <div className='mx-5'></div>

                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-default">
                    <div className="p-5">
                        <span>
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">ROLE BROKER</h5>
                        </span>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">As a Broker, you can post real estate information and edit real estate information. You can get information about real estate.
                            <br /><span className='text-red-500'>(Note that you must pay commission when selling your real estate project)</span>
                        </p>
                        {decryptedRole === "CUSTOMER" && (
                            <button onClick={handleRegister} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Register
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterBroker;
