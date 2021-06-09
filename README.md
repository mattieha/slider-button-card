# Slider button card

A button card with integrated slider for `light, switch, fan, cover` entities.

#### Please ⭐️ this repo if you find it useful

## Installation instructions

**HACS installation:**
1. Go to the HACS store > Settings (dots in right upper corner) > Custom repositories > Fill in the repo url `https://github.com/mattieha/slider-button-card` and choose `Lovelace` as category.
2. Click install on the added card in HACS
## Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| type              | string  | **Required** | `custom:slider-button-card`                   |
| entity            | string  | **Required** | HA entity ID from domain `light, switch, fan, cover`                   |               |
| name              | string  | **Optional** | Name                                   | `entity.friendly_name`       |
| show_name        | boolean | **Optional** | Show name  | `true`             |
| show_state        | boolean | **Optional** | Show state  | `true`             |
| icon        | object  | **Optional** | Icon options                       |  |
| slider        | object  | **Optional** | Slider options                       |  |
| action_button        | object  | **Optional** | Action button options                       |  |
| tap_action        | object  | **Optional** | Action to take on tap                       | `action: more-info` |
| hold_action       | object  | **Optional** | Action to take on hold                      | `none`              |
| double_tap_action | object  | **Optional** | Action to take on double tap                | `none`              |

## Icon Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| icon              | string  | **Optional** | Icon                                   | `default entity icon`       |
| show        | boolean | **Optional** | Show icon  | `true`             |
| use_state_color        | boolean | **Optional** | Use state color  | `true`             |
| tap_action        | object  | **Optional** | Action to take on tap                       | `action: more-info` |

## Slider Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| direction              | string  | **Optional** | Direction `left-right, top-bottom, bottom-top`                                   | `left-right`       |
| background        | string | **Optional** | Background `solid, gradient, triangle, striped, custom`  | `gradient`             |
| use_state_color        | boolean | **Optional** | Use state color  | `true`             |
| use_percentage_bg_opacity        | boolean | **Optional** | Apply opacity to background based on percentage  | `true`             |
| show_track        | boolean | **Optional** | Show track when state is on  | `false`             |
| force_square        | boolean | **Optional** | Force the button as a square  | `false`             |

## Action button Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| mode              | string  | **Optional** | Mode `toggle, custom`                                   | `toggle`       |
| show        | boolean | **Optional** | Show the action button  | `true`             |
| icon        | string | **Optional** | Icon when mode is `custom`  | `mdi:power`             |
| show_spinner        | boolean | **Optional** | Show spinner when mode is `custom`  | `true`             |
| tap_action        | object  | **Optional** | Action to take on tap                       | `action: toggle` |

## Action Options

| Name            | Type   | Requirement  | Description                                                                                                                            | Default     |
| --------------- | ------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| action          | string | **Required** | Action to perform (more-info, toggle, call-service, navigate url, none)                                                                | `more-info` |
| navigation_path | string | **Optional** | Path to navigate to (e.g. /lovelace/0/) when action defined as navigate                                                                | `none`      |
| url             | string | **Optional** | URL to open on click when action is url. The URL will open in a new tab                                                                | `none`      |
| service         | string | **Optional** | Service to call (e.g. media_player.media_play_pause) when action defined as call-service                                               | `none`      |
| service_data    | object | **Optional** | Service data to include (e.g. entity_id: media_player.bedroom) when action defined as call-service                                     | `none`      |
| haptic          | string | **Optional** | Haptic feedback for the [Beta IOS App](http://home-assistant.io/ios/beta) _success, warning, failure, light, medium, heavy, selection_ | `none`      |
| repeat          | number | **Optional** | How often to repeat the `hold_action` in milliseconds.                                                                                 | `non`       |
## Supported languages

This card supports translations. Please, help to add more translations and improve existing ones. Here's a list of supported languages:

- English
- Nederlands (Dutch)
- [_Your language?_][add-translation]

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee:!

[![beer](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/mattijsha)

<!-- References -->
[add-translation]: https://github.com/mattieha/slider-button-card/tree/master/src/localize/languages
