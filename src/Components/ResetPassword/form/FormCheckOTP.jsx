import React, { useState } from 'react'
import BASE_URL from '../../../apiConfig';
import { useNavigate } from 'react-router-dom';

const FormCheckOTP = () => {
    const navigate = useNavigate();

    const emailSession = sessionStorage.getItem("email");

    // Ẩn bớt thông tin email
    const hideEmail = (email) => {
        const atIndex = email.indexOf('@');
        const usernameLength = Math.max(3, Math.min(1, atIndex - 3)); // Giới hạn độ dài của phần tên người dùng từ 3 đến 1 ký tự
        const hiddenPart = email.slice(0, usernameLength).padEnd(atIndex - 3, '*');
        return hiddenPart + email.slice(atIndex - 3);
    };

    const hiddenEmail = hideEmail(emailSession)

    const [formData, setFormData] = useState({ email: emailSession, code: 0 })

    const [message, setMessage] = useState("")

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

        if (formData.code.trim() != null) {
            // Gửi request POST đến API
            fetch(BASE_URL + 'verifycode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.json()
                })
                .then(data => {
                    if (data.result.success) {
                        setMessage(data.result.message)
                        navigate('/reset-password')
                    }
                    else {
                        setMessage(data.result.message)
                    }
                })
                .catch(error => {
                    console.log('There was an error!', error)
                })

        }

    }

    const handleNavigationBack = () => {
        navigate('/check-email')
    }
    return (
        <div>
            <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <div className="message-login text-red-600 font-medium">
                        {message}
                    </div>
                    <label for="email" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Email: {hiddenEmail}</label>

                    <label for="code" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Code OTP</label>

                    <input type="text" name="code" id="code" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter OTP" required={true} onChange={handleChange} />

                    <button type="submit" class="w-full mt-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Check OTP</button>
                    <p class="my-7 text-sm font-light text-gray-500 dark:text-gray-400">
                        <span onClick={handleNavigationBack} class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">Back</span>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default FormCheckOTP