export const areaList = ['西区','东区','元宝山','南湖','国交','东南区']

export const bedList = (() => {
  const arr: string[] = ['待确定']
  for (let i = 1; i <= 6; i++) {
    arr.push(`${i}号床`)
  }
  return arr;
})()
