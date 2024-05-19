export const IDRegex: {[name in 'teacher' | 'student']: RegExp} = {
  student: /^[0-9]{4}([0-2])[0-9]{5}$/,
  teacher: /^[0-9]{4}([6|9])[0-9]{5}$/
}
