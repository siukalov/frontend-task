import loadJS from 'load-js';
import loadMaps from '../loadMaps';

jest.mock('load-js');

describe('loadMaps', () => {
  const ymaps = { loaded: true };

  beforeAll(() => {
    loadJS.mockImplementation(() => Promise.resolve('success'));
  });

  it('should load ymaps', async () => {
    global.ymaps = ymaps;
    await loadMaps().then(value => expect(value).toEqual(ymaps));
  });
});
