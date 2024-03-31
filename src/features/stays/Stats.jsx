import { HiOutlineBanknotes, HiOutlineBriefcase } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import DurationChart from "./DurationChart";

function Stats({ stays }) {
  const totalAmount = stays
    .map((stay) => stay.totalPrice)
    .reduce((price, acc) => price + acc, 0);
  const numStays = stays.length;
  return (
    <div className="">
      <div className="flex flex-col gap-6 sticky top-[var(--statics-sticky-top)]">
        <DurationChart stays={stays} />
        <div className="grid grid-cols-2 gap-6">
          <Stat
            icon={<HiOutlineBanknotes className="w-full h-full" />}
            label="Total amount"
            value={formatCurrency(totalAmount)}
            color="green"
          />
          <Stat
            icon={<HiOutlineBriefcase className="w-full h-full" />}
            label="Stays"
            value={numStays}
            color="brand"
          />
        </div>
      </div>
    </div>
  );
}

export default Stats;
