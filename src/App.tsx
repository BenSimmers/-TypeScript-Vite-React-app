import React from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { AppComponent } from './components/AppComponent';
import { Navigation } from './utils/Navigation';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

const App: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [count, setCount] = React.useState(0);

  const toggleMenu: () => void = (): void => setOpen((prev) => !prev);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container mx-auto px-4">
        <Router>
          <Navigation isOpen={open} toggleMenu={toggleMenu} />
          <Routes>
            <Route path="/" element={<div>Hello world</div>} />
            <Route
              path="/about"
              element={
                <AppComponent
                  count={count}
                  reactLogo={reactLogo}
                  viteLogo={viteLogo}
                  increment={() => setCount((c) => c + 1)}
                />
              }
            />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
          <Outlet />
        </Router>
      </div>
    </>
  );
};

export default App;
