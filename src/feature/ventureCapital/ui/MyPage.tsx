import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const MyPage = () => {
  const { myInfoData } = useMyInfo();

  // if (myInfoData === undefined) {
  //   return <div>로딩중...</div>;
  // }

  if (myInfoData?.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  // const { name, snuMail, phoneNumber } = myInfoData.data;

  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        {myInfoData !== undefined ? (
          <div className="flex flex-col gap-2 p-4">
            <p className="border-b-[1px] p-2">이름: {myInfoData.data.name}</p>
            <p className="border-b-[1px] p-2">
              스누메일: {myInfoData.data.snuMail}
            </p>
            <p className="border-b-[1px] p-2">
              전화번호: {myInfoData.data.phoneNumber}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-4">
            <p className="border-b-[1px] p-2">
              <Skeleton className="h-6 w-full" />
            </p>
            <p className="border-b-[1px] p-2">
              <Skeleton className="h-6 w-full" />
            </p>
            <p className="border-b-[1px] p-2">
              <Skeleton className="h-6 w-full" />
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {/* 정보 수정 버튼 */}
        <Button variant="outline" className="flex-1">
          정보 수정하기
        </Button>

        {/* 회원 탈퇴 버튼 */}
        <Button variant="destructive" className="flex-1">
          회원 탈퇴하기
        </Button>
      </div>
    </div>
  );
};

const useMyInfo = () => {
  const { token } = useGuardContext(TokenContext);
  const { userService } = useGuardContext(ServiceContext);
  const { data: myInfoData } = useQuery({
    queryKey: ['userService', 'getMyInfo', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return userService.getMyInfo({ token: t });
    },
    enabled: token !== null,
  });

  return { myInfoData };
};
