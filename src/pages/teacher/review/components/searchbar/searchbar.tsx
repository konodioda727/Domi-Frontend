import { searchTypeItems } from '@/configs/searchbarConfig';
import { SearchbarPrefixProps, searchType } from '@/pages/types/reviewProps';
import { autoKey } from '@/utils/keyGenerator';
import { Image, Input, View, ViewProps } from '@tarojs/components';
import React, { useState } from 'react';
import './searchbar.less';
import {fetchSearchItems} from "@/services/fetch";
import {SearchbarProps} from "@/pages/teacher/review/components/searchbar/types";

const Searchbar: React.FC<SearchbarProps> = (props) => {
  const {pending, onSubmit} = props
  const [inputValue, setInputValue] = useState<string>('');
  const handleSearch = () => {
    fetchSearchItems({pending: pending, cur_form_id: 0, keyword: inputValue, limit: 10}).then(res => {
      res && onSubmit && onSubmit(res.data.data)
    })
    setInputValue('');
  };
  const handleOnChooseItem = (item: searchType) => {
    console.log(item);
  };
  const handleInput = (e: any) => {
    setInputValue(e.target.value)
  }
  return (
    <>
      <View className="review-searchbar">
        <SearchbarPrefix
          searchTypes={searchTypeItems}
          onChooseItem={handleOnChooseItem}
        ></SearchbarPrefix>
        <Input className="review-searchbar-input" value={inputValue} onInput={handleInput}></Input>
        <SearchbarSuffix onClick={handleSearch}></SearchbarSuffix>
      </View>
    </>
  );
};

export default Searchbar;

const SearchbarPrefix: React.FC<SearchbarPrefixProps> = props => {
  const [showPrefixChooseList, setShowPrefixChooseList] =
    useState<boolean>(false);
  const [chosed, setChosed] = useState<searchType>(props.searchTypes[0]);
  const { searchTypes, onChooseItem } = props;
  const handlePrefixClick = () => {
    setShowPrefixChooseList(!showPrefixChooseList);
  };
  const handleChooseItem = (item: searchType) => {
    setChosed(item);
    onChooseItem && onChooseItem(item);
  };
  const handleCloseList = () => {
    setShowPrefixChooseList(false);
  };
  return (
    <>
      <View className="review-searchbar-prefix" onClick={handlePrefixClick}>
        <View className="review-search-wrap">
          <View className="review-prefix-text">{chosed.disp_text}</View>
          <Image
            src="https://s2.loli.net/2024/02/08/JZs53xBENFMQyVp.png"
            className="review-prefix-icon"
          ></Image>
        </View>
        {showPrefixChooseList && (
          <View className="review-choose-list">
            {searchTypes.map(item => (
              <View
                onClick={() => handleChooseItem(item)}
                key={autoKey.next().value as number}
                className="review-choose-list-item"
              >
                {item.disp_text}
              </View>
            ))}
          </View>
        )}
        {showPrefixChooseList && (
          <View onClick={handleCloseList} className="review-hover"></View>
        )}
      </View>
    </>
  );
};

export const SearchbarSuffix: React.FC<ViewProps> = props => {
  const { className, ...restProps } = props;
  return (
    <>
      <View className={`review-searchbar-suffix ${className}`} {...restProps}>
        <Image
          className="review-searchbar-suffix-icon"
          src="https://s2.loli.net/2024/02/08/eoYdxk45GwNO7Hr.png"
        ></Image>
      </View>
    </>
  );
};
