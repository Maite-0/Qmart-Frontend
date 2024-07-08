import React, { FC, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import { ISheduleErrorResponse, ISheduleStateContext, sheduleActions, sheduleState } from './context';
import { SheduleService } from '../../api/services/SheduleService';


const SheduleProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [shedule, setShedule] = useState<ISheduleStateContext['shedule']>();
  const [shedules, setShedules] = useState<ISheduleStateContext['shedules']>();

  const getAllShedules = () => {
    setShedules({ state: 'loading' });
    SheduleService.getApiServicesShedulesGetAll().then((res: any) => {
      setShedules({ state: 'success', value: res })
    }).catch((error: AxiosError<ISheduleErrorResponse>) => {
      setShedules({ state: 'error', error: error?.response?.data });
    });
  };

  const memoizedState = useMemo(() => {
    return { shedule, shedules };
  }, [shedule, shedules]);

  const memoizedActions = useMemo(() => {
    return {
      getAllShedules
    };
  }, [getAllShedules]);

  return (
    <sheduleState.Provider value={memoizedState}>
      <sheduleActions.Provider value={memoizedActions}>{children}</sheduleActions.Provider>
    </sheduleState.Provider>
  )
};

const useSheduleState = () => {
  const context = useContext(sheduleState);
  return context;
};
const useSheduleActions = () => {
  const context = useContext(sheduleActions);
  return context;
};
const useShedule = () => {
  return { ...useSheduleState(), ...useSheduleActions() };
};

export { SheduleProvider, useSheduleState, useShedule };
