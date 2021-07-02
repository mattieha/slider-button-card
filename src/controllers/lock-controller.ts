import { STATES_OFF } from 'custom-card-helpers';
import { Controller } from './controller';

export class LockController extends Controller {
  _min = 0;
  _max = 1;
  _targetValue;
  _invert = false;

  get _value(): number {
    return !STATES_OFF.includes(this.stateObj.state)
      ? 1
      : 0;
  }

  set _value(value) {
    const service = value > 0 ? 'lock' : 'unlock';
    this._hass.callService('lock', service, {
      // eslint-disable-next-line @typescript-eslint/camelcase
      entity_id: this.stateObj.entity_id
    });
  }

  get _step(): number {
    return 1;
  }

  get label(): string {
    if (this.percentage > 0) {
      return this._hass.localize('component.lock.state._.unlocked');
    }
    return this._hass.localize('component.lock.state._.locked');
  }

}
