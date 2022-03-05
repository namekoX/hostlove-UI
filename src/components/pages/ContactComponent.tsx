import { Br } from "components/parts/Br";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Const from "../common/const";

const ContactComponent = () => {
  return (
    <>
      <Helmet>
        <title>{Const.SITE_NAME}-使い方</title>
      </Helmet>
      <div style={{ margin: 8 }}>
        <h1>使い方</h1>
        <h2>検索の仕方</h2>
        <p>
          ホストラブ関東版のURLを入力して「展開する」ボタンを押すことで、そのスレッドの全レスを表示することができます。
        </p>
        <p>
          URLには、スレッドのトップページのURLを入力します。(末尾が1のURLです)
          <br />
          (正)https://kanto.hostlove.com/fuat/20220224163355/1
          <br />
          (誤)https://kanto.hostlove.com/fuat/20220224163355
          <br />
          (誤)https://kanto.hostlove.com/fuat/20220224163355/2
        </p>
        <p>
          初めて取得するスレッドは、すべてのページを取得するため少し時間がかかります。「展開する」ボタンを押した後に画面を閉じずに待機してください。
        </p>
        <p>2回目以降は差分だけ取得するので比較的時間はかかりません。</p>
        <br />
        <p>
          左側に全ユーザが最近検索されたスレッドの一覧が表示されます。（スマホの場合にはメニューボタン）
        </p>
        <p>
          最近検索されたスレッドのリンクを押すと、そのスレッドの内容が展開されます。
        </p>
        <h2>ポリシー</h2>
        <p>
          当サイトはホストラブ関東版の閲覧の利便性向上のために個人の趣味で作成しました。
        </p>
        <p>営利目的での運営はしておりません。</p>
        <p>
          内容についてはホストラブ様のサイトから取得をさせていただいています。
          表示ページには元のスレッドのリンクを必ず表示するようにしております。
          ホストラブ様の運営上問題がある場合、下記までご連絡をいただければ、サイト公開停止などの対応をさせていただきます。
        </p>
        <p>
          <h3>問い合わせ先</h3>
          <p>金子 紘之（かねこ ひろゆき）</p>
          <p>hiroyuki.kaneko@slavesystem.net</p>
        </p>
        <Br count={1} />
        <Link to={Const.SITE_ROOT}>トップへ戻る</Link>
      </div>
    </>
  );
};

export default ContactComponent;
