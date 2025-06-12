'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { deleteUserByNameAndEmail } from '@/lib/actions/user'; // You should implement this

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
          <p className='text-black text-lg font-medium'>Delete User</p>
          <p className='text-gray-600 text-sm mt-1'>Remove A User's Account From The Database</p>
        </div>
      </div>
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-4">Delete User</h1>
        <p className="text-gray-600 mb-6">
          Please confirm the user's name and email before deletion.
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

          <Button
            onClick={handleDelete}
            disabled={isSubmitting || !username || !email}
            className="bg-red-500 hover:bg-red-600 text-white w-full"
          >
            {isSubmitting ? 'Deleting...' : 'Confirm Delete'}
          </Button>

          <Button
              onClick={() => router.back()}
              variant="outline"
              className="w-full"
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
