module.exports = (components, services) => `
  ${
    services.map((item) => {
      return (
        `<div id="Summary">${item}</div>`
      );
    })
  }

  <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>   

  ${
    Object.keys(components).map((item) => {
      const client = components[item].client;
      const url = components[item].url;
      return (
        `<script src="${client}.js"></script>`
      );
    })
  }

  <script>
    ${
      Object.keys(components).map((item) => {
        const name = components[item].name;
        return (
          `ReactDOM.hydrate(
            React.createElement(${item}),
            document.getElementById('${name}')
          );`
        );
      })
    }
  </script>
`;
