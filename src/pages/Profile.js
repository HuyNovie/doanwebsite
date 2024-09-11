import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import CustomerProfile from './CustomerProfile.js';
import AdminProfile from './AdminProfile';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('restaurant/users/my-info')
      .then(response => {
        setUser(response.data.result);
      })
      .catch(error => {
        console.error("Không thể lấy dữ liệu người dùng", error);
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
