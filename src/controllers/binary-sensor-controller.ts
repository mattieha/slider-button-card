import { STATES_OFF } from 'custom-card-helpers';
import { Controller } from './controller';

export class BinarySensorController extends Controller {
  _min = 0;
  _max = 1;
  _targetValue;
  _invert = false;
  _step = 1;

  get _value(): number {
    return !STATES_OFF.includes(this.stateObj.state)
      ? 1
      : 0;
  }

  get label(): string {
    return this.stateObj.state;
  }

}
