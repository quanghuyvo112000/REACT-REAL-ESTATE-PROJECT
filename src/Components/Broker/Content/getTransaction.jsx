/* eslint-disable jsx-a11y/scope */
import React, { useEffect, useState } from 'react'
import BASE_URL from '../../../apiConfig';

const GetTransaction = () => {

    const [items, setItems] = useState([]);

    const token = sessionStorage.getItem('token')

    const id = sessionStorage.getItem('id')

    const fetchBill = async () => {
        try {
            const response = await fetch(`${BASE_URL}transaction/${id}`, {
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

    useEffect(() => {
        fetchBill();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.createdAt}
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

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}

        </div>
    )
}

export default GetTransaction