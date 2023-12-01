import React from "react";
import { useState } from "react";
import lessIcon from "../../assets/images/quix-less.png";
import greaterIcon from "../../assets/images/quix-greater.png";

const Delay = ({ defaultVal, minVal, maxVal }) => {
  let [delayValue, setDelayValue] = useState(defaultVal);

  const handleMangeDelayTime =(type)=>{
    if(type === 'minus' && delayValue > minVal){
      setDelayValue(delayValue - 1 )
    }
    if(type === 'plus' && delayValue < maxVal){
      setDelayValue(delayValue + 1 )
    }
  }

  return (
    <div id="quix-plusMinus-outer">
      <div id="quix-plus-minus-outer">
        <span
          id="quix-minus-elem"
          onClick={()=>handleMangeDelayTime('minus')}
        >
          <img alt="" src={lessIcon} />
        </span>
      </div>
      <input
        type="text"
        value={delayValue + "s"}
        className="quix-capture-delay"
        readOnly
      />
      <div id="quix-plus-minus-outer">
        <span
          id="quix-plus-elem"
          onClick={()=>handleMangeDelayTime('plus')}
        >
          <img alt="" src={greaterIcon} />
        </span>
      </div>
    </div>
  );
};

export default Delay;
