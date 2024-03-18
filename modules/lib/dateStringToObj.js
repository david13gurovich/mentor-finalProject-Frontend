


export function dateStringToObj(dateString) {
  const dateObj = new Date(dateString);
  const emptyObj = {
    [dateObj.toString()]: {},
  };
  const returnObj = {
    $D: dateObj.getDate(),
    $L: "en",
    $H: 0,
    $M: dateObj.getMonth(),
    $W: dateObj.getDay(),
    $d: dateObj.toJSON(),
    $m: dateObj.getMinutes(),
    $ms: dateObj.getMilliseconds() + 1,
    $s: dateObj.getSeconds(),
    $u: 0,
    $x: {},
    $y: dateObj.getFullYear(),
  };

  return returnObj;
}