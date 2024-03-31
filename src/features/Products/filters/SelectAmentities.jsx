import { useFiltersProductsContext } from "../../../context/FiltersProductsContext";
import { AMNETITIES_OPTIONS } from "../../../utils/constants";
import SelectCheckBox from "../../../ui/SelectCheckBox";

function SelectAmentities() {
  const { selectedAmentities, setSelectedAmentities } =
    useFiltersProductsContext();

  return (
    <SelectCheckBox
      options={AMNETITIES_OPTIONS}
      value={selectedAmentities}
      setValue={setSelectedAmentities}
    />
  );
}

export default SelectAmentities;
