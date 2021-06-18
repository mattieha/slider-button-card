/* eslint-disable @typescript-eslint/camelcase */
import { Controller } from './controller';

export class MediaController extends Controller {
  _min = 0;
  _max = 100;
  _step = 1;
  _targetValue;

  get _value(): number {
    return this.stateObj.attributes.is_volume_muted
      ? 0
      : Math.ceil(this.stateObj.attributes.volume_level * 100.0);
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

  get label(): string {
/*
    if (this.percentage > 0) {
      if (this.hasSlider) {
        return `${this.percentage}%`
      } else {
        return this._hass.localize('component.fan.state._.on');
      }
    }
    return this._hass.localize('component.fan.state._.off');
*/

    if (this.stateObj.attributes.is_volume_muted) return '-';
    return !!this.stateObj.attributes.volume_level
      ? `${this.percentage}%`
      : this._hass.localize('component.media_player.state._.off');
  }

}
