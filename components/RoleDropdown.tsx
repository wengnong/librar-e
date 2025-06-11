'use client';

import React, { useState } from 'react';
import { updateUserRole } from '@/lib/actions/user';

type Props = {
  userId: string;
  currentRole: 'USER' | 'ADMIN' | null;
};

const RoleDropdown = ({ userId, currentRole }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'USER' | 'ADMIN' | null>(currentRole);

  const handleRoleChange = async (newRole: 'USER' | 'ADMIN') => {
    if (role === newRole) return;

    setLoading(true);
    const result = await updateUserRole(userId, newRole);
    setLoading(false);

    if (result.success) {
      setRole(newRole);
      setIsOpen(false);
    } else {
      alert(result.error || 'Something went wrong');
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer px-2 py-1 rounded-full text-xs font-medium transition-all ${
          role === 'USER'
            ? 'bg-red-100 text-red-800'
            : role === 'ADMIN'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-200 text-gray-600'
        }`}
      >
        {loading ? 'Updating...' : role || 'N/A'}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-28 bg-white border rounded shadow-md z-10">
          {['USER', 'ADMIN'].map((r) => (
            <button
              key={r}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                role === r ? 'bg-gray-100 font-semibold' : ''
              }`}
              onClick={() => handleRoleChange(r as 'USER' | 'ADMIN')}
              disabled={loading}
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleDropdown;
