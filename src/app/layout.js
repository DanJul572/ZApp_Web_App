import {Inter} from 'next/font/google';
import ErrorProvider from '@/context/ErrorProvider';
import {LoadingProvider} from '@/context/LoadingProvider';

import 'suneditor/dist/css/suneditor.min.css';
import {AlertProvider} from '@/context/AlertProvider';

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
                        <AlertProvider>
                            {children}
                        </AlertProvider>
                    </LoadingProvider>
                </ErrorProvider>
            </body>
        </html>
    );
}
