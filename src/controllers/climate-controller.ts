import { STATES_OFF } from 'custom-card-helpers';
import { capitalizeFirst } from '../utils';
import { Controller } from './controller';

export class ClimateController extends Controller {
   _targetValue;
  _invert = false;

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

  get isOff(): boolean {
    return STATES_OFF.includes(this.state);
  }

  get _step(): number {
    return this.stateObj.attributes?.target_temp_step || 1;
  }

  get _min(): number {
    return this.stateObj.attributes?.min_temp || 7;
  }

  get _max(): number {
    return this.stateObj.attributes?.max_temp || 35;
  }

  get isValuePercentage(): boolean {
    return false;
  }

  get label(): string {
    const unit = this._hass.config.unit_system.temperature;
    const mode = capitalizeFirst(this.state);
    // const current = this.stateObj.attributes?.current_temperature ? ` | ${this.stateObj.attributes.current_temperature}${unit}` : '';
    return `${this.targetValue}${unit} | ${mode}`;
  }

}
