export default ({ body, title }: any) => {
    return `
      <!DOCTYPE html>
      <html lang="en" data-framework="relay">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="public/favicon.ico">
    <title>${title}</title>
  </head>
  <body>
    <div id="root">${body}</div>
    <script src="client/chunks/main.chunk.js"></script>
    <script src="client/runtime.js"></script>
  </body>
</html>
    `;
  };