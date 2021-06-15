import { computeStateDomain, domainIcon, HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { SliderBackground, SliderButtonCardConfig } from '../types';
import { getLightColorBasedOnTemperature } from '../utils';

export interface Style {
  icon: ObjectStyle;
  slider: ObjectStyle;
}

export interface ObjectStyle {
  filter: string;
  color: string;
  rotateSpeed?: string;
}

export abstract class Controller {
  _config: SliderButtonCardConfig;
  _hass: any;
  _sliderPrevColor = '';

  abstract _value?: number;
  abstract _targetValue?: number;
  abstract _min?: number;
  abstract _max?: number;
  abstract _step?: number;

  protected constructor(config: SliderButtonCardConfig) {
    this._config = config;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
  }

  get stateObj(): any {
    return this._hass.states[this._config.entity] as HassEntity;
  }

  get domain(): string {
    return computeStateDomain(this.stateObj);
  }

  get name(): string {
    return this._config.name ? this._config.name : this.stateObj?.attributes?.friendly_name ? this.stateObj.attributes.friendly_name : '';
  }

  get icon(): string {
    if (typeof this._config.icon?.icon === 'string' && this._config.icon?.icon.length) {
      return this._config.icon.icon;
    }
    return this.stateObj.attributes?.icon ? this.stateObj.attributes.icon : domainIcon(this.domain, this.stateObj.state);
  }

  get value(): number {
    if (this._value) {
      return Math.round(this._value / this.step) * this.step;
    }
    return 0;
  }

  set value(value: number) {
    if (value !== this.value) {
      this._value = value;
    }
  }

  get targetValue(): number {
    if (this._targetValue === 0) {
      return 0;
    }
    if (this._targetValue) {
      return Math.round(this._targetValue / this.step) * this.step;
    }
    if (this.value) {
      return this.value;
    }
    return 0;
  }

  set targetValue(value: number) {
    if (value !== this.targetValue) {
      this._targetValue = value;
    }
  }

  get label(): string {
    return `${this.targetValue}`;
  }

  get hidden(): boolean {
    return false;
  }

  get hasSlider(): boolean {
    return true;
  }

  get hasToggle(): boolean {
    return this._config.slider?.toggle_on_click ?? false;
  }

  get toggleValue(): number {
    return this.value === this.min ? this.max : this.min;
  }

  get state(): string {
    return this.stateObj.state;
  }

  get isOff(): boolean {
    return this.percentage === 0;
  }

  get isUnavailable(): boolean {
    return this.state ? this.state === 'unavailable' : true;
  }

  get isSliderDisabled(): boolean {
    return this.isUnavailable ? this.isUnavailable : this.hasToggle;
  }

  get min(): number {
    return this._config.slider?.min ?? this._min ?? 0;
  }

  get max(): number {
    return this._config.slider?.max ?? this._max ?? 100;
  }

  get step(): number {
    return this._config.slider?.step ?? this._step ?? 5;
  }

  get percentage(): number {
    return Math.round(
      ((this.targetValue - this.min) * 100) / (this.max - this.min)
    );
  }

  get style(): Style {
    return {
      icon: {
        filter: this.iconFilter,
        color: this.iconColor,
        rotateSpeed: this.iconRotateSpeed,
      },
      slider: {
        filter: this.sliderFilter,
        color: this.sliderColor,
      },
    };
  }

  get iconFilter(): string {
    if (!this._config.icon?.use_state_color || this.percentage === 0) {
      return 'brightness(100%)';
    }
    return `brightness(${(this.percentage + 100) / 2}%)`;
  }

  get iconColor(): string {
    if (this._config.icon?.use_state_color) {
      if (this.stateObj.attributes.hs_color) {
        const [hue, sat] = this.stateObj.attributes.hs_color;
        if (sat > 10) {
          return `hsl(${hue}, 100%, ${100 - sat / 2}%)`;
        }
      } else if (this.percentage > 0) {
        return 'var(--paper-item-icon-active-color, #fdd835)'
      } else {
        return 'var(--paper-item-icon-color, #44739e)'
      }
    }
    return '';
  }

  get iconRotateSpeed(): string {
    return '0s';
  }

  get sliderFilter(): string {
    if (!this._config.slider?.use_percentage_bg_opacity || this.percentage === 0 || this._config.slider.background === SliderBackground.GRADIENT) {
      return 'brightness(100%)';
    }
    return `brightness(${(this.percentage + 100) / 2}%)`;
  }

  get sliderColor(): string {
    if (this._config.slider?.use_state_color) {
      if (this.stateObj.attributes.hs_color) {
        const [hue, sat] = this.stateObj.attributes.hs_color;
        if (sat > 10) {
          const color = `hsl(${hue}, 100%, ${100 - sat / 2}%)`;
          this._sliderPrevColor = color;
          return color;
        }
      } else  if (
        this.stateObj.attributes.color_temp &&
        this.stateObj.attributes.min_mireds &&
        this.stateObj.attributes.max_mireds
      ) {
        const color = getLightColorBasedOnTemperature(
          this.stateObj.attributes.color_temp,
          this.stateObj.attributes.min_mireds,
          this.stateObj.attributes.max_mireds,
        );
        this._sliderPrevColor = color;
        return color;
      } else if (this._sliderPrevColor.startsWith('hsl') || this._sliderPrevColor.startsWith('rgb')) {
        return this._sliderPrevColor;
      }
    }
    return 'inherit';
  }

  log(name = '', value: string | number | object = ''): void {
    if (this._config.debug) {
      console.log(`${this._config.entity}: ${name}`, value)
    }
  }
}
