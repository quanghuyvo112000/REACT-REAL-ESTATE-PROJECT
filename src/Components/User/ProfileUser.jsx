import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import decryptData from '../Encode/decryptData';
import BASE_URL from '../../apiConfig';
import { toast } from 'react-toastify';
import ProfileContent from '../Admin/AdminFunction/ProfileContent';
import Appointment from './UserFunction/Components/Appointment';

const ProfileUser = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const encryptedRoleFromsessionStorage = sessionStorage.getItem("role");
        const decryptedRole = decryptData(encryptedRoleFromsessionStorage);

        // Kiểm tra vai trò người dùng khi component được render lại
        if (decryptedRole !== "CUSTOMER" || sessionStorage.getItem('token') === null) {
            navigate('*');
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("role")
        }
    }, [navigate]);


    useEffect(() => {
        const token = sessionStorage.getItem('token');

        fetch(`${BASE_URL}authen/introspect`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to introspect token');
                }
                return response.json();
            })
            .then(data => {
                // Xử lý dữ liệu từ phản hồi nếu cần
                if (!data.result.valid) {
                    toast.warning(data.result.message)
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("fullname");
                    sessionStorage.removeItem("id");
                    sessionStorage.removeItem("role")
                    navigate('/login');
                }
            })
            .catch(error => {
                // Xử lý lỗi khi gọi API introspect
                console.error('Error introspecting token:', error.message);
                // Điều hướng đến trang lỗi hoặc thực hiện các xử lý khác tùy thuộc vào nhu cầu của ứng dụng
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [selectedComponent, setSelectedComponent] = useState('dashboard')

    const handleItemClick = (component) => {
        setSelectedComponent(component)
    }
    // Nếu selectedComponent là 'logout', chuyển hướng đến trang /login
    if (selectedComponent === 'logout') {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("fullname");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("role")
        navigate('/login');
    } else if (selectedComponent === 'home') {
        navigate('/');
    }
    return (
        <div>
            <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="sidebar-multi-level-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul class="space-y-2 font-medium">
                        <li onClick={() => handleItemClick('dashboard')}>
                            <p class="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span class="ms-3">Dashboard</span>
                            </p>
                        </li>

                        <li onClick={() => handleItemClick('profile')}>
                            <p class="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                                </svg>

                                <span class="ms-3">Profile</span>
                            </p>
                        </li>
                        <li onClick={() => handleItemClick('home')}>
                            <p class="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                                </svg>

                                <span class="ms-3 whitespace-nowrap">Return home</span>
                            </p>
                        </li>
                        <li onClick={() => handleItemClick('logout')}>
                            <p class="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                </svg>
                                <span class="ms-3 whitespace-nowrap">Log out</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </aside>

            <div class="p-4 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {selectedComponent === 'dashboard' && <Appointment />}
                    {selectedComponent === 'profile' && <ProfileContent />}
                </div>
            </div>
        </div>
    )
}

export default ProfileUser