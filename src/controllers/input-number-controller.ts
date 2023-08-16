import { Controller } from './controller';

export class InputNumberController extends Controller {
  _targetValue;
  _invert = false;

  get _value(): number {
    return this.stateObj.state;
  }

  set _value(value) {
    this._hass.callService('input_number', 'set_value', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      entity_id: this.stateObj.entity_id,
      value: value,
    });
  }

  get _min(): number {
    return this.stateObj.attributes.min;
  }

  get _max(): number {
    return this.stateObj.attributes.max;
  }

  get isValuePercentage(): boolean {
    return false;
  }

  get _step(): number {
    return this.stateObj.attributes.step;
  }

  get label(): string {
    return this.stateObj.attributes.unit_of_measurement ? `${this.targetValue} ${this.stateObj.attributes.unit_of_measurement}` : `${this.targetValue}`;
  }

}
