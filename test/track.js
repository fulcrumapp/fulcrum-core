import setup from './helper';
import fs from 'fs';

import { Track } from '../src';

const trackJSON = JSON.parse(fs.readFileSync('./test/fixtures/track.json').toString());
const track = new Track('test', trackJSON);

const bogusTrack = {tracks:[{track:[[1510349151987,null,null,null,null,null,null,null,0,0]]}]};

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
    srt.length.should.eql(604821);
  });

  it('handles bad tracks', () => {
    const track = new Track('test', bogusTrack);

    const kml = track.toKML();
    const gpx = track.toGPX();
    const srt = track.toSRT();
    const geojson = track.toGeoJSONString();

    track.isValid.should.eql(false);
  });
});
