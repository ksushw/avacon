<script setup lang="ts">

import { ref, watchEffect } from 'vue';

const canvas = ref<HTMLCanvasElement>()

function random(n: number) {
  return Math.floor(Math.random() * n) + 1;
}

class Canvas {
  public elm: HTMLCanvasElement
  public canvasCtx: CanvasRenderingContext2D | null
  public width: number
  public height: number
  public children: any[]

  constructor(elm: HTMLCanvasElement) {
    this.elm = elm
    this.canvasCtx = this.elm.getContext('2d');
    this.width = this.elm.width
    this.height = this.elm.height
    this.children = []

    this.init()
  }

  init () {
    this.resize(true);
    this.animate();
  }

  resize (bool: boolean) {
    this.width = this.elm.width = bool ? (this.elm.parentNode as any).clientWidth * 3 : window.innerWidth * 3;
    this.height = this.elm.height = bool ? (this.elm.parentNode as any).clientHeight * 3 : window.innerHeight * 3;
  }

  clear() {
    this.canvasCtx?.clearRect(0, 0, this.width, this.height);
  }

  addChild (child: any) {
    this.children.push(child);
  }

  removeChild (num: number) {
    this.children.splice(num, 1);
  }

  rendering () {
    this.clear();
    const limit = this.children.length;
    for (let i = limit - 1 ; i >= 0 ; i--) {
      const child = this.children[i];
      if (child.draw(this.canvasCtx)) {
        this.removeChild(i);
      }
    }
  }

  createGoldDust (num: number, x1: number, y1: number, x2: number, y2: number) {
    const colors = ["#d9c79e", "#b78c58", "#cfae81"];
    for (let i = 0 ; i < num ; i++) {
      const x_pos = Math.floor(Math.random() * (x2 - x1)) + x1;
      const y_pos = Math.floor(Math.random() * (y2 - y1)) + y1;
      this.addChild(new GoldDust(
        this,
        x_pos,
        y_pos,
        0.2,
        { x: random(360), y: random(360), z: random(360) },
        { x: random(10), y: random(10), z: random(10) },
        random(5),
        colors[random(3)-1]
      ));
    }
  }
  animate () {
    const _this = this;

    if (Math.random() > 0.15 && this.children.length < 1000) {
      this.createGoldDust(50, 1, 1, this.width, 600);
    }
    this.rendering();

    window.requestAnimationFrame(function () {
      _this.animate();
    })
  }
}

class GoldDust {
  public gr = 10
  public phase = 0
  public parent: Canvas
  public x_pos: number
  public y_pos: number
  public scale: number
  public direction: any
  public rotate: any
  public wind: number
  public color: string
  constructor(parent: Canvas, x_pos: number, y_pos: number, scale: number, direction: any, rotate: any, wind: number, color: string) {
    this.parent = parent
    this.x_pos = x_pos
    this.y_pos = y_pos
    this.scale = scale
    this.direction = direction
    this.rotate = rotate
    this.wind = wind
    this.color = color
  }

  draw (ctx: any) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x_pos, this.y_pos);

    ctx.rotate(this.direction.y / 100 * Math.PI);
    ctx.scale(this.scale, this.scale);
    ctx.fillStyle = this.color;

    const x_rad = Math.cos(this.direction.x * Math.PI / 100);
    const z_rad = Math.cos(this.direction.z * Math.PI / 100);
    ctx.moveTo(-6 * z_rad, -10 * x_rad);
    ctx.bezierCurveTo(-10 * z_rad, 0, -5 * z_rad, 10 * x_rad, 0, 10 * x_rad);
    ctx.bezierCurveTo(0, 0, 0, 0, -1 * z_rad, -1 * x_rad);
    ctx.fill();
    ctx.restore();

    return this.moveGoldDust();
  }

  moveGoldDust () {
    if (this.phase === 0) {
      const ground = 1 + (this.scale / 10);
      if (this.y_pos > this.parent.height * ground) {
        this.gr = 0;
        this.wind = 0;
        this.rotate.x = 0;
        this.rotate.y = 0;
        this.rotate.z = 0;
        this.phase = 1;
      }
    } else if (this.phase === 2) {
      if (this.gr > -3) this.gr += this.gr / 10;
    }

    this.y_pos = this.y_pos + (this.gr * this.scale) / 0.5;
    this.direction.x += this.rotate.x / 3;
    this.direction.y += this.rotate.y / 3;
    this.direction.z += this.rotate.z / 3;
    if (this.x_pos > this.parent.width) return true;
    return this.y_pos > this.parent.height / 2;
  }
}

watchEffect(() => {
  if (canvas.value) {
    new Canvas(canvas.value);
  }
})
</script>

<template>
  <div class="golddust">
    <canvas ref="canvas" width="100%" height="300px"></canvas>
  </div>
</template>

<style scoped lang="scss">
.golddust{
  position:fixed;
  bottom:-200px;
  left:0;
  width:100%;
  height:100%;
  pointer-events:none;
  overflow: hidden;
  z-index:999;
  transform: rotate(180deg)
}
</style>