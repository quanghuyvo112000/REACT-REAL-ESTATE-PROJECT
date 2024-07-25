import React from 'react'

const About = () => {
    return (
        <div>
            <div className='my-5'>
                <h4 className='text-2xl uppercase cursor-default'> <b>SEE HOW WE CAN HELP</b> </h4>
                <div className='flex justify-center container mx-auto'>
                    <div className="max-w-sm mt-5 mr-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-default">
                        <div className="p-5">
                            <div className='flex justify-center'>
                                <img className='w-2/4 h-2/4' src="https://www.trulia.com/images/icons/txl3/illustrations/BuyAHome.svg" alt="" />
                            </div>
                            <span>
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Buy a home</h5>
                            </span>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400c text-justify">With over 1 million+ homes for sale available on the website, can match you with a house you will want to call home.</p>
                        </div>
                    </div>

                    <div className="max-w-sm mt-5 mr-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-default">
                        <div className="p-5">
                            <div className='flex justify-center'>
                                <img className='w-2/4 h-2/4' src="https://www.trulia.com/images/icons/txl3/illustrations/RentAHome.svg" alt="" />
                            </div>
                            <span>
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Rent a home</h5>
                            </span>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400c text-justify">With 35+ filters and custom keyword search, can help you easily find a home or apartment for rent that you'll love.</p>
                        </div>
                    </div>

                    <div className="max-w-sm mt-5 mr-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-default">
                        <div className="p-5">
                            <div className='flex justify-center'>
                                <img className='w-2/4 h-2/4' src="https://www.trulia.com/images/icons/txl3/illustrations/Neighborhoods.svg" alt="" />
                            </div>
                            <span>
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">See neighborhoods</h5>
                            </span>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400c text-justify">With more neighborhood insights than any other real estate website, we've captured the color and diversity of communities.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default About