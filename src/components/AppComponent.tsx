export type MyAppProps = {
  count: number;
  reactLogo: string;
  viteLogo: string;
  increment: () => void;
};

export const AppComponent: React.FunctionComponent<MyAppProps> = ({ count, reactLogo, viteLogo, increment }) => (
  <div>
    <div className="bg-white rounded-lg shadow-lg p-10 max-w-sm w-full space-y-2">
      <div className="flex flex-row justify-center">
        <img src={reactLogo} className="animate-spin-slow" alt="logo" width="200" height="200" />
        <img src={viteLogo} className="animate-spin-slow" alt="logo" width="200" height="200" />
      </div>
      <p>
        Edit <code>App.tsx</code> and save to test HMR updates.
      </p>
      <p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={increment}>
          count is: {count}
        </button>
      </p>
    </div>
  </div>
);
