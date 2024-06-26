import React from 'react';

export type applicationTaskState = 'pending' | 'success' | 'fail';
export interface TaskElemProps {
  children?: React.ReactNode;
  state?: applicationTaskState;
  imgList?: imgListType;
}

export type imgListType = { [key in applicationTaskState]: string }
export type applicationType = {
  submitPath: string;
  editPath: string;
  counselorPath: string;
  studentAffairPath: string;
};
