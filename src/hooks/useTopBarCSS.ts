import {CSSProperties} from "react";
import {TopBarProps} from "@/components/pageWrap/types/pageWrap";
import {useCapsuleInfo} from "@/hooks/useCapsuleInfo";

export function useGenerateTextCSS(props: TopBarProps): CSSProperties {
  const {capsulePos} = useCapsuleInfo()
  const {pos} = props;
  const text_unchangeable: CSSProperties = {
    position: 'absolute',
    top: `${capsulePos.top}px`,
    lineHeight: `${capsulePos.height}px`,
    // fontSize: `${capsulePos.height}px`,
    color: '#fff',
  }
  const ret:Record<TopBarProps['pos'], CSSProperties> = {
    "left": {
      ...text_unchangeable,
      left: '5vw'
    },
    "leftWithButton": {
      ...text_unchangeable,
      left: '10vw'
    },
    "center": {
      ...text_unchangeable,
      left: "50%",
      transform: "translateX(-50%)"
    }
  }
  return ret[pos]
}
export function useGenerateBarCSS(): CSSProperties {
  const { capsulePos} = useCapsuleInfo()
  return  {
    position: 'absolute',
    top: 0,
    // @ts-ignore
    height: `${10 + capsulePos.bottom}px`,
    zIndex: '2',
  }
}
