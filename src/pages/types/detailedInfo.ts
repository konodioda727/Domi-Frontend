export interface DetailedInfoProps {
  text: string,
  navURL: string,
  onSubmit?: (...args: any) => any,
  inputs: {
    placeHolder: string,
    tag: string
  }[]
}
