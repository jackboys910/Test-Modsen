import React, { Component, ReactNode } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../constants/styles/mainColors'

interface IErrorBoundaryProps {
  children: ReactNode
}

interface IErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Something went wrong. Please try again later!
          </Text>
        </View>
      )
    }

    return this.props.children
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: COLORS.COLOR_ERRORBOUNDARY_BACKGROUND_RED,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.COLOR_ERRORBOUNDARY_BORDER_RED,
    padding: 20,
    margin: 10,
  },
  errorText: {
    color: COLORS.COLOR_ERRORBOUNDARY_TEXT_ORANGE,
    fontSize: 24,
    textAlign: 'center',
  },
})

export default ErrorBoundary
