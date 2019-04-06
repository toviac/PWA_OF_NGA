const formatQuote = comment => {
  // [quote][pid=331383178,16871856,1]Reply[/pid] <b>Post by [uid=35393426]bqvc[/uid] (2019-04-06 07:56):</b><br/><br/>用某个经典的遥控器图来比喻的话<br/>其实应该是下一曲不是快进233[/quote]
  let str = comment.replace(/\[quote\]/g, '<quote>').replace(/\[\/quote\]/g, '</quote>');
  const regQuote = /\[pid=([^,]*),([^,]*),[^\]]*][^=]*=([^\]]*)\]([^[]*)[^(]*([^<]*):<\/b>/;
  while (regQuote.test(str)) {
    const [pid, tid, uid, username, time] = str.match(regQuote).slice(1, 6);
    str = str.replace(regQuote, `<a href="/conversations/${tid}/${pid}"><span class="reply-to-btn">查看</span></a>回复<a style="color:#EFB973;padding:0 4px;" href="/user/${uid}">${username}</a>${time}:`);
  }
  return str;
};

const formatReplyTo = comment => {
  // <b>Reply to [pid=331337096,16869608,1]Reply[/pid] Post by [uid=41553469]雪雨云阳[/uid] (2019-04-05 21:34)</b>
  // [pid=回复id, 主题id, 楼层]
  // /<b>Reply to \[pid=([^,]*),([^,]*),[^\]]*][^=]*=([^\]]*)\]([^[]*)[^(]*([^<]*)<\/b>/
  const regReplyTo = new RegExp(/<b>Reply to \[pid=([^,]*),([^,]*),[^\]]*][^=]*=([^\]]*)\]([^[]*)[^(]*([^<]*)<\/b>/);
  const replaceSelf = str => {
    let s = str;
    if (!regReplyTo.test(s)) return s;
    const [pid, tid, uid, username, time] = s.match(regReplyTo).slice(1, 6);
    s = s.replace(regReplyTo, `<a href="/conversations/${tid}/${pid}"><span class="reply-to-btn">查看</span></a>回复<a style="color:#EFB973;padding:0 4px;" href="/user/${uid}">${username}</a>${time}`);
    if (!regReplyTo.test(s)) return s;
    return replaceSelf(s);
  };
  return replaceSelf(comment);
};

const formatImg = comment => {
  const regImg = /\[img]([^[]*)\[\/img]/;
  let str = comment;
  while (regImg.test(str)) {
    str = str.replace(regImg, `<img src="${str.match(regImg)[1]}">`);
  }
  return str;
};

const formatUrl = comment => {
  const regUrl = /\[url=?([^\]]*)\]([^[]*)\[\/url\]/;
  let str = comment;
  while (regUrl.test(str)) {
    const [res1, res2] = str.match(regUrl).slice(1);
    str = str.replace(regUrl, `<a href="${res1 || res2}">${res2}</a>`);
  }
  return str;
};

const format = comment => {
  let temp = comment;
  temp = formatQuote(temp);
  temp = formatReplyTo(temp);
  temp = formatImg(temp);
  temp = formatUrl(temp);
  return temp;
};
export default format;
