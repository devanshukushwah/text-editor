import AdvanceSelection from "./AdvanceSelection";
import SimpleSelection from "./SimpleSelection";

export default interface DefaultUserSettings {
  selectionType: string;
  simpleSelection: SimpleSelection;
  advanceSelection: AdvanceSelection;
}
