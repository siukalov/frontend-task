import loadMaps from '../loadjs';

const loadJS = require('load-js');

describe('loadjs', () => {
  const ymaps = { loaded: true };

  beforeAll(() => {
    loadJS.create = jest.fn();
  });

  it('should load ymaps', () => {
    window.ymaps = ymaps;
    expect(loadMaps()).toEqual(ymaps);
    expect(loadJS.create).toHaveBeenCalled();
  });
});
