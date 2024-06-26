const academys = [
  '请选择学院',
  '计算机学院',
  '人工智能教育学部',
  '心理学院',
  '经济与工商管理学院',
  '公共管理学院',
  '信息管理学院',
  '城市与环境科学学院',
  '美术学院',
  '新闻传播学院',
  '政治与国际关系学院',
  '教育学院',
  '文学院',
  '历史文化学院',
  '马克思主义学院',
  '法学院',
  '社会学院',
  '外国语学院',
  '音乐学院',
  '数学与统计学学院',
  '物理科学与技术学院',
  '化学学院',
  '生命科学学院',
  '体育学院',
];
export default academys;

export const building2AreRuleSet = (building: string) => {
  if(!building) return null
  if(building.includes('东')) return '东区'
  if(building.includes('南')) return '南湖'
  if(building.includes('元')) return '元宝山'
  if(building.includes('西')) return '西区'
  if(building.includes('国')) return '国交'
}
