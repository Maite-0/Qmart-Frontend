import { createContext } from 'react';
import { IRequestResult } from '../../models/Result';
import { SheduleDto } from '../../api';

export interface ISheduleStateContext{
    shedule?: IRequestResult<SheduleDto>;
    shedules?: IRequestResult<SheduleDto[]>;
}

export interface ISheduleErrorResponse {
    error: string;
    error_description: string;
    error_uri: string;
  }
  
export interface ISheduleActionContext{
   getAllShedules?:()=>void;
   getSchedule?:(id:string)=>void;
}

export const sheduleState  = createContext<ISheduleStateContext>({} as ISheduleStateContext);

export const sheduleActions  = createContext<ISheduleActionContext>({} as ISheduleActionContext);
