import React from 'react';
import { useDispatch } from 'react-redux';
import { searchParamUpdated, selectSearchParams } from '../store/Slice/appSlice';
import { useTypedSelector } from '../store/store';

export default function SearchComponent() {
  const dispatch = useDispatch();
  const searchParams = useTypedSelector(selectSearchParams);

  const handleChange = (e: any) => {
    const val = e.target.value;
    dispatch(searchParamUpdated(val));
  };

  return (
    <input
      type="text"
      value={searchParams}
      className="w-1/4 border border-1 border-solid px-1 py-0.5"
      onChange={handleChange}
    />
  );
}
