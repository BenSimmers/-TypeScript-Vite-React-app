import React from 'react';
import { useTodos } from './hooks/useTodos';
import { Todo } from './redux/todoSlice';
import { useCounter } from './hooks/useCounter';

export const Todos: React.FunctionComponent<{ todos: Todo[] }> = ({ todos }) => {
  return todos.map((todo) => (
    <div
      key={todo.id}
      style={{ border: todo.completed ? '1px solid green' : '1px solid red', padding: '10px', margin: '10px' }}
    >
      <p>{todo.title}</p>
      <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
    </div>
  ));
};

const ConnectedTodos: React.FunctionComponent = () => {
  const { todos, resetFetchStatus, isLoading } = useTodos();

  React.useEffect(() => {
    if (!isLoading) {
      resetFetchStatus();
    }
  }, [resetFetchStatus]);

  return (
    <div>
      <h1>Todos</h1>
      {isLoading ? <p>Loading...</p> : <Todos todos={todos} />}
    </div>
  );
};

type CounterProps = {
  count: number;
  increment: () => void;
  decrement: () => void;
  incrementByAmount: (amount: number) => void;
};

const Counter: React.FunctionComponent<CounterProps> = ({ count, increment, decrement, incrementByAmount }) => {
  return (
    <div>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={() => incrementByAmount(5)}>Increment by 5</button>
    </div>
  );
};

const ConnectedCounter: React.FunctionComponent = () => {
  const { count, increment, decrement, incrementByAmount } = useCounter();

  return <Counter count={count} increment={increment} decrement={decrement} incrementByAmount={incrementByAmount} />;
};

function App() {
  return (
    <div>
      <ConnectedCounter />
      <ConnectedTodos />
    </div>
  );
}

export default App;
