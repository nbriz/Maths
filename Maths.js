/*
    Maths
    -----------
    by Nick Briz <nickbriz@gmail.com>
    GNU GPLv3 - https://www.gnu.org/licenses/gpl-3.0.txt
    2019

    -----------
       info
    -----------

    A vanilla JS class with Math functions not included in the JS standard
    library Math object

    -----------
       usage
    -----------

    Maths.norm(value, min, max)
    Maths.lerp(norm, min, max)
    Maths.clamp(value, min, max)
    Maths.map(value, sourceMin, sourceMax, destMin, destMax)

    Maths.dist(p1x, p1y, p2x, p2y)
    Maths.angleBtw(p1x, p1y, p2x, p2y)

    Maths.radToDeg(radians)
    Maths.degToRad(degrees)
    Maths.cartesianToPolar(x, y)
    Maths.polarToCartesian(distance, angle)

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

    Maths.shuffle(array)
    Maths.randomInt(min, max)
    Maths.randomFloat(min, max)
    Maths.random(val, val2)
    Maths.noise(x, y, z)

*/
class Maths {
  static norm (value, min, max) { return (value - min) / (max - min) }

  static lerp (norm, min, max) { return (max - min) * norm + min }

  static clamp (value, min, max) { return Math.max(min, Math.min(max, value)) }

  static map (value, sourceMin, sourceMax, destMin, destMax) {
    return this.lerp(this.norm(value, sourceMin, sourceMax), destMin, destMax)
  }

  static dist (p1x, p1y, p2x, p2y) {
    return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2))
  }

  static angleBtw (p1x, p1y, p2x, p2y) {
    return Math.atan2(p2x - p1x, p2y - p1y)
  }

  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ .
  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . conversions
  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ .

  static radToDeg (radians) {
    return radians * (180.0 / Math.PI)
  }

  static degToRad (degrees) {
    return degrees * (Math.PI / 180.0)
  }

  static cartesianToPolar (x, y) {
    var distance = Math.sqrt(x * x + y * y)
    var radians = Math.atan2(y, x)
    var degrees = radians * (180 / Math.PI)
    return { distance: distance, radians: radians, degrees: degrees }
  }

  static polarToCartesian (distance, angle) {
    var x = distance * Math.cos(angle)
    var y = distance * Math.sin(angle)
    return { x: x, y: y }
  }

  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ .
  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ .  easing
  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ .

  static easeInQuad (t) { // accelerating from zero velocity
    return t * t
  }

  static easeOutQuad (t) { // decelerating to zero velocity
    return t * (2 - t)
  }

  static easeInOutQuad (t) { // acceleration until halfway, then deceleration
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  static easeInCubic (t) { // accelerating from zero velocity
    return t * t * t
  }

  static easeOutCubic (t) { // decelerating to zero velocity
    return (--t) * t * t + 1
  }

  static easeInOutCubic (t) { // acceleration until halfway, then deceleration
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }

  static easeInQuart (t) { // accelerating from zero velocity
    return t * t * t * t
  }

  static easeOutQuart (t) { // decelerating to zero velocity
    return 1 - (--t) * t * t * t
  }

  static easeInOutQuart (t) { // acceleration until halfway, then deceleration
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
  }

  static easeInQuint (t) { // accelerating from zero velocity
    return t * t * t * t * t
  }

  static easeOutQuint (t) { // decelerating to zero velocity
    return 1 + (--t) * t * t * t * t
  }

  static easeInOutQuint (t) { // acceleration until halfway, then deceleration
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
  }

  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ ._
  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ .  randomness
  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ .

  static shuffle (a) { // via: https://stackoverflow.com/a/6274381/1104148
    let j, x, i
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = a[i]
      a[i] = a[j]
      a[j] = x
    }
    return a
  }

  static randomInt (min, max) {
    if (typeof max === 'undefined') { max = min; min = 0 }
    return Math.floor(min + Math.random() * (max - min + 1))
  }

  static randomFloat (min, max) {
    if (typeof max === 'undefined') { max = min; min = 0 }
    return min + Math.random() * (max - min)
  }

  static random (val, val2) {
    if (val instanceof Array) {
      return val[Math.floor(Math.random() * val.length)]
    } else {
      this.randomFloat(val, val2)
    }
  }

  static noise (x, y, z) { // via P5.js perlin noise
    let perlin = null
    const PERLIN_YWRAPB = 4
    const PERLIN_YWRAP = 1 << PERLIN_YWRAPB
    const PERLIN_ZWRAPB = 8
    const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB
    const PERLIN_SIZE = 4095

    const perlinOctaves = 4 // default to medium smooth
    const perlinAmpFalloff = 0.5 // 50% reduction/octave

    function scaledCosine (i) {
      return 0.5 * (1.0 - Math.cos(i * Math.PI))
    }

    y = (typeof y !== 'undefined') ? y : 0
    z = (typeof z !== 'undefined') ? z : 0

    if (perlin === null) {
      perlin = new Array(PERLIN_SIZE + 1)
      for (let i = 0; i < PERLIN_SIZE + 1; i++) {
        perlin[i] = Math.random()
      }
    }

    if (x < 0) { x = -x }
    if (y < 0) { y = -y }
    if (z < 0) { z = -z }

    let xi = Math.floor(x)
    let yi = Math.floor(y)
    let zi = Math.floor(z)
    let xf = x - xi
    let yf = y - yi
    let zf = z - zi
    let rxf, ryf

    let r = 0
    let ampl = 0.5

    let n1, n2, n3

    for (let o = 0; o < perlinOctaves; o++) {
      let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB)

      rxf = scaledCosine(xf)
      ryf = scaledCosine(yf)

      n1 = perlin[of & PERLIN_SIZE]
      n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1)
      n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE]
      n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2)
      n1 += ryf * (n2 - n1)

      of += PERLIN_ZWRAP
      n2 = perlin[of & PERLIN_SIZE]
      n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2)
      n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE]
      n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3)
      n2 += ryf * (n3 - n2)

      n1 += scaledCosine(zf) * (n2 - n1)

      r += n1 * ampl
      ampl *= perlinAmpFalloff
      xi <<= 1
      xf *= 2
      yi <<= 1
      yf *= 2
      zi <<= 1
      zf *= 2

      if (xf >= 1.0) { xi++; xf-- }
      if (yf >= 1.0) { yi++; yf-- }
      if (zf >= 1.0) { zi++; zf-- }
    }

    return r
  }
}

if (typeof module !== 'undefined') module.exports = Maths
