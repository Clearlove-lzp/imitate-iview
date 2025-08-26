!(function e(t, o, r) {
  function s(n, a) {
    if (!o[n]) {
      if (!t[n]) {
        var u = "function" == typeof require && require;
        if (!a && u) return u(n, !0);
        if (i) return i(n, !0);
        var g = new Error("Cannot find module '" + n + "'");
        throw ((g.code = "MODULE_NOT_FOUND"), g);
      }
      var p = (o[n] = { exports: {} });
      t[n][0].call(
        p.exports,
        function (e) {
          return s(t[n][1][e] || e);
        },
        p,
        p.exports,
        e,
        t,
        o,
        r
      );
    }
    return o[n].exports;
  }
  for (
    var i = "function" == typeof require && require, n = 0;
    n < r.length;
    n++
  )
    s(r[n]);
  return s;
})(
  {
    1: [
      function (e, t, o) {
        var r = e("./uipush_pb");
        t.exports = { DataProto: r };
      },
      { "./uipush_pb": 6 },
    ],
    2: [
      function (e, t, o) {
        "use strict";
        (o.byteLength = function (e) {
          var t = u(e),
            o = t[0],
            r = t[1];
          return (3 * (o + r)) / 4 - r;
        }),
          (o.toByteArray = function (e) {
            var t,
              o,
              r = u(e),
              n = r[0],
              a = r[1],
              g = new i(
                (function (e, t, o) {
                  return (3 * (t + o)) / 4 - o;
                })(0, n, a)
              ),
              p = 0,
              l = a > 0 ? n - 4 : n;
            for (o = 0; o < l; o += 4)
              (t =
                (s[e.charCodeAt(o)] << 18) |
                (s[e.charCodeAt(o + 1)] << 12) |
                (s[e.charCodeAt(o + 2)] << 6) |
                s[e.charCodeAt(o + 3)]),
                (g[p++] = (t >> 16) & 255),
                (g[p++] = (t >> 8) & 255),
                (g[p++] = 255 & t);
            2 === a &&
              ((t = (s[e.charCodeAt(o)] << 2) | (s[e.charCodeAt(o + 1)] >> 4)),
              (g[p++] = 255 & t));
            1 === a &&
              ((t =
                (s[e.charCodeAt(o)] << 10) |
                (s[e.charCodeAt(o + 1)] << 4) |
                (s[e.charCodeAt(o + 2)] >> 2)),
              (g[p++] = (t >> 8) & 255),
              (g[p++] = 255 & t));
            return g;
          }),
          (o.fromByteArray = function (e) {
            for (
              var t,
                o = e.length,
                s = o % 3,
                i = [],
                n = 16383,
                a = 0,
                u = o - s;
              a < u;
              a += n
            )
              i.push(g(e, a, a + n > u ? u : a + n));
            1 === s
              ? ((t = e[o - 1]), i.push(r[t >> 2] + r[(t << 4) & 63] + "=="))
              : 2 === s &&
                ((t = (e[o - 2] << 8) + e[o - 1]),
                i.push(r[t >> 10] + r[(t >> 4) & 63] + r[(t << 2) & 63] + "="));
            return i.join("");
          });
        for (
          var r = [],
            s = [],
            i = "undefined" != typeof Uint8Array ? Uint8Array : Array,
            n =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            a = 0;
          a < 64;
          ++a
        )
          (r[a] = n[a]), (s[n.charCodeAt(a)] = a);
        function u(e) {
          var t = e.length;
          if (t % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
          var o = e.indexOf("=");
          return -1 === o && (o = t), [o, o === t ? 0 : 4 - (o % 4)];
        }
        function g(e, t, o) {
          for (var s, i, n = [], a = t; a < o; a += 3)
            (s =
              ((e[a] << 16) & 16711680) +
              ((e[a + 1] << 8) & 65280) +
              (255 & e[a + 2])),
              n.push(
                r[((i = s) >> 18) & 63] +
                  r[(i >> 12) & 63] +
                  r[(i >> 6) & 63] +
                  r[63 & i]
              );
          return n.join("");
        }
        (s["-".charCodeAt(0)] = 62), (s["_".charCodeAt(0)] = 63);
      },
      {},
    ],
    3: [
      function (e, t, o) {
        (function (t) {
          /*!
           * The buffer module from node.js, for the browser.
           *
           * @author   Feross Aboukhadijeh <https://feross.org>
           * @license  MIT
           */
          "use strict";
          var r = e("base64-js"),
            s = e("ieee754"),
            i =
              "function" == typeof Symbol && "function" == typeof Symbol.for
                ? Symbol.for("nodejs.util.inspect.custom")
                : null;
          (o.Buffer = t),
            (o.SlowBuffer = function (e) {
              +e != e && (e = 0);
              return t.alloc(+e);
            }),
            (o.INSPECT_MAX_BYTES = 50);
          var n = 2147483647;
          function a(e) {
            if (e > n)
              throw new RangeError(
                'The value "' + e + '" is invalid for option "size"'
              );
            var o = new Uint8Array(e);
            return Object.setPrototypeOf(o, t.prototype), o;
          }
          function t(e, t, o) {
            if ("number" == typeof e) {
              if ("string" == typeof t)
                throw new TypeError(
                  'The "string" argument must be of type string. Received type number'
                );
              return p(e);
            }
            return u(e, t, o);
          }
          function u(e, o, r) {
            if ("string" == typeof e)
              return (function (e, o) {
                ("string" == typeof o && "" !== o) || (o = "utf8");
                if (!t.isEncoding(o))
                  throw new TypeError("Unknown encoding: " + o);
                var r = 0 | c(e, o),
                  s = a(r),
                  i = s.write(e, o);
                i !== r && (s = s.slice(0, i));
                return s;
              })(e, o);
            if (ArrayBuffer.isView(e)) return l(e);
            if (null == e)
              throw new TypeError(
                "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                  typeof e
              );
            if (P(e, ArrayBuffer) || (e && P(e.buffer, ArrayBuffer)))
              return (function (e, o, r) {
                if (o < 0 || e.byteLength < o)
                  throw new RangeError('"offset" is outside of buffer bounds');
                if (e.byteLength < o + (r || 0))
                  throw new RangeError('"length" is outside of buffer bounds');
                var s;
                s =
                  void 0 === o && void 0 === r
                    ? new Uint8Array(e)
                    : void 0 === r
                    ? new Uint8Array(e, o)
                    : new Uint8Array(e, o, r);
                return Object.setPrototypeOf(s, t.prototype), s;
              })(e, o, r);
            if ("number" == typeof e)
              throw new TypeError(
                'The "value" argument must not be of type number. Received type number'
              );
            var s = e.valueOf && e.valueOf();
            if (null != s && s !== e) return t.from(s, o, r);
            var i = (function (e) {
              if (t.isBuffer(e)) {
                var o = 0 | d(e.length),
                  r = a(o);
                return 0 === r.length || e.copy(r, 0, 0, o), r;
              }
              if (void 0 !== e.length)
                return "number" != typeof e.length || W(e.length) ? a(0) : l(e);
              if ("Buffer" === e.type && Array.isArray(e.data))
                return l(e.data);
            })(e);
            if (i) return i;
            if (
              "undefined" != typeof Symbol &&
              null != Symbol.toPrimitive &&
              "function" == typeof e[Symbol.toPrimitive]
            )
              return t.from(e[Symbol.toPrimitive]("string"), o, r);
            throw new TypeError(
              "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                typeof e
            );
          }
          function g(e) {
            if ("number" != typeof e)
              throw new TypeError('"size" argument must be of type number');
            if (e < 0)
              throw new RangeError(
                'The value "' + e + '" is invalid for option "size"'
              );
          }
          function p(e) {
            return g(e), a(e < 0 ? 0 : 0 | d(e));
          }
          function l(e) {
            for (
              var t = e.length < 0 ? 0 : 0 | d(e.length), o = a(t), r = 0;
              r < t;
              r += 1
            )
              o[r] = 255 & e[r];
            return o;
          }
          function d(e) {
            if (e >= n)
              throw new RangeError(
                "Attempt to allocate Buffer larger than maximum size: 0x" +
                  n.toString(16) +
                  " bytes"
              );
            return 0 | e;
          }
          function c(e, o) {
            if (t.isBuffer(e)) return e.length;
            if (ArrayBuffer.isView(e) || P(e, ArrayBuffer)) return e.byteLength;
            if ("string" != typeof e)
              throw new TypeError(
                'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                  typeof e
              );
            var r = e.length,
              s = arguments.length > 2 && !0 === arguments[2];
            if (!s && 0 === r) return 0;
            for (var i = !1; ; )
              switch (o) {
                case "ascii":
                case "latin1":
                case "binary":
                  return r;
                case "utf8":
                case "utf-8":
                  return N(e).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return 2 * r;
                case "hex":
                  return r >>> 1;
                case "base64":
                  return G(e).length;
                default:
                  if (i) return s ? -1 : N(e).length;
                  (o = ("" + o).toLowerCase()), (i = !0);
              }
          }
          function h(e, t, o) {
            var r = !1;
            if (((void 0 === t || t < 0) && (t = 0), t > this.length))
              return "";
            if (
              ((void 0 === o || o > this.length) && (o = this.length), o <= 0)
            )
              return "";
            if ((o >>>= 0) <= (t >>>= 0)) return "";
            for (e || (e = "utf8"); ; )
              switch (e) {
                case "hex":
                  return w(this, t, o);
                case "utf8":
                case "utf-8":
                  return R(this, t, o);
                case "ascii":
                  return v(this, t, o);
                case "latin1":
                case "binary":
                  return U(this, t, o);
                case "base64":
                  return A(this, t, o);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return C(this, t, o);
                default:
                  if (r) throw new TypeError("Unknown encoding: " + e);
                  (e = (e + "").toLowerCase()), (r = !0);
              }
          }
          function f(e, t, o) {
            var r = e[t];
            (e[t] = e[o]), (e[o] = r);
          }
          function y(e, o, r, s, i) {
            if (0 === e.length) return -1;
            if (
              ("string" == typeof r
                ? ((s = r), (r = 0))
                : r > 2147483647
                ? (r = 2147483647)
                : r < -2147483648 && (r = -2147483648),
              W((r = +r)) && (r = i ? 0 : e.length - 1),
              r < 0 && (r = e.length + r),
              r >= e.length)
            ) {
              if (i) return -1;
              r = e.length - 1;
            } else if (r < 0) {
              if (!i) return -1;
              r = 0;
            }
            if (("string" == typeof o && (o = t.from(o, s)), t.isBuffer(o)))
              return 0 === o.length ? -1 : m(e, o, r, s, i);
            if ("number" == typeof o)
              return (
                (o &= 255),
                "function" == typeof Uint8Array.prototype.indexOf
                  ? i
                    ? Uint8Array.prototype.indexOf.call(e, o, r)
                    : Uint8Array.prototype.lastIndexOf.call(e, o, r)
                  : m(e, [o], r, s, i)
              );
            throw new TypeError("val must be string, number or Buffer");
          }
          function m(e, t, o, r, s) {
            var i,
              n = 1,
              a = e.length,
              u = t.length;
            if (
              void 0 !== r &&
              ("ucs2" === (r = String(r).toLowerCase()) ||
                "ucs-2" === r ||
                "utf16le" === r ||
                "utf-16le" === r)
            ) {
              if (e.length < 2 || t.length < 2) return -1;
              (n = 2), (a /= 2), (u /= 2), (o /= 2);
            }
            function g(e, t) {
              return 1 === n ? e[t] : e.readUInt16BE(t * n);
            }
            if (s) {
              var p = -1;
              for (i = o; i < a; i++)
                if (g(e, i) === g(t, -1 === p ? 0 : i - p)) {
                  if ((-1 === p && (p = i), i - p + 1 === u)) return p * n;
                } else -1 !== p && (i -= i - p), (p = -1);
            } else
              for (o + u > a && (o = a - u), i = o; i >= 0; i--) {
                for (var l = !0, d = 0; d < u; d++)
                  if (g(e, i + d) !== g(t, d)) {
                    l = !1;
                    break;
                  }
                if (l) return i;
              }
            return -1;
          }
          function S(e, t, o, r) {
            o = Number(o) || 0;
            var s = e.length - o;
            r ? (r = Number(r)) > s && (r = s) : (r = s);
            var i = t.length;
            r > i / 2 && (r = i / 2);
            for (var n = 0; n < r; ++n) {
              var a = parseInt(t.substr(2 * n, 2), 16);
              if (W(a)) return n;
              e[o + n] = a;
            }
            return n;
          }
          function b(e, t, o, r) {
            return k(N(t, e.length - o), e, o, r);
          }
          function M(e, t, o, r) {
            return k(
              (function (e) {
                for (var t = [], o = 0; o < e.length; ++o)
                  t.push(255 & e.charCodeAt(o));
                return t;
              })(t),
              e,
              o,
              r
            );
          }
          function _(e, t, o, r) {
            return M(e, t, o, r);
          }
          function E(e, t, o, r) {
            return k(G(t), e, o, r);
          }
          function T(e, t, o, r) {
            return k(
              (function (e, t) {
                for (
                  var o, r, s, i = [], n = 0;
                  n < e.length && !((t -= 2) < 0);
                  ++n
                )
                  (r = (o = e.charCodeAt(n)) >> 8),
                    (s = o % 256),
                    i.push(s),
                    i.push(r);
                return i;
              })(t, e.length - o),
              e,
              o,
              r
            );
          }
          function A(e, t, o) {
            return 0 === t && o === e.length
              ? r.fromByteArray(e)
              : r.fromByteArray(e.slice(t, o));
          }
          function R(e, t, o) {
            o = Math.min(e.length, o);
            for (var r = [], s = t; s < o; ) {
              var i,
                n,
                a,
                u,
                g = e[s],
                p = null,
                l = g > 239 ? 4 : g > 223 ? 3 : g > 191 ? 2 : 1;
              if (s + l <= o)
                switch (l) {
                  case 1:
                    g < 128 && (p = g);
                    break;
                  case 2:
                    128 == (192 & (i = e[s + 1])) &&
                      (u = ((31 & g) << 6) | (63 & i)) > 127 &&
                      (p = u);
                    break;
                  case 3:
                    (i = e[s + 1]),
                      (n = e[s + 2]),
                      128 == (192 & i) &&
                        128 == (192 & n) &&
                        (u = ((15 & g) << 12) | ((63 & i) << 6) | (63 & n)) >
                          2047 &&
                        (u < 55296 || u > 57343) &&
                        (p = u);
                    break;
                  case 4:
                    (i = e[s + 1]),
                      (n = e[s + 2]),
                      (a = e[s + 3]),
                      128 == (192 & i) &&
                        128 == (192 & n) &&
                        128 == (192 & a) &&
                        (u =
                          ((15 & g) << 18) |
                          ((63 & i) << 12) |
                          ((63 & n) << 6) |
                          (63 & a)) > 65535 &&
                        u < 1114112 &&
                        (p = u);
                }
              null === p
                ? ((p = 65533), (l = 1))
                : p > 65535 &&
                  ((p -= 65536),
                  r.push(((p >>> 10) & 1023) | 55296),
                  (p = 56320 | (1023 & p))),
                r.push(p),
                (s += l);
            }
            return (function (e) {
              var t = e.length;
              if (t <= F) return String.fromCharCode.apply(String, e);
              var o = "",
                r = 0;
              for (; r < t; )
                o += String.fromCharCode.apply(String, e.slice(r, (r += F)));
              return o;
            })(r);
          }
          (o.kMaxLength = n),
            (t.TYPED_ARRAY_SUPPORT = (function () {
              try {
                var e = new Uint8Array(1),
                  t = {
                    foo: function () {
                      return 42;
                    },
                  };
                return (
                  Object.setPrototypeOf(t, Uint8Array.prototype),
                  Object.setPrototypeOf(e, t),
                  42 === e.foo()
                );
              } catch (e) {
                return !1;
              }
            })()),
            t.TYPED_ARRAY_SUPPORT ||
              "undefined" == typeof console ||
              "function" != typeof console.error ||
              console.error(
                "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
              ),
            Object.defineProperty(t.prototype, "parent", {
              enumerable: !0,
              get: function () {
                if (t.isBuffer(this)) return this.buffer;
              },
            }),
            Object.defineProperty(t.prototype, "offset", {
              enumerable: !0,
              get: function () {
                if (t.isBuffer(this)) return this.byteOffset;
              },
            }),
            "undefined" != typeof Symbol &&
              null != Symbol.species &&
              t[Symbol.species] === t &&
              Object.defineProperty(t, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1,
              }),
            (t.poolSize = 8192),
            (t.from = function (e, t, o) {
              return u(e, t, o);
            }),
            Object.setPrototypeOf(t.prototype, Uint8Array.prototype),
            Object.setPrototypeOf(t, Uint8Array),
            (t.alloc = function (e, t, o) {
              return (function (e, t, o) {
                return (
                  g(e),
                  e <= 0
                    ? a(e)
                    : void 0 !== t
                    ? "string" == typeof o
                      ? a(e).fill(t, o)
                      : a(e).fill(t)
                    : a(e)
                );
              })(e, t, o);
            }),
            (t.allocUnsafe = function (e) {
              return p(e);
            }),
            (t.allocUnsafeSlow = function (e) {
              return p(e);
            }),
            (t.isBuffer = function (e) {
              return null != e && !0 === e._isBuffer && e !== t.prototype;
            }),
            (t.compare = function (e, o) {
              if (
                (P(e, Uint8Array) && (e = t.from(e, e.offset, e.byteLength)),
                P(o, Uint8Array) && (o = t.from(o, o.offset, o.byteLength)),
                !t.isBuffer(e) || !t.isBuffer(o))
              )
                throw new TypeError(
                  'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
                );
              if (e === o) return 0;
              for (
                var r = e.length, s = o.length, i = 0, n = Math.min(r, s);
                i < n;
                ++i
              )
                if (e[i] !== o[i]) {
                  (r = e[i]), (s = o[i]);
                  break;
                }
              return r < s ? -1 : s < r ? 1 : 0;
            }),
            (t.isEncoding = function (e) {
              switch (String(e).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return !0;
                default:
                  return !1;
              }
            }),
            (t.concat = function (e, o) {
              if (!Array.isArray(e))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              if (0 === e.length) return t.alloc(0);
              var r;
              if (void 0 === o)
                for (o = 0, r = 0; r < e.length; ++r) o += e[r].length;
              var s = t.allocUnsafe(o),
                i = 0;
              for (r = 0; r < e.length; ++r) {
                var n = e[r];
                if ((P(n, Uint8Array) && (n = t.from(n)), !t.isBuffer(n)))
                  throw new TypeError(
                    '"list" argument must be an Array of Buffers'
                  );
                n.copy(s, i), (i += n.length);
              }
              return s;
            }),
            (t.byteLength = c),
            (t.prototype._isBuffer = !0),
            (t.prototype.swap16 = function () {
              var e = this.length;
              if (e % 2 != 0)
                throw new RangeError(
                  "Buffer size must be a multiple of 16-bits"
                );
              for (var t = 0; t < e; t += 2) f(this, t, t + 1);
              return this;
            }),
            (t.prototype.swap32 = function () {
              var e = this.length;
              if (e % 4 != 0)
                throw new RangeError(
                  "Buffer size must be a multiple of 32-bits"
                );
              for (var t = 0; t < e; t += 4)
                f(this, t, t + 3), f(this, t + 1, t + 2);
              return this;
            }),
            (t.prototype.swap64 = function () {
              var e = this.length;
              if (e % 8 != 0)
                throw new RangeError(
                  "Buffer size must be a multiple of 64-bits"
                );
              for (var t = 0; t < e; t += 8)
                f(this, t, t + 7),
                  f(this, t + 1, t + 6),
                  f(this, t + 2, t + 5),
                  f(this, t + 3, t + 4);
              return this;
            }),
            (t.prototype.toString = function () {
              var e = this.length;
              return 0 === e
                ? ""
                : 0 === arguments.length
                ? R(this, 0, e)
                : h.apply(this, arguments);
            }),
            (t.prototype.toLocaleString = t.prototype.toString),
            (t.prototype.equals = function (e) {
              if (!t.isBuffer(e))
                throw new TypeError("Argument must be a Buffer");
              return this === e || 0 === t.compare(this, e);
            }),
            (t.prototype.inspect = function () {
              var e = "",
                t = o.INSPECT_MAX_BYTES;
              return (
                (e = this.toString("hex", 0, t)
                  .replace(/(.{2})/g, "$1 ")
                  .trim()),
                this.length > t && (e += " ... "),
                "<Buffer " + e + ">"
              );
            }),
            i && (t.prototype[i] = t.prototype.inspect),
            (t.prototype.compare = function (e, o, r, s, i) {
              if (
                (P(e, Uint8Array) && (e = t.from(e, e.offset, e.byteLength)),
                !t.isBuffer(e))
              )
                throw new TypeError(
                  'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                    typeof e
                );
              if (
                (void 0 === o && (o = 0),
                void 0 === r && (r = e ? e.length : 0),
                void 0 === s && (s = 0),
                void 0 === i && (i = this.length),
                o < 0 || r > e.length || s < 0 || i > this.length)
              )
                throw new RangeError("out of range index");
              if (s >= i && o >= r) return 0;
              if (s >= i) return -1;
              if (o >= r) return 1;
              if (this === e) return 0;
              for (
                var n = (i >>>= 0) - (s >>>= 0),
                  a = (r >>>= 0) - (o >>>= 0),
                  u = Math.min(n, a),
                  g = this.slice(s, i),
                  p = e.slice(o, r),
                  l = 0;
                l < u;
                ++l
              )
                if (g[l] !== p[l]) {
                  (n = g[l]), (a = p[l]);
                  break;
                }
              return n < a ? -1 : a < n ? 1 : 0;
            }),
            (t.prototype.includes = function (e, t, o) {
              return -1 !== this.indexOf(e, t, o);
            }),
            (t.prototype.indexOf = function (e, t, o) {
              return y(this, e, t, o, !0);
            }),
            (t.prototype.lastIndexOf = function (e, t, o) {
              return y(this, e, t, o, !1);
            }),
            (t.prototype.write = function (e, t, o, r) {
              if (void 0 === t) (r = "utf8"), (o = this.length), (t = 0);
              else if (void 0 === o && "string" == typeof t)
                (r = t), (o = this.length), (t = 0);
              else {
                if (!isFinite(t))
                  throw new Error(
                    "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                  );
                (t >>>= 0),
                  isFinite(o)
                    ? ((o >>>= 0), void 0 === r && (r = "utf8"))
                    : ((r = o), (o = void 0));
              }
              var s = this.length - t;
              if (
                ((void 0 === o || o > s) && (o = s),
                (e.length > 0 && (o < 0 || t < 0)) || t > this.length)
              )
                throw new RangeError("Attempt to write outside buffer bounds");
              r || (r = "utf8");
              for (var i = !1; ; )
                switch (r) {
                  case "hex":
                    return S(this, e, t, o);
                  case "utf8":
                  case "utf-8":
                    return b(this, e, t, o);
                  case "ascii":
                    return M(this, e, t, o);
                  case "latin1":
                  case "binary":
                    return _(this, e, t, o);
                  case "base64":
                    return E(this, e, t, o);
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return T(this, e, t, o);
                  default:
                    if (i) throw new TypeError("Unknown encoding: " + r);
                    (r = ("" + r).toLowerCase()), (i = !0);
                }
            }),
            (t.prototype.toJSON = function () {
              return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0),
              };
            });
          var F = 4096;
          function v(e, t, o) {
            var r = "";
            o = Math.min(e.length, o);
            for (var s = t; s < o; ++s) r += String.fromCharCode(127 & e[s]);
            return r;
          }
          function U(e, t, o) {
            var r = "";
            o = Math.min(e.length, o);
            for (var s = t; s < o; ++s) r += String.fromCharCode(e[s]);
            return r;
          }
          function w(e, t, o) {
            var r = e.length;
            (!t || t < 0) && (t = 0), (!o || o < 0 || o > r) && (o = r);
            for (var s = "", i = t; i < o; ++i) s += x[e[i]];
            return s;
          }
          function C(e, t, o) {
            for (var r = e.slice(t, o), s = "", i = 0; i < r.length; i += 2)
              s += String.fromCharCode(r[i] + 256 * r[i + 1]);
            return s;
          }
          function O(e, t, o) {
            if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
            if (e + t > o)
              throw new RangeError("Trying to access beyond buffer length");
          }
          function B(e, o, r, s, i, n) {
            if (!t.isBuffer(e))
              throw new TypeError(
                '"buffer" argument must be a Buffer instance'
              );
            if (o > i || o < n)
              throw new RangeError('"value" argument is out of bounds');
            if (r + s > e.length) throw new RangeError("Index out of range");
          }
          function I(e, t, o, r, s, i) {
            if (o + r > e.length) throw new RangeError("Index out of range");
            if (o < 0) throw new RangeError("Index out of range");
          }
          function j(e, t, o, r, i) {
            return (
              (t = +t),
              (o >>>= 0),
              i || I(e, 0, o, 4),
              s.write(e, t, o, r, 23, 4),
              o + 4
            );
          }
          function D(e, t, o, r, i) {
            return (
              (t = +t),
              (o >>>= 0),
              i || I(e, 0, o, 8),
              s.write(e, t, o, r, 52, 8),
              o + 8
            );
          }
          (t.prototype.slice = function (e, o) {
            var r = this.length;
            (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
              (o = void 0 === o ? r : ~~o) < 0
                ? (o += r) < 0 && (o = 0)
                : o > r && (o = r),
              o < e && (o = e);
            var s = this.subarray(e, o);
            return Object.setPrototypeOf(s, t.prototype), s;
          }),
            (t.prototype.readUIntLE = function (e, t, o) {
              (e >>>= 0), (t >>>= 0), o || O(e, t, this.length);
              for (var r = this[e], s = 1, i = 0; ++i < t && (s *= 256); )
                r += this[e + i] * s;
              return r;
            }),
            (t.prototype.readUIntBE = function (e, t, o) {
              (e >>>= 0), (t >>>= 0), o || O(e, t, this.length);
              for (var r = this[e + --t], s = 1; t > 0 && (s *= 256); )
                r += this[e + --t] * s;
              return r;
            }),
            (t.prototype.readUInt8 = function (e, t) {
              return (e >>>= 0), t || O(e, 1, this.length), this[e];
            }),
            (t.prototype.readUInt16LE = function (e, t) {
              return (
                (e >>>= 0),
                t || O(e, 2, this.length),
                this[e] | (this[e + 1] << 8)
              );
            }),
            (t.prototype.readUInt16BE = function (e, t) {
              return (
                (e >>>= 0),
                t || O(e, 2, this.length),
                (this[e] << 8) | this[e + 1]
              );
            }),
            (t.prototype.readUInt32LE = function (e, t) {
              return (
                (e >>>= 0),
                t || O(e, 4, this.length),
                (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                  16777216 * this[e + 3]
              );
            }),
            (t.prototype.readUInt32BE = function (e, t) {
              return (
                (e >>>= 0),
                t || O(e, 4, this.length),
                16777216 * this[e] +
                  ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
              );
            }),
            (t.prototype.readIntLE = function (e, t, o) {
              (e >>>= 0), (t >>>= 0), o || O(e, t, this.length);
              for (var r = this[e], s = 1, i = 0; ++i < t && (s *= 256); )
                r += this[e + i] * s;
              return r >= (s *= 128) && (r -= Math.pow(2, 8 * t)), r;
            }),
            (t.prototype.readIntBE = function (e, t, o) {
              (e >>>= 0), (t >>>= 0), o || O(e, t, this.length);
              for (var r = t, s = 1, i = this[e + --r]; r > 0 && (s *= 256); )
                i += this[e + --r] * s;
              return i >= (s *= 128) && (i -= Math.pow(2, 8 * t)), i;
            }),
            (t.prototype.readInt8 = function (e, t) {
              return (
                (e >>>= 0),
                t || O(e, 1, this.length),
                128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
              );
            }),
            (t.prototype.readInt16LE = function (e, t) {
              (e >>>= 0), t || O(e, 2, this.length);
              var o = this[e] | (this[e + 1] << 8);
              return 32768 & o ? 4294901760 | o : o;
            }),
            (t.prototype.readInt16BE = function (e, t) {
              (e >>>= 0), t || O(e, 2, this.length);
              var o = this[e + 1] | (this[e] << 8);
              return 32768 & o ? 4294901760 | o : o;
            }),
            (t.prototype.readInt32LE = function (e, t) {
              return (
                (e >>>= 0),
                t || O(e, 4, this.length),
                this[e] |
                  (this[e + 1] << 8) |
                  (this[e + 2] << 16) |
                  (this[e + 3] << 24)
              );
            }),
            (t.prototype.readInt32BE = function (e, t) {
              return (
                (e >>>= 0),
                t || O(e, 4, this.length),
                (this[e] << 24) |
                  (this[e + 1] << 16) |
                  (this[e + 2] << 8) |
                  this[e + 3]
              );
            }),
            (t.prototype.readFloatLE = function (e, t) {
              return (
                (e >>>= 0),
                t || O(e, 4, this.length),
                s.read(this, e, !0, 23, 4)
              );
            }),
            (t.prototype.readFloatBE = function (e, t) {
              return (
                (e >>>= 0),
                t || O(e, 4, this.length),
                s.read(this, e, !1, 23, 4)
              );
            }),
            (t.prototype.readDoubleLE = function (e, t) {
              return (
                (e >>>= 0),
                t || O(e, 8, this.length),
                s.read(this, e, !0, 52, 8)
              );
            }),
            (t.prototype.readDoubleBE = function (e, t) {
              return (
                (e >>>= 0),
                t || O(e, 8, this.length),
                s.read(this, e, !1, 52, 8)
              );
            }),
            (t.prototype.writeUIntLE = function (e, t, o, r) {
              ((e = +e), (t >>>= 0), (o >>>= 0), r) ||
                B(this, e, t, o, Math.pow(2, 8 * o) - 1, 0);
              var s = 1,
                i = 0;
              for (this[t] = 255 & e; ++i < o && (s *= 256); )
                this[t + i] = (e / s) & 255;
              return t + o;
            }),
            (t.prototype.writeUIntBE = function (e, t, o, r) {
              ((e = +e), (t >>>= 0), (o >>>= 0), r) ||
                B(this, e, t, o, Math.pow(2, 8 * o) - 1, 0);
              var s = o - 1,
                i = 1;
              for (this[t + s] = 255 & e; --s >= 0 && (i *= 256); )
                this[t + s] = (e / i) & 255;
              return t + o;
            }),
            (t.prototype.writeUInt8 = function (e, t, o) {
              return (
                (e = +e),
                (t >>>= 0),
                o || B(this, e, t, 1, 255, 0),
                (this[t] = 255 & e),
                t + 1
              );
            }),
            (t.prototype.writeUInt16LE = function (e, t, o) {
              return (
                (e = +e),
                (t >>>= 0),
                o || B(this, e, t, 2, 65535, 0),
                (this[t] = 255 & e),
                (this[t + 1] = e >>> 8),
                t + 2
              );
            }),
            (t.prototype.writeUInt16BE = function (e, t, o) {
              return (
                (e = +e),
                (t >>>= 0),
                o || B(this, e, t, 2, 65535, 0),
                (this[t] = e >>> 8),
                (this[t + 1] = 255 & e),
                t + 2
              );
            }),
            (t.prototype.writeUInt32LE = function (e, t, o) {
              return (
                (e = +e),
                (t >>>= 0),
                o || B(this, e, t, 4, 4294967295, 0),
                (this[t + 3] = e >>> 24),
                (this[t + 2] = e >>> 16),
                (this[t + 1] = e >>> 8),
                (this[t] = 255 & e),
                t + 4
              );
            }),
            (t.prototype.writeUInt32BE = function (e, t, o) {
              return (
                (e = +e),
                (t >>>= 0),
                o || B(this, e, t, 4, 4294967295, 0),
                (this[t] = e >>> 24),
                (this[t + 1] = e >>> 16),
                (this[t + 2] = e >>> 8),
                (this[t + 3] = 255 & e),
                t + 4
              );
            }),
            (t.prototype.writeIntLE = function (e, t, o, r) {
              if (((e = +e), (t >>>= 0), !r)) {
                var s = Math.pow(2, 8 * o - 1);
                B(this, e, t, o, s - 1, -s);
              }
              var i = 0,
                n = 1,
                a = 0;
              for (this[t] = 255 & e; ++i < o && (n *= 256); )
                e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1),
                  (this[t + i] = (((e / n) | 0) - a) & 255);
              return t + o;
            }),
            (t.prototype.writeIntBE = function (e, t, o, r) {
              if (((e = +e), (t >>>= 0), !r)) {
                var s = Math.pow(2, 8 * o - 1);
                B(this, e, t, o, s - 1, -s);
              }
              var i = o - 1,
                n = 1,
                a = 0;
              for (this[t + i] = 255 & e; --i >= 0 && (n *= 256); )
                e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1),
                  (this[t + i] = (((e / n) | 0) - a) & 255);
              return t + o;
            }),
            (t.prototype.writeInt8 = function (e, t, o) {
              return (
                (e = +e),
                (t >>>= 0),
                o || B(this, e, t, 1, 127, -128),
                e < 0 && (e = 255 + e + 1),
                (this[t] = 255 & e),
                t + 1
              );
            }),
            (t.prototype.writeInt16LE = function (e, t, o) {
              return (
                (e = +e),
                (t >>>= 0),
                o || B(this, e, t, 2, 32767, -32768),
                (this[t] = 255 & e),
                (this[t + 1] = e >>> 8),
                t + 2
              );
            }),
            (t.prototype.writeInt16BE = function (e, t, o) {
              return (
                (e = +e),
                (t >>>= 0),
                o || B(this, e, t, 2, 32767, -32768),
                (this[t] = e >>> 8),
                (this[t + 1] = 255 & e),
                t + 2
              );
            }),
            (t.prototype.writeInt32LE = function (e, t, o) {
              return (
                (e = +e),
                (t >>>= 0),
                o || B(this, e, t, 4, 2147483647, -2147483648),
                (this[t] = 255 & e),
                (this[t + 1] = e >>> 8),
                (this[t + 2] = e >>> 16),
                (this[t + 3] = e >>> 24),
                t + 4
              );
            }),
            (t.prototype.writeInt32BE = function (e, t, o) {
              return (
                (e = +e),
                (t >>>= 0),
                o || B(this, e, t, 4, 2147483647, -2147483648),
                e < 0 && (e = 4294967295 + e + 1),
                (this[t] = e >>> 24),
                (this[t + 1] = e >>> 16),
                (this[t + 2] = e >>> 8),
                (this[t + 3] = 255 & e),
                t + 4
              );
            }),
            (t.prototype.writeFloatLE = function (e, t, o) {
              return j(this, e, t, !0, o);
            }),
            (t.prototype.writeFloatBE = function (e, t, o) {
              return j(this, e, t, !1, o);
            }),
            (t.prototype.writeDoubleLE = function (e, t, o) {
              return D(this, e, t, !0, o);
            }),
            (t.prototype.writeDoubleBE = function (e, t, o) {
              return D(this, e, t, !1, o);
            }),
            (t.prototype.copy = function (e, o, r, s) {
              if (!t.isBuffer(e))
                throw new TypeError("argument should be a Buffer");
              if (
                (r || (r = 0),
                s || 0 === s || (s = this.length),
                o >= e.length && (o = e.length),
                o || (o = 0),
                s > 0 && s < r && (s = r),
                s === r)
              )
                return 0;
              if (0 === e.length || 0 === this.length) return 0;
              if (o < 0) throw new RangeError("targetStart out of bounds");
              if (r < 0 || r >= this.length)
                throw new RangeError("Index out of range");
              if (s < 0) throw new RangeError("sourceEnd out of bounds");
              s > this.length && (s = this.length),
                e.length - o < s - r && (s = e.length - o + r);
              var i = s - r;
              if (
                this === e &&
                "function" == typeof Uint8Array.prototype.copyWithin
              )
                this.copyWithin(o, r, s);
              else if (this === e && r < o && o < s)
                for (var n = i - 1; n >= 0; --n) e[n + o] = this[n + r];
              else Uint8Array.prototype.set.call(e, this.subarray(r, s), o);
              return i;
            }),
            (t.prototype.fill = function (e, o, r, s) {
              if ("string" == typeof e) {
                if (
                  ("string" == typeof o
                    ? ((s = o), (o = 0), (r = this.length))
                    : "string" == typeof r && ((s = r), (r = this.length)),
                  void 0 !== s && "string" != typeof s)
                )
                  throw new TypeError("encoding must be a string");
                if ("string" == typeof s && !t.isEncoding(s))
                  throw new TypeError("Unknown encoding: " + s);
                if (1 === e.length) {
                  var i = e.charCodeAt(0);
                  (("utf8" === s && i < 128) || "latin1" === s) && (e = i);
                }
              } else
                "number" == typeof e
                  ? (e &= 255)
                  : "boolean" == typeof e && (e = Number(e));
              if (o < 0 || this.length < o || this.length < r)
                throw new RangeError("Out of range index");
              if (r <= o) return this;
              var n;
              if (
                ((o >>>= 0),
                (r = void 0 === r ? this.length : r >>> 0),
                e || (e = 0),
                "number" == typeof e)
              )
                for (n = o; n < r; ++n) this[n] = e;
              else {
                var a = t.isBuffer(e) ? e : t.from(e, s),
                  u = a.length;
                if (0 === u)
                  throw new TypeError(
                    'The value "' + e + '" is invalid for argument "value"'
                  );
                for (n = 0; n < r - o; ++n) this[n + o] = a[n % u];
              }
              return this;
            });
          var L = /[^+/0-9A-Za-z-_]/g;
          function N(e, t) {
            var o;
            t = t || 1 / 0;
            for (var r = e.length, s = null, i = [], n = 0; n < r; ++n) {
              if ((o = e.charCodeAt(n)) > 55295 && o < 57344) {
                if (!s) {
                  if (o > 56319) {
                    (t -= 3) > -1 && i.push(239, 191, 189);
                    continue;
                  }
                  if (n + 1 === r) {
                    (t -= 3) > -1 && i.push(239, 191, 189);
                    continue;
                  }
                  s = o;
                  continue;
                }
                if (o < 56320) {
                  (t -= 3) > -1 && i.push(239, 191, 189), (s = o);
                  continue;
                }
                o = 65536 + (((s - 55296) << 10) | (o - 56320));
              } else s && (t -= 3) > -1 && i.push(239, 191, 189);
              if (((s = null), o < 128)) {
                if ((t -= 1) < 0) break;
                i.push(o);
              } else if (o < 2048) {
                if ((t -= 2) < 0) break;
                i.push((o >> 6) | 192, (63 & o) | 128);
              } else if (o < 65536) {
                if ((t -= 3) < 0) break;
                i.push((o >> 12) | 224, ((o >> 6) & 63) | 128, (63 & o) | 128);
              } else {
                if (!(o < 1114112)) throw new Error("Invalid code point");
                if ((t -= 4) < 0) break;
                i.push(
                  (o >> 18) | 240,
                  ((o >> 12) & 63) | 128,
                  ((o >> 6) & 63) | 128,
                  (63 & o) | 128
                );
              }
            }
            return i;
          }
          function G(e) {
            return r.toByteArray(
              (function (e) {
                if (
                  (e = (e = e.split("=")[0]).trim().replace(L, "")).length < 2
                )
                  return "";
                for (; e.length % 4 != 0; ) e += "=";
                return e;
              })(e)
            );
          }
          function k(e, t, o, r) {
            for (var s = 0; s < r && !(s + o >= t.length || s >= e.length); ++s)
              t[s + o] = e[s];
            return s;
          }
          function P(e, t) {
            return (
              e instanceof t ||
              (null != e &&
                null != e.constructor &&
                null != e.constructor.name &&
                e.constructor.name === t.name)
            );
          }
          function W(e) {
            return e != e;
          }
          var x = (function () {
            for (
              var e = "0123456789abcdef", t = new Array(256), o = 0;
              o < 16;
              ++o
            )
              for (var r = 16 * o, s = 0; s < 16; ++s) t[r + s] = e[o] + e[s];
            return t;
          })();
        }).call(this, e("buffer").Buffer);
      },
      { "base64-js": 2, buffer: 3, ieee754: 4 },
    ],
    4: [
      function (e, t, o) {
        (o.read = function (e, t, o, r, s) {
          var i,
            n,
            a = 8 * s - r - 1,
            u = (1 << a) - 1,
            g = u >> 1,
            p = -7,
            l = o ? s - 1 : 0,
            d = o ? -1 : 1,
            c = e[t + l];
          for (
            l += d, i = c & ((1 << -p) - 1), c >>= -p, p += a;
            p > 0;
            i = 256 * i + e[t + l], l += d, p -= 8
          );
          for (
            n = i & ((1 << -p) - 1), i >>= -p, p += r;
            p > 0;
            n = 256 * n + e[t + l], l += d, p -= 8
          );
          if (0 === i) i = 1 - g;
          else {
            if (i === u) return n ? NaN : (1 / 0) * (c ? -1 : 1);
            (n += Math.pow(2, r)), (i -= g);
          }
          return (c ? -1 : 1) * n * Math.pow(2, i - r);
        }),
          (o.write = function (e, t, o, r, s, i) {
            var n,
              a,
              u,
              g = 8 * i - s - 1,
              p = (1 << g) - 1,
              l = p >> 1,
              d = 23 === s ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              c = r ? 0 : i - 1,
              h = r ? 1 : -1,
              f = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
            for (
              t = Math.abs(t),
                isNaN(t) || t === 1 / 0
                  ? ((a = isNaN(t) ? 1 : 0), (n = p))
                  : ((n = Math.floor(Math.log(t) / Math.LN2)),
                    t * (u = Math.pow(2, -n)) < 1 && (n--, (u *= 2)),
                    (t += n + l >= 1 ? d / u : d * Math.pow(2, 1 - l)) * u >=
                      2 && (n++, (u /= 2)),
                    n + l >= p
                      ? ((a = 0), (n = p))
                      : n + l >= 1
                      ? ((a = (t * u - 1) * Math.pow(2, s)), (n += l))
                      : ((a = t * Math.pow(2, l - 1) * Math.pow(2, s)),
                        (n = 0)));
              s >= 8;
              e[o + c] = 255 & a, c += h, a /= 256, s -= 8
            );
            for (
              n = (n << s) | a, g += s;
              g > 0;
              e[o + c] = 255 & n, c += h, n /= 256, g -= 8
            );
            e[o + c - h] |= 128 * f;
          });
      },
      {},
    ],
    5: [
      function (require, module, exports) {
        (function (global, Buffer) {
          var $jscomp = $jscomp || {};
          ($jscomp.scope = {}),
            ($jscomp.findInternal = function (e, t, o) {
              e instanceof String && (e = String(e));
              for (var r = e.length, s = 0; s < r; s++) {
                var i = e[s];
                if (t.call(o, i, s, e)) return { i: s, v: i };
              }
              return { i: -1, v: void 0 };
            }),
            ($jscomp.ASSUME_ES5 = !1),
            ($jscomp.ASSUME_NO_NATIVE_MAP = !1),
            ($jscomp.ASSUME_NO_NATIVE_SET = !1),
            ($jscomp.SIMPLE_FROUND_POLYFILL = !1),
            ($jscomp.defineProperty =
              $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
                ? Object.defineProperty
                : function (e, t, o) {
                    e != Array.prototype &&
                      e != Object.prototype &&
                      (e[t] = o.value);
                  }),
            ($jscomp.getGlobal = function (e) {
              return "undefined" != typeof window && window === e
                ? e
                : void 0 !== global && null != global
                ? global
                : e;
            }),
            ($jscomp.global = $jscomp.getGlobal(this)),
            ($jscomp.polyfill = function (e, t, o, r) {
              if (t) {
                for (
                  o = $jscomp.global, e = e.split("."), r = 0;
                  r < e.length - 1;
                  r++
                ) {
                  var s = e[r];
                  s in o || (o[s] = {}), (o = o[s]);
                }
                (t = t((r = o[(e = e[e.length - 1])]))) != r &&
                  null != t &&
                  $jscomp.defineProperty(o, e, {
                    configurable: !0,
                    writable: !0,
                    value: t,
                  });
              }
            }),
            $jscomp.polyfill(
              "Array.prototype.findIndex",
              function (e) {
                return (
                  e ||
                  function (e, t) {
                    return $jscomp.findInternal(this, e, t).i;
                  }
                );
              },
              "es6",
              "es3"
            ),
            ($jscomp.checkStringArgs = function (e, t, o) {
              if (null == e)
                throw new TypeError(
                  "The 'this' value for String.prototype." +
                    o +
                    " must not be null or undefined"
                );
              if (t instanceof RegExp)
                throw new TypeError(
                  "First argument to String.prototype." +
                    o +
                    " must not be a regular expression"
                );
              return e + "";
            }),
            $jscomp.polyfill(
              "String.prototype.endsWith",
              function (e) {
                return (
                  e ||
                  function (e, t) {
                    var o = $jscomp.checkStringArgs(this, e, "endsWith");
                    (e += ""),
                      void 0 === t && (t = o.length),
                      (t = Math.max(0, Math.min(0 | t, o.length)));
                    for (var r = e.length; 0 < r && 0 < t; )
                      if (o[--t] != e[--r]) return !1;
                    return 0 >= r;
                  }
                );
              },
              "es6",
              "es3"
            ),
            $jscomp.polyfill(
              "Array.prototype.find",
              function (e) {
                return (
                  e ||
                  function (e, t) {
                    return $jscomp.findInternal(this, e, t).v;
                  }
                );
              },
              "es6",
              "es3"
            ),
            $jscomp.polyfill(
              "String.prototype.startsWith",
              function (e) {
                return (
                  e ||
                  function (e, t) {
                    var o = $jscomp.checkStringArgs(this, e, "startsWith");
                    e += "";
                    var r = o.length,
                      s = e.length;
                    t = Math.max(0, Math.min(0 | t, o.length));
                    for (var i = 0; i < s && t < r; )
                      if (o[t++] != e[i++]) return !1;
                    return i >= s;
                  }
                );
              },
              "es6",
              "es3"
            ),
            $jscomp.polyfill(
              "String.prototype.repeat",
              function (e) {
                return (
                  e ||
                  function (e) {
                    var t = $jscomp.checkStringArgs(this, null, "repeat");
                    if (0 > e || 1342177279 < e)
                      throw new RangeError("Invalid count value");
                    e |= 0;
                    for (var o = ""; e; )
                      1 & e && (o += t), (e >>>= 1) && (t += t);
                    return o;
                  }
                );
              },
              "es6",
              "es3"
            );
          var COMPILED = !0,
            goog = goog || {};
          (goog.global = this || self),
            (goog.isDef = function (e) {
              return void 0 !== e;
            }),
            (goog.isString = function (e) {
              return "string" == typeof e;
            }),
            (goog.isBoolean = function (e) {
              return "boolean" == typeof e;
            }),
            (goog.isNumber = function (e) {
              return "number" == typeof e;
            }),
            (goog.exportPath_ = function (e, t, o) {
              (e = e.split(".")),
                (o = o || goog.global),
                e[0] in o ||
                  void 0 === o.execScript ||
                  o.execScript("var " + e[0]);
              for (var r; e.length && (r = e.shift()); )
                !e.length && goog.isDef(t)
                  ? (o[r] = t)
                  : (o =
                      o[r] && o[r] !== Object.prototype[r]
                        ? o[r]
                        : (o[r] = {}));
            }),
            (goog.define = function (e, t) {
              if (!COMPILED) {
                var o = goog.global.CLOSURE_UNCOMPILED_DEFINES,
                  r = goog.global.CLOSURE_DEFINES;
                o &&
                void 0 === o.nodeType &&
                Object.prototype.hasOwnProperty.call(o, e)
                  ? (t = o[e])
                  : r &&
                    void 0 === r.nodeType &&
                    Object.prototype.hasOwnProperty.call(r, e) &&
                    (t = r[e]);
              }
              return t;
            }),
            (goog.FEATURESET_YEAR = 2012),
            (goog.DEBUG = !0),
            (goog.LOCALE = "en"),
            (goog.TRUSTED_SITE = !0),
            (goog.STRICT_MODE_COMPATIBLE = !1),
            (goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG),
            (goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1),
            (goog.provide = function (e) {
              if (goog.isInModuleLoader_())
                throw Error("goog.provide cannot be used within a module.");
              if (!COMPILED && goog.isProvided_(e))
                throw Error('Namespace "' + e + '" already declared.');
              goog.constructNamespace_(e);
            }),
            (goog.constructNamespace_ = function (e, t) {
              if (!COMPILED) {
                delete goog.implicitNamespaces_[e];
                for (
                  var o = e;
                  (o = o.substring(0, o.lastIndexOf("."))) &&
                  !goog.getObjectByName(o);

                )
                  goog.implicitNamespaces_[o] = !0;
              }
              goog.exportPath_(e, t);
            }),
            (goog.getScriptNonce = function (e) {
              return e && e != goog.global
                ? goog.getScriptNonce_(e.document)
                : (null === goog.cspNonce_ &&
                    (goog.cspNonce_ = goog.getScriptNonce_(
                      goog.global.document
                    )),
                  goog.cspNonce_);
            }),
            (goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/),
            (goog.cspNonce_ = null),
            (goog.getScriptNonce_ = function (e) {
              return (e =
                e.querySelector && e.querySelector("script[nonce]")) &&
                (e = e.nonce || e.getAttribute("nonce")) &&
                goog.NONCE_PATTERN_.test(e)
                ? e
                : "";
            }),
            (goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/),
            (goog.module = function (e) {
              if (
                !goog.isString(e) ||
                !e ||
                -1 == e.search(goog.VALID_MODULE_RE_)
              )
                throw Error("Invalid module identifier");
              if (!goog.isInGoogModuleLoader_())
                throw Error(
                  "Module " +
                    e +
                    " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide."
                );
              if (goog.moduleLoaderState_.moduleName)
                throw Error("goog.module may only be called once per module.");
              if (((goog.moduleLoaderState_.moduleName = e), !COMPILED)) {
                if (goog.isProvided_(e))
                  throw Error('Namespace "' + e + '" already declared.');
                delete goog.implicitNamespaces_[e];
              }
            }),
            (goog.module.get = function (e) {
              return goog.module.getInternal_(e);
            }),
            (goog.module.getInternal_ = function (e) {
              if (!COMPILED) {
                if (e in goog.loadedModules_)
                  return goog.loadedModules_[e].exports;
                if (!goog.implicitNamespaces_[e])
                  return null != (e = goog.getObjectByName(e)) ? e : null;
              }
              return null;
            }),
            (goog.ModuleType = { ES6: "es6", GOOG: "goog" }),
            (goog.moduleLoaderState_ = null),
            (goog.isInModuleLoader_ = function () {
              return (
                goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_()
              );
            }),
            (goog.isInGoogModuleLoader_ = function () {
              return (
                !!goog.moduleLoaderState_ &&
                goog.moduleLoaderState_.type == goog.ModuleType.GOOG
              );
            }),
            (goog.isInEs6ModuleLoader_ = function () {
              if (
                goog.moduleLoaderState_ &&
                goog.moduleLoaderState_.type == goog.ModuleType.ES6
              )
                return !0;
              var e = goog.global.$jscomp;
              return (
                !!e &&
                "function" == typeof e.getCurrentModulePath &&
                !!e.getCurrentModulePath()
              );
            }),
            (goog.module.declareLegacyNamespace = function () {
              if (!COMPILED && !goog.isInGoogModuleLoader_())
                throw Error(
                  "goog.module.declareLegacyNamespace must be called from within a goog.module"
                );
              if (!COMPILED && !goog.moduleLoaderState_.moduleName)
                throw Error(
                  "goog.module must be called prior to goog.module.declareLegacyNamespace."
                );
              goog.moduleLoaderState_.declareLegacyNamespace = !0;
            }),
            (goog.declareModuleId = function (e) {
              if (!COMPILED) {
                if (!goog.isInEs6ModuleLoader_())
                  throw Error(
                    "goog.declareModuleId may only be called from within an ES6 module"
                  );
                if (
                  goog.moduleLoaderState_ &&
                  goog.moduleLoaderState_.moduleName
                )
                  throw Error(
                    "goog.declareModuleId may only be called once per module."
                  );
                if (e in goog.loadedModules_)
                  throw Error(
                    'Module with namespace "' + e + '" already exists.'
                  );
              }
              if (goog.moduleLoaderState_)
                goog.moduleLoaderState_.moduleName = e;
              else {
                var t = goog.global.$jscomp;
                if (!t || "function" != typeof t.getCurrentModulePath)
                  throw Error(
                    'Module with namespace "' +
                      e +
                      '" has been loaded incorrectly.'
                  );
                (t = t.require(t.getCurrentModulePath())),
                  (goog.loadedModules_[e] = {
                    exports: t,
                    type: goog.ModuleType.ES6,
                    moduleId: e,
                  });
              }
            }),
            (goog.setTestOnly = function (e) {
              if (goog.DISALLOW_TEST_ONLY_CODE)
                throw (
                  ((e = e || ""),
                  Error(
                    "Importing test-only code into non-debug environment" +
                      (e ? ": " + e : ".")
                  ))
                );
            }),
            (goog.forwardDeclare = function (e) {}),
            COMPILED ||
              ((goog.isProvided_ = function (e) {
                return (
                  e in goog.loadedModules_ ||
                  (!goog.implicitNamespaces_[e] &&
                    goog.isDefAndNotNull(goog.getObjectByName(e)))
                );
              }),
              (goog.implicitNamespaces_ = { "goog.module": !0 })),
            (goog.getObjectByName = function (e, t) {
              (e = e.split(".")), (t = t || goog.global);
              for (var o = 0; o < e.length; o++)
                if (((t = t[e[o]]), !goog.isDefAndNotNull(t))) return null;
              return t;
            }),
            (goog.globalize = function (e, t) {
              for (var o in ((t = t || goog.global), e)) t[o] = e[o];
            }),
            (goog.addDependency = function (e, t, o, r) {
              !COMPILED &&
                goog.DEPENDENCIES_ENABLED &&
                goog.debugLoader_.addDependency(e, t, o, r);
            }),
            (goog.ENABLE_DEBUG_LOADER = !0),
            (goog.logToConsole_ = function (e) {
              goog.global.console && goog.global.console.error(e);
            }),
            (goog.require = function (e) {
              if (!COMPILED) {
                if (
                  (goog.ENABLE_DEBUG_LOADER && goog.debugLoader_.requested(e),
                  goog.isProvided_(e))
                ) {
                  if (goog.isInModuleLoader_())
                    return goog.module.getInternal_(e);
                } else if (goog.ENABLE_DEBUG_LOADER) {
                  var t = goog.moduleLoaderState_;
                  goog.moduleLoaderState_ = null;
                  try {
                    goog.debugLoader_.load_(e);
                  } finally {
                    goog.moduleLoaderState_ = t;
                  }
                }
                return null;
              }
            }),
            (goog.requireType = function (e) {
              return {};
            }),
            (goog.basePath = ""),
            (goog.nullFunction = function () {}),
            (goog.abstractMethod = function () {
              throw Error("unimplemented abstract method");
            }),
            (goog.addSingletonGetter = function (e) {
              (e.instance_ = void 0),
                (e.getInstance = function () {
                  return e.instance_
                    ? e.instance_
                    : (goog.DEBUG &&
                        (goog.instantiatedSingletons_[
                          goog.instantiatedSingletons_.length
                        ] = e),
                      (e.instance_ = new e()));
                });
            }),
            (goog.instantiatedSingletons_ = []),
            (goog.LOAD_MODULE_USING_EVAL = !0),
            (goog.SEAL_MODULE_EXPORTS = goog.DEBUG),
            (goog.loadedModules_ = {}),
            (goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER),
            (goog.TRANSPILE = "detect"),
            (goog.ASSUME_ES_MODULES_TRANSPILED = !1),
            (goog.TRANSPILE_TO_LANGUAGE = ""),
            (goog.TRANSPILER = "transpile.js"),
            (goog.hasBadLetScoping = null),
            (goog.useSafari10Workaround = function () {
              if (null == goog.hasBadLetScoping) {
                try {
                  var a = !eval(
                    '"use strict";let x = 1; function f() { return typeof x; };f() == "number";'
                  );
                } catch (e) {
                  a = !1;
                }
                goog.hasBadLetScoping = a;
              }
              return goog.hasBadLetScoping;
            }),
            (goog.workaroundSafari10EvalBug = function (e) {
              return "(function(){" + e + "\n;})();\n";
            }),
            (goog.loadModule = function (e) {
              var t = goog.moduleLoaderState_;
              try {
                if (
                  ((goog.moduleLoaderState_ = {
                    moduleName: "",
                    declareLegacyNamespace: !1,
                    type: goog.ModuleType.GOOG,
                  }),
                  goog.isFunction(e))
                )
                  var o = e.call(void 0, {});
                else {
                  if (!goog.isString(e))
                    throw Error("Invalid module definition");
                  goog.useSafari10Workaround() &&
                    (e = goog.workaroundSafari10EvalBug(e)),
                    (o = goog.loadModuleFromSource_.call(void 0, e));
                }
                var r = goog.moduleLoaderState_.moduleName;
                if (!goog.isString(r) || !r)
                  throw Error('Invalid module name "' + r + '"');
                goog.moduleLoaderState_.declareLegacyNamespace
                  ? goog.constructNamespace_(r, o)
                  : goog.SEAL_MODULE_EXPORTS &&
                    Object.seal &&
                    "object" == typeof o &&
                    null != o &&
                    Object.seal(o),
                  (goog.loadedModules_[r] = {
                    exports: o,
                    type: goog.ModuleType.GOOG,
                    moduleId: goog.moduleLoaderState_.moduleName,
                  });
              } finally {
                goog.moduleLoaderState_ = t;
              }
            }),
            (goog.loadModuleFromSource_ = function (a) {
              return eval(a), {};
            }),
            (goog.normalizePath_ = function (e) {
              e = e.split("/");
              for (var t = 0; t < e.length; )
                "." == e[t]
                  ? e.splice(t, 1)
                  : t && ".." == e[t] && e[t - 1] && ".." != e[t - 1]
                  ? e.splice(--t, 2)
                  : t++;
              return e.join("/");
            }),
            (goog.loadFileSync_ = function (e) {
              if (goog.global.CLOSURE_LOAD_FILE_SYNC)
                return goog.global.CLOSURE_LOAD_FILE_SYNC(e);
              try {
                var t = new goog.global.XMLHttpRequest();
                return (
                  t.open("get", e, !1),
                  t.send(),
                  0 == t.status || 200 == t.status ? t.responseText : null
                );
              } catch (e) {
                return null;
              }
            }),
            (goog.transpile_ = function (e, t, o) {
              var r = goog.global.$jscomp;
              r || (goog.global.$jscomp = r = {});
              var s = r.transpile;
              if (!s) {
                var i = goog.basePath + goog.TRANSPILER,
                  n = goog.loadFileSync_(i);
                if (n) {
                  if (
                    (function () {
                      (0, eval)(n + "\n//# sourceURL=" + i);
                    }.call(goog.global),
                    goog.global.$gwtExport &&
                      goog.global.$gwtExport.$jscomp &&
                      !goog.global.$gwtExport.$jscomp.transpile)
                  )
                    throw Error(
                      'The transpiler did not properly export the "transpile" method. $gwtExport: ' +
                        JSON.stringify(goog.global.$gwtExport)
                    );
                  (goog.global.$jscomp.transpile =
                    goog.global.$gwtExport.$jscomp.transpile),
                    (s = (r = goog.global.$jscomp).transpile);
                }
              }
              return (
                s ||
                  (s = r.transpile =
                    function (e, t) {
                      return (
                        goog.logToConsole_(
                          t +
                            " requires transpilation but no transpiler was found."
                        ),
                        e
                      );
                    }),
                s(e, t, o)
              );
            }),
            (goog.typeOf = function (e) {
              var t = typeof e;
              if ("object" == t) {
                if (!e) return "null";
                if (e instanceof Array) return "array";
                if (e instanceof Object) return t;
                var o = Object.prototype.toString.call(e);
                if ("[object Window]" == o) return "object";
                if (
                  "[object Array]" == o ||
                  ("number" == typeof e.length &&
                    void 0 !== e.splice &&
                    void 0 !== e.propertyIsEnumerable &&
                    !e.propertyIsEnumerable("splice"))
                )
                  return "array";
                if (
                  "[object Function]" == o ||
                  (void 0 !== e.call &&
                    void 0 !== e.propertyIsEnumerable &&
                    !e.propertyIsEnumerable("call"))
                )
                  return "function";
              } else if ("function" == t && void 0 === e.call) return "object";
              return t;
            }),
            (goog.isNull = function (e) {
              return null === e;
            }),
            (goog.isDefAndNotNull = function (e) {
              return null != e;
            }),
            (goog.isArray = function (e) {
              return "array" == goog.typeOf(e);
            }),
            (goog.isArrayLike = function (e) {
              var t = goog.typeOf(e);
              return (
                "array" == t || ("object" == t && "number" == typeof e.length)
              );
            }),
            (goog.isDateLike = function (e) {
              return goog.isObject(e) && "function" == typeof e.getFullYear;
            }),
            (goog.isFunction = function (e) {
              return "function" == goog.typeOf(e);
            }),
            (goog.isObject = function (e) {
              var t = typeof e;
              return ("object" == t && null != e) || "function" == t;
            }),
            (goog.getUid = function (e) {
              return (
                e[goog.UID_PROPERTY_] ||
                (e[goog.UID_PROPERTY_] = ++goog.uidCounter_)
              );
            }),
            (goog.hasUid = function (e) {
              return !!e[goog.UID_PROPERTY_];
            }),
            (goog.removeUid = function (e) {
              null !== e &&
                "removeAttribute" in e &&
                e.removeAttribute(goog.UID_PROPERTY_);
              try {
                delete e[goog.UID_PROPERTY_];
              } catch (e) {}
            }),
            (goog.UID_PROPERTY_ =
              "closure_uid_" + ((1e9 * Math.random()) >>> 0)),
            (goog.uidCounter_ = 0),
            (goog.getHashCode = goog.getUid),
            (goog.removeHashCode = goog.removeUid),
            (goog.cloneObject = function (e) {
              var t = goog.typeOf(e);
              if ("object" == t || "array" == t) {
                if ("function" == typeof e.clone) return e.clone();
                for (var o in ((t = "array" == t ? [] : {}), e))
                  t[o] = goog.cloneObject(e[o]);
                return t;
              }
              return e;
            }),
            (goog.bindNative_ = function (e, t, o) {
              return e.call.apply(e.bind, arguments);
            }),
            (goog.bindJs_ = function (e, t, o) {
              if (!e) throw Error();
              if (2 < arguments.length) {
                var r = Array.prototype.slice.call(arguments, 2);
                return function () {
                  var o = Array.prototype.slice.call(arguments);
                  return Array.prototype.unshift.apply(o, r), e.apply(t, o);
                };
              }
              return function () {
                return e.apply(t, arguments);
              };
            }),
            (goog.bind = function (e, t, o) {
              return (
                Function.prototype.bind &&
                -1 != Function.prototype.bind.toString().indexOf("native code")
                  ? (goog.bind = goog.bindNative_)
                  : (goog.bind = goog.bindJs_),
                goog.bind.apply(null, arguments)
              );
            }),
            (goog.partial = function (e, t) {
              var o = Array.prototype.slice.call(arguments, 1);
              return function () {
                var t = o.slice();
                return t.push.apply(t, arguments), e.apply(this, t);
              };
            }),
            (goog.mixin = function (e, t) {
              for (var o in t) e[o] = t[o];
            }),
            (goog.now =
              (goog.TRUSTED_SITE && Date.now) ||
              function () {
                return +new Date();
              }),
            (goog.globalEval = function (e) {
              if (goog.global.execScript)
                goog.global.execScript(e, "JavaScript");
              else {
                if (!goog.global.eval)
                  throw Error("goog.globalEval not available");
                if (null == goog.evalWorksForGlobals_) {
                  try {
                    goog.global.eval("var _evalTest_ = 1;");
                  } catch (e) {}
                  if (void 0 !== goog.global._evalTest_) {
                    try {
                      delete goog.global._evalTest_;
                    } catch (e) {}
                    goog.evalWorksForGlobals_ = !0;
                  } else goog.evalWorksForGlobals_ = !1;
                }
                if (goog.evalWorksForGlobals_) goog.global.eval(e);
                else {
                  var t = goog.global.document,
                    o = t.createElement("SCRIPT");
                  (o.type = "text/javascript"),
                    (o.defer = !1),
                    o.appendChild(t.createTextNode(e)),
                    t.head.appendChild(o),
                    t.head.removeChild(o);
                }
              }
            }),
            (goog.evalWorksForGlobals_ = null),
            (goog.getCssName = function (e, t) {
              if ("." == String(e).charAt(0))
                throw Error(
                  'className passed in goog.getCssName must not start with ".". You passed: ' +
                    e
                );
              var o = function (e) {
                  return goog.cssNameMapping_[e] || e;
                },
                r = function (e) {
                  e = e.split("-");
                  for (var t = [], r = 0; r < e.length; r++) t.push(o(e[r]));
                  return t.join("-");
                };
              return (
                (r = goog.cssNameMapping_
                  ? "BY_WHOLE" == goog.cssNameMappingStyle_
                    ? o
                    : r
                  : function (e) {
                      return e;
                    }),
                (e = t ? e + "-" + r(t) : r(e)),
                goog.global.CLOSURE_CSS_NAME_MAP_FN
                  ? goog.global.CLOSURE_CSS_NAME_MAP_FN(e)
                  : e
              );
            }),
            (goog.setCssNameMapping = function (e, t) {
              (goog.cssNameMapping_ = e), (goog.cssNameMappingStyle_ = t);
            }),
            !COMPILED &&
              goog.global.CLOSURE_CSS_NAME_MAPPING &&
              (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING),
            (goog.getMsg = function (e, t, o) {
              return (
                o && o.html && (e = e.replace(/</g, "&lt;")),
                t &&
                  (e = e.replace(/\{\$([^}]+)}/g, function (e, o) {
                    return null != t && o in t ? t[o] : e;
                  })),
                e
              );
            }),
            (goog.getMsgWithFallback = function (e, t) {
              return e;
            }),
            (goog.exportSymbol = function (e, t, o) {
              goog.exportPath_(e, t, o);
            }),
            (goog.exportProperty = function (e, t, o) {
              e[t] = o;
            }),
            (goog.inherits = function (e, t) {
              function o() {}
              (o.prototype = t.prototype),
                (e.superClass_ = t.prototype),
                (e.prototype = new o()),
                (e.prototype.constructor = e),
                (e.base = function (e, o, r) {
                  for (
                    var s = Array(arguments.length - 2), i = 2;
                    i < arguments.length;
                    i++
                  )
                    s[i - 2] = arguments[i];
                  return t.prototype[o].apply(e, s);
                });
            }),
            (goog.base = function (e, t, o) {
              var r = arguments.callee.caller;
              if (goog.STRICT_MODE_COMPATIBLE || (goog.DEBUG && !r))
                throw Error(
                  "arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C"
                );
              if (void 0 !== r.superClass_) {
                for (
                  var s = Array(arguments.length - 1), i = 1;
                  i < arguments.length;
                  i++
                )
                  s[i - 1] = arguments[i];
                return r.superClass_.constructor.apply(e, s);
              }
              if ("string" != typeof t && "symbol" != typeof t)
                throw Error(
                  "method names provided to goog.base must be a string or a symbol"
                );
              for (
                s = Array(arguments.length - 2), i = 2;
                i < arguments.length;
                i++
              )
                s[i - 2] = arguments[i];
              i = !1;
              for (
                var n = e.constructor.prototype;
                n;
                n = Object.getPrototypeOf(n)
              )
                if (n[t] === r) i = !0;
                else if (i) return n[t].apply(e, s);
              if (e[t] === r) return e.constructor.prototype[t].apply(e, s);
              throw Error(
                "goog.base called from a method of one name to a method of a different name"
              );
            }),
            (goog.scope = function (e) {
              if (goog.isInModuleLoader_())
                throw Error("goog.scope is not supported within a module.");
              e.call(goog.global);
            }),
            COMPILED || (goog.global.COMPILED = COMPILED),
            (goog.defineClass = function (e, t) {
              var o = t.constructor,
                r = t.statics;
              return (
                (o && o != Object.prototype.constructor) ||
                  (o = function () {
                    throw Error(
                      "cannot instantiate an interface (no constructor defined)."
                    );
                  }),
                (o = goog.defineClass.createSealingConstructor_(o, e)),
                e && goog.inherits(o, e),
                delete t.constructor,
                delete t.statics,
                goog.defineClass.applyProperties_(o.prototype, t),
                null != r &&
                  (r instanceof Function
                    ? r(o)
                    : goog.defineClass.applyProperties_(o, r)),
                o
              );
            }),
            (goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG),
            (goog.defineClass.createSealingConstructor_ = function (e, t) {
              if (!goog.defineClass.SEAL_CLASS_INSTANCES) return e;
              var o = !goog.defineClass.isUnsealable_(t),
                r = function () {
                  var t = e.apply(this, arguments) || this;
                  return (
                    (t[goog.UID_PROPERTY_] = t[goog.UID_PROPERTY_]),
                    this.constructor === r &&
                      o &&
                      Object.seal instanceof Function &&
                      Object.seal(t),
                    t
                  );
                };
              return r;
            }),
            (goog.defineClass.isUnsealable_ = function (e) {
              return (
                e &&
                e.prototype &&
                e.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]
              );
            }),
            (goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ =
              "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
                " "
              )),
            (goog.defineClass.applyProperties_ = function (e, t) {
              for (var o in t)
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
              for (
                var r = 0;
                r < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;
                r++
              )
                (o = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[r]),
                  Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            }),
            (goog.tagUnsealableClass = function (e) {
              !COMPILED &&
                goog.defineClass.SEAL_CLASS_INSTANCES &&
                (e.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0);
            }),
            (goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ =
              "goog_defineClass_legacy_unsealable"),
            !COMPILED &&
              goog.DEPENDENCIES_ENABLED &&
              ((goog.inHtmlDocument_ = function () {
                var e = goog.global.document;
                return null != e && "write" in e;
              }),
              (goog.isDocumentLoading_ = function () {
                var e = goog.global.document;
                return e.attachEvent
                  ? "complete" != e.readyState
                  : "loading" == e.readyState;
              }),
              (goog.findBasePath_ = function () {
                if (
                  goog.isDef(goog.global.CLOSURE_BASE_PATH) &&
                  goog.isString(goog.global.CLOSURE_BASE_PATH)
                )
                  goog.basePath = goog.global.CLOSURE_BASE_PATH;
                else if (goog.inHtmlDocument_()) {
                  var e = goog.global.document,
                    t = e.currentScript;
                  for (
                    t =
                      (e = t ? [t] : e.getElementsByTagName("SCRIPT")).length -
                      1;
                    0 <= t;
                    --t
                  ) {
                    var o = e[t].src,
                      r = o.lastIndexOf("?");
                    if (
                      ((r = -1 == r ? o.length : r),
                      "base.js" == o.substr(r - 7, 7))
                    ) {
                      goog.basePath = o.substr(0, r - 7);
                      break;
                    }
                  }
                }
              }),
              goog.findBasePath_(),
              (goog.Transpiler = function () {
                (this.requiresTranspilation_ = null),
                  (this.transpilationTarget_ = goog.TRANSPILE_TO_LANGUAGE);
              }),
              (goog.Transpiler.prototype.createRequiresTranspilation_ =
                function () {
                  function a(t, o) {
                    e
                      ? (d[t] = !0)
                      : o()
                      ? ((c = t), (d[t] = !1))
                      : (e = d[t] = !0);
                  }
                  function b(a) {
                    try {
                      return !!eval(a);
                    } catch (e) {
                      return !1;
                    }
                  }
                  var c = "es3",
                    d = { es3: !1 },
                    e = !1,
                    f =
                      goog.global.navigator && goog.global.navigator.userAgent
                        ? goog.global.navigator.userAgent
                        : "";
                  return (
                    a("es5", function () {
                      return b("[1,].length==1");
                    }),
                    a("es6", function () {
                      return (
                        !f.match(/Edge\/(\d+)(\.\d)*/i) &&
                        b(
                          '(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()'
                        )
                      );
                    }),
                    a("es7", function () {
                      return b("2 ** 2 == 4");
                    }),
                    a("es8", function () {
                      return b("async () => 1, true");
                    }),
                    a("es9", function () {
                      return b("({...rest} = {}), true");
                    }),
                    a("es_next", function () {
                      return !1;
                    }),
                    { target: c, map: d }
                  );
                }),
              (goog.Transpiler.prototype.needsTranspile = function (e, t) {
                if ("always" == goog.TRANSPILE) return !0;
                if ("never" == goog.TRANSPILE) return !1;
                if (!this.requiresTranspilation_) {
                  var o = this.createRequiresTranspilation_();
                  (this.requiresTranspilation_ = o.map),
                    (this.transpilationTarget_ =
                      this.transpilationTarget_ || o.target);
                }
                if (e in this.requiresTranspilation_)
                  return (
                    !!this.requiresTranspilation_[e] ||
                    !(
                      !goog.inHtmlDocument_() ||
                      "es6" != t ||
                      "noModule" in goog.global.document.createElement("script")
                    )
                  );
                throw Error("Unknown language mode: " + e);
              }),
              (goog.Transpiler.prototype.transpile = function (e, t) {
                return goog.transpile_(e, t, this.transpilationTarget_);
              }),
              (goog.transpiler_ = new goog.Transpiler()),
              (goog.protectScriptTag_ = function (e) {
                return e.replace(/<\/(SCRIPT)/gi, "\\x3c/$1");
              }),
              (goog.DebugLoader_ = function () {
                (this.dependencies_ = {}),
                  (this.idToPath_ = {}),
                  (this.written_ = {}),
                  (this.loadingDeps_ = []),
                  (this.depsToLoad_ = []),
                  (this.paused_ = !1),
                  (this.factory_ = new goog.DependencyFactory(
                    goog.transpiler_
                  )),
                  (this.deferredCallbacks_ = {}),
                  (this.deferredQueue_ = []);
              }),
              (goog.DebugLoader_.prototype.bootstrap = function (e, t) {
                function o() {
                  r && (goog.global.setTimeout(r, 0), (r = null));
                }
                var r = t;
                if (e.length) {
                  t = [];
                  for (var s = 0; s < e.length; s++) {
                    var i = this.getPathFromDeps_(e[s]);
                    if (!i) throw Error("Unregonized namespace: " + e[s]);
                    t.push(this.dependencies_[i]);
                  }
                  i = goog.require;
                  var n = 0;
                  for (s = 0; s < e.length; s++)
                    i(e[s]),
                      t[s].onLoad(function () {
                        ++n == e.length && o();
                      });
                } else o();
              }),
              (goog.DebugLoader_.prototype.loadClosureDeps = function () {
                this.depsToLoad_.push(
                  this.factory_.createDependency(
                    goog.normalizePath_(goog.basePath + "deps.js"),
                    "deps.js",
                    [],
                    [],
                    {},
                    !1
                  )
                ),
                  this.loadDeps_();
              }),
              (goog.DebugLoader_.prototype.requested = function (e, t) {
                (e = this.getPathFromDeps_(e)) &&
                  (t || this.areDepsLoaded_(this.dependencies_[e].requires)) &&
                  (t = this.deferredCallbacks_[e]) &&
                  (delete this.deferredCallbacks_[e], t());
              }),
              (goog.DebugLoader_.prototype.setDependencyFactory = function (e) {
                this.factory_ = e;
              }),
              (goog.DebugLoader_.prototype.load_ = function (e) {
                if (!this.getPathFromDeps_(e))
                  throw (
                    ((e = "goog.require could not find: " + e),
                    goog.logToConsole_(e),
                    Error(e))
                  );
                var t = this,
                  o = [],
                  r = function (e) {
                    var s = t.getPathFromDeps_(e);
                    if (!s) throw Error("Bad dependency path or symbol: " + e);
                    if (!t.written_[s]) {
                      for (
                        t.written_[s] = !0, e = t.dependencies_[s], s = 0;
                        s < e.requires.length;
                        s++
                      )
                        goog.isProvided_(e.requires[s]) || r(e.requires[s]);
                      o.push(e);
                    }
                  };
                r(e),
                  (e = !!this.depsToLoad_.length),
                  (this.depsToLoad_ = this.depsToLoad_.concat(o)),
                  this.paused_ || e || this.loadDeps_();
              }),
              (goog.DebugLoader_.prototype.loadDeps_ = function () {
                for (
                  var e = this, t = this.paused_;
                  this.depsToLoad_.length && !t;

                )
                  !(function () {
                    var o = !1,
                      r = e.depsToLoad_.shift(),
                      s = !1;
                    e.loading_(r);
                    var i = {
                      pause: function () {
                        if (o)
                          throw Error(
                            "Cannot call pause after the call to load."
                          );
                        t = !0;
                      },
                      resume: function () {
                        o ? e.resume_() : (t = !1);
                      },
                      loaded: function () {
                        if (s) throw Error("Double call to loaded.");
                        (s = !0), e.loaded_(r);
                      },
                      pending: function () {
                        for (var t = [], o = 0; o < e.loadingDeps_.length; o++)
                          t.push(e.loadingDeps_[o]);
                        return t;
                      },
                      setModuleState: function (e) {
                        goog.moduleLoaderState_ = {
                          type: e,
                          moduleName: "",
                          declareLegacyNamespace: !1,
                        };
                      },
                      registerEs6ModuleExports: function (e, t, o) {
                        o &&
                          (goog.loadedModules_[o] = {
                            exports: t,
                            type: goog.ModuleType.ES6,
                            moduleId: o || "",
                          });
                      },
                      registerGoogModuleExports: function (e, t) {
                        goog.loadedModules_[e] = {
                          exports: t,
                          type: goog.ModuleType.GOOG,
                          moduleId: e,
                        };
                      },
                      clearModuleState: function () {
                        goog.moduleLoaderState_ = null;
                      },
                      defer: function (t) {
                        if (o)
                          throw Error(
                            "Cannot register with defer after the call to load."
                          );
                        e.defer_(r, t);
                      },
                      areDepsLoaded: function () {
                        return e.areDepsLoaded_(r.requires);
                      },
                    };
                    try {
                      r.load(i);
                    } finally {
                      o = !0;
                    }
                  })();
                t && this.pause_();
              }),
              (goog.DebugLoader_.prototype.pause_ = function () {
                this.paused_ = !0;
              }),
              (goog.DebugLoader_.prototype.resume_ = function () {
                this.paused_ && ((this.paused_ = !1), this.loadDeps_());
              }),
              (goog.DebugLoader_.prototype.loading_ = function (e) {
                this.loadingDeps_.push(e);
              }),
              (goog.DebugLoader_.prototype.loaded_ = function (e) {
                for (var t = 0; t < this.loadingDeps_.length; t++)
                  if (this.loadingDeps_[t] == e) {
                    this.loadingDeps_.splice(t, 1);
                    break;
                  }
                for (t = 0; t < this.deferredQueue_.length; t++)
                  if (this.deferredQueue_[t] == e.path) {
                    this.deferredQueue_.splice(t, 1);
                    break;
                  }
                if (
                  this.loadingDeps_.length == this.deferredQueue_.length &&
                  !this.depsToLoad_.length
                )
                  for (; this.deferredQueue_.length; )
                    this.requested(this.deferredQueue_.shift(), !0);
                e.loaded();
              }),
              (goog.DebugLoader_.prototype.areDepsLoaded_ = function (e) {
                for (var t = 0; t < e.length; t++) {
                  var o = this.getPathFromDeps_(e[t]);
                  if (
                    !o ||
                    (!(o in this.deferredCallbacks_) && !goog.isProvided_(e[t]))
                  )
                    return !1;
                }
                return !0;
              }),
              (goog.DebugLoader_.prototype.getPathFromDeps_ = function (e) {
                return e in this.idToPath_
                  ? this.idToPath_[e]
                  : e in this.dependencies_
                  ? e
                  : null;
              }),
              (goog.DebugLoader_.prototype.defer_ = function (e, t) {
                (this.deferredCallbacks_[e.path] = t),
                  this.deferredQueue_.push(e.path);
              }),
              (goog.LoadController = function () {}),
              (goog.LoadController.prototype.pause = function () {}),
              (goog.LoadController.prototype.resume = function () {}),
              (goog.LoadController.prototype.loaded = function () {}),
              (goog.LoadController.prototype.pending = function () {}),
              (goog.LoadController.prototype.registerEs6ModuleExports =
                function (e, t, o) {}),
              (goog.LoadController.prototype.setModuleState = function (e) {}),
              (goog.LoadController.prototype.clearModuleState = function () {}),
              (goog.LoadController.prototype.defer = function (e) {}),
              (goog.LoadController.prototype.areDepsLoaded = function () {}),
              (goog.Dependency = function (e, t, o, r, s) {
                (this.path = e),
                  (this.relativePath = t),
                  (this.provides = o),
                  (this.requires = r),
                  (this.loadFlags = s),
                  (this.loaded_ = !1),
                  (this.loadCallbacks_ = []);
              }),
              (goog.Dependency.prototype.getPathName = function () {
                var e = this.path,
                  t = e.indexOf("://");
                return (
                  0 <= t &&
                    0 <= (t = (e = e.substring(t + 3)).indexOf("/")) &&
                    (e = e.substring(t + 1)),
                  e
                );
              }),
              (goog.Dependency.prototype.onLoad = function (e) {
                this.loaded_ ? e() : this.loadCallbacks_.push(e);
              }),
              (goog.Dependency.prototype.loaded = function () {
                this.loaded_ = !0;
                var e = this.loadCallbacks_;
                this.loadCallbacks_ = [];
                for (var t = 0; t < e.length; t++) e[t]();
              }),
              (goog.Dependency.defer_ = !1),
              (goog.Dependency.callbackMap_ = {}),
              (goog.Dependency.registerCallback_ = function (e) {
                var t = Math.random().toString(32);
                return (goog.Dependency.callbackMap_[t] = e), t;
              }),
              (goog.Dependency.unregisterCallback_ = function (e) {
                delete goog.Dependency.callbackMap_[e];
              }),
              (goog.Dependency.callback_ = function (e, t) {
                if (!(e in goog.Dependency.callbackMap_))
                  throw Error(
                    "Callback key " +
                      e +
                      " does not exist (was base.js loaded more than once?)."
                  );
                for (
                  var o = goog.Dependency.callbackMap_[e], r = [], s = 1;
                  s < arguments.length;
                  s++
                )
                  r.push(arguments[s]);
                o.apply(void 0, r);
              }),
              (goog.Dependency.prototype.load = function (e) {
                if (goog.global.CLOSURE_IMPORT_SCRIPT)
                  goog.global.CLOSURE_IMPORT_SCRIPT(this.path)
                    ? e.loaded()
                    : e.pause();
                else if (goog.inHtmlDocument_()) {
                  var t = goog.global.document;
                  if (
                    "complete" == t.readyState &&
                    !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING
                  ) {
                    if (/\bdeps.js$/.test(this.path)) return void e.loaded();
                    throw Error(
                      'Cannot write "' + this.path + '" after document load'
                    );
                  }
                  if (
                    !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING &&
                    goog.isDocumentLoading_()
                  ) {
                    var o = goog.Dependency.registerCallback_(function (t) {
                        (goog.DebugLoader_.IS_OLD_IE_ &&
                          "complete" != t.readyState) ||
                          (goog.Dependency.unregisterCallback_(o), e.loaded());
                      }),
                      r =
                        !goog.DebugLoader_.IS_OLD_IE_ && goog.getScriptNonce()
                          ? ' nonce="' + goog.getScriptNonce() + '"'
                          : "";
                    (r =
                      '<script src="' +
                      this.path +
                      '" ' +
                      (goog.DebugLoader_.IS_OLD_IE_
                        ? "onreadystatechange"
                        : "onload") +
                      "=\"goog.Dependency.callback_('" +
                      o +
                      '\', this)" type="text/javascript" ' +
                      (goog.Dependency.defer_ ? "defer" : "") +
                      r +
                      "></script>"),
                      t.write(
                        goog.TRUSTED_TYPES_POLICY_
                          ? goog.TRUSTED_TYPES_POLICY_.createHTML(r)
                          : r
                      );
                  } else {
                    var s = t.createElement("script");
                    (s.defer = goog.Dependency.defer_),
                      (s.async = !1),
                      (s.type = "text/javascript"),
                      (r = goog.getScriptNonce()) && s.setAttribute("nonce", r),
                      goog.DebugLoader_.IS_OLD_IE_
                        ? (e.pause(),
                          (s.onreadystatechange = function () {
                            ("loaded" != s.readyState &&
                              "complete" != s.readyState) ||
                              (e.loaded(), e.resume());
                          }))
                        : (s.onload = function () {
                            (s.onload = null), e.loaded();
                          }),
                      (s.src = goog.TRUSTED_TYPES_POLICY_
                        ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(this.path)
                        : this.path),
                      t.head.appendChild(s);
                  }
                } else
                  goog.logToConsole_(
                    "Cannot use default debug loader outside of HTML documents."
                  ),
                    "deps.js" == this.relativePath
                      ? (goog.logToConsole_(
                          "Consider setting CLOSURE_IMPORT_SCRIPT before loading base.js, or setting CLOSURE_NO_DEPS to true."
                        ),
                        e.loaded())
                      : e.pause();
              }),
              (goog.Es6ModuleDependency = function (e, t, o, r, s) {
                goog.Dependency.call(this, e, t, o, r, s);
              }),
              goog.inherits(goog.Es6ModuleDependency, goog.Dependency),
              (goog.Es6ModuleDependency.prototype.load = function (e) {
                if (goog.global.CLOSURE_IMPORT_SCRIPT)
                  goog.global.CLOSURE_IMPORT_SCRIPT(this.path)
                    ? e.loaded()
                    : e.pause();
                else if (goog.inHtmlDocument_()) {
                  var t = goog.global.document,
                    o = this;
                  if (goog.isDocumentLoading_()) {
                    var r = function (e, o) {
                      (e = o
                        ? '<script type="module" crossorigin>' + o + "</script>"
                        : '<script type="module" crossorigin src="' +
                          e +
                          '"></script>'),
                        t.write(
                          goog.TRUSTED_TYPES_POLICY_
                            ? goog.TRUSTED_TYPES_POLICY_.createHTML(e)
                            : e
                        );
                    };
                    goog.Dependency.defer_ = !0;
                  } else
                    r = function (e, o) {
                      var r = t.createElement("script");
                      (r.defer = !0),
                        (r.async = !1),
                        (r.type = "module"),
                        r.setAttribute("crossorigin", !0);
                      var s = goog.getScriptNonce();
                      s && r.setAttribute("nonce", s),
                        o
                          ? (r.textContent = goog.TRUSTED_TYPES_POLICY_
                              ? goog.TRUSTED_TYPES_POLICY_.createScript(o)
                              : o)
                          : (r.src = goog.TRUSTED_TYPES_POLICY_
                              ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(e)
                              : e),
                        t.head.appendChild(r);
                    };
                  var s = goog.Dependency.registerCallback_(function () {
                    goog.Dependency.unregisterCallback_(s),
                      e.setModuleState(goog.ModuleType.ES6);
                  });
                  r(void 0, 'goog.Dependency.callback_("' + s + '")'),
                    r(this.path, void 0);
                  var i = goog.Dependency.registerCallback_(function (t) {
                    goog.Dependency.unregisterCallback_(i),
                      e.registerEs6ModuleExports(
                        o.path,
                        t,
                        goog.moduleLoaderState_.moduleName
                      );
                  });
                  r(
                    void 0,
                    'import * as m from "' +
                      this.path +
                      '"; goog.Dependency.callback_("' +
                      i +
                      '", m)'
                  );
                  var n = goog.Dependency.registerCallback_(function () {
                    goog.Dependency.unregisterCallback_(n),
                      e.clearModuleState(),
                      e.loaded();
                  });
                  r(void 0, 'goog.Dependency.callback_("' + n + '")');
                } else
                  goog.logToConsole_(
                    "Cannot use default debug loader outside of HTML documents."
                  ),
                    e.pause();
              }),
              (goog.TransformedDependency = function (e, t, o, r, s) {
                goog.Dependency.call(this, e, t, o, r, s),
                  (this.contents_ = null),
                  (this.lazyFetch_ =
                    !goog.inHtmlDocument_() ||
                    !(
                      "noModule" in goog.global.document.createElement("script")
                    ));
              }),
              goog.inherits(goog.TransformedDependency, goog.Dependency),
              (goog.TransformedDependency.prototype.load = function (e) {
                function t() {
                  (r.contents_ = goog.loadFileSync_(r.path)),
                    r.contents_ &&
                      ((r.contents_ = r.transform(r.contents_)),
                      r.contents_ &&
                        (r.contents_ += "\n//# sourceURL=" + r.path));
                }
                function o() {
                  if ((r.lazyFetch_ && t(), r.contents_)) {
                    s && e.setModuleState(goog.ModuleType.ES6);
                    try {
                      var o = r.contents_;
                      if (((r.contents_ = null), goog.globalEval(o), s))
                        var i = goog.moduleLoaderState_.moduleName;
                    } finally {
                      s && e.clearModuleState();
                    }
                    s &&
                      goog.global.$jscomp.require.ensure(
                        [r.getPathName()],
                        function () {
                          e.registerEs6ModuleExports(
                            r.path,
                            goog.global.$jscomp.require(r.getPathName()),
                            i
                          );
                        }
                      ),
                      e.loaded();
                  }
                }
                var r = this;
                if (goog.global.CLOSURE_IMPORT_SCRIPT)
                  t(),
                    this.contents_ &&
                    goog.global.CLOSURE_IMPORT_SCRIPT("", this.contents_)
                      ? ((this.contents_ = null), e.loaded())
                      : e.pause();
                else {
                  var s = this.loadFlags.module == goog.ModuleType.ES6;
                  this.lazyFetch_ || t();
                  var i = 1 < e.pending().length,
                    n = i && goog.DebugLoader_.IS_OLD_IE_;
                  if (
                    ((i =
                      goog.Dependency.defer_ &&
                      (i || goog.isDocumentLoading_())),
                    n || i)
                  )
                    e.defer(function () {
                      o();
                    });
                  else {
                    var a = goog.global.document;
                    if (
                      ((n =
                        goog.inHtmlDocument_() &&
                        "ActiveXObject" in goog.global),
                      s &&
                        goog.inHtmlDocument_() &&
                        goog.isDocumentLoading_() &&
                        !n)
                    ) {
                      (goog.Dependency.defer_ = !0), e.pause();
                      var u = a.onreadystatechange;
                      a.onreadystatechange = function () {
                        "interactive" == a.readyState &&
                          ((a.onreadystatechange = u), o(), e.resume()),
                          goog.isFunction(u) && u.apply(void 0, arguments);
                      };
                    } else
                      !goog.DebugLoader_.IS_OLD_IE_ &&
                      goog.inHtmlDocument_() &&
                      goog.isDocumentLoading_()
                        ? (function () {
                            var e = goog.global.document,
                              t = goog.Dependency.registerCallback_(
                                function () {
                                  goog.Dependency.unregisterCallback_(t), o();
                                }
                              ),
                              r =
                                '<script type="text/javascript">' +
                                goog.protectScriptTag_(
                                  'goog.Dependency.callback_("' + t + '");'
                                ) +
                                "</script>";
                            e.write(
                              goog.TRUSTED_TYPES_POLICY_
                                ? goog.TRUSTED_TYPES_POLICY_.createHTML(r)
                                : r
                            );
                          })()
                        : o();
                  }
                }
              }),
              (goog.TransformedDependency.prototype.transform = function (
                e
              ) {}),
              (goog.TranspiledDependency = function (e, t, o, r, s, i) {
                goog.TransformedDependency.call(this, e, t, o, r, s),
                  (this.transpiler = i);
              }),
              goog.inherits(
                goog.TranspiledDependency,
                goog.TransformedDependency
              ),
              (goog.TranspiledDependency.prototype.transform = function (e) {
                return this.transpiler.transpile(e, this.getPathName());
              }),
              (goog.PreTranspiledEs6ModuleDependency = function (
                e,
                t,
                o,
                r,
                s
              ) {
                goog.TransformedDependency.call(this, e, t, o, r, s);
              }),
              goog.inherits(
                goog.PreTranspiledEs6ModuleDependency,
                goog.TransformedDependency
              ),
              (goog.PreTranspiledEs6ModuleDependency.prototype.transform =
                function (e) {
                  return e;
                }),
              (goog.GoogModuleDependency = function (e, t, o, r, s, i, n) {
                goog.TransformedDependency.call(this, e, t, o, r, s),
                  (this.needsTranspile_ = i),
                  (this.transpiler_ = n);
              }),
              goog.inherits(
                goog.GoogModuleDependency,
                goog.TransformedDependency
              ),
              (goog.GoogModuleDependency.prototype.transform = function (e) {
                return (
                  this.needsTranspile_ &&
                    (e = this.transpiler_.transpile(e, this.getPathName())),
                  goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON)
                    ? "goog.loadModule(" +
                      goog.global.JSON.stringify(
                        e + "\n//# sourceURL=" + this.path + "\n"
                      ) +
                      ");"
                    : 'goog.loadModule(function(exports) {"use strict";' +
                      e +
                      "\n;return exports});\n//# sourceURL=" +
                      this.path +
                      "\n"
                );
              }),
              (goog.DebugLoader_.IS_OLD_IE_ = !(
                goog.global.atob ||
                !goog.global.document ||
                !goog.global.document.all
              )),
              (goog.DebugLoader_.prototype.addDependency = function (
                e,
                t,
                o,
                r
              ) {
                (t = t || []), (e = e.replace(/\\/g, "/"));
                var s = goog.normalizePath_(goog.basePath + e);
                for (
                  (r && "boolean" != typeof r) ||
                    (r = r ? { module: goog.ModuleType.GOOG } : {}),
                    o = this.factory_.createDependency(
                      s,
                      e,
                      t,
                      o,
                      r,
                      goog.transpiler_.needsTranspile(r.lang || "es3", r.module)
                    ),
                    this.dependencies_[s] = o,
                    o = 0;
                  o < t.length;
                  o++
                )
                  this.idToPath_[t[o]] = s;
                this.idToPath_[e] = s;
              }),
              (goog.DependencyFactory = function (e) {
                this.transpiler = e;
              }),
              (goog.DependencyFactory.prototype.createDependency = function (
                e,
                t,
                o,
                r,
                s,
                i
              ) {
                return s.module == goog.ModuleType.GOOG
                  ? new goog.GoogModuleDependency(
                      e,
                      t,
                      o,
                      r,
                      s,
                      i,
                      this.transpiler
                    )
                  : i
                  ? new goog.TranspiledDependency(
                      e,
                      t,
                      o,
                      r,
                      s,
                      this.transpiler
                    )
                  : s.module == goog.ModuleType.ES6
                  ? "never" == goog.TRANSPILE &&
                    goog.ASSUME_ES_MODULES_TRANSPILED
                    ? new goog.PreTranspiledEs6ModuleDependency(e, t, o, r, s)
                    : new goog.Es6ModuleDependency(e, t, o, r, s)
                  : new goog.Dependency(e, t, o, r, s);
              }),
              (goog.debugLoader_ = new goog.DebugLoader_()),
              (goog.loadClosureDeps = function () {
                goog.debugLoader_.loadClosureDeps();
              }),
              (goog.setDependencyFactory = function (e) {
                goog.debugLoader_.setDependencyFactory(e);
              }),
              goog.global.CLOSURE_NO_DEPS ||
                goog.debugLoader_.loadClosureDeps(),
              (goog.bootstrap = function (e, t) {
                goog.debugLoader_.bootstrap(e, t);
              })),
            (goog.TRUSTED_TYPES_POLICY_NAME = ""),
            (goog.identity_ = function (e) {
              return e;
            }),
            (goog.createTrustedTypesPolicy = function (e) {
              var t = null;
              if (
                "undefined" == typeof TrustedTypes ||
                !TrustedTypes.createPolicy
              )
                return t;
              try {
                t = TrustedTypes.createPolicy(e, {
                  createHTML: goog.identity_,
                  createScript: goog.identity_,
                  createScriptURL: goog.identity_,
                  createURL: goog.identity_,
                });
              } catch (e) {
                goog.logToConsole_(e.message);
              }
              return t;
            }),
            (goog.TRUSTED_TYPES_POLICY_ = goog.TRUSTED_TYPES_POLICY_NAME
              ? goog.createTrustedTypesPolicy(
                  goog.TRUSTED_TYPES_POLICY_NAME + "#base"
                )
              : null);
          var jspb = {
            BinaryConstants: {},
            ConstBinaryMessage: function () {},
            BinaryMessage: function () {},
          };
          (jspb.BinaryConstants.FieldType = {
            INVALID: -1,
            DOUBLE: 1,
            FLOAT: 2,
            INT64: 3,
            UINT64: 4,
            INT32: 5,
            FIXED64: 6,
            FIXED32: 7,
            BOOL: 8,
            STRING: 9,
            GROUP: 10,
            MESSAGE: 11,
            BYTES: 12,
            UINT32: 13,
            ENUM: 14,
            SFIXED32: 15,
            SFIXED64: 16,
            SINT32: 17,
            SINT64: 18,
            FHASH64: 30,
            VHASH64: 31,
          }),
            (jspb.BinaryConstants.WireType = {
              INVALID: -1,
              VARINT: 0,
              FIXED64: 1,
              DELIMITED: 2,
              START_GROUP: 3,
              END_GROUP: 4,
              FIXED32: 5,
            }),
            (jspb.BinaryConstants.FieldTypeToWireType = function (e) {
              var t = jspb.BinaryConstants.FieldType,
                o = jspb.BinaryConstants.WireType;
              switch (e) {
                case t.INT32:
                case t.INT64:
                case t.UINT32:
                case t.UINT64:
                case t.SINT32:
                case t.SINT64:
                case t.BOOL:
                case t.ENUM:
                case t.VHASH64:
                  return o.VARINT;
                case t.DOUBLE:
                case t.FIXED64:
                case t.SFIXED64:
                case t.FHASH64:
                  return o.FIXED64;
                case t.STRING:
                case t.MESSAGE:
                case t.BYTES:
                  return o.DELIMITED;
                case t.FLOAT:
                case t.FIXED32:
                case t.SFIXED32:
                  return o.FIXED32;
                default:
                  return o.INVALID;
              }
            }),
            (jspb.BinaryConstants.INVALID_FIELD_NUMBER = -1),
            (jspb.BinaryConstants.FLOAT32_EPS = 1401298464324817e-60),
            (jspb.BinaryConstants.FLOAT32_MIN = 11754943508222875e-54),
            (jspb.BinaryConstants.FLOAT32_MAX = 34028234663852886e22),
            (jspb.BinaryConstants.FLOAT64_EPS = 5e-324),
            (jspb.BinaryConstants.FLOAT64_MIN = 22250738585072014e-324),
            (jspb.BinaryConstants.FLOAT64_MAX = 17976931348623157e292),
            (jspb.BinaryConstants.TWO_TO_20 = 1048576),
            (jspb.BinaryConstants.TWO_TO_23 = 8388608),
            (jspb.BinaryConstants.TWO_TO_31 = 2147483648),
            (jspb.BinaryConstants.TWO_TO_32 = 4294967296),
            (jspb.BinaryConstants.TWO_TO_52 = 4503599627370496),
            (jspb.BinaryConstants.TWO_TO_63 = 0x8000000000000000),
            (jspb.BinaryConstants.TWO_TO_64 = 0x10000000000000000),
            (jspb.BinaryConstants.ZERO_HASH = "\0\0\0\0\0\0\0\0"),
            (goog.dom = {}),
            (goog.dom.NodeType = {
              ELEMENT: 1,
              ATTRIBUTE: 2,
              TEXT: 3,
              CDATA_SECTION: 4,
              ENTITY_REFERENCE: 5,
              ENTITY: 6,
              PROCESSING_INSTRUCTION: 7,
              COMMENT: 8,
              DOCUMENT: 9,
              DOCUMENT_TYPE: 10,
              DOCUMENT_FRAGMENT: 11,
              NOTATION: 12,
            }),
            (goog.debug = {}),
            (goog.debug.Error = function (e) {
              if (Error.captureStackTrace)
                Error.captureStackTrace(this, goog.debug.Error);
              else {
                var t = Error().stack;
                t && (this.stack = t);
              }
              e && (this.message = String(e)), (this.reportErrorToServer = !0);
            }),
            goog.inherits(goog.debug.Error, Error),
            (goog.debug.Error.prototype.name = "CustomError"),
            (goog.asserts = {}),
            (goog.asserts.ENABLE_ASSERTS = goog.DEBUG),
            (goog.asserts.AssertionError = function (e, t) {
              goog.debug.Error.call(this, goog.asserts.subs_(e, t)),
                (this.messagePattern = e);
            }),
            goog.inherits(goog.asserts.AssertionError, goog.debug.Error),
            (goog.asserts.AssertionError.prototype.name = "AssertionError"),
            (goog.asserts.DEFAULT_ERROR_HANDLER = function (e) {
              throw e;
            }),
            (goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER),
            (goog.asserts.subs_ = function (e, t) {
              for (
                var o = "", r = (e = e.split("%s")).length - 1, s = 0;
                s < r;
                s++
              )
                o += e[s] + (s < t.length ? t[s] : "%s");
              return o + e[r];
            }),
            (goog.asserts.doAssertFailure_ = function (e, t, o, r) {
              var s = "Assertion failed";
              if (o) {
                s += ": " + o;
                var i = r;
              } else e && ((s += ": " + e), (i = t));
              (e = new goog.asserts.AssertionError("" + s, i || [])),
                goog.asserts.errorHandler_(e);
            }),
            (goog.asserts.setErrorHandler = function (e) {
              goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = e);
            }),
            (goog.asserts.assert = function (e, t, o) {
              return (
                goog.asserts.ENABLE_ASSERTS &&
                  !e &&
                  goog.asserts.doAssertFailure_(
                    "",
                    null,
                    t,
                    Array.prototype.slice.call(arguments, 2)
                  ),
                e
              );
            }),
            (goog.asserts.assertExists = function (e, t, o) {
              return (
                goog.asserts.ENABLE_ASSERTS &&
                  null == e &&
                  goog.asserts.doAssertFailure_(
                    "Expected to exist: %s.",
                    [e],
                    t,
                    Array.prototype.slice.call(arguments, 2)
                  ),
                e
              );
            }),
            (goog.asserts.fail = function (e, t) {
              goog.asserts.ENABLE_ASSERTS &&
                goog.asserts.errorHandler_(
                  new goog.asserts.AssertionError(
                    "Failure" + (e ? ": " + e : ""),
                    Array.prototype.slice.call(arguments, 1)
                  )
                );
            }),
            (goog.asserts.assertNumber = function (e, t, o) {
              return (
                goog.asserts.ENABLE_ASSERTS &&
                  !goog.isNumber(e) &&
                  goog.asserts.doAssertFailure_(
                    "Expected number but got %s: %s.",
                    [goog.typeOf(e), e],
                    t,
                    Array.prototype.slice.call(arguments, 2)
                  ),
                e
              );
            }),
            (goog.asserts.assertString = function (e, t, o) {
              return (
                goog.asserts.ENABLE_ASSERTS &&
                  !goog.isString(e) &&
                  goog.asserts.doAssertFailure_(
                    "Expected string but got %s: %s.",
                    [goog.typeOf(e), e],
                    t,
                    Array.prototype.slice.call(arguments, 2)
                  ),
                e
              );
            }),
            (goog.asserts.assertFunction = function (e, t, o) {
              return (
                goog.asserts.ENABLE_ASSERTS &&
                  !goog.isFunction(e) &&
                  goog.asserts.doAssertFailure_(
                    "Expected function but got %s: %s.",
                    [goog.typeOf(e), e],
                    t,
                    Array.prototype.slice.call(arguments, 2)
                  ),
                e
              );
            }),
            (goog.asserts.assertObject = function (e, t, o) {
              return (
                goog.asserts.ENABLE_ASSERTS &&
                  !goog.isObject(e) &&
                  goog.asserts.doAssertFailure_(
                    "Expected object but got %s: %s.",
                    [goog.typeOf(e), e],
                    t,
                    Array.prototype.slice.call(arguments, 2)
                  ),
                e
              );
            }),
            (goog.asserts.assertArray = function (e, t, o) {
              return (
                goog.asserts.ENABLE_ASSERTS &&
                  !goog.isArray(e) &&
                  goog.asserts.doAssertFailure_(
                    "Expected array but got %s: %s.",
                    [goog.typeOf(e), e],
                    t,
                    Array.prototype.slice.call(arguments, 2)
                  ),
                e
              );
            }),
            (goog.asserts.assertBoolean = function (e, t, o) {
              return (
                goog.asserts.ENABLE_ASSERTS &&
                  !goog.isBoolean(e) &&
                  goog.asserts.doAssertFailure_(
                    "Expected boolean but got %s: %s.",
                    [goog.typeOf(e), e],
                    t,
                    Array.prototype.slice.call(arguments, 2)
                  ),
                e
              );
            }),
            (goog.asserts.assertElement = function (e, t, o) {
              return (
                !goog.asserts.ENABLE_ASSERTS ||
                  (goog.isObject(e) &&
                    e.nodeType == goog.dom.NodeType.ELEMENT) ||
                  goog.asserts.doAssertFailure_(
                    "Expected Element but got %s: %s.",
                    [goog.typeOf(e), e],
                    t,
                    Array.prototype.slice.call(arguments, 2)
                  ),
                e
              );
            }),
            (goog.asserts.assertInstanceof = function (e, t, o, r) {
              return (
                !goog.asserts.ENABLE_ASSERTS ||
                  e instanceof t ||
                  goog.asserts.doAssertFailure_(
                    "Expected instanceof %s but got %s.",
                    [goog.asserts.getType_(t), goog.asserts.getType_(e)],
                    o,
                    Array.prototype.slice.call(arguments, 3)
                  ),
                e
              );
            }),
            (goog.asserts.assertFinite = function (e, t, o) {
              return (
                !goog.asserts.ENABLE_ASSERTS ||
                  ("number" == typeof e && isFinite(e)) ||
                  goog.asserts.doAssertFailure_(
                    "Expected %s to be a finite number but it is not.",
                    [e],
                    t,
                    Array.prototype.slice.call(arguments, 2)
                  ),
                e
              );
            }),
            (goog.asserts.assertObjectPrototypeIsIntact = function () {
              for (var e in Object.prototype)
                goog.asserts.fail(
                  e + " should not be enumerable in Object.prototype."
                );
            }),
            (goog.asserts.getType_ = function (e) {
              return e instanceof Function
                ? e.displayName || e.name || "unknown type name"
                : e instanceof Object
                ? e.constructor.displayName ||
                  e.constructor.name ||
                  Object.prototype.toString.call(e)
                : null === e
                ? "null"
                : typeof e;
            }),
            (goog.array = {}),
            (goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE),
            (goog.array.ASSUME_NATIVE_FUNCTIONS = 2012 < goog.FEATURESET_YEAR),
            (goog.array.peek = function (e) {
              return e[e.length - 1];
            }),
            (goog.array.last = goog.array.peek),
            (goog.array.indexOf =
              goog.NATIVE_ARRAY_PROTOTYPES &&
              (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf)
                ? function (e, t, o) {
                    return (
                      goog.asserts.assert(null != e.length),
                      Array.prototype.indexOf.call(e, t, o)
                    );
                  }
                : function (e, t, o) {
                    if (
                      ((o =
                        null == o ? 0 : 0 > o ? Math.max(0, e.length + o) : o),
                      goog.isString(e))
                    )
                      return goog.isString(t) && 1 == t.length
                        ? e.indexOf(t, o)
                        : -1;
                    for (; o < e.length; o++)
                      if (o in e && e[o] === t) return o;
                    return -1;
                  }),
            (goog.array.lastIndexOf =
              goog.NATIVE_ARRAY_PROTOTYPES &&
              (goog.array.ASSUME_NATIVE_FUNCTIONS ||
                Array.prototype.lastIndexOf)
                ? function (e, t, o) {
                    return (
                      goog.asserts.assert(null != e.length),
                      Array.prototype.lastIndexOf.call(
                        e,
                        t,
                        null == o ? e.length - 1 : o
                      )
                    );
                  }
                : function (e, t, o) {
                    if (
                      (0 > (o = null == o ? e.length - 1 : o) &&
                        (o = Math.max(0, e.length + o)),
                      goog.isString(e))
                    )
                      return goog.isString(t) && 1 == t.length
                        ? e.lastIndexOf(t, o)
                        : -1;
                    for (; 0 <= o; o--) if (o in e && e[o] === t) return o;
                    return -1;
                  }),
            (goog.array.forEach =
              goog.NATIVE_ARRAY_PROTOTYPES &&
              (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach)
                ? function (e, t, o) {
                    goog.asserts.assert(null != e.length),
                      Array.prototype.forEach.call(e, t, o);
                  }
                : function (e, t, o) {
                    for (
                      var r = e.length,
                        s = goog.isString(e) ? e.split("") : e,
                        i = 0;
                      i < r;
                      i++
                    )
                      i in s && t.call(o, s[i], i, e);
                  }),
            (goog.array.forEachRight = function (e, t, o) {
              var r = e.length,
                s = goog.isString(e) ? e.split("") : e;
              for (--r; 0 <= r; --r) r in s && t.call(o, s[r], r, e);
            }),
            (goog.array.filter =
              goog.NATIVE_ARRAY_PROTOTYPES &&
              (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter)
                ? function (e, t, o) {
                    return (
                      goog.asserts.assert(null != e.length),
                      Array.prototype.filter.call(e, t, o)
                    );
                  }
                : function (e, t, o) {
                    for (
                      var r = e.length,
                        s = [],
                        i = 0,
                        n = goog.isString(e) ? e.split("") : e,
                        a = 0;
                      a < r;
                      a++
                    )
                      if (a in n) {
                        var u = n[a];
                        t.call(o, u, a, e) && (s[i++] = u);
                      }
                    return s;
                  }),
            (goog.array.map =
              goog.NATIVE_ARRAY_PROTOTYPES &&
              (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map)
                ? function (e, t, o) {
                    return (
                      goog.asserts.assert(null != e.length),
                      Array.prototype.map.call(e, t, o)
                    );
                  }
                : function (e, t, o) {
                    for (
                      var r = e.length,
                        s = Array(r),
                        i = goog.isString(e) ? e.split("") : e,
                        n = 0;
                      n < r;
                      n++
                    )
                      n in i && (s[n] = t.call(o, i[n], n, e));
                    return s;
                  }),
            (goog.array.reduce =
              goog.NATIVE_ARRAY_PROTOTYPES &&
              (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce)
                ? function (e, t, o, r) {
                    return (
                      goog.asserts.assert(null != e.length),
                      r && (t = goog.bind(t, r)),
                      Array.prototype.reduce.call(e, t, o)
                    );
                  }
                : function (e, t, o, r) {
                    var s = o;
                    return (
                      goog.array.forEach(e, function (o, i) {
                        s = t.call(r, s, o, i, e);
                      }),
                      s
                    );
                  }),
            (goog.array.reduceRight =
              goog.NATIVE_ARRAY_PROTOTYPES &&
              (goog.array.ASSUME_NATIVE_FUNCTIONS ||
                Array.prototype.reduceRight)
                ? function (e, t, o, r) {
                    return (
                      goog.asserts.assert(null != e.length),
                      goog.asserts.assert(null != t),
                      r && (t = goog.bind(t, r)),
                      Array.prototype.reduceRight.call(e, t, o)
                    );
                  }
                : function (e, t, o, r) {
                    var s = o;
                    return (
                      goog.array.forEachRight(e, function (o, i) {
                        s = t.call(r, s, o, i, e);
                      }),
                      s
                    );
                  }),
            (goog.array.some =
              goog.NATIVE_ARRAY_PROTOTYPES &&
              (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some)
                ? function (e, t, o) {
                    return (
                      goog.asserts.assert(null != e.length),
                      Array.prototype.some.call(e, t, o)
                    );
                  }
                : function (e, t, o) {
                    for (
                      var r = e.length,
                        s = goog.isString(e) ? e.split("") : e,
                        i = 0;
                      i < r;
                      i++
                    )
                      if (i in s && t.call(o, s[i], i, e)) return !0;
                    return !1;
                  }),
            (goog.array.every =
              goog.NATIVE_ARRAY_PROTOTYPES &&
              (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every)
                ? function (e, t, o) {
                    return (
                      goog.asserts.assert(null != e.length),
                      Array.prototype.every.call(e, t, o)
                    );
                  }
                : function (e, t, o) {
                    for (
                      var r = e.length,
                        s = goog.isString(e) ? e.split("") : e,
                        i = 0;
                      i < r;
                      i++
                    )
                      if (i in s && !t.call(o, s[i], i, e)) return !1;
                    return !0;
                  }),
            (goog.array.count = function (e, t, o) {
              var r = 0;
              return (
                goog.array.forEach(
                  e,
                  function (e, s, i) {
                    t.call(o, e, s, i) && ++r;
                  },
                  o
                ),
                r
              );
            }),
            (goog.array.find = function (e, t, o) {
              return 0 > (t = goog.array.findIndex(e, t, o))
                ? null
                : goog.isString(e)
                ? e.charAt(t)
                : e[t];
            }),
            (goog.array.findIndex = function (e, t, o) {
              for (
                var r = e.length, s = goog.isString(e) ? e.split("") : e, i = 0;
                i < r;
                i++
              )
                if (i in s && t.call(o, s[i], i, e)) return i;
              return -1;
            }),
            (goog.array.findRight = function (e, t, o) {
              return 0 > (t = goog.array.findIndexRight(e, t, o))
                ? null
                : goog.isString(e)
                ? e.charAt(t)
                : e[t];
            }),
            (goog.array.findIndexRight = function (e, t, o) {
              var r = e.length,
                s = goog.isString(e) ? e.split("") : e;
              for (--r; 0 <= r; r--)
                if (r in s && t.call(o, s[r], r, e)) return r;
              return -1;
            }),
            (goog.array.contains = function (e, t) {
              return 0 <= goog.array.indexOf(e, t);
            }),
            (goog.array.isEmpty = function (e) {
              return 0 == e.length;
            }),
            (goog.array.clear = function (e) {
              if (!goog.isArray(e))
                for (var t = e.length - 1; 0 <= t; t--) delete e[t];
              e.length = 0;
            }),
            (goog.array.insert = function (e, t) {
              goog.array.contains(e, t) || e.push(t);
            }),
            (goog.array.insertAt = function (e, t, o) {
              goog.array.splice(e, o, 0, t);
            }),
            (goog.array.insertArrayAt = function (e, t, o) {
              goog.partial(goog.array.splice, e, o, 0).apply(null, t);
            }),
            (goog.array.insertBefore = function (e, t, o) {
              var r;
              2 == arguments.length || 0 > (r = goog.array.indexOf(e, o))
                ? e.push(t)
                : goog.array.insertAt(e, t, r);
            }),
            (goog.array.remove = function (e, t) {
              var o;
              return (
                (o = 0 <= (t = goog.array.indexOf(e, t))) &&
                  goog.array.removeAt(e, t),
                o
              );
            }),
            (goog.array.removeLast = function (e, t) {
              return (
                0 <= (t = goog.array.lastIndexOf(e, t)) &&
                (goog.array.removeAt(e, t), !0)
              );
            }),
            (goog.array.removeAt = function (e, t) {
              return (
                goog.asserts.assert(null != e.length),
                1 == Array.prototype.splice.call(e, t, 1).length
              );
            }),
            (goog.array.removeIf = function (e, t, o) {
              return (
                0 <= (t = goog.array.findIndex(e, t, o)) &&
                (goog.array.removeAt(e, t), !0)
              );
            }),
            (goog.array.removeAllIf = function (e, t, o) {
              var r = 0;
              return (
                goog.array.forEachRight(e, function (s, i) {
                  t.call(o, s, i, e) && goog.array.removeAt(e, i) && r++;
                }),
                r
              );
            }),
            (goog.array.concat = function (e) {
              return Array.prototype.concat.apply([], arguments);
            }),
            (goog.array.join = function (e) {
              return Array.prototype.concat.apply([], arguments);
            }),
            (goog.array.toArray = function (e) {
              var t = e.length;
              if (0 < t) {
                for (var o = Array(t), r = 0; r < t; r++) o[r] = e[r];
                return o;
              }
              return [];
            }),
            (goog.array.clone = goog.array.toArray),
            (goog.array.extend = function (e, t) {
              for (var o = 1; o < arguments.length; o++) {
                var r = arguments[o];
                if (goog.isArrayLike(r)) {
                  var s = e.length || 0,
                    i = r.length || 0;
                  e.length = s + i;
                  for (var n = 0; n < i; n++) e[s + n] = r[n];
                } else e.push(r);
              }
            }),
            (goog.array.splice = function (e, t, o, r) {
              return (
                goog.asserts.assert(null != e.length),
                Array.prototype.splice.apply(e, goog.array.slice(arguments, 1))
              );
            }),
            (goog.array.slice = function (e, t, o) {
              return (
                goog.asserts.assert(null != e.length),
                2 >= arguments.length
                  ? Array.prototype.slice.call(e, t)
                  : Array.prototype.slice.call(e, t, o)
              );
            }),
            (goog.array.removeDuplicates = function (e, t, o) {
              t = t || e;
              var r = function (e) {
                return goog.isObject(e)
                  ? "o" + goog.getUid(e)
                  : (typeof e).charAt(0) + e;
              };
              (o = o || r), (r = {});
              for (var s = 0, i = 0; i < e.length; ) {
                var n = e[i++],
                  a = o(n);
                Object.prototype.hasOwnProperty.call(r, a) ||
                  ((r[a] = !0), (t[s++] = n));
              }
              t.length = s;
            }),
            (goog.array.binarySearch = function (e, t, o) {
              return goog.array.binarySearch_(
                e,
                o || goog.array.defaultCompare,
                !1,
                t
              );
            }),
            (goog.array.binarySelect = function (e, t, o) {
              return goog.array.binarySearch_(e, t, !0, void 0, o);
            }),
            (goog.array.binarySearch_ = function (e, t, o, r, s) {
              for (var i, n = 0, a = e.length; n < a; ) {
                var u = (n + a) >> 1,
                  g = o ? t.call(s, e[u], u, e) : t(r, e[u]);
                0 < g ? (n = u + 1) : ((a = u), (i = !g));
              }
              return i ? n : ~n;
            }),
            (goog.array.sort = function (e, t) {
              e.sort(t || goog.array.defaultCompare);
            }),
            (goog.array.stableSort = function (e, t) {
              for (var o = Array(e.length), r = 0; r < e.length; r++)
                o[r] = { index: r, value: e[r] };
              var s = t || goog.array.defaultCompare;
              for (
                goog.array.sort(o, function (e, t) {
                  return s(e.value, t.value) || e.index - t.index;
                }),
                  r = 0;
                r < e.length;
                r++
              )
                e[r] = o[r].value;
            }),
            (goog.array.sortByKey = function (e, t, o) {
              var r = o || goog.array.defaultCompare;
              goog.array.sort(e, function (e, o) {
                return r(t(e), t(o));
              });
            }),
            (goog.array.sortObjectsByKey = function (e, t, o) {
              goog.array.sortByKey(
                e,
                function (e) {
                  return e[t];
                },
                o
              );
            }),
            (goog.array.isSorted = function (e, t, o) {
              t = t || goog.array.defaultCompare;
              for (var r = 1; r < e.length; r++) {
                var s = t(e[r - 1], e[r]);
                if (0 < s || (0 == s && o)) return !1;
              }
              return !0;
            }),
            (goog.array.equals = function (e, t, o) {
              if (
                !goog.isArrayLike(e) ||
                !goog.isArrayLike(t) ||
                e.length != t.length
              )
                return !1;
              var r = e.length;
              o = o || goog.array.defaultCompareEquality;
              for (var s = 0; s < r; s++) if (!o(e[s], t[s])) return !1;
              return !0;
            }),
            (goog.array.compare3 = function (e, t, o) {
              o = o || goog.array.defaultCompare;
              for (var r = Math.min(e.length, t.length), s = 0; s < r; s++) {
                var i = o(e[s], t[s]);
                if (0 != i) return i;
              }
              return goog.array.defaultCompare(e.length, t.length);
            }),
            (goog.array.defaultCompare = function (e, t) {
              return e > t ? 1 : e < t ? -1 : 0;
            }),
            (goog.array.inverseDefaultCompare = function (e, t) {
              return -goog.array.defaultCompare(e, t);
            }),
            (goog.array.defaultCompareEquality = function (e, t) {
              return e === t;
            }),
            (goog.array.binaryInsert = function (e, t, o) {
              return (
                0 > (o = goog.array.binarySearch(e, t, o)) &&
                (goog.array.insertAt(e, t, -(o + 1)), !0)
              );
            }),
            (goog.array.binaryRemove = function (e, t, o) {
              return (
                0 <= (t = goog.array.binarySearch(e, t, o)) &&
                goog.array.removeAt(e, t)
              );
            }),
            (goog.array.bucket = function (e, t, o) {
              for (var r = {}, s = 0; s < e.length; s++) {
                var i = e[s],
                  n = t.call(o, i, s, e);
                goog.isDef(n) && (r[n] || (r[n] = [])).push(i);
              }
              return r;
            }),
            (goog.array.toObject = function (e, t, o) {
              var r = {};
              return (
                goog.array.forEach(e, function (s, i) {
                  r[t.call(o, s, i, e)] = s;
                }),
                r
              );
            }),
            (goog.array.range = function (e, t, o) {
              var r = [],
                s = 0,
                i = e;
              if (
                (void 0 !== t && ((s = e), (i = t)), 0 > (o = o || 1) * (i - s))
              )
                return [];
              if (0 < o) for (e = s; e < i; e += o) r.push(e);
              else for (e = s; e > i; e += o) r.push(e);
              return r;
            }),
            (goog.array.repeat = function (e, t) {
              for (var o = [], r = 0; r < t; r++) o[r] = e;
              return o;
            }),
            (goog.array.flatten = function (e) {
              for (var t = [], o = 0; o < arguments.length; o++) {
                var r = arguments[o];
                if (goog.isArray(r))
                  for (var s = 0; s < r.length; s += 8192) {
                    var i = goog.array.slice(r, s, s + 8192);
                    i = goog.array.flatten.apply(null, i);
                    for (var n = 0; n < i.length; n++) t.push(i[n]);
                  }
                else t.push(r);
              }
              return t;
            }),
            (goog.array.rotate = function (e, t) {
              return (
                goog.asserts.assert(null != e.length),
                e.length &&
                  (0 < (t %= e.length)
                    ? Array.prototype.unshift.apply(e, e.splice(-t, t))
                    : 0 > t && Array.prototype.push.apply(e, e.splice(0, -t))),
                e
              );
            }),
            (goog.array.moveItem = function (e, t, o) {
              goog.asserts.assert(0 <= t && t < e.length),
                goog.asserts.assert(0 <= o && o < e.length),
                (t = Array.prototype.splice.call(e, t, 1)),
                Array.prototype.splice.call(e, o, 0, t[0]);
            }),
            (goog.array.zip = function (e) {
              if (!arguments.length) return [];
              for (
                var t = [], o = arguments[0].length, r = 1;
                r < arguments.length;
                r++
              )
                arguments[r].length < o && (o = arguments[r].length);
              for (r = 0; r < o; r++) {
                for (var s = [], i = 0; i < arguments.length; i++)
                  s.push(arguments[i][r]);
                t.push(s);
              }
              return t;
            }),
            (goog.array.shuffle = function (e, t) {
              t = t || Math.random;
              for (var o = e.length - 1; 0 < o; o--) {
                var r = Math.floor(t() * (o + 1)),
                  s = e[o];
                (e[o] = e[r]), (e[r] = s);
              }
            }),
            (goog.array.copyByIndex = function (e, t) {
              var o = [];
              return (
                goog.array.forEach(t, function (t) {
                  o.push(e[t]);
                }),
                o
              );
            }),
            (goog.array.concatMap = function (e, t, o) {
              return goog.array.concat.apply([], goog.array.map(e, t, o));
            }),
            (goog.crypt = {}),
            (goog.crypt.stringToByteArray = function (e) {
              for (var t = [], o = 0, r = 0; r < e.length; r++) {
                var s = e.charCodeAt(r);
                255 < s && ((t[o++] = 255 & s), (s >>= 8)), (t[o++] = s);
              }
              return t;
            }),
            (goog.crypt.byteArrayToString = function (e) {
              if (8192 >= e.length) return String.fromCharCode.apply(null, e);
              for (var t = "", o = 0; o < e.length; o += 8192) {
                var r = goog.array.slice(e, o, o + 8192);
                t += String.fromCharCode.apply(null, r);
              }
              return t;
            }),
            (goog.crypt.byteArrayToHex = function (e, t) {
              return goog.array
                .map(e, function (e) {
                  return 1 < (e = e.toString(16)).length ? e : "0" + e;
                })
                .join(t || "");
            }),
            (goog.crypt.hexToByteArray = function (e) {
              goog.asserts.assert(
                0 == e.length % 2,
                "Key string length must be multiple of 2"
              );
              for (var t = [], o = 0; o < e.length; o += 2)
                t.push(parseInt(e.substring(o, o + 2), 16));
              return t;
            }),
            (goog.crypt.stringToUtf8ByteArray = function (e) {
              for (var t = [], o = 0, r = 0; r < e.length; r++) {
                var s = e.charCodeAt(r);
                128 > s
                  ? (t[o++] = s)
                  : (2048 > s
                      ? (t[o++] = (s >> 6) | 192)
                      : (55296 == (64512 & s) &&
                        r + 1 < e.length &&
                        56320 == (64512 & e.charCodeAt(r + 1))
                          ? ((s =
                              65536 +
                              ((1023 & s) << 10) +
                              (1023 & e.charCodeAt(++r))),
                            (t[o++] = (s >> 18) | 240),
                            (t[o++] = ((s >> 12) & 63) | 128))
                          : (t[o++] = (s >> 12) | 224),
                        (t[o++] = ((s >> 6) & 63) | 128)),
                    (t[o++] = (63 & s) | 128));
              }
              return t;
            }),
            (goog.crypt.utf8ByteArrayToString = function (e) {
              for (var t = [], o = 0, r = 0; o < e.length; ) {
                var s = e[o++];
                if (128 > s) t[r++] = String.fromCharCode(s);
                else if (191 < s && 224 > s) {
                  var i = e[o++];
                  t[r++] = String.fromCharCode(((31 & s) << 6) | (63 & i));
                } else if (239 < s && 365 > s) {
                  i = e[o++];
                  var n = e[o++];
                  (s =
                    (((7 & s) << 18) |
                      ((63 & i) << 12) |
                      ((63 & n) << 6) |
                      (63 & e[o++])) -
                    65536),
                    (t[r++] = String.fromCharCode(55296 + (s >> 10))),
                    (t[r++] = String.fromCharCode(56320 + (1023 & s)));
                } else
                  (i = e[o++]),
                    (n = e[o++]),
                    (t[r++] = String.fromCharCode(
                      ((15 & s) << 12) | ((63 & i) << 6) | (63 & n)
                    ));
              }
              return t.join("");
            }),
            (goog.crypt.xorByteArray = function (e, t) {
              goog.asserts.assert(
                e.length == t.length,
                "XOR array lengths must match"
              );
              for (var o = [], r = 0; r < e.length; r++) o.push(e[r] ^ t[r]);
              return o;
            }),
            (goog.string = {}),
            (goog.string.internal = {}),
            (goog.string.internal.startsWith = function (e, t) {
              return 0 == e.lastIndexOf(t, 0);
            }),
            (goog.string.internal.endsWith = function (e, t) {
              var o = e.length - t.length;
              return 0 <= o && e.indexOf(t, o) == o;
            }),
            (goog.string.internal.caseInsensitiveStartsWith = function (e, t) {
              return (
                0 ==
                goog.string.internal.caseInsensitiveCompare(
                  t,
                  e.substr(0, t.length)
                )
              );
            }),
            (goog.string.internal.caseInsensitiveEndsWith = function (e, t) {
              return (
                0 ==
                goog.string.internal.caseInsensitiveCompare(
                  t,
                  e.substr(e.length - t.length, t.length)
                )
              );
            }),
            (goog.string.internal.caseInsensitiveEquals = function (e, t) {
              return e.toLowerCase() == t.toLowerCase();
            }),
            (goog.string.internal.isEmptyOrWhitespace = function (e) {
              return /^[\s\xa0]*$/.test(e);
            }),
            (goog.string.internal.trim =
              goog.TRUSTED_SITE && String.prototype.trim
                ? function (e) {
                    return e.trim();
                  }
                : function (e) {
                    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1];
                  }),
            (goog.string.internal.caseInsensitiveCompare = function (e, t) {
              return (e = String(e).toLowerCase()) <
                (t = String(t).toLowerCase())
                ? -1
                : e == t
                ? 0
                : 1;
            }),
            (goog.string.internal.newLineToBr = function (e, t) {
              return e.replace(/(\r\n|\r|\n)/g, t ? "<br />" : "<br>");
            }),
            (goog.string.internal.htmlEscape = function (e, t) {
              if (t)
                e = e
                  .replace(goog.string.internal.AMP_RE_, "&amp;")
                  .replace(goog.string.internal.LT_RE_, "&lt;")
                  .replace(goog.string.internal.GT_RE_, "&gt;")
                  .replace(goog.string.internal.QUOT_RE_, "&quot;")
                  .replace(goog.string.internal.SINGLE_QUOTE_RE_, "&#39;")
                  .replace(goog.string.internal.NULL_RE_, "&#0;");
              else {
                if (!goog.string.internal.ALL_RE_.test(e)) return e;
                -1 != e.indexOf("&") &&
                  (e = e.replace(goog.string.internal.AMP_RE_, "&amp;")),
                  -1 != e.indexOf("<") &&
                    (e = e.replace(goog.string.internal.LT_RE_, "&lt;")),
                  -1 != e.indexOf(">") &&
                    (e = e.replace(goog.string.internal.GT_RE_, "&gt;")),
                  -1 != e.indexOf('"') &&
                    (e = e.replace(goog.string.internal.QUOT_RE_, "&quot;")),
                  -1 != e.indexOf("'") &&
                    (e = e.replace(
                      goog.string.internal.SINGLE_QUOTE_RE_,
                      "&#39;"
                    )),
                  -1 != e.indexOf("\0") &&
                    (e = e.replace(goog.string.internal.NULL_RE_, "&#0;"));
              }
              return e;
            }),
            (goog.string.internal.AMP_RE_ = /&/g),
            (goog.string.internal.LT_RE_ = /</g),
            (goog.string.internal.GT_RE_ = />/g),
            (goog.string.internal.QUOT_RE_ = /"/g),
            (goog.string.internal.SINGLE_QUOTE_RE_ = /'/g),
            (goog.string.internal.NULL_RE_ = /\x00/g),
            (goog.string.internal.ALL_RE_ = /[\x00&<>"']/),
            (goog.string.internal.whitespaceEscape = function (e, t) {
              return goog.string.internal.newLineToBr(
                e.replace(/  /g, " &#160;"),
                t
              );
            }),
            (goog.string.internal.contains = function (e, t) {
              return -1 != e.indexOf(t);
            }),
            (goog.string.internal.caseInsensitiveContains = function (e, t) {
              return goog.string.internal.contains(
                e.toLowerCase(),
                t.toLowerCase()
              );
            }),
            (goog.string.internal.compareVersions = function (e, t) {
              var o = 0;
              (e = goog.string.internal.trim(String(e)).split(".")),
                (t = goog.string.internal.trim(String(t)).split("."));
              for (
                var r = Math.max(e.length, t.length), s = 0;
                0 == o && s < r;
                s++
              ) {
                var i = e[s] || "",
                  n = t[s] || "";
                do {
                  if (
                    ((i = /(\d*)(\D*)(.*)/.exec(i) || ["", "", "", ""]),
                    (n = /(\d*)(\D*)(.*)/.exec(n) || ["", "", "", ""]),
                    0 == i[0].length && 0 == n[0].length)
                  )
                    break;
                  o = 0 == i[1].length ? 0 : parseInt(i[1], 10);
                  var a = 0 == n[1].length ? 0 : parseInt(n[1], 10);
                  (o =
                    goog.string.internal.compareElements_(o, a) ||
                    goog.string.internal.compareElements_(
                      0 == i[2].length,
                      0 == n[2].length
                    ) ||
                    goog.string.internal.compareElements_(i[2], n[2])),
                    (i = i[3]),
                    (n = n[3]);
                } while (0 == o);
              }
              return o;
            }),
            (goog.string.internal.compareElements_ = function (e, t) {
              return e < t ? -1 : e > t ? 1 : 0;
            }),
            (goog.string.TypedString = function () {}),
            (goog.string.Const = function (e, t) {
              (this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ =
                (e ===
                  goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ &&
                  t) ||
                ""),
                (this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ =
                  goog.string.Const.TYPE_MARKER_);
            }),
            (goog.string.Const.prototype.implementsGoogStringTypedString = !0),
            (goog.string.Const.prototype.getTypedStringValue = function () {
              return this
                .stringConstValueWithSecurityContract__googStringSecurityPrivate_;
            }),
            (goog.string.Const.prototype.toString = function () {
              return (
                "Const{" +
                this
                  .stringConstValueWithSecurityContract__googStringSecurityPrivate_ +
                "}"
              );
            }),
            (goog.string.Const.unwrap = function (e) {
              return e instanceof goog.string.Const &&
                e.constructor === goog.string.Const &&
                e.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ ===
                  goog.string.Const.TYPE_MARKER_
                ? e.stringConstValueWithSecurityContract__googStringSecurityPrivate_
                : (goog.asserts.fail(
                    "expected object of type Const, got '" + e + "'"
                  ),
                  "type_error:Const");
            }),
            (goog.string.Const.from = function (e) {
              return new goog.string.Const(
                goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_,
                e
              );
            }),
            (goog.string.Const.TYPE_MARKER_ = {}),
            (goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ = {}),
            (goog.string.Const.EMPTY = goog.string.Const.from("")),
            (goog.fs = {}),
            (goog.fs.url = {}),
            (goog.fs.url.createObjectUrl = function (e) {
              return goog.fs.url.getUrlObject_().createObjectURL(e);
            }),
            (goog.fs.url.revokeObjectUrl = function (e) {
              goog.fs.url.getUrlObject_().revokeObjectURL(e);
            }),
            (goog.fs.url.getUrlObject_ = function () {
              var e = goog.fs.url.findUrlObject_();
              if (null != e) return e;
              throw Error("This browser doesn't seem to support blob URLs");
            }),
            (goog.fs.url.findUrlObject_ = function () {
              return goog.isDef(goog.global.URL) &&
                goog.isDef(goog.global.URL.createObjectURL)
                ? goog.global.URL
                : goog.isDef(goog.global.webkitURL) &&
                  goog.isDef(goog.global.webkitURL.createObjectURL)
                ? goog.global.webkitURL
                : goog.isDef(goog.global.createObjectURL)
                ? goog.global
                : null;
            }),
            (goog.fs.url.browserSupportsObjectUrls = function () {
              return null != goog.fs.url.findUrlObject_();
            }),
            (goog.html = {}),
            (goog.html.trustedtypes = {}),
            (goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY =
              goog.TRUSTED_TYPES_POLICY_NAME
                ? goog.createTrustedTypesPolicy(
                    goog.TRUSTED_TYPES_POLICY_NAME + "#html"
                  )
                : null),
            (goog.i18n = {}),
            (goog.i18n.bidi = {}),
            (goog.i18n.bidi.FORCE_RTL = !1),
            (goog.i18n.bidi.IS_RTL =
              goog.i18n.bidi.FORCE_RTL ||
              (("ar" == goog.LOCALE.substring(0, 2).toLowerCase() ||
                "fa" == goog.LOCALE.substring(0, 2).toLowerCase() ||
                "he" == goog.LOCALE.substring(0, 2).toLowerCase() ||
                "iw" == goog.LOCALE.substring(0, 2).toLowerCase() ||
                "ps" == goog.LOCALE.substring(0, 2).toLowerCase() ||
                "sd" == goog.LOCALE.substring(0, 2).toLowerCase() ||
                "ug" == goog.LOCALE.substring(0, 2).toLowerCase() ||
                "ur" == goog.LOCALE.substring(0, 2).toLowerCase() ||
                "yi" == goog.LOCALE.substring(0, 2).toLowerCase()) &&
                (2 == goog.LOCALE.length ||
                  "-" == goog.LOCALE.substring(2, 3) ||
                  "_" == goog.LOCALE.substring(2, 3))) ||
              (3 <= goog.LOCALE.length &&
                "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() &&
                (3 == goog.LOCALE.length ||
                  "-" == goog.LOCALE.substring(3, 4) ||
                  "_" == goog.LOCALE.substring(3, 4))) ||
              (7 <= goog.LOCALE.length &&
                ("-" == goog.LOCALE.substring(2, 3) ||
                  "_" == goog.LOCALE.substring(2, 3)) &&
                ("adlm" == goog.LOCALE.substring(3, 7).toLowerCase() ||
                  "arab" == goog.LOCALE.substring(3, 7).toLowerCase() ||
                  "hebr" == goog.LOCALE.substring(3, 7).toLowerCase() ||
                  "nkoo" == goog.LOCALE.substring(3, 7).toLowerCase() ||
                  "rohg" == goog.LOCALE.substring(3, 7).toLowerCase() ||
                  "thaa" == goog.LOCALE.substring(3, 7).toLowerCase())) ||
              (8 <= goog.LOCALE.length &&
                ("-" == goog.LOCALE.substring(3, 4) ||
                  "_" == goog.LOCALE.substring(3, 4)) &&
                ("adlm" == goog.LOCALE.substring(4, 8).toLowerCase() ||
                  "arab" == goog.LOCALE.substring(4, 8).toLowerCase() ||
                  "hebr" == goog.LOCALE.substring(4, 8).toLowerCase() ||
                  "nkoo" == goog.LOCALE.substring(4, 8).toLowerCase() ||
                  "rohg" == goog.LOCALE.substring(4, 8).toLowerCase() ||
                  "thaa" == goog.LOCALE.substring(4, 8).toLowerCase()))),
            (goog.i18n.bidi.Format = {
              LRE: "‪",
              RLE: "‫",
              PDF: "‬",
              LRM: "‎",
              RLM: "‏",
            }),
            (goog.i18n.bidi.Dir = { LTR: 1, RTL: -1, NEUTRAL: 0 }),
            (goog.i18n.bidi.RIGHT = "right"),
            (goog.i18n.bidi.LEFT = "left"),
            (goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL
              ? goog.i18n.bidi.LEFT
              : goog.i18n.bidi.RIGHT),
            (goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL
              ? goog.i18n.bidi.RIGHT
              : goog.i18n.bidi.LEFT),
            (goog.i18n.bidi.toDir = function (e, t) {
              return "number" == typeof e
                ? 0 < e
                  ? goog.i18n.bidi.Dir.LTR
                  : 0 > e
                  ? goog.i18n.bidi.Dir.RTL
                  : t
                  ? null
                  : goog.i18n.bidi.Dir.NEUTRAL
                : null == e
                ? null
                : e
                ? goog.i18n.bidi.Dir.RTL
                : goog.i18n.bidi.Dir.LTR;
            }),
            (goog.i18n.bidi.ltrChars_ =
              "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ऀ-῿‎Ⰰ-\ud801\ud804-\ud839\ud83c-\udbff豈-﬜︀-﹯﻽-￿"),
            (goog.i18n.bidi.rtlChars_ =
              "֑-ۯۺ-ࣿ‏\ud802-\ud803\ud83a-\ud83bיִ-﷿ﹰ-ﻼ"),
            (goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g),
            (goog.i18n.bidi.stripHtmlIfNeeded_ = function (e, t) {
              return t ? e.replace(goog.i18n.bidi.htmlSkipReg_, "") : e;
            }),
            (goog.i18n.bidi.rtlCharReg_ = new RegExp(
              "[" + goog.i18n.bidi.rtlChars_ + "]"
            )),
            (goog.i18n.bidi.ltrCharReg_ = new RegExp(
              "[" + goog.i18n.bidi.ltrChars_ + "]"
            )),
            (goog.i18n.bidi.hasAnyRtl = function (e, t) {
              return goog.i18n.bidi.rtlCharReg_.test(
                goog.i18n.bidi.stripHtmlIfNeeded_(e, t)
              );
            }),
            (goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl),
            (goog.i18n.bidi.hasAnyLtr = function (e, t) {
              return goog.i18n.bidi.ltrCharReg_.test(
                goog.i18n.bidi.stripHtmlIfNeeded_(e, t)
              );
            }),
            (goog.i18n.bidi.ltrRe_ = new RegExp(
              "^[" + goog.i18n.bidi.ltrChars_ + "]"
            )),
            (goog.i18n.bidi.rtlRe_ = new RegExp(
              "^[" + goog.i18n.bidi.rtlChars_ + "]"
            )),
            (goog.i18n.bidi.isRtlChar = function (e) {
              return goog.i18n.bidi.rtlRe_.test(e);
            }),
            (goog.i18n.bidi.isLtrChar = function (e) {
              return goog.i18n.bidi.ltrRe_.test(e);
            }),
            (goog.i18n.bidi.isNeutralChar = function (e) {
              return (
                !goog.i18n.bidi.isLtrChar(e) && !goog.i18n.bidi.isRtlChar(e)
              );
            }),
            (goog.i18n.bidi.ltrDirCheckRe_ = new RegExp(
              "^[^" +
                goog.i18n.bidi.rtlChars_ +
                "]*[" +
                goog.i18n.bidi.ltrChars_ +
                "]"
            )),
            (goog.i18n.bidi.rtlDirCheckRe_ = new RegExp(
              "^[^" +
                goog.i18n.bidi.ltrChars_ +
                "]*[" +
                goog.i18n.bidi.rtlChars_ +
                "]"
            )),
            (goog.i18n.bidi.startsWithRtl = function (e, t) {
              return goog.i18n.bidi.rtlDirCheckRe_.test(
                goog.i18n.bidi.stripHtmlIfNeeded_(e, t)
              );
            }),
            (goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl),
            (goog.i18n.bidi.startsWithLtr = function (e, t) {
              return goog.i18n.bidi.ltrDirCheckRe_.test(
                goog.i18n.bidi.stripHtmlIfNeeded_(e, t)
              );
            }),
            (goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr),
            (goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/),
            (goog.i18n.bidi.isNeutralText = function (e, t) {
              return (
                (e = goog.i18n.bidi.stripHtmlIfNeeded_(e, t)),
                goog.i18n.bidi.isRequiredLtrRe_.test(e) ||
                  (!goog.i18n.bidi.hasAnyLtr(e) && !goog.i18n.bidi.hasAnyRtl(e))
              );
            }),
            (goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp(
              "[" +
                goog.i18n.bidi.ltrChars_ +
                "][^" +
                goog.i18n.bidi.rtlChars_ +
                "]*$"
            )),
            (goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp(
              "[" +
                goog.i18n.bidi.rtlChars_ +
                "][^" +
                goog.i18n.bidi.ltrChars_ +
                "]*$"
            )),
            (goog.i18n.bidi.endsWithLtr = function (e, t) {
              return goog.i18n.bidi.ltrExitDirCheckRe_.test(
                goog.i18n.bidi.stripHtmlIfNeeded_(e, t)
              );
            }),
            (goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr),
            (goog.i18n.bidi.endsWithRtl = function (e, t) {
              return goog.i18n.bidi.rtlExitDirCheckRe_.test(
                goog.i18n.bidi.stripHtmlIfNeeded_(e, t)
              );
            }),
            (goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl),
            (goog.i18n.bidi.rtlLocalesRe_ =
              /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i),
            (goog.i18n.bidi.isRtlLanguage = function (e) {
              return goog.i18n.bidi.rtlLocalesRe_.test(e);
            }),
            (goog.i18n.bidi.bracketGuardTextRe_ =
              /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g),
            (goog.i18n.bidi.guardBracketInText = function (e, t) {
              return (
                (t = (void 0 === t ? goog.i18n.bidi.hasAnyRtl(e) : t)
                  ? goog.i18n.bidi.Format.RLM
                  : goog.i18n.bidi.Format.LRM),
                e.replace(goog.i18n.bidi.bracketGuardTextRe_, t + "$&" + t)
              );
            }),
            (goog.i18n.bidi.enforceRtlInHtml = function (e) {
              return "<" == e.charAt(0)
                ? e.replace(/<\w+/, "$& dir=rtl")
                : "\n<span dir=rtl>" + e + "</span>";
            }),
            (goog.i18n.bidi.enforceRtlInText = function (e) {
              return goog.i18n.bidi.Format.RLE + e + goog.i18n.bidi.Format.PDF;
            }),
            (goog.i18n.bidi.enforceLtrInHtml = function (e) {
              return "<" == e.charAt(0)
                ? e.replace(/<\w+/, "$& dir=ltr")
                : "\n<span dir=ltr>" + e + "</span>";
            }),
            (goog.i18n.bidi.enforceLtrInText = function (e) {
              return goog.i18n.bidi.Format.LRE + e + goog.i18n.bidi.Format.PDF;
            }),
            (goog.i18n.bidi.dimensionsRe_ =
              /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g),
            (goog.i18n.bidi.leftRe_ = /left/gi),
            (goog.i18n.bidi.rightRe_ = /right/gi),
            (goog.i18n.bidi.tempRe_ = /%%%%/g),
            (goog.i18n.bidi.mirrorCSS = function (e) {
              return e
                .replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2")
                .replace(goog.i18n.bidi.leftRe_, "%%%%")
                .replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT)
                .replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT);
            }),
            (goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g),
            (goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g),
            (goog.i18n.bidi.normalizeHebrewQuote = function (e) {
              return e
                .replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1״")
                .replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1׳");
            }),
            (goog.i18n.bidi.wordSeparatorRe_ = /\s+/),
            (goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/),
            (goog.i18n.bidi.rtlDetectionThreshold_ = 0.4),
            (goog.i18n.bidi.estimateDirection = function (e, t) {
              var o = 0,
                r = 0,
                s = !1;
              for (
                e = goog.i18n.bidi
                  .stripHtmlIfNeeded_(e, t)
                  .split(goog.i18n.bidi.wordSeparatorRe_),
                  t = 0;
                t < e.length;
                t++
              ) {
                var i = e[t];
                goog.i18n.bidi.startsWithRtl(i)
                  ? (o++, r++)
                  : goog.i18n.bidi.isRequiredLtrRe_.test(i)
                  ? (s = !0)
                  : goog.i18n.bidi.hasAnyLtr(i)
                  ? r++
                  : goog.i18n.bidi.hasNumeralsRe_.test(i) && (s = !0);
              }
              return 0 == r
                ? s
                  ? goog.i18n.bidi.Dir.LTR
                  : goog.i18n.bidi.Dir.NEUTRAL
                : o / r > goog.i18n.bidi.rtlDetectionThreshold_
                ? goog.i18n.bidi.Dir.RTL
                : goog.i18n.bidi.Dir.LTR;
            }),
            (goog.i18n.bidi.detectRtlDirectionality = function (e, t) {
              return (
                goog.i18n.bidi.estimateDirection(e, t) == goog.i18n.bidi.Dir.RTL
              );
            }),
            (goog.i18n.bidi.setElementDirAndAlign = function (e, t) {
              e &&
                (t = goog.i18n.bidi.toDir(t)) &&
                ((e.style.textAlign =
                  t == goog.i18n.bidi.Dir.RTL
                    ? goog.i18n.bidi.RIGHT
                    : goog.i18n.bidi.LEFT),
                (e.dir = t == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr"));
            }),
            (goog.i18n.bidi.setElementDirByTextDirectionality = function (
              e,
              t
            ) {
              switch (goog.i18n.bidi.estimateDirection(t)) {
                case goog.i18n.bidi.Dir.LTR:
                  e.dir = "ltr";
                  break;
                case goog.i18n.bidi.Dir.RTL:
                  e.dir = "rtl";
                  break;
                default:
                  e.removeAttribute("dir");
              }
            }),
            (goog.i18n.bidi.DirectionalString = function () {}),
            (goog.html.TrustedResourceUrl = function () {
              (this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ =
                ""),
                (this.trustedURL_ = null),
                (this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
                  goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_);
            }),
            (goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString =
              !0),
            (goog.html.TrustedResourceUrl.prototype.getTypedStringValue =
              function () {
                return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_.toString();
              }),
            (goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString =
              !0),
            (goog.html.TrustedResourceUrl.prototype.getDirection = function () {
              return goog.i18n.bidi.Dir.LTR;
            }),
            (goog.html.TrustedResourceUrl.prototype.cloneWithParams = function (
              e,
              t
            ) {
              var o = goog.html.TrustedResourceUrl.unwrap(this),
                r =
                  (o =
                    goog.html.TrustedResourceUrl.URL_PARAM_PARSER_.exec(
                      o
                    ))[3] || "";
              return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(
                o[1] +
                  goog.html.TrustedResourceUrl.stringifyParams_(
                    "?",
                    o[2] || "",
                    e
                  ) +
                  goog.html.TrustedResourceUrl.stringifyParams_("#", r, t)
              );
            }),
            goog.DEBUG &&
              (goog.html.TrustedResourceUrl.prototype.toString = function () {
                return (
                  "TrustedResourceUrl{" +
                  this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ +
                  "}"
                );
              }),
            (goog.html.TrustedResourceUrl.unwrap = function (e) {
              return goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(
                e
              ).toString();
            }),
            (goog.html.TrustedResourceUrl.unwrapTrustedScriptURL = function (
              e
            ) {
              return e instanceof goog.html.TrustedResourceUrl &&
                e.constructor === goog.html.TrustedResourceUrl &&
                e.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ===
                  goog.html.TrustedResourceUrl
                    .TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
                ? e.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_
                : (goog.asserts.fail(
                    "expected object of type TrustedResourceUrl, got '" +
                      e +
                      "' of type " +
                      goog.typeOf(e)
                  ),
                  "type_error:TrustedResourceUrl");
            }),
            (goog.html.TrustedResourceUrl.unwrapTrustedURL = function (e) {
              return e.trustedURL_
                ? e.trustedURL_
                : goog.html.TrustedResourceUrl.unwrap(e);
            }),
            (goog.html.TrustedResourceUrl.format = function (e, t) {
              var o = goog.string.Const.unwrap(e);
              if (!goog.html.TrustedResourceUrl.BASE_URL_.test(o))
                throw Error("Invalid TrustedResourceUrl format: " + o);
              return (
                (e = o.replace(
                  goog.html.TrustedResourceUrl.FORMAT_MARKER_,
                  function (e, r) {
                    if (!Object.prototype.hasOwnProperty.call(t, r))
                      throw Error(
                        'Found marker, "' +
                          r +
                          '", in format string, "' +
                          o +
                          '", but no valid label mapping found in args: ' +
                          JSON.stringify(t)
                      );
                    return (e = t[r]) instanceof goog.string.Const
                      ? goog.string.Const.unwrap(e)
                      : encodeURIComponent(String(e));
                  }
                )),
                goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(
                  e
                )
              );
            }),
            (goog.html.TrustedResourceUrl.FORMAT_MARKER_ = /%{(\w+)}/g),
            (goog.html.TrustedResourceUrl.BASE_URL_ =
              /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i),
            (goog.html.TrustedResourceUrl.URL_PARAM_PARSER_ =
              /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/),
            (goog.html.TrustedResourceUrl.formatWithParams = function (
              e,
              t,
              o,
              r
            ) {
              return goog.html.TrustedResourceUrl.format(e, t).cloneWithParams(
                o,
                r
              );
            }),
            (goog.html.TrustedResourceUrl.fromConstant = function (e) {
              return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(
                goog.string.Const.unwrap(e)
              );
            }),
            (goog.html.TrustedResourceUrl.fromConstants = function (e) {
              for (var t = "", o = 0; o < e.length; o++)
                t += goog.string.Const.unwrap(e[o]);
              return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(
                t
              );
            }),
            (goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
              {}),
            (goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse =
              function (e) {
                var t = new goog.html.TrustedResourceUrl();
                return (
                  (t.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ =
                    goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY
                      ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScriptURL(
                          e
                        )
                      : e),
                  goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY &&
                    (t.trustedURL_ =
                      goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createURL(
                        e
                      )),
                  t
                );
              }),
            (goog.html.TrustedResourceUrl.stringifyParams_ = function (
              e,
              t,
              o
            ) {
              if (null == o) return t;
              if (goog.isString(o)) return o ? e + encodeURIComponent(o) : "";
              for (var r in o) {
                var s = o[r];
                s = goog.isArray(s) ? s : [s];
                for (var i = 0; i < s.length; i++) {
                  var n = s[i];
                  null != n &&
                    (t || (t = e),
                    (t +=
                      (t.length > e.length ? "&" : "") +
                      encodeURIComponent(r) +
                      "=" +
                      encodeURIComponent(String(n))));
                }
              }
              return t;
            }),
            (goog.html.SafeUrl = function () {
              (this.privateDoNotAccessOrElseSafeUrlWrappedValue_ = ""),
                (this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
                  goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_);
            }),
            (goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez"),
            (goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0),
            (goog.html.SafeUrl.prototype.getTypedStringValue = function () {
              return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();
            }),
            (goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString =
              !0),
            (goog.html.SafeUrl.prototype.getDirection = function () {
              return goog.i18n.bidi.Dir.LTR;
            }),
            goog.DEBUG &&
              (goog.html.SafeUrl.prototype.toString = function () {
                return (
                  "SafeUrl{" +
                  this.privateDoNotAccessOrElseSafeUrlWrappedValue_ +
                  "}"
                );
              }),
            (goog.html.SafeUrl.unwrap = function (e) {
              return goog.html.SafeUrl.unwrapTrustedURL(e).toString();
            }),
            (goog.html.SafeUrl.unwrapTrustedURL = function (e) {
              return e instanceof goog.html.SafeUrl &&
                e.constructor === goog.html.SafeUrl &&
                e.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ===
                  goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
                ? e.privateDoNotAccessOrElseSafeUrlWrappedValue_
                : (goog.asserts.fail(
                    "expected object of type SafeUrl, got '" +
                      e +
                      "' of type " +
                      goog.typeOf(e)
                  ),
                  "type_error:SafeUrl");
            }),
            (goog.html.SafeUrl.fromConstant = function (e) {
              return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                goog.string.Const.unwrap(e)
              );
            }),
            (goog.html.SAFE_MIME_TYPE_PATTERN_ =
              /^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-wav|wav|webm)|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|text\/csv|video\/(?:mpeg|mp4|ogg|webm|quicktime))(?:;\w+=(?:\w+|"[\w;=]+"))*$/i),
            (goog.html.SafeUrl.isSafeMimeType = function (e) {
              return goog.html.SAFE_MIME_TYPE_PATTERN_.test(e);
            }),
            (goog.html.SafeUrl.fromBlob = function (e) {
              return (
                (e = goog.html.SAFE_MIME_TYPE_PATTERN_.test(e.type)
                  ? goog.fs.url.createObjectUrl(e)
                  : goog.html.SafeUrl.INNOCUOUS_STRING),
                goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                  e
                )
              );
            }),
            (goog.html.DATA_URL_PATTERN_ =
              /^data:([^,]*);base64,[a-z0-9+\/]+=*$/i),
            (goog.html.SafeUrl.fromDataUrl = function (e) {
              var t = (e = e.replace(/(%0A|%0D)/g, "")).match(
                goog.html.DATA_URL_PATTERN_
              );
              return (
                (t = t && goog.html.SAFE_MIME_TYPE_PATTERN_.test(t[1])),
                goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                  t ? e : goog.html.SafeUrl.INNOCUOUS_STRING
                )
              );
            }),
            (goog.html.SafeUrl.fromTelUrl = function (e) {
              return (
                goog.string.internal.caseInsensitiveStartsWith(e, "tel:") ||
                  (e = goog.html.SafeUrl.INNOCUOUS_STRING),
                goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                  e
                )
              );
            }),
            (goog.html.SIP_URL_PATTERN_ =
              /^sip[s]?:[+a-z0-9_.!$%&'*\/=^`{|}~-]+@([a-z0-9-]+\.)+[a-z0-9]{2,63}$/i),
            (goog.html.SafeUrl.fromSipUrl = function (e) {
              return (
                goog.html.SIP_URL_PATTERN_.test(decodeURIComponent(e)) ||
                  (e = goog.html.SafeUrl.INNOCUOUS_STRING),
                goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                  e
                )
              );
            }),
            (goog.html.SafeUrl.fromFacebookMessengerUrl = function (e) {
              return (
                goog.string.internal.caseInsensitiveStartsWith(
                  e,
                  "fb-messenger://share"
                ) || (e = goog.html.SafeUrl.INNOCUOUS_STRING),
                goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                  e
                )
              );
            }),
            (goog.html.SafeUrl.fromWhatsAppUrl = function (e) {
              return (
                goog.string.internal.caseInsensitiveStartsWith(
                  e,
                  "whatsapp://send"
                ) || (e = goog.html.SafeUrl.INNOCUOUS_STRING),
                goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                  e
                )
              );
            }),
            (goog.html.SafeUrl.fromSmsUrl = function (e) {
              return (
                (goog.string.internal.caseInsensitiveStartsWith(e, "sms:") &&
                  goog.html.SafeUrl.isSmsUrlBodyValid_(e)) ||
                  (e = goog.html.SafeUrl.INNOCUOUS_STRING),
                goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                  e
                )
              );
            }),
            (goog.html.SafeUrl.isSmsUrlBodyValid_ = function (e) {
              var t = e.indexOf("#");
              if (
                (0 < t && (e = e.substring(0, t)),
                !(t = e.match(/[?&]body=/gi)))
              )
                return !0;
              if (1 < t.length) return !1;
              if (!(e = e.match(/[?&]body=([^&]*)/)[1])) return !0;
              try {
                decodeURIComponent(e);
              } catch (e) {
                return !1;
              }
              return /^(?:[a-z0-9\-_.~]|%[0-9a-f]{2})+$/i.test(e);
            }),
            (goog.html.SafeUrl.fromSshUrl = function (e) {
              return (
                goog.string.internal.caseInsensitiveStartsWith(e, "ssh://") ||
                  (e = goog.html.SafeUrl.INNOCUOUS_STRING),
                goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                  e
                )
              );
            }),
            (goog.html.SafeUrl.sanitizeChromeExtensionUrl = function (e, t) {
              return goog.html.SafeUrl.sanitizeExtensionUrl_(
                /^chrome-extension:\/\/([^\/]+)\//,
                e,
                t
              );
            }),
            (goog.html.SafeUrl.sanitizeFirefoxExtensionUrl = function (e, t) {
              return goog.html.SafeUrl.sanitizeExtensionUrl_(
                /^moz-extension:\/\/([^\/]+)\//,
                e,
                t
              );
            }),
            (goog.html.SafeUrl.sanitizeEdgeExtensionUrl = function (e, t) {
              return goog.html.SafeUrl.sanitizeExtensionUrl_(
                /^ms-browser-extension:\/\/([^\/]+)\//,
                e,
                t
              );
            }),
            (goog.html.SafeUrl.sanitizeExtensionUrl_ = function (e, t, o) {
              return (
                (e = e.exec(t))
                  ? ((e = e[1]),
                    -1 ==
                      (o instanceof goog.string.Const
                        ? [goog.string.Const.unwrap(o)]
                        : o.map(function (e) {
                            return goog.string.Const.unwrap(e);
                          })
                      ).indexOf(e) && (t = goog.html.SafeUrl.INNOCUOUS_STRING))
                  : (t = goog.html.SafeUrl.INNOCUOUS_STRING),
                goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                  t
                )
              );
            }),
            (goog.html.SafeUrl.fromTrustedResourceUrl = function (e) {
              return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                goog.html.TrustedResourceUrl.unwrap(e)
              );
            }),
            (goog.html.SAFE_URL_PATTERN_ =
              /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i),
            (goog.html.SafeUrl.SAFE_URL_PATTERN = goog.html.SAFE_URL_PATTERN_),
            (goog.html.SafeUrl.sanitize = function (e) {
              return e instanceof goog.html.SafeUrl
                ? e
                : ((e =
                    "object" == typeof e && e.implementsGoogStringTypedString
                      ? e.getTypedStringValue()
                      : String(e)),
                  goog.html.SAFE_URL_PATTERN_.test(e) ||
                    (e = goog.html.SafeUrl.INNOCUOUS_STRING),
                  goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                    e
                  ));
            }),
            (goog.html.SafeUrl.sanitizeAssertUnchanged = function (e, t) {
              return e instanceof goog.html.SafeUrl
                ? e
                : ((e =
                    "object" == typeof e && e.implementsGoogStringTypedString
                      ? e.getTypedStringValue()
                      : String(e)),
                  t &&
                  /^data:/i.test(e) &&
                  (t =
                    goog.html.SafeUrl.fromDataUrl(e)).getTypedStringValue() == e
                    ? t
                    : (goog.asserts.assert(
                        goog.html.SAFE_URL_PATTERN_.test(e),
                        "%s does not match the safe URL pattern",
                        e
                      ) || (e = goog.html.SafeUrl.INNOCUOUS_STRING),
                      goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                        e
                      )));
            }),
            (goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}),
            (goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse =
              function (e) {
                var t = new goog.html.SafeUrl();
                return (
                  (t.privateDoNotAccessOrElseSafeUrlWrappedValue_ = goog.html
                    .trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY
                    ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createURL(
                        e
                      )
                    : e),
                  t
                );
              }),
            (goog.html.SafeUrl.ABOUT_BLANK =
              goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                "about:blank"
              )),
            (goog.html.SafeStyle = function () {
              (this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = ""),
                (this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
                  goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_);
            }),
            (goog.html.SafeStyle.prototype.implementsGoogStringTypedString =
              !0),
            (goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}),
            (goog.html.SafeStyle.fromConstant = function (e) {
              return 0 === (e = goog.string.Const.unwrap(e)).length
                ? goog.html.SafeStyle.EMPTY
                : (goog.asserts.assert(
                    goog.string.internal.endsWith(e, ";"),
                    "Last character of style string is not ';': " + e
                  ),
                  goog.asserts.assert(
                    goog.string.internal.contains(e, ":"),
                    "Style string must contain at least one ':', to specify a \"name: value\" pair: " +
                      e
                  ),
                  goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(
                    e
                  ));
            }),
            (goog.html.SafeStyle.prototype.getTypedStringValue = function () {
              return this.privateDoNotAccessOrElseSafeStyleWrappedValue_;
            }),
            goog.DEBUG &&
              (goog.html.SafeStyle.prototype.toString = function () {
                return (
                  "SafeStyle{" +
                  this.privateDoNotAccessOrElseSafeStyleWrappedValue_ +
                  "}"
                );
              }),
            (goog.html.SafeStyle.unwrap = function (e) {
              return e instanceof goog.html.SafeStyle &&
                e.constructor === goog.html.SafeStyle &&
                e.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ===
                  goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
                ? e.privateDoNotAccessOrElseSafeStyleWrappedValue_
                : (goog.asserts.fail(
                    "expected object of type SafeStyle, got '" +
                      e +
                      "' of type " +
                      goog.typeOf(e)
                  ),
                  "type_error:SafeStyle");
            }),
            (goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse =
              function (e) {
                return new goog.html.SafeStyle().initSecurityPrivateDoNotAccessOrElse_(
                  e
                );
              }),
            (goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ =
              function (e) {
                return (
                  (this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = e),
                  this
                );
              }),
            (goog.html.SafeStyle.EMPTY =
              goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(
                ""
              )),
            (goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez"),
            (goog.html.SafeStyle.create = function (e) {
              var t,
                o = "";
              for (t in e) {
                if (!/^[-_a-zA-Z0-9]+$/.test(t))
                  throw Error("Name allows only [-_a-zA-Z0-9], got: " + t);
                var r = e[t];
                null != r &&
                  (o +=
                    t +
                    ":" +
                    (r = goog.isArray(r)
                      ? goog.array
                          .map(r, goog.html.SafeStyle.sanitizePropertyValue_)
                          .join(" ")
                      : goog.html.SafeStyle.sanitizePropertyValue_(r)) +
                    ";");
              }
              return o
                ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(
                    o
                  )
                : goog.html.SafeStyle.EMPTY;
            }),
            (goog.html.SafeStyle.sanitizePropertyValue_ = function (e) {
              if (e instanceof goog.html.SafeUrl)
                return (
                  'url("' +
                  goog.html.SafeUrl.unwrap(e)
                    .replace(/</g, "%3c")
                    .replace(/[\\"]/g, "\\$&") +
                  '")'
                );
              if (
                ((e =
                  e instanceof goog.string.Const
                    ? goog.string.Const.unwrap(e)
                    : goog.html.SafeStyle.sanitizePropertyValueString_(
                        String(e)
                      )),
                /[{;}]/.test(e))
              )
                throw new goog.asserts.AssertionError(
                  "Value does not allow [{;}], got: %s.",
                  [e]
                );
              return e;
            }),
            (goog.html.SafeStyle.sanitizePropertyValueString_ = function (e) {
              var t = e
                .replace(goog.html.SafeStyle.FUNCTIONS_RE_, "$1")
                .replace(goog.html.SafeStyle.FUNCTIONS_RE_, "$1")
                .replace(goog.html.SafeStyle.URL_RE_, "url");
              return goog.html.SafeStyle.VALUE_RE_.test(t)
                ? goog.html.SafeStyle.COMMENT_RE_.test(e)
                  ? (goog.asserts.fail(
                      "String value disallows comments, got: " + e
                    ),
                    goog.html.SafeStyle.INNOCUOUS_STRING)
                  : goog.html.SafeStyle.hasBalancedQuotes_(e)
                  ? goog.html.SafeStyle.hasBalancedSquareBrackets_(e)
                    ? goog.html.SafeStyle.sanitizeUrl_(e)
                    : (goog.asserts.fail(
                        "String value requires balanced square brackets and one identifier per pair of brackets, got: " +
                          e
                      ),
                      goog.html.SafeStyle.INNOCUOUS_STRING)
                  : (goog.asserts.fail(
                      "String value requires balanced quotes, got: " + e
                    ),
                    goog.html.SafeStyle.INNOCUOUS_STRING)
                : (goog.asserts.fail(
                    "String value allows only " +
                      goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ +
                      " and simple functions, got: " +
                      e
                  ),
                  goog.html.SafeStyle.INNOCUOUS_STRING);
            }),
            (goog.html.SafeStyle.hasBalancedQuotes_ = function (e) {
              for (var t = !0, o = !0, r = 0; r < e.length; r++) {
                var s = e.charAt(r);
                "'" == s && o ? (t = !t) : '"' == s && t && (o = !o);
              }
              return t && o;
            }),
            (goog.html.SafeStyle.hasBalancedSquareBrackets_ = function (e) {
              for (
                var t = !0, o = /^[-_a-zA-Z0-9]$/, r = 0;
                r < e.length;
                r++
              ) {
                var s = e.charAt(r);
                if ("]" == s) {
                  if (t) return !1;
                  t = !0;
                } else if ("[" == s) {
                  if (!t) return !1;
                  t = !1;
                } else if (!t && !o.test(s)) return !1;
              }
              return t;
            }),
            (goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ =
              "[-,.\"'%_!# a-zA-Z0-9\\[\\]]"),
            (goog.html.SafeStyle.VALUE_RE_ = new RegExp(
              "^" + goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ + "+$"
            )),
            (goog.html.SafeStyle.URL_RE_ =
              /\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g),
            (goog.html.SafeStyle.FUNCTIONS_RE_ =
              /\b(hsl|hsla|rgb|rgba|matrix|calc|minmax|fit-content|repeat|(rotate|scale|translate)(X|Y|Z|3d)?)\([-+*/0-9a-z.%\[\], ]+\)/g),
            (goog.html.SafeStyle.COMMENT_RE_ = /\/\*/),
            (goog.html.SafeStyle.sanitizeUrl_ = function (e) {
              return e.replace(
                goog.html.SafeStyle.URL_RE_,
                function (e, t, o, r) {
                  var s = "";
                  return (
                    (o = o.replace(/^(['"])(.*)\1$/, function (e, t, o) {
                      return (s = t), o;
                    })),
                    (e = goog.html.SafeUrl.sanitize(o).getTypedStringValue()),
                    t + s + e + s + r
                  );
                }
              );
            }),
            (goog.html.SafeStyle.concat = function (e) {
              var t = "",
                o = function (e) {
                  goog.isArray(e)
                    ? goog.array.forEach(e, o)
                    : (t += goog.html.SafeStyle.unwrap(e));
                };
              return (
                goog.array.forEach(arguments, o),
                t
                  ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(
                      t
                    )
                  : goog.html.SafeStyle.EMPTY
              );
            }),
            (goog.html.SafeScript = function () {
              (this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = ""),
                (this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
                  goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_);
            }),
            (goog.html.SafeScript.prototype.implementsGoogStringTypedString =
              !0),
            (goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}),
            (goog.html.SafeScript.fromConstant = function (e) {
              return 0 === (e = goog.string.Const.unwrap(e)).length
                ? goog.html.SafeScript.EMPTY
                : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(
                    e
                  );
            }),
            (goog.html.SafeScript.fromConstantAndArgs = function (e, t) {
              for (var o = [], r = 1; r < arguments.length; r++)
                o.push(goog.html.SafeScript.stringify_(arguments[r]));
              return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(
                "(" + goog.string.Const.unwrap(e) + ")(" + o.join(", ") + ");"
              );
            }),
            (goog.html.SafeScript.fromJson = function (e) {
              return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(
                goog.html.SafeScript.stringify_(e)
              );
            }),
            (goog.html.SafeScript.prototype.getTypedStringValue = function () {
              return this.privateDoNotAccessOrElseSafeScriptWrappedValue_.toString();
            }),
            goog.DEBUG &&
              (goog.html.SafeScript.prototype.toString = function () {
                return (
                  "SafeScript{" +
                  this.privateDoNotAccessOrElseSafeScriptWrappedValue_ +
                  "}"
                );
              }),
            (goog.html.SafeScript.unwrap = function (e) {
              return goog.html.SafeScript.unwrapTrustedScript(e).toString();
            }),
            (goog.html.SafeScript.unwrapTrustedScript = function (e) {
              return e instanceof goog.html.SafeScript &&
                e.constructor === goog.html.SafeScript &&
                e.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ===
                  goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
                ? e.privateDoNotAccessOrElseSafeScriptWrappedValue_
                : (goog.asserts.fail(
                    "expected object of type SafeScript, got '" +
                      e +
                      "' of type " +
                      goog.typeOf(e)
                  ),
                  "type_error:SafeScript");
            }),
            (goog.html.SafeScript.stringify_ = function (e) {
              return JSON.stringify(e).replace(/</g, "\\x3c");
            }),
            (goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse =
              function (e) {
                return new goog.html.SafeScript().initSecurityPrivateDoNotAccessOrElse_(
                  e
                );
              }),
            (goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ =
              function (e) {
                return (
                  (this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = goog
                    .html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY
                    ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScript(
                        e
                      )
                    : e),
                  this
                );
              }),
            (goog.html.SafeScript.EMPTY =
              goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(
                ""
              )),
            (goog.object = {}),
            (goog.object.is = function (e, t) {
              return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t;
            }),
            (goog.object.forEach = function (e, t, o) {
              for (var r in e) t.call(o, e[r], r, e);
            }),
            (goog.object.filter = function (e, t, o) {
              var r,
                s = {};
              for (r in e) t.call(o, e[r], r, e) && (s[r] = e[r]);
              return s;
            }),
            (goog.object.map = function (e, t, o) {
              var r,
                s = {};
              for (r in e) s[r] = t.call(o, e[r], r, e);
              return s;
            }),
            (goog.object.some = function (e, t, o) {
              for (var r in e) if (t.call(o, e[r], r, e)) return !0;
              return !1;
            }),
            (goog.object.every = function (e, t, o) {
              for (var r in e) if (!t.call(o, e[r], r, e)) return !1;
              return !0;
            }),
            (goog.object.getCount = function (e) {
              var t,
                o = 0;
              for (t in e) o++;
              return o;
            }),
            (goog.object.getAnyKey = function (e) {
              for (var t in e) return t;
            }),
            (goog.object.getAnyValue = function (e) {
              for (var t in e) return e[t];
            }),
            (goog.object.contains = function (e, t) {
              return goog.object.containsValue(e, t);
            }),
            (goog.object.getValues = function (e) {
              var t,
                o = [],
                r = 0;
              for (t in e) o[r++] = e[t];
              return o;
            }),
            (goog.object.getKeys = function (e) {
              var t,
                o = [],
                r = 0;
              for (t in e) o[r++] = t;
              return o;
            }),
            (goog.object.getValueByKeys = function (e, t) {
              var o = goog.isArrayLike(t),
                r = o ? t : arguments;
              for (o = o ? 0 : 1; o < r.length; o++) {
                if (null == e) return;
                e = e[r[o]];
              }
              return e;
            }),
            (goog.object.containsKey = function (e, t) {
              return null !== e && t in e;
            }),
            (goog.object.containsValue = function (e, t) {
              for (var o in e) if (e[o] == t) return !0;
              return !1;
            }),
            (goog.object.findKey = function (e, t, o) {
              for (var r in e) if (t.call(o, e[r], r, e)) return r;
            }),
            (goog.object.findValue = function (e, t, o) {
              return (t = goog.object.findKey(e, t, o)) && e[t];
            }),
            (goog.object.isEmpty = function (e) {
              for (var t in e) return !1;
              return !0;
            }),
            (goog.object.clear = function (e) {
              for (var t in e) delete e[t];
            }),
            (goog.object.remove = function (e, t) {
              var o;
              return (o = t in e) && delete e[t], o;
            }),
            (goog.object.add = function (e, t, o) {
              if (null !== e && t in e)
                throw Error('The object already contains the key "' + t + '"');
              goog.object.set(e, t, o);
            }),
            (goog.object.get = function (e, t, o) {
              return null !== e && t in e ? e[t] : o;
            }),
            (goog.object.set = function (e, t, o) {
              e[t] = o;
            }),
            (goog.object.setIfUndefined = function (e, t, o) {
              return t in e ? e[t] : (e[t] = o);
            }),
            (goog.object.setWithReturnValueIfNotSet = function (e, t, o) {
              return t in e ? e[t] : ((o = o()), (e[t] = o));
            }),
            (goog.object.equals = function (e, t) {
              for (var o in e) if (!(o in t) || e[o] !== t[o]) return !1;
              for (var r in t) if (!(r in e)) return !1;
              return !0;
            }),
            (goog.object.clone = function (e) {
              var t,
                o = {};
              for (t in e) o[t] = e[t];
              return o;
            }),
            (goog.object.unsafeClone = function (e) {
              var t = goog.typeOf(e);
              if ("object" == t || "array" == t) {
                if (goog.isFunction(e.clone)) return e.clone();
                for (var o in ((t = "array" == t ? [] : {}), e))
                  t[o] = goog.object.unsafeClone(e[o]);
                return t;
              }
              return e;
            }),
            (goog.object.transpose = function (e) {
              var t,
                o = {};
              for (t in e) o[e[t]] = t;
              return o;
            }),
            (goog.object.PROTOTYPE_FIELDS_ =
              "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
                " "
              )),
            (goog.object.extend = function (e, t) {
              for (var o, r, s = 1; s < arguments.length; s++) {
                for (o in (r = arguments[s])) e[o] = r[o];
                for (var i = 0; i < goog.object.PROTOTYPE_FIELDS_.length; i++)
                  (o = goog.object.PROTOTYPE_FIELDS_[i]),
                    Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
              }
            }),
            (goog.object.create = function (e) {
              var t = arguments.length;
              if (1 == t && goog.isArray(arguments[0]))
                return goog.object.create.apply(null, arguments[0]);
              if (t % 2) throw Error("Uneven number of arguments");
              for (var o = {}, r = 0; r < t; r += 2)
                o[arguments[r]] = arguments[r + 1];
              return o;
            }),
            (goog.object.createSet = function (e) {
              var t = arguments.length;
              if (1 == t && goog.isArray(arguments[0]))
                return goog.object.createSet.apply(null, arguments[0]);
              for (var o = {}, r = 0; r < t; r++) o[arguments[r]] = !0;
              return o;
            }),
            (goog.object.createImmutableView = function (e) {
              var t = e;
              return (
                Object.isFrozen &&
                  !Object.isFrozen(e) &&
                  ((t = Object.create(e)), Object.freeze(t)),
                t
              );
            }),
            (goog.object.isImmutableView = function (e) {
              return !!Object.isFrozen && Object.isFrozen(e);
            }),
            (goog.object.getAllPropertyNames = function (e, t, o) {
              if (!e) return [];
              if (!Object.getOwnPropertyNames || !Object.getPrototypeOf)
                return goog.object.getKeys(e);
              for (
                var r = {};
                e &&
                (e !== Object.prototype || t) &&
                (e !== Function.prototype || o);

              ) {
                for (
                  var s = Object.getOwnPropertyNames(e), i = 0;
                  i < s.length;
                  i++
                )
                  r[s[i]] = !0;
                e = Object.getPrototypeOf(e);
              }
              return goog.object.getKeys(r);
            }),
            (goog.object.getSuperClass = function (e) {
              return (e = Object.getPrototypeOf(e.prototype)) && e.constructor;
            }),
            (goog.html.SafeStyleSheet = function () {
              (this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = ""),
                (this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
                  goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_);
            }),
            (goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString =
              !0),
            (goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
              {}),
            (goog.html.SafeStyleSheet.createRule = function (e, t) {
              if (goog.string.internal.contains(e, "<"))
                throw Error("Selector does not allow '<', got: " + e);
              var o = e.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g, "");
              if (!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(o))
                throw Error(
                  "Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=^$|] and strings, got: " +
                    e
                );
              if (!goog.html.SafeStyleSheet.hasBalancedBrackets_(o))
                throw Error(
                  "() and [] in selector must be balanced, got: " + e
                );
              return (
                t instanceof goog.html.SafeStyle ||
                  (t = goog.html.SafeStyle.create(t)),
                (e =
                  e +
                  "{" +
                  goog.html.SafeStyle.unwrap(t).replace(/</g, "\\3C ") +
                  "}"),
                goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(
                  e
                )
              );
            }),
            (goog.html.SafeStyleSheet.hasBalancedBrackets_ = function (e) {
              for (
                var t = { "(": ")", "[": "]" }, o = [], r = 0;
                r < e.length;
                r++
              ) {
                var s = e[r];
                if (t[s]) o.push(t[s]);
                else if (goog.object.contains(t, s) && o.pop() != s) return !1;
              }
              return 0 == o.length;
            }),
            (goog.html.SafeStyleSheet.concat = function (e) {
              var t = "",
                o = function (e) {
                  goog.isArray(e)
                    ? goog.array.forEach(e, o)
                    : (t += goog.html.SafeStyleSheet.unwrap(e));
                };
              return (
                goog.array.forEach(arguments, o),
                goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(
                  t
                )
              );
            }),
            (goog.html.SafeStyleSheet.fromConstant = function (e) {
              return 0 === (e = goog.string.Const.unwrap(e)).length
                ? goog.html.SafeStyleSheet.EMPTY
                : (goog.asserts.assert(
                    !goog.string.internal.contains(e, "<"),
                    "Forbidden '<' character in style sheet string: " + e
                  ),
                  goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(
                    e
                  ));
            }),
            (goog.html.SafeStyleSheet.prototype.getTypedStringValue =
              function () {
                return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
              }),
            goog.DEBUG &&
              (goog.html.SafeStyleSheet.prototype.toString = function () {
                return (
                  "SafeStyleSheet{" +
                  this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ +
                  "}"
                );
              }),
            (goog.html.SafeStyleSheet.unwrap = function (e) {
              return e instanceof goog.html.SafeStyleSheet &&
                e.constructor === goog.html.SafeStyleSheet &&
                e.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ===
                  goog.html.SafeStyleSheet
                    .TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
                ? e.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_
                : (goog.asserts.fail(
                    "expected object of type SafeStyleSheet, got '" +
                      e +
                      "' of type " +
                      goog.typeOf(e)
                  ),
                  "type_error:SafeStyleSheet");
            }),
            (goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse =
              function (e) {
                return new goog.html.SafeStyleSheet().initSecurityPrivateDoNotAccessOrElse_(
                  e
                );
              }),
            (goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ =
              function (e) {
                return (
                  (this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ =
                    e),
                  this
                );
              }),
            (goog.html.SafeStyleSheet.EMPTY =
              goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(
                ""
              )),
            (goog.dom.tags = {}),
            (goog.dom.tags.VOID_TAGS_ = {
              area: !0,
              base: !0,
              br: !0,
              col: !0,
              command: !0,
              embed: !0,
              hr: !0,
              img: !0,
              input: !0,
              keygen: !0,
              link: !0,
              meta: !0,
              param: !0,
              source: !0,
              track: !0,
              wbr: !0,
            }),
            (goog.dom.tags.isVoidTag = function (e) {
              return !0 === goog.dom.tags.VOID_TAGS_[e];
            }),
            (goog.dom.HtmlElement = function () {}),
            (goog.dom.TagName = function (e) {
              this.tagName_ = e;
            }),
            (goog.dom.TagName.prototype.toString = function () {
              return this.tagName_;
            }),
            (goog.dom.TagName.A = new goog.dom.TagName("A")),
            (goog.dom.TagName.ABBR = new goog.dom.TagName("ABBR")),
            (goog.dom.TagName.ACRONYM = new goog.dom.TagName("ACRONYM")),
            (goog.dom.TagName.ADDRESS = new goog.dom.TagName("ADDRESS")),
            (goog.dom.TagName.APPLET = new goog.dom.TagName("APPLET")),
            (goog.dom.TagName.AREA = new goog.dom.TagName("AREA")),
            (goog.dom.TagName.ARTICLE = new goog.dom.TagName("ARTICLE")),
            (goog.dom.TagName.ASIDE = new goog.dom.TagName("ASIDE")),
            (goog.dom.TagName.AUDIO = new goog.dom.TagName("AUDIO")),
            (goog.dom.TagName.B = new goog.dom.TagName("B")),
            (goog.dom.TagName.BASE = new goog.dom.TagName("BASE")),
            (goog.dom.TagName.BASEFONT = new goog.dom.TagName("BASEFONT")),
            (goog.dom.TagName.BDI = new goog.dom.TagName("BDI")),
            (goog.dom.TagName.BDO = new goog.dom.TagName("BDO")),
            (goog.dom.TagName.BIG = new goog.dom.TagName("BIG")),
            (goog.dom.TagName.BLOCKQUOTE = new goog.dom.TagName("BLOCKQUOTE")),
            (goog.dom.TagName.BODY = new goog.dom.TagName("BODY")),
            (goog.dom.TagName.BR = new goog.dom.TagName("BR")),
            (goog.dom.TagName.BUTTON = new goog.dom.TagName("BUTTON")),
            (goog.dom.TagName.CANVAS = new goog.dom.TagName("CANVAS")),
            (goog.dom.TagName.CAPTION = new goog.dom.TagName("CAPTION")),
            (goog.dom.TagName.CENTER = new goog.dom.TagName("CENTER")),
            (goog.dom.TagName.CITE = new goog.dom.TagName("CITE")),
            (goog.dom.TagName.CODE = new goog.dom.TagName("CODE")),
            (goog.dom.TagName.COL = new goog.dom.TagName("COL")),
            (goog.dom.TagName.COLGROUP = new goog.dom.TagName("COLGROUP")),
            (goog.dom.TagName.COMMAND = new goog.dom.TagName("COMMAND")),
            (goog.dom.TagName.DATA = new goog.dom.TagName("DATA")),
            (goog.dom.TagName.DATALIST = new goog.dom.TagName("DATALIST")),
            (goog.dom.TagName.DD = new goog.dom.TagName("DD")),
            (goog.dom.TagName.DEL = new goog.dom.TagName("DEL")),
            (goog.dom.TagName.DETAILS = new goog.dom.TagName("DETAILS")),
            (goog.dom.TagName.DFN = new goog.dom.TagName("DFN")),
            (goog.dom.TagName.DIALOG = new goog.dom.TagName("DIALOG")),
            (goog.dom.TagName.DIR = new goog.dom.TagName("DIR")),
            (goog.dom.TagName.DIV = new goog.dom.TagName("DIV")),
            (goog.dom.TagName.DL = new goog.dom.TagName("DL")),
            (goog.dom.TagName.DT = new goog.dom.TagName("DT")),
            (goog.dom.TagName.EM = new goog.dom.TagName("EM")),
            (goog.dom.TagName.EMBED = new goog.dom.TagName("EMBED")),
            (goog.dom.TagName.FIELDSET = new goog.dom.TagName("FIELDSET")),
            (goog.dom.TagName.FIGCAPTION = new goog.dom.TagName("FIGCAPTION")),
            (goog.dom.TagName.FIGURE = new goog.dom.TagName("FIGURE")),
            (goog.dom.TagName.FONT = new goog.dom.TagName("FONT")),
            (goog.dom.TagName.FOOTER = new goog.dom.TagName("FOOTER")),
            (goog.dom.TagName.FORM = new goog.dom.TagName("FORM")),
            (goog.dom.TagName.FRAME = new goog.dom.TagName("FRAME")),
            (goog.dom.TagName.FRAMESET = new goog.dom.TagName("FRAMESET")),
            (goog.dom.TagName.H1 = new goog.dom.TagName("H1")),
            (goog.dom.TagName.H2 = new goog.dom.TagName("H2")),
            (goog.dom.TagName.H3 = new goog.dom.TagName("H3")),
            (goog.dom.TagName.H4 = new goog.dom.TagName("H4")),
            (goog.dom.TagName.H5 = new goog.dom.TagName("H5")),
            (goog.dom.TagName.H6 = new goog.dom.TagName("H6")),
            (goog.dom.TagName.HEAD = new goog.dom.TagName("HEAD")),
            (goog.dom.TagName.HEADER = new goog.dom.TagName("HEADER")),
            (goog.dom.TagName.HGROUP = new goog.dom.TagName("HGROUP")),
            (goog.dom.TagName.HR = new goog.dom.TagName("HR")),
            (goog.dom.TagName.HTML = new goog.dom.TagName("HTML")),
            (goog.dom.TagName.I = new goog.dom.TagName("I")),
            (goog.dom.TagName.IFRAME = new goog.dom.TagName("IFRAME")),
            (goog.dom.TagName.IMG = new goog.dom.TagName("IMG")),
            (goog.dom.TagName.INPUT = new goog.dom.TagName("INPUT")),
            (goog.dom.TagName.INS = new goog.dom.TagName("INS")),
            (goog.dom.TagName.ISINDEX = new goog.dom.TagName("ISINDEX")),
            (goog.dom.TagName.KBD = new goog.dom.TagName("KBD")),
            (goog.dom.TagName.KEYGEN = new goog.dom.TagName("KEYGEN")),
            (goog.dom.TagName.LABEL = new goog.dom.TagName("LABEL")),
            (goog.dom.TagName.LEGEND = new goog.dom.TagName("LEGEND")),
            (goog.dom.TagName.LI = new goog.dom.TagName("LI")),
            (goog.dom.TagName.LINK = new goog.dom.TagName("LINK")),
            (goog.dom.TagName.MAIN = new goog.dom.TagName("MAIN")),
            (goog.dom.TagName.MAP = new goog.dom.TagName("MAP")),
            (goog.dom.TagName.MARK = new goog.dom.TagName("MARK")),
            (goog.dom.TagName.MATH = new goog.dom.TagName("MATH")),
            (goog.dom.TagName.MENU = new goog.dom.TagName("MENU")),
            (goog.dom.TagName.MENUITEM = new goog.dom.TagName("MENUITEM")),
            (goog.dom.TagName.META = new goog.dom.TagName("META")),
            (goog.dom.TagName.METER = new goog.dom.TagName("METER")),
            (goog.dom.TagName.NAV = new goog.dom.TagName("NAV")),
            (goog.dom.TagName.NOFRAMES = new goog.dom.TagName("NOFRAMES")),
            (goog.dom.TagName.NOSCRIPT = new goog.dom.TagName("NOSCRIPT")),
            (goog.dom.TagName.OBJECT = new goog.dom.TagName("OBJECT")),
            (goog.dom.TagName.OL = new goog.dom.TagName("OL")),
            (goog.dom.TagName.OPTGROUP = new goog.dom.TagName("OPTGROUP")),
            (goog.dom.TagName.OPTION = new goog.dom.TagName("OPTION")),
            (goog.dom.TagName.OUTPUT = new goog.dom.TagName("OUTPUT")),
            (goog.dom.TagName.P = new goog.dom.TagName("P")),
            (goog.dom.TagName.PARAM = new goog.dom.TagName("PARAM")),
            (goog.dom.TagName.PICTURE = new goog.dom.TagName("PICTURE")),
            (goog.dom.TagName.PRE = new goog.dom.TagName("PRE")),
            (goog.dom.TagName.PROGRESS = new goog.dom.TagName("PROGRESS")),
            (goog.dom.TagName.Q = new goog.dom.TagName("Q")),
            (goog.dom.TagName.RP = new goog.dom.TagName("RP")),
            (goog.dom.TagName.RT = new goog.dom.TagName("RT")),
            (goog.dom.TagName.RTC = new goog.dom.TagName("RTC")),
            (goog.dom.TagName.RUBY = new goog.dom.TagName("RUBY")),
            (goog.dom.TagName.S = new goog.dom.TagName("S")),
            (goog.dom.TagName.SAMP = new goog.dom.TagName("SAMP")),
            (goog.dom.TagName.SCRIPT = new goog.dom.TagName("SCRIPT")),
            (goog.dom.TagName.SECTION = new goog.dom.TagName("SECTION")),
            (goog.dom.TagName.SELECT = new goog.dom.TagName("SELECT")),
            (goog.dom.TagName.SMALL = new goog.dom.TagName("SMALL")),
            (goog.dom.TagName.SOURCE = new goog.dom.TagName("SOURCE")),
            (goog.dom.TagName.SPAN = new goog.dom.TagName("SPAN")),
            (goog.dom.TagName.STRIKE = new goog.dom.TagName("STRIKE")),
            (goog.dom.TagName.STRONG = new goog.dom.TagName("STRONG")),
            (goog.dom.TagName.STYLE = new goog.dom.TagName("STYLE")),
            (goog.dom.TagName.SUB = new goog.dom.TagName("SUB")),
            (goog.dom.TagName.SUMMARY = new goog.dom.TagName("SUMMARY")),
            (goog.dom.TagName.SUP = new goog.dom.TagName("SUP")),
            (goog.dom.TagName.SVG = new goog.dom.TagName("SVG")),
            (goog.dom.TagName.TABLE = new goog.dom.TagName("TABLE")),
            (goog.dom.TagName.TBODY = new goog.dom.TagName("TBODY")),
            (goog.dom.TagName.TD = new goog.dom.TagName("TD")),
            (goog.dom.TagName.TEMPLATE = new goog.dom.TagName("TEMPLATE")),
            (goog.dom.TagName.TEXTAREA = new goog.dom.TagName("TEXTAREA")),
            (goog.dom.TagName.TFOOT = new goog.dom.TagName("TFOOT")),
            (goog.dom.TagName.TH = new goog.dom.TagName("TH")),
            (goog.dom.TagName.THEAD = new goog.dom.TagName("THEAD")),
            (goog.dom.TagName.TIME = new goog.dom.TagName("TIME")),
            (goog.dom.TagName.TITLE = new goog.dom.TagName("TITLE")),
            (goog.dom.TagName.TR = new goog.dom.TagName("TR")),
            (goog.dom.TagName.TRACK = new goog.dom.TagName("TRACK")),
            (goog.dom.TagName.TT = new goog.dom.TagName("TT")),
            (goog.dom.TagName.U = new goog.dom.TagName("U")),
            (goog.dom.TagName.UL = new goog.dom.TagName("UL")),
            (goog.dom.TagName.VAR = new goog.dom.TagName("VAR")),
            (goog.dom.TagName.VIDEO = new goog.dom.TagName("VIDEO")),
            (goog.dom.TagName.WBR = new goog.dom.TagName("WBR")),
            (goog.labs = {}),
            (goog.labs.userAgent = {}),
            (goog.labs.userAgent.util = {}),
            (goog.labs.userAgent.util.getNativeUserAgentString_ = function () {
              var e = goog.labs.userAgent.util.getNavigator_();
              return e && (e = e.userAgent) ? e : "";
            }),
            (goog.labs.userAgent.util.getNavigator_ = function () {
              return goog.global.navigator;
            }),
            (goog.labs.userAgent.util.userAgent_ =
              goog.labs.userAgent.util.getNativeUserAgentString_()),
            (goog.labs.userAgent.util.setUserAgent = function (e) {
              goog.labs.userAgent.util.userAgent_ =
                e || goog.labs.userAgent.util.getNativeUserAgentString_();
            }),
            (goog.labs.userAgent.util.getUserAgent = function () {
              return goog.labs.userAgent.util.userAgent_;
            }),
            (goog.labs.userAgent.util.matchUserAgent = function (e) {
              var t = goog.labs.userAgent.util.getUserAgent();
              return goog.string.internal.contains(t, e);
            }),
            (goog.labs.userAgent.util.matchUserAgentIgnoreCase = function (e) {
              var t = goog.labs.userAgent.util.getUserAgent();
              return goog.string.internal.caseInsensitiveContains(t, e);
            }),
            (goog.labs.userAgent.util.extractVersionTuples = function (e) {
              for (
                var t, o = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, r = [];
                (t = o.exec(e));

              )
                r.push([t[1], t[2], t[3] || void 0]);
              return r;
            }),
            (goog.labs.userAgent.browser = {}),
            (goog.labs.userAgent.browser.matchOpera_ = function () {
              return goog.labs.userAgent.util.matchUserAgent("Opera");
            }),
            (goog.labs.userAgent.browser.matchIE_ = function () {
              return (
                goog.labs.userAgent.util.matchUserAgent("Trident") ||
                goog.labs.userAgent.util.matchUserAgent("MSIE")
              );
            }),
            (goog.labs.userAgent.browser.matchEdgeHtml_ = function () {
              return goog.labs.userAgent.util.matchUserAgent("Edge");
            }),
            (goog.labs.userAgent.browser.matchEdgeChromium_ = function () {
              return goog.labs.userAgent.util.matchUserAgent("Edg/");
            }),
            (goog.labs.userAgent.browser.matchOperaChromium_ = function () {
              return goog.labs.userAgent.util.matchUserAgent("OPR");
            }),
            (goog.labs.userAgent.browser.matchFirefox_ = function () {
              return (
                goog.labs.userAgent.util.matchUserAgent("Firefox") ||
                goog.labs.userAgent.util.matchUserAgent("FxiOS")
              );
            }),
            (goog.labs.userAgent.browser.matchSafari_ = function () {
              return (
                goog.labs.userAgent.util.matchUserAgent("Safari") &&
                !(
                  goog.labs.userAgent.browser.matchChrome_() ||
                  goog.labs.userAgent.browser.matchCoast_() ||
                  goog.labs.userAgent.browser.matchOpera_() ||
                  goog.labs.userAgent.browser.matchEdgeHtml_() ||
                  goog.labs.userAgent.browser.matchEdgeChromium_() ||
                  goog.labs.userAgent.browser.matchOperaChromium_() ||
                  goog.labs.userAgent.browser.matchFirefox_() ||
                  goog.labs.userAgent.browser.isSilk() ||
                  goog.labs.userAgent.util.matchUserAgent("Android")
                )
              );
            }),
            (goog.labs.userAgent.browser.matchCoast_ = function () {
              return goog.labs.userAgent.util.matchUserAgent("Coast");
            }),
            (goog.labs.userAgent.browser.matchIosWebview_ = function () {
              return (
                (goog.labs.userAgent.util.matchUserAgent("iPad") ||
                  goog.labs.userAgent.util.matchUserAgent("iPhone")) &&
                !goog.labs.userAgent.browser.matchSafari_() &&
                !goog.labs.userAgent.browser.matchChrome_() &&
                !goog.labs.userAgent.browser.matchCoast_() &&
                !goog.labs.userAgent.browser.matchFirefox_() &&
                goog.labs.userAgent.util.matchUserAgent("AppleWebKit")
              );
            }),
            (goog.labs.userAgent.browser.matchChrome_ = function () {
              return (
                (goog.labs.userAgent.util.matchUserAgent("Chrome") ||
                  goog.labs.userAgent.util.matchUserAgent("CriOS")) &&
                !goog.labs.userAgent.browser.matchEdgeHtml_()
              );
            }),
            (goog.labs.userAgent.browser.matchAndroidBrowser_ = function () {
              return (
                goog.labs.userAgent.util.matchUserAgent("Android") &&
                !(
                  goog.labs.userAgent.browser.isChrome() ||
                  goog.labs.userAgent.browser.isFirefox() ||
                  goog.labs.userAgent.browser.isOpera() ||
                  goog.labs.userAgent.browser.isSilk()
                )
              );
            }),
            (goog.labs.userAgent.browser.isOpera =
              goog.labs.userAgent.browser.matchOpera_),
            (goog.labs.userAgent.browser.isIE =
              goog.labs.userAgent.browser.matchIE_),
            (goog.labs.userAgent.browser.isEdge =
              goog.labs.userAgent.browser.matchEdgeHtml_),
            (goog.labs.userAgent.browser.isEdgeChromium =
              goog.labs.userAgent.browser.matchEdgeChromium_),
            (goog.labs.userAgent.browser.isOperaChromium =
              goog.labs.userAgent.browser.matchOperaChromium_),
            (goog.labs.userAgent.browser.isFirefox =
              goog.labs.userAgent.browser.matchFirefox_),
            (goog.labs.userAgent.browser.isSafari =
              goog.labs.userAgent.browser.matchSafari_),
            (goog.labs.userAgent.browser.isCoast =
              goog.labs.userAgent.browser.matchCoast_),
            (goog.labs.userAgent.browser.isIosWebview =
              goog.labs.userAgent.browser.matchIosWebview_),
            (goog.labs.userAgent.browser.isChrome =
              goog.labs.userAgent.browser.matchChrome_),
            (goog.labs.userAgent.browser.isAndroidBrowser =
              goog.labs.userAgent.browser.matchAndroidBrowser_),
            (goog.labs.userAgent.browser.isSilk = function () {
              return goog.labs.userAgent.util.matchUserAgent("Silk");
            }),
            (goog.labs.userAgent.browser.getVersion = function () {
              function e(e) {
                return (e = goog.array.find(e, r)), o[e] || "";
              }
              var t = goog.labs.userAgent.util.getUserAgent();
              if (goog.labs.userAgent.browser.isIE())
                return goog.labs.userAgent.browser.getIEVersion_(t);
              t = goog.labs.userAgent.util.extractVersionTuples(t);
              var o = {};
              goog.array.forEach(t, function (e) {
                o[e[0]] = e[1];
              });
              var r = goog.partial(goog.object.containsKey, o);
              return goog.labs.userAgent.browser.isOpera()
                ? e(["Version", "Opera"])
                : goog.labs.userAgent.browser.isEdge()
                ? e(["Edge"])
                : goog.labs.userAgent.browser.isEdgeChromium()
                ? e(["Edg"])
                : goog.labs.userAgent.browser.isChrome()
                ? e(["Chrome", "CriOS"])
                : ((t = t[2]) && t[1]) || "";
            }),
            (goog.labs.userAgent.browser.isVersionOrHigher = function (e) {
              return (
                0 <=
                goog.string.internal.compareVersions(
                  goog.labs.userAgent.browser.getVersion(),
                  e
                )
              );
            }),
            (goog.labs.userAgent.browser.getIEVersion_ = function (e) {
              var t = /rv: *([\d\.]*)/.exec(e);
              if (t && t[1]) return t[1];
              t = "";
              var o = /MSIE +([\d\.]+)/.exec(e);
              if (o && o[1])
                if (((e = /Trident\/(\d.\d)/.exec(e)), "7.0" == o[1]))
                  if (e && e[1])
                    switch (e[1]) {
                      case "4.0":
                        t = "8.0";
                        break;
                      case "5.0":
                        t = "9.0";
                        break;
                      case "6.0":
                        t = "10.0";
                        break;
                      case "7.0":
                        t = "11.0";
                    }
                  else t = "7.0";
                else t = o[1];
              return t;
            }),
            (goog.html.SafeHtml = function () {
              (this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = ""),
                (this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
                  goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_),
                (this.dir_ = null);
            }),
            (goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString =
              !0),
            (goog.html.SafeHtml.prototype.getDirection = function () {
              return this.dir_;
            }),
            (goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0),
            (goog.html.SafeHtml.prototype.getTypedStringValue = function () {
              return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_.toString();
            }),
            goog.DEBUG &&
              (goog.html.SafeHtml.prototype.toString = function () {
                return (
                  "SafeHtml{" +
                  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ +
                  "}"
                );
              }),
            (goog.html.SafeHtml.unwrap = function (e) {
              return goog.html.SafeHtml.unwrapTrustedHTML(e).toString();
            }),
            (goog.html.SafeHtml.unwrapTrustedHTML = function (e) {
              return e instanceof goog.html.SafeHtml &&
                e.constructor === goog.html.SafeHtml &&
                e.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ===
                  goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
                ? e.privateDoNotAccessOrElseSafeHtmlWrappedValue_
                : (goog.asserts.fail(
                    "expected object of type SafeHtml, got '" +
                      e +
                      "' of type " +
                      goog.typeOf(e)
                  ),
                  "type_error:SafeHtml");
            }),
            (goog.html.SafeHtml.htmlEscape = function (e) {
              if (e instanceof goog.html.SafeHtml) return e;
              var t = "object" == typeof e,
                o = null;
              return (
                t &&
                  e.implementsGoogI18nBidiDirectionalString &&
                  (o = e.getDirection()),
                (e =
                  t && e.implementsGoogStringTypedString
                    ? e.getTypedStringValue()
                    : String(e)),
                goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                  goog.string.internal.htmlEscape(e),
                  o
                )
              );
            }),
            (goog.html.SafeHtml.htmlEscapePreservingNewlines = function (e) {
              return e instanceof goog.html.SafeHtml
                ? e
                : ((e = goog.html.SafeHtml.htmlEscape(e)),
                  goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                    goog.string.internal.newLineToBr(
                      goog.html.SafeHtml.unwrap(e)
                    ),
                    e.getDirection()
                  ));
            }),
            (goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces =
              function (e) {
                return e instanceof goog.html.SafeHtml
                  ? e
                  : ((e = goog.html.SafeHtml.htmlEscape(e)),
                    goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                      goog.string.internal.whitespaceEscape(
                        goog.html.SafeHtml.unwrap(e)
                      ),
                      e.getDirection()
                    ));
              }),
            (goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape),
            (goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/),
            (goog.html.SafeHtml.URL_ATTRIBUTES_ = {
              action: !0,
              cite: !0,
              data: !0,
              formaction: !0,
              href: !0,
              manifest: !0,
              poster: !0,
              src: !0,
            }),
            (goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = {
              APPLET: !0,
              BASE: !0,
              EMBED: !0,
              IFRAME: !0,
              LINK: !0,
              MATH: !0,
              META: !0,
              OBJECT: !0,
              SCRIPT: !0,
              STYLE: !0,
              SVG: !0,
              TEMPLATE: !0,
            }),
            (goog.html.SafeHtml.create = function (e, t, o) {
              return (
                goog.html.SafeHtml.verifyTagName(String(e)),
                goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(
                  String(e),
                  t,
                  o
                )
              );
            }),
            (goog.html.SafeHtml.verifyTagName = function (e) {
              if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(e))
                throw Error("Invalid tag name <" + e + ">.");
              if (e.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_)
                throw Error(
                  "Tag name <" + e + "> is not allowed for SafeHtml."
                );
            }),
            (goog.html.SafeHtml.createIframe = function (e, t, o, r) {
              e && goog.html.TrustedResourceUrl.unwrap(e);
              var s = {};
              return (
                (s.src = e || null),
                (s.srcdoc = t && goog.html.SafeHtml.unwrap(t)),
                (e = goog.html.SafeHtml.combineAttributes(
                  s,
                  { sandbox: "" },
                  o
                )),
                goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(
                  "iframe",
                  e,
                  r
                )
              );
            }),
            (goog.html.SafeHtml.createSandboxIframe = function (e, t, o, r) {
              if (!goog.html.SafeHtml.canUseSandboxIframe())
                throw Error("The browser does not support sandboxed iframes.");
              var s = {};
              return (
                (s.src = e
                  ? goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(e))
                  : null),
                (s.srcdoc = t || null),
                (s.sandbox = ""),
                (e = goog.html.SafeHtml.combineAttributes(s, {}, o)),
                goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(
                  "iframe",
                  e,
                  r
                )
              );
            }),
            (goog.html.SafeHtml.canUseSandboxIframe = function () {
              return (
                goog.global.HTMLIFrameElement &&
                "sandbox" in goog.global.HTMLIFrameElement.prototype
              );
            }),
            (goog.html.SafeHtml.createScriptSrc = function (e, t) {
              return (
                goog.html.TrustedResourceUrl.unwrap(e),
                (e = goog.html.SafeHtml.combineAttributes({ src: e }, {}, t)),
                goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(
                  "script",
                  e
                )
              );
            }),
            (goog.html.SafeHtml.createScript = function (e, t) {
              for (var o in t) {
                var r = o.toLowerCase();
                if ("language" == r || "src" == r || "text" == r || "type" == r)
                  throw Error('Cannot set "' + r + '" attribute');
              }
              for (o = "", e = goog.array.concat(e), r = 0; r < e.length; r++)
                o += goog.html.SafeScript.unwrap(e[r]);
              return (
                (e =
                  goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                    o,
                    goog.i18n.bidi.Dir.NEUTRAL
                  )),
                goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(
                  "script",
                  t,
                  e
                )
              );
            }),
            (goog.html.SafeHtml.createStyle = function (e, t) {
              t = goog.html.SafeHtml.combineAttributes(
                { type: "text/css" },
                {},
                t
              );
              var o = "";
              e = goog.array.concat(e);
              for (var r = 0; r < e.length; r++)
                o += goog.html.SafeStyleSheet.unwrap(e[r]);
              return (
                (e =
                  goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                    o,
                    goog.i18n.bidi.Dir.NEUTRAL
                  )),
                goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(
                  "style",
                  t,
                  e
                )
              );
            }),
            (goog.html.SafeHtml.createMetaRefresh = function (e, t) {
              return (
                (e = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(e))),
                (goog.labs.userAgent.browser.isIE() ||
                  goog.labs.userAgent.browser.isEdge()) &&
                  goog.string.internal.contains(e, ";") &&
                  (e = "'" + e.replace(/'/g, "%27") + "'"),
                goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(
                  "meta",
                  { "http-equiv": "refresh", content: (t || 0) + "; url=" + e }
                )
              );
            }),
            (goog.html.SafeHtml.getAttrNameAndValue_ = function (e, t, o) {
              if (o instanceof goog.string.Const)
                o = goog.string.Const.unwrap(o);
              else if ("style" == t.toLowerCase())
                o = goog.html.SafeHtml.getStyleValue_(o);
              else {
                if (/^on/i.test(t))
                  throw Error(
                    'Attribute "' +
                      t +
                      '" requires goog.string.Const value, "' +
                      o +
                      '" given.'
                  );
                if (t.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_)
                  if (o instanceof goog.html.TrustedResourceUrl)
                    o = goog.html.TrustedResourceUrl.unwrap(o);
                  else if (o instanceof goog.html.SafeUrl)
                    o = goog.html.SafeUrl.unwrap(o);
                  else {
                    if (!goog.isString(o))
                      throw Error(
                        'Attribute "' +
                          t +
                          '" on tag "' +
                          e +
                          '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' +
                          o +
                          '" given.'
                      );
                    o = goog.html.SafeUrl.sanitize(o).getTypedStringValue();
                  }
              }
              return (
                o.implementsGoogStringTypedString &&
                  (o = o.getTypedStringValue()),
                goog.asserts.assert(
                  goog.isString(o) || goog.isNumber(o),
                  "String or number value expected, got " +
                    typeof o +
                    " with value: " +
                    o
                ),
                t + '="' + goog.string.internal.htmlEscape(String(o)) + '"'
              );
            }),
            (goog.html.SafeHtml.getStyleValue_ = function (e) {
              if (!goog.isObject(e))
                throw Error(
                  'The "style" attribute requires goog.html.SafeStyle or map of style properties, ' +
                    typeof e +
                    " given: " +
                    e
                );
              return (
                e instanceof goog.html.SafeStyle ||
                  (e = goog.html.SafeStyle.create(e)),
                goog.html.SafeStyle.unwrap(e)
              );
            }),
            (goog.html.SafeHtml.createWithDir = function (e, t, o, r) {
              return ((t = goog.html.SafeHtml.create(t, o, r)).dir_ = e), t;
            }),
            (goog.html.SafeHtml.join = function (e, t) {
              var o = (e = goog.html.SafeHtml.htmlEscape(e)).getDirection(),
                r = [],
                s = function (e) {
                  goog.isArray(e)
                    ? goog.array.forEach(e, s)
                    : ((e = goog.html.SafeHtml.htmlEscape(e)),
                      r.push(goog.html.SafeHtml.unwrap(e)),
                      (e = e.getDirection()),
                      o == goog.i18n.bidi.Dir.NEUTRAL
                        ? (o = e)
                        : e != goog.i18n.bidi.Dir.NEUTRAL &&
                          o != e &&
                          (o = null));
                };
              return (
                goog.array.forEach(t, s),
                goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                  r.join(goog.html.SafeHtml.unwrap(e)),
                  o
                )
              );
            }),
            (goog.html.SafeHtml.concat = function (e) {
              return goog.html.SafeHtml.join(
                goog.html.SafeHtml.EMPTY,
                Array.prototype.slice.call(arguments)
              );
            }),
            (goog.html.SafeHtml.concatWithDir = function (e, t) {
              var o = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
              return (o.dir_ = e), o;
            }),
            (goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}),
            (goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse =
              function (e, t) {
                return new goog.html.SafeHtml().initSecurityPrivateDoNotAccessOrElse_(
                  e,
                  t
                );
              }),
            (goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ =
              function (e, t) {
                return (
                  (this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = goog
                    .html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY
                    ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createHTML(
                        e
                      )
                    : e),
                  (this.dir_ = t),
                  this
                );
              }),
            (goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse =
              function (e, t, o) {
                var r = null,
                  s = "<" + e + goog.html.SafeHtml.stringifyAttributes(e, t);
                return (
                  goog.isDefAndNotNull(o)
                    ? goog.isArray(o) || (o = [o])
                    : (o = []),
                  goog.dom.tags.isVoidTag(e.toLowerCase())
                    ? (goog.asserts.assert(
                        !o.length,
                        "Void tag <" + e + "> does not allow content."
                      ),
                      (s += ">"))
                    : ((r = goog.html.SafeHtml.concat(o)),
                      (s +=
                        ">" + goog.html.SafeHtml.unwrap(r) + "</" + e + ">"),
                      (r = r.getDirection())),
                  (e = t && t.dir) &&
                    (r = /^(ltr|rtl|auto)$/i.test(e)
                      ? goog.i18n.bidi.Dir.NEUTRAL
                      : null),
                  goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                    s,
                    r
                  )
                );
              }),
            (goog.html.SafeHtml.stringifyAttributes = function (e, t) {
              var o = "";
              if (t)
                for (var r in t) {
                  if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(r))
                    throw Error('Invalid attribute name "' + r + '".');
                  var s = t[r];
                  goog.isDefAndNotNull(s) &&
                    (o +=
                      " " + goog.html.SafeHtml.getAttrNameAndValue_(e, r, s));
                }
              return o;
            }),
            (goog.html.SafeHtml.combineAttributes = function (e, t, o) {
              var r,
                s = {};
              for (r in e)
                goog.asserts.assert(r.toLowerCase() == r, "Must be lower case"),
                  (s[r] = e[r]);
              for (r in t)
                goog.asserts.assert(r.toLowerCase() == r, "Must be lower case"),
                  (s[r] = t[r]);
              for (r in o) {
                var i = r.toLowerCase();
                if (i in e)
                  throw Error(
                    'Cannot override "' +
                      i +
                      '" attribute, got "' +
                      r +
                      '" with value "' +
                      o[r] +
                      '"'
                  );
                i in t && delete s[i], (s[r] = o[r]);
              }
              return s;
            }),
            (goog.html.SafeHtml.DOCTYPE_HTML =
              goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                "<!DOCTYPE html>",
                goog.i18n.bidi.Dir.NEUTRAL
              )),
            (goog.html.SafeHtml.EMPTY =
              goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                "",
                goog.i18n.bidi.Dir.NEUTRAL
              )),
            (goog.html.SafeHtml.BR =
              goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                "<br>",
                goog.i18n.bidi.Dir.NEUTRAL
              )),
            (goog.html.uncheckedconversions = {}),
            (goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract =
              function (e, t, o) {
                return (
                  goog.asserts.assertString(
                    goog.string.Const.unwrap(e),
                    "must provide justification"
                  ),
                  goog.asserts.assert(
                    !goog.string.internal.isEmptyOrWhitespace(
                      goog.string.Const.unwrap(e)
                    ),
                    "must provide non-empty justification"
                  ),
                  goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                    t,
                    o || null
                  )
                );
              }),
            (goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract =
              function (e, t) {
                return (
                  goog.asserts.assertString(
                    goog.string.Const.unwrap(e),
                    "must provide justification"
                  ),
                  goog.asserts.assert(
                    !goog.string.internal.isEmptyOrWhitespace(
                      goog.string.Const.unwrap(e)
                    ),
                    "must provide non-empty justification"
                  ),
                  goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(
                    t
                  )
                );
              }),
            (goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract =
              function (e, t) {
                return (
                  goog.asserts.assertString(
                    goog.string.Const.unwrap(e),
                    "must provide justification"
                  ),
                  goog.asserts.assert(
                    !goog.string.internal.isEmptyOrWhitespace(
                      goog.string.Const.unwrap(e)
                    ),
                    "must provide non-empty justification"
                  ),
                  goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(
                    t
                  )
                );
              }),
            (goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract =
              function (e, t) {
                return (
                  goog.asserts.assertString(
                    goog.string.Const.unwrap(e),
                    "must provide justification"
                  ),
                  goog.asserts.assert(
                    !goog.string.internal.isEmptyOrWhitespace(
                      goog.string.Const.unwrap(e)
                    ),
                    "must provide non-empty justification"
                  ),
                  goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(
                    t
                  )
                );
              }),
            (goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract =
              function (e, t) {
                return (
                  goog.asserts.assertString(
                    goog.string.Const.unwrap(e),
                    "must provide justification"
                  ),
                  goog.asserts.assert(
                    !goog.string.internal.isEmptyOrWhitespace(
                      goog.string.Const.unwrap(e)
                    ),
                    "must provide non-empty justification"
                  ),
                  goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                    t
                  )
                );
              }),
            (goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract =
              function (e, t) {
                return (
                  goog.asserts.assertString(
                    goog.string.Const.unwrap(e),
                    "must provide justification"
                  ),
                  goog.asserts.assert(
                    !goog.string.internal.isEmptyOrWhitespace(
                      goog.string.Const.unwrap(e)
                    ),
                    "must provide non-empty justification"
                  ),
                  goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(
                    t
                  )
                );
              }),
            (goog.dom.asserts = {}),
            (goog.dom.asserts.assertIsLocation = function (e) {
              if (goog.asserts.ENABLE_ASSERTS) {
                var t = goog.dom.asserts.getWindow_(e);
                t &&
                  (!e ||
                    (!(e instanceof t.Location) && e instanceof t.Element)) &&
                  goog.asserts.fail(
                    "Argument is not a Location (or a non-Element mock); got: %s",
                    goog.dom.asserts.debugStringForType_(e)
                  );
              }
              return e;
            }),
            (goog.dom.asserts.assertIsElementType_ = function (e, t) {
              if (goog.asserts.ENABLE_ASSERTS) {
                var o = goog.dom.asserts.getWindow_(e);
                o &&
                  void 0 !== o[t] &&
                  ((e &&
                    (e instanceof o[t] ||
                      !(e instanceof o.Location || e instanceof o.Element))) ||
                    goog.asserts.fail(
                      "Argument is not a %s (or a non-Element, non-Location mock); got: %s",
                      t,
                      goog.dom.asserts.debugStringForType_(e)
                    ));
              }
              return e;
            }),
            (goog.dom.asserts.assertIsHTMLAnchorElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLAnchorElement"
              );
            }),
            (goog.dom.asserts.assertIsHTMLButtonElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLButtonElement"
              );
            }),
            (goog.dom.asserts.assertIsHTMLLinkElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLLinkElement"
              );
            }),
            (goog.dom.asserts.assertIsHTMLImageElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLImageElement"
              );
            }),
            (goog.dom.asserts.assertIsHTMLAudioElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLAudioElement"
              );
            }),
            (goog.dom.asserts.assertIsHTMLVideoElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLVideoElement"
              );
            }),
            (goog.dom.asserts.assertIsHTMLInputElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLInputElement"
              );
            }),
            (goog.dom.asserts.assertIsHTMLTextAreaElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLTextAreaElement"
              );
            }),
            (goog.dom.asserts.assertIsHTMLCanvasElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLCanvasElement"
              );
            }),
            (goog.dom.asserts.assertIsHTMLEmbedElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLEmbedElement"
              );
            }),
            (goog.dom.asserts.assertIsHTMLFormElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLFormElement"
              );
            }),
            (goog.dom.asserts.assertIsHTMLFrameElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLFrameElement"
              );
            }),
            (goog.dom.asserts.assertIsHTMLIFrameElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLIFrameElement"
              );
            }),
            (goog.dom.asserts.assertIsHTMLObjectElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLObjectElement"
              );
            }),
            (goog.dom.asserts.assertIsHTMLScriptElement = function (e) {
              return goog.dom.asserts.assertIsElementType_(
                e,
                "HTMLScriptElement"
              );
            }),
            (goog.dom.asserts.debugStringForType_ = function (e) {
              if (!goog.isObject(e))
                return void 0 === e
                  ? "undefined"
                  : null === e
                  ? "null"
                  : typeof e;
              try {
                return (
                  e.constructor.displayName ||
                  e.constructor.name ||
                  Object.prototype.toString.call(e)
                );
              } catch (e) {
                return "<object could not be stringified>";
              }
            }),
            (goog.dom.asserts.getWindow_ = function (e) {
              try {
                var t = e && e.ownerDocument,
                  o = t && (t.defaultView || t.parentWindow);
                if ((o = o || goog.global).Element && o.Location) return o;
              } catch (e) {}
              return null;
            }),
            (goog.functions = {}),
            (goog.functions.constant = function (e) {
              return function () {
                return e;
              };
            }),
            (goog.functions.FALSE = function () {
              return !1;
            }),
            (goog.functions.TRUE = function () {
              return !0;
            }),
            (goog.functions.NULL = function () {
              return null;
            }),
            (goog.functions.identity = function (e, t) {
              return e;
            }),
            (goog.functions.error = function (e) {
              return function () {
                throw Error(e);
              };
            }),
            (goog.functions.fail = function (e) {
              return function () {
                throw e;
              };
            }),
            (goog.functions.lock = function (e, t) {
              return (
                (t = t || 0),
                function () {
                  return e.apply(
                    this,
                    Array.prototype.slice.call(arguments, 0, t)
                  );
                }
              );
            }),
            (goog.functions.nth = function (e) {
              return function () {
                return arguments[e];
              };
            }),
            (goog.functions.partialRight = function (e, t) {
              var o = Array.prototype.slice.call(arguments, 1);
              return function () {
                var t = Array.prototype.slice.call(arguments);
                return t.push.apply(t, o), e.apply(this, t);
              };
            }),
            (goog.functions.withReturnValue = function (e, t) {
              return goog.functions.sequence(e, goog.functions.constant(t));
            }),
            (goog.functions.equalTo = function (e, t) {
              return function (o) {
                return t ? e == o : e === o;
              };
            }),
            (goog.functions.compose = function (e, t) {
              var o = arguments,
                r = o.length;
              return function () {
                var e;
                r && (e = o[r - 1].apply(this, arguments));
                for (var t = r - 2; 0 <= t; t--) e = o[t].call(this, e);
                return e;
              };
            }),
            (goog.functions.sequence = function (e) {
              var t = arguments,
                o = t.length;
              return function () {
                for (var e, r = 0; r < o; r++) e = t[r].apply(this, arguments);
                return e;
              };
            }),
            (goog.functions.and = function (e) {
              var t = arguments,
                o = t.length;
              return function () {
                for (var e = 0; e < o; e++)
                  if (!t[e].apply(this, arguments)) return !1;
                return !0;
              };
            }),
            (goog.functions.or = function (e) {
              var t = arguments,
                o = t.length;
              return function () {
                for (var e = 0; e < o; e++)
                  if (t[e].apply(this, arguments)) return !0;
                return !1;
              };
            }),
            (goog.functions.not = function (e) {
              return function () {
                return !e.apply(this, arguments);
              };
            }),
            (goog.functions.create = function (e, t) {
              var o = function () {};
              return (
                (o.prototype = e.prototype),
                (o = new o()),
                e.apply(o, Array.prototype.slice.call(arguments, 1)),
                o
              );
            }),
            (goog.functions.CACHE_RETURN_VALUE = !0),
            (goog.functions.cacheReturnValue = function (e) {
              var t,
                o = !1;
              return function () {
                return goog.functions.CACHE_RETURN_VALUE
                  ? (o || ((t = e()), (o = !0)), t)
                  : e();
              };
            }),
            (goog.functions.once = function (e) {
              var t = e;
              return function () {
                if (t) {
                  var e = t;
                  (t = null), e();
                }
              };
            }),
            (goog.functions.debounce = function (e, t, o) {
              var r = 0;
              return function (s) {
                goog.global.clearTimeout(r);
                var i = arguments;
                r = goog.global.setTimeout(function () {
                  e.apply(o, i);
                }, t);
              };
            }),
            (goog.functions.throttle = function (e, t, o) {
              var r = 0,
                s = !1,
                i = [],
                n = function () {
                  (r = 0), s && ((s = !1), a());
                },
                a = function () {
                  (r = goog.global.setTimeout(n, t)), e.apply(o, i);
                };
              return function (e) {
                (i = arguments), r ? (s = !0) : a();
              };
            }),
            (goog.functions.rateLimit = function (e, t, o) {
              var r = 0,
                s = function () {
                  r = 0;
                };
              return function (i) {
                r ||
                  ((r = goog.global.setTimeout(s, t)), e.apply(o, arguments));
              };
            }),
            (goog.dom.safe = {}),
            (goog.dom.safe.InsertAdjacentHtmlPosition = {
              AFTERBEGIN: "afterbegin",
              AFTEREND: "afterend",
              BEFOREBEGIN: "beforebegin",
              BEFOREEND: "beforeend",
            }),
            (goog.dom.safe.insertAdjacentHtml = function (e, t, o) {
              e.insertAdjacentHTML(t, goog.html.SafeHtml.unwrapTrustedHTML(o));
            }),
            (goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_ = {
              MATH: !0,
              SCRIPT: !0,
              STYLE: !0,
              SVG: !0,
              TEMPLATE: !0,
            }),
            (goog.dom.safe.isInnerHtmlCleanupRecursive_ =
              goog.functions.cacheReturnValue(function () {
                if (goog.DEBUG && "undefined" == typeof document) return !1;
                var e = document.createElement("div"),
                  t = document.createElement("div");
                return (
                  t.appendChild(document.createElement("div")),
                  e.appendChild(t),
                  !(goog.DEBUG && !e.firstChild) &&
                    ((t = e.firstChild.firstChild),
                    (e.innerHTML = goog.html.SafeHtml.unwrapTrustedHTML(
                      goog.html.SafeHtml.EMPTY
                    )),
                    !t.parentElement)
                );
              })),
            (goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse = function (e, t) {
              if (goog.dom.safe.isInnerHtmlCleanupRecursive_())
                for (; e.lastChild; ) e.removeChild(e.lastChild);
              e.innerHTML = goog.html.SafeHtml.unwrapTrustedHTML(t);
            }),
            (goog.dom.safe.setInnerHtml = function (e, t) {
              if (goog.asserts.ENABLE_ASSERTS) {
                var o = e.tagName.toUpperCase();
                if (goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_[o])
                  throw Error(
                    "goog.dom.safe.setInnerHtml cannot be used to set content of " +
                      e.tagName +
                      "."
                  );
              }
              goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse(e, t);
            }),
            (goog.dom.safe.setOuterHtml = function (e, t) {
              e.outerHTML = goog.html.SafeHtml.unwrapTrustedHTML(t);
            }),
            (goog.dom.safe.setFormElementAction = function (e, t) {
              (t =
                t instanceof goog.html.SafeUrl
                  ? t
                  : goog.html.SafeUrl.sanitizeAssertUnchanged(t)),
                (goog.dom.asserts.assertIsHTMLFormElement(e).action =
                  goog.html.SafeUrl.unwrapTrustedURL(t));
            }),
            (goog.dom.safe.setButtonFormAction = function (e, t) {
              (t =
                t instanceof goog.html.SafeUrl
                  ? t
                  : goog.html.SafeUrl.sanitizeAssertUnchanged(t)),
                (goog.dom.asserts.assertIsHTMLButtonElement(e).formAction =
                  goog.html.SafeUrl.unwrapTrustedURL(t));
            }),
            (goog.dom.safe.setInputFormAction = function (e, t) {
              (t =
                t instanceof goog.html.SafeUrl
                  ? t
                  : goog.html.SafeUrl.sanitizeAssertUnchanged(t)),
                (goog.dom.asserts.assertIsHTMLInputElement(e).formAction =
                  goog.html.SafeUrl.unwrapTrustedURL(t));
            }),
            (goog.dom.safe.setStyle = function (e, t) {
              e.style.cssText = goog.html.SafeStyle.unwrap(t);
            }),
            (goog.dom.safe.documentWrite = function (e, t) {
              e.write(goog.html.SafeHtml.unwrapTrustedHTML(t));
            }),
            (goog.dom.safe.setAnchorHref = function (e, t) {
              goog.dom.asserts.assertIsHTMLAnchorElement(e),
                (t =
                  t instanceof goog.html.SafeUrl
                    ? t
                    : goog.html.SafeUrl.sanitizeAssertUnchanged(t)),
                (e.href = goog.html.SafeUrl.unwrapTrustedURL(t));
            }),
            (goog.dom.safe.setImageSrc = function (e, t) {
              if (
                (goog.dom.asserts.assertIsHTMLImageElement(e),
                !(t instanceof goog.html.SafeUrl))
              ) {
                var o = /^data:image\//i.test(t);
                t = goog.html.SafeUrl.sanitizeAssertUnchanged(t, o);
              }
              e.src = goog.html.SafeUrl.unwrapTrustedURL(t);
            }),
            (goog.dom.safe.setAudioSrc = function (e, t) {
              if (
                (goog.dom.asserts.assertIsHTMLAudioElement(e),
                !(t instanceof goog.html.SafeUrl))
              ) {
                var o = /^data:audio\//i.test(t);
                t = goog.html.SafeUrl.sanitizeAssertUnchanged(t, o);
              }
              e.src = goog.html.SafeUrl.unwrapTrustedURL(t);
            }),
            (goog.dom.safe.setVideoSrc = function (e, t) {
              if (
                (goog.dom.asserts.assertIsHTMLVideoElement(e),
                !(t instanceof goog.html.SafeUrl))
              ) {
                var o = /^data:video\//i.test(t);
                t = goog.html.SafeUrl.sanitizeAssertUnchanged(t, o);
              }
              e.src = goog.html.SafeUrl.unwrapTrustedURL(t);
            }),
            (goog.dom.safe.setEmbedSrc = function (e, t) {
              goog.dom.asserts.assertIsHTMLEmbedElement(e),
                (e.src =
                  goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(t));
            }),
            (goog.dom.safe.setFrameSrc = function (e, t) {
              goog.dom.asserts.assertIsHTMLFrameElement(e),
                (e.src = goog.html.TrustedResourceUrl.unwrapTrustedURL(t));
            }),
            (goog.dom.safe.setIframeSrc = function (e, t) {
              goog.dom.asserts.assertIsHTMLIFrameElement(e),
                (e.src = goog.html.TrustedResourceUrl.unwrapTrustedURL(t));
            }),
            (goog.dom.safe.setIframeSrcdoc = function (e, t) {
              goog.dom.asserts.assertIsHTMLIFrameElement(e),
                (e.srcdoc = goog.html.SafeHtml.unwrapTrustedHTML(t));
            }),
            (goog.dom.safe.setLinkHrefAndRel = function (e, t, o) {
              goog.dom.asserts.assertIsHTMLLinkElement(e),
                (e.rel = o),
                goog.string.internal.caseInsensitiveContains(o, "stylesheet")
                  ? (goog.asserts.assert(
                      t instanceof goog.html.TrustedResourceUrl,
                      'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'
                    ),
                    (e.href = goog.html.TrustedResourceUrl.unwrapTrustedURL(t)))
                  : (e.href =
                      t instanceof goog.html.TrustedResourceUrl
                        ? goog.html.TrustedResourceUrl.unwrapTrustedURL(t)
                        : t instanceof goog.html.SafeUrl
                        ? goog.html.SafeUrl.unwrapTrustedURL(t)
                        : goog.html.SafeUrl.unwrapTrustedURL(
                            goog.html.SafeUrl.sanitizeAssertUnchanged(t)
                          ));
            }),
            (goog.dom.safe.setObjectData = function (e, t) {
              goog.dom.asserts.assertIsHTMLObjectElement(e),
                (e.data =
                  goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(t));
            }),
            (goog.dom.safe.setScriptSrc = function (e, t) {
              goog.dom.asserts.assertIsHTMLScriptElement(e),
                (e.src =
                  goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(t)),
                (t = goog.getScriptNonce()) && e.setAttribute("nonce", t);
            }),
            (goog.dom.safe.setScriptContent = function (e, t) {
              goog.dom.asserts.assertIsHTMLScriptElement(e),
                (e.text = goog.html.SafeScript.unwrapTrustedScript(t)),
                (t = goog.getScriptNonce()) && e.setAttribute("nonce", t);
            }),
            (goog.dom.safe.setLocationHref = function (e, t) {
              goog.dom.asserts.assertIsLocation(e),
                (t =
                  t instanceof goog.html.SafeUrl
                    ? t
                    : goog.html.SafeUrl.sanitizeAssertUnchanged(t)),
                (e.href = goog.html.SafeUrl.unwrapTrustedURL(t));
            }),
            (goog.dom.safe.assignLocation = function (e, t) {
              goog.dom.asserts.assertIsLocation(e),
                (t =
                  t instanceof goog.html.SafeUrl
                    ? t
                    : goog.html.SafeUrl.sanitizeAssertUnchanged(t)),
                e.assign(goog.html.SafeUrl.unwrapTrustedURL(t));
            }),
            (goog.dom.safe.replaceLocation = function (e, t) {
              goog.dom.asserts.assertIsLocation(e),
                (t =
                  t instanceof goog.html.SafeUrl
                    ? t
                    : goog.html.SafeUrl.sanitizeAssertUnchanged(t)),
                e.replace(goog.html.SafeUrl.unwrapTrustedURL(t));
            }),
            (goog.dom.safe.openInWindow = function (e, t, o, r, s) {
              return (
                (e =
                  e instanceof goog.html.SafeUrl
                    ? e
                    : goog.html.SafeUrl.sanitizeAssertUnchanged(e)),
                (t || goog.global).open(
                  goog.html.SafeUrl.unwrapTrustedURL(e),
                  o ? goog.string.Const.unwrap(o) : "",
                  r,
                  s
                )
              );
            }),
            (goog.dom.safe.parseFromStringHtml = function (e, t) {
              return goog.dom.safe.parseFromString(e, t, "text/html");
            }),
            (goog.dom.safe.parseFromString = function (e, t, o) {
              return e.parseFromString(
                goog.html.SafeHtml.unwrapTrustedHTML(t),
                o
              );
            }),
            (goog.dom.safe.createImageFromBlob = function (e) {
              if (!/^image\/.*/g.test(e.type))
                throw Error(
                  "goog.dom.safe.createImageFromBlob only accepts MIME type image/.*."
                );
              var t = goog.global.URL.createObjectURL(e);
              return (
                ((e = new goog.global.Image()).onload = function () {
                  goog.global.URL.revokeObjectURL(t);
                }),
                goog.dom.safe.setImageSrc(
                  e,
                  goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract(
                    goog.string.Const.from("Image blob URL."),
                    t
                  )
                ),
                e
              );
            }),
            (goog.string.DETECT_DOUBLE_ESCAPING = !1),
            (goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1),
            (goog.string.Unicode = { NBSP: " " }),
            (goog.string.startsWith = goog.string.internal.startsWith),
            (goog.string.endsWith = goog.string.internal.endsWith),
            (goog.string.caseInsensitiveStartsWith =
              goog.string.internal.caseInsensitiveStartsWith),
            (goog.string.caseInsensitiveEndsWith =
              goog.string.internal.caseInsensitiveEndsWith),
            (goog.string.caseInsensitiveEquals =
              goog.string.internal.caseInsensitiveEquals),
            (goog.string.subs = function (e, t) {
              for (
                var o = e.split("%s"),
                  r = "",
                  s = Array.prototype.slice.call(arguments, 1);
                s.length && 1 < o.length;

              )
                r += o.shift() + s.shift();
              return r + o.join("%s");
            }),
            (goog.string.collapseWhitespace = function (e) {
              return e.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
            }),
            (goog.string.isEmptyOrWhitespace =
              goog.string.internal.isEmptyOrWhitespace),
            (goog.string.isEmptyString = function (e) {
              return 0 == e.length;
            }),
            (goog.string.isEmpty = goog.string.isEmptyOrWhitespace),
            (goog.string.isEmptyOrWhitespaceSafe = function (e) {
              return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(e));
            }),
            (goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe),
            (goog.string.isBreakingWhitespace = function (e) {
              return !/[^\t\n\r ]/.test(e);
            }),
            (goog.string.isAlpha = function (e) {
              return !/[^a-zA-Z]/.test(e);
            }),
            (goog.string.isNumeric = function (e) {
              return !/[^0-9]/.test(e);
            }),
            (goog.string.isAlphaNumeric = function (e) {
              return !/[^a-zA-Z0-9]/.test(e);
            }),
            (goog.string.isSpace = function (e) {
              return " " == e;
            }),
            (goog.string.isUnicodeChar = function (e) {
              return (
                (1 == e.length && " " <= e && "~" >= e) || ("" <= e && "�" >= e)
              );
            }),
            (goog.string.stripNewlines = function (e) {
              return e.replace(/(\r\n|\r|\n)+/g, " ");
            }),
            (goog.string.canonicalizeNewlines = function (e) {
              return e.replace(/(\r\n|\r|\n)/g, "\n");
            }),
            (goog.string.normalizeWhitespace = function (e) {
              return e.replace(/\xa0|\s/g, " ");
            }),
            (goog.string.normalizeSpaces = function (e) {
              return e.replace(/\xa0|[ \t]+/g, " ");
            }),
            (goog.string.collapseBreakingSpaces = function (e) {
              return e
                .replace(/[\t\r\n ]+/g, " ")
                .replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
            }),
            (goog.string.trim = goog.string.internal.trim),
            (goog.string.trimLeft = function (e) {
              return e.replace(/^[\s\xa0]+/, "");
            }),
            (goog.string.trimRight = function (e) {
              return e.replace(/[\s\xa0]+$/, "");
            }),
            (goog.string.caseInsensitiveCompare =
              goog.string.internal.caseInsensitiveCompare),
            (goog.string.numberAwareCompare_ = function (e, t, o) {
              if (e == t) return 0;
              if (!e) return -1;
              if (!t) return 1;
              for (
                var r = e.toLowerCase().match(o),
                  s = t.toLowerCase().match(o),
                  i = Math.min(r.length, s.length),
                  n = 0;
                n < i;
                n++
              ) {
                o = r[n];
                var a = s[n];
                if (o != a)
                  return (
                    (e = parseInt(o, 10)),
                    !isNaN(e) && ((t = parseInt(a, 10)), !isNaN(t) && e - t)
                      ? e - t
                      : o < a
                      ? -1
                      : 1
                  );
              }
              return r.length != s.length
                ? r.length - s.length
                : e < t
                ? -1
                : 1;
            }),
            (goog.string.intAwareCompare = function (e, t) {
              return goog.string.numberAwareCompare_(e, t, /\d+|\D+/g);
            }),
            (goog.string.floatAwareCompare = function (e, t) {
              return goog.string.numberAwareCompare_(e, t, /\d+|\.\d+|\D+/g);
            }),
            (goog.string.numerateCompare = goog.string.floatAwareCompare),
            (goog.string.urlEncode = function (e) {
              return encodeURIComponent(String(e));
            }),
            (goog.string.urlDecode = function (e) {
              return decodeURIComponent(e.replace(/\+/g, " "));
            }),
            (goog.string.newLineToBr = goog.string.internal.newLineToBr),
            (goog.string.htmlEscape = function (e, t) {
              return (
                (e = goog.string.internal.htmlEscape(e, t)),
                goog.string.DETECT_DOUBLE_ESCAPING &&
                  (e = e.replace(goog.string.E_RE_, "&#101;")),
                e
              );
            }),
            (goog.string.E_RE_ = /e/g),
            (goog.string.unescapeEntities = function (e) {
              return goog.string.contains(e, "&")
                ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING &&
                  "document" in goog.global
                  ? goog.string.unescapeEntitiesUsingDom_(e)
                  : goog.string.unescapePureXmlEntities_(e)
                : e;
            }),
            (goog.string.unescapeEntitiesWithDocument = function (e, t) {
              return goog.string.contains(e, "&")
                ? goog.string.unescapeEntitiesUsingDom_(e, t)
                : e;
            }),
            (goog.string.unescapeEntitiesUsingDom_ = function (e, t) {
              var o = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"' },
                r = t
                  ? t.createElement("div")
                  : goog.global.document.createElement("div");
              return e.replace(
                goog.string.HTML_ENTITY_PATTERN_,
                function (e, t) {
                  var s = o[e];
                  return (
                    s ||
                    ("#" == t.charAt(0) &&
                      ((t = Number("0" + t.substr(1))),
                      isNaN(t) || (s = String.fromCharCode(t))),
                    s ||
                      (goog.dom.safe.setInnerHtml(
                        r,
                        goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(
                          goog.string.Const.from("Single HTML entity."),
                          e + " "
                        )
                      ),
                      (s = r.firstChild.nodeValue.slice(0, -1))),
                    (o[e] = s))
                  );
                }
              );
            }),
            (goog.string.unescapePureXmlEntities_ = function (e) {
              return e.replace(/&([^;]+);/g, function (e, t) {
                switch (t) {
                  case "amp":
                    return "&";
                  case "lt":
                    return "<";
                  case "gt":
                    return ">";
                  case "quot":
                    return '"';
                  default:
                    return "#" != t.charAt(0) ||
                      ((t = Number("0" + t.substr(1))), isNaN(t))
                      ? e
                      : String.fromCharCode(t);
                }
              });
            }),
            (goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g),
            (goog.string.whitespaceEscape = function (e, t) {
              return goog.string.newLineToBr(e.replace(/  /g, " &#160;"), t);
            }),
            (goog.string.preserveSpaces = function (e) {
              return e.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
            }),
            (goog.string.stripQuotes = function (e, t) {
              for (var o = t.length, r = 0; r < o; r++) {
                var s = 1 == o ? t : t.charAt(r);
                if (e.charAt(0) == s && e.charAt(e.length - 1) == s)
                  return e.substring(1, e.length - 1);
              }
              return e;
            }),
            (goog.string.truncate = function (e, t, o) {
              return (
                o && (e = goog.string.unescapeEntities(e)),
                e.length > t && (e = e.substring(0, t - 3) + "..."),
                o && (e = goog.string.htmlEscape(e)),
                e
              );
            }),
            (goog.string.truncateMiddle = function (e, t, o, r) {
              if (
                (o && (e = goog.string.unescapeEntities(e)), r && e.length > t)
              ) {
                r > t && (r = t);
                var s = e.length - r;
                e = e.substring(0, t - r) + "..." + e.substring(s);
              } else
                e.length > t &&
                  ((r = Math.floor(t / 2)),
                  (s = e.length - r),
                  (e = e.substring(0, r + (t % 2)) + "..." + e.substring(s)));
              return o && (e = goog.string.htmlEscape(e)), e;
            }),
            (goog.string.specialEscapeChars_ = {
              "\0": "\\0",
              "\b": "\\b",
              "\f": "\\f",
              "\n": "\\n",
              "\r": "\\r",
              "\t": "\\t",
              "\v": "\\x0B",
              '"': '\\"',
              "\\": "\\\\",
              "<": "\\u003C",
            }),
            (goog.string.jsEscapeCache_ = { "'": "\\'" }),
            (goog.string.quote = function (e) {
              e = String(e);
              for (var t = ['"'], o = 0; o < e.length; o++) {
                var r = e.charAt(o),
                  s = r.charCodeAt(0);
                t[o + 1] =
                  goog.string.specialEscapeChars_[r] ||
                  (31 < s && 127 > s ? r : goog.string.escapeChar(r));
              }
              return t.push('"'), t.join("");
            }),
            (goog.string.escapeString = function (e) {
              for (var t = [], o = 0; o < e.length; o++)
                t[o] = goog.string.escapeChar(e.charAt(o));
              return t.join("");
            }),
            (goog.string.escapeChar = function (e) {
              if (e in goog.string.jsEscapeCache_)
                return goog.string.jsEscapeCache_[e];
              if (e in goog.string.specialEscapeChars_)
                return (goog.string.jsEscapeCache_[e] =
                  goog.string.specialEscapeChars_[e]);
              var t = e.charCodeAt(0);
              if (31 < t && 127 > t) var o = e;
              else
                256 > t
                  ? ((o = "\\x"), (16 > t || 256 < t) && (o += "0"))
                  : ((o = "\\u"), 4096 > t && (o += "0")),
                  (o += t.toString(16).toUpperCase());
              return (goog.string.jsEscapeCache_[e] = o);
            }),
            (goog.string.contains = goog.string.internal.contains),
            (goog.string.caseInsensitiveContains =
              goog.string.internal.caseInsensitiveContains),
            (goog.string.countOf = function (e, t) {
              return e && t ? e.split(t).length - 1 : 0;
            }),
            (goog.string.removeAt = function (e, t, o) {
              var r = e;
              return (
                0 <= t &&
                  t < e.length &&
                  0 < o &&
                  (r = e.substr(0, t) + e.substr(t + o, e.length - t - o)),
                r
              );
            }),
            (goog.string.remove = function (e, t) {
              return e.replace(t, "");
            }),
            (goog.string.removeAll = function (e, t) {
              return (
                (t = new RegExp(goog.string.regExpEscape(t), "g")),
                e.replace(t, "")
              );
            }),
            (goog.string.replaceAll = function (e, t, o) {
              return (
                (t = new RegExp(goog.string.regExpEscape(t), "g")),
                e.replace(t, o.replace(/\$/g, "$$$$"))
              );
            }),
            (goog.string.regExpEscape = function (e) {
              return String(e)
                .replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")
                .replace(/\x08/g, "\\x08");
            }),
            (goog.string.repeat = String.prototype.repeat
              ? function (e, t) {
                  return e.repeat(t);
                }
              : function (e, t) {
                  return Array(t + 1).join(e);
                }),
            (goog.string.padNumber = function (e, t, o) {
              return (
                -1 ==
                  (o = (e = goog.isDef(o) ? e.toFixed(o) : String(e)).indexOf(
                    "."
                  )) && (o = e.length),
                goog.string.repeat("0", Math.max(0, t - o)) + e
              );
            }),
            (goog.string.makeSafe = function (e) {
              return null == e ? "" : String(e);
            }),
            (goog.string.buildString = function (e) {
              return Array.prototype.join.call(arguments, "");
            }),
            (goog.string.getRandomString = function () {
              return (
                Math.floor(2147483648 * Math.random()).toString(36) +
                Math.abs(
                  Math.floor(2147483648 * Math.random()) ^ goog.now()
                ).toString(36)
              );
            }),
            (goog.string.compareVersions =
              goog.string.internal.compareVersions),
            (goog.string.hashCode = function (e) {
              for (var t = 0, o = 0; o < e.length; ++o)
                t = (31 * t + e.charCodeAt(o)) >>> 0;
              return t;
            }),
            (goog.string.uniqueStringCounter_ =
              (2147483648 * Math.random()) | 0),
            (goog.string.createUniqueString = function () {
              return "goog_" + goog.string.uniqueStringCounter_++;
            }),
            (goog.string.toNumber = function (e) {
              var t = Number(e);
              return 0 == t && goog.string.isEmptyOrWhitespace(e) ? NaN : t;
            }),
            (goog.string.isLowerCamelCase = function (e) {
              return /^[a-z]+([A-Z][a-z]*)*$/.test(e);
            }),
            (goog.string.isUpperCamelCase = function (e) {
              return /^([A-Z][a-z]*)+$/.test(e);
            }),
            (goog.string.toCamelCase = function (e) {
              return String(e).replace(/\-([a-z])/g, function (e, t) {
                return t.toUpperCase();
              });
            }),
            (goog.string.toSelectorCase = function (e) {
              return String(e)
                .replace(/([A-Z])/g, "-$1")
                .toLowerCase();
            }),
            (goog.string.toTitleCase = function (e, t) {
              return (
                (t = goog.isString(t) ? goog.string.regExpEscape(t) : "\\s"),
                e.replace(
                  new RegExp(
                    "(^" + (t ? "|[" + t + "]+" : "") + ")([a-z])",
                    "g"
                  ),
                  function (e, t, o) {
                    return t + o.toUpperCase();
                  }
                )
              );
            }),
            (goog.string.capitalize = function (e) {
              return (
                String(e.charAt(0)).toUpperCase() +
                String(e.substr(1)).toLowerCase()
              );
            }),
            (goog.string.parseInt = function (e) {
              return (
                isFinite(e) && (e = String(e)),
                goog.isString(e)
                  ? /^\s*-?0x/i.test(e)
                    ? parseInt(e, 16)
                    : parseInt(e, 10)
                  : NaN
              );
            }),
            (goog.string.splitLimit = function (e, t, o) {
              e = e.split(t);
              for (var r = []; 0 < o && e.length; ) r.push(e.shift()), o--;
              return e.length && r.push(e.join(t)), r;
            }),
            (goog.string.lastComponent = function (e, t) {
              if (!t) return e;
              "string" == typeof t && (t = [t]);
              for (var o = -1, r = 0; r < t.length; r++)
                if ("" != t[r]) {
                  var s = e.lastIndexOf(t[r]);
                  s > o && (o = s);
                }
              return -1 == o ? e : e.slice(o + 1);
            }),
            (goog.string.editDistance = function (e, t) {
              var o = [],
                r = [];
              if (e == t) return 0;
              if (!e.length || !t.length) return Math.max(e.length, t.length);
              for (var s = 0; s < t.length + 1; s++) o[s] = s;
              for (s = 0; s < e.length; s++) {
                r[0] = s + 1;
                for (var i = 0; i < t.length; i++)
                  r[i + 1] = Math.min(
                    r[i] + 1,
                    o[i + 1] + 1,
                    o[i] + Number(e[s] != t[i])
                  );
                for (i = 0; i < o.length; i++) o[i] = r[i];
              }
              return r[t.length];
            }),
            (goog.labs.userAgent.platform = {}),
            (goog.labs.userAgent.platform.isAndroid = function () {
              return goog.labs.userAgent.util.matchUserAgent("Android");
            }),
            (goog.labs.userAgent.platform.isIpod = function () {
              return goog.labs.userAgent.util.matchUserAgent("iPod");
            }),
            (goog.labs.userAgent.platform.isIphone = function () {
              return (
                goog.labs.userAgent.util.matchUserAgent("iPhone") &&
                !goog.labs.userAgent.util.matchUserAgent("iPod") &&
                !goog.labs.userAgent.util.matchUserAgent("iPad")
              );
            }),
            (goog.labs.userAgent.platform.isIpad = function () {
              return goog.labs.userAgent.util.matchUserAgent("iPad");
            }),
            (goog.labs.userAgent.platform.isIos = function () {
              return (
                goog.labs.userAgent.platform.isIphone() ||
                goog.labs.userAgent.platform.isIpad() ||
                goog.labs.userAgent.platform.isIpod()
              );
            }),
            (goog.labs.userAgent.platform.isMacintosh = function () {
              return goog.labs.userAgent.util.matchUserAgent("Macintosh");
            }),
            (goog.labs.userAgent.platform.isLinux = function () {
              return goog.labs.userAgent.util.matchUserAgent("Linux");
            }),
            (goog.labs.userAgent.platform.isWindows = function () {
              return goog.labs.userAgent.util.matchUserAgent("Windows");
            }),
            (goog.labs.userAgent.platform.isChromeOS = function () {
              return goog.labs.userAgent.util.matchUserAgent("CrOS");
            }),
            (goog.labs.userAgent.platform.isChromecast = function () {
              return goog.labs.userAgent.util.matchUserAgent("CrKey");
            }),
            (goog.labs.userAgent.platform.isKaiOS = function () {
              return goog.labs.userAgent.util.matchUserAgentIgnoreCase("KaiOS");
            }),
            (goog.labs.userAgent.platform.isGo2Phone = function () {
              return goog.labs.userAgent.util.matchUserAgentIgnoreCase("GAFP");
            }),
            (goog.labs.userAgent.platform.getVersion = function () {
              var e = goog.labs.userAgent.util.getUserAgent(),
                t = "";
              return (
                goog.labs.userAgent.platform.isWindows()
                  ? (t = (e = (t = /Windows (?:NT|Phone) ([0-9.]+)/).exec(e))
                      ? e[1]
                      : "0.0")
                  : goog.labs.userAgent.platform.isIos()
                  ? (t =
                      (e = (t = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/).exec(
                        e
                      )) && e[1].replace(/_/g, "."))
                  : goog.labs.userAgent.platform.isMacintosh()
                  ? (t = (e = (t = /Mac OS X ([0-9_.]+)/).exec(e))
                      ? e[1].replace(/_/g, ".")
                      : "10")
                  : goog.labs.userAgent.platform.isKaiOS()
                  ? (t = (e = (t = /(?:KaiOS)\/(\S+)/i).exec(e)) && e[1])
                  : goog.labs.userAgent.platform.isAndroid()
                  ? (t =
                      (e = (t = /Android\s+([^\);]+)(\)|;)/).exec(e)) && e[1])
                  : goog.labs.userAgent.platform.isChromeOS() &&
                    (t =
                      (e = (t = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/).exec(
                        e
                      )) && e[1]),
                t || ""
              );
            }),
            (goog.labs.userAgent.platform.isVersionOrHigher = function (e) {
              return (
                0 <=
                goog.string.compareVersions(
                  goog.labs.userAgent.platform.getVersion(),
                  e
                )
              );
            }),
            (goog.reflect = {}),
            (goog.reflect.object = function (e, t) {
              return t;
            }),
            (goog.reflect.objectProperty = function (e, t) {
              return e;
            }),
            (goog.reflect.sinkValue = function (e) {
              return goog.reflect.sinkValue[" "](e), e;
            }),
            (goog.reflect.sinkValue[" "] = goog.nullFunction),
            (goog.reflect.canAccessProperty = function (e, t) {
              try {
                return goog.reflect.sinkValue(e[t]), !0;
              } catch (e) {}
              return !1;
            }),
            (goog.reflect.cache = function (e, t, o, r) {
              return (
                (r = r ? r(t) : t),
                Object.prototype.hasOwnProperty.call(e, r)
                  ? e[r]
                  : (e[r] = o(t))
              );
            }),
            (goog.labs.userAgent.engine = {}),
            (goog.labs.userAgent.engine.isPresto = function () {
              return goog.labs.userAgent.util.matchUserAgent("Presto");
            }),
            (goog.labs.userAgent.engine.isTrident = function () {
              return (
                goog.labs.userAgent.util.matchUserAgent("Trident") ||
                goog.labs.userAgent.util.matchUserAgent("MSIE")
              );
            }),
            (goog.labs.userAgent.engine.isEdge = function () {
              return goog.labs.userAgent.util.matchUserAgent("Edge");
            }),
            (goog.labs.userAgent.engine.isWebKit = function () {
              return (
                goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") &&
                !goog.labs.userAgent.engine.isEdge()
              );
            }),
            (goog.labs.userAgent.engine.isGecko = function () {
              return (
                goog.labs.userAgent.util.matchUserAgent("Gecko") &&
                !goog.labs.userAgent.engine.isWebKit() &&
                !goog.labs.userAgent.engine.isTrident() &&
                !goog.labs.userAgent.engine.isEdge()
              );
            }),
            (goog.labs.userAgent.engine.getVersion = function () {
              var e = goog.labs.userAgent.util.getUserAgent();
              if (e) {
                e = goog.labs.userAgent.util.extractVersionTuples(e);
                var t,
                  o = goog.labs.userAgent.engine.getEngineTuple_(e);
                if (o)
                  return "Gecko" == o[0]
                    ? goog.labs.userAgent.engine.getVersionForKey_(e, "Firefox")
                    : o[1];
                if (
                  (e = e[0]) &&
                  (t = e[2]) &&
                  (t = /Trident\/([^\s;]+)/.exec(t))
                )
                  return t[1];
              }
              return "";
            }),
            (goog.labs.userAgent.engine.getEngineTuple_ = function (e) {
              if (!goog.labs.userAgent.engine.isEdge()) return e[1];
              for (var t = 0; t < e.length; t++) {
                var o = e[t];
                if ("Edge" == o[0]) return o;
              }
            }),
            (goog.labs.userAgent.engine.isVersionOrHigher = function (e) {
              return (
                0 <=
                goog.string.compareVersions(
                  goog.labs.userAgent.engine.getVersion(),
                  e
                )
              );
            }),
            (goog.labs.userAgent.engine.getVersionForKey_ = function (e, t) {
              return (
                ((e = goog.array.find(e, function (e) {
                  return t == e[0];
                })) &&
                  e[1]) ||
                ""
              );
            }),
            (goog.userAgent = {}),
            (goog.userAgent.ASSUME_IE = !1),
            (goog.userAgent.ASSUME_EDGE = !1),
            (goog.userAgent.ASSUME_GECKO = !1),
            (goog.userAgent.ASSUME_WEBKIT = !1),
            (goog.userAgent.ASSUME_MOBILE_WEBKIT = !1),
            (goog.userAgent.ASSUME_OPERA = !1),
            (goog.userAgent.ASSUME_ANY_VERSION = !1),
            (goog.userAgent.BROWSER_KNOWN_ =
              goog.userAgent.ASSUME_IE ||
              goog.userAgent.ASSUME_EDGE ||
              goog.userAgent.ASSUME_GECKO ||
              goog.userAgent.ASSUME_MOBILE_WEBKIT ||
              goog.userAgent.ASSUME_WEBKIT ||
              goog.userAgent.ASSUME_OPERA),
            (goog.userAgent.getUserAgentString = function () {
              return goog.labs.userAgent.util.getUserAgent();
            }),
            (goog.userAgent.getNavigatorTyped = function () {
              return goog.global.navigator || null;
            }),
            (goog.userAgent.getNavigator = function () {
              return goog.userAgent.getNavigatorTyped();
            }),
            (goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_
              ? goog.userAgent.ASSUME_OPERA
              : goog.labs.userAgent.browser.isOpera()),
            (goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_
              ? goog.userAgent.ASSUME_IE
              : goog.labs.userAgent.browser.isIE()),
            (goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_
              ? goog.userAgent.ASSUME_EDGE
              : goog.labs.userAgent.engine.isEdge()),
            (goog.userAgent.EDGE_OR_IE =
              goog.userAgent.EDGE || goog.userAgent.IE),
            (goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_
              ? goog.userAgent.ASSUME_GECKO
              : goog.labs.userAgent.engine.isGecko());
          (goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_
            ? goog.userAgent.ASSUME_WEBKIT ||
              goog.userAgent.ASSUME_MOBILE_WEBKIT
            : goog.labs.userAgent.engine.isWebKit()),
            (goog.userAgent.isMobile_ = function () {
              return (
                goog.userAgent.WEBKIT &&
                goog.labs.userAgent.util.matchUserAgent("Mobile")
              );
            }),
            (goog.userAgent.MOBILE =
              goog.userAgent.ASSUME_MOBILE_WEBKIT ||
              goog.userAgent.isMobile_()),
            (goog.userAgent.SAFARI = goog.userAgent.WEBKIT),
            (goog.userAgent.determinePlatform_ = function () {
              var e = goog.userAgent.getNavigatorTyped();
              return (e && e.platform) || "";
            }),
            (goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_()),
            (goog.userAgent.ASSUME_MAC = !1),
            (goog.userAgent.ASSUME_WINDOWS = !1),
            (goog.userAgent.ASSUME_LINUX = !1),
            (goog.userAgent.ASSUME_X11 = !1),
            (goog.userAgent.ASSUME_ANDROID = !1),
            (goog.userAgent.ASSUME_IPHONE = !1),
            (goog.userAgent.ASSUME_IPAD = !1),
            (goog.userAgent.ASSUME_IPOD = !1),
            (goog.userAgent.ASSUME_KAIOS = !1),
            (goog.userAgent.ASSUME_GO2PHONE = !1),
            (goog.userAgent.PLATFORM_KNOWN_ =
              goog.userAgent.ASSUME_MAC ||
              goog.userAgent.ASSUME_WINDOWS ||
              goog.userAgent.ASSUME_LINUX ||
              goog.userAgent.ASSUME_X11 ||
              goog.userAgent.ASSUME_ANDROID ||
              goog.userAgent.ASSUME_IPHONE ||
              goog.userAgent.ASSUME_IPAD ||
              goog.userAgent.ASSUME_IPOD),
            (goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_
              ? goog.userAgent.ASSUME_MAC
              : goog.labs.userAgent.platform.isMacintosh()),
            (goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_
              ? goog.userAgent.ASSUME_WINDOWS
              : goog.labs.userAgent.platform.isWindows()),
            (goog.userAgent.isLegacyLinux_ = function () {
              return (
                goog.labs.userAgent.platform.isLinux() ||
                goog.labs.userAgent.platform.isChromeOS()
              );
            }),
            (goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_
              ? goog.userAgent.ASSUME_LINUX
              : goog.userAgent.isLegacyLinux_()),
            (goog.userAgent.isX11_ = function () {
              var e = goog.userAgent.getNavigatorTyped();
              return !!e && goog.string.contains(e.appVersion || "", "X11");
            }),
            (goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_
              ? goog.userAgent.ASSUME_X11
              : goog.userAgent.isX11_()),
            (goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_
              ? goog.userAgent.ASSUME_ANDROID
              : goog.labs.userAgent.platform.isAndroid()),
            (goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_
              ? goog.userAgent.ASSUME_IPHONE
              : goog.labs.userAgent.platform.isIphone()),
            (goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_
              ? goog.userAgent.ASSUME_IPAD
              : goog.labs.userAgent.platform.isIpad()),
            (goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_
              ? goog.userAgent.ASSUME_IPOD
              : goog.labs.userAgent.platform.isIpod()),
            (goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_
              ? goog.userAgent.ASSUME_IPHONE ||
                goog.userAgent.ASSUME_IPAD ||
                goog.userAgent.ASSUME_IPOD
              : goog.labs.userAgent.platform.isIos()),
            (goog.userAgent.KAIOS = goog.userAgent.PLATFORM_KNOWN_
              ? goog.userAgent.ASSUME_KAIOS
              : goog.labs.userAgent.platform.isKaiOS()),
            (goog.userAgent.GO2PHONE = goog.userAgent.PLATFORM_KNOWN_
              ? goog.userAgent.ASSUME_GO2PHONE
              : goog.labs.userAgent.platform.isGo2Phone()),
            (goog.userAgent.determineVersion_ = function () {
              var e = "",
                t = goog.userAgent.getVersionRegexResult_();
              return (
                t && (e = t ? t[1] : ""),
                goog.userAgent.IE &&
                null != (t = goog.userAgent.getDocumentMode_()) &&
                t > parseFloat(e)
                  ? String(t)
                  : e
              );
            }),
            (goog.userAgent.getVersionRegexResult_ = function () {
              var e = goog.userAgent.getUserAgentString();
              return goog.userAgent.GECKO
                ? /rv:([^\);]+)(\)|;)/.exec(e)
                : goog.userAgent.EDGE
                ? /Edge\/([\d\.]+)/.exec(e)
                : goog.userAgent.IE
                ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(e)
                : goog.userAgent.WEBKIT
                ? /WebKit\/(\S+)/.exec(e)
                : goog.userAgent.OPERA
                ? /(?:Version)[ \/]?(\S+)/.exec(e)
                : void 0;
            }),
            (goog.userAgent.getDocumentMode_ = function () {
              var e = goog.global.document;
              return e ? e.documentMode : void 0;
            }),
            (goog.userAgent.VERSION = goog.userAgent.determineVersion_()),
            (goog.userAgent.compare = function (e, t) {
              return goog.string.compareVersions(e, t);
            }),
            (goog.userAgent.isVersionOrHigherCache_ = {}),
            (goog.userAgent.isVersionOrHigher = function (e) {
              return (
                goog.userAgent.ASSUME_ANY_VERSION ||
                goog.reflect.cache(
                  goog.userAgent.isVersionOrHigherCache_,
                  e,
                  function () {
                    return (
                      0 <=
                      goog.string.compareVersions(goog.userAgent.VERSION, e)
                    );
                  }
                )
              );
            }),
            (goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher),
            (goog.userAgent.isDocumentModeOrHigher = function (e) {
              return Number(goog.userAgent.DOCUMENT_MODE) >= e;
            }),
            (goog.userAgent.isDocumentMode =
              goog.userAgent.isDocumentModeOrHigher),
            (goog.userAgent.DOCUMENT_MODE = (function () {
              if (goog.global.document && goog.userAgent.IE)
                return goog.userAgent.getDocumentMode_();
            })()),
            (goog.userAgent.product = {}),
            (goog.userAgent.product.ASSUME_FIREFOX = !1),
            (goog.userAgent.product.ASSUME_IPHONE = !1),
            (goog.userAgent.product.ASSUME_IPAD = !1),
            (goog.userAgent.product.ASSUME_ANDROID = !1),
            (goog.userAgent.product.ASSUME_CHROME = !1),
            (goog.userAgent.product.ASSUME_SAFARI = !1),
            (goog.userAgent.product.PRODUCT_KNOWN_ =
              goog.userAgent.ASSUME_IE ||
              goog.userAgent.ASSUME_EDGE ||
              goog.userAgent.ASSUME_OPERA ||
              goog.userAgent.product.ASSUME_FIREFOX ||
              goog.userAgent.product.ASSUME_IPHONE ||
              goog.userAgent.product.ASSUME_IPAD ||
              goog.userAgent.product.ASSUME_ANDROID ||
              goog.userAgent.product.ASSUME_CHROME ||
              goog.userAgent.product.ASSUME_SAFARI),
            (goog.userAgent.product.OPERA = goog.userAgent.OPERA),
            (goog.userAgent.product.IE = goog.userAgent.IE),
            (goog.userAgent.product.EDGE = goog.userAgent.EDGE),
            (goog.userAgent.product.FIREFOX = goog.userAgent.product
              .PRODUCT_KNOWN_
              ? goog.userAgent.product.ASSUME_FIREFOX
              : goog.labs.userAgent.browser.isFirefox()),
            (goog.userAgent.product.isIphoneOrIpod_ = function () {
              return (
                goog.labs.userAgent.platform.isIphone() ||
                goog.labs.userAgent.platform.isIpod()
              );
            }),
            (goog.userAgent.product.IPHONE = goog.userAgent.product
              .PRODUCT_KNOWN_
              ? goog.userAgent.product.ASSUME_IPHONE
              : goog.userAgent.product.isIphoneOrIpod_()),
            (goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_
              ? goog.userAgent.product.ASSUME_IPAD
              : goog.labs.userAgent.platform.isIpad()),
            (goog.userAgent.product.ANDROID = goog.userAgent.product
              .PRODUCT_KNOWN_
              ? goog.userAgent.product.ASSUME_ANDROID
              : goog.labs.userAgent.browser.isAndroidBrowser()),
            (goog.userAgent.product.CHROME = goog.userAgent.product
              .PRODUCT_KNOWN_
              ? goog.userAgent.product.ASSUME_CHROME
              : goog.labs.userAgent.browser.isChrome()),
            (goog.userAgent.product.isSafariDesktop_ = function () {
              return (
                goog.labs.userAgent.browser.isSafari() &&
                !goog.labs.userAgent.platform.isIos()
              );
            }),
            (goog.userAgent.product.SAFARI = goog.userAgent.product
              .PRODUCT_KNOWN_
              ? goog.userAgent.product.ASSUME_SAFARI
              : goog.userAgent.product.isSafariDesktop_()),
            (goog.crypt.base64 = {}),
            (goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"),
            (goog.crypt.base64.ENCODED_VALS =
              goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ + "+/="),
            (goog.crypt.base64.ENCODED_VALS_WEBSAFE =
              goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ + "-_."),
            (goog.crypt.base64.Alphabet = {
              DEFAULT: 0,
              NO_PADDING: 1,
              WEBSAFE: 2,
              WEBSAFE_DOT_PADDING: 3,
              WEBSAFE_NO_PADDING: 4,
            }),
            (goog.crypt.base64.paddingChars_ = "=."),
            (goog.crypt.base64.isPadding_ = function (e) {
              return goog.string.contains(goog.crypt.base64.paddingChars_, e);
            }),
            (goog.crypt.base64.byteToCharMaps_ = {}),
            (goog.crypt.base64.charToByteMap_ = null),
            (goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ =
              goog.userAgent.GECKO ||
              (goog.userAgent.WEBKIT && !goog.userAgent.product.SAFARI) ||
              goog.userAgent.OPERA),
            (goog.crypt.base64.HAS_NATIVE_ENCODE_ =
              goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ ||
              "function" == typeof goog.global.btoa),
            (goog.crypt.base64.HAS_NATIVE_DECODE_ =
              goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ ||
              (!goog.userAgent.product.SAFARI &&
                !goog.userAgent.IE &&
                "function" == typeof goog.global.atob)),
            (goog.crypt.base64.encodeByteArray = function (e, t) {
              goog.asserts.assert(
                goog.isArrayLike(e),
                "encodeByteArray takes an array as a parameter"
              ),
                void 0 === t && (t = goog.crypt.base64.Alphabet.DEFAULT),
                goog.crypt.base64.init_(),
                (t = goog.crypt.base64.byteToCharMaps_[t]);
              for (var o = [], r = 0; r < e.length; r += 3) {
                var s = e[r],
                  i = r + 1 < e.length,
                  n = i ? e[r + 1] : 0,
                  a = r + 2 < e.length,
                  u = a ? e[r + 2] : 0,
                  g = s >> 2;
                (s = ((3 & s) << 4) | (n >> 4)),
                  (n = ((15 & n) << 2) | (u >> 6)),
                  (u &= 63),
                  a || ((u = 64), i || (n = 64)),
                  o.push(t[g], t[s], t[n] || "", t[u] || "");
              }
              return o.join("");
            }),
            (goog.crypt.base64.encodeString = function (e, t) {
              return goog.crypt.base64.HAS_NATIVE_ENCODE_ && !t
                ? goog.global.btoa(e)
                : goog.crypt.base64.encodeByteArray(
                    goog.crypt.stringToByteArray(e),
                    t
                  );
            }),
            (goog.crypt.base64.decodeString = function (e, t) {
              if (goog.crypt.base64.HAS_NATIVE_DECODE_ && !t)
                return goog.global.atob(e);
              var o = "";
              return (
                goog.crypt.base64.decodeStringInternal_(e, function (e) {
                  o += String.fromCharCode(e);
                }),
                o
              );
            }),
            (goog.crypt.base64.decodeStringToByteArray = function (e, t) {
              var o = [];
              return (
                goog.crypt.base64.decodeStringInternal_(e, function (e) {
                  o.push(e);
                }),
                o
              );
            }),
            (goog.crypt.base64.decodeStringToUint8Array = function (e) {
              goog.asserts.assert(
                !goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10"),
                "Browser does not support typed arrays"
              );
              var t = e.length,
                o = (3 * t) / 4;
              o % 3
                ? (o = Math.floor(o))
                : goog.crypt.base64.isPadding_(e[t - 1]) &&
                  (o = goog.crypt.base64.isPadding_(e[t - 2]) ? o - 2 : o - 1);
              var r = new Uint8Array(o),
                s = 0;
              return (
                goog.crypt.base64.decodeStringInternal_(e, function (e) {
                  r[s++] = e;
                }),
                r.subarray(0, s)
              );
            }),
            (goog.crypt.base64.decodeStringInternal_ = function (e, t) {
              function o(t) {
                for (; r < e.length; ) {
                  var o = e.charAt(r++),
                    s = goog.crypt.base64.charToByteMap_[o];
                  if (null != s) return s;
                  if (!goog.string.isEmptyOrWhitespace(o))
                    throw Error("Unknown base64 encoding at char: " + o);
                }
                return t;
              }
              goog.crypt.base64.init_();
              for (var r = 0; ; ) {
                var s = o(-1),
                  i = o(0),
                  n = o(64),
                  a = o(64);
                if (64 === a && -1 === s) break;
                t((s << 2) | (i >> 4)),
                  64 != n &&
                    (t(((i << 4) & 240) | (n >> 2)),
                    64 != a && t(((n << 6) & 192) | a));
              }
            }),
            (goog.crypt.base64.init_ = function () {
              if (!goog.crypt.base64.charToByteMap_) {
                goog.crypt.base64.charToByteMap_ = {};
                for (
                  var e = goog.crypt.base64.DEFAULT_ALPHABET_COMMON_.split(""),
                    t = ["+/=", "+/", "-_=", "-_.", "-_"],
                    o = 0;
                  5 > o;
                  o++
                ) {
                  var r = e.concat(t[o].split(""));
                  goog.crypt.base64.byteToCharMaps_[o] = r;
                  for (var s = 0; s < r.length; s++) {
                    var i = r[s],
                      n = goog.crypt.base64.charToByteMap_[i];
                    void 0 === n
                      ? (goog.crypt.base64.charToByteMap_[i] = s)
                      : goog.asserts.assert(n === s);
                  }
                }
              }
            }),
            (jspb.utils = {}),
            (jspb.utils.split64Low = 0),
            (jspb.utils.split64High = 0),
            (jspb.utils.splitUint64 = function (e) {
              var t = e >>> 0;
              (e = Math.floor((e - t) / jspb.BinaryConstants.TWO_TO_32) >>> 0),
                (jspb.utils.split64Low = t),
                (jspb.utils.split64High = e);
            }),
            (jspb.utils.splitInt64 = function (e) {
              var t = 0 > e,
                o = (e = Math.abs(e)) >>> 0;
              (e = Math.floor((e - o) / jspb.BinaryConstants.TWO_TO_32)),
                (e >>>= 0),
                t &&
                  ((e = ~e >>> 0),
                  4294967295 < (o = 1 + (~o >>> 0)) &&
                    ((o = 0), 4294967295 < ++e && (e = 0))),
                (jspb.utils.split64Low = o),
                (jspb.utils.split64High = e);
            }),
            (jspb.utils.splitZigzag64 = function (e) {
              var t = 0 > e;
              (e = 2 * Math.abs(e)),
                jspb.utils.splitUint64(e),
                (e = jspb.utils.split64Low);
              var o = jspb.utils.split64High;
              t &&
                (0 == e
                  ? 0 == o
                    ? (o = e = 4294967295)
                    : (o--, (e = 4294967295))
                  : e--),
                (jspb.utils.split64Low = e),
                (jspb.utils.split64High = o);
            }),
            (jspb.utils.splitFloat32 = function (e) {
              var t = 0 > e ? 1 : 0;
              if (0 === (e = t ? -e : e))
                0 < 1 / e
                  ? ((jspb.utils.split64High = 0), (jspb.utils.split64Low = 0))
                  : ((jspb.utils.split64High = 0),
                    (jspb.utils.split64Low = 2147483648));
              else if (isNaN(e))
                (jspb.utils.split64High = 0),
                  (jspb.utils.split64Low = 2147483647);
              else if (e > jspb.BinaryConstants.FLOAT32_MAX)
                (jspb.utils.split64High = 0),
                  (jspb.utils.split64Low = ((t << 31) | 2139095040) >>> 0);
              else if (e < jspb.BinaryConstants.FLOAT32_MIN)
                (e = Math.round(e / Math.pow(2, -149))),
                  (jspb.utils.split64High = 0),
                  (jspb.utils.split64Low = ((t << 31) | e) >>> 0);
              else {
                var o = Math.floor(Math.log(e) / Math.LN2);
                (e *= Math.pow(2, -o)),
                  (e =
                    8388607 & Math.round(e * jspb.BinaryConstants.TWO_TO_23)),
                  (jspb.utils.split64High = 0),
                  (jspb.utils.split64Low =
                    ((t << 31) | ((o + 127) << 23) | e) >>> 0);
              }
            }),
            (jspb.utils.splitFloat64 = function (e) {
              var t = 0 > e ? 1 : 0;
              if (0 === (e = t ? -e : e))
                (jspb.utils.split64High = 0 < 1 / e ? 0 : 2147483648),
                  (jspb.utils.split64Low = 0);
              else if (isNaN(e))
                (jspb.utils.split64High = 2147483647),
                  (jspb.utils.split64Low = 4294967295);
              else if (e > jspb.BinaryConstants.FLOAT64_MAX)
                (jspb.utils.split64High = ((t << 31) | 2146435072) >>> 0),
                  (jspb.utils.split64Low = 0);
              else if (e < jspb.BinaryConstants.FLOAT64_MIN) {
                var o = e / Math.pow(2, -1074);
                (e = o / jspb.BinaryConstants.TWO_TO_32),
                  (jspb.utils.split64High = ((t << 31) | e) >>> 0),
                  (jspb.utils.split64Low = o >>> 0);
              } else {
                var r = 0;
                if (2 <= (o = e)) for (; 2 <= o && 1023 > r; ) r++, (o /= 2);
                else for (; 1 > o && -1022 < r; ) (o *= 2), r--;
                (e =
                  ((o = e * Math.pow(2, -r)) * jspb.BinaryConstants.TWO_TO_20) &
                  1048575),
                  (o = (o * jspb.BinaryConstants.TWO_TO_52) >>> 0),
                  (jspb.utils.split64High =
                    ((t << 31) | ((r + 1023) << 20) | e) >>> 0),
                  (jspb.utils.split64Low = o);
              }
            }),
            (jspb.utils.splitHash64 = function (e) {
              var t = e.charCodeAt(0),
                o = e.charCodeAt(1),
                r = e.charCodeAt(2),
                s = e.charCodeAt(3),
                i = e.charCodeAt(4),
                n = e.charCodeAt(5),
                a = e.charCodeAt(6);
              (e = e.charCodeAt(7)),
                (jspb.utils.split64Low =
                  (t + (o << 8) + (r << 16) + (s << 24)) >>> 0),
                (jspb.utils.split64High =
                  (i + (n << 8) + (a << 16) + (e << 24)) >>> 0);
            }),
            (jspb.utils.joinUint64 = function (e, t) {
              return t * jspb.BinaryConstants.TWO_TO_32 + (e >>> 0);
            }),
            (jspb.utils.joinInt64 = function (e, t) {
              var o = 2147483648 & t;
              return (
                o &&
                  ((t = ~t >>> 0),
                  0 == (e = (1 + ~e) >>> 0) && (t = (t + 1) >>> 0)),
                (e = jspb.utils.joinUint64(e, t)),
                o ? -e : e
              );
            }),
            (jspb.utils.toZigzag64 = function (e, t, o) {
              var r = t >> 31;
              return o((e << 1) ^ r, ((t << 1) | (e >>> 31)) ^ r);
            }),
            (jspb.utils.joinZigzag64 = function (e, t) {
              return jspb.utils.fromZigzag64(e, t, jspb.utils.joinInt64);
            }),
            (jspb.utils.fromZigzag64 = function (e, t, o) {
              var r = -(1 & e);
              return o(((e >>> 1) | (t << 31)) ^ r, (t >>> 1) ^ r);
            }),
            (jspb.utils.joinFloat32 = function (e, t) {
              t = 2 * (e >> 31) + 1;
              var o = (e >>> 23) & 255;
              return (
                (e &= 8388607),
                255 == o
                  ? e
                    ? NaN
                    : (1 / 0) * t
                  : 0 == o
                  ? t * Math.pow(2, -149) * e
                  : t * Math.pow(2, o - 150) * (e + Math.pow(2, 23))
              );
            }),
            (jspb.utils.joinFloat64 = function (e, t) {
              var o = 2 * (t >> 31) + 1,
                r = (t >>> 20) & 2047;
              return (
                (e = jspb.BinaryConstants.TWO_TO_32 * (1048575 & t) + e),
                2047 == r
                  ? e
                    ? NaN
                    : (1 / 0) * o
                  : 0 == r
                  ? o * Math.pow(2, -1074) * e
                  : o *
                    Math.pow(2, r - 1075) *
                    (e + jspb.BinaryConstants.TWO_TO_52)
              );
            }),
            (jspb.utils.joinHash64 = function (e, t) {
              return String.fromCharCode(
                (e >>> 0) & 255,
                (e >>> 8) & 255,
                (e >>> 16) & 255,
                (e >>> 24) & 255,
                (t >>> 0) & 255,
                (t >>> 8) & 255,
                (t >>> 16) & 255,
                (t >>> 24) & 255
              );
            }),
            (jspb.utils.DIGITS = "0123456789abcdef".split("")),
            (jspb.utils.ZERO_CHAR_CODE_ = 48),
            (jspb.utils.A_CHAR_CODE_ = 97),
            (jspb.utils.joinUnsignedDecimalString = function (e, t) {
              function o(e, t) {
                return (
                  (e = e ? String(e) : ""),
                  t ? "0000000".slice(e.length) + e : e
                );
              }
              if (2097151 >= t)
                return "" + (jspb.BinaryConstants.TWO_TO_32 * t + e);
              var r = (((e >>> 24) | (t << 8)) >>> 0) & 16777215;
              return (
                (e =
                  (16777215 & e) +
                  6777216 * r +
                  6710656 * (t = (t >> 16) & 65535)),
                (r += 8147497 * t),
                (t *= 2),
                1e7 <= e && ((r += Math.floor(e / 1e7)), (e %= 1e7)),
                1e7 <= r && ((t += Math.floor(r / 1e7)), (r %= 1e7)),
                o(t, 0) + o(r, t) + o(e, 1)
              );
            }),
            (jspb.utils.joinSignedDecimalString = function (e, t) {
              var o = 2147483648 & t;
              return (
                o && (t = (~t + (0 == (e = (1 + ~e) >>> 0) ? 1 : 0)) >>> 0),
                (e = jspb.utils.joinUnsignedDecimalString(e, t)),
                o ? "-" + e : e
              );
            }),
            (jspb.utils.hash64ToDecimalString = function (e, t) {
              jspb.utils.splitHash64(e), (e = jspb.utils.split64Low);
              var o = jspb.utils.split64High;
              return t
                ? jspb.utils.joinSignedDecimalString(e, o)
                : jspb.utils.joinUnsignedDecimalString(e, o);
            }),
            (jspb.utils.hash64ArrayToDecimalStrings = function (e, t) {
              for (var o = Array(e.length), r = 0; r < e.length; r++)
                o[r] = jspb.utils.hash64ToDecimalString(e[r], t);
              return o;
            }),
            (jspb.utils.decimalStringToHash64 = function (e) {
              function t(e, t) {
                for (var o = 0; 8 > o && (1 !== e || 0 < t); o++)
                  (t = e * r[o] + t), (r[o] = 255 & t), (t >>>= 8);
              }
              goog.asserts.assert(0 < e.length);
              var o = !1;
              "-" === e[0] && ((o = !0), (e = e.slice(1)));
              for (var r = [0, 0, 0, 0, 0, 0, 0, 0], s = 0; s < e.length; s++)
                t(10, e.charCodeAt(s) - jspb.utils.ZERO_CHAR_CODE_);
              return (
                o &&
                  ((function () {
                    for (var e = 0; 8 > e; e++) r[e] = 255 & ~r[e];
                  })(),
                  t(1, 1)),
                goog.crypt.byteArrayToString(r)
              );
            }),
            (jspb.utils.splitDecimalString = function (e) {
              jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(e));
            }),
            (jspb.utils.toHexDigit_ = function (e) {
              return String.fromCharCode(
                10 > e
                  ? jspb.utils.ZERO_CHAR_CODE_ + e
                  : jspb.utils.A_CHAR_CODE_ - 10 + e
              );
            }),
            (jspb.utils.fromHexCharCode_ = function (e) {
              return e >= jspb.utils.A_CHAR_CODE_
                ? e - jspb.utils.A_CHAR_CODE_ + 10
                : e - jspb.utils.ZERO_CHAR_CODE_;
            }),
            (jspb.utils.hash64ToHexString = function (e) {
              var t = Array(18);
              (t[0] = "0"), (t[1] = "x");
              for (var o = 0; 8 > o; o++) {
                var r = e.charCodeAt(7 - o);
                (t[2 * o + 2] = jspb.utils.toHexDigit_(r >> 4)),
                  (t[2 * o + 3] = jspb.utils.toHexDigit_(15 & r));
              }
              return t.join("");
            }),
            (jspb.utils.hexStringToHash64 = function (e) {
              (e = e.toLowerCase()),
                goog.asserts.assert(18 == e.length),
                goog.asserts.assert("0" == e[0]),
                goog.asserts.assert("x" == e[1]);
              for (var t = "", o = 0; 8 > o; o++) {
                var r = jspb.utils.fromHexCharCode_(e.charCodeAt(2 * o + 2)),
                  s = jspb.utils.fromHexCharCode_(e.charCodeAt(2 * o + 3));
                t = String.fromCharCode(16 * r + s) + t;
              }
              return t;
            }),
            (jspb.utils.hash64ToNumber = function (e, t) {
              jspb.utils.splitHash64(e), (e = jspb.utils.split64Low);
              var o = jspb.utils.split64High;
              return t
                ? jspb.utils.joinInt64(e, o)
                : jspb.utils.joinUint64(e, o);
            }),
            (jspb.utils.numberToHash64 = function (e) {
              return (
                jspb.utils.splitInt64(e),
                jspb.utils.joinHash64(
                  jspb.utils.split64Low,
                  jspb.utils.split64High
                )
              );
            }),
            (jspb.utils.countVarints = function (e, t, o) {
              for (var r = 0, s = t; s < o; s++) r += e[s] >> 7;
              return o - t - r;
            }),
            (jspb.utils.countVarintFields = function (e, t, o, r) {
              var s = 0;
              if (128 > (r = 8 * r + jspb.BinaryConstants.WireType.VARINT))
                for (; t < o && e[t++] == r; )
                  for (s++; ; ) {
                    var i = e[t++];
                    if (!(128 & i)) break;
                  }
              else
                for (; t < o; ) {
                  for (i = r; 128 < i; ) {
                    if (e[t] != ((127 & i) | 128)) return s;
                    t++, (i >>= 7);
                  }
                  if (e[t++] != i) break;
                  for (s++; 128 & (i = e[t++]); );
                }
              return s;
            }),
            (jspb.utils.countFixedFields_ = function (e, t, o, r, s) {
              var i = 0;
              if (128 > r) for (; t < o && e[t++] == r; ) i++, (t += s);
              else
                for (; t < o; ) {
                  for (var n = r; 128 < n; ) {
                    if (e[t++] != ((127 & n) | 128)) return i;
                    n >>= 7;
                  }
                  if (e[t++] != n) break;
                  i++, (t += s);
                }
              return i;
            }),
            (jspb.utils.countFixed32Fields = function (e, t, o, r) {
              return jspb.utils.countFixedFields_(
                e,
                t,
                o,
                8 * r + jspb.BinaryConstants.WireType.FIXED32,
                4
              );
            }),
            (jspb.utils.countFixed64Fields = function (e, t, o, r) {
              return jspb.utils.countFixedFields_(
                e,
                t,
                o,
                8 * r + jspb.BinaryConstants.WireType.FIXED64,
                8
              );
            }),
            (jspb.utils.countDelimitedFields = function (e, t, o, r) {
              var s = 0;
              for (
                r = 8 * r + jspb.BinaryConstants.WireType.DELIMITED;
                t < o;

              ) {
                for (var i = r; 128 < i; ) {
                  if (e[t++] != ((127 & i) | 128)) return s;
                  i >>= 7;
                }
                if (e[t++] != i) break;
                s++;
                for (
                  var n = 0, a = 1;
                  (n += (127 & (i = e[t++])) * a), (a *= 128), 128 & i;

                );
                t += n;
              }
              return s;
            }),
            (jspb.utils.debugBytesToTextFormat = function (e) {
              var t = '"';
              if (e) {
                e = jspb.utils.byteSourceToUint8Array(e);
                for (var o = 0; o < e.length; o++)
                  (t += "\\x"),
                    16 > e[o] && (t += "0"),
                    (t += e[o].toString(16));
              }
              return t + '"';
            }),
            (jspb.utils.debugScalarToTextFormat = function (e) {
              return "string" == typeof e ? goog.string.quote(e) : e.toString();
            }),
            (jspb.utils.stringToByteArray = function (e) {
              for (var t = new Uint8Array(e.length), o = 0; o < e.length; o++) {
                var r = e.charCodeAt(o);
                if (255 < r)
                  throw Error(
                    "Conversion error: string contains codepoint outside of byte range"
                  );
                t[o] = r;
              }
              return t;
            }),
            (jspb.utils.byteSourceToUint8Array = function (e) {
              return e.constructor === Uint8Array
                ? e
                : e.constructor === ArrayBuffer ||
                  (void 0 !== Buffer && e.constructor === Buffer) ||
                  e.constructor === Array
                ? new Uint8Array(e)
                : e.constructor === String
                ? goog.crypt.base64.decodeStringToUint8Array(e)
                : (goog.asserts.fail("Type not convertible to Uint8Array."),
                  new Uint8Array(0));
            }),
            (jspb.BinaryDecoder = function (e, t, o) {
              (this.bytes_ = null),
                (this.cursor_ = this.end_ = this.start_ = 0),
                (this.error_ = !1),
                e && this.setBlock(e, t, o);
            }),
            (jspb.BinaryDecoder.instanceCache_ = []),
            (jspb.BinaryDecoder.alloc = function (e, t, o) {
              if (jspb.BinaryDecoder.instanceCache_.length) {
                var r = jspb.BinaryDecoder.instanceCache_.pop();
                return e && r.setBlock(e, t, o), r;
              }
              return new jspb.BinaryDecoder(e, t, o);
            }),
            (jspb.BinaryDecoder.prototype.free = function () {
              this.clear(),
                100 > jspb.BinaryDecoder.instanceCache_.length &&
                  jspb.BinaryDecoder.instanceCache_.push(this);
            }),
            (jspb.BinaryDecoder.prototype.clone = function () {
              return jspb.BinaryDecoder.alloc(
                this.bytes_,
                this.start_,
                this.end_ - this.start_
              );
            }),
            (jspb.BinaryDecoder.prototype.clear = function () {
              (this.bytes_ = null),
                (this.cursor_ = this.end_ = this.start_ = 0),
                (this.error_ = !1);
            }),
            (jspb.BinaryDecoder.prototype.getBuffer = function () {
              return this.bytes_;
            }),
            (jspb.BinaryDecoder.prototype.setBlock = function (e, t, o) {
              (this.bytes_ = jspb.utils.byteSourceToUint8Array(e)),
                (this.start_ = void 0 !== t ? t : 0),
                (this.end_ =
                  void 0 !== o ? this.start_ + o : this.bytes_.length),
                (this.cursor_ = this.start_);
            }),
            (jspb.BinaryDecoder.prototype.getEnd = function () {
              return this.end_;
            }),
            (jspb.BinaryDecoder.prototype.setEnd = function (e) {
              this.end_ = e;
            }),
            (jspb.BinaryDecoder.prototype.reset = function () {
              this.cursor_ = this.start_;
            }),
            (jspb.BinaryDecoder.prototype.getCursor = function () {
              return this.cursor_;
            }),
            (jspb.BinaryDecoder.prototype.setCursor = function (e) {
              this.cursor_ = e;
            }),
            (jspb.BinaryDecoder.prototype.advance = function (e) {
              (this.cursor_ += e),
                goog.asserts.assert(this.cursor_ <= this.end_);
            }),
            (jspb.BinaryDecoder.prototype.atEnd = function () {
              return this.cursor_ == this.end_;
            }),
            (jspb.BinaryDecoder.prototype.pastEnd = function () {
              return this.cursor_ > this.end_;
            }),
            (jspb.BinaryDecoder.prototype.getError = function () {
              return (
                this.error_ || 0 > this.cursor_ || this.cursor_ > this.end_
              );
            }),
            (jspb.BinaryDecoder.prototype.readSplitVarint64 = function (e) {
              for (var t = 128, o = 0, r = 0, s = 0; 4 > s && 128 <= t; s++)
                o |= (127 & (t = this.bytes_[this.cursor_++])) << (7 * s);
              if (
                (128 <= t &&
                  ((o |= (127 & (t = this.bytes_[this.cursor_++])) << 28),
                  (r |= (127 & t) >> 4)),
                128 <= t)
              )
                for (s = 0; 5 > s && 128 <= t; s++)
                  r |= (127 & (t = this.bytes_[this.cursor_++])) << (7 * s + 3);
              if (128 > t) return e(o >>> 0, r >>> 0);
              goog.asserts.fail("Failed to read varint, encoding is invalid."),
                (this.error_ = !0);
            }),
            (jspb.BinaryDecoder.prototype.readSplitZigzagVarint64 = function (
              e
            ) {
              return this.readSplitVarint64(function (t, o) {
                return jspb.utils.fromZigzag64(t, o, e);
              });
            }),
            (jspb.BinaryDecoder.prototype.readSplitFixed64 = function (e) {
              var t = this.bytes_,
                o = this.cursor_;
              this.cursor_ += 8;
              for (var r = 0, s = 0, i = o + 7; i >= o; i--)
                (r = (r << 8) | t[i]), (s = (s << 8) | t[i + 4]);
              return e(r, s);
            }),
            (jspb.BinaryDecoder.prototype.skipVarint = function () {
              for (; 128 & this.bytes_[this.cursor_]; ) this.cursor_++;
              this.cursor_++;
            }),
            (jspb.BinaryDecoder.prototype.unskipVarint = function (e) {
              for (; 128 < e; ) this.cursor_--, (e >>>= 7);
              this.cursor_--;
            }),
            (jspb.BinaryDecoder.prototype.readUnsignedVarint32 = function () {
              var e = this.bytes_,
                t = e[this.cursor_ + 0],
                o = 127 & t;
              return 128 > t
                ? ((this.cursor_ += 1),
                  goog.asserts.assert(this.cursor_ <= this.end_),
                  o)
                : ((o |= (127 & (t = e[this.cursor_ + 1])) << 7),
                  128 > t
                    ? ((this.cursor_ += 2),
                      goog.asserts.assert(this.cursor_ <= this.end_),
                      o)
                    : ((o |= (127 & (t = e[this.cursor_ + 2])) << 14),
                      128 > t
                        ? ((this.cursor_ += 3),
                          goog.asserts.assert(this.cursor_ <= this.end_),
                          o)
                        : ((o |= (127 & (t = e[this.cursor_ + 3])) << 21),
                          128 > t
                            ? ((this.cursor_ += 4),
                              goog.asserts.assert(this.cursor_ <= this.end_),
                              o)
                            : ((o |= (15 & (t = e[this.cursor_ + 4])) << 28),
                              128 > t
                                ? ((this.cursor_ += 5),
                                  goog.asserts.assert(
                                    this.cursor_ <= this.end_
                                  ),
                                  o >>> 0)
                                : ((this.cursor_ += 5),
                                  128 <= e[this.cursor_++] &&
                                    128 <= e[this.cursor_++] &&
                                    128 <= e[this.cursor_++] &&
                                    128 <= e[this.cursor_++] &&
                                    128 <= e[this.cursor_++] &&
                                    goog.asserts.assert(!1),
                                  goog.asserts.assert(
                                    this.cursor_ <= this.end_
                                  ),
                                  o)))));
            }),
            (jspb.BinaryDecoder.prototype.readSignedVarint32 =
              jspb.BinaryDecoder.prototype.readUnsignedVarint32),
            (jspb.BinaryDecoder.prototype.readUnsignedVarint32String =
              function () {
                return this.readUnsignedVarint32().toString();
              }),
            (jspb.BinaryDecoder.prototype.readSignedVarint32String =
              function () {
                return this.readSignedVarint32().toString();
              }),
            (jspb.BinaryDecoder.prototype.readZigzagVarint32 = function () {
              var e = this.readUnsignedVarint32();
              return (e >>> 1) ^ -(1 & e);
            }),
            (jspb.BinaryDecoder.prototype.readUnsignedVarint64 = function () {
              return this.readSplitVarint64(jspb.utils.joinUint64);
            }),
            (jspb.BinaryDecoder.prototype.readUnsignedVarint64String =
              function () {
                return this.readSplitVarint64(
                  jspb.utils.joinUnsignedDecimalString
                );
              }),
            (jspb.BinaryDecoder.prototype.readSignedVarint64 = function () {
              return this.readSplitVarint64(jspb.utils.joinInt64);
            }),
            (jspb.BinaryDecoder.prototype.readSignedVarint64String =
              function () {
                return this.readSplitVarint64(
                  jspb.utils.joinSignedDecimalString
                );
              }),
            (jspb.BinaryDecoder.prototype.readZigzagVarint64 = function () {
              return this.readSplitVarint64(jspb.utils.joinZigzag64);
            }),
            (jspb.BinaryDecoder.prototype.readZigzagVarintHash64 = function () {
              return this.readSplitZigzagVarint64(jspb.utils.joinHash64);
            }),
            (jspb.BinaryDecoder.prototype.readZigzagVarint64String =
              function () {
                return this.readSplitZigzagVarint64(
                  jspb.utils.joinSignedDecimalString
                );
              }),
            (jspb.BinaryDecoder.prototype.readUint8 = function () {
              var e = this.bytes_[this.cursor_ + 0];
              return (
                (this.cursor_ += 1),
                goog.asserts.assert(this.cursor_ <= this.end_),
                e
              );
            }),
            (jspb.BinaryDecoder.prototype.readUint16 = function () {
              var e = this.bytes_[this.cursor_ + 0],
                t = this.bytes_[this.cursor_ + 1];
              return (
                (this.cursor_ += 2),
                goog.asserts.assert(this.cursor_ <= this.end_),
                e | (t << 8)
              );
            }),
            (jspb.BinaryDecoder.prototype.readUint32 = function () {
              var e = this.bytes_[this.cursor_ + 0],
                t = this.bytes_[this.cursor_ + 1],
                o = this.bytes_[this.cursor_ + 2],
                r = this.bytes_[this.cursor_ + 3];
              return (
                (this.cursor_ += 4),
                goog.asserts.assert(this.cursor_ <= this.end_),
                (e | (t << 8) | (o << 16) | (r << 24)) >>> 0
              );
            }),
            (jspb.BinaryDecoder.prototype.readUint64 = function () {
              var e = this.readUint32(),
                t = this.readUint32();
              return jspb.utils.joinUint64(e, t);
            }),
            (jspb.BinaryDecoder.prototype.readUint64String = function () {
              var e = this.readUint32(),
                t = this.readUint32();
              return jspb.utils.joinUnsignedDecimalString(e, t);
            }),
            (jspb.BinaryDecoder.prototype.readInt8 = function () {
              var e = this.bytes_[this.cursor_ + 0];
              return (
                (this.cursor_ += 1),
                goog.asserts.assert(this.cursor_ <= this.end_),
                (e << 24) >> 24
              );
            }),
            (jspb.BinaryDecoder.prototype.readInt16 = function () {
              var e = this.bytes_[this.cursor_ + 0],
                t = this.bytes_[this.cursor_ + 1];
              return (
                (this.cursor_ += 2),
                goog.asserts.assert(this.cursor_ <= this.end_),
                ((e | (t << 8)) << 16) >> 16
              );
            }),
            (jspb.BinaryDecoder.prototype.readInt32 = function () {
              var e = this.bytes_[this.cursor_ + 0],
                t = this.bytes_[this.cursor_ + 1],
                o = this.bytes_[this.cursor_ + 2],
                r = this.bytes_[this.cursor_ + 3];
              return (
                (this.cursor_ += 4),
                goog.asserts.assert(this.cursor_ <= this.end_),
                e | (t << 8) | (o << 16) | (r << 24)
              );
            }),
            (jspb.BinaryDecoder.prototype.readInt64 = function () {
              var e = this.readUint32(),
                t = this.readUint32();
              return jspb.utils.joinInt64(e, t);
            }),
            (jspb.BinaryDecoder.prototype.readInt64String = function () {
              var e = this.readUint32(),
                t = this.readUint32();
              return jspb.utils.joinSignedDecimalString(e, t);
            }),
            (jspb.BinaryDecoder.prototype.readFloat = function () {
              var e = this.readUint32();
              return jspb.utils.joinFloat32(e, 0);
            }),
            (jspb.BinaryDecoder.prototype.readDouble = function () {
              var e = this.readUint32(),
                t = this.readUint32();
              return jspb.utils.joinFloat64(e, t);
            }),
            (jspb.BinaryDecoder.prototype.readBool = function () {
              return !!this.bytes_[this.cursor_++];
            }),
            (jspb.BinaryDecoder.prototype.readEnum = function () {
              return this.readSignedVarint32();
            }),
            (jspb.BinaryDecoder.prototype.readString = function (e) {
              var t = this.bytes_,
                o = this.cursor_;
              e = o + e;
              for (var r = [], s = ""; o < e; ) {
                var i = t[o++];
                if (128 > i) r.push(i);
                else {
                  if (192 > i) continue;
                  if (224 > i) {
                    var n = t[o++];
                    r.push(((31 & i) << 6) | (63 & n));
                  } else if (240 > i) {
                    n = t[o++];
                    var a = t[o++];
                    r.push(((15 & i) << 12) | ((63 & n) << 6) | (63 & a));
                  } else if (248 > i) {
                    (i =
                      ((7 & i) << 18) |
                      ((63 & (n = t[o++])) << 12) |
                      ((63 & (a = t[o++])) << 6) |
                      (63 & t[o++])),
                      (i -= 65536),
                      r.push(55296 + ((i >> 10) & 1023), 56320 + (1023 & i));
                  }
                }
                8192 <= r.length &&
                  ((s += String.fromCharCode.apply(null, r)), (r.length = 0));
              }
              return (
                (s += goog.crypt.byteArrayToString(r)), (this.cursor_ = o), s
              );
            }),
            (jspb.BinaryDecoder.prototype.readStringWithLength = function () {
              var e = this.readUnsignedVarint32();
              return this.readString(e);
            }),
            (jspb.BinaryDecoder.prototype.readBytes = function (e) {
              if (0 > e || this.cursor_ + e > this.bytes_.length)
                return (
                  (this.error_ = !0),
                  goog.asserts.fail("Invalid byte length!"),
                  new Uint8Array(0)
                );
              var t = this.bytes_.subarray(this.cursor_, this.cursor_ + e);
              return (
                (this.cursor_ += e),
                goog.asserts.assert(this.cursor_ <= this.end_),
                t
              );
            }),
            (jspb.BinaryDecoder.prototype.readVarintHash64 = function () {
              return this.readSplitVarint64(jspb.utils.joinHash64);
            }),
            (jspb.BinaryDecoder.prototype.readFixedHash64 = function () {
              var e = this.bytes_,
                t = this.cursor_,
                o = e[t + 0],
                r = e[t + 1],
                s = e[t + 2],
                i = e[t + 3],
                n = e[t + 4],
                a = e[t + 5],
                u = e[t + 6];
              return (
                (e = e[t + 7]),
                (this.cursor_ += 8),
                String.fromCharCode(o, r, s, i, n, a, u, e)
              );
            }),
            (jspb.BinaryReader = function (e, t, o) {
              (this.decoder_ = jspb.BinaryDecoder.alloc(e, t, o)),
                (this.fieldCursor_ = this.decoder_.getCursor()),
                (this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER),
                (this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID),
                (this.error_ = !1),
                (this.readCallbacks_ = null);
            }),
            (jspb.BinaryReader.instanceCache_ = []),
            (jspb.BinaryReader.alloc = function (e, t, o) {
              if (jspb.BinaryReader.instanceCache_.length) {
                var r = jspb.BinaryReader.instanceCache_.pop();
                return e && r.decoder_.setBlock(e, t, o), r;
              }
              return new jspb.BinaryReader(e, t, o);
            }),
            (jspb.BinaryReader.prototype.alloc = jspb.BinaryReader.alloc),
            (jspb.BinaryReader.prototype.free = function () {
              this.decoder_.clear(),
                (this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER),
                (this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID),
                (this.error_ = !1),
                (this.readCallbacks_ = null),
                100 > jspb.BinaryReader.instanceCache_.length &&
                  jspb.BinaryReader.instanceCache_.push(this);
            }),
            (jspb.BinaryReader.prototype.getFieldCursor = function () {
              return this.fieldCursor_;
            }),
            (jspb.BinaryReader.prototype.getCursor = function () {
              return this.decoder_.getCursor();
            }),
            (jspb.BinaryReader.prototype.getBuffer = function () {
              return this.decoder_.getBuffer();
            }),
            (jspb.BinaryReader.prototype.getFieldNumber = function () {
              return this.nextField_;
            }),
            (jspb.BinaryReader.prototype.getWireType = function () {
              return this.nextWireType_;
            }),
            (jspb.BinaryReader.prototype.isEndGroup = function () {
              return (
                this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP
              );
            }),
            (jspb.BinaryReader.prototype.getError = function () {
              return this.error_ || this.decoder_.getError();
            }),
            (jspb.BinaryReader.prototype.setBlock = function (e, t, o) {
              this.decoder_.setBlock(e, t, o),
                (this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER),
                (this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID);
            }),
            (jspb.BinaryReader.prototype.reset = function () {
              this.decoder_.reset(),
                (this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER),
                (this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID);
            }),
            (jspb.BinaryReader.prototype.advance = function (e) {
              this.decoder_.advance(e);
            }),
            (jspb.BinaryReader.prototype.nextField = function () {
              if (this.decoder_.atEnd()) return !1;
              if (this.getError())
                return goog.asserts.fail("Decoder hit an error"), !1;
              this.fieldCursor_ = this.decoder_.getCursor();
              var e = this.decoder_.readUnsignedVarint32(),
                t = e >>> 3;
              return (e &= 7) != jspb.BinaryConstants.WireType.VARINT &&
                e != jspb.BinaryConstants.WireType.FIXED32 &&
                e != jspb.BinaryConstants.WireType.FIXED64 &&
                e != jspb.BinaryConstants.WireType.DELIMITED &&
                e != jspb.BinaryConstants.WireType.START_GROUP &&
                e != jspb.BinaryConstants.WireType.END_GROUP
                ? (goog.asserts.fail(
                    "Invalid wire type: %s (at position %s)",
                    e,
                    this.fieldCursor_
                  ),
                  (this.error_ = !0),
                  !1)
                : ((this.nextField_ = t), (this.nextWireType_ = e), !0);
            }),
            (jspb.BinaryReader.prototype.unskipHeader = function () {
              this.decoder_.unskipVarint(
                (this.nextField_ << 3) | this.nextWireType_
              );
            }),
            (jspb.BinaryReader.prototype.skipMatchingFields = function () {
              var e = this.nextField_;
              for (
                this.unskipHeader();
                this.nextField() && this.getFieldNumber() == e;

              )
                this.skipField();
              this.decoder_.atEnd() || this.unskipHeader();
            }),
            (jspb.BinaryReader.prototype.skipVarintField = function () {
              this.nextWireType_ != jspb.BinaryConstants.WireType.VARINT
                ? (goog.asserts.fail("Invalid wire type for skipVarintField"),
                  this.skipField())
                : this.decoder_.skipVarint();
            }),
            (jspb.BinaryReader.prototype.skipDelimitedField = function () {
              if (this.nextWireType_ != jspb.BinaryConstants.WireType.DELIMITED)
                goog.asserts.fail("Invalid wire type for skipDelimitedField"),
                  this.skipField();
              else {
                var e = this.decoder_.readUnsignedVarint32();
                this.decoder_.advance(e);
              }
            }),
            (jspb.BinaryReader.prototype.skipFixed32Field = function () {
              this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED32
                ? (goog.asserts.fail("Invalid wire type for skipFixed32Field"),
                  this.skipField())
                : this.decoder_.advance(4);
            }),
            (jspb.BinaryReader.prototype.skipFixed64Field = function () {
              this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED64
                ? (goog.asserts.fail("Invalid wire type for skipFixed64Field"),
                  this.skipField())
                : this.decoder_.advance(8);
            }),
            (jspb.BinaryReader.prototype.skipGroup = function () {
              for (var e = this.nextField_; ; ) {
                if (!this.nextField()) {
                  goog.asserts.fail("Unmatched start-group tag: stream EOF"),
                    (this.error_ = !0);
                  break;
                }
                if (
                  this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP
                ) {
                  this.nextField_ != e &&
                    (goog.asserts.fail("Unmatched end-group tag"),
                    (this.error_ = !0));
                  break;
                }
                this.skipField();
              }
            }),
            (jspb.BinaryReader.prototype.skipField = function () {
              switch (this.nextWireType_) {
                case jspb.BinaryConstants.WireType.VARINT:
                  this.skipVarintField();
                  break;
                case jspb.BinaryConstants.WireType.FIXED64:
                  this.skipFixed64Field();
                  break;
                case jspb.BinaryConstants.WireType.DELIMITED:
                  this.skipDelimitedField();
                  break;
                case jspb.BinaryConstants.WireType.FIXED32:
                  this.skipFixed32Field();
                  break;
                case jspb.BinaryConstants.WireType.START_GROUP:
                  this.skipGroup();
                  break;
                default:
                  goog.asserts.fail("Invalid wire encoding for field.");
              }
            }),
            (jspb.BinaryReader.prototype.registerReadCallback = function (
              e,
              t
            ) {
              null === this.readCallbacks_ && (this.readCallbacks_ = {}),
                goog.asserts.assert(!this.readCallbacks_[e]),
                (this.readCallbacks_[e] = t);
            }),
            (jspb.BinaryReader.prototype.runReadCallback = function (e) {
              return (
                goog.asserts.assert(null !== this.readCallbacks_),
                (e = this.readCallbacks_[e]),
                goog.asserts.assert(e),
                e(this)
              );
            }),
            (jspb.BinaryReader.prototype.readAny = function (e) {
              this.nextWireType_ = jspb.BinaryConstants.FieldTypeToWireType(e);
              var t = jspb.BinaryConstants.FieldType;
              switch (e) {
                case t.DOUBLE:
                  return this.readDouble();
                case t.FLOAT:
                  return this.readFloat();
                case t.INT64:
                  return this.readInt64();
                case t.UINT64:
                  return this.readUint64();
                case t.INT32:
                  return this.readInt32();
                case t.FIXED64:
                  return this.readFixed64();
                case t.FIXED32:
                  return this.readFixed32();
                case t.BOOL:
                  return this.readBool();
                case t.STRING:
                  return this.readString();
                case t.GROUP:
                  goog.asserts.fail(
                    "Group field type not supported in readAny()"
                  );
                case t.MESSAGE:
                  goog.asserts.fail(
                    "Message field type not supported in readAny()"
                  );
                case t.BYTES:
                  return this.readBytes();
                case t.UINT32:
                  return this.readUint32();
                case t.ENUM:
                  return this.readEnum();
                case t.SFIXED32:
                  return this.readSfixed32();
                case t.SFIXED64:
                  return this.readSfixed64();
                case t.SINT32:
                  return this.readSint32();
                case t.SINT64:
                  return this.readSint64();
                case t.FHASH64:
                  return this.readFixedHash64();
                case t.VHASH64:
                  return this.readVarintHash64();
                default:
                  goog.asserts.fail("Invalid field type in readAny()");
              }
              return 0;
            }),
            (jspb.BinaryReader.prototype.readMessage = function (e, t) {
              goog.asserts.assert(
                this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED
              );
              var o = this.decoder_.getEnd(),
                r = this.decoder_.readUnsignedVarint32();
              (r = this.decoder_.getCursor() + r),
                this.decoder_.setEnd(r),
                t(e, this),
                this.decoder_.setCursor(r),
                this.decoder_.setEnd(o);
            }),
            (jspb.BinaryReader.prototype.readGroup = function (e, t, o) {
              goog.asserts.assert(
                this.nextWireType_ == jspb.BinaryConstants.WireType.START_GROUP
              ),
                goog.asserts.assert(this.nextField_ == e),
                o(t, this),
                this.error_ ||
                  this.nextWireType_ ==
                    jspb.BinaryConstants.WireType.END_GROUP ||
                  (goog.asserts.fail(
                    "Group submessage did not end with an END_GROUP tag"
                  ),
                  (this.error_ = !0));
            }),
            (jspb.BinaryReader.prototype.getFieldDecoder = function () {
              goog.asserts.assert(
                this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED
              );
              var e = this.decoder_.readUnsignedVarint32(),
                t = this.decoder_.getCursor(),
                o = t + e;
              return (
                (e = jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(), t, e)),
                this.decoder_.setCursor(o),
                e
              );
            }),
            (jspb.BinaryReader.prototype.readInt32 = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readSignedVarint32()
              );
            }),
            (jspb.BinaryReader.prototype.readInt32String = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readSignedVarint32String()
              );
            }),
            (jspb.BinaryReader.prototype.readInt64 = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readSignedVarint64()
              );
            }),
            (jspb.BinaryReader.prototype.readInt64String = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readSignedVarint64String()
              );
            }),
            (jspb.BinaryReader.prototype.readUint32 = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readUnsignedVarint32()
              );
            }),
            (jspb.BinaryReader.prototype.readUint32String = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readUnsignedVarint32String()
              );
            }),
            (jspb.BinaryReader.prototype.readUint64 = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readUnsignedVarint64()
              );
            }),
            (jspb.BinaryReader.prototype.readUint64String = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readUnsignedVarint64String()
              );
            }),
            (jspb.BinaryReader.prototype.readSint32 = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readZigzagVarint32()
              );
            }),
            (jspb.BinaryReader.prototype.readSint64 = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readZigzagVarint64()
              );
            }),
            (jspb.BinaryReader.prototype.readSint64String = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readZigzagVarint64String()
              );
            }),
            (jspb.BinaryReader.prototype.readFixed32 = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32
                ),
                this.decoder_.readUint32()
              );
            }),
            (jspb.BinaryReader.prototype.readFixed64 = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64
                ),
                this.decoder_.readUint64()
              );
            }),
            (jspb.BinaryReader.prototype.readFixed64String = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64
                ),
                this.decoder_.readUint64String()
              );
            }),
            (jspb.BinaryReader.prototype.readSfixed32 = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32
                ),
                this.decoder_.readInt32()
              );
            }),
            (jspb.BinaryReader.prototype.readSfixed32String = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32
                ),
                this.decoder_.readInt32().toString()
              );
            }),
            (jspb.BinaryReader.prototype.readSfixed64 = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64
                ),
                this.decoder_.readInt64()
              );
            }),
            (jspb.BinaryReader.prototype.readSfixed64String = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64
                ),
                this.decoder_.readInt64String()
              );
            }),
            (jspb.BinaryReader.prototype.readFloat = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32
                ),
                this.decoder_.readFloat()
              );
            }),
            (jspb.BinaryReader.prototype.readDouble = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64
                ),
                this.decoder_.readDouble()
              );
            }),
            (jspb.BinaryReader.prototype.readBool = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                !!this.decoder_.readUnsignedVarint32()
              );
            }),
            (jspb.BinaryReader.prototype.readEnum = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readSignedVarint64()
              );
            }),
            (jspb.BinaryReader.prototype.readString = function () {
              goog.asserts.assert(
                this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED
              );
              var e = this.decoder_.readUnsignedVarint32();
              return this.decoder_.readString(e);
            }),
            (jspb.BinaryReader.prototype.readBytes = function () {
              goog.asserts.assert(
                this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED
              );
              var e = this.decoder_.readUnsignedVarint32();
              return this.decoder_.readBytes(e);
            }),
            (jspb.BinaryReader.prototype.readVarintHash64 = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readVarintHash64()
              );
            }),
            (jspb.BinaryReader.prototype.readSintHash64 = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readZigzagVarintHash64()
              );
            }),
            (jspb.BinaryReader.prototype.readSplitVarint64 = function (e) {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readSplitVarint64(e)
              );
            }),
            (jspb.BinaryReader.prototype.readSplitZigzagVarint64 = function (
              e
            ) {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
                ),
                this.decoder_.readSplitVarint64(function (t, o) {
                  return jspb.utils.fromZigzag64(t, o, e);
                })
              );
            }),
            (jspb.BinaryReader.prototype.readFixedHash64 = function () {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64
                ),
                this.decoder_.readFixedHash64()
              );
            }),
            (jspb.BinaryReader.prototype.readSplitFixed64 = function (e) {
              return (
                goog.asserts.assert(
                  this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64
                ),
                this.decoder_.readSplitFixed64(e)
              );
            }),
            (jspb.BinaryReader.prototype.readPackedField_ = function (e) {
              goog.asserts.assert(
                this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED
              );
              var t = this.decoder_.readUnsignedVarint32();
              t = this.decoder_.getCursor() + t;
              for (var o = []; this.decoder_.getCursor() < t; )
                o.push(e.call(this.decoder_));
              return o;
            }),
            (jspb.BinaryReader.prototype.readPackedInt32 = function () {
              return this.readPackedField_(this.decoder_.readSignedVarint32);
            }),
            (jspb.BinaryReader.prototype.readPackedInt32String = function () {
              return this.readPackedField_(
                this.decoder_.readSignedVarint32String
              );
            }),
            (jspb.BinaryReader.prototype.readPackedInt64 = function () {
              return this.readPackedField_(this.decoder_.readSignedVarint64);
            }),
            (jspb.BinaryReader.prototype.readPackedInt64String = function () {
              return this.readPackedField_(
                this.decoder_.readSignedVarint64String
              );
            }),
            (jspb.BinaryReader.prototype.readPackedUint32 = function () {
              return this.readPackedField_(this.decoder_.readUnsignedVarint32);
            }),
            (jspb.BinaryReader.prototype.readPackedUint32String = function () {
              return this.readPackedField_(
                this.decoder_.readUnsignedVarint32String
              );
            }),
            (jspb.BinaryReader.prototype.readPackedUint64 = function () {
              return this.readPackedField_(this.decoder_.readUnsignedVarint64);
            }),
            (jspb.BinaryReader.prototype.readPackedUint64String = function () {
              return this.readPackedField_(
                this.decoder_.readUnsignedVarint64String
              );
            }),
            (jspb.BinaryReader.prototype.readPackedSint32 = function () {
              return this.readPackedField_(this.decoder_.readZigzagVarint32);
            }),
            (jspb.BinaryReader.prototype.readPackedSint64 = function () {
              return this.readPackedField_(this.decoder_.readZigzagVarint64);
            }),
            (jspb.BinaryReader.prototype.readPackedSint64String = function () {
              return this.readPackedField_(
                this.decoder_.readZigzagVarint64String
              );
            }),
            (jspb.BinaryReader.prototype.readPackedFixed32 = function () {
              return this.readPackedField_(this.decoder_.readUint32);
            }),
            (jspb.BinaryReader.prototype.readPackedFixed64 = function () {
              return this.readPackedField_(this.decoder_.readUint64);
            }),
            (jspb.BinaryReader.prototype.readPackedFixed64String = function () {
              return this.readPackedField_(this.decoder_.readUint64String);
            }),
            (jspb.BinaryReader.prototype.readPackedSfixed32 = function () {
              return this.readPackedField_(this.decoder_.readInt32);
            }),
            (jspb.BinaryReader.prototype.readPackedSfixed64 = function () {
              return this.readPackedField_(this.decoder_.readInt64);
            }),
            (jspb.BinaryReader.prototype.readPackedSfixed64String =
              function () {
                return this.readPackedField_(this.decoder_.readInt64String);
              }),
            (jspb.BinaryReader.prototype.readPackedFloat = function () {
              return this.readPackedField_(this.decoder_.readFloat);
            }),
            (jspb.BinaryReader.prototype.readPackedDouble = function () {
              return this.readPackedField_(this.decoder_.readDouble);
            }),
            (jspb.BinaryReader.prototype.readPackedBool = function () {
              return this.readPackedField_(this.decoder_.readBool);
            }),
            (jspb.BinaryReader.prototype.readPackedEnum = function () {
              return this.readPackedField_(this.decoder_.readEnum);
            }),
            (jspb.BinaryReader.prototype.readPackedVarintHash64 = function () {
              return this.readPackedField_(this.decoder_.readVarintHash64);
            }),
            (jspb.BinaryReader.prototype.readPackedFixedHash64 = function () {
              return this.readPackedField_(this.decoder_.readFixedHash64);
            }),
            (jspb.Map = function (e, t) {
              (this.arr_ = e),
                (this.valueCtor_ = t),
                (this.map_ = {}),
                (this.arrClean = !0),
                0 < this.arr_.length && this.loadFromArray_();
            }),
            (jspb.Map.prototype.loadFromArray_ = function () {
              for (var e = 0; e < this.arr_.length; e++) {
                var t = this.arr_[e],
                  o = t[0];
                this.map_[o.toString()] = new jspb.Map.Entry_(o, t[1]);
              }
              this.arrClean = !0;
            }),
            (jspb.Map.prototype.toArray = function () {
              if (this.arrClean) {
                if (this.valueCtor_) {
                  var e,
                    t = this.map_;
                  for (e in t)
                    if (Object.prototype.hasOwnProperty.call(t, e)) {
                      var o = t[e].valueWrapper;
                      o && o.toArray();
                    }
                }
              } else {
                for (
                  this.arr_.length = 0, (t = this.stringKeys_()).sort(), e = 0;
                  e < t.length;
                  e++
                ) {
                  var r = this.map_[t[e]];
                  (o = r.valueWrapper) && o.toArray(),
                    this.arr_.push([r.key, r.value]);
                }
                this.arrClean = !0;
              }
              return this.arr_;
            }),
            (jspb.Map.prototype.toObject = function (e, t) {
              for (var o = this.toArray(), r = [], s = 0; s < o.length; s++) {
                var i = this.map_[o[s][0].toString()];
                this.wrapEntry_(i);
                var n = i.valueWrapper;
                n
                  ? (goog.asserts.assert(t), r.push([i.key, t(e, n)]))
                  : r.push([i.key, i.value]);
              }
              return r;
            }),
            (jspb.Map.fromObject = function (e, t, o) {
              t = new jspb.Map([], t);
              for (var r = 0; r < e.length; r++) {
                var s = e[r][0],
                  i = o(e[r][1]);
                t.set(s, i);
              }
              return t;
            }),
            (jspb.Map.ArrayIteratorIterable_ = function (e) {
              (this.idx_ = 0), (this.arr_ = e);
            }),
            (jspb.Map.ArrayIteratorIterable_.prototype.next = function () {
              return this.idx_ < this.arr_.length
                ? { done: !1, value: this.arr_[this.idx_++] }
                : { done: !0, value: void 0 };
            }),
            "undefined" != typeof Symbol &&
              (jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator] =
                function () {
                  return this;
                }),
            (jspb.Map.prototype.getLength = function () {
              return this.stringKeys_().length;
            }),
            (jspb.Map.prototype.clear = function () {
              (this.map_ = {}), (this.arrClean = !1);
            }),
            (jspb.Map.prototype.del = function (e) {
              e = e.toString();
              var t = this.map_.hasOwnProperty(e);
              return delete this.map_[e], (this.arrClean = !1), t;
            }),
            (jspb.Map.prototype.getEntryList = function () {
              var e = [],
                t = this.stringKeys_();
              t.sort();
              for (var o = 0; o < t.length; o++) {
                var r = this.map_[t[o]];
                e.push([r.key, r.value]);
              }
              return e;
            }),
            (jspb.Map.prototype.entries = function () {
              var e = [],
                t = this.stringKeys_();
              t.sort();
              for (var o = 0; o < t.length; o++) {
                var r = this.map_[t[o]];
                e.push([r.key, this.wrapEntry_(r)]);
              }
              return new jspb.Map.ArrayIteratorIterable_(e);
            }),
            (jspb.Map.prototype.keys = function () {
              var e = [],
                t = this.stringKeys_();
              t.sort();
              for (var o = 0; o < t.length; o++) e.push(this.map_[t[o]].key);
              return new jspb.Map.ArrayIteratorIterable_(e);
            }),
            (jspb.Map.prototype.values = function () {
              var e = [],
                t = this.stringKeys_();
              t.sort();
              for (var o = 0; o < t.length; o++)
                e.push(this.wrapEntry_(this.map_[t[o]]));
              return new jspb.Map.ArrayIteratorIterable_(e);
            }),
            (jspb.Map.prototype.forEach = function (e, t) {
              var o = this.stringKeys_();
              o.sort();
              for (var r = 0; r < o.length; r++) {
                var s = this.map_[o[r]];
                e.call(t, this.wrapEntry_(s), s.key, this);
              }
            }),
            (jspb.Map.prototype.set = function (e, t) {
              var o = new jspb.Map.Entry_(e);
              return (
                this.valueCtor_
                  ? ((o.valueWrapper = t), (o.value = t.toArray()))
                  : (o.value = t),
                (this.map_[e.toString()] = o),
                (this.arrClean = !1),
                this
              );
            }),
            (jspb.Map.prototype.wrapEntry_ = function (e) {
              return this.valueCtor_
                ? (e.valueWrapper ||
                    (e.valueWrapper = new this.valueCtor_(e.value)),
                  e.valueWrapper)
                : e.value;
            }),
            (jspb.Map.prototype.get = function (e) {
              if ((e = this.map_[e.toString()])) return this.wrapEntry_(e);
            }),
            (jspb.Map.prototype.has = function (e) {
              return e.toString() in this.map_;
            }),
            (jspb.Map.prototype.serializeBinary = function (e, t, o, r, s) {
              var i = this.stringKeys_();
              i.sort();
              for (var n = 0; n < i.length; n++) {
                var a = this.map_[i[n]];
                t.beginSubMessage(e),
                  o.call(t, 1, a.key),
                  this.valueCtor_
                    ? r.call(t, 2, this.wrapEntry_(a), s)
                    : r.call(t, 2, a.value),
                  t.endSubMessage();
              }
            }),
            (jspb.Map.deserializeBinary = function (e, t, o, r, s, i, n) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                var a = t.getFieldNumber();
                1 == a
                  ? (i = o.call(t))
                  : 2 == a &&
                    (e.valueCtor_
                      ? (goog.asserts.assert(s),
                        n || (n = new e.valueCtor_()),
                        r.call(t, n, s))
                      : (n = r.call(t)));
              }
              goog.asserts.assert(null != i),
                goog.asserts.assert(null != n),
                e.set(i, n);
            }),
            (jspb.Map.prototype.stringKeys_ = function () {
              var e,
                t = this.map_,
                o = [];
              for (e in t)
                Object.prototype.hasOwnProperty.call(t, e) && o.push(e);
              return o;
            }),
            (jspb.Map.Entry_ = function (e, t) {
              (this.key = e), (this.value = t), (this.valueWrapper = void 0);
            }),
            (jspb.ExtensionFieldInfo = function (e, t, o, r, s) {
              (this.fieldIndex = e),
                (this.fieldName = t),
                (this.ctor = o),
                (this.toObjectFn = r),
                (this.isRepeated = s);
            }),
            (jspb.ExtensionFieldBinaryInfo = function (e, t, o, r, s, i) {
              (this.fieldInfo = e),
                (this.binaryReaderFn = t),
                (this.binaryWriterFn = o),
                (this.binaryMessageSerializeFn = r),
                (this.binaryMessageDeserializeFn = s),
                (this.isPacked = i);
            }),
            (jspb.ExtensionFieldInfo.prototype.isMessageType = function () {
              return !!this.ctor;
            }),
            (jspb.Message = function () {}),
            (jspb.Message.GENERATE_TO_OBJECT = !0),
            (jspb.Message.GENERATE_FROM_OBJECT = !goog.DISALLOW_TEST_ONLY_CODE),
            (jspb.Message.GENERATE_TO_STRING = !0),
            (jspb.Message.ASSUME_LOCAL_ARRAYS = !1),
            (jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS = !0),
            (jspb.Message.SUPPORTS_UINT8ARRAY_ =
              "function" == typeof Uint8Array),
            (jspb.Message.prototype.getJsPbMessageId = function () {
              return this.messageId_;
            }),
            (jspb.Message.getIndex_ = function (e, t) {
              return t + e.arrayIndexOffset_;
            }),
            (jspb.Message.hiddenES6Property_ = function () {}),
            (jspb.Message.getFieldNumber_ = function (e, t) {
              return t - e.arrayIndexOffset_;
            }),
            (jspb.Message.initialize = function (e, t, o, r, s, i) {
              if (
                ((e.wrappers_ = null),
                t || (t = o ? [o] : []),
                (e.messageId_ = o ? String(o) : void 0),
                (e.arrayIndexOffset_ = 0 === o ? -1 : 0),
                (e.array = t),
                jspb.Message.initPivotAndExtensionObject_(e, r),
                (e.convertedPrimitiveFields_ = {}),
                jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS ||
                  (e.repeatedFields = s),
                s)
              )
                for (t = 0; t < s.length; t++)
                  (o = s[t]) < e.pivot_
                    ? ((o = jspb.Message.getIndex_(e, o)),
                      (e.array[o] =
                        e.array[o] || jspb.Message.EMPTY_LIST_SENTINEL_))
                    : (jspb.Message.maybeInitEmptyExtensionObject_(e),
                      (e.extensionObject_[o] =
                        e.extensionObject_[o] ||
                        jspb.Message.EMPTY_LIST_SENTINEL_));
              if (i && i.length)
                for (t = 0; t < i.length; t++)
                  jspb.Message.computeOneofCase(e, i[t]);
            }),
            (jspb.Message.EMPTY_LIST_SENTINEL_ =
              goog.DEBUG && Object.freeze ? Object.freeze([]) : []),
            (jspb.Message.isArray_ = function (e) {
              return jspb.Message.ASSUME_LOCAL_ARRAYS
                ? e instanceof Array
                : goog.isArray(e);
            }),
            (jspb.Message.isExtensionObject_ = function (e) {
              return !(
                null === e ||
                "object" != typeof e ||
                jspb.Message.isArray_(e) ||
                (jspb.Message.SUPPORTS_UINT8ARRAY_ && e instanceof Uint8Array)
              );
            }),
            (jspb.Message.initPivotAndExtensionObject_ = function (e, t) {
              var o = e.array.length,
                r = -1;
              if (
                o &&
                ((r = o - 1),
                (o = e.array[r]),
                jspb.Message.isExtensionObject_(o))
              )
                return (
                  (e.pivot_ = jspb.Message.getFieldNumber_(e, r)),
                  void (e.extensionObject_ = o)
                );
              -1 < t
                ? ((e.pivot_ = Math.max(
                    t,
                    jspb.Message.getFieldNumber_(e, r + 1)
                  )),
                  (e.extensionObject_ = null))
                : (e.pivot_ = Number.MAX_VALUE);
            }),
            (jspb.Message.maybeInitEmptyExtensionObject_ = function (e) {
              var t = jspb.Message.getIndex_(e, e.pivot_);
              e.array[t] || (e.extensionObject_ = e.array[t] = {});
            }),
            (jspb.Message.toObjectList = function (e, t, o) {
              for (var r = [], s = 0; s < e.length; s++)
                r[s] = t.call(e[s], o, e[s]);
              return r;
            }),
            (jspb.Message.toObjectExtension = function (e, t, o, r, s) {
              for (var i in o) {
                var n = o[i],
                  a = r.call(e, n);
                if (null != a) {
                  for (var u in n.fieldName)
                    if (n.fieldName.hasOwnProperty(u)) break;
                  t[u] = n.toObjectFn
                    ? n.isRepeated
                      ? jspb.Message.toObjectList(a, n.toObjectFn, s)
                      : n.toObjectFn(s, a)
                    : a;
                }
              }
            }),
            (jspb.Message.serializeBinaryExtensions = function (e, t, o, r) {
              for (var s in o) {
                var i = o[s],
                  n = i.fieldInfo;
                if (!i.binaryWriterFn)
                  throw Error(
                    "Message extension present that was generated without binary serialization support"
                  );
                var a = r.call(e, n);
                if (null != a)
                  if (n.isMessageType()) {
                    if (!i.binaryMessageSerializeFn)
                      throw Error(
                        "Message extension present holding submessage without binary support enabled, and message is being serialized to binary format"
                      );
                    i.binaryWriterFn.call(
                      t,
                      n.fieldIndex,
                      a,
                      i.binaryMessageSerializeFn
                    );
                  } else i.binaryWriterFn.call(t, n.fieldIndex, a);
              }
            }),
            (jspb.Message.readBinaryExtension = function (e, t, o, r, s) {
              var i = o[t.getFieldNumber()];
              if (i) {
                if (((o = i.fieldInfo), !i.binaryReaderFn))
                  throw Error(
                    "Deserializing extension whose generated code does not support binary format"
                  );
                if (o.isMessageType()) {
                  var n = new o.ctor();
                  i.binaryReaderFn.call(t, n, i.binaryMessageDeserializeFn);
                } else n = i.binaryReaderFn.call(t);
                o.isRepeated && !i.isPacked
                  ? (t = r.call(e, o))
                    ? t.push(n)
                    : s.call(e, o, [n])
                  : s.call(e, o, n);
              } else t.skipField();
            }),
            (jspb.Message.getField = function (e, t) {
              if (t < e.pivot_) {
                t = jspb.Message.getIndex_(e, t);
                var o = e.array[t];
                return o === jspb.Message.EMPTY_LIST_SENTINEL_
                  ? (e.array[t] = [])
                  : o;
              }
              if (e.extensionObject_)
                return (o = e.extensionObject_[t]) ===
                  jspb.Message.EMPTY_LIST_SENTINEL_
                  ? (e.extensionObject_[t] = [])
                  : o;
            }),
            (jspb.Message.getRepeatedField = function (e, t) {
              return jspb.Message.getField(e, t);
            }),
            (jspb.Message.getOptionalFloatingPointField = function (e, t) {
              return null == (e = jspb.Message.getField(e, t)) ? e : +e;
            }),
            (jspb.Message.getBooleanField = function (e, t) {
              return null == (e = jspb.Message.getField(e, t)) ? e : !!e;
            }),
            (jspb.Message.getRepeatedFloatingPointField = function (e, t) {
              var o = jspb.Message.getRepeatedField(e, t);
              if (
                (e.convertedPrimitiveFields_ ||
                  (e.convertedPrimitiveFields_ = {}),
                !e.convertedPrimitiveFields_[t])
              ) {
                for (var r = 0; r < o.length; r++) o[r] = +o[r];
                e.convertedPrimitiveFields_[t] = !0;
              }
              return o;
            }),
            (jspb.Message.getRepeatedBooleanField = function (e, t) {
              var o = jspb.Message.getRepeatedField(e, t);
              if (
                (e.convertedPrimitiveFields_ ||
                  (e.convertedPrimitiveFields_ = {}),
                !e.convertedPrimitiveFields_[t])
              ) {
                for (var r = 0; r < o.length; r++) o[r] = !!o[r];
                e.convertedPrimitiveFields_[t] = !0;
              }
              return o;
            }),
            (jspb.Message.bytesAsB64 = function (e) {
              return null == e || "string" == typeof e
                ? e
                : jspb.Message.SUPPORTS_UINT8ARRAY_ && e instanceof Uint8Array
                ? goog.crypt.base64.encodeByteArray(e)
                : (goog.asserts.fail(
                    "Cannot coerce to b64 string: " + goog.typeOf(e)
                  ),
                  null);
            }),
            (jspb.Message.bytesAsU8 = function (e) {
              return null == e || e instanceof Uint8Array
                ? e
                : "string" == typeof e
                ? goog.crypt.base64.decodeStringToUint8Array(e)
                : (goog.asserts.fail(
                    "Cannot coerce to Uint8Array: " + goog.typeOf(e)
                  ),
                  null);
            }),
            (jspb.Message.bytesListAsB64 = function (e) {
              return (
                jspb.Message.assertConsistentTypes_(e),
                e.length && "string" != typeof e[0]
                  ? goog.array.map(e, jspb.Message.bytesAsB64)
                  : e
              );
            }),
            (jspb.Message.bytesListAsU8 = function (e) {
              return (
                jspb.Message.assertConsistentTypes_(e),
                !e.length || e[0] instanceof Uint8Array
                  ? e
                  : goog.array.map(e, jspb.Message.bytesAsU8)
              );
            }),
            (jspb.Message.assertConsistentTypes_ = function (e) {
              if (goog.DEBUG && e && 1 < e.length) {
                var t = goog.typeOf(e[0]);
                goog.array.forEach(e, function (e) {
                  goog.typeOf(e) != t &&
                    goog.asserts.fail(
                      "Inconsistent type in JSPB repeated field array. Got " +
                        goog.typeOf(e) +
                        " expected " +
                        t
                    );
                });
              }
            }),
            (jspb.Message.getFieldWithDefault = function (e, t, o) {
              return null == (e = jspb.Message.getField(e, t)) ? o : e;
            }),
            (jspb.Message.getBooleanFieldWithDefault = function (e, t, o) {
              return null == (e = jspb.Message.getBooleanField(e, t)) ? o : e;
            }),
            (jspb.Message.getFloatingPointFieldWithDefault = function (
              e,
              t,
              o
            ) {
              return null ==
                (e = jspb.Message.getOptionalFloatingPointField(e, t))
                ? o
                : e;
            }),
            (jspb.Message.getFieldProto3 = jspb.Message.getFieldWithDefault),
            (jspb.Message.getMapField = function (e, t, o, r) {
              if ((e.wrappers_ || (e.wrappers_ = {}), t in e.wrappers_))
                return e.wrappers_[t];
              var s = jspb.Message.getField(e, t);
              if (!s) {
                if (o) return;
                (s = []), jspb.Message.setField(e, t, s);
              }
              return (e.wrappers_[t] = new jspb.Map(s, r));
            }),
            (jspb.Message.setField = function (e, t, o) {
              return (
                goog.asserts.assertInstanceof(e, jspb.Message),
                t < e.pivot_
                  ? (e.array[jspb.Message.getIndex_(e, t)] = o)
                  : (jspb.Message.maybeInitEmptyExtensionObject_(e),
                    (e.extensionObject_[t] = o)),
                e
              );
            }),
            (jspb.Message.setProto3IntField = function (e, t, o) {
              return jspb.Message.setFieldIgnoringDefault_(e, t, o, 0);
            }),
            (jspb.Message.setProto3FloatField = function (e, t, o) {
              return jspb.Message.setFieldIgnoringDefault_(e, t, o, 0);
            }),
            (jspb.Message.setProto3BooleanField = function (e, t, o) {
              return jspb.Message.setFieldIgnoringDefault_(e, t, o, !1);
            }),
            (jspb.Message.setProto3StringField = function (e, t, o) {
              return jspb.Message.setFieldIgnoringDefault_(e, t, o, "");
            }),
            (jspb.Message.setProto3BytesField = function (e, t, o) {
              return jspb.Message.setFieldIgnoringDefault_(e, t, o, "");
            }),
            (jspb.Message.setProto3EnumField = function (e, t, o) {
              return jspb.Message.setFieldIgnoringDefault_(e, t, o, 0);
            }),
            (jspb.Message.setProto3StringIntField = function (e, t, o) {
              return jspb.Message.setFieldIgnoringDefault_(e, t, o, "0");
            }),
            (jspb.Message.setFieldIgnoringDefault_ = function (e, t, o, r) {
              return (
                goog.asserts.assertInstanceof(e, jspb.Message),
                o !== r
                  ? jspb.Message.setField(e, t, o)
                  : (e.array[jspb.Message.getIndex_(e, t)] = null),
                e
              );
            }),
            (jspb.Message.addToRepeatedField = function (e, t, o, r) {
              return (
                goog.asserts.assertInstanceof(e, jspb.Message),
                (t = jspb.Message.getRepeatedField(e, t)),
                null != r ? t.splice(r, 0, o) : t.push(o),
                e
              );
            }),
            (jspb.Message.setOneofField = function (e, t, o, r) {
              return (
                goog.asserts.assertInstanceof(e, jspb.Message),
                (o = jspb.Message.computeOneofCase(e, o)) &&
                  o !== t &&
                  void 0 !== r &&
                  (e.wrappers_ && o in e.wrappers_ && (e.wrappers_[o] = void 0),
                  jspb.Message.setField(e, o, void 0)),
                jspb.Message.setField(e, t, r)
              );
            }),
            (jspb.Message.computeOneofCase = function (e, t) {
              for (var o, r, s = 0; s < t.length; s++) {
                var i = t[s],
                  n = jspb.Message.getField(e, i);
                null != n &&
                  ((o = i), (r = n), jspb.Message.setField(e, i, void 0));
              }
              return o ? (jspb.Message.setField(e, o, r), o) : 0;
            }),
            (jspb.Message.getWrapperField = function (e, t, o, r) {
              if ((e.wrappers_ || (e.wrappers_ = {}), !e.wrappers_[o])) {
                var s = jspb.Message.getField(e, o);
                (r || s) && (e.wrappers_[o] = new t(s));
              }
              return e.wrappers_[o];
            }),
            (jspb.Message.getRepeatedWrapperField = function (e, t, o) {
              return (
                jspb.Message.wrapRepeatedField_(e, t, o),
                (t = e.wrappers_[o]) == jspb.Message.EMPTY_LIST_SENTINEL_ &&
                  (t = e.wrappers_[o] = []),
                t
              );
            }),
            (jspb.Message.wrapRepeatedField_ = function (e, t, o) {
              if ((e.wrappers_ || (e.wrappers_ = {}), !e.wrappers_[o])) {
                for (
                  var r = jspb.Message.getRepeatedField(e, o), s = [], i = 0;
                  i < r.length;
                  i++
                )
                  s[i] = new t(r[i]);
                e.wrappers_[o] = s;
              }
            }),
            (jspb.Message.setWrapperField = function (e, t, o) {
              goog.asserts.assertInstanceof(e, jspb.Message),
                e.wrappers_ || (e.wrappers_ = {});
              var r = o ? o.toArray() : o;
              return (e.wrappers_[t] = o), jspb.Message.setField(e, t, r);
            }),
            (jspb.Message.setOneofWrapperField = function (e, t, o, r) {
              goog.asserts.assertInstanceof(e, jspb.Message),
                e.wrappers_ || (e.wrappers_ = {});
              var s = r ? r.toArray() : r;
              return (
                (e.wrappers_[t] = r), jspb.Message.setOneofField(e, t, o, s)
              );
            }),
            (jspb.Message.setRepeatedWrapperField = function (e, t, o) {
              goog.asserts.assertInstanceof(e, jspb.Message),
                e.wrappers_ || (e.wrappers_ = {}),
                (o = o || []);
              for (var r = [], s = 0; s < o.length; s++) r[s] = o[s].toArray();
              return (e.wrappers_[t] = o), jspb.Message.setField(e, t, r);
            }),
            (jspb.Message.addToRepeatedWrapperField = function (e, t, o, r, s) {
              jspb.Message.wrapRepeatedField_(e, r, t);
              var i = e.wrappers_[t];
              return (
                i || (i = e.wrappers_[t] = []),
                (o = o || new r()),
                (e = jspb.Message.getRepeatedField(e, t)),
                null != s
                  ? (i.splice(s, 0, o), e.splice(s, 0, o.toArray()))
                  : (i.push(o), e.push(o.toArray())),
                o
              );
            }),
            (jspb.Message.toMap = function (e, t, o, r) {
              for (var s = {}, i = 0; i < e.length; i++)
                s[t.call(e[i])] = o ? o.call(e[i], r, e[i]) : e[i];
              return s;
            }),
            (jspb.Message.prototype.syncMapFields_ = function () {
              if (this.wrappers_)
                for (var e in this.wrappers_) {
                  var t = this.wrappers_[e];
                  if (goog.isArray(t))
                    for (var o = 0; o < t.length; o++) t[o] && t[o].toArray();
                  else t && t.toArray();
                }
            }),
            (jspb.Message.prototype.toArray = function () {
              return this.syncMapFields_(), this.array;
            }),
            jspb.Message.GENERATE_TO_STRING &&
              (jspb.Message.prototype.toString = function () {
                return this.syncMapFields_(), this.array.toString();
              }),
            (jspb.Message.prototype.getExtension = function (e) {
              if (this.extensionObject_) {
                this.wrappers_ || (this.wrappers_ = {});
                var t = e.fieldIndex;
                if (e.isRepeated) {
                  if (e.isMessageType())
                    return (
                      this.wrappers_[t] ||
                        (this.wrappers_[t] = goog.array.map(
                          this.extensionObject_[t] || [],
                          function (t) {
                            return new e.ctor(t);
                          }
                        )),
                      this.wrappers_[t]
                    );
                } else if (e.isMessageType())
                  return (
                    !this.wrappers_[t] &&
                      this.extensionObject_[t] &&
                      (this.wrappers_[t] = new e.ctor(
                        this.extensionObject_[t]
                      )),
                    this.wrappers_[t]
                  );
                return this.extensionObject_[t];
              }
            }),
            (jspb.Message.prototype.setExtension = function (e, t) {
              this.wrappers_ || (this.wrappers_ = {}),
                jspb.Message.maybeInitEmptyExtensionObject_(this);
              var o = e.fieldIndex;
              return (
                e.isRepeated
                  ? ((t = t || []),
                    e.isMessageType()
                      ? ((this.wrappers_[o] = t),
                        (this.extensionObject_[o] = goog.array.map(
                          t,
                          function (e) {
                            return e.toArray();
                          }
                        )))
                      : (this.extensionObject_[o] = t))
                  : e.isMessageType()
                  ? ((this.wrappers_[o] = t),
                    (this.extensionObject_[o] = t ? t.toArray() : t))
                  : (this.extensionObject_[o] = t),
                this
              );
            }),
            (jspb.Message.difference = function (e, t) {
              if (!(e instanceof t.constructor))
                throw Error("Messages have different types.");
              var o = e.toArray();
              t = t.toArray();
              var r = [],
                s = 0,
                i = o.length > t.length ? o.length : t.length;
              for (
                e.getJsPbMessageId() &&
                ((r[0] = e.getJsPbMessageId()), (s = 1));
                s < i;
                s++
              )
                jspb.Message.compareFields(o[s], t[s]) || (r[s] = t[s]);
              return new e.constructor(r);
            }),
            (jspb.Message.equals = function (e, t) {
              return (
                e == t ||
                (!(!e || !t) &&
                  e instanceof t.constructor &&
                  jspb.Message.compareFields(e.toArray(), t.toArray()))
              );
            }),
            (jspb.Message.compareExtensions = function (e, t) {
              (e = e || {}), (t = t || {});
              var o,
                r = {};
              for (o in e) r[o] = 0;
              for (o in t) r[o] = 0;
              for (o in r)
                if (!jspb.Message.compareFields(e[o], t[o])) return !1;
              return !0;
            }),
            (jspb.Message.compareFields = function (e, t) {
              if (e == t) return !0;
              if (!goog.isObject(e) || !goog.isObject(t))
                return (
                  !!(
                    ("number" == typeof e && isNaN(e)) ||
                    ("number" == typeof t && isNaN(t))
                  ) && String(e) == String(t)
                );
              if (e.constructor != t.constructor) return !1;
              if (
                jspb.Message.SUPPORTS_UINT8ARRAY_ &&
                e.constructor === Uint8Array
              ) {
                if (e.length != t.length) return !1;
                for (var o = 0; o < e.length; o++) if (e[o] != t[o]) return !1;
                return !0;
              }
              if (e.constructor === Array) {
                var r = void 0,
                  s = void 0,
                  i = Math.max(e.length, t.length);
                for (o = 0; o < i; o++) {
                  var n = e[o],
                    a = t[o];
                  if (
                    (n &&
                      n.constructor == Object &&
                      (goog.asserts.assert(void 0 === r),
                      goog.asserts.assert(o === e.length - 1),
                      (r = n),
                      (n = void 0)),
                    a &&
                      a.constructor == Object &&
                      (goog.asserts.assert(void 0 === s),
                      goog.asserts.assert(o === t.length - 1),
                      (s = a),
                      (a = void 0)),
                    !jspb.Message.compareFields(n, a))
                  )
                    return !1;
                }
                return (
                  (!r && !s) ||
                  ((r = r || {}),
                  (s = s || {}),
                  jspb.Message.compareExtensions(r, s))
                );
              }
              if (e.constructor === Object)
                return jspb.Message.compareExtensions(e, t);
              throw Error("Invalid type in JSPB array");
            }),
            (jspb.Message.prototype.cloneMessage = function () {
              return jspb.Message.cloneMessage(this);
            }),
            (jspb.Message.prototype.clone = function () {
              return jspb.Message.cloneMessage(this);
            }),
            (jspb.Message.clone = function (e) {
              return jspb.Message.cloneMessage(e);
            }),
            (jspb.Message.cloneMessage = function (e) {
              return new e.constructor(jspb.Message.clone_(e.toArray()));
            }),
            (jspb.Message.copyInto = function (e, t) {
              goog.asserts.assertInstanceof(e, jspb.Message),
                goog.asserts.assertInstanceof(t, jspb.Message),
                goog.asserts.assert(
                  e.constructor == t.constructor,
                  "Copy source and target message should have the same type."
                ),
                (e = jspb.Message.clone(e));
              for (
                var o = t.toArray(), r = e.toArray(), s = (o.length = 0);
                s < r.length;
                s++
              )
                o[s] = r[s];
              (t.wrappers_ = e.wrappers_),
                (t.extensionObject_ = e.extensionObject_);
            }),
            (jspb.Message.clone_ = function (e) {
              if (goog.isArray(e)) {
                for (var t = Array(e.length), o = 0; o < e.length; o++) {
                  var r = e[o];
                  null != r &&
                    (t[o] =
                      "object" == typeof r
                        ? jspb.Message.clone_(goog.asserts.assert(r))
                        : r);
                }
                return t;
              }
              if (jspb.Message.SUPPORTS_UINT8ARRAY_ && e instanceof Uint8Array)
                return new Uint8Array(e);
              for (o in ((t = {}), e))
                null != (r = e[o]) &&
                  (t[o] =
                    "object" == typeof r
                      ? jspb.Message.clone_(goog.asserts.assert(r))
                      : r);
              return t;
            }),
            (jspb.Message.registerMessageType = function (e, t) {
              t.messageId = e;
            }),
            (jspb.Message.messageSetExtensions = {}),
            (jspb.Message.messageSetExtensionsBinary = {}),
            (jspb.arith = {}),
            (jspb.arith.UInt64 = function (e, t) {
              (this.lo = e), (this.hi = t);
            }),
            (jspb.arith.UInt64.prototype.cmp = function (e) {
              return this.hi < e.hi || (this.hi == e.hi && this.lo < e.lo)
                ? -1
                : this.hi == e.hi && this.lo == e.lo
                ? 0
                : 1;
            }),
            (jspb.arith.UInt64.prototype.rightShift = function () {
              return new jspb.arith.UInt64(
                ((this.lo >>> 1) | ((1 & this.hi) << 31)) >>> 0,
                (this.hi >>> 1) >>> 0
              );
            }),
            (jspb.arith.UInt64.prototype.leftShift = function () {
              return new jspb.arith.UInt64(
                (this.lo << 1) >>> 0,
                ((this.hi << 1) | (this.lo >>> 31)) >>> 0
              );
            }),
            (jspb.arith.UInt64.prototype.msb = function () {
              return !!(2147483648 & this.hi);
            }),
            (jspb.arith.UInt64.prototype.lsb = function () {
              return !!(1 & this.lo);
            }),
            (jspb.arith.UInt64.prototype.zero = function () {
              return 0 == this.lo && 0 == this.hi;
            }),
            (jspb.arith.UInt64.prototype.add = function (e) {
              return new jspb.arith.UInt64(
                (((this.lo + e.lo) & 4294967295) >>> 0) >>> 0,
                ((((this.hi + e.hi) & 4294967295) >>> 0) +
                  (4294967296 <= this.lo + e.lo ? 1 : 0)) >>>
                  0
              );
            }),
            (jspb.arith.UInt64.prototype.sub = function (e) {
              return new jspb.arith.UInt64(
                (((this.lo - e.lo) & 4294967295) >>> 0) >>> 0,
                ((((this.hi - e.hi) & 4294967295) >>> 0) -
                  (0 > this.lo - e.lo ? 1 : 0)) >>>
                  0
              );
            }),
            (jspb.arith.UInt64.mul32x32 = function (e, t) {
              var o = 65535 & e,
                r = 65535 & t,
                s = t >>> 16;
              for (
                t =
                  o * r +
                  65536 * ((o * s) & 65535) +
                  65536 * (((e >>>= 16) * r) & 65535),
                  o = e * s + ((o * s) >>> 16) + ((e * r) >>> 16);
                4294967296 <= t;

              )
                (t -= 4294967296), (o += 1);
              return new jspb.arith.UInt64(t >>> 0, o >>> 0);
            }),
            (jspb.arith.UInt64.prototype.mul = function (e) {
              var t = jspb.arith.UInt64.mul32x32(this.lo, e);
              return (
                ((e = jspb.arith.UInt64.mul32x32(this.hi, e)).hi = e.lo),
                (e.lo = 0),
                t.add(e)
              );
            }),
            (jspb.arith.UInt64.prototype.div = function (e) {
              if (0 == e) return [];
              var t = new jspb.arith.UInt64(0, 0),
                o = new jspb.arith.UInt64(this.lo, this.hi);
              e = new jspb.arith.UInt64(e, 0);
              for (var r = new jspb.arith.UInt64(1, 0); !e.msb(); )
                (e = e.leftShift()), (r = r.leftShift());
              for (; !r.zero(); )
                0 >= e.cmp(o) && ((t = t.add(r)), (o = o.sub(e))),
                  (e = e.rightShift()),
                  (r = r.rightShift());
              return [t, o];
            }),
            (jspb.arith.UInt64.prototype.toString = function () {
              for (var e = "", t = this; !t.zero(); ) {
                var o = (t = t.div(10))[0];
                (e = t[1].lo + e), (t = o);
              }
              return "" == e && (e = "0"), e;
            }),
            (jspb.arith.UInt64.fromString = function (e) {
              for (
                var t = new jspb.arith.UInt64(0, 0),
                  o = new jspb.arith.UInt64(0, 0),
                  r = 0;
                r < e.length;
                r++
              ) {
                if ("0" > e[r] || "9" < e[r]) return null;
                var s = parseInt(e[r], 10);
                (o.lo = s), (t = t.mul(10).add(o));
              }
              return t;
            }),
            (jspb.arith.UInt64.prototype.clone = function () {
              return new jspb.arith.UInt64(this.lo, this.hi);
            }),
            (jspb.arith.Int64 = function (e, t) {
              (this.lo = e), (this.hi = t);
            }),
            (jspb.arith.Int64.prototype.add = function (e) {
              return new jspb.arith.Int64(
                (((this.lo + e.lo) & 4294967295) >>> 0) >>> 0,
                ((((this.hi + e.hi) & 4294967295) >>> 0) +
                  (4294967296 <= this.lo + e.lo ? 1 : 0)) >>>
                  0
              );
            }),
            (jspb.arith.Int64.prototype.sub = function (e) {
              return new jspb.arith.Int64(
                (((this.lo - e.lo) & 4294967295) >>> 0) >>> 0,
                ((((this.hi - e.hi) & 4294967295) >>> 0) -
                  (0 > this.lo - e.lo ? 1 : 0)) >>>
                  0
              );
            }),
            (jspb.arith.Int64.prototype.clone = function () {
              return new jspb.arith.Int64(this.lo, this.hi);
            }),
            (jspb.arith.Int64.prototype.toString = function () {
              var e = !!(2147483648 & this.hi),
                t = new jspb.arith.UInt64(this.lo, this.hi);
              return (
                e && (t = new jspb.arith.UInt64(0, 0).sub(t)),
                (e ? "-" : "") + t.toString()
              );
            }),
            (jspb.arith.Int64.fromString = function (e) {
              var t = 0 < e.length && "-" == e[0];
              return (
                t && (e = e.substring(1)),
                null === (e = jspb.arith.UInt64.fromString(e))
                  ? null
                  : (t && (e = new jspb.arith.UInt64(0, 0).sub(e)),
                    new jspb.arith.Int64(e.lo, e.hi))
              );
            }),
            (jspb.BinaryEncoder = function () {
              this.buffer_ = [];
            }),
            (jspb.BinaryEncoder.prototype.length = function () {
              return this.buffer_.length;
            }),
            (jspb.BinaryEncoder.prototype.end = function () {
              var e = this.buffer_;
              return (this.buffer_ = []), e;
            }),
            (jspb.BinaryEncoder.prototype.writeSplitVarint64 = function (e, t) {
              for (
                goog.asserts.assert(e == Math.floor(e)),
                  goog.asserts.assert(t == Math.floor(t)),
                  goog.asserts.assert(
                    0 <= e && e < jspb.BinaryConstants.TWO_TO_32
                  ),
                  goog.asserts.assert(
                    0 <= t && t < jspb.BinaryConstants.TWO_TO_32
                  );
                0 < t || 127 < e;

              )
                this.buffer_.push((127 & e) | 128),
                  (e = ((e >>> 7) | (t << 25)) >>> 0),
                  (t >>>= 7);
              this.buffer_.push(e);
            }),
            (jspb.BinaryEncoder.prototype.writeSplitFixed64 = function (e, t) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(t == Math.floor(t)),
                goog.asserts.assert(
                  0 <= e && e < jspb.BinaryConstants.TWO_TO_32
                ),
                goog.asserts.assert(
                  0 <= t && t < jspb.BinaryConstants.TWO_TO_32
                ),
                this.writeUint32(e),
                this.writeUint32(t);
            }),
            (jspb.BinaryEncoder.prototype.writeUnsignedVarint32 = function (e) {
              for (
                goog.asserts.assert(e == Math.floor(e)),
                  goog.asserts.assert(
                    0 <= e && e < jspb.BinaryConstants.TWO_TO_32
                  );
                127 < e;

              )
                this.buffer_.push((127 & e) | 128), (e >>>= 7);
              this.buffer_.push(e);
            }),
            (jspb.BinaryEncoder.prototype.writeSignedVarint32 = function (e) {
              if (
                (goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(
                  e >= -jspb.BinaryConstants.TWO_TO_31 &&
                    e < jspb.BinaryConstants.TWO_TO_31
                ),
                0 <= e)
              )
                this.writeUnsignedVarint32(e);
              else {
                for (var t = 0; 9 > t; t++)
                  this.buffer_.push((127 & e) | 128), (e >>= 7);
                this.buffer_.push(1);
              }
            }),
            (jspb.BinaryEncoder.prototype.writeUnsignedVarint64 = function (e) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(
                  0 <= e && e < jspb.BinaryConstants.TWO_TO_64
                ),
                jspb.utils.splitInt64(e),
                this.writeSplitVarint64(
                  jspb.utils.split64Low,
                  jspb.utils.split64High
                );
            }),
            (jspb.BinaryEncoder.prototype.writeSignedVarint64 = function (e) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(
                  e >= -jspb.BinaryConstants.TWO_TO_63 &&
                    e < jspb.BinaryConstants.TWO_TO_63
                ),
                jspb.utils.splitInt64(e),
                this.writeSplitVarint64(
                  jspb.utils.split64Low,
                  jspb.utils.split64High
                );
            }),
            (jspb.BinaryEncoder.prototype.writeZigzagVarint32 = function (e) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(
                  e >= -jspb.BinaryConstants.TWO_TO_31 &&
                    e < jspb.BinaryConstants.TWO_TO_31
                ),
                this.writeUnsignedVarint32(((e << 1) ^ (e >> 31)) >>> 0);
            }),
            (jspb.BinaryEncoder.prototype.writeZigzagVarint64 = function (e) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(
                  e >= -jspb.BinaryConstants.TWO_TO_63 &&
                    e < jspb.BinaryConstants.TWO_TO_63
                ),
                jspb.utils.splitZigzag64(e),
                this.writeSplitVarint64(
                  jspb.utils.split64Low,
                  jspb.utils.split64High
                );
            }),
            (jspb.BinaryEncoder.prototype.writeZigzagVarint64String = function (
              e
            ) {
              this.writeZigzagVarintHash64(jspb.utils.decimalStringToHash64(e));
            }),
            (jspb.BinaryEncoder.prototype.writeZigzagVarintHash64 = function (
              e
            ) {
              var t = this;
              jspb.utils.splitHash64(e),
                jspb.utils.toZigzag64(
                  jspb.utils.split64Low,
                  jspb.utils.split64High,
                  function (e, o) {
                    t.writeSplitVarint64(e >>> 0, o >>> 0);
                  }
                );
            }),
            (jspb.BinaryEncoder.prototype.writeUint8 = function (e) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(0 <= e && 256 > e),
                this.buffer_.push((e >>> 0) & 255);
            }),
            (jspb.BinaryEncoder.prototype.writeUint16 = function (e) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(0 <= e && 65536 > e),
                this.buffer_.push((e >>> 0) & 255),
                this.buffer_.push((e >>> 8) & 255);
            }),
            (jspb.BinaryEncoder.prototype.writeUint32 = function (e) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(
                  0 <= e && e < jspb.BinaryConstants.TWO_TO_32
                ),
                this.buffer_.push((e >>> 0) & 255),
                this.buffer_.push((e >>> 8) & 255),
                this.buffer_.push((e >>> 16) & 255),
                this.buffer_.push((e >>> 24) & 255);
            }),
            (jspb.BinaryEncoder.prototype.writeUint64 = function (e) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(
                  0 <= e && e < jspb.BinaryConstants.TWO_TO_64
                ),
                jspb.utils.splitUint64(e),
                this.writeUint32(jspb.utils.split64Low),
                this.writeUint32(jspb.utils.split64High);
            }),
            (jspb.BinaryEncoder.prototype.writeInt8 = function (e) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(-128 <= e && 128 > e),
                this.buffer_.push((e >>> 0) & 255);
            }),
            (jspb.BinaryEncoder.prototype.writeInt16 = function (e) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(-32768 <= e && 32768 > e),
                this.buffer_.push((e >>> 0) & 255),
                this.buffer_.push((e >>> 8) & 255);
            }),
            (jspb.BinaryEncoder.prototype.writeInt32 = function (e) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(
                  e >= -jspb.BinaryConstants.TWO_TO_31 &&
                    e < jspb.BinaryConstants.TWO_TO_31
                ),
                this.buffer_.push((e >>> 0) & 255),
                this.buffer_.push((e >>> 8) & 255),
                this.buffer_.push((e >>> 16) & 255),
                this.buffer_.push((e >>> 24) & 255);
            }),
            (jspb.BinaryEncoder.prototype.writeInt64 = function (e) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(
                  e >= -jspb.BinaryConstants.TWO_TO_63 &&
                    e < jspb.BinaryConstants.TWO_TO_63
                ),
                jspb.utils.splitInt64(e),
                this.writeSplitFixed64(
                  jspb.utils.split64Low,
                  jspb.utils.split64High
                );
            }),
            (jspb.BinaryEncoder.prototype.writeInt64String = function (e) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(
                  +e >= -jspb.BinaryConstants.TWO_TO_63 &&
                    +e < jspb.BinaryConstants.TWO_TO_63
                ),
                jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(e)),
                this.writeSplitFixed64(
                  jspb.utils.split64Low,
                  jspb.utils.split64High
                );
            }),
            (jspb.BinaryEncoder.prototype.writeFloat = function (e) {
              goog.asserts.assert(
                1 / 0 === e ||
                  -1 / 0 === e ||
                  isNaN(e) ||
                  (e >= -jspb.BinaryConstants.FLOAT32_MAX &&
                    e <= jspb.BinaryConstants.FLOAT32_MAX)
              ),
                jspb.utils.splitFloat32(e),
                this.writeUint32(jspb.utils.split64Low);
            }),
            (jspb.BinaryEncoder.prototype.writeDouble = function (e) {
              goog.asserts.assert(
                1 / 0 === e ||
                  -1 / 0 === e ||
                  isNaN(e) ||
                  (e >= -jspb.BinaryConstants.FLOAT64_MAX &&
                    e <= jspb.BinaryConstants.FLOAT64_MAX)
              ),
                jspb.utils.splitFloat64(e),
                this.writeUint32(jspb.utils.split64Low),
                this.writeUint32(jspb.utils.split64High);
            }),
            (jspb.BinaryEncoder.prototype.writeBool = function (e) {
              goog.asserts.assert(
                "boolean" == typeof e || "number" == typeof e
              ),
                this.buffer_.push(e ? 1 : 0);
            }),
            (jspb.BinaryEncoder.prototype.writeEnum = function (e) {
              goog.asserts.assert(e == Math.floor(e)),
                goog.asserts.assert(
                  e >= -jspb.BinaryConstants.TWO_TO_31 &&
                    e < jspb.BinaryConstants.TWO_TO_31
                ),
                this.writeSignedVarint32(e);
            }),
            (jspb.BinaryEncoder.prototype.writeBytes = function (e) {
              this.buffer_.push.apply(this.buffer_, e);
            }),
            (jspb.BinaryEncoder.prototype.writeVarintHash64 = function (e) {
              jspb.utils.splitHash64(e),
                this.writeSplitVarint64(
                  jspb.utils.split64Low,
                  jspb.utils.split64High
                );
            }),
            (jspb.BinaryEncoder.prototype.writeFixedHash64 = function (e) {
              jspb.utils.splitHash64(e),
                this.writeUint32(jspb.utils.split64Low),
                this.writeUint32(jspb.utils.split64High);
            }),
            (jspb.BinaryEncoder.prototype.writeString = function (e) {
              for (var t = this.buffer_.length, o = 0; o < e.length; o++) {
                var r = e.charCodeAt(o);
                if (128 > r) this.buffer_.push(r);
                else if (2048 > r)
                  this.buffer_.push((r >> 6) | 192),
                    this.buffer_.push((63 & r) | 128);
                else if (65536 > r)
                  if (55296 <= r && 56319 >= r && o + 1 < e.length) {
                    var s = e.charCodeAt(o + 1);
                    56320 <= s &&
                      57343 >= s &&
                      ((r = 1024 * (r - 55296) + s - 56320 + 65536),
                      this.buffer_.push((r >> 18) | 240),
                      this.buffer_.push(((r >> 12) & 63) | 128),
                      this.buffer_.push(((r >> 6) & 63) | 128),
                      this.buffer_.push((63 & r) | 128),
                      o++);
                  } else
                    this.buffer_.push((r >> 12) | 224),
                      this.buffer_.push(((r >> 6) & 63) | 128),
                      this.buffer_.push((63 & r) | 128);
              }
              return this.buffer_.length - t;
            }),
            (jspb.BinaryWriter = function () {
              (this.blocks_ = []),
                (this.totalLength_ = 0),
                (this.encoder_ = new jspb.BinaryEncoder()),
                (this.bookmarks_ = []);
            }),
            (jspb.BinaryWriter.prototype.appendUint8Array_ = function (e) {
              var t = this.encoder_.end();
              this.blocks_.push(t),
                this.blocks_.push(e),
                (this.totalLength_ += t.length + e.length);
            }),
            (jspb.BinaryWriter.prototype.beginDelimited_ = function (e) {
              return (
                this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.DELIMITED
                ),
                (e = this.encoder_.end()),
                this.blocks_.push(e),
                (this.totalLength_ += e.length),
                e.push(this.totalLength_),
                e
              );
            }),
            (jspb.BinaryWriter.prototype.endDelimited_ = function (e) {
              var t = e.pop();
              for (
                t = this.totalLength_ + this.encoder_.length() - t,
                  goog.asserts.assert(0 <= t);
                127 < t;

              )
                e.push((127 & t) | 128), (t >>>= 7), this.totalLength_++;
              e.push(t), this.totalLength_++;
            }),
            (jspb.BinaryWriter.prototype.writeSerializedMessage = function (
              e,
              t,
              o
            ) {
              this.appendUint8Array_(e.subarray(t, o));
            }),
            (jspb.BinaryWriter.prototype.maybeWriteSerializedMessage =
              function (e, t, o) {
                null != e &&
                  null != t &&
                  null != o &&
                  this.writeSerializedMessage(e, t, o);
              }),
            (jspb.BinaryWriter.prototype.reset = function () {
              (this.blocks_ = []),
                this.encoder_.end(),
                (this.totalLength_ = 0),
                (this.bookmarks_ = []);
            }),
            (jspb.BinaryWriter.prototype.getResultBuffer = function () {
              goog.asserts.assert(0 == this.bookmarks_.length);
              for (
                var e = new Uint8Array(
                    this.totalLength_ + this.encoder_.length()
                  ),
                  t = this.blocks_,
                  o = t.length,
                  r = 0,
                  s = 0;
                s < o;
                s++
              ) {
                var i = t[s];
                e.set(i, r), (r += i.length);
              }
              return (
                (t = this.encoder_.end()),
                e.set(t, r),
                (r += t.length),
                goog.asserts.assert(r == e.length),
                (this.blocks_ = [e]),
                e
              );
            }),
            (jspb.BinaryWriter.prototype.getResultBase64String = function (e) {
              return goog.crypt.base64.encodeByteArray(
                this.getResultBuffer(),
                e
              );
            }),
            (jspb.BinaryWriter.prototype.beginSubMessage = function (e) {
              this.bookmarks_.push(this.beginDelimited_(e));
            }),
            (jspb.BinaryWriter.prototype.endSubMessage = function () {
              goog.asserts.assert(0 <= this.bookmarks_.length),
                this.endDelimited_(this.bookmarks_.pop());
            }),
            (jspb.BinaryWriter.prototype.writeFieldHeader_ = function (e, t) {
              goog.asserts.assert(1 <= e && e == Math.floor(e)),
                this.encoder_.writeUnsignedVarint32(8 * e + t);
            }),
            (jspb.BinaryWriter.prototype.writeAny = function (e, t, o) {
              var r = jspb.BinaryConstants.FieldType;
              switch (e) {
                case r.DOUBLE:
                  this.writeDouble(t, o);
                  break;
                case r.FLOAT:
                  this.writeFloat(t, o);
                  break;
                case r.INT64:
                  this.writeInt64(t, o);
                  break;
                case r.UINT64:
                  this.writeUint64(t, o);
                  break;
                case r.INT32:
                  this.writeInt32(t, o);
                  break;
                case r.FIXED64:
                  this.writeFixed64(t, o);
                  break;
                case r.FIXED32:
                  this.writeFixed32(t, o);
                  break;
                case r.BOOL:
                  this.writeBool(t, o);
                  break;
                case r.STRING:
                  this.writeString(t, o);
                  break;
                case r.GROUP:
                  goog.asserts.fail(
                    "Group field type not supported in writeAny()"
                  );
                  break;
                case r.MESSAGE:
                  goog.asserts.fail(
                    "Message field type not supported in writeAny()"
                  );
                  break;
                case r.BYTES:
                  this.writeBytes(t, o);
                  break;
                case r.UINT32:
                  this.writeUint32(t, o);
                  break;
                case r.ENUM:
                  this.writeEnum(t, o);
                  break;
                case r.SFIXED32:
                  this.writeSfixed32(t, o);
                  break;
                case r.SFIXED64:
                  this.writeSfixed64(t, o);
                  break;
                case r.SINT32:
                  this.writeSint32(t, o);
                  break;
                case r.SINT64:
                  this.writeSint64(t, o);
                  break;
                case r.FHASH64:
                  this.writeFixedHash64(t, o);
                  break;
                case r.VHASH64:
                  this.writeVarintHash64(t, o);
                  break;
                default:
                  goog.asserts.fail("Invalid field type in writeAny()");
              }
            }),
            (jspb.BinaryWriter.prototype.writeUnsignedVarint32_ = function (
              e,
              t
            ) {
              null != t &&
                (this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.VARINT
                ),
                this.encoder_.writeUnsignedVarint32(t));
            }),
            (jspb.BinaryWriter.prototype.writeSignedVarint32_ = function (
              e,
              t
            ) {
              null != t &&
                (this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.VARINT
                ),
                this.encoder_.writeSignedVarint32(t));
            }),
            (jspb.BinaryWriter.prototype.writeUnsignedVarint64_ = function (
              e,
              t
            ) {
              null != t &&
                (this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.VARINT
                ),
                this.encoder_.writeUnsignedVarint64(t));
            }),
            (jspb.BinaryWriter.prototype.writeSignedVarint64_ = function (
              e,
              t
            ) {
              null != t &&
                (this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.VARINT
                ),
                this.encoder_.writeSignedVarint64(t));
            }),
            (jspb.BinaryWriter.prototype.writeZigzagVarint32_ = function (
              e,
              t
            ) {
              null != t &&
                (this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.VARINT
                ),
                this.encoder_.writeZigzagVarint32(t));
            }),
            (jspb.BinaryWriter.prototype.writeZigzagVarint64_ = function (
              e,
              t
            ) {
              null != t &&
                (this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.VARINT
                ),
                this.encoder_.writeZigzagVarint64(t));
            }),
            (jspb.BinaryWriter.prototype.writeZigzagVarint64String_ = function (
              e,
              t
            ) {
              null != t &&
                (this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.VARINT
                ),
                this.encoder_.writeZigzagVarint64String(t));
            }),
            (jspb.BinaryWriter.prototype.writeZigzagVarintHash64_ = function (
              e,
              t
            ) {
              null != t &&
                (this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.VARINT
                ),
                this.encoder_.writeZigzagVarintHash64(t));
            }),
            (jspb.BinaryWriter.prototype.writeInt32 = function (e, t) {
              null != t &&
                (goog.asserts.assert(
                  t >= -jspb.BinaryConstants.TWO_TO_31 &&
                    t < jspb.BinaryConstants.TWO_TO_31
                ),
                this.writeSignedVarint32_(e, t));
            }),
            (jspb.BinaryWriter.prototype.writeInt32String = function (e, t) {
              null != t &&
                ((t = parseInt(t, 10)),
                goog.asserts.assert(
                  t >= -jspb.BinaryConstants.TWO_TO_31 &&
                    t < jspb.BinaryConstants.TWO_TO_31
                ),
                this.writeSignedVarint32_(e, t));
            }),
            (jspb.BinaryWriter.prototype.writeInt64 = function (e, t) {
              null != t &&
                (goog.asserts.assert(
                  t >= -jspb.BinaryConstants.TWO_TO_63 &&
                    t < jspb.BinaryConstants.TWO_TO_63
                ),
                this.writeSignedVarint64_(e, t));
            }),
            (jspb.BinaryWriter.prototype.writeInt64String = function (e, t) {
              null != t &&
                ((t = jspb.arith.Int64.fromString(t)),
                this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
                this.encoder_.writeSplitVarint64(t.lo, t.hi));
            }),
            (jspb.BinaryWriter.prototype.writeUint32 = function (e, t) {
              null != t &&
                (goog.asserts.assert(
                  0 <= t && t < jspb.BinaryConstants.TWO_TO_32
                ),
                this.writeUnsignedVarint32_(e, t));
            }),
            (jspb.BinaryWriter.prototype.writeUint32String = function (e, t) {
              null != t &&
                ((t = parseInt(t, 10)),
                goog.asserts.assert(
                  0 <= t && t < jspb.BinaryConstants.TWO_TO_32
                ),
                this.writeUnsignedVarint32_(e, t));
            }),
            (jspb.BinaryWriter.prototype.writeUint64 = function (e, t) {
              null != t &&
                (goog.asserts.assert(
                  0 <= t && t < jspb.BinaryConstants.TWO_TO_64
                ),
                this.writeUnsignedVarint64_(e, t));
            }),
            (jspb.BinaryWriter.prototype.writeUint64String = function (e, t) {
              null != t &&
                ((t = jspb.arith.UInt64.fromString(t)),
                this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
                this.encoder_.writeSplitVarint64(t.lo, t.hi));
            }),
            (jspb.BinaryWriter.prototype.writeSint32 = function (e, t) {
              null != t &&
                (goog.asserts.assert(
                  t >= -jspb.BinaryConstants.TWO_TO_31 &&
                    t < jspb.BinaryConstants.TWO_TO_31
                ),
                this.writeZigzagVarint32_(e, t));
            }),
            (jspb.BinaryWriter.prototype.writeSint64 = function (e, t) {
              null != t &&
                (goog.asserts.assert(
                  t >= -jspb.BinaryConstants.TWO_TO_63 &&
                    t < jspb.BinaryConstants.TWO_TO_63
                ),
                this.writeZigzagVarint64_(e, t));
            }),
            (jspb.BinaryWriter.prototype.writeSintHash64 = function (e, t) {
              null != t && this.writeZigzagVarintHash64_(e, t);
            }),
            (jspb.BinaryWriter.prototype.writeSint64String = function (e, t) {
              null != t && this.writeZigzagVarint64String_(e, t);
            }),
            (jspb.BinaryWriter.prototype.writeFixed32 = function (e, t) {
              null != t &&
                (goog.asserts.assert(
                  0 <= t && t < jspb.BinaryConstants.TWO_TO_32
                ),
                this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.FIXED32
                ),
                this.encoder_.writeUint32(t));
            }),
            (jspb.BinaryWriter.prototype.writeFixed64 = function (e, t) {
              null != t &&
                (goog.asserts.assert(
                  0 <= t && t < jspb.BinaryConstants.TWO_TO_64
                ),
                this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.FIXED64
                ),
                this.encoder_.writeUint64(t));
            }),
            (jspb.BinaryWriter.prototype.writeFixed64String = function (e, t) {
              null != t &&
                ((t = jspb.arith.UInt64.fromString(t)),
                this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.FIXED64
                ),
                this.encoder_.writeSplitFixed64(t.lo, t.hi));
            }),
            (jspb.BinaryWriter.prototype.writeSfixed32 = function (e, t) {
              null != t &&
                (goog.asserts.assert(
                  t >= -jspb.BinaryConstants.TWO_TO_31 &&
                    t < jspb.BinaryConstants.TWO_TO_31
                ),
                this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.FIXED32
                ),
                this.encoder_.writeInt32(t));
            }),
            (jspb.BinaryWriter.prototype.writeSfixed64 = function (e, t) {
              null != t &&
                (goog.asserts.assert(
                  t >= -jspb.BinaryConstants.TWO_TO_63 &&
                    t < jspb.BinaryConstants.TWO_TO_63
                ),
                this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.FIXED64
                ),
                this.encoder_.writeInt64(t));
            }),
            (jspb.BinaryWriter.prototype.writeSfixed64String = function (e, t) {
              null != t &&
                ((t = jspb.arith.Int64.fromString(t)),
                this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.FIXED64
                ),
                this.encoder_.writeSplitFixed64(t.lo, t.hi));
            }),
            (jspb.BinaryWriter.prototype.writeFloat = function (e, t) {
              null != t &&
                (this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.FIXED32
                ),
                this.encoder_.writeFloat(t));
            }),
            (jspb.BinaryWriter.prototype.writeDouble = function (e, t) {
              null != t &&
                (this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.FIXED64
                ),
                this.encoder_.writeDouble(t));
            }),
            (jspb.BinaryWriter.prototype.writeBool = function (e, t) {
              null != t &&
                (goog.asserts.assert(
                  "boolean" == typeof t || "number" == typeof t
                ),
                this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
                this.encoder_.writeBool(t));
            }),
            (jspb.BinaryWriter.prototype.writeEnum = function (e, t) {
              null != t &&
                (goog.asserts.assert(
                  t >= -jspb.BinaryConstants.TWO_TO_31 &&
                    t < jspb.BinaryConstants.TWO_TO_31
                ),
                this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
                this.encoder_.writeSignedVarint32(t));
            }),
            (jspb.BinaryWriter.prototype.writeString = function (e, t) {
              null != t &&
                ((e = this.beginDelimited_(e)),
                this.encoder_.writeString(t),
                this.endDelimited_(e));
            }),
            (jspb.BinaryWriter.prototype.writeBytes = function (e, t) {
              null != t &&
                ((t = jspb.utils.byteSourceToUint8Array(t)),
                this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.DELIMITED
                ),
                this.encoder_.writeUnsignedVarint32(t.length),
                this.appendUint8Array_(t));
            }),
            (jspb.BinaryWriter.prototype.writeMessage = function (e, t, o) {
              null != t &&
                ((e = this.beginDelimited_(e)),
                o(t, this),
                this.endDelimited_(e));
            }),
            (jspb.BinaryWriter.prototype.writeMessageSet = function (e, t, o) {
              null != t &&
                (this.writeFieldHeader_(
                  1,
                  jspb.BinaryConstants.WireType.START_GROUP
                ),
                this.writeFieldHeader_(2, jspb.BinaryConstants.WireType.VARINT),
                this.encoder_.writeSignedVarint32(e),
                (e = this.beginDelimited_(3)),
                o(t, this),
                this.endDelimited_(e),
                this.writeFieldHeader_(
                  1,
                  jspb.BinaryConstants.WireType.END_GROUP
                ));
            }),
            (jspb.BinaryWriter.prototype.writeGroup = function (e, t, o) {
              null != t &&
                (this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.START_GROUP
                ),
                o(t, this),
                this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.END_GROUP
                ));
            }),
            (jspb.BinaryWriter.prototype.writeFixedHash64 = function (e, t) {
              null != t &&
                (goog.asserts.assert(8 == t.length),
                this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.FIXED64
                ),
                this.encoder_.writeFixedHash64(t));
            }),
            (jspb.BinaryWriter.prototype.writeVarintHash64 = function (e, t) {
              null != t &&
                (goog.asserts.assert(8 == t.length),
                this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
                this.encoder_.writeVarintHash64(t));
            }),
            (jspb.BinaryWriter.prototype.writeSplitFixed64 = function (
              e,
              t,
              o
            ) {
              this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64),
                this.encoder_.writeSplitFixed64(t, o);
            }),
            (jspb.BinaryWriter.prototype.writeSplitVarint64 = function (
              e,
              t,
              o
            ) {
              this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
                this.encoder_.writeSplitVarint64(t, o);
            }),
            (jspb.BinaryWriter.prototype.writeSplitZigzagVarint64 = function (
              e,
              t,
              o
            ) {
              this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT);
              var r = this.encoder_;
              jspb.utils.toZigzag64(t, o, function (e, t) {
                r.writeSplitVarint64(e >>> 0, t >>> 0);
              });
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedInt32 = function (e, t) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeSignedVarint32_(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedInt32String = function (
              e,
              t
            ) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeInt32String(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedInt64 = function (e, t) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeSignedVarint64_(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedSplitFixed64 = function (
              e,
              t,
              o,
              r
            ) {
              if (null != t)
                for (var s = 0; s < t.length; s++)
                  this.writeSplitFixed64(e, o(t[s]), r(t[s]));
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedSplitVarint64 = function (
              e,
              t,
              o,
              r
            ) {
              if (null != t)
                for (var s = 0; s < t.length; s++)
                  this.writeSplitVarint64(e, o(t[s]), r(t[s]));
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedSplitZigzagVarint64 =
              function (e, t, o, r) {
                if (null != t)
                  for (var s = 0; s < t.length; s++)
                    this.writeSplitZigzagVarint64(e, o(t[s]), r(t[s]));
              }),
            (jspb.BinaryWriter.prototype.writeRepeatedInt64String = function (
              e,
              t
            ) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeInt64String(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedUint32 = function (e, t) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeUnsignedVarint32_(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedUint32String = function (
              e,
              t
            ) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeUint32String(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedUint64 = function (e, t) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeUnsignedVarint64_(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedUint64String = function (
              e,
              t
            ) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeUint64String(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedSint32 = function (e, t) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeZigzagVarint32_(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedSint64 = function (e, t) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeZigzagVarint64_(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedSint64String = function (
              e,
              t
            ) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeZigzagVarint64String_(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedSintHash64 = function (
              e,
              t
            ) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeZigzagVarintHash64_(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedFixed32 = function (
              e,
              t
            ) {
              if (null != t)
                for (var o = 0; o < t.length; o++) this.writeFixed32(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedFixed64 = function (
              e,
              t
            ) {
              if (null != t)
                for (var o = 0; o < t.length; o++) this.writeFixed64(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedFixed64String = function (
              e,
              t
            ) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeFixed64String(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedSfixed32 = function (
              e,
              t
            ) {
              if (null != t)
                for (var o = 0; o < t.length; o++) this.writeSfixed32(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedSfixed64 = function (
              e,
              t
            ) {
              if (null != t)
                for (var o = 0; o < t.length; o++) this.writeSfixed64(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedSfixed64String =
              function (e, t) {
                if (null != t)
                  for (var o = 0; o < t.length; o++)
                    this.writeSfixed64String(e, t[o]);
              }),
            (jspb.BinaryWriter.prototype.writeRepeatedFloat = function (e, t) {
              if (null != t)
                for (var o = 0; o < t.length; o++) this.writeFloat(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedDouble = function (e, t) {
              if (null != t)
                for (var o = 0; o < t.length; o++) this.writeDouble(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedBool = function (e, t) {
              if (null != t)
                for (var o = 0; o < t.length; o++) this.writeBool(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedEnum = function (e, t) {
              if (null != t)
                for (var o = 0; o < t.length; o++) this.writeEnum(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedString = function (e, t) {
              if (null != t)
                for (var o = 0; o < t.length; o++) this.writeString(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedBytes = function (e, t) {
              if (null != t)
                for (var o = 0; o < t.length; o++) this.writeBytes(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedMessage = function (
              e,
              t,
              o
            ) {
              if (null != t)
                for (var r = 0; r < t.length; r++) {
                  var s = this.beginDelimited_(e);
                  o(t[r], this), this.endDelimited_(s);
                }
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedGroup = function (
              e,
              t,
              o
            ) {
              if (null != t)
                for (var r = 0; r < t.length; r++)
                  this.writeFieldHeader_(
                    e,
                    jspb.BinaryConstants.WireType.START_GROUP
                  ),
                    o(t[r], this),
                    this.writeFieldHeader_(
                      e,
                      jspb.BinaryConstants.WireType.END_GROUP
                    );
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedFixedHash64 = function (
              e,
              t
            ) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeFixedHash64(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writeRepeatedVarintHash64 = function (
              e,
              t
            ) {
              if (null != t)
                for (var o = 0; o < t.length; o++)
                  this.writeVarintHash64(e, t[o]);
            }),
            (jspb.BinaryWriter.prototype.writePackedInt32 = function (e, t) {
              if (null != t && t.length) {
                e = this.beginDelimited_(e);
                for (var o = 0; o < t.length; o++)
                  this.encoder_.writeSignedVarint32(t[o]);
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedInt32String = function (
              e,
              t
            ) {
              if (null != t && t.length) {
                e = this.beginDelimited_(e);
                for (var o = 0; o < t.length; o++)
                  this.encoder_.writeSignedVarint32(parseInt(t[o], 10));
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedInt64 = function (e, t) {
              if (null != t && t.length) {
                e = this.beginDelimited_(e);
                for (var o = 0; o < t.length; o++)
                  this.encoder_.writeSignedVarint64(t[o]);
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedSplitFixed64 = function (
              e,
              t,
              o,
              r
            ) {
              if (null != t) {
                e = this.beginDelimited_(e);
                for (var s = 0; s < t.length; s++)
                  this.encoder_.writeSplitFixed64(o(t[s]), r(t[s]));
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedSplitVarint64 = function (
              e,
              t,
              o,
              r
            ) {
              if (null != t) {
                e = this.beginDelimited_(e);
                for (var s = 0; s < t.length; s++)
                  this.encoder_.writeSplitVarint64(o(t[s]), r(t[s]));
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedSplitZigzagVarint64 =
              function (e, t, o, r) {
                if (null != t) {
                  e = this.beginDelimited_(e);
                  for (var s = this.encoder_, i = 0; i < t.length; i++)
                    jspb.utils.toZigzag64(o(t[i]), r(t[i]), function (e, t) {
                      s.writeSplitVarint64(e >>> 0, t >>> 0);
                    });
                  this.endDelimited_(e);
                }
              }),
            (jspb.BinaryWriter.prototype.writePackedInt64String = function (
              e,
              t
            ) {
              if (null != t && t.length) {
                e = this.beginDelimited_(e);
                for (var o = 0; o < t.length; o++) {
                  var r = jspb.arith.Int64.fromString(t[o]);
                  this.encoder_.writeSplitVarint64(r.lo, r.hi);
                }
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedUint32 = function (e, t) {
              if (null != t && t.length) {
                e = this.beginDelimited_(e);
                for (var o = 0; o < t.length; o++)
                  this.encoder_.writeUnsignedVarint32(t[o]);
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedUint32String = function (
              e,
              t
            ) {
              if (null != t && t.length) {
                e = this.beginDelimited_(e);
                for (var o = 0; o < t.length; o++)
                  this.encoder_.writeUnsignedVarint32(parseInt(t[o], 10));
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedUint64 = function (e, t) {
              if (null != t && t.length) {
                e = this.beginDelimited_(e);
                for (var o = 0; o < t.length; o++)
                  this.encoder_.writeUnsignedVarint64(t[o]);
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedUint64String = function (
              e,
              t
            ) {
              if (null != t && t.length) {
                e = this.beginDelimited_(e);
                for (var o = 0; o < t.length; o++) {
                  var r = jspb.arith.UInt64.fromString(t[o]);
                  this.encoder_.writeSplitVarint64(r.lo, r.hi);
                }
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedSint32 = function (e, t) {
              if (null != t && t.length) {
                e = this.beginDelimited_(e);
                for (var o = 0; o < t.length; o++)
                  this.encoder_.writeZigzagVarint32(t[o]);
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedSint64 = function (e, t) {
              if (null != t && t.length) {
                e = this.beginDelimited_(e);
                for (var o = 0; o < t.length; o++)
                  this.encoder_.writeZigzagVarint64(t[o]);
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedSint64String = function (
              e,
              t
            ) {
              if (null != t && t.length) {
                e = this.beginDelimited_(e);
                for (var o = 0; o < t.length; o++)
                  this.encoder_.writeZigzagVarintHash64(
                    jspb.utils.decimalStringToHash64(t[o])
                  );
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedSintHash64 = function (
              e,
              t
            ) {
              if (null != t && t.length) {
                e = this.beginDelimited_(e);
                for (var o = 0; o < t.length; o++)
                  this.encoder_.writeZigzagVarintHash64(t[o]);
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedFixed32 = function (e, t) {
              if (null != t && t.length)
                for (
                  this.writeFieldHeader_(
                    e,
                    jspb.BinaryConstants.WireType.DELIMITED
                  ),
                    this.encoder_.writeUnsignedVarint32(4 * t.length),
                    e = 0;
                  e < t.length;
                  e++
                )
                  this.encoder_.writeUint32(t[e]);
            }),
            (jspb.BinaryWriter.prototype.writePackedFixed64 = function (e, t) {
              if (null != t && t.length)
                for (
                  this.writeFieldHeader_(
                    e,
                    jspb.BinaryConstants.WireType.DELIMITED
                  ),
                    this.encoder_.writeUnsignedVarint32(8 * t.length),
                    e = 0;
                  e < t.length;
                  e++
                )
                  this.encoder_.writeUint64(t[e]);
            }),
            (jspb.BinaryWriter.prototype.writePackedFixed64String = function (
              e,
              t
            ) {
              if (null != t && t.length)
                for (
                  this.writeFieldHeader_(
                    e,
                    jspb.BinaryConstants.WireType.DELIMITED
                  ),
                    this.encoder_.writeUnsignedVarint32(8 * t.length),
                    e = 0;
                  e < t.length;
                  e++
                ) {
                  var o = jspb.arith.UInt64.fromString(t[e]);
                  this.encoder_.writeSplitFixed64(o.lo, o.hi);
                }
            }),
            (jspb.BinaryWriter.prototype.writePackedSfixed32 = function (e, t) {
              if (null != t && t.length)
                for (
                  this.writeFieldHeader_(
                    e,
                    jspb.BinaryConstants.WireType.DELIMITED
                  ),
                    this.encoder_.writeUnsignedVarint32(4 * t.length),
                    e = 0;
                  e < t.length;
                  e++
                )
                  this.encoder_.writeInt32(t[e]);
            }),
            (jspb.BinaryWriter.prototype.writePackedSfixed64 = function (e, t) {
              if (null != t && t.length)
                for (
                  this.writeFieldHeader_(
                    e,
                    jspb.BinaryConstants.WireType.DELIMITED
                  ),
                    this.encoder_.writeUnsignedVarint32(8 * t.length),
                    e = 0;
                  e < t.length;
                  e++
                )
                  this.encoder_.writeInt64(t[e]);
            }),
            (jspb.BinaryWriter.prototype.writePackedSfixed64String = function (
              e,
              t
            ) {
              if (null != t && t.length)
                for (
                  this.writeFieldHeader_(
                    e,
                    jspb.BinaryConstants.WireType.DELIMITED
                  ),
                    this.encoder_.writeUnsignedVarint32(8 * t.length),
                    e = 0;
                  e < t.length;
                  e++
                )
                  this.encoder_.writeInt64String(t[e]);
            }),
            (jspb.BinaryWriter.prototype.writePackedFloat = function (e, t) {
              if (null != t && t.length)
                for (
                  this.writeFieldHeader_(
                    e,
                    jspb.BinaryConstants.WireType.DELIMITED
                  ),
                    this.encoder_.writeUnsignedVarint32(4 * t.length),
                    e = 0;
                  e < t.length;
                  e++
                )
                  this.encoder_.writeFloat(t[e]);
            }),
            (jspb.BinaryWriter.prototype.writePackedDouble = function (e, t) {
              if (null != t && t.length)
                for (
                  this.writeFieldHeader_(
                    e,
                    jspb.BinaryConstants.WireType.DELIMITED
                  ),
                    this.encoder_.writeUnsignedVarint32(8 * t.length),
                    e = 0;
                  e < t.length;
                  e++
                )
                  this.encoder_.writeDouble(t[e]);
            }),
            (jspb.BinaryWriter.prototype.writePackedBool = function (e, t) {
              if (null != t && t.length)
                for (
                  this.writeFieldHeader_(
                    e,
                    jspb.BinaryConstants.WireType.DELIMITED
                  ),
                    this.encoder_.writeUnsignedVarint32(t.length),
                    e = 0;
                  e < t.length;
                  e++
                )
                  this.encoder_.writeBool(t[e]);
            }),
            (jspb.BinaryWriter.prototype.writePackedEnum = function (e, t) {
              if (null != t && t.length) {
                e = this.beginDelimited_(e);
                for (var o = 0; o < t.length; o++)
                  this.encoder_.writeEnum(t[o]);
                this.endDelimited_(e);
              }
            }),
            (jspb.BinaryWriter.prototype.writePackedFixedHash64 = function (
              e,
              t
            ) {
              if (null != t && t.length)
                for (
                  this.writeFieldHeader_(
                    e,
                    jspb.BinaryConstants.WireType.DELIMITED
                  ),
                    this.encoder_.writeUnsignedVarint32(8 * t.length),
                    e = 0;
                  e < t.length;
                  e++
                )
                  this.encoder_.writeFixedHash64(t[e]);
            }),
            (jspb.BinaryWriter.prototype.writePackedVarintHash64 = function (
              e,
              t
            ) {
              if (null != t && t.length) {
                e = this.beginDelimited_(e);
                for (var o = 0; o < t.length; o++)
                  this.encoder_.writeVarintHash64(t[o]);
                this.endDelimited_(e);
              }
            }),
            (jspb.Export = {}),
            (exports.Map = jspb.Map),
            (exports.Message = jspb.Message),
            (exports.BinaryReader = jspb.BinaryReader),
            (exports.BinaryWriter = jspb.BinaryWriter),
            (exports.ExtensionFieldInfo = jspb.ExtensionFieldInfo),
            (exports.ExtensionFieldBinaryInfo = jspb.ExtensionFieldBinaryInfo),
            (exports.exportSymbol = goog.exportSymbol),
            (exports.inherits = goog.inherits),
            (exports.object = { extend: goog.object.extend }),
            (exports.typeOf = goog.typeOf);
        }).call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : {},
          require("buffer").Buffer
        );
      },
      { buffer: 3 },
    ],
    6: [
      function (e, t, o) {
        var r = e("google-protobuf"),
          s = r,
          i = Function("return this")();
        s.exportSymbol("proto.ui.push.AudioEnableChanged", null, i),
          s.exportSymbol("proto.ui.push.AudioEnableResult", null, i),
          s.exportSymbol("proto.ui.push.ChangeEmail", null, i),
          s.exportSymbol("proto.ui.push.ChangeGroupDescAck", null, i),
          s.exportSymbol("proto.ui.push.ChangeGroupNameResult", null, i),
          s.exportSymbol("proto.ui.push.ChangeNameResult", null, i),
          s.exportSymbol("proto.ui.push.ChangePasswordResult", null, i),
          s.exportSymbol("proto.ui.push.ChangePhone", null, i),
          s.exportSymbol("proto.ui.push.CurrentGroupChanged", null, i),
          s.exportSymbol("proto.ui.push.DeleteSessionAck", null, i),
          s.exportSymbol("proto.ui.push.DisableUserAck", null, i),
          s.exportSymbol("proto.ui.push.Dispatch", null, i),
          s.exportSymbol("proto.ui.push.DispatchResult", null, i),
          s.exportSymbol("proto.ui.push.EnableUserAck", null, i),
          s.exportSymbol("proto.ui.push.EnabledResult", null, i),
          s.exportSymbol("proto.ui.push.ErrorMessage", null, i),
          s.exportSymbol("proto.ui.push.Group", null, i),
          s.exportSymbol("proto.ui.push.GroupChanged", null, i),
          s.exportSymbol("proto.ui.push.GroupListChanged", null, i),
          s.exportSymbol("proto.ui.push.GroupMemberOnlineInfo", null, i),
          s.exportSymbol("proto.ui.push.GroupSession", null, i),
          s.exportSymbol("proto.ui.push.GroupStatus", null, i),
          s.exportSymbol("proto.ui.push.GroupType", null, i),
          s.exportSymbol("proto.ui.push.InviteSessionAck", null, i),
          s.exportSymbol("proto.ui.push.LiosMic", null, i),
          s.exportSymbol("proto.ui.push.LntercomInfo", null, i),
          s.exportSymbol("proto.ui.push.Member", null, i),
          s.exportSymbol("proto.ui.push.MemberChanged", null, i),
          s.exportSymbol("proto.ui.push.MemberListChanged", null, i),
          s.exportSymbol("proto.ui.push.MemberSession", null, i),
          s.exportSymbol("proto.ui.push.OnlineStatus", null, i),
          s.exportSymbol("proto.ui.push.OnlineStatusChanged", null, i),
          s.exportSymbol("proto.ui.push.PlayAudioFileStatue", null, i),
          s.exportSymbol("proto.ui.push.PlayProgressAck", null, i),
          s.exportSymbol("proto.ui.push.PostBroadcastResult", null, i),
          s.exportSymbol("proto.ui.push.PushDeliver", null, i),
          s.exportSymbol("proto.ui.push.QuerylistenGroupChanged", null, i),
          s.exportSymbol("proto.ui.push.QuerylistenGroupResult", null, i),
          s.exportSymbol("proto.ui.push.QuitGrouResult", null, i),
          s.exportSymbol("proto.ui.push.RRResuntAck", null, i),
          s.exportSymbol("proto.ui.push.RecordEvent", null, i),
          s.exportSymbol("proto.ui.push.RecordStart", null, i),
          s.exportSymbol("proto.ui.push.RecordStop", null, i),
          s.exportSymbol("proto.ui.push.RequestJoinSession", null, i),
          s.exportSymbol("proto.ui.push.ResponseJoinSessionAck", null, i),
          s.exportSymbol("proto.ui.push.ResponseSessionAck", null, i),
          s.exportSymbol("proto.ui.push.ResponseSessionResult", null, i),
          s.exportSymbol("proto.ui.push.SelfStartSpeak", null, i),
          s.exportSymbol("proto.ui.push.SelfStopSpeak", null, i),
          s.exportSymbol("proto.ui.push.SetGroupMaxSpeechTimeAck", null, i),
          s.exportSymbol("proto.ui.push.StartSessionAck", null, i),
          s.exportSymbol("proto.ui.push.StopSessionAck", null, i),
          s.exportSymbol("proto.ui.push.StopSessionResult", null, i),
          s.exportSymbol("proto.ui.push.SwitchLocateResult", null, i),
          s.exportSymbol("proto.ui.push.TakemicResult", null, i),
          s.exportSymbol("proto.ui.push.UpdateUserConfigureAck", null, i),
          s.exportSymbol("proto.ui.push.User", null, i),
          s.exportSymbol("proto.ui.push.UserConfigure", null, i),
          s.exportSymbol("proto.ui.push.UserStartSpeak", null, i),
          s.exportSymbol("proto.ui.push.UserStatusChanged", null, i),
          s.exportSymbol("proto.ui.push.UserStopSpeak", null, i),
          s.exportSymbol("proto.ui.push.UsersChanged", null, i),
          s.exportSymbol("proto.ui.push.WatchGroupListChanged", null, i),
          (proto.ui.push.MemberSession = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.MemberSession, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.MemberSession.displayName =
              "proto.ui.push.MemberSession"),
          (proto.ui.push.UserConfigure = function (e) {
            r.Message.initialize(
              this,
              e,
              0,
              -1,
              proto.ui.push.UserConfigure.repeatedFields_,
              null
            );
          }),
          s.inherits(proto.ui.push.UserConfigure, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.UserConfigure.displayName =
              "proto.ui.push.UserConfigure"),
          (proto.ui.push.User = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.User, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.User.displayName = "proto.ui.push.User"),
          (proto.ui.push.Member = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.Member, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.Member.displayName = "proto.ui.push.Member"),
          (proto.ui.push.GroupMemberOnlineInfo = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.GroupMemberOnlineInfo, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.GroupMemberOnlineInfo.displayName =
              "proto.ui.push.GroupMemberOnlineInfo"),
          (proto.ui.push.GroupSession = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.GroupSession, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.GroupSession.displayName =
              "proto.ui.push.GroupSession"),
          (proto.ui.push.Group = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.Group, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.Group.displayName = "proto.ui.push.Group"),
          (proto.ui.push.OnlineStatusChanged = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.OnlineStatusChanged, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.OnlineStatusChanged.displayName =
              "proto.ui.push.OnlineStatusChanged"),
          (proto.ui.push.ErrorMessage = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.ErrorMessage, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.ErrorMessage.displayName =
              "proto.ui.push.ErrorMessage"),
          (proto.ui.push.GroupListChanged = function (e) {
            r.Message.initialize(
              this,
              e,
              0,
              -1,
              proto.ui.push.GroupListChanged.repeatedFields_,
              null
            );
          }),
          s.inherits(proto.ui.push.GroupListChanged, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.GroupListChanged.displayName =
              "proto.ui.push.GroupListChanged"),
          (proto.ui.push.WatchGroupListChanged = function (e) {
            r.Message.initialize(
              this,
              e,
              0,
              -1,
              proto.ui.push.WatchGroupListChanged.repeatedFields_,
              null
            );
          }),
          s.inherits(proto.ui.push.WatchGroupListChanged, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.WatchGroupListChanged.displayName =
              "proto.ui.push.WatchGroupListChanged"),
          (proto.ui.push.GroupChanged = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.GroupChanged, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.GroupChanged.displayName =
              "proto.ui.push.GroupChanged"),
          (proto.ui.push.CurrentGroupChanged = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.CurrentGroupChanged, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.CurrentGroupChanged.displayName =
              "proto.ui.push.CurrentGroupChanged"),
          (proto.ui.push.MemberListChanged = function (e) {
            r.Message.initialize(
              this,
              e,
              0,
              -1,
              proto.ui.push.MemberListChanged.repeatedFields_,
              null
            );
          }),
          s.inherits(proto.ui.push.MemberListChanged, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.MemberListChanged.displayName =
              "proto.ui.push.MemberListChanged"),
          (proto.ui.push.MemberChanged = function (e) {
            r.Message.initialize(
              this,
              e,
              0,
              -1,
              proto.ui.push.MemberChanged.repeatedFields_,
              null
            );
          }),
          s.inherits(proto.ui.push.MemberChanged, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.MemberChanged.displayName =
              "proto.ui.push.MemberChanged"),
          (proto.ui.push.UsersChanged = function (e) {
            r.Message.initialize(
              this,
              e,
              0,
              -1,
              proto.ui.push.UsersChanged.repeatedFields_,
              null
            );
          }),
          s.inherits(proto.ui.push.UsersChanged, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.UsersChanged.displayName =
              "proto.ui.push.UsersChanged"),
          (proto.ui.push.LiosMic = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.LiosMic, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.LiosMic.displayName = "proto.ui.push.LiosMic"),
          (proto.ui.push.LntercomInfo = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.LntercomInfo, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.LntercomInfo.displayName =
              "proto.ui.push.LntercomInfo"),
          (proto.ui.push.SelfStartSpeak = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.SelfStartSpeak, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.SelfStartSpeak.displayName =
              "proto.ui.push.SelfStartSpeak"),
          (proto.ui.push.SelfStopSpeak = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.SelfStopSpeak, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.SelfStopSpeak.displayName =
              "proto.ui.push.SelfStopSpeak"),
          (proto.ui.push.UserStartSpeak = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.UserStartSpeak, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.UserStartSpeak.displayName =
              "proto.ui.push.UserStartSpeak"),
          (proto.ui.push.UserStopSpeak = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.UserStopSpeak, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.UserStopSpeak.displayName =
              "proto.ui.push.UserStopSpeak"),
          (proto.ui.push.ChangeNameResult = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.ChangeNameResult, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.ChangeNameResult.displayName =
              "proto.ui.push.ChangeNameResult"),
          (proto.ui.push.ChangePasswordResult = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.ChangePasswordResult, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.ChangePasswordResult.displayName =
              "proto.ui.push.ChangePasswordResult"),
          (proto.ui.push.PostBroadcastResult = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.PostBroadcastResult, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.PostBroadcastResult.displayName =
              "proto.ui.push.PostBroadcastResult"),
          (proto.ui.push.AudioEnableChanged = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.AudioEnableChanged, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.AudioEnableChanged.displayName =
              "proto.ui.push.AudioEnableChanged"),
          (proto.ui.push.EnabledResult = function (e) {
            r.Message.initialize(
              this,
              e,
              0,
              -1,
              proto.ui.push.EnabledResult.repeatedFields_,
              null
            );
          }),
          s.inherits(proto.ui.push.EnabledResult, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.EnabledResult.displayName =
              "proto.ui.push.EnabledResult"),
          (proto.ui.push.AudioEnableResult = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.AudioEnableResult, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.AudioEnableResult.displayName =
              "proto.ui.push.AudioEnableResult"),
          (proto.ui.push.Dispatch = function (e) {
            r.Message.initialize(
              this,
              e,
              0,
              -1,
              proto.ui.push.Dispatch.repeatedFields_,
              null
            );
          }),
          s.inherits(proto.ui.push.Dispatch, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.Dispatch.displayName = "proto.ui.push.Dispatch"),
          (proto.ui.push.DispatchResult = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.DispatchResult, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.DispatchResult.displayName =
              "proto.ui.push.DispatchResult"),
          (proto.ui.push.TakemicResult = function (e) {
            r.Message.initialize(
              this,
              e,
              0,
              -1,
              proto.ui.push.TakemicResult.repeatedFields_,
              null
            );
          }),
          s.inherits(proto.ui.push.TakemicResult, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.TakemicResult.displayName =
              "proto.ui.push.TakemicResult"),
          (proto.ui.push.SwitchLocateResult = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.SwitchLocateResult, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.SwitchLocateResult.displayName =
              "proto.ui.push.SwitchLocateResult"),
          (proto.ui.push.PlayAudioFileStatue = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.PlayAudioFileStatue, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.PlayAudioFileStatue.displayName =
              "proto.ui.push.PlayAudioFileStatue"),
          (proto.ui.push.RecordEvent = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.RecordEvent, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.RecordEvent.displayName =
              "proto.ui.push.RecordEvent"),
          (proto.ui.push.RecordStart = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.RecordStart, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.RecordStart.displayName =
              "proto.ui.push.RecordStart"),
          (proto.ui.push.RecordStop = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.RecordStop, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.RecordStop.displayName = "proto.ui.push.RecordStop"),
          (proto.ui.push.QuerylistenGroupResult = function (e) {
            r.Message.initialize(
              this,
              e,
              0,
              -1,
              proto.ui.push.QuerylistenGroupResult.repeatedFields_,
              null
            );
          }),
          s.inherits(proto.ui.push.QuerylistenGroupResult, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.QuerylistenGroupResult.displayName =
              "proto.ui.push.QuerylistenGroupResult"),
          (proto.ui.push.QuerylistenGroupChanged = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.QuerylistenGroupChanged, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.QuerylistenGroupChanged.displayName =
              "proto.ui.push.QuerylistenGroupChanged"),
          (proto.ui.push.ChangeGroupNameResult = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.ChangeGroupNameResult, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.ChangeGroupNameResult.displayName =
              "proto.ui.push.ChangeGroupNameResult"),
          (proto.ui.push.QuitGrouResult = function (e) {
            r.Message.initialize(
              this,
              e,
              0,
              -1,
              proto.ui.push.QuitGrouResult.repeatedFields_,
              null
            );
          }),
          s.inherits(proto.ui.push.QuitGrouResult, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.QuitGrouResult.displayName =
              "proto.ui.push.QuitGrouResult"),
          (proto.ui.push.RequestJoinSession = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.RequestJoinSession, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.RequestJoinSession.displayName =
              "proto.ui.push.RequestJoinSession"),
          (proto.ui.push.DeleteSessionAck = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.DeleteSessionAck, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.DeleteSessionAck.displayName =
              "proto.ui.push.DeleteSessionAck"),
          (proto.ui.push.StartSessionAck = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.StartSessionAck, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.StartSessionAck.displayName =
              "proto.ui.push.StartSessionAck"),
          (proto.ui.push.StopSessionAck = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.StopSessionAck, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.StopSessionAck.displayName =
              "proto.ui.push.StopSessionAck"),
          (proto.ui.push.ResponseSessionAck = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.ResponseSessionAck, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.ResponseSessionAck.displayName =
              "proto.ui.push.ResponseSessionAck"),
          (proto.ui.push.ResponseJoinSessionAck = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.ResponseJoinSessionAck, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.ResponseJoinSessionAck.displayName =
              "proto.ui.push.ResponseJoinSessionAck"),
          (proto.ui.push.ResponseSessionResult = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.ResponseSessionResult, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.ResponseSessionResult.displayName =
              "proto.ui.push.ResponseSessionResult"),
          (proto.ui.push.DisableUserAck = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.DisableUserAck, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.DisableUserAck.displayName =
              "proto.ui.push.DisableUserAck"),
          (proto.ui.push.EnableUserAck = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.EnableUserAck, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.EnableUserAck.displayName =
              "proto.ui.push.EnableUserAck"),
          (proto.ui.push.PushDeliver = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.PushDeliver, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.PushDeliver.displayName =
              "proto.ui.push.PushDeliver"),
          (proto.ui.push.StopSessionResult = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.StopSessionResult, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.StopSessionResult.displayName =
              "proto.ui.push.StopSessionResult"),
          (proto.ui.push.SetGroupMaxSpeechTimeAck = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.SetGroupMaxSpeechTimeAck, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.SetGroupMaxSpeechTimeAck.displayName =
              "proto.ui.push.SetGroupMaxSpeechTimeAck"),
          (proto.ui.push.UserStatusChanged = function (e) {
            r.Message.initialize(
              this,
              e,
              0,
              -1,
              proto.ui.push.UserStatusChanged.repeatedFields_,
              null
            );
          }),
          s.inherits(proto.ui.push.UserStatusChanged, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.UserStatusChanged.displayName =
              "proto.ui.push.UserStatusChanged"),
          (proto.ui.push.ChangeEmail = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.ChangeEmail, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.ChangeEmail.displayName =
              "proto.ui.push.ChangeEmail"),
          (proto.ui.push.ChangePhone = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.ChangePhone, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.ChangePhone.displayName =
              "proto.ui.push.ChangePhone"),
          (proto.ui.push.InviteSessionAck = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.InviteSessionAck, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.InviteSessionAck.displayName =
              "proto.ui.push.InviteSessionAck"),
          (proto.ui.push.ChangeGroupDescAck = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.ChangeGroupDescAck, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.ChangeGroupDescAck.displayName =
              "proto.ui.push.ChangeGroupDescAck"),
          (proto.ui.push.UpdateUserConfigureAck = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.UpdateUserConfigureAck, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.UpdateUserConfigureAck.displayName =
              "proto.ui.push.UpdateUserConfigureAck"),
          (proto.ui.push.RRResuntAck = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.RRResuntAck, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.RRResuntAck.displayName =
              "proto.ui.push.RRResuntAck"),
          (proto.ui.push.PlayProgressAck = function (e) {
            r.Message.initialize(this, e, 0, -1, null, null);
          }),
          s.inherits(proto.ui.push.PlayProgressAck, r.Message),
          s.DEBUG &&
            !COMPILED &&
            (proto.ui.push.PlayProgressAck.displayName =
              "proto.ui.push.PlayProgressAck"),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.MemberSession.prototype.toObject = function (e) {
              return proto.ui.push.MemberSession.toObject(e, this);
            }),
            (proto.ui.push.MemberSession.toObject = function (e, t) {
              var o,
                s = {
                  response: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  confirmed:
                    null == (o = r.Message.getBooleanField(t, 2)) ? void 0 : o,
                  deleted:
                    null == (o = r.Message.getBooleanField(t, 3)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.MemberSession.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.MemberSession();
            return proto.ui.push.MemberSession.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.MemberSession.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readUint32();
                  e.setResponse(o);
                  break;
                case 2:
                  o = t.readBool();
                  e.setConfirmed(o);
                  break;
                case 3:
                  o = t.readBool();
                  e.setDeleted(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.MemberSession.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.MemberSession.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.MemberSession.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeBool(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeBool(3, o);
          }),
          (proto.ui.push.MemberSession.prototype.getResponse = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.MemberSession.prototype.setResponse = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.MemberSession.prototype.clearResponse = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.MemberSession.prototype.hasResponse = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.MemberSession.prototype.getConfirmed = function () {
            return r.Message.getBooleanFieldWithDefault(this, 2, !1);
          }),
          (proto.ui.push.MemberSession.prototype.setConfirmed = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.MemberSession.prototype.clearConfirmed = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.MemberSession.prototype.hasConfirmed = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.MemberSession.prototype.getDeleted = function () {
            return r.Message.getBooleanFieldWithDefault(this, 3, !1);
          }),
          (proto.ui.push.MemberSession.prototype.setDeleted = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.MemberSession.prototype.clearDeleted = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.MemberSession.prototype.hasDeleted = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.UserConfigure.repeatedFields_ = [6]),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.UserConfigure.prototype.toObject = function (e) {
              return proto.ui.push.UserConfigure.toObject(e, this);
            }),
            (proto.ui.push.UserConfigure.toObject = function (e, t) {
              var o,
                s = {
                  defaultgroup:
                    null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  locationperiod:
                    null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  location: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  locationmodel:
                    null == (o = r.Message.getField(t, 4)) ? void 0 : o,
                  defaultwatchgroupcount:
                    null == (o = r.Message.getField(t, 5)) ? void 0 : o,
                  defaultwatchgroupList:
                    null == (o = r.Message.getRepeatedField(t, 6)) ? void 0 : o,
                  allowinvite:
                    null == (o = r.Message.getBooleanField(t, 7)) ? void 0 : o,
                  allowinvited:
                    null == (o = r.Message.getBooleanField(t, 8)) ? void 0 : o,
                  allowsendbroadcast:
                    null == (o = r.Message.getBooleanField(t, 9)) ? void 0 : o,
                  allowviewvideo:
                    null == (o = r.Message.getBooleanField(t, 10)) ? void 0 : o,
                  autoanswer:
                    null == (o = r.Message.getBooleanField(t, 11)) ? void 0 : o,
                  audioenabled:
                    null == (o = r.Message.getBooleanField(t, 12)) ? void 0 : o,
                  devinfoenabled:
                    null == (o = r.Message.getField(t, 13)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.UserConfigure.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.UserConfigure();
            return proto.ui.push.UserConfigure.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.UserConfigure.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readString();
                  e.setDefaultgroup(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.setLocationperiod(o);
                  break;
                case 3:
                  o = t.readUint32();
                  e.setLocation(o);
                  break;
                case 4:
                  o = t.readUint32();
                  e.setLocationmodel(o);
                  break;
                case 5:
                  o = t.readUint32();
                  e.setDefaultwatchgroupcount(o);
                  break;
                case 6:
                  o = t.readString();
                  e.addDefaultwatchgroup(o);
                  break;
                case 7:
                  o = t.readBool();
                  e.setAllowinvite(o);
                  break;
                case 8:
                  o = t.readBool();
                  e.setAllowinvited(o);
                  break;
                case 9:
                  o = t.readBool();
                  e.setAllowsendbroadcast(o);
                  break;
                case 10:
                  o = t.readBool();
                  e.setAllowviewvideo(o);
                  break;
                case 11:
                  o = t.readBool();
                  e.setAutoanswer(o);
                  break;
                case 12:
                  o = t.readBool();
                  e.setAudioenabled(o);
                  break;
                case 13:
                  o = t.readUint32();
                  e.setDevinfoenabled(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.UserConfigure.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.UserConfigure.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.UserConfigure.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeUint32(3, o),
              null != (o = r.Message.getField(e, 4)) && t.writeUint32(4, o),
              null != (o = r.Message.getField(e, 5)) && t.writeUint32(5, o),
              (o = e.getDefaultwatchgroupList()).length > 0 &&
                t.writeRepeatedString(6, o),
              null != (o = r.Message.getField(e, 7)) && t.writeBool(7, o),
              null != (o = r.Message.getField(e, 8)) && t.writeBool(8, o),
              null != (o = r.Message.getField(e, 9)) && t.writeBool(9, o),
              null != (o = r.Message.getField(e, 10)) && t.writeBool(10, o),
              null != (o = r.Message.getField(e, 11)) && t.writeBool(11, o),
              null != (o = r.Message.getField(e, 12)) && t.writeBool(12, o),
              null != (o = r.Message.getField(e, 13)) && t.writeUint32(13, o);
          }),
          (proto.ui.push.UserConfigure.prototype.getDefaultgroup = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.UserConfigure.prototype.setDefaultgroup = function (
            e
          ) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.UserConfigure.prototype.clearDefaultgroup =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.UserConfigure.prototype.hasDefaultgroup = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.UserConfigure.prototype.getLocationperiod =
            function () {
              return r.Message.getFieldWithDefault(this, 2, 0);
            }),
          (proto.ui.push.UserConfigure.prototype.setLocationperiod = function (
            e
          ) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.UserConfigure.prototype.clearLocationperiod =
            function () {
              return r.Message.setField(this, 2, void 0);
            }),
          (proto.ui.push.UserConfigure.prototype.hasLocationperiod =
            function () {
              return null != r.Message.getField(this, 2);
            }),
          (proto.ui.push.UserConfigure.prototype.getLocation = function () {
            return r.Message.getFieldWithDefault(this, 3, 0);
          }),
          (proto.ui.push.UserConfigure.prototype.setLocation = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.UserConfigure.prototype.clearLocation = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.UserConfigure.prototype.hasLocation = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.UserConfigure.prototype.getLocationmodel =
            function () {
              return r.Message.getFieldWithDefault(this, 4, 0);
            }),
          (proto.ui.push.UserConfigure.prototype.setLocationmodel = function (
            e
          ) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.UserConfigure.prototype.clearLocationmodel =
            function () {
              return r.Message.setField(this, 4, void 0);
            }),
          (proto.ui.push.UserConfigure.prototype.hasLocationmodel =
            function () {
              return null != r.Message.getField(this, 4);
            }),
          (proto.ui.push.UserConfigure.prototype.getDefaultwatchgroupcount =
            function () {
              return r.Message.getFieldWithDefault(this, 5, 0);
            }),
          (proto.ui.push.UserConfigure.prototype.setDefaultwatchgroupcount =
            function (e) {
              return r.Message.setField(this, 5, e);
            }),
          (proto.ui.push.UserConfigure.prototype.clearDefaultwatchgroupcount =
            function () {
              return r.Message.setField(this, 5, void 0);
            }),
          (proto.ui.push.UserConfigure.prototype.hasDefaultwatchgroupcount =
            function () {
              return null != r.Message.getField(this, 5);
            }),
          (proto.ui.push.UserConfigure.prototype.getDefaultwatchgroupList =
            function () {
              return r.Message.getRepeatedField(this, 6);
            }),
          (proto.ui.push.UserConfigure.prototype.setDefaultwatchgroupList =
            function (e) {
              return r.Message.setField(this, 6, e || []);
            }),
          (proto.ui.push.UserConfigure.prototype.addDefaultwatchgroup =
            function (e, t) {
              return r.Message.addToRepeatedField(this, 6, e, t);
            }),
          (proto.ui.push.UserConfigure.prototype.clearDefaultwatchgroupList =
            function () {
              return this.setDefaultwatchgroupList([]);
            }),
          (proto.ui.push.UserConfigure.prototype.getAllowinvite = function () {
            return r.Message.getBooleanFieldWithDefault(this, 7, !1);
          }),
          (proto.ui.push.UserConfigure.prototype.setAllowinvite = function (e) {
            return r.Message.setField(this, 7, e);
          }),
          (proto.ui.push.UserConfigure.prototype.clearAllowinvite =
            function () {
              return r.Message.setField(this, 7, void 0);
            }),
          (proto.ui.push.UserConfigure.prototype.hasAllowinvite = function () {
            return null != r.Message.getField(this, 7);
          }),
          (proto.ui.push.UserConfigure.prototype.getAllowinvited = function () {
            return r.Message.getBooleanFieldWithDefault(this, 8, !1);
          }),
          (proto.ui.push.UserConfigure.prototype.setAllowinvited = function (
            e
          ) {
            return r.Message.setField(this, 8, e);
          }),
          (proto.ui.push.UserConfigure.prototype.clearAllowinvited =
            function () {
              return r.Message.setField(this, 8, void 0);
            }),
          (proto.ui.push.UserConfigure.prototype.hasAllowinvited = function () {
            return null != r.Message.getField(this, 8);
          }),
          (proto.ui.push.UserConfigure.prototype.getAllowsendbroadcast =
            function () {
              return r.Message.getBooleanFieldWithDefault(this, 9, !1);
            }),
          (proto.ui.push.UserConfigure.prototype.setAllowsendbroadcast =
            function (e) {
              return r.Message.setField(this, 9, e);
            }),
          (proto.ui.push.UserConfigure.prototype.clearAllowsendbroadcast =
            function () {
              return r.Message.setField(this, 9, void 0);
            }),
          (proto.ui.push.UserConfigure.prototype.hasAllowsendbroadcast =
            function () {
              return null != r.Message.getField(this, 9);
            }),
          (proto.ui.push.UserConfigure.prototype.getAllowviewvideo =
            function () {
              return r.Message.getBooleanFieldWithDefault(this, 10, !1);
            }),
          (proto.ui.push.UserConfigure.prototype.setAllowviewvideo = function (
            e
          ) {
            return r.Message.setField(this, 10, e);
          }),
          (proto.ui.push.UserConfigure.prototype.clearAllowviewvideo =
            function () {
              return r.Message.setField(this, 10, void 0);
            }),
          (proto.ui.push.UserConfigure.prototype.hasAllowviewvideo =
            function () {
              return null != r.Message.getField(this, 10);
            }),
          (proto.ui.push.UserConfigure.prototype.getAutoanswer = function () {
            return r.Message.getBooleanFieldWithDefault(this, 11, !1);
          }),
          (proto.ui.push.UserConfigure.prototype.setAutoanswer = function (e) {
            return r.Message.setField(this, 11, e);
          }),
          (proto.ui.push.UserConfigure.prototype.clearAutoanswer = function () {
            return r.Message.setField(this, 11, void 0);
          }),
          (proto.ui.push.UserConfigure.prototype.hasAutoanswer = function () {
            return null != r.Message.getField(this, 11);
          }),
          (proto.ui.push.UserConfigure.prototype.getAudioenabled = function () {
            return r.Message.getBooleanFieldWithDefault(this, 12, !1);
          }),
          (proto.ui.push.UserConfigure.prototype.setAudioenabled = function (
            e
          ) {
            return r.Message.setField(this, 12, e);
          }),
          (proto.ui.push.UserConfigure.prototype.clearAudioenabled =
            function () {
              return r.Message.setField(this, 12, void 0);
            }),
          (proto.ui.push.UserConfigure.prototype.hasAudioenabled = function () {
            return null != r.Message.getField(this, 12);
          }),
          (proto.ui.push.UserConfigure.prototype.getDevinfoenabled =
            function () {
              return r.Message.getFieldWithDefault(this, 13, 0);
            }),
          (proto.ui.push.UserConfigure.prototype.setDevinfoenabled = function (
            e
          ) {
            return r.Message.setField(this, 13, e);
          }),
          (proto.ui.push.UserConfigure.prototype.clearDevinfoenabled =
            function () {
              return r.Message.setField(this, 13, void 0);
            }),
          (proto.ui.push.UserConfigure.prototype.hasDevinfoenabled =
            function () {
              return null != r.Message.getField(this, 13);
            }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.User.prototype.toObject = function (e) {
              return proto.ui.push.User.toObject(e, this);
            }),
            (proto.ui.push.User.toObject = function (e, t) {
              var o,
                s = {
                  uid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  name: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  online: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  audioenabled: r.Message.getBooleanFieldWithDefault(t, 4, !0),
                  sleep: r.Message.getBooleanFieldWithDefault(t, 5, !1),
                  dnd: r.Message.getBooleanFieldWithDefault(t, 6, !1),
                  hasgid: r.Message.getBooleanFieldWithDefault(t, 7, !1),
                  gid: null == (o = r.Message.getField(t, 8)) ? void 0 : o,
                  role: r.Message.getFieldWithDefault(t, 9, 0),
                  locon:
                    null == (o = r.Message.getBooleanField(t, 10)) ? void 0 : o,
                  locperiod:
                    null == (o = r.Message.getField(t, 11)) ? void 0 : o,
                  account: null == (o = r.Message.getField(t, 12)) ? void 0 : o,
                  avatar: null == (o = r.Message.getField(t, 13)) ? void 0 : o,
                  sex: null == (o = r.Message.getField(t, 14)) ? void 0 : o,
                  blocked: r.Message.getBooleanFieldWithDefault(t, 15, !1),
                  email: null == (o = r.Message.getField(t, 16)) ? void 0 : o,
                  phone: null == (o = r.Message.getField(t, 17)) ? void 0 : o,
                  imei: null == (o = r.Message.getField(t, 18)) ? void 0 : o,
                  devicetype:
                    null == (o = r.Message.getField(t, 19)) ? void 0 : o,
                  chatenabled:
                    null == (o = r.Message.getBooleanField(t, 20)) ? void 0 : o,
                  configure:
                    (o = t.getConfigure()) &&
                    proto.ui.push.UserConfigure.toObject(e, o),
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.User.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.User();
            return proto.ui.push.User.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.User.deserializeBinaryFromReader = function (e, t) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readUint32();
                  e.setUid(o);
                  break;
                case 2:
                  o = t.readString();
                  e.setName(o);
                  break;
                case 3:
                  o = t.readUint32();
                  e.setOnline(o);
                  break;
                case 4:
                  o = t.readBool();
                  e.setAudioenabled(o);
                  break;
                case 5:
                  o = t.readBool();
                  e.setSleep(o);
                  break;
                case 6:
                  o = t.readBool();
                  e.setDnd(o);
                  break;
                case 7:
                  o = t.readBool();
                  e.setHasgid(o);
                  break;
                case 8:
                  o = t.readString();
                  e.setGid(o);
                  break;
                case 9:
                  o = t.readInt32();
                  e.setRole(o);
                  break;
                case 10:
                  o = t.readBool();
                  e.setLocon(o);
                  break;
                case 11:
                  o = t.readUint32();
                  e.setLocperiod(o);
                  break;
                case 12:
                  o = t.readString();
                  e.setAccount(o);
                  break;
                case 13:
                  o = t.readString();
                  e.setAvatar(o);
                  break;
                case 14:
                  o = t.readInt32();
                  e.setSex(o);
                  break;
                case 15:
                  o = t.readBool();
                  e.setBlocked(o);
                  break;
                case 16:
                  o = t.readString();
                  e.setEmail(o);
                  break;
                case 17:
                  o = t.readString();
                  e.setPhone(o);
                  break;
                case 18:
                  o = t.readString();
                  e.setImei(o);
                  break;
                case 19:
                  o = t.readString();
                  e.setDevicetype(o);
                  break;
                case 20:
                  o = t.readBool();
                  e.setChatenabled(o);
                  break;
                case 21:
                  o = new proto.ui.push.UserConfigure();
                  t.readMessage(
                    o,
                    proto.ui.push.UserConfigure.deserializeBinaryFromReader
                  ),
                    e.setConfigure(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.User.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.User.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.User.serializeBinaryToWriter = function (e, t) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeString(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeUint32(3, o),
              null != (o = r.Message.getField(e, 4)) && t.writeBool(4, o),
              null != (o = r.Message.getField(e, 5)) && t.writeBool(5, o),
              null != (o = r.Message.getField(e, 6)) && t.writeBool(6, o),
              null != (o = r.Message.getField(e, 7)) && t.writeBool(7, o),
              null != (o = r.Message.getField(e, 8)) && t.writeString(8, o),
              null != (o = r.Message.getField(e, 9)) && t.writeInt32(9, o),
              null != (o = r.Message.getField(e, 10)) && t.writeBool(10, o),
              null != (o = r.Message.getField(e, 11)) && t.writeUint32(11, o),
              null != (o = r.Message.getField(e, 12)) && t.writeString(12, o),
              null != (o = r.Message.getField(e, 13)) && t.writeString(13, o),
              null != (o = r.Message.getField(e, 14)) && t.writeInt32(14, o),
              null != (o = r.Message.getField(e, 15)) && t.writeBool(15, o),
              null != (o = r.Message.getField(e, 16)) && t.writeString(16, o),
              null != (o = r.Message.getField(e, 17)) && t.writeString(17, o),
              null != (o = r.Message.getField(e, 18)) && t.writeString(18, o),
              null != (o = r.Message.getField(e, 19)) && t.writeString(19, o),
              null != (o = r.Message.getField(e, 20)) && t.writeBool(20, o),
              null != (o = e.getConfigure()) &&
                t.writeMessage(
                  21,
                  o,
                  proto.ui.push.UserConfigure.serializeBinaryToWriter
                );
          }),
          (proto.ui.push.User.prototype.getUid = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.User.prototype.setUid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.User.prototype.clearUid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.User.prototype.hasUid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.User.prototype.getName = function () {
            return r.Message.getFieldWithDefault(this, 2, "");
          }),
          (proto.ui.push.User.prototype.setName = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.User.prototype.clearName = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.User.prototype.hasName = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.User.prototype.getOnline = function () {
            return r.Message.getFieldWithDefault(this, 3, 0);
          }),
          (proto.ui.push.User.prototype.setOnline = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.User.prototype.clearOnline = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.User.prototype.hasOnline = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.User.prototype.getAudioenabled = function () {
            return r.Message.getBooleanFieldWithDefault(this, 4, !0);
          }),
          (proto.ui.push.User.prototype.setAudioenabled = function (e) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.User.prototype.clearAudioenabled = function () {
            return r.Message.setField(this, 4, void 0);
          }),
          (proto.ui.push.User.prototype.hasAudioenabled = function () {
            return null != r.Message.getField(this, 4);
          }),
          (proto.ui.push.User.prototype.getSleep = function () {
            return r.Message.getBooleanFieldWithDefault(this, 5, !1);
          }),
          (proto.ui.push.User.prototype.setSleep = function (e) {
            return r.Message.setField(this, 5, e);
          }),
          (proto.ui.push.User.prototype.clearSleep = function () {
            return r.Message.setField(this, 5, void 0);
          }),
          (proto.ui.push.User.prototype.hasSleep = function () {
            return null != r.Message.getField(this, 5);
          }),
          (proto.ui.push.User.prototype.getDnd = function () {
            return r.Message.getBooleanFieldWithDefault(this, 6, !1);
          }),
          (proto.ui.push.User.prototype.setDnd = function (e) {
            return r.Message.setField(this, 6, e);
          }),
          (proto.ui.push.User.prototype.clearDnd = function () {
            return r.Message.setField(this, 6, void 0);
          }),
          (proto.ui.push.User.prototype.hasDnd = function () {
            return null != r.Message.getField(this, 6);
          }),
          (proto.ui.push.User.prototype.getHasgid = function () {
            return r.Message.getBooleanFieldWithDefault(this, 7, !1);
          }),
          (proto.ui.push.User.prototype.setHasgid = function (e) {
            return r.Message.setField(this, 7, e);
          }),
          (proto.ui.push.User.prototype.clearHasgid = function () {
            return r.Message.setField(this, 7, void 0);
          }),
          (proto.ui.push.User.prototype.hasHasgid = function () {
            return null != r.Message.getField(this, 7);
          }),
          (proto.ui.push.User.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 8, "");
          }),
          (proto.ui.push.User.prototype.setGid = function (e) {
            return r.Message.setField(this, 8, e);
          }),
          (proto.ui.push.User.prototype.clearGid = function () {
            return r.Message.setField(this, 8, void 0);
          }),
          (proto.ui.push.User.prototype.hasGid = function () {
            return null != r.Message.getField(this, 8);
          }),
          (proto.ui.push.User.prototype.getRole = function () {
            return r.Message.getFieldWithDefault(this, 9, 0);
          }),
          (proto.ui.push.User.prototype.setRole = function (e) {
            return r.Message.setField(this, 9, e);
          }),
          (proto.ui.push.User.prototype.clearRole = function () {
            return r.Message.setField(this, 9, void 0);
          }),
          (proto.ui.push.User.prototype.hasRole = function () {
            return null != r.Message.getField(this, 9);
          }),
          (proto.ui.push.User.prototype.getLocon = function () {
            return r.Message.getBooleanFieldWithDefault(this, 10, !1);
          }),
          (proto.ui.push.User.prototype.setLocon = function (e) {
            return r.Message.setField(this, 10, e);
          }),
          (proto.ui.push.User.prototype.clearLocon = function () {
            return r.Message.setField(this, 10, void 0);
          }),
          (proto.ui.push.User.prototype.hasLocon = function () {
            return null != r.Message.getField(this, 10);
          }),
          (proto.ui.push.User.prototype.getLocperiod = function () {
            return r.Message.getFieldWithDefault(this, 11, 0);
          }),
          (proto.ui.push.User.prototype.setLocperiod = function (e) {
            return r.Message.setField(this, 11, e);
          }),
          (proto.ui.push.User.prototype.clearLocperiod = function () {
            return r.Message.setField(this, 11, void 0);
          }),
          (proto.ui.push.User.prototype.hasLocperiod = function () {
            return null != r.Message.getField(this, 11);
          }),
          (proto.ui.push.User.prototype.getAccount = function () {
            return r.Message.getFieldWithDefault(this, 12, "");
          }),
          (proto.ui.push.User.prototype.setAccount = function (e) {
            return r.Message.setField(this, 12, e);
          }),
          (proto.ui.push.User.prototype.clearAccount = function () {
            return r.Message.setField(this, 12, void 0);
          }),
          (proto.ui.push.User.prototype.hasAccount = function () {
            return null != r.Message.getField(this, 12);
          }),
          (proto.ui.push.User.prototype.getAvatar = function () {
            return r.Message.getFieldWithDefault(this, 13, "");
          }),
          (proto.ui.push.User.prototype.setAvatar = function (e) {
            return r.Message.setField(this, 13, e);
          }),
          (proto.ui.push.User.prototype.clearAvatar = function () {
            return r.Message.setField(this, 13, void 0);
          }),
          (proto.ui.push.User.prototype.hasAvatar = function () {
            return null != r.Message.getField(this, 13);
          }),
          (proto.ui.push.User.prototype.getSex = function () {
            return r.Message.getFieldWithDefault(this, 14, 0);
          }),
          (proto.ui.push.User.prototype.setSex = function (e) {
            return r.Message.setField(this, 14, e);
          }),
          (proto.ui.push.User.prototype.clearSex = function () {
            return r.Message.setField(this, 14, void 0);
          }),
          (proto.ui.push.User.prototype.hasSex = function () {
            return null != r.Message.getField(this, 14);
          }),
          (proto.ui.push.User.prototype.getBlocked = function () {
            return r.Message.getBooleanFieldWithDefault(this, 15, !1);
          }),
          (proto.ui.push.User.prototype.setBlocked = function (e) {
            return r.Message.setField(this, 15, e);
          }),
          (proto.ui.push.User.prototype.clearBlocked = function () {
            return r.Message.setField(this, 15, void 0);
          }),
          (proto.ui.push.User.prototype.hasBlocked = function () {
            return null != r.Message.getField(this, 15);
          }),
          (proto.ui.push.User.prototype.getEmail = function () {
            return r.Message.getFieldWithDefault(this, 16, "");
          }),
          (proto.ui.push.User.prototype.setEmail = function (e) {
            return r.Message.setField(this, 16, e);
          }),
          (proto.ui.push.User.prototype.clearEmail = function () {
            return r.Message.setField(this, 16, void 0);
          }),
          (proto.ui.push.User.prototype.hasEmail = function () {
            return null != r.Message.getField(this, 16);
          }),
          (proto.ui.push.User.prototype.getPhone = function () {
            return r.Message.getFieldWithDefault(this, 17, "");
          }),
          (proto.ui.push.User.prototype.setPhone = function (e) {
            return r.Message.setField(this, 17, e);
          }),
          (proto.ui.push.User.prototype.clearPhone = function () {
            return r.Message.setField(this, 17, void 0);
          }),
          (proto.ui.push.User.prototype.hasPhone = function () {
            return null != r.Message.getField(this, 17);
          }),
          (proto.ui.push.User.prototype.getImei = function () {
            return r.Message.getFieldWithDefault(this, 18, "");
          }),
          (proto.ui.push.User.prototype.setImei = function (e) {
            return r.Message.setField(this, 18, e);
          }),
          (proto.ui.push.User.prototype.clearImei = function () {
            return r.Message.setField(this, 18, void 0);
          }),
          (proto.ui.push.User.prototype.hasImei = function () {
            return null != r.Message.getField(this, 18);
          }),
          (proto.ui.push.User.prototype.getDevicetype = function () {
            return r.Message.getFieldWithDefault(this, 19, "");
          }),
          (proto.ui.push.User.prototype.setDevicetype = function (e) {
            return r.Message.setField(this, 19, e);
          }),
          (proto.ui.push.User.prototype.clearDevicetype = function () {
            return r.Message.setField(this, 19, void 0);
          }),
          (proto.ui.push.User.prototype.hasDevicetype = function () {
            return null != r.Message.getField(this, 19);
          }),
          (proto.ui.push.User.prototype.getChatenabled = function () {
            return r.Message.getBooleanFieldWithDefault(this, 20, !1);
          }),
          (proto.ui.push.User.prototype.setChatenabled = function (e) {
            return r.Message.setField(this, 20, e);
          }),
          (proto.ui.push.User.prototype.clearChatenabled = function () {
            return r.Message.setField(this, 20, void 0);
          }),
          (proto.ui.push.User.prototype.hasChatenabled = function () {
            return null != r.Message.getField(this, 20);
          }),
          (proto.ui.push.User.prototype.getConfigure = function () {
            return r.Message.getWrapperField(
              this,
              proto.ui.push.UserConfigure,
              21
            );
          }),
          (proto.ui.push.User.prototype.setConfigure = function (e) {
            return r.Message.setWrapperField(this, 21, e);
          }),
          (proto.ui.push.User.prototype.clearConfigure = function () {
            return this.setConfigure(void 0);
          }),
          (proto.ui.push.User.prototype.hasConfigure = function () {
            return null != r.Message.getField(this, 21);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.Member.prototype.toObject = function (e) {
              return proto.ui.push.Member.toObject(e, this);
            }),
            (proto.ui.push.Member.toObject = function (e, t) {
              var o,
                s = {
                  user: (o = t.getUser()) && proto.ui.push.User.toObject(e, o),
                  ingroup:
                    null == (o = r.Message.getBooleanField(t, 2)) ? void 0 : o,
                  ingroupname:
                    null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  ms:
                    (o = t.getMs()) &&
                    proto.ui.push.MemberSession.toObject(e, o),
                  priority: null == (o = r.Message.getField(t, 5)) ? void 0 : o,
                  limitspeech:
                    null == (o = r.Message.getField(t, 6)) ? void 0 : o,
                  top:
                    null == (o = r.Message.getBooleanField(t, 7)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.Member.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.Member();
            return proto.ui.push.Member.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.Member.deserializeBinaryFromReader = function (e, t) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = new proto.ui.push.User();
                  t.readMessage(
                    o,
                    proto.ui.push.User.deserializeBinaryFromReader
                  ),
                    e.setUser(o);
                  break;
                case 2:
                  o = t.readBool();
                  e.setIngroup(o);
                  break;
                case 3:
                  o = t.readString();
                  e.setIngroupname(o);
                  break;
                case 4:
                  o = new proto.ui.push.MemberSession();
                  t.readMessage(
                    o,
                    proto.ui.push.MemberSession.deserializeBinaryFromReader
                  ),
                    e.setMs(o);
                  break;
                case 5:
                  o = t.readInt32();
                  e.setPriority(o);
                  break;
                case 6:
                  o = t.readInt32();
                  e.setLimitspeech(o);
                  break;
                case 7:
                  o = t.readBool();
                  e.setTop(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.Member.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.Member.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.Member.serializeBinaryToWriter = function (e, t) {
            var o = void 0;
            null != (o = e.getUser()) &&
              t.writeMessage(1, o, proto.ui.push.User.serializeBinaryToWriter),
              null != (o = r.Message.getField(e, 2)) && t.writeBool(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeString(3, o),
              null != (o = e.getMs()) &&
                t.writeMessage(
                  4,
                  o,
                  proto.ui.push.MemberSession.serializeBinaryToWriter
                ),
              null != (o = r.Message.getField(e, 5)) && t.writeInt32(5, o),
              null != (o = r.Message.getField(e, 6)) && t.writeInt32(6, o),
              null != (o = r.Message.getField(e, 7)) && t.writeBool(7, o);
          }),
          (proto.ui.push.Member.prototype.getUser = function () {
            return r.Message.getWrapperField(this, proto.ui.push.User, 1);
          }),
          (proto.ui.push.Member.prototype.setUser = function (e) {
            return r.Message.setWrapperField(this, 1, e);
          }),
          (proto.ui.push.Member.prototype.clearUser = function () {
            return this.setUser(void 0);
          }),
          (proto.ui.push.Member.prototype.hasUser = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.Member.prototype.getIngroup = function () {
            return r.Message.getBooleanFieldWithDefault(this, 2, !1);
          }),
          (proto.ui.push.Member.prototype.setIngroup = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.Member.prototype.clearIngroup = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.Member.prototype.hasIngroup = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.Member.prototype.getIngroupname = function () {
            return r.Message.getFieldWithDefault(this, 3, "");
          }),
          (proto.ui.push.Member.prototype.setIngroupname = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.Member.prototype.clearIngroupname = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.Member.prototype.hasIngroupname = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.Member.prototype.getMs = function () {
            return r.Message.getWrapperField(
              this,
              proto.ui.push.MemberSession,
              4
            );
          }),
          (proto.ui.push.Member.prototype.setMs = function (e) {
            return r.Message.setWrapperField(this, 4, e);
          }),
          (proto.ui.push.Member.prototype.clearMs = function () {
            return this.setMs(void 0);
          }),
          (proto.ui.push.Member.prototype.hasMs = function () {
            return null != r.Message.getField(this, 4);
          }),
          (proto.ui.push.Member.prototype.getPriority = function () {
            return r.Message.getFieldWithDefault(this, 5, 0);
          }),
          (proto.ui.push.Member.prototype.setPriority = function (e) {
            return r.Message.setField(this, 5, e);
          }),
          (proto.ui.push.Member.prototype.clearPriority = function () {
            return r.Message.setField(this, 5, void 0);
          }),
          (proto.ui.push.Member.prototype.hasPriority = function () {
            return null != r.Message.getField(this, 5);
          }),
          (proto.ui.push.Member.prototype.getLimitspeech = function () {
            return r.Message.getFieldWithDefault(this, 6, 0);
          }),
          (proto.ui.push.Member.prototype.setLimitspeech = function (e) {
            return r.Message.setField(this, 6, e);
          }),
          (proto.ui.push.Member.prototype.clearLimitspeech = function () {
            return r.Message.setField(this, 6, void 0);
          }),
          (proto.ui.push.Member.prototype.hasLimitspeech = function () {
            return null != r.Message.getField(this, 6);
          }),
          (proto.ui.push.Member.prototype.getTop = function () {
            return r.Message.getBooleanFieldWithDefault(this, 7, !1);
          }),
          (proto.ui.push.Member.prototype.setTop = function (e) {
            return r.Message.setField(this, 7, e);
          }),
          (proto.ui.push.Member.prototype.clearTop = function () {
            return r.Message.setField(this, 7, void 0);
          }),
          (proto.ui.push.Member.prototype.hasTop = function () {
            return null != r.Message.getField(this, 7);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.GroupMemberOnlineInfo.prototype.toObject =
              function (e) {
                return proto.ui.push.GroupMemberOnlineInfo.toObject(e, this);
              }),
            (proto.ui.push.GroupMemberOnlineInfo.toObject = function (e, t) {
              var o,
                s = {
                  count: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  ingroup: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.GroupMemberOnlineInfo.deserializeBinary = function (
            e
          ) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.GroupMemberOnlineInfo();
            return proto.ui.push.GroupMemberOnlineInfo.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.GroupMemberOnlineInfo.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readUint32();
                    e.setCount(o);
                    break;
                  case 2:
                    o = t.readUint32();
                    e.setIngroup(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.GroupMemberOnlineInfo.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.GroupMemberOnlineInfo.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.GroupMemberOnlineInfo.serializeBinaryToWriter =
            function (e, t) {
              var o = void 0;
              null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
                null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o);
            }),
          (proto.ui.push.GroupMemberOnlineInfo.prototype.getCount =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.GroupMemberOnlineInfo.prototype.setCount = function (
            e
          ) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.GroupMemberOnlineInfo.prototype.clearCount =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.GroupMemberOnlineInfo.prototype.hasCount =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          (proto.ui.push.GroupMemberOnlineInfo.prototype.getIngroup =
            function () {
              return r.Message.getFieldWithDefault(this, 2, 0);
            }),
          (proto.ui.push.GroupMemberOnlineInfo.prototype.setIngroup = function (
            e
          ) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.GroupMemberOnlineInfo.prototype.clearIngroup =
            function () {
              return r.Message.setField(this, 2, void 0);
            }),
          (proto.ui.push.GroupMemberOnlineInfo.prototype.hasIngroup =
            function () {
              return null != r.Message.getField(this, 2);
            }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.GroupSession.prototype.toObject = function (e) {
              return proto.ui.push.GroupSession.toObject(e, this);
            }),
            (proto.ui.push.GroupSession.toObject = function (e, t) {
              var o,
                s = {
                  status: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  begintime:
                    null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  endtime: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  cmsg: null == (o = r.Message.getField(t, 4)) ? void 0 : o,
                  inviter: null == (o = r.Message.getField(t, 5)) ? void 0 : o,
                  temp:
                    null == (o = r.Message.getBooleanField(t, 6)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.GroupSession.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.GroupSession();
            return proto.ui.push.GroupSession.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.GroupSession.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readUint32();
                  e.setStatus(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.setBegintime(o);
                  break;
                case 3:
                  o = t.readUint32();
                  e.setEndtime(o);
                  break;
                case 4:
                  o = t.readString();
                  e.setCmsg(o);
                  break;
                case 5:
                  o = t.readUint32();
                  e.setInviter(o);
                  break;
                case 6:
                  o = t.readBool();
                  e.setTemp(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.GroupSession.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.GroupSession.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.GroupSession.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeUint32(3, o),
              null != (o = r.Message.getField(e, 4)) && t.writeString(4, o),
              null != (o = r.Message.getField(e, 5)) && t.writeUint32(5, o),
              null != (o = r.Message.getField(e, 6)) && t.writeBool(6, o);
          }),
          (proto.ui.push.GroupSession.prototype.getStatus = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.GroupSession.prototype.setStatus = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.GroupSession.prototype.clearStatus = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.GroupSession.prototype.hasStatus = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.GroupSession.prototype.getBegintime = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.GroupSession.prototype.setBegintime = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.GroupSession.prototype.clearBegintime = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.GroupSession.prototype.hasBegintime = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.GroupSession.prototype.getEndtime = function () {
            return r.Message.getFieldWithDefault(this, 3, 0);
          }),
          (proto.ui.push.GroupSession.prototype.setEndtime = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.GroupSession.prototype.clearEndtime = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.GroupSession.prototype.hasEndtime = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.GroupSession.prototype.getCmsg = function () {
            return r.Message.getFieldWithDefault(this, 4, "");
          }),
          (proto.ui.push.GroupSession.prototype.setCmsg = function (e) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.GroupSession.prototype.clearCmsg = function () {
            return r.Message.setField(this, 4, void 0);
          }),
          (proto.ui.push.GroupSession.prototype.hasCmsg = function () {
            return null != r.Message.getField(this, 4);
          }),
          (proto.ui.push.GroupSession.prototype.getInviter = function () {
            return r.Message.getFieldWithDefault(this, 5, 0);
          }),
          (proto.ui.push.GroupSession.prototype.setInviter = function (e) {
            return r.Message.setField(this, 5, e);
          }),
          (proto.ui.push.GroupSession.prototype.clearInviter = function () {
            return r.Message.setField(this, 5, void 0);
          }),
          (proto.ui.push.GroupSession.prototype.hasInviter = function () {
            return null != r.Message.getField(this, 5);
          }),
          (proto.ui.push.GroupSession.prototype.getTemp = function () {
            return r.Message.getBooleanFieldWithDefault(this, 6, !1);
          }),
          (proto.ui.push.GroupSession.prototype.setTemp = function (e) {
            return r.Message.setField(this, 6, e);
          }),
          (proto.ui.push.GroupSession.prototype.clearTemp = function () {
            return r.Message.setField(this, 6, void 0);
          }),
          (proto.ui.push.GroupSession.prototype.hasTemp = function () {
            return null != r.Message.getField(this, 6);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.Group.prototype.toObject = function (e) {
              return proto.ui.push.Group.toObject(e, this);
            }),
            (proto.ui.push.Group.toObject = function (e, t) {
              var o,
                s = {
                  gid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  name: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  type: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  creator: null == (o = r.Message.getField(t, 4)) ? void 0 : o,
                  priority: null == (o = r.Message.getField(t, 5)) ? void 0 : o,
                  maxmembers:
                    null == (o = r.Message.getField(t, 6)) ? void 0 : o,
                  status: null == (o = r.Message.getField(t, 7)) ? void 0 : o,
                  online:
                    (o = t.getOnline()) &&
                    proto.ui.push.GroupMemberOnlineInfo.toObject(e, o),
                  audioenabled:
                    null == (o = r.Message.getBooleanField(t, 9)) ? void 0 : o,
                  needconfirm:
                    null == (o = r.Message.getBooleanField(t, 10)) ? void 0 : o,
                  begin: null == (o = r.Message.getField(t, 11)) ? void 0 : o,
                  end: null == (o = r.Message.getField(t, 12)) ? void 0 : o,
                  dndenabled:
                    null == (o = r.Message.getBooleanField(t, 13)) ? void 0 : o,
                  locking:
                    null == (o = r.Message.getBooleanField(t, 14)) ? void 0 : o,
                  creatortype:
                    null == (o = r.Message.getField(t, 15)) ? void 0 : o,
                  session:
                    (o = t.getSession()) &&
                    proto.ui.push.GroupSession.toObject(e, o),
                  maxspeechsecond:
                    null == (o = r.Message.getField(t, 17)) ? void 0 : o,
                  desc: null == (o = r.Message.getField(t, 18)) ? void 0 : o,
                  createtime:
                    null == (o = r.Message.getField(t, 19)) ? void 0 : o,
                  nameflag:
                    null == (o = r.Message.getBooleanField(t, 20)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.Group.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.Group();
            return proto.ui.push.Group.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.Group.deserializeBinaryFromReader = function (e, t) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readString();
                  e.setGid(o);
                  break;
                case 2:
                  o = t.readString();
                  e.setName(o);
                  break;
                case 3:
                  o = t.readEnum();
                  e.setType(o);
                  break;
                case 4:
                  o = t.readUint32();
                  e.setCreator(o);
                  break;
                case 5:
                  o = t.readUint32();
                  e.setPriority(o);
                  break;
                case 6:
                  o = t.readUint32();
                  e.setMaxmembers(o);
                  break;
                case 7:
                  o = t.readEnum();
                  e.setStatus(o);
                  break;
                case 8:
                  o = new proto.ui.push.GroupMemberOnlineInfo();
                  t.readMessage(
                    o,
                    proto.ui.push.GroupMemberOnlineInfo
                      .deserializeBinaryFromReader
                  ),
                    e.setOnline(o);
                  break;
                case 9:
                  o = t.readBool();
                  e.setAudioenabled(o);
                  break;
                case 10:
                  o = t.readBool();
                  e.setNeedconfirm(o);
                  break;
                case 11:
                  o = t.readUint32();
                  e.setBegin(o);
                  break;
                case 12:
                  o = t.readUint32();
                  e.setEnd(o);
                  break;
                case 13:
                  o = t.readBool();
                  e.setDndenabled(o);
                  break;
                case 14:
                  o = t.readBool();
                  e.setLocking(o);
                  break;
                case 15:
                  o = t.readUint32();
                  e.setCreatortype(o);
                  break;
                case 16:
                  o = new proto.ui.push.GroupSession();
                  t.readMessage(
                    o,
                    proto.ui.push.GroupSession.deserializeBinaryFromReader
                  ),
                    e.setSession(o);
                  break;
                case 17:
                  o = t.readUint32();
                  e.setMaxspeechsecond(o);
                  break;
                case 18:
                  o = t.readString();
                  e.setDesc(o);
                  break;
                case 19:
                  o = t.readInt32();
                  e.setCreatetime(o);
                  break;
                case 20:
                  o = t.readBool();
                  e.setNameflag(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.Group.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.Group.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.Group.serializeBinaryToWriter = function (e, t) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeString(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeEnum(3, o),
              null != (o = r.Message.getField(e, 4)) && t.writeUint32(4, o),
              null != (o = r.Message.getField(e, 5)) && t.writeUint32(5, o),
              null != (o = r.Message.getField(e, 6)) && t.writeUint32(6, o),
              null != (o = r.Message.getField(e, 7)) && t.writeEnum(7, o),
              null != (o = e.getOnline()) &&
                t.writeMessage(
                  8,
                  o,
                  proto.ui.push.GroupMemberOnlineInfo.serializeBinaryToWriter
                ),
              null != (o = r.Message.getField(e, 9)) && t.writeBool(9, o),
              null != (o = r.Message.getField(e, 10)) && t.writeBool(10, o),
              null != (o = r.Message.getField(e, 11)) && t.writeUint32(11, o),
              null != (o = r.Message.getField(e, 12)) && t.writeUint32(12, o),
              null != (o = r.Message.getField(e, 13)) && t.writeBool(13, o),
              null != (o = r.Message.getField(e, 14)) && t.writeBool(14, o),
              null != (o = r.Message.getField(e, 15)) && t.writeUint32(15, o),
              null != (o = e.getSession()) &&
                t.writeMessage(
                  16,
                  o,
                  proto.ui.push.GroupSession.serializeBinaryToWriter
                ),
              null != (o = r.Message.getField(e, 17)) && t.writeUint32(17, o),
              null != (o = r.Message.getField(e, 18)) && t.writeString(18, o),
              null != (o = r.Message.getField(e, 19)) && t.writeInt32(19, o),
              null != (o = r.Message.getField(e, 20)) && t.writeBool(20, o);
          }),
          (proto.ui.push.Group.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.Group.prototype.setGid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.Group.prototype.clearGid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.Group.prototype.hasGid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.Group.prototype.getName = function () {
            return r.Message.getFieldWithDefault(this, 2, "");
          }),
          (proto.ui.push.Group.prototype.setName = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.Group.prototype.clearName = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.Group.prototype.hasName = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.Group.prototype.getType = function () {
            return r.Message.getFieldWithDefault(this, 3, 1);
          }),
          (proto.ui.push.Group.prototype.setType = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.Group.prototype.clearType = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.Group.prototype.hasType = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.Group.prototype.getCreator = function () {
            return r.Message.getFieldWithDefault(this, 4, 0);
          }),
          (proto.ui.push.Group.prototype.setCreator = function (e) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.Group.prototype.clearCreator = function () {
            return r.Message.setField(this, 4, void 0);
          }),
          (proto.ui.push.Group.prototype.hasCreator = function () {
            return null != r.Message.getField(this, 4);
          }),
          (proto.ui.push.Group.prototype.getPriority = function () {
            return r.Message.getFieldWithDefault(this, 5, 0);
          }),
          (proto.ui.push.Group.prototype.setPriority = function (e) {
            return r.Message.setField(this, 5, e);
          }),
          (proto.ui.push.Group.prototype.clearPriority = function () {
            return r.Message.setField(this, 5, void 0);
          }),
          (proto.ui.push.Group.prototype.hasPriority = function () {
            return null != r.Message.getField(this, 5);
          }),
          (proto.ui.push.Group.prototype.getMaxmembers = function () {
            return r.Message.getFieldWithDefault(this, 6, 0);
          }),
          (proto.ui.push.Group.prototype.setMaxmembers = function (e) {
            return r.Message.setField(this, 6, e);
          }),
          (proto.ui.push.Group.prototype.clearMaxmembers = function () {
            return r.Message.setField(this, 6, void 0);
          }),
          (proto.ui.push.Group.prototype.hasMaxmembers = function () {
            return null != r.Message.getField(this, 6);
          }),
          (proto.ui.push.Group.prototype.getStatus = function () {
            return r.Message.getFieldWithDefault(this, 7, 0);
          }),
          (proto.ui.push.Group.prototype.setStatus = function (e) {
            return r.Message.setField(this, 7, e);
          }),
          (proto.ui.push.Group.prototype.clearStatus = function () {
            return r.Message.setField(this, 7, void 0);
          }),
          (proto.ui.push.Group.prototype.hasStatus = function () {
            return null != r.Message.getField(this, 7);
          }),
          (proto.ui.push.Group.prototype.getOnline = function () {
            return r.Message.getWrapperField(
              this,
              proto.ui.push.GroupMemberOnlineInfo,
              8
            );
          }),
          (proto.ui.push.Group.prototype.setOnline = function (e) {
            return r.Message.setWrapperField(this, 8, e);
          }),
          (proto.ui.push.Group.prototype.clearOnline = function () {
            return this.setOnline(void 0);
          }),
          (proto.ui.push.Group.prototype.hasOnline = function () {
            return null != r.Message.getField(this, 8);
          }),
          (proto.ui.push.Group.prototype.getAudioenabled = function () {
            return r.Message.getBooleanFieldWithDefault(this, 9, !1);
          }),
          (proto.ui.push.Group.prototype.setAudioenabled = function (e) {
            return r.Message.setField(this, 9, e);
          }),
          (proto.ui.push.Group.prototype.clearAudioenabled = function () {
            return r.Message.setField(this, 9, void 0);
          }),
          (proto.ui.push.Group.prototype.hasAudioenabled = function () {
            return null != r.Message.getField(this, 9);
          }),
          (proto.ui.push.Group.prototype.getNeedconfirm = function () {
            return r.Message.getBooleanFieldWithDefault(this, 10, !1);
          }),
          (proto.ui.push.Group.prototype.setNeedconfirm = function (e) {
            return r.Message.setField(this, 10, e);
          }),
          (proto.ui.push.Group.prototype.clearNeedconfirm = function () {
            return r.Message.setField(this, 10, void 0);
          }),
          (proto.ui.push.Group.prototype.hasNeedconfirm = function () {
            return null != r.Message.getField(this, 10);
          }),
          (proto.ui.push.Group.prototype.getBegin = function () {
            return r.Message.getFieldWithDefault(this, 11, 0);
          }),
          (proto.ui.push.Group.prototype.setBegin = function (e) {
            return r.Message.setField(this, 11, e);
          }),
          (proto.ui.push.Group.prototype.clearBegin = function () {
            return r.Message.setField(this, 11, void 0);
          }),
          (proto.ui.push.Group.prototype.hasBegin = function () {
            return null != r.Message.getField(this, 11);
          }),
          (proto.ui.push.Group.prototype.getEnd = function () {
            return r.Message.getFieldWithDefault(this, 12, 0);
          }),
          (proto.ui.push.Group.prototype.setEnd = function (e) {
            return r.Message.setField(this, 12, e);
          }),
          (proto.ui.push.Group.prototype.clearEnd = function () {
            return r.Message.setField(this, 12, void 0);
          }),
          (proto.ui.push.Group.prototype.hasEnd = function () {
            return null != r.Message.getField(this, 12);
          }),
          (proto.ui.push.Group.prototype.getDndenabled = function () {
            return r.Message.getBooleanFieldWithDefault(this, 13, !1);
          }),
          (proto.ui.push.Group.prototype.setDndenabled = function (e) {
            return r.Message.setField(this, 13, e);
          }),
          (proto.ui.push.Group.prototype.clearDndenabled = function () {
            return r.Message.setField(this, 13, void 0);
          }),
          (proto.ui.push.Group.prototype.hasDndenabled = function () {
            return null != r.Message.getField(this, 13);
          }),
          (proto.ui.push.Group.prototype.getLocking = function () {
            return r.Message.getBooleanFieldWithDefault(this, 14, !1);
          }),
          (proto.ui.push.Group.prototype.setLocking = function (e) {
            return r.Message.setField(this, 14, e);
          }),
          (proto.ui.push.Group.prototype.clearLocking = function () {
            return r.Message.setField(this, 14, void 0);
          }),
          (proto.ui.push.Group.prototype.hasLocking = function () {
            return null != r.Message.getField(this, 14);
          }),
          (proto.ui.push.Group.prototype.getCreatortype = function () {
            return r.Message.getFieldWithDefault(this, 15, 0);
          }),
          (proto.ui.push.Group.prototype.setCreatortype = function (e) {
            return r.Message.setField(this, 15, e);
          }),
          (proto.ui.push.Group.prototype.clearCreatortype = function () {
            return r.Message.setField(this, 15, void 0);
          }),
          (proto.ui.push.Group.prototype.hasCreatortype = function () {
            return null != r.Message.getField(this, 15);
          }),
          (proto.ui.push.Group.prototype.getSession = function () {
            return r.Message.getWrapperField(
              this,
              proto.ui.push.GroupSession,
              16
            );
          }),
          (proto.ui.push.Group.prototype.setSession = function (e) {
            return r.Message.setWrapperField(this, 16, e);
          }),
          (proto.ui.push.Group.prototype.clearSession = function () {
            return this.setSession(void 0);
          }),
          (proto.ui.push.Group.prototype.hasSession = function () {
            return null != r.Message.getField(this, 16);
          }),
          (proto.ui.push.Group.prototype.getMaxspeechsecond = function () {
            return r.Message.getFieldWithDefault(this, 17, 0);
          }),
          (proto.ui.push.Group.prototype.setMaxspeechsecond = function (e) {
            return r.Message.setField(this, 17, e);
          }),
          (proto.ui.push.Group.prototype.clearMaxspeechsecond = function () {
            return r.Message.setField(this, 17, void 0);
          }),
          (proto.ui.push.Group.prototype.hasMaxspeechsecond = function () {
            return null != r.Message.getField(this, 17);
          }),
          (proto.ui.push.Group.prototype.getDesc = function () {
            return r.Message.getFieldWithDefault(this, 18, "");
          }),
          (proto.ui.push.Group.prototype.setDesc = function (e) {
            return r.Message.setField(this, 18, e);
          }),
          (proto.ui.push.Group.prototype.clearDesc = function () {
            return r.Message.setField(this, 18, void 0);
          }),
          (proto.ui.push.Group.prototype.hasDesc = function () {
            return null != r.Message.getField(this, 18);
          }),
          (proto.ui.push.Group.prototype.getCreatetime = function () {
            return r.Message.getFieldWithDefault(this, 19, 0);
          }),
          (proto.ui.push.Group.prototype.setCreatetime = function (e) {
            return r.Message.setField(this, 19, e);
          }),
          (proto.ui.push.Group.prototype.clearCreatetime = function () {
            return r.Message.setField(this, 19, void 0);
          }),
          (proto.ui.push.Group.prototype.hasCreatetime = function () {
            return null != r.Message.getField(this, 19);
          }),
          (proto.ui.push.Group.prototype.getNameflag = function () {
            return r.Message.getBooleanFieldWithDefault(this, 20, !1);
          }),
          (proto.ui.push.Group.prototype.setNameflag = function (e) {
            return r.Message.setField(this, 20, e);
          }),
          (proto.ui.push.Group.prototype.clearNameflag = function () {
            return r.Message.setField(this, 20, void 0);
          }),
          (proto.ui.push.Group.prototype.hasNameflag = function () {
            return null != r.Message.getField(this, 20);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.OnlineStatusChanged.prototype.toObject = function (
              e
            ) {
              return proto.ui.push.OnlineStatusChanged.toObject(e, this);
            }),
            (proto.ui.push.OnlineStatusChanged.toObject = function (e, t) {
              var o,
                s = {
                  status: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.OnlineStatusChanged.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.OnlineStatusChanged();
            return proto.ui.push.OnlineStatusChanged.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.OnlineStatusChanged.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                if (1 === t.getFieldNumber()) {
                  var o = t.readEnum();
                  e.setStatus(o);
                } else t.skipField();
              }
              return e;
            }),
          (proto.ui.push.OnlineStatusChanged.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.OnlineStatusChanged.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.OnlineStatusChanged.serializeBinaryToWriter =
            function (e, t) {
              var o;
              null != (o = r.Message.getField(e, 1)) && t.writeEnum(1, o);
            }),
          (proto.ui.push.OnlineStatusChanged.prototype.getStatus = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.OnlineStatusChanged.prototype.setStatus = function (
            e
          ) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.OnlineStatusChanged.prototype.clearStatus =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.OnlineStatusChanged.prototype.hasStatus = function () {
            return null != r.Message.getField(this, 1);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.ErrorMessage.prototype.toObject = function (e) {
              return proto.ui.push.ErrorMessage.toObject(e, this);
            }),
            (proto.ui.push.ErrorMessage.toObject = function (e, t) {
              var o,
                s = {
                  error: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  reason: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  what: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.ErrorMessage.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.ErrorMessage();
            return proto.ui.push.ErrorMessage.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.ErrorMessage.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readInt32();
                  e.setError(o);
                  break;
                case 2:
                  o = t.readInt32();
                  e.setReason(o);
                  break;
                case 3:
                  o = t.readString();
                  e.setWhat(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.ErrorMessage.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.ErrorMessage.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.ErrorMessage.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeInt32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeInt32(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeString(3, o);
          }),
          (proto.ui.push.ErrorMessage.prototype.getError = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.ErrorMessage.prototype.setError = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.ErrorMessage.prototype.clearError = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.ErrorMessage.prototype.hasError = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.ErrorMessage.prototype.getReason = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.ErrorMessage.prototype.setReason = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.ErrorMessage.prototype.clearReason = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.ErrorMessage.prototype.hasReason = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.ErrorMessage.prototype.getWhat = function () {
            return r.Message.getFieldWithDefault(this, 3, "");
          }),
          (proto.ui.push.ErrorMessage.prototype.setWhat = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.ErrorMessage.prototype.clearWhat = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.ErrorMessage.prototype.hasWhat = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.GroupListChanged.repeatedFields_ = [3, 5]),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.GroupListChanged.prototype.toObject = function (e) {
              return proto.ui.push.GroupListChanged.toObject(e, this);
            }),
            (proto.ui.push.GroupListChanged.toObject = function (e, t) {
              var o,
                s = {
                  count: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  updatecount:
                    null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  updatesList: r.Message.toObjectList(
                    t.getUpdatesList(),
                    proto.ui.push.Group.toObject,
                    e
                  ),
                  removecount:
                    null == (o = r.Message.getField(t, 4)) ? void 0 : o,
                  removesList:
                    null == (o = r.Message.getRepeatedField(t, 5)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.GroupListChanged.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.GroupListChanged();
            return proto.ui.push.GroupListChanged.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.GroupListChanged.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readInt32();
                    e.setCount(o);
                    break;
                  case 2:
                    o = t.readInt32();
                    e.setUpdatecount(o);
                    break;
                  case 3:
                    o = new proto.ui.push.Group();
                    t.readMessage(
                      o,
                      proto.ui.push.Group.deserializeBinaryFromReader
                    ),
                      e.addUpdates(o);
                    break;
                  case 4:
                    o = t.readInt32();
                    e.setRemovecount(o);
                    break;
                  case 5:
                    o = t.readString();
                    e.addRemoves(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.GroupListChanged.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.GroupListChanged.serializeBinaryToWriter(this, e),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.GroupListChanged.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeInt32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeInt32(2, o),
              (o = e.getUpdatesList()).length > 0 &&
                t.writeRepeatedMessage(
                  3,
                  o,
                  proto.ui.push.Group.serializeBinaryToWriter
                ),
              null != (o = r.Message.getField(e, 4)) && t.writeInt32(4, o),
              (o = e.getRemovesList()).length > 0 &&
                t.writeRepeatedString(5, o);
          }),
          (proto.ui.push.GroupListChanged.prototype.getCount = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.GroupListChanged.prototype.setCount = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.GroupListChanged.prototype.clearCount = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.GroupListChanged.prototype.hasCount = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.GroupListChanged.prototype.getUpdatecount =
            function () {
              return r.Message.getFieldWithDefault(this, 2, 0);
            }),
          (proto.ui.push.GroupListChanged.prototype.setUpdatecount = function (
            e
          ) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.GroupListChanged.prototype.clearUpdatecount =
            function () {
              return r.Message.setField(this, 2, void 0);
            }),
          (proto.ui.push.GroupListChanged.prototype.hasUpdatecount =
            function () {
              return null != r.Message.getField(this, 2);
            }),
          (proto.ui.push.GroupListChanged.prototype.getUpdatesList =
            function () {
              return r.Message.getRepeatedWrapperField(
                this,
                proto.ui.push.Group,
                3
              );
            }),
          (proto.ui.push.GroupListChanged.prototype.setUpdatesList = function (
            e
          ) {
            return r.Message.setRepeatedWrapperField(this, 3, e);
          }),
          (proto.ui.push.GroupListChanged.prototype.addUpdates = function (
            e,
            t
          ) {
            return r.Message.addToRepeatedWrapperField(
              this,
              3,
              e,
              proto.ui.push.Group,
              t
            );
          }),
          (proto.ui.push.GroupListChanged.prototype.clearUpdatesList =
            function () {
              return this.setUpdatesList([]);
            }),
          (proto.ui.push.GroupListChanged.prototype.getRemovecount =
            function () {
              return r.Message.getFieldWithDefault(this, 4, 0);
            }),
          (proto.ui.push.GroupListChanged.prototype.setRemovecount = function (
            e
          ) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.GroupListChanged.prototype.clearRemovecount =
            function () {
              return r.Message.setField(this, 4, void 0);
            }),
          (proto.ui.push.GroupListChanged.prototype.hasRemovecount =
            function () {
              return null != r.Message.getField(this, 4);
            }),
          (proto.ui.push.GroupListChanged.prototype.getRemovesList =
            function () {
              return r.Message.getRepeatedField(this, 5);
            }),
          (proto.ui.push.GroupListChanged.prototype.setRemovesList = function (
            e
          ) {
            return r.Message.setField(this, 5, e || []);
          }),
          (proto.ui.push.GroupListChanged.prototype.addRemoves = function (
            e,
            t
          ) {
            return r.Message.addToRepeatedField(this, 5, e, t);
          }),
          (proto.ui.push.GroupListChanged.prototype.clearRemovesList =
            function () {
              return this.setRemovesList([]);
            }),
          (proto.ui.push.WatchGroupListChanged.repeatedFields_ = [1]),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.WatchGroupListChanged.prototype.toObject =
              function (e) {
                return proto.ui.push.WatchGroupListChanged.toObject(e, this);
              }),
            (proto.ui.push.WatchGroupListChanged.toObject = function (e, t) {
              var o = {
                groupsList: r.Message.toObjectList(
                  t.getGroupsList(),
                  proto.ui.push.Group.toObject,
                  e
                ),
              };
              return e && (o.$jspbMessageInstance = t), o;
            })),
          (proto.ui.push.WatchGroupListChanged.deserializeBinary = function (
            e
          ) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.WatchGroupListChanged();
            return proto.ui.push.WatchGroupListChanged.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.WatchGroupListChanged.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                if (1 === t.getFieldNumber()) {
                  var o = new proto.ui.push.Group();
                  t.readMessage(
                    o,
                    proto.ui.push.Group.deserializeBinaryFromReader
                  ),
                    e.addGroups(o);
                } else t.skipField();
              }
              return e;
            }),
          (proto.ui.push.WatchGroupListChanged.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.WatchGroupListChanged.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.WatchGroupListChanged.serializeBinaryToWriter =
            function (e, t) {
              var o;
              (o = e.getGroupsList()).length > 0 &&
                t.writeRepeatedMessage(
                  1,
                  o,
                  proto.ui.push.Group.serializeBinaryToWriter
                );
            }),
          (proto.ui.push.WatchGroupListChanged.prototype.getGroupsList =
            function () {
              return r.Message.getRepeatedWrapperField(
                this,
                proto.ui.push.Group,
                1
              );
            }),
          (proto.ui.push.WatchGroupListChanged.prototype.setGroupsList =
            function (e) {
              return r.Message.setRepeatedWrapperField(this, 1, e);
            }),
          (proto.ui.push.WatchGroupListChanged.prototype.addGroups = function (
            e,
            t
          ) {
            return r.Message.addToRepeatedWrapperField(
              this,
              1,
              e,
              proto.ui.push.Group,
              t
            );
          }),
          (proto.ui.push.WatchGroupListChanged.prototype.clearGroupsList =
            function () {
              return this.setGroupsList([]);
            }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.GroupChanged.prototype.toObject = function (e) {
              return proto.ui.push.GroupChanged.toObject(e, this);
            }),
            (proto.ui.push.GroupChanged.toObject = function (e, t) {
              var o,
                s = {
                  groups:
                    (o = t.getGroups()) && proto.ui.push.Group.toObject(e, o),
                  response: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.GroupChanged.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.GroupChanged();
            return proto.ui.push.GroupChanged.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.GroupChanged.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = new proto.ui.push.Group();
                  t.readMessage(
                    o,
                    proto.ui.push.Group.deserializeBinaryFromReader
                  ),
                    e.setGroups(o);
                  break;
                case 2:
                  o = t.readInt32();
                  e.setResponse(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.GroupChanged.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.GroupChanged.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.GroupChanged.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = e.getGroups()) &&
              t.writeMessage(1, o, proto.ui.push.Group.serializeBinaryToWriter),
              null != (o = r.Message.getField(e, 2)) && t.writeInt32(2, o);
          }),
          (proto.ui.push.GroupChanged.prototype.getGroups = function () {
            return r.Message.getWrapperField(this, proto.ui.push.Group, 1);
          }),
          (proto.ui.push.GroupChanged.prototype.setGroups = function (e) {
            return r.Message.setWrapperField(this, 1, e);
          }),
          (proto.ui.push.GroupChanged.prototype.clearGroups = function () {
            return this.setGroups(void 0);
          }),
          (proto.ui.push.GroupChanged.prototype.hasGroups = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.GroupChanged.prototype.getResponse = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.GroupChanged.prototype.setResponse = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.GroupChanged.prototype.clearResponse = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.GroupChanged.prototype.hasResponse = function () {
            return null != r.Message.getField(this, 2);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.CurrentGroupChanged.prototype.toObject = function (
              e
            ) {
              return proto.ui.push.CurrentGroupChanged.toObject(e, this);
            }),
            (proto.ui.push.CurrentGroupChanged.toObject = function (e, t) {
              var o,
                s = {
                  gid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  groups:
                    (o = t.getGroups()) && proto.ui.push.Group.toObject(e, o),
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.CurrentGroupChanged.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.CurrentGroupChanged();
            return proto.ui.push.CurrentGroupChanged.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.CurrentGroupChanged.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readString();
                    e.setGid(o);
                    break;
                  case 2:
                    o = new proto.ui.push.Group();
                    t.readMessage(
                      o,
                      proto.ui.push.Group.deserializeBinaryFromReader
                    ),
                      e.setGroups(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.CurrentGroupChanged.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.CurrentGroupChanged.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.CurrentGroupChanged.serializeBinaryToWriter =
            function (e, t) {
              var o = void 0;
              null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
                null != (o = e.getGroups()) &&
                  t.writeMessage(
                    2,
                    o,
                    proto.ui.push.Group.serializeBinaryToWriter
                  );
            }),
          (proto.ui.push.CurrentGroupChanged.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.CurrentGroupChanged.prototype.setGid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.CurrentGroupChanged.prototype.clearGid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.CurrentGroupChanged.prototype.hasGid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.CurrentGroupChanged.prototype.getGroups = function () {
            return r.Message.getWrapperField(this, proto.ui.push.Group, 2);
          }),
          (proto.ui.push.CurrentGroupChanged.prototype.setGroups = function (
            e
          ) {
            return r.Message.setWrapperField(this, 2, e);
          }),
          (proto.ui.push.CurrentGroupChanged.prototype.clearGroups =
            function () {
              return this.setGroups(void 0);
            }),
          (proto.ui.push.CurrentGroupChanged.prototype.hasGroups = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.MemberListChanged.repeatedFields_ = [2]),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.MemberListChanged.prototype.toObject = function (
              e
            ) {
              return proto.ui.push.MemberListChanged.toObject(e, this);
            }),
            (proto.ui.push.MemberListChanged.toObject = function (e, t) {
              var o,
                s = {
                  gid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  mmsList: r.Message.toObjectList(
                    t.getMmsList(),
                    proto.ui.push.Member.toObject,
                    e
                  ),
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.MemberListChanged.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.MemberListChanged();
            return proto.ui.push.MemberListChanged.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.MemberListChanged.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readString();
                    e.setGid(o);
                    break;
                  case 2:
                    o = new proto.ui.push.Member();
                    t.readMessage(
                      o,
                      proto.ui.push.Member.deserializeBinaryFromReader
                    ),
                      e.addMms(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.MemberListChanged.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.MemberListChanged.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.MemberListChanged.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              (o = e.getMmsList()).length > 0 &&
                t.writeRepeatedMessage(
                  2,
                  o,
                  proto.ui.push.Member.serializeBinaryToWriter
                );
          }),
          (proto.ui.push.MemberListChanged.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.MemberListChanged.prototype.setGid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.MemberListChanged.prototype.clearGid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.MemberListChanged.prototype.hasGid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.MemberListChanged.prototype.getMmsList = function () {
            return r.Message.getRepeatedWrapperField(
              this,
              proto.ui.push.Member,
              2
            );
          }),
          (proto.ui.push.MemberListChanged.prototype.setMmsList = function (e) {
            return r.Message.setRepeatedWrapperField(this, 2, e);
          }),
          (proto.ui.push.MemberListChanged.prototype.addMms = function (e, t) {
            return r.Message.addToRepeatedWrapperField(
              this,
              2,
              e,
              proto.ui.push.Member,
              t
            );
          }),
          (proto.ui.push.MemberListChanged.prototype.clearMmsList =
            function () {
              return this.setMmsList([]);
            }),
          (proto.ui.push.MemberChanged.repeatedFields_ = [2, 3, 4, 5]),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.MemberChanged.prototype.toObject = function (e) {
              return proto.ui.push.MemberChanged.toObject(e, this);
            }),
            (proto.ui.push.MemberChanged.toObject = function (e, t) {
              var o,
                s = {
                  gid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  updatedList: r.Message.toObjectList(
                    t.getUpdatedList(),
                    proto.ui.push.Member.toObject,
                    e
                  ),
                  joinedList: r.Message.toObjectList(
                    t.getJoinedList(),
                    proto.ui.push.Member.toObject,
                    e
                  ),
                  leftList: r.Message.toObjectList(
                    t.getLeftList(),
                    proto.ui.push.Member.toObject,
                    e
                  ),
                  rmedList: r.Message.toObjectList(
                    t.getRmedList(),
                    proto.ui.push.Member.toObject,
                    e
                  ),
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.MemberChanged.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.MemberChanged();
            return proto.ui.push.MemberChanged.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.MemberChanged.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readString();
                  e.setGid(o);
                  break;
                case 2:
                  o = new proto.ui.push.Member();
                  t.readMessage(
                    o,
                    proto.ui.push.Member.deserializeBinaryFromReader
                  ),
                    e.addUpdated(o);
                  break;
                case 3:
                  o = new proto.ui.push.Member();
                  t.readMessage(
                    o,
                    proto.ui.push.Member.deserializeBinaryFromReader
                  ),
                    e.addJoined(o);
                  break;
                case 4:
                  o = new proto.ui.push.Member();
                  t.readMessage(
                    o,
                    proto.ui.push.Member.deserializeBinaryFromReader
                  ),
                    e.addLeft(o);
                  break;
                case 5:
                  o = new proto.ui.push.Member();
                  t.readMessage(
                    o,
                    proto.ui.push.Member.deserializeBinaryFromReader
                  ),
                    e.addRmed(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.MemberChanged.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.MemberChanged.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.MemberChanged.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              (o = e.getUpdatedList()).length > 0 &&
                t.writeRepeatedMessage(
                  2,
                  o,
                  proto.ui.push.Member.serializeBinaryToWriter
                ),
              (o = e.getJoinedList()).length > 0 &&
                t.writeRepeatedMessage(
                  3,
                  o,
                  proto.ui.push.Member.serializeBinaryToWriter
                ),
              (o = e.getLeftList()).length > 0 &&
                t.writeRepeatedMessage(
                  4,
                  o,
                  proto.ui.push.Member.serializeBinaryToWriter
                ),
              (o = e.getRmedList()).length > 0 &&
                t.writeRepeatedMessage(
                  5,
                  o,
                  proto.ui.push.Member.serializeBinaryToWriter
                );
          }),
          (proto.ui.push.MemberChanged.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.MemberChanged.prototype.setGid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.MemberChanged.prototype.clearGid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.MemberChanged.prototype.hasGid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.MemberChanged.prototype.getUpdatedList = function () {
            return r.Message.getRepeatedWrapperField(
              this,
              proto.ui.push.Member,
              2
            );
          }),
          (proto.ui.push.MemberChanged.prototype.setUpdatedList = function (e) {
            return r.Message.setRepeatedWrapperField(this, 2, e);
          }),
          (proto.ui.push.MemberChanged.prototype.addUpdated = function (e, t) {
            return r.Message.addToRepeatedWrapperField(
              this,
              2,
              e,
              proto.ui.push.Member,
              t
            );
          }),
          (proto.ui.push.MemberChanged.prototype.clearUpdatedList =
            function () {
              return this.setUpdatedList([]);
            }),
          (proto.ui.push.MemberChanged.prototype.getJoinedList = function () {
            return r.Message.getRepeatedWrapperField(
              this,
              proto.ui.push.Member,
              3
            );
          }),
          (proto.ui.push.MemberChanged.prototype.setJoinedList = function (e) {
            return r.Message.setRepeatedWrapperField(this, 3, e);
          }),
          (proto.ui.push.MemberChanged.prototype.addJoined = function (e, t) {
            return r.Message.addToRepeatedWrapperField(
              this,
              3,
              e,
              proto.ui.push.Member,
              t
            );
          }),
          (proto.ui.push.MemberChanged.prototype.clearJoinedList = function () {
            return this.setJoinedList([]);
          }),
          (proto.ui.push.MemberChanged.prototype.getLeftList = function () {
            return r.Message.getRepeatedWrapperField(
              this,
              proto.ui.push.Member,
              4
            );
          }),
          (proto.ui.push.MemberChanged.prototype.setLeftList = function (e) {
            return r.Message.setRepeatedWrapperField(this, 4, e);
          }),
          (proto.ui.push.MemberChanged.prototype.addLeft = function (e, t) {
            return r.Message.addToRepeatedWrapperField(
              this,
              4,
              e,
              proto.ui.push.Member,
              t
            );
          }),
          (proto.ui.push.MemberChanged.prototype.clearLeftList = function () {
            return this.setLeftList([]);
          }),
          (proto.ui.push.MemberChanged.prototype.getRmedList = function () {
            return r.Message.getRepeatedWrapperField(
              this,
              proto.ui.push.Member,
              5
            );
          }),
          (proto.ui.push.MemberChanged.prototype.setRmedList = function (e) {
            return r.Message.setRepeatedWrapperField(this, 5, e);
          }),
          (proto.ui.push.MemberChanged.prototype.addRmed = function (e, t) {
            return r.Message.addToRepeatedWrapperField(
              this,
              5,
              e,
              proto.ui.push.Member,
              t
            );
          }),
          (proto.ui.push.MemberChanged.prototype.clearRmedList = function () {
            return this.setRmedList([]);
          }),
          (proto.ui.push.UsersChanged.repeatedFields_ = [2]),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.UsersChanged.prototype.toObject = function (e) {
              return proto.ui.push.UsersChanged.toObject(e, this);
            }),
            (proto.ui.push.UsersChanged.toObject = function (e, t) {
              var o,
                s = {
                  usercount:
                    null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  uidList:
                    null == (o = r.Message.getRepeatedField(t, 2)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.UsersChanged.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.UsersChanged();
            return proto.ui.push.UsersChanged.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.UsersChanged.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readUint32();
                  e.setUsercount(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.addUid(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.UsersChanged.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.UsersChanged.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.UsersChanged.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              (o = e.getUidList()).length > 0 && t.writeRepeatedUint32(2, o);
          }),
          (proto.ui.push.UsersChanged.prototype.getUsercount = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.UsersChanged.prototype.setUsercount = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.UsersChanged.prototype.clearUsercount = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.UsersChanged.prototype.hasUsercount = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.UsersChanged.prototype.getUidList = function () {
            return r.Message.getRepeatedField(this, 2);
          }),
          (proto.ui.push.UsersChanged.prototype.setUidList = function (e) {
            return r.Message.setField(this, 2, e || []);
          }),
          (proto.ui.push.UsersChanged.prototype.addUid = function (e, t) {
            return r.Message.addToRepeatedField(this, 2, e, t);
          }),
          (proto.ui.push.UsersChanged.prototype.clearUidList = function () {
            return this.setUidList([]);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.LiosMic.prototype.toObject = function (e) {
              return proto.ui.push.LiosMic.toObject(e, this);
            }),
            (proto.ui.push.LiosMic.toObject = function (e, t) {
              var o,
                s = {
                  gid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  uid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  gname: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  uname: null == (o = r.Message.getField(t, 4)) ? void 0 : o,
                  sid: null == (o = r.Message.getField(t, 5)) ? void 0 : o,
                  audiotime:
                    null == (o = r.Message.getField(t, 6)) ? void 0 : o,
                  size: null == (o = r.Message.getField(t, 7)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.LiosMic.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.LiosMic();
            return proto.ui.push.LiosMic.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.LiosMic.deserializeBinaryFromReader = function (e, t) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readString();
                  e.setGid(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.setUid(o);
                  break;
                case 3:
                  o = t.readString();
                  e.setGname(o);
                  break;
                case 4:
                  o = t.readString();
                  e.setUname(o);
                  break;
                case 5:
                  o = t.readString();
                  e.setSid(o);
                  break;
                case 6:
                  o = t.readUint32();
                  e.setAudiotime(o);
                  break;
                case 7:
                  o = t.readUint32();
                  e.setSize(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.LiosMic.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.LiosMic.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.LiosMic.serializeBinaryToWriter = function (e, t) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeString(3, o),
              null != (o = r.Message.getField(e, 4)) && t.writeString(4, o),
              null != (o = r.Message.getField(e, 5)) && t.writeString(5, o),
              null != (o = r.Message.getField(e, 6)) && t.writeUint32(6, o),
              null != (o = r.Message.getField(e, 7)) && t.writeUint32(7, o);
          }),
          (proto.ui.push.LiosMic.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.LiosMic.prototype.setGid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.LiosMic.prototype.clearGid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.LiosMic.prototype.hasGid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.LiosMic.prototype.getUid = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.LiosMic.prototype.setUid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.LiosMic.prototype.clearUid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.LiosMic.prototype.hasUid = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.LiosMic.prototype.getGname = function () {
            return r.Message.getFieldWithDefault(this, 3, "");
          }),
          (proto.ui.push.LiosMic.prototype.setGname = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.LiosMic.prototype.clearGname = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.LiosMic.prototype.hasGname = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.LiosMic.prototype.getUname = function () {
            return r.Message.getFieldWithDefault(this, 4, "");
          }),
          (proto.ui.push.LiosMic.prototype.setUname = function (e) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.LiosMic.prototype.clearUname = function () {
            return r.Message.setField(this, 4, void 0);
          }),
          (proto.ui.push.LiosMic.prototype.hasUname = function () {
            return null != r.Message.getField(this, 4);
          }),
          (proto.ui.push.LiosMic.prototype.getSid = function () {
            return r.Message.getFieldWithDefault(this, 5, "");
          }),
          (proto.ui.push.LiosMic.prototype.setSid = function (e) {
            return r.Message.setField(this, 5, e);
          }),
          (proto.ui.push.LiosMic.prototype.clearSid = function () {
            return r.Message.setField(this, 5, void 0);
          }),
          (proto.ui.push.LiosMic.prototype.hasSid = function () {
            return null != r.Message.getField(this, 5);
          }),
          (proto.ui.push.LiosMic.prototype.getAudiotime = function () {
            return r.Message.getFieldWithDefault(this, 6, 0);
          }),
          (proto.ui.push.LiosMic.prototype.setAudiotime = function (e) {
            return r.Message.setField(this, 6, e);
          }),
          (proto.ui.push.LiosMic.prototype.clearAudiotime = function () {
            return r.Message.setField(this, 6, void 0);
          }),
          (proto.ui.push.LiosMic.prototype.hasAudiotime = function () {
            return null != r.Message.getField(this, 6);
          }),
          (proto.ui.push.LiosMic.prototype.getSize = function () {
            return r.Message.getFieldWithDefault(this, 7, 0);
          }),
          (proto.ui.push.LiosMic.prototype.setSize = function (e) {
            return r.Message.setField(this, 7, e);
          }),
          (proto.ui.push.LiosMic.prototype.clearSize = function () {
            return r.Message.setField(this, 7, void 0);
          }),
          (proto.ui.push.LiosMic.prototype.hasSize = function () {
            return null != r.Message.getField(this, 7);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.LntercomInfo.prototype.toObject = function (e) {
              return proto.ui.push.LntercomInfo.toObject(e, this);
            }),
            (proto.ui.push.LntercomInfo.toObject = function (e, t) {
              var o,
                s = {
                  gid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  uid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  gname: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  uname: null == (o = r.Message.getField(t, 4)) ? void 0 : o,
                  sid: null == (o = r.Message.getField(t, 5)) ? void 0 : o,
                  audiotime:
                    null == (o = r.Message.getField(t, 6)) ? void 0 : o,
                  size: null == (o = r.Message.getField(t, 7)) ? void 0 : o,
                  id: null == (o = r.Message.getField(t, 8)) ? void 0 : o,
                  endaudiotime:
                    null == (o = r.Message.getField(t, 9)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.LntercomInfo.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.LntercomInfo();
            return proto.ui.push.LntercomInfo.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.LntercomInfo.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readString();
                  e.setGid(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.setUid(o);
                  break;
                case 3:
                  o = t.readString();
                  e.setGname(o);
                  break;
                case 4:
                  o = t.readString();
                  e.setUname(o);
                  break;
                case 5:
                  o = t.readString();
                  e.setSid(o);
                  break;
                case 6:
                  o = t.readUint32();
                  e.setAudiotime(o);
                  break;
                case 7:
                  o = t.readUint32();
                  e.setSize(o);
                  break;
                case 8:
                  o = t.readString();
                  e.setId(o);
                  break;
                case 9:
                  o = t.readString();
                  e.setEndaudiotime(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.LntercomInfo.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.LntercomInfo.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.LntercomInfo.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeString(3, o),
              null != (o = r.Message.getField(e, 4)) && t.writeString(4, o),
              null != (o = r.Message.getField(e, 5)) && t.writeString(5, o),
              null != (o = r.Message.getField(e, 6)) && t.writeUint32(6, o),
              null != (o = r.Message.getField(e, 7)) && t.writeUint32(7, o),
              null != (o = r.Message.getField(e, 8)) && t.writeString(8, o),
              null != (o = r.Message.getField(e, 9)) && t.writeString(9, o);
          }),
          (proto.ui.push.LntercomInfo.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.LntercomInfo.prototype.setGid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.LntercomInfo.prototype.clearGid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.LntercomInfo.prototype.hasGid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.LntercomInfo.prototype.getUid = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.LntercomInfo.prototype.setUid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.LntercomInfo.prototype.clearUid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.LntercomInfo.prototype.hasUid = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.LntercomInfo.prototype.getGname = function () {
            return r.Message.getFieldWithDefault(this, 3, "");
          }),
          (proto.ui.push.LntercomInfo.prototype.setGname = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.LntercomInfo.prototype.clearGname = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.LntercomInfo.prototype.hasGname = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.LntercomInfo.prototype.getUname = function () {
            return r.Message.getFieldWithDefault(this, 4, "");
          }),
          (proto.ui.push.LntercomInfo.prototype.setUname = function (e) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.LntercomInfo.prototype.clearUname = function () {
            return r.Message.setField(this, 4, void 0);
          }),
          (proto.ui.push.LntercomInfo.prototype.hasUname = function () {
            return null != r.Message.getField(this, 4);
          }),
          (proto.ui.push.LntercomInfo.prototype.getSid = function () {
            return r.Message.getFieldWithDefault(this, 5, "");
          }),
          (proto.ui.push.LntercomInfo.prototype.setSid = function (e) {
            return r.Message.setField(this, 5, e);
          }),
          (proto.ui.push.LntercomInfo.prototype.clearSid = function () {
            return r.Message.setField(this, 5, void 0);
          }),
          (proto.ui.push.LntercomInfo.prototype.hasSid = function () {
            return null != r.Message.getField(this, 5);
          }),
          (proto.ui.push.LntercomInfo.prototype.getAudiotime = function () {
            return r.Message.getFieldWithDefault(this, 6, 0);
          }),
          (proto.ui.push.LntercomInfo.prototype.setAudiotime = function (e) {
            return r.Message.setField(this, 6, e);
          }),
          (proto.ui.push.LntercomInfo.prototype.clearAudiotime = function () {
            return r.Message.setField(this, 6, void 0);
          }),
          (proto.ui.push.LntercomInfo.prototype.hasAudiotime = function () {
            return null != r.Message.getField(this, 6);
          }),
          (proto.ui.push.LntercomInfo.prototype.getSize = function () {
            return r.Message.getFieldWithDefault(this, 7, 0);
          }),
          (proto.ui.push.LntercomInfo.prototype.setSize = function (e) {
            return r.Message.setField(this, 7, e);
          }),
          (proto.ui.push.LntercomInfo.prototype.clearSize = function () {
            return r.Message.setField(this, 7, void 0);
          }),
          (proto.ui.push.LntercomInfo.prototype.hasSize = function () {
            return null != r.Message.getField(this, 7);
          }),
          (proto.ui.push.LntercomInfo.prototype.getId = function () {
            return r.Message.getFieldWithDefault(this, 8, "");
          }),
          (proto.ui.push.LntercomInfo.prototype.setId = function (e) {
            return r.Message.setField(this, 8, e);
          }),
          (proto.ui.push.LntercomInfo.prototype.clearId = function () {
            return r.Message.setField(this, 8, void 0);
          }),
          (proto.ui.push.LntercomInfo.prototype.hasId = function () {
            return null != r.Message.getField(this, 8);
          }),
          (proto.ui.push.LntercomInfo.prototype.getEndaudiotime = function () {
            return r.Message.getFieldWithDefault(this, 9, "");
          }),
          (proto.ui.push.LntercomInfo.prototype.setEndaudiotime = function (e) {
            return r.Message.setField(this, 9, e);
          }),
          (proto.ui.push.LntercomInfo.prototype.clearEndaudiotime =
            function () {
              return r.Message.setField(this, 9, void 0);
            }),
          (proto.ui.push.LntercomInfo.prototype.hasEndaudiotime = function () {
            return null != r.Message.getField(this, 9);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.SelfStartSpeak.prototype.toObject = function (e) {
              return proto.ui.push.SelfStartSpeak.toObject(e, this);
            }),
            (proto.ui.push.SelfStartSpeak.toObject = function (e, t) {
              var o,
                s = {
                  gid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  uid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  gname: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  uname: null == (o = r.Message.getField(t, 4)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.SelfStartSpeak.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.SelfStartSpeak();
            return proto.ui.push.SelfStartSpeak.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.SelfStartSpeak.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readString();
                  e.setGid(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.setUid(o);
                  break;
                case 3:
                  o = t.readString();
                  e.setGname(o);
                  break;
                case 4:
                  o = t.readString();
                  e.setUname(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.SelfStartSpeak.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.SelfStartSpeak.serializeBinaryToWriter(this, e),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.SelfStartSpeak.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeString(3, o),
              null != (o = r.Message.getField(e, 4)) && t.writeString(4, o);
          }),
          (proto.ui.push.SelfStartSpeak.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.SelfStartSpeak.prototype.setGid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.SelfStartSpeak.prototype.clearGid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.SelfStartSpeak.prototype.hasGid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.SelfStartSpeak.prototype.getUid = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.SelfStartSpeak.prototype.setUid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.SelfStartSpeak.prototype.clearUid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.SelfStartSpeak.prototype.hasUid = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.SelfStartSpeak.prototype.getGname = function () {
            return r.Message.getFieldWithDefault(this, 3, "");
          }),
          (proto.ui.push.SelfStartSpeak.prototype.setGname = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.SelfStartSpeak.prototype.clearGname = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.SelfStartSpeak.prototype.hasGname = function () {
            return null != r.Message.getField(this, 3);
          });
        (proto.ui.push.SelfStartSpeak.prototype.getUname = function () {
          return r.Message.getFieldWithDefault(this, 4, "");
        }),
          (proto.ui.push.SelfStartSpeak.prototype.setUname = function (e) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.SelfStartSpeak.prototype.clearUname = function () {
            return r.Message.setField(this, 4, void 0);
          }),
          (proto.ui.push.SelfStartSpeak.prototype.hasUname = function () {
            return null != r.Message.getField(this, 4);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.SelfStopSpeak.prototype.toObject = function (e) {
              return proto.ui.push.SelfStopSpeak.toObject(e, this);
            }),
            (proto.ui.push.SelfStopSpeak.toObject = function (e, t) {
              var o,
                s = {
                  gid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  uid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  gname: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  uname: null == (o = r.Message.getField(t, 4)) ? void 0 : o,
                  audiotime:
                    null == (o = r.Message.getField(t, 5)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.SelfStopSpeak.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.SelfStopSpeak();
            return proto.ui.push.SelfStopSpeak.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.SelfStopSpeak.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readString();
                  e.setGid(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.setUid(o);
                  break;
                case 3:
                  o = t.readString();
                  e.setGname(o);
                  break;
                case 4:
                  o = t.readString();
                  e.setUname(o);
                  break;
                case 5:
                  o = t.readUint32();
                  e.setAudiotime(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.SelfStopSpeak.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.SelfStopSpeak.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.SelfStopSpeak.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeString(3, o),
              null != (o = r.Message.getField(e, 4)) && t.writeString(4, o),
              null != (o = r.Message.getField(e, 5)) && t.writeUint32(5, o);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.SelfStopSpeak.prototype.setGid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.clearGid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.hasGid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.getUid = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.setUid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.clearUid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.hasUid = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.getGname = function () {
            return r.Message.getFieldWithDefault(this, 3, "");
          }),
          (proto.ui.push.SelfStopSpeak.prototype.setGname = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.clearGname = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.hasGname = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.getUname = function () {
            return r.Message.getFieldWithDefault(this, 4, "");
          }),
          (proto.ui.push.SelfStopSpeak.prototype.setUname = function (e) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.clearUname = function () {
            return r.Message.setField(this, 4, void 0);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.hasUname = function () {
            return null != r.Message.getField(this, 4);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.getAudiotime = function () {
            return r.Message.getFieldWithDefault(this, 5, 0);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.setAudiotime = function (e) {
            return r.Message.setField(this, 5, e);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.clearAudiotime = function () {
            return r.Message.setField(this, 5, void 0);
          }),
          (proto.ui.push.SelfStopSpeak.prototype.hasAudiotime = function () {
            return null != r.Message.getField(this, 5);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.UserStartSpeak.prototype.toObject = function (e) {
              return proto.ui.push.UserStartSpeak.toObject(e, this);
            }),
            (proto.ui.push.UserStartSpeak.toObject = function (e, t) {
              var o,
                s = {
                  gid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  uid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  gname: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  uname: null == (o = r.Message.getField(t, 4)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.UserStartSpeak.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.UserStartSpeak();
            return proto.ui.push.UserStartSpeak.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.UserStartSpeak.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readString();
                  e.setGid(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.setUid(o);
                  break;
                case 3:
                  o = t.readString();
                  e.setGname(o);
                  break;
                case 4:
                  o = t.readString();
                  e.setUname(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.UserStartSpeak.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.UserStartSpeak.serializeBinaryToWriter(this, e),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.UserStartSpeak.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeString(3, o),
              null != (o = r.Message.getField(e, 4)) && t.writeString(4, o);
          }),
          (proto.ui.push.UserStartSpeak.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.UserStartSpeak.prototype.setGid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.UserStartSpeak.prototype.clearGid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.UserStartSpeak.prototype.hasGid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.UserStartSpeak.prototype.getUid = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.UserStartSpeak.prototype.setUid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.UserStartSpeak.prototype.clearUid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.UserStartSpeak.prototype.hasUid = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.UserStartSpeak.prototype.getGname = function () {
            return r.Message.getFieldWithDefault(this, 3, "");
          }),
          (proto.ui.push.UserStartSpeak.prototype.setGname = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.UserStartSpeak.prototype.clearGname = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.UserStartSpeak.prototype.hasGname = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.UserStartSpeak.prototype.getUname = function () {
            return r.Message.getFieldWithDefault(this, 4, "");
          }),
          (proto.ui.push.UserStartSpeak.prototype.setUname = function (e) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.UserStartSpeak.prototype.clearUname = function () {
            return r.Message.setField(this, 4, void 0);
          }),
          (proto.ui.push.UserStartSpeak.prototype.hasUname = function () {
            return null != r.Message.getField(this, 4);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.UserStopSpeak.prototype.toObject = function (e) {
              return proto.ui.push.UserStopSpeak.toObject(e, this);
            }),
            (proto.ui.push.UserStopSpeak.toObject = function (e, t) {
              var o,
                s = {
                  gid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  uid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  gname: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  uname: null == (o = r.Message.getField(t, 4)) ? void 0 : o,
                  sid: null == (o = r.Message.getField(t, 5)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.UserStopSpeak.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.UserStopSpeak();
            return proto.ui.push.UserStopSpeak.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.UserStopSpeak.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readString();
                  e.setGid(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.setUid(o);
                  break;
                case 3:
                  o = t.readString();
                  e.setGname(o);
                  break;
                case 4:
                  o = t.readString();
                  e.setUname(o);
                  break;
                case 5:
                  o = t.readString();
                  e.setSid(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.UserStopSpeak.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.UserStopSpeak.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.UserStopSpeak.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeString(3, o),
              null != (o = r.Message.getField(e, 4)) && t.writeString(4, o),
              null != (o = r.Message.getField(e, 5)) && t.writeString(5, o);
          }),
          (proto.ui.push.UserStopSpeak.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.UserStopSpeak.prototype.setGid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.UserStopSpeak.prototype.clearGid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.UserStopSpeak.prototype.hasGid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.UserStopSpeak.prototype.getUid = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.UserStopSpeak.prototype.setUid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.UserStopSpeak.prototype.clearUid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.UserStopSpeak.prototype.hasUid = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.UserStopSpeak.prototype.getGname = function () {
            return r.Message.getFieldWithDefault(this, 3, "");
          }),
          (proto.ui.push.UserStopSpeak.prototype.setGname = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.UserStopSpeak.prototype.clearGname = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.UserStopSpeak.prototype.hasGname = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.UserStopSpeak.prototype.getUname = function () {
            return r.Message.getFieldWithDefault(this, 4, "");
          }),
          (proto.ui.push.UserStopSpeak.prototype.setUname = function (e) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.UserStopSpeak.prototype.clearUname = function () {
            return r.Message.setField(this, 4, void 0);
          }),
          (proto.ui.push.UserStopSpeak.prototype.hasUname = function () {
            return null != r.Message.getField(this, 4);
          }),
          (proto.ui.push.UserStopSpeak.prototype.getSid = function () {
            return r.Message.getFieldWithDefault(this, 5, "");
          }),
          (proto.ui.push.UserStopSpeak.prototype.setSid = function (e) {
            return r.Message.setField(this, 5, e);
          }),
          (proto.ui.push.UserStopSpeak.prototype.clearSid = function () {
            return r.Message.setField(this, 5, void 0);
          }),
          (proto.ui.push.UserStopSpeak.prototype.hasSid = function () {
            return null != r.Message.getField(this, 5);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.ChangeNameResult.prototype.toObject = function (e) {
              return proto.ui.push.ChangeNameResult.toObject(e, this);
            }),
            (proto.ui.push.ChangeNameResult.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.ChangeNameResult.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.ChangeNameResult();
            return proto.ui.push.ChangeNameResult.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.ChangeNameResult.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                if (1 === t.getFieldNumber()) {
                  var o = t.readUint32();
                  e.setMsgstate(o);
                } else t.skipField();
              }
              return e;
            }),
          (proto.ui.push.ChangeNameResult.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.ChangeNameResult.serializeBinaryToWriter(this, e),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.ChangeNameResult.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o);
          }),
          (proto.ui.push.ChangeNameResult.prototype.getMsgstate = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.ChangeNameResult.prototype.setMsgstate = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.ChangeNameResult.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.ChangeNameResult.prototype.hasMsgstate = function () {
            return null != r.Message.getField(this, 1);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.ChangePasswordResult.prototype.toObject = function (
              e
            ) {
              return proto.ui.push.ChangePasswordResult.toObject(e, this);
            }),
            (proto.ui.push.ChangePasswordResult.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.ChangePasswordResult.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.ChangePasswordResult();
            return proto.ui.push.ChangePasswordResult.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.ChangePasswordResult.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                if (1 === t.getFieldNumber()) {
                  var o = t.readUint32();
                  e.setMsgstate(o);
                } else t.skipField();
              }
              return e;
            }),
          (proto.ui.push.ChangePasswordResult.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.ChangePasswordResult.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.ChangePasswordResult.serializeBinaryToWriter =
            function (e, t) {
              var o;
              null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o);
            }),
          (proto.ui.push.ChangePasswordResult.prototype.getMsgstate =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.ChangePasswordResult.prototype.setMsgstate = function (
            e
          ) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.ChangePasswordResult.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.ChangePasswordResult.prototype.hasMsgstate =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.PostBroadcastResult.prototype.toObject = function (
              e
            ) {
              return proto.ui.push.PostBroadcastResult.toObject(e, this);
            }),
            (proto.ui.push.PostBroadcastResult.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.PostBroadcastResult.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.PostBroadcastResult();
            return proto.ui.push.PostBroadcastResult.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.PostBroadcastResult.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                if (1 === t.getFieldNumber()) {
                  var o = t.readUint32();
                  e.setMsgstate(o);
                } else t.skipField();
              }
              return e;
            }),
          (proto.ui.push.PostBroadcastResult.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.PostBroadcastResult.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.PostBroadcastResult.serializeBinaryToWriter =
            function (e, t) {
              var o;
              null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o);
            }),
          (proto.ui.push.PostBroadcastResult.prototype.getMsgstate =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.PostBroadcastResult.prototype.setMsgstate = function (
            e
          ) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.PostBroadcastResult.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.PostBroadcastResult.prototype.hasMsgstate =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.AudioEnableChanged.prototype.toObject = function (
              e
            ) {
              return proto.ui.push.AudioEnableChanged.toObject(e, this);
            }),
            (proto.ui.push.AudioEnableChanged.toObject = function (e, t) {
              var o,
                s = {
                  isaudioenable:
                    null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.AudioEnableChanged.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.AudioEnableChanged();
            return proto.ui.push.AudioEnableChanged.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.AudioEnableChanged.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                if (1 === t.getFieldNumber()) {
                  var o = t.readUint32();
                  e.setIsaudioenable(o);
                } else t.skipField();
              }
              return e;
            }),
          (proto.ui.push.AudioEnableChanged.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.AudioEnableChanged.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.AudioEnableChanged.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o);
          }),
          (proto.ui.push.AudioEnableChanged.prototype.getIsaudioenable =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.AudioEnableChanged.prototype.setIsaudioenable =
            function (e) {
              return r.Message.setField(this, 1, e);
            }),
          (proto.ui.push.AudioEnableChanged.prototype.clearIsaudioenable =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.AudioEnableChanged.prototype.hasIsaudioenable =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          (proto.ui.push.EnabledResult.repeatedFields_ = [2]),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.EnabledResult.prototype.toObject = function (e) {
              return proto.ui.push.EnabledResult.toObject(e, this);
            }),
            (proto.ui.push.EnabledResult.toObject = function (e, t) {
              var o,
                s = {
                  enabled:
                    null == (o = r.Message.getBooleanField(t, 1)) ? void 0 : o,
                  uidsList:
                    null == (o = r.Message.getRepeatedField(t, 2)) ? void 0 : o,
                  uidscount:
                    null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.EnabledResult.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.EnabledResult();
            return proto.ui.push.EnabledResult.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.EnabledResult.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readBool();
                  e.setEnabled(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.addUids(o);
                  break;
                case 3:
                  o = t.readUint32();
                  e.setUidscount(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.EnabledResult.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.EnabledResult.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.EnabledResult.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeBool(1, o),
              (o = e.getUidsList()).length > 0 && t.writeRepeatedUint32(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeUint32(3, o);
          }),
          (proto.ui.push.EnabledResult.prototype.getEnabled = function () {
            return r.Message.getBooleanFieldWithDefault(this, 1, !1);
          }),
          (proto.ui.push.EnabledResult.prototype.setEnabled = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.EnabledResult.prototype.clearEnabled = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.EnabledResult.prototype.hasEnabled = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.EnabledResult.prototype.getUidsList = function () {
            return r.Message.getRepeatedField(this, 2);
          }),
          (proto.ui.push.EnabledResult.prototype.setUidsList = function (e) {
            return r.Message.setField(this, 2, e || []);
          }),
          (proto.ui.push.EnabledResult.prototype.addUids = function (e, t) {
            return r.Message.addToRepeatedField(this, 2, e, t);
          }),
          (proto.ui.push.EnabledResult.prototype.clearUidsList = function () {
            return this.setUidsList([]);
          }),
          (proto.ui.push.EnabledResult.prototype.getUidscount = function () {
            return r.Message.getFieldWithDefault(this, 3, 0);
          }),
          (proto.ui.push.EnabledResult.prototype.setUidscount = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.EnabledResult.prototype.clearUidscount = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.EnabledResult.prototype.hasUidscount = function () {
            return null != r.Message.getField(this, 3);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.AudioEnableResult.prototype.toObject = function (
              e
            ) {
              return proto.ui.push.AudioEnableResult.toObject(e, this);
            }),
            (proto.ui.push.AudioEnableResult.toObject = function (e, t) {
              var o,
                s = {
                  isaudioenable:
                    null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  enabledtesult:
                    (o = t.getEnabledtesult()) &&
                    proto.ui.push.EnabledResult.toObject(e, o),
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.AudioEnableResult.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.AudioEnableResult();
            return proto.ui.push.AudioEnableResult.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.AudioEnableResult.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readUint32();
                    e.setIsaudioenable(o);
                    break;
                  case 2:
                    o = new proto.ui.push.EnabledResult();
                    t.readMessage(
                      o,
                      proto.ui.push.EnabledResult.deserializeBinaryFromReader
                    ),
                      e.setEnabledtesult(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.AudioEnableResult.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.AudioEnableResult.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.AudioEnableResult.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = e.getEnabledtesult()) &&
                t.writeMessage(
                  2,
                  o,
                  proto.ui.push.EnabledResult.serializeBinaryToWriter
                );
          }),
          (proto.ui.push.AudioEnableResult.prototype.getIsaudioenable =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.AudioEnableResult.prototype.setIsaudioenable =
            function (e) {
              return r.Message.setField(this, 1, e);
            }),
          (proto.ui.push.AudioEnableResult.prototype.clearIsaudioenable =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.AudioEnableResult.prototype.hasIsaudioenable =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          (proto.ui.push.AudioEnableResult.prototype.getEnabledtesult =
            function () {
              return r.Message.getWrapperField(
                this,
                proto.ui.push.EnabledResult,
                2
              );
            }),
          (proto.ui.push.AudioEnableResult.prototype.setEnabledtesult =
            function (e) {
              return r.Message.setWrapperField(this, 2, e);
            }),
          (proto.ui.push.AudioEnableResult.prototype.clearEnabledtesult =
            function () {
              return this.setEnabledtesult(void 0);
            }),
          (proto.ui.push.AudioEnableResult.prototype.hasEnabledtesult =
            function () {
              return null != r.Message.getField(this, 2);
            }),
          (proto.ui.push.Dispatch.repeatedFields_ = [2]),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.Dispatch.prototype.toObject = function (e) {
              return proto.ui.push.Dispatch.toObject(e, this);
            }),
            (proto.ui.push.Dispatch.toObject = function (e, t) {
              var o,
                s = {
                  gid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  uidsList:
                    null == (o = r.Message.getRepeatedField(t, 2)) ? void 0 : o,
                  uidscount:
                    null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.Dispatch.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.Dispatch();
            return proto.ui.push.Dispatch.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.Dispatch.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readString();
                  e.setGid(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.addUids(o);
                  break;
                case 3:
                  o = t.readUint32();
                  e.setUidscount(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.Dispatch.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.Dispatch.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.Dispatch.serializeBinaryToWriter = function (e, t) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              (o = e.getUidsList()).length > 0 && t.writeRepeatedUint32(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeUint32(3, o);
          }),
          (proto.ui.push.Dispatch.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.Dispatch.prototype.setGid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.Dispatch.prototype.clearGid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.Dispatch.prototype.hasGid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.Dispatch.prototype.getUidsList = function () {
            return r.Message.getRepeatedField(this, 2);
          }),
          (proto.ui.push.Dispatch.prototype.setUidsList = function (e) {
            return r.Message.setField(this, 2, e || []);
          }),
          (proto.ui.push.Dispatch.prototype.addUids = function (e, t) {
            return r.Message.addToRepeatedField(this, 2, e, t);
          }),
          (proto.ui.push.Dispatch.prototype.clearUidsList = function () {
            return this.setUidsList([]);
          }),
          (proto.ui.push.Dispatch.prototype.getUidscount = function () {
            return r.Message.getFieldWithDefault(this, 3, 0);
          }),
          (proto.ui.push.Dispatch.prototype.setUidscount = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.Dispatch.prototype.clearUidscount = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.Dispatch.prototype.hasUidscount = function () {
            return null != r.Message.getField(this, 3);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.DispatchResult.prototype.toObject = function (e) {
              return proto.ui.push.DispatchResult.toObject(e, this);
            }),
            (proto.ui.push.DispatchResult.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  dispatch:
                    (o = t.getDispatch()) &&
                    proto.ui.push.Dispatch.toObject(e, o),
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.DispatchResult.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.DispatchResult();
            return proto.ui.push.DispatchResult.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.DispatchResult.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readUint32();
                  e.setMsgstate(o);
                  break;
                case 2:
                  o = new proto.ui.push.Dispatch();
                  t.readMessage(
                    o,
                    proto.ui.push.Dispatch.deserializeBinaryFromReader
                  ),
                    e.setDispatch(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.DispatchResult.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.DispatchResult.serializeBinaryToWriter(this, e),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.DispatchResult.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = e.getDispatch()) &&
                t.writeMessage(
                  2,
                  o,
                  proto.ui.push.Dispatch.serializeBinaryToWriter
                );
          }),
          (proto.ui.push.DispatchResult.prototype.getMsgstate = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.DispatchResult.prototype.setMsgstate = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.DispatchResult.prototype.clearMsgstate = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.DispatchResult.prototype.hasMsgstate = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.DispatchResult.prototype.getDispatch = function () {
            return r.Message.getWrapperField(this, proto.ui.push.Dispatch, 2);
          }),
          (proto.ui.push.DispatchResult.prototype.setDispatch = function (e) {
            return r.Message.setWrapperField(this, 2, e);
          }),
          (proto.ui.push.DispatchResult.prototype.clearDispatch = function () {
            return this.setDispatch(void 0);
          }),
          (proto.ui.push.DispatchResult.prototype.hasDispatch = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.TakemicResult.repeatedFields_ = [3]),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.TakemicResult.prototype.toObject = function (e) {
              return proto.ui.push.TakemicResult.toObject(e, this);
            }),
            (proto.ui.push.TakemicResult.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  uidscount:
                    null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  uidsList:
                    null == (o = r.Message.getRepeatedField(t, 3)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.TakemicResult.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.TakemicResult();
            return proto.ui.push.TakemicResult.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.TakemicResult.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readUint32();
                  e.setMsgstate(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.setUidscount(o);
                  break;
                case 3:
                  o = t.readUint32();
                  e.addUids(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.TakemicResult.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.TakemicResult.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.TakemicResult.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o),
              (o = e.getUidsList()).length > 0 && t.writeRepeatedUint32(3, o);
          }),
          (proto.ui.push.TakemicResult.prototype.getMsgstate = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.TakemicResult.prototype.setMsgstate = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.TakemicResult.prototype.clearMsgstate = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.TakemicResult.prototype.hasMsgstate = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.TakemicResult.prototype.getUidscount = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.TakemicResult.prototype.setUidscount = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.TakemicResult.prototype.clearUidscount = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.TakemicResult.prototype.hasUidscount = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.TakemicResult.prototype.getUidsList = function () {
            return r.Message.getRepeatedField(this, 3);
          }),
          (proto.ui.push.TakemicResult.prototype.setUidsList = function (e) {
            return r.Message.setField(this, 3, e || []);
          }),
          (proto.ui.push.TakemicResult.prototype.addUids = function (e, t) {
            return r.Message.addToRepeatedField(this, 3, e, t);
          }),
          (proto.ui.push.TakemicResult.prototype.clearUidsList = function () {
            return this.setUidsList([]);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.SwitchLocateResult.prototype.toObject = function (
              e
            ) {
              return proto.ui.push.SwitchLocateResult.toObject(e, this);
            }),
            (proto.ui.push.SwitchLocateResult.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  enabledtesult:
                    (o = t.getEnabledtesult()) &&
                    proto.ui.push.EnabledResult.toObject(e, o),
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.SwitchLocateResult.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.SwitchLocateResult();
            return proto.ui.push.SwitchLocateResult.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.SwitchLocateResult.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readUint32();
                    e.setMsgstate(o);
                    break;
                  case 2:
                    o = new proto.ui.push.EnabledResult();
                    t.readMessage(
                      o,
                      proto.ui.push.EnabledResult.deserializeBinaryFromReader
                    ),
                      e.setEnabledtesult(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.SwitchLocateResult.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.SwitchLocateResult.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.SwitchLocateResult.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = e.getEnabledtesult()) &&
                t.writeMessage(
                  2,
                  o,
                  proto.ui.push.EnabledResult.serializeBinaryToWriter
                );
          }),
          (proto.ui.push.SwitchLocateResult.prototype.getMsgstate =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.SwitchLocateResult.prototype.setMsgstate = function (
            e
          ) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.SwitchLocateResult.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.SwitchLocateResult.prototype.hasMsgstate =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          (proto.ui.push.SwitchLocateResult.prototype.getEnabledtesult =
            function () {
              return r.Message.getWrapperField(
                this,
                proto.ui.push.EnabledResult,
                2
              );
            }),
          (proto.ui.push.SwitchLocateResult.prototype.setEnabledtesult =
            function (e) {
              return r.Message.setWrapperField(this, 2, e);
            }),
          (proto.ui.push.SwitchLocateResult.prototype.clearEnabledtesult =
            function () {
              return this.setEnabledtesult(void 0);
            }),
          (proto.ui.push.SwitchLocateResult.prototype.hasEnabledtesult =
            function () {
              return null != r.Message.getField(this, 2);
            }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.PlayAudioFileStatue.prototype.toObject = function (
              e
            ) {
              return proto.ui.push.PlayAudioFileStatue.toObject(e, this);
            }),
            (proto.ui.push.PlayAudioFileStatue.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  sid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.PlayAudioFileStatue.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.PlayAudioFileStatue();
            return proto.ui.push.PlayAudioFileStatue.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.PlayAudioFileStatue.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readUint32();
                    e.setMsgstate(o);
                    break;
                  case 2:
                    o = t.readUint32();
                    e.setSid(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.PlayAudioFileStatue.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.PlayAudioFileStatue.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.PlayAudioFileStatue.serializeBinaryToWriter =
            function (e, t) {
              var o = void 0;
              null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
                null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o);
            }),
          (proto.ui.push.PlayAudioFileStatue.prototype.getMsgstate =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.PlayAudioFileStatue.prototype.setMsgstate = function (
            e
          ) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.PlayAudioFileStatue.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.PlayAudioFileStatue.prototype.hasMsgstate =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          (proto.ui.push.PlayAudioFileStatue.prototype.getSid = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.PlayAudioFileStatue.prototype.setSid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.PlayAudioFileStatue.prototype.clearSid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.PlayAudioFileStatue.prototype.hasSid = function () {
            return null != r.Message.getField(this, 2);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.RecordEvent.prototype.toObject = function (e) {
              return proto.ui.push.RecordEvent.toObject(e, this);
            }),
            (proto.ui.push.RecordEvent.toObject = function (e, t) {
              var o,
                s = {
                  recordname:
                    null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  timenow: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  success:
                    null == (o = r.Message.getBooleanField(t, 3)) ? void 0 : o,
                  speechid: null == (o = r.Message.getField(t, 4)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.RecordEvent.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.RecordEvent();
            return proto.ui.push.RecordEvent.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.RecordEvent.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readString();
                  e.setRecordname(o);
                  break;
                case 2:
                  o = t.readString();
                  e.setTimenow(o);
                  break;
                case 3:
                  o = t.readBool();
                  e.setSuccess(o);
                  break;
                case 4:
                  o = t.readString();
                  e.setSpeechid(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.RecordEvent.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.RecordEvent.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.RecordEvent.serializeBinaryToWriter = function (e, t) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeString(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeBool(3, o),
              null != (o = r.Message.getField(e, 4)) && t.writeString(4, o);
          }),
          (proto.ui.push.RecordEvent.prototype.getRecordname = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.RecordEvent.prototype.setRecordname = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.RecordEvent.prototype.clearRecordname = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.RecordEvent.prototype.hasRecordname = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.RecordEvent.prototype.getTimenow = function () {
            return r.Message.getFieldWithDefault(this, 2, "");
          }),
          (proto.ui.push.RecordEvent.prototype.setTimenow = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.RecordEvent.prototype.clearTimenow = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.RecordEvent.prototype.hasTimenow = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.RecordEvent.prototype.getSuccess = function () {
            return r.Message.getBooleanFieldWithDefault(this, 3, !1);
          }),
          (proto.ui.push.RecordEvent.prototype.setSuccess = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.RecordEvent.prototype.clearSuccess = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.RecordEvent.prototype.hasSuccess = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.RecordEvent.prototype.getSpeechid = function () {
            return r.Message.getFieldWithDefault(this, 4, "");
          }),
          (proto.ui.push.RecordEvent.prototype.setSpeechid = function (e) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.RecordEvent.prototype.clearSpeechid = function () {
            return r.Message.setField(this, 4, void 0);
          }),
          (proto.ui.push.RecordEvent.prototype.hasSpeechid = function () {
            return null != r.Message.getField(this, 4);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.RecordStart.prototype.toObject = function (e) {
              return proto.ui.push.RecordStart.toObject(e, this);
            }),
            (proto.ui.push.RecordStart.toObject = function (e, t) {
              var o,
                s = {
                  gid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  uid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  recorde:
                    (o = t.getRecorde()) &&
                    proto.ui.push.RecordEvent.toObject(e, o),
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.RecordStart.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.RecordStart();
            return proto.ui.push.RecordStart.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.RecordStart.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readString();
                  e.setGid(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.setUid(o);
                  break;
                case 3:
                  o = new proto.ui.push.RecordEvent();
                  t.readMessage(
                    o,
                    proto.ui.push.RecordEvent.deserializeBinaryFromReader
                  ),
                    e.setRecorde(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.RecordStart.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.RecordStart.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.RecordStart.serializeBinaryToWriter = function (e, t) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o),
              null != (o = e.getRecorde()) &&
                t.writeMessage(
                  3,
                  o,
                  proto.ui.push.RecordEvent.serializeBinaryToWriter
                );
          }),
          (proto.ui.push.RecordStart.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.RecordStart.prototype.setGid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.RecordStart.prototype.clearGid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.RecordStart.prototype.hasGid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.RecordStart.prototype.getUid = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.RecordStart.prototype.setUid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.RecordStart.prototype.clearUid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.RecordStart.prototype.hasUid = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.RecordStart.prototype.getRecorde = function () {
            return r.Message.getWrapperField(
              this,
              proto.ui.push.RecordEvent,
              3
            );
          }),
          (proto.ui.push.RecordStart.prototype.setRecorde = function (e) {
            return r.Message.setWrapperField(this, 3, e);
          }),
          (proto.ui.push.RecordStart.prototype.clearRecorde = function () {
            return this.setRecorde(void 0);
          }),
          (proto.ui.push.RecordStart.prototype.hasRecorde = function () {
            return null != r.Message.getField(this, 3);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.RecordStop.prototype.toObject = function (e) {
              return proto.ui.push.RecordStop.toObject(e, this);
            }),
            (proto.ui.push.RecordStop.toObject = function (e, t) {
              var o,
                s = {
                  gid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  uid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  recorde:
                    (o = t.getRecorde()) &&
                    proto.ui.push.RecordEvent.toObject(e, o),
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.RecordStop.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.RecordStop();
            return proto.ui.push.RecordStop.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.RecordStop.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readString();
                  e.setGid(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.setUid(o);
                  break;
                case 3:
                  o = new proto.ui.push.RecordEvent();
                  t.readMessage(
                    o,
                    proto.ui.push.RecordEvent.deserializeBinaryFromReader
                  ),
                    e.setRecorde(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.RecordStop.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.RecordStop.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.RecordStop.serializeBinaryToWriter = function (e, t) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o),
              null != (o = e.getRecorde()) &&
                t.writeMessage(
                  3,
                  o,
                  proto.ui.push.RecordEvent.serializeBinaryToWriter
                );
          }),
          (proto.ui.push.RecordStop.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.RecordStop.prototype.setGid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.RecordStop.prototype.clearGid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.RecordStop.prototype.hasGid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.RecordStop.prototype.getUid = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.RecordStop.prototype.setUid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.RecordStop.prototype.clearUid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.RecordStop.prototype.hasUid = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.RecordStop.prototype.getRecorde = function () {
            return r.Message.getWrapperField(
              this,
              proto.ui.push.RecordEvent,
              3
            );
          }),
          (proto.ui.push.RecordStop.prototype.setRecorde = function (e) {
            return r.Message.setWrapperField(this, 3, e);
          }),
          (proto.ui.push.RecordStop.prototype.clearRecorde = function () {
            return this.setRecorde(void 0);
          }),
          (proto.ui.push.RecordStop.prototype.hasRecorde = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.QuerylistenGroupResult.repeatedFields_ = [3]),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.QuerylistenGroupResult.prototype.toObject =
              function (e) {
                return proto.ui.push.QuerylistenGroupResult.toObject(e, this);
              }),
            (proto.ui.push.QuerylistenGroupResult.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  gidcount: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  gidList:
                    null == (o = r.Message.getRepeatedField(t, 3)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.QuerylistenGroupResult.deserializeBinary = function (
            e
          ) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.QuerylistenGroupResult();
            return proto.ui.push.QuerylistenGroupResult.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.QuerylistenGroupResult.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readUint32();
                    e.setMsgstate(o);
                    break;
                  case 2:
                    o = t.readUint32();
                    e.setGidcount(o);
                    break;
                  case 3:
                    o = t.readString();
                    e.addGid(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.QuerylistenGroupResult.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.QuerylistenGroupResult.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.QuerylistenGroupResult.serializeBinaryToWriter =
            function (e, t) {
              var o = void 0;
              null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
                null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o),
                (o = e.getGidList()).length > 0 && t.writeRepeatedString(3, o);
            }),
          (proto.ui.push.QuerylistenGroupResult.prototype.getMsgstate =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.QuerylistenGroupResult.prototype.setMsgstate =
            function (e) {
              return r.Message.setField(this, 1, e);
            }),
          (proto.ui.push.QuerylistenGroupResult.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.QuerylistenGroupResult.prototype.hasMsgstate =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          (proto.ui.push.QuerylistenGroupResult.prototype.getGidcount =
            function () {
              return r.Message.getFieldWithDefault(this, 2, 0);
            }),
          (proto.ui.push.QuerylistenGroupResult.prototype.setGidcount =
            function (e) {
              return r.Message.setField(this, 2, e);
            }),
          (proto.ui.push.QuerylistenGroupResult.prototype.clearGidcount =
            function () {
              return r.Message.setField(this, 2, void 0);
            }),
          (proto.ui.push.QuerylistenGroupResult.prototype.hasGidcount =
            function () {
              return null != r.Message.getField(this, 2);
            }),
          (proto.ui.push.QuerylistenGroupResult.prototype.getGidList =
            function () {
              return r.Message.getRepeatedField(this, 3);
            }),
          (proto.ui.push.QuerylistenGroupResult.prototype.setGidList =
            function (e) {
              return r.Message.setField(this, 3, e || []);
            }),
          (proto.ui.push.QuerylistenGroupResult.prototype.addGid = function (
            e,
            t
          ) {
            return r.Message.addToRepeatedField(this, 3, e, t);
          }),
          (proto.ui.push.QuerylistenGroupResult.prototype.clearGidList =
            function () {
              return this.setGidList([]);
            }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.QuerylistenGroupChanged.prototype.toObject =
              function (e) {
                return proto.ui.push.QuerylistenGroupChanged.toObject(e, this);
              }),
            (proto.ui.push.QuerylistenGroupChanged.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.QuerylistenGroupChanged.deserializeBinary = function (
            e
          ) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.QuerylistenGroupChanged();
            return proto.ui.push.QuerylistenGroupChanged.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.QuerylistenGroupChanged.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                if (1 === t.getFieldNumber()) {
                  var o = t.readUint32();
                  e.setMsgstate(o);
                } else t.skipField();
              }
              return e;
            }),
          (proto.ui.push.QuerylistenGroupChanged.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.QuerylistenGroupChanged.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.QuerylistenGroupChanged.serializeBinaryToWriter =
            function (e, t) {
              var o;
              null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o);
            }),
          (proto.ui.push.QuerylistenGroupChanged.prototype.getMsgstate =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.QuerylistenGroupChanged.prototype.setMsgstate =
            function (e) {
              return r.Message.setField(this, 1, e);
            }),
          (proto.ui.push.QuerylistenGroupChanged.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.QuerylistenGroupChanged.prototype.hasMsgstate =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.ChangeGroupNameResult.prototype.toObject =
              function (e) {
                return proto.ui.push.ChangeGroupNameResult.toObject(e, this);
              }),
            (proto.ui.push.ChangeGroupNameResult.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  gid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.ChangeGroupNameResult.deserializeBinary = function (
            e
          ) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.ChangeGroupNameResult();
            return proto.ui.push.ChangeGroupNameResult.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.ChangeGroupNameResult.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readUint32();
                    e.setMsgstate(o);
                    break;
                  case 2:
                    o = t.readString();
                    e.setGid(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.ChangeGroupNameResult.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.ChangeGroupNameResult.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.ChangeGroupNameResult.serializeBinaryToWriter =
            function (e, t) {
              var o = void 0;
              null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
                null != (o = r.Message.getField(e, 2)) && t.writeString(2, o);
            }),
          (proto.ui.push.ChangeGroupNameResult.prototype.getMsgstate =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.ChangeGroupNameResult.prototype.setMsgstate =
            function (e) {
              return r.Message.setField(this, 1, e);
            }),
          (proto.ui.push.ChangeGroupNameResult.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.ChangeGroupNameResult.prototype.hasMsgstate =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          (proto.ui.push.ChangeGroupNameResult.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 2, "");
          }),
          (proto.ui.push.ChangeGroupNameResult.prototype.setGid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.ChangeGroupNameResult.prototype.clearGid =
            function () {
              return r.Message.setField(this, 2, void 0);
            }),
          (proto.ui.push.ChangeGroupNameResult.prototype.hasGid = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.QuitGrouResult.repeatedFields_ = [2, 4]),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.QuitGrouResult.prototype.toObject = function (e) {
              return proto.ui.push.QuitGrouResult.toObject(e, this);
            }),
            (proto.ui.push.QuitGrouResult.toObject = function (e, t) {
              var o,
                s = {
                  gidsize: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  gidsList:
                    null == (o = r.Message.getRepeatedField(t, 2)) ? void 0 : o,
                  leftuidsize:
                    null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  leftuidsList:
                    null == (o = r.Message.getRepeatedField(t, 4)) ? void 0 : o,
                  byself:
                    null == (o = r.Message.getBooleanField(t, 5)) ? void 0 : o,
                  operator: null == (o = r.Message.getField(t, 6)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.QuitGrouResult.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.QuitGrouResult();
            return proto.ui.push.QuitGrouResult.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.QuitGrouResult.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readUint32();
                  e.setGidsize(o);
                  break;
                case 2:
                  o = t.readString();
                  e.addGids(o);
                  break;
                case 3:
                  o = t.readUint32();
                  e.setLeftuidsize(o);
                  break;
                case 4:
                  o = t.readUint32();
                  e.addLeftuids(o);
                  break;
                case 5:
                  o = t.readBool();
                  e.setByself(o);
                  break;
                case 6:
                  o = t.readUint32();
                  e.setOperator(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.QuitGrouResult.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.QuitGrouResult.serializeBinaryToWriter(this, e),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.QuitGrouResult.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              (o = e.getGidsList()).length > 0 && t.writeRepeatedString(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeUint32(3, o),
              (o = e.getLeftuidsList()).length > 0 &&
                t.writeRepeatedUint32(4, o),
              null != (o = r.Message.getField(e, 5)) && t.writeBool(5, o),
              null != (o = r.Message.getField(e, 6)) && t.writeUint32(6, o);
          }),
          (proto.ui.push.QuitGrouResult.prototype.getGidsize = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.QuitGrouResult.prototype.setGidsize = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.QuitGrouResult.prototype.clearGidsize = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.QuitGrouResult.prototype.hasGidsize = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.QuitGrouResult.prototype.getGidsList = function () {
            return r.Message.getRepeatedField(this, 2);
          }),
          (proto.ui.push.QuitGrouResult.prototype.setGidsList = function (e) {
            return r.Message.setField(this, 2, e || []);
          }),
          (proto.ui.push.QuitGrouResult.prototype.addGids = function (e, t) {
            return r.Message.addToRepeatedField(this, 2, e, t);
          }),
          (proto.ui.push.QuitGrouResult.prototype.clearGidsList = function () {
            return this.setGidsList([]);
          }),
          (proto.ui.push.QuitGrouResult.prototype.getLeftuidsize = function () {
            return r.Message.getFieldWithDefault(this, 3, 0);
          }),
          (proto.ui.push.QuitGrouResult.prototype.setLeftuidsize = function (
            e
          ) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.QuitGrouResult.prototype.clearLeftuidsize =
            function () {
              return r.Message.setField(this, 3, void 0);
            }),
          (proto.ui.push.QuitGrouResult.prototype.hasLeftuidsize = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.QuitGrouResult.prototype.getLeftuidsList =
            function () {
              return r.Message.getRepeatedField(this, 4);
            }),
          (proto.ui.push.QuitGrouResult.prototype.setLeftuidsList = function (
            e
          ) {
            return r.Message.setField(this, 4, e || []);
          }),
          (proto.ui.push.QuitGrouResult.prototype.addLeftuids = function (
            e,
            t
          ) {
            return r.Message.addToRepeatedField(this, 4, e, t);
          }),
          (proto.ui.push.QuitGrouResult.prototype.clearLeftuidsList =
            function () {
              return this.setLeftuidsList([]);
            }),
          (proto.ui.push.QuitGrouResult.prototype.getByself = function () {
            return r.Message.getBooleanFieldWithDefault(this, 5, !1);
          }),
          (proto.ui.push.QuitGrouResult.prototype.setByself = function (e) {
            return r.Message.setField(this, 5, e);
          }),
          (proto.ui.push.QuitGrouResult.prototype.clearByself = function () {
            return r.Message.setField(this, 5, void 0);
          }),
          (proto.ui.push.QuitGrouResult.prototype.hasByself = function () {
            return null != r.Message.getField(this, 5);
          }),
          (proto.ui.push.QuitGrouResult.prototype.getOperator = function () {
            return r.Message.getFieldWithDefault(this, 6, 0);
          }),
          (proto.ui.push.QuitGrouResult.prototype.setOperator = function (e) {
            return r.Message.setField(this, 6, e);
          }),
          (proto.ui.push.QuitGrouResult.prototype.clearOperator = function () {
            return r.Message.setField(this, 6, void 0);
          }),
          (proto.ui.push.QuitGrouResult.prototype.hasOperator = function () {
            return null != r.Message.getField(this, 6);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.RequestJoinSession.prototype.toObject = function (
              e
            ) {
              return proto.ui.push.RequestJoinSession.toObject(e, this);
            }),
            (proto.ui.push.RequestJoinSession.toObject = function (e, t) {
              var o,
                s = {
                  sid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  uid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.RequestJoinSession.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.RequestJoinSession();
            return proto.ui.push.RequestJoinSession.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.RequestJoinSession.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readString();
                    e.setSid(o);
                    break;
                  case 2:
                    o = t.readUint32();
                    e.setUid(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.RequestJoinSession.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.RequestJoinSession.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.RequestJoinSession.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o);
          }),
          (proto.ui.push.RequestJoinSession.prototype.getSid = function () {
            return r.Message.getFieldWithDefault(this, 1, "");
          }),
          (proto.ui.push.RequestJoinSession.prototype.setSid = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.RequestJoinSession.prototype.clearSid = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.RequestJoinSession.prototype.hasSid = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.RequestJoinSession.prototype.getUid = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.RequestJoinSession.prototype.setUid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.RequestJoinSession.prototype.clearUid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.RequestJoinSession.prototype.hasUid = function () {
            return null != r.Message.getField(this, 2);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.DeleteSessionAck.prototype.toObject = function (e) {
              return proto.ui.push.DeleteSessionAck.toObject(e, this);
            }),
            (proto.ui.push.DeleteSessionAck.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  sid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.DeleteSessionAck.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.DeleteSessionAck();
            return proto.ui.push.DeleteSessionAck.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.DeleteSessionAck.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readUint32();
                    e.setMsgstate(o);
                    break;
                  case 2:
                    o = t.readString();
                    e.setSid(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.DeleteSessionAck.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.DeleteSessionAck.serializeBinaryToWriter(this, e),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.DeleteSessionAck.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeString(2, o);
          }),
          (proto.ui.push.DeleteSessionAck.prototype.getMsgstate = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.DeleteSessionAck.prototype.setMsgstate = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.DeleteSessionAck.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.DeleteSessionAck.prototype.hasMsgstate = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.DeleteSessionAck.prototype.getSid = function () {
            return r.Message.getFieldWithDefault(this, 2, "");
          }),
          (proto.ui.push.DeleteSessionAck.prototype.setSid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.DeleteSessionAck.prototype.clearSid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.DeleteSessionAck.prototype.hasSid = function () {
            return null != r.Message.getField(this, 2);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.StartSessionAck.prototype.toObject = function (e) {
              return proto.ui.push.StartSessionAck.toObject(e, this);
            }),
            (proto.ui.push.StartSessionAck.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  sid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  reason: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.StartSessionAck.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.StartSessionAck();
            return proto.ui.push.StartSessionAck.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.StartSessionAck.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readUint32();
                    e.setMsgstate(o);
                    break;
                  case 2:
                    o = t.readString();
                    e.setSid(o);
                    break;
                  case 3:
                    o = t.readUint32();
                    e.setReason(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.StartSessionAck.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.StartSessionAck.serializeBinaryToWriter(this, e),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.StartSessionAck.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeString(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeUint32(3, o);
          }),
          (proto.ui.push.StartSessionAck.prototype.getMsgstate = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.StartSessionAck.prototype.setMsgstate = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.StartSessionAck.prototype.clearMsgstate = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.StartSessionAck.prototype.hasMsgstate = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.StartSessionAck.prototype.getSid = function () {
            return r.Message.getFieldWithDefault(this, 2, "");
          }),
          (proto.ui.push.StartSessionAck.prototype.setSid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.StartSessionAck.prototype.clearSid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.StartSessionAck.prototype.hasSid = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.StartSessionAck.prototype.getReason = function () {
            return r.Message.getFieldWithDefault(this, 3, 0);
          }),
          (proto.ui.push.StartSessionAck.prototype.setReason = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.StartSessionAck.prototype.clearReason = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.StartSessionAck.prototype.hasReason = function () {
            return null != r.Message.getField(this, 3);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.StopSessionAck.prototype.toObject = function (e) {
              return proto.ui.push.StopSessionAck.toObject(e, this);
            }),
            (proto.ui.push.StopSessionAck.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  sid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.StopSessionAck.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.StopSessionAck();
            return proto.ui.push.StopSessionAck.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.StopSessionAck.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readUint32();
                  e.setMsgstate(o);
                  break;
                case 2:
                  o = t.readString();
                  e.setSid(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.StopSessionAck.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.StopSessionAck.serializeBinaryToWriter(this, e),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.StopSessionAck.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeString(2, o);
          }),
          (proto.ui.push.StopSessionAck.prototype.getMsgstate = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.StopSessionAck.prototype.setMsgstate = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.StopSessionAck.prototype.clearMsgstate = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.StopSessionAck.prototype.hasMsgstate = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.StopSessionAck.prototype.getSid = function () {
            return r.Message.getFieldWithDefault(this, 2, "");
          }),
          (proto.ui.push.StopSessionAck.prototype.setSid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.StopSessionAck.prototype.clearSid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.StopSessionAck.prototype.hasSid = function () {
            return null != r.Message.getField(this, 2);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.ResponseSessionAck.prototype.toObject = function (
              e
            ) {
              return proto.ui.push.ResponseSessionAck.toObject(e, this);
            }),
            (proto.ui.push.ResponseSessionAck.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  sid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  accept: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.ResponseSessionAck.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.ResponseSessionAck();
            return proto.ui.push.ResponseSessionAck.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.ResponseSessionAck.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readUint32();
                    e.setMsgstate(o);
                    break;
                  case 2:
                    o = t.readString();
                    e.setSid(o);
                    break;
                  case 3:
                    o = t.readUint32();
                    e.setAccept(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.ResponseSessionAck.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.ResponseSessionAck.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.ResponseSessionAck.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeString(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeUint32(3, o);
          }),
          (proto.ui.push.ResponseSessionAck.prototype.getMsgstate =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.ResponseSessionAck.prototype.setMsgstate = function (
            e
          ) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.ResponseSessionAck.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.ResponseSessionAck.prototype.hasMsgstate =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          (proto.ui.push.ResponseSessionAck.prototype.getSid = function () {
            return r.Message.getFieldWithDefault(this, 2, "");
          }),
          (proto.ui.push.ResponseSessionAck.prototype.setSid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.ResponseSessionAck.prototype.clearSid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.ResponseSessionAck.prototype.hasSid = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.ResponseSessionAck.prototype.getAccept = function () {
            return r.Message.getFieldWithDefault(this, 3, 0);
          }),
          (proto.ui.push.ResponseSessionAck.prototype.setAccept = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.ResponseSessionAck.prototype.clearAccept =
            function () {
              return r.Message.setField(this, 3, void 0);
            }),
          (proto.ui.push.ResponseSessionAck.prototype.hasAccept = function () {
            return null != r.Message.getField(this, 3);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.ResponseJoinSessionAck.prototype.toObject =
              function (e) {
                return proto.ui.push.ResponseJoinSessionAck.toObject(e, this);
              }),
            (proto.ui.push.ResponseJoinSessionAck.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  sid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  accept: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.ResponseJoinSessionAck.deserializeBinary = function (
            e
          ) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.ResponseJoinSessionAck();
            return proto.ui.push.ResponseJoinSessionAck.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.ResponseJoinSessionAck.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readUint32();
                    e.setMsgstate(o);
                    break;
                  case 2:
                    o = t.readString();
                    e.setSid(o);
                    break;
                  case 3:
                    o = t.readUint32();
                    e.setAccept(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.ResponseJoinSessionAck.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.ResponseJoinSessionAck.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.ResponseJoinSessionAck.serializeBinaryToWriter =
            function (e, t) {
              var o = void 0;
              null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
                null != (o = r.Message.getField(e, 2)) && t.writeString(2, o),
                null != (o = r.Message.getField(e, 3)) && t.writeUint32(3, o);
            }),
          (proto.ui.push.ResponseJoinSessionAck.prototype.getMsgstate =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.ResponseJoinSessionAck.prototype.setMsgstate =
            function (e) {
              return r.Message.setField(this, 1, e);
            }),
          (proto.ui.push.ResponseJoinSessionAck.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.ResponseJoinSessionAck.prototype.hasMsgstate =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          (proto.ui.push.ResponseJoinSessionAck.prototype.getSid = function () {
            return r.Message.getFieldWithDefault(this, 2, "");
          }),
          (proto.ui.push.ResponseJoinSessionAck.prototype.setSid = function (
            e
          ) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.ResponseJoinSessionAck.prototype.clearSid =
            function () {
              return r.Message.setField(this, 2, void 0);
            }),
          (proto.ui.push.ResponseJoinSessionAck.prototype.hasSid = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.ResponseJoinSessionAck.prototype.getAccept =
            function () {
              return r.Message.getFieldWithDefault(this, 3, 0);
            }),
          (proto.ui.push.ResponseJoinSessionAck.prototype.setAccept = function (
            e
          ) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.ResponseJoinSessionAck.prototype.clearAccept =
            function () {
              return r.Message.setField(this, 3, void 0);
            }),
          (proto.ui.push.ResponseJoinSessionAck.prototype.hasAccept =
            function () {
              return null != r.Message.getField(this, 3);
            }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.ResponseSessionResult.prototype.toObject =
              function (e) {
                return proto.ui.push.ResponseSessionResult.toObject(e, this);
              }),
            (proto.ui.push.ResponseSessionResult.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  gid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  uid: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  accept:
                    null == (o = r.Message.getBooleanField(t, 4)) ? void 0 : o,
                  reason: null == (o = r.Message.getField(t, 5)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.ResponseSessionResult.deserializeBinary = function (
            e
          ) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.ResponseSessionResult();
            return proto.ui.push.ResponseSessionResult.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.ResponseSessionResult.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readUint32();
                    e.setMsgstate(o);
                    break;
                  case 2:
                    o = t.readString();
                    e.setGid(o);
                    break;
                  case 3:
                    o = t.readUint32();
                    e.setUid(o);
                    break;
                  case 4:
                    o = t.readBool();
                    e.setAccept(o);
                    break;
                  case 5:
                    o = t.readUint32();
                    e.setReason(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.ResponseSessionResult.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.ResponseSessionResult.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.ResponseSessionResult.serializeBinaryToWriter =
            function (e, t) {
              var o = void 0;
              null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
                null != (o = r.Message.getField(e, 2)) && t.writeString(2, o),
                null != (o = r.Message.getField(e, 3)) && t.writeUint32(3, o),
                null != (o = r.Message.getField(e, 4)) && t.writeBool(4, o),
                null != (o = r.Message.getField(e, 5)) && t.writeUint32(5, o);
            }),
          (proto.ui.push.ResponseSessionResult.prototype.getMsgstate =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.ResponseSessionResult.prototype.setMsgstate =
            function (e) {
              return r.Message.setField(this, 1, e);
            }),
          (proto.ui.push.ResponseSessionResult.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.ResponseSessionResult.prototype.hasMsgstate =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          (proto.ui.push.ResponseSessionResult.prototype.getGid = function () {
            return r.Message.getFieldWithDefault(this, 2, "");
          }),
          (proto.ui.push.ResponseSessionResult.prototype.setGid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.ResponseSessionResult.prototype.clearGid =
            function () {
              return r.Message.setField(this, 2, void 0);
            }),
          (proto.ui.push.ResponseSessionResult.prototype.hasGid = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.ResponseSessionResult.prototype.getUid = function () {
            return r.Message.getFieldWithDefault(this, 3, 0);
          }),
          (proto.ui.push.ResponseSessionResult.prototype.setUid = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.ResponseSessionResult.prototype.clearUid =
            function () {
              return r.Message.setField(this, 3, void 0);
            }),
          (proto.ui.push.ResponseSessionResult.prototype.hasUid = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.ResponseSessionResult.prototype.getAccept =
            function () {
              return r.Message.getBooleanFieldWithDefault(this, 4, !1);
            }),
          (proto.ui.push.ResponseSessionResult.prototype.setAccept = function (
            e
          ) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.ResponseSessionResult.prototype.clearAccept =
            function () {
              return r.Message.setField(this, 4, void 0);
            }),
          (proto.ui.push.ResponseSessionResult.prototype.hasAccept =
            function () {
              return null != r.Message.getField(this, 4);
            }),
          (proto.ui.push.ResponseSessionResult.prototype.getReason =
            function () {
              return r.Message.getFieldWithDefault(this, 5, 0);
            }),
          (proto.ui.push.ResponseSessionResult.prototype.setReason = function (
            e
          ) {
            return r.Message.setField(this, 5, e);
          }),
          (proto.ui.push.ResponseSessionResult.prototype.clearReason =
            function () {
              return r.Message.setField(this, 5, void 0);
            }),
          (proto.ui.push.ResponseSessionResult.prototype.hasReason =
            function () {
              return null != r.Message.getField(this, 5);
            }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.DisableUserAck.prototype.toObject = function (e) {
              return proto.ui.push.DisableUserAck.toObject(e, this);
            }),
            (proto.ui.push.DisableUserAck.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  uid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.DisableUserAck.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.DisableUserAck();
            return proto.ui.push.DisableUserAck.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.DisableUserAck.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readUint32();
                  e.setMsgstate(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.setUid(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.DisableUserAck.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.DisableUserAck.serializeBinaryToWriter(this, e),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.DisableUserAck.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o);
          }),
          (proto.ui.push.DisableUserAck.prototype.getMsgstate = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.DisableUserAck.prototype.setMsgstate = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.DisableUserAck.prototype.clearMsgstate = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.DisableUserAck.prototype.hasMsgstate = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.DisableUserAck.prototype.getUid = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.DisableUserAck.prototype.setUid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.DisableUserAck.prototype.clearUid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.DisableUserAck.prototype.hasUid = function () {
            return null != r.Message.getField(this, 2);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.EnableUserAck.prototype.toObject = function (e) {
              return proto.ui.push.EnableUserAck.toObject(e, this);
            }),
            (proto.ui.push.EnableUserAck.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  uid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.EnableUserAck.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.EnableUserAck();
            return proto.ui.push.EnableUserAck.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.EnableUserAck.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readUint32();
                  e.setMsgstate(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.setUid(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.EnableUserAck.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.EnableUserAck.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.EnableUserAck.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o);
          }),
          (proto.ui.push.EnableUserAck.prototype.getMsgstate = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.EnableUserAck.prototype.setMsgstate = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.EnableUserAck.prototype.clearMsgstate = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.EnableUserAck.prototype.hasMsgstate = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.EnableUserAck.prototype.getUid = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.EnableUserAck.prototype.setUid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.EnableUserAck.prototype.clearUid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.EnableUserAck.prototype.hasUid = function () {
            return null != r.Message.getField(this, 2);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.PushDeliver.prototype.toObject = function (e) {
              return proto.ui.push.PushDeliver.toObject(e, this);
            }),
            (proto.ui.push.PushDeliver.toObject = function (e, t) {
              var o,
                s = {
                  sender: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  timestamp:
                    null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  msgname: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  data: null == (o = r.Message.getField(t, 4)) ? void 0 : o,
                  len: null == (o = r.Message.getField(t, 5)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.PushDeliver.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.PushDeliver();
            return proto.ui.push.PushDeliver.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.PushDeliver.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              switch (t.getFieldNumber()) {
                case 1:
                  var o = t.readUint32();
                  e.setSender(o);
                  break;
                case 2:
                  o = t.readUint32();
                  e.setTimestamp(o);
                  break;
                case 3:
                  o = t.readString();
                  e.setMsgname(o);
                  break;
                case 4:
                  o = t.readString();
                  e.setData(o);
                  break;
                case 5:
                  o = t.readUint32();
                  e.setLen(o);
                  break;
                default:
                  t.skipField();
              }
            }
            return e;
          }),
          (proto.ui.push.PushDeliver.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.PushDeliver.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.PushDeliver.serializeBinaryToWriter = function (e, t) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeString(3, o),
              null != (o = r.Message.getField(e, 4)) && t.writeString(4, o),
              null != (o = r.Message.getField(e, 5)) && t.writeUint32(5, o);
          }),
          (proto.ui.push.PushDeliver.prototype.getSender = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.PushDeliver.prototype.setSender = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.PushDeliver.prototype.clearSender = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.PushDeliver.prototype.hasSender = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.PushDeliver.prototype.getTimestamp = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.PushDeliver.prototype.setTimestamp = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.PushDeliver.prototype.clearTimestamp = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.PushDeliver.prototype.hasTimestamp = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.PushDeliver.prototype.getMsgname = function () {
            return r.Message.getFieldWithDefault(this, 3, "");
          }),
          (proto.ui.push.PushDeliver.prototype.setMsgname = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.PushDeliver.prototype.clearMsgname = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.PushDeliver.prototype.hasMsgname = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.PushDeliver.prototype.getData = function () {
            return r.Message.getFieldWithDefault(this, 4, "");
          }),
          (proto.ui.push.PushDeliver.prototype.setData = function (e) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.PushDeliver.prototype.clearData = function () {
            return r.Message.setField(this, 4, void 0);
          }),
          (proto.ui.push.PushDeliver.prototype.hasData = function () {
            return null != r.Message.getField(this, 4);
          }),
          (proto.ui.push.PushDeliver.prototype.getLen = function () {
            return r.Message.getFieldWithDefault(this, 5, 0);
          }),
          (proto.ui.push.PushDeliver.prototype.setLen = function (e) {
            return r.Message.setField(this, 5, e);
          }),
          (proto.ui.push.PushDeliver.prototype.clearLen = function () {
            return r.Message.setField(this, 5, void 0);
          }),
          (proto.ui.push.PushDeliver.prototype.hasLen = function () {
            return null != r.Message.getField(this, 5);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.StopSessionResult.prototype.toObject = function (
              e
            ) {
              return proto.ui.push.StopSessionResult.toObject(e, this);
            }),
            (proto.ui.push.StopSessionResult.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  sid: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  uid: null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                  reason: null == (o = r.Message.getField(t, 4)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.StopSessionResult.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.StopSessionResult();
            return proto.ui.push.StopSessionResult.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.StopSessionResult.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readUint32();
                    e.setMsgstate(o);
                    break;
                  case 2:
                    o = t.readString();
                    e.setSid(o);
                    break;
                  case 3:
                    o = t.readUint32();
                    e.setUid(o);
                    break;
                  case 4:
                    o = t.readUint32();
                    e.setReason(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.StopSessionResult.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.StopSessionResult.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.StopSessionResult.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeString(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeUint32(3, o),
              null != (o = r.Message.getField(e, 4)) && t.writeUint32(4, o);
          }),
          (proto.ui.push.StopSessionResult.prototype.getMsgstate = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.StopSessionResult.prototype.setMsgstate = function (
            e
          ) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.StopSessionResult.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.StopSessionResult.prototype.hasMsgstate = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.StopSessionResult.prototype.getSid = function () {
            return r.Message.getFieldWithDefault(this, 2, "");
          }),
          (proto.ui.push.StopSessionResult.prototype.setSid = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.StopSessionResult.prototype.clearSid = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.StopSessionResult.prototype.hasSid = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.StopSessionResult.prototype.getUid = function () {
            return r.Message.getFieldWithDefault(this, 3, 0);
          }),
          (proto.ui.push.StopSessionResult.prototype.setUid = function (e) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.StopSessionResult.prototype.clearUid = function () {
            return r.Message.setField(this, 3, void 0);
          }),
          (proto.ui.push.StopSessionResult.prototype.hasUid = function () {
            return null != r.Message.getField(this, 3);
          }),
          (proto.ui.push.StopSessionResult.prototype.getReason = function () {
            return r.Message.getFieldWithDefault(this, 4, 0);
          }),
          (proto.ui.push.StopSessionResult.prototype.setReason = function (e) {
            return r.Message.setField(this, 4, e);
          }),
          (proto.ui.push.StopSessionResult.prototype.clearReason = function () {
            return r.Message.setField(this, 4, void 0);
          }),
          (proto.ui.push.StopSessionResult.prototype.hasReason = function () {
            return null != r.Message.getField(this, 4);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.SetGroupMaxSpeechTimeAck.prototype.toObject =
              function (e) {
                return proto.ui.push.SetGroupMaxSpeechTimeAck.toObject(e, this);
              }),
            (proto.ui.push.SetGroupMaxSpeechTimeAck.toObject = function (e, t) {
              var o,
                s = {
                  gid: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  duration: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.SetGroupMaxSpeechTimeAck.deserializeBinary = function (
            e
          ) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.SetGroupMaxSpeechTimeAck();
            return proto.ui.push.SetGroupMaxSpeechTimeAck.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.SetGroupMaxSpeechTimeAck.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readString();
                    e.setGid(o);
                    break;
                  case 2:
                    o = t.readUint32();
                    e.setDuration(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.SetGroupMaxSpeechTimeAck.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.SetGroupMaxSpeechTimeAck.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.SetGroupMaxSpeechTimeAck.serializeBinaryToWriter =
            function (e, t) {
              var o = void 0;
              null != (o = r.Message.getField(e, 1)) && t.writeString(1, o),
                null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o);
            }),
          (proto.ui.push.SetGroupMaxSpeechTimeAck.prototype.getGid =
            function () {
              return r.Message.getFieldWithDefault(this, 1, "");
            }),
          (proto.ui.push.SetGroupMaxSpeechTimeAck.prototype.setGid = function (
            e
          ) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.SetGroupMaxSpeechTimeAck.prototype.clearGid =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.SetGroupMaxSpeechTimeAck.prototype.hasGid =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          (proto.ui.push.SetGroupMaxSpeechTimeAck.prototype.getDuration =
            function () {
              return r.Message.getFieldWithDefault(this, 2, 0);
            }),
          (proto.ui.push.SetGroupMaxSpeechTimeAck.prototype.setDuration =
            function (e) {
              return r.Message.setField(this, 2, e);
            }),
          (proto.ui.push.SetGroupMaxSpeechTimeAck.prototype.clearDuration =
            function () {
              return r.Message.setField(this, 2, void 0);
            }),
          (proto.ui.push.SetGroupMaxSpeechTimeAck.prototype.hasDuration =
            function () {
              return null != r.Message.getField(this, 2);
            }),
          (proto.ui.push.UserStatusChanged.repeatedFields_ = [2]),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.UserStatusChanged.prototype.toObject = function (
              e
            ) {
              return proto.ui.push.UserStatusChanged.toObject(e, this);
            }),
            (proto.ui.push.UserStatusChanged.toObject = function (e, t) {
              var o,
                s = {
                  count: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  usersList: r.Message.toObjectList(
                    t.getUsersList(),
                    proto.ui.push.User.toObject,
                    e
                  ),
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.UserStatusChanged.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.UserStatusChanged();
            return proto.ui.push.UserStatusChanged.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.UserStatusChanged.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readUint32();
                    e.setCount(o);
                    break;
                  case 2:
                    o = new proto.ui.push.User();
                    t.readMessage(
                      o,
                      proto.ui.push.User.deserializeBinaryFromReader
                    ),
                      e.addUsers(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.UserStatusChanged.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.UserStatusChanged.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.UserStatusChanged.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              (o = e.getUsersList()).length > 0 &&
                t.writeRepeatedMessage(
                  2,
                  o,
                  proto.ui.push.User.serializeBinaryToWriter
                );
          }),
          (proto.ui.push.UserStatusChanged.prototype.getCount = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.UserStatusChanged.prototype.setCount = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.UserStatusChanged.prototype.clearCount = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.UserStatusChanged.prototype.hasCount = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.UserStatusChanged.prototype.getUsersList =
            function () {
              return r.Message.getRepeatedWrapperField(
                this,
                proto.ui.push.User,
                2
              );
            }),
          (proto.ui.push.UserStatusChanged.prototype.setUsersList = function (
            e
          ) {
            return r.Message.setRepeatedWrapperField(this, 2, e);
          }),
          (proto.ui.push.UserStatusChanged.prototype.addUsers = function (
            e,
            t
          ) {
            return r.Message.addToRepeatedWrapperField(
              this,
              2,
              e,
              proto.ui.push.User,
              t
            );
          }),
          (proto.ui.push.UserStatusChanged.prototype.clearUsersList =
            function () {
              return this.setUsersList([]);
            }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.ChangeEmail.prototype.toObject = function (e) {
              return proto.ui.push.ChangeEmail.toObject(e, this);
            }),
            (proto.ui.push.ChangeEmail.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.ChangeEmail.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.ChangeEmail();
            return proto.ui.push.ChangeEmail.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.ChangeEmail.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              if (1 === t.getFieldNumber()) {
                var o = t.readUint32();
                e.setMsgstate(o);
              } else t.skipField();
            }
            return e;
          }),
          (proto.ui.push.ChangeEmail.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.ChangeEmail.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.ChangeEmail.serializeBinaryToWriter = function (e, t) {
            var o;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o);
          }),
          (proto.ui.push.ChangeEmail.prototype.getMsgstate = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.ChangeEmail.prototype.setMsgstate = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.ChangeEmail.prototype.clearMsgstate = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.ChangeEmail.prototype.hasMsgstate = function () {
            return null != r.Message.getField(this, 1);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.ChangePhone.prototype.toObject = function (e) {
              return proto.ui.push.ChangePhone.toObject(e, this);
            }),
            (proto.ui.push.ChangePhone.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.ChangePhone.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.ChangePhone();
            return proto.ui.push.ChangePhone.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.ChangePhone.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              if (1 === t.getFieldNumber()) {
                var o = t.readUint32();
                e.setMsgstate(o);
              } else t.skipField();
            }
            return e;
          }),
          (proto.ui.push.ChangePhone.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.ChangePhone.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.ChangePhone.serializeBinaryToWriter = function (e, t) {
            var o;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o);
          }),
          (proto.ui.push.ChangePhone.prototype.getMsgstate = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.ChangePhone.prototype.setMsgstate = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.ChangePhone.prototype.clearMsgstate = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.ChangePhone.prototype.hasMsgstate = function () {
            return null != r.Message.getField(this, 1);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.InviteSessionAck.prototype.toObject = function (e) {
              return proto.ui.push.InviteSessionAck.toObject(e, this);
            }),
            (proto.ui.push.InviteSessionAck.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.InviteSessionAck.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.InviteSessionAck();
            return proto.ui.push.InviteSessionAck.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.InviteSessionAck.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                if (1 === t.getFieldNumber()) {
                  var o = t.readUint32();
                  e.setMsgstate(o);
                } else t.skipField();
              }
              return e;
            }),
          (proto.ui.push.InviteSessionAck.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.InviteSessionAck.serializeBinaryToWriter(this, e),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.InviteSessionAck.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o);
          }),
          (proto.ui.push.InviteSessionAck.prototype.getMsgstate = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.InviteSessionAck.prototype.setMsgstate = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.InviteSessionAck.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.InviteSessionAck.prototype.hasMsgstate = function () {
            return null != r.Message.getField(this, 1);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.ChangeGroupDescAck.prototype.toObject = function (
              e
            ) {
              return proto.ui.push.ChangeGroupDescAck.toObject(e, this);
            }),
            (proto.ui.push.ChangeGroupDescAck.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.ChangeGroupDescAck.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.ChangeGroupDescAck();
            return proto.ui.push.ChangeGroupDescAck.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.ChangeGroupDescAck.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                if (1 === t.getFieldNumber()) {
                  var o = t.readUint32();
                  e.setMsgstate(o);
                } else t.skipField();
              }
              return e;
            }),
          (proto.ui.push.ChangeGroupDescAck.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.ChangeGroupDescAck.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.ChangeGroupDescAck.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o);
          }),
          (proto.ui.push.ChangeGroupDescAck.prototype.getMsgstate =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.ChangeGroupDescAck.prototype.setMsgstate = function (
            e
          ) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.ChangeGroupDescAck.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.ChangeGroupDescAck.prototype.hasMsgstate =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.UpdateUserConfigureAck.prototype.toObject =
              function (e) {
                return proto.ui.push.UpdateUserConfigureAck.toObject(e, this);
              }),
            (proto.ui.push.UpdateUserConfigureAck.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.UpdateUserConfigureAck.deserializeBinary = function (
            e
          ) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.UpdateUserConfigureAck();
            return proto.ui.push.UpdateUserConfigureAck.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.UpdateUserConfigureAck.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                if (1 === t.getFieldNumber()) {
                  var o = t.readUint32();
                  e.setMsgstate(o);
                } else t.skipField();
              }
              return e;
            }),
          (proto.ui.push.UpdateUserConfigureAck.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.UpdateUserConfigureAck.serializeBinaryToWriter(
                  this,
                  e
                ),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.UpdateUserConfigureAck.serializeBinaryToWriter =
            function (e, t) {
              var o;
              null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o);
            }),
          (proto.ui.push.UpdateUserConfigureAck.prototype.getMsgstate =
            function () {
              return r.Message.getFieldWithDefault(this, 1, 0);
            }),
          (proto.ui.push.UpdateUserConfigureAck.prototype.setMsgstate =
            function (e) {
              return r.Message.setField(this, 1, e);
            }),
          (proto.ui.push.UpdateUserConfigureAck.prototype.clearMsgstate =
            function () {
              return r.Message.setField(this, 1, void 0);
            }),
          (proto.ui.push.UpdateUserConfigureAck.prototype.hasMsgstate =
            function () {
              return null != r.Message.getField(this, 1);
            }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.RRResuntAck.prototype.toObject = function (e) {
              return proto.ui.push.RRResuntAck.toObject(e, this);
            }),
            (proto.ui.push.RRResuntAck.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.RRResuntAck.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.RRResuntAck();
            return proto.ui.push.RRResuntAck.deserializeBinaryFromReader(o, t);
          }),
          (proto.ui.push.RRResuntAck.deserializeBinaryFromReader = function (
            e,
            t
          ) {
            for (; t.nextField() && !t.isEndGroup(); ) {
              if (1 === t.getFieldNumber()) {
                var o = t.readUint32();
                e.setMsgstate(o);
              } else t.skipField();
            }
            return e;
          }),
          (proto.ui.push.RRResuntAck.prototype.serializeBinary = function () {
            var e = new r.BinaryWriter();
            return (
              proto.ui.push.RRResuntAck.serializeBinaryToWriter(this, e),
              e.getResultBuffer()
            );
          }),
          (proto.ui.push.RRResuntAck.serializeBinaryToWriter = function (e, t) {
            var o;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o);
          }),
          (proto.ui.push.RRResuntAck.prototype.getMsgstate = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.RRResuntAck.prototype.setMsgstate = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.RRResuntAck.prototype.clearMsgstate = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.RRResuntAck.prototype.hasMsgstate = function () {
            return null != r.Message.getField(this, 1);
          }),
          r.Message.GENERATE_TO_OBJECT &&
            ((proto.ui.push.PlayProgressAck.prototype.toObject = function (e) {
              return proto.ui.push.PlayProgressAck.toObject(e, this);
            }),
            (proto.ui.push.PlayProgressAck.toObject = function (e, t) {
              var o,
                s = {
                  msgstate: null == (o = r.Message.getField(t, 1)) ? void 0 : o,
                  progress: null == (o = r.Message.getField(t, 2)) ? void 0 : o,
                  packageindex:
                    null == (o = r.Message.getField(t, 3)) ? void 0 : o,
                };
              return e && (s.$jspbMessageInstance = t), s;
            })),
          (proto.ui.push.PlayProgressAck.deserializeBinary = function (e) {
            var t = new r.BinaryReader(e),
              o = new proto.ui.push.PlayProgressAck();
            return proto.ui.push.PlayProgressAck.deserializeBinaryFromReader(
              o,
              t
            );
          }),
          (proto.ui.push.PlayProgressAck.deserializeBinaryFromReader =
            function (e, t) {
              for (; t.nextField() && !t.isEndGroup(); ) {
                switch (t.getFieldNumber()) {
                  case 1:
                    var o = t.readUint32();
                    e.setMsgstate(o);
                    break;
                  case 2:
                    o = t.readUint32();
                    e.setProgress(o);
                    break;
                  case 3:
                    o = t.readUint32();
                    e.setPackageindex(o);
                    break;
                  default:
                    t.skipField();
                }
              }
              return e;
            }),
          (proto.ui.push.PlayProgressAck.prototype.serializeBinary =
            function () {
              var e = new r.BinaryWriter();
              return (
                proto.ui.push.PlayProgressAck.serializeBinaryToWriter(this, e),
                e.getResultBuffer()
              );
            }),
          (proto.ui.push.PlayProgressAck.serializeBinaryToWriter = function (
            e,
            t
          ) {
            var o = void 0;
            null != (o = r.Message.getField(e, 1)) && t.writeUint32(1, o),
              null != (o = r.Message.getField(e, 2)) && t.writeUint32(2, o),
              null != (o = r.Message.getField(e, 3)) && t.writeUint32(3, o);
          }),
          (proto.ui.push.PlayProgressAck.prototype.getMsgstate = function () {
            return r.Message.getFieldWithDefault(this, 1, 0);
          }),
          (proto.ui.push.PlayProgressAck.prototype.setMsgstate = function (e) {
            return r.Message.setField(this, 1, e);
          }),
          (proto.ui.push.PlayProgressAck.prototype.clearMsgstate = function () {
            return r.Message.setField(this, 1, void 0);
          }),
          (proto.ui.push.PlayProgressAck.prototype.hasMsgstate = function () {
            return null != r.Message.getField(this, 1);
          }),
          (proto.ui.push.PlayProgressAck.prototype.getProgress = function () {
            return r.Message.getFieldWithDefault(this, 2, 0);
          }),
          (proto.ui.push.PlayProgressAck.prototype.setProgress = function (e) {
            return r.Message.setField(this, 2, e);
          }),
          (proto.ui.push.PlayProgressAck.prototype.clearProgress = function () {
            return r.Message.setField(this, 2, void 0);
          }),
          (proto.ui.push.PlayProgressAck.prototype.hasProgress = function () {
            return null != r.Message.getField(this, 2);
          }),
          (proto.ui.push.PlayProgressAck.prototype.getPackageindex =
            function () {
              return r.Message.getFieldWithDefault(this, 3, 0);
            }),
          (proto.ui.push.PlayProgressAck.prototype.setPackageindex = function (
            e
          ) {
            return r.Message.setField(this, 3, e);
          }),
          (proto.ui.push.PlayProgressAck.prototype.clearPackageindex =
            function () {
              return r.Message.setField(this, 3, void 0);
            }),
          (proto.ui.push.PlayProgressAck.prototype.hasPackageindex =
            function () {
              return null != r.Message.getField(this, 3);
            }),
          (proto.ui.push.GroupType = {
            GROUP_TYPE__STATIC: 1,
            GROUP_TYPE__TEMP: 2,
            GROUP_TYPE__CONTACT: 3,
            GROUP_TYPE__CHECKIN: 4,
            GROUP_TYPE__SESSION: 5,
          }),
          (proto.ui.push.GroupStatus = {
            GROUP_STATUS__NORMAL: 0,
            GROUP_STATUS__OUT_OF_LIMIT: 1,
          }),
          (proto.ui.push.OnlineStatus = {
            UNKNOWN: 0,
            OFFLINE: 1,
            LOGINING: 2,
            ONLINE: 3,
          }),
          s.object.extend(o, proto.ui.push);
      },
      { "google-protobuf": 5 },
    ],
  },
  {},
  [1]
);
