import setup from './helper';
import fs from 'fs';

import { Track } from '../src';

const trackJSON = JSON.parse(fs.readFileSync('./test/fixtures/track.json').toString());
const track = new Track('test', trackJSON);

describe('track', () => {
  it('supports GPX output', () => {
    const gpx = track.toGPX();
    gpx.length.should.eql(883219);
  });

  it('supports KML output', () => {
    const kml = track.toKML();
    kml.length.should.eql(359055);
  });

  it('supports SRT output', () => {
    const srt = track.toSRT();
    srt.length.should.eql(604830);
  });
});
