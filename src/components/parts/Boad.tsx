import { iterateRender, sortArray } from "components/common/utils";
import { BoadRow, Res } from "./BoadRow";

type Props = {
  resList: Res[];
};

export const Boad = (props: Props) => {
  const { resList } = props;

  if (!resList) {
    return <></>;
  }

  const wrapper = (res: Res) => {
    return <BoadRow res={res} resList={resList} isLine />;
  };
  const sorted: Res[] = sortArray({
    option: "asc",
    array: resList,
    key: "res_no",
  }).filter((item, index, self) => {
    // name だけをリスト化する
    const nameList = self.map((item) => item.res_no);
    // 重複を削除する
    if (nameList.indexOf(item.res_no) === index) {
      return item;
    }
  });

  const regex = />>\d{1,4}\n/;

  sorted.forEach((row) => {
    const replys = sorted.filter(
      (res) => res.res.indexOf(">>" + row.res_no.toString() + "\n") !== -1
    );
    row.replys = replys;
    row.anker = row.res.match(regex);
  });
  return (
    <div className="bord">
      {iterateRender({ wrapper, array: sorted, key: "res_no" })}
    </div>
  );
};
