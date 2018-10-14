function Map(node, settings) {
  const addGeoObject = jest.fn();
  const removeGeoObject = jest.fn();
  const addEvent = (eventName, eventFunc) => (this[eventName] = eventFunc);

  this.node = node;
  this.settings = settings;

  this.getCenter = jest.fn(() => this.settings.center);
  this.events = { add: jest.fn(addEvent) };
  this.geoObjects = { add: addGeoObject, remove: removeGeoObject };
}

function Placemark(coordinates) {
  const addEvent = (eventName, eventFunc) => (this[eventName] = eventFunc);
  this.coordinates = coordinates;
  this.events = { add: jest.fn(addEvent) };
}

function LineString() {}

function Polyline() {
  this.geometry = { getCoordinates: jest.fn(), setCoordinates: jest.fn() };
}

export default function YmapsStub() {
  this.ready = jest.fn(callback => callback());
  this.Map = Map;
  this.Polyline = Polyline;
  this.Placemark = Placemark;
  this.geometry = { LineString };
}
