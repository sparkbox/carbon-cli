async function mockPrompt(prompts: { name: string }[]): Promise<{}> {
  return prompts.reduce(
    (answers, p) => ({
      ...answers,
      [p.name]: `test-${p.name}`,
    }),
    {},
  );
}

function registerPrompt(): void {}

export default { prompt: mockPrompt, registerPrompt };
