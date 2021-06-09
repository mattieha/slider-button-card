import { Controller } from './controller';

export class CoverController extends Controller {
  _min = 0;
  _targetValue;

  get attribute(): string {
    return this._config.attribute || 'position';
  }

  get _value(): number {
    switch(this.attribute) {
      case 'position':
        return this.stateObj.state === 'closed'
          ? 0
          : this.stateObj.attributes.current_position;
      case 'tilt':
        return this.stateObj.attributes.current_tilt_position;
      default:
        return 0;
    }
  }

  set _value(value) {
    if (!this.hasSlider) {
      const service = value > 0 ? 'open_cover' : 'close_cover';
      this._hass.callService('cover', service, {
        // eslint-disable-next-line @typescript-eslint/camelcase
        entity_id: this.stateObj.entity_id
      });
    } else {
      switch(this.attribute) {
        case 'position':
          this._hass.callService('cover', 'set_cover_position', {
            // eslint-disable-next-line @typescript-eslint/camelcase
            entity_id: this.stateObj.entity_id,
            position: value
          });
          break;
        case 'tilt':
          this._hass.callService('cover', 'set_cover_tilt_position', {
            // eslint-disable-next-line @typescript-eslint/camelcase
            entity_id: this.stateObj.entity_id,
            // eslint-disable-next-line @typescript-eslint/camelcase
            tilt_position: value
          });
          break;
        default:
      }
    }
  }

  get _step(): number {
    return 1;
  }

  get label(): string {
    const defaultLabel = this._hass.localize(`component.cover.state._.${this.state}`);
    if (!this.hasSlider) {
      return defaultLabel;
    }
    switch(this.attribute) {
      case 'position':
        if (this.percentage === 0) {
          return this._hass.localize('component.cover.state._.closed');
        }
        if (this.percentage === 100) {
          return this._hass.localize('component.cover.state._.open');
        }
        return `${this.percentage}%`;
      case 'tilt':
        return `${this.percentage}`;
    }
    return defaultLabel;
  }

  get hasSlider(): boolean {
    switch(this.attribute) {
      case 'position':
        if ('current_position' in this.stateObj.attributes) {
          return true;
        }
        if (
          'supported_features' in this.stateObj.attributes &&
          this.stateObj.attributes.supported_features & 4
        ) {
          return true;
        }
        break;
      case 'tilt':
        if ('current_tilt_position' in this.stateObj.attributes) {
          return true;
        }
        if (
          'supported_features' in this.stateObj.attributes &&
          this.stateObj.attributes.supported_features & 128
        ) {
          return true;
        }
        break;
      default:
        return false;
    }
    return false;
  }

  get _max(): number {
    return this.hasSlider ? 100 : 1;
  }

}
