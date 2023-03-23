interface SidebarComponentProps extends IntrinsicAttributes {
  setLocation: Function;
  setCityId: Function;
  cityId: number;
}
interface MapComponentProps extends IntrinsicAttributes {
  location: [number, number];
  cityId: number;
}
type location = [location: [number, number], setLocation: Function];
type cityId = [number, Function];

export { location, SidebarComponentProps, MapComponentProps, cityId };
