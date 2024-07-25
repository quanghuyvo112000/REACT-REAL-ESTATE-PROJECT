import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BASE_URL from '../../../apiConfig';
const CheckEmail = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '' })

    // Hàm xử lý sự kiện thay đổi giá trị của các trường input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email.trim() != null) {
            // Gửi request POST đến API
            fetch(BASE_URL + 'authen/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.json()
                })
                .then(data => {
                    if (data.code === 1000) {
                        toast.success(data.message)
                        navigate('/login')
                    }
                    else {
                        toast.error(data.message)
                    }
                })
                .catch(error => {
                    console.log('There was an error!', error)
                })
        }
    }

    const handleNavigationBack = () => {
        navigate('/login')
    }


    return (
        <div>
            <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label for="email" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter email" required={true} onChange={handleChange} />

                    <button type="submit" class="w-full mt-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Check email</button>
                    <p class="my-7 text-sm font-light text-gray-500 dark:text-gray-400">
                        <span onClick={handleNavigationBack} class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">Back</span>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default CheckEmail