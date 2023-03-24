interface SidebarComponentProps extends IntrinsicAttributes {
  setLocation: Function;
  setCityId: Function;
  cityId: number;
}
interface MapComponentProps extends IntrinsicAttributes {
  location: [number, number];
  cityId: number;
}
type weatherObject = {
  status: string;
  value: {
    base: string;
    cloud: { all: number };
    cod: number;
    coord: { lon: number; lat: number };
    dt: number;
    id: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
    };
    name: string;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: 32400;
    visibility: 10000;
    weather: [object];
    wind: { speed: number; deg: number };
  };
};
type location = [location: [number, number], setLocation: Function];
type cityId = [number, Function];

export {
  location,
  SidebarComponentProps,
  MapComponentProps,
  cityId,
  weatherObject,
};
