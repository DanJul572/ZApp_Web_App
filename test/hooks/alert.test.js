import {renderHook, act} from '@testing-library/react';
import {useAlert} from '@/context/AlertProvider';
import Alert from '@/hooks/Alert';

// Mock implementation of useAlert context
jest.mock('../../src/context/ALertProvider', () => ({
    useAlert: jest.fn(),
}));

describe('Alert hook', () => {
    it('should show success alert', () => {
        // Mock setAlert function
        const setAlert = jest.fn();

        // Mock the context value returned by useAlert
        useAlert.mockReturnValue({setAlert});

        // Render the hook in a test wrapper
        const {result} = renderHook(() => Alert());

        // Call the showSuccessAlert function
        act(() => {
            result.current.showSuccessAlert('Success message');
        });

        // Assert that setAlert was called with the correct parameters
        expect(setAlert).toHaveBeenCalledWith({
            status: true,
            type: 'success',
            message: 'Success message',
        });
    });

    it('should hide alert', () => {
        // Mock setAlert function
        const setAlert = jest.fn();

        // Mock the context value returned by useAlert
        useAlert.mockReturnValue({setAlert});

        // Render the hook in a test wrapper
        const {result} = renderHook(() => Alert());

        // Call the hideAlert function
        act(() => {
            result.current.hideAlert();
        });

        // Assert that setAlert was called with false
        expect(setAlert).toHaveBeenCalledWith(false);
    });
});
