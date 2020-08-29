export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Auth: AuthStackParamList;
  Splash: undefined;
};

export type AuthStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
};

export type MainTabParamList = {
  TrackListTab: undefined;
  TrackCreateTab: undefined;
  AccountTab: undefined;
};

export type TrackListStackParamList = {
  TrackList: undefined;
  TrackDetail: undefined;
};

export type TrackCreateStackParamList = {
  TrackCreate: undefined;
};

export type AccountStackParamList = {
  Account: undefined;
};
