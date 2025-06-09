// __mocks__/svgMock.js
/* eslint-disable no-undef */ // Para desabilitar o linting do ESLint para 'React' não definido globalmente aqui
const React = require("react"); // Use require se este arquivo não for transpilado pelo Babel/TS para o Jest
const SvgrMock = React.forwardRef((props, ref) => React.createElement("span", { ref, ...props }));
module.exports = {
  __esModule: true, // Importante para mocks de módulos ES6
  default: SvgrMock,
  ReactComponent: SvgrMock,
};
