import THREE = require("three");

import { TextOptions } from "./Text2D";
import { getFontHeight } from "./utils";

export class CanvasText {

  public textWidth: number;
  public textHeight: number;

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  constructor () {
    this.textWidth = null
    this.textHeight = null

    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
  }

  get width () { return this.canvas.width }
  get height () { return this.canvas.height }

  drawText (text: string, ctxOptions: TextOptions) {
    this.ctx.font = ctxOptions.font

    const lineHeight = getFontHeight(ctxOptions.font);
    const lines = (text || "").toString().split("\n");
    this.textWidth = Math.max.apply(null, lines.map(line => Math.ceil(this.ctx.measureText(line).width * window.devicePixelRatio)));
    this.textHeight = lineHeight + lineHeight * ctxOptions.lineHeight * (lines.length - 1);

    // 2 = prevent canvas being 0 size when using empty / null text
    this.canvas.width = Math.max(2, Math.ceil(this.textWidth));
    this.canvas.height = Math.max(2, Math.ceil(this.textHeight));
    if(ctxOptions.bgColor){
      this.ctx.fillStyle = ctxOptions.bgColor
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    this.ctx.font = ctxOptions.font

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = ctxOptions.fillStyle
    if (ctxOptions.align.x === 1) this.ctx.textAlign = 'left';
    else if (ctxOptions.align.x === 0) this.ctx.textAlign = 'center';
    else this.ctx.textAlign = 'right';
    this.ctx.textBaseline = 'top';
    this.ctx.shadowColor = ctxOptions.shadowColor;
    this.ctx.shadowBlur = ctxOptions.shadowBlur;
    this.ctx.shadowOffsetX = ctxOptions.shadowOffsetX;
    this.ctx.shadowOffsetY = ctxOptions.shadowOffsetY;

    const x = this.textWidth * (0.5 - ctxOptions.align.x * 0.5);
    for (let i = 0; i < lines.length; i++) {
      this.ctx.fillText(lines[i], x, lineHeight * ctxOptions.lineHeight * i/window.devicePixelRatio);
    }
    return this.canvas
  }

}
