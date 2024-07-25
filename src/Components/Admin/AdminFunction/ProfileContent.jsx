/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../apiConfig';
import { toast } from 'react-toastify';
import PopupEditProfile from './Content/PopupEditProfile';
import PopupChangePW from './Content/PopupChangePW';

const ProfileContent = () => {
    const [getData, setGetData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility

    const token = sessionStorage.getItem('token');

    const fetchData = () => {
        fetch(BASE_URL + 'user/myInfo', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 1000) {
                    setGetData(data.result);
                    setLoading(false);
                } else {
                    toast.error(data.message);
                }
            })
            .catch(error => toast.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchData(); // Call fetchData when the component is initially rendered
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            {loading ? (
                <div className="flex items-center justify-center w-56 h-56 text-center m-auto">
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-center relative">
                        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-end px-4 pt-4">
                                <button id="dropdownButton" onClick={toggleDropdown} className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                                    <span className="sr-only">Open dropdown</span>
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                    </svg>
                                </button>
                                <div id="dropdown" className={`z-100  mr-12 absolute ${dropdownOpen ? 'block' : 'hidden'} bg-slate-50 px-10 py-5  `}>
                                    <PopupEditProfile callApi={fetchData} />
                                    <PopupChangePW />
                                </div>
                            </div>
                            <div className="flex flex-col mt-7 items-center pb-10">
                                <img className="w-24 h-24 select-none mb-4 rounded-full shadow-lg" src="https://banner2.cleanpng.com/20190305/sv/kisspng-computer-icons-user-profile-clip-art-login-sey-man-b-svg-png-icon-free-download-323189-o-5c7eb04586d0a2.9462324815518065335522.jpg" alt="user image" />
                                <h5 className="text-xl select-none mb-3 font-medium text-gray-900 dark:text-white">{getData.firstName} {getData.lastName}</h5>
                                <h3 className="text-lg select-none mb-3 font-medium text-gray-900 dark:text-white"><b><i>Role: {getData.role[0].name}</i></b> </h3>

                                <div className='text-left'>
                                    <p className="text-sm select-none text-left text-gray-500 dark:text-gray-400"><b>BirthDay: </b>  {getData.birthDay}</p>
                                    <p className="text-sm select-none text-left my-3 text-gray-500 dark:text-gray-400"><b>Email: </b> {getData.email}</p>
                                    <p className="text-sm select-none text-left text-gray-500 dark:text-gray-400"><b>Phone: </b> {getData.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileContent;
