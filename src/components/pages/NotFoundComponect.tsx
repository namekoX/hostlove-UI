import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Br } from "components/parts/Br";
import Const from "components/common/const";
import { getHost } from "components/common/utils";

// 存在しないURLだった場合
const NotFoundComponect = () => {
  return (
    <>
      <Helmet>
        <title>不正なURLです</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={getHost() + "/404"} />
      </Helmet>
      <div className="notFount">
        <h1>不正なURLです</h1>
        <Br count={1} />
        <Link to={Const.SITE_ROOT}>トップへ戻る</Link>
      </div>
    </>
  );
};

export default NotFoundComponect;
