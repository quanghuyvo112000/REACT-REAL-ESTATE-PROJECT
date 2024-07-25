import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const PageError = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            const shouldNavigateBack = window.confirm('Do you want to go back to the previous page?');
            if (shouldNavigateBack) {
                const role = sessionStorage.getItem("role")

                if (role === "USER" || role === null) {
                    navigate('/login')
                }
            }
        }, 2000);

        // Clear the timer when the component unmounts
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className='page-error w-[100%] text-center inline-block m-auto mt-[10%]'>
            <div className="page-error_img">
                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg" alt="page 404" className='w-[20%] h-[10%] m-auto inline-block' />
            </div>
            <div className="page-error_content">
                <h1 className='text-primary-600 text-center font-bold text-3xl'>404 Not Found</h1>
                <p className='text-center font-bold text-5xl'>Whoops! That page doesn’t exist.</p>
            </div>
        </div>
    )
}

export default PageError