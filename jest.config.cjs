// jest.config.js
// eslint-disable-next-line no-undef
module.exports = {
  // Ambiente de teste: jsdom simula um ambiente de navegador com um DOM.
  testEnvironment: "jsdom",

  // Arquivos de setup que rodam uma vez por arquivo de teste, após o ambiente ser configurado.
  // Ideal para importar @testing-library/jest-dom ou outros setups globais.
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // ou .js se você não estiver usando TypeScript para este arquivo

  // Transformadores: Como o Jest deve processar diferentes tipos de arquivos.
  transform: {
    // Usa babel-jest para transpilar arquivos JS/JSX e TS/TSX.
    // Garanta que seu babel.config.js está configurado com os presets corretos
    // (@babel/preset-env, @babel/preset-react, @babel/preset-typescript).
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },

  // Mapeador de Módulos: Lida com importações de arquivos que não são JavaScript.
  moduleNameMapper: {
    // Mapeia importações de arquivos CSS (e outros pré-processadores) para identity-obj-proxy.
    // Isso é útil para CSS Modules, onde você quer que as classes sejam retornadas como strings.
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",

    // Mapeia importações de arquivos de imagem para um mock simples.
    // Crie um arquivo __mocks__/fileMock.js na raiz do projeto com: module.exports = 'test-file-stub';
    "\\.(jpg|jpeg|png|gif|webp)$": "<rootDir>/__mocks__/fileMock.js",

    // Mapeia importações de SVGs.
    // Se você importa SVGs como URLs (ex: <img src={mySvgUrl} />):
    "\\.svg$": "<rootDir>/__mocks__/fileMock.js",
    // Se você importa SVGs como componentes React (comum com Vite via vite-plugin-svgr, ex: import MyIcon from './icon.svg?react'):
    // Crie um arquivo __mocks__/svgMock.js:
    // import React from 'react';
    // const SvgrMock = React.forwardRef((props, ref) => <span ref={ref} {...props} />);
    // export const ReactComponent = SvgrMock;
    // export default SvgrMock;
    "\\.svg\\?react$": "<rootDir>/__mocks__/svgMock.js",

    // Mapeia path aliases configurados no Vite (vite.config.js) e tsconfig.json/jsconfig.json.
    // Ajuste o padrão para corresponder à sua configuração (ex: se você usa '@components/*' etc.).
    // Exemplo para um alias '@' que aponta para 'src':
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Extensões de arquivo que o Jest deve procurar ao resolver módulos.
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  // Padrões que o Jest usa para detectar arquivos de teste.
  // Os padrões abaixo são os defaults do Jest e geralmente não precisam ser especificados
  // a menos que você queira alterá-los. Eles cobrem:
  // - arquivos em pastas __tests__
  // - arquivos com sufixo .test ou .spec
  // testMatch: [
  //   '**/__tests__/**/*.[jt]s?(x)',
  //   '**/?(*.)+(spec|test).[jt]s?(x)',
  // ],

  // Limpa mocks automaticamente entre cada teste. Boa prática para evitar vazamento de estado entre testes.
  clearMocks: true,

  // Coleta de cobertura de código.
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Inclui todos os arquivos em src
    "!src/**/*.d.ts", // Exclui arquivos de definição TypeScript
    "!src/**/index.{js,jsx,ts,tsx}", // Exclui arquivos 'index' (barrel files), se desejar
    "!src/main.{js,jsx,ts,tsx}", // Exclui o ponto de entrada principal da aplicação Vite
    "!src/vite-env.d.ts", // Exclui tipos de ambiente do Vite
    "!src/setupTests.{js,ts}", // Exclui o próprio arquivo de setup de testes
    "!**/__mocks__/**", // Exclui a pasta de mocks
    // Adicione aqui outros padrões para excluir da cobertura, se necessário
    // (ex: constantes, tipos, etc.)
  ],
  coverageDirectory: "coverage", // Pasta onde os relatórios de cobertura serão gerados
  coverageReporters: ["text", "lcov", "json-summary", "clover"], // Formatos do relatório

  // Opcional: Diretórios que o Jest deve ignorar ao procurar por testes ou transformar arquivos.
  // testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  // transformIgnorePatterns: [
  //   '/node_modules/', // Por padrão, o Jest não transpila node_modules
  //   '\\.pnp\\.[^\\/]+$',
  // ],

  // Opcional: Para melhorar a experiência no modo watch
  // Requer instalar: npm install --save-dev jest-watch-typeahead
  // watchPlugins: [
  //   'jest-watch-typeahead/filename',
  //   'jest-watch-typeahead/testname',
  // ],
};
