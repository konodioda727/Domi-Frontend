import React from "react";

export type applicationTaskState = 'pending' | 'success' | 'fail'
export interface TaskElemProps {
  children?: React.ReactNode,
  state?: applicationTaskState
}
