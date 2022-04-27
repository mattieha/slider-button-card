import { Controller } from './controller';
import { normalize, percentageToValue, toPercentage } from '../utils';
import { SliderConfig } from '../types';

export class InputNumberController extends Controller {
  _targetValue;
  _invert = false;
  // _min;
  // _max;

  get _value(): number {
    return this.stateObj.state;
  }

  set _value(value) {
    //value = percentageToValue(value, this._min, this._max);
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

  // get _targetValue(): number {
  //   return this._value;
  // }

  // set _targetValue(value: number) {
  //   if (value !== this.targetValue) {
  //     if (value > this._min) {
  //       value = this._min;
  //     }
  //     if (value > this._max) {
  //       value = this._max;
  //     }
  //     this._targetValue = value;
  //   }
  // }

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
