export type TCommandOption = {
  type: number;
  name: string;
  description: string;
  required: boolean;
  choices: {
    name: string;
    value: string;
  };
};

export type TCommand = {
  name: string;
  description: string;
  type: number;
  options?: Array<TCommandOption>;
};

const TEST_COMMAND: TCommand = {
  name: "test",
  description: "Basic command",
  type: 1,
};

const ALL_COMMANDS = [TEST_COMMAND];

export default ALL_COMMANDS;
