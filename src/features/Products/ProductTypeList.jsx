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
    <ul id="buildingList" className="flex items-center gap-[3.6rem] h-full">
      <ProductTypeLink icon={<HiOutlineHomeModern />} label="cabins" />
      <ProductTypeLink icon={<PiCastleTurret />} label="castles" />
      <ProductTypeLink icon={<PiParkLight />} label="parks" />
      <ProductTypeLink icon={<LiaSwimmingPoolSolid />} label="pools" />
      <ProductTypeLink icon={<IoBedOutline />} label="beds" />
      <ProductTypeLink icon={<IoBoatOutline />} label="boats" />
      <ProductTypeLink icon={<VscRadioTower />} label="tower" />
      <ProductTypeLink icon={<LiaUmbrellaBeachSolid />} label="beach" />
    </ul>
  );
}

export default ProductTypeList;
