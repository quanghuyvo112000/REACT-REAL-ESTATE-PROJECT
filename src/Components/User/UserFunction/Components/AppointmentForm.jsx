import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../../apiConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AppointmentForm = ({ data }) => {
    const id = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token')
    const navigate = useNavigate()
    const currentDate = new Date().toISOString().split('T')[0];


    const [form, setForm] = useState({
        realEstateId: data,
        buyerId: id,
        appointmentTime: currentDate,
        note: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Thay yourToken bằng giá trị token thực tế
            },
            body: JSON.stringify(form)
        };

        fetch(BASE_URL + 'appointment', requestOptions)
            .then(response => response.json())
            .then(data => toast.success("Create appointment success", data))
            .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
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

    }, [navigate, token]);


    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="appointmentTime" className="block text-gray-700 text-sm font-bold mb-2">Appointment Time:</label>
                    <input
                        type="date"
                        pattern="\d{4}-\d{2}-\d{2}"
                        id="appointmentTime"
                        name="appointmentTime"
                        value={form.appointmentTime}
                        min={currentDate}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="note" className="block text-gray-700 text-sm font-bold mb-2">Note:</label>
                    <textarea
                        id="note"
                        name="note"
                        value={form.note}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;
