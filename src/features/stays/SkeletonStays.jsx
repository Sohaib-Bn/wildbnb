import Skeleton from "react-loading-skeleton";

function SkeletonStays() {
  return (
    <div className="px-16 py-4 grid grid-cols-[1.5fr,1fr] gap-8">
      <div className="flex flex-col gap-8">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <Skeleton height="13rem" />
            </div>
          ))}
      </div>
      <div className="flex flex-col gap-8">
        <Skeleton height="20rem" />
        <div className="grid grid-cols-2 gap-8 w-full">
          <Skeleton height="7rem" />
          <Skeleton height="7rem" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonStays;
