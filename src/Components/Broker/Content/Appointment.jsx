import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../apiConfig';
import { toast } from 'react-toastify';

const Appointment = () => {
    const [getData, setGetData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [appointmentsPerPage] = useState(10);

    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id');

    const fetchData = () => {
        setLoading(true);
        fetch(BASE_URL + 'appointment/seller/' + id, {
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
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleConfirm = (appointmentId) => {
        fetch(BASE_URL + 'appointment/seller/' + appointmentId, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to confirm appointment');
                }
                // Xử lý thành công (ví dụ: hiển thị thông báo)
                toast.success('Appointment confirmed successfully');
                fetchData();
                // Sau khi xác nhận, bạn có thể cập nhật trạng thái của đối tượng trong ứng dụng của bạn
                // Ví dụ: Cập nhật trạng thái của cuộc hẹn thành 'CONFIRM' trong state hoặc gọi fetchData() để tải lại dữ liệu
            })
            .catch(error => {
                // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
                toast.error('Error confirming appointment: ' + error.message);
            });
    };

    // Tính chỉ số của bản ghi đầu tiên và cuối cùng trên trang hiện tại
    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = getData.slice(indexOfFirstAppointment, indexOfLastAppointment);

    // Logic phân trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(getData.length / appointmentsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => (
        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => setCurrentPage(number)} className="page-link border mx-1 border-gray-200 px-3 py-1 rounded">
                {number}
            </button>
        </li>
    ));

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
                <div className="overflow-x-auto">
                    <h4 className='mb-5 uppercase'><b>LIST Appointment</b></h4>
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Buyer Name</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Phone Buyer</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Real Estate Name</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Appointment Date</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Note</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentAppointments.map(appointment => (
                                <tr key={appointment.id}>
                                    <td className="px-6 py-4 text-left whitespace-no-wrap">{appointment.nameBuyer}</td>
                                    <td className="px-6 py-4 text-left whitespace-no-wrap">{appointment.phoneBuyer}</td>
                                    <td className="px-6 py-4 text-left whitespace-no-wrap">
                                        <span title={appointment.nameRealEstate.length > 25 ? appointment.nameRealEstate : null}>
                                            {appointment.nameRealEstate.length > 25 ? `${appointment.nameRealEstate.substring(0, 25)}...` : appointment.nameRealEstate}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-left whitespace-no-wrap">{appointment.appointmentDateTime}</td>
                                    <td className={`px-6 py-4 text-left whitespace-no-wrap ${appointment.status === 'WAITED' ? 'text-yellow-300' : appointment.status === 'CANCEL' ? 'text-red-500' : appointment.status === 'CONFIRM' ? 'text-green-500' : ''}`}>{appointment.status}
                                    </td>
                                    <td className="px-6 py-4 text-left whitespace-no-wrap">
                                        <span title={appointment.note.length > 25 ? appointment.note : null}>
                                            {appointment.note.length > 25 ? `${appointment.note.substring(0, 25)}...` : appointment.note}
                                        </span>
                                    </td>
                                    <td>
                                        {(appointment.status !== 'CONFIRM' && appointment.status !== 'CANCEL') && ( // Kiểm tra nếu status không phải là 'CONFIRM' hoặc 'CANCEL'
                                            <button
                                                type="button"
                                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                onClick={() => handleConfirm(appointment.id)}
                                            >
                                                CONFIRM
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav className="mt-4 mx-3" aria-label="Pagination">
                        <ul className="pagination flex mx-10 justify-center">
                            {renderPageNumbers}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Appointment;
