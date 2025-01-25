import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { CreatePostForm } from '@/feature/post';

export const CreatePostPage = () => {
  return (
    <div>
      <GlobalNavigationBar />
      <h1>채용 공고 작성하기</h1>
      <CreatePostForm />
    </div>
  );
};
