import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import BASE_URL from '../../../apiConfig';
import { useNavigate } from 'react-router-dom';

const FormSubmit = ({ data, callApi }) => {

    const id = sessionStorage.getItem('id')

    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = useState(false);
    const [formData, setFormData] = useState({
        userId: id,
        title: '',
        description: '',
        location: 'HN',
        address: '',
        rooms: 0,
        bathrooms: 0,
        propertyType: 'Chung cư',
        price: 0.0,
        createdAt: new Date().toISOString().split('T')[0],
        img: '',
        role: 'agent',
        fullname: '',
        email: '',
        phone: ''
    });
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
                    navigate('/login');
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("fullname");
                    sessionStorage.removeItem("id");
                    sessionStorage.removeItem("role")
                }
            })
            .catch(error => {
                // Xử lý lỗi khi gọi API introspect
                console.error('Error introspecting token:', error.message);
                // Điều hướng đến trang lỗi hoặc thực hiện các xử lý khác tùy thuộc vào nhu cầu của ứng dụng
            });

    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (data) {
                    setIsUpdating(true);
                    await fetchProductData();
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);



    const fetchProductData = async () => {
        try {
            const response = await fetch(`${BASE_URL}real-estate/${data}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch product data');
            }
            const productData = await response.json();
            // Update formData with fetched product data
            setFormData({
                userId: productData.result.userId,
                title: productData.result.title,
                description: productData.result.description,
                location: productData.result.location,
                address: productData.result.address,
                rooms: productData.result.rooms,
                bathrooms: productData.result.bathrooms,
                propertyType: productData.result.propertyType,
                price: productData.result.price,
                createdAt: productData.result.createdAt,
                img: productData.result.img,
                role: productData.result.role,
                fullname: productData.result.fullname,
                email: productData.result.email,
                phone: productData.result.phone
            });
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        try {
            let url = `${BASE_URL}real-estate`;
            let method = 'POST';
            if (isUpdating) {
                url = `${BASE_URL}real-estate/${data}`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to update product.');
            }

            toast.success('Eeal estate ' + (isUpdating ? 'updated' : 'added') + ' successfully');
            callApi()

            // Cập nhật dữ liệu ngay sau khi cập nhật thành công
            if (!isUpdating) {
                setFormData({
                    userId: '',
                    title: '',
                    description: '',
                    location: '',
                    address: '',
                    rooms: 0,
                    bathrooms: 0,
                    propertyType: '',
                    price: 0.0,
                    createdAt: '',
                    img: '',
                    role: '',
                    fullname: '',
                    email: '',
                    phone: ''
                });
            }
        } catch (error) {
            console.error('Error updating product:', error);

            toast.error('Failed to update product. Please login again, maybe the token has expired!');
        }

        callApi()
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='hidden'>
                    <label htmlFor="userId" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">User ID:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" readOnly type="text" id="userId" name="userId" value={formData.userId} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="title" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Title:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={true} type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Description:</label>
                    <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={true} type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="location" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Location:</label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    >
                        <option value="HN">Hà Nội</option>
                        <option value="HCM">Hồ Chí Minh</option>
                        <option value="DN">Đà Nẵng</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="address" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Address:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={true} type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="rooms" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Rooms:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={true} type="number" id="rooms" name="rooms" value={formData.rooms} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="bathrooms" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Bathrooms:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={true} type="number" id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="propertyType" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Property Type:</label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                    >
                        <option value="Chung cư">Chung cư</option>
                        <option value="Nhà phố">Nhà phố</option>
                        <option value="Văn phòng">Văn phòng</option>
                        <option value="Đất nền">Đất nền</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="price" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Price:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={true} type="number" id="price" name="price" value={formData.price} onChange
                        ={handleChange} />
                </div>
                <div className='hidden'>
                    <label htmlFor="createdAt" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Created At:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={true} type="text" id="createdAt" name="createdAt" value={formData.createdAt} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="img" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Image:</label>
                    <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={true} type="text" id="img" name="img" value={formData.img} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="role" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Role:</label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="agent">Agent</option>
                        <option value="owner">Owner</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="fullname" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Full Name:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={true} type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Email:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={true} type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Phone:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={true} type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <button type="submit" className="w-full mt-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isUpdating ? 'Update' : 'Add'} Product</button>

            </form>
        </div>
    )
}

export default FormSubmit