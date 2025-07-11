'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userOrders, setUserOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/auth/login');
        return;
      }
      try {
        // Fetch customer profile
        const profileRes = await fetch('/api/auth/get-customer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken: token }),
        });
        const profileData = await profileRes.json();
        if (profileData.customer) {
          setFormData({
            firstName: profileData.customer.firstName || '',
            lastName: profileData.customer.lastName || '',
            email: profileData.customer.email || '',
            phone: profileData.customer.phone || '',
          });
        } else {
          console.error(profileData.error);
        }

        // Fetch customer orders
        const ordersRes = await fetch('/api/auth/get-orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken: token }),
        });
        const ordersData = await ordersRes.json();
        if (ordersData.orders) {
          setUserOrders(ordersData.orders);
        } else {
          console.error(ordersData.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Profile updated (mock).');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/');
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
          {formData.firstName[0] || ''}
          {formData.lastName[0] || ''}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            {formData.firstName} {formData.lastName}
          </h2>
          <p className="text-gray-400">{formData.email}</p>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-2 cursor-pointer text-blue-400 transition hover:text-blue-300"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {['firstName', 'lastName', 'email', 'phone'].map((field, idx) => (
          <div key={idx}>
            <label className="mb-1 block text-sm text-gray-300 capitalize">
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full rounded border border-gray-600 bg-gray-800 p-3 text-white focus:ring focus:ring-white focus:outline-none disabled:opacity-50"
            />
          </div>
        ))}
      </div>

      {isEditing && (
        <button
          onClick={handleSaveProfile}
          className="cursor-pointer rounded bg-white px-6 py-2 text-gray-900 transition hover:bg-gray-200"
        >
          Save Changes
        </button>
      )}

      <div className="border-t border-gray-700 pt-4">
        <button
          onClick={() => setShowChangePassword(!showChangePassword)}
          className="mt-2 cursor-pointer text-blue-400 transition hover:text-blue-300"
        >
          Change Password
        </button>

        {showChangePassword && (
          <div className="mt-4 space-y-2">
            {['currentPassword', 'newPassword', 'confirmPassword'].map(
              (field, idx) => (
                <input
                  key={idx}
                  type="password"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleInputChange}
                  placeholder={field.replace(/([A-Z])/g, ' $1')}
                  className="w-full rounded border border-gray-600 bg-gray-800 p-3 text-white focus:ring focus:ring-white focus:outline-none"
                />
              )
            )}
            <button className="cursor-pointer rounded bg-white px-6 py-2 text-gray-900 transition hover:bg-gray-200">
              Update Password
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Order History</h3>
      {userOrders.length === 0 ? (
        <p className="text-gray-400">You have no orders yet.</p>
      ) : (
        userOrders.map((order) => (
          <div key={order.id} className="rounded bg-gray-800 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h4 className="text-lg text-white">
                  Order #{order.orderNumber}
                </h4>
                <p className="text-sm text-gray-400">
                  {new Date(order.processedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    order.fulfillmentStatus === 'FULFILLED'
                      ? 'bg-green-700'
                      : 'bg-blue-700'
                  } text-white`}
                >
                  {order.fulfillmentStatus}
                </span>
                <p className="font-bold text-white">
                  {order.totalPrice.currencyCode} {order.totalPrice.amount}
                </p>
              </div>
            </div>
            <ul className="space-y-1 text-sm text-gray-300">
              {order.lineItems.edges.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>
                    {item.node.title} x{item.node.quantity}
                  </span>
                  <span>
                    {item.node.originalTotalPrice.currencyCode}{' '}
                    {item.node.originalTotalPrice.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );

  const renderWishlistTab = () => (
    <div className="py-12 text-center text-gray-400">
      Your wishlist is empty.
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">My Account</h1>
          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-2 text-red-400 transition hover:text-red-300"
          >
            Sign Out
          </button>
        </div>

        <div className="flex overflow-hidden rounded bg-gray-800">
          {['profile', 'orders', 'wishlist'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 cursor-pointer py-2 transition ${
                activeTab === tab
                  ? 'bg-white text-gray-900'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'orders' && renderOrdersTab()}
        {activeTab === 'wishlist' && renderWishlistTab()}
      </div>
    </div>
  );
};

export default UserProfile;
