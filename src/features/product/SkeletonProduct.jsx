import Skeleton from "react-loading-skeleton";

function SkeletonProduct() {
  return (
    <div className="px-32 py-5 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Skeleton height="35px" width="12rem" />
        <div className="flex items-center gap-4">
          <Skeleton height="35px" width="6rem" />
          <Skeleton height="35px" width="6rem" />
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1.2fr] gap-10 justify-start">
        <Skeleton className="rounded-l-3xl rounded-r-[0px]" height="20rem" />
        <div className="flex flex-col gap-3">
          <Skeleton className="" height="30px" width="20rem" />
          <Skeleton className="" height="30px" width="12rem" />
          <div>
            <Skeleton className="mb-1" height="25px" count={5} />
            <Skeleton className="mb-1" height="25px" width="80%" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1.2fr] gap-10 my-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Skeleton height="30px" width="12rem" />
            <div className="flex items-center gap-2">
              <Skeleton height="30px" width="5rem" />
              <Skeleton height="30px" width="6rem" />
            </div>
          </div>
          <Skeleton height="20px" width="6rem" />
          <div className="flex items-center gap-4">
            <Skeleton height="30px" width="8rem" />
            <Skeleton height="30px" width="8rem" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonProduct;
