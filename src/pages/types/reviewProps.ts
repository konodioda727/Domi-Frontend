export interface SearchbarPrefixProps {
  searchTypes: searchType[],
  onChooseItem?: (item: searchType) => any;
}
export type searchType = {
  disp_text: string,
  query_text: string
}
