# Slider button card by [@mattieha](https://www.github.com/mattieha)
[![GitHub Release][releases-shield]][releases]
[![hacs_badge](https://img.shields.io/badge/HACS-default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

A button card with integrated slider for `light, switch, fan, cover, input_boolean, media_player, climate, lock` entities.

![Preview][preview]
![Preview 2][preview-2]

#### Please ⭐️ this repo if you find it useful

## TOC
- [Installation](#installation)
    - [HACS](#hacs)
    - [Manual](#manual)
- [Configuration](#configuration)
    - [Visual Editor](#visual-editor)
    - [Options](#options)
        - [Icon options](#icon-options)
        - [Slider options](#slider-options)
        - [Action button options](#action-button-options)
        - [Tap action](#action-options)
    - [Styles](#styles)
- [Examples](#examples)
    - [Minimal working config](#minimal-working-config)
    - [Per feature](#per-feature)
        - [General](#general)
        - [Icon](#icon)
        - [Action button](#action-button)
        - [Slider](#slider)
    - [Full examples](#full-examples)
        - [Fan](#fan)
        - [Switch](#switch)
        - [Cover](#cover)
        - [Media player](#media-player)
        - [Climate](#climate)
        - [Lock](#lock)
        - [In a grid](#grid)
- [Known issues](#known-issues)
- [Languages](#languages)
- [Credits](#credits)

## Installation

### HACS
This card is available in [HACS][hacs] (Home Assistant Community Store).
Just search for `Slider Button Card` in Frontend tab.

### Manual

1. Download `slider-button-card.js` file from the [latest-release].
2. Put `slider-button-card.js` file into your `config/www` folder.
3. Go to _Configuration_ → _Lovelace Dashboards_ → _Resources_ → Click Plus button → Set _Url_ as `/local/slider-button-card.js` → Set _Resource type_ as `JavaScript Module`.
4. Add `custom:slider-button-card` to Lovelace UI as any other card (using either editor or YAML configuration).

## Configuration

### Visual Editor

Slider Button Card supports Lovelace's Visual Editor. 
<details>
  <summary>Show screenshot</summary>

![Visual Editor][visual-editor]
</details>


### Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| type              | string  | **Required** | `custom:slider-button-card`                   |
| entity            | string  | **Required** | HA entity ID from domain `light, switch, fan, cover, input_boolean, media_player, climate, lock`                   |               |
| name              | string  | **Optional** | Name                                   | `entity.friendly_name`       |
| show_name        | boolean | **Optional** | Show name  | `true`             |
| show_state        | boolean | **Optional** | Show state  | `true`             |
| compact        | boolean | **Optional** | Compact mode, display name and state inline with icon. Useful for full width cards.   | `false`             |
| icon        | object  | **Optional** |  [Icon options](#icon-options)                      |  |
| slider        | object  | **Optional** | [Slider options](#slider-options)                      |  |
| action_button        | object  | **Optional** | [Action button options](#action-button-options)                     |  |

### Icon Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| icon              | string  | **Optional** | Icon                                   | `default entity icon`       |
| show        | boolean | **Optional** | Show icon  | `true`             |
| use_state_color        | boolean | **Optional** | Use state color  | `true`             |
| tap_action        | object  | **Optional** | [Action](#action-options) to take on tap                       | `action: more-info` |

### Slider Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| direction              | string  | **Optional** | Direction `left-right, top-bottom, bottom-top`                                   | `left-right`       |
| background        | string | **Optional** | Background `solid, gradient, triangle, striped, custom`  | `gradient`             |
| use_state_color        | boolean | **Optional** | Use state color  | `true`             |
| use_percentage_bg_opacity        | boolean | **Optional** | Apply opacity to background based on percentage  | `true`             |
| show_track        | boolean | **Optional** | Show track when state is on  | `false`             |
| force_square        | boolean | **Optional** | Force the button as a square  | `false`             |
| toggle_on_click        | boolean | **Optional** | Force the slider to act as a toggle, if `true` sliding is disabled  | `false`             |
| attribute        | string | **Optional** | Control an [attribute](#attributes) for `light` or `cover` entities |              |
| invert        | boolean | **Optional** | Invert calculation of state and percentage, useful for `cover` entities   | `false`<br />`true` for `cover`            |

### Attributes
Light:
- `brightness_pct` **default**
- `brightness`
- `color_temp`
- `hue`
- `saturation`  

_Warning options other than `brightness_pct` and `brightness` may give strange results_

For example when `color_temp` is selected as attribute and the current `color_mode` of the light is **not** `color_temp` there is no value available for the slider, so the min value will be displayed. Same for `hue` and `saturation`, slider will only show correct value when the `color_mode` is `hs`.  

Cover:
- `position` **default**
- `tilt`
### Action button Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| mode              | string  | **Optional** | Mode `toggle, custom`                                   | `toggle`       |
| show        | boolean | **Optional** | Show the action button  | `true`             |
| icon        | string | **Optional** | Icon when mode is `custom`  | `mdi:power`             |
| show_spinner        | boolean | **Optional** | Show spinner when mode is `custom`  | `true`             |
| tap_action        | object  | **Optional** | [Action](#action-options) to take on tap                       | `action: toggle` |

### Action Options

| Name            | Type   | Requirement  | Description                                                                                                                            | Default     |
| --------------- | ------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| action          | string | **Required** | Action to perform (more-info, toggle, call-service, navigate url, none)                                                                | `more-info` |
| navigation_path | string | **Optional** | Path to navigate to (e.g. /lovelace/0/) when action defined as navigate                                                                | `none`      |
| url             | string | **Optional** | URL to open on click when action is url. The URL will open in a new tab                                                                | `none`      |
| service         | string | **Optional** | Service to call (e.g. media_player.media_play_pause) when action defined as call-service                                               | `none`      |
| service_data    | object | **Optional** | Service data to include (e.g. entity_id: media_player.bedroom) when action defined as call-service                                     | `none`      |
| haptic          | string | **Optional** | Haptic feedback for the [Beta IOS App](http://home-assistant.io/ios/beta) _success, warning, failure, light, medium, heavy, selection_ | `none`      |
| repeat          | number | **Optional** | How often to repeat the `hold_action` in milliseconds.                                                                                 | `non`       |
### Styles
Custom styles can be set by using [Card mod](https://github.com/thomasloven/lovelace-card-mod) 
```yaml
    style: |
      :host {
        --VARIABLE: VALUE;
      }
```

| Variable                   | Description                                 | Default             |
| -----------------------    | ------------------------------------------- | ------------------- |
|  `--icon-color`  | Color of the icon when `icon.use_state_color === false`     | `var(--paper-item-icon-color)`       |
|  `--label-color-on`  | Color of the label when state is on     | `var(--primary-text-color, white)`       |
|  `--label-color-off`  | Color of the label when state is off    | `var(--primary-text-color, white)`       |
|  `--state-color-on`  | Color of the state value when state is on    | `var(--label-badge-text-color, white)`       |
|  `--state-color-off`  | Color of the state value when state is off    | `var(--disabled-text-color)`       |
|  `--action-icon-color-on`  | Color of the action button icon when state is on     | `var(--paper-item-icon-color, black)`       |
|  `--action-icon-color-off`  | Color of the action button icon when state is off     | `var(--paper-item-icon-color, black)`       |
|  `--action-spinner-color`  | Color of the spinner action button     | `var(--label-badge-text-color, white)`       |

## Examples

### Minimal working config
<table>
<tr>
<td></td>
<td>Minimal working config
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/general-minimal.png">  
</td>
<td valign="top">

```yaml
type: custom:slider-button-card
entity: light.couch
slider:
  direction: left-right
  background: gradient
icon:
  tap_action:
    action: more-info
action_button:
  mode: toggle
```  
</td>
</tr>
</table>

### Per feature

#### General

<table>
<tr>
<td></td>
<td>Compact, best used in full width (not in grid)
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/general-compact.png">  
</td>
<td valign="top">

```yaml
compact: true
```  
</td>
</tr>
</table>

#### Icon

<table>
<tr>
<td></td>
<td>Minimal config
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/icon-minimal.png">  
</td>
<td valign="top">

```yaml
icon:
  tap_action:
    action: more-info
```  
</td>
</tr>
</table>

<table>
<tr>
<td></td>
<td>Icon override
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/icon-icon-override.png">  
</td>
<td valign="top">

```yaml
icon:
  icon: mdi:lightbulb
  tap_action:
    action: more-info
```  
</td>
</tr>
</table>


#### Action button

<table>
<tr>
<td></td>
<td>Minimal config
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/action-minimal.png">  
</td>
<td valign="top">

```yaml
action_button:
  mode: toggle
  show: true
```  
</td>
</tr>
</table>

<table>
<tr>
<td></td>
<td>Custom
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/action-custom.png">  
</td>
<td valign="top">

```yaml
action_button:
  mode: custom
  show: true
  tap_action:
    action: toggle
```  
</td>
</tr>
</table>

<table>
<tr>
<td></td>
<td>Custom icon and tap action
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/action-custom-icon.png">  
</td>
<td valign="top">

```yaml
action_button:
  mode: custom
  show: true
  icon: mdi:palette
  tap_action:
    action: call-service
    service: scene.turn_on
    service_data:
      entity_id: scene.test
```  
</td>
</tr>
</table>

#### Slider

<table>
<tr>
<td></td>
<td>Minimal config
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/slider-minimal.png">  
</td>
<td valign="top">

```yaml
slider:
  direction: left-right
  background: gradient
```  
</td>
</tr>
</table>

<table>
<tr>
<td></td>
<td>Background uses color or color_temp if available 
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/slider-state-color.png">  
</td>
<td valign="top">

```yaml
slider:
  direction: left-right
  background: gradient
  use_state_color: true
```  
</td>
</tr>
</table>

<table>
<tr>
<td></td>
<td>Show track, best used in full width or triangle 
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/slider-show-track.png">  
</td>
<td valign="top">

```yaml
slider:
  direction: left-right
  background: triangle
  use_state_color: true
  show_track: true
```  
</td>
</tr>
</table>

<table>
<tr>
<td></td>
<td>Force square 
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/slider-force-square.png">  
</td>
<td valign="top">

```yaml
slider:
  direction: left-right
  background: triangle
  use_state_color: true
  show_track: true
  force_square: true
```  
</td>
</tr>
</table>



### Full examples
#### Fan
For fan entities the icon auto rotates based on the speed of the fan. 
<table>
<tr>
<td></td>
<td>Icon rotate animation 
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/fan.gif">  
</td>
<td valign="top">

```yaml
type: custom:slider-button-card
entity: fan.living_fan
slider:
  direction: left-right
  background: triangle
  show_track: true
icon:
  tap_action:
    action: more-info
action_button:
  tap_action:
    action: toggle
  mode: custom
name: Fan
```  
</td>
</tr>
</table>

#### Switch
 Use `slider.toggle_on_click: true` so the slider acts as a toggle (sliding is disabled).
<table>
<tr>
<td></td>
<td>Toggle on click
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/switch.gif">  
</td>
<td valign="top">

```yaml
type: custom:slider-button-card
entity: switch.socket
slider:
  direction: left-right
  background: custom
  toggle_on_click: true
icon:
  use_state_color: true
  tap_action:
    action: more-info
action_button:
  tap_action:
    action: toggle
  mode: custom
name: Switch
```  
</td>
</tr>
</table>

#### Cover
For most use cases: set `slider.direction: top-bottom` and `slider.background: striped`;
<table>
<tr>
<td></td>
<td>Direction top to bottom, custom action icon 
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/cover.gif">  
</td>
<td valign="top">

```yaml
type: custom:slider-button-card
entity: cover.living_cover
slider:
  direction: top-bottom
  background: striped
icon:
  show: true
  tap_action:
    action: more-info
action_button:
  tap_action:
    action: toggle
  mode: custom
  icon: mdi:swap-vertical
name: Cover
```  
</td>
</tr>
</table>

#### Media player
Default behavior: slider is used for volume control, when there is an entity picture it will be used instead of the icon.
In this example the action button is used to toggle play/pause.
<table>
<tr>
<td></td>
<td>Action button to toggle play/pause 
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/media.gif">  
</td>
<td valign="top">

```yaml
type: custom:slider-button-card
entity: media_player.spotify_mha
slider:
  direction: left-right
  background: triangle
  show_track: true
icon:
  tap_action:
    action: more-info
action_button:
  mode: custom
  icon: mdi:play-pause
  tap_action:
    action: call-service
    service: media_player.media_play_pause
    service_data:
      entity_id: media_player.spotify_mha
name: Media

```  
</td>
</tr>
</table>

#### Climate
Default behavior: slider is used to set target temperature, it doesn't alter state.
<table>
<tr>
<td></td>
<td>Target temperature and state disabled in card 
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/climate.gif">  
</td>
<td valign="top">

```yaml
type: custom:slider-button-card
entity: climate.harmony_climate_controller
slider:
  direction: left-right
  background: triangle
  show_track: true
icon:
  tap_action:
    action: more-info
action_button:
  mode: custom
  tap_action:
    action: toggle
name: Airco

```  
</td>
</tr>
</table>

#### Lock
Default behavior: `slider.toggle_on_click: true`
<table>
<tr>
<td></td>
<td>Action button hidden 
</td>
</tr>
<tr>
<td><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/examples/lock.gif">  
</td>
<td valign="top">

```yaml
type: custom:slider-button-card
entity: lock.virtual_lock
slider:
  direction: left-right
  background: solid
  toggle_on_click: true
icon:
  use_state_color: true
  tap_action:
    action: more-info
action_button:
  show: false
name: Lock
```  
</td>
</tr>
</table>

#### Grid

<table>
<tr>
<td></td>
<td> 4 columns, square: false
</td>
</tr>
<tr>
<td valign="top"><img src="https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/preview.gif">  
</td>
<td valign="top">

```yaml
type: grid
cards:
  - type: custom:slider-button-card
    entity: light.couch
    slider:
      direction: left-right
      background: gradient
      use_state_color: true
    icon:
      tap_action:
        action: more-info
      use_state_color: true
    action_button:
      mode: toggle
  - type: custom:slider-button-card
    entity: switch.socket
    slider:
      direction: left-right
      background: custom
      toggle_on_click: true
    icon:
      use_state_color: true
      tap_action:
        action: more-info
    action_button:
      tap_action:
        action: toggle
      mode: toggle
    name: Switch
  - type: custom:slider-button-card
    entity: fan.living_fan
    slider:
      direction: left-right
      background: triangle
      show_track: true
    icon:
      tap_action:
        action: more-info
    action_button:
      tap_action:
        action: toggle
      mode: custom
    name: Fan
  - type: custom:slider-button-card
    entity: cover.living_cover
    slider:
      direction: top-bottom
      background: striped
    icon:
      show: true
      tap_action:
        action: more-info
    action_button:
      tap_action:
        action: toggle
      mode: custom
      icon: mdi:swap-vertical
    name: Cover
square: false
columns: 4

```  
</td>
</tr>
</table>

## Known issues
When you discover any bugs please open an [issue](https://github.com/mattieha/slider-button-card/issues).

## Languages

This card supports translations. Please, help to add more translations and improve existing ones. Here's a list of supported languages:

- English
- Hebrew
- Nederlands (Dutch)
- Polish (polski)
- Portuguese
- Russian
- [_Your language?_][add-translation]

## Credits
- Inspired by [Slider entity row](https://github.com/thomasloven/lovelace-slider-entity-row)

---
[![beer](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/mattijsha)

<!-- References -->
[hacs]: https://hacs.xyz
[add-translation]: https://github.com/mattieha/slider-button-card/blob/main/CONTRIBUTE.md#adding-a-new-translation
[visual-editor]: https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/card-editor.png
[preview]: https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/preview.gif
[preview-2]: https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/preview-2.gif
[grid]: https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/grid-not-square.png
[full-width]: https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/grid-full-width.png
[latest-release]: https://github.com/mattieha/slider-button-card/releases/latest
[releases-shield]: https://img.shields.io/github/release/mattieha/slider-button-card.svg?style=for-the-badge
[releases]: https://github.com/mattieha/slider-button-card/releases
[icon-minimal]: https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/grid-full-width.png
