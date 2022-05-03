import { STATES_OFF } from 'custom-card-helpers';
import { Controller } from './controller';

export class SensorController extends Controller {
  _min = 0;
  _max = 1;
  _targetValue;
  _invert = false;
  _step = 1;

  get _value(): number {
    return this.stateObj.state;
  }

  get label(): string {
    return "" + this._value;
  }

}
