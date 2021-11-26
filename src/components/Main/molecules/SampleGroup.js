import { createContext } from "react";

import SampleDiv from "../atoms/SampleDiv";
import SampleRefreshButton from "../atoms/SampleRefreshButton";

export const SampleContext = createContext();

export default function SampleGroup({ instType, sample, order, setIsDropped, isDropped, children }) {

  return (
    <SampleContext.Provider value={{ instType, sample, order, setIsDropped, isDropped }}>
      <div>
        {children}
      </div>
    </SampleContext.Provider>
  );
};

SampleGroup.SampleDiv = SampleDiv;
SampleGroup.SampleRefreshButton = SampleRefreshButton;
