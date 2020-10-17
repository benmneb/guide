import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
	state = {
		hasError: false
	};

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <div>There was an error! Try connecting to the internet.</div>;
		}

		return this.props.children;
	}
}
