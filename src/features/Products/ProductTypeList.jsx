import { HiOutlineHomeModern } from "react-icons/hi2";
import { LiaUmbrellaBeachSolid } from "react-icons/lia";
import { PiCastleTurret } from "react-icons/pi";
import { PiParkLight } from "react-icons/pi";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { IoBedOutline } from "react-icons/io5";
import { IoBoatOutline } from "react-icons/io5";
import { VscRadioTower } from "react-icons/vsc";

import ProductTypeLink from "./ProductTypeLink";

function ProductTypeList() {
  return (
    <ul id="buildingList" className="flex items-center gap-[4rem] h-full">
      <ProductTypeLink
        icon={<HiOutlineHomeModern size={28} />}
        label="cabins"
      />
      <ProductTypeLink icon={<PiCastleTurret size={28} />} label="castles" />
      <ProductTypeLink icon={<PiParkLight size={28} />} label="parks" />
      <ProductTypeLink
        icon={<LiaSwimmingPoolSolid size={28} />}
        label="pools"
      />
      <ProductTypeLink icon={<IoBedOutline size={28} />} label="beds" />
      <ProductTypeLink icon={<IoBoatOutline size={28} />} label="boats" />
      <ProductTypeLink icon={<VscRadioTower size={28} />} label="tower" />
      <ProductTypeLink
        icon={<LiaUmbrellaBeachSolid size={28} />}
        label="beach"
      />
    </ul>
  );
}

export default ProductTypeList;
