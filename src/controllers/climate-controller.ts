import { Controller } from './controller';

export class ClimateController extends Controller {
  _step = 1;
  _targetValue;

  get _value(): number {
    return this.stateObj.attributes.temperature;
  }

  set _value(value) {
    this._hass.callService('climate', 'set_temperature', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      entity_id: this.stateObj.entity_id,
      temperature: value,
    });
  }

  get _min(): number {
    return this.stateObj.attributes.min_temp;
  }

  get _max(): number {
    return this.stateObj.attributes.max_temp;
  }

  get isValuePercentage(): boolean {
    return false;
  }

  get label(): string {
    return `${this.value} ${this._hass.config.unit_system.temperature}`
    /*if (this.percentage > 0) {
      if (this.hasSlider) {
        return `${this.percentage}%`
      } else {
        return this._hass.localize('component.fan.state._.on');
      }
    }
    return this._hass.localize('component.fan.state._.off');*/
  }

}
