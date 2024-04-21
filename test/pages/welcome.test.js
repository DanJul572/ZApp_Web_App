import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Page from '@/app/page';

describe('Welcome Component', () => {
    test('renders "HELLO WOLRD!" as a text', () => {
        render(<Page />);
        const headingElement = screen.getByText('HELLO WOLRD!');
        expect(headingElement).toBeInTheDocument();
    });
});
