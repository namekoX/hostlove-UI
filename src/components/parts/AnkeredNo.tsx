import { iterateRender } from "components/common/utils";
import { BoadRow, Res } from "./BoadRow";
import { HtmlTooltip } from "./HtmlTooltip";

export const AnkeredNo = (props: { replys: Res[]; label: string }) => {
  const { replys, label } = props;

  const wrapper = (res: Res) => {
    return <BoadRow res={res} isLine={false} />;
  };

  return replys && replys.length > 0 ? (
    <HtmlTooltip
      title={
        <div className={"tooltip-inner"}>
          {iterateRender({ wrapper, array: replys, key: "res_no" })}
        </div>
      }
    >
      <div className="anker">{label}</div>
    </HtmlTooltip>
  ) : (
    <div>{label}</div>
  );
};
