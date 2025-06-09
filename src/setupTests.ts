// src/setupTests.ts
import "@testing-library/jest-dom";

// Você pode adicionar outros setups globais aqui, como:
// Exemplo: Mock para window.matchMedia (comum em componentes responsivos)
// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: jest.fn().mockImplementation(query => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(), // deprecated
//     removeListener: jest.fn(), // deprecated
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   })),
// });

// Mock para variáveis de ambiente do Vite (import.meta.env) se necessário
// Se você tiver problemas com 'import.meta.env' nos testes:
// 1. Tente passar os valores como props para os componentes testados.
// 2. Mock o módulo específico que usa a variável de ambiente.
// 3. Para um mock global (use com cautela):
// global.importMeta = {
//   env: {
//     VITE_API_URL: 'http://mocked-api-url.com',
//     // outras variáveis que seus componentes possam precisar
//   },
// };
// Atenção: Mockar 'import.meta.env' globalmente pode ser complicado
// e pode não refletir o comportamento real. É geralmente melhor
// lidar com isso no nível do componente ou módulo.
