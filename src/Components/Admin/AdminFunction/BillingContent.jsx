/* eslint-disable jsx-a11y/scope */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BASE_URL from '../../../apiConfig';

const BillingContent = () => {

    const [items, setItems] = useState([]);

    const token = sessionStorage.getItem('token')

    const fetchBill = async () => {
        try {
            const response = await fetch(`${BASE_URL}transaction`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (data.code === 1000) {
                setItems(data.result);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const deleteOrder = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}transaction/${id}`, {
                method: 'DELETE',
                body: JSON.stringify(), // Đây là đối tượng rỗng
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            fetchBill()

            const data = await response.json();

            if (data.success) {
                const updatedItems = items.filter(item => item.id !== id);
                setItems(updatedItems);
                toast.success(data.data.message);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Failed to delete cart. Please try again.');
        }
    };


    useEffect(() => {
        fetchBill();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const delteItem = (id) => {
        deleteOrder(id)
        fetchBill()
    };
    return (
        <div>
            {(items === null) ? (
                <p>No order</p>
            ) : (
                <div class="relative overflow-x-auto select-none">
                    <table class="w-full px-4 text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Created At
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Seller Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Real Estate Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Buyer Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Buyer Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Commission
                                </th>
                                <th>Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.createdAt}
                                    </td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.sellerName}
                                    </td>
                                    <td scope="row" class="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.realEstateName}
                                    </td>
                                    <td scope="row" class="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.buyerName}
                                    </td>
                                    <td scope="row" class="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.buyerEmail}
                                    </td>
                                    <td scope="row" class="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </td>
                                    <td scope="row" class="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.commission.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => delteItem(item.id)}
                                            class="focus:outline-none text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}

        </div>
    )
}

export default BillingContent