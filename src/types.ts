/* eslint-disable @typescript-eslint/camelcase */
import { ActionConfig, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'slider-button-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

export interface SliderButtonCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
  name?: string;
  show_name?: boolean;
  show_state?: boolean;
  icon?: IconConfig;
  action_button?: ActionButtonConfig;
  slider?: SliderConfig;
  theme?: string;
  show_warning?: boolean;
  show_error?: boolean;
  test_gui?: boolean;
  debug?: boolean;
}

export interface ActionButtonConfig {
  mode?: ActionButtonMode;
  icon?: string;
  show?: boolean;
  show_spinner?: boolean;
  tap_action?: ActionConfig;
}

export interface IconConfig {
  icon?: string;
  show?: boolean;
  tap_action?: ActionConfig;
  use_state_color?: boolean;
  rotate?: boolean;
}

export interface SliderConfig {
  min?: number;
  max?: number;
  step?: number;
  percentage?: boolean;
  attribute?: string;
  direction?: SliderDirections;
  background: SliderBackground;
  use_percentage_bg_opacity?: boolean;
  use_state_color?: boolean;
  show_track?: boolean;
  force_square: boolean;
}

export enum ActionButtonMode {
  TOGGLE = 'toggle',
  CUSTOM = 'custom',
}

export enum SliderDirections {
  LEFT_RIGHT = 'left-right',
  TOP_BOTTOM = 'top-bottom',
  BOTTOM_TOP = 'bottom-top',
}

export enum SliderBackground {
  SOLID = 'solid',
  GRADIENT = 'gradient',
  TRIANGLE = 'triangle',
  STRIPED = 'striped',
  CUSTOM = 'custom',
}

export enum Domain {
  LIGHT = 'light',
  SWITCH = 'switch',
  FAN = 'fan',
  COVER = 'cover',
}

export const ActionButtonConfigDefault: ActionButtonConfig = {
  mode: ActionButtonMode.TOGGLE,
  icon: 'mdi:power',
  show: true,
  show_spinner: true,
  tap_action: {
    action: 'toggle'
  },
};

export const IconConfigDefault: IconConfig = {
  show: true,
  use_state_color: true,
  rotate: false,
  tap_action: {
    action: 'more-info'
  },
};

export const SliderConfigDefault: SliderConfig = {
  percentage: true,
  direction: SliderDirections.LEFT_RIGHT,
  background: SliderBackground.SOLID,
  use_percentage_bg_opacity: false,
  use_state_color: false,
  show_track: false,
  force_square: false,
};

export const SliderConfigDefaultDomain: Map<string, SliderConfig> = new Map([
  [Domain.LIGHT, {
    percentage: true,
    direction: SliderDirections.LEFT_RIGHT,
    background: SliderBackground.GRADIENT,
    use_state_color: false,
    use_percentage_bg_opacity: false,
    show_track: false,
    force_square: false,
  }],
  [Domain.FAN, {
    percentage: true,
    direction: SliderDirections.LEFT_RIGHT,
    background: SliderBackground.SOLID,
    use_state_color: false,
    use_percentage_bg_opacity: false,
    show_track: false,
    force_square: false,
  }],
  [Domain.SWITCH, {
    percentage: true,
    direction: SliderDirections.LEFT_RIGHT,
    background: SliderBackground.SOLID,
    use_state_color: false,
    use_percentage_bg_opacity: false,
    show_track: false,
    force_square: false,
  }],
  [Domain.COVER, {
    percentage: true,
    direction: SliderDirections.TOP_BOTTOM,
    background: SliderBackground.STRIPED,
    use_state_color: false,
    use_percentage_bg_opacity: false,
    show_track: false,
    force_square: false,
  }],
])
