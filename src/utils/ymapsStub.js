function addEvent(eventName, eventFunc) {
  this[eventName] = eventFunc;
}

function Map(node, settings) {
  const addGeoObject = jest.fn();
  const removeGeoObject = jest.fn();

  this.node = node;
  this.settings = settings;

  this.getCenter = jest.fn(() => this.settings.center);
  this.events = { add: jest.fn(addEvent.bind(this)) };
  this.geoObjects = { add: addGeoObject, remove: removeGeoObject };
}

function Placemark(coordinates, properties, styles) {
  this.coordinates = coordinates;
  this.properties = {
    ...properties,
    set: jest.fn((prop, value) => (this.properties[prop] = value)),
    get: jest.fn(prop => this.properties[prop]),
  };
  this.styles = styles;
  this.events = { add: jest.fn(addEvent.bind(this)) };
}

function Polyline() {
  this.coordinates = [];

  this.geometry = {
    setCoordinates: jest.fn(coordinates => (this.coordinates = coordinates)),
  };
}

export default function YmapsStub() {
  this.ready = jest.fn(callback => callback());
  this.Map = Map;
  this.Polyline = Polyline;
  this.Placemark = Placemark;
  this.geocode = jest.fn(coordinates => Promise.resolve({
    geoObjects: {
      get: jest.fn(
        () => (coordinates.length
          ? {
            properties: {
              get: jest.fn(() => 'Sesame street, 14'),
            },
          }
          : null),
      ),
    },
  }));
}
