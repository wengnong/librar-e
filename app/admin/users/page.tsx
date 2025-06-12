'use client';

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getAllUsers } from '@/lib/actions/user';
import RoleDropdown from '@/components/RoleDropdown';
import Link from 'next/link';

type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: 'USER' | 'ADMIN' | null;
  createdAt: Date | null;
  lastActivityDate: string | null;
};

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sortedAZ, setSortedAZ] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteName, setDeleteName] = useState('');
  const [deleteEmail, setDeleteEmail] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const usersResult = await getAllUsers();
      if (usersResult?.success) {
        setUsers(usersResult.data);
      }
    };
    fetchUsers();
  }, []);

  const handleSortAZ = () => {
    setSortedAZ(!sortedAZ);
  };

  const handleConfirmDelete = async () => {
    const matchedUser = users.find(
      (u) => u.name === deleteName && u.email === deleteEmail
    );

    if (!matchedUser) {
      alert('No matching user found!');
      return;
    }

    try {
      const res = await fetch('/api/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: matchedUser.id }),
      });

      if (res.ok) {
        alert('User deleted successfully!');
        setUsers(users.filter((u) => u.id !== matchedUser.id));
        setDeleteMode(false);
        setDeleteName('');
        setDeleteEmail('');
      } else {
        alert('Failed to delete user.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting the user.');
    }
  };

  const displayedUsers = [...users].sort((a, b) => {
    if (!sortedAZ) return 0;
    return (a.name || '').localeCompare(b.name || '');
  });

  return (
    <div className='w-full min-h-screen p-4 md:p-6'>
      <div className='flex flex-col md:flex-row justify-between gap-5 mb-6'>
        <div className='bg-white rounded-2xl p-5 w-full shadow-sm'>
          <p className='text-black text-lg font-medium'>User Dashboard</p>
          <p className='text-gray-600 text-sm mt-1'>Total Users: {users?.length || 0}</p>
        </div>
      </div>

      <div className='bg-white relative min-h-[400px] rounded-2xl p-4'>
        {/* Buttons */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4'>
          <button
            onClick={handleSortAZ}
            className='cursor-pointer h-8 flex items-center justify-center bg-[#EAB139] text-black text-sm font-medium px-6 rounded-lg transition hover:bg-[#d99e2e]'
          >
            A - Z
          </button>

          <Link
            href="/admin/users/delete"
            className='h-8 flex items-center justify-center bg-[#EAB139] text-black text-sm font-medium px-6 rounded-lg transition hover:bg-red-600 hover:text-white'
          >
            Delete User
        </Link>
        </div>

        

        {/* Table header */}
        <div className='w-full overflow-hidden bg-[#8196AE] grid grid-cols-2 sm:grid-cols-5 items-center h-14 px-6 mt-4 rounded-t-lg text-center'>
          <h2 className='text-black text-sm sm:text-base font-medium'>Username</h2>
          <h2 className='text-black text-sm sm:text-base font-medium'>Email</h2>
          <h2 className='text-black text-sm sm:text-base font-medium'>Role</h2>
          <h2 className='text-black text-sm sm:text-base font-medium'>Last Activity</h2>
          <h2 className='text-black text-sm sm:text-base font-medium'>Created At</h2>
        </div>

        {/* Table body */}
        <div className='w-full'>
          {displayedUsers.length > 0 ? (
            displayedUsers.map((user, index) => (
              <div
                key={user.id || index}
                className={`w-full grid grid-cols-2 sm:grid-cols-5 items-center h-16 px-6 text-center border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <p className='text-black text-sm truncate'>{user.name || 'N/A'}</p>
                <p className='text-black text-sm truncate'>{user.email || 'N/A'}</p>
                <div className='text-black text-sm flex justify-center'>
                  <RoleDropdown userId={user.id} currentRole={user.role ?? null} />
                </div>
                <p className='text-black text-sm'>
                  {user.lastActivityDate
                    ? dayjs(user.lastActivityDate).format('DD MMM YYYY')
                    : 'Never'}
                </p>
                <p className='text-black text-sm'>
                  {user.createdAt
                    ? dayjs(user.createdAt).format('DD MMM YYYY')
                    : 'N/A'}
                </p>
              </div>
            ))
          ) : (
            <div className='w-full h-32 flex items-center justify-center'>
              <div className='text-center'>
                <p className='text-gray-500 text-lg mb-2'>No users found</p>
                <p className='text-gray-400 text-sm'>There are no users to display at the moment.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
