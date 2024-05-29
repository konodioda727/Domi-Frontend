import {applicationResponseType} from "@/services/fetchTypes";

export interface SearchbarProps {
  onSubmit?: (datas: applicationResponseType[]) => void;
  pending: boolean
}
