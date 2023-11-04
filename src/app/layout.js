import {Inter} from 'next/font/google';
import ErrorProvider from '@/context/ErrorProvider';
import 'suneditor/dist/css/suneditor.min.css';

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: 'ZApp',
    description: 'Cretae your app without code',
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ErrorProvider>{children}</ErrorProvider>
            </body>
        </html>
    );
}
