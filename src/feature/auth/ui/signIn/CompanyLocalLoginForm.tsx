import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { FormContainer } from '@/components/form/FormContainer';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createErrorMessage } from '@/entities/errors';
import { authFormPresentation } from '@/feature/auth/presentation/authFormPresentation';
import { authInputPresentation } from '@/feature/auth/presentation/authInputPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const CompanyLocalLogInForm = ({
  setShowSignUpModal,
}: {
  setShowSignUpModal(input: boolean): void;
}) => {
  const [responseMessage, setResponseMessage] = useState('');

  const { localSignIn, isPending } = useLocalSignIn({
    setShowSignUpModal,
    setResponseMessage,
  });
  const { inputStates, formStates } = authFormPresentation.useValidator({
    authInputPresentation,
  });
  const { mail, password } = inputStates;

  const blockButton = mail.value.trim() === '' || password.value.trim() === '';

  const onSubmit = () => {
    if (formStates.mail.isError) {
      setResponseMessage('잘못된 메일 형식입니다.');
      return;
    }
    if (formStates.password.isError) {
      setResponseMessage('비밀번호 형식이 잘못되었습니다.');
      return;
    }
    localSignIn({
      email: formStates.mail.value,
      password: formStates.password.value,
    });
  };

  return (
    <>
      <FormContainer id="SignInForm" handleSubmit={onSubmit}>
        <div className="flex flex-col gap-[10px]">
          <Input
            id="email"
            value={mail.value}
            onChange={(e) => {
              mail.onChange(e.target.value);
            }}
            placeholder="intern-hasha@gmail.com"
            disabled={isPending}
          />
          <Input
            id="password"
            type="password"
            value={password.value}
            onChange={(e) => {
              password.onChange(e.target.value);
            }}
            placeholder="비밀번호"
            disabled={isPending}
            className="mt-1"
          />
          {responseMessage !== '' && (
            <FormErrorResponse>{responseMessage}</FormErrorResponse>
          )}
        </div>
        <div className="flex flex-col">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || blockButton}
          >
            로그인
          </Button>
        </div>
      </FormContainer>
    </>
  );
};

const useLocalSignIn = ({
  setShowSignUpModal,
  setResponseMessage,
}: {
  setShowSignUpModal(input: boolean): void;
  setResponseMessage(input: string): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);

  const { toMain } = useRouteNavigation();

  const { mutate: localSignIn, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return authService.signIn({
        email,
        password,
      });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toMain({});
      } else {
        if (response.code === 'USER_004') {
          setShowSignUpModal(true);
          return;
        }
        if (response.code === 'AUTH_002' || response.code === 'GEN_004') {
          setResponseMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
          return;
        }
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage('로그인에 실패했습니다. 잠시 후에 다시 실행해주세요.');
    },
  });

  return { localSignIn, isPending };
};
