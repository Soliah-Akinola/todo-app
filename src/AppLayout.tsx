import { Outlet } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

const AppLayout: React.FC = () => {
  return (
    <main className="p-4">
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </main>
  );
};

export default AppLayout;
