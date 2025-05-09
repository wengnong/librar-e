import { Session } from 'next-auth'
import React from 'react'

const Header = ({ session } : { session: Session }) => {
    return (
        <header className='flex flex-row md:flex-col'>
            <div>
                <h1 className='mt-4 ml-2'>Welcome back,
                    <br />
                    <span className='font-bold text-2xl'>{session?.user?.name}</span>
                </h1>
            </div>

            <div>
                {/* this will have the search tag, later biar bisa search user atoga booknya sesuai adminnya lagi di page mana, user ato book */}
            </div>
        </header>
    )
}

export default Header