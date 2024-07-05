import {useState} from "react";
import {areaList, bedList} from "@/configs/areaConfig";
import {buildingType, dormType} from "@/services/fetchTypes";
import {fetchBuildings, fetchDorms} from "@/services/fetch";

export type bedroomInfoStoreType = {
  areas: typeof areaList,
  beds: typeof bedList,
  dorms: dormType["list"],
  buildings: buildingType[],
}
type bedroomDispatchType = {
  fetchBuilding: (currentAreaIndex: number) => Promise<any>;
  fetchDorm: (currentBuildingIndex: number) => Promise<any>;
}
const _default_picker: bedroomInfoStoreType = {
  areas: areaList,
  beds: bedList,
  dorms: [],
  buildings: [],
}
export const useBedroomInfoStore = (): [bedroomInfoStoreType, bedroomDispatchType] => {
  const [pickerInfo, setPickerInfo] = useState<bedroomInfoStoreType>(_default_picker)
  const dispatch: bedroomDispatchType = {
    fetchBuilding: async (currentAreaIndex: number) => {
      if(currentAreaIndex < 0) {
        return;
      }
      return fetchBuildings({area: pickerInfo.areas[currentAreaIndex]}).then(res => {
        if(res && res.data.code === 0) {
          setPickerInfo({...pickerInfo, buildings: res.data.data})
        }
      })
    },
    fetchDorm: async (currentBuildingIndex: number) => {
      if(currentBuildingIndex < 0) {
        return;
      }
      const currentPickedBuilding = pickerInfo.buildings[currentBuildingIndex]
      return fetchDorms({building: currentPickedBuilding.alias}).then((res) => {
        if(res && res.data.code === 0) {
          setPickerInfo({...pickerInfo, dorms: res.data.data.list})
        }
      })
    }
  }
  return [pickerInfo, dispatch]
}
