import Const from "components/common/const";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

export const useSize = () => {
  const { width, height } = useWindowSize();
  const [isSmaPho, setIsSmaPho] = useState<boolean>();
  useEffect(() => {
    setIsSmaPho(width < Const.SMAPHO_WIDTH);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return { width, height, isSmaPho };
};
