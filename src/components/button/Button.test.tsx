import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button Component", () => {
  const baseClasses = ["rounded-lg", "p-2", "font-semibold", "text-white", "disabled:bg-gray-400"];

  test('deve renderizar com o label padrão "Fechar" e cor padrão (preto)', () => {
    render(<Button />);
    const buttonElement = screen.getByRole("button", { name: /Fechar/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(...baseClasses);
    expect(buttonElement).toHaveClass("bg-black", "hover:bg-black-500");
    expect(buttonElement).toBeEnabled();
  });

  test("deve renderizar com um label customizado", () => {
    const customLabel = "Salvar Alterações";
    render(<Button label={customLabel} />);
    const buttonElement = screen.getByRole("button", { name: customLabel });
    expect(buttonElement).toBeInTheDocument();
  });

  test("deve aplicar classes de cor customizadas corretamente", () => {
    const testCases = [
      { color: "blue", expectedClasses: ["bg-blue-700", "hover:bg-blue-500"] },
      { color: "green", expectedClasses: ["bg-green-700", "hover:bg-green-500"] },
      { color: "red", expectedClasses: ["bg-red-700", "hover:bg-red-500"] },
      { color: "yellow", expectedClasses: ["bg-yellow-700", "hover:bg-yellow-500"] },
      { color: "transparent", expectedClasses: ["bg-transparent", "hover:bg-gray-100"] },
      { color: "black", expectedClasses: ["bg-black", "hover:bg-black-500"] }, // Testando o default explicitamente
    ];

    testCases.forEach((testCase) => {
      // Limpa o DOM entre as renderizações do loop se necessário, ou use `render` que faz isso.
      // Se usássemos `rerender`, precisaríamos ter cuidado.
      const { unmount } = render(<Button btnColor={testCase.color} />);
      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass(...testCase.expectedClasses);
      unmount(); // Limpa o componente renderizado para o próximo caso de teste
    });
  });

  test("deve aplicar classes customizadas passadas via btnClass", () => {
    const customClasses = "mx-2 extra-padding";
    render(<Button btnClass={customClasses} />);
    const buttonElement = screen.getByRole("button");
    customClasses.split(" ").forEach((cls) => {
      expect(buttonElement).toHaveClass(cls);
    });
    expect(buttonElement).toHaveClass(...baseClasses); // Garante que as classes base ainda estão lá
  });

  test("deve estar desabilitado quando btnIsDisabled é true", () => {
    render(<Button btnIsDisabled={true} />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
    // A classe disabled:bg-gray-400 é uma classe de estado do Tailwind,
    // o atributo 'disabled' é o que funcionalmente o desabilita.
  });

  test("deve estar habilitado quando btnIsDisabled é false (ou não fornecido)", () => {
    render(<Button btnIsDisabled={false} />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeEnabled();
  });

  test("deve chamar emitClickEvent quando clicado e não está desabilitado", async () => {
    const mockEmitClickEvent = jest.fn();
    render(<Button emitClickEvent={mockEmitClickEvent} />);
    const buttonElement = screen.getByRole("button");

    await userEvent.click(buttonElement);

    expect(mockEmitClickEvent).toHaveBeenCalledTimes(1);
  });

  test("NÃO deve chamar emitClickEvent quando clicado e está desabilitado", async () => {
    const mockEmitClickEvent = jest.fn();
    render(<Button emitClickEvent={mockEmitClickEvent} btnIsDisabled={true} />);
    const buttonElement = screen.getByRole("button");

    // userEvent lida com eventos em elementos desabilitados corretamente
    // (ou seja, não dispara o evento de clique para o manipulador)
    await userEvent.click(buttonElement);

    expect(mockEmitClickEvent).not.toHaveBeenCalled();
  });

  test("deve lidar com uma cor de botão inválida (mantendo as classes base)", () => {
    render(<Button btnColor="invalid-purple-color" />);
    const buttonElement = screen.getByRole("button");

    // Verifica se as classes base ainda estão presentes
    expect(buttonElement).toHaveClass(...baseClasses);

    // Verifica se NENHUMA das classes de cor conhecidas foi aplicada
    const knownColorClassesPatterns = [
      /bg-black/,
      /bg-blue-700/,
      /bg-green-700/,
      /bg-red-700/,
      /bg-yellow-700/,
      /bg-transparent/,
    ];

    knownColorClassesPatterns.forEach((pattern) => {
      // Verifica se o className NÃO contém o padrão da classe de cor
      // Usamos uma pequena lógica aqui porque toHaveClass espera a classe exata
      // e não temos uma classe específica para "sem cor" além da ausência das outras.
      const hasKnownColorClass = Array.from(buttonElement.classList).some((cls) => pattern.test(cls));
      expect(hasKnownColorClass).toBe(false);
    });
    // Ou, de forma mais simples, se você sabe que o estado 'color' ficará vazio:
    // Supondo que um btnColor inválido resulta no estado 'color' sendo uma string vazia.
    // O className final será `rounded-lg p-2 font-semibold text-white disabled:bg-gray-400 ${btnClass} ` (com espaço no final)
    // Este teste é um pouco mais frágil se a lógica de concatenação de classes mudar.
    // O teste acima com padrões é mais robusto para verificar a ausência de classes de cor.
  });
});
