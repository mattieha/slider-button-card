# Slider button card by [@mattieha](https://www.github.com/mattieha)

A button card with integrated slider for `light, switch, fan, cover` entities.

![Preview][preview]

#### Please ⭐️ this repo if you find it useful

## TOC
- [Installation](#installation)
    - [HACS](#hacs)
    - [Manual](#manual)
- [Usage](#usage)
    - [Grid](#grid)
    - [Standalone](#standalone)
- [Configuration](#configuration)
    - [Visual Editor](#visual-editor)
    - [Options](#options)
        - [Icon options](#icon-options)
        - [Slider options](#slider-options)
        - [Action button options](#action-button-options)
        - [Tap action](#action-options)
    - [Styles](#styles)
- [Known issues](#known-issues)
- [Languages](#languages)
- [Credits](#credits)

## Installation

### HACS
1. Go to the HACS store > Settings (dots in right upper corner) > Custom repositories > Fill in the repo url `https://github.com/mattieha/slider-button-card` and choose `Lovelace` as category.
2. Click install on the added card in HACS

### Manual

1. Download `select-button-card.js` file from the [latest-release].
2. Put `select-button-card.js` file into your `config/www` folder.
3. Add reference to `select-button-card.js` in Lovelace. There's two way to do that:
    1. **Using UI:** _Configuration_ → _Lovelace Dashboards_ → _Resources_ → Click Plus button → Set _Url_ as `/local/select-button-card.js` → Set _Resource type_ as `JavaScript Module`.
    2. **Using YAML:** Add following code to `lovelace` section.
       ```yaml
       resources:
         - url: /local/select-button-card.js
           type: module
       ```
4. Add `custom:select-button-card` to Lovelace UI as any other card (using either editor or YAML configuration).

## Usage
### Grid
In most cases the card is best used in combination with the default grid card.  
The width and height of the slider button card is determined by the `columns` option of the grid card and the `Render cards as squares` option.


Example `columns: 2` and `Render cards as squares: false`

![Grid][grid]

Example `columns: 1` and `Render cards as squares: false`

![Full width][full-width]

### Standalone
Used as standalone card the width will be 100% of the column, and the height will be as needed.
With the option `slider.force_square` it's possible to force the height to be the same as the width.

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
| entity            | string  | **Required** | HA entity ID from domain `light, switch, fan, cover`                   |               |
| name              | string  | **Optional** | Name                                   | `entity.friendly_name`       |
| show_name        | boolean | **Optional** | Show name  | `true`             |
| show_state        | boolean | **Optional** | Show state  | `true`             |
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

## Known issues
- No support for firefox
- Mobile
    - With `slider.direction` set to `top-bottom` or `bottom-top` scrolling is triggered

When you discover any bugs please open an [issue](https://github.com/mattieha/slider-button-card/issues).

## Languages

This card supports translations. Please, help to add more translations and improve existing ones. Here's a list of supported languages:

- English
- Nederlands (Dutch)
- [_Your language?_][add-translation]

## Credits
- Inspired by [Slider entity row](https://github.com/thomasloven/lovelace-slider-entity-row)

---
[![beer](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/mattijsha)

<!-- References -->
[add-translation]: https://github.com/mattieha/slider-button-card/tree/main/src/localize/languages
[visual-editor]: https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/card-editor.png
[preview]: https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/preview.gif
[grid]: https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/grid-not-square.png
[full-width]: https://raw.githubusercontent.com/mattieha/slider-button-card/main/assets/grid-full-width.png
[latest-release]: https://github.com/mattieha/slider-button-card/releases/latest
