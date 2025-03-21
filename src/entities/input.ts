export type Input<TInput> = {
  isError: boolean;
  value: TInput;
  onChange: (input: TInput) => void;
};

export type InputWithDetailedError<TInput> = Input<TInput> & {
  detailedError: Record<string, boolean>;
};

export type SelectInput<TSelect> = {
  isError: boolean;
  value: TSelect;
  onChange: (input: TSelect) => void;
};

export type ListInput<TElement> = {
  isError: boolean;
  value: TElement[];
  onChange: ({
    input,
    index,
    mode,
  }:
    | {
        input: TElement;
        index?: never;
        mode: 'ADD';
      }
    | {
        input: TElement;
        index: number;
        mode: 'PATCH' | 'REMOVE';
      }) => void;
};

export type InputForForm<TInput> = {
  isError: boolean;
  value: TInput;
};
