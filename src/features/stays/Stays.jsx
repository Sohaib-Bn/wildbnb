import { useUser } from "../auth/useUser";
import { useUserStays } from "./useUserStays";

import Stay from "./Stay";
import Stats from "./Stats";
import SkeletonStays from "./SkeletonStays";

function Stays() {
  const { user } = useUser();
  const { isLoading, userStays } = useUserStays(user.id);

  if (isLoading) return <SkeletonStays />;

  return (
    <div className="px-16 py-4 grid grid-cols-[1.5fr,1fr] gap-6">
      <div className="flex flex-col gap-8">
        {userStays.length
          ? userStays.map((stay) => <Stay stay={stay} key={stay.id} />)
          : "You didn't booked anything yet"}
      </div>
      <Stats stays={userStays} />
    </div>
  );
}

export default Stays;
