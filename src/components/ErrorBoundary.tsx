import React, { ReactNode } from 'react';

// Define the shape of the component's props
interface ErrorBoundaryProps {
  children: ReactNode;
}

// Define the shape of the component's state
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h2>Something went wrong.</h2>;
    }

    // Render the children as normal
    return this.props.children;
  }
}

export default ErrorBoundary;