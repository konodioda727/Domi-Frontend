import {useMemo} from "react";
import {areaList, bedList} from "@/configs/areaConfig";
import {buildingType, dormType} from "@/services/fetchTypes";
// import {fetchBuildings, fetchDorms} from "@/services/fetch";
import {fetchBuildings, fetchDorms} from "./mockPicker";
export type bedroomInfoStoreType = {
  areas: typeof areaList,
  beds: typeof bedList,
  dorms: dormType["list"],
  buildings: buildingType[],
}
type bedroomDispatchType = {
  fetchBuilding: (currentAreaIndex: number) => Promise<any>;
  fetchDorm: (currentBuildingIndex: number) => Promise<any>;
  update: () => any;
}
let _default_picker: bedroomInfoStoreType = {
  areas: areaList,
  beds: bedList,
  dorms: [],
  buildings: [],
}
let _workInProgress: bedroomInfoStoreType = _default_picker;
export const useBedroomInfoStore = (): [bedroomInfoStoreType, bedroomDispatchType] => {
  const pickerInfo = useMemo(() => {
    return _default_picker
  }, [_default_picker]);
  const dispatch: bedroomDispatchType = {
    async fetchBuilding (currentAreaIndex: number) {
      if(currentAreaIndex < 0) {
        return;
      }
      return fetchBuildings({area: pickerInfo.areas[currentAreaIndex]}).then(res => {
        if(res && res.data.code === 0) {
          _workInProgress.buildings =  res.data.data
        }
        return res.data.data
      })
    },
    async fetchDorm (currentBuildingIndex: number) {
      if(currentBuildingIndex < 0) {
        return;
      }
      const currentPickedBuilding = _workInProgress.buildings[currentBuildingIndex]
      return fetchDorms({building: currentPickedBuilding.alias}).then((res) => {
        if(res && res.data.code === 0) {
          _workInProgress.dorms = res.data.data.list
        }
        return res.data.data.list
      })
    },
    update: function() {
      _default_picker = JSON.parse(JSON.stringify(_workInProgress))
    }
  }
  return [pickerInfo, dispatch]
}
