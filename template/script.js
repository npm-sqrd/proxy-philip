module.exports = (components, services) => `
  ${
    services.map((item) => {
      return (
        `<div id='summary'>${item}</div>`
      );
    })
  }
  <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>   
  ${
    Object.keys(components).map((item) => {
      const client = components[item].client;
      return (
        `<script src="${client}.js"></script>`
      );
    })
  }
  <script>
    ${
      Object.keys(components).map((item) => {
        const idName = components[item].name;
        return (
          `
          const id = Math.floor(Math.random() * (20000000 - 10000000 + 1)) + 10000000;
          const name = "Restaurant " + id;
          ReactDOM.hydrate(React.createElement(${item}, { name }),document.getElementById('${idName}'));
          `
        );
      })
    }
  </script>
`;
