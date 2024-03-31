import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonProductCard({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="h-[20rem] flex flex-col gap-2">
        <Skeleton className="rounded-[15px]" height="200px" width="100%" />
        <div className="grow flex flex-col">
          <Skeleton className="mb-[3px]" count={3} height={20} width="100%" />
        </div>
      </div>
    ));
}

export default SkeletonProductCard;
