import { Point } from '../ui'
import { moveToMany } from './moveToMany'

export function strokeChartLine(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  canvas: HTMLCanvasElement,
  strokeStyle: CanvasGradient,
) {
  ctx.beginPath()
  moveToMany(points, ctx, canvas)

  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = Math.floor(2 * window.devicePixelRatio)
  ctx.lineJoin = 'round'
  ctx.stroke()
}
