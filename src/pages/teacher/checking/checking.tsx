import SignatureCanvas from "@/components/signature/signature";
import React, {useRef} from "react";
import './index.less'


const TeacherChecking: React.FC=()=>{
  const signRef = useRef(null);
      return(

        <SignatureCanvas ref={signRef}></SignatureCanvas>
    )
}
export default TeacherChecking;
