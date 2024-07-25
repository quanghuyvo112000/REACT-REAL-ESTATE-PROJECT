import React, { useState } from 'react'
import BASE_URL from '../../../apiConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const FormResetPassword = () => {
    const navigate = useNavigate()

    const emailSession = sessionStorage.getItem("email")

    const [isLoading, setIsLoading] = useState(false);

    // Ẩn bớt thông tin email
    const hideEmail = (email) => {
        const atIndex = email.indexOf('@');
        const usernameLength = Math.max(3, Math.min(1, atIndex - 3)); // Giới hạn độ dài của phần tên người dùng từ 3 đến 1 ký tự
        const hiddenPart = email.slice(0, usernameLength).padEnd(atIndex - 3, '*');
        return hiddenPart + email.slice(atIndex - 3);
    };

    const hiddenEmail = hideEmail(emailSession)

    const [formData, setFormData] = useState({ email: emailSession, newpassword: '' })

    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.newpassword.trim() != null && !isLoading) {
            // Gửi request POST đến API
            setIsLoading(true);
            fetch(BASE_URL + 'reset-password', {
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
                        sessionStorage.removeItem("email")
                        toast.success(data.result.message)
                        navigate('/login')
                    }
                    else {
                        toast.error(data.result.message)
                    }
                })
                .catch(error => {
                    console.log('There was an error!', error)
                })
                .finally(() => {
                    setIsLoading(false); // Đặt isLoading lại thành false sau khi hoàn thành submit
                });
        }
    }

    return (
        <div>
            <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <div className="message-login text-red-600 font-medium">
                        {message}
                    </div>
                    <label for="email" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Email: {hiddenEmail}</label>

                    <label for="newpassword" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>

                    <input type="password" name="newpassword" id="newpassword" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required={true} onChange={handleChange} />

                    <button type="submit" class="w-full mt-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={isLoading}>Reset password</button>
                </div>
            </form>
        </div>
    )
}

export default FormResetPassword