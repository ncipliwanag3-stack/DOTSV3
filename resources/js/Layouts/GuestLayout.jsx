import { Head } from '@inertiajs/react';
import NavBar from '@/Components/NavBar';
import Footer from '@/Components/Footer';

export default function GuestLayout({ title, children }) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex flex-col bg-rattan-100">
                <NavBar />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </>
    );
}
