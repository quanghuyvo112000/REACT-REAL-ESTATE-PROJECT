import React, { useState } from 'react'
import FormTransaction from '../Form/FormTransaction';

const PopupTransaction = ({ data, callApi }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div>
            <div className="header-ProductsContent w-full">
                <div className="flex justify-end ">
                    <button onClick={toggleModal} type="button" class="text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary-600  dark:hover:dark:bg-primary-700  focus:outline-none dark:focus:dark:bg-primary-800 ">New Transaction</button>
                </div>
                {isModalOpen && (
                    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="bg-slate-300 bg-opacity-50 flex m-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-4 w-[50%] max-h-full">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        New Transaction
                                    </h3>
                                    <button onClick={toggleModal} type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div class="p-4 md:p-5">
                                    <FormTransaction data={data} callApi={callApi} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PopupTransaction