import { stateIcon } from 'custom-card-helpers';
import { CoverAttributes } from '../types';
import { getEnumValues } from '../utils';
import { Controller } from './controller';

export class CoverController extends Controller {
  _min = 0;
  _targetValue;
  _invert = true;

  get attribute(): string {
    if (this._config.slider?.attribute?.length && this.allowedAttributes.includes(this._config.slider?.attribute)) {
      return this._config.slider?.attribute;
    }
    return CoverAttributes.POSITION;
  }

  get icon(): string {
    if (typeof this._config.icon?.icon === 'string' && this._config.icon?.icon.length) {
      return this._config.icon.icon;
    }
    return stateIcon(this.stateObj);
  }

  get allowedAttributes(): string[] {
    return getEnumValues(CoverAttributes);
  }
  get _value(): number {
    switch(this.attribute) {
      case CoverAttributes.POSITION:
        return this.stateObj?.state === 'closed'
          ? 0
          : this.stateObj.attributes.current_position;
      case CoverAttributes.TILT:
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
        case CoverAttributes.POSITION:
          this._hass.callService('cover', 'set_cover_position', {
            // eslint-disable-next-line @typescript-eslint/camelcase
            entity_id: this.stateObj.entity_id,
            position: value
          });
          break;
        case CoverAttributes.TILT:
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
    const defaultLabel = this._hass.localize(`component.cover.entity_component._.state.${this.state}`);
    const closedLabel = this._hass.localize('component.cover.entity_component._.state.closed');
    const openLabel = this._hass.localize('component.cover.entity_component._.state.open');
    if (!this.hasSlider) {
      return defaultLabel;
    }
    switch(this.attribute) {
      case CoverAttributes.POSITION:
        if (this.percentage === 0) {
          return this.invert ? openLabel : closedLabel;
        }
        if (this.percentage === 100) {
          return this.invert ? closedLabel : openLabel;
        }
        return `${this.percentage}%`;
      case CoverAttributes.TILT:
        return `${this.percentage}`;
    }
    return defaultLabel;
  }

  get hasSlider(): boolean {
    switch(this.attribute) {
      case CoverAttributes.POSITION:
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
      case CoverAttributes.TILT:
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
