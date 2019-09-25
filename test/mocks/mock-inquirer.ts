interface Prompt {
  type: string;
  name: string;
}

async function mockPrompt(prompts: Prompt[]): Promise<{}> {
  return prompts.reduce(
    (answers, p) => ({
      ...answers,
      [p.name]: p.type === 'confirm' ? false : `test-${p.name}`,
    }),
    {},
  );
}

function registerPrompt(): void {}

export default { prompt: mockPrompt, registerPrompt };
