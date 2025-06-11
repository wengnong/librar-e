'use client';

import { useState, useEffect } from 'react';
import { getAllBooks } from '@/lib/actions/book';
import { getAllUsers } from '@/lib/actions/user';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  createdAt: Date | null;
};

type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: 'USER' | 'ADMIN' | null;
  createdAt: Date | null;
  lastActivityDate: string | null;
};

function getBooksGrowthByMonth(books: Book[]) {
  const grouped: Record<string, number> = {};
  const sortedBooks = [...books].sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());

  let count = 0;
  const data = [];

  for (const book of sortedBooks) {
    const date = new Date(book.createdAt!);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!grouped[key]) grouped[key] = 0;
    grouped[key]++;
  }

  for (const key of Object.keys(grouped).sort()) {
    count += grouped[key];
    data.push({ month: key, total: count });
  }

  return data;
}

function getUsersGrowthByMonth(users: User[]) {
  const grouped: Record<string, number> = {};
  const sortedUsers = [...users].sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());

  let count = 0;
  const data = [];

  for (const user of sortedUsers) {
    const date = new Date(user.createdAt!);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!grouped[key]) grouped[key] = 0;
    grouped[key]++;
  }

  for (const key of Object.keys(grouped).sort()) {
    count += grouped[key];
    data.push({ month: key, total: count });
  }

  return data;
}

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const usersResult = await getAllUsers();
        if (usersResult?.success) {
          setUsers(usersResult.data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchBooks();
    fetchUsers();
  }, []);

  const bookGrowthData = getBooksGrowthByMonth(books);
  const userGrowthData = getUsersGrowthByMonth(users);

  return (
    <div className='w-full min-h-screen p-4 md:p-6'>
      {/* Admin Header */}
      <div className='flex flex-col md:flex-row justify-between gap-5 mb-6'>
        <div className='bg-white rounded-2xl p-5 w-full shadow-sm'>
          <p className='text-black text-lg font-medium'>Admin Homepage</p>
          <p className='text-gray-600 text-sm mt-1'>
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* General Info Boxes */}
      <div className='bg-white relative min-h-[200px] rounded-2xl p-4'>
        <h1 className='text-black text-lg font-bold'>General Informations</h1>
        <hr className='my-3 h-1 border-t-0 bg-[#EAB139]' />

        <div className='flex flex-col sm:flex-row gap-4 mt-2'>
          <div className='flex-1 bg-gray-100 rounded-lg p-4 shadow-sm'>
            <p className='text-gray-700 text-sm font-medium'>Total Books</p>
            <p className='text-black text-xl font-semibold'>{books.length}</p>
          </div>
          <div className='flex-1 bg-gray-100 rounded-lg p-4 shadow-sm'>
            <p className='text-gray-700 text-sm font-medium'>Total Users</p>
            <p className='text-black text-xl font-semibold'>{users.length}</p>
          </div>
        </div>
      </div>

      {/* Books Growth Chart */}
      <div className='bg-white rounded-2xl shadow-sm p-6 mt-6'>
        <h3 className='text-lg font-semibold mb-4'>Books Growth Over Time</h3>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={bookGrowthData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type='monotone' dataKey='total' stroke='#FACC15' strokeWidth={3} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Users Growth Chart */}
      <div className='bg-white rounded-2xl shadow-sm p-6 mt-6'>
        <h3 className='text-lg font-semibold mb-4'>Users Growth Over Time</h3>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type='monotone' dataKey='total' stroke='#60A5FA' strokeWidth={3} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
