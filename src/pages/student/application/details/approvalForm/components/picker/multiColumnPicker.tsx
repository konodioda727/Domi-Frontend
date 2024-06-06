import {FC, useEffect, useMemo, useState} from 'react'
import {BaseEventOrig, Picker, PickerMultiSelectorProps, Text} from "@tarojs/components";
import {areaList, bedList} from "@/configs/areaConfig";
import {fetchBuildings, fetchDorms} from "@/services/fetch";
import {buildingType, LocationType} from "@/services/fetchTypes";
import Taro from "@tarojs/taro";

const MultiColumnPicker: FC<{onPick?: (e: string[]) => void, loc: LocationType & {area: string}, disable?: boolean}> = ({onPick, disable, loc}) => {
  const [range, setRange] = useState<Array<any>>([areaList, [], [], bedList])
  const [pickerValue, setPickerValue] = useState<number[]>([-1,-1,-1,-1])
  const [buildings, setBuildings] = useState<buildingType[]>([])
  const [mem, setMem] = useState<LocationType & {area: string}>()
  const [picked, setPicked] = useState<boolean>(false)
  const selected = useMemo(() => {
    return pickerValue.map((item, index) => {
      return index > -1 && item > -1 ? range[index][item] : ''
    })
  }, [pickerValue]);
  const handleChange = (e: BaseEventOrig<PickerMultiSelectorProps.ChangeEventDetail>) => {
    const pickedData = e.detail.value.map((item, index) => range[index][item])
    if(pickedData.every((item) => item !== undefined)) {
      setPickerValue(e.detail.value)
      pickedData[3] = pickedData[3].slice(0,1)
      setPicked(true)
      onPick && onPick(pickedData)
    } else {
      Taro.showToast({
        title: '请选择详细床位号',
        icon: 'none'
      })
    }

  }
  const fetchInfo = (loc: LocationType & {area: string}) => {
    fetchBuildings({area: loc.area}).then((res) => {
      if(res && res.data.code === 0) {
        let idx = -1
        let alias = ''
        setBuildings(res.data.data)
        res.data.data.forEach((building, index) => {
          if(building.name === loc.building){
            idx = index
            alias = building.alias
          }
        })
        setRange(v => [v[0], res.data.data.map(item => item.name), [],v[3]])
        return [areaList.indexOf(loc.area), idx, alias]
      }
    }).then(resp => {
      if(resp) {
        fetchDorms({building: resp[2] as string}).then(resp2 => {
          if(resp2) {
            resp2.data.data.list.forEach((item, index) => {
              if(item === loc.room) resp[2] = index
            })
            setRange(v => [v[0], v[1], resp2.data.data.list,v[3]])
            resp.push(Number(loc.bed) - 1 || -1)
            setPickerValue(resp as number[])
          }
        })
      }
    })
  }
  useEffect(() => {
    if(!loc.bed || !loc.building || !loc.room) {
      const mem_tmp = {area: '西区', bed: '2', building: '西区1栋', room: '101'}
      if(loc.bed !== mem?.bed || loc.room !== mem?.room || loc.building !== mem?.building || loc.area !== mem?.area) {
        fetchInfo(mem_tmp)
      }
      setMem(loc)
      return;
    }
    if(loc.bed !== mem?.bed || loc.room !== mem.room || loc.building !== mem.building || loc.area !== mem.area) {
      fetchInfo(loc)
    }
    setMem(loc)

  }, [loc]);
  const handleColChange = async (e: BaseEventOrig<PickerMultiSelectorProps.ColumnChangeEventDetail> | {detail: {column: number, value: number}}) => {
    const {column, value} = e.detail
    const tmpValue = range[column][value]
    if(column === 0 ) {
      await fetchBuildings({area: tmpValue}).then((res) => {
        if(res && res.data.code === 0) {
          setPickerValue([value, -1, -1, 0])
          setBuildings(res.data.data)
         return setRange(v => [v[0], res.data.data.map(item => item.name), [],v[3]])
        }
      })
    }
    if(column === 1) {
      await fetchDorms({building: buildings!.find((building) => building?.name === tmpValue)?.alias || ''}).then(res => {
        if(res && res.data.code === 0) {
          setRange(v => [v[0], v[1], res.data.data.list, v[3]])
          setPickerValue(v => [v[0], value, -1, 0])
        }
      })
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
      {pickerValue.every((item) => item !== -1) && (picked || loc.area && loc.building) ? (
          <Text>{selected.slice(1).join('-')}</Text>
      ) : (
          <Text style={{ color: "#686868" }}>请选择</Text>
      )}
    </Picker>
  )
}

export default MultiColumnPicker
