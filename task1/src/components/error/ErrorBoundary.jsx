import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        // Можно отрендерить запасной UI произвольного вида
        return <h1>Что-то пошло не так.</h1>;
      }
  
      return this.props.children; 
    }
}