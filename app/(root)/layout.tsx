import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();
    
    if (!session) redirect("/sign-in");

    return (
        <main>
            <div className='mx-auto'>
                <Navbar session={session} />
                <div>{children}</div>
                <Footer />
            </div>
        </main>
    )
}

export default layout;
