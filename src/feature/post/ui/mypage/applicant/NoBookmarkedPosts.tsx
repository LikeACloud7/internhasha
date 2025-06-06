import { Button } from '@/components/ui/button';
import { ICON_SRC } from '@/entities/asset';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const NoBookMarkedPosts = () => {
  const { toMain } = useRouteNavigation();

  const handleButtonClick = () => {
    toMain({});
  };

  return (
    <div className="flex flex-col items-center gap-8 rounded-lg bg-white px-6 py-6 text-grey-900 sm:px-[44px] sm:py-[48px]">
      <div className="flex flex-col items-center gap-1 sm:flex-row">
        <div className="w-full max-w-[220px]">
          <img src={ICON_SRC.SKELETON} className="object-cover" />
        </div>
        <div className="flex w-full max-w-[289px] flex-col gap-[10px] text-center">
          <h2 className="whitespace-pre-wrap text-22 font-bold">
            아직 저장된 공고가 없어요!
          </h2>
          <div>
            <p>
              관심 있는 공고를 저장하면 이곳에서 빠르게 다시 확인할 수 있어요.
            </p>
          </div>
        </div>
      </div>
      <Button onClick={handleButtonClick} className="w-full max-w-[310px]">
        공고 확인하기
      </Button>
    </div>
  );
};
