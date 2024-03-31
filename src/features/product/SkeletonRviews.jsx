import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonReviews({ cards = 3 }) {
  return (
    <div className="flex flex-col gap-10">
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex gap-3 items-start">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div>
                <Skeleton height="20px" width="10rem" />
                <Skeleton height="15px" width="7rem" />
              </div>
            </div>
            <Skeleton height="22px" width="10rem" />
            <Skeleton height="22px" width="35rem" />
            <Skeleton height="22px" width="15rem" />

            <div className="flex items-center gap-2">
              <Skeleton height="23px" width="4rem" />
              <Skeleton height="23px" width="4rem" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default SkeletonReviews;
