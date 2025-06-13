'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { deleteUserByNameAndEmail } from '@/lib/actions/user';
import Link from 'next/link';

const DeleteUserPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    const result = await deleteUserByNameAndEmail(username, email);
    
    if (result.success) {
      router.push('/admin/users'); // go back to user list
    } else {
      setError(result.message || 'Failed to delete user');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full min-h-screen p-6">
        <div className='flex flex-col md:flex-row justify-between gap-5 mb-6'>
        <div className='bg-white rounded-2xl p-5 w-full shadow-sm'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-black text-lg font-medium'>Delete User</p>
              <p className='text-gray-600 text-sm mt-1'>Remove User&apos;s Account From The Database</p>
            </div>
            <Link 
                href="/admin/users" 
                className="text-gray-600 hover:text-gray-800 transition"
            >
                ← Back to Users
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-4">Delete User</h1>
        <p className="text-gray-600 mb-6">
          Please confirm the user&apos;s name and email before deletion.
        </p>

        <div className="space-y-4">
          <Input
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleDelete}
            disabled={isSubmitting || !username || !email}
            className="bg-red-500 hover:bg-red-700 text-white text-sm w-full rounded-md py-2 px-4 cursor-pointer"
          >
            {isSubmitting ? 'Deleting...' : 'Confirm Delete'}
          </button>

          <Button
              onClick={() => router.back()}
              variant="outline"
              className="w-full cursor-pointer hover:bg-gray-100"
              disabled={isSubmitting}
              >
                Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserPage;
