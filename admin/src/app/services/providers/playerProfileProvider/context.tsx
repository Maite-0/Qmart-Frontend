import { createContext } from 'react';
import { IRequestResult } from '../../models/Result';
import { PlayerProfileDto } from '../../api';

export interface IProfileStateContext{
    profileresults?: IRequestResult<PlayerProfileDto[]>;
}

export interface IProfileErrorResponse {
    error: string;
    error_description: string;
    error_uri: string;
  }
  
export interface IProfileActionContext{
  getPlayerProfiles?:()=>void;
}

export const profileState  = createContext<IProfileStateContext>({} as IProfileStateContext);

export const profileActions  = createContext<IProfileActionContext>({} as IProfileActionContext);
