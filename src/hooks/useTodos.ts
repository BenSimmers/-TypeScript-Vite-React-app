import { useEffect, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchTodos, selectError, selectStatus, selectTodos, resetFetchStatus, Todo } from '../redux/todoSlice';
import { StatusEnum } from '../redux/common/statusEnum';
import { SerializedError } from '@reduxjs/toolkit';

type useTodosReturnType = {
  todos: Todo[];
  status: StatusEnum;
  error: SerializedError | null;
  resetFetchStatus: () => void;
  isLoading: boolean;
};

export const useTodos = (): useTodosReturnType => {
  const todos = useAppSelector(selectTodos);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  // Reset fetch status if needed
  const resetFetchStatusCallback = useCallback(() => {
    if ([StatusEnum.Failed, StatusEnum.Loading].includes(status)) {
      dispatch(resetFetchStatus());
    }
  }, [status, dispatch]);

  // Fetch todos on mount
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const isLoading = useMemo(() => status === StatusEnum.Loading, [status]);

  return {
    todos,
    status,
    error,
    resetFetchStatus: resetFetchStatusCallback,
    isLoading,
  };
};
