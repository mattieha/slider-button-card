import { STATES_OFF } from 'custom-card-helpers';
import { LightAttributes, LightColorModes } from '../types';
import { getEnumValues, getLightColorBasedOnTemperature } from '../utils';
import { Controller } from './controller';

const HS_INDEX = {
  hue: 0,
  saturation: 1
};

export class LightController extends Controller {

  _step = 1;
  _targetValue;

  get attribute(): string {
    const attr = this._config.slider?.attribute as LightAttributes;
    let useAttr = LightAttributes.BRIGHTNESS_PCT;
    let supported: string[] = [];
    if (Array.isArray(this.stateObj?.attributes?.supported_color_modes)) {
      supported = this.stateObj?.attributes?.supported_color_modes;
    }
    if (supported.length === 1 && supported[0] === LightAttributes.ON_OFF) {
      useAttr = LightAttributes.ON_OFF;
    }
    if (attr?.length && this.allowedAttributes.includes(attr)) {

      useAttr = attr;
      switch(attr) {
        case LightAttributes.COLOR_TEMP:
          if (!supported.includes('color_temp')) {
            useAttr = LightAttributes.BRIGHTNESS_PCT;
          }
          break;
        case LightAttributes.HUE:
        case LightAttributes.SATURATION:
          if (!supported.includes('hs')) {
            useAttr = LightAttributes.BRIGHTNESS_PCT;
          }
          break;
      }
    }
    return useAttr;
  }

  get allowedAttributes(): string[] {
    return getEnumValues(LightAttributes);
  }

  get colorMode(): LightColorModes | undefined {
    return this.stateObj?.attributes?.color_mode;
  }

  get _value(): number {
    if (!this.stateObj || STATES_OFF.includes(this.state)) {
      return this.isValuePercentage ? 0 : this.min;
    }
    const attr = this.stateObj.attributes;
    switch(this.attribute) {
      case LightAttributes.COLOR_TEMP:
        return attr.color_temp ? Math.round(attr.color_temp) : this.min;
      case LightAttributes.BRIGHTNESS:
        return Math.round(attr.brightness);
      case LightAttributes.BRIGHTNESS_PCT:
        return Math.round((attr.brightness * 100.0) / 255);
      case LightAttributes.ON_OFF:
        return 1;
      case LightAttributes.HUE:
      case LightAttributes.SATURATION:
        return attr.hs_color
          ? Math.round(attr.hs_color[HS_INDEX[this.attribute]])
          : 0;
      default:
        return 0;
    }
  }

  set _value(value) {
    if (!this.stateObj) {
      return;
    }
    let attr = this.attribute;
    let _value;
    let service = value > 0 ? 'turn_on' : 'turn_off';
    let data = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      entity_id: this.stateObj.entity_id,
    }
    switch(attr) {
      case LightAttributes.BRIGHTNESS:
      case LightAttributes.BRIGHTNESS_PCT:
        value =
          attr === LightAttributes.BRIGHTNESS
            ? Math.round(value)
            : Math.round((value / 100.0) * 255);
        if (!value) {
          service = 'turn_off';
        } else {
          attr = 'brightness';
          data = {
            ...data,
            [attr]: value
          }
        }
        break;
      case LightAttributes.HUE:
      case LightAttributes.SATURATION:
        _value = this.stateObj.attributes.hs_color || [0, 0];
        _value[HS_INDEX[attr]] = value;
        value = _value;
        attr = 'hs_color';
        service = 'turn_on';
        data = {
          ...data,
          [attr]: value
        }
        break;
      case LightAttributes.COLOR_TEMP:
        attr = 'color_temp';
        service = 'turn_on';
        data = {
          ...data,
          [attr]: value
        }
        break;
    }

    this._hass.callService('light', service, {
      ...data
    });
  }

  get _min(): number {
    switch(this.attribute) {
      case LightAttributes.COLOR_TEMP:
        return this.stateObj ? this.stateObj.attributes?.min_mireds ? this.stateObj.attributes.min_mireds : 153 : 153;
      default:
        return 0;
    }
  }

  get _max(): number {
    switch(this.attribute) {
      case LightAttributes.COLOR_TEMP:
        return this.stateObj ? this.stateObj.attributes?.max_mireds ? this.stateObj.attributes.max_mireds : 500 : 500;
      case LightAttributes.BRIGHTNESS:
        return 255;
      case LightAttributes.HUE:
        return 360;
      case LightAttributes.ON_OFF:
        return 1;
      default:
        return 100;
    }
  }

  get isValuePercentage(): boolean {
    switch(this.attribute) {
      case LightAttributes.COLOR_TEMP:
      case LightAttributes.HUE:
      case LightAttributes.BRIGHTNESS:
        return false;
      default:
        return true;
    }
  }

  get isOff(): boolean {
    switch(this.attribute) {
      case LightAttributes.COLOR_TEMP:
      case LightAttributes.HUE:
      case LightAttributes.SATURATION:
      case LightAttributes.BRIGHTNESS:
      case LightAttributes.ON_OFF:
        return STATES_OFF.includes(this.state);
      default:
        return this.colorMode === LightColorModes.ON_OFF ? STATES_OFF.includes(this.state) : this.percentage === 0;
    }
  }

  get label(): string {
    if (this.isOff) {
      return this._hass.localize('component.light.state._.off');
    }
    if (this.colorMode === LightColorModes.ON_OFF) {
      return this._hass.localize('component.light.state._.on');
    }
    switch(this.attribute) {
      case LightAttributes.ON_OFF:
        return this._hass.localize('component.light.state._.on');
      case LightAttributes.COLOR_TEMP:
      case LightAttributes.BRIGHTNESS:
        return `${this.targetValue}`;
      case LightAttributes.BRIGHTNESS_PCT:
      case LightAttributes.SATURATION:
        return `${this.targetValue}%`;
      case LightAttributes.HUE:
        return `${this.targetValue}°`;
      default:
        return `${this.targetValue}`;
    }
  }

  get hasToggle(): boolean {
    let supported: string[] = [];
    if (Array.isArray(this.stateObj?.attributes?.supported_color_modes)) {
      supported = this.stateObj?.attributes?.supported_color_modes;
    }
    if (supported.length === 1 && supported[0] === LightAttributes.ON_OFF) {
      return true;
    }
    return this._config.slider?.toggle_on_click ?? false;
  }

  get hasSlider(): boolean {
    if (!this.stateObj) {
      return false;
    }
    switch(this.attribute) {
      case LightAttributes.ON_OFF:
        return false;
      case LightAttributes.BRIGHTNESS:
      case LightAttributes.BRIGHTNESS_PCT:
        if ('brightness' in this.stateObj.attributes) {
          return true;
        }
        return !!('supported_features' in this.stateObj.attributes &&
          this.stateObj?.attributes?.supported_features & 1);

      case LightAttributes.COLOR_TEMP:
        if ('color_temp' in this.stateObj.attributes) {
          return true;
        }
        return !!('supported_features' in this.stateObj.attributes &&
          this.stateObj.attributes.supported_features & 2);

      case LightAttributes.HUE:
      case LightAttributes.SATURATION:
        if ('hs_color' in this.stateObj.attributes) {
          return true;
        }
        return !!('supported_features' in this.stateObj.attributes &&
          this.stateObj.attributes.supported_features & 16);

      default:
        return false;
    }
  }

  get sliderColor(): string {
    let returnColor = 'inherit';
    if (this._config.slider?.use_state_color) {
      if (this.stateObj.attributes.hs_color && this.attribute !== LightAttributes.COLOR_TEMP) {
        const [hue, sat] = this.stateObj.attributes.hs_color;
        let useHue = hue;
        let useSat = sat;
        switch(this.attribute) {
          case LightAttributes.HUE:
            useHue = this.valueFromPercentage;
            break;
          case LightAttributes.SATURATION:
            useSat = this.percentage;
            break;
        }
        if (useSat > 10) {
          returnColor = `hsl(${useHue}, 100%, ${100 - useSat / 2}%)`;
          this._sliderPrevColor = returnColor;
        }
      } else if (
        this.attribute === LightAttributes.HUE || this.attribute === LightAttributes.SATURATION
      ) {
        let useHue = 0;
        let useSat = 20;
        switch(this.attribute) {
          case LightAttributes.HUE:
            useHue = this.valueFromPercentage;
            break;
          case LightAttributes.SATURATION:
            useSat = this.percentage;
            break;
        }
        if (useSat > 10) {
          returnColor = `hsl(${useHue}, 100%, ${100 - useSat / 2}%)`;
          this._sliderPrevColor = returnColor;
        }
      } else if (
        this.stateObj.attributes.color_temp &&
        this.stateObj.attributes.min_mireds &&
        this.stateObj.attributes.max_mireds
      ) {
        returnColor = getLightColorBasedOnTemperature(
          this.attribute === LightAttributes.COLOR_TEMP ? this.valueFromPercentage : this.stateObj.attributes.color_temp,
          this.stateObj.attributes.min_mireds,
          this.stateObj.attributes.max_mireds
        );
        this._sliderPrevColor = returnColor;
      } else if (this.attribute === LightAttributes.COLOR_TEMP) {
        returnColor = getLightColorBasedOnTemperature(
          this.valueFromPercentage,
          153,
          500
        );
        this._sliderPrevColor = returnColor;
      } else if (this._sliderPrevColor.startsWith('hsl') || this._sliderPrevColor.startsWith('rgb')) {
        returnColor = this._sliderPrevColor;
      }
    }
    return returnColor;
  }
}
