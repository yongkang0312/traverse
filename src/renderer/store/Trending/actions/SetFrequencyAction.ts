import { FrequencyType } from '@/renderer/infrastructure/model/Frequency.type';
import { ActionResponse } from '@/renderer/store/Interfaces';

export const SET_FREQUENCY = '[FREQUENCY] Set';

export type SetFrequencyActionType = (frequency: FrequencyType) => ActionResponse<string>;

export const SetFrequencyAction: SetFrequencyActionType = (frequency: FrequencyType) => {
  return {
    type: SET_FREQUENCY,
    payload: frequency,
  };
};
