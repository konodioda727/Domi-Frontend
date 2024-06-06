export const dateGene = (num: number | string) => {
  const date = new Date(num)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
