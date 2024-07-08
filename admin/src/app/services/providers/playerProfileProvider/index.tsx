import React, { FC, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import { IProfileErrorResponse, IProfileStateContext, profileActions, profileState } from './context';
import { PlayerProfileService } from '../../api/services/PlayerProfileService';


const ProfileProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [profileresults, setProfileresults] = useState<IProfileStateContext['profileresults']>();

  const getPlayerProfiles = () => {
    setProfileresults({ state: 'loading' });
    PlayerProfileService.getApiServicePlayerResultsGetAll().then((res: any) => {
      setProfileresults({ state: 'success', value: res })
    }).catch((error: AxiosError<IProfileErrorResponse>) => {
      setProfileresults({ state: 'error', error: error?.response?.data });
    });
  };

  const memoizedState = useMemo(() => {
    return { profileresults };
  }, [profileresults]);

  const memoizedActions = useMemo(() => {
    return {
      getPlayerProfiles
    };
  }, [getPlayerProfiles]);

  return (
    <profileState.Provider value={memoizedState}>
      <profileActions.Provider value={memoizedActions}>{children}</profileActions.Provider>
    </profileState.Provider>
  )
};

const useProfileState = () => {
  const context = useContext(profileState);
  return context;
};
const useProfileActions = () => {
  const context = useContext(profileActions);
  return context;
};
const useProfile = () => {
  return { ...useProfileState(), ...useProfileActions() };
};

export { ProfileProvider, useProfileState, useProfile };
