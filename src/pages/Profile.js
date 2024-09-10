import React, { useEffect, useState } from 'react';
import api from '../api/axios';
// import Loading from '../components/Loading';
import CustomerProfile from './CustomerProfile.js';
import AdminProfile from './AdminProfile';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/my-info')
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Không thể lấy dữ liệu người dùng", error);
        setLoading(false);
      });
  }, []);

  if (!user) {
    return <div>Không có dữ liệu người dùng</div>;
  }

  return (
    <>
      {user.role === 'admin' ? (
        <AdminProfile user={user} />
      ) : (
        <CustomerProfile user={user} />
      )}
    </>
  );
};

export default Profile;
