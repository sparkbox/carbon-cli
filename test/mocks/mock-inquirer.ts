interface Prompt {
  type: string;
  name: string;
}

async function mockPrompt(prompts: Prompt[]): Promise<{}> {
  return prompts.reduce((answers, prompt) => {
    let promptValue;
    switch (prompt.type) {
      case 'confirm':
        promptValue = false;
        break;
      case 'input':
        promptValue = `test-${prompt.name}`;
        break;
      case 'autocomplete':
        promptValue = 'test-autocomplete';
    }
    return { ...answers, [prompt.name]: promptValue };
  }, {});
}

function registerPrompt(): void {}

export default { prompt: mockPrompt, registerPrompt };
