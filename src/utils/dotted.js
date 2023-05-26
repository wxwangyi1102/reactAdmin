export const LINEHEIGHT = 50; // 单个高度
export const STARTX = 30; // 左间距
export const STARTY = 20; // 右间距
const RADIAN = 4; // 转角弧度
const MARGINL = 4; // 左链接长度

export const drawWithConnect = (ctx, i, y, ratio) => {
  const STARTXWITHRIGHT = (i + 1) * ratio + STARTX * 1.25;
  ctx.beginPath();
  ctx.moveTo(STARTXWITHRIGHT - STARTY, y);
  // q1
  ctx.lineTo(STARTXWITHRIGHT, y);

  ctx.lineTo(STARTXWITHRIGHT + RADIAN, y + RADIAN);
  // q2;
  ctx.lineTo(STARTXWITHRIGHT + RADIAN, y - RADIAN + LINEHEIGHT);
  ctx.lineTo(STARTXWITHRIGHT, y + LINEHEIGHT);
  // q3
  ctx.lineTo(STARTX + RADIAN, y + LINEHEIGHT);
  ctx.lineTo(STARTX, y + LINEHEIGHT + RADIAN * 2);
  // q4
  ctx.lineTo(STARTX, y + LINEHEIGHT * 2);

  ctx.lineTo(STARTX + RADIAN, y + LINEHEIGHT * 2);
  // end
  ctx.lineTo(STARTX + RADIAN + MARGINL, y + LINEHEIGHT * 2);

  ctx.stroke();
};
