import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-4 text-center">
          <h2 className="font-serif text-h2 font-medium text-nordic-charcoal">
            Something went wrong
          </h2>
          <p className="max-w-md font-sans text-body font-normal text-nordic-sage-dark">
            An unexpected error occurred. Please try reloading the page.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
