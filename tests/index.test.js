const {store, get, remove} = require('../index');

describe('Test temp file creation flow', () => {
    let tmpFilePath;
    let inputData = 12345;
    it('store func should return a file path with .txt extension', async () => {
        await store(inputData).then(path => tmpFilePath = path);
        expect(tmpFilePath).toMatch(/.txt/)
    });

    it('get func should return data in actual type', async () => {
        let outputData;
        await get(tmpFilePath).then(val => outputData = val);
        expect(inputData).toEqual(outputData);
        expect(typeof outputData).toEqual(typeof inputData)
    })

    it('get func should return error if file path is not shared', async () => {
        await expect(get()).rejects.toThrow('File path is required');
    })

    it('get func should return error if file path in invalid', async () => {
        await expect(get(`/test/${tmpFilePath}`)).rejects.toThrow('File is not available, please check file path');
    })

    it('remove func should remove file and return success msg', async () => {
        await expect(remove(tmpFilePath)).resolves.toBe('File removed!')
    })

    it('remove func should return error if file path is not shared', async () => {
        await expect(remove()).rejects.toThrow('File path is required');
    })

    it('remove func should return error if file path in invalid', async () => {
        await expect(remove(`/test/${tmpFilePath}`)).rejects.toThrow('File path is invalid');
    })
})
