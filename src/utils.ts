import { tinycolor, TinyColor } from '@ctrl/tinycolor';
import { computeDomain } from 'custom-card-helpers';
import { Domain, SliderConfig, SliderConfigDefault, SliderConfigDefaultDomain } from './types';

export function getEnumValues(enumeration): string[] {
  return Object.keys(enumeration).map(key => enumeration[key]).filter(value => typeof value === 'string');
}

export function propByPath(obj,is, value): string {
  if (typeof is == 'string')
    return propByPath(obj,is.split('.'), value);
  else if (is.length==1 && value!==undefined)
    return obj[is[0]] = value;
  else if (is.length==0)
    return obj;
  else
    return propByPath(obj[is[0]],is.slice(1), value);
}

export function getSliderDefaultForEntity(entity: string): SliderConfig {
  const domain = computeDomain(entity) || Domain.LIGHT;
  return SliderConfigDefaultDomain.get(domain) || SliderConfigDefault;
}

export function getLightColorBasedOnTemperature(current: number, min: number, max: number): string {
  const high = new TinyColor('rgb(255, 160, 0)'); // orange-ish
  const low = new TinyColor('rgb(166, 209, 255)'); // blue-ish
  const middle = new TinyColor('white');
  const mixAmount = ((current - min) / (max - min)) * 100;
  if (mixAmount < 50) {
    return tinycolor(low)
      .mix(middle, mixAmount * 2)
      .toRgbString();
  } else {
    return tinycolor(middle)
      .mix(high, (mixAmount - 50) * 2)
      .toRgbString();
  }
}
