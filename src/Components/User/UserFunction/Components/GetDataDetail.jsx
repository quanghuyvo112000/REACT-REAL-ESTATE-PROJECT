/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '../css/style.css';
import BASE_URL from '../../../../apiConfig';
import PopupAppointment from './PopupAppointment';
import Menu from '../Menu/Menu';

const GetDataDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    const [getData, setGetData] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const convertLocation = (abbreviation) => {
        switch (abbreviation) {
            case 'HN':
                return 'Hà Nội';
            case 'HCM':
                return 'Hồ Chí Minh';
            case 'DN':
                return 'Đà Nẵng';
            default:
                return abbreviation; // Trả về nguyên mẫu nếu không có kết quả
        }
    }

    const fetchData = () => {
        fetch(BASE_URL + 'real-estate/' + id, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 1000) {
                    setGetData(data.result);
                } else {
                    console.error(data.message);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (token === null) {
            navigate('/login');
        }
    }, [navigate, token]);

    if (!getData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='cursor-default'>
            <Menu />
            <>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    {getData.img.split(',').map((imageUrl, index) => (
                        <SwiperSlide key={index}>
                            <img className='w-[100%] h-[50%]' src={imageUrl.trim()} alt={`Image ${index + 1}`} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
            <div className="grid container mx-auto text-left grid-cols-12 gap-4 my-10">
                <div className="col-span-7 border border-600 p-10 rounded-md">
                    <div>
                        <h4 className='uppercase mb-5 text-2xl'><b>INFORMATION {getData.title}</b></h4>
                        <p>Location: {convertLocation(getData.location)}</p>
                        <p>Address: {getData.address}</p>
                        <p>Property Type: {getData.propertyType}</p>
                        {getData.rooms !== 0 && <p>Rooms: {getData.rooms}</p>}
                        {getData.bathrooms !== 0 && <p>Bathrooms: {getData.bathrooms}</p>}
                        <p>Price: <span className='text-red-500 font-semibold'>{getData.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span> </p>
                        <div>
                            <h4 className='uppercase my-5 text-2xl'><b>description</b></h4>
                            {getData.description.split('.').map((sentence, index) => (
                                <p key={index}>{sentence.trim()}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-span-5 border border-600 p-10 rounded-md">
                    <div>
                        <h4 className='uppercase mb-5 text-2xl'><b>Seller Information</b></h4>
                        <p>Seller: {getData.fullname}.</p>
                        <p>To Phone: <span className='cursor-pointer text-blue-700' onClick={() => window.location.href = `tel:${getData.phone}`}>{getData.phone}.</span></p>
                        <p className='mb-5'>To Email: <span className='cursor-pointer text-blue-700' onClick={() => window.location.href = `mailto:${getData.email}`}>{getData.email}.</span>
                        </p>
                        <PopupAppointment data={id} />
                    </div>
                </div>
            </div>

        </div>
    );

}

export default GetDataDetail;
