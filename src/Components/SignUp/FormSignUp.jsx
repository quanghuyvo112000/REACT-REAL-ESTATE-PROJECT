import React, { useState } from 'react';
import { toast } from 'react-toastify';
import BASE_URL from '../../apiConfig';
import { useNavigate } from 'react-router-dom';

const FormSignUp = () => {
    const navigate = useNavigate();

    const currentDate = new Date().toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDay: currentDate,
        email: '',
        phone: '',
        username: '',
        password: '',
        cpassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const password = formData.password.trim();
        const confirmPassword = formData.cpassword.trim();

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Password and confirm password does not match");
            return;
        }

        // Loại bỏ trường cpassword khỏi formData
        const { cpassword, ...dataToSend } = formData;

        fetch(BASE_URL + 'user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        })
            .then(response => {
                if (!response.ok) {
                    toast.error("Username or Email existed! ");
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.code === 1000) {
                    toast.success("Register success");
                    navigate('/login');
                } else if (data.code === 1002 || data.code === 1001) {
                    toast.error(data.message);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };


    const handleNavigateSignIn = () => {
        navigate('/login');
    };

    return (
        <div className="max-w-md mx-auto">
            <form className="space-y-4 " onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                    <div className='my-7'>
                        <label htmlFor="firstName" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                        <input type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First name" required={true} onChange={handleChange} />
                    </div>
                    <div className='my-7'>
                        <label htmlFor="lastName" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                        <input type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last name" required={true} onChange={handleChange} />
                    </div>
                </div>
                <div className='my-7'>
                    <label htmlFor="birthDay" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Birth Day</label>
                    <input type="date" pattern="\d{4}-\d{2}-\d{2}" name="birthDay" id="birthDay" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className='my-7'>
                        <label htmlFor="email" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required={true} onChange={handleChange} />
                    </div>
                    <div className='my-7'>
                        <label htmlFor="phone" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                        <input type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone" required={true} onChange={handleChange} />
                    </div>
                </div>
                <div className='my-7'>
                    <label htmlFor="username" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required={true} onChange={handleChange} />
                </div>
                <div className='my-7'>
                    <label htmlFor="password" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} onChange={handleChange} />
                </div>
                <div className='my-7'>
                    <label htmlFor="cpassword" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                    <input type="password" name="cpassword" id="cpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} onChange={handleChange} />
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                <p className="my-7 text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <span className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer" onClick={handleNavigateSignIn}>Sign in</span>
                </p>
            </form>
        </div>
    );
}

export default FormSignUp;
