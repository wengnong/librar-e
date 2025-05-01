import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className=''>
            <div className='mx-auto'>
                <Navbar />
                <Header />
                <div>{children}</div>
            </div>
        </main>
    )
}

export default layout;
