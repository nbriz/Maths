# Maths

A vanilla JS class with Math functions not included in the JS standard library Math object. This repo also contians a couple of example pages for how to use the [randomness](https://nbriz.github.io/Maths/randomness.html) mthods as well as the [easing](https://nbriz.github.io/Maths/take-it-easeing.html) mthods.

```js
Maths.norm(value, min, max)
Maths.clamp(value, min, max)
Maths.lerp(valueA, valueB, t)
Maths.map(value, sourceMin, sourceMax, destMin, destMax)

Maths.dist(p1x, p1y, p2x, p2y)
Maths.angleBtw(p1x, p1y, p2x, p2y)

Maths.radToDeg(radians)
Maths.degToRad(degrees)
Maths.cartesianToPolar(x, y)
Maths.polarToCartesian(distance, angle)

Maths.shuffle(array)
Maths.randomInt(min, max)
Maths.randomFloat(min, max)
Maths.random(val, val2)
Maths.perlin()

Maths.easeInQuad(t)
Maths.easeOutQuad(t)
Maths.easeInOutQuad(t)
Maths.easeInCubic(t)
Maths.easeOutCubic(t)
Maths.easeInOutCubic(t)
Maths.easeInQuart(t)
Maths.easeOutQuart(t)
Maths.easeInOutQuart(t)
Maths.easeInQuint(t)
Maths.easeOutQuint(t)
Maths.easeInOutQuint(t)
Maths.easeInSine(t)
Maths.easeOutSine(t)
Maths.easeInOutSine(t)
Maths.easeInCirc(t)
Maths.easeOutCirc(t)
Maths.easeInOutCirc(t)
Maths.easeInElastic(t)
Maths.easeOutElastic(t)
Maths.easeInOutElastic(t)
Maths.easeInExpo(t)
Maths.easeOutExpo(t)
Maths.easeInOutExpo(t)
Maths.easeInBack(t)
Maths.easeOutBack(t)
Maths.easeInOutBack(t)
Maths.easeInBounce(t)
Maths.easeOutBounce(t)
```

the easing methods are pretty "raw", so any timing or higher level logic is up to u, for ex:
```js
// example of using one of the easing functions to get a tweened scrolling effect
function tween (from, to, i = 0) {
  if (this.tweenTimer) clearTimeout(this.tweenTimer)
  const dur = 2 // duration in seconds
  const fps = 1000 / 30 // 30 frames per second
  const inc = 1 / dur / fps
  i += inc
  if (i >= 1) return
  const pos = Maths.easeInOutQuart(i)
  const Y = Maths.map(pos, 0, 1, from, to)
  window.scrollTo(0, Y)
  this.tweenTimer = setTimeout(() => tween(from, to, i), fps)
}

tween(0, 100) // scroll from 0 to 1000 w/an easeInOutQuart
```

the perlin method returns a perlinNoise object, which first needs to be seeded && then can be used to return 1 or 2 dimensional noise from `-1` to `1`, for ex:
```js
// assuming we've got a canvas && ctx...
const perlin = Maths.perlin()
perlin.seed()
for (let x = 0; x < canvas.width; x++) {
  let y = perlin.get(x * 0.1)
  y = Maths.map(y, -1, 1, 0, canvas.height)
  ctx.lineTo(x, y)
}
ctx.stroke()
```
