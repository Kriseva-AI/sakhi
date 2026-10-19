import { Component, type ReactNode } from "react";
export class MapBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p className="workspace-empty" role="status">
        The map tool could not load. Use the public place list or Google Maps
        alternative below. Turn the map off and on to retry.
      </p>
    ) : (
      this.props.children
    );
  }
}
