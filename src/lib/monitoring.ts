import * as Sentry from '@sentry/nextjs'

type MonitoringContext = {
  scope: string
  extras?: Record<string, unknown>
}

function reportError(error: unknown, context: MonitoringContext): void {
  console.error(`[${context.scope}]`, error)

  Sentry.withScope((scope) => {
    scope.setTag('scope', context.scope)

    for (const [key, value] of Object.entries(context.extras ?? {})) {
      scope.setExtra(key, value)
    }

    if (error instanceof Error) {
      Sentry.captureException(error)
      return
    }

    Sentry.captureMessage(
      `${context.scope}: ${typeof error === 'string' ? error : 'Unknown error'}`,
      'error',
    )
  })
}

export { reportError }
