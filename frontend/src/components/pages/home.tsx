import ImageList from '@/components/Lists/ImgeList';
import { postData } from '@/temp';

export default function HomePage({posts}: {posts: typeof postData}) {
    return (
      <>
        <ImageList data={posts} />
      </>
    )
  }