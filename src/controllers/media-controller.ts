/* eslint-disable @typescript-eslint/camelcase */
import { Controller } from './controller';

export class MediaController extends Controller {
  _min = 0;
  _max = 100;
  _step = 1;
  _targetValue;
  _invert = false;

  get _value(): number {
    return this.isUnavailable || this.stateObj?.attributes?.is_volume_muted
      ? 0
      : Math.floor(parseFloat(Number.parseFloat(this.stateObj.attributes.volume_level).toPrecision(2)) * 100.0);
  }

  set _value(value) {
    value = value / 100.0;
    this._hass.callService('media_player', 'volume_set', {
      entity_id: this.stateObj.entity_id,
      volume_level: value,
    });
    if (value)
      this._hass.callService('media_player', 'volume_mute', {
        entity_id: this.stateObj.entity_id,
        is_volume_muted: false,
      });
  }

  get isOff(): boolean {
    return this.stateObj.state === 'off';
  }

/*
Attributes desired:
Playstation: source, media_title
TV: source
Chromecast: app_name, media_title, media_series, media_...
  Plex is a bit of an outlier with no media_title
*/

  get label(): string {
    let output;
    let primary_info;
    let secondary_info;

    if (this.stateObj.attributes.is_volume_muted) primary_info = '-';

    primary_info = !!this.stateObj.attributes.volume_level
      ? `${this.percentage}%`
      : `${this._hass.localize(`component.media_player.state._.${this.state}`)}`;

    secondary_info = this._config.attribute;

    output = primary_info;

    if (secondary_info) output = output + " · " + secondary_info;

    return output;
  }

}
