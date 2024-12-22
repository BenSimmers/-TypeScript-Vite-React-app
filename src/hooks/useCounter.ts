import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { decrement, increment, incrementByAmount } from '../redux/counterSlice';

export const useCounter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const incrementCallback = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);

  const decrementCallback = useCallback(() => {
    dispatch(decrement());
  }, [dispatch]);

  const incrementByAmountCallback = useCallback(
    (amount: number) => {
      dispatch(incrementByAmount(amount));
    },
    [dispatch],
  );

  return {
    count,
    increment: incrementCallback,
    decrement: decrementCallback,
    incrementByAmount: incrementByAmountCallback,
  };
};
