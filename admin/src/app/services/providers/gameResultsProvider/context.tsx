import { createContext } from 'react';
import { IRequestResult } from '../../models/Result';
import { GameResultsDto } from '../../api';

export interface IGameResultStateContext{
    gameresults?: IRequestResult<GameResultsDto[]>;
}

export interface IGameResultErrorResponse {
    error: string;
    error_description: string;
    error_uri: string;
  }
  
export interface IGameResultActionContext{
  getAllGameResults?:()=>void;
}

export const gameResultState  = createContext<IGameResultStateContext>({} as IGameResultStateContext);

export const gameResultActions  = createContext<IGameResultActionContext>({} as IGameResultActionContext);
