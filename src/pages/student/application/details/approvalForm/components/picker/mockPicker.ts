export const fetchBuildings = (props:{area: string}) => {
  return new Promise<{data: {data: {name: string, alias: string}[], code: number}, code: number}>((resolve, _) => {
    if(props.area === '南湖') resolve({
      data:
        {
          data: [{name: '南八', alias: '123'}, {name: '南九', alias: '456'}, {name: '南十', alias: '789'}],
          code: 0
        },
      code: 0
    })
    else resolve({data:{data: [{name: '1', alias: '1'},{name: '2', alias: '2'},{name: '3', alias: '3'}], code: 0}, code: 0})
  })
}
export const fetchDorms = (props:{building: string}) => {
  return new Promise<{data: {data:{list: string[], sum: number}, code: number}, code: number}>((resolve, _) => {
    if(props.building === '456') resolve({
      data:
        {
          data: {
            list: ['1','23','456','567567'],
            sum: 4
          },
          code: 0
        },
      code: 0
    })
    else resolve({data:{ data: {
          list: ['hoide','waef','aef','5675awef67','7758'],
          sum: 4
        }, code: 0}, code: 0})
  })
}
