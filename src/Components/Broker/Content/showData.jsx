import React, { useState } from 'react'
import PopupUpdate from '../Popup/popUpdate'
import PopupTransaction from '../Popup/popupTransaction';


const ShowData = ({ data, callApi }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Logic để tính chỉ mục đầu và cuối của các mục trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Logic để chuyển đổi giữa các trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

    return (
        <div>
            <div className='overflow-x-auto max-h-full'>
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">No.</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Location</th>
                            <th className="px-6 py-3 w-8 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Property Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Created At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Status</th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Action</th>

                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
                        {currentItems.map((product, index) => (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="px-6 py-4 text-left whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 text-left whitespace-nowrap">
                                    <span title={product.title.length > 25 ? product.title : null}>
                                        {product.title.length > 25 ? `${product.title.substring(0, 25)}...` : product.title}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-left whitespace-nowrap">{convertLocation(product.location)}</td>
                                <td className="px-6 py-4 text-left whitespace-nowrap">
                                    <span title={product.address.length > 25 ? product.address : null}>
                                        {product.address.length > 25 ? `${product.address.substring(0, 25)}...` : product.address}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-left whitespace-nowrap">{product.propertyType}</td>
                                <td className="px-6 py-4 text-left whitespace-nowrap">{product.createdAt}</td>

                                <td className="px-6 py-4 text-left whitespace-nowrap">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                <td className="px-6 py-4 text-left whitespace-nowrap">
                                    {product.status ? (
                                        // Nếu status là true, hiển thị nội dung bình thường
                                        <span className="text-green-500">Approval</span>

                                    ) : (
                                        // Nếu status là false, hiển thị nội dung phù hợp
                                        <span className="text-red-500">Wait for approval</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex">
                                    {/* Thêm popup cập nhật và xóa */}
                                    <div className='flex items-center justify-center cursor-pointer'>
                                        <PopupUpdate data={product.id} callApi={callApi} />
                                    </div>
                                    <div className='flex items-center mt-2 ml-5 justify-center cursor-pointer'>
                                        {product.status ? ( // Kiểm tra nếu product.status là true
                                            <PopupTransaction data={product.id} callApi={callApi} />
                                        ) : null} {/* Nếu product.status là false, không hiển thị gì cả */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2 focus:outline-none bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`mr-2 focus:outline-none ${currentPage === index + 1 ? 'bg-gray-400' : 'bg-gray-200 hover:bg-gray-300'
                                } py-1 px-3 rounded`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="ml-2 focus:outline-none bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded"
                    >
                        Next
                    </button>
                </div>
            )}

            {totalPages === 1 && currentPage === 1 && (
                <div className="flex justify-center mt-4">
                    <span className="bg-gray-200 py-1 px-3 rounded">
                        1
                    </span>
                </div>
            )}
        </div>
    )
}


export default ShowData