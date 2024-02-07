import React, { Suspense } from "react";
const ImageField = React.lazy(() => import("@/components/Lists/imageField"));
import { SkeletonPost } from "@/components/loading/skeleton";

interface postType{
  id: string,
  img: string

}

interface ImageListProps {
  data: postType[];
}

function LazyImageFieldWrapper(props) {
  return (
    <Suspense fallback={<SkeletonPost />}>
      <ImageField {...props} />
    </Suspense>
  );
}

function ImageList({data}: ImageListProps) {
  return (
    <div className=" px-9  cloumns-1  min-[480px]:columns-2  md:columns-3  lg:columns-4">
      {data.map(item => (
        <LazyImageFieldWrapper key={item.id} {...item} />
      ))}
    </div>
  )
}


export default ImageList;