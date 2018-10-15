import Immutable from 'seamless-immutable';

export default Immutable({
  center: null,
  markers: [
    {
      id: 0,
      name: 'Home',
      coordinates: [55, 38],
      onMap: false,
    },
    {
      id: 1,
      name: 'Work',
      coordinates: [55, 34],
      onMap: false,
    },
    {
      id: 2,
      name: 'Shop',
      coordinates: [53, 37],
      onMap: false,
    },
  ],
});
