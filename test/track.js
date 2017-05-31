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
    // console.log(kml);
    fs.writeFileSync('track.kml', kml);
    kml.length.should.eql(883219);
  });

  it('supports SRT output', () => {
    const srt = track.toSRT();
    // console.log(srt);
    fs.writeFileSync('track.srt', srt);
    srt.length.should.eql(883219);
  });
});
