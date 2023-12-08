import {Inter} from 'next/font/google';

import 'suneditor/dist/css/suneditor.min.css';
import 'react-querybuilder/dist/query-builder.css';

import {AlertProvider} from '@/context/AlertProvider';
import {BuilderProvider} from '@/context/BuilderProvider';
import ErrorProvider from '@/context/ErrorProvider';
import {LoadingProvider} from '@/context/LoadingProvider';

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
                            <BuilderProvider>{children}</BuilderProvider>
                        </AlertProvider>
                    </LoadingProvider>
                </ErrorProvider>
            </body>
        </html>
    );
}
