"use client"

import React from "react"

export default function BodyAttributeLogger(): null {
  React.useEffect(() => {
    try {
      const body = document && document.body
      if (!body) return

      const attrs = Array.from(body.attributes || [])
        .map((a) => ({ name: a.name, value: a.value }))

      if (attrs.length === 0) {
        console.info("[body-attr] no attributes on <body>")
        return
      }

      console.groupCollapsed("[body-attr] attributes on <body>")
      attrs.forEach((a) => console.log(`${a.name}:`, a.value))
      console.groupEnd()

      const suspicious = attrs.find((a) => a.name.includes("cz-") || a.name.includes("shortcut"))
      if (suspicious) {
        console.warn(`[body-attr] suspicious attribute detected: ${suspicious.name}="${suspicious.value}"`)
      }
    } catch (err) {
      // don't break the app — this is purely diagnostic
      // eslint-disable-next-line no-console
      console.error("[body-attr] failed to inspect body attributes", err)
    }
  }, [])

  return null
}
