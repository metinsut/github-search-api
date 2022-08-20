import { Action, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import appReducer from './Slice/appSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    app: appReducer
  }
});

type StoreThunkDispatch = ThunkDispatch<RootState, StoreExtraArgument, ActionType>;
type ActionType = Action<string>;
type StoreExtraArgument = null;

export const useTypedDispatch = () => useDispatch<StoreThunkDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  RootState,
  StoreExtraArgument,
  ActionType
>;
