<template>
  <div class="glitch-bg">
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
const canvasRef = ref(null)
const ctx = ref(null)
let animationId
let lastGlitchTime = Date.now()

const fontSize = 16
const charWidth = 10
const charHeight = 20
const grid = { columns: 0, rows: 0 }
let letters = []

const symbols =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$&*()_+=/[]{};:<>,'.split('')

const randomChar = () => symbols[Math.floor(Math.random() * symbols.length)]
const glitchColors = ['#2b4539', '#61dca3', '#61b3dc']
const randomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)]

const hexToRgb = hex => {
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return res
    ? {
      r: parseInt(res[1], 16),
      g: parseInt(res[2], 16),
      b: parseInt(res[3], 16)
    }
    : null
}

const interpolate = (a, b, f) =>
  `rgb(${Math.round(a.r + (b.r - a.r) * f)},${Math.round(a.g + (b.g - a.g) * f)},${Math.round(a.b + (b.b - a.b) * f)})`

const calculateGrid = (width, height) => {
  return { columns: Math.ceil(width / charWidth), rows: Math.ceil(height / charHeight) }
}

const initLetters = (columns, rows) => {
  grid.columns = columns
  grid.rows = rows
  letters = Array.from({ length: columns * rows }, () => ({
    char: randomChar(),
    color: randomColor(),
    targetColor: randomColor(),
    progress: 1
  }))
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const parent = canvas.parentElement
  const w = parent.offsetWidth || window.innerWidth
  const h = parent.offsetHeight || window.innerHeight

  const dpr = window.devicePixelRatio || 1
  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`

  ctx.value.setTransform(dpr, 0, 0, dpr, 0, 0)

  const { columns, rows } = calculateGrid(w, h)
  initLetters(columns, rows)
}

const draw = () => {
  if (!ctx.value) return
  const canvas = canvasRef.value
  ctx.value.clearRect(0, 0, canvas.width, canvas.height)
  ctx.value.font = `${fontSize}px monospace`
  ctx.value.textBaseline = 'top'

  letters.forEach((l, i) => {
    const x = (i % grid.columns) * charWidth
    const y = Math.floor(i / grid.columns) * charHeight
    ctx.value.fillStyle = l.color
    ctx.value.fillText(l.char, x, y)
  })
}

const updateLetters = () => {
  const count = Math.max(1, letters.length * 0.05)
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * letters.length)
    const l = letters[idx]
    if (!l) continue
    l.char = randomChar()
    l.targetColor = randomColor()
    l.progress = 0
  }
}

const smoothColors = () => {
  let redraw = false
  letters.forEach(l => {
    if (l.progress < 1) {
      l.progress += 0.05
      const a = hexToRgb(l.color)
      const b = hexToRgb(l.targetColor)
      if (a && b) {
        l.color = interpolate(a, b, l.progress)
        redraw = true
      }
    }
  })
  if (redraw) draw()
}

const animate = () => {
  const now = Date.now()
  if (now - lastGlitchTime > 50) {
    updateLetters()
    draw()
    lastGlitchTime = now
  }
  smoothColors()
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  ctx.value = canvasRef.value.getContext('2d')
  resizeCanvas()
  animate()
  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
.glitch-bg {
  position: absolute;
  inset: 0;
  background: black;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>