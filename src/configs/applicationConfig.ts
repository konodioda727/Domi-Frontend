import {applicationTaskState} from "@/pages/student/application/applicationProps";

export const colorMap: { [key in applicationTaskState]: string } = {
  pending: 'rgb(178,204,209)',
  success: '#F2C43B',
  fail: '#FF5555'
}
export const imgMap: {[key in applicationTaskState]: string} = {
  success: 'https://s2.loli.net/2024/02/02/C7MPNeEL5QOsRZk.png',
  fail: 'https://s2.loli.net/2024/02/02/VZ9eNsjYDUigKEI.png',
  pending: ''
}
