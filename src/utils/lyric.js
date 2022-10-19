// [00:01.000] 作曲 : 谭旋\n  ->  [{time: 1.000, text: '作曲 : 谭旋'}]
export const formatTimeToNumber = (timeString) => {
  let time = 0;
  if (timeString) {
    const splitArr = timeString.split(":").map((item) => Number(item));
    return splitArr[0] * 60 + splitArr[1];
  }
  return time;
};

export const formatLyric = (str) => {
  if (!str) return []; // 设置初始值为数组，避免报错
  let arr = str.split("\n").filter((item) => item);
  arr = arr.map((item) => {
    const splitItem = item.split("]");
    return {
      time: formatTimeToNumber(splitItem[0].slice(1)),
      str: splitItem[1].trim(),
    };
  });
  return arr;
};

// export const formatLyrics = (lyricstr) => {
//   let lyricArr = [];
//   let arr = lyricstr.split("\n");
//   arr.forEach((line) => {
//     if (/[^\s\d\[\]:.]/.test(line)) {  // 区分有无歌词
//       let time = "";
//       let str = "";
//       [time, str] = line.split("] ");
//       time = time.replace("[", "");
//       time = formatTimeToNumber(time);  // 转换为秒数
//       str = str.trim();
//       lyricArr.push({ time, str });
//     } else {
//       line = line.replace("[", "").replace("]", "");  // 去掉[]符号
//       if (line == "") return;  // 去掉最后一个空白数组
//       line = formatTimeToNumber(line);
//       lyricArr.push({ time: line });
//     }
//   });
//   return lyricArr;
// };
