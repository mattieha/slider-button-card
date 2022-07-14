import { computeDomain } from 'custom-card-helpers';
import { Domain, SliderButtonCardConfig } from '../types';
import { ClimateController } from './climate-controller';
import { Controller } from './controller';
import { CoverController } from './cover-controller';
import { FanController } from './fan-controller';
import { InputBooleanController } from './input-boolean-controller';
import { LightController } from './light-controller';
import { LockController } from './lock-controller';
import { MediaController } from './media-controller';
import { SwitchController } from './switch-controller';

export class ControllerFactory {
  static getInstance(config: SliderButtonCardConfig): Controller {
    const domain = computeDomain(config.entity);
    const mapping = {
      [Domain.LIGHT]: LightController,
      [Domain.FAN]: FanController,
      [Domain.SWITCH]: SwitchController,
      [Domain.COVER]: CoverController,
      [Domain.INPUT_BOOLEAN]: InputBooleanController,
      [Domain.MEDIA_PLAYER]: MediaController,
      [Domain.CLIMATE]: ClimateController,
      [Domain.LOCK]: LockController,
    };
    if (typeof mapping[domain] === 'undefined') {
      throw new Error(`Unsupported entity type: ${domain}`)
    }
    return new mapping[domain](config);
  }
}
