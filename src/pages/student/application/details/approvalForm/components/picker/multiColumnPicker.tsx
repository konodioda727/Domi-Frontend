import {FC, useEffect, useMemo, useState} from 'react'
import {BaseEventOrig, Picker, PickerMultiSelectorProps, Text} from "@tarojs/components";
import {areaList} from "@/configs/areaConfig";
import {fetchBuildings, fetchDorms} from "@/services/fetch";
import {buildingType, LocationType} from "@/services/fetchTypes";

const MultiColumnPicker: FC<{onPick?: (e: string[]) => void, loc: LocationType & {area: string}}> = ({onPick, loc}) => {
  const [range, setRange] = useState<Array<any>>([areaList, [], [], [1,2,3,4,5]])
  const [pickerValue, setPickerValue] = useState<number[]>([0,0, 0])
  const [buildings, setBuildings] = useState<buildingType[]>([])
  const selected = useMemo(() => {
    return pickerValue.map((item, index) => range[index][item])
  }, [pickerValue]);
  const handleChange = (e: BaseEventOrig<PickerMultiSelectorProps.ChangeEventDetail>) => {
    console.log('hhh',e.target)
    setPickerValue(e.detail.value)
    onPick && onPick(selected)
  }
  useEffect(() => {
    fetchBuildings({area: loc.area}).then((res) => {
      if(res && res.data.code === 0) {
        let idx = 0
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
        console.log(resp)
        fetchDorms({building: resp[2] as string}).then(resp2 => {
          if(resp2) {
            resp2.data.data.list.forEach((item, index) => {
              if(item === loc.room) resp[2] = index
            })
            setRange(v => [v[0], v[1], resp2.data.data.list,v[3]])
            resp.push(Number(loc.bed) || 0)
            setPickerValue(resp as number[])
          }
        })
      }
    })
  }, [loc]);
  const handleColChange = async (e: BaseEventOrig<PickerMultiSelectorProps.ColumnChangeEventDetail>) => {
    const {column, value} = e.detail
    const tmpValue = range[column][value]
    if(column === 0 ) {
      await fetchBuildings({area: tmpValue}).then((res) => {
        if(res && res.data.code === 0) {
          setPickerValue([value, -1, -1, -1])
          setBuildings(res.data.data)
         return setRange(v => [v[0], res.data.data.map(item => item.name), [],[]])
        }
      })
    }
    if(column === 1) {
      await fetchDorms({building: buildings!.find((building) => building?.name === tmpValue)?.alias || ''}).then(res => {
        if(res && res.data.code === 0) {
          setRange(v => [v[0], v[1], res.data.data.list, [1,2,3,4,5]])
          setPickerValue(v => [v[0], value, -1, -1])
        }
      })
    }
  }
  return (
    <Picker
      mode="multiSelector"
      range={range}
      value={pickerValue}
      onChange={e => handleChange(e)}
      onColumnChange={e => handleColChange(e)}
    >
      {selected.length ? (
          <Text>{selected.join('-')}</Text>
      ) : (
          <Text style={{ color: "#686868" }}>请选择</Text>
      )}
    </Picker>
  )
}

export default MultiColumnPicker
