import { isRouteErrorResponse } from '@remix-run/react'
function formatErrorMessage(error: unknown): React.ReactNode {
  if (isRouteErrorResponse(error)) {
    console.error('error', error.statusText)
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
      </div>
    )
  } else if (error instanceof Error) {
    // TODO handle stack trace
    console.error(error.stack)
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    )
  } else if (typeof error === 'string') {
    console.error(error)
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    )
  } else {
    console.error(error)
    return <h1>Unknown Error</h1>
  }
}

export { formatErrorMessage }
