/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  css,
  internalProperty,
} from 'lit-element';
import { HomeAssistant, fireEvent, LovelaceCardEditor, stateIcon, computeDomain } from 'custom-card-helpers';
import { localize } from './localize/localize';
import { ActionButtonConfig, ActionButtonConfigDefault, ActionButtonMode, Domain, IconConfig, IconConfigDefault, SliderBackground, SliderButtonCardConfig, SliderConfig, SliderConfigDefault, SliderDirections } from './types';
import { getEnumValues, getSliderDefaultForEntity, propByPath } from './utils';

@customElement('slider-button-card-editor')
export class SliderButtonCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @internalProperty() private _config?: SliderButtonCardConfig;
  @internalProperty() private _helpers?: any;
  private _initialized = false;
  private directions = getEnumValues(SliderDirections);
  private backgrounds = getEnumValues(SliderBackground);
  private actionModes = getEnumValues(ActionButtonMode);

  public setConfig(config: SliderButtonCardConfig): void {
    this._config = config;
    this.loadCardHelpers();
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

  get _entity(): string {
    return this._config?.entity || '';
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

  protected render(): TemplateResult | void {
    if (!this.hass || !this._helpers) {
      return html``;
    }
    const actions = [
      "more-info",
      "toggle",
      "navigate",
      "url",
      "call-service",
      "none",
    ];
    // The climate more-info has ha-switch and paper-dropdown-menu elements that are lazy loaded unless explicitly done here
    this._helpers.importMoreInfoControl('climate');

    return html`
      <div class="card-config">
        <div class="tabs">
          <div class="tab">
            <input type="checkbox" id="entity" class="tab-checkbox">
            <label class="tab-label" for="entity">${localize('tabs.general.title')}</label>
            <div class="tab-content">
              <ha-entity-picker
                .hass=${this.hass}
                .includeDomains=${getEnumValues(Domain)}
                .value=${this._entity}
                .configValue=${'entity'}
                label="${localize('tabs.general.entity')}"
                allow-custom-entity
                @value-changed=${this._valueChangedEntity}
              ></ha-entity-picker>
              <paper-input
                label="${localize('tabs.general.name')}"
                .value=${this._name}
                .placeholder=${this._name || this.hass.states[this._entity].attributes?.friendly_name}
                .configValue=${'name'}
                @value-changed=${this._valueChanged}
              ></paper-input>
              <div class="side-by-side">
                <ha-formfield .label=${localize('tabs.general.show_name')}>
                  <ha-switch
                    .checked=${this._show_name}
                    .configValue=${'show_name'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${localize('tabs.general.show_state')}>
                  <ha-switch
                    .checked=${this._show_state}
                    .configValue=${'show_state'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
              </div>
            </div>
          </div>

          <div class="tab">
            <input type="checkbox" id="icon" class="tab-checkbox">
            <label class="tab-label" for="icon">${localize('tabs.icon.title')}</label>
            <div class="tab-content">
              <ha-icon-input
              label="${localize('tabs.icon.icon')}"
              .value=${this._icon.icon}
              .placeholder=${this._icon.icon || stateIcon(this.hass.states[this._entity])}
              .configValue=${'icon.icon'}
              @value-changed=${this._valueChanged}
              >
              </ha-icon-input>
              <div class="side-by-side">
                <ha-formfield label="${localize('tabs.icon.show_icon')}">
                  <ha-switch
                    .checked=${this._icon.show}
                    .configValue=${'icon.show'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                ${this.renderStateColor('icon')}
              </div>
              <hui-action-editor
                label="${localize('tabs.icon.tap_action')}"
                .hass=${this.hass}
                .config=${this._icon.tap_action}
                .actions=${actions}
                .configValue=${"icon.tap_action"}
                @value-changed=${this._valueChanged}
              ></hui-action-editor>
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
                <ha-formfield .label=${localize('tabs.slider.show_track')}>
                  <ha-switch
                    .checked=${this._slider.show_track}
                    .configValue=${'slider.show_track'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${localize('tabs.slider.force_square')}>
                  <ha-switch
                    .checked=${this._slider.force_square}
                    .configValue=${'slider.force_square'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
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
                  <ha-icon-input
                    label="${localize('tabs.action_button.icon')}"
                    .value=${this._action_button.icon}
                    .placeholder=${this._action_button.icon || 'mdi:power'}
                    .configValue=${'action_button.icon'}
                    @value-changed=${this._valueChanged}
                  >
                  </ha-icon-input>
                ` 
                : 
                ''}
              <div class="side-by-side">
                <ha-formfield .label=${localize('tabs.action_button.show_button')}>
                  <ha-switch
                    .checked=${this._action_button.show}
                    .configValue=${'action_button.show'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                ${this._action_button.mode === ActionButtonMode.CUSTOM
                  ? html`
                    <ha-formfield .label=${localize('tabs.action_button.show_spinner')}>
                      <ha-switch
                        .checked=${this._action_button.show_spinner}
                        .configValue=${'action_button.show_spinner'}
                        @change=${this._valueChanged}
                      ></ha-switch>
                    </ha-formfield>
                `
                  :
                  ''}
              </div>
              ${this._action_button.mode === ActionButtonMode.CUSTOM
                ? html`
                  <hui-action-editor
                    label="${localize('tabs.action_button.tap_action')}"
                    .hass=${this.hass}
                    .config=${this._action_button.tap_action}
                    .actions=${actions}
                    .configValue=${"action_button.tap_action"}
                    @value-changed=${this._valueChanged}
                  ></hui-action-editor>
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
      <ha-formfield .label=${localize('tabs.slider.use_brightness')}>
        <ha-switch
          .checked=${item.use_percentage_bg_opacity}
          .configValue="${path}.use_percentage_bg_opacity"
          @change=${this._valueChanged}
        ></ha-switch>
      </ha-formfield>
    `;
  }

  protected renderStateColor(path: string): TemplateResult | void {
    const item = this[`_${path}`];
    return html`
      <ha-formfield .label=${localize('tabs.icon.use_state_color')}>
        <ha-switch
          .checked=${item.use_state_color}
          .configValue="${path}.use_state_color"
          @change=${this._valueChanged}
        ></ha-switch>
      </ha-formfield>
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
    const value = ev.detail.value;
    if (!value) {
      return;
    }
    this._changeValue(value.parentElement?.configValue, value.itemValue);
  }

  private _valueChangedEntity(ev): void {
    const target = ev.target;
    const value = ev.detail?.value;
    const updateDefaults = computeDomain(value) !== computeDomain(this._config?.entity || 'light.dummy');
    this._changeValue(target.configValue, value);
    if (updateDefaults) {
      propByPath(this._config, 'slider', getSliderDefaultForEntity(value));
      fireEvent(this, 'config-changed', { config: this._config });
    }
  }

  private _valueChanged(ev): void {
    const target = ev.target;
    const value = ev.detail?.value;
    this._changeValue(target.configValue, target.checked !== undefined ? target.checked : value);
  }

  private _changeValue(configValue: string, value: string | boolean | number): void {
    if (!this._config || !this.hass) {
      return;
    }
    if (this[`_${configValue}`] !== undefined && this[`_${configValue}`] === value) {
      return;
    }
    if (configValue) {
      const cfg = this._config;
      propByPath(cfg, configValue, value);
      this._config = cfg;
      if (value === '') {
        delete this._config[configValue];
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static get styles(): CSSResult {
    return css`
      ha-switch {
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
