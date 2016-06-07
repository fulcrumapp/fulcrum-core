// [0]: Millisecond Offset Since Recording Start
// [1]: Latitude
// [2]: Longitude
// [3]: Altitude
// [4]: Horizontal Accuracy
// [5]: Vertical Accuracy
// [6]: Course
// [7]: Speed
// [8]: Viewport Bearing (Optional)
// [9]: Viewport Inclination (Optional)

export default class TrackPoint {
  static IDX_TIME = 0;
  static IDX_LATITUDE = 1;
  static IDX_LONGITUDE = 2;
  static IDX_ALTITUDE = 3;
  static IDX_HORIZONTAL_ACCURACY = 4;
  static IDX_VERTICAL_ACCURACY = 5;
  static IDX_COURSE = 6;
  static IDX_SPEED = 7;
  static IDX_VIEWPORT = 8;
  static IDX_INCLINATION = 9;

  constructor(values) {
    this._values = values;
  }

  get values() {
    return this._values;
  }

  get time() {
    return this.values[TrackPoint.IDX_TIME];
  }

  get latitude() {
    return this.values[TrackPoint.IDX_LATITUDE];
  }

  get longitude() {
    return this.values[TrackPoint.IDX_LONGITUDE];
  }

  get altitude() {
    return this.values[TrackPoint.IDX_ALTITUDE];
  }

  get horizontalAccuracy() {
    return this.values[TrackPoint.IDX_HORIZONTAL_ACCURACY];
  }

  get verticalAccuracy() {
    return this.values[TrackPoint.IDX_VERTICAL_ACCURACY];
  }

  get course() {
    return this.values[TrackPoint.IDX_COURSE];
  }

  get speed() {
    return this.values[TrackPoint.IDX_SPEED];
  }

  get viewport() {
    return this.values[TrackPoint.IDX_VIEWPORT];
  }

  get inclination() {
    return this.values[TrackPoint.IDX_INCLINATION];
  }

  get hasCoordinate() {
    return (this.latitude != null && this.longitude != null &&
            this.latitude !== 0 && this.longitude !== 0);
  }
}
