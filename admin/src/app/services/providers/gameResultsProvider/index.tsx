import React, { FC, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import { IGameResultErrorResponse, IGameResultStateContext, gameResultActions, gameResultState } from './context';
import { GameResultsService } from '../../api';


const GameresultProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [gameResults, setGameResults] = useState<IGameResultStateContext['gameresults']>();

  const getAllGameResults = () => {
    setGameResults({ state: 'loading' });
    GameResultsService.getApiServicesGameResultsGetAll().then((res: any) => {
      setGameResults({ state: 'success', value: res })
    }).catch((error: AxiosError<IGameResultErrorResponse>) => {
      setGameResults({ state: 'error', error: error?.response?.data });
    });
  };

  const memoizedState = useMemo(() => {
    return { gameResults };
  }, [gameResults]);

  const memoizedActions = useMemo(() => {
    return {
      getAllGameResults
    };
  }, [getAllGameResults]);

  return (
    <gameResultState.Provider value={{ gameresults: memoizedState.gameResults }}>
      <gameResultActions.Provider value={memoizedActions}>{children}</gameResultActions.Provider>
    </gameResultState.Provider>
  )
};

const useGameResultState = () => {
  const context = useContext(gameResultState);
  return context;
};
const useGameResulActions = () => {
  const context = useContext(gameResultActions);
  return context;
};
const useGameResult = () => {
  return { ...useGameResultState(), ...useGameResulActions() };
};

export { GameresultProvider, useGameResultState, useGameResult };
