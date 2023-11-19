import {Inter} from 'next/font/google';
import ErrorProvider from '@/context/ErrorProvider';
import {LoadingProvider} from '@/context/LoadingProvider';

import 'suneditor/dist/css/suneditor.min.css';
import Loading from '@/component/loading';

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: 'ZApp',
    description: 'Cretae your app without code',
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ErrorProvider>
                    <LoadingProvider>
                        <Loading />
                        {children}
                    </LoadingProvider>
                </ErrorProvider>
            </body>
        </html>
    );
}
