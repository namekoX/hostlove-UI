import { useState } from "react";

export type validProps = {
  name: string;
  label: string;
  require?: boolean;
};

export type useValidateProps = {
  rules: validProps[];
};

// 今回のシステムでは使うのあきらめた
export const useValidate = <T,>(props: useValidateProps) => {
  const [result, setResult] = useState<boolean>(false);
  const [msg, setMsg] = useState<string[]>([]);
  const { rules } = props;

  const check = (data: T) => {
    if (!data) return false;
    setMsg([]);
    setResult(true);
    const tempMsg = [];
    for (let key in data) {
      const rule = rules.filter((item) => item.name === key);
      if (rule && rule.length > 0) {
        const target = rule[0];
        const val = data[key];
        if (target.require) {
          // 必須チェック
          if (!val) {
            tempMsg.push(target.label + "を入力してください");
            setResult(false);
          }
        }
      }
    }
    setMsg(tempMsg);
    return result;
  };

  return { result, msg, check };
};
