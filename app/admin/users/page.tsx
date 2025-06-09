import React from 'react'
import { auth } from '@/auth';
import dayjs from 'dayjs';
import { getAllUsers } from '@/lib/actions/user';
import { updateUserRole } from '@/lib/actions/user';



const Page = async () => {
    const session = await auth();
    const usersResult = await getAllUsers();
    const users = usersResult?.success ? usersResult.data : [];

    return (
        <div className='w-full min-h-screen p-4 md:p-6'>
            <div className='flex flex-col md:flex-row justify-between gap-5 mb-6'>
                <div className='bg-white rounded-2xl p-5 w-full shadow-sm'>
                    <p className='text-black text-lg font-medium'>User Dashboard</p>
                    <p className='text-gray-600 text-sm mt-1'>Total Users: {users?.length || 0}</p>
                </div>
            </div>

            <div className='bg-white relative min-h-[400px] rounded-2xl p-4'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4'>
                    <button className='h-8 flex items-center justify-center bg-[#EAB139] text-black text-sm font-medium px-6 rounded-lg transition hover:bg-[#d99e2e]'>
                        A - Z
                    </button>
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
                    {users && users.length > 0 ? (
                        users.map((user, index) => (
                            <div 
                                key={user.id || index}
                                className={`w-full grid grid-cols-2 sm:grid-cols-5 items-center h-16 px-6 text-center border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                }`}
                            >
                                <p className='text-black text-sm truncate'>{user.name || 'N/A'}</p>
                                <p className='text-black text-sm truncate'>{user.email || 'N/A'}</p>
                                <p className='text-black text-sm'>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        user.role === 'USER' 
                                            ? 'bg-red-100 text-red-800' 
                                            : user.role === 'ADMIN'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-green-100 text-green-800'
                                    }`}>
                                        {user.role || 'user'}
                                    </span>
                                </p>
                                <p className='text-black text-sm'>
                                    {user.lastActivityDate 
                                        ? dayjs(user.lastActivityDate).format("DD MMM YYYY")
                                        : 'Never'
                                    }
                                </p>
                                <p className='text-black text-sm'>
                                    {user.createdAt 
                                        ? dayjs(user.createdAt).format("DD MMM YYYY")
                                        : 'N/A'
                                    }
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
    )
}

export default Page