(() => {
  // node_modules/kaplay/dist/kaplay.mjs
  var qa = Object.defineProperty;
  var i = (t18, e) => qa(t18, "name", { value: e, configurable: true });
  var ao = (() => {
    for (var t18 = new Uint8Array(128), e = 0; e < 64; e++) t18[e < 26 ? e + 65 : e < 52 ? e + 71 : e < 62 ? e - 4 : e * 4 - 205] = e;
    return (n) => {
      for (var r = n.length, o = new Uint8Array((r - (n[r - 1] == "=") - (n[r - 2] == "=")) * 3 / 4 | 0), s = 0, a = 0; s < r; ) {
        var l = t18[n.charCodeAt(s++)], u = t18[n.charCodeAt(s++)], m = t18[n.charCodeAt(s++)], c = t18[n.charCodeAt(s++)];
        o[a++] = l << 2 | u >> 4, o[a++] = u << 4 | m >> 2, o[a++] = m << 6 | c;
      }
      return o;
    };
  })();
  var H = class t {
    static {
      i(this, "Color");
    }
    r = 255;
    g = 255;
    b = 255;
    constructor(e, n, r) {
      this.r = Ue(e, 0, 255), this.g = Ue(n, 0, 255), this.b = Ue(r, 0, 255);
    }
    static fromArray(e) {
      return new t(e[0], e[1], e[2]);
    }
    static fromHex(e) {
      if (typeof e == "number") return new t(e >> 16 & 255, e >> 8 & 255, e >> 0 & 255);
      if (typeof e == "string") {
        let n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        if (!n) throw new Error("Invalid hex color format");
        return new t(parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16));
      } else throw new Error("Invalid hex color format");
    }
    static fromHSL(e, n, r) {
      if (n == 0) return new t(255 * r, 255 * r, 255 * r);
      let o = i((c, p, f) => (f < 0 && (f += 1), f > 1 && (f -= 1), f < 1 / 6 ? c + (p - c) * 6 * f : f < 1 / 2 ? p : f < 2 / 3 ? c + (p - c) * (2 / 3 - f) * 6 : c), "hue2rgb"), s = r < 0.5 ? r * (1 + n) : r + n - r * n, a = 2 * r - s, l = o(a, s, e + 1 / 3), u = o(a, s, e), m = o(a, s, e - 1 / 3);
      return new t(Math.round(l * 255), Math.round(u * 255), Math.round(m * 255));
    }
    static RED = new t(255, 0, 0);
    static GREEN = new t(0, 255, 0);
    static BLUE = new t(0, 0, 255);
    static YELLOW = new t(255, 255, 0);
    static MAGENTA = new t(255, 0, 255);
    static CYAN = new t(0, 255, 255);
    static WHITE = new t(255, 255, 255);
    static BLACK = new t(0, 0, 0);
    clone() {
      return new t(this.r, this.g, this.b);
    }
    lighten(e) {
      return new t(this.r + e, this.g + e, this.b + e);
    }
    darken(e) {
      return this.lighten(-e);
    }
    invert() {
      return new t(255 - this.r, 255 - this.g, 255 - this.b);
    }
    mult(e) {
      return new t(this.r * e.r / 255, this.g * e.g / 255, this.b * e.b / 255);
    }
    lerp(e, n) {
      return new t(Ee(this.r, e.r, n), Ee(this.g, e.g, n), Ee(this.b, e.b, n));
    }
    toHSL() {
      let e = this.r / 255, n = this.g / 255, r = this.b / 255, o = Math.max(e, n, r), s = Math.min(e, n, r), a = (o + s) / 2, l = a, u = a;
      if (o == s) a = l = 0;
      else {
        let m = o - s;
        switch (l = u > 0.5 ? m / (2 - o - s) : m / (o + s), o) {
          case e:
            a = (n - r) / m + (n < r ? 6 : 0);
            break;
          case n:
            a = (r - e) / m + 2;
            break;
          case r:
            a = (e - n) / m + 4;
            break;
        }
        a /= 6;
      }
      return [a, l, u];
    }
    eq(e) {
      return this.r === e.r && this.g === e.g && this.b === e.b;
    }
    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    toHex() {
      return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }
    toArray() {
      return [this.r, this.g, this.b];
    }
  };
  function Y(...t18) {
    if (t18.length === 0) return new H(255, 255, 255);
    if (t18.length === 1) {
      if (t18[0] instanceof H) return t18[0].clone();
      if (typeof t18[0] == "string") return H.fromHex(t18[0]);
      if (Array.isArray(t18[0]) && t18[0].length === 3) return H.fromArray(t18[0]);
    } else if (t18.length === 2) {
      if (t18[0] instanceof H) return t18[0].clone();
    } else if (t18.length === 3 || t18.length === 4) return new H(t18[0], t18[1], t18[2]);
    throw new Error("Invalid color arguments");
  }
  i(Y, "rgb");
  var uo = i((t18, e, n) => H.fromHSL(t18, e, n), "hsl2rgb");
  function ce(t18) {
    return t18 * Math.PI / 180;
  }
  i(ce, "deg2rad");
  function pt(t18) {
    return t18 * 180 / Math.PI;
  }
  i(pt, "rad2deg");
  function Ue(t18, e, n) {
    return e > n ? Ue(t18, n, e) : Math.min(Math.max(t18, e), n);
  }
  i(Ue, "clamp");
  function Ee(t18, e, n) {
    if (typeof t18 == "number" && typeof e == "number") return t18 + (e - t18) * n;
    if (t18 instanceof v && e instanceof v) return t18.lerp(e, n);
    if (t18 instanceof H && e instanceof H) return t18.lerp(e, n);
    throw new Error(`Bad value for lerp(): ${t18}, ${e}. Only number, Vec2 and Color is supported.`);
  }
  i(Ee, "lerp");
  function Re(t18, e, n, r, o) {
    return r + (t18 - e) / (n - e) * (o - r);
  }
  i(Re, "map");
  function lo(t18, e, n, r, o) {
    return Ue(Re(t18, e, n, r, o), r, o);
  }
  i(lo, "mapc");
  var v = class t2 {
    static {
      i(this, "Vec2");
    }
    x = 0;
    y = 0;
    constructor(e = 0, n = e) {
      this.x = e, this.y = n;
    }
    static fromAngle(e) {
      let n = ce(e);
      return new t2(Math.cos(n), Math.sin(n));
    }
    static fromArray(e) {
      return new t2(e[0], e[1]);
    }
    static LEFT = new t2(-1, 0);
    static RIGHT = new t2(1, 0);
    static UP = new t2(0, -1);
    static DOWN = new t2(0, 1);
    clone() {
      return new t2(this.x, this.y);
    }
    add(...e) {
      let n = y(...e);
      return new t2(this.x + n.x, this.y + n.y);
    }
    sub(...e) {
      let n = y(...e);
      return new t2(this.x - n.x, this.y - n.y);
    }
    scale(...e) {
      let n = y(...e);
      return new t2(this.x * n.x, this.y * n.y);
    }
    dist(...e) {
      let n = y(...e);
      return this.sub(n).len();
    }
    sdist(...e) {
      let n = y(...e);
      return this.sub(n).slen();
    }
    len() {
      return Math.sqrt(this.dot(this));
    }
    slen() {
      return this.dot(this);
    }
    unit() {
      let e = this.len();
      return e === 0 ? new t2(0) : this.scale(1 / e);
    }
    normal() {
      return new t2(this.y, -this.x);
    }
    reflect(e) {
      return this.sub(e.scale(2 * this.dot(e)));
    }
    project(e) {
      return e.scale(e.dot(this) / e.len());
    }
    reject(e) {
      return this.sub(this.project(e));
    }
    dot(e) {
      return this.x * e.x + this.y * e.y;
    }
    cross(e) {
      return this.x * e.y - this.y * e.x;
    }
    angle(...e) {
      let n = y(...e);
      return pt(Math.atan2(this.y - n.y, this.x - n.x));
    }
    angleBetween(...e) {
      let n = y(...e);
      return pt(Math.atan2(this.cross(n), this.dot(n)));
    }
    lerp(e, n) {
      return new t2(Ee(this.x, e.x, n), Ee(this.y, e.y, n));
    }
    slerp(e, n) {
      let r = this.dot(e), o = this.cross(e), s = Math.atan2(o, r);
      return this.scale(Math.sin((1 - n) * s)).add(e.scale(Math.sin(n * s))).scale(1 / o);
    }
    isZero() {
      return this.x === 0 && this.y === 0;
    }
    toFixed(e) {
      return new t2(Number(this.x.toFixed(e)), Number(this.y.toFixed(e)));
    }
    transform(e) {
      return e.multVec2(this);
    }
    eq(e) {
      return this.x === e.x && this.y === e.y;
    }
    bbox() {
      return new te(this, 0, 0);
    }
    toString() {
      return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
    toArray() {
      return [this.x, this.y];
    }
  };
  function y(...t18) {
    if (t18.length === 1) {
      if (t18[0] instanceof v) return new v(t18[0].x, t18[0].y);
      if (Array.isArray(t18[0]) && t18[0].length === 2) return new v(...t18[0]);
    }
    return new v(...t18);
  }
  i(y, "vec2");
  var Q = class t3 {
    static {
      i(this, "Quad");
    }
    x = 0;
    y = 0;
    w = 1;
    h = 1;
    constructor(e, n, r, o) {
      this.x = e, this.y = n, this.w = r, this.h = o;
    }
    scale(e) {
      return new t3(this.x + this.w * e.x, this.y + this.h * e.y, this.w * e.w, this.h * e.h);
    }
    pos() {
      return new v(this.x, this.y);
    }
    clone() {
      return new t3(this.x, this.y, this.w, this.h);
    }
    eq(e) {
      return this.x === e.x && this.y === e.y && this.w === e.w && this.h === e.h;
    }
    toString() {
      return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
    }
  };
  function pe(t18, e, n, r) {
    return new Q(t18, e, n, r);
  }
  i(pe, "quad");
  var Mt = class t4 {
    static {
      i(this, "Mat2");
    }
    a;
    b;
    c;
    d;
    constructor(e, n, r, o) {
      this.a = e, this.b = n, this.c = r, this.d = o;
    }
    mul(e) {
      return new t4(this.a * e.a + this.b * e.c, this.a * e.b + this.b * e.d, this.c * e.a + this.d * e.c, this.c * e.b + this.d * e.d);
    }
    transform(e) {
      return y(this.a * e.x + this.b * e.y, this.c * e.x + this.d * e.y);
    }
    get inverse() {
      let e = this.det;
      return new t4(this.d / e, -this.b / e, -this.c / e, this.a / e);
    }
    get transpose() {
      return new t4(this.a, this.c, this.b, this.d);
    }
    get eigenvalues() {
      let e = this.trace / 2, n = this.det, r = e + Math.sqrt(e * e - n), o = e - Math.sqrt(e * e - n);
      return [r, o];
    }
    eigenvectors(e, n) {
      return this.c != 0 ? [[e - this.d, this.c], [n - this.d, this.c]] : this.b != 0 ? [[this.b, e - this.a], [this.b, n - this.a]] : Math.abs(this.transform(y(1, 0)).x - e) < Number.EPSILON ? [[1, 0], [0, 1]] : [[0, 1], [1, 0]];
    }
    get det() {
      return this.a * this.d - this.b * this.c;
    }
    get trace() {
      return this.a + this.d;
    }
    static rotation(e) {
      let n = Math.cos(e), r = Math.sin(e);
      return new t4(n, r, -r, n);
    }
    static scale(e, n) {
      return new t4(e, 0, 0, n);
    }
  };
  var xt = class t5 {
    static {
      i(this, "Mat3");
    }
    m11;
    m12;
    m13;
    m21;
    m22;
    m23;
    m31;
    m32;
    m33;
    constructor(e, n, r, o, s, a, l, u, m) {
      this.m11 = e, this.m12 = n, this.m13 = r, this.m21 = o, this.m22 = s, this.m23 = a, this.m31 = l, this.m32 = u, this.m33 = m;
    }
    static fromMat2(e) {
      return new t5(e.a, e.b, 0, e.c, e.d, 0, 0, 0, 1);
    }
    toMat2() {
      return new Mt(this.m11, this.m12, this.m21, this.m22);
    }
    mul(e) {
      return new t5(this.m11 * e.m11 + this.m12 * e.m21 + this.m13 * e.m31, this.m11 * e.m12 + this.m12 * e.m22 + this.m13 * e.m32, this.m11 * e.m13 + this.m12 * e.m23 + this.m13 * e.m33, this.m21 * e.m11 + this.m22 * e.m21 + this.m23 * e.m31, this.m21 * e.m12 + this.m22 * e.m22 + this.m23 * e.m32, this.m21 * e.m13 + this.m22 * e.m23 + this.m23 * e.m33, this.m31 * e.m11 + this.m32 * e.m21 + this.m33 * e.m31, this.m31 * e.m12 + this.m32 * e.m22 + this.m33 * e.m32, this.m31 * e.m13 + this.m32 * e.m23 + this.m33 * e.m33);
    }
    get det() {
      return this.m11 * this.m22 * this.m33 + this.m12 * this.m23 * this.m31 + this.m13 * this.m21 * this.m32 - this.m13 * this.m22 * this.m31 - this.m12 * this.m21 * this.m33 - this.m11 * this.m23 * this.m32;
    }
    rotate(e) {
      let n = Math.cos(e), r = Math.sin(e), o = this.m11, s = this.m12;
      return this.m11 = n * this.m11 + r * this.m21, this.m12 = n * this.m12 + r * this.m22, this.m21 = n * this.m21 - r * o, this.m22 = n * this.m22 - r * s, this;
    }
    scale(e, n) {
      return this.m11 *= e, this.m12 *= e, this.m21 *= n, this.m22 *= n, this;
    }
    get inverse() {
      let e = this.det;
      return new t5((this.m22 * this.m33 - this.m23 * this.m32) / e, (this.m13 * this.m32 - this.m12 * this.m33) / e, (this.m12 * this.m23 - this.m13 * this.m22) / e, (this.m23 * this.m31 - this.m21 * this.m33) / e, (this.m11 * this.m33 - this.m13 * this.m31) / e, (this.m13 * this.m21 - this.m11 * this.m23) / e, (this.m21 * this.m32 - this.m22 * this.m31) / e, (this.m12 * this.m31 - this.m11 * this.m32) / e, (this.m11 * this.m22 - this.m12 * this.m21) / e);
    }
    get transpose() {
      return new t5(this.m11, this.m21, this.m31, this.m12, this.m22, this.m32, this.m13, this.m23, this.m33);
    }
  };
  var ge = class t6 {
    static {
      i(this, "Mat4");
    }
    m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(e) {
      e && (this.m = e);
    }
    static translate(e) {
      return new t6([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e.x, e.y, 0, 1]);
    }
    static scale(e) {
      return new t6([e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(e) {
      e = ce(-e);
      let n = Math.cos(e), r = Math.sin(e);
      return new t6([1, 0, 0, 0, 0, n, -r, 0, 0, r, n, 0, 0, 0, 0, 1]);
    }
    static rotateY(e) {
      e = ce(-e);
      let n = Math.cos(e), r = Math.sin(e);
      return new t6([n, 0, r, 0, 0, 1, 0, 0, -r, 0, n, 0, 0, 0, 0, 1]);
    }
    static rotateZ(e) {
      e = ce(-e);
      let n = Math.cos(e), r = Math.sin(e);
      return new t6([n, -r, 0, 0, r, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(e) {
      return this.m[12] += this.m[0] * e.x + this.m[4] * e.y, this.m[13] += this.m[1] * e.x + this.m[5] * e.y, this.m[14] += this.m[2] * e.x + this.m[6] * e.y, this.m[15] += this.m[3] * e.x + this.m[7] * e.y, this;
    }
    scale(e) {
      return this.m[0] *= e.x, this.m[4] *= e.y, this.m[1] *= e.x, this.m[5] *= e.y, this.m[2] *= e.x, this.m[6] *= e.y, this.m[3] *= e.x, this.m[7] *= e.y, this;
    }
    rotate(e) {
      e = ce(-e);
      let n = Math.cos(e), r = Math.sin(e), o = this.m[0], s = this.m[1], a = this.m[4], l = this.m[5];
      return this.m[0] = o * n + s * r, this.m[1] = -o * r + s * n, this.m[4] = a * n + l * r, this.m[5] = -a * r + l * n, this;
    }
    mult(e) {
      let n = [];
      for (let r = 0; r < 4; r++) for (let o = 0; o < 4; o++) n[r * 4 + o] = this.m[0 * 4 + o] * e.m[r * 4 + 0] + this.m[1 * 4 + o] * e.m[r * 4 + 1] + this.m[2 * 4 + o] * e.m[r * 4 + 2] + this.m[3 * 4 + o] * e.m[r * 4 + 3];
      return new t6(n);
    }
    multVec2(e) {
      return new v(e.x * this.m[0] + e.y * this.m[4] + this.m[12], e.x * this.m[1] + e.y * this.m[5] + this.m[13]);
    }
    getTranslation() {
      return new v(this.m[12], this.m[13]);
    }
    getScale() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4], n = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new v(n, e / n);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4], n = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new v(e / n, n);
      } else return new v(0, 0);
    }
    getRotation() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return pt(this.m[1] > 0 ? Math.acos(this.m[0] / e) : -Math.acos(this.m[0] / e));
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return pt(Math.PI / 2 - (this.m[5] > 0 ? Math.acos(-this.m[4] / e) : -Math.acos(this.m[4] / e)));
      } else return 0;
    }
    getSkew() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new v(Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e), 0);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new v(0, Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e));
      } else return new v(0, 0);
    }
    invert() {
      let e = [], n = this.m[10] * this.m[15] - this.m[14] * this.m[11], r = this.m[9] * this.m[15] - this.m[13] * this.m[11], o = this.m[9] * this.m[14] - this.m[13] * this.m[10], s = this.m[8] * this.m[15] - this.m[12] * this.m[11], a = this.m[8] * this.m[14] - this.m[12] * this.m[10], l = this.m[8] * this.m[13] - this.m[12] * this.m[9], u = this.m[6] * this.m[15] - this.m[14] * this.m[7], m = this.m[5] * this.m[15] - this.m[13] * this.m[7], c = this.m[5] * this.m[14] - this.m[13] * this.m[6], p = this.m[4] * this.m[15] - this.m[12] * this.m[7], f = this.m[4] * this.m[14] - this.m[12] * this.m[6], x = this.m[5] * this.m[15] - this.m[13] * this.m[7], g = this.m[4] * this.m[13] - this.m[12] * this.m[5], C = this.m[6] * this.m[11] - this.m[10] * this.m[7], b = this.m[5] * this.m[11] - this.m[9] * this.m[7], T = this.m[5] * this.m[10] - this.m[9] * this.m[6], G = this.m[4] * this.m[11] - this.m[8] * this.m[7], M = this.m[4] * this.m[10] - this.m[8] * this.m[6], R = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      e[0] = this.m[5] * n - this.m[6] * r + this.m[7] * o, e[4] = -(this.m[4] * n - this.m[6] * s + this.m[7] * a), e[8] = this.m[4] * r - this.m[5] * s + this.m[7] * l, e[12] = -(this.m[4] * o - this.m[5] * a + this.m[6] * l), e[1] = -(this.m[1] * n - this.m[2] * r + this.m[3] * o), e[5] = this.m[0] * n - this.m[2] * s + this.m[3] * a, e[9] = -(this.m[0] * r - this.m[1] * s + this.m[3] * l), e[13] = this.m[0] * o - this.m[1] * a + this.m[2] * l, e[2] = this.m[1] * u - this.m[2] * m + this.m[3] * c, e[6] = -(this.m[0] * u - this.m[2] * p + this.m[3] * f), e[10] = this.m[0] * x - this.m[1] * p + this.m[3] * g, e[14] = -(this.m[0] * c - this.m[1] * f + this.m[2] * g), e[3] = -(this.m[1] * C - this.m[2] * b + this.m[3] * T), e[7] = this.m[0] * C - this.m[2] * G + this.m[3] * M, e[11] = -(this.m[0] * b - this.m[1] * G + this.m[3] * R), e[15] = this.m[0] * T - this.m[1] * M + this.m[2] * R;
      let F = this.m[0] * e[0] + this.m[1] * e[4] + this.m[2] * e[8] + this.m[3] * e[12];
      for (let h = 0; h < 4; h++) for (let O = 0; O < 4; O++) e[h * 4 + O] *= 1 / F;
      return new t6(e);
    }
    clone() {
      return new t6([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  };
  function vn(t18, e, n, r = (o) => -Math.cos(o)) {
    return t18 + (r(n) + 1) / 2 * (e - t18);
  }
  i(vn, "wave");
  var za = 1103515245;
  var Ya = 12345;
  var co = 2147483648;
  var Wt = class {
    static {
      i(this, "RNG");
    }
    seed;
    constructor(e) {
      this.seed = e;
    }
    gen() {
      return this.seed = (za * this.seed + Ya) % co, this.seed / co;
    }
    genNumber(e, n) {
      return e + this.gen() * (n - e);
    }
    genVec2(e, n) {
      return new v(this.genNumber(e.x, n.x), this.genNumber(e.y, n.y));
    }
    genColor(e, n) {
      return new H(this.genNumber(e.r, n.r), this.genNumber(e.g, n.g), this.genNumber(e.b, n.b));
    }
    genAny(...e) {
      if (e.length === 0) return this.gen();
      if (e.length === 1) {
        if (typeof e[0] == "number") return this.genNumber(0, e[0]);
        if (e[0] instanceof v) return this.genVec2(y(0, 0), e[0]);
        if (e[0] instanceof H) return this.genColor(Y(0, 0, 0), e[0]);
      } else if (e.length === 2) {
        if (typeof e[0] == "number" && typeof e[1] == "number") return this.genNumber(e[0], e[1]);
        if (e[0] instanceof v && e[1] instanceof v) return this.genVec2(e[0], e[1]);
        if (e[0] instanceof H && e[1] instanceof H) return this.genColor(e[0], e[1]);
      }
      throw new Error("More than 2 arguments not supported");
    }
  };
  var mr = new Wt(Date.now());
  function mo(t18) {
    return t18 != null && (mr.seed = t18), mr.seed;
  }
  i(mo, "randSeed");
  function be(...t18) {
    return mr.genAny(...t18);
  }
  i(be, "rand");
  function pr(...t18) {
    return Math.floor(be(...t18));
  }
  i(pr, "randi");
  function po(t18) {
    return be() <= t18;
  }
  i(po, "chance");
  function dr(t18) {
    for (let e = t18.length - 1; e > 0; e--) {
      let n = Math.floor(Math.random() * (e + 1));
      [t18[e], t18[n]] = [t18[n], t18[e]];
    }
    return t18;
  }
  i(dr, "shuffle");
  function fo(t18, e) {
    return t18.length <= e ? t18.slice() : dr(t18.slice()).slice(0, e);
  }
  i(fo, "chooseMultiple");
  function ho(t18) {
    return t18[pr(t18.length)];
  }
  i(ho, "choose");
  function fr(t18, e) {
    return t18.pos.x + t18.width > e.pos.x && t18.pos.x < e.pos.x + e.width && t18.pos.y + t18.height > e.pos.y && t18.pos.y < e.pos.y + e.height;
  }
  i(fr, "testRectRect");
  function Wa(t18, e) {
    if (t18.p1.x === t18.p2.x && t18.p1.y === t18.p2.y || e.p1.x === e.p2.x && e.p1.y === e.p2.y) return null;
    let n = (e.p2.y - e.p1.y) * (t18.p2.x - t18.p1.x) - (e.p2.x - e.p1.x) * (t18.p2.y - t18.p1.y);
    if (n === 0) return null;
    let r = ((e.p2.x - e.p1.x) * (t18.p1.y - e.p1.y) - (e.p2.y - e.p1.y) * (t18.p1.x - e.p1.x)) / n, o = ((t18.p2.x - t18.p1.x) * (t18.p1.y - e.p1.y) - (t18.p2.y - t18.p1.y) * (t18.p1.x - e.p1.x)) / n;
    return r < 0 || r > 1 || o < 0 || o > 1 ? null : r;
  }
  i(Wa, "testLineLineT");
  function wn(t18, e) {
    let n = Wa(t18, e);
    return n ? y(t18.p1.x + n * (t18.p2.x - t18.p1.x), t18.p1.y + n * (t18.p2.y - t18.p1.y)) : null;
  }
  i(wn, "testLineLine");
  function Cn(t18, e) {
    let n = e.p2.sub(e.p1), r = Number.NEGATIVE_INFINITY, o = Number.POSITIVE_INFINITY;
    if (n.x != 0) {
      let s = (t18.pos.x - e.p1.x) / n.x, a = (t18.pos.x + t18.width - e.p1.x) / n.x;
      r = Math.max(r, Math.min(s, a)), o = Math.min(o, Math.max(s, a));
    }
    if (n.y != 0) {
      let s = (t18.pos.y - e.p1.y) / n.y, a = (t18.pos.y + t18.height - e.p1.y) / n.y;
      r = Math.max(r, Math.min(s, a)), o = Math.min(o, Math.max(s, a));
    }
    return o >= r && o >= 0 && r <= 1;
  }
  i(Cn, "testRectLine");
  function En(t18, e) {
    return e.x > t18.pos.x && e.x < t18.pos.x + t18.width && e.y > t18.pos.y && e.y < t18.pos.y + t18.height;
  }
  i(En, "testRectPoint");
  function go2(t18, e) {
    let n = Math.max(t18.pos.x, Math.min(e.center.x, t18.pos.x + t18.width)), r = Math.max(t18.pos.y, Math.min(e.center.y, t18.pos.y + t18.height));
    return y(n, r).sdist(e.center) <= e.radius * e.radius;
  }
  i(go2, "testRectCircle");
  function bo(t18, e) {
    return yo(e, new Ae(t18.points()));
  }
  i(bo, "testRectPolygon");
  function On(t18, e) {
    let n = e.sub(t18.p1), r = t18.p2.sub(t18.p1);
    if (Math.abs(n.cross(r)) > Number.EPSILON) return false;
    let o = n.dot(r) / r.dot(r);
    return o >= 0 && o <= 1;
  }
  i(On, "testLinePoint");
  function Bt(t18, e) {
    let n = t18.p2.sub(t18.p1), r = n.dot(n), o = t18.p1.sub(e.center), s = 2 * n.dot(o), a = o.dot(o) - e.radius * e.radius, l = s * s - 4 * r * a;
    if (r <= Number.EPSILON || l < 0) return false;
    if (l == 0) {
      let u = -s / (2 * r);
      if (u >= 0 && u <= 1) return true;
    } else {
      let u = (-s + Math.sqrt(l)) / (2 * r), m = (-s - Math.sqrt(l)) / (2 * r);
      if (u >= 0 && u <= 1 || m >= 0 && m <= 1) return true;
    }
    return Tn(e, t18.p1);
  }
  i(Bt, "testLineCircle");
  function hr(t18, e) {
    if (rt(e, t18.p1) || rt(e, t18.p2)) return true;
    for (let n = 0; n < e.pts.length; n++) {
      let r = e.pts[n], o = e.pts[(n + 1) % e.pts.length];
      if (wn(t18, new Te(r, o))) return true;
    }
    return false;
  }
  i(hr, "testLinePolygon");
  function Tn(t18, e) {
    return t18.center.sdist(e) < t18.radius * t18.radius;
  }
  i(Tn, "testCirclePoint");
  function $a(t18, e) {
    return t18.center.sdist(e.center) < (t18.radius + e.radius) * (t18.radius + e.radius);
  }
  i($a, "testCircleCircle");
  function $t(t18, e) {
    let n = e.pts[e.pts.length - 1];
    for (let r of e.pts) {
      if (Bt(new Te(n, r), t18)) return true;
      n = r;
    }
    return Tn(t18, e.pts[0]) ? true : rt(e, t18.center);
  }
  i($t, "testCirclePolygon");
  function yo(t18, e) {
    for (let n = 0; n < t18.pts.length; n++) if (hr(new Te(t18.pts[n], t18.pts[(n + 1) % t18.pts.length]), e)) return true;
    return !!(t18.pts.some((n) => rt(e, n)) || e.pts.some((n) => rt(t18, n)));
  }
  i(yo, "testPolygonPolygon");
  function rt(t18, e) {
    let n = false, r = t18.pts;
    for (let o = 0, s = r.length - 1; o < r.length; s = o++) r[o].y > e.y != r[s].y > e.y && e.x < (r[s].x - r[o].x) * (e.y - r[o].y) / (r[s].y - r[o].y) + r[o].x && (n = !n);
    return n;
  }
  i(rt, "testPolygonPoint");
  function gr(t18, e) {
    e = e.sub(t18.center);
    let n = ce(t18.angle), r = Math.cos(n), o = Math.sin(n), s = e.x * r + e.y * o, a = -e.x * o + e.y * r;
    return s * s / (t18.radiusX * t18.radiusX) + a * a / (t18.radiusY * t18.radiusY) < 1;
  }
  i(gr, "testEllipsePoint");
  function yn(t18, e) {
    let n = e.center.sub(t18.center), r = ce(t18.angle), o = Math.cos(r), s = Math.sin(r), a = n.x * o + n.y * s, l = -n.x * s + n.y * o;
    return gr(new _e(y(), t18.radiusX + e.radius, t18.radiusY + e.radius, 0), y(a, l));
  }
  i(yn, "testEllipseCircle");
  function xo(t18, e) {
    let n = t18.toMat2().inverse;
    return e = new Te(n.transform(e.p1.sub(t18.center)), n.transform(e.p2.sub(t18.center))), Bt(e, new Ge(y(), 1));
  }
  i(xo, "testEllipseLine");
  function Xa(t18, e) {
    if (t18.radiusX === t18.radiusY) return yn(e, new Ge(t18.center, t18.radiusX));
    if (e.radiusX === e.radiusY) return yn(t18, new Ge(e.center, e.radiusX));
    let n = new xt(1 / t18.radiusX ** 2, 0, 0, 0, 1 / t18.radiusY ** 2, 0, 0, 0, -1), r = new xt(1 / e.radiusX ** 2, 0, 0, 0, 1 / e.radiusY ** 2, 0, 0, 0, -1), o = t18.center.x, s = t18.center.y, a = e.center.x, l = e.center.y, u = ce(t18.angle), m = ce(e.angle), c = new xt(Math.cos(u), -Math.sin(u), o, Math.sin(u), Math.cos(u), s, 0, 0, 1), p = new xt(Math.cos(m), -Math.sin(m), a, Math.sin(m), Math.cos(m), l, 0, 0, 1), f = c.inverse, x = p.inverse, g = f.transpose.mul(n).mul(f), C = x.transpose.mul(r).mul(x), b = g.m11, T = g.m12, G = g.m13, M = g.m21, R = g.m22, F = g.m23, h = g.m31, O = g.m32, S = g.m33, D = C.m11, U = C.m12, k = C.m13, N = C.m21, $ = C.m22, X = C.m23, J = C.m31, W = C.m32, q = C.m33, ne = b * R * S - b * F * O - T * M * S + T * F * h + G * M * O - G * R * h, B = (b * R * q - b * F * W - b * O * X + b * S * $ - T * M * q + T * F * J + T * h * X - T * S * N + G * M * W - G * R * J - G * h * $ + G * O * N + M * O * k - M * S * U - R * h * k + R * S * D + F * h * U - F * O * D) / ne, K = (b * $ * q - b * X * W - T * N * q + T * X * J + G * N * W - G * $ * J - M * U * q + M * k * W + R * D * q - R * k * J - F * D * W + F * U * J + h * U * X - h * k * $ - O * D * X + O * k * N + S * D * $ - S * U * N) / ne, z = (D * $ * q - D * X * W - U * N * q + U * X * J + k * N * W - k * $ * J) / ne;
    if (B >= 0) {
      let j = -3 * K + B ** 2, ue = 3 * B * z + K * B ** 2 - 4 * K ** 2, ee = -27 * z ** 2 + 18 * z * B * K + B ** 2 * K ** 2 - 4 * B ** 3 * z - 4 * K ** 3;
      return !(j > 0 && ue < 0 && ee > 0);
    } else {
      let j = -3 * K + B ** 2, ue = -27 * z ** 2 + 18 * z * B * K + B ** 2 * K ** 2 - 4 * B ** 3 * z - 4 * K ** 3;
      return !(j > 0 && ue > 0);
    }
  }
  i(Xa, "testEllipseEllipse");
  function vo(t18, e) {
    return br(t18, new Ae(e.points()));
  }
  i(vo, "testEllipseRect");
  function br(t18, e) {
    let n = t18.toMat2().inverse;
    return e = new Ae(e.pts.map((r) => n.transform(r.sub(t18.center)))), $t(new Ge(y(), 1), e);
  }
  i(br, "testEllipsePolygon");
  function Qa(t18, e) {
    return t18.x === e.x && t18.y === e.y;
  }
  i(Qa, "testPointPoint");
  function Ja(t18, e) {
    return e instanceof v ? Qa(e, t18.pt) : e instanceof Ge ? Tn(e, t18.pt) : e instanceof Te ? On(e, t18.pt) : e instanceof te ? En(e, t18.pt) : e instanceof Ae ? rt(e, t18.pt) : e instanceof _e ? gr(e, t18.pt) : false;
  }
  i(Ja, "testPointShape");
  function Za(t18, e) {
    return e instanceof v ? On(t18, e) : e instanceof Ge ? Bt(t18, e) : e instanceof Te ? wn(t18, e) != null : e instanceof te ? Cn(e, t18) : e instanceof Ae ? hr(t18, e) : e instanceof _e ? xo(e, t18) : false;
  }
  i(Za, "testLineShape");
  function eu(t18, e) {
    return e instanceof v ? Tn(t18, e) : e instanceof Ge ? $a(t18, e) : e instanceof Te ? Bt(e, t18) : e instanceof te ? go2(e, t18) : e instanceof Ae ? $t(t18, e) : e instanceof _e ? yn(e, t18) : false;
  }
  i(eu, "testCircleShape");
  function tu(t18, e) {
    return e instanceof v ? En(t18, e) : e instanceof Ge ? go2(t18, e) : e instanceof Te ? Cn(t18, e) : e instanceof te ? fr(t18, e) : e instanceof Ae ? bo(t18, e) : e instanceof _e ? vo(e, t18) : false;
  }
  i(tu, "testRectShape");
  function nu(t18, e) {
    return e instanceof v ? rt(t18, e) : e instanceof Ge ? $t(e, t18) : e instanceof Te ? hr(e, t18) : e instanceof te ? bo(e, t18) : e instanceof Ae ? yo(e, t18) : e instanceof _e ? br(e, t18) : false;
  }
  i(nu, "testPolygonShape");
  function ru(t18, e) {
    return e instanceof v ? gr(t18, e) : e instanceof Ge ? yn(t18, e) : e instanceof Te ? xo(t18, e) : e instanceof te ? vo(t18, e) : e instanceof Ae ? br(t18, e) : e instanceof _e ? Xa(e, t18) : false;
  }
  i(ru, "testEllipseShape");
  function wo(t18, e, n) {
    let r = t18, o = n.p1, s = n.p2, a = e, l = s.sub(o), u = a.cross(l);
    if (Math.abs(u) < Number.EPSILON) return null;
    let m = o.sub(r), c = m.cross(l) / u;
    if (c <= 0 || c >= 1) return null;
    let p = m.cross(a) / u;
    if (p <= 0 || p >= 1) return null;
    let f = l.normal().unit();
    return e.dot(f) > 0 && (f.x *= -1, f.y *= -1), { point: r.add(a.scale(c)), normal: f, fraction: c };
  }
  i(wo, "raycastLine");
  function ou(t18, e, n) {
    let r = Number.NEGATIVE_INFINITY, o = Number.POSITIVE_INFINITY, s;
    if (t18.x != 0) {
      let a = (n.pos.x - t18.x) / e.x, l = (n.pos.x + n.width - t18.x) / e.x;
      s = y(-Math.sign(e.x), 0), r = Math.max(r, Math.min(a, l)), o = Math.min(o, Math.max(a, l));
    }
    if (t18.y != 0) {
      let a = (n.pos.y - t18.y) / e.y, l = (n.pos.y + n.height - t18.y) / e.y;
      Math.min(a, l) > r && (s = y(0, -Math.sign(e.y))), r = Math.max(r, Math.min(a, l)), o = Math.min(o, Math.max(a, l));
    }
    return o >= r && r >= 0 && r <= 1 ? { point: t18.add(e.scale(r)), normal: s, fraction: r } : null;
  }
  i(ou, "raycastRect");
  function Co(t18, e, n) {
    let r = t18, o = n.center, s = e, a = s.dot(s), l = r.sub(o), u = 2 * s.dot(l), m = l.dot(l) - n.radius * n.radius, c = u * u - 4 * a * m;
    if (a <= Number.EPSILON || c < 0) return null;
    if (c == 0) {
      let p = -u / (2 * a);
      if (p >= 0 && p <= 1) {
        let f = r.add(s.scale(p));
        return { point: f, normal: f.sub(o), fraction: p };
      }
    } else {
      let p = (-u + Math.sqrt(c)) / (2 * a), f = (-u - Math.sqrt(c)) / (2 * a), x = null;
      if (p >= 0 && p <= 1 && (x = p), f >= 0 && f <= 1 && (x = Math.min(f, x ?? f)), x != null) {
        let g = r.add(s.scale(x));
        return { point: g, normal: g.sub(o).unit(), fraction: x };
      }
    }
    return null;
  }
  i(Co, "raycastCircle");
  function iu(t18, e, n) {
    let r = n.pts, o = null, s = r[r.length - 1];
    for (let a = 0; a < r.length; a++) {
      let l = r[a], u = wo(t18, e, new Te(s, l));
      u && (!o || o.fraction > u.fraction) && (o = u), s = l;
    }
    return o;
  }
  i(iu, "raycastPolygon");
  function su(t18, e, n) {
    let r = n.toMat2(), o = r.inverse, s = o.transform(t18.sub(n.center)), a = o.transform(e), l = Co(s, a, new Ge(y(), 1));
    if (l) {
      let u = Mt.rotation(ce(-n.angle)), c = Mt.scale(n.radiusX, n.radiusY).transform(l.point), p = r.transform(l.point).add(n.center), f = p.dist(t18) / e.len();
      return { point: p, normal: u.transform(y(n.radiusY ** 2 * c.x, n.radiusX ** 2 * c.y)).unit(), fraction: f };
    }
    return l;
  }
  i(su, "raycastEllipse");
  function Eo(t18, e, n, r = 64) {
    let o = t18, s = e.len(), a = e.scale(1 / s), l = 0, u = y(Math.floor(t18.x), Math.floor(t18.y)), m = y(a.x > 0 ? 1 : -1, a.y > 0 ? 1 : -1), c = y(Math.abs(1 / a.x), Math.abs(1 / a.y)), p = y(m.x > 0 ? u.x + 1 - t18.x : t18.x - u.x, m.y > 0 ? u.y + 1 - t18.y : t18.y - u.y), f = y(c.x < 1 / 0 ? c.x * p.x : 1 / 0, c.y < 1 / 0 ? c.y * p.y : 1 / 0), x = -1;
    for (; l <= r; ) {
      let g = n(u);
      if (g === true) return { point: o.add(a.scale(l)), normal: y(x === 0 ? -m.x : 0, x === 1 ? -m.y : 0), fraction: l / s, gridPos: u };
      if (g) return g;
      f.x < f.y ? (u.x += m.x, l = f.x, f.x += c.x, x = 0) : (u.y += m.y, l = f.y, f.y += c.y, x = 1);
    }
    return null;
  }
  i(Eo, "raycastGrid");
  var xn = class t7 {
    static {
      i(this, "Point");
    }
    pt;
    constructor(e) {
      this.pt = e.clone();
    }
    transform(e) {
      return new t7(e.multVec2(this.pt));
    }
    bbox() {
      return new te(this.pt, 0, 0);
    }
    area() {
      return 0;
    }
    clone() {
      return new t7(this.pt);
    }
    collides(e) {
      return Ja(this, e);
    }
    contains(e) {
      return this.pt.eq(e);
    }
    raycast(e, n) {
      return null;
    }
    random() {
      return this.pt.clone();
    }
  };
  var Te = class t8 {
    static {
      i(this, "Line");
    }
    p1;
    p2;
    constructor(e, n) {
      this.p1 = e.clone(), this.p2 = n.clone();
    }
    transform(e) {
      return new t8(e.multVec2(this.p1), e.multVec2(this.p2));
    }
    bbox() {
      return te.fromPoints(this.p1, this.p2);
    }
    area() {
      return this.p1.dist(this.p2);
    }
    clone() {
      return new t8(this.p1, this.p2);
    }
    collides(e) {
      return Za(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return wo(e, n, this);
    }
    random() {
      return this.p1.add(this.p2.sub(this.p1).scale(be(1)));
    }
  };
  var te = class t9 {
    static {
      i(this, "Rect");
    }
    pos;
    width;
    height;
    constructor(e, n, r) {
      this.pos = e.clone(), this.width = n, this.height = r;
    }
    static fromPoints(e, n) {
      return new t9(e.clone(), n.x - e.x, n.y - e.y);
    }
    center() {
      return new v(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
    points() {
      return [this.pos, this.pos.add(this.width, 0), this.pos.add(this.width, this.height), this.pos.add(0, this.height)];
    }
    transform(e) {
      return new Ae(this.points().map((n) => e.multVec2(n)));
    }
    bbox() {
      return this.clone();
    }
    area() {
      return this.width * this.height;
    }
    clone() {
      return new t9(this.pos.clone(), this.width, this.height);
    }
    distToPoint(e) {
      return Math.sqrt(this.sdistToPoint(e));
    }
    sdistToPoint(e) {
      let n = this.pos, r = this.pos.add(this.width, this.height), o = Math.max(n.x - e.x, 0, e.x - r.x), s = Math.max(n.y - e.y, 0, e.y - r.y);
      return o * o + s * s;
    }
    collides(e) {
      return tu(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return ou(e, n, this);
    }
    random() {
      return this.pos.add(be(this.width), be(this.height));
    }
  };
  var Ge = class t10 {
    static {
      i(this, "Circle");
    }
    center;
    radius;
    constructor(e, n) {
      this.center = e.clone(), this.radius = n;
    }
    transform(e) {
      return new _e(this.center, this.radius, this.radius).transform(e);
    }
    bbox() {
      return te.fromPoints(this.center.sub(y(this.radius)), this.center.add(y(this.radius)));
    }
    area() {
      return this.radius * this.radius * Math.PI;
    }
    clone() {
      return new t10(this.center, this.radius);
    }
    collides(e) {
      return eu(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return Co(e, n, this);
    }
    random() {
      return this.center.add(v.fromAngle(be(360)).scale(be(this.radius)));
    }
  };
  var _e = class t11 {
    static {
      i(this, "Ellipse");
    }
    center;
    radiusX;
    radiusY;
    angle;
    constructor(e, n, r, o = 0) {
      this.center = e.clone(), this.radiusX = n, this.radiusY = r, this.angle = o;
    }
    static fromMat2(e) {
      let n = e.inverse, r = n.transpose.mul(n), [o, s] = r.eigenvalues, [a, l] = r.eigenvectors(o, s), [u, m] = [1 / Math.sqrt(o), 1 / Math.sqrt(s)];
      return u > m ? new t11(y(), u, m, pt(Math.atan2(-a[1], a[0]))) : new t11(y(), m, u, pt(Math.atan2(-l[1], l[0])));
    }
    toMat2() {
      let e = ce(this.angle), n = Math.cos(e), r = Math.sin(e);
      return new Mt(n * this.radiusX, -r * this.radiusY, r * this.radiusX, n * this.radiusY);
    }
    transform(e) {
      if (this.angle == 0 && e.getRotation() == 0) return new t11(e.multVec2(this.center), e.m[0] * this.radiusX, e.m[5] * this.radiusY);
      {
        let n = this.toMat2(), r = e.getRotation(), o = e.getScale();
        n = xt.fromMat2(n).scale(o.x, o.y).rotate(r).toMat2();
        let a = t11.fromMat2(n);
        return a.center = e.multVec2(this.center), a;
      }
    }
    bbox() {
      if (this.angle == 0) return te.fromPoints(this.center.sub(y(this.radiusX, this.radiusY)), this.center.add(y(this.radiusX, this.radiusY)));
      {
        let e = ce(this.angle), n = Math.cos(e), r = Math.sin(e), o = this.radiusX * n, s = this.radiusX * r, a = this.radiusY * r, l = this.radiusY * n, u = Math.sqrt(o * o + a * a), m = Math.sqrt(s * s + l * l);
        return te.fromPoints(this.center.sub(y(u, m)), this.center.add(y(u, m)));
      }
    }
    area() {
      return this.radiusX * this.radiusY * Math.PI;
    }
    clone() {
      return new t11(this.center, this.radiusX, this.radiusY, this.angle);
    }
    collides(e) {
      return ru(this, e);
    }
    contains(e) {
      e = e.sub(this.center);
      let n = ce(this.angle), r = Math.cos(n), o = Math.sin(n), s = e.x * r + e.y * o, a = -e.x * o + e.y * r;
      return s * s / (this.radiusX * this.radiusX) + a * a / (this.radiusY * this.radiusY) < 1;
    }
    raycast(e, n) {
      return su(e, n, this);
    }
    random() {
      return this.center;
    }
  };
  function au(t18, e, n, r) {
    let o = e.sub(t18), s = r.sub(n), a = o.cross(s);
    return a < 1e-5 && a > -1e-5 || (a = n.sub(t18).cross(s) / a, a < 0 || a > 1) ? null : t18.add(o.scale(a));
  }
  i(au, "segmentLineIntersection");
  var Ae = class t12 {
    static {
      i(this, "Polygon");
    }
    pts;
    constructor(e) {
      if (e.length < 3) throw new Error("Polygons should have at least 3 vertices");
      this.pts = e;
    }
    transform(e) {
      return new t12(this.pts.map((n) => e.multVec2(n)));
    }
    bbox() {
      let e = y(Number.MAX_VALUE), n = y(-Number.MAX_VALUE);
      for (let r of this.pts) e.x = Math.min(e.x, r.x), n.x = Math.max(n.x, r.x), e.y = Math.min(e.y, r.y), n.y = Math.max(n.y, r.y);
      return te.fromPoints(e, n);
    }
    area() {
      let e = 0, n = this.pts.length;
      for (let r = 0; r < n; r++) {
        let o = this.pts[r], s = this.pts[(r + 1) % n];
        e += o.x * s.y * 0.5, e -= s.x * o.y * 0.5;
      }
      return Math.abs(e);
    }
    clone() {
      return new t12(this.pts.map((e) => e.clone()));
    }
    collides(e) {
      return nu(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return iu(e, n, this);
    }
    random() {
      return y();
    }
    cut(e, n) {
      let r = new Te(e, n), o = [], s = [], a = n.sub(e), l = this.pts[this.pts.length - 1], u = l.sub(e), m = a.cross(u) > 0;
      return this.pts.forEach((c) => {
        u = c.sub(e);
        let p = a.cross(u) > 0;
        if (m != p) {
          let f = au(l, c, e, n);
          o.push(f), s.push(f), m = p;
        }
        (p ? o : s).push(c), l = c;
      }), [o.length ? new t12(o) : null, s.length ? new t12(s) : null];
    }
  };
  function Oo(t18, e, n, r) {
    let o = r * r, s = 1 - r, a = s * s;
    return t18.scale(a).add(e.scale(2 * s * r)).add(n.scale(o));
  }
  i(Oo, "evaluateQuadratic");
  function To(t18, e, n, r) {
    let o = 1 - r;
    return e.sub(t18).scale(2 * o).add(n.sub(e).scale(2 * r));
  }
  i(To, "evaluateQuadraticFirstDerivative");
  function Ao(t18, e, n, r) {
    return n.sub(e.scale(2)).add(t18).scale(2);
  }
  i(Ao, "evaluateQuadraticSecondDerivative");
  function Xt(t18, e, n, r, o) {
    let s = o * o, a = s * o, l = 1 - o, u = l * l, m = u * l;
    return t18.scale(m).add(e.scale(3 * u * o)).add(n.scale(3 * l * s)).add(r.scale(a));
  }
  i(Xt, "evaluateBezier");
  function So(t18, e, n, r, o) {
    let s = o * o, a = 1 - o, l = a * a;
    return e.sub(t18).scale(3 * l).add(n.sub(e).scale(6 * a * o)).add(r.sub(n).scale(3 * s));
  }
  i(So, "evaluateBezierFirstDerivative");
  function Vo(t18, e, n, r, o) {
    let s = 1 - o;
    return n.sub(e.scale(2)).add(t18).scale(6 * s).add(r.sub(n.scale(2)).add(e).scale(6 * o));
  }
  i(Vo, "evaluateBezierSecondDerivative");
  function Po(t18, e, n, r, o) {
    let s = 0.5 * (((-o + 2) * o - 1) * o), a = 0.5 * ((3 * o - 5) * o * o + 2), l = 0.5 * (((-3 * o + 4) * o + 1) * o), u = 0.5 * ((o - 1) * o * o);
    return t18.scale(s).add(e.scale(a)).add(n.scale(l)).add(r.scale(u));
  }
  i(Po, "evaluateCatmullRom");
  function Go(t18, e, n, r, o) {
    let s = 0.5 * ((-3 * o + 4) * o - 1), a = 0.5 * ((9 * o - 10) * o), l = 0.5 * ((-9 * o + 8) * o + 1), u = 0.5 * ((3 * o - 2) * o);
    return t18.scale(s).add(e.scale(a)).add(n.scale(l)).add(r.scale(u));
  }
  i(Go, "evaluateCatmullRomFirstDerivative");
  function Ro(t18) {
    let e = yr(t18), n = e(1);
    return (r) => {
      let o = r * n, s = e(o, true);
      return t18(s);
    };
  }
  i(Ro, "normalizedCurve");
  function yr(t18, e = 10, n = 10) {
    let r = [0], o = [0], a = 1 / (e - 1) / n, l = 0, u = t18(0), m = 0;
    for (let c = 1; c < e; c++) {
      for (let p = 0; p < n; p++) {
        m += a;
        let f = t18(m), x = f.dist(u);
        l += x, u = f;
      }
      r[c] = l, o[c] = m;
    }
    return o[e - 1] = 1, (c, p = false) => {
      if (p) {
        let f = c;
        if (f <= 0) return 0;
        if (f >= l) return 1;
        let x = 0;
        for (; r[x + 1] < f; ) x++;
        let g = o[x], C = o[x + 1], b = r[x], T = r[x + 1], G = (f - b) / (T - b);
        return g + (C - g) * G;
      } else {
        if (c <= 0) return 0;
        if (c >= 1) return r[e - 1];
        let f = 0;
        for (; o[f + 1] < c; ) f++;
        let x = o[f], g = o[f + 1], C = r[f], b = r[f + 1], T = (c - x) / (g - x);
        return C + (b - C) * T;
      }
    };
  }
  i(yr, "curveLengthApproximation");
  function Ut(t18, e, n, r) {
    let o = 2 * t18 + e - 2 * r + n, s = -3 * t18 + 3 * r - 2 * e - n, a = e, l = t18;
    return (u) => {
      let m = u * u, c = m * u;
      return o * c + s * m + a * u + l;
    };
  }
  i(Ut, "hermite");
  function xr(t18, e, n, r, o, s = Ut) {
    let a = s(e.x, (1 - o) * (n.x - t18.x), (1 - o) * (r.x - e.x), n.x), l = s(e.y, (1 - o) * (n.y - t18.y), (1 - o) * (r.y - e.y), n.y);
    return (u) => new v(a(u), l(u));
  }
  i(xr, "cardinal");
  function Ft(t18, e, n, r, o = Ut) {
    return xr(t18, e, n, r, 0.5, o);
  }
  i(Ft, "catmullRom");
  function Do(t18, e, n, r, o = Ut) {
    return Ft(r.add(t18.sub(e).scale(6)), t18, r, t18.add(r.sub(n).scale(6)), o);
  }
  i(Do, "bezier");
  function Mo(t18, e, n, r, o, s, a, l = Ut) {
    let u = l(e.x, 0.5 * (1 - o) * (1 + a) * (1 + s) * (e.x - t18.x) + 0.5 * (1 - o) * (1 - a) * (1 - s) * (n.x - e.x), 0.5 * (1 - o) * (1 + a) * (1 - s) * (n.x - e.x) + 0.5 * (1 - o) * (1 - a) * (1 + s) * (r.x - n.x), n.x), m = l(e.y, 0.5 * (1 - o) * (1 + a) * (1 + s) * (e.y - t18.y) + 0.5 * (1 - o) * (1 - a) * (1 - s) * (n.y - e.y), 0.5 * (1 - o) * (1 + a) * (1 - s) * (n.y - e.y) + 0.5 * (1 - o) * (1 - a) * (1 + s) * (r.y - n.y), n.y);
    return (c) => new v(u(c), m(c));
  }
  i(Mo, "kochanekBartels");
  function Bo(t18, e, n, r) {
    let o = 2 * t18 + e - 2 * r + n, s = -3 * t18 + 3 * r - 2 * e + n, a = e;
    return (l) => {
      let u = l * l;
      return 3 * o * u + 2 * s * l + a;
    };
  }
  i(Bo, "hermiteFirstDerivative");
  function zt(t18) {
    return 0 <= t18 && t18 <= 1;
  }
  i(zt, "inZeroOneDomain");
  function cr(t18, e) {
    return Math.abs(t18 - e) <= Number.EPSILON;
  }
  i(cr, "approximately");
  function Yt(t18) {
    return t18 < 0 ? -Math.pow(-t18, 1 / 3) : Math.pow(t18, 1 / 3);
  }
  i(Yt, "cubeRoot");
  function uu(t18, e, n, r) {
    let o = 3 * t18 - 6 * e + 3 * n, s = -3 * t18 + 3 * e, a = t18, l = -t18 + 3 * e - 3 * n + r;
    if (cr(l, 0)) {
      if (cr(o, 0)) return cr(s, 0) ? [] : [-a / s].filter(zt);
      let T = Math.sqrt(s * s - 4 * o * a), G = 2 * o;
      return [(T - s) / G, (-s - T) / G].filter(zt);
    }
    o /= l, s /= l, a /= l;
    let u = (3 * s - o * o) / 3, m = u / 3, c = (2 * o * o * o - 9 * o * s + 27 * a) / 27, p = c / 2, f = p * p + m * m * m;
    if (f < 0) {
      let T = -u / 3, G = T * T * T, M = Math.sqrt(G), R = -c / (2 * M), F = R < -1 ? -1 : R > 1 ? 1 : R, h = Math.acos(F), S = 2 * Yt(M), D = S * Math.cos(h / 3) - o / 3, U = S * Math.cos((h + 2 * Math.PI) / 3) - o / 3, k = S * Math.cos((h + 4 * Math.PI) / 3) - o / 3;
      return [D, U, k].filter(zt);
    }
    if (f === 0) {
      let T = p < 0 ? Yt(-p) : -Yt(p), G = 2 * T - o / 3, M = -T - o / 3;
      return [G, M].filter(zt);
    }
    let x = Math.sqrt(f), g = Yt(x - p), C = Yt(x + p);
    return [g - C - o / 3].filter(zt);
  }
  i(uu, "getCubicRoots");
  function cu(t18, e, n, r, o) {
    let s = uu(t18.x - o, e.x - o, n.x - o, r.x - o);
    return s.length > 0 ? Xt(t18, e, n, r, s[0]).y : NaN;
  }
  i(cu, "cubicBezierYforX");
  function Uo(t18) {
    if (!t18 || t18.length == 0) throw new Error("Need at least one point for easingLinear.");
    let e = t18.length;
    return (n) => {
      if (n <= 0 || t18.length == 1 || n <= t18[0].x) return t18[0].y;
      for (let r = 0; r < e; r++) if (t18[r].x >= n) return Re(n, t18[r - 1].x, t18[r].x, t18[r - 1].y, t18[r].y);
      return t18[t18.length - 1].y;
    };
  }
  i(Uo, "easingLinear");
  function Fo(t18, e) {
    return (n) => cu(y(0, 0), t18, e, y(1, 1), n);
  }
  i(Fo, "easingCubicBezier");
  function Lo(t18, e = "jump-end") {
    let n = 1 / t18, r = e == "jump-start" || e == "jump-both", o = e == "jump-end" || e == "jump-both", s = 1 / (t18 + (o ? 1 : 0)), a = r ? s : 0;
    return (l) => {
      let u = Math.floor(l / n);
      return a + u * s;
    };
  }
  i(Lo, "easingSteps");
  function Io(t18, e) {
    let n = Number.MAX_VALUE, r = { normal: y(0), distance: 0 };
    for (let o of [t18, e]) for (let s = 0; s < o.pts.length; s++) {
      let a = o.pts[s], u = o.pts[(s + 1) % o.pts.length].sub(a).normal().unit(), m = Number.MAX_VALUE, c = -Number.MAX_VALUE;
      for (let g = 0; g < t18.pts.length; g++) {
        let C = t18.pts[g].dot(u);
        m = Math.min(m, C), c = Math.max(c, C);
      }
      let p = Number.MAX_VALUE, f = -Number.MAX_VALUE;
      for (let g = 0; g < e.pts.length; g++) {
        let C = e.pts[g].dot(u);
        p = Math.min(p, C), f = Math.max(f, C);
      }
      let x = Math.min(c, f) - Math.max(m, p);
      if (x < 0) return null;
      if (x < Math.abs(n)) {
        let g = f - m, C = p - c;
        n = Math.abs(g) < Math.abs(C) ? g : C, r.normal = u, r.distance = n;
      }
    }
    return r;
  }
  i(Io, "sat");
  function Ko(t18, e, n) {
    return (e.x - t18.x) * (n.y - t18.y) - (e.y - t18.y) * (n.x - t18.x) >= 0;
  }
  i(Ko, "isOrientedCcw");
  function lu(t18) {
    let e = 0, n = t18[t18.length - 1];
    for (let r = 0; r < t18.length; r++) e += (t18[r].x - n.x) * (t18[r].y + n.y), n = t18[r];
    return e < 0;
  }
  i(lu, "isOrientedCcwPolygon");
  function lr(t18, e, n, r) {
    let o = r.x - n.x, s = r.y - n.y, a = o * (t18.y - n.y) - s * (t18.x - n.x), l = o * (e.y - n.y) - s * (e.x - n.x);
    return a * l >= 0;
  }
  i(lr, "onSameSide");
  function mu(t18, e, n, r) {
    return lr(t18, e, n, r) && lr(t18, n, e, r) && lr(t18, r, e, n);
  }
  i(mu, "pointInTriangle");
  function pu(t18, e, n, r) {
    for (let o of t18) if (o !== e && o !== n && o !== r && mu(o, e, n, r)) return true;
    return false;
  }
  i(pu, "someInTriangle");
  function du(t18, e, n, r) {
    return Ko(t18, e, n) && !pu(r, t18, e, n);
  }
  i(du, "isEar");
  function An(t18) {
    if (t18.length < 3) return [];
    if (t18.length == 3) return [t18];
    let e = [], n = [], r = 0;
    for (let p = 0; p < t18.length; p++) {
      let f = t18[r], x = t18[p];
      (x.x < f.x || x.x == f.x && x.y < f.y) && (r = r), e[p] = p + 1, n[p] = p - 1;
    }
    e[e.length - 1] = 0, n[0] = n.length - 1, lu(t18) || ([e, n] = [n, e]);
    let o = [];
    for (let p = 0; p < t18.length; ++p) Ko(t18[n[p]], t18[p], t18[e[p]]) || o.push(t18[p]);
    let s = [], a = t18.length, l = 1, u = 0, m, c;
    for (; a > 3; ) {
      m = e[l], c = n[l];
      let p = t18[c], f = t18[l], x = t18[m];
      if (du(p, f, x, o)) s.push([p, f, x]), e[c] = m, n[m] = c, o.splice(o.indexOf(f), 1), --a, u = 0;
      else if (++u > a) return [];
      l = m;
    }
    return m = e[l], c = n[l], s.push([t18[c], t18[l], t18[m]]), s;
  }
  i(An, "triangulate");
  function jo(t18) {
    if (t18.length < 3) return false;
    let e = t18.length - 2, n = t18.length - 1, r = 0, o = t18[n].sub(t18[e]), s = t18[r].sub(t18[n]), a = o.cross(s);
    for (; r + 1 < t18.length; ) if (e = n, n = r, r++, o = t18[n].sub(t18[e]), s = t18[r].sub(t18[n]), o.cross(s) * a < 0) return false;
    return true;
  }
  i(jo, "isConvex");
  var ko = i((t18) => t18[0] instanceof H, "arrayIsColor");
  var _o = i((t18) => t18[0] instanceof v, "arrayIsVec2");
  var No = i((t18) => typeof t18[0] == "number", "arrayIsNumber");
  var Lt = class {
    static {
      i(this, "BinaryHeap");
    }
    _items;
    _compareFn;
    constructor(e = (n, r) => n < r) {
      this._compareFn = e, this._items = [];
    }
    insert(e) {
      this._items.push(e), this.moveUp(this._items.length - 1);
    }
    remove() {
      if (this._items.length === 0) return null;
      let e = this._items[0], n = this._items.pop();
      return this._items.length !== 0 && (this._items[0] = n, this.moveDown(0)), e;
    }
    clear() {
      this._items.splice(0, this._items.length);
    }
    moveUp(e) {
      for (; e > 0; ) {
        let n = Math.floor((e - 1) / 2);
        if (!this._compareFn(this._items[e], this._items[n]) && this._items[e] >= this._items[n]) break;
        this.swap(e, n), e = n;
      }
    }
    moveDown(e) {
      for (; e < Math.floor(this._items.length / 2); ) {
        let n = 2 * e + 1;
        if (n < this._items.length - 1 && !this._compareFn(this._items[n], this._items[n + 1]) && ++n, this._compareFn(this._items[e], this._items[n])) break;
        this.swap(e, n), e = n;
      }
    }
    swap(e, n) {
      [this._items[e], this._items[n]] = [this._items[n], this._items[e]];
    }
    get length() {
      return this._items.length;
    }
  };
  function fu(t18) {
    let e = window.atob(t18), n = e.length, r = new Uint8Array(n);
    for (let o = 0; o < n; o++) r[o] = e.charCodeAt(o);
    return r.buffer;
  }
  i(fu, "base64ToArrayBuffer");
  function Ho(t18) {
    return fu(t18.split(",")[1]);
  }
  i(Ho, "dataURLToArrayBuffer");
  function Sn(t18, e) {
    let n = document.createElement("a");
    n.href = e, n.download = t18, n.click();
  }
  i(Sn, "download");
  function vr(t18, e) {
    Sn(t18, "data:text/plain;charset=utf-8," + e);
  }
  i(vr, "downloadText");
  function qo(t18, e) {
    vr(t18, JSON.stringify(e));
  }
  i(qo, "downloadJSON");
  function wr(t18, e) {
    let n = URL.createObjectURL(e);
    Sn(t18, n), URL.revokeObjectURL(n);
  }
  i(wr, "downloadBlob");
  var Vn = i((t18) => t18.match(/^data:\w+\/\w+;base64,.+/), "isDataURL");
  var zo = i((t18) => t18.split(".").slice(0, -1).join("."), "getFileName");
  function Pn(t18, e) {
    if (t18 === e) return true;
    let n = typeof t18, r = typeof e;
    if (n !== r) return false;
    if (n === "object" && r === "object" && t18 !== null && e !== null) {
      if (Array.isArray(t18) !== Array.isArray(e)) return false;
      let o = Object.keys(t18), s = Object.keys(e);
      if (o.length !== s.length) return false;
      for (let a of o) {
        let l = t18[a], u = e[a];
        if (!Pn(l, u)) return false;
      }
      return true;
    }
    return false;
  }
  i(Pn, "deepEq");
  var Qt = class extends Map {
    static {
      i(this, "Registry");
    }
    lastID = 0;
    push(e) {
      let n = this.lastID;
      return this.set(n, e), this.lastID++, n;
    }
    pushd(e) {
      let n = this.push(e);
      return () => this.delete(n);
    }
  };
  var Ne = class t13 {
    static {
      i(this, "KEventController");
    }
    paused = false;
    cancel;
    constructor(e) {
      this.cancel = e;
    }
    static join(e) {
      let n = new t13(() => e.forEach((r) => r.cancel()));
      return Object.defineProperty(n, "paused", { get: i(() => e[0].paused, "get"), set: i((r) => e.forEach((o) => o.paused = r), "set") }), n.paused = false, n;
    }
    static replace(e, n) {
      return e.cancel = () => n.cancel(), n.paused = e.paused, Object.defineProperty(e, "paused", { get: i(() => n.paused, "get"), set: i((r) => n.paused = r, "set") }), e;
    }
  };
  var le = class {
    static {
      i(this, "KEvent");
    }
    handlers = new Qt();
    add(e) {
      let n = this.handlers.pushd((...o) => {
        r.paused || e(...o);
      }), r = new Ne(n);
      return r;
    }
    addOnce(e) {
      let n = this.add((...r) => {
        n.cancel(), e(...r);
      });
      return n;
    }
    next() {
      return new Promise((e) => this.addOnce(e));
    }
    trigger(...e) {
      this.handlers.forEach((n) => n(...e));
    }
    numListeners() {
      return this.handlers.size;
    }
    clear() {
      this.handlers.clear();
    }
  };
  var Xe = class {
    static {
      i(this, "KEventHandler");
    }
    handlers = {};
    registers = {};
    on(e, n) {
      return this.handlers[e] || (this.handlers[e] = new le()), this.handlers[e].add(n);
    }
    onOnce(e, n) {
      let r = this.on(e, (...o) => {
        r.cancel(), n(...o);
      });
      return r;
    }
    next(e) {
      return new Promise((n) => {
        this.onOnce(e, (...r) => n(r[0]));
      });
    }
    trigger(e, ...n) {
      this.handlers[e] && this.handlers[e].trigger(...n);
    }
    remove(e) {
      delete this.handlers[e];
    }
    clear() {
      this.handlers = {};
    }
    numListeners(e) {
      return this.handlers[e]?.numListeners() ?? 0;
    }
  };
  var Yo = i((t18) => t18 instanceof Error ? t18.message : String(t18), "getErrorMessage");
  function Jt(t18, e) {
    return Number(t18.toFixed(e));
  }
  i(Jt, "toFixed");
  function de(t18, e) {
    return (...n) => {
      let r = n.length;
      if (r === t18.length) return t18(...n);
      if (r === e.length) return e(...n);
    };
  }
  i(de, "overload2");
  var hu = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
  function $o(t18) {
    if (typeof t18 != "string") throw new TypeError("string cannot be undefined or null");
    let e = [], n = 0, r = 0;
    for (; n < t18.length; ) {
      if (r += gu(n + r, t18), Eu(t18[n + r]) && r++, vu(t18[n + r]) && r++, wu(t18[n + r]) && r++, Ou(t18[n + r])) {
        r++;
        continue;
      }
      e.push(t18.substring(n, n + r)), n += r, r = 0;
    }
    return e;
  }
  i($o, "runes");
  function gu(t18, e) {
    let n = e[t18];
    if (!bu(n) || t18 === e.length - 1) return 1;
    let r = n + e[t18 + 1], o = e.substring(t18 + 2, t18 + 5);
    return Wo(r) && Wo(o) ? 4 : yu(r) && Cu(o) ? e.slice(t18).indexOf(String.fromCodePoint(917631)) + 2 : xu(o) ? 4 : 2;
  }
  i(gu, "nextUnits");
  function bu(t18) {
    return t18 && vt(t18[0].charCodeAt(0), 55296, 56319);
  }
  i(bu, "isFirstOfSurrogatePair");
  function Wo(t18) {
    return vt(Cr(t18), 127462, 127487);
  }
  i(Wo, "isRegionalIndicator");
  function yu(t18) {
    return vt(Cr(t18), 127988, 127988);
  }
  i(yu, "isSubdivisionFlag");
  function xu(t18) {
    return vt(Cr(t18), 127995, 127999);
  }
  i(xu, "isFitzpatrickModifier");
  function vu(t18) {
    return typeof t18 == "string" && vt(t18.charCodeAt(0), 65024, 65039);
  }
  i(vu, "isVariationSelector");
  function wu(t18) {
    return typeof t18 == "string" && vt(t18.charCodeAt(0), 8400, 8447);
  }
  i(wu, "isDiacriticalMark");
  function Cu(t18) {
    let e = t18.codePointAt(0);
    return typeof t18 == "string" && typeof e == "number" && vt(e, 917504, 917631);
  }
  i(Cu, "isSupplementarySpecialpurposePlane");
  function Eu(t18) {
    return typeof t18 == "string" && hu.includes(t18.charCodeAt(0));
  }
  i(Eu, "isGrapheme");
  function Ou(t18) {
    return typeof t18 == "string" && t18.charCodeAt(0) === 8205;
  }
  i(Ou, "isZeroWidthJoiner");
  function Cr(t18) {
    let e = t18.charCodeAt(0) - 55296, n = t18.charCodeAt(1) - 56320;
    return (e << 10) + n + 65536;
  }
  i(Cr, "codePointFromSurrogatePair");
  function vt(t18, e, n) {
    return t18 >= e && t18 <= n;
  }
  i(vt, "betweenInclusive");
  var Fe = i((t18, e) => Array.isArray(t18) ? t18?.includes(e) : t18 === e, "isEqOrIncludes");
  var Qe = i((t18, e) => Array.isArray(e) ? e.some((n) => t18.has(n)) : t18.has(e), "setHasOrIncludes");
  var Zt = i((t18, e, n) => {
    t18.has(e) ? t18.get(e)?.push(n) : t18.set(e, [n]);
  }, "mapAddOrPush");
  var Xo = /* @__PURE__ */ (() => {
    let t18 = 0;
    return () => t18++;
  })();
  var Qo = { "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "select", "10": "lstick", "16": "start" }, sticks: { left: { x: 0, y: 1 } } }, "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "start", "10": "lstick", "16": "select" }, sticks: { left: { x: 0, y: 1 } } }, "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, default: { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } } };
  var Jo = i(() => dt.lastInputDevice, "getLastInputDeviceType");
  var Zo = i(() => {
    let t18 = dt.buttons;
    for (let e in t18) {
      let n = t18[e].keyboard && [t18[e].keyboard].flat(), r = t18[e].keyboardCode && [t18[e].keyboardCode].flat(), o = t18[e].gamepad && [t18[e].gamepad].flat(), s = t18[e].mouse && [t18[e].mouse].flat();
      n && n.forEach((a) => {
        Zt(dt.buttonsByKey, a, e);
      }), r && r.forEach((a) => {
        Zt(dt.buttonsByKeyCode, a, e);
      }), o && o.forEach((a) => {
        Zt(dt.buttonsByGamepad, a, e);
      }), s && s.forEach((a) => {
        Zt(dt.buttonsByMouse, a, e);
      });
    }
  }, "parseButtonBindings");
  var wt = class {
    static {
      i(this, "ButtonState");
    }
    pressed = /* @__PURE__ */ new Set([]);
    pressedRepeat = /* @__PURE__ */ new Set([]);
    released = /* @__PURE__ */ new Set([]);
    down = /* @__PURE__ */ new Set([]);
    update() {
      this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
    }
    press(e) {
      this.pressed.add(e), this.pressedRepeat.add(e), this.down.add(e);
    }
    pressRepeat(e) {
      this.pressedRepeat.add(e);
    }
    release(e) {
      this.down.delete(e), this.pressed.delete(e), this.released.add(e);
    }
  };
  var Er = class {
    static {
      i(this, "GamepadState");
    }
    buttonState = new wt();
    stickState = /* @__PURE__ */ new Map();
  };
  var Or = class {
    static {
      i(this, "FPSCounter");
    }
    dts = [];
    timer = 0;
    fps = 0;
    tick(e) {
      this.dts.push(e), this.timer += e, this.timer >= 1 && (this.timer = 0, this.fps = Math.round(1 / (this.dts.reduce((n, r) => n + r) / this.dts.length)), this.dts = []);
    }
  };
  var dt;
  var ei = Qo;
  var Au = i((t18) => {
    let e = t18.buttons ?? {};
    return { canvas: t18.canvas, buttons: e, buttonsByKey: /* @__PURE__ */ new Map(), buttonsByMouse: /* @__PURE__ */ new Map(), buttonsByGamepad: /* @__PURE__ */ new Map(), buttonsByKeyCode: /* @__PURE__ */ new Map(), loopID: null, stopped: false, dt: 0, fixedDt: 1 / 50, restDt: 0, time: 0, realTime: 0, fpsCounter: new Or(), timeScale: 1, skipTime: false, isHidden: false, numFrames: 0, mousePos: new v(0), mouseDeltaPos: new v(0), keyState: new wt(), mouseState: new wt(), mergedGamepadState: new Er(), gamepadStates: /* @__PURE__ */ new Map(), lastInputDevice: null, buttonState: new wt(), gamepads: [], charInputted: [], isMouseMoved: false, lastWidth: t18.canvas.offsetWidth, lastHeight: t18.canvas.offsetHeight, events: new Xe() };
  }, "initAppState");
  var ti = i((t18) => {
    if (!t18.canvas) throw new Error("Please provide a canvas");
    let e = Au(t18);
    dt = e, Zo();
    function n() {
      return e.dt * e.timeScale;
    }
    i(n, "dt");
    function r() {
      return e.fixedDt * e.timeScale;
    }
    i(r, "fixedDt");
    function o() {
      return e.restDt * e.timeScale;
    }
    i(o, "restDt");
    function s() {
      return e.isHidden;
    }
    i(s, "isHidden");
    function a() {
      return e.time;
    }
    i(a, "time");
    function l() {
      return e.fpsCounter.fps;
    }
    i(l, "fps");
    function u() {
      return e.numFrames;
    }
    i(u, "numFrames");
    function m() {
      return e.canvas.toDataURL();
    }
    i(m, "screenshot");
    function c(d) {
      e.canvas.style.cursor = d;
    }
    i(c, "setCursor");
    function p() {
      return e.canvas.style.cursor;
    }
    i(p, "getCursor");
    function f(d) {
      if (d) try {
        let E = e.canvas.requestPointerLock();
        E.catch && E.catch((V) => console.error(V));
      } catch (E) {
        console.error(E);
      }
      else document.exitPointerLock();
    }
    i(f, "setCursorLocked");
    function x() {
      return !!document.pointerLockElement;
    }
    i(x, "isCursorLocked");
    function g(d) {
      d.requestFullscreen ? d.requestFullscreen() : d.webkitRequestFullscreen && d.webkitRequestFullscreen();
    }
    i(g, "enterFullscreen");
    function C() {
      document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullScreen && document.webkitExitFullScreen();
    }
    i(C, "exitFullscreen");
    function b(d = true) {
      d ? g(e.canvas) : C();
    }
    i(b, "setFullscreen");
    function T() {
      return document.fullscreenElement === e.canvas || document.webkitFullscreenElement === e.canvas;
    }
    i(T, "isFullscreen");
    function G() {
      e.stopped = true;
      let d = Object.entries(Me), E = Object.entries(ar), V = Object.entries(bn);
      for (let [I, oe] of d) e.canvas.removeEventListener(I, oe);
      for (let [I, oe] of E) document.removeEventListener(I, oe);
      for (let [I, oe] of V) window.removeEventListener(I, oe);
      so.disconnect();
    }
    i(G, "quit");
    function M(d, E) {
      e.loopID !== null && cancelAnimationFrame(e.loopID);
      let V = 0, I = 0, oe = i((Pe) => {
        if (e.stopped) return;
        if (document.visibilityState !== "visible") {
          e.loopID = requestAnimationFrame(oe);
          return;
        }
        let ae = Pe / 1e3, nt = Math.min(ae - e.realTime, 0.25), Dt = t18.maxFPS ? 1 / t18.maxFPS : 0;
        if (e.realTime = ae, I += nt, I > Dt) {
          if (!e.skipTime) {
            for (V += I, e.dt = e.fixedDt, e.restDt = 0; V > e.fixedDt; ) V -= e.fixedDt, V < e.fixedDt && (e.restDt = V), d();
            e.restDt = V, e.dt = I, e.time += n(), e.fpsCounter.tick(e.dt);
          }
          I = 0, e.skipTime = false, e.numFrames++, E(ja, ka);
        }
        e.loopID = requestAnimationFrame(oe);
      }, "frame");
      oe(0);
    }
    i(M, "run");
    function R() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    i(R, "isTouchscreen");
    function F() {
      return e.mousePos.clone();
    }
    i(F, "mousePos");
    function h() {
      return e.mouseDeltaPos.clone();
    }
    i(h, "mouseDeltaPos");
    function O(d = "left") {
      return e.mouseState.pressed.has(d);
    }
    i(O, "isMousePressed");
    function S(d = "left") {
      return e.mouseState.down.has(d);
    }
    i(S, "isMouseDown");
    function D(d = "left") {
      return e.mouseState.released.has(d);
    }
    i(D, "isMouseReleased");
    function U() {
      return e.isMouseMoved;
    }
    i(U, "isMouseMoved");
    function k(d) {
      return d === void 0 ? e.keyState.pressed.size > 0 : Qe(e.keyState.pressed, d);
    }
    i(k, "isKeyPressed");
    function N(d) {
      return d === void 0 ? e.keyState.pressedRepeat.size > 0 : Qe(e.keyState.pressedRepeat, d);
    }
    i(N, "isKeyPressedRepeat");
    function $(d) {
      return d === void 0 ? e.keyState.down.size > 0 : Qe(e.keyState.down, d);
    }
    i($, "isKeyDown");
    function X(d) {
      return d === void 0 ? e.keyState.released.size > 0 : Qe(e.keyState.released, d);
    }
    i(X, "isKeyReleased");
    function J(d) {
      return d === void 0 ? e.mergedGamepadState.buttonState.pressed.size > 0 : Qe(e.mergedGamepadState.buttonState.pressed, d);
    }
    i(J, "isGamepadButtonPressed");
    function W(d) {
      return d === void 0 ? e.mergedGamepadState.buttonState.down.size > 0 : Qe(e.mergedGamepadState.buttonState.down, d);
    }
    i(W, "isGamepadButtonDown");
    function q(d) {
      return d === void 0 ? e.mergedGamepadState.buttonState.released.size > 0 : Qe(e.mergedGamepadState.buttonState.released, d);
    }
    i(q, "isGamepadButtonReleased");
    function ne(d) {
      return d === void 0 ? e.buttonState.pressed.size > 0 : Qe(e.buttonState.pressed, d);
    }
    i(ne, "isButtonPressed");
    function B(d) {
      return d === void 0 ? e.buttonState.down.size > 0 : Qe(e.buttonState.down, d);
    }
    i(B, "isButtonDown");
    function K(d) {
      return d === void 0 ? e.buttonState.released.size > 0 : Qe(e.buttonState.released, d);
    }
    i(K, "isButtonReleased");
    function z(d) {
      return e.buttons?.[d];
    }
    i(z, "getButton");
    function j(d, E) {
      e.buttons[d] = { ...e.buttons[d], ...E };
    }
    i(j, "setButton");
    function ue(d) {
      e.buttonState.press(d), e.events.trigger("buttonPress", d);
    }
    i(ue, "pressButton");
    function ee(d) {
      e.buttonState.release(d), e.events.trigger("buttonRelease", d);
    }
    i(ee, "releaseButton");
    function Ce(d) {
      return e.events.on("resize", d);
    }
    i(Ce, "onResize");
    let Ht = de((d) => e.events.on("keyDown", d), (d, E) => e.events.on("keyDown", (V) => Fe(d, V) && E(V))), lt = de((d) => e.events.on("keyPress", (E) => d(E)), (d, E) => e.events.on("keyPress", (V) => Fe(d, V) && E(V))), rr = de((d) => e.events.on("keyPressRepeat", d), (d, E) => e.events.on("keyPressRepeat", (V) => Fe(d, V) && E(V))), or = de((d) => e.events.on("keyRelease", d), (d, E) => e.events.on("keyRelease", (V) => Fe(d, V) && E(V))), ir = de((d) => e.events.on("mouseDown", (E) => d(E)), (d, E) => e.events.on("mouseDown", (V) => Fe(d, V) && E(V))), sr = de((d) => e.events.on("mousePress", (E) => d(E)), (d, E) => e.events.on("mousePress", (V) => Fe(d, V) && E(V))), fn = de((d) => e.events.on("mouseRelease", (E) => d(E)), (d, E) => e.events.on("mouseRelease", (V) => V === d && E(V)));
    function Ze(d) {
      return e.events.on("mouseMove", () => d(F(), h()));
    }
    i(Ze, "onMouseMove");
    function mt(d) {
      return e.events.on("charInput", d);
    }
    i(mt, "onCharInput");
    function hn(d) {
      return e.events.on("touchStart", d);
    }
    i(hn, "onTouchStart");
    function ke(d) {
      return e.events.on("touchMove", d);
    }
    i(ke, "onTouchMove");
    function qt(d) {
      return e.events.on("touchEnd", d);
    }
    i(qt, "onTouchEnd");
    function tt(d) {
      return e.events.on("scroll", d);
    }
    i(tt, "onScroll");
    function gn(d) {
      return e.events.on("hide", d);
    }
    i(gn, "onHide");
    function Va(d) {
      return e.events.on("show", d);
    }
    i(Va, "onShow");
    let Pa = de((d) => e.events.on("gamepadButtonPress", (E, V) => d(E, V)), (d, E) => e.events.on("gamepadButtonPress", (V, I) => Fe(d, V) && E(V, I))), Ga = de((d) => e.events.on("gamepadButtonDown", (E, V) => d(E, V)), (d, E) => e.events.on("gamepadButtonDown", (V, I) => Fe(d, V) && E(V, I))), Ra = de((d) => e.events.on("gamepadButtonRelease", (E, V) => d(E, V)), (d, E) => e.events.on("gamepadButtonRelease", (V, I) => Fe(d, V) && E(V, I)));
    function Da(d, E) {
      return e.events.on("gamepadStick", (V, I, oe) => V === d && E(I, oe));
    }
    i(Da, "onGamepadStick");
    function Ma(d) {
      e.events.on("gamepadConnect", d);
    }
    i(Ma, "onGamepadConnect");
    function Ba(d) {
      e.events.on("gamepadDisconnect", d);
    }
    i(Ba, "onGamepadDisconnect");
    function Ua(d) {
      return e.mergedGamepadState.stickState.get(d) || new v(0);
    }
    i(Ua, "getGamepadStick");
    function Fa() {
      return [...e.charInputted];
    }
    i(Fa, "charInputted");
    function to() {
      return [...e.gamepads];
    }
    i(to, "getGamepads");
    let La = de((d) => e.events.on("buttonPress", (E) => d(E)), (d, E) => e.events.on("buttonPress", (V) => Fe(d, V) && E(V))), Ia = de((d) => e.events.on("buttonDown", (E) => d(E)), (d, E) => e.events.on("buttonDown", (V) => Fe(d, V) && E(V))), Ka = de((d) => e.events.on("buttonRelease", (E) => d(E)), (d, E) => e.events.on("buttonRelease", (V) => Fe(d, V) && E(V)));
    function ja() {
      e.events.trigger("input"), e.keyState.down.forEach((d) => e.events.trigger("keyDown", d)), e.mouseState.down.forEach((d) => e.events.trigger("mouseDown", d)), e.buttonState.down.forEach((d) => {
        e.events.trigger("buttonDown", d);
      }), Na();
    }
    i(ja, "processInput");
    function ka() {
      e.keyState.update(), e.mouseState.update(), e.buttonState.update(), e.mergedGamepadState.buttonState.update(), e.mergedGamepadState.stickState.forEach((d, E) => {
        e.mergedGamepadState.stickState.set(E, new v(0));
      }), e.charInputted = [], e.isMouseMoved = false, e.mouseDeltaPos = new v(0), e.gamepadStates.forEach((d) => {
        d.buttonState.update(), d.stickState.forEach((E, V) => {
          d.stickState.set(V, new v(0));
        });
      });
    }
    i(ka, "resetInput");
    function no(d) {
      let E = { index: d.index, isPressed: i((V) => e.gamepadStates.get(d.index)?.buttonState.pressed.has(V) || false, "isPressed"), isDown: i((V) => e.gamepadStates.get(d.index)?.buttonState.down.has(V) || false, "isDown"), isReleased: i((V) => e.gamepadStates.get(d.index)?.buttonState.released.has(V) || false, "isReleased"), getStick: i((V) => e.gamepadStates.get(d.index)?.stickState.get(V) || y(), "getStick") };
      return e.gamepads.push(E), e.gamepadStates.set(d.index, { buttonState: new wt(), stickState: /* @__PURE__ */ new Map([["left", new v(0)], ["right", new v(0)]]) }), E;
    }
    i(no, "registerGamepad");
    function _a(d) {
      e.gamepads = e.gamepads.filter((E) => E.index !== d.index), e.gamepadStates.delete(d.index);
    }
    i(_a, "removeGamepad");
    function Na() {
      for (let d of navigator.getGamepads()) d && !e.gamepadStates.has(d.index) && no(d);
      for (let d of e.gamepads) {
        let E = navigator.getGamepads()[d.index];
        if (!E) continue;
        let I = (t18.gamepads ?? {})[E.id] || ei[E.id] || ei.default, oe = e.gamepadStates.get(d.index);
        if (oe) {
          for (let Pe = 0; Pe < E.buttons.length; Pe++) {
            let ae = I.buttons[Pe], nt = E.buttons[Pe], Dt = e.buttonsByGamepad.has(ae);
            if (nt.pressed) {
              if (oe.buttonState.down.has(ae)) {
                e.events.trigger("gamepadButtonDown", ae, d);
                continue;
              }
              e.lastInputDevice = "gamepad", Dt && e.buttonsByGamepad.get(ae)?.forEach((Be) => {
                e.buttonState.press(Be), e.events.trigger("buttonPress", Be);
              }), e.mergedGamepadState.buttonState.press(ae), oe.buttonState.press(ae), e.events.trigger("gamepadButtonPress", ae, d);
            } else oe.buttonState.down.has(ae) && (Dt && e.buttonsByGamepad.get(ae)?.forEach((Be) => {
              e.buttonState.release(Be), e.events.trigger("buttonRelease", Be);
            }), e.mergedGamepadState.buttonState.release(ae), oe.buttonState.release(ae), e.events.trigger("gamepadButtonRelease", ae, d));
          }
          for (let Pe in I.sticks) {
            let ae = I.sticks[Pe];
            if (!ae) continue;
            let nt = new v(E.axes[ae.x], E.axes[ae.y]);
            oe.stickState.set(Pe, nt), e.mergedGamepadState.stickState.set(Pe, nt), e.events.trigger("gamepadStick", Pe, nt, d);
          }
        }
      }
    }
    i(Na, "processGamepad");
    let Me = {}, ar = {}, bn = {}, ro = t18.pixelDensity || 1;
    Me.mousemove = (d) => {
      let E = new v(d.offsetX, d.offsetY), V = new v(d.movementX, d.movementY);
      if (T()) {
        let I = e.canvas.width / ro, oe = e.canvas.height / ro, Pe = window.innerWidth, ae = window.innerHeight, nt = Pe / ae, Dt = I / oe;
        if (nt > Dt) {
          let Be = ae / oe, ur = (Pe - I * Be) / 2;
          E.x = Re(d.offsetX - ur, 0, I * Be, 0, I), E.y = Re(d.offsetY, 0, oe * Be, 0, oe);
        } else {
          let Be = Pe / I, ur = (ae - oe * Be) / 2;
          E.x = Re(d.offsetX, 0, I * Be, 0, I), E.y = Re(d.offsetY - ur, 0, oe * Be, 0, oe);
        }
      }
      e.events.onOnce("input", () => {
        e.isMouseMoved = true, e.mousePos = E, e.mouseDeltaPos = V, e.events.trigger("mouseMove");
      });
    };
    let oo = ["left", "middle", "right", "back", "forward"];
    Me.mousedown = (d) => {
      e.events.onOnce("input", () => {
        let E = oo[d.button];
        E && (e.lastInputDevice = "mouse", e.buttonsByMouse.has(E) && e.buttonsByMouse.get(E)?.forEach((V) => {
          e.buttonState.press(V), e.events.trigger("buttonPress", V);
        }), e.mouseState.press(E), e.events.trigger("mousePress", E));
      });
    }, Me.mouseup = (d) => {
      e.events.onOnce("input", () => {
        let E = oo[d.button];
        E && (e.buttonsByMouse.has(E) && e.buttonsByMouse.get(E)?.forEach((V) => {
          e.buttonState.release(V), e.events.trigger("buttonRelease", V);
        }), e.mouseState.release(E), e.events.trigger("mouseRelease", E));
      });
    };
    let Ha = /* @__PURE__ */ new Set([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"]), io = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", " ": "space" };
    Me.keydown = (d) => {
      Ha.has(d.key) && d.preventDefault(), e.events.onOnce("input", () => {
        let E = io[d.key] || d.key.toLowerCase(), V = d.code;
        if (E === void 0) throw new Error(`Unknown key: ${d.key}`);
        E.length === 1 ? (e.events.trigger("charInput", E), e.charInputted.push(E)) : E === "space" && (e.events.trigger("charInput", " "), e.charInputted.push(" ")), d.repeat ? (e.keyState.pressRepeat(E), e.events.trigger("keyPressRepeat", E)) : (e.lastInputDevice = "keyboard", e.buttonsByKey.has(E) && e.buttonsByKey.get(E)?.forEach((I) => {
          e.buttonState.press(I), e.events.trigger("buttonPress", I);
        }), e.buttonsByKeyCode.has(V) && e.buttonsByKeyCode.get(V)?.forEach((I) => {
          e.buttonState.press(I), e.events.trigger("buttonPress", I);
        }), e.keyState.press(E), e.events.trigger("keyPressRepeat", E), e.events.trigger("keyPress", E));
      });
    }, Me.keyup = (d) => {
      e.events.onOnce("input", () => {
        let E = io[d.key] || d.key.toLowerCase(), V = d.code;
        e.buttonsByKey.has(E) && e.buttonsByKey.get(E)?.forEach((I) => {
          e.buttonState.release(I), e.events.trigger("buttonRelease", I);
        }), e.buttonsByKeyCode.has(V) && e.buttonsByKeyCode.get(V)?.forEach((I) => {
          e.buttonState.release(I), e.events.trigger("buttonRelease", I);
        }), e.keyState.release(E), e.events.trigger("keyRelease", E);
      });
    }, Me.touchstart = (d) => {
      d.preventDefault(), e.events.onOnce("input", () => {
        let E = [...d.changedTouches], V = e.canvas.getBoundingClientRect();
        t18.touchToMouse !== false && (e.mousePos = new v(E[0].clientX - V.x, E[0].clientY - V.y), e.lastInputDevice = "mouse", e.buttonsByMouse.has("left") && e.buttonsByMouse.get("left")?.forEach((I) => {
          e.buttonState.press(I), e.events.trigger("buttonPress", I);
        }), e.mouseState.press("left"), e.events.trigger("mousePress", "left")), E.forEach((I) => {
          e.events.trigger("touchStart", new v(I.clientX - V.x, I.clientY - V.y), I);
        });
      });
    }, Me.touchmove = (d) => {
      d.preventDefault(), e.events.onOnce("input", () => {
        let E = [...d.changedTouches], V = e.canvas.getBoundingClientRect();
        if (t18.touchToMouse !== false) {
          let I = e.mousePos;
          e.mousePos = new v(E[0].clientX - V.x, E[0].clientY - V.y), e.mouseDeltaPos = e.mousePos.sub(I), e.events.trigger("mouseMove");
        }
        E.forEach((I) => {
          e.events.trigger("touchMove", new v(I.clientX - V.x, I.clientY - V.y), I);
        });
      });
    }, Me.touchend = (d) => {
      e.events.onOnce("input", () => {
        let E = [...d.changedTouches], V = e.canvas.getBoundingClientRect();
        t18.touchToMouse !== false && (e.mousePos = new v(E[0].clientX - V.x, E[0].clientY - V.y), e.mouseDeltaPos = new v(0, 0), e.buttonsByMouse.has("left") && e.buttonsByMouse.get("left")?.forEach((I) => {
          e.buttonState.release(I), e.events.trigger("buttonRelease", I);
        }), e.mouseState.release("left"), e.events.trigger("mouseRelease", "left")), E.forEach((I) => {
          e.events.trigger("touchEnd", new v(I.clientX - V.x, I.clientY - V.y), I);
        });
      });
    }, Me.touchcancel = (d) => {
      e.events.onOnce("input", () => {
        let E = [...d.changedTouches], V = e.canvas.getBoundingClientRect();
        t18.touchToMouse !== false && (e.mousePos = new v(E[0].clientX - V.x, E[0].clientY - V.y), e.mouseState.release("left"), e.events.trigger("mouseRelease", "left")), E.forEach((I) => {
          e.events.trigger("touchEnd", new v(I.clientX - V.x, I.clientY - V.y), I);
        });
      });
    }, Me.wheel = (d) => {
      d.preventDefault(), e.events.onOnce("input", () => {
        e.events.trigger("scroll", new v(d.deltaX, d.deltaY));
      });
    }, Me.contextmenu = (d) => d.preventDefault(), ar.visibilitychange = () => {
      document.visibilityState === "visible" ? (e.skipTime = true, e.isHidden = false, e.events.trigger("show")) : (e.isHidden = true, e.events.trigger("hide"));
    }, bn.gamepadconnected = (d) => {
      let E = no(d.gamepad);
      e.events.onOnce("input", () => {
        e.events.trigger("gamepadConnect", E);
      });
    }, bn.gamepaddisconnected = (d) => {
      let E = to().filter((V) => V.index === d.gamepad.index)[0];
      _a(d.gamepad), e.events.onOnce("input", () => {
        e.events.trigger("gamepadDisconnect", E);
      });
    };
    for (let [d, E] of Object.entries(Me)) e.canvas.addEventListener(d, E);
    for (let [d, E] of Object.entries(ar)) document.addEventListener(d, E);
    for (let [d, E] of Object.entries(bn)) window.addEventListener(d, E);
    let so = new ResizeObserver((d) => {
      for (let E of d) if (E.target === e.canvas) {
        if (e.lastWidth === e.canvas.offsetWidth && e.lastHeight === e.canvas.offsetHeight) return;
        e.lastWidth = e.canvas.offsetWidth, e.lastHeight = e.canvas.offsetHeight, e.events.onOnce("input", () => {
          e.events.trigger("resize");
        });
      }
    });
    return so.observe(e.canvas), { dt: n, fixedDt: r, restDt: o, time: a, run: M, canvas: e.canvas, fps: l, numFrames: u, quit: G, isHidden: s, setFullscreen: b, isFullscreen: T, setCursor: c, screenshot: m, getGamepads: to, getCursor: p, setCursorLocked: f, isCursorLocked: x, isTouchscreen: R, mousePos: F, mouseDeltaPos: h, isKeyDown: $, isKeyPressed: k, isKeyPressedRepeat: N, isKeyReleased: X, isMouseDown: S, isMousePressed: O, isMouseReleased: D, isMouseMoved: U, isGamepadButtonPressed: J, isGamepadButtonDown: W, isGamepadButtonReleased: q, getGamepadStick: Ua, isButtonPressed: ne, isButtonDown: B, isButtonReleased: K, setButton: j, getButton: z, pressButton: ue, releaseButton: ee, charInputted: Fa, onResize: Ce, onKeyDown: Ht, onKeyPress: lt, onKeyPressRepeat: rr, onKeyRelease: or, onMouseDown: ir, onMousePress: sr, onMouseRelease: fn, onMouseMove: Ze, onCharInput: mt, onTouchStart: hn, onTouchMove: ke, onTouchEnd: qt, onScroll: tt, onHide: gn, onShow: Va, onGamepadButtonDown: Ga, onGamepadButtonPress: Pa, onGamepadButtonRelease: Ra, onGamepadStick: Da, onGamepadConnect: Ma, onGamepadDisconnect: Ba, onButtonPress: La, onButtonDown: Ia, onButtonRelease: Ka, getLastInputDeviceType: Jo, events: e.events };
  }, "initApp");
  function Se() {
    return P.dt() * Z.timeScale;
  }
  i(Se, "dt");
  function ni() {
    return P.fixedDt() * Z.timeScale;
  }
  i(ni, "fixedDt");
  function ri() {
    return P.restDt() * Z.timeScale;
  }
  i(ri, "restDt");
  var Su = new v(-1, -1);
  var Vu = new v(0, -1);
  var Pu = new v(1, -1);
  var Gu = new v(-1, 0);
  var Ru = new v(0, 0);
  var Du = new v(1, 0);
  var Mu = new v(-1, 1);
  var Bu = new v(0, 1);
  var Uu = new v(1, 1);
  function He(t18) {
    switch (t18) {
      case "topleft":
        return Su;
      case "top":
        return Vu;
      case "topright":
        return Pu;
      case "left":
        return Gu;
      case "center":
        return Ru;
      case "right":
        return Du;
      case "botleft":
        return Mu;
      case "bot":
        return Bu;
      case "botright":
        return Uu;
      default:
        return t18;
    }
  }
  i(He, "anchorPt");
  function oi(t18) {
    switch (t18) {
      case "left":
        return 0;
      case "center":
        return 0.5;
      case "right":
        return 1;
      default:
        return 0;
    }
  }
  i(oi, "alignPt");
  function ii(t18) {
    return t18.createBuffer(1, 1, 44100);
  }
  i(ii, "createEmptyAudioBuffer");
  var Gn = 2.5949095;
  var si = 1.70158 + 1;
  var ai = 2 * Math.PI / 3;
  var ui = 2 * Math.PI / 4.5;
  var Rn = { linear: i((t18) => t18, "linear"), easeInSine: i((t18) => 1 - Math.cos(t18 * Math.PI / 2), "easeInSine"), easeOutSine: i((t18) => Math.sin(t18 * Math.PI / 2), "easeOutSine"), easeInOutSine: i((t18) => -(Math.cos(Math.PI * t18) - 1) / 2, "easeInOutSine"), easeInQuad: i((t18) => t18 * t18, "easeInQuad"), easeOutQuad: i((t18) => 1 - (1 - t18) * (1 - t18), "easeOutQuad"), easeInOutQuad: i((t18) => t18 < 0.5 ? 2 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 2) / 2, "easeInOutQuad"), easeInCubic: i((t18) => t18 * t18 * t18, "easeInCubic"), easeOutCubic: i((t18) => 1 - Math.pow(1 - t18, 3), "easeOutCubic"), easeInOutCubic: i((t18) => t18 < 0.5 ? 4 * t18 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 3) / 2, "easeInOutCubic"), easeInQuart: i((t18) => t18 * t18 * t18 * t18, "easeInQuart"), easeOutQuart: i((t18) => 1 - Math.pow(1 - t18, 4), "easeOutQuart"), easeInOutQuart: i((t18) => t18 < 0.5 ? 8 * t18 * t18 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 4) / 2, "easeInOutQuart"), easeInQuint: i((t18) => t18 * t18 * t18 * t18 * t18, "easeInQuint"), easeOutQuint: i((t18) => 1 - Math.pow(1 - t18, 5), "easeOutQuint"), easeInOutQuint: i((t18) => t18 < 0.5 ? 16 * t18 * t18 * t18 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 5) / 2, "easeInOutQuint"), easeInExpo: i((t18) => t18 === 0 ? 0 : Math.pow(2, 10 * t18 - 10), "easeInExpo"), easeOutExpo: i((t18) => t18 === 1 ? 1 : 1 - Math.pow(2, -10 * t18), "easeOutExpo"), easeInOutExpo: i((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : t18 < 0.5 ? Math.pow(2, 20 * t18 - 10) / 2 : (2 - Math.pow(2, -20 * t18 + 10)) / 2, "easeInOutExpo"), easeInCirc: i((t18) => 1 - Math.sqrt(1 - Math.pow(t18, 2)), "easeInCirc"), easeOutCirc: i((t18) => Math.sqrt(1 - Math.pow(t18 - 1, 2)), "easeOutCirc"), easeInOutCirc: i((t18) => t18 < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t18, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t18 + 2, 2)) + 1) / 2, "easeInOutCirc"), easeInBack: i((t18) => si * t18 * t18 * t18 - 1.70158 * t18 * t18, "easeInBack"), easeOutBack: i((t18) => 1 + si * Math.pow(t18 - 1, 3) + 1.70158 * Math.pow(t18 - 1, 2), "easeOutBack"), easeInOutBack: i((t18) => t18 < 0.5 ? Math.pow(2 * t18, 2) * ((Gn + 1) * 2 * t18 - Gn) / 2 : (Math.pow(2 * t18 - 2, 2) * ((Gn + 1) * (t18 * 2 - 2) + Gn) + 2) / 2, "easeInOutBack"), easeInElastic: i((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : -Math.pow(2, 10 * t18 - 10) * Math.sin((t18 * 10 - 10.75) * ai), "easeInElastic"), easeOutElastic: i((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : Math.pow(2, -10 * t18) * Math.sin((t18 * 10 - 0.75) * ai) + 1, "easeOutElastic"), easeInOutElastic: i((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : t18 < 0.5 ? -(Math.pow(2, 20 * t18 - 10) * Math.sin((20 * t18 - 11.125) * ui)) / 2 : Math.pow(2, -20 * t18 + 10) * Math.sin((20 * t18 - 11.125) * ui) / 2 + 1, "easeInOutElastic"), easeInBounce: i((t18) => 1 - Rn.easeOutBounce(1 - t18), "easeInBounce"), easeOutBounce: i((t18) => t18 < 1 / 2.75 ? 7.5625 * t18 * t18 : t18 < 2 / 2.75 ? 7.5625 * (t18 -= 1.5 / 2.75) * t18 + 0.75 : t18 < 2.5 / 2.75 ? 7.5625 * (t18 -= 2.25 / 2.75) * t18 + 0.9375 : 7.5625 * (t18 -= 2.625 / 2.75) * t18 + 0.984375, "easeOutBounce"), easeInOutBounce: i((t18) => t18 < 0.5 ? (1 - Rn.easeOutBounce(1 - 2 * t18)) / 2 : (1 + Rn.easeOutBounce(2 * t18 - 1)) / 2, "easeInOutBounce") };
  var ot = Rn;
  function Fu(t18, e, n) {
    let r = [], o = e;
    for (r.push(o); o !== t18; ) {
      if (o = n.get(o), o == null) return null;
      r.push(o);
    }
    return r.reverse();
  }
  i(Fu, "buildPath");
  function Tr(t18, e, n) {
    let r = new Lt((a, l) => a.cost < l.cost);
    r.insert({ cost: 0, node: e });
    let o = /* @__PURE__ */ new Map();
    o.set(e, e);
    let s = /* @__PURE__ */ new Map();
    for (s.set(e, 0); r.length !== 0; ) {
      let a = r.remove()?.node;
      if (a === n) break;
      let l = t18.getNeighbours(a);
      for (let u of l) {
        let m = (s.get(a) || 0) + t18.getCost(a, u) + t18.getHeuristic(u, n);
        (!s.has(u) || m < s.get(u)) && (s.set(u, m), r.insert({ cost: m, node: u }), o.set(u, a));
      }
    }
    return Fu(e, n, o);
  }
  i(Tr, "aStarSearch");
  var Ar = class {
    static {
      i(this, "NavEdge");
    }
    a;
    b;
    polygon;
    constructor(e, n, r) {
      this.a = e, this.b = n, this.polygon = new WeakRef(r);
    }
    isLeft(e, n) {
      return (this.b.x - this.a.x) * (n - this.a.y) - (e - this.a.x) * (this.b.y - this.a.y);
    }
    get middle() {
      return this.a.add(this.b).scale(0.5);
    }
  };
  var Sr = class {
    static {
      i(this, "NavPolygon");
    }
    _edges;
    _centroid;
    _id;
    constructor(e) {
      this._id = e;
    }
    get id() {
      return this._id;
    }
    set edges(e) {
      this._edges = e;
      let n = 0, r = 0, o = 0;
      for (let s of this._edges) {
        s.polygon = new WeakRef(this);
        let a = s.a.x * s.b.y - s.a.y * s.b.x;
        n += (s.a.x + s.b.x) * a, r += (s.a.y + s.b.y) * a, o += a;
      }
      o /= 2, this._centroid = y(n / (6 * o), r / (6 * o));
    }
    get edges() {
      return this._edges;
    }
    get centroid() {
      return this._centroid;
    }
    contains(e) {
      let n = false;
      for (let r of this.edges) r.b.y > e.y != r.a.y > e.y && e.x < (r.a.x - r.b.x) * (e.y - r.b.y) / (r.a.y - r.b.y) + r.b.x && (n = !n);
      return n;
    }
  };
  var Dn = class {
    static {
      i(this, "NavMesh");
    }
    _polygons;
    _pointCache;
    _edgeCache;
    constructor() {
      this._polygons = [], this._pointCache = {}, this._edgeCache = {};
    }
    _addPoint(e) {
      let n = this._pointCache[`${e.x}_${e.y}`];
      return n || (n = e.clone(), this._pointCache[`${e.x}_${e.y}`] = n, n);
    }
    _addEdge(e) {
      let n = `${e.a.x}_${e.a.y}-${e.b.x}_${e.b.y}`;
      return this._edgeCache[n] = e, e;
    }
    _findEdge(e, n) {
      let r = `${e.x}_${e.y}-${n.x}_${n.y}`;
      return this._edgeCache[r];
    }
    _findCommonEdge(e, n) {
      for (let r of e.edges) {
        let o = this._findEdge(r.b, r.a);
        if (o && o.polygon.deref().id === n.id) return o;
      }
      return null;
    }
    addPolygon(e) {
      let n = new Sr(this._polygons.length), r = e.map((o, s) => new Ar(o, e[(s + 1) % e.length], n));
      n.edges = r, this._polygons.push(n);
      for (let o of n.edges) this._addEdge(o);
      return n;
    }
    addRect(e, n) {
      let r = this._addPoint(e), o = this._addPoint(e.add(n.x, 0)), s = this._addPoint(e.add(n)), a = this._addPoint(e.add(0, n.y));
      return this.addPolygon([r, o, s, a]);
    }
    _getLocation(e) {
      for (let n of this._polygons) if (n.contains(e)) return n;
      return null;
    }
    getNeighbours(e) {
      let n = [];
      for (let r of this._polygons[e].edges) {
        let o = this._findEdge(r.b, r.a);
        if (o) {
          let s = o.polygon.deref();
          s && n.push(s.id);
        }
      }
      return n;
    }
    getCost(e, n) {
      return 1;
    }
    getHeuristic(e, n) {
      let r = this._polygons[e], o = this._polygons[n], s = r.centroid.x - o.centroid.x, a = r.centroid.y - o.centroid.y;
      return Math.sqrt(s * s + a * a);
    }
    getPath(e, n) {
      return e === void 0 || n === void 0 ? [] : e === n ? [e, n] : Tr(this, e, n);
    }
    getWaypointPath(e, n, r) {
      let o = r?.type || "centroids", s = this._getLocation(e), a = this._getLocation(n);
      if (s === void 0 || a === void 0) return [];
      let l = this.getPath(s.id, a.id);
      if (!l) return [];
      if (o === "edges") {
        let u = [];
        for (let m = 1; m < l.length; m++) {
          let c = this._polygons[l[m - 1]], p = this._polygons[l[m]], f = this._findCommonEdge(c, p);
          u.push(f.middle.add(p.centroid.sub(f.middle).unit().scale(4)));
        }
        return [e, ...u, n];
      } else return [e, ...l.slice(1, -1).map((u) => this._polygons[u].centroid), n];
    }
  };
  function ft(t18) {
    let e = new ge();
    return t18.pos && e.translate(t18.pos), t18.scale && e.scale(t18.scale), t18.angle && e.rotate(t18.angle), t18.parent ? e.mult(t18.parent.transform) : e;
  }
  i(ft, "calcTransform");
  function ci(t18) {
    return new v(t18.x / fe() * 2 - 1, -t18.y / ye() * 2 + 1);
  }
  i(ci, "screen2ndc");
  function Ct(t18, e, n, r, o, s = 1) {
    r = ce(r % 360), o = ce(o % 360), o <= r && (o += Math.PI * 2);
    let a = [], l = Math.ceil((o - r) / ce(8) * s), u = (o - r) / l, m = y(Math.cos(r), Math.sin(r)), c = y(Math.cos(u), Math.sin(u));
    for (let p = 0; p <= l; p++) a.push(t18.add(e * m.x, n * m.y)), m = y(m.x * c.x - m.y * c.y, m.x * c.y + m.y * c.x);
    return a;
  }
  i(Ct, "getArcPts");
  function li(...t18) {
    let e = Y(...t18), n = t18[3] ?? 1;
    A.bgColor = e, A.bgAlpha = n, A.ggl.gl.clearColor(e.r / 255, e.g / 255, e.b / 255, n);
  }
  i(li, "setBackground");
  function mi() {
    return A.bgColor?.clone?.() ?? null;
  }
  i(mi, "getBackground");
  function re(...t18) {
    if (t18[0] === void 0) return;
    let e = y(...t18);
    e.x === 0 && e.y === 0 || A.transform.translate(e);
  }
  i(re, "pushTranslate");
  function we() {
    A.transformStack.push(A.transform.clone());
  }
  i(we, "pushTransform");
  function pi(t18) {
    A.transform = t18.clone();
  }
  i(pi, "pushMatrix");
  function it(...t18) {
    if (t18[0] === void 0) return;
    let e = y(...t18);
    e.x === 1 && e.y === 1 || A.transform.scale(e);
  }
  i(it, "pushScale");
  function Je(t18) {
    t18 && A.transform.rotate(t18);
  }
  i(Je, "pushRotate");
  function xe() {
    A.transformStack.length > 0 && (A.transform = A.transformStack.pop());
  }
  i(xe, "popTransform");
  function Oe() {
    A.renderer.flush();
  }
  i(Oe, "flush");
  function fe() {
    return A.width;
  }
  i(fe, "width");
  function ye() {
    return A.height;
  }
  i(ye, "height");
  function Mn() {
    return (A.viewport.width + A.viewport.height) / (A.width + A.height);
  }
  i(Mn, "getViewportScale");
  function di(t18) {
    return new v(t18.x * A.viewport.width / A.width, t18.y * A.viewport.height / A.height);
  }
  i(di, "contentToView");
  function Lu(t18) {
    return new v((t18.x - A.viewport.x) * fe() / A.viewport.width, (t18.y - A.viewport.y) * ye() / A.viewport.height);
  }
  i(Lu, "windowToContent");
  function Bn() {
    return Lu(P.mousePos());
  }
  i(Bn, "mousePos");
  function Et() {
    return y(fe() / 2, ye() / 2);
  }
  i(Et, "center");
  var Un = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  var ht = "topleft";
  var fi = "monospace";
  var Ot = "monospace";
  var en = "linear";
  var tn = [{ name: "a_pos", size: 2 }, { name: "a_uv", size: 2 }, { name: "a_color", size: 4 }];
  var Iu = tn.reduce((t18, e) => t18 + e.size, 0);
  var hi = 2048;
  var gi = hi * 4 * Iu;
  var bi = hi * 6;
  var yi = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`;
  var xi = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`;
  var nn = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`;
  var rn = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`;
  var vi = /* @__PURE__ */ new Set(["id", "require"]);
  var wi = /* @__PURE__ */ new Set(["add", "fixedUpdate", "update", "draw", "destroy", "inspect", "drawInspect"]);
  var Ci = 200;
  var Ei = 640;
  var Oi = 65536;
  var on = class {
    static {
      i(this, "TexPacker");
    }
    textures = [];
    bigTextures = [];
    canvas;
    c2d;
    x = 0;
    y = 0;
    curHeight = 0;
    gfx;
    constructor(e, n, r) {
      this.gfx = e, this.canvas = document.createElement("canvas"), this.canvas.width = n, this.canvas.height = r, this.textures = [De.fromImage(e, this.canvas)], this.bigTextures = [];
      let o = this.canvas.getContext("2d");
      if (!o) throw new Error("Failed to get 2d context");
      this.c2d = o;
    }
    add(e) {
      if (e.width > this.canvas.width || e.height > this.canvas.height) {
        let o = De.fromImage(this.gfx, e);
        return this.bigTextures.push(o), [o, new Q(0, 0, 1, 1)];
      }
      this.x + e.width > this.canvas.width && (this.x = 0, this.y += this.curHeight, this.curHeight = 0), this.y + e.height > this.canvas.height && (this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height), this.textures.push(De.fromImage(this.gfx, this.canvas)), this.x = 0, this.y = 0, this.curHeight = 0);
      let n = this.textures[this.textures.length - 1], r = new v(this.x, this.y);
      return this.x += e.width, e.height > this.curHeight && (this.curHeight = e.height), e instanceof ImageData ? this.c2d.putImageData(e, r.x, r.y) : this.c2d.drawImage(e, r.x, r.y), n.update(this.canvas), [n, new Q(r.x / this.canvas.width, r.y / this.canvas.height, e.width / this.canvas.width, e.height / this.canvas.height)];
    }
    free() {
      for (let e of this.textures) e.free();
      for (let e of this.bigTextures) e.free();
    }
  };
  function he(t18) {
    return typeof t18 != "string" || Vn(t18) ? t18 : _.urlPrefix + t18;
  }
  i(he, "fixURL");
  var me = class t14 {
    static {
      i(this, "Asset");
    }
    loaded = false;
    data = null;
    error = null;
    onLoadEvents = new le();
    onErrorEvents = new le();
    onFinishEvents = new le();
    constructor(e) {
      e.then((n) => {
        this.loaded = true, this.data = n, this.onLoadEvents.trigger(n);
      }).catch((n) => {
        if (this.error = n, this.onErrorEvents.numListeners() > 0) this.onErrorEvents.trigger(n);
        else throw n;
      }).finally(() => {
        this.onFinishEvents.trigger(), this.loaded = true;
      });
    }
    static loaded(e) {
      let n = new t14(Promise.resolve(e));
      return n.data = e, n.loaded = true, n;
    }
    onLoad(e) {
      return this.loaded && this.data ? e(this.data) : this.onLoadEvents.add(e), this;
    }
    onError(e) {
      return this.loaded && this.error ? e(this.error) : this.onErrorEvents.add(e), this;
    }
    onFinish(e) {
      return this.loaded ? e() : this.onFinishEvents.add(e), this;
    }
    then(e) {
      return this.onLoad(e);
    }
    catch(e) {
      return this.onError(e);
    }
    finally(e) {
      return this.onFinish(e);
    }
  };
  var gt = class {
    static {
      i(this, "AssetBucket");
    }
    assets = /* @__PURE__ */ new Map();
    lastUID = 0;
    add(e, n) {
      let r = e ?? this.lastUID++ + "", o = new me(n);
      return this.assets.set(r, o), o;
    }
    addLoaded(e, n) {
      let r = e ?? this.lastUID++ + "", o = me.loaded(n);
      return this.assets.set(r, o), o;
    }
    get(e) {
      return this.assets.get(e);
    }
    progress() {
      if (this.assets.size === 0) return 1;
      let e = 0;
      return this.assets.forEach((n) => {
        n.loaded && e++;
      }), e / this.assets.size;
    }
  };
  function Gr(t18) {
    return fetch(t18).then((e) => {
      if (!e.ok) throw new Error(`Failed to fetch "${t18}"`);
      return e;
    });
  }
  i(Gr, "fetchURL");
  function Tt(t18) {
    return Gr(t18).then((e) => e.json());
  }
  i(Tt, "fetchJSON");
  function Ti(t18) {
    return Gr(t18).then((e) => e.text());
  }
  i(Ti, "fetchText");
  function Ai(t18) {
    return Gr(t18).then((e) => e.arrayBuffer());
  }
  i(Ai, "fetchArrayBuffer");
  function Si(t18) {
    return t18 !== void 0 && (_.urlPrefix = t18), _.urlPrefix;
  }
  i(Si, "loadRoot");
  function Vi(t18, e) {
    return _.custom.add(t18, Tt(he(e)));
  }
  i(Vi, "loadJSON");
  function At(t18) {
    let e = new Image();
    return e.crossOrigin = "anonymous", e.src = t18, new Promise((n, r) => {
      e.onload = () => n(e), e.onerror = () => r(new Error(`Failed to load image from "${t18}"`));
    });
  }
  i(At, "loadImg");
  function Le() {
    let t18 = [_.sprites, _.sounds, _.shaders, _.fonts, _.bitmapFonts, _.custom];
    return t18.reduce((e, n) => e + n.progress(), 0) / t18.length;
  }
  i(Le, "loadProgress");
  function Pi(t18) {
    return _.custom.get(t18) ?? null;
  }
  i(Pi, "getAsset");
  function sn(t18) {
    return _.custom.add(null, t18);
  }
  i(sn, "load");
  var Gi = i((t18) => ({ urlPrefix: "", sprites: new gt(), fonts: new gt(), bitmapFonts: new gt(), sounds: new gt(), shaders: new gt(), custom: new gt(), music: {}, packer: new on(t18, 2048, 2048), loaded: false }), "initAssets");
  var Ri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==";
  var Ie = class t15 {
    static {
      i(this, "SpriteData");
    }
    tex;
    frames = [new Q(0, 0, 1, 1)];
    anims = {};
    slice9 = null;
    constructor(e, n, r = {}, o = null) {
      this.tex = e, n && (this.frames = n), this.anims = r, this.slice9 = o;
    }
    get width() {
      return this.tex.width * this.frames[0].w;
    }
    get height() {
      return this.tex.height * this.frames[0].h;
    }
    static from(e, n = {}) {
      return typeof e == "string" ? t15.fromURL(e, n) : Promise.resolve(t15.fromImage(e, n));
    }
    static fromImage(e, n = {}) {
      let [r, o] = _.packer.add(e), s = n.frames ? n.frames.map((a) => new Q(o.x + a.x * o.w, o.y + a.y * o.h, a.w * o.w, a.h * o.h)) : Dr(n.sliceX || 1, n.sliceY || 1, o.x, o.y, o.w, o.h);
      return new t15(r, s, n.anims, n.slice9);
    }
    static fromURL(e, n = {}) {
      return At(e).then((r) => t15.fromImage(r, n));
    }
  };
  function It(t18) {
    if (typeof t18 == "string") {
      let e = Rr(t18);
      if (e) return e;
      if (Le() < 1) return null;
      throw new Error(`Sprite not found: ${t18}`);
    } else {
      if (t18 instanceof Ie) return me.loaded(t18);
      if (t18 instanceof me) return t18;
      throw new Error(`Invalid sprite: ${t18}`);
    }
  }
  i(It, "resolveSprite");
  function Rr(t18) {
    return _.sprites.get(t18) ?? null;
  }
  i(Rr, "getSprite");
  function St(t18, e, n = { sliceX: 1, sliceY: 1, anims: {} }) {
    return e = he(e), Array.isArray(e) ? e.some((r) => typeof r == "string") ? _.sprites.add(t18, Promise.all(e.map((r) => typeof r == "string" ? At(r) : Promise.resolve(r))).then((r) => Di(r, n))) : _.sprites.addLoaded(t18, Di(e, n)) : typeof e == "string" ? _.sprites.add(t18, Ie.from(e, n)) : _.sprites.addLoaded(t18, Ie.fromImage(e, n));
  }
  i(St, "loadSprite");
  function Dr(t18 = 1, e = 1, n = 0, r = 0, o = 1, s = 1) {
    let a = [], l = o / t18, u = s / e;
    for (let m = 0; m < e; m++) for (let c = 0; c < t18; c++) a.push(new Q(n + c * l, r + m * u, l, u));
    return a;
  }
  i(Dr, "slice");
  function Di(t18, e = {}) {
    let n = document.createElement("canvas"), r = t18[0].width, o = t18[0].height;
    n.width = r * t18.length, n.height = o;
    let s = n.getContext("2d");
    if (!s) throw new Error("Failed to create canvas context");
    t18.forEach((l, u) => {
      l instanceof ImageData ? s.putImageData(l, u * r, 0) : s.drawImage(l, u * r, 0);
    });
    let a = s.getImageData(0, 0, t18.length * r, o);
    return Ie.fromImage(a, { ...e, sliceX: t18.length, sliceY: 1 });
  }
  i(Di, "createSpriteSheet");
  function Mi(t18 = "bean") {
    return St(t18, Ri);
  }
  i(Mi, "loadBean");
  function Bi(t18, e, n) {
    e = he(e), n = he(n), typeof e == "string" && !n && (n = zo(e) + ".json");
    let r = typeof n == "string" ? Tt(n) : Promise.resolve(n);
    return _.sprites.add(t18, r.then((o) => {
      let s = o.meta.size, a = o.frames.map((u) => new Q(u.frame.x / s.w, u.frame.y / s.h, u.frame.w / s.w, u.frame.h / s.h)), l = {};
      for (let u of o.meta.frameTags) u.from === u.to ? l[u.name] = u.from : l[u.name] = { from: u.from, to: u.to, speed: 10, loop: true, pingpong: u.direction === "pingpong" };
      return Ie.from(e, { frames: a, anims: l });
    }));
  }
  i(Bi, "loadAseprite");
  var Vt = class {
    static {
      i(this, "FontData");
    }
    fontface;
    filter = en;
    outline = null;
    size = 64;
    constructor(e, n = {}) {
      if (this.fontface = e, this.filter = n.filter ?? en, this.size = n.size ?? 64, this.size > 256) throw new Error(`Max font size: ${256}`);
      n.outline && (this.outline = { width: 1, color: Y(0, 0, 0) }, typeof n.outline == "number" ? this.outline.width = n.outline : typeof n.outline == "object" && (n.outline.width && (this.outline.width = n.outline.width), n.outline.color && (this.outline.color = n.outline.color)));
    }
  };
  function Mr(t18) {
    if (!t18) return Mr(ie.font ?? fi);
    if (typeof t18 == "string") {
      let e = Fn(t18), n = Br(t18);
      if (e) return e.data ?? e;
      if (n) return n.data ?? n;
      if (document.fonts.check(`${64}px ${t18}`)) return t18;
      if (Le() < 1) return null;
      throw new Error(`Font not found: ${t18}`);
    } else if (t18 instanceof me) return t18.data ? t18.data : t18;
    return t18;
  }
  i(Mr, "resolveFont");
  function Br(t18) {
    return _.fonts.get(t18) ?? null;
  }
  i(Br, "getFont");
  function Ui(t18, e, n = {}) {
    let r = he(e), o = new FontFace(t18, typeof e == "string" ? `url(${r})` : r);
    return document.fonts.add(o), _.fonts.add(t18, o.load().catch((s) => {
      throw new Error(`Failed to load font from "${r}": ${s}`);
    }).then((s) => new Vt(s, n)));
  }
  i(Ui, "loadFont");
  function Fi(t18, e, n, r) {
    let o = t18.width / e, s = {}, a = r.split("").entries();
    for (let [l, u] of a) s[u] = new Q(l % o * e, Math.floor(l / o) * n, e, n);
    return { tex: t18, map: s, size: n };
  }
  i(Fi, "makeFont");
  function Fn(t18) {
    return _.bitmapFonts.get(t18) ?? null;
  }
  i(Fn, "getBitmapFont");
  function Li(t18, e, n, r, o = {}) {
    let s = he(e);
    return _.bitmapFonts.add(t18, At(s).then((a) => Fi(De.fromImage(A.ggl, a, o), n, r, o.chars ?? Un)));
  }
  i(Li, "loadBitmapFont");
  function Ii(t18, e) {
    return e = he(e), _.sprites.add(t18, new Promise(async (n) => {
      let r = typeof e == "string" ? await Tt(e) : e, o = await Promise.all(r.frames.map(At)), s = document.createElement("canvas");
      s.width = r.width, s.height = r.height * r.frames.length;
      let a = s.getContext("2d");
      if (!a) throw new Error("Failed to create canvas context");
      o.forEach((u, m) => {
        a.drawImage(u, 0, m * r.height);
      });
      let l = await St(null, s, { sliceY: r.frames.length, anims: r.anims });
      n(l);
    }));
  }
  i(Ii, "loadPedit");
  var Ur = class {
    static {
      i(this, "Shader");
    }
    ctx;
    glProgram;
    constructor(e, n, r, o) {
      this.ctx = e, e.onDestroy(() => this.free());
      let s = e.gl, a = s.createShader(s.VERTEX_SHADER), l = s.createShader(s.FRAGMENT_SHADER);
      if (!a || !l) throw new Error("Failed to create shader");
      s.shaderSource(a, n), s.shaderSource(l, r), s.compileShader(a), s.compileShader(l);
      let u = s.createProgram();
      if (this.glProgram = u, s.attachShader(u, a), s.attachShader(u, l), o.forEach((m, c) => s.bindAttribLocation(u, c, m)), s.linkProgram(u), !s.getProgramParameter(u, s.LINK_STATUS)) {
        let m = s.getShaderInfoLog(a);
        if (m) throw new Error("VERTEX SHADER " + m);
        let c = s.getShaderInfoLog(l);
        if (c) throw new Error("FRAGMENT SHADER " + c);
      }
      s.deleteShader(a), s.deleteShader(l);
    }
    bind() {
      this.ctx.pushProgram(this.glProgram);
    }
    unbind() {
      this.ctx.popProgram();
    }
    send(e) {
      let n = this.ctx.gl;
      for (let r in e) {
        let o = e[r], s = n.getUniformLocation(this.glProgram, r);
        if (typeof o == "number") n.uniform1f(s, o);
        else if (o instanceof ge) n.uniformMatrix4fv(s, false, new Float32Array(o.m));
        else if (o instanceof H) n.uniform3f(s, o.r, o.g, o.b);
        else if (o instanceof v) n.uniform2f(s, o.x, o.y);
        else if (Array.isArray(o)) {
          let a = o[0];
          No(o) ? n.uniform1fv(s, o) : _o(o) ? n.uniform2fv(s, o.map((l) => [l.x, l.y]).flat()) : ko(o) && n.uniform3fv(s, o.map((l) => [l.r, l.g, l.b]).flat());
        } else throw new Error("Unsupported uniform data type");
      }
    }
    free() {
      this.ctx.gl.deleteProgram(this.glProgram);
    }
  };
  function Ln(t18, e = nn, n = rn) {
    let r = yi.replace("{{user}}", e ?? nn), o = xi.replace("{{user}}", n ?? rn);
    try {
      return new Ur(t18, r, o, tn.map((s) => s.name));
    } catch (s) {
      let l = /(?<type>^\w+) SHADER ERROR: 0:(?<line>\d+): (?<msg>.+)/, u = Yo(s).match(l);
      if (!u?.groups) throw s;
      let m = Number(u.groups.line) - 14, c = u.groups.msg.trim(), p = u.groups.type.toLowerCase();
      throw new Error(`${p} shader line ${m}: ${c}`);
    }
  }
  i(Ln, "makeShader");
  function Ki(t18) {
    if (!t18) return A.defShader;
    if (typeof t18 == "string") {
      let e = Fr(t18);
      if (e) return e.data ?? e;
      if (Le() < 1) return null;
      throw new Error(`Shader not found: ${t18}`);
    } else if (t18 instanceof me) return t18.data ? t18.data : t18;
    return t18;
  }
  i(Ki, "resolveShader");
  function Fr(t18) {
    return _.shaders.get(t18) ?? null;
  }
  i(Fr, "getShader");
  function ji(t18, e, n) {
    return _.shaders.addLoaded(t18, Ln(A.ggl, e, n));
  }
  i(ji, "loadShader");
  function ki(t18, e, n) {
    e = he(e), n = he(n);
    let r = i((s) => s ? Ti(s) : Promise.resolve(null), "resolveUrl"), o = Promise.all([r(e), r(n)]).then(([s, a]) => Ln(A.ggl, s, a));
    return _.shaders.add(t18, o);
  }
  i(ki, "loadShaderURL");
  var st = class t16 {
    static {
      i(this, "SoundData");
    }
    buf;
    constructor(e) {
      this.buf = e;
    }
    static fromArrayBuffer(e) {
      return new Promise((n, r) => se.ctx.decodeAudioData(e, n, r)).then((n) => new t16(n));
    }
    static fromURL(e) {
      return Vn(e) ? t16.fromArrayBuffer(Ho(e)) : Ai(e).then((n) => t16.fromArrayBuffer(n));
    }
  };
  function _i(t18) {
    if (typeof t18 == "string") {
      let e = Lr(t18);
      if (e) return e;
      if (Le() < 1) return null;
      throw new Error(`Sound not found: ${t18}`);
    } else {
      if (t18 instanceof st) return me.loaded(t18);
      if (t18 instanceof me) return t18;
      throw new Error(`Invalid sound: ${t18}`);
    }
  }
  i(_i, "resolveSound");
  function Lr(t18) {
    return _.sounds.get(t18) ?? null;
  }
  i(Lr, "getSound");
  function Ni(t18, e) {
    return e = he(e), _.sounds.add(t18, typeof e == "string" ? st.fromURL(e) : st.fromArrayBuffer(e));
  }
  i(Ni, "loadSound");
  function Hi(t18, e) {
    let n = he(e), r = new Audio(n);
    return r.preload = "auto", _.music[t18] = n;
  }
  i(Hi, "loadMusic");
  function Ir(t18, e) {
    return t18 = he(t18), typeof e == "string" ? sn(new Promise((n, r) => {
      Tt(e).then((o) => {
        Ir(t18, o).then(n).catch(r);
      });
    })) : sn(Ie.from(t18).then((n) => {
      let r = {};
      for (let o in e) {
        let s = e[o], a = n.frames[0], l = 2048 * a.w, u = 2048 * a.h, m = s.frames ? s.frames.map((p) => new Q(a.x + (s.x + p.x) / l * a.w, a.y + (s.y + p.y) / u * a.h, p.w / l * a.w, p.h / u * a.h)) : Dr(s.sliceX || 1, s.sliceY || 1, a.x + s.x / l * a.w, a.y + s.y / u * a.h, s.width / l * a.w, s.height / u * a.h), c = new Ie(n.tex, m, s.anims);
        _.sprites.addLoaded(o, c), r[o] = c;
      }
      return r;
    }));
  }
  i(Ir, "loadSpriteAtlas");
  function Ke(t18, e, n = false, r, o, s = {}) {
    let a = r ?? A.defTex, l = o ?? A.defShader, u = Ki(l);
    if (!u || u instanceof me) return;
    let m = A.fixed || n ? A.transform : w.cam.transform.mult(A.transform), c = [];
    for (let p of t18) {
      let f = ci(m.multVec2(p.pos));
      c.push(f.x, f.y, p.uv.x, p.uv.y, p.color.r / 255, p.color.g / 255, p.color.b / 255, p.opacity);
    }
    A.renderer.push(A.ggl.gl.TRIANGLES, c, e, u, a, s);
  }
  i(Ke, "drawRaw");
  function qe(t18) {
    if (!t18.pts) throw new Error('drawPolygon() requires property "pts".');
    let e = t18.pts.length;
    if (!(e < 3)) {
      if (we(), re(t18.pos), it(t18.scale), Je(t18.angle), re(t18.offset), t18.fill !== false) {
        let n = t18.color ?? H.WHITE, r = t18.pts.map((s, a) => ({ pos: new v(s.x, s.y), uv: t18.uv ? t18.uv[a] : new v(0, 0), color: t18.colors && t18.colors[a] ? t18.colors[a].mult(n) : n, opacity: t18.opacity ?? 1 })), o;
        t18.triangulate ? o = An(t18.pts).map((a) => a.map((l) => t18.pts.indexOf(l))).flat() : o = [...Array(e - 2).keys()].map((s) => [0, s + 1, s + 2]).flat(), Ke(r, t18.indices ?? o, t18.fixed, t18.uv ? t18.tex : A.defTex, t18.shader, t18.uniform ?? void 0);
      }
      t18.outline && Kt({ pts: [...t18.pts, t18.pts[0]], radius: t18.radius, width: t18.outline.width, color: t18.outline.color, join: t18.outline.join, uniform: t18.uniform, fixed: t18.fixed, opacity: t18.opacity ?? t18.outline.opacity }), xe();
    }
  }
  i(qe, "drawPolygon");
  function In(t18) {
    if (t18.radiusX === void 0 || t18.radiusY === void 0) throw new Error('drawEllipse() requires properties "radiusX" and "radiusY".');
    if (t18.radiusX === 0 || t18.radiusY === 0) return;
    let e = t18.start ?? 0, n = t18.end ?? 360, r = He(t18.anchor ?? "center").scale(new v(-t18.radiusX, -t18.radiusY)), o = Ct(r, t18.radiusX, t18.radiusY, e, n, t18.resolution);
    o.unshift(r);
    let s = Object.assign({}, t18, { pts: o, radius: 0, ...t18.gradient ? { colors: [t18.gradient[0], ...Array(o.length - 1).fill(t18.gradient[1])] } : {} });
    if (n - e >= 360 && t18.outline) {
      t18.fill !== false && qe(Object.assign({}, s, { outline: null })), qe(Object.assign({}, s, { pts: o.slice(1), fill: false }));
      return;
    }
    qe(s);
  }
  i(In, "drawEllipse");
  function bt(t18) {
    if (typeof t18.radius != "number") throw new Error('drawCircle() requires property "radius".');
    t18.radius !== 0 && In(Object.assign({}, t18, { radiusX: t18.radius, radiusY: t18.radius, angle: 0 }));
  }
  i(bt, "drawCircle");
  function jt(t18) {
    let { p1: e, p2: n } = t18;
    if (!e || !n) throw new Error('drawLine() requires properties "p1" and "p2".');
    let r = t18.width || 1, o = n.sub(e).unit().normal().scale(r * 0.5), s = [e.sub(o), e.add(o), n.add(o), n.sub(o)].map((a) => ({ pos: new v(a.x, a.y), uv: new v(0), color: t18.color ?? H.WHITE, opacity: t18.opacity ?? 1 }));
    Ke(s, [0, 1, 3, 1, 2, 3], t18.fixed, A.defTex, t18.shader, t18.uniform ?? void 0);
  }
  i(jt, "drawLine");
  function ju(t18) {
    let e = t18.pts, n = [], r = (t18.width || 1) * 0.5, o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]), s = t18.pos || y(0, 0), a;
    o ? a = e[0].sub(e[e.length - 2]) : a = e[1].sub(e[0]);
    let l = a.len(), u = a.normal().scale(-r / l), m, c = e[0];
    if (!o) switch (t18.cap) {
      case "square": {
        let g = a.scale(-r / l);
        n.push(c.add(g).add(u)), n.push(c.add(g).sub(u));
        break;
      }
      case "round": {
        let g = Math.max(r, 10), C = Math.PI / g, b = u.scale(-1), T = Math.cos(C), G = Math.sin(C);
        for (let M = 0; M < g; M++) n.push(c), n.push(c.sub(b)), b = y(b.x * T - b.y * G, b.x * G + b.y * T);
      }
    }
    for (let g = 1; g < e.length; g++) {
      if (c === e[g] || c.eq(e[g])) continue;
      m = c, c = e[g];
      let C = c.sub(m), b = C.len(), T = C.normal().scale(-r / b), G = a.cross(C);
      if (Math.abs(G) / (l * b) < 0.05) {
        n.push(m.add(u)), n.push(m.sub(u)), a.dot(C) < 0 && (n.push(m.sub(u)), n.push(m.add(u))), a = C, l = b, u = T;
        continue;
      }
      let M = T.sub(u).cross(C) / G, R = u.add(a.scale(M));
      G > 0 ? (n.push(m.add(R)), n.push(m.sub(u)), n.push(m.add(R)), n.push(m.sub(T))) : (n.push(m.add(u)), n.push(m.sub(R)), n.push(m.add(T)), n.push(m.sub(R))), a = C, l = b, u = T;
    }
    if (!o) switch (n.push(c.add(u)), n.push(c.sub(u)), t18.cap) {
      case "square": {
        let g = a.scale(r / l);
        n.push(c.add(g).add(u)), n.push(c.add(g).sub(u));
        break;
      }
      case "round": {
        let g = Math.max(r, 10), C = Math.PI / g, b = u.scale(1), T = Math.cos(C), G = Math.sin(C);
        for (let M = 0; M < g; M++) b = y(b.x * T - b.y * G, b.x * G + b.y * T), n.push(c), n.push(c.sub(b));
      }
    }
    if (n.length < 4) return;
    let p = n.map((g) => ({ pos: s.add(g), uv: y(), color: t18.color || H.WHITE, opacity: t18.opacity ?? 1 })), f = [], x = 0;
    for (let g = 0; g < n.length - 2; g += 2) f[x++] = g + 1, f[x++] = g, f[x++] = g + 2, f[x++] = g + 2, f[x++] = g + 3, f[x++] = g + 1;
    o && (f[x++] = n.length - 1, f[x++] = n.length - 2, f[x++] = 0, f[x++] = 0, f[x++] = 1, f[x++] = n.length - 1), Ke(p, f, t18.fixed, A.defTex, t18.shader, t18.uniform ?? void 0);
  }
  i(ju, "_drawLinesBevel");
  function ku(t18) {
    let e = t18.pts, n = [], r = (t18.width || 1) * 0.5, o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]), s = t18.pos || y(0, 0), a;
    o ? a = e[0].sub(e[e.length - 2]) : a = e[1].sub(e[0]);
    let l = a.len(), u = a.normal().scale(-r / l), m, c = e[0];
    if (!o) switch (t18.cap) {
      case "square": {
        let g = a.scale(-r / l);
        n.push(c.add(g).add(u)), n.push(c.add(g).sub(u));
        break;
      }
      case "round": {
        let g = Math.max(r, 10), C = Math.PI / g, b = u.scale(-1), T = Math.cos(C), G = Math.sin(C);
        for (let M = 0; M < g; M++) n.push(c), n.push(c.sub(b)), b = y(b.x * T - b.y * G, b.x * G + b.y * T);
      }
    }
    for (let g = 1; g < e.length; g++) {
      if (c === e[g] || c.eq(e[g])) continue;
      m = c, c = e[g];
      let C = c.sub(m), b = C.len(), T = C.normal().scale(-r / b), G = a.cross(C);
      if (Math.abs(G) / (l * b) < 0.05) {
        n.push(m.add(u)), n.push(m.sub(u)), a.dot(C) < 0 && (n.push(m.sub(u)), n.push(m.add(u))), a = C, l = b, u = T;
        continue;
      }
      let M = T.sub(u).cross(C) / G, R = u.add(a.scale(M));
      if (G > 0) {
        let F = m.add(R), h = Math.max(r, 10), O = ce(u.angleBetween(T) / h), S = u, D = Math.cos(O), U = Math.sin(O);
        for (let k = 0; k < h; k++) n.push(F), n.push(m.sub(S)), S = y(S.x * D - S.y * U, S.x * U + S.y * D);
      } else {
        let F = m.sub(R), h = Math.max(r, 10), O = ce(u.angleBetween(T) / h), S = u, D = Math.cos(O), U = Math.sin(O);
        for (let k = 0; k < h; k++) n.push(m.add(S)), n.push(F), S = y(S.x * D - S.y * U, S.x * U + S.y * D);
      }
      a = C, l = b, u = T;
    }
    if (!o) switch (n.push(c.add(u)), n.push(c.sub(u)), t18.cap) {
      case "square": {
        let g = a.scale(r / l);
        n.push(c.add(g).add(u)), n.push(c.add(g).sub(u));
        break;
      }
      case "round": {
        let g = Math.max(r, 10), C = Math.PI / g, b = u.scale(1), T = Math.cos(C), G = Math.sin(C);
        for (let M = 0; M < g; M++) b = y(b.x * T - b.y * G, b.x * G + b.y * T), n.push(c), n.push(c.sub(b));
      }
    }
    if (n.length < 4) return;
    let p = n.map((g) => ({ pos: s.add(g), uv: y(), color: t18.color || H.WHITE, opacity: t18.opacity ?? 1 })), f = [], x = 0;
    for (let g = 0; g < n.length - 2; g += 2) f[x++] = g + 1, f[x++] = g, f[x++] = g + 2, f[x++] = g + 2, f[x++] = g + 3, f[x++] = g + 1;
    o && (f[x++] = n.length - 1, f[x++] = n.length - 2, f[x++] = 0, f[x++] = 0, f[x++] = 1, f[x++] = n.length - 1), Ke(p, f, t18.fixed, A.defTex, t18.shader, t18.uniform ?? void 0);
  }
  i(ku, "_drawLinesRound");
  function _u(t18) {
    let e = t18.pts, n = [], r = (t18.width || 1) * 0.5, o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]), s = t18.pos || y(0, 0), a;
    o ? a = e[0].sub(e[e.length - 2]) : a = e[1].sub(e[0]);
    let l = a.len(), u = a.normal().scale(-r / l), m, c = e[0];
    if (!o) switch (t18.cap) {
      case "square": {
        let g = a.scale(-r / l);
        n.push(c.add(g).add(u)), n.push(c.add(g).sub(u));
        break;
      }
      case "round": {
        let g = Math.max(r, 10), C = Math.PI / g, b = u.scale(-1), T = Math.cos(C), G = Math.sin(C);
        for (let M = 0; M < g; M++) n.push(c), n.push(c.sub(b)), b = y(b.x * T - b.y * G, b.x * G + b.y * T);
      }
    }
    for (let g = 1; g < e.length; g++) {
      if (c === e[g] || c.eq(e[g])) continue;
      m = c, c = e[g];
      let C = c.sub(m), b = C.len(), T = C.normal().scale(-r / b), G = a.cross(C);
      if (Math.abs(G) / (l * b) < 0.05) {
        n.push(m.add(u)), n.push(m.sub(u)), a.dot(C) < 0 && (n.push(m.sub(u)), n.push(m.add(u))), a = C, l = b, u = T;
        continue;
      }
      let M = T.sub(u).cross(C) / G, R = u.add(a.scale(M));
      n.push(m.add(R)), n.push(m.sub(R)), a = C, l = b, u = T;
    }
    if (!o) switch (n.push(c.add(u)), n.push(c.sub(u)), t18.cap) {
      case "square": {
        let g = a.scale(r / l);
        n.push(c.add(g).add(u)), n.push(c.add(g).sub(u));
        break;
      }
      case "round": {
        let g = Math.max(r, 10), C = Math.PI / g, b = u.scale(1), T = Math.cos(C), G = Math.sin(C);
        for (let M = 0; M < g; M++) b = y(b.x * T - b.y * G, b.x * G + b.y * T), n.push(c), n.push(c.sub(b));
      }
    }
    if (n.length < 4) return;
    let p = n.map((g) => ({ pos: s.add(g), uv: y(), color: t18.color || H.WHITE, opacity: t18.opacity ?? 1 })), f = [], x = 0;
    for (let g = 0; g < n.length - 2; g += 2) f[x++] = g + 1, f[x++] = g, f[x++] = g + 2, f[x++] = g + 2, f[x++] = g + 3, f[x++] = g + 1;
    o && (f[x++] = n.length - 1, f[x++] = n.length - 2, f[x++] = 0, f[x++] = 0, f[x++] = 1, f[x++] = n.length - 1), Ke(p, f, t18.fixed, A.defTex, t18.shader, t18.uniform ?? void 0);
  }
  i(_u, "_drawLinesMiter");
  function Kt(t18) {
    let e = t18.pts, n = t18.width ?? 1;
    if (!e) throw new Error('drawLines() requires property "pts".');
    if (!(e.length < 2)) {
      if (e.length > 2) switch (t18.join) {
        case "bevel":
          return ju(t18);
        case "round":
          return ku(t18);
        case "miter":
          return _u(t18);
      }
      if (t18.radius && e.length >= 3) {
        jt(Object.assign({}, t18, { p1: e[0], p2: e[1] }));
        for (let r = 1; r < e.length - 2; r++) {
          let o = e[r], s = e[r + 1];
          jt(Object.assign({}, t18, { p1: o, p2: s }));
        }
        jt(Object.assign({}, t18, { p1: e[e.length - 2], p2: e[e.length - 1] }));
      } else for (let r = 0; r < e.length - 1; r++) jt(Object.assign({}, t18, { p1: e[r], p2: e[r + 1] })), t18.join !== "none" && bt(Object.assign({}, t18, { pos: e[r], radius: n / 2 }));
    }
  }
  i(Kt, "drawLines");
  function Kn(t18, e) {
    let n = e.segments ?? 16, r = [];
    for (let o = 0; o <= n; o++) r.push(t18(o / n));
    Kt({ pts: r, width: e.width || 1, pos: e.pos, color: e.color, opacity: e.opacity });
  }
  i(Kn, "drawCurve");
  function qi(t18) {
    Kn((e) => Xt(t18.pt1, t18.pt2, t18.pt3, t18.pt4, e), t18);
  }
  i(qi, "drawBezier");
  var De = class t17 {
    static {
      i(this, "Texture");
    }
    ctx;
    src = null;
    glTex;
    width;
    height;
    constructor(e, n, r, o = {}) {
      this.ctx = e;
      let s = e.gl, a = e.gl.createTexture();
      if (!a) throw new Error("Failed to create texture");
      this.glTex = a, e.onDestroy(() => this.free()), this.width = n, this.height = r;
      let l = { linear: s.LINEAR, nearest: s.NEAREST }[o.filter ?? e.opts.texFilter ?? "nearest"], u = { repeat: s.REPEAT, clampToEdge: s.CLAMP_TO_EDGE }[o.wrap ?? "clampToEdge"];
      this.bind(), n && r && s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, n, r, 0, s.RGBA, s.UNSIGNED_BYTE, null), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, l), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, l), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, u), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, u), this.unbind();
    }
    static fromImage(e, n, r = {}) {
      let o = new t17(e, n.width, n.height, r);
      return o.update(n), o.src = n, o;
    }
    update(e, n = 0, r = 0) {
      let o = this.ctx.gl;
      this.bind(), o.texSubImage2D(o.TEXTURE_2D, 0, n, r, o.RGBA, o.UNSIGNED_BYTE, e), this.unbind();
    }
    bind() {
      this.ctx.pushTexture2D(this.glTex);
    }
    unbind() {
      this.ctx.popTexture2D();
    }
    free() {
      this.ctx.gl.deleteTexture(this.glTex);
    }
  };
  var at = class {
    static {
      i(this, "FrameBuffer");
    }
    ctx;
    tex;
    glFramebuffer;
    glRenderbuffer;
    constructor(e, n, r, o = {}) {
      this.ctx = e;
      let s = e.gl;
      e.onDestroy(() => this.free()), this.tex = new De(e, n, r, o);
      let a = s.createFramebuffer(), l = s.createRenderbuffer();
      if (!a || !l) throw new Error("Failed to create framebuffer");
      this.glFramebuffer = a, this.glRenderbuffer = l, this.bind(), s.renderbufferStorage(s.RENDERBUFFER, s.DEPTH_STENCIL, n, r), s.framebufferTexture2D(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.tex.glTex, 0), s.framebufferRenderbuffer(s.FRAMEBUFFER, s.DEPTH_STENCIL_ATTACHMENT, s.RENDERBUFFER, this.glRenderbuffer), this.unbind();
    }
    get width() {
      return this.tex.width;
    }
    get height() {
      return this.tex.height;
    }
    toImageData() {
      let e = this.ctx.gl, n = new Uint8ClampedArray(this.width * this.height * 4);
      this.bind(), e.readPixels(0, 0, this.width, this.height, e.RGBA, e.UNSIGNED_BYTE, n), this.unbind();
      let r = this.width * 4, o = new Uint8Array(r);
      for (let s = 0; s < (this.height / 2 | 0); s++) {
        let a = s * r, l = (this.height - s - 1) * r;
        o.set(n.subarray(a, a + r)), n.copyWithin(a, l, l + r), n.set(o, l);
      }
      return new ImageData(n, this.width, this.height);
    }
    toDataURL() {
      let e = document.createElement("canvas"), n = e.getContext("2d");
      if (e.width = this.width, e.height = this.height, !n) throw new Error("Failed to get 2d context");
      return n.putImageData(this.toImageData(), 0, 0), e.toDataURL();
    }
    clear() {
      let e = this.ctx.gl;
      e.clear(e.COLOR_BUFFER_BIT);
    }
    draw(e) {
      this.bind(), e(), this.unbind();
    }
    bind() {
      this.ctx.pushFramebuffer(this.glFramebuffer), this.ctx.pushRenderbuffer(this.glRenderbuffer), this.ctx.pushViewport({ x: 0, y: 0, w: this.width, h: this.height });
    }
    unbind() {
      this.ctx.popFramebuffer(), this.ctx.popRenderbuffer(), this.ctx.popViewport();
    }
    free() {
      let e = this.ctx.gl;
      e.deleteFramebuffer(this.glFramebuffer), e.deleteRenderbuffer(this.glRenderbuffer), this.tex.free();
    }
  };
  var jn = class {
    static {
      i(this, "BatchRenderer");
    }
    ctx;
    glVBuf;
    glIBuf;
    vqueue = [];
    iqueue = [];
    stride;
    maxVertices;
    maxIndices;
    vertexFormat;
    numDraws = 0;
    curPrimitive = null;
    curTex = null;
    curShader = null;
    curUniform = {};
    constructor(e, n, r, o) {
      let s = e.gl;
      this.vertexFormat = n, this.ctx = e, this.stride = n.reduce((l, u) => l + u.size, 0), this.maxVertices = r, this.maxIndices = o;
      let a = s.createBuffer();
      if (!a) throw new Error("Failed to create vertex buffer");
      this.glVBuf = a, e.pushArrayBuffer(this.glVBuf), s.bufferData(s.ARRAY_BUFFER, r * 4, s.DYNAMIC_DRAW), e.popArrayBuffer(), this.glIBuf = s.createBuffer(), e.pushElementArrayBuffer(this.glIBuf), s.bufferData(s.ELEMENT_ARRAY_BUFFER, o * 4, s.DYNAMIC_DRAW), e.popElementArrayBuffer();
    }
    push(e, n, r, o, s = null, a = {}) {
      (e !== this.curPrimitive || s !== this.curTex || o !== this.curShader || !Pn(this.curUniform, a) || this.vqueue.length + n.length * this.stride > this.maxVertices || this.iqueue.length + r.length > this.maxIndices) && this.flush();
      let l = this.vqueue.length / this.stride;
      for (let u of n) this.vqueue.push(u);
      for (let u of r) this.iqueue.push(u + l);
      this.curPrimitive = e, this.curShader = o, this.curTex = s, this.curUniform = a;
    }
    flush() {
      if (!this.curPrimitive || !this.curShader || this.vqueue.length === 0 || this.iqueue.length === 0) return;
      let e = this.ctx.gl;
      this.ctx.pushArrayBuffer(this.glVBuf), e.bufferSubData(e.ARRAY_BUFFER, 0, new Float32Array(this.vqueue)), this.ctx.pushElementArrayBuffer(this.glIBuf), e.bufferSubData(e.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(this.iqueue)), this.ctx.setVertexFormat(this.vertexFormat), this.curShader.bind(), this.curShader.send(this.curUniform), this.curTex?.bind(), e.drawElements(this.curPrimitive, this.iqueue.length, e.UNSIGNED_SHORT, 0), this.curTex?.unbind(), this.curShader.unbind(), this.ctx.popArrayBuffer(), this.ctx.popElementArrayBuffer(), this.vqueue = [], this.iqueue = [], this.numDraws++;
    }
    free() {
      let e = this.ctx.gl;
      e.deleteBuffer(this.glVBuf), e.deleteBuffer(this.glIBuf);
    }
  };
  function Pt(t18) {
    let e = [], n = i((s) => {
      e.push(s), t18(s);
    }, "push"), r = i(() => {
      e.pop(), t18(o() ?? null);
    }, "pop"), o = i(() => e[e.length - 1], "cur");
    return [n, r, o];
  }
  i(Pt, "genStack");
  function zi(t18, e = {}) {
    let n = [];
    function r(F) {
      n.push(F);
    }
    i(r, "onDestroy");
    function o() {
      n.forEach((h) => h());
      let F = t18.getExtension("WEBGL_lose_context");
      F && F.loseContext();
    }
    i(o, "destroy");
    let s = null;
    function a(F) {
      if (Pn(F, s)) return;
      s = F;
      let h = F.reduce((O, S) => O + S.size, 0);
      F.reduce((O, S, D) => (t18.vertexAttribPointer(D, S.size, t18.FLOAT, false, h * 4, O), t18.enableVertexAttribArray(D), O + S.size * 4), 0);
    }
    i(a, "setVertexFormat");
    let [l, u] = Pt((F) => t18.bindTexture(t18.TEXTURE_2D, F)), [m, c] = Pt((F) => t18.bindBuffer(t18.ARRAY_BUFFER, F)), [p, f] = Pt((F) => t18.bindBuffer(t18.ELEMENT_ARRAY_BUFFER, F)), [x, g] = Pt((F) => t18.bindFramebuffer(t18.FRAMEBUFFER, F)), [C, b] = Pt((F) => t18.bindRenderbuffer(t18.RENDERBUFFER, F)), [T, G] = Pt((F) => {
      if (!F) return;
      let { x: h, y: O, w: S, h: D } = F;
      t18.viewport(h, O, S, D);
    }), [M, R] = Pt((F) => t18.useProgram(F));
    return T({ x: 0, y: 0, w: t18.drawingBufferWidth, h: t18.drawingBufferHeight }), { gl: t18, opts: e, onDestroy: r, destroy: o, pushTexture2D: l, popTexture2D: u, pushArrayBuffer: m, popArrayBuffer: c, pushElementArrayBuffer: p, popElementArrayBuffer: f, pushFramebuffer: x, popFramebuffer: g, pushRenderbuffer: C, popRenderbuffer: b, pushViewport: T, popViewport: G, pushProgram: M, popProgram: R, setVertexFormat: a };
  }
  i(zi, "initGfx");
  var Kr = {};
  function $i(t18, e) {
    e.pos && (t18.pos = t18.pos.add(e.pos)), e.scale && (t18.scale = t18.scale.scale(y(e.scale))), e.angle && (t18.angle += e.angle), e.color && t18.ch.length === 1 && (t18.color = t18.color.mult(e.color)), e.opacity != null && (t18.opacity *= e.opacity);
  }
  i($i, "applyCharTransform");
  function kn(t18) {
    let e = {}, n = "", r = [], o = String(t18), s = i((a) => {
      r.length > 0 && (e[n.length] = r.slice()), n += a;
    }, "emit");
    for (; o !== ""; ) {
      if (o[0] === "\\") {
        if (o.length === 1) throw new Error("Styled text error: \\ at end of string");
        s(o[1]), o = o.slice(2);
        continue;
      }
      if (o[0] === "[") {
        let a = /^\[(\/)?(\w+?)\]/.exec(o);
        if (!a) {
          s(o[0]), o = o.slice(1);
          continue;
        }
        let [l, u, m] = a;
        if (u !== void 0) {
          let c = r.pop();
          if (c !== m) throw c !== void 0 ? new Error(`Styled text error: mismatched tags. Expected [/${c}], got [/${m}]`) : new Error(`Styled text error: stray end tag [/${m}]`);
        } else r.push(m);
        o = o.slice(l.length);
        continue;
      }
      s(o[0]), o = o.slice(1);
    }
    if (r.length > 0) throw new Error(`Styled text error: unclosed tags ${r}`);
    return { charStyleMap: e, text: n };
  }
  i(kn, "compileStyledText");
  function ze(t18) {
    if (t18.text === void 0) throw new Error('formatText() requires property "text".');
    let e = Mr(t18.font);
    if (!t18.text || t18.text === "" || e instanceof me || !e) return { width: 0, height: 0, chars: [], opt: t18, renderedText: "" };
    let { charStyleMap: n, text: r } = kn(t18.text + ""), o = $o(r);
    if (e instanceof Vt || typeof e == "string") {
      let G = e instanceof Vt ? e.fontface.family : e, M = e instanceof Vt ? { outline: e.outline, filter: e.filter } : { outline: null, filter: en }, R = Kr[G] ?? { font: { tex: new De(A.ggl, 2048, 2048, { filter: M.filter }), map: {}, size: 64 }, cursor: new v(0), outline: M.outline };
      Kr[G] || (Kr[G] = R), e = R.font;
      for (let F of o) if (!R.font.map[F]) {
        let h = jr;
        if (!h) throw new Error("fontCacheC2d is not defined.");
        if (!yt) throw new Error("fontCacheCanvas is not defined.");
        h.clearRect(0, 0, yt.width, yt.height), h.font = `${e.size}px ${G}`, h.textBaseline = "top", h.textAlign = "left", h.fillStyle = "#ffffff";
        let O = h.measureText(F), S = Math.ceil(O.width);
        if (!S) continue;
        let D = O.fontBoundingBoxAscent + O.fontBoundingBoxDescent;
        R.outline && R.outline.width && R.outline.color && (h.lineJoin = "round", h.lineWidth = R.outline.width * 2, h.strokeStyle = R.outline.color.toHex(), h.strokeText(F, R.outline.width, R.outline.width), S += R.outline.width * 2, D += R.outline.width * 3), h.fillText(F, R.outline?.width ?? 0, R.outline?.width ?? 0);
        let U = h.getImageData(0, 0, S, D);
        if (R.cursor.x + S > 2048 && (R.cursor.x = 0, R.cursor.y += D, R.cursor.y > 2048)) throw new Error("Font atlas exceeds character limit");
        e.tex.update(U, R.cursor.x, R.cursor.y), e.map[F] = new Q(R.cursor.x, R.cursor.y, S, D), R.cursor.x += S;
      }
    }
    let s = t18.size || e.size, a = y(t18.scale ?? 1).scale(s / e.size), l = t18.lineSpacing ?? 0, u = t18.letterSpacing ?? 0, m = 0, c = 0, p = 0, f = [], x = [], g = 0, C = null, b = 0;
    for (; g < o.length; ) {
      let G = o[g];
      if (G === `
`) p += s + l, f.push({ width: m - u, chars: x }), C = null, b = 0, m = 0, x = [];
      else {
        let M = e.map[G];
        if (M) {
          let R = M.w * a.x;
          t18.width && m + R > t18.width && (p += s + l, C != null && (g -= x.length - C, G = o[g], M = e.map[G], R = M.w * a.x, x = x.slice(0, C - 1), m = b), C = null, b = 0, f.push({ width: m - u, chars: x }), m = 0, x = []), x.push({ tex: e.tex, width: M.w, height: M.h, quad: new Q(M.x / e.tex.width, M.y / e.tex.height, M.w / e.tex.width, M.h / e.tex.height), ch: G, pos: new v(m, p), opacity: t18.opacity ?? 1, color: t18.color ?? H.WHITE, scale: y(a), angle: 0 }), G === " " && (C = x.length, b = m), m += R, c = Math.max(c, m), m += u;
        }
      }
      g++;
    }
    f.push({ width: m - u, chars: x }), p += s, t18.width && (c = t18.width);
    let T = [];
    for (let G = 0; G < f.length; G++) {
      let M = (c - f[G].width) * oi(t18.align ?? "left");
      for (let R of f[G].chars) {
        let F = e.map[R.ch], h = T.length + G;
        if (R.pos = R.pos.add(M, 0).add(F.w * a.x * 0.5, F.h * a.y * 0.5), t18.transform) {
          let O = typeof t18.transform == "function" ? t18.transform(h, R.ch) : t18.transform;
          O && $i(R, O);
        }
        if (n[h]) {
          let O = n[h];
          for (let S of O) {
            let D = t18.styles?.[S], U = typeof D == "function" ? D(h, R.ch) : D;
            U && $i(R, U);
          }
        }
        T.push(R);
      }
    }
    return { width: c, height: p, chars: T, opt: t18, renderedText: r };
  }
  i(ze, "formatText");
  function ut(t18) {
    if (t18.width === void 0 || t18.height === void 0) throw new Error('drawUVQuad() requires property "width" and "height".');
    if (t18.width <= 0 || t18.height <= 0) return;
    let e = t18.width, n = t18.height, o = He(t18.anchor || ht).scale(new v(e, n).scale(-0.5)), s = t18.quad || new Q(0, 0, 1, 1), a = t18.color || Y(255, 255, 255), l = t18.opacity ?? 1, u = t18.tex ? 0.1 / t18.tex.width : 0, m = t18.tex ? 0.1 / t18.tex.height : 0, c = s.x + u, p = s.y + m, f = s.w - u * 2, x = s.h - m * 2;
    we(), re(t18.pos), Je(t18.angle), it(t18.scale), re(o), Ke([{ pos: new v(-e / 2, n / 2), uv: new v(t18.flipX ? c + f : c, t18.flipY ? p : p + x), color: a, opacity: l }, { pos: new v(-e / 2, -n / 2), uv: new v(t18.flipX ? c + f : c, t18.flipY ? p + x : p), color: a, opacity: l }, { pos: new v(e / 2, -n / 2), uv: new v(t18.flipX ? c : c + f, t18.flipY ? p + x : p), color: a, opacity: l }, { pos: new v(e / 2, n / 2), uv: new v(t18.flipX ? c : c + f, t18.flipY ? p : p + x), color: a, opacity: l }], [0, 1, 3, 1, 2, 3], t18.fixed, t18.tex, t18.shader, t18.uniform ?? void 0), xe();
  }
  i(ut, "drawUVQuad");
  function Ye(t18) {
    we(), re(t18.opt.pos), Je(t18.opt.angle), re(He(t18.opt.anchor ?? "topleft").add(1, 1).scale(t18.width, t18.height).scale(-0.5)), t18.chars.forEach((e) => {
      ut({ tex: e.tex, width: e.width, height: e.height, pos: e.pos, scale: e.scale, angle: e.angle, color: e.color, opacity: e.opacity, quad: e.quad, anchor: "center", uniform: t18.opt.uniform, shader: t18.opt.shader, fixed: t18.opt.fixed });
    }), xe();
  }
  i(Ye, "drawFormattedText");
  function Ve(t18) {
    if (t18.width === void 0 || t18.height === void 0) throw new Error('drawRect() requires property "width" and "height".');
    if (t18.width <= 0 || t18.height <= 0) return;
    let e = t18.width, n = t18.height, o = He(t18.anchor || ht).add(1, 1).scale(new v(e, n).scale(-0.5)), s = [new v(0, 0), new v(e, 0), new v(e, n), new v(0, n)];
    if (t18.radius) {
      let a = Math.min(e, n) / 2, l = Array.isArray(t18.radius) ? t18.radius.map((u) => Math.min(a, u)) : new Array(4).fill(Math.min(a, t18.radius));
      s = [new v(l[0], 0), ...l[1] ? Ct(new v(e - l[1], l[1]), l[1], l[1], 270, 360) : [y(e, 0)], ...l[2] ? Ct(new v(e - l[2], n - l[2]), l[2], l[2], 0, 90) : [y(e, n)], ...l[3] ? Ct(new v(l[3], n - l[3]), l[3], l[3], 90, 180) : [y(0, n)], ...l[0] ? Ct(new v(l[0], l[0]), l[0], l[0], 180, 270) : []];
    }
    qe(Object.assign({}, t18, { offset: o, pts: s, ...t18.gradient ? { colors: t18.horizontal ? [t18.gradient[0], t18.gradient[1], t18.gradient[1], t18.gradient[0]] : [t18.gradient[0], t18.gradient[0], t18.gradient[1], t18.gradient[1]] } : {} }));
  }
  i(Ve, "drawRect");
  function We(t18) {
    Oe();
    let e = A.width, n = A.height;
    A.width = A.viewport.width, A.height = A.viewport.height, t18(), Oe(), A.width = e, A.height = n;
  }
  i(We, "drawUnscaled");
  function kr(t18, e) {
    We(() => {
      let n = y(8);
      we(), re(t18);
      let r = ze({ text: e, font: Ot, size: 16, pos: n, color: Y(255, 255, 255), fixed: true }), o = r.width + n.x * 2, s = r.height + n.x * 2;
      t18.x + o >= fe() && re(y(-o, 0)), t18.y + s >= ye() && re(y(0, -s)), Ve({ width: o, height: s, color: Y(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), Ye(r), xe();
    });
  }
  i(kr, "drawInspectText");
  function _n(t18) {
    if (!t18.p1 || !t18.p2 || !t18.p3) throw new Error('drawTriangle() requires properties "p1", "p2" and "p3".');
    return qe(Object.assign({}, t18, { pts: [t18.p1, t18.p2, t18.p3] }));
  }
  i(_n, "drawTriangle");
  function Qi() {
    if (Z.inspect) {
      let t18 = null;
      for (let e of w.root.get("*", { recursive: true })) if (e.c("area") && e.isHovering()) {
        t18 = e;
        break;
      }
      if (w.root.drawInspect(), t18) {
        let e = [], n = t18.inspect();
        for (let r in n) n[r] ? e.push(`${n[r]}`) : e.push(`${r}`);
        kr(di(Bn()), e.join(`
`));
      }
      kr(y(8), `FPS: ${Z.fps()}`);
    }
    Z.paused && We(() => {
      we(), re(fe(), 0), re(-8, 8);
      let t18 = 32;
      Ve({ width: t18, height: t18, anchor: "topright", color: Y(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
      for (let e = 1; e <= 2; e++) Ve({ width: 4, height: t18 * 0.6, anchor: "center", pos: y(-t18 / 3 * e, t18 * 0.5), color: Y(255, 255, 255), radius: 2, fixed: true });
      xe();
    }), Z.timeScale !== 1 && We(() => {
      we(), re(fe(), ye()), re(-8, -8);
      let t18 = 8, e = ze({ text: Z.timeScale.toFixed(1), font: Ot, size: 16, color: Y(255, 255, 255), pos: y(-t18), anchor: "botright", fixed: true });
      Ve({ width: e.width + t18 * 2 + t18 * 4, height: e.height + t18 * 2, anchor: "botright", color: Y(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
      for (let n = 0; n < 2; n++) {
        let r = Z.timeScale < 1;
        _n({ p1: y(-e.width - t18 * (r ? 2 : 3.5), -t18), p2: y(-e.width - t18 * (r ? 2 : 3.5), -t18 - e.height), p3: y(-e.width - t18 * (r ? 3.5 : 2), -t18 - e.height / 2), pos: y(-n * t18 * 1 + (r ? -t18 * 0.5 : 0), 0), color: Y(255, 255, 255), fixed: true });
      }
      Ye(e), xe();
    }), Z.curRecording && We(() => {
      we(), re(0, ye()), re(24, -24), bt({ radius: 12, color: Y(255, 0, 0), opacity: vn(0, 1, P.time() * 4), fixed: true }), xe();
    }), Z.showLog && w.logs.length > 0 && We(() => {
      we(), re(0, ye()), re(8, -8);
      let t18 = 8, e = [];
      for (let r of w.logs) {
        let o = "", s = r.msg instanceof Error ? "error" : "info";
        o += `[time]${r.time.toFixed(2)}[/time]`, o += " ", o += `[${s}]${_r(r.msg)}[/${s}]`, e.push(o);
      }
      w.logs = w.logs.filter((r) => P.time() - r.time < (ie.logTime || 4));
      let n = ze({ text: e.join(`
`), font: Ot, pos: y(t18, -t18), anchor: "botleft", size: 16, width: fe() * 0.6, lineSpacing: t18 / 2, fixed: true, styles: { time: { color: Y(127, 127, 127) }, info: { color: Y(255, 255, 255) }, error: { color: Y(255, 0, 127) } } });
      Ve({ width: n.width + t18 * 2, height: n.height + t18 * 2, anchor: "botleft", color: Y(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), Ye(n), xe();
    });
  }
  i(Qi, "drawDebug");
  function _r(t18, e = false) {
    var n = "", r;
    return e && typeof t18 == "string" && (t18 = JSON.stringify(t18)), Array.isArray(t18) && (n = ["[", t18.map((o) => _r(o, true)).join(", "), "]"].join(""), t18 = n), typeof t18 == "object" && t18.toString === Object.prototype.toString && (t18.constructor !== Object && (n += t18.constructor.name + " "), n += ["{", (r = Object.getOwnPropertyNames(t18).map((o) => `${/^\w+$/.test(o) ? o : JSON.stringify(o)}: ${_r(t18[o], true)}`).join(", ")) ? ` ${r} ` : "", "}"].join(""), t18 = n), String(t18).replaceAll(/(?<!\\)\[/g, "\\[");
  }
  i(_r, "prettyDebug");
  function Ji() {
    let t18 = w.cam, e = v.fromAngle(be(0, 360)).scale(t18.shake);
    t18.shake = Ee(t18.shake, 0, 5 * Se()), t18.transform = new ge().translate(Et()).scale(t18.scale).rotate(t18.angle).translate((t18.pos ?? Et()).scale(-1).add(e)), w.root.draw(), Oe();
  }
  i(Ji, "drawFrame");
  function Zi() {
    let t18 = Le();
    w.events.numListeners("loading") > 0 ? w.events.trigger("loading", t18) : We(() => {
      let e = fe() / 2, n = 24, r = y(fe() / 2, ye() / 2).sub(y(e / 2, n / 2));
      Ve({ pos: y(0), width: fe(), height: ye(), color: Y(0, 0, 0) }), Ve({ pos: r, width: e, height: n, fill: false, outline: { width: 4 } }), Ve({ pos: r, width: e * t18, height: n });
    });
  }
  i(Zi, "drawLoadScreen");
  function Nn(t18, e, n) {
    let r = A.ggl.gl;
    Oe(), r.clear(r.STENCIL_BUFFER_BIT), r.enable(r.STENCIL_TEST), r.stencilFunc(r.NEVER, 1, 255), r.stencilOp(r.REPLACE, r.REPLACE, r.REPLACE), e(), Oe(), r.stencilFunc(n, 1, 255), r.stencilOp(r.KEEP, r.KEEP, r.KEEP), t18(), Oe(), r.disable(r.STENCIL_TEST);
  }
  i(Nn, "drawStenciled");
  function es(t18, e) {
    let n = A.ggl.gl;
    Nn(t18, e, n.EQUAL);
  }
  i(es, "drawMasked");
  function Gt(t18) {
    if (!t18.tex) throw new Error('drawTexture() requires property "tex".');
    let e = t18.quad ?? new Q(0, 0, 1, 1), n = t18.tex.width * e.w, r = t18.tex.height * e.h, o = new v(1);
    if (t18.tiled) {
      let a = He(t18.anchor || ht).add(new v(1, 1)).scale(0.5).scale(t18.width || n, t18.height || r), l = (t18.width || n) / n, u = (t18.height || r) / r, m = Math.floor(l), c = Math.floor(u), p = l - m, f = u - c, x = (m + p ? 1 : 0) * (c + f ? 1 : 0), g = new Array(x * 6), C = new Array(x * 4), b = 0, T = i((G, M, R, F, h) => {
        g[b * 6 + 0] = b * 4 + 0, g[b * 6 + 1] = b * 4 + 1, g[b * 6 + 2] = b * 4 + 3, g[b * 6 + 3] = b * 4 + 1, g[b * 6 + 4] = b * 4 + 2, g[b * 6 + 5] = b * 4 + 3, C[b * 4 + 0] = { pos: new v(G - a.x, M - a.y), uv: new v(h.x, h.y), color: t18.color || H.WHITE, opacity: t18.opacity || 1 }, C[b * 4 + 1] = { pos: new v(G + R - a.x, M - a.y), uv: new v(h.x + h.w, h.y), color: t18.color || H.WHITE, opacity: t18.opacity || 1 }, C[b * 4 + 2] = { pos: new v(G + R - a.x, M + F - a.y), uv: new v(h.x + h.w, h.y + h.h), color: t18.color || H.WHITE, opacity: t18.opacity || 1 }, C[b * 4 + 3] = { pos: new v(G - a.x, M + F - a.y), uv: new v(h.x, h.y + h.h), color: t18.color || H.WHITE, opacity: t18.opacity || 1 }, b++;
      }, "addQuad");
      for (let G = 0; G < c; G++) {
        for (let M = 0; M < m; M++) T(M * n, G * r, n, r, e);
        p && T(m * n, G * r, n * p, r, new Q(e.x, e.y, e.w * p, e.h));
      }
      if (f) {
        for (let G = 0; G < m; G++) T(G * n, c * r, n, r * f, new Q(e.x, e.y, e.w, e.h * f));
        p && T(m * n, c * r, n * p, r * f, new Q(e.x, e.y, e.w * p, e.h * f));
      }
      Ke(C, g, t18.fixed, t18.tex, t18.shader, t18.uniform ?? void 0);
    } else t18.width && t18.height ? (o.x = t18.width / n, o.y = t18.height / r) : t18.width ? (o.x = t18.width / n, o.y = o.x) : t18.height && (o.y = t18.height / r, o.x = o.y), ut(Object.assign({}, t18, { scale: o.scale(t18.scale || new v(1)), tex: t18.tex, quad: e, width: n, height: r }));
  }
  i(Gt, "drawTexture");
  function ts(t18) {
    if (!t18.sprite) throw new Error('drawSprite() requires property "sprite"');
    let e = It(t18.sprite);
    if (!e || !e.data) return;
    let n = e.data.frames[t18.frame ?? 0];
    if (!n) throw new Error(`Frame not found: ${t18.frame ?? 0}`);
    Gt(Object.assign({}, t18, { tex: e.data.tex, quad: n.scale(t18.quad ?? new Q(0, 0, 1, 1)) }));
  }
  i(ts, "drawSprite");
  function ns(t18, e) {
    let n = A.ggl.gl;
    Nn(t18, e, n.NOTEQUAL);
  }
  i(ns, "drawSubtracted");
  function Nr(t18) {
    Ye(ze(t18));
  }
  i(Nr, "drawText");
  var rs = i((t18, e) => {
    let n = Ln(e, nn, rn), r = t18.pixelDensity ?? 1, o = t18.scale ?? 1, { gl: s } = e, a = De.fromImage(e, new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)), l = t18.width && t18.height ? new at(e, t18.width * r * o, t18.height * r * o) : new at(e, s.drawingBufferWidth, s.drawingBufferHeight), u = null, m = 1;
    t18.background && (typeof t18.background == "string" ? u = Y(t18.background) : (u = Y(...t18.background), m = t18.background[3] ?? 1), s.clearColor(u.r / 255, u.g / 255, u.b / 255, m ?? 1)), s.enable(s.BLEND), s.blendFuncSeparate(s.SRC_ALPHA, s.ONE_MINUS_SRC_ALPHA, s.ONE, s.ONE_MINUS_SRC_ALPHA);
    let c = new jn(e, tn, gi, bi), p = De.fromImage(e, new ImageData(new Uint8ClampedArray([128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128, 128, 255]), 2, 2), { wrap: "repeat", filter: "nearest" });
    return { lastDrawCalls: 0, ggl: e, defShader: n, defTex: a, frameBuffer: l, postShader: null, postShaderUniform: null, renderer: c, transform: new ge(), transformStack: [], bgTex: p, bgColor: u, bgAlpha: m, width: t18.width ?? s.drawingBufferWidth / r / o, height: t18.height ?? s.drawingBufferHeight / r / o, viewport: { x: 0, y: 0, width: s.drawingBufferWidth, height: s.drawingBufferHeight }, fixed: false };
  }, "initAppGfx");
  function Hn() {
    let t18 = $e, e = A.ggl.gl.drawingBufferWidth / t18, n = A.ggl.gl.drawingBufferHeight / t18;
    if (ie.letterbox) {
      if (!ie.width || !ie.height) throw new Error("Letterboxing requires width and height defined.");
      let r = e / n, o = ie.width / ie.height;
      if (r > o) {
        let s = n * o, a = (e - s) / 2;
        A.viewport = { x: a, y: 0, width: s, height: n };
      } else {
        let s = e / o, a = (n - s) / 2;
        A.viewport = { x: 0, y: a, width: e, height: s };
      }
      return;
    }
    if (ie.stretch && (!ie.width || !ie.height)) throw new Error("Stretching requires width and height defined.");
    A.viewport = { x: 0, y: 0, width: e, height: n };
  }
  i(Hn, "updateViewport");
  function ct(t18) {
    return t18.fixed ? true : t18.parent ? ct(t18.parent) : false;
  }
  i(ct, "isFixed");
  function je(t18) {
    return { color: t18.color, opacity: t18.opacity, anchor: t18.anchor, outline: t18.outline, shader: t18.shader, uniform: t18.uniform };
  }
  i(je, "getRenderProps");
  function os(t18, e = {}) {
    return { id: "circle", radius: t18, draw() {
      bt(Object.assign(je(this), { radius: this.radius, fill: e.fill }));
    }, renderArea() {
      return new te(new v(this.anchor ? 0 : -this.radius), this.radius * 2, this.radius * 2);
    }, inspect() {
      return `radius: ${Math.ceil(this.radius)}`;
    } };
  }
  i(os, "circle");
  function qn(...t18) {
    return { id: "color", color: Y(...t18), inspect() {
      return `color: ${this.color.toString()}`;
    } };
  }
  i(qn, "color");
  function is(t18) {
    return { add() {
      this.canvas = t18;
    } };
  }
  i(is, "drawon");
  function ss(t18 = 1) {
    let e, n = 0, r = false;
    return { require: ["opacity"], add() {
      e = this.opacity, this.opacity = 0;
    }, update() {
      r || (n += Se(), this.opacity = Re(n, 0, t18, 0, e), n >= t18 && (this.opacity = e, r = true));
    } };
  }
  i(ss, "fadeIn");
  function as(t18 = "intersect") {
    return { id: "mask", mask: t18 };
  }
  i(as, "mask");
  function zn(t18) {
    return { id: "opacity", opacity: t18 ?? 1, fadeIn(e = 1, n = L.easings.linear) {
      return w.root.tween(0, this.opacity, e, (r) => this.opacity = r, n);
    }, fadeOut(e = 1, n = L.easings.linear) {
      return w.root.tween(this.opacity, 0, e, (r) => this.opacity = r, n);
    }, inspect() {
      return `opacity: ${Jt(this.opacity, 1)}`;
    } };
  }
  i(zn, "opacity");
  function us(t18 = 1, e = Y(0, 0, 0), n = 1, r = "miter", o = 10, s = "butt") {
    return { id: "outline", outline: { width: t18, color: e, opacity: n, join: r, miterLimit: o, cap: s }, inspect() {
      return `outline: ${this.outline.width}px, ${this.outline.color}`;
    } };
  }
  i(us, "outline");
  var Hr = class {
    static {
      i(this, "Particle");
    }
    pos = y(0);
    vel = y(0);
    acc = y(0);
    angle = 0;
    angularVelocity = 0;
    damping = 0;
    t;
    lt = null;
    gc;
    constructor() {
      this.t = 0, this.gc = true;
    }
    get progress() {
      return this.lt ? this.t / this.lt : this.t;
    }
  };
  function cs(t18, e) {
    let n = e.lifetime, r = [], o = t18.colors || [H.WHITE], s = t18.opacities || [1], a = t18.quads || [new Q(0, 0, 1, 1)], l = t18.scales || [1], u = t18.lifeTime, m = e.direction, c = e.spread, p = t18.speed || [0, 0], f = t18.angle || [0, 0], x = t18.angularVelocity || [0, 0], g = t18.acceleration || [y(0), y(0)], C = t18.damping || [0, 0], b = [], T = new Array(t18.max), G = 0, M = 0;
    for (let h = 0; h < t18.max; h++) {
      b[h * 6 + 0] = h * 4 + 0, b[h * 6 + 1] = h * 4 + 1, b[h * 6 + 2] = h * 4 + 3, b[h * 6 + 3] = h * 4 + 1, b[h * 6 + 4] = h * 4 + 2, b[h * 6 + 5] = h * 4 + 3;
      for (let O = 0; O < 4; O++) T[h * 4 + O] = { pos: new v(0, 0), uv: new v(0, 0), color: Y(255, 255, 255), opacity: 1 };
      r[h] = new Hr();
    }
    let R = new le();
    function F(h = 0) {
      for (; h < t18.max; ) {
        if (r[h].gc) return h;
        h++;
      }
      return null;
    }
    return i(F, "nextFree"), { id: "particles", emit(h) {
      let O = 0;
      for (let S = 0; S < h; S++) {
        if (O = F(O), O == null) return;
        let D = be(m - c, m + c), U = v.fromAngle(D).scale(be(p[0], p[1])), k = be(f[0], f[1]), N = be(x[0], x[1]), $ = y(be(g[0].x, g[1].x), be(g[0].y, g[1].y)), X = be(C[0], C[1]), J = u ? be(u[0], u[1]) : null, W = e.shape ? e.shape.random() : y(), q = r[O];
        q.lt = J, q.pos = W, q.vel = U, q.acc = $, q.angle = k, q.angularVelocity = N, q.damping = X, q.angularVelocity = N, q.gc = false;
      }
      G += h;
    }, update() {
      if (n !== void 0 && n <= 0) return;
      let h = Se();
      for (let O of r) if (!O.gc) {
        if (O.t += h, O.lt && O.t >= O.lt) {
          O.gc = true, G--;
          continue;
        }
        O.vel = O.vel.add(O.acc.scale(h)).scale(1 - O.damping * h), O.pos = O.pos.add(O.vel.scale(h)), O.angle += O.angularVelocity * h;
      }
      for (n !== void 0 && (n -= h, n <= 0 && R.trigger()), M += h; G < t18.max && e.rate && M > e.rate; ) this.emit(1), G++, M -= e.rate;
    }, draw() {
      if (!(n !== void 0 && n <= 0)) {
        for (let h = 0; h < r.length; h++) {
          let O = r[h];
          if (O.gc) continue;
          let S = O.progress, D = Math.floor(O.progress * o.length), U = D < o.length - 1 ? Ee(o[D], o[D + 1], Re(S, D / o.length, (D + 1) / o.length, 0, 1)) : o[D], k = Math.floor(O.progress * s.length), N = k < s.length - 1 ? Ee(s[k], s[k + 1], Re(S, k / s.length, (k + 1) / s.length, 0, 1)) : s[k], $ = Math.floor(O.progress * a.length), X = a[$], J = Math.floor(O.progress * l.length), W = l[J], q = Math.cos(O.angle * Math.PI / 180), ne = Math.sin(O.angle * Math.PI / 180), B = (t18.texture ? t18.texture.width : 10) * X.w / 2, K = (t18.texture ? t18.texture.height : 10) * X.h / 2, z = h * 4, j = T[z];
          j.pos.x = O.pos.x + -B * W * q - -K * W * ne, j.pos.y = O.pos.y + -B * W * ne + -K * W * q, j.uv.x = X.x, j.uv.y = X.y, j.color.r = U.r, j.color.g = U.g, j.color.b = U.b, j.opacity = N, j = T[z + 1], j.pos.x = O.pos.x + B * W * q - -K * W * ne, j.pos.y = O.pos.y + B * W * ne + -K * W * q, j.uv.x = X.x + X.w, j.uv.y = X.y, j.color.r = U.r, j.color.g = U.g, j.color.b = U.b, j.opacity = N, j = T[z + 2], j.pos.x = O.pos.x + B * W * q - K * W * ne, j.pos.y = O.pos.y + B * W * ne + K * W * q, j.uv.x = X.x + X.w, j.uv.y = X.y + X.h, j.color.r = U.r, j.color.g = U.g, j.color.b = U.b, j.opacity = N, j = T[z + 3], j.pos.x = O.pos.x + -B * W * q - K * W * ne, j.pos.y = O.pos.y + -B * W * ne + K * W * q, j.uv.x = X.x, j.uv.y = X.y + X.h, j.color.r = U.r, j.color.g = U.g, j.color.b = U.b, j.opacity = N;
        }
        Ke(T, b, this.fixed, t18.texture, this.shader, this.uniform);
      }
    }, onEnd(h) {
      return R.add(h);
    }, inspect() {
      return `count: ${G}/${t18.max}`;
    } };
  }
  i(cs, "particles");
  function ls(t18, e = {}) {
    if (t18.length < 3) throw new Error(`Polygon's need more than two points, ${t18.length} points provided`);
    return { id: "polygon", pts: t18, colors: e.colors, uv: e.uv, tex: e.tex, radius: e.radius, draw() {
      qe(Object.assign(je(this), { pts: this.pts, colors: this.colors, uv: this.uv, tex: this.tex, radius: this.radius, fill: e.fill, triangulate: e.triangulate }));
    }, renderArea() {
      return new Ae(this.pts);
    }, inspect() {
      return `polygon: ${this.pts.map((n) => `[${n.x},${n.y}]`).join(",")}`;
    } };
  }
  i(ls, "polygon");
  function Yn(t18, e, n) {
    let r;
    return w.root.get("area").forEach((s) => {
      if (n && n.some((u) => s.is(u))) return;
      let l = s.worldArea().raycast(t18, e);
      l && (r ? l.fraction < r.fraction && (r = l, r.object = s) : (r = l, r.object = s));
    }), r;
  }
  i(Yn, "raycast");
  function Wn(t18, e, n = {}) {
    return { id: "rect", width: t18, height: e, radius: n.radius || 0, draw() {
      Ve(Object.assign(je(this), { width: this.width, height: this.height, radius: this.radius, fill: n.fill }));
    }, renderArea() {
      return new te(y(0), this.width, this.height);
    }, inspect() {
      return `rect: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)}h)`;
    } };
  }
  i(Wn, "rect");
  function ms(t18, e) {
    return { id: "shader", shader: t18, ...typeof e == "function" ? { uniform: e(), update() {
      this.uniform = e();
    } } : { uniform: e }, inspect() {
      return `shader: ${t18}`;
    } };
  }
  i(ms, "shader");
  function ps(...t18) {
    return t18.length > 0 && (w.cam.pos = y(...t18)), w.cam.pos ? w.cam.pos.clone() : Et();
  }
  i(ps, "camPos");
  function ds(...t18) {
    return t18.length > 0 && (w.cam.scale = y(...t18)), w.cam.scale.clone();
  }
  i(ds, "camScale");
  function fs(t18) {
    return t18 !== void 0 && (w.cam.angle = t18), w.cam.angle;
  }
  i(fs, "camRot");
  function hs(t18 = Y(255, 255, 255), e = 1) {
    let n = w.root.add([Wn(fe(), ye()), qn(t18), zn(1), Xn()]), r = n.fadeOut(e);
    return r.onEnd(() => $n(n)), r;
  }
  i(hs, "camFlash");
  function gs() {
    return w.cam.transform.clone();
  }
  i(gs, "camTransform");
  function bs(t18 = 12) {
    w.cam.shake += t18;
  }
  i(bs, "shake");
  function ys(t18) {
    return w.cam.transform.multVec2(t18);
  }
  i(ys, "toScreen");
  function xs(t18) {
    return w.cam.transform.invert().multVec2(t18);
  }
  i(xs, "toWorld");
  function vs(t18, e) {
    if (!e.tileWidth || !e.tileHeight) throw new Error("Must provide tileWidth and tileHeight.");
    let n = w.root.add([Rt(e.pos ?? y(0))]), r = t18.length, o = 0, s = null, a = null, l = null, u = null, m = i((h) => h.x + h.y * o, "tile2Hash"), c = i((h) => y(Math.floor(h % o), Math.floor(h / o)), "hash2Tile"), p = i(() => {
      s = [];
      for (let h of n.children) f(h);
    }, "createSpatialMap"), f = i((h) => {
      let O = m(h.tilePos);
      s[O] ? s[O].push(h) : s[O] = [h];
    }, "insertIntoSpatialMap"), x = i((h) => {
      let O = m(h.tilePos);
      if (s[O]) {
        let S = s[O].indexOf(h);
        S >= 0 && s[O].splice(S, 1);
      }
    }, "removeFromSpatialMap"), g = i(() => {
      let h = false;
      for (let O of n.children) {
        let S = n.pos2Tile(O.pos);
        (O.tilePos.x != S.x || O.tilePos.y != S.y) && (h = true, x(O), O.tilePos.x = S.x, O.tilePos.y = S.y, f(O));
      }
      h && n.trigger("spatialMapChanged");
    }, "updateSpatialMap"), C = i(() => {
      let h = n.getSpatialMap(), O = n.numRows() * n.numColumns();
      a ? a.length = O : a = new Array(O), a.fill(1, 0, O);
      for (let S = 0; S < h.length; S++) {
        let D = h[S];
        if (D) {
          let U = 0;
          for (let k of D) if (k.isObstacle) {
            U = 1 / 0;
            break;
          } else U += k.cost;
          a[S] = U || 1;
        }
      }
    }, "createCostMap"), b = i(() => {
      let h = n.getSpatialMap(), O = n.numRows() * n.numColumns();
      l ? l.length = O : l = new Array(O), l.fill(15, 0, O);
      for (let S = 0; S < h.length; S++) {
        let D = h[S];
        if (D) {
          let U = D.length, k = 15;
          for (let N = 0; N < U; N++) k |= D[N].edgeMask;
          l[S] = k;
        }
      }
    }, "createEdgeMap"), T = i(() => {
      let h = n.numRows() * n.numColumns(), O = i((D, U) => {
        let k = [];
        for (k.push(D); k.length > 0; ) {
          let N = k.pop();
          R(N).forEach(($) => {
            u[$] < 0 && (u[$] = U, k.push($));
          });
        }
      }, "traverse");
      u ? u.length = h : u = new Array(h), u.fill(-1, 0, h);
      let S = 0;
      for (let D = 0; D < a.length; D++) {
        if (u[D] >= 0) {
          S++;
          continue;
        }
        O(D, S), S++;
      }
    }, "createConnectivityMap"), G = i((h, O) => a[O], "getCost"), M = i((h, O) => {
      let S = c(h), D = c(O);
      return S.dist(D);
    }, "getHeuristic"), R = i((h, O) => {
      let S = [], D = Math.floor(h % o), U = D > 0 && l[h] & 1 && a[h - 1] !== 1 / 0, k = h >= o && l[h] & 2 && a[h - o] !== 1 / 0, N = D < o - 1 && l[h] & 4 && a[h + 1] !== 1 / 0, $ = h < o * r - o - 1 && l[h] & 8 && a[h + o] !== 1 / 0;
      return O ? (U && (k && S.push(h - o - 1), S.push(h - 1), $ && S.push(h + o - 1)), k && S.push(h - o), N && (k && S.push(h - o + 1), S.push(h + 1), $ && S.push(h + o + 1)), $ && S.push(h + o)) : (U && S.push(h - 1), k && S.push(h - o), N && S.push(h + 1), $ && S.push(h + o)), S;
    }, "getNeighbours"), F = { id: "level", tileWidth() {
      return e.tileWidth;
    }, tileHeight() {
      return e.tileHeight;
    }, spawn(h, ...O) {
      let S = y(...O), D = (() => {
        if (typeof h == "string") {
          if (e.tiles[h]) {
            if (typeof e.tiles[h] != "function") throw new Error("Level symbol def must be a function returning a component list");
            return e.tiles[h](S);
          } else if (e.wildcardTile) return e.wildcardTile(h, S);
        } else {
          if (Array.isArray(h)) return h;
          throw new Error("Expected a symbol or a component list");
        }
      })();
      if (!D) return null;
      let U = false, k = false;
      for (let $ of D) $.id === "tile" && (k = true), $.id === "pos" && (U = true);
      U || D.push(Rt(this.tile2Pos(S))), k || D.push(Qn());
      let N = n.add(D);
      return U && (N.tilePosOffset = N.pos.clone()), N.tilePos = S, N.transform = ft(N), s && (f(N), this.trigger("spatialMapChanged"), this.trigger("navigationMapInvalid")), N;
    }, numColumns() {
      return o;
    }, numRows() {
      return r;
    }, levelWidth() {
      return o * this.tileWidth();
    }, levelHeight() {
      return r * this.tileHeight();
    }, tile2Pos(...h) {
      return y(...h).scale(this.tileWidth(), this.tileHeight());
    }, pos2Tile(...h) {
      let O = y(...h);
      return y(Math.floor(O.x / this.tileWidth()), Math.floor(O.y / this.tileHeight()));
    }, getSpatialMap() {
      return s || p(), s;
    }, onSpatialMapChanged(h) {
      return this.on("spatialMapChanged", h);
    }, onNavigationMapInvalid(h) {
      return this.on("navigationMapInvalid", h);
    }, getAt(h) {
      s || p();
      let O = m(h);
      return s[O] || [];
    }, raycast(h, O) {
      let S = this.toWorld(h), D = this.toWorld(h.add(O)).sub(S), U = 1 / this.tileWidth(), k = h.scale(U), N = Eo(k, O, ($) => {
        let X = this.getAt($);
        if (X.some((W) => W.isObstacle)) return true;
        let J = null;
        for (let W of X) if (W.is("area")) {
          let ne = W.worldArea().raycast(S, D);
          ne && (J ? ne.fraction < J.fraction && (J = ne, J.object = W) : (J = ne, J.object = W));
        }
        return J && (J.point = this.fromWorld(J.point).scale(U)), J || false;
      }, 64);
      return N && (N.point = N.point.scale(this.tileWidth())), N;
    }, update() {
      s && g();
    }, invalidateNavigationMap() {
      a = null, l = null, u = null;
    }, onNavigationMapChanged(h) {
      return this.on("navigationMapChanged", h);
    }, getTilePath(h, O, S = {}) {
      if (a || C(), l || b(), u || T(), h.x < 0 || h.x >= o || h.y < 0 || h.y >= r || O.x < 0 || O.x >= o || O.y < 0 || O.y >= r) return null;
      let D = m(h), U = m(O);
      if (a[U] === 1 / 0) return null;
      if (D === U) return [];
      if (u[D] != -1 && u[D] !== u[U]) return null;
      let k = new Lt((q, ne) => q.cost < ne.cost);
      k.insert({ cost: 0, node: D });
      let N = /* @__PURE__ */ new Map();
      N.set(D, D);
      let $ = /* @__PURE__ */ new Map();
      for ($.set(D, 0); k.length !== 0; ) {
        let q = k.remove()?.node;
        if (q === U) break;
        let ne = R(q, S.allowDiagonals);
        for (let B of ne) {
          let K = ($.get(q) || 0) + G(q, B) + M(B, U);
          (!$.has(B) || K < $.get(B)) && ($.set(B, K), k.insert({ cost: K, node: B }), N.set(B, q));
        }
      }
      let X = [], J = U, W = c(J);
      for (X.push(W); J !== D; ) {
        let q = N.get(J);
        if (q === void 0) throw new Error("Bug in pathfinding algorithm");
        J = q;
        let ne = c(J);
        X.push(ne);
      }
      return X.reverse();
    }, getPath(h, O, S = {}) {
      let D = this.tileWidth(), U = this.tileHeight(), k = this.getTilePath(this.pos2Tile(h), this.pos2Tile(O), S);
      return k ? [h, ...k.slice(1, -1).map((N) => N.scale(D, U).add(D / 2, U / 2)), O] : null;
    } };
    return n.use(F), n.onNavigationMapInvalid(() => {
      n.invalidateNavigationMap(), n.trigger("navigationMapChanged");
    }), t18.forEach((h, O) => {
      let S = h.split("");
      o = Math.max(S.length, o), S.forEach((D, U) => {
        n.spawn(D, y(U, O));
      });
    }), n;
  }
  i(vs, "addLevel");
  function et(t18, e, n) {
    return w.objEvents.registers[t18] || (w.objEvents.registers[t18] = new Qt()), w.objEvents.on(t18, (r, ...o) => {
      r.is(e) && n(r, ...o);
    });
  }
  i(et, "on");
  var ws = de((t18) => {
    let e = w.root.add([{ fixedUpdate: t18 }]);
    return { get paused() {
      return e.paused;
    }, set paused(n) {
      e.paused = n;
    }, cancel: i(() => e.destroy(), "cancel") };
  }, (t18, e) => et("fixedUpdate", t18, e));
  var Cs = de((t18) => {
    let e = w.root.add([{ update: t18 }]);
    return { get paused() {
      return e.paused;
    }, set paused(n) {
      e.paused = n;
    }, cancel: i(() => e.destroy(), "cancel") };
  }, (t18, e) => et("update", t18, e));
  var Es = de((t18) => {
    let e = w.root.add([{ draw: t18 }]);
    return { get paused() {
      return e.hidden;
    }, set paused(n) {
      e.hidden = n;
    }, cancel: i(() => e.destroy(), "cancel") };
  }, (t18, e) => et("draw", t18, e));
  var qr = de((t18) => w.events.on("add", t18), (t18, e) => et("add", t18, e));
  var Os = de((t18) => w.events.on("destroy", t18), (t18, e) => et("destroy", t18, e));
  function Ts(t18, e, n) {
    return et("collide", t18, (r, o, s) => o.is(e) && n(r, o, s));
  }
  i(Ts, "onCollide");
  function As(t18, e, n) {
    return et("collideUpdate", t18, (r, o, s) => o.is(e) && n(r, o, s));
  }
  i(As, "onCollideUpdate");
  function Ss(t18, e, n) {
    return et("collideEnd", t18, (r, o, s) => o.is(e) && n(r, o, s));
  }
  i(Ss, "onCollideEnd");
  function Jn(t18, e) {
    w.root.get(t18, { recursive: true }).forEach(e), qr(t18, e);
  }
  i(Jn, "forAllCurrentAndFuture");
  var Vs = de((t18) => P.onMousePress(t18), (t18, e) => {
    let n = [];
    return Jn(t18, (r) => {
      if (!r.area) throw new Error("onClick() requires the object to have area() component");
      n.push(r.onClick(() => e(r)));
    }), Ne.join(n);
  });
  function Ps(t18, e) {
    let n = [];
    return Jn(t18, (r) => {
      if (!r.area) throw new Error("onHover() requires the object to have area() component");
      n.push(r.onHover(() => e(r)));
    }), Ne.join(n);
  }
  i(Ps, "onHover");
  function Gs(t18, e) {
    let n = [];
    return Jn(t18, (r) => {
      if (!r.area) throw new Error("onHoverUpdate() requires the object to have area() component");
      n.push(r.onHoverUpdate(() => e(r)));
    }), Ne.join(n);
  }
  i(Gs, "onHoverUpdate");
  function Rs(t18, e) {
    let n = [];
    return Jn(t18, (r) => {
      if (!r.area) throw new Error("onHoverEnd() requires the object to have area() component");
      n.push(r.onHoverEnd(() => e(r)));
    }), Ne.join(n);
  }
  i(Rs, "onHoverEnd");
  function Ds(t18) {
    w.events.on("loading", t18);
  }
  i(Ds, "onLoading");
  function Ms(t18) {
    P.onResize(t18);
  }
  i(Ms, "onResize");
  function Bs(t18) {
    w.events.on("error", t18);
  }
  i(Bs, "onError");
  function kt(t18) {
    _.loaded ? t18() : w.events.on("load", t18);
  }
  i(kt, "onLoad");
  function cn(t18 = []) {
    let e = /* @__PURE__ */ new Map(), n = [], r = {}, o = new Xe(), s = [], a = null, l = false, u = { id: Xo(), hidden: false, transform: new ge(), children: [], parent: null, set paused(c) {
      if (c !== l) {
        l = c;
        for (let p of s) p.paused = c;
      }
    }, get paused() {
      return l;
    }, get tags() {
      let c = [];
      for (let [p, f] of e.entries()) Object.keys(f).length == 1 && c.push(p);
      return c;
    }, add(c) {
      let p = Array.isArray(c) ? cn(c) : c;
      if (p.parent) throw new Error("Cannot add a game obj that already has a parent.");
      return p.parent = this, p.transform = ft(p), this.children.push(p), p.trigger("add", p), w.events.trigger("add", p), p;
    }, readd(c) {
      let p = this.children.indexOf(c);
      return p !== -1 && (this.children.splice(p, 1), this.children.push(c)), c;
    }, remove(c) {
      let p = this.children.indexOf(c);
      if (p !== -1) {
        c.parent = null, this.children.splice(p, 1);
        let f = i((x) => {
          x.trigger("destroy"), w.events.trigger("destroy", x), x.children.forEach((g) => f(g));
        }, "trigger");
        f(c);
      }
    }, removeAll(c) {
      if (c) this.get(c).forEach((p) => this.remove(p));
      else for (let p of [...this.children]) this.remove(p);
    }, fixedUpdate() {
      this.paused || (this.children.forEach((c) => c.fixedUpdate()), this.trigger("fixedUpdate"));
    }, update() {
      this.paused || (this.children.forEach((c) => c.update()), this.trigger("update"));
    }, draw() {
      if (this.hidden) return;
      this.canvas && (Oe(), this.canvas.bind());
      let c = A.fixed;
      this.fixed && (A.fixed = true), we(), re(this.pos), it(this.scale), Je(this.angle);
      let p = this.children.sort((f, x) => {
        let g = f.layerIndex ?? w.defaultLayerIndex, C = x.layerIndex ?? w.defaultLayerIndex;
        return g - C || (f.z ?? 0) - (x.z ?? 0);
      });
      if (this.mask) {
        let f = { intersect: L.drawMasked, subtract: L.drawSubtracted }[this.mask];
        if (!f) throw new Error(`Invalid mask func: "${this.mask}"`);
        f(() => {
          p.forEach((x) => x.draw());
        }, () => {
          this.trigger("draw");
        });
      } else this.trigger("draw"), p.forEach((f) => f.draw());
      xe(), A.fixed = c, this.canvas && (Oe(), this.canvas.unbind());
    }, drawInspect() {
      this.hidden || (we(), re(this.pos), it(this.scale), Je(this.angle), this.children.forEach((c) => c.drawInspect()), this.trigger("drawInspect"), xe());
    }, use(c) {
      if (!c) return;
      if (typeof c == "string") return this.use({ id: c });
      let p = [];
      c.id ? (this.unuse(c.id), r[c.id] = [], p = r[c.id], e.set(c.id, c)) : n.push(c);
      for (let x in c) {
        if (vi.has(x)) continue;
        let g = Object.getOwnPropertyDescriptor(c, x);
        if (g) if (typeof g.value == "function" && (c[x] = c[x].bind(this)), g.set && Object.defineProperty(c, x, { set: g.set.bind(this) }), g.get && Object.defineProperty(c, x, { get: g.get.bind(this) }), wi.has(x)) {
          let C = x === "add" ? () => {
            a = i((b) => p.push(b), "onCurCompCleanup"), c[x]?.(), a = null;
          } : c[x];
          p.push(this.on(x, C).cancel);
        } else if (this[x] === void 0) Object.defineProperty(this, x, { get: i(() => c[x], "get"), set: i((C) => c[x] = C, "set"), configurable: true, enumerable: true }), p.push(() => delete this[x]);
        else throw new Error(`Duplicate component property: "${x}"`);
      }
      let f = i(() => {
        if (c.require) {
          for (let x of c.require) if (!this.c(x)) throw new Error(`Component "${c.id}" requires component "${x}"`);
        }
      }, "checkDeps");
      c.destroy && p.push(c.destroy.bind(this)), this.exists() ? (f(), c.add && (a = i((x) => p.push(x), "onCurCompCleanup"), c.add.call(this), a = null)) : c.require && p.push(this.on("add", f).cancel);
    }, unuse(c) {
      if (e.has(c)) {
        for (let p of e.values()) if (p.require && p.require.includes(c)) throw new Error(`Can't unuse. Component "${p.id}" requires component "${c}"`);
        e.delete(c);
      }
      r[c] && (r[c].forEach((p) => p()), delete r[c]);
    }, c(c) {
      return e.get(c) ?? null;
    }, get(c, p = {}) {
      let f = p.recursive ? this.children.flatMap(i(function x(g) {
        return [g, ...g.children.flatMap(x)];
      }, "recurse")) : this.children;
      if (f = f.filter((x) => c ? x.is(c) : true), p.liveUpdate) {
        let x = i((C) => p.recursive ? this.isAncestorOf(C) : C.parent === this, "isChild"), g = [];
        g.push(L.onAdd((C) => {
          x(C) && C.is(c) && f.push(C);
        })), g.push(L.onDestroy((C) => {
          if (x(C) && C.is(c)) {
            let b = f.findIndex((T) => T.id === C.id);
            b !== -1 && f.splice(b, 1);
          }
        })), this.onDestroy(() => {
          for (let C of g) C.cancel();
        });
      }
      return f;
    }, query(c) {
      let p = c.hierarchy || "children", f = c.include, x = c.exclude, g = [];
      switch (p) {
        case "children":
          g = this.children;
          break;
        case "siblings":
          g = this.parent ? this.parent.children.filter((b) => b !== this) : [];
          break;
        case "ancestors":
          let C = this.parent;
          for (; C; ) g.push(C), C = C.parent;
          break;
        case "descendants":
          g = this.children.flatMap(i(function b(T) {
            return [T, ...T.children.flatMap(b)];
          }, "recurse"));
          break;
      }
      if (f && ((c.includeOp || "and") === "and" || !Array.isArray(c.include) ? g = g.filter((b) => b.is(f)) : g = g.filter((b) => c.include.some((T) => b.is(T)))), x && ((c.includeOp || "and") === "and" || !Array.isArray(c.include) ? g = g.filter((b) => !b.is(x)) : g = g.filter((b) => !c.exclude.some((T) => b.is(T)))), c.visible === true && (g = g.filter((C) => C.visible)), c.distance) {
        if (!this.pos) throw Error("Can't do a distance query from an object without pos");
        let C = c.distanceOp || "near", b = c.distance * c.distance;
        C === "near" ? g = g.filter((T) => T.pos && this.pos.sdist(T.pos) <= b) : g = g.filter((T) => T.pos && this.pos.sdist(T.pos) > b);
      }
      return c.name && (g = g.filter((C) => C.name === c.name)), g;
    }, isAncestorOf(c) {
      return c.parent ? c.parent === this || this.isAncestorOf(c.parent) : false;
    }, exists() {
      return w.root.isAncestorOf(this);
    }, is(c) {
      if (c === "*") return true;
      if (Array.isArray(c)) {
        for (let p of c) if (!this.c(p)) return false;
        return true;
      } else return this.c(c) != null;
    }, on(c, p) {
      let f = o.on(c, p.bind(this));
      return a && a(() => f.cancel()), f;
    }, trigger(c, ...p) {
      o.trigger(c, ...p), w.objEvents.trigger(c, this, ...p);
    }, destroy() {
      this.parent && this.parent.remove(this);
    }, inspect() {
      let c = {};
      for (let [p, f] of e) c[p] = f.inspect?.() ?? null;
      for (let [p, f] of n.entries()) {
        if (f.inspect) {
          c[p] = f.inspect();
          continue;
        }
        for (let [x, g] of Object.entries(f)) typeof g != "function" && (c[x] = `${x}: ${g}`);
      }
      return c;
    }, onAdd(c) {
      return this.on("add", c);
    }, onFixedUpdate(c) {
      return this.on("fixedUpdate", c);
    }, onUpdate(c) {
      return this.on("update", c);
    }, onDraw(c) {
      return this.on("draw", c);
    }, onDestroy(c) {
      return this.on("destroy", c);
    }, clearEvents() {
      o.clear();
    } }, m = ["onKeyPress", "onKeyPressRepeat", "onKeyDown", "onKeyRelease", "onMousePress", "onMouseDown", "onMouseRelease", "onMouseMove", "onCharInput", "onMouseMove", "onTouchStart", "onTouchMove", "onTouchEnd", "onScroll", "onGamepadButtonPress", "onGamepadButtonDown", "onGamepadButtonRelease", "onGamepadStick", "onButtonPress", "onButtonDown", "onButtonRelease"];
    for (let c of m) u[c] = (...p) => {
      let f = P[c]?.(...p);
      return s.push(f), u.onDestroy(() => f.cancel()), u.on("sceneEnter", () => {
        s.splice(s.indexOf(f), 1);
        let x = P[c]?.(...p);
        Ne.replace(f, x), s.push(f);
      }), f;
    };
    for (let c of t18) u.use(c);
    return u;
  }
  i(cn, "make");
  var Us = i(() => ({ events: new Xe(), objEvents: new Xe(), root: cn([]), gravity: null, scenes: {}, currentScene: null, layers: null, defaultLayerIndex: 0, logs: [], cam: { pos: null, scale: new v(1), angle: 0, shake: 0, transform: new ge() } }), "initGame");
  function Fs(t18) {
    w.gravity = t18 ? (w.gravity || y(0, 1)).unit().scale(t18) : null;
  }
  i(Fs, "setGravity");
  function Ls() {
    return w.gravity ? w.gravity.len() : 0;
  }
  i(Ls, "getGravity");
  function Is(t18) {
    w.gravity = t18.unit().scale(w.gravity ? w.gravity.len() : 1);
  }
  i(Is, "setGravityDirection");
  function zr() {
    return w.gravity ? w.gravity.unit() : y(0, 1);
  }
  i(zr, "getGravityDirection");
  var Ks = ao("SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCIiIiIiIjAwMDAwPj4+Pj4+TExMTExZWVlZWVlnZ2dnZ3V1dXV1dYODg4ODkZGRkZGRn5+fn5+frKysrKy6urq6urrIyMjIyNbW1tbW1uTk5OTk8vLy8vLy//////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQKAAAAAAAAHjOZTf9/AAAAAAAAAAAAAAAAAAAAAP/7kGQAAANUMEoFPeACNQV40KEYABEY41g5vAAA9RjpZxRwAImU+W8eshaFpAQgALAAYALATx/nYDYCMJ0HITQYYA7AH4c7MoGsnCMU5pnW+OQnBcDrQ9Xx7w37/D+PimYavV8elKUpT5fqx5VjV6vZ38eJR48eRKa9KUp7v396UgPHkQwMAAAAAA//8MAOp39CECAAhlIEEIIECBAgTT1oj///tEQYT0wgEIYxgDC09aIiE7u7u7uIiIz+LtoIQGE/+XAGYLjpTAIOGYYy0ZACgDgSNFxC7YYiINocwERjAEDhIy0mRoGwAE7lOTBsGhj1qrXNCU9GrgwSPr80jj0dIpT9DRUNHKJbRxiWSiifVHuD2b0EbjLkOUzSXztP3uE1JpHzV6NPq+f3P5T0/f/lNH7lWTavQ5Xz1yLVe653///qf93B7f/vMdaKJAAJAMAIwIMAHMpzDkoYwD8CR717zVb8/p54P3MikXGCEWhQOEAOAdP6v8b8oNL/EzdnROC8Zo+z+71O8VVAGIKFEglKbidkoLam0mAFiwo0ZoVExf/7kmQLgAQyZFxvPWAENcVKXeK0ABAk2WFMaSNIzBMptBYfArbkZgpWjEQpcmjxQoG2qREWQcvpzuuIm29THt3ElhDNlrXV///XTGbm7Kbx0ymcRX///x7GVvquf5vk/dPs0Wi5Td1vggDxqbNII4bAPTU3Ix5h9FJTe7zv1LHG/uPsPrvth0ejchVzVT3giirs6sQAACgQAAIAdaXbRAYra/2t0//3HwqLKIlBOJhOg4BzAOkt+MOL6H8nlNvKyi3rOnqP//zf6AATwBAKIcHKixxwjl1TjDVIrvTqdmKQOFQBUBDwZ1EhHlDEGEVyGQWBAHrcJgRSXYbkvHK/8/6rbYjs4Qj0C8mRy2hwRv/82opGT55fROgRoBTjanaiQiMRHUu1/P3V9yGFffaVv78U1/6l/kpo0cz73vuSv/9GeaqDVRA5bWdHRKQKIEAAAAoIktKeEmdQFKN5sguv/ZSC0oxCAR7CzcJgEsd8cA0M/x0tzv15E7//5L5KCqoIAAmBFIKM1UxYtMMFjLKESTE8lhaelUyCBYeA2IN4rK1iDt//+5JkEgAkZzlVq29D8DJDWo0YLLARwPFZrL0PyLsUazTAlpI+hKSx01VSOfbjXg0iW9/jVPDleLJ15QQA4Okdc5ByMDFIeuCCE5CvevwBGH8YibiX9FtaIIgUikF42wrZw6ZJ6WlHrA+Ki5++NNMeYH1lEkwwJAIJB4ugVFguXFc20Vd/FLlvq1GSiSwAFABABABA47k6BFeNvxEQZO9v3L1IE4iEVElfrXmEmlyWIyGslFA55gH/sW7////o9AAFIBIIAAIUMzYTTNkgsAmYObfwQyzplrOmYvq0BKCKNN+nUTbvD7cJzvHxrEWG5QqvP8U1vFx6CwE8NoRc2ADBeEb/HoXh60N7ST8nw9QiiGoYvf/r6GtC9+vLwXHjaSkIp3iupC5+Nii81Zhu85pNYbFvrf+UFThDOYYY26off+W6b//73GTiN9xDfl0AAwBAiMBO8qsDBPOZtuT/dTbjVVbY/KSGH6ppHwKv/6X+s8gUCN/lODzv////GQAGAMQAADlXAUCBJiY0wFQZusYQOaQzaTwDBTcx0IvVp8m7uxKp//uSZBMCBHRI1eNPLHAyxNqWGeoYUIEnWYyxD8DUFSn0l6iojcd+oEOkzV6uWqyHNzjqmv+7V5xGUfY9yEmbziTzjRscm9OqFQp1PKFrqu3PX/7YuGtDU6bt0OUTpv38rdc+37dVDQLKUchaJ853E9edNDGqWwsYz1VoiSStEJtZvw6+sNqFWqaIXJjQCGAAGWAYVwmag/x3BRJw1wYF7IzVqDcNzn85d//FzK7IgwbQwccLoB4AsF8Nj/1ESRUAAVJwAFh0YOFEhmSJEHKQRDyhszgLUpHIgFrb5cySFg5jv10ImlYuvaaGBItfXqnNPmic+XNkmb5fW49vdhq97nQMQyGIlM2v8oQSrxKSxE4F1WqrduqvuJCRof1R7Gsre9KszUVF1/t3PzH2tnp+iSUG3rDwGNcDzxCGA8atuQF0paZAAkAhAQAEAC240yJV+nJgUrqq8axAYtVpYjZyFGb13/17jwiClQDaCdytZpyHHf1R/EG/+lUAgAAAChhmJvioVGGBCFgqdpsGAkUUrbTstwTCJgLQpFIsELW7t/68Iv/7kmQUgAQ9NFO9aeAAPAU6RKwUABClY2e5hoARGpDvPydCAsY8WO10fSvUOnfT98+n/l/6/+hxslhQ1DEOaevNKGocvIYba8WJpaP/15pX0NQ1DUNn/////k6lPp/N61rBi8RJFfERV3IgrqDsJA64sjCoKxDDQ9xEcWDpMBDwVFDIAEIAAzryxsjGi4q/oWpixKjhklAF4pUrDPjFhFVupDFZ/t/t0YPAygUBhADPR/KLCKJ8h2Oxhpxz/zNRAAFl0MAZLAYEAiVbEiz36LSgZ5QoQVat69KNy8FyM5Z80ACHAzgnISEkxUSJIDyBSwi5KF4mjBl4xJdbrG9ComLrL8YATiodhQKCkj6ROdyg1y5XmZlvMVmpJzYppJDwLi/Lp9vT3TfmimOGpuezi2U/9FNav0zX9Oja2r//8+hvuihuQAAMAVmqFgAgCcuboAEAAAUcqy8ca0BHBmwbFkED0CNA1YYDPkhcQrRJxcY3BzfxxltAz9vX62Xl3plAzWmRO+FkZyH///1qAAEjQBAACUpgU5o2AIBmFBGMamrGg0b/+5JkC4ADxyLWb2ngAEEkGofsoACP7U1JLaxTkOqFaKhspGgnW3SGC56ZgUJGCRnLOmIJAkuNBgvwU4Ocf8CJK9UsafH9/Frj///365XSoME+DZMw5UNjrMbVoeIj9EL91IuQ5KHyl5V2LCpdIdESgafOHxVGkAlkHuakmix/gN8+BP/sKguLAAoAtUjtvaoeEADwr3OK11E4KBlojgeQNQBJ4MvCAd/4t/xMMzeLhQGQ1//6tQu5BaBOGCT6U4aafvXZ//4iAPAAAAbLkgIlQmMSLA2H1CVNAlWwyVvKIQIxOSK1NWxs4MBUATlKrAkIMPAjCAdS6MVFzuURWa/+/qQWEGsA6EEpiBEJb9Q21lAHoBoD0B6aAPhyt+bG3muoXIN3RLadXxUfr/ohjGFF/p97eqNI5noKAqYLNPpUTDSI9/TmA6B+YAAADgA0Y4lxTW1SQfOQuDDDI0KTTuIrF5qoJrUFhUFAsg+AT2hbkaRZYGIjBKVDIa5VgNN/9P/rCDsBJbYJRKpCA1ArAkigIeYY61AjE+jubyiZFZ3+L789//uSZBCABHVj2entNmw1JXokLycYEFTFVa0wz4DYjKs08J2Q+r4n3lgbWaaMwMLEjFW88F39brqPF83cv1mCSJeY3Q2uiQxhBJxCBeR1D2LQRsYQcZUTzdNll8+OwZBsIwSgl45ymaHX603Mz7JmZuvt71GDTN66zev/+cLn/b5imV8pAHkg61FIJchBSG+zycgAZgADD6F1iQQRXRWmWS6bDIIgyBCZEcdl/KgXGmVKFv/vl8ry/5bLypf//U5jhYDhL9X/pAA0AKBIAAKgGtGXGGWJgEoF2JNsHlKfSKLRhGBAgIuWZKIJCFpF1VBhkB+EfzEyMUJdWuMrEZoPZ5BfF3/Nu62riIdjoO4AAKD2sTrDmpZZaYysf/810TitAVvn9xtFucieiaEy54YqiIO6RqkGAm5wVO0bFB0sDTdNxYGekKktR4KAAfAwUIgI8Ci6aXgtwbhPWAC+CKExAFydNtYGXNZoQjUsXv/9vKjgmdwieb+h7kHvPoc//0FaCACAATKFC4Y9ammklidbaiJNPBhGWTNhFSgdtalK12lpl//7kmQRAFN2NFI7TBvwNKNaTRsFGBWdfV2tPNcYvBHpgPKJsc8IUcTCxY3HSvUVNTWe/Z3YWlrJ0yrNRUiT19aprA7E+mPP+ZmC3/CsheOJXhc/9VJb3UZnphUBcqZUZQth1i3XqtPYu2Sy1s8DV9ZYACAAASAAHgFkQcOqgB5utFHFh3kSi4USs0yk4iOClREmjvdG+upaiLcRA6/9QGbOfxF/8sEAQAVG0G07YFMihKR4EXJCkRdX9isueLqUMRAQdhDZmv3KeR0nPqRVrZmSIXDt+BBSR7qqbKQcB98W9qiMb55preHIStxFWPE4lAyI+BKz2iSxonpvMR5DgKxTH6vGGXAbYCaAnJUW4W07EesQqbfqdbo4qNnPxSpn1H8eahszc/y9//dn1V7D/OYpn1szQKAPXTMlO/rO//u7JriJXbld7aP33v6RXYg/COIDzTWkTspg6Ay1YaDSwKxrP/LfIikHjmO871POf/kEAseAgoPEi9/0ZziNwfxVKy9qAEGEEAAq1EcOamDEGHAA0iao8k31rz2MiLNEik6VQ37/+5JkEAgEYU5WU0M3MDjDe0o9IjiOzSVM7aCzEM2GqXD8pFB0zxMcHCQNHtZD+R+pMWZxOJ/otEZTvVN/MeU12xTVcL+f2YaiNJTVoPd6SvzEnKel5GXOzEaazgdChnP2jOAwpfyRpVlQwoJBwpN1L1DL////6TVWcoepf7CVWrpEWiym5lR5U0BSMlxQC4qByOyQIAEuJfIriWixDqRgMfVZWuvRowjR9BzP5lZlT/+YG50CsSBG////////liXDQVMxEaBkbzKAAACnDIAstY7iK7gGSF7SIDexaTtPOHABk9YcmJEACmo50pgWal22etroBpYoVqtU6OPqvlf0c4QCAfLk9P/FJs4KCQMf6ECZyA6BwqqyJ0rMYj56k1/UlTIx1V3Rt5NF71D4qlptDC8VMgQVHFDlQnDFi06qQgKQAAIK4TxxJGFGYJuZNGXRdpq7IW/DYpPIQRFJLAc+qn1E0XYdOkQVJT+z8Lvff//8vbKAWTIBBUUdM6cOhlDry7x4dAkJXIBhbO3HSMMMGBQ9K9/JNfu09PjTO64wYEcR//uSZBeABP5g11NPRVwzQ4r8PMJVj7j9UU2wUwDPjeq0Z5w675D9+uDdL2QsuIry2lZtwn/pJYyRRjANEOQxNWw8mU7Tq+vueV7JrX/Pg7VIkEuZT5dwd85MVoq5lpStNICkBAcFR88//58KO8Zjt2PIGxWl1cVfXeNGH18SReNT//hYliWtQuNluxyxONbm4U+lpkAgpyE7yAIYUjIaqHmARJ0GQTtmH60xdwFp/u253XBCxD0f/lBcguCALn//Y5nqEv//1h4BAAwgAA5gcHmpIplgeW9fAOM6RFZUywrsGAiRmKkanQnCFBjYoPDS7bjwtPTkVI8D/P8VVLcTUz65n7PW2s3tNYHgEul4tBaIz0A9RgJAyAMI4/i0fpQKjhX9S+qIa0vmc4CZit/0/3UTDGeKNpkk0nu2rUE2ag8WErhE/kgAiQCJKQEYBA5Wn6CxHoIUh6dQ46nLIuwFk4S/LaDQxXu7Yf/pf//lwJB0S/Ff/4C///EiBEiAAAIAMnpngiIABAdMpKigkXaUwhLEGvpiofmXW57h2XAZO3CMRv/7kmQUAEOHQlHraRTQMkQp6GWFZBTVU1lNPTPYyIyocYeUoNgLBWAs1jPkTv/tXBaeZ/tbD/nAGP8/xT0SNEi5zof0KIVEzVe9r5lZOol7kyaXMYS4J/ZS3djp//UaeVyR0mUMlTgfz8XqMzIEgAQQ6UNQ1DSE0/C16OvyaocF4ijAGFci0FSYqCUSaWs6t9F6/699DKvMgMoK1//kSbvxtyBN27I7mdXgNMAW75sRU1UwUHYG5axI2tFIFpkgx7nnK+1JmRKjqeAd5Ph0QAL4QAnirmiPlg0yBDlrb/d3ngtA65rb999+8vdDCfnJuJAYIl285zklpVbrKpk1PEzrOY9NZUgyz6OiOsKt5qG/g2ibxSZ+/eTI/NB8n4ev//n2nIw85GAdwuJL7kYnnAbpcf1RBKH6b2U4RWP8dmWH5snsAFYwADBgAopKdzFJq4Jlmotloh/m4QpTSvJRE3nYZHephoqBhVf+P7vQ9BPlwZCP+3//+hdy5uUwS3LDEgQx4cdIgvDEBR1YqymCsSbKzRy2aQmSv+AAcAgAkvzPfuX/+5JkFQAj6VFX00Zr5DllOhhgpn4MmSs+zSRRiO8U5tWklYgSLKfs+Xheb/+6WaAQCKTztNeJ382MUltZNnjSJoFrCqB6C4mFcwJpJD4Oc8dLDXMTh9k1/rmTopfzqv9AvHWfOuZJlEvHSVMjyjpkVucKSzxJVQBgAAIo8DGqRdYCXPckFYg+dH9A/qUyljrtpxH9RJX/Z3Vv6uFkPg4M2jf3CL09QrwOrMt69n//8UFEAAMHWdhg1CcjyVBwiArOYlDL5NPY6x8ZLFBCGi6SVTKX5nqdSEFjebnv2zHdt0dj6xvORsSFzwqRNTJSZIrrlpXcURNL9WW7krBgr5jPMaGcvJ5v0N1s19CV7+7fvQfjySX2QECWUgKgeJCIif4WRBZ/6archpDkzE7oWctK3zEHP9Smeai8oeHkM6AK7pGjtOgeFv40ugqNd+Iv///uAZAMgAAAUeSWhLPpdwk3iXpBw43hOVIp1gliUOSaeZcZeZhLAH9TtD56wUpBduzLF5v5qViTH6o+I0+8Z1asaLgKVAohlpB72DgAQBQxEd3g//uSZCiAA6k0UdMPQfA+xcnBYON8E3WDVU0w1ZjPDSmo8IniHAFDNnkXF3B94gicH5d8MFw+IHZwufxOf/8gsHw+XrD4Jn8T4RAyQiABNBQg/3giEWuZ42mVFB3kkXNjhqBg1CghEUbN3/7/KBhyqNueef/MIDBClP3YRnKLiIlEFzf//0g+4zKpRIKTpqQgUtnHGFw6RSLN421iGcYapqFxny/capK9r9v+2BSy/RU1yZxa2eGaWK07ijfcxeiO3iuHJvjbXzts+Ny+XyFnsne1h0qG4mAaN6xRGaLVxKPlrri0Bg9oXGyxcw8JRBPkUzC8v451vVd9liSX85JMrmkVNwxOCwUg298////7ks//L409/hwMRIozKiIckXtjzDaAMTBcAACAwLGargPSEgEJZN/EFjfF/VKgaMYKMbwtf/T0UCGGfjfOAZ2frCigYdwh/+sGlQBxhCAAAUHkDPqOdmmUdAVYl3IhrEfR8qZFjLYEPOyzVGvm6lNUJCk2PNazwFxaijk+ZEaiTehoJGuDh6zN/EVP8BCLD/88BoY7Xv/7kmQlgBNmMtNTL0FwOGZJ/WHiKAyhJU+soE3A3JnmAa2oaCIru/+RrEHMTphxQ0X/LzoVy4gKhYl6ZUlklW7CLRVoYmgABwCRMAAMA/poCiEEYLsBVodWcVZ18+CcAfH165U4Xgh7/X1/BAQF6GN/BwQ/+D9S9P6wII//CoANYFYCBAKlGQDKhVjjylKARw2mPAtp8JjcQHggQswVsOEKsF6AIBWvmpIFdSZvRVv/LHWEy0+txMxu+VK9gEqG5pWf6GNGU4UBVkfd+bsj/6lZE0fkOpAqAOvyUO9oo+IiEtcLKOGzhhSGa4MYINHWoQsFr8zzmow0tRILkqz5/+vFxl/oZX/+qGW//xiLjR3xcGn//0QLkTQJh1UA8MAQAEXC/YxODKTDUEhrASs1512GRp+dRFFdTWIRaOXrve1eNjTNpreqQYrC9NBlQc1f8YO2po8bnH6qffuRvU7taiNF3baokE0YpmjRCHRclWBb9NCHKHpERwHRG3pqgXklq4sBpLjGvmekg8Y7SjM1FZopIM8IhB6dtMr8aKsdovh4FW//+5JkQ4CjTDdSU0gtIDiE+YBrKgwNbSVJTCBPwN8N5ZW8NKDnhRB8AXCm//KAsBUCwKU//oJQnET+UP3/zpYRocAAABJkVzzIuoLGEaDoxfsNva12EUdxhJMGFQioSg8GxKsLm8kWEmExJuNidarkk+OTXc0i2OZEq2v+tZr/MDZRS0I7LfRpHdlsiF6m/mEjk+XlK10UqtKYUwNgMx24hUtCJLfpM3ExUeKDYjClgZAzAjQ0qlNQBTsGpk9zSRkCiKkRGp572VXsPYChGvxhAuYkDYZK//jSRgto2mTf6+PJqgAAgIAAAACYZE6aZOHhYkYlcbpeYQq1RgLO4U8TIlL1sGw+iKZi5Kzc/bKT0yXrIUMES89RCWy8oWlxqIQlKANLFpT/KjUrK+UCYbZqGnjVj29aO5dzofWAskRX5eJWPi4kf/aRVjy3Wlyg2AnMYIDSTLwZUTASIzflPWUwwlUnIFMnGiyABeaXJcN91PmQJCLzmvUJkFOHCrX/+6O///IHnT4tT9YYBoNMQ09GfKIErwdwChNz1Qy5+5S/wWeY//uSZF+C03UyT2tMO0A3RRkhY20KzQjDMszhA8DjlGOBp5y4ZCS3ica52GIGiryv7FAaSDVZSXKFTiir+GvGiuK4rjgwPVTddso+W/42a4ueJJHDYtfj6YoKknnjzRgKA0fBIRZOSsprJqnoNN73ps/Z9DVgbKNbMGmRzrYBMAZCPUANkAZQ0syAC2ubK1NF90+WoesBpnhY8qwVDkNb/5Uof6//418TgElCSgAIgyAAQBHEmiaQFPIRmfAMELffpo0IflyEuAAQnSnKvwTlVlnIgOAAGS3P3IydjXPSh/CaVRqpSNCjQqDvPM+fLcuN+WgqNix6CoHomUWTT86JjziRSZ3yjnq+dIldKPU11KUuf6wAASMAAJxE+MlyktgE9UGSxjEx6RR0v1s9bWZ+EJSrGtjqUIhklG3J8eLRn/2U/nv7f///+7/6gBQgEAMUijVMwweWWMyYM/PLXuc7DptIQmBARMRCxXjEIcTNDQgSSeHpUNXO7dRSOllJPvnY7yzaO1hmUjsKvHe99fOxrabMX7mGTi5tsNkZVZLndzxse//7kmR7ABM2O0pbKTvQN4NI+WGFPA2ZESs1pYAAvA0jVrJwAHfbr/c6//vW790dzX36QNBRlDv/6QQAU3V64yUgBEAYc/lI8e5bm+Z9+j+4aaj4tFrb//iker/4a12b/V//q//9v+7vAEAAAAMqZTGd5gL4f54o6ZebKNrR/zWVYUEVYVVv8BuAV2OUT+DUQgkJ8J1Ey4ZbFCiAwgwzMSdHV4jQR+OoPWEASaPkyYq+PsQFFJCsEEJtOiUjI/+GRhtC2DnizTMXATJig9Ey/kAJMrkHGYJ8gpLjmJOYoskpav+ShRJInyGGZVJMihDi6pIxRZJJel/8iZPkYiREnyKE0akTL5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
  var js = i(() => (() => {
    let e = new (window.AudioContext || window.webkitAudioContext)(), n = e.createGain();
    n.connect(e.destination);
    let r = new st(ii(e));
    return e.decodeAudioData(Ks.buffer.slice(0)).then((o) => {
      r.buf = o;
    }).catch((o) => {
      console.error("Failed to load burp: ", o);
    }), { ctx: e, masterNode: n, burpSnd: r };
  })(), "initAudio");
  function ks(t18, e = {}) {
    let n = new le(), r = new Audio(t18);
    se.ctx.createMediaElementSource(r).connect(se.masterNode);
    function s() {
      Z.paused || P.isHidden() && !ie.backgroundAudio || se.ctx.resume();
    }
    i(s, "resumeAudioCtx");
    function a() {
      s(), r.play();
    }
    return i(a, "play"), e.paused || a(), r.onended = () => n.trigger(), { play() {
      a();
    }, seek(l) {
      r.currentTime = l;
    }, stop() {
      r.pause(), this.seek(0);
    }, set loop(l) {
      r.loop = l;
    }, get loop() {
      return r.loop;
    }, set paused(l) {
      l ? r.pause() : a();
    }, get paused() {
      return r.paused;
    }, time() {
      return r.currentTime;
    }, duration() {
      return r.duration;
    }, set volume(l) {
      r.volume = Ue(l, 0, 1);
    }, get volume() {
      return r.volume;
    }, set speed(l) {
      r.playbackRate = Math.max(l, 0);
    }, get speed() {
      return r.playbackRate;
    }, set detune(l) {
    }, get detune() {
      return 0;
    }, onEnd(l) {
      return n.add(l);
    }, then(l) {
      return this.onEnd(l);
    } };
  }
  i(ks, "playMusic");
  function Zn(t18, e = {}) {
    if (typeof t18 == "string" && _.music[t18]) return ks(_.music[t18], e);
    let n = se.ctx, r = e.paused ?? false, o = n.createBufferSource(), s = new le(), a = n.createGain(), l = n.createStereoPanner(), u = e.seek ?? 0, m = 0, c = 0, p = false;
    o.loop = !!e.loop, o.detune.value = e.detune ?? 0, o.playbackRate.value = e.speed ?? 1, o.connect(l), o.onended = () => {
      g() >= (o.buffer?.duration ?? Number.POSITIVE_INFINITY) && s.trigger();
    }, l.pan.value = e.pan ?? 0, l.connect(a), a.connect(se.masterNode), a.gain.value = e.volume ?? 1;
    let f = i((b) => {
      o.buffer = b.buf, r || (m = n.currentTime, o.start(0, u), p = true);
    }, "start"), x = _i(t18);
    x instanceof me && x.onLoad(f);
    let g = i(() => {
      if (!o.buffer) return 0;
      let b = r ? c - m : n.currentTime - m, T = o.buffer.duration;
      return o.loop ? b % T : Math.min(b, T);
    }, "getTime"), C = i((b) => {
      let T = n.createBufferSource();
      return T.buffer = b.buffer, T.loop = b.loop, T.playbackRate.value = b.playbackRate.value, T.detune.value = b.detune.value, T.onended = b.onended, T.connect(l), T;
    }, "cloneNode");
    return { stop() {
      this.paused = true, this.seek(0);
    }, set paused(b) {
      if (r !== b) if (r = b, b) p && (o.stop(), p = false), c = n.currentTime;
      else {
        o = C(o);
        let T = c - m;
        o.start(0, T), p = true, m = n.currentTime - T, c = 0;
      }
    }, get paused() {
      return r;
    }, play(b = 0) {
      this.seek(b), this.paused = false;
    }, seek(b) {
      o.buffer?.duration && (b > o.buffer.duration || (r ? (o = C(o), m = c - b) : (o.stop(), o = C(o), m = n.currentTime - b, o.start(0, b), p = true, c = 0)));
    }, set speed(b) {
      o.playbackRate.value = b;
    }, get speed() {
      return o.playbackRate.value;
    }, set detune(b) {
      o.detune.value = b;
    }, get detune() {
      return o.detune.value;
    }, set volume(b) {
      a.gain.value = Math.max(b, 0);
    }, get volume() {
      return a.gain.value;
    }, set pan(b) {
      l.pan.value = b;
    }, get pan() {
      return l.pan.value;
    }, set loop(b) {
      o.loop = b;
    }, get loop() {
      return o.loop;
    }, duration() {
      return o.buffer?.duration ?? 0;
    }, time() {
      return g() % this.duration();
    }, onEnd(b) {
      return s.add(b);
    }, then(b) {
      return this.onEnd(b);
    } };
  }
  i(Zn, "play");
  function er(t18) {
    return Zn(se.burpSnd, t18);
  }
  i(er, "burp");
  function _s(t18) {
    return t18 !== void 0 && (se.masterNode.gain.value = t18), se.masterNode.gain.value;
  }
  i(_s, "volume");
  function tr() {
    P.onHide(() => {
      ie.backgroundAudio || se.ctx.suspend();
    }), P.onShow(() => {
      !ie.backgroundAudio && !Z.paused && se.ctx.resume();
    }), P.onResize(() => {
      if (P.isFullscreen()) return;
      let t18 = ie.width && ie.height;
      t18 && !ie.stretch && !ie.letterbox || (ve.width = ve.offsetWidth * $e, ve.height = ve.offsetHeight * $e, Hn(), t18 || (A.frameBuffer.free(), A.frameBuffer = new at(A.ggl, A.ggl.gl.drawingBufferWidth, A.ggl.gl.drawingBufferHeight), A.width = A.ggl.gl.drawingBufferWidth / $e / _t, A.height = A.ggl.gl.drawingBufferHeight / $e / _t));
    }), ie.debug !== false && (P.onKeyPress(ie.debugKey ?? "f1", () => Z.inspect = !Z.inspect), P.onKeyPress("f2", () => Z.clearLog()), P.onKeyPress("f8", () => Z.paused = !Z.paused), P.onKeyPress("f7", () => {
      Z.timeScale = Jt(Ue(Z.timeScale - 0.2, 0, 2), 1);
    }), P.onKeyPress("f9", () => {
      Z.timeScale = Jt(Ue(Z.timeScale + 0.2, 0, 2), 1);
    }), P.onKeyPress("f10", () => Z.stepFrame())), ie.burp && P.onKeyPress("b", () => er());
  }
  i(tr, "initEvents");
  function Ns(t18, e = {}) {
    let n = w.root.add([Rt(t18), nr()]), r = (e.speed || 1) * 5, o = e.scale || 1;
    n.add([ln($r), Nt(0), mn("center"), Yr(r, o), ...e.comps ?? []]);
    let s = n.add([ln(Wr), Nt(0), mn("center"), pn(), ...e.comps ?? []]);
    return s.wait(0.4 / r, () => s.use(Yr(r, o))), s.onDestroy(() => n.destroy()), n;
  }
  i(Ns, "addKaboom");
  var Hs = i(function(t18, e) {
    if (w.layers) throw Error("Layers can only be assigned once.");
    let n = t18.indexOf(e);
    if (n == -1) throw Error("The default layer name should be present in the layers list.");
    w.layers = t18, w.defaultLayerIndex = n;
  }, "layers");
  function $n(t18) {
    t18.destroy();
  }
  i($n, "destroy");
  function qs() {
    return w.root;
  }
  i(qs, "getTreeRoot");
  function zs(t18, e) {
    w.scenes[t18] = e;
  }
  i(zs, "scene");
  function Ys(t18, ...e) {
    if (!w.scenes[t18]) throw new Error(`Scene not found: ${t18}`);
    w.events.onOnce("frameEnd", () => {
      w.events.trigger("sceneLeave", t18), P.events.clear(), w.events.clear(), w.objEvents.clear(), [...w.root.children].forEach((n) => {
        !n.stay || n.scenesToStay && !n.scenesToStay.includes(t18) ? w.root.remove(n) : n.trigger("sceneEnter", t18);
      }), w.root.clearEvents(), tr(), w.cam = { pos: null, scale: y(1), angle: 0, shake: 0, transform: new ge() }, w.scenes[t18](...e);
    }), w.currentScene = t18;
  }
  i(Ys, "go");
  function Ws(t18) {
    return w.events.on("sceneLeave", t18);
  }
  i(Ws, "onSceneLeave");
  function $s() {
    return w.currentScene;
  }
  i($s, "getSceneName");
  function ln(t18, e = {}) {
    let n = null, r = null, o = null, s = new le();
    if (!t18) throw new Error("Please pass the resource name or data to sprite()");
    let a = i((u, m, c, p) => {
      let f = y(1, 1);
      return c && p ? (f.x = c / (u.width * m.w), f.y = p / (u.height * m.h)) : c ? (f.x = c / (u.width * m.w), f.y = f.x) : p && (f.y = p / (u.height * m.h), f.x = f.y), f;
    }, "calcTexScale"), l = i((u, m) => {
      if (!m) return;
      let c = m.frames[0].clone();
      e.quad && (c = c.scale(e.quad));
      let p = a(m.tex, c, e.width, e.height);
      u.width = m.tex.width * c.w * p.x, u.height = m.tex.height * c.h * p.y, e.anim && u.play(e.anim), n = m, s.trigger(n);
    }, "setSpriteData");
    return { id: "sprite", width: 0, height: 0, frame: e.frame || 0, quad: e.quad || new Q(0, 0, 1, 1), animSpeed: e.animSpeed ?? 1, flipX: e.flipX ?? false, flipY: e.flipY ?? false, get sprite() {
      return t18.toString();
    }, set sprite(u) {
      let m = It(u);
      m && m.onLoad((c) => l(this, c));
    }, get animFrame() {
      if (!n || !r || o === null) return this.frame;
      let u = n.anims[r.name];
      return typeof u == "number" ? u : this.frame - Math.min(u.from, u.to);
    }, draw() {
      if (!n) return;
      let u = n.frames[this.frame ?? 0];
      if (!u) throw new Error(`Frame not found: ${this.frame ?? 0}`);
      if (n.slice9) {
        let { left: m, right: c, top: p, bottom: f } = n.slice9, x = n.tex.width * u.w, g = n.tex.height * u.h, C = this.width - m - c, b = this.height - p - f, T = m / x, G = c / x, M = 1 - T - G, R = p / g, F = f / g, h = 1 - R - F, O = [pe(0, 0, T, R), pe(T, 0, M, R), pe(T + M, 0, G, R), pe(0, R, T, h), pe(T, R, M, h), pe(T + M, R, G, h), pe(0, R + h, T, F), pe(T, R + h, M, F), pe(T + M, R + h, G, F), pe(0, 0, m, p), pe(m, 0, C, p), pe(m + C, 0, c, p), pe(0, p, m, b), pe(m, p, C, b), pe(m + C, p, c, b), pe(0, p + b, m, f), pe(m, p + b, C, f), pe(m + C, p + b, c, f)];
        for (let S = 0; S < 9; S++) {
          let D = O[S], U = O[S + 9];
          Gt(Object.assign(je(this), { pos: U.pos(), tex: n.tex, quad: u.scale(D), flipX: this.flipX, flipY: this.flipY, tiled: e.tiled, width: U.w, height: U.h }));
        }
      } else Gt(Object.assign(je(this), { tex: n.tex, quad: u.scale(this.quad ?? new Q(0, 0, 1, 1)), flipX: this.flipX, flipY: this.flipY, tiled: e.tiled, width: this.width, height: this.height }));
    }, add() {
      let u = It(t18);
      u ? u.onLoad((m) => l(this, m)) : kt(() => l(this, It(t18).data));
    }, update() {
      if (!n || !r || o === null) return;
      let u = n.anims[r.name];
      if (typeof u == "number") {
        this.frame = u;
        return;
      }
      if (u.speed === 0) throw new Error("Sprite anim speed cannot be 0");
      r.timer += Se() * this.animSpeed, r.timer >= 1 / r.speed && (r.timer = 0, this.frame += o, (this.frame < Math.min(u.from, u.to) || this.frame > Math.max(u.from, u.to)) && (r.loop ? r.pingpong ? (this.frame -= o, o *= -1, this.frame += o) : this.frame = u.from : r.pingpong ? o === Math.sign(u.to - u.from) ? (this.frame = u.to, o *= -1, this.frame += o) : (this.frame = u.from, r.onEnd(), this.stop()) : (this.frame = u.to, r.onEnd(), this.stop())));
    }, play(u, m = {}) {
      if (!n) {
        s.add(() => this.play(u, m));
        return;
      }
      let c = n.anims[u];
      if (c === void 0) throw new Error(`Anim not found: ${u}`);
      r && this.stop(), r = typeof c == "number" ? { name: u, timer: 0, loop: false, pingpong: false, speed: 0, onEnd: i(() => {
      }, "onEnd") } : { name: u, timer: 0, loop: m.loop ?? c.loop ?? false, pingpong: m.pingpong ?? c.pingpong ?? false, speed: m.speed ?? c.speed ?? 10, onEnd: m.onEnd ?? (() => {
      }) }, o = typeof c == "number" ? null : c.from < c.to ? 1 : -1, this.frame = typeof c == "number" ? c : c.from, this.trigger("animStart", u);
    }, stop() {
      if (!r) return;
      let u = r.name;
      r = null, this.trigger("animEnd", u);
    }, numFrames() {
      return n?.frames.length ?? 0;
    }, getCurAnim() {
      return r;
    }, curAnim() {
      return r?.name;
    }, getAnim(u) {
      return n?.anims[u] ?? null;
    }, hasAnim(u) {
      return !!this.getAnim(u);
    }, onAnimEnd(u) {
      return this.on("animEnd", u);
    }, onAnimStart(u) {
      return this.on("animStart", u);
    }, renderArea() {
      return new te(y(0), this.width, this.height);
    }, inspect() {
      return typeof t18 == "string" ? `sprite: "${t18}"` : null;
    } };
  }
  i(ln, "sprite");
  function Xs(t18, e = {}) {
    function n(o) {
      let s = ze(Object.assign(je(o), { text: o.text + "", size: o.textSize, font: o.font, width: e.width && o.width, align: o.align, letterSpacing: o.letterSpacing, lineSpacing: o.lineSpacing, transform: o.textTransform, styles: o.textStyles }));
      return e.width || (o.width = s.width / (o.scale?.x || 1)), o.height = s.height / (o.scale?.y || 1), s;
    }
    i(n, "update");
    let r = { id: "text", set text(o) {
      t18 = o, n(this), this.renderedText = kn(t18).text;
    }, get text() {
      return t18;
    }, textSize: e.size ?? 36, font: e.font, width: e.width ?? 0, height: 0, align: e.align, lineSpacing: e.lineSpacing, letterSpacing: e.letterSpacing, textTransform: e.transform, textStyles: e.styles, renderedText: t18 ? kn(t18).text : "", add() {
      kt(() => n(this));
    }, draw() {
      Ye(n(this));
    }, renderArea() {
      return new te(y(0), this.width, this.height);
    } };
    return n(r), r;
  }
  i(Xs, "text");
  function Qs(t18, e) {
    return { id: "rect", width: t18, height: e, draw() {
      ut(Object.assign(je(this), { width: this.width, height: this.height }));
    }, renderArea() {
      return new te(y(0), this.width, this.height);
    }, inspect() {
      return `uvquad: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)})h`;
    } };
  }
  i(Qs, "uvquad");
  function Js(t18 = {}) {
    let e = null, n = null, r = null, o = null;
    return { id: "agent", require: ["pos", "tile"], agentSpeed: t18.speed ?? 100, allowDiagonals: t18.allowDiagonals ?? true, getDistanceToTarget() {
      return e ? this.pos.dist(e) : 0;
    }, getNextLocation() {
      return n && r ? n[r] : null;
    }, getPath() {
      return n ? n.slice() : null;
    }, getTarget() {
      return e;
    }, isNavigationFinished() {
      return n ? r === null : true;
    }, isTargetReachable() {
      return n !== null;
    }, isTargetReached() {
      return e ? this.pos.eq(e) : true;
    }, setTarget(s) {
      e = s, n = this.getLevel().getPath(this.pos, e, { allowDiagonals: this.allowDiagonals }), r = n ? 0 : null, n && r !== null ? (o || (o = this.getLevel().onNavigationMapChanged(() => {
        e && n && r !== null && (n = this.getLevel().getPath(this.pos, e, { allowDiagonals: this.allowDiagonals }), n ? (r = 0, this.trigger("navigationNext", this, n[r])) : (r = null, this.trigger("navigationEnded", this)));
      }), this.onDestroy(() => o?.cancel())), this.trigger("navigationStarted", this), this.trigger("navigationNext", this, n[r])) : this.trigger("navigationEnded", this);
    }, update() {
      if (e && n && r !== null) {
        if (this.pos.sdist(n[r]) < 2) if (r === n.length - 1) {
          this.pos = e.clone(), r = null, this.trigger("navigationEnded", this), this.trigger("targetReached", this);
          return;
        } else r++, this.trigger("navigationNext", this, n[r]);
        this.moveTo(n[r], this.agentSpeed);
      }
    }, onNavigationStarted(s) {
      return this.on("navigationStarted", s);
    }, onNavigationNext(s) {
      return this.on("navigationNext", s);
    }, onNavigationEnded(s) {
      return this.on("navigationEnded", s);
    }, onTargetReached(s) {
      return this.on("targetReached", s);
    }, inspect() {
      return "agent: " + JSON.stringify({ target: JSON.stringify(e), path: JSON.stringify(n) });
    } };
  }
  i(Js, "agent");
  function Zs(t18) {
    let e = t18.graph;
    return { id: "pathfinder", require: ["pos"], navigateTo(n) {
      return this.graph?.getWaypointPath(this.pos, n, t18.navigationOpt);
    }, get graph() {
      if (e) return e;
      let n = this.parent;
      for (; n; ) {
        if (n.is("pathfinderMap")) return n.graph;
        n = n.parent;
      }
    }, set graph(n) {
      e = n;
    } };
  }
  i(Zs, "pathfinder");
  function ea(t18 = {}) {
    let e = t18.waypoints, n = t18.speed || 100, r = t18.endBehavior || "stop", o = 0, s = e != null;
    return { id: "patrol", require: ["pos"], get patrolSpeed() {
      return n;
    }, set patrolSpeed(a) {
      n = a;
    }, get waypoints() {
      return e;
    }, set waypoints(a) {
      e = a, o = 0, s = false;
    }, get nextLocation() {
      return e ? e[o] : void 0;
    }, update() {
      let a = this.nextLocation;
      if (!(!e || !a || s) && (this.moveTo(a, n), this.pos.sdist(a) < 9)) switch (r) {
        case "loop":
          o = (o + 1) % e.length;
          break;
        case "ping-pong":
          o = o + 1, o == e.length && (e.reverse(), o = 0);
          break;
        case "stop":
          o = Math.min(o + 1, e.length - 1), o == e.length - 1 && (s = true, this.trigger("patrolFinished"));
          break;
      }
    }, onPatrolFinished(a) {
      return this.on("patrolFinished", a);
    } };
  }
  i(ea, "patrol");
  function ta(t18, e = {}) {
    let n = typeof t18 == "function" ? t18 : () => w.root.query(t18), r = e.checkFrequency || 1, o = typeof e.direction == "number" ? v.fromAngle(e.direction) : e.direction, s = 0;
    return { id: "sentry", require: ["pos"], direction: typeof e.direction == "number" ? v.fromAngle(e.direction) : e.direction, spotted: [], set directionAngle(a) {
      this.direction = a !== void 0 ? v.fromAngle(a) : void 0;
    }, get directionAngle() {
      return this.direction ? this.direction.angle() : void 0;
    }, fieldOfView: e.fieldOfView || 200, isWithinFieldOfView(a, l, u) {
      let m = (typeof l == "number" ? v.fromAngle(l) : l) || o, c = u || e.fieldOfView;
      if (!m || !c || c >= 360) return true;
      let p = c / 2;
      return a.pos && m.angleBetween(a.pos.sub(this.pos)) <= p;
    }, hasLineOfSight(a) {
      let l = Yn(this.pos, a.pos.sub(this.pos), e.raycastExclude);
      return l != null && l.object === a;
    }, update() {
      if (s += Se(), s > r) {
        s -= r;
        let a = n();
        if (a.length && o && this.fieldOfView && this.fieldOfView < 360) {
          let l = this.fieldOfView / 2;
          a = a.filter((u) => u.pos && o.angleBetween(u.pos.sub(this.pos)) <= l);
        }
        a.length && e.lineOfSight && (a = a.filter((l) => l.pos && this.hasLineOfSight(l))), a.length > 0 && (this.spotted = a, this.trigger("objectSpotted", a));
      }
    }, onObjectsSpotted(a) {
      return this.on("objectSpotted", a);
    } };
  }
  i(ta, "sentry");
  function Qn(t18 = {}) {
    let e = y(0), n = t18.isObstacle ?? false, r = t18.cost ?? 0, o = t18.edges ?? [], s = i(() => {
      let l = { left: 1, top: 2, right: 4, bottom: 8 };
      return o.map((u) => l[u] || 0).reduce((u, m) => u | m, 0);
    }, "getEdgeMask"), a = s();
    return { id: "tile", tilePosOffset: t18.offset ?? y(0), set tilePos(l) {
      let u = this.getLevel();
      e = l.clone(), this.pos = y(this.tilePos.x * u.tileWidth(), this.tilePos.y * u.tileHeight()).add(this.tilePosOffset);
    }, get tilePos() {
      return e;
    }, set isObstacle(l) {
      n !== l && (n = l, this.getLevel().invalidateNavigationMap());
    }, get isObstacle() {
      return n;
    }, set cost(l) {
      r !== l && (r = l, this.getLevel().invalidateNavigationMap());
    }, get cost() {
      return r;
    }, set edges(l) {
      o = l, a = s(), this.getLevel().invalidateNavigationMap();
    }, get edges() {
      return o;
    }, get edgeMask() {
      return a;
    }, getLevel() {
      return this.parent;
    }, moveLeft() {
      this.tilePos = this.tilePos.add(y(-1, 0));
    }, moveRight() {
      this.tilePos = this.tilePos.add(y(1, 0));
    }, moveUp() {
      this.tilePos = this.tilePos.add(y(0, -1));
    }, moveDown() {
      this.tilePos = this.tilePos.add(y(0, 1));
    } };
  }
  i(Qn, "tile");
  var dn = class {
    static {
      i(this, "AnimateChannel");
    }
    name;
    duration;
    loops;
    direction;
    easing;
    interpolation;
    isFinished;
    timing;
    easings;
    relative;
    constructor(e, n, r) {
      this.name = e, this.duration = n.duration, this.loops = n.loops || 0, this.direction = n.direction || "forward", this.easing = n.easing || ot.linear, this.interpolation = n.interpolation || "linear", this.isFinished = false, this.timing = n.timing, this.easings = n.easings, this.relative = r;
    }
    update(e, n) {
      return true;
    }
    getLowerKeyIndexAndRelativeTime(e, n, r) {
      let o = n - 1, s = e / this.duration;
      if (this.loops !== 0 && s >= this.loops) return [o, 0];
      let a = Math.trunc(s);
      if (s -= a, (this.direction == "reverse" || this.direction == "ping-pong" && a & 1) && (s = 1 - s), r) {
        let l = 0;
        for (; r[l + 1] !== void 0 && r[l + 1] < s; ) l++;
        return l >= o ? [o, 0] : [l, (s - r[l]) / (r[l + 1] - r[l])];
      } else {
        let l = Math.floor((n - 1) * s);
        return [l, (s - l / o) * o];
      }
    }
    setValue(e, n, r) {
      if (this.relative) switch (n) {
        case "pos":
          e.pos = e.base.pos.add(r);
          break;
        case "angle":
          e.angle = e.base.angle + r;
          break;
        case "scale":
          e.scale = e.base.scale.scale(r);
          break;
        case "opacity":
          e.opacity = e.base.opacity * r;
          break;
        default:
          e[n] = r;
      }
      else e[n] = r;
    }
    serialize() {
      let e = { duration: this.duration, keys: [] };
      return this.loops && (e.loops = this.loops), this.direction !== "forward" && (e.direction = this.direction), this.easing != ot.linear && (e.easing = this.easing.name), this.interpolation !== "linear" && (e.interpolation = this.interpolation), this.timing && (e.timing = this.timing), this.easings && (e.easings = this.easings.map((n) => this.easing.name)), e;
    }
  };
  function na(t18, e) {
    return e.add(e.sub(t18));
  }
  i(na, "reflect");
  var Xr = class extends dn {
    static {
      i(this, "AnimateChannelNumber");
    }
    keys;
    constructor(e, n, r, o) {
      super(e, r, o), this.keys = n;
    }
    update(e, n) {
      let [r, o] = this.getLowerKeyIndexAndRelativeTime(n, this.keys.length, this.timing);
      if (o == 0 || this.interpolation === "none") this.setValue(e, this.name, this.keys[r]);
      else {
        let s = this.easings ? this.easings[r] : this.easing;
        this.setValue(e, this.name, Ee(this.keys[r], this.keys[r + 1], s(o)));
      }
      return o == 1;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys });
    }
  };
  var Qr = class extends dn {
    static {
      i(this, "AnimateChannelVec2");
    }
    keys;
    curves;
    dcurves;
    constructor(e, n, r, o, s) {
      if (super(e, r, o), this.keys = n, this.interpolation === "spline") {
        this.curves = [], s && (this.dcurves = []);
        for (let a = 0; a < this.keys.length - 1; a++) {
          let l = this.keys[a], u = a + 1, m = this.keys[u], c = a > 0 ? this.keys[a - 1] : na(m, l), p = u < this.keys.length - 1 ? this.keys[u + 1] : na(l, m);
          this.curves.push(Ft(c, l, m, p)), s && this.dcurves?.push(Ft(c, l, m, p, Bo));
        }
      }
    }
    update(e, n) {
      let [r, o] = this.getLowerKeyIndexAndRelativeTime(n, this.keys.length, this.timing);
      if (o == 0 || this.interpolation === "none") this.setValue(e, this.name, this.keys[r]);
      else {
        let s = this.easings ? this.easings[r] : this.easing;
        switch (this.interpolation) {
          case "linear":
            this.setValue(e, this.name, this.keys[r].lerp(this.keys[r + 1], s(o)));
            break;
          case "slerp":
            this.setValue(e, this.name, this.keys[r].slerp(this.keys[r + 1], s(o)));
            break;
          case "spline":
            if (this.curves) {
              this.setValue(e, this.name, this.curves[r](s(o))), this.dcurves && this.setValue(e, "angle", this.dcurves[r](s(o)).angle());
              break;
            }
        }
      }
      return o == 1;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys.map((e) => [e.x, e.y]) });
    }
  };
  var Jr = class extends dn {
    static {
      i(this, "AnimateChannelColor");
    }
    keys;
    constructor(e, n, r, o) {
      super(e, r, o), this.keys = n;
    }
    update(e, n) {
      let [r, o] = this.getLowerKeyIndexAndRelativeTime(n, this.keys.length, this.timing);
      if (o == 0 || this.interpolation == "none") this.setValue(e, this.name, this.keys[r]);
      else {
        let s = this.easings ? this.easings[r] : this.easing;
        this.setValue(e, this.name, this.keys[r].lerp(this.keys[r + 1], s(o)));
      }
      return o == 1;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys });
    }
  };
  function ra(t18 = {}) {
    let e = [], n = 0, r = false;
    return { id: "animate", require: t18.followMotion ? ["rotate"] : void 0, base: { pos: y(0, 0), angle: 0, scale: y(1, 1), opacity: 1 }, add() {
      t18.relative && (this.is("pos") && (this.base.pos = this.pos.clone()), this.is("rotate") && (this.base.angle = this.angle), this.is("scale") && (this.base.scale = this.scale), this.is("opacity") && (this.base.opacity = this.opacity));
    }, update() {
      let o = true, s;
      n += Se();
      for (let a of e) s = a.update(this, n), s && !a.isFinished && (a.isFinished = true, this.trigger("animateChannelFinished", a.name)), o &&= s;
      o && !r && (r = true, this.trigger("animateFinished"));
    }, animate(o, s, a) {
      r = false, this.unanimate(o), typeof s[0] == "number" ? e.push(new Xr(o, s, a, t18.relative || false)) : s[0] instanceof v ? e.push(new Qr(o, s, a, t18.relative || false, o === "pos" && (t18.followMotion || false))) : s[0] instanceof H && e.push(new Jr(o, s, a, t18.relative || false));
    }, unanimate(o) {
      let s = e.findIndex((a) => a.name === o);
      s >= 0 && e.splice(s, 1);
    }, unanimateAll() {
      e.splice(0, e.length);
    }, onAnimateFinished(o) {
      return this.on("animateFinished", o);
    }, onAnimateChannelFinished(o) {
      return this.on("animateChannelFinished", o);
    }, serializeAnimationChannels() {
      return e.reduce((o, s) => (o[s.name] = s.serialize(), o), {});
    }, serializeAnimationOptions() {
      let o = {};
      return t18.followMotion && (o.followMotion = true), t18.relative && (o.relative = true), o;
    } };
  }
  i(ra, "animate");
  function Zr(t18, e) {
    let n = { name: t18.name };
    return t18.is("animate") && (n.channels = t18.serializeAnimationChannels(), Object.assign(n, t18.serializeAnimationOptions())), t18.children.length > 0 && (n.children = t18.children.filter((r) => r.is("named")).map((r) => Zr(r, r.name))), n;
  }
  i(Zr, "serializeAnimation");
  function Yr(t18 = 2, e = 1) {
    let n = 0;
    return { require: ["scale"], update() {
      let r = Math.sin(n * t18) * e;
      r < 0 && this.destroy(), this.scale = y(r), n += Se();
    } };
  }
  i(Yr, "boom");
  function oa(t18, e) {
    if (t18 == null) throw new Error("health() requires the initial amount of hp");
    return { id: "health", hurt(n = 1) {
      this.setHP(t18 - n), this.trigger("hurt", n);
    }, heal(n = 1) {
      let r = t18;
      this.setHP(t18 + n), this.trigger("heal", t18 - r);
    }, hp() {
      return t18;
    }, maxHP() {
      return e ?? null;
    }, setMaxHP(n) {
      e = n;
    }, setHP(n) {
      t18 = e ? Math.min(e, n) : n, t18 <= 0 && this.trigger("death");
    }, onHurt(n) {
      return this.on("hurt", n);
    }, onHeal(n) {
      return this.on("heal", n);
    }, onDeath(n) {
      return this.on("death", n);
    }, inspect() {
      return `health: ${t18}`;
    } };
  }
  i(oa, "health");
  function ia(t18, e = {}) {
    if (t18 == null) throw new Error("lifespan() requires time");
    let n = e.fade ?? 0;
    return { id: "lifespan", require: ["opacity"], async add() {
      await w.root.wait(t18), this.opacity = this.opacity ?? 1, n > 0 && await w.root.tween(this.opacity, 0, n, (r) => this.opacity = r, ot.linear), this.destroy();
    } };
  }
  i(ia, "lifespan");
  function sa(t18) {
    return { id: "named", name: t18 };
  }
  i(sa, "named");
  function aa(t18, e, n) {
    if (!t18) throw new Error("state() requires an initial state");
    let r = {};
    function o(u) {
      r[u] || (r[u] = { enter: new le(), end: new le(), update: new le(), draw: new le() });
    }
    i(o, "initStateEvents");
    function s(u, m, c) {
      return o(m), r[m][u].add(c);
    }
    i(s, "on");
    function a(u, m, ...c) {
      o(m), r[m][u].trigger(...c);
    }
    i(a, "trigger");
    let l = false;
    return { id: "state", state: t18, enterState(u, ...m) {
      if (l = true, e && !e.includes(u)) throw new Error(`State not found: ${u}`);
      let c = this.state;
      if (n) {
        if (!n?.[c]) return;
        let p = typeof n[c] == "string" ? [n[c]] : n[c];
        if (!p.includes(u)) throw new Error(`Cannot transition state from "${c}" to "${u}". Available transitions: ${p.map((f) => `"${f}"`).join(", ")}`);
      }
      a("end", c, ...m), this.state = u, a("enter", u, ...m), a("enter", `${c} -> ${u}`, ...m);
    }, onStateTransition(u, m, c) {
      return s("enter", `${u} -> ${m}`, c);
    }, onStateEnter(u, m) {
      return s("enter", u, m);
    }, onStateUpdate(u, m) {
      return s("update", u, m);
    }, onStateDraw(u, m) {
      return s("draw", u, m);
    }, onStateEnd(u, m) {
      return s("end", u, m);
    }, update() {
      l || (a("enter", t18), l = true), a("update", this.state);
    }, draw() {
      a("draw", this.state);
    }, inspect() {
      return `state: ${this.state}`;
    } };
  }
  i(aa, "state");
  function nr(t18) {
    return { id: "stay", stay: true, scenesToStay: t18 };
  }
  i(nr, "stay");
  function ua(t18 = true, e) {
    let n, r;
    return { id: "textInput", hasFocus: t18, require: ["text"], add() {
      n = L.onCharInput((o) => {
        this.hasFocus && (!e || this.text.length < e) && (L.isKeyDown("shift") ? this.text += o.toUpperCase() : this.text += o);
      }), r = L.onKeyPressRepeat("backspace", () => {
        this.hasFocus && (this.text = this.text.slice(0, -1));
      });
    }, destroy() {
      n.cancel(), r.cancel();
    } };
  }
  i(ua, "textInput");
  function pn() {
    return { id: "timer", wait(t18, e) {
      let n = [];
      e && n.push(e);
      let r = 0, o = this.onUpdate(() => {
        r += L.dt(), r >= t18 && (n.forEach((s) => s()), o.cancel());
      });
      return { get paused() {
        return o.paused;
      }, set paused(s) {
        o.paused = s;
      }, cancel: o.cancel, onEnd(s) {
        n.push(s);
      }, then(s) {
        return this.onEnd(s), this;
      } };
    }, loop(t18, e) {
      let n = null, r = i(() => {
        n = this.wait(t18, r), e();
      }, "newAction");
      return n = this.wait(0, r), { get paused() {
        return n?.paused ?? false;
      }, set paused(o) {
        n && (n.paused = o);
      }, cancel: i(() => n?.cancel(), "cancel") };
    }, tween(t18, e, n, r, o = ot.linear) {
      let s = 0, a = [], l = this.onUpdate(() => {
        s += L.dt();
        let u = Math.min(s / n, 1);
        r(Ee(t18, e, o(u))), u === 1 && (l.cancel(), r(e), a.forEach((m) => m()));
      });
      return { get paused() {
        return l.paused;
      }, set paused(u) {
        l.paused = u;
      }, onEnd(u) {
        a.push(u);
      }, then(u) {
        return this.onEnd(u), this;
      }, cancel() {
        l.cancel();
      }, finish() {
        l.cancel(), r(e), a.forEach((u) => u());
      } };
    } };
  }
  i(pn, "timer");
  var eo = 0;
  function ca() {
    return eo > 0;
  }
  i(ca, "usesArea");
  function la(t18 = {}) {
    let e = {}, n = /* @__PURE__ */ new Set();
    return { id: "area", collisionIgnore: t18.collisionIgnore ?? [], add() {
      eo++, this.area.cursor && this.onHover(() => P.setCursor(this.area.cursor)), this.onCollideUpdate((r, o) => {
        if (!r.id) throw new Error("area() requires the object to have an id");
        e[r.id] || this.trigger("collide", r, o), o && (e[r.id] = o, n.add(r.id));
      });
    }, destroy() {
      eo--;
    }, fixedUpdate() {
      for (let r in e) n.has(Number(r)) || (this.trigger("collideEnd", e[r].target), delete e[r]);
      n.clear();
    }, drawInspect() {
      let r = this.localArea();
      L.pushTransform(), L.pushTranslate(this.area.offset);
      let o = { outline: { width: 4 / Mn(), color: Y(0, 0, 255) }, anchor: this.anchor, fill: false, fixed: ct(this) };
      r instanceof L.Rect ? L.drawRect({ ...o, pos: r.pos, width: r.width * this.area.scale.x, height: r.height * this.area.scale.y }) : r instanceof L.Polygon ? L.drawPolygon({ ...o, pts: r.pts, scale: this.area.scale }) : r instanceof L.Circle && L.drawCircle({ ...o, pos: r.center, radius: r.radius }), L.popTransform();
    }, area: { shape: t18.shape ?? null, scale: t18.scale ? y(t18.scale) : y(1), offset: t18.offset ?? y(0), cursor: t18.cursor ?? null }, isClicked() {
      return P.isMousePressed() && this.isHovering();
    }, isHovering() {
      let r = ct(this) ? L.mousePos() : L.toWorld(L.mousePos());
      return this.hasPoint(r);
    }, checkCollision(r) {
      if (!r.id) throw new Error("checkCollision() requires the object to have an id");
      return e[r.id] ?? null;
    }, getCollisions() {
      return Object.values(e);
    }, isColliding(r) {
      if (!r.id) throw new Error("isColliding() requires the object to have an id");
      return !!e[r.id];
    }, isOverlapping(r) {
      if (!r.id) throw new Error("isOverlapping() requires the object to have an id");
      let o = e[r.id];
      return o && o.hasOverlap();
    }, onClick(r, o = "left") {
      let s = P.onMousePress(o, () => {
        this.isHovering() && r();
      });
      return this.onDestroy(() => s.cancel()), s;
    }, onHover(r) {
      let o = false;
      return this.onUpdate(() => {
        o ? o = this.isHovering() : this.isHovering() && (o = true, r());
      });
    }, onHoverUpdate(r) {
      return this.onUpdate(() => {
        this.isHovering() && r();
      });
    }, onHoverEnd(r) {
      let o = false;
      return this.onUpdate(() => {
        o ? this.isHovering() || (o = false, r()) : o = this.isHovering();
      });
    }, onCollide(r, o) {
      if (typeof r == "function" && o === void 0) return this.on("collide", r);
      if (typeof r == "string") return this.onCollide((s, a) => {
        s.is(r) && o?.(s, a);
      });
      throw new Error("onCollide() requires either a function or a tag");
    }, onCollideUpdate(r, o) {
      if (typeof r == "function" && o === void 0) return this.on("collideUpdate", r);
      if (typeof r == "string") return this.on("collideUpdate", (s, a) => s.is(r) && o?.(s, a));
      throw new Error("onCollideUpdate() requires either a function or a tag");
    }, onCollideEnd(r, o) {
      if (typeof r == "function" && o === void 0) return this.on("collideEnd", r);
      if (typeof r == "string") return this.on("collideEnd", (s) => s.is(r) && o?.(s));
      throw new Error("onCollideEnd() requires either a function or a tag");
    }, hasPoint(r) {
      return rt(this.worldArea(), r);
    }, resolveCollision(r) {
      let o = this.checkCollision(r);
      o && !o.resolved && (this.pos = this.pos.add(o.displacement), o.resolved = true);
    }, localArea() {
      return this.area.shape ? this.area.shape : this.renderArea();
    }, worldArea() {
      let r = this.localArea();
      if (!(r instanceof L.Polygon || r instanceof L.Rect)) throw new Error("Only support polygon and rect shapes for now");
      let o = this.transform.clone().translate(this.area.offset).scale(y(this.area.scale ?? 1));
      if (r instanceof L.Rect) {
        let s = He(this.anchor || ht).add(1, 1).scale(-0.5).scale(r.width, r.height);
        o.translate(s);
      }
      return r.transform(o);
    }, screenArea() {
      let r = this.worldArea();
      return ct(this) ? r : r.transform(w.cam.transform);
    }, inspect() {
      return this.area.scale?.x == this.area.scale?.y ? `area: ${this.area.scale?.x?.toFixed(1)}x` : `area: (${this.area.scale?.x?.toFixed(1)}x, ${this.area.scale.y?.toFixed(1)}y)`;
    } };
  }
  i(la, "area");
  function ma(t18 = {}) {
    let e = null, n = null, r = false, o = y(0), s = null, a = null, l;
    return { id: "body", require: ["pos"], vel: y(0), drag: t18.drag ?? 0, jumpForce: t18.jumpForce ?? Ei, gravityScale: t18.gravityScale ?? 1, isStatic: t18.isStatic ?? false, mass: t18.mass ?? 1, add() {
      if (s = this.pos.clone(), a = this.pos.clone(), l = this.pos.clone(), this.mass === 0) throw new Error("Can't set body mass to 0");
      this.is("area") && (this.onCollideUpdate((u, m) => {
        if (!m || !u.is("body") || m.resolved) return;
        this.trigger("beforePhysicsResolve", m);
        let c = m.reverse();
        if (u.trigger("beforePhysicsResolve", c), !(m.resolved || c.resolved) && !(this.isStatic && u.isStatic)) {
          if (!this.isStatic && !u.isStatic) {
            let p = this.mass + u.mass;
            this.pos = this.pos.add(m.displacement.scale(u.mass / p)), u.pos = u.pos.add(m.displacement.scale(-this.mass / p)), this.transform = ft(this), u.transform = ft(u);
          } else {
            let p = !this.isStatic && u.isStatic ? m : m.reverse();
            p.source.pos = p.source.pos.add(p.displacement), p.source.transform = ft(p.source);
          }
          m.resolved = true, this.trigger("physicsResolve", m), u.trigger("physicsResolve", m.reverse());
        }
      }), this.onPhysicsResolve((u) => {
        if (w.gravity) if (u.isBottom() && this.isFalling()) {
          this.vel = this.vel.reject(w.gravity.unit());
          let m = e;
          e = u.target, m != e && (n = u.target.pos), r ? r = false : m || (this.trigger("ground", e), u.target.trigger("land", this));
        } else u.isTop() && this.isJumping() && (this.vel = this.vel.reject(w.gravity.unit()), this.trigger("headbutt", u.target), u.target.trigger("headbutted", this));
      }));
    }, update() {
      e && this.isColliding(e) && e.exists() && e.is("body") && (n && !e.pos.eq(n) && t18.stickToPlatform !== false && this.moveBy(e.pos.sub(n)), n = e.pos);
      let u = L.restDt();
      u && (this.pos.x == l.x && (this.pos.x = L.lerp(s.x, a.x, u / L.fixedDt()), l.x = this.pos.x), this.pos.y == l.y && (this.pos.y = L.lerp(s.y, a.y, u / L.fixedDt()), l.y = this.pos.y));
    }, fixedUpdate() {
      if (s && (this.pos.x == l.x && (this.pos.x = s.x), this.pos.y == l.y && (this.pos.y = s.y), s = null), w.gravity && !this.isStatic) {
        r && (e = null, n = null, this.trigger("fallOff"), r = false), e && (!this.isColliding(e) || !e.exists() || !e.is("body")) && (r = true);
        let m = this.vel.clone();
        this.vel = this.vel.add(w.gravity.scale(this.gravityScale * L.dt()));
        let c = t18.maxVelocity ?? Oi;
        this.vel.slen() > c * c && (this.vel = this.vel.unit().scale(c)), m.dot(w.gravity) < 0 && this.vel.dot(w.gravity) >= 0 && this.trigger("fall");
      }
      if (this.vel.x += o.x * L.dt(), this.vel.y += o.y * L.dt(), this.vel.x *= 1 - this.drag * L.dt(), this.vel.y *= 1 - this.drag * L.dt(), this.move(this.vel), L.restDt()) {
        s = this.pos.clone();
        let m = this.vel.add(o.scale(L.dt()));
        a = this.pos.add(m.scale(L.dt())), l = this.pos.clone();
      }
      o.x = 0, o.y = 0;
    }, onPhysicsResolve(u) {
      return this.on("physicsResolve", u);
    }, onBeforePhysicsResolve(u) {
      return this.on("beforePhysicsResolve", u);
    }, curPlatform() {
      return e;
    }, isGrounded() {
      return e !== null;
    }, isFalling() {
      return this.vel.dot(L.getGravityDirection()) > 0;
    }, isJumping() {
      return this.vel.dot(L.getGravityDirection()) < 0;
    }, applyImpulse(u) {
      this.vel = this.vel.add(u);
    }, addForce(u) {
      o.x += u.x / this.mass, o.y += u.y / this.mass;
    }, jump(u) {
      e = null, n = null, this.vel = L.getGravityDirection().scale(-u || -this.jumpForce);
    }, onGround(u) {
      return this.on("ground", u);
    }, onFall(u) {
      return this.on("fall", u);
    }, onFallOff(u) {
      return this.on("fallOff", u);
    }, onHeadbutt(u) {
      return this.on("headbutt", u);
    }, onLand(u) {
      return this.on("land", u);
    }, onHeadbutted(u) {
      return this.on("headbutted", u);
    }, inspect() {
      return `gravityScale: ${this.gravityScale}x`;
    } };
  }
  i(ma, "body");
  function pa(t18 = 2) {
    let e = t18;
    return { id: "doubleJump", require: ["body"], numJumps: t18, add() {
      this.onGround(() => {
        e = this.numJumps;
      });
    }, doubleJump(n) {
      e <= 0 || (e < this.numJumps && this.trigger("doubleJump"), e--, this.jump(n));
    }, onDoubleJump(n) {
      return this.on("doubleJump", n);
    }, inspect() {
      return `jumpsLeft: ${e}`;
    } };
  }
  i(pa, "doubleJump");
  function da(t18) {
    return { id: "surfaceEffector", require: ["area"], speed: t18.speed, speedVariation: t18.speedVariation ?? 0, forceScale: t18.speedVariation ?? 0.9, add() {
      this.onCollideUpdate("body", (e, n) => {
        let r = n?.normal.normal(), o = e.vel.project(r), a = r?.scale(this.speed)?.sub(o);
        e.addForce(a?.scale(e.mass * this.forceScale));
      });
    } };
  }
  i(da, "surfaceEffector");
  function fa(t18) {
    return { id: "areaEffector", require: ["area"], useGlobalAngle: t18.useGlobalAngle || false, forceAngle: t18.forceAngle, forceMagnitude: t18.forceMagnitude, forceVariation: t18.forceVariation ?? 0, linearDrag: t18.linearDrag ?? 0, add() {
      this.onCollideUpdate("body", (e, n) => {
        let o = v.fromAngle(this.forceAngle).scale(this.forceMagnitude);
        e.addForce(o), this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag));
      });
    } };
  }
  i(fa, "areaEffector");
  function ha(t18) {
    return { id: "pointEffector", require: ["area", "pos"], forceMagnitude: t18.forceMagnitude, forceVariation: t18.forceVariation ?? 0, distanceScale: t18.distanceScale ?? 1, forceMode: t18.forceMode || "inverseLinear", linearDrag: t18.linearDrag ?? 0, add() {
      this.onCollideUpdate("body", (e, n) => {
        let r = this.pos.sub(e.pos), o = r.len(), s = o * this.distanceScale / 10, a = this.forceMode === "constant" ? 1 : this.forceMode === "inverseLinear" ? 1 / s : 1 / s ** 2, l = r.scale(this.forceMagnitude * a / o);
        e.addForce(l), this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag));
      });
    } };
  }
  i(ha, "pointEffector");
  function ga(t18) {
    return { id: "constantForce", require: ["body"], force: t18.force, update() {
      this.force && this.addForce(this.force);
    } };
  }
  i(ga, "constantForce");
  function ba(t18) {
    return { id: "buoyancyEffector", require: ["area"], surfaceLevel: t18.surfaceLevel, density: t18.density ?? 1, linearDrag: t18.linearDrag ?? 1, angularDrag: t18.angularDrag ?? 0.2, flowAngle: t18.flowAngle ?? 0, flowMagnitude: t18.flowMagnitude ?? 0, flowVariation: t18.flowVariation ?? 0, add() {
      this.onCollideUpdate("body", (e, n) => {
        let r = e, o = r.worldArea(), [s, a] = o.cut(y(-100, this.surfaceLevel), y(100, this.surfaceLevel));
        s && (this.applyBuoyancy(r, s), this.applyDrag(r, s)), this.flowMagnitude && r.addForce(v.fromAngle(this.flowAngle).scale(this.flowMagnitude));
      });
    }, applyBuoyancy(e, n) {
      let r = this.density * n.area(), o = y(0, 1).scale(-r);
      e.addForce(o);
    }, applyDrag(e, n) {
      let r = e.vel, o = this.density * this.linearDrag, s = r.scale(-o);
      e.addForce(s);
    } };
  }
  i(ba, "buoyancyEffector");
  function mn(t18) {
    if (!t18) throw new Error("Please define an anchor");
    return { id: "anchor", anchor: t18, inspect() {
      return typeof this.anchor == "string" ? "anchor: " + this.anchor : "anchor: " + this.anchor.toString();
    } };
  }
  i(mn, "anchor");
  function Xn() {
    return { id: "fixed", fixed: true };
  }
  i(Xn, "fixed");
  function ya(t18, e) {
    return { id: "follow", require: ["pos"], follow: { obj: t18, offset: e ?? y(0) }, add() {
      t18.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    }, update() {
      t18.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    } };
  }
  i(ya, "follow");
  function xa(t18) {
    let e = w.layers?.indexOf(t18);
    return { id: "layer", get layerIndex() {
      return e ?? null;
    }, get layer() {
      return e ? w.layers?.[e] ?? null : null;
    }, set layer(n) {
      if (e = w.layers?.indexOf(n), e == -1) throw Error("Invalid layer name");
    }, inspect() {
      return `layer: ${this.layer}`;
    } };
  }
  i(xa, "layer");
  function va(t18, e) {
    let n = typeof t18 == "number" ? v.fromAngle(t18) : t18.unit();
    return { id: "move", require: ["pos"], update() {
      this.move(n.scale(e));
    } };
  }
  i(va, "move");
  function wa(t18 = {}) {
    let e = t18.distance ?? Ci, n = false;
    return { id: "offscreen", require: ["pos"], isOffScreen() {
      let r = this.screenPos();
      if (!r) return false;
      let o = new te(y(0), L.width(), L.height());
      return !L.testRectPoint(o, r) && o.sdistToPoint(r) > e * e;
    }, onExitScreen(r) {
      return this.on("exitView", r);
    }, onEnterScreen(r) {
      return this.on("enterView", r);
    }, update() {
      this.isOffScreen() ? (n || (this.trigger("exitView"), n = true), t18.hide && (this.hidden = true), t18.pause && (this.paused = true), t18.destroy && this.destroy()) : (n && (this.trigger("enterView"), n = false), t18.hide && (this.hidden = false), t18.pause && (this.paused = false));
    } };
  }
  i(wa, "offscreen");
  function Rt(...t18) {
    return { id: "pos", pos: y(...t18), moveBy(...e) {
      this.pos = this.pos.add(y(...e));
    }, move(...e) {
      this.moveBy(y(...e).scale(L.dt()));
    }, moveTo(...e) {
      if (typeof e[0] == "number" && typeof e[1] == "number") return this.moveTo(y(e[0], e[1]), e[2]);
      let n = e[0], r = e[1];
      if (r === void 0) {
        this.pos = y(n);
        return;
      }
      let o = n.sub(this.pos);
      if (o.len() <= r * L.dt()) {
        this.pos = y(n);
        return;
      }
      this.move(o.unit().scale(r));
    }, worldPos(e = null) {
      return e ? (this.pos = this.pos.add(this.fromWorld(e)), null) : this.parent ? this.parent.transform.multVec2(this.pos) : this.pos;
    }, toWorld(e) {
      return this.parent ? this.parent.transform.multVec2(this.pos.add(e)) : this.pos.add(e);
    }, fromWorld(e) {
      return this.parent ? this.parent.transform.invert().multVec2(e).sub(this.pos) : e.sub(this.pos);
    }, screenPos(e = null) {
      if (e) return this.pos = this.pos.add(this.fromScreen(e)), null;
      {
        let n = this.worldPos();
        return n ? ct(this) ? n : L.toScreen(n) : null;
      }
    }, toScreen(e) {
      let n = this.toWorld(e);
      return ct(this) ? n : L.toScreen(n);
    }, fromScreen(e) {
      return ct(this) ? this.fromWorld(e) : this.fromWorld(L.toWorld(e));
    }, toOther(e, n) {
      return e.fromWorld(this.toWorld(n));
    }, fromOther(e, n) {
      return e.toOther(this, n);
    }, inspect() {
      return `pos: (${Math.round(this.pos.x)}x, ${Math.round(this.pos.y)}y)`;
    }, drawInspect() {
      L.drawCircle({ color: L.rgb(255, 0, 0), radius: 4 / Mn() });
    } };
  }
  i(Rt, "pos");
  function Ca(t18) {
    return { id: "rotate", angle: t18 ?? 0, rotateBy(e) {
      this.angle += e;
    }, rotateTo(e) {
      this.angle = e;
    }, inspect() {
      return `angle: ${Math.round(this.angle)}`;
    } };
  }
  i(Ca, "rotate");
  function Nt(...t18) {
    if (t18.length === 0) return Nt(1);
    let e = y(...t18);
    return { id: "scale", set scale(n) {
      if (!(n instanceof v)) throw Error("The scale property on scale is a vector. Use scaleTo or scaleBy to set the scale with a number.");
      e = y(n);
    }, get scale() {
      return e;
    }, scaleTo(...n) {
      e = y(...n);
    }, scaleBy(...n) {
      e = e.scale(y(...n));
    }, inspect() {
      return e.x == e.y ? `scale: ${e.x.toFixed(1)}x` : `scale: (${e.x.toFixed(1)}x, ${e.y.toFixed(1)}y)`;
    } };
  }
  i(Nt, "scale");
  function Ea(t18) {
    return { id: "z", z: t18, inspect() {
      return `z: ${this.z}`;
    } };
  }
  i(Ea, "z");
  var Oa = "data:image/png;base64,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";
  var Ta = "data:image/png;base64,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";
  var Xu = "3001.0.0";
  var L;
  var ie;
  var A;
  var w;
  var P;
  var _;
  var yt;
  var jr;
  var Z;
  var se;
  var $e;
  var ve;
  var _t;
  var Wr;
  var $r;
  var Sa = i((t18 = {}) => {
    ie = t18;
    let e = t18.root ?? document.body;
    e === document.body && (document.body.style.width = "100%", document.body.style.height = "100%", document.body.style.margin = "0px", document.documentElement.style.width = "100%", document.documentElement.style.height = "100%"), ve = t18.canvas ?? e.appendChild(document.createElement("canvas")), _t = t18.scale ?? 1;
    let n = t18.width && t18.height && !t18.stretch && !t18.letterbox;
    n ? (ve.width = t18.width * _t, ve.height = t18.height * _t) : (ve.width = ve.parentElement.offsetWidth, ve.height = ve.parentElement.offsetHeight);
    let r = ["outline: none", "cursor: default"];
    if (n) {
      let B = ve.width, K = ve.height;
      r.push(`width: ${B}px`), r.push(`height: ${K}px`);
    } else r.push("width: 100%"), r.push("height: 100%");
    t18.crisp && (r.push("image-rendering: pixelated"), r.push("image-rendering: crisp-edges")), ve.style.cssText = r.join(";"), $e = t18.pixelDensity || 1, ve.width *= $e, ve.height *= $e, ve.tabIndex = 0, yt = document.createElement("canvas"), yt.width = 256, yt.height = 256, jr = yt.getContext("2d", { willReadFrequently: true }), P = ti({ canvas: ve, touchToMouse: t18.touchToMouse, gamepads: t18.gamepads, pixelDensity: t18.pixelDensity, maxFPS: t18.maxFPS, buttons: t18.buttons });
    let o = [], s = P.canvas.getContext("webgl", { antialias: true, depth: true, stencil: true, alpha: true, preserveDrawingBuffer: true });
    if (!s) throw new Error("WebGL not supported");
    let a = s, l = zi(a, { texFilter: t18.texFilter });
    A = rs(t18, l), se = js(), _ = Gi(l), w = Us(), w.root.use(pn());
    function u(B, K) {
      let z = new at(l, B, K);
      return { clear: i(() => z.clear(), "clear"), free: i(() => z.free(), "free"), toDataURL: i(() => z.toDataURL(), "toDataURL"), toImageData: i(() => z.toImageData(), "toImageData"), width: z.width, height: z.height, draw: i((j) => {
        Oe(), z.bind(), j(), Oe(), z.unbind();
      }, "draw") };
    }
    i(u, "makeCanvas");
    function m() {
      a.clear(a.COLOR_BUFFER_BIT), A.frameBuffer.bind(), a.clear(a.COLOR_BUFFER_BIT), A.bgColor || We(() => {
        ut({ width: fe(), height: ye(), quad: new Q(0, 0, fe() / 64, ye() / 64), tex: A.bgTex, fixed: true });
      }), A.renderer.numDraws = 0, A.fixed = false, A.transformStack.length = 0, A.transform = new ge();
    }
    i(m, "frameStart");
    function c(B, K) {
      A.postShader = B, A.postShaderUniform = K ?? null;
    }
    i(c, "usePostEffect");
    function p() {
      Oe(), A.lastDrawCalls = A.renderer.numDraws, A.frameBuffer.unbind(), a.viewport(0, 0, a.drawingBufferWidth, a.drawingBufferHeight);
      let B = A.width, K = A.height;
      A.width = a.drawingBufferWidth / $e, A.height = a.drawingBufferHeight / $e, Gt({ flipY: true, tex: A.frameBuffer.tex, pos: new v(A.viewport.x, A.viewport.y), width: A.viewport.width, height: A.viewport.height, shader: A.postShader, uniform: typeof A.postShaderUniform == "function" ? A.postShaderUniform() : A.postShaderUniform, fixed: true }), Oe(), A.width = B, A.height = K;
    }
    i(p, "frameEnd");
    let f = false;
    Z = { inspect: false, timeScale: 1, showLog: true, fps: i(() => P.fps(), "fps"), numFrames: i(() => P.numFrames(), "numFrames"), stepFrame: k, drawCalls: i(() => A.lastDrawCalls, "drawCalls"), clearLog: i(() => w.logs = [], "clearLog"), log: i((...B) => {
      let K = t18.logMax ?? 8, z = B.length > 1 ? B.concat(" ").join(" ") : B[0];
      w.logs.unshift({ msg: z, time: P.time() }), w.logs.length > K && (w.logs = w.logs.slice(0, K));
    }, "log"), error: i((B) => Z.log(new Error(B.toString ? B.toString() : B)), "error"), curRecording: null, numObjects: i(() => F("*", { recursive: true }).length, "numObjects"), get paused() {
      return f;
    }, set paused(B) {
      f = B, B ? se.ctx.suspend() : se.ctx.resume();
    } };
    function x(B, K) {
      try {
        return JSON.parse(window.localStorage[B]);
      } catch {
        return K ? (g(B, K), K) : null;
      }
    }
    i(x, "getData");
    function g(B, K) {
      window.localStorage[B] = JSON.stringify(K);
    }
    i(g, "setData");
    function C(B, ...K) {
      let z = B(L), j;
      typeof z == "function" ? j = z(...K)(L) : j = z;
      for (let ue in j) L[ue] = j[ue], t18.global !== false && (window[ue] = j[ue]);
      return L;
    }
    i(C, "plug");
    function b(B) {
      let K = P.canvas.captureStream(B), z = se.ctx.createMediaStreamDestination();
      se.masterNode.connect(z);
      let j = new MediaRecorder(K), ue = [];
      return j.ondataavailable = (ee) => {
        ee.data.size > 0 && ue.push(ee.data);
      }, j.onerror = () => {
        se.masterNode.disconnect(z), K.getTracks().forEach((ee) => ee.stop());
      }, j.start(), { resume() {
        j.resume();
      }, pause() {
        j.pause();
      }, stop() {
        return j.stop(), se.masterNode.disconnect(z), K.getTracks().forEach((ee) => ee.stop()), new Promise((ee) => {
          j.onstop = () => {
            ee(new Blob(ue, { type: "video/mp4" }));
          };
        });
      }, download(ee = "kaboom.mp4") {
        this.stop().then((Ce) => wr(ee, Ce));
      } };
    }
    i(b, "record");
    function T() {
      return document.activeElement === P.canvas;
    }
    i(T, "isFocused");
    let G = w.root.add.bind(w.root), M = w.root.readd.bind(w.root), R = w.root.removeAll.bind(w.root), F = w.root.get.bind(w.root), h = w.root.wait.bind(w.root), O = w.root.loop.bind(w.root), S = w.root.query.bind(w.root), D = w.root.tween.bind(w.root);
    Wr = St(null, Ta), $r = St(null, Oa);
    function U() {
      w.root.fixedUpdate();
    }
    i(U, "fixedUpdateFrame");
    function k() {
      w.root.update();
    }
    i(k, "updateFrame");
    class N {
      static {
        i(this, "Collision");
      }
      source;
      target;
      normal;
      distance;
      resolved = false;
      constructor(K, z, j, ue, ee = false) {
        this.source = K, this.target = z, this.normal = j, this.distance = ue, this.resolved = ee;
      }
      get displacement() {
        return this.normal.scale(this.distance);
      }
      reverse() {
        return new N(this.target, this.source, this.normal.scale(-1), this.distance, this.resolved);
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.cross(w.gravity || y(0, 1)) > 0;
      }
      isRight() {
        return this.displacement.cross(w.gravity || y(0, 1)) < 0;
      }
      isTop() {
        return this.displacement.dot(w.gravity || y(0, 1)) > 0;
      }
      isBottom() {
        return this.displacement.dot(w.gravity || y(0, 1)) < 0;
      }
      preventResolution() {
        this.resolved = true;
      }
    }
    function $() {
      if (!ca()) return;
      let B = {}, K = t18.hashGridSize || 64, z = new ge(), j = [];
      function ue(ee) {
        if (j.push(z.clone()), ee.pos && z.translate(ee.pos), ee.scale && z.scale(ee.scale), ee.angle && z.rotate(ee.angle), ee.transform = z.clone(), ee.c("area") && !ee.paused) {
          let Ce = ee, lt = Ce.worldArea().bbox(), rr = Math.floor(lt.pos.x / K), or = Math.floor(lt.pos.y / K), ir = Math.ceil((lt.pos.x + lt.width) / K), sr = Math.ceil((lt.pos.y + lt.height) / K), fn = /* @__PURE__ */ new Set();
          for (let Ze = rr; Ze <= ir; Ze++) for (let mt = or; mt <= sr; mt++) if (!B[Ze]) B[Ze] = {}, B[Ze][mt] = [Ce];
          else if (!B[Ze][mt]) B[Ze][mt] = [Ce];
          else {
            let hn = B[Ze][mt];
            e: for (let ke of hn) {
              if (ke.paused || !ke.exists() || fn.has(ke.id)) continue;
              for (let tt of Ce.collisionIgnore) if (ke.is(tt)) continue e;
              for (let tt of ke.collisionIgnore) if (Ce.is(tt)) continue e;
              let qt = Io(Ce.worldArea(), ke.worldArea());
              if (qt) {
                let tt = new N(Ce, ke, qt.normal, qt.distance);
                Ce.trigger("collideUpdate", ke, tt);
                let gn = tt.reverse();
                gn.resolved = tt.resolved, ke.trigger("collideUpdate", Ce, gn);
              }
              fn.add(ke.id);
            }
            hn.push(Ce);
          }
        }
        ee.children.forEach(ue), z = j.pop();
      }
      i(ue, "checkObj"), ue(w.root);
    }
    i($, "checkFrame");
    function X(B) {
      console.error(B), se.ctx.suspend();
      let K = B.message ?? String(B) ?? "Unknown error, check console for more info";
      P.run(() => {
      }, () => {
        m(), We(() => {
          let ue = fe(), ee = ye(), Ce = { size: 36, width: ue - 32 * 2, letterSpacing: 4, lineSpacing: 4, font: Ot, fixed: true };
          Ve({ width: ue, height: ee, color: Y(0, 0, 255), fixed: true });
          let Ht = ze({ ...Ce, text: "Error", pos: y(32), color: Y(255, 128, 0), fixed: true });
          Ye(Ht), Nr({ ...Ce, text: K, pos: y(32, 32 + Ht.height + 16), fixed: true }), xe(), w.events.trigger("error", B);
        }), p();
      });
    }
    i(X, "handleErr");
    function J(B) {
      o.push(B);
    }
    i(J, "onCleanup");
    function W() {
      w.events.onOnce("frameEnd", () => {
        P.quit(), a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT | a.STENCIL_BUFFER_BIT);
        let B = a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS);
        for (let K = 0; K < B; K++) a.activeTexture(a.TEXTURE0 + K), a.bindTexture(a.TEXTURE_2D, null), a.bindTexture(a.TEXTURE_CUBE_MAP, null);
        a.bindBuffer(a.ARRAY_BUFFER, null), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null), a.bindRenderbuffer(a.RENDERBUFFER, null), a.bindFramebuffer(a.FRAMEBUFFER, null), l.destroy(), o.forEach((K) => K());
      });
    }
    i(W, "quit");
    let q = true;
    P.run(() => {
      try {
        _.loaded && (Z.paused || U(), $());
      } catch (B) {
        X(B);
      }
    }, (B, K) => {
      try {
        B(), _.loaded || Le() === 1 && !q && (_.loaded = true, w.events.trigger("load")), !_.loaded && t18.loadingScreen !== false || q ? (m(), Zi(), p()) : (Z.paused || k(), $(), m(), Ji(), t18.debug !== false && Qi(), p()), q && (q = false), w.events.trigger("frameEnd"), K();
      } catch (z) {
        X(z);
      }
    }), Hn(), tr(), L = { VERSION: Xu, loadRoot: Si, loadProgress: Le, loadSprite: St, loadSpriteAtlas: Ir, loadSound: Ni, loadMusic: Hi, loadBitmapFont: Li, loadFont: Ui, loadShader: ji, loadShaderURL: ki, loadAseprite: Bi, loadPedit: Ii, loadBean: Mi, loadJSON: Vi, load: sn, getSound: Lr, getFont: Br, getBitmapFont: Fn, getSprite: Rr, getShader: Fr, getAsset: Pi, Asset: me, SpriteData: Ie, SoundData: st, width: fe, height: ye, center: Et, dt: Se, fixedDt: ni, restDt: ri, time: P.time, screenshot: P.screenshot, record: b, isFocused: T, setCursor: P.setCursor, getCursor: P.getCursor, setCursorLocked: P.setCursorLocked, isCursorLocked: P.isCursorLocked, setFullscreen: P.setFullscreen, isFullscreen: P.isFullscreen, isTouchscreen: P.isTouchscreen, onLoad: kt, onLoading: Ds, onResize: Ms, onGamepadConnect: P.onGamepadConnect, onGamepadDisconnect: P.onGamepadDisconnect, onError: Bs, onCleanup: J, camPos: ps, camScale: ds, camFlash: hs, camRot: fs, camTransform: gs, shake: bs, toScreen: ys, toWorld: xs, setGravity: Fs, getGravity: Ls, setGravityDirection: Is, getGravityDirection: zr, setBackground: li, getBackground: mi, getGamepads: P.getGamepads, getTreeRoot: qs, add: G, make: cn, destroy: $n, destroyAll: R, get: F, query: S, readd: M, pos: Rt, scale: Nt, rotate: Ca, color: qn, opacity: zn, anchor: mn, area: la, sprite: ln, text: Xs, polygon: ls, rect: Wn, circle: os, uvquad: Qs, outline: us, particles: cs, body: ma, surfaceEffector: da, areaEffector: fa, pointEffector: ha, buoyancyEffector: ba, constantForce: ga, doubleJump: pa, shader: ms, textInput: ua, timer: pn, fixed: Xn, stay: nr, health: oa, lifespan: ia, named: sa, state: aa, z: Ea, layer: xa, move: va, offscreen: wa, follow: ya, fadeIn: ss, mask: as, drawon: is, raycast: Yn, tile: Qn, animate: ra, serializeAnimation: Zr, agent: Js, sentry: ta, patrol: ea, pathfinder: Zs, on: et, onFixedUpdate: ws, onUpdate: Cs, onDraw: Es, onAdd: qr, onDestroy: Os, onClick: Vs, onCollide: Ts, onCollideUpdate: As, onCollideEnd: Ss, onHover: Ps, onHoverUpdate: Gs, onHoverEnd: Rs, onKeyDown: P.onKeyDown, onKeyPress: P.onKeyPress, onKeyPressRepeat: P.onKeyPressRepeat, onKeyRelease: P.onKeyRelease, onMouseDown: P.onMouseDown, onMousePress: P.onMousePress, onMouseRelease: P.onMouseRelease, onMouseMove: P.onMouseMove, onCharInput: P.onCharInput, onTouchStart: P.onTouchStart, onTouchMove: P.onTouchMove, onTouchEnd: P.onTouchEnd, onScroll: P.onScroll, onHide: P.onHide, onShow: P.onShow, onGamepadButtonDown: P.onGamepadButtonDown, onGamepadButtonPress: P.onGamepadButtonPress, onGamepadButtonRelease: P.onGamepadButtonRelease, onGamepadStick: P.onGamepadStick, onButtonPress: P.onButtonPress, onButtonDown: P.onButtonDown, onButtonRelease: P.onButtonRelease, mousePos: Bn, mouseDeltaPos: P.mouseDeltaPos, isKeyDown: P.isKeyDown, isKeyPressed: P.isKeyPressed, isKeyPressedRepeat: P.isKeyPressedRepeat, isKeyReleased: P.isKeyReleased, isMouseDown: P.isMouseDown, isMousePressed: P.isMousePressed, isMouseReleased: P.isMouseReleased, isMouseMoved: P.isMouseMoved, isGamepadButtonPressed: P.isGamepadButtonPressed, isGamepadButtonDown: P.isGamepadButtonDown, isGamepadButtonReleased: P.isGamepadButtonReleased, getGamepadStick: P.getGamepadStick, isButtonPressed: P.isButtonPressed, isButtonDown: P.isButtonDown, isButtonReleased: P.isButtonReleased, setButton: P.setButton, getButton: P.getButton, pressButton: P.pressButton, releaseButton: P.releaseButton, getLastInputDeviceType: P.getLastInputDeviceType, charInputted: P.charInputted, loop: O, wait: h, play: Zn, volume: _s, burp: er, audioCtx: se.ctx, Line: Te, Rect: te, Circle: Ge, Ellipse: _e, Point: xn, Polygon: Ae, Vec2: v, Color: H, Mat4: ge, Quad: Q, RNG: Wt, rand: be, randi: pr, randSeed: mo, vec2: y, rgb: Y, hsl2rgb: uo, quad: pe, choose: ho, chooseMultiple: fo, shuffle: dr, chance: po, lerp: Ee, tween: D, easings: ot, map: Re, mapc: lo, wave: vn, deg2rad: ce, rad2deg: pt, clamp: Ue, evaluateQuadratic: Oo, evaluateQuadraticFirstDerivative: To, evaluateQuadraticSecondDerivative: Ao, evaluateBezier: Xt, evaluateBezierFirstDerivative: So, evaluateBezierSecondDerivative: Vo, evaluateCatmullRom: Po, evaluateCatmullRomFirstDerivative: Go, curveLengthApproximation: yr, normalizedCurve: Ro, hermite: Ut, cardinal: xr, catmullRom: Ft, bezier: Do, kochanekBartels: Mo, easingSteps: Lo, easingLinear: Uo, easingCubicBezier: Fo, testLineLine: wn, testRectRect: fr, testRectLine: Cn, testRectPoint: En, testCirclePolygon: $t, testLinePoint: On, testLineCircle: Bt, isConvex: jo, triangulate: An, NavMesh: Dn, drawSprite: ts, drawText: Nr, formatText: ze, drawRect: Ve, drawLine: jt, drawLines: Kt, drawTriangle: _n, drawCircle: bt, drawEllipse: In, drawUVQuad: ut, drawPolygon: qe, drawCurve: Kn, drawBezier: qi, drawFormattedText: Ye, drawMasked: es, drawSubtracted: ns, pushTransform: we, popTransform: xe, pushTranslate: re, pushScale: it, pushRotate: Je, pushMatrix: pi, usePostEffect: c, makeCanvas: u, debug: Z, scene: zs, getSceneName: $s, go: Ys, onSceneLeave: Ws, layers: Hs, addLevel: vs, getData: x, setData: g, download: Sn, downloadJSON: qo, downloadText: vr, downloadBlob: wr, plug: C, ASCII_CHARS: Un, canvas: P.canvas, addKaboom: Ns, LEFT: v.LEFT, RIGHT: v.RIGHT, UP: v.UP, DOWN: v.DOWN, RED: H.RED, GREEN: H.GREEN, BLUE: H.BLUE, YELLOW: H.YELLOW, MAGENTA: H.MAGENTA, CYAN: H.CYAN, WHITE: H.WHITE, BLACK: H.BLACK, quit: W, KEvent: le, KEventHandler: Xe, KEventController: Ne };
    let ne = t18.plugins;
    if (ne && ne.forEach(C), t18.global !== false) for (let B in L) window[B] = L[B];
    return t18.focus !== false && P.canvas.focus(), L;
  }, "kaplay");
  var e2 = Sa;

  // main.ts
  e2();
  loadRoot("https://raw.githubusercontent.com/ProbablyComputingSquid/stick-together/c8db0ddd3b6bd62da87fab9187c59bbb6d7a8220/stick-together/public/");
  loadSprite("bean", "/sprites/bean.png");
  loadSprite("bean2", "/sprites/bean2.png");
  loadSprite("coin", "/sprites/coin.png");
  loadSprite("spike", "/sprites/spike.png");
  loadSprite("grass", "/sprites/grass.png");
  loadSprite("sand", "/sprites/sand.png");
  loadSprite("snow", "/sprites/snow.png");
  loadSprite("steel", "/sprites/steel.png");
  loadSprite("ghosty", "/sprites/ghosty.png");
  loadSprite("portal", "/sprites/portal.png");
  loadSprite("button", "/sprites/button.png");
  loadSprite("buttonB", "/sprites/buttonB.png");
  loadSprite("buttonC", "/sprites/buttonC.png");
  loadSprite("buttonD", "/sprites/buttonD.png");
  loadSound("coins", "/audio/coin.mp3");
  loadSound("portal", "/audio/portal.mp3");
  loadSound("alarm", "/audio/alarm.mp3");
  setGravity(1600);
  var SPEED = 380;
  var LEVELS = [
    // test level
    [
      "   $ A B C D        ",
      "O@ ^ a b c d    >",
      "================="
    ],
    // tutorial
    [
      "=                 $                 =",
      "=@                $             >   =",
      "=O  $    $    ^^  $  ^^  $$$ ^^===^^=",
      "====================================="
    ],
    // the broken bridge
    [
      "                      $$$$       ==",
      "                 $$            > ==",
      "       =    ==   ==   =  =    =====",
      "       =                        ===",
      "   =   =                     $$$===",
      "O@        ^^^  ^^^  ^^^  ^^^ $$$===",
      "=================================="
    ],
    // the pit
    [
      "O@ $$$    A",
      "===aaa=====",
      "=  $$$    =",
      "=  $$$    =",
      "=  $$$    =",
      "=  $ $    =",
      "=  ^^^    =",
      "========  =",
      "=         =",
      "=   =======",
      "=        >=",
      "=       ===",
      "=     =   =",
      "=^^^      =",
      "==========="
    ],
    // the box
    [
      "                        $$$     A            ",
      "        aaaaa           $$$   bbbbb          ",
      "=       a   a  bb       $$$          b       ",
      "=       a > a     bbb  $$^$$            b    ",
      "=       =====          bbbbb                b",
      "=                                            ",
      "=@                                       b   ",
      "=O   ^^ $$$$$ ^^ $$ ^^                 B     ",
      "=============================================="
    ],
    // jump for it
    [
      "                                             $$$     $         ",
      "                                            =====              ",
      "                        ^   a                                  ",
      "                        =   a        =   =                  >  ",
      "O @   $   $     ^       =$$$=A               $$$    ^^^    === ",
      "===  ===  =   =====   =========    =   =    ==================="
    ],
    // the high jump
    [
      "                $B$                         ",
      "                ===                         ",
      "        a            $                      ",
      "        a          $ =             >        ",
      "       =a          =     b    b  =====   b  ",
      "        a                                   ",
      "        abbb   A  =  =            $$$  b    ",
      "O @     a^^^^^^=^^^^^=^^^^^^^^^^^ $$$ ^^^^^^",
      "============================================="
    ],
    // aMAZEng
    [
      "                               $$=                            =",
      " $    ==================     ^ $$=     ===================--===",
      "==                  $$$=   =======    ==      $     =$$$$$  $$=",
      " $    ======================     ====  =    ======  ======--===",
      "==                         =  $$$                =          a>=",
      "      ===============-     =  =================  ==============",
      "     =               -                        =               =",
      "O @            ^^^$$$-           $$       $$$^=      $ $ $ $ A=",
      "==============================================================="
    ]
  ];
  var totalCoins = 0;
  for (const level of LEVELS) {
    for (const row of level) {
      totalCoins += (row.match(/\$/g) || []).length;
    }
  }
  function restart(levelId, coins) {
    go("game", {
      levelId,
      coins
    });
  }
  scene("game", ({ levelId, coins }) => {
    let coinsCollected = 0;
    const level = addLevel(LEVELS[levelId || 0], {
      tileWidth: 64,
      tileHeight: 64,
      pos: vec2(0, 0),
      tiles: {
        "@": () => [
          sprite("bean"),
          area({ scale: 1 }),
          body({ jumpForce: 700 }),
          anchor("center"),
          pos(),
          opacity(1),
          offscreen({ hide: false, destroy: false }),
          "player",
          "player1",
          {
            locked: false,
            dead: false
          }
        ],
        "O": () => [
          sprite("bean2"),
          area({ scale: 1 }),
          body({ jumpForce: 700 }),
          anchor("center"),
          pos(),
          opacity(1),
          offscreen({ hide: false, destroy: false }),
          "player",
          "player2",
          {
            locked: false,
            dead: false
          }
        ],
        "=": () => [
          sprite("grass"),
          area(),
          body({ isStatic: true }),
          anchor("bot"),
          offscreen({ hide: true, distance: 64 })
        ],
        // secret pass-through grass
        "-": () => [
          sprite("grass"),
          area(),
          anchor("bot"),
          offscreen({ hide: true, distance: 64 })
        ],
        "$": () => [
          sprite("coin"),
          area(),
          anchor("bot"),
          "coin",
          offscreen({ hide: true, distance: 64 })
        ],
        "^": () => [
          sprite("spike"),
          area({
            scale: 0.75
          }),
          anchor("bot"),
          "danger",
          offscreen({ hide: true, distance: 64 })
        ],
        ">": () => [
          sprite("portal"),
          area(),
          anchor("bot"),
          "portal",
          offscreen({ hide: true, distance: 64 })
        ],
        "A": () => [
          sprite("button"),
          area(),
          body(),
          anchor("bot"),
          pos(),
          offscreen({ hide: true, distance: 64 }),
          "button",
          "buttonA",
          "A"
        ],
        "a": () => [
          sprite("sand"),
          area(),
          anchor("bot"),
          pos(),
          body({ isStatic: true }),
          offscreen({ hide: true, distance: 64 }),
          "door",
          "doorA",
          "A"
        ],
        "B": () => [
          sprite("buttonB"),
          area(),
          body(),
          anchor("bot"),
          pos(),
          offscreen({ hide: true, distance: 64 }),
          "button",
          "buttonB",
          "B"
        ],
        "b": () => [
          sprite("grass"),
          area(),
          anchor("bot"),
          pos(),
          body({ isStatic: true }),
          opacity(0),
          offscreen({ hide: true, distance: 64 }),
          "path",
          "pathB",
          "B"
        ],
        "C": () => [
          sprite("buttonC"),
          area(),
          body(),
          anchor("bot"),
          pos(),
          offscreen({ hide: true, distance: 64 }),
          "button",
          "buttonD",
          "D"
        ],
        "c": () => [
          sprite("snow"),
          area(),
          anchor("bot"),
          pos(),
          body({ isStatic: true }),
          offscreen({ hide: true, distance: 64 }),
          "door",
          "doorC",
          "C"
        ],
        "D": () => [
          sprite("buttonD"),
          area(),
          body(),
          anchor("bot"),
          pos(),
          offscreen({ hide: true, distance: 64 }),
          "button",
          "buttonD",
          "D"
        ],
        "d": () => [
          sprite("steel"),
          area(),
          anchor("bot"),
          pos(),
          body({ isStatic: true }),
          opacity(0),
          offscreen({ hide: true, distance: 64 }),
          "path",
          "pathD",
          "D"
        ]
      }
    });
    const player1 = level.get("player1")[0];
    const player2 = level.get("player2")[0];
    debug.log("level: " + levelId);
    onKeyPress("up", () => {
      if (player1.isGrounded() && !player1.locked) {
        player1.jump();
      }
      if (player1.locked && !player1.dead && !player2.dead) {
        player1.locked = false;
      }
    });
    onKeyDown("left", () => {
      if (!player1.locked) {
        player1.move(-SPEED, 0);
        player1.flipX = true;
      }
    });
    onKeyDown("right", () => {
      if (!player1.locked) {
        player1.move(SPEED, 0);
        player1.flipX = false;
      }
    });
    onKeyPress("w", () => {
      if (player2.isGrounded() && !player2.locked) {
        player2.jump();
      }
      if (player2.locked && !player1.dead && !player2.dead) {
        player2.locked = false;
      }
    });
    onKeyDown("a", () => {
      if (!player2.locked) {
        player2.move(-SPEED, 0);
        player2.flipX = true;
      }
    });
    onKeyDown("d", () => {
      if (!player2.locked) {
        player2.move(SPEED, 0);
        player2.flipX = false;
      }
    });
    player1.onUpdate(() => {
      if (player1.locked) {
        camPos(player2.pos);
      } else {
        camPos(player1.pos);
      }
    });
    let player2InViewport = true;
    player2.onExitScreen(() => {
      player2InViewport = false;
      debug.log("Player 2 left the screen");
      const warnText = add([
        text("Stick together!"),
        pos(center().x, center().y - 50),
        anchor("center"),
        color(RED),
        outline(4, BLACK),
        "warning",
        fixed(),
        opacity(0),
        timer(),
        scale(3)
      ]);
      const warnLoop = warnText.loop(2, async () => {
        play("alarm");
        await tween(0, 1, 1, (val) => warnText.opacity = val, easings.easeInOutCubic);
        if (player2InViewport) {
          warnLoop.cancel();
        }
      });
      wait(5, () => {
        if (!player2InViewport) {
          shake(72);
          debug.log("You couldn't stick together!");
          player1.dead = true;
          player1.locked = true;
          player2.dead = true;
          player2.locked = true;
          wait(2, () => {
            go("lose");
          });
        }
        warnLoop.cancel();
      });
    });
    player2.onEnterScreen(() => {
      player2InViewport = true;
      debug.log("Player 2 entered the screen");
      destroyAll("warning");
    });
    onCollide("player", "danger", () => {
      restart(levelId, coins);
    });
    onCollide("player", "buttonA", (player, button) => {
      destroy(button);
      level.get("doorA").forEach(destroy);
    });
    onCollide("player", "buttonB", (player, button) => {
      destroy(button);
      level.get("pathB").forEach((door) => {
        door.opacity = 1;
      });
    });
    onCollide("player", "buttonC", (player, button) => {
      destroy(button);
      level.get("doorC").forEach(destroy);
    });
    onCollide("player", "buttonD", (player, button) => {
      destroy(button);
      level.get("pathD").forEach((door) => {
        door.opacity = 1;
      });
    });
    onCollide("player", "coin", (player, coin) => {
      destroy(coin);
      play("coins");
      coinsCollected++;
      coinsLabel.text = coins + coinsCollected;
    });
    player1.onUpdate(() => {
      if (player1.pos.y >= 1e3 || player2.pos.y >= 1e3) {
        restart(levelId, coins);
      }
      if (player1.locked) {
        player1.opacity = 0;
      } else {
        player1.opacity = 1;
      }
      if (player2.locked) {
        player2.opacity = 0;
      } else {
        player2.opacity = 1;
      }
    });
    onCollide("player", "portal", (player, portal) => {
      play("portal");
      player.portal = true;
      player.locked = true;
      player.area.scale = 0.1;
      if (player1.portal && player2.portal) {
        if (levelId < LEVELS.length - 1) {
          go("game", {
            levelId: levelId + 1,
            coins: coins + coinsCollected
          });
        } else {
          go("win", { coins: coins + coinsCollected });
        }
      }
    });
    const coinsLabel = add([
      text(coins),
      outline(4, BLACK),
      pos(12),
      fixed()
    ]);
  });
  scene("lose", () => {
    add([
      text("You lost!"),
      scale(3),
      outline(12, BLACK),
      anchor("center"),
      pos(center())
    ]);
    onKeyPress(start);
  });
  scene("win", ({ coins }) => {
    add([
      text(`You won!
You grabbed ${coins} out of ${totalCoins}coins!!!`, {
        width: width()
      }),
      scale(3),
      color(BLACK),
      pos(width() / 2, height() / 2 - height() / 4),
      anchor("center")
    ]);
    onKeyPress(start);
  });
  function start() {
    go("game", {
      levelId: 0,
      coins: 0
    });
  }
  start();
})();
