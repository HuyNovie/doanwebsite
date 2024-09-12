import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.error("Token không tồn tại. Người dùng chưa đăng nhập.");
          return;
        }

        const response = await api.get('/users/my-info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.result);
        const isAdmin = Array.isArray(response.data.result.roles) && response.data.result.roles.includes('ADMIN');
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/customer');
        }
      } catch (error) {
        console.error("Không thể lấy dữ liệu người dùng", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return <div>Đang điều hướng...</div>;
};

export default Profile;
