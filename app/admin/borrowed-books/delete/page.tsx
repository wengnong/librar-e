'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { deleteBorrowRecordByUsernameAndBookTitle } from '@/lib/actions/user';

const DeleteBorrowRecordPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    if (!username.trim() || !bookTitle.trim()) {
      setError('Please enter both username and book title');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await deleteBorrowRecordByUsernameAndBookTitle(
        username.trim(), 
        bookTitle.trim()
      );
      
      if (result.success) {
        setSuccess(result.message || 'Borrow record deleted successfully');
        // Reset form after successful deletion
        setTimeout(() => {
          setUsername('');
          setBookTitle('');
          setSuccess('');
          router.push('/admin/borrowed-books'); // Redirect to borrowed books list
        }, 2000);
      } else {
        setError(result.message || 'Failed to delete borrow record');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-6">
      <div className='flex flex-col md:flex-row justify-between gap-5 mb-6'>
        <div className='bg-white rounded-2xl p-5 w-full shadow-sm'>
          <p className='text-black text-lg font-medium'>Delete Borrow Record</p>
          <p className='text-gray-600 text-sm mt-1'>Remove A Borrowing Record From The Database</p>
        </div>
      </div>
      
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-4">Delete Borrow Record</h1>
        <p className="text-gray-600 mb-6">
          Please enter the username and book title to delete the borrowing record.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Title
            </label>
            <Input
              placeholder="Enter book title"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          <Button
            onClick={handleDelete}
            disabled={isSubmitting || !username.trim() || !bookTitle.trim()}
            className="bg-red-500 hover:bg-red-600 text-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
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

export default DeleteBorrowRecordPage;