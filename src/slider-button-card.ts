/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionHandlerEvent, applyThemesOnElement, computeStateDomain, getLovelace, handleAction, hasConfigOrEntityChanged, HomeAssistant, LovelaceCard, LovelaceCardEditor, STATES_OFF } from 'custom-card-helpers';
import { css, CSSResult, customElement, html, LitElement, property, PropertyValues, query, state, TemplateResult } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { styleMap } from 'lit-html/directives/style-map';
import { actionHandler } from './action-handler-directive';
import { CARD_VERSION } from './const';
import { Controller } from './controllers/controller';
import { ControllerFactory } from './controllers/get-controller';
import './editor';
import { localize } from './localize/localize';

import type { SliderButtonCardConfig } from './types';
import { ActionButtonConfigDefault, ActionButtonMode, IconConfigDefault, SliderDirections } from './types';
import { getSliderDefaultForEntity } from './utils';

/* eslint no-console: 0 */
console.info(
  `%c  SLIDER-BUTTON-CARD %c ${localize('common.version')}${CARD_VERSION} %c`,
  'background-color: #555;color: #fff;padding: 3px 2px 3px 3px;border: 1px solid #555;border-radius: 3px 0 0 3px;font-family: Roboto,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)',
  'background-color: transparent;color: #555;padding: 3px 3px 3px 2px;border: 1px solid #555; border-radius: 0 3px 3px 0;font-family: Roboto,Verdana,Geneva,sans-serif',
  'background-color: transparent'

);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'slider-button-card',
  name: 'Slider button Card',
  description: 'A button card with slider',
  preview: true,
});

@customElement('slider-button-card')
export class SliderButtonCard extends LitElement implements LovelaceCard {
  @property({attribute: false}) public hass!: HomeAssistant;
  @state() private config!: SliderButtonCardConfig;
  @query('.state') stateText;
  @query('.button') button;
  @query('.action') action;
  @query('.range') range;
  private changing = false;
  private changed = false;
  private ctrl!: Controller;
  private actionTimeout;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('slider-button-card-editor');
  }

  public static getStubConfig(hass: HomeAssistant, entities: string[]): object {
    const entity = entities.find(item => item.startsWith('light')) || '';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dummy = hass;
    return {
      entity: entity,
      slider: getSliderDefaultForEntity(entity),
      // eslint-disable-next-line @typescript-eslint/camelcase
      show_name: true,
      // eslint-disable-next-line @typescript-eslint/camelcase
      show_state: true,
      icon: IconConfigDefault,
      // eslint-disable-next-line @typescript-eslint/camelcase
      action_button: ActionButtonConfigDefault,
    };
  }
  public getCardSize(): number {
    return 0;
  }

  public setConfig(config: SliderButtonCardConfig): void {
    if (!config) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (!config.entity) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      slider: getSliderDefaultForEntity(config.entity),
      icon: IconConfigDefault,
      // eslint-disable-next-line @typescript-eslint/camelcase
      show_name: true,
      // eslint-disable-next-line @typescript-eslint/camelcase
      show_state: true,
      // eslint-disable-next-line @typescript-eslint/camelcase
      action_button: ActionButtonConfigDefault,
      debug: false,
      ...config
    };
    this.ctrl = ControllerFactory.getInstance(this.config);
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }
    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    if (
      !oldHass ||
      oldHass.themes !== this.hass.themes ||
      oldHass.language !== this.hass.language
    ) {
      return true;
    }
    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected updated(changedProps: PropertyValues): void {
    this.updateValue(this.ctrl.value, false);
    this.animateActionEnd();
    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    const oldConfig = changedProps.get("_config") as
      | SliderButtonCardConfig
      | undefined;
    if (
      !oldHass ||
      !oldConfig ||
      oldHass.themes !== this.hass.themes ||
      oldConfig.theme !== this.config.theme
    ) {
      applyThemesOnElement(this, this.hass.themes, this.config.theme);
    }
    this.ctrl.log('UPDATED', this.ctrl.value);
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    setTimeout((): void => {
      this.handleResize();
    }, 1)
  }

  protected render(): TemplateResult | void {
    this.ctrl.hass = this.hass;
    if (!this.ctrl.stateObj) {
      return this._showError(localize('common.show_error'));
    }
    this.ctrl.log('RENDER', this.ctrl.value);
    return html`
      <ha-card
        tabindex="0"
        .label=${`SliderButton: ${this.config.entity || 'No Entity Defined'}`}
        class="${classMap({ 'square': this.config.slider?.force_square || false })}"
      >
        <div class="button ${classMap({ off: this.ctrl.isOff, unavailable: this.ctrl.isUnavailable })}"
             style=${styleMap({
               '--slider-value': `${this.ctrl.percentage}%`,
               '--slider-bg-filter': this.ctrl.style.slider.filter,
               '--slider-color': this.ctrl.style.slider.color,
               '--icon-filter': this.ctrl.style.icon.filter,
               '--icon-color': this.ctrl.style.icon.color,
             })}
             >
          <div class="range-holder"
               data-show-track="${this.config.slider?.show_track}"
               data-mode="${this.config.slider?.direction}"
               data-background="${this.config.slider?.background}"
          >
            <input
              type="range"
              .disabled=${this.ctrl.isUnavailable}
              @input=${(e): void => this.setTargetValue(parseInt(e.target.value))}
              @change=${(e): void => this.setStateValue(parseInt(e.target.value))}
              min="${this.ctrl.min}"
              max="${this.ctrl.max}"
              step="${this.ctrl.step}"
              class="range"
            >
          </div>
          ${this.renderText()}
          ${this.renderAction()}
          ${this.renderIcon()}
        </div>
      </ha-card>
    `;
  }

  private renderText(): TemplateResult {
    if (!this.config.show_name && !this.config.show_state) {
      return html``;
    }
    return html`
          <div class="text">
            ${this.config.show_name
              ? html`
                <div class="name">${this.ctrl.name}</div>
                `
                : ''}
            ${this.config.show_state
              ? html`
                <div class="state">
                  ${this.ctrl.isUnavailable
                  ? html`
                    ${this.hass.localize('state.default.unavailable')}
                    ` : html`
                    ${this.ctrl.label}
                  `}
                </div>
                `
                : ''}
          </div>
    `;
  }

  private renderIcon(): TemplateResult {
    /*style=${styleMap({
     color: this.ctrl.style.icon.color,
     })}*/
    if (this.config.icon?.show === false) {
      return html``;
    }
    return html`
      <div class="icon"
           @action=${ (e): void => this._handleAction(e, this.config.icon)}
           .actionHandler=${actionHandler({
             hasHold: false,
             hasDoubleClick: false,
           })}
           >
        <ha-icon
          tabindex="-1"
          data-domain=${ifDefined(
            this.config.icon?.use_state_color && this.ctrl.stateObj
              ? computeStateDomain(this.ctrl.stateObj)
              : undefined
          )}
          data-state=${ifDefined(
            this.ctrl.stateObj ? this.ctrl.state : undefined
          )}          
          .icon=${this.ctrl.icon}
        />
      </div>
    `;
  }

  private renderAction(): TemplateResult {
    if (this.config.action_button?.show === false) {
      return html``;
    }
    if (this.config.action_button?.mode === ActionButtonMode.TOGGLE) {
      return html`
        <div class="action">
          <ha-switch
            .disabled=${this.ctrl.isUnavailable}
            .checked=${!STATES_OFF.includes(this.ctrl.state)}
            @change=${this._toggle}
          ></ha-switch>
        </div>
      `;
    }
    return html`
      <div class="action"
           @action=${ (e): void => this._handleAction(e, this.config.action_button)}
           .actionHandler=${actionHandler({
             hasHold: false,
             hasDoubleClick: false,
           })}           
           >
        <ha-icon
          tabindex="-1"
          .icon=${this.config.action_button?.icon || 'mdi:power'}
        ></ha-icon>
        ${typeof this.config.action_button?.show_spinner === 'undefined' || this.config.action_button?.show_spinner 
          ? html`
            <svg class="circular-loader" viewBox="25 25 50 50">
              <circle class="loader-path" cx="50" cy="50" r="20"></circle>
            </svg>
                `
          : ''}
      </div>
    `;
  }

  private setTargetValue(value: number): void {
    this.updateValue(value);
  }

  private _handleAction(ev: ActionHandlerEvent, config): void {
    if (this.hass && this.config && ev.detail.action) {
      if (config.tap_action?.action === 'toggle') {
        this.animateActionStart();
      }
      handleAction(this, this.hass, {...config, entity: this.config.entity}, ev.detail.action);
    }
  }

  private _toggle(): void {
    if (this.hass && this.config) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      handleAction(this, this.hass, {tap_action: {action: 'toggle'}, entity: this.config.entity}, 'tap');
    }
  }

  private setStateValue(value: number): void {
    this.updateValue(value, false);
    this.ctrl.value = value;
    this.ctrl.log('setStateValue', value);
    this.animateActionStart();
  }

  private animateActionStart(): void {
    this.animateActionEnd();
    if (this.action) {
      this.action.classList.add('loading');
    }
  }

  private animateActionEnd(): void {
    if (this.action) {
      clearTimeout(this.actionTimeout);
      this.actionTimeout = setTimeout(()=> {
        this.action.classList.remove('loading');
      }, 750)

    }
  }

  private updateValue(value: number, changing = true): void {
    this.changing = changing;
    this.changed = !changing;
    this.ctrl.targetValue = value;
    if (!this.button) {
      return
    }
    this.button.classList.remove('off');
    if (changing) {
      this.button.classList.add('changing');
    } else {
      this.button.classList.remove('changing');
      if (this.ctrl.isOff) {
        this.button.classList.add('off');
      }
    }
    if (this.stateText) {
      this.stateText.innerHTML = this.ctrl.isUnavailable ? `${this.hass.localize('state.default.unavailable')}` : this.ctrl.label;
    }
    this.range.value = value.toString();
    this.button.style.setProperty('--slider-value', `${this.ctrl.percentage}%`);
    this.button.style.setProperty('--slider-bg-filter', this.ctrl.style.slider.filter);
    this.button.style.setProperty('--icon-filter', this.ctrl.style.icon.filter);
    this.button.style.setProperty('--icon-color', this.ctrl.style.icon.color);
    if (this.config.icon?.rotate) {
      this.button.style.setProperty('--icon-rotate-speed', this.ctrl.style.icon.rotateSpeed || '0s');
    }
  }

  private _showError(error: string): TemplateResult {
    const errorCard = document.createElement('hui-error-card');
    errorCard.setConfig({
      type: 'error',
      error,
      origConfig: this.config
    });

    return html`
      ${errorCard}
    `;
  }

  private getColorFromVariable(color: string): string {
    if (typeof color !== 'undefined' && color.substring(0, 3) === 'var') {
      let varColor = window.getComputedStyle(this).getPropertyValue(color.substring(4).slice(0, -1)).trim();
      if (!varColor.length) {
        varColor = window.getComputedStyle(document.documentElement).getPropertyValue(color.substring(4).slice(0, -1)).trim();
      }
      return varColor
    }
    return color;
  }

  private handleResize = (): void => {
    if (this.config.slider?.direction === SliderDirections.LEFT_RIGHT || !this.button) {
      return
    }
    const {width, height} = this.button.getBoundingClientRect();
    const half = (width - height) / 2;
    this.range.style.setProperty('width', `${height}px`);
    this.range.style.setProperty('height', `${width}px`);
    this.range.style.setProperty('top', `${half * -1}px`);
    this.range.style.setProperty('left', `${half}px`);
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('resize', this.handleResize);
  }

  disconnectedCallback(): void {
    window.removeEventListener('resize', this.handleResize);
    super.disconnectedCallback();
  }

  static get styles(): CSSResult {
    return css`
    ha-card {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      min-height: 7rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;      
      --mdc-icon-size: 2.2em;
    }
    ha-card.square {
      aspect-ratio: 1 / 1;
    }
    :host {
      --slider-bg-default-color: var(--primary-color, rgb(95, 124, 171));
      --slider-bg: var(--slider-color);
      --slider-bg-filter: brightness(100%);
      --slider-track-color: #2b374e; 
      --slider-tracker-color: transparent;
      --slider-value: 0%;
      --slider-transition-duration: 0.2s;
      /*--label-text-shadow: rgb(255 255 255 / 10%) -1px -1px 1px, rgb(0 0 0 / 50%) 1px 1px 1px;*/
      /*--label-color-on: #fff;*/
      /*--label-color-off: #626569;*/
      --icon-filter: brightness(100%);
      --icon-color: var(--paper-item-icon-color);
      --icon-rotate-speed: 0s;
      /*--state-color-on: #BAC0C6; */
      /*--state-color-off: var(--disabled-text-color);*/
      /*--state-text-shadow: rgb(255 255 255 / 10%) -1px -1px 1px, rgb(0 0 0 / 50%) 1px 1px 1px;*/
      --btn-bg-color-off: rgba(43,55,78,1);
      --btn-bg-color-on: #20293c;
      /*--action-icon-color-on: auto;*/
      /*--action-icon-color-off: auto;*/      
      /*--action-spinner-color: #fff;*/
    }
    .button {
      position: relative;
      padding: 0.8rem;
      box-sizing: border-box;
      height: 100%;
      min-height: 7rem;
      width: 100%;
      display: block;
      overflow: hidden;           
      transition: all 0.2s ease-in-out;
    }
    .button.off {
      background-color: var(--btn-bg-color-off);
    }
    .icon {
      position: relative;
      cursor: pointer;
      width: var(--mdc-icon-size, 24px);
      height: var(--mdc-icon-size, 24px);
      box-sizing: border-box;
      padding: 0;
      outline: none;
      animation: var(--icon-rotate-speed, 0s) linear 0s infinite normal both running rotate;
      -webkit-tap-highlight-color: transparent;
    }
    .icon ha-icon {
      filter: var(--icon-filter, brightness(100%));
      color: var(--icon-color);
      transition: color 0.4s ease-in-out 0s, filter 0.2s linear 0s;
    }
    .text {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0.8rem;
      pointer-events: none;
      user-select: none;
      font-size: 1.1rem;
      line-height: 1.3rem;
      max-width: calc(100% - 2em);
      /*text-shadow: rgb(255 255 255 / 10%) -1px -1px 1px, rgb(0 0 0 / 50%) 1px 1px 1px;*/
    }
    .name {
      color: var(--label-color-on, var(--primary-text-color, white));      
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      text-shadow: var(--label-text-shadow, none);
    }
    .off .name {
      color: var(--label-color-off, var(--primary-text-color, white));
    }
    .state {      
      color: var(--state-color-on, var(--label-badge-text-color, white));      
      text-overflow: ellipsis;
      white-space: nowrap;
      text-shadow: var(--state-text-shadow);
      transition: font-size 0.1s ease-in-out;
    }
    .changing .state {
      font-size: 150%;
    }
    .off .state {
      color: var(--state-color-off, var(--disabled-text-color));
    }
    .range-holder {
      position: absolute;      
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
    }
    .range-holder .range {
      position: absolute;
      left: 0;
      right: 0;
      width: 100% ;
      height: 100% ;
      outline: 0;
      margin: 0;
      border: 0;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
      overflow: hidden;
      -webkit-appearance: none;
      background-color: var( --ha-card-background, var(--card-background-color, var(--btn-bg-color-on, black)) );
      opacity: 1;
      /*transition: all 0.1s ease-in;*/
      pointer-events: none;
      
    }
    .off .range-holder .range {
      background-color: var( --ha-card-background, var(--card-background-color, var(--btn-bg-color-off, black)) );
    }
   
    .range-holder[data-mode="left-right"] .range {
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      height: 100% !important;      
    }
    
    .range-holder[data-mode="bottom-top"] .range {
      -webkit-transform: rotate(270deg);
      -moz-transform: rotate(270deg);
      -o-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      transform: rotate(270deg);
      cursor: ns-resize;
     
    }
    .range-holder[data-mode="top-bottom"] .range {
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
      cursor: ns-resize;
     
    }
    
    /*.range-holder .range::-moz-range-track,*/
    .range-holder .range::-webkit-slider-runnable-track {
      height: 100%;
      -webkit-appearance: none;
      color: var(--slider-track-color);
      margin-top: 0px;      
    }
    
    /*.range-holder .range::-moz-range-thumb,*/
    .range-holder .range::-webkit-slider-thumb {
      pointer-events: auto;
      position: relative;
      top: 0;
      left: 0px;
      cursor: ew-resize;
      width: 15%;
      height: 100%;
      transform: scaleX(20);
      background: var(--slider-tracker-color);
      -webkit-appearance: none;
    }
    
    /*.range-holder[data-mode="bottom-top"] .range::-moz-range-thumb,
    .range-holder[data-mode="top-bottom"] .range::-moz-range-thumb,*/
    .range-holder[data-mode="bottom-top"] .range::-webkit-slider-thumb,
    .range-holder[data-mode="top-bottom"] .range::-webkit-slider-thumb {
      cursor: ns-resize;
    }
    
    .unavailable .action,
    .unavailable .action ha-switch,
    /*.unavailable .range-holder .range::-moz-range-thumb,*/
    .unavailable .range-holder .range::-webkit-slider-thumb {
      cursor: not-allowed !important;
    }
    
    @media (pointer: coarse)  {
      .range-holder .range::-webkit-slider-thumb {
        transform: scaleX(2.5);        
      } 
    }
    /*.range-holder:active .range::-moz-range-thumb,*/
    .range-holder:active .range::-webkit-slider-thumb {
      cursor: grabbing;
    }
    .range-holder .range:before {
      content: " ";
      height: 100%;
      width: 100%;      
      background: var(--slider-bg);
      background-size: var(--slider-bg-size, 100% 100%);
      background-color: var(--slider-bg-color, transparent);
      background-position: var(--slider-bg-position, 0 0);
      filter: var(--slider-bg-filter, brightness(100%));
      display: inline-block;      
      box-sizing: border-box;
      /*border-right: 1px solid var(--ha-card-background, var(--card-background-color, var(--btn-bg-color-on, black)));      
      border-top-right-radius: var(--ha-card-border-radius, 4px);
      border-bottom-right-radius: var(--ha-card-border-radius, 4px);*/
    }

    .range-holder[data-background="solid"] .range:before {            
      --slider-bg-color: var(--slider-color);
    }
    .range-holder[data-background="triangle"] .range:before {      
      --slider-bg: linear-gradient(to bottom right, transparent 0%, transparent 50%, var(--slider-color) 50%, var(--slider-color) 100%);
      border-right: 0px solid;
    }
    .range-holder[data-background="custom"] .range:before {    
      --slider-bg: repeating-linear-gradient(-45deg, var(--slider-color) 0, var(--slider-color) 1px, var(--slider-color) 0, transparent 10%);
      --slider-bg-size: 30px 30px;
      /*--slider-bg: radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 0    150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 50%  100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent), radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent), radial-gradient(circle at 0    50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent);
      --slider-bg-size: 100px 50px;*/
    }
    .range-holder[data-background="gradient"] .range:before {
      --slider-bg: linear-gradient(to right, rgba(255, 0, 0, 0) -10%, var(--slider-color) 100%);
    }
    .range-holder[data-background="striped"] .range:before {
      --slider-bg: linear-gradient(to bottom, var(--slider-color), var(--slider-color) 50%, transparent 50%, transparent);
      --slider-bg-size: 100% 4px;
    }
    .range-holder[data-background="striped"][data-mode="top-bottom"] .range:before,
    .range-holder[data-background="striped"][data-mode="bottom-top"] .range:before {
      --slider-bg: linear-gradient(to left, var(--slider-color), var(--slider-color) 50%, transparent 50%, transparent);
      --slider-bg-size: 4px 100%;
    }
    
    .range-holder .range:after {
      content: " ";
      height: 100%;
      width: 100%;
      position: absolute;
      transform: translateX(var(--slider-value));
      background: var( --ha-card-background, var(--card-background-color, var(--btn-bg-color-on, black)) );
      opacity: 1;
      display: inline-block;
      transition: transform var(--slider-transition-duration) ease-in;
    }
    
    .range-holder[data-show-track="true"] .range:after {
      opacity: 0.9;
    }

    .off .range-holder[data-show-track="true"] .range:after {
      opacity: 1;
    }

    .changing .range-holder .range:after,
    .changing .range-holder .range:before {
      transition: none;
    }
    
    .action {
      position: relative;
      float: right;
      width: var(--mdc-icon-size, 24px);
      height: var(--mdc-icon-size, 24px);
      color: var(--action-icon-color-on, var(--paper-item-icon-color, black));
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    
    .action ha-switch {
      position: absolute;
      right: 0;
      top: 5px;
    }
    
    .off .action {
      color: var(--action-icon-color-off, var(--paper-item-icon-color, black));
    }

    .action.loading .circular-loader {
      opacity: 1;      
    }
    
    .circular-loader {
      position: absolute;
      left: -8px;
      top: -8px;
      width: calc(var(--mdc-icon-size, 24px) + 16px);
      height: calc(var(--mdc-icon-size, 24px) + 16px);
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
      animation: rotate 2s linear infinite; 
    }
   
    .loader-path {
      fill: none;
      stroke-width: 2px;
      stroke: var(--action-spinner-color, var(--label-badge-text-color, white));
      animation: animate-stroke 1.5s ease-in-out infinite both;        
      stroke-linecap: round;
    }
    
    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    
    @keyframes animate-stroke {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124;
      }
    }     
    `;
  }
}
