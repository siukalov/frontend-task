import loadJS from 'load-js';
import loadMaps from '../loadMaps';

jest.mock('load-js');

describe('loadMaps', () => {
  const ymaps = { loaded: true };

  beforeAll(() => {
    loadJS.mockReturnValue(Promise.resolve('success'));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should load ymaps', async () => {
    global.ymaps = ymaps;
    await loadMaps().then(value => expect(value).toEqual(ymaps));
  });
});
