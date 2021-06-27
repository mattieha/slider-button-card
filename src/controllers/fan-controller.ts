import { STATES_OFF } from 'custom-card-helpers';
import { Controller } from './controller';

export class FanController extends Controller {
  _min = 0;
  _targetValue;
  _invert = false;

  get _value(): number {
    return this.isUnavailable || STATES_OFF.includes(this.state)
      ? 0
      : this.hasSlider ? this.stateObj.attributes.percentage : 1;
  }

  set _value(value) {
    const service = value > 0 ? 'turn_on' : 'turn_off';
    if (value > 0 && this.hasSlider) {
      this._hass.callService('fan', 'set_percentage', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        entity_id: this.stateObj.entity_id,
        percentage: value
      });
    } else {
      this._hass.callService('fan', service, {
        // eslint-disable-next-line @typescript-eslint/camelcase
        entity_id: this.stateObj.entity_id
      });
    }
  }

  get _step(): number {
    return this.stateObj.attributes.percentage_step;
  }

  get label(): string {
    if (this.percentage > 0) {
      if (this.hasSlider) {
        return `${this.percentage}%`
      } else {
        return this._hass.localize('component.fan.state._.on');
      }
    }
    return this._hass.localize('component.fan.state._.off');
  }

  get hasSlider(): boolean {
    return 'speed' in this.stateObj.attributes;
  }

  get _max(): number {
    return this.hasSlider ? 100 : 1;
  }

  get iconRotateSpeed(): string {
    let speed = 0;
    if (this.percentage > 0) {
      speed = 3 - ((this.percentage / 100) * 2);
    }
    return `${speed}s`
  }

}
