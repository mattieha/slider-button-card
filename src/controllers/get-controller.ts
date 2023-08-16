import { computeDomain } from 'custom-card-helpers';
import { Domain, SliderButtonCardConfig } from '../types';
import { AutomationController } from './automation-controller';
import { ClimateController } from './climate-controller';
import { Controller } from './controller';
import { CoverController } from './cover-controller';
import { FanController } from './fan-controller';
import { InputBooleanController } from './input-boolean-controller';
import { InputNumberController } from './input-number-controller';
import { LightController } from './light-controller';
import { LockController } from './lock-controller';
import { MediaController } from './media-controller';
import { SwitchController } from './switch-controller';
import { NumberController } from './number-controller';

export class ControllerFactory {
  static getInstance(config: SliderButtonCardConfig): Controller {
    const domain = computeDomain(config.entity);
    const mapping = {
      [Domain.LIGHT]: LightController,
      [Domain.FAN]: FanController,
      [Domain.SWITCH]: SwitchController,
      [Domain.AUTOMATION]: AutomationController,
      [Domain.COVER]: CoverController,
      [Domain.INPUT_BOOLEAN]: InputBooleanController,
      [Domain.INPUT_NUMBER]: InputNumberController,
      [Domain.MEDIA_PLAYER]: MediaController,
      [Domain.NUMBER]: NumberController,
      [Domain.CLIMATE]: ClimateController,
      [Domain.LOCK]: LockController,
    };
    if (typeof mapping[domain] === 'undefined') {
      throw new Error(`Unsupported entity type: ${domain}`)
    }
    return new mapping[domain](config);
  }
}
