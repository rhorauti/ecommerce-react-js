// src/pages/Login/Login.test.tsx (ou onde seu componente estiver)

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Login from "@pages/Auth/Login/Login"; // Ajuste o caminho conforme necessário
import { authenticateUser } from "@core/http/auth/userAuth";
// Importe as actions reais para usar nas asserções
import { getToken, hideMenuBar, setUserData, showMenuBar } from "@store/auth.store";
import React from "react";

// --- MOCKS ---

// 1. Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom") as Record<string, unknown>;
  return {
    __esModule: true, // Bom para mocks de módulos ES6
    ...originalModule,
    useNavigate: () => mockNavigate,
    Link: jest.fn(
      (props: {
        to: string | { pathname: string; search?: string; hash?: string };
        children: React.ReactNode;
        [key: string]: any;
      }) => {
        const { to, children, ...restProps } = props;
        let href = "#"; // Valor padrão
        if (typeof to === "string") {
          href = to;
        } else if (typeof to === "object" && to.pathname) {
          href = to.pathname + (to.search || "") + (to.hash || "");
        }
        // Usar React.createElement para evitar problemas de parsing JSX dentro do mock
        return React.createElement("a", { ...restProps, href }, children);
      }
    ),
  };
});

// 2. Mock da função de autenticação
// Tipamos o mock para ter os métodos como .mockResolvedValueOnce
const mockedAuthenticateUser = authenticateUser as jest.MockedFunction<typeof authenticateUser>;
jest.mock("@src/core/http/auth/userAuth"); // Isso mockará automaticamente a função authenticateUser

// 3. Mock do dispatch do Redux store
const mockDispatch = jest.fn();
jest.mock("@src/store/store", () => ({
  store: {
    dispatch: mockDispatch,
    // Mock do getState se alguma parte do seu componente ou lógica o utilizar diretamente
    // Geralmente, para testes de componentes, focamos mais no dispatch e nos efeitos
    getState: jest.fn(() => ({
      auth: { token: null, user: null, showMenuBar: true }, // Estado inicial mockado se necessário
    })),
  },
}));

// (Opcional) Mock de componentes filhos se eles tiverem lógica complexa
// ou se você quiser isolar totalmente o componente Login.
// Para este caso, vamos assumir que testaremos a integração com os filhos reais.
// jest.mock('@src/components/button/button', () => (props: any) => <button data-testid="mocked-button" onClick={props.emitClickEvent} disabled={props.btnIsDisabled}>{props.label}</button>);
// jest.mock('@src/components/input/input', () => (props: any) => <input data-testid={`mocked-input-${props.icon}`} placeholder={props.placeholder} onChange={(e) => props.inputValue(e.target.value)} />);
// jest.mock('@src/components/modal/modal-info', () => (props: any) => props.isModalInfoActive ? <div data-testid="mocked-modal">{props.description}<button onClick={props.closeModalInfoEvent}>Close</button></div> : null);
// jest.mock('@src/components/loading/loading', () => (props: any) => props.isLoading ? <div data-testid="mocked-loading">Loading...</div> : null);

// --- FIM DOS MOCKS ---

describe("Login Component", () => {
  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste para garantir isolamento
    mockNavigate.mockClear();
    mockedAuthenticateUser.mockClear();
    mockDispatch.mockClear();
  });

  test("deve renderizar corretamente os elementos iniciais e despachar hideMenuBar", () => {
    render(<Login />);

    // Verifica elementos visuais
    expect(screen.getByText("Bem-vindo!")).toBeInTheDocument();
    // Para os inputs, é melhor usar getByPlaceholderText se não houver um label explícito
    // ou se o componente Input não associar o <p> como <label>
    expect(screen.getByPlaceholderText("exemplo@provedor.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("***********")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Clique aqui/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Crie uma nova conta/i })).toBeInTheDocument();

    // Verifica o dispatch inicial do useEffect
    expect(mockDispatch).toHaveBeenCalledWith(hideMenuBar());
  });

  test("deve permitir o preenchimento dos campos de email e senha", async () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText("exemplo@provedor.com") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText("***********") as HTMLInputElement;

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  describe("Submissão do Formulário", () => {
    test("deve realizar o login com sucesso, despachar actions e navegar", async () => {
      const mockApiResponse = {
        date: "2025-01-02",
        status: true,
        token: "fake-jwt-token",
        message: "Login realizado com sucesso!",
        data: {
          id: "2542",
          name: "Usuário Teste",
          email: "test@example.com",
          avatar: "test-avatar.png",
        },
      };
      mockedAuthenticateUser.mockResolvedValueOnce(mockApiResponse);

      render(<Login />);

      const emailInput = screen.getByPlaceholderText("exemplo@provedor.com");
      const passwordInput = screen.getByPlaceholderText("***********");
      const loginButton = screen.getByRole("button", { name: /Entrar/i });

      await userEvent.type(emailInput, "test@example.com");
      await userEvent.type(passwordInput, "password123");
      await userEvent.click(loginButton);

      // Verifica se o loading apareceu
      expect(screen.getByTestId("loading-component")).toBeInTheDocument(); // Assumindo que <Loading> tem data-testid="loading-component"

      // Espera a chamada da API e as atualizações de estado
      await waitFor(() => {
        expect(mockedAuthenticateUser).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "password123",
        });
      });

      // Verifica se o modal de sucesso apareceu e o loading sumiu
      await waitFor(() => {
        expect(screen.getByText(mockApiResponse.message)).toBeInTheDocument(); // Mensagem do modal
      });
      expect(screen.queryByTestId("loading-component")).not.toBeInTheDocument();

      // Verifica os dispatches para o store
      expect(mockDispatch).toHaveBeenCalledWith(getToken({ token: mockApiResponse.token }));
      expect(mockDispatch).toHaveBeenCalledWith(setUserData(mockApiResponse.data));

      // Simula o fechamento do modal (ajuste o seletor conforme seu componente ModalInfo)
      // Vamos supor que ModalInfo tem um botão com role 'button' e texto 'Fechar' ou 'OK'
      const closeModalButton = screen.getByRole("button", { name: /Fechar|OK/i });
      await userEvent.click(closeModalButton);

      // Verifica a navegação e o dispatch final
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/home");
      });
      expect(mockDispatch).toHaveBeenCalledWith(showMenuBar());

      // Verifica se o modal sumiu
      expect(screen.queryByText(mockApiResponse.message)).not.toBeInTheDocument();
    });

    test("deve exibir mensagem de erro em caso de falha no login e não navegar", async () => {
      const errorMessage = "Credenciais inválidas.";
      const mockApiError = {
        response: {
          // Estrutura de erro comum do Axios
          data: {
            message: errorMessage,
          },
        },
      };
      mockedAuthenticateUser.mockRejectedValueOnce(mockApiError);

      render(<Login />);

      const emailInput = screen.getByPlaceholderText("exemplo@provedor.com");
      const passwordInput = screen.getByPlaceholderText("***********");
      const loginButton = screen.getByRole("button", { name: /Entrar/i });

      await userEvent.type(emailInput, "wrong@example.com");
      await userEvent.type(passwordInput, "wrongpassword");
      await userEvent.click(loginButton);

      expect(screen.getByTestId("loading-component")).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument(); // Modal de erro
      });
      expect(screen.queryByTestId("loading-component")).not.toBeInTheDocument();

      // Garante que as actions de sucesso e navegação não foram chamadas
      expect(mockDispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: getToken.type }));
      expect(mockDispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: setUserData.type }));
      expect(mockNavigate).not.toHaveBeenCalled();

      // Simula o fechamento do modal de erro
      const closeModalButton = screen.getByRole("button", { name: /Fechar|OK/i });
      await userEvent.click(closeModalButton);

      // Verifica se o modal de erro sumiu
      expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
      // Garante que showMenuBar não foi chamado após fechar modal de erro
      expect(mockDispatch).not.toHaveBeenCalledWith(showMenuBar());
    });
  });

  test('links de "Esqueceu a senha?" e "Crie uma nova conta" devem ter os hrefs corretos', () => {
    render(<Login />);
    // O Link mockado renderiza um <a>, então podemos pegar por role 'link'
    const recoverLink = screen.getByRole("link", { name: /Clique aqui/i });
    const signUpLink = screen.getByRole("link", { name: /Crie uma nova conta/i });

    expect(recoverLink).toHaveAttribute("href", "/password-recover");
    expect(signUpLink).toHaveAttribute("href", "/signup");
  });
});
