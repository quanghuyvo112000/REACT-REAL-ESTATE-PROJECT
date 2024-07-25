import React, { useState } from 'react'
import BASE_URL from '../../../../apiConfig';
import { toast } from 'react-toastify';

const PopupChangePW = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const id = sessionStorage.getItem('id')

    const [formSubmit, setFormSubmit] = useState({
        idUser: id,
        oldPassword: '',
        newPassword: '',
    });

    const token = sessionStorage.getItem('token')

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormSubmit(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý nộp form ở đây
        const { idUser, oldPassword, newPassword } = formSubmit;
        const formData = {
            idUser: idUser,
            oldPassword: oldPassword,
            newPassword: newPassword,
        };

        fetch(`${BASE_URL}authen/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Đã xảy ra lỗi khi gửi dữ liệu.');
                }
                return response.json();
            })
            .then(data => {
                if (data.code === 1000) {
                    toast.success(data.message)
                }
            })
            .catch(error => {
                console.error('Lỗi khi gửi dữ liệu:', error);
                // Xử lý lỗi (nếu cần)
                alert('Đã xảy ra lỗi khi gửi dữ liệu.');
            });

    };

    return (
        <div>
            <p onClick={toggleModal} className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 my-2 ml-4 cursor-pointer" type="button">
                Change Password
            </p>

            {isModalOpen && (
                <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="bg-slate-300 bg-opacity-50 flex m-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-[50%] max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Change Password
                                </h3>
                                <button onClick={toggleModal} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="oldPassword" className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300">Old Password</label>
                                        <input type="password" name="oldPassword" id="oldPassword" required={true} value={formSubmit.oldPassword} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-600 dark:focus:border-blue-600" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="newPassword" className=" block text-left text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                                        <input type="password" name="newPassword" id="newPassword" required={true} value={formSubmit.newPassword} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-600 dark:focus:border-blue-600" />
                                    </div>
                                    <div className="flex justify-center">
                                        <button type="submit" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default PopupChangePW