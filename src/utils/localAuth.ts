import { createServerFn } from "@tanstack/react-start"
import { getRequestHeader } from "@tanstack/react-start/server"

export const ensureLocalHost = createServerFn({ method: 'GET' }).handler(async () => {
  const host = getRequestHeader('host') || ''

  // Check if the request is coming exclusively from the local machine
  if (!host.includes('localhost') && !host.includes('127.0.0.1')) {
    throw new Error('Forbidden: This page is only accessible from the host computer.')
  }
})
