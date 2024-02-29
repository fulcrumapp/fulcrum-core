"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class SRT {
    static render(tracks) {
        return new SRT().render(tracks);
    }
    timestamp(t) {
        let x = t - this._firstTimestamp;
        const ms = (0, lodash_1.padStart)(Math.floor(x % 1000), 2, '0');
        x /= 1000;
        const ss = (0, lodash_1.padStart)(Math.floor(x % 60), 2, '0');
        x /= 60;
        const mm = (0, lodash_1.padStart)(Math.floor(x % 60), 2, '0');
        x /= 60;
        const hh = (0, lodash_1.padStart)(Math.floor(x % 24), 2, '0');
        return `${hh}:${mm}:${ss},${ms}`;
    }
    render(tracks) {
        this._firstTimestamp = tracks[0].segments[0].points[0].time;
        const parts = [];
        for (const track of tracks) {
            for (const segment of track.segments) {
                for (const point of segment.points) {
                    parts.push(this.srtEntry(point, segment.points[parts.length + 1], parts.length + 1));
                }
            }
        }
        return parts.join('\n\n').trim();
    }
    srtEntry(point, nextPoint, number) {
        return `
${number}
${this.timestamp(point.time)} ${nextPoint != null ? '--> ' + this.timestamp(nextPoint.time) : ''}
${this.formatText(point)}
`.trim();
    }
    formatText(point) {
        return [
            new Date(point.time).toISOString().replace('T', ' ').replace('Z', '').replace(/\.[\d]{3}/, ''),
            point.latitude != null ? point.latitude.toFixed(6) : '',
            point.longitude != null ? point.longitude.toFixed(6) : '',
            this.formatAltitude(point),
            this.formatSpeed(point)
        ].join(', ');
    }
    formatAltitude(point) {
        if (point.altitude == null) {
            return null;
        }
        const altitude = point.altitude.toFixed(0);
        return (point.altitude > 0 ? '+' + altitude : '-' + altitude) + 'm';
    }
    formatSpeed(point) {
        if (point.speed == null) {
            return null;
        }
        const speed = (point.speed * 2.23694).toFixed(0);
        return speed + 'mph';
    }
}
exports.default = SRT;
//# sourceMappingURL=srt.js.map