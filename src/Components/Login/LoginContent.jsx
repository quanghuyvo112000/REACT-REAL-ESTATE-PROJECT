import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BASE_URL from '../../apiConfig';
import encryptData from '../Encode/encryptData'


const LoginContent = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });


    // Hàm xử lý sự kiện thay đổi giá trị của các trường input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    // Hàm xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.username.trim() != null || formData.password.trim() != null) {
            // Gửi request POST đến API
            fetch(BASE_URL + 'authen/log-in', {
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
                    if (data.result.authenticated && data.result.role[0].name === "ADMIN") {
                        const encryptedRole = encryptData(data.result.role[0].name);

                        sessionStorage.setItem("token", data.result.token)
                        sessionStorage.setItem("id", data.result.id);
                        sessionStorage.setItem("role", encryptedRole);
                        navigate('/dashboard-admin')
                        toast.success("Login success!");
                    }

                    // Login (CUSTOMER AND BROKER)


                    else if (data.result.authenticated && data.result.role[0].name === "BROKER") {
                        const encryptedRole = encryptData(data.result.role[0].name);

                        sessionStorage.setItem("token", data.result.token)
                        sessionStorage.setItem("id", data.result.id);
                        sessionStorage.setItem("role", encryptedRole);
                        navigate('/dashboard-broker')
                        toast.success("Login success!");
                    }
                    else {
                        const encryptedRole = encryptData(data.result.role[0].name);

                        sessionStorage.setItem("token", data.result.token)
                        sessionStorage.setItem("id", data.result.id);
                        sessionStorage.setItem("role", encryptedRole);
                        navigate('/')
                        toast.success("Login success!");
                    }
                })
                .catch(error => {
                    toast.error("username or password is incorrect")
                    console.error('There was an error!', error)
                });
        }

    };

    // Hàm chuyển trang quên mật khẩu
    const handleNavigationCheckEmail = () => {
        navigate('/check-email')
    };

    const handleNavigationSignUp = () => {
        navigate('/sign-up')
    };



    return (
        <div>
            <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label for="username" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="username" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required={true} onChange={handleChange} />
                </div>
                <div className='my-7'>
                    <label for="password" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} onChange={handleChange} />
                </div>
                <div class="my-7 flex items-center justify-between">
                    <span onClick={handleNavigationCheckEmail} class="cursor-pointer text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</span>
                </div>
                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                <p class="my-7 text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <span onClick={handleNavigationSignUp} class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">Sign up</span>
                </p>
            </form>
        </div>
    )
}

export default LoginContent