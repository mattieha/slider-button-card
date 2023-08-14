/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import copy from 'fast-copy';
import {
  CSSResult,
  LitElement,
  TemplateResult,
  css,
  html
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { formfieldDefinition } from '../elements/formfield';
import { selectDefinition } from '../elements/select';
import { switchDefinition } from '../elements/switch';
import { textfieldDefinition } from '../elements/textfield';

import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { HomeAssistant, LovelaceCardEditor, computeDomain, fireEvent, stateIcon } from 'custom-card-helpers';
import { localize } from './localize/localize';
import { ActionButtonConfig, ActionButtonConfigDefault, ActionButtonMode, Domain, IconConfig, IconConfigDefault, SliderBackground, SliderButtonCardConfig, SliderConfig, SliderConfigDefault, SliderDirections } from './types';
import { applyPatch, getEnumValues, getSliderDefaultForEntity } from './utils';

@customElement('slider-button-card-editor')
export class SliderButtonCardEditor extends ScopedRegistryHost(LitElement) implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  
  @state() private _config?: SliderButtonCardConfig;
  @state() private _helpers?: any;

  private _initialized = false;
  private directions = getEnumValues(SliderDirections);
  private backgrounds = getEnumValues(SliderBackground);
  private actionModes = getEnumValues(ActionButtonMode);
  private actions = [
    "more-info",
    "toggle",
    "navigate",
    "url",
    "call-service",
    "none",
  ];

  static elementDefinitions = {
    ...formfieldDefinition,
    ...selectDefinition,
    ...switchDefinition,
    ...textfieldDefinition,
  }

  public async setConfig(config: SliderButtonCardConfig): Promise<void> {
    this._config = config;
    if (this._helpers === undefined) {
      await this.loadCardHelpers();
      this._helpers.load
    }
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  get _name(): string {
    return this._config?.name || '';
  }

  get _show_name(): boolean {
    return typeof this._config?.show_name === 'undefined' ? true : this._config?.show_name;
  }

  get _show_state(): boolean {
    return typeof this._config?.show_state === 'undefined' ? true : this._config?.show_state;
  }

  get _show_attribute(): boolean {
    return typeof this._config?.show_attribute === 'undefined' ? true : this._config?.show_attribute;
  }

  get _compact(): boolean {
    return typeof this._config?.compact !== 'boolean' ? false : this._config?.compact;
  }

  get _entity(): string {
    return this._config?.entity || '';
  }

  get _attribute(): string {
    return this._config?.attribute || '';
  }

  get _icon(): IconConfig {
    return this._config?.icon || IconConfigDefault;
  }

  get _slider(): SliderConfig {
    return this._config?.slider || SliderConfigDefault;
  }

  get _action_button(): ActionButtonConfig {
    return this._config?.action_button || ActionButtonConfigDefault;
  }

  get entityList(){
    if (!this.hass) {
      return [];
    }
    return Object.keys(this.hass.states).filter(eid => getEnumValues(Domain).includes(eid.substr(0, eid.indexOf('.')))).sort();
  }

  get entityAttributes() {
    if (!this.hass || !this._entity) {
      return [];
    }
    return Object.keys(this.hass.states[this._entity].attributes).sort();
  }

  protected render(): TemplateResult | void {
    if (!this.hass || !this._helpers) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="tabs">
          <div class="tab">
            <input type="checkbox" id="entity" class="tab-checkbox">
            <label class="tab-label" for="entity">${localize('tabs.general.title')}</label>
            <div class="tab-content">
              <mwc-select
                label="${localize('tabs.general.entity')}"
                @selected=${this._valueChangedEntity} 
                @closed="${e => e.stopPropagation()}" 
                .configValue=${'entity'}
              >
                ${this.entityList.map(entity => html`<mwc-list-item value="${entity}" ?selected=${entity === this._entity}>${entity}</mwc-list-item>`)}
              </mwc-select>
              <mwc-textfield
                label="${localize('tabs.general.name')}"
                .value=${this._name}
                .placeholder=${this._name || this.hass.states[this._entity]?.attributes?.friendly_name}
                .configValue=${'name'}
                @input=${this._valueChanged}
              ></mwc-textfield>
              <mwc-select
                label="${localize('tabs.general.attribute')}"
                @selected=${this._valueChangedSelect} 
                @closed="${e => e.stopPropagation()}" 
                .configValue=${'attribute'}
              >
                ${this.entityAttributes.map(attribute => html`<mwc-list-item value="${attribute}" ?selected=${attribute === this._attribute}>${attribute}</mwc-list-item>`)}
              </mwc-select>
              <div class="side-by-side">
                <mwc-formfield .label=${localize('tabs.general.show_name')}>
                  <mwc-switch
                    .checked=${this._show_name}
                    .configValue=${'show_name'}
                    @change=${this._valueChanged}
                  ></mwc-switch>
                </mwc-formfield>
                <mwc-formfield .label=${localize('tabs.general.show_state')}>
                  <mwc-switch
                    .checked=${this._show_state}
                    .configValue=${'show_state'}
                    @change=${this._valueChanged}
                  ></mwc-switch>
                </mwc-formfield>
                <mwc-formfield .label=${localize('tabs.general.show_attribute')}>
                  <mwc-switch
                    .checked=${this._show_attribute}
                    .configValue=${'show_attribute'}
                    @change=${this._valueChanged}
                  ></mwc-switch>
                </mwc-formfield>
                <mwc-formfield .label=${localize('tabs.general.compact')}>
                  <mwc-switch
                    .checked=${this._compact}
                    .configValue=${'compact'}
                    @change=${this._valueChanged}
                  ></mwc-switch>
                </mwc-formfield>
              </div>
            </div>
          </div>

          <div class="tab">
            <input type="checkbox" id="icon" class="tab-checkbox">
            <label class="tab-label" for="icon">${localize('tabs.icon.title')}</label>
            <div class="tab-content">
              <mwc-textfield
              label="${localize('tabs.icon.icon')}"
              .value=${this._icon.icon}
              .placeholder=${this._icon.icon || stateIcon(this.hass.states[this._entity])}
              .configValue=${'icon.icon'}
              @input=${this._valueChanged}
              >
              </mwc-textfield>
              <div class="side-by-side">
                <mwc-formfield label="${localize('tabs.icon.show_icon')}">
                  <mwc-switch
                    .checked=${this._icon.show}
                    .configValue=${'icon.show'}
                    @change=${this._valueChanged}
                  ></mwc-switch>
                </mwc-formfield>
                ${this.renderStateColor('icon')}
              </div>
              ${
              //   <mwc-select
              //   label="${localize('tabs.icon.tap_action')}"
              //   .config=${this._icon.tap_action}
              //   .configValue=${"icon.tap_action"}
              //   @selected=${this._valueChangedSelect} 
              //   @closed="${e => e.stopPropagation()}" 
              // >
              //   ${this.actions.map(action => html`<mwc-list-item value="${action}" ?selected=${action === this._icon.tap_action?.action}>${action}</mwc-list-item>`)}
              // </mwc-select> 
              ''
              }
            </div>
          </div>
          
          <div class="tab">
            <input type="checkbox" id="slider" class="tab-checkbox">
            <label class="tab-label" for="slider">${localize('tabs.slider.title')}</label>
            <div class="tab-content">
              <div class="side-by-side">
                <paper-dropdown-menu
                  label="${localize('tabs.slider.direction')}"
                >
                  <paper-listbox 
                    slot="dropdown-content" 
                    attr-for-selected="item-value"
                    .configValue=${'slider.direction'}
                    @selected-item-changed=${this._valueChangedSelect}
                    .selected=${this._slider.direction}
                  >
                    ${this.directions.map(direction => {
                      return html`
                        <paper-item .itemValue=${direction}>${localize(`direction.${direction}`)}</paper-item>
                      `;
                      })}
                  </paper-listbox>
                </paper-dropdown-menu>
                <paper-dropdown-menu
                  label="${localize('tabs.slider.background')}"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    attr-for-selected="item-value"
                    .configValue=${'slider.background'}
                    @selected-item-changed=${this._valueChangedSelect}
                    .selected=${this._slider.background}
                  >
                    ${this.backgrounds.map(background => {
                      return html`
                        <paper-item .itemValue=${background}>${localize(`background.${background}`)}</paper-item>
                      `;
                    })}
                  </paper-listbox>
                </paper-dropdown-menu>

              </div>
              <div class="side-by-side">
                ${this.renderBrightness('slider')}
                ${this.renderStateColor('slider')}
                <mwc-formfield .label=${localize('tabs.slider.show_track')}>
                  <mwc-switch
                    .checked=${this._slider.show_track}
                    .configValue=${'slider.show_track'}
                    @change=${this._valueChanged}
                  ></mwc-switch>
                </mwc-formfield>
                <mwc-formfield .label=${localize('tabs.slider.toggle_on_click')}>
                  <mwc-switch
                    .checked=${this._slider.toggle_on_click}
                    .configValue=${'slider.toggle_on_click'}
                    @change=${this._valueChanged}
                  ></mwc-switch>
                </mwc-formfield>
                <mwc-formfield .label=${localize('tabs.slider.force_square')}>
                  <mwc-switch
                    .checked=${this._slider.force_square}
                    .configValue=${'slider.force_square'}
                    @change=${this._valueChanged}
                  ></mwc-switch>
                </mwc-formfield>
              </div>
            </div>
          </div>
          
          <div class="tab">
            <input type="checkbox" id="action" class="tab-checkbox">
            <label class="tab-label" for="action">${localize('tabs.action_button.title')}</label>
            <div class="tab-content">
              <paper-dropdown-menu
                label="${localize('tabs.action_button.mode')}"
              >
                <paper-listbox
                  slot="dropdown-content"
                  attr-for-selected="item-value"
                  .configValue=${'action_button.mode'}
                  @selected-item-changed=${this._valueChangedSelect}
                  .selected=${this._action_button.mode}
                >
                  ${this.actionModes.map(mode => {
                    return html`
                        <paper-item .itemValue=${mode}>${localize(`mode.${mode}`)}</paper-item>
                      `;
                  })}
                </paper-listbox>
              </paper-dropdown-menu>              
              ${this._action_button.mode === ActionButtonMode.CUSTOM 
              ? html`
                  <mwc-textfield
                    label="${localize('tabs.action_button.icon')}"
                    .value=${this._action_button.icon}
                    .placeholder=${this._action_button.icon || 'mdi:power'}
                    .configValue=${'action_button.icon'}
                    @value-changed=${this._valueChanged}
                  >
                  </mwc-textfield>
                ` 
                : 
                ''}
              <div class="side-by-side">
                <mwc-formfield .label=${localize('tabs.action_button.show_button')}>
                  <mwc-switch
                    .checked=${this._action_button.show}
                    .configValue=${'action_button.show'}
                    @change=${this._valueChanged}
                  ></mwc-switch>
                </mwc-formfield>
                ${this._action_button.mode === ActionButtonMode.CUSTOM
                  ? html`
                    <mwc-formfield .label=${localize('tabs.action_button.show_spinner')}>
                      <mwc-switch
                        .checked=${this._action_button.show_spinner}
                        .configValue=${'action_button.show_spinner'}
                        @change=${this._valueChanged}
                      ></mwc-switch>
                    </mwc-formfield>
                `
                  :
                  ''}
              </div>
              ${this._action_button.mode === ActionButtonMode.CUSTOM
                ? html`
                  <mwc-select
                    label="${localize('tabs.action_button.tap_action')}"
                    .hass=${this.hass}
                    .config=${this._action_button.tap_action}
                    .actions=${this.actions}
                    .configValue=${"action_button.tap_action"}
                    @value-changed=${this._valueChanged}
                  ></mwc-select>
                `
                :
                ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  protected renderBrightness(path: string): TemplateResult | void {
    const item = this[`_${path}`];
    return html`
      <mwc-formfield .label=${localize('tabs.slider.use_brightness')}>
        <mwc-switch
          .checked=${item.use_percentage_bg_opacity}
          .configValue="${path}.use_percentage_bg_opacity"
          @change=${this._valueChanged}
        ></mwc-switch>
      </mwc-formfield>
    `;
  }

  protected renderStateColor(path: string): TemplateResult | void {
    const item = this[`_${path}`];
    return html`
      <mwc-formfield .label=${localize('tabs.icon.use_state_color')}>
        <mwc-switch
          .checked=${item.use_state_color}
          .configValue="${path}.use_state_color"
          @change=${this._valueChanged}
        ></mwc-switch>
      </mwc-formfield>
    `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _valueChangedSelect(ev): void {
    const target = ev.target;
    const value = target.value;
    if (!value) {
      return;
    }
    this._changeValue(target.configValue, value);
  }

  private _valueChangedEntity(ev): void {
    const target = ev.target;
    const value = ev.target?.value;
    if (!value) {
      return;
    }
    const updateDefaults = computeDomain(value) !== computeDomain(this._config?.entity || 'light.dummy');
    this._changeValue(target.configValue, value);
    this._changeValue('name', '');
    this._changeValue('attribute', '');
    this._changeValue('icon.icon', '');
    if (updateDefaults) {
      const cfg = copy(this._config);
      applyPatch(cfg, ['slider'], getSliderDefaultForEntity(value));
      this._config = cfg;
      fireEvent(this, 'config-changed', { config: this._config });
    }
  }

  private _valueChanged(ev): void {
    const target = ev.target;
    const value = ev.target?.value;
    this._changeValue(target.configValue, target.checked !== undefined ? target.checked : value);
  }

  private _changeValue(configValue: string, value: string | boolean | number): void {
    console.log("INFO DUMP");
    console.log('configValue: ' + configValue);
    console.log('value: ' + value);
    console.log('this[`_${configValue}`]: ' + this[`_${configValue}`]);
    if (!this._config || !this.hass) {
      console.log('skipped, 1');
      return;
    }
    if (this[`_${configValue}`] !== undefined && this[`_${configValue}`] === value) {
      console.log('skipped, 2');
      return;
    }
    if (configValue) {
      const cfg = copy(this._config);
      applyPatch(cfg, [...configValue.split('.')], value);
      this._config = cfg;
      console.log('updated cfg');
      if (value === '') {
        delete this._config[configValue];
        console.log('result ' + configValue);
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static get styles(): CSSResult {
    return css`
      mwc-select,
      mwc-textfield {
        width: 100%;
      }
      mwc-switch {
        padding: 16px 6px;
      }
      .side-by-side {
        display: flex;
        flex-flow: row wrap;
      }
      .side-by-side > * {
        padding-right: 8px;
        width: 50%;
        flex-flow: column wrap;
        box-sizing: border-box;
      }
      .side-by-side > *:last-child {
        flex: 1;
        padding-right: 0;
      }
      .suffix {
        margin: 0 8px;
      }
      .group {
        padding: 15px;
        border: 1px solid var(--primary-text-color)
      }
      .tabs {
        overflow: hidden;        
      }
      .tab {
        width: 100%;
        color: var(--primary-text-color);
        overflow: hidden;
      }
      .tab-label {
        display: flex;
        justify-content: space-between;
        padding: 1em 1em 1em 0em;
        border-bottom: 1px solid var(--secondary-text-color);
        font-weight: bold;
        cursor: pointer;
      }
      .tab-label:hover {
        /*background: #1a252f;*/
      }
      .tab-label::after {
        content: "❯";
        width: 1em;
        height: 1em;
        text-align: center;
        transition: all 0.35s;
      }
      .tab-content {
        max-height: 0;
        padding: 0 1em;
        background: var(--secondary-background-color);
        transition: all 0.35s;
      }
      input.tab-checkbox {
        position: absolute;
        opacity: 0;
        z-index: -1;
      }      
      input.tab-checkbox:checked + .tab-label {
        border-color: var(--accent-color);
      }
      input.tab-checkbox:checked + .tab-label::after {
        transform: rotate(90deg);
      }
      input.tab-checkbox:checked ~ .tab-content {
        max-height: 100vh;
        padding: 1em;
      }      
    `;
  }
}
