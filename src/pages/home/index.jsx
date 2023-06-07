import { useRef, useState, useEffect } from 'react';
import { STARTX, drawWithConnect } from '../../utils/dotted';
import { list } from './list';
import styles from './home.module.css';

const dpr = 1 || window.devicePixelRatio || 1; // 设备像素比
const MARGINX = STARTX * 1.25; // 左右间隔
const MARGINY = 2;
const clintX = 960; // 画布宽度
const clintY = clintX / 1.875; // 画布高度
const width = Math.round(clintX * dpr);
const height = Math.round(clintY * dpr);
/**
 * @param {} ctx canvas上下文
 * @param {String} blockText canvas上下文
 * @param {Number} len 作画元素总长度
 * @description 画圆角矩形，画内置文字,画圆，画三角形，画虚线
 */
const draw = (ctx, { i, j }, blockText, color, len) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.8; // 指定描边线的宽度
  ctx.font = '12px serif';
  ctx.textAlign = 'center';
  ctx.beginPath();
  ctx.setLineDash([]);
  // 矩形
  const blockX = width / 6;
  const blockY = blockX / 1.875;
  const x = i * (blockX + MARGINX);
  const y = j * 100 + MARGINY;
  const textX = (blockX + MARGINX + 32) / 2 + x;
  const circleX = MARGINX + blockX + x;
  const circleY = blockY / 2 + y + MARGINY;
  ctx.roundRect(MARGINX + x, y + MARGINY, blockX, blockY, 10);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  // 居中文本
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.fillText(blockText, textX, circleY);
  // 圆
  ctx.arc(circleX, circleY, 8, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  // 三角形
  ctx.lineWidth = 0.1; // 指定描边线的宽度
  ctx.moveTo(circleX - 3, circleY - 4);
  ctx.lineTo(circleX - 3, circleY + 4);
  ctx.lineTo(circleX + 4, circleY);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  // line
  ctx.lineWidth = 1; // 指定描边线的宽度
  ctx.strokeStyle = '#CACACA';
  ctx.setLineDash([2, 6]);
  if (i < 3) {
    ctx.beginPath();
    ctx.moveTo(circleX + 10, circleY);
    ctx.lineTo(circleX + 38, circleY);
    ctx.stroke();
    ctx.closePath();
  } else {
    const ratio = x / i;

    const index1 = j ? j * 4 - 1 : 0;
    const index2 = j ? i + 1 : i;
    const isok = index1 + index2 < list.length - 1;
    const y = circleY;
    isok && drawWithConnect(ctx, i, y, ratio);
  }
  // ctx.beginPath();
  // ctx.moveTo(0, 0);
  // ctx.lineTo(width, height);
  // ctx.stroke();
  // ctx.closePath();
};
export default function Home() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#EB4100');
  const colorList = [
    { key: '#00B955', label: '已完成', status: '0' },
    { key: '#FABE1E', label: '进行中', status: '1' },
    { key: '#EB4100', label: '未开始', status: '2' },
  ];
  const setCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    const len = Math.ceil(list.length / 4);
    // ctx.translate(0, 6);
    ctx.clearRect(0, 0, width, height);

    for (let j = 0; j < len; j++)
      for (let i = 0; i < 4; i++) {
        const index1 = j ? j * 4 - 1 : 0;
        const index2 = j ? i + 1 : i;
        let index = index1 + index2;
        const item = list[index];
        if (!item) return;
        const { key } = colorList.find((v) => v.status === item.status);
        draw(ctx, { i, j }, item.name, key || color, len);
      }
  };
  useEffect(() => {
    if (list && list.length) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.scale(dpr, dpr);
      setCanvas();
    }
  });
  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
      <div className={styles.status}>
        {colorList.map((v) => (
          <span style={{ color: v.key }} key={v.key} onClick={() => setColor(v.key)}>
            {v.label}
          </span>
        ))}
      </div>
    </div>
  );
}
