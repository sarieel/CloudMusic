import request from "./ajax.js";

// 首页-banner
export const reqBanner = (type = 0) => {
  return request({
    url: "/banner",
    method: "get",
    data: { type }, // 0-PC 1-安卓 2-IOS 3-iPad
  });
};

// 发现-个性推荐
export const reqFound = (refresh = false, cursor) => {
  return request({
    url: "/homepage/block/page",
    method: "get",
    data: {
      refresh,
      cursor,
    },
  });
};

// 歌曲详情
export const reqSongData = (id) => {
  return request({
    url: `/song/detail?ids=${id}`,
    method: "get",
  });
};

// 歌曲URL
export const reqSongUrl = (id, level) => {
  return request({
    url: `/song/url/v1?id=${id}&level=${level}`,
    method: "get",
  });
};

// 歌单详情
export const reqListInfo = (id) => {
  return request({
    url: `/playlist/detail?id=${id}`,
  });
};

// 歌单曲目list
export const reqListUrl = (id) => {
  return request({
    url: `/playlist/track/all?id=${id}`, // 可选参数：limit offset
  });
};

// 榜单内容摘要
export const reqRankAbstract = () => {
  return request({
    url: "/toplist/detail",
  });
};

// 歌词
export const reqLyric = (id) => {
  return request({
    url: `/lyric?id=${id}`,
  });
};

// 发现-歌单
export const reqRecommendList = () => {
  return request({
    url: "/personalized",
  });
};

// 发现-精品歌单
export const reqQualityList = () => {
  return request({
    url: "/top/playlist/highquality",
  });
};

// 登录二维码key生成
export const reqQrkey = () => {
  return request({
    url: "/login/qr/key",
  });
};

// 登录二维码生成
export const reqQr = (key) => {
  return request({
    url: `/login/qr/create?key=${key}`,
  });
};

// 检测扫码状态
export const reqQrcheck = (key) => {
  return request({
    url: `/login/qr/check?key=${key}`,
  });
};
