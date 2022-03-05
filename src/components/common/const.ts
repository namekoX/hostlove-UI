/**
 * 定数を指定するクラスです。
 */
export default class Const {
  // ローカル実行時のAPIのホスト
  static TEST_HOST = "http://127.0.0.1:8000/hostlove";

  // 本番時のAPIのホスト
  static PRODUCT_HOST = "https://slavesystem.info/hostlove";

  static REQ_INTERVAL = 100;

  // APIのパス
  static URLS = {
    GET_FIRST: "/get_detail_first/",
    GET_NEXT: "/get_detail_next/",
    GET_RECENT: "/get_recent_list/",
  };

  // Googleアナリティクスの管理ID（空白にすると無効化）
  static GAID = "UA-166130091-1";

  // GoogleAdSenseの管理ID（空白にすると無効化）
  static ADID = "ca-pub-3210646574890109";
  static ADSLOT = "6825408743";

  // GoogleAdsenseの広告ブロック
  static ADS = `
  <ins class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-3210646574890109"
    data-ad-slot="6825408743"
    data-ad-format="auto"
    data-full-width-responsive="true">
  </ins>`;

  // トップページのパス
  static SITE_ROOT = "/";
  static SITE_CONTACT = "/contact/";

  // タイトル
  static SITE_NAME = "ホスラブ関東版全レス表示";

  // スマホ表示にする幅
  static SMAPHO_WIDTH = 1000;
}
