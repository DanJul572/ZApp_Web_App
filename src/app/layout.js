import {Suspense} from 'react';

import {Roboto} from 'next/font/google';

import 'suneditor/dist/css/suneditor.min.css';
import 'react-querybuilder/dist/query-builder.css';

import {AlertProvider} from '@/context/AlertProvider';
import {ComponentProvider} from '@/context/ComponentProvider';
import {LoadingProvider} from '@/context/LoadingProvider';
import {ToastProvider} from '@/context/ToastProvider';
import {VarsProvider} from '@/context/VarsProvider';
import ErrorProvider from '@/context/ErrorProvider';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
});

export const metadata = {
    title: 'ZApp',
    description: 'Cretae your app without code',
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <Suspense>
                    <ErrorProvider>
                        <LoadingProvider>
                            <AlertProvider>
                                <ToastProvider>
                                    <VarsProvider>
                                        <ComponentProvider>{children}</ComponentProvider>
                                    </VarsProvider>
                                </ToastProvider>
                            </AlertProvider>
                        </LoadingProvider>
                    </ErrorProvider>
                </Suspense>
            </body>
        </html>
    );
}
