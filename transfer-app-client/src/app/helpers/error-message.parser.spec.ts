import { parseErrorMessage } from './error-message.parser';

describe('ErrorMessageParserHelper', () => {
    it('should parse the string and return the message', () => {
        const errorList = [
            'error',
            { error: 'error' },
            { error: { error: 'error' } },
            { message: 'error' }
        ];
        errorList.forEach(e => {
            expect(parseErrorMessage(e)).toEqual('error');
        });

        expect(parseErrorMessage({ otherError: 'error' })).toEqual(
            '{"otherError":"error"}'
        );
    });
});
