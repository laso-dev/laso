import type { LasoConfig } from './types.js'

export function generateHTML(config: LasoConfig): string {
  const { basePath, uiVersion = 'latest' } = config
  const apiUrl = basePath

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Laso App</title>
  </head>
  <body>
    <div id="root"></div>
    <script>
      window.__INITIAL_STATE__ = {
        apiUrl: "${apiUrl}",
        basename: "${basePath}",
      };
    </script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@lasodev/ui@${uiVersion}/dist/styles.css"
    />
    <script
      type="module"
      src="https://unpkg.com/@lasodev/ui@${uiVersion}/dist/main.mjs"
    ></script>
  </body>
</html>`
}

