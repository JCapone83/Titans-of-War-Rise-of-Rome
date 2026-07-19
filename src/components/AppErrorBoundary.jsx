import React from 'react'

export class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <main className="fatal-error">
          <p className="eyebrow">Campaign interrupted</p>
          <h1>Rome has reached an impasse.</h1>
          <p>Your saved campaign remains in this browser. Reload to recover it.</p>
          <button className="primary-button" onClick={() => window.location.reload()}>Reload campaign</button>
        </main>
      )
    }
    return this.props.children
  }
}
