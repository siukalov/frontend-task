function Map(node, settings) {
  const addEvent = jest.fn((eventName, eventFunc) => (this[eventName] = eventFunc));

  this.node = node;
  this.settings = settings;

  this.getCenter = jest.fn(() => this.settings.center);
  this.events = { add: addEvent };
}

export default function YmapsStub() {
  this.ready = jest.fn(callback => callback());
  this.Map = Map;
}
