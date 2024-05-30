import {FC, useEffect, useState} from 'react'
import {BaseEventOrig, Picker, PickerMultiSelectorProps, Text} from "@tarojs/components";
import {areaList} from "@/configs/areaConfig";
import {fetchBuildings, fetchDorms} from "@/services/fetch";

const MultiColumnPicker: FC = () => {
  const [range, setRange] = useState<Array<any>>([areaList, [], []])
  const [selected, setSelected] = useState<any[]>([])
  const [pickerValue, setPickerValue] = useState<number[]>([0,0, 0])
  const handleChange = (e: BaseEventOrig<PickerMultiSelectorProps.ChangeEventDetail>) => {
    console.log('hhh',e.target)
  }
  useEffect(() => {

  }, []);
  const handleColChange = async (e: BaseEventOrig<PickerMultiSelectorProps.ColumnChangeEventDetail>) => {
    const {column, value} = e.detail
    const tmpValue = range[column][value]
    if(column === 0 ) {
      // await fetchBuildings({area: tmpValue}).then((res) => {
      //   if(res && res.data.code === 0) {
      //    return setRange(v => [v[0], res.data.data.map(item => item.name), v[2]])
      //   }
      // })
      setPickerValue([value, 0, 0])
      setRange(v => [v[0], [1,2,3,4,5], v[2]])
    }
    if(column === 1) {
      await fetchDorms({building: tmpValue}).then(res => {
        if(res && res.data.code === 0) {
          setPickerValue(v => [v[1], value, 0])
          setRange(v => [v[0], v[1], res.data.data.list])
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
        <Text>{selected.map(i => i.name).join('-')}</Text>
      ) : (
        <Text style={{ color: "#686868" }}>请选择</Text>
      )}
    </Picker>
  )
}

export default MultiColumnPicker
