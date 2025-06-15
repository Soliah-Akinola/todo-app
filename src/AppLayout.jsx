import { Outlet } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

function AppLayout() {
  return (
    <main className="p-4">
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </main>
  );
}

export default AppLayout;