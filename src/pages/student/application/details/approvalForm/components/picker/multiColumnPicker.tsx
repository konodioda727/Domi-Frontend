import {FC, useEffect, useMemo, useState} from 'react'
import {BaseEventOrig, Picker, PickerMultiSelectorProps, Text} from "@tarojs/components";
import {buildingType, LocationType} from "@/services/fetchTypes";
import {
  useBedroomInfoStore
} from "@/pages/student/application/details/approvalForm/components/picker/useBedroomInfoStore";

const MultiColumnPicker: FC<{
  onPick?: (e: string[]) => void,
  loc: LocationType & {area: string},
  disable?: boolean
}> = ({onPick, disable, loc}) => {
 const [dormInfo, dispatch] = useBedroomInfoStore()
  const [pickerValue, setPickerValue] = useState<number[]>([-1, -1, -1, -1])
  const { buildings, beds, areas, dorms } = dormInfo

  const range = useMemo(() => {
    return [areas, buildings.map(building => building.name), dorms, beds]
  }, [dormInfo]);

 const selected = useMemo(() => {
    return [areas[pickerValue[0]], buildings[pickerValue[1]]?.name, dorms[pickerValue[2]], beds[pickerValue[3]]]
  }, [pickerValue, dormInfo]);

 const handleChange = (e: BaseEventOrig<PickerMultiSelectorProps.ChangeEventDetail>) => {
    console.log(e.detail.value)
    onPick && onPick(selected)
  }
  // 根据loc初始化picker
  useEffect(() => {
   const areaIndex = areas.indexOf(loc.area)
    const bedIndex = beds.indexOf(loc.bed || beds[0])
    let dormIndex = 0;
    let buildingIndex = 0;
    dispatch.fetchBuilding(areaIndex).then((buildingRes: buildingType[]) => {
      let buildingList = buildingRes.map(building => building.name)
      buildingIndex = buildingList.indexOf(loc.building || buildingList[0])
      dispatch.fetchDorm(buildingIndex).then((dormRes) => {
        console.log(dormRes, buildingIndex)
        dormIndex = dormRes?.indexOf(loc.room) || 0;
        setPickerValue([areaIndex, buildingIndex, dormIndex, bedIndex])
        dispatch.update()
      })
    })
  }, []);

  const handleColChange = async (e: BaseEventOrig<PickerMultiSelectorProps.ColumnChangeEventDetail> | {detail: {column: number, value: number}}) => {
    const {column, value} = e.detail
    setPickerValue((prev) => {
      prev[column] = value;
      // 深拷贝强制刷新
      return JSON.parse(JSON.stringify(prev))
    })
    switch (column) {
      case 0:
        dispatch.fetchBuilding(value).then(() => {
          dispatch.fetchDorm(pickerValue[1]).then(dispatch.update)
        })
        break;
      case 1:
        dispatch.fetchDorm(value).then(dispatch.update)
        break;
      default:
        break;
    }
  }
  return (
    <Picker
      mode="multiSelector"
      range={range}
      disabled={disable}
      value={pickerValue}
      onChange={e => handleChange(e)}
      onColumnChange={e => handleColChange(e)}
    >
      {pickerValue.every((item) => item !== -1)  ? (
          <Text>{selected.join('-')}</Text>
      ) : (
          <Text style={{ color: "#686868" }}>请选择</Text>
      )}
    </Picker>
  )
}

export default MultiColumnPicker
