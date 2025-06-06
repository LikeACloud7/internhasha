import type { Agreement } from '@/entities/agreements';
import type {
  Input,
  InputForForm,
  InputWithDetailedError,
} from '@/entities/input';
import type { AuthInputPresentation } from '@/feature/auth/presentation/authInputPresentation';

type InitialFormState = {
  snuMail?: string;
  mail?: string;
  username?: string;
  password?: string;
  code?: string;
};

type AuthFormPresentation = {
  useValidator({
    initialState,
    authInputPresentation,
  }: {
    initialState?: InitialFormState;
    authInputPresentation: AuthInputPresentation;
  }): {
    inputStates: {
      snuMailPrefix: Input<string>;
      mail: Input<string>;
      username: Input<string>;
      password: InputWithDetailedError<
        string,
        {
          englishError: boolean;
          numberError: boolean;
          specialCharError: boolean;
          lengthError: boolean;
          patternError: boolean;
        }
      >;
      passwordConfirm: Input<string>;
      newPassword: InputWithDetailedError<
        string,
        {
          englishError: boolean;
          numberError: boolean;
          specialCharError: boolean;
          lengthError: boolean;
          patternError: boolean;
        }
      >;
      newPasswordConfirm: Input<string>;
      code: Input<string>;
      emailVerifySuccessCode: Input<string>;
      agreements: Input<Agreement[]>;
    };
    formStates: {
      snuMail: InputForForm<string>;
      mail: InputForForm<string>;
      username: InputForForm<string>;
      password: InputForForm<string>;
      newPassword: Input<string>;
      code: InputForForm<string>;
      emailVerifySuccessCode: InputForForm<string>;
      agreements: InputForForm<Agreement[]>;
    };
  };
};

export const authFormPresentation: AuthFormPresentation = {
  useValidator: ({ initialState, authInputPresentation }) => {
    const initialStateForInput = {
      snuMailPrefix:
        initialState?.snuMail !== undefined
          ? initialState.snuMail.split('@')[0]
          : undefined,
      mail: initialState?.mail,
      username: initialState?.username,
      password: initialState?.password,
      code: initialState?.code,
    };

    const {
      snuMailPrefix,
      mail,
      username,
      password,
      passwordConfirm,
      newPassword,
      newPasswordConfirm,
      code,
      emailVerifySuccessCode,
      agreements,
    } = authInputPresentation.useValidator({
      initialState: initialStateForInput,
    });

    return {
      inputStates: {
        snuMailPrefix,
        mail,
        username,
        password,
        passwordConfirm,
        newPassword,
        newPasswordConfirm,
        code,
        emailVerifySuccessCode,
        agreements,
      },
      formStates: {
        snuMail: {
          ...snuMailPrefix,
          value: snuMailPrefix.value + '@snu.ac.kr',
        },
        mail,
        username,
        password,
        newPassword: {
          ...newPassword,
          isError: newPassword.isError || newPassword.value === password.value,
        },
        code,
        emailVerifySuccessCode: {
          ...emailVerifySuccessCode,
          isError: emailVerifySuccessCode.value.length === 0,
        },
        agreements: {
          ...agreements,
          isError: agreements.value
            .filter((agreement) => agreement.required)
            .some((agreement) => !agreement.checked),
        },
      },
    };
  },
};
