import React, { useState } from 'react';
import BASE_URL from '../../../apiConfig';
import { toast } from 'react-toastify';

const FormTransaction = ({ data, callApi }) => {
    const id = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token')

    // Lấy ngày hiện tại
    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        // Thêm số 0 phía trước nếu cần
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    };

    const [form, setForm] = useState({
        createdAt: getCurrentDate(), // Ngày hiện tại
        sellerId: id,
        realEstateId: data,
        buyerName: '',
        buyerEmail: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Thực hiện logic khi gửi form, ví dụ gọi API
        try {
            const response = await fetch(BASE_URL + 'transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Thay your_token_here bằng token thực tế
                },
                body: JSON.stringify({
                    buyerName: form.buyerName,
                    buyerEmail: form.buyerEmail,
                    createdAt: form.createdAt,
                    sellerId: form.sellerId,
                    realEstateId: form.realEstateId

                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // Xử lý phản hồi từ server sau khi gửi form
            toast.success('Transaction success', data);
            callApi()
        } catch (error) {
            // Xử lý lỗi khi gửi form
            console.error('Error submitting form:', error);
        }

    };

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="buyerName">Buyer name:</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={true}
                        type="text"
                        name="buyerName"
                        id="buyerName"
                        value={form.buyerName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="buyerEmail">Buyer email:</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={true}
                        type="email"
                        name="buyerEmail"
                        id="buyerEmail"
                        value={form.buyerEmail}
                        onChange={handleChange}
                    />
                </div>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormTransaction;
