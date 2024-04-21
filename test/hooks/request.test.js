import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {useRouter} from 'next/navigation';
import {renderHook} from '@testing-library/react';
import {getCookie} from 'cookies-next';

import Request from '@/hooks/Request';

// Mock useRouter
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Mock getCookie
jest.mock('cookies-next', () => ({
    getCookie: jest.fn(),
}));

// Mock auth
jest.mock('../../src/helper/auth', () => ({
    logout: jest.fn(),
}));

describe('Request', () => {
    let mockAxios;
    const mockRouterPush = jest.fn();

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
        useRouter.mockReturnValue({push: mockRouterPush});
    });

    afterEach(() => {
        mockAxios.reset();
        jest.clearAllMocks();
    });

    it('should send GET request with auth header', async () => {
        const token = 'mock-token';
        getCookie.mockReturnValue(token);

        const {result} = renderHook(() => Request());

        const mockData = {id: 1, name: 'John Doe'};
        const mockUrl = '/api/data';
        mockAxios.onGet(process.env.NEXT_PUBLIC_ENV_API_URL + mockUrl).reply(200, mockData);

        const response = await result.current.get(mockUrl);

        expect(response).toEqual(mockData);
        expect(mockAxios.history.get[0].headers['Authorization']).toEqual(token);
    });

    it('should send POST request with auth header', async () => {
        const token = 'mock-token';
        getCookie.mockReturnValue(token);

        const {result} = renderHook(() => Request());

        const mockData = {success: true};
        const mockUrl = '/api/data';
        const mockBody = {name: 'John Doe'};
        mockAxios.onPost(process.env.NEXT_PUBLIC_ENV_API_URL + mockUrl, mockBody).reply(200, mockData);

        const response = await result.current.post(mockUrl, mockBody);

        expect(response).toEqual(mockData);
        expect(mockAxios.history.post[0].headers['Authorization']).toEqual(token);
    });
});
