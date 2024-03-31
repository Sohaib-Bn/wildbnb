import { useFiltersProductsContext } from "../../../context/FiltersProductsContext";
import SelectCheckBox from "../../../ui/SelectCheckBox";
import { AMNETITIES_OPTIONS } from "../../../utils/constants";

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
