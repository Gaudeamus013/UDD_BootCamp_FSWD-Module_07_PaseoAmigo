// ============================================================
// 🧱 ErrorBoundary.jsx — Captura errores de renderizado
// Paseo Amigo · Utiliza ErrorFallback para mostrar la UI de error
// ============================================================

import React from "react";
import ErrorFallback from "./ErrorFallback.jsx";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("🚨 ErrorBoundary capturó un error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
    