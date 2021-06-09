import { STATES_OFF } from 'custom-card-helpers';
import { SliderBackground } from '../types';
import { Controller, ObjectStyle } from './controller';

const RGB_INDEX = {
  red: 0,
  green: 1,
  blue: 2
};
const HS_INDEX = {
  hue: 0,
  saturation: 1
};

export class LightController extends Controller {

  _targetValue;

  get attribute(): string {
    return this._config.slider?.attribute || 'brightness_pct';
  }

  get _value(): number {
    if (!this.stateObj || STATES_OFF.includes(this.stateObj.state)) {
      return 0;
    }
    const attr = this.stateObj.attributes;
    switch(this.attribute) {
      case 'color_temp':
        return Math.round(attr.color_temp);
      case 'white_value':
        return Math.round(attr.white_value);
      case 'brightness':
        return Math.round(attr.brightness);
      case 'brightness_pct':
        return Math.round((attr.brightness * 100.0) / 255);
      case 'red':
      case 'green':
      case 'blue':
        return attr.rgb_color
          ? Math.round(attr.rgb_color[RGB_INDEX[this.attribute]])
          : 0;
      case 'hue':
      case 'saturation':
        return attr.hs_color
          ? Math.round(attr.hs_color[HS_INDEX[this.attribute]])
          : 0;
      case 'effect':
        if (attr.effect_list) {
          return attr.effect_list.indexOf(attr.effect);
        }
        return 0;
      default:
        return 0;
    }
  }

  set _value(value) {
    if (!this.stateObj) {
      return;
    }
    let attr = this.attribute;
    let on = true;
    let _value;
    switch(attr) {
      case 'brightness':
      case 'brightness_pct':
        value =
          attr === 'brightness'
            ? Math.round(value)
            : Math.round((value / 100.0) * 255);
        if (!value) {
          on = false;
        }
        attr = 'brightness';
        break;
      case 'red':
      case 'green':
      case 'blue':
        _value = this.stateObj.attributes.rgb_color || [0, 0, 0];
        _value[RGB_INDEX[attr]] = value;
        value = _value;
        attr = 'rgb_color';
        break;
      case 'hue':
      case 'saturation':
        _value = this.stateObj.attributes.hs_color || [0, 0];
        _value[HS_INDEX[attr]] = value;
        value = _value;
        attr = 'hs_color';
        break;
      case 'effect':
        value = this.stateObj.attributes.effect_list[value];
        attr = 'effect';
        break;
    }

    if (on) {
      this._hass.callService('light', 'turn_on', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        entity_id: this.stateObj.entity_id,
        [attr]: value
      });
    } else {
      this._hass.callService('light', 'turn_off', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        entity_id: this.stateObj.entity_id
      });
    }
  }

  get _step(): number {
    switch(this.attribute) {
      case 'effect':
        return 1;
      default:
        return 5;
    }
  }

  get _min(): number {
    switch(this.attribute) {
      case 'color_temp':
        return this.stateObj ? this.stateObj.attributes.min_mireds : 0;
      default:
        return 0;
    }
  }

  get _max(): number {
    switch(this.attribute) {
      case 'color_temp':
        return this.stateObj ? this.stateObj.attributes.max_mireds : 0;
      case 'red':
      case 'green':
      case 'blue':
      case 'white_value':
      case 'brightness':
        return 255;
      case 'hue':
        return 360;
      case 'effect':
        return this.stateObj
          ? this.stateObj.attributes.effect_list
            ? this.stateObj.attributes.effect_list.length - 1
            : 0
          : 0;
      default:
        return 100;
    }
  }

  get label(): string {
    if (this.percentage === 0) {
      return this._hass.localize('component.light.state._.off');
    }
    switch(this.attribute) {
      case 'color_temp':
      case 'brightness':
        return `${this.targetValue}`;
      case 'brightness_pct':
      case 'saturation':
        return `${this.targetValue}%`;
      case 'hue':
        return `${this.targetValue}°`;
      case 'effect':
        return this.stateObj ? this.stateObj.attributes.effect : '';
      default:
        return `${this.targetValue}`;
    }
  }

  get hasSlider(): boolean {
    if (!this.stateObj) {
      return false;
    }
    switch(this.attribute) {
      case 'brightness':
      case 'brightness_pct':
        if ('brightness' in this.stateObj.attributes) {
          return true;
        }
        return !!('supported_features' in this.stateObj.attributes &&
          this.stateObj?.attributes?.supported_features & 1);

      case 'color_temp':
        if ('color_temp' in this.stateObj.attributes) {
          return true;
        }
        return !!('supported_features' in this.stateObj.attributes &&
          this.stateObj.attributes.supported_features & 2);

      case 'white_value':
        if ('white_value' in this.stateObj.attributes) {
          return true;
        }
        return !!('supported_features' in this.stateObj.attributes &&
          this.stateObj.attributes.supported_features & 128);

      case 'red':
      case 'green':
      case 'blue':
        if ('rgb_color' in this.stateObj.attributes) {
          return true;
        }
        return !!('supported_features' in this.stateObj.attributes &&
          this.stateObj.attributes.supported_features & 16);

      case 'hue':
      case 'saturation':
        if ('hs_color' in this.stateObj.attributes) {
          return true;
        }
        return !!('supported_features' in this.stateObj.attributes &&
          this.stateObj.attributes.supported_features & 16);

      case 'effect':
        return 'effect' in this.stateObj.attributes;

      default:
        return false;
    }
  }
}
