import { ReactNode } from 'react'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className=''>
            <div className='mx-auto'>
                <Navbar />
                <div>{children}</div>
                <Footer />
            </div>
        </main>
    )
}

export default layout;
