import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BASE_URL from '../../../../apiConfig';

const Menu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token')

  let name = "Hello, User";


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

  useEffect(() => {
    // Kiểm tra token có tồn tại không để xác định trạng thái đăng nhập
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

  }, [token]);

  const handleLogin = () => {
    // Xử lý logic đăng nhập và cập nhật trạng thái
    setIsLoggedIn(true);
    setIsDropdownOpen(!isDropdownOpen);
    navigate('/login')
  };

  const handleLogout = () => {
    // Xử lý logic đăng xuất và cập nhật trạng thái
    setIsLoggedIn(false);
    setIsDropdownOpen(!isDropdownOpen);
    navigate('/')
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('role');

  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <div>
      <nav className="bg-slate-200 dark:bg-gray-900 dark:border-gray-700 cursor-pointer">
        <div className="max-w-screen-xl bg-slate-200 flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Các phần tử khác */}
          <div className="hidden md:block bg-slate-200 md:w-auto" id="navbar-categories">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border bg-slate-200 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-slate-200 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

              <li>
                <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</Link>
              </li>
            </ul>
          </div>
          <div className="md:w-auto" id="navbar-actions">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-slate-200	 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <button onClick={toggleDropdown} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex relative items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">{isLoggedIn ? name : 'Sign in'}</button>
                {isDropdownOpen && (
                  <div id="dropdownNavbar" className="z-10 font-normal absolute bg-slate-200 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                      {isLoggedIn && (
                        <li>
                          <Link to={`/dashboard`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                        </li>
                      )}
                    </ul>
                    <div className="py-1">
                      <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={isLoggedIn ? handleLogout : handleLogin}>{isLoggedIn ? 'Sign out' : 'Sign in'}</p>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  );
}

export default Menu;
