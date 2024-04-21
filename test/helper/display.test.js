import dataDisplay from '@/helper/dataDisplay';
import CInputType from '@/constant/CInputType';

describe('dataDiplay function', () => {
    test('Test for Code Field', () => {
        expect(dataDisplay(CInputType.code.value, '')).toBe('');
        expect(dataDisplay(CInputType.code.value, false)).toBe('');
        expect(dataDisplay(CInputType.code.value, null)).toBe('');
        expect(dataDisplay(CInputType.code.value, undefined)).toBe('');
        expect(dataDisplay(CInputType.code.value, 0)).toBe('Code');
        expect(dataDisplay(CInputType.code.value, [])).toBe('Code');
        expect(dataDisplay(CInputType.code.value, {})).toBe('Code');
        expect(dataDisplay(CInputType.code.value, 'text')).toBe('Code');
    });
});
