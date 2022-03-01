/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';
var q, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[b] = c.value;
    return a
};

function ba(a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
    }
    throw Error("Cannot find global object");
}
var ca = ba(this);

function da(a, b) {
    if (b) a: {
        var c = ca;a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c)) break a;
            c = c[e]
        }
        a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && aa(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}

function ea(a) {
    function b(d) {
        return a.next(d)
    }

    function c(d) {
        return a.throw(d)
    }
    return new Promise(function(d, e) {
        function f(g) {
            g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
        }
        f(a.next())
    })
}

function r(a) {
    return ea(a())
}
da("Object.entries", function(a) {
    return a ? a : function(b) {
        var c = [],
            d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
        return c
    }
});

function fa(a, b) {
    a instanceof String && (a += "");
    var c = 0,
        d = !1,
        e = {
            next: function() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
    e[Symbol.iterator] = function() {
        return e
    };
    return e
}
da("Array.prototype.values", function(a) {
    return a ? a : function() {
        return fa(this, function(b, c) {
            return c
        })
    }
});
da("Array.prototype.includes", function(a) {
    return a ? a : function(b, c) {
        var d = this;
        d instanceof String && (d = String(d));
        var e = d.length;
        c = c || 0;
        for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = d[c];
            if (f === b || Object.is(f, b)) return !0
        }
        return !1
    }
});
da("Object.values", function(a) {
    return a ? a : function(b) {
        var c = [],
            d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
        return c
    }
});
da("String.prototype.matchAll", function(a) {
    return a ? a : function(b) {
        if (b instanceof RegExp && !b.global) throw new TypeError("RegExp passed into String.prototype.matchAll() must have global tag.");
        var c = new RegExp(b, b instanceof RegExp ? void 0 : "g"),
            d = this,
            e = !1,
            f = {
                next: function() {
                    if (e) return {
                        value: void 0,
                        done: !0
                    };
                    var g = c.exec(d);
                    if (!g) return e = !0, {
                        value: void 0,
                        done: !0
                    };
                    "" === g[0] && (c.lastIndex += 1);
                    return {
                        value: g,
                        done: !1
                    }
                }
            };
        f[Symbol.iterator] = function() {
            return f
        };
        return f
    }
});
da("Promise.prototype.finally", function(a) {
    return a ? a : function(b) {
        return this.then(function(c) {
            return Promise.resolve(b()).then(function() {
                return c
            })
        }, function(c) {
            return Promise.resolve(b()).then(function() {
                throw c;
            })
        })
    }
});
var u = this || self;

function v(a, b) {
    a = a.split(".");
    b = b || u;
    for (var c = 0; c < a.length; c++)
        if (b = b[a[c]], null == b) return null;
    return b
}

function ha() {}

function ia(a) {
    var b = typeof a;
    return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
}

function ja(a, b, c) {
    return a.call.apply(a.bind, arguments)
}

function ka(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var e = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(e, d);
            return a.apply(b, e)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
}

function la(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? la = ja : la = ka;
    return la.apply(null, arguments)
}

function w(a, b) {
    a = a.split(".");
    var c = u;
    a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());) a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
}

function ma(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.Fa = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.nb = function(d, e, f) {
        for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
        return b.prototype[e].apply(d, g)
    }
};

function na(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, na);
    else {
        const c = Error().stack;
        c && (this.stack = c)
    }
    a && (this.message = String(a));
    void 0 !== b && (this.ra = b)
}
ma(na, Error);
na.prototype.name = "CustomError";

function oa(a, b) {
    Array.prototype.forEach.call(a, b, void 0)
}

function pa(a, b) {
    return Array.prototype.map.call(a, b, void 0)
}

function qa(a, b) {
    for (let d = 1; d < arguments.length; d++) {
        const e = arguments[d];
        var c = ia(e);
        if ("array" == c || "object" == c && "number" == typeof e.length) {
            c = a.length || 0;
            const f = e.length || 0;
            a.length = c + f;
            for (let g = 0; g < f; g++) a[c + g] = e[g]
        } else a.push(e)
    }
};

function ra(a) {
    for (const b in a) return !1;
    return !0
}

function sa(a) {
    if (!a || "object" !== typeof a) return a;
    if ("function" === typeof a.clone) return a.clone();
    if ("undefined" !== typeof Map && a instanceof Map) return new Map(a);
    if ("undefined" !== typeof Set && a instanceof Set) return new Set(a);
    const b = Array.isArray(a) ? [] : "function" !== typeof ArrayBuffer || "function" !== typeof ArrayBuffer.isView || !ArrayBuffer.isView(a) || a instanceof DataView ? {} : new a.constructor(a.length);
    for (const c in a) b[c] = sa(a[c]);
    return b
}
const ta = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

function ua(a, b) {
    let c, d;
    for (let e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (let f = 0; f < ta.length; f++) c = ta[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};

function va() {}

function wa(a) {
    return new va(xa, a)
}
var xa = {};
wa("");
var ya = String.prototype.trim ? function(a) {
    return a.trim()
} : function(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
};

function za() {
    var a = u.navigator;
    return a && (a = a.userAgent) ? a : ""
}

function y(a) {
    return -1 != za().indexOf(a)
};

function Aa() {
    return (y("Chrome") || y("CriOS")) && !y("Edge") || y("Silk")
};
var A = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

function Ba(a) {
    return a ? decodeURI(a) : a
}

function Ca(a, b, c) {
    if (Array.isArray(b))
        for (var d = 0; d < b.length; d++) Ca(a, String(b[d]), c);
    else null != b && c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))))
}

function Da(a) {
    var b = [],
        c;
    for (c in a) Ca(c, a[c], b);
    return b.join("&")
};

function Ea(a, b) {
    return Error(`Invalid wire type: ${a} (at position ${b})`)
}

function Ga() {
    return Error("Failed to read varint, encoding is invalid.")
};

function Ha() {
    throw Error("Invalid UTF8");
}

function Ia(a, b) {
    b = String.fromCharCode.apply(null, b);
    return null == a ? b : a + b
}
let Ja;
const Ka = "undefined" !== typeof TextDecoder;
!y("Android") || Aa();
Aa();
var La = y("Safari") && !(Aa() || y("Coast") || y("Opera") || y("Edge") || y("Edg/") || y("OPR") || y("Firefox") || y("FxiOS") || y("Silk") || y("Android")) && !(y("iPhone") && !y("iPod") && !y("iPad") || y("iPad") || y("iPod"));
var Ma = {},
    Na = null;

function Oa(a, b) {
    void 0 === b && (b = 0);
    Pa();
    b = Ma[b];
    const c = Array(Math.floor(a.length / 3)),
        d = b[64] || "";
    let e = 0,
        f = 0;
    for (; e < a.length - 2; e += 3) {
        var g = a[e],
            h = a[e + 1],
            k = a[e + 2],
            l = b[g >> 2];
        g = b[(g & 3) << 4 | h >> 4];
        h = b[(h & 15) << 2 | k >> 6];
        k = b[k & 63];
        c[f++] = "" + l + g + h + k
    }
    l = 0;
    k = d;
    switch (a.length - e) {
        case 2:
            l = a[e + 1], k = b[(l & 15) << 2] || d;
        case 1:
            a = a[e], c[f] = "" + b[a >> 2] + b[(a & 3) << 4 | l >> 4] + k + d
    }
    return c.join("")
}

function Qa(a) {
    var b = a.length,
        c = 3 * b / 4;
    c % 3 ? c = Math.floor(c) : -1 != "=.".indexOf(a[b - 1]) && (c = -1 != "=.".indexOf(a[b - 2]) ? c - 2 : c - 1);
    var d = new Uint8Array(c),
        e = 0;
    Ra(a, function(f) {
        d[e++] = f
    });
    return e !== c ? d.subarray(0, e) : d
}

function Ra(a, b) {
    function c(k) {
        for (; d < a.length;) {
            var l = a.charAt(d++),
                m = Na[l];
            if (null != m) return m;
            if (!/^[\s\xa0]*$/.test(l)) throw Error("Unknown base64 encoding at char: " + l);
        }
        return k
    }
    Pa();
    for (var d = 0;;) {
        var e = c(-1),
            f = c(0),
            g = c(64),
            h = c(64);
        if (64 === h && -1 === e) break;
        b(e << 2 | f >> 4);
        64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h))
    }
}

function Pa() {
    if (!Na) {
        Na = {};
        for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
            var d = a.concat(b[c].split(""));
            Ma[c] = d;
            for (var e = 0; e < d.length; e++) {
                var f = d[e];
                void 0 === Na[f] && (Na[f] = e)
            }
        }
    }
};
var Sa = "function" === typeof Uint8Array;

function Ta(a) {
    return Sa && null != a && a instanceof Uint8Array
}
let Ua;
var Va = class {
    constructor(a) {
        this.K = a;
        if (null !== a && 0 === a.length) throw Error("ByteString should be constructed with non-empty values");
    }
    isEmpty() {
        return null == this.K
    }
};
const Wa = "function" === typeof Uint8Array.prototype.slice;

function Xa(a, b) {
    if (a.constructor === Uint8Array) return a;
    if (a.constructor === ArrayBuffer) return new Uint8Array(a);
    if (a.constructor === Array) return new Uint8Array(a);
    if (a.constructor === String) return Qa(a);
    if (a.constructor === Va) {
        if (!b && (b = a.K) && b.constructor === Uint8Array) return b;
        if (a.isEmpty()) a = Ua || (Ua = new Uint8Array(0));
        else {
            b = Uint8Array;
            var c = a.K;
            c = null == c || Ta(c) ? c : "string" === typeof c ? Qa(c) : null;
            a = new b(a.K = c)
        }
        return a
    }
    if (a instanceof Uint8Array) return new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
    throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, or Array of numbers");
};

function Ya(a, b) {
    a.j = Xa(b, a.J);
    a.l = 0;
    a.i = a.j.length;
    a.h = a.l
}

function Za(a) {
    if (a.h > a.i) throw Error(`Tried to read past the end of the data ${a.h} > ${a.i}`);
}

function $a(a) {
    const b = a.j;
    let c = b[a.h + 0],
        d = c & 127;
    if (128 > c) return a.h += 1, Za(a), d;
    c = b[a.h + 1];
    d |= (c & 127) << 7;
    if (128 > c) return a.h += 2, Za(a), d;
    c = b[a.h + 2];
    d |= (c & 127) << 14;
    if (128 > c) return a.h += 3, Za(a), d;
    c = b[a.h + 3];
    d |= (c & 127) << 21;
    if (128 > c) return a.h += 4, Za(a), d;
    c = b[a.h + 4];
    a.h += 5;
    d |= (c & 15) << 28;
    if (128 > c) return Za(a), d;
    if (128 <= b[a.h++] && 128 <= b[a.h++] && 128 <= b[a.h++] && 128 <= b[a.h++] && 128 <= b[a.h++]) throw Ga();
    Za(a);
    return d
}
var ab = class {
        constructor(a, {
            J: b = !1
        } = {}) {
            this.j = null;
            this.h = this.i = this.l = 0;
            this.J = b;
            a && Ya(this, a)
        }
        clear() {
            this.j = null;
            this.h = this.i = this.l = 0;
            this.J = !1
        }
        reset() {
            this.h = this.l
        }
        advance(a) {
            this.h += a;
            Za(this)
        }
    },
    bb = [];

function cb(a) {
    var b = a.h;
    if (b.h == b.i) return !1;
    a.l = a.h.h;
    var c = $a(a.h) >>> 0;
    b = c >>> 3;
    c &= 7;
    if (!(0 <= c && 5 >= c)) throw Ea(c, a.l);
    if (1 > b) throw Error(`Invalid field number: ${b} (at position ${a.l})`);
    a.j = b;
    a.i = c;
    return !0
}

function db(a) {
    switch (a.i) {
        case 0:
            if (0 != a.i) db(a);
            else a: {
                a = a.h;
                var b = a.h;
                const c = b + 10;
                for (; b < c;)
                    if (0 === (a.j[b++] & 128)) {
                        a.h = b;
                        Za(a);
                        break a
                    }
                throw Ga();
            }
            break;
        case 1:
            a.h.advance(8);
            break;
        case 2:
            2 != a.i ? db(a) : (b = $a(a.h) >>> 0, a.h.advance(b));
            break;
        case 5:
            a.h.advance(4);
            break;
        case 3:
            b = a.j;
            do {
                if (!cb(a)) throw Error("Unmatched start-group tag: stream EOF");
                if (4 == a.i) {
                    if (a.j != b) throw Error("Unmatched end-group tag");
                    break
                }
                db(a)
            } while (1);
            break;
        default:
            throw Ea(a.i, a.l);
    }
}
var eb = class {
        constructor(a) {
            var {
                J: b = !1,
                ja: c = !1
            } = {};
            this.m = {
                J: b
            };
            this.ja = c;
            var d = this.m;
            if (bb.length) {
                const e = bb.pop();
                d && (e.J = d.J);
                a && Ya(e, a);
                a = e
            } else a = new ab(a, d);
            this.h = a;
            this.l = this.h.h;
            this.i = this.j = -1
        }
        reset() {
            this.h.reset();
            this.l = this.h.h;
            this.i = this.j = -1
        }
        advance(a) {
            this.h.advance(a)
        }
    },
    fb = [];
const gb = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol(void 0) : void 0;

function hb(a, b) {
    Object.isFrozen(a) || (gb ? a[gb] |= b : void 0 !== a.S ? a.S |= b : Object.defineProperties(a, {
        S: {
            value: b,
            configurable: !0,
            writable: !0,
            enumerable: !1
        }
    }))
}

function ib(a) {
    let b;
    gb ? b = a[gb] : b = a.S;
    return null == b ? 0 : b
}

function jb(a) {
    return Array.isArray(a) ? !!(ib(a) & 1) : !1
}

function kb(a) {
    hb(a, 1);
    return a
}

function lb(a) {
    return Array.isArray(a) ? !!(ib(a) & 2) : !1
}

function mb(a) {
    if (!Array.isArray(a)) throw Error("cannot mark non-array as immutable");
    hb(a, 2)
};

function nb(a) {
    return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
}
let ob;
var pb = Object.freeze(kb([]));

function qb(a) {
    if (lb(a.o)) throw Error("Cannot mutate an immutable Message");
}
var rb = "undefined" != typeof Symbol && "undefined" != typeof Symbol.hasInstance;

function sb(a) {
    return {
        value: a,
        configurable: !1,
        writable: !1,
        enumerable: !1
    }
};

function B(a, b, c = !1) {
    return -1 === b ? null : b >= a.l ? a.i ? a.i[b] : void 0 : c && a.i && (c = a.i[b], null != c) ? c : a.o[b + a.j]
}

function C(a, b, c, d = !1, e = !1) {
    e || qb(a);
    b < a.l && !d ? a.o[b + a.j] = c : (a.i || (a.i = a.o[a.l + a.j] = {}))[b] = c;
    return a
}

function tb(a, b, c = !0, d = !1) {
    let e = B(a, b, d);
    null == e && (e = pb);
    if (lb(a.o)) c && (mb(e), Object.freeze(e));
    else if (e === pb || lb(e)) e = kb(e.slice()), C(a, b, e, d);
    return e
}

function ub(a, b, c, d) {
    qb(a);
    (c = vb(a, c)) && c !== b && null != d && (a.h && c in a.h && (a.h[c] = void 0), C(a, c, void 0));
    return C(a, b, d)
}

function vb(a, b) {
    let c = 0;
    for (let d = 0; d < b.length; d++) {
        const e = b[d];
        null != B(a, e) && (0 !== c && C(a, c, void 0, !1, !0), c = e)
    }
    return c
}

function wb(a, b, c, d, e = !1) {
    if (-1 === c) return null;
    a.h || (a.h = {});
    const f = a.h[c];
    if (f) return f;
    e = B(a, c, e);
    if (null == e && !d) return f;
    b = new b(e);
    lb(a.o) && mb(b.o);
    return a.h[c] = b
}

function xb(a, b, c, d = !1) {
    a.h || (a.h = {});
    var e = lb(a.o);
    let f = a.h[c];
    if (!f) {
        d = tb(a, c, !0, d);
        f = [];
        e = e || lb(d);
        for (let g = 0; g < d.length; g++) f[g] = new b(d[g]), e && mb(f[g].o);
        e && (mb(f), Object.freeze(f));
        a.h[c] = f
    }
    return f
}

function D(a, b, c, d = !1) {
    qb(a);
    a.h || (a.h = {});
    let e = c ? c.o : c;
    a.h[b] = c;
    return C(a, b, e, d)
}

function E(a, b, c, d) {
    qb(a);
    a.h || (a.h = {});
    let e = d ? d.o : d;
    a.h[b] = d;
    ub(a, b, c, e)
}

function yb(a, b, c, d, e) {
    qb(a);
    const f = xb(a, c, b, !1);
    c = d ? d : new c;
    a = tb(a, b);
    void 0 != e ? (f.splice(e, 0, c), a.splice(e, 0, c.o)) : (f.push(c), a.push(c.o));
    return c
}

function zb(a, b, c, d) {
    yb(a, b, c, d, void 0)
}

function Ab(a, b) {
    a = B(a, b);
    return null == a ? "" : a
};

function Bb(a) {
    switch (typeof a) {
        case "number":
            return isFinite(a) ? a : String(a);
        case "object":
            if (a && !Array.isArray(a)) {
                if (Ta(a)) return Oa(a);
                if (a instanceof Va) {
                    if (a.isEmpty()) a = "";
                    else {
                        var b = a.K;
                        b = null == b || "string" === typeof b ? b : Sa && b instanceof Uint8Array ? Oa(b) : null;
                        a = a.K = b
                    }
                    return a
                }
            }
    }
    return a
};

function Cb(a, b = Db) {
    return Eb(a, b)
}

function Fb(a, b) {
    if (null != a) {
        if (Array.isArray(a)) a = Eb(a, b);
        else if (nb(a)) {
            const c = {};
            for (let d in a) c[d] = Fb(a[d], b);
            a = c
        } else a = b(a);
        return a
    }
}

function Eb(a, b) {
    const c = a.slice();
    for (let d = 0; d < c.length; d++) c[d] = Fb(c[d], b);
    jb(a) && kb(c);
    return c
}

function Gb(a) {
    if (a && "object" == typeof a && a.toJSON) return a.toJSON();
    a = Bb(a);
    return Array.isArray(a) ? Cb(a, Gb) : a
}

function Db(a) {
    return Ta(a) ? new Uint8Array(a) : a
};

function Hb(a) {
    u.setTimeout(() => {
        throw a;
    }, 0)
};

function Ib(a) {
    ob = !0;
    try {
        return JSON.stringify(a.toJSON(), Jb)
    } finally {
        ob = !1
    }
}
var Nb = class {
    constructor(a, b, c) {
        a || (a = Kb);
        Kb = null;
        var d = this.constructor.h;
        a || (a = d ? [d] : []);
        this.j = (d ? 0 : -1) - (this.constructor.i || 0);
        this.h = void 0;
        this.o = a;
        a: {
            d = this.o.length;a = d - 1;
            if (d && (d = this.o[a], nb(d))) {
                this.l = a - this.j;
                this.i = d;
                break a
            }
            void 0 !== b && -1 < b ? (this.l = Math.max(b, a + 1 - this.j), this.i = void 0) : this.l = Number.MAX_VALUE
        }
        if (c)
            for (b = 0; b < c.length; b++)
                if (a = c[b], a < this.l) a += this.j, (d = this.o[a]) ? Array.isArray(d) && kb(d) : this.o[a] = pb;
                else {
                    d = this.i || (this.i = this.o[this.l + this.j] = {});
                    let e = d[a];
                    e ? Array.isArray(e) &&
                        kb(e) : d[a] = pb
                }
    }
    toJSON() {
        const a = Lb(this.o);
        return ob ? a : Cb(a, Gb)
    }
    clone() {
        var a = Cb(this.o);
        Kb = a;
        a = new this.constructor(a);
        Kb = null;
        Mb(a, this);
        return a
    }
};

function Jb(a, b) {
    return Bb(b)
}

function Lb(a) {
    let b, c = a.length,
        d = !1;
    for (let g = a.length; g--;) {
        let h = a[g];
        if (Array.isArray(h)) {
            var e = h;
            Array.isArray(h) && jb(h) && !h.length ? h = null : h = Lb(h);
            h != e && (d = !0)
        } else if (g === a.length - 1 && nb(h)) {
            a: {
                var f = h;e = {};
                let k = !1;
                for (let l in f) {
                    let m = f[l];
                    if (Array.isArray(m)) {
                        let p = m;
                        Array.isArray(m) && jb(m) && !m.length ? m = null : m = Lb(m);
                        m != p && (k = !0)
                    }
                    null != m ? e[l] = m : k = !0
                }
                if (k) {
                    for (let l in e) {
                        f = e;
                        break a
                    }
                    f = null
                }
            }
            f != h && (d = !0);c--;
            continue
        }
        null == h && c == g + 1 ? (d = !0, c--) : d && (b || (b = a.slice(0, c)), b[g] = h)
    }
    if (!d) return a;
    b || (b = a.slice(0, c));
    f && b.push(f);
    return b
}

function Mb(a, b) {
    b.m && (a.m = b.m.slice());
    const c = b.h;
    if (c) {
        b = b.i;
        for (let f in c) {
            const g = c[f];
            if (g) {
                var d = !(!b || !b[f]),
                    e = +f;
                if (Array.isArray(g)) {
                    if (g.length)
                        for (d = xb(a, g[0].constructor, e, d), e = 0; e < Math.min(d.length, g.length); e++) Mb(d[e], g[e])
                } else(d = wb(a, g.constructor, e, void 0, d)) && Mb(d, g)
            }
        }
    }
}
let Kb;
var Ob = class extends Nb {};
const Pb = () => {
    Object.defineProperties(Ob, {
        [Symbol.hasInstance]: sb(() => {
            throw Error("Cannot perform instanceof checks for MutableMessage");
        })
    })
};
rb && Pb();
const Qb = Symbol();

function Rb(a, b, c) {
    return a[Qb] || (a[Qb] = (d, e) => b(d, e, c))
}

function Sb(a) {
    let b = a[Qb];
    if (!b) {
        const c = Tb(a);
        b = (d, e) => Ub(d, e, c);
        a[Qb] = b
    }
    return b
}

function Vb(a) {
    var b = a.ob;
    if (b) return Sb(b);
    if (b = a.vb) return Rb(a.va.h, b, a.ub)
}

function Wb(a) {
    const b = Vb(a),
        c = a.va,
        d = a.Ab.V;
    return b ? (e, f) => d(e, f, c, b) : (e, f) => d(e, f, c)
}
const Xb = Symbol();

function Yb(a, b) {
    a[0] = b
}

function Zb(a, b, c, d) {
    const e = c.V;
    a[b] = d ? (f, g, h) => e(f, g, h, d) : e
}

function $b(a, b, c, d, e, f) {
    const g = c.V,
        h = Sb(e);
    a[b] = (k, l, m) => g(k, l, m, d, h, f)
}

function ac(a, b, c, d, e, f, g) {
    const h = c.V,
        k = Rb(d, e, f);
    a[b] = (l, m, p) => h(l, m, p, d, k, g)
}

function Tb(a) {
    var b = a[Xb];
    if (!b) {
        b = a[Xb] = {};
        var c = Yb,
            d = Zb,
            e = $b,
            f = ac;
        a = a();
        let h = 0;
        a.length && "number" !== typeof a[0] && (c(b, a[0]), h++);
        for (; h < a.length;) {
            c = a[h++];
            for (var g = h + 1; g < a.length && "number" !== typeof a[g];) g++;
            const k = a[h++];
            g -= h;
            switch (g) {
                case 0:
                    d(b, c, k);
                    break;
                case 1:
                    d(b, c, k, a[h++]);
                    break;
                case 2:
                    e(b, c, k, a[h++], a[h++]);
                    break;
                case 3:
                    g = a[h++];
                    const l = a[h++],
                        m = a[h++];
                    Array.isArray(m) ? e(b, c, k, g, l, m) : f(b, c, k, g, l, m);
                    break;
                case 4:
                    f(b, c, k, a[h++], a[h++], a[h++], a[h++]);
                    break;
                default:
                    throw Error("unexpected number of binary field arguments: " +
                        g);
            }
        }
    }
    return b
}

function Ub(a, b, c) {
    for (; cb(b) && 4 != b.i;) {
        var d = b.j,
            e = c[d];
        if (!e) {
            var f = c[0];
            f && (f = f[d]) && (e = c[d] = Wb(f))
        }
        if (!e || !e(b, a, d)) {
            e = b;
            d = a;
            var g = e.l;
            db(e);
            e.ja || (f = e.h.j, e = e.h.h, e = g === e ? Ua || (Ua = new Uint8Array(0)) : Wa ? f.slice(g, e) : new Uint8Array(f.subarray(g, e)), (f = d.m) ? f.push(e) : d.m = [e])
        }
    }
    return a
}
var dc = a => {
    var b = bc,
        c = cc;
    if (fb.length) {
        const e = fb.pop();
        if (a) {
            var d = e;
            Ya(d.h, a);
            d.j = -1;
            d.i = -1
        }
        a = e
    } else a = new eb(a);
    try {
        return Ub(new b, a, Tb(c))
    } finally {
        a.h.clear(), a.j = -1, a.i = -1, 100 > fb.length && fb.push(a)
    }
};

function ec(a, b) {
    return {
        V: a,
        Gb: b
    }
}
var fc = ec(function(a, b, c) {
        if (2 !== a.i) return !1;
        var d = $a(a.h) >>> 0;
        a = a.h;
        var e = a.h;
        a.h += d;
        Za(a);
        a = a.j;
        var f;
        if (Ka)(f = Ja) || (f = Ja = new TextDecoder("utf-8", {
            fatal: !0
        })), f = f.decode(a.subarray(e, e + d));
        else {
            d = e + d;
            const h = [];
            let k = null;
            let l, m;
            for (; e < d;) {
                var g = a[e++];
                128 > g ? h.push(g) : 224 > g ? e >= d ? Ha(h) : (l = a[e++], 194 > g || 128 !== (l & 192) ? (e--, Ha(h)) : h.push((g & 31) << 6 | l & 63)) : 240 > g ? e >= d - 1 ? Ha(h) : (l = a[e++], 128 !== (l & 192) || 224 === g && 160 > l || 237 === g && 160 <= l || 128 !== ((f = a[e++]) & 192) ? (e--, Ha(h)) : h.push((g & 15) << 12 | (l & 63) << 6 | f & 63)) :
                    244 >= g ? e >= d - 2 ? Ha(h) : (l = a[e++], 128 !== (l & 192) || 0 !== (g << 28) + (l - 144) >> 30 || 128 !== ((f = a[e++]) & 192) || 128 !== ((m = a[e++]) & 192) ? (e--, Ha(h)) : (g = (g & 7) << 18 | (l & 63) << 12 | (f & 63) << 6 | m & 63, g -= 65536, h.push((g >> 10 & 1023) + 55296, (g & 1023) + 56320))) : Ha(h);
                8192 <= h.length && (k = Ia(k, h), h.length = 0)
            }
            f = Ia(k, h)
        }
        C(b, c, f);
        return !0
    }, function(a, b, c) {
        a.i(c, B(b, c))
    }),
    gc = ec(function(a, b, c, d, e) {
        if (2 !== a.i) return !1;
        b = yb(b, c, d);
        c = a.h.i;
        d = $a(a.h) >>> 0;
        const f = a.h.h + d;
        let g = f - c;
        0 >= g && (a.h.i = f, e(b, a), g = f - a.h.h);
        if (g) throw Error("Message parsing ended unexpectedly. Expected to read " + `${d} bytes, instead read ${d-g} bytes, either the ` + "data ended unexpectedly or the message misreported its own length");
        a.h.h = f;
        a.h.i = c;
        return !0
    }, function(a, b, c, d, e) {
        a.h(c, xb(b, d, c), e)
    });
class hc {
    constructor() {
        var a = ic,
            b = jc;
        this.fieldName = {
            sb: 0
        };
        this.h = a;
        this.isRepeated = 0;
        this.i = b
    }
};

function jc(a, b) {
    if (this.isRepeated) {
        qb(a);
        let c;
        if (b) {
            c = kb([]);
            for (let d = 0; d < b.length; d++) c[d] = b[d].o;
            a.h || (a.h = {});
            a.h[406606992] = b
        } else a.h && (a.h[406606992] = void 0), c = pb;
        a = C(a, 406606992, c, !0)
    } else a = D(a, 406606992, b, !0);
    return a
};
class F extends Ob {}
const kc = () => {
    Object.defineProperties(F, {
        [Symbol.hasInstance]: sb(Object[Symbol.hasInstance])
    })
};
rb && kc();
wa("csi.gstatic.com");
wa("googleads.g.doubleclick.net");
wa("partner.googleadservices.com");
wa("pubads.g.doubleclick.net");
wa("securepubads.g.doubleclick.net");
wa("tpc.googlesyndication.com");
/*

 SPDX-License-Identifier: Apache-2.0
*/
function lc(a) {
    if (!a) return "";
    if (/^about:(?:blank|srcdoc)$/.test(a)) return window.origin || "";
    a = a.split("#")[0].split("?")[0];
    a = a.toLowerCase();
    0 == a.indexOf("//") && (a = window.location.protocol + a);
    /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
    var b = a.substring(a.indexOf("://") + 3),
        c = b.indexOf("/"); - 1 != c && (b = b.substring(0, c));
    c = a.substring(0, a.indexOf("://"));
    if (!c) throw Error("URI is missing protocol: " + a);
    if ("http" !== c && "https" !== c && "chrome-extension" !== c && "moz-extension" !== c && "file" !== c && "android-app" !==
        c && "chrome-search" !== c && "chrome-untrusted" !== c && "chrome" !== c && "app" !== c && "devtools" !== c) throw Error("Invalid URI scheme in origin: " + c);
    a = "";
    var d = b.indexOf(":");
    if (-1 != d) {
        var e = b.substring(d + 1);
        b = b.substring(0, d);
        if ("http" === c && "80" !== e || "https" === c && "443" !== e) a = ":" + e
    }
    return c + "://" + b + a
};
var mc = "client_dev_mss_url client_dev_regex_map client_dev_root_url client_rollout_override expflag jsfeat jsmode mods".split(" ");

function nc() {
    function a() {
        e[0] = 1732584193;
        e[1] = 4023233417;
        e[2] = 2562383102;
        e[3] = 271733878;
        e[4] = 3285377520;
        m = l = 0
    }

    function b(p) {
        for (var t = g, n = 0; 64 > n; n += 4) t[n / 4] = p[n] << 24 | p[n + 1] << 16 | p[n + 2] << 8 | p[n + 3];
        for (n = 16; 80 > n; n++) p = t[n - 3] ^ t[n - 8] ^ t[n - 14] ^ t[n - 16], t[n] = (p << 1 | p >>> 31) & 4294967295;
        p = e[0];
        var x = e[1],
            z = e[2],
            H = e[3],
            Fa = e[4];
        for (n = 0; 80 > n; n++) {
            if (40 > n)
                if (20 > n) {
                    var I = H ^ x & (z ^ H);
                    var Z = 1518500249
                } else I = x ^ z ^ H, Z = 1859775393;
            else 60 > n ? (I = x & z | H & (x | z), Z = 2400959708) : (I = x ^ z ^ H, Z = 3395469782);
            I = ((p << 5 | p >>> 27) & 4294967295) + I + Fa + Z + t[n] & 4294967295;
            Fa = H;
            H = z;
            z = (x << 30 | x >>> 2) & 4294967295;
            x = p;
            p = I
        }
        e[0] = e[0] + p & 4294967295;
        e[1] = e[1] + x & 4294967295;
        e[2] = e[2] + z & 4294967295;
        e[3] = e[3] + H & 4294967295;
        e[4] = e[4] + Fa & 4294967295
    }

    function c(p, t) {
        if ("string" === typeof p) {
            p = unescape(encodeURIComponent(p));
            for (var n = [], x = 0, z = p.length; x < z; ++x) n.push(p.charCodeAt(x));
            p = n
        }
        t || (t = p.length);
        n = 0;
        if (0 == l)
            for (; n + 64 < t;) b(p.slice(n, n + 64)), n += 64, m += 64;
        for (; n < t;)
            if (f[l++] = p[n++], m++, 64 == l)
                for (l = 0, b(f); n + 64 < t;) b(p.slice(n, n + 64)), n += 64, m += 64
    }

    function d() {
        var p = [],
            t = 8 * m;
        56 > l ? c(h, 56 - l) : c(h, 64 - (l - 56));
        for (var n = 63; 56 <= n; n--) f[n] = t & 255, t >>>= 8;
        b(f);
        for (n = t = 0; 5 > n; n++)
            for (var x = 24; 0 <= x; x -= 8) p[t++] = e[n] >> x & 255;
        return p
    }
    for (var e = [], f = [], g = [], h = [128], k = 1; 64 > k; ++k) h[k] = 0;
    var l, m;
    a();
    return {
        reset: a,
        update: c,
        digest: d,
        sa: function() {
            for (var p = d(), t = "", n = 0; n < p.length; n++) t += "0123456789ABCDEF".charAt(Math.floor(p[n] / 16)) + "0123456789ABCDEF".charAt(p[n] % 16);
            return t
        }
    }
};

function oc(a, b, c) {
    var d = String(u.location.href);
    return d && a && b ? [b, pc(lc(d), a, c || null)].join(" ") : null
}

function pc(a, b, c) {
    var d = [],
        e = [];
    if (1 == (Array.isArray(c) ? 2 : 1)) return e = [b, a], oa(d, function(h) {
        e.push(h)
    }), qc(e.join(" "));
    var f = [],
        g = [];
    oa(c, function(h) {
        g.push(h.key);
        f.push(h.value)
    });
    c = Math.floor((new Date).getTime() / 1E3);
    e = 0 == f.length ? [c, b, a] : [f.join(":"), c, b, a];
    oa(d, function(h) {
        e.push(h)
    });
    a = qc(e.join(" "));
    a = [c, a];
    0 == g.length || a.push(g.join(""));
    return a.join("_")
}

function qc(a) {
    var b = nc();
    b.update(a);
    return b.sa().toLowerCase()
};
const rc = {};

function sc() {
    this.h = document || {
        cookie: ""
    }
}
q = sc.prototype;
q.isEnabled = function() {
    if (!u.navigator.cookieEnabled) return !1;
    if (!this.isEmpty()) return !0;
    this.set("TESTCOOKIESENABLED", "1", {
        na: 60
    });
    if ("1" !== this.get("TESTCOOKIESENABLED")) return !1;
    this.remove("TESTCOOKIESENABLED");
    return !0
};
q.set = function(a, b, c) {
    let d;
    var e = !1;
    let f;
    if ("object" === typeof c) {
        f = c.Eb;
        e = c.Fb || !1;
        d = c.domain || void 0;
        var g = c.path || void 0;
        var h = c.na
    }
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    void 0 === h && (h = -1);
    c = d ? ";domain=" + d : "";
    g = g ? ";path=" + g : "";
    e = e ? ";secure" : "";
    h = 0 > h ? "" : 0 == h ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(Date.now() + 1E3 * h)).toUTCString();
    this.h.cookie = a + "=" + b + c + g + h + e + (null != f ? ";samesite=" +
        f : "")
};
q.get = function(a, b) {
    const c = a + "=",
        d = (this.h.cookie || "").split(";");
    for (let e = 0, f; e < d.length; e++) {
        f = ya(d[e]);
        if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
        if (f == a) return ""
    }
    return b
};
q.remove = function(a, b, c) {
    const d = void 0 !== this.get(a);
    this.set(a, "", {
        na: 0,
        path: b,
        domain: c
    });
    return d
};
q.isEmpty = function() {
    return !this.h.cookie
};
q.clear = function() {
    var a = (this.h.cookie || "").split(";");
    const b = [],
        c = [];
    let d, e;
    for (let f = 0; f < a.length; f++) e = ya(a[f]), d = e.indexOf("="), -1 == d ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
    for (a = b.length - 1; 0 <= a; a--) this.remove(b[a])
};

function tc() {
    return !!rc.FPA_SAMESITE_PHASE2_MOD || !1
}

function uc(a, b, c, d) {
    (a = u[a]) || (a = (new sc).get(b));
    return a ? oc(a, c, d) : null
}

function vc() {
    var a = [],
        b = lc(String(u.location.href));
    const c = [];
    var d = u.__SAPISID || u.__APISID || u.__3PSAPISID || u.__OVERRIDE_SID;
    tc() && (d = d || u.__1PSAPISID);
    if (d) var e = !0;
    else e = new sc, d = e.get("SAPISID") || e.get("APISID") || e.get("__Secure-3PAPISID") || e.get("SID"), tc() && (d = d || e.get("__Secure-1PAPISID")), e = !!d;
    e && (d = (e = b = 0 == b.indexOf("https:") || 0 == b.indexOf("chrome-extension:") || 0 == b.indexOf("moz-extension:")) ? u.__SAPISID : u.__APISID, d || (d = new sc, d = d.get(e ? "SAPISID" : "APISID") || d.get("__Secure-3PAPISID")),
        (e = d ? oc(d, e ? "SAPISIDHASH" : "APISIDHASH", a) : null) && c.push(e), b && tc() && ((b = uc("__1PSAPISID", "__Secure-1PAPISID", "SAPISID1PHASH", a)) && c.push(b), (a = uc("__3PSAPISID", "__Secure-3PAPISID", "SAPISID3PHASH", a)) && c.push(a)));
    return 0 == c.length ? null : c.join(" ")
};

function wc(a) {
    rb && Object.defineProperty(a, Symbol.hasInstance, sb(Object[Symbol.hasInstance]))
};

function xc() {
    this.j = this.j;
    this.l = this.l
}
xc.prototype.j = !1;
xc.prototype.dispose = function() {
    this.j || (this.j = !0, this.X())
};
xc.prototype.X = function() {
    if (this.l)
        for (; this.l.length;) this.l.shift()()
};

function yc(a) {
    var b = v("window.location.href");
    null == a && (a = 'Unknown Error of type "null/undefined"');
    if ("string" === typeof a) return {
        message: a,
        name: "Unknown error",
        lineNumber: "Not available",
        fileName: b,
        stack: "Not available"
    };
    var c = !1;
    try {
        var d = a.lineNumber || a.line || "Not available"
    } catch (g) {
        d = "Not available", c = !0
    }
    try {
        var e = a.fileName || a.filename || a.sourceURL || u.$googDebugFname || b
    } catch (g) {
        e = "Not available", c = !0
    }
    b = zc(a);
    if (!(!c && a.lineNumber && a.fileName && a.stack && a.message && a.name)) {
        c = a.message;
        if (null ==
            c) {
            if (a.constructor && a.constructor instanceof Function) {
                if (a.constructor.name) c = a.constructor.name;
                else if (c = a.constructor, Ac[c]) c = Ac[c];
                else {
                    c = String(c);
                    if (!Ac[c]) {
                        var f = /function\s+([^\(]+)/m.exec(c);
                        Ac[c] = f ? f[1] : "[Anonymous]"
                    }
                    c = Ac[c]
                }
                c = 'Unknown Error of type "' + c + '"'
            } else c = "Unknown Error of unknown type";
            "function" === typeof a.toString && Object.prototype.toString !== a.toString && (c += ": " + a.toString())
        }
        return {
            message: c,
            name: a.name || "UnknownError",
            lineNumber: d,
            fileName: e,
            stack: b || "Not available"
        }
    }
    a.stack =
        b;
    return {
        message: a.message,
        name: a.name,
        lineNumber: a.lineNumber,
        fileName: a.fileName,
        stack: a.stack
    }
}

function zc(a, b) {
    b || (b = {});
    b[Bc(a)] = !0;
    var c = a.stack || "";
    (a = a.ra) && !b[Bc(a)] && (c += "\nCaused by: ", a.stack && 0 == a.stack.indexOf(a.toString()) || (c += "string" === typeof a ? a : a.message + "\n"), c += zc(a, b));
    return c
}

function Bc(a) {
    var b = "";
    "function" === typeof a.toString && (b = "" + a);
    return b + a.stack
}
var Ac = {};

function Cc(a, b) {
    a.l(b);
    100 > a.i && (a.i++, b.next = a.h, a.h = b)
}
var Dc = class {
    constructor(a, b) {
        this.j = a;
        this.l = b;
        this.i = 0;
        this.h = null
    }
    get() {
        let a;
        0 < this.i ? (this.i--, a = this.h, this.h = a.next, a.next = null) : a = this.j();
        return a
    }
};
class Ec {
    constructor() {
        this.i = this.h = null
    }
    add(a, b) {
        const c = Fc.get();
        c.set(a, b);
        this.i ? this.i.next = c : this.h = c;
        this.i = c
    }
    remove() {
        let a = null;
        this.h && (a = this.h, this.h = this.h.next, this.h || (this.i = null), a.next = null);
        return a
    }
}
var Fc = new Dc(() => new Gc, a => a.reset());
class Gc {
    constructor() {
        this.next = this.scope = this.h = null
    }
    set(a, b) {
        this.h = a;
        this.scope = b;
        this.next = null
    }
    reset() {
        this.next = this.scope = this.h = null
    }
};

function Hc(a, b) {
    Ic || Jc();
    Kc || (Ic(), Kc = !0);
    Lc.add(a, b)
}
var Ic;

function Jc() {
    var a = u.Promise.resolve(void 0);
    Ic = function() {
        a.then(Mc)
    }
}
var Kc = !1,
    Lc = new Ec;

function Mc() {
    for (var a; a = Lc.remove();) {
        try {
            a.h.call(a.scope)
        } catch (b) {
            Hb(b)
        }
        Cc(Fc, a)
    }
    Kc = !1
};
class Nc {
    constructor() {
        this.promise = new Promise((a, b) => {
            this.reject = b
        })
    }
};

function G(a) {
    this.h = 0;
    this.C = void 0;
    this.l = this.i = this.j = null;
    this.m = this.s = !1;
    if (a != ha) try {
        var b = this;
        a.call(void 0, function(c) {
            Oc(b, 2, c)
        }, function(c) {
            Oc(b, 3, c)
        })
    } catch (c) {
        Oc(this, 3, c)
    }
}

function Pc() {
    this.next = this.context = this.onRejected = this.i = this.h = null;
    this.j = !1
}
Pc.prototype.reset = function() {
    this.context = this.onRejected = this.i = this.h = null;
    this.j = !1
};
var Qc = new Dc(function() {
    return new Pc
}, function(a) {
    a.reset()
});

function Rc(a, b, c) {
    var d = Qc.get();
    d.i = a;
    d.onRejected = b;
    d.context = c;
    return d
}

function Sc(a) {
    if (a instanceof G) return a;
    var b = new G(ha);
    Oc(b, 2, a);
    return b
}
G.prototype.then = function(a, b, c) {
    return Tc(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
};
G.prototype.$goog_Thenable = !0;
q = G.prototype;
q.Ia = function(a, b) {
    return Tc(this, null, a, b)
};
q.catch = G.prototype.Ia;
q.cancel = function(a) {
    if (0 == this.h) {
        var b = new Uc(a);
        Hc(function() {
            Vc(this, b)
        }, this)
    }
};

function Vc(a, b) {
    if (0 == a.h)
        if (a.j) {
            var c = a.j;
            if (c.i) {
                for (var d = 0, e = null, f = null, g = c.i; g && (g.j || (d++, g.h == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
                e && (0 == c.h && 1 == d ? Vc(c, b) : (f ? (d = f, d.next == c.l && (c.l = d), d.next = d.next.next) : Wc(c), Xc(c, e, 3, b)))
            }
            a.j = null
        } else Oc(a, 3, b)
}

function Yc(a, b) {
    a.i || 2 != a.h && 3 != a.h || Zc(a);
    a.l ? a.l.next = b : a.i = b;
    a.l = b
}

function Tc(a, b, c, d) {
    var e = Rc(null, null, null);
    e.h = new G(function(f, g) {
        e.i = b ? function(h) {
            try {
                var k = b.call(d, h);
                f(k)
            } catch (l) {
                g(l)
            }
        } : f;
        e.onRejected = c ? function(h) {
            try {
                var k = c.call(d, h);
                void 0 === k && h instanceof Uc ? g(h) : f(k)
            } catch (l) {
                g(l)
            }
        } : g
    });
    e.h.j = a;
    Yc(a, e);
    return e.h
}
q.Ja = function(a) {
    this.h = 0;
    Oc(this, 2, a)
};
q.Ka = function(a) {
    this.h = 0;
    Oc(this, 3, a)
};

function Oc(a, b, c) {
    if (0 == a.h) {
        a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
        a.h = 1;
        a: {
            var d = c,
                e = a.Ja,
                f = a.Ka;
            if (d instanceof G) {
                Yc(d, Rc(e || ha, f || null, a));
                var g = !0
            } else {
                if (d) try {
                    var h = !!d.$goog_Thenable
                } catch (l) {
                    h = !1
                } else h = !1;
                if (h) d.then(e, f, a), g = !0;
                else {
                    h = typeof d;
                    if ("object" == h && null != d || "function" == h) try {
                        var k = d.then;
                        if ("function" === typeof k) {
                            $c(d, k, e, f, a);
                            g = !0;
                            break a
                        }
                    } catch (l) {
                        f.call(a, l);
                        g = !0;
                        break a
                    }
                    g = !1
                }
            }
        }
        g || (a.C = c, a.h = b, a.j = null, Zc(a), 3 != b || c instanceof Uc || ad(a, c))
    }
}

function $c(a, b, c, d, e) {
    function f(k) {
        h || (h = !0, d.call(e, k))
    }

    function g(k) {
        h || (h = !0, c.call(e, k))
    }
    var h = !1;
    try {
        b.call(a, g, f)
    } catch (k) {
        f(k)
    }
}

function Zc(a) {
    a.s || (a.s = !0, Hc(a.ta, a))
}

function Wc(a) {
    var b = null;
    a.i && (b = a.i, a.i = b.next, b.next = null);
    a.i || (a.l = null);
    return b
}
q.ta = function() {
    for (var a; a = Wc(this);) Xc(this, a, this.h, this.C);
    this.s = !1
};

function Xc(a, b, c, d) {
    if (3 == c && b.onRejected && !b.j)
        for (; a && a.m; a = a.j) a.m = !1;
    if (b.h) b.h.j = null, bd(b, c, d);
    else try {
        b.j ? b.i.call(b.context) : bd(b, c, d)
    } catch (e) {
        cd.call(null, e)
    }
    Cc(Qc, b)
}

function bd(a, b, c) {
    2 == b ? a.i.call(a.context, c) : a.onRejected && a.onRejected.call(a.context, c)
}

function ad(a, b) {
    a.m = !0;
    Hc(function() {
        a.m && cd.call(null, b)
    })
}
var cd = Hb;

function Uc(a) {
    na.call(this, a)
}
ma(Uc, na);
Uc.prototype.name = "cancel";

function J(a) {
    xc.call(this);
    this.C = 1;
    this.m = [];
    this.s = 0;
    this.h = [];
    this.i = {};
    this.N = !!a
}
ma(J, xc);
q = J.prototype;
q.subscribe = function(a, b, c) {
    var d = this.i[a];
    d || (d = this.i[a] = []);
    var e = this.C;
    this.h[e] = a;
    this.h[e + 1] = b;
    this.h[e + 2] = c;
    this.C = e + 3;
    d.push(e);
    return e
};
q.fa = function(a) {
    var b = this.h[a];
    if (b) {
        var c = this.i[b];
        if (0 != this.s) this.m.push(a), this.h[a + 1] = ha;
        else {
            if (c) {
                var d = Array.prototype.indexOf.call(c, a, void 0);
                0 <= d && Array.prototype.splice.call(c, d, 1)
            }
            delete this.h[a];
            delete this.h[a + 1];
            delete this.h[a + 2]
        }
    }
    return !!b
};
q.ca = function(a, b) {
    var c = this.i[a];
    if (c) {
        for (var d = Array(arguments.length - 1), e = 1, f = arguments.length; e < f; e++) d[e - 1] = arguments[e];
        if (this.N)
            for (e = 0; e < c.length; e++) {
                var g = c[e];
                dd(this.h[g + 1], this.h[g + 2], d)
            } else {
                this.s++;
                try {
                    for (e = 0, f = c.length; e < f && !this.j; e++) g = c[e], this.h[g + 1].apply(this.h[g + 2], d)
                } finally {
                    if (this.s--, 0 < this.m.length && 0 == this.s)
                        for (; c = this.m.pop();) this.fa(c)
                }
            }
        return 0 != e
    }
    return !1
};

function dd(a, b, c) {
    Hc(function() {
        a.apply(b, c)
    })
}
q.clear = function(a) {
    if (a) {
        var b = this.i[a];
        b && (b.forEach(this.fa, this), delete this.i[a])
    } else this.h.length = 0, this.i = {}
};
q.X = function() {
    J.Fa.X.call(this);
    this.clear();
    this.m.length = 0
};
/*

Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
var ed = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
var gd = class extends F {
        constructor(a) {
            super(a)
        }
        getKey() {
            return B(this, 1)
        }
        Y() {
            return B(this, 2 === vb(this, fd) ? 2 : -1)
        }
        setValue(a) {
            return ub(this, 2, fd, a)
        }
    },
    fd = [2, 3, 4, 5, 6];
var hd = class extends F {
    constructor(a) {
        super(a)
    }
};
var jd = class extends F {
        constructor() {
            super(void 0, -1, id)
        }
        getPlayerType() {
            return B(this, 36)
        }
        setHomeGroupInfo(a) {
            return D(this, 81, a)
        }
    },
    id = [9, 66, 24, 32, 86, 100, 101];
var ld = class extends F {
        constructor() {
            super(void 0, -1, kd)
        }
    },
    kd = [15, 26, 28];
var md = class extends F {
    constructor(a) {
        super(a)
    }
    setToken(a) {
        return C(this, 2, a)
    }
};
var od = class extends F {
        constructor(a) {
            super(a, -1, nd)
        }
        setSafetyMode(a) {
            return C(this, 5, a)
        }
    },
    nd = [12];
var qd = class extends F {
        constructor(a) {
            super(a, -1, pd)
        }
    },
    pd = [12];
var sd = class extends F {
        constructor() {
            super(void 0, -1, rd)
        }
    },
    td = class extends F {
        constructor(a) {
            super(a)
        }
        getKey() {
            return Ab(this, 1)
        }
        Y() {
            return Ab(this, 2)
        }
        setValue(a) {
            return C(this, 2, a)
        }
    },
    rd = [4, 5];
var ud = class extends F {
    constructor() {
        super(void 0)
    }
};
var vd = class extends F {
        constructor() {
            super(void 0)
        }
    },
    wd = [2, 3];
var xd = class extends F {
    constructor() {
        super(void 0)
    }
};
var yd = class extends F {
    constructor() {
        super(void 0)
    }
};
var zd = class extends F {
    constructor() {
        super(void 0)
    }
};
var Bd = class extends F {
        constructor() {
            super(void 0, -1, Ad)
        }
    },
    Ad = [10, 17];
var Cd = class extends F {
    constructor() {
        super(void 0)
    }
};
var Dd = class extends F {
    constructor(a) {
        super(a)
    }
};
var Ed = class extends F {
    constructor() {
        super(void 0)
    }
};
var Fd = {
    fb: 0,
    Pa: 1,
    Va: 2,
    Wa: 4,
    bb: 8,
    Xa: 16,
    Ya: 32,
    eb: 64,
    cb: 128,
    Ra: 256,
    Ta: 512,
    ab: 1024,
    Sa: 2048,
    Ua: 4096,
    Qa: 8192,
    Za: 16384
};

function Gd(a, b) {
    D(a, 1, b)
}
var Hd = class extends F {
    constructor() {
        super(void 0)
    }
    B(a) {
        C(this, 2, a)
    }
};

function Id(a, b) {
    D(a, 1, b)
}
var Jd = class extends F {
    constructor() {
        super(void 0)
    }
};

function Kd(a, b) {
    D(a, 2, b)
}
var Md = class extends F {
        constructor() {
            super(void 0, -1, Ld)
        }
        B(a) {
            C(this, 1, a)
        }
    },
    Ld = [3];
var Nd = class extends F {
    constructor() {
        super(void 0)
    }
    B(a) {
        C(this, 1, a)
    }
};
var Od = class extends F {
    constructor() {
        super(void 0)
    }
    B(a) {
        C(this, 1, a)
    }
};
var Pd = class extends F {
    constructor() {
        super(void 0)
    }
    B(a) {
        C(this, 1, a)
    }
};
var Qd = class extends F {
    constructor() {
        super(void 0)
    }
};
var Rd = class extends F {
    constructor() {
        super(void 0)
    }
};
var K = class extends F {
        constructor(a) {
            super(a, 428)
        }
    },
    Sd = [23, 24, 11, 6, 7, 5, 2, 3, 20, 21, 28, 32, 37, 229, 241, 45, 59, 225, 288, 72, 73, 78, 208, 156, 202, 215, 74, 76, 79, 80, 111, 85, 91, 97, 100, 102, 105, 119, 126, 127, 136, 146, 157, 158, 159, 163, 164, 168, 176, 222, 383, 177, 178, 179, 411, 184, 188, 189, 190, 191, 193, 194, 195, 196, 198, 199, 200, 201, 203, 204, 205, 206, 258, 259, 260, 261, 209, 226, 227, 232, 233, 234, 240, 247, 248, 251, 254, 255, 270, 278, 291, 293, 300, 304, 308, 309, 310, 311, 313, 314, 319, 321, 323, 324, 328, 330, 331, 332, 337, 338, 340, 344, 348, 350, 351, 352, 353, 354, 355,
        356, 357, 358, 361, 363, 364, 368, 369, 370, 373, 374, 375, 378, 380, 381, 388, 389, 403, 412, 413, 414, 415, 416, 417, 418, 419, 420, 423, 424, 425, 426, 427, 117
    ];
var Td = class extends F {
    constructor() {
        super(void 0)
    }
};
var Vd = class extends F {
        constructor() {
            super(void 0)
        }
        setVideoId(a) {
            return ub(this, 1, Ud, a)
        }
        getPlaylistId() {
            return B(this, 2 === vb(this, Ud) ? 2 : -1)
        }
    },
    Ud = [1, 2];
var Xd = class extends F {
        constructor() {
            super(void 0, -1, Wd)
        }
    },
    Wd = [3];
var Yd = ["notification/convert_endpoint_to_url"],
    Zd = ["notification/record_interactions"],
    $d = ["notification_registration/set_registration"];
var ae = class extends F {
    constructor(a) {
        super(a, 1)
    }
};
var ic = class extends F {
        constructor(a) {
            super(a)
        }
    },
    be;
be = new hc;
var ce = class extends ic {};
wc(ce);
var de, ee, fe;
const ge = u.window,
    L = (null === (de = null === ge || void 0 === ge ? void 0 : ge.yt) || void 0 === de ? void 0 : de.config_) || (null === (ee = null === ge || void 0 === ge ? void 0 : ge.ytcfg) || void 0 === ee ? void 0 : ee.data_) || {},
    he = (null === (fe = null === ge || void 0 === ge ? void 0 : ge.ytcfg) || void 0 === fe ? void 0 : fe.obfuscatedData_) || [];
var ie = class extends ae {};
wc(ie);
let je = new ie(he);
const ke = L.EXPERIMENT_FLAGS;
if (!ke || !ke.jspb_i18n_extension) {
    var le = new ce;
    be.i(je, le)
}
w("yt.config_", L);
w("yt.configJspb_", he);

function M(...a) {
    a = arguments;
    1 < a.length ? L[a[0]] = a[1] : 1 === a.length && Object.assign(L, a[0])
}

function N(a, b) {
    return a in L ? L[a] : b
}

function me() {
    return N("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS", void 0)
}

function ne() {
    const a = L.EXPERIMENT_FLAGS;
    return a ? a.web_disable_gel_stp_ecatcher_killswitch : void 0
};

function O(a) {
    a = oe(a);
    return "string" === typeof a && "false" === a ? !1 : !!a
}

function pe(a, b) {
    a = oe(a);
    return void 0 === a && void 0 !== b ? b : Number(a || 0)
}

function qe() {
    return N("EXPERIMENTS_TOKEN", "")
}

function oe(a) {
    const b = N("EXPERIMENTS_FORCED_FLAGS", {});
    return void 0 !== b[a] ? b[a] : N("EXPERIMENT_FLAGS", {})[a]
}

function re() {
    const a = [],
        b = N("EXPERIMENTS_FORCED_FLAGS", {});
    for (var c in b) a.push({
        key: c,
        value: String(b[c])
    });
    c = N("EXPERIMENT_FLAGS", {});
    for (let d in c) d.startsWith("force_") && void 0 === b[d] && a.push({
        key: d,
        value: String(c[d])
    });
    return a
};
let se = 0;
w("ytDomDomGetNextId", v("ytDomDomGetNextId") || (() => ++se));
const te = [];

function ue(a) {
    te.forEach(b => b(a))
}

function ve(a) {
    return a && window.yterr ? function() {
        try {
            return a.apply(this, arguments)
        } catch (b) {
            we(b)
        }
    } : a
}

function we(a) {
    var b = v("yt.logging.errors.log");
    b ? b(a, "ERROR", void 0, void 0, void 0) : (b = N("ERRORS", []), b.push([a, "ERROR", void 0, void 0, void 0]), M("ERRORS", b));
    ue(a)
}

function xe(a) {
    var b = v("yt.logging.errors.log");
    b ? b(a, "WARNING", void 0, void 0, void 0) : (b = N("ERRORS", []), b.push([a, "WARNING", void 0, void 0, void 0]), M("ERRORS", b))
};
w("ytEventsEventsListeners", u.ytEventsEventsListeners || {});
w("ytEventsEventsCounter", u.ytEventsEventsCounter || {
    count: 0
});

function ye(a, b) {
    "function" === typeof a && (a = ve(a));
    return window.setTimeout(a, b)
};

function ze(a, b) {
    Ae(a, 2, b)
}
var Be = class {
    h(a) {
        Ae(a, 1, void 0)
    }
};

function Ae(a, b, c) {
    void 0 !== c && Number.isNaN(Number(c)) && (c = void 0);
    const d = v("yt.scheduler.instance.addJob");
    d ? d(a, b, c) : void 0 === c ? a() : ye(a, c || 0)
}
var Ce = class extends Be {
    start() {
        const a = v("yt.scheduler.instance.start");
        a && a()
    }
};
Ce.h || (Ce.h = new Ce);
var De = Ce.h;

function Ee() {
    const a = v("_lact", window);
    var b;
    null == a ? b = -1 : b = Math.max(Date.now() - a, 0);
    return b
};
const Fe = /^[\w.]*$/,
    Ge = {
        q: !0,
        search_query: !0
    };

function He(a, b) {
    b = a.split(b);
    const c = {};
    for (let f = 0, g = b.length; f < g; f++) {
        const h = b[f].split("=");
        if (1 == h.length && h[0] || 2 == h.length) try {
            const k = Ie(h[0] || ""),
                l = Ie(h[1] || "");
            k in c ? Array.isArray(c[k]) ? qa(c[k], l) : c[k] = [c[k], l] : c[k] = l
        } catch (k) {
            var d = k,
                e = h[0];
            const l = String(He);
            d.args = [{
                key: e,
                value: h[1],
                query: a,
                method: Je == l ? "unchanged" : l
            }];
            Ge.hasOwnProperty(e) || xe(d)
        }
    }
    return c
}
const Je = String(He);

function Ke(a) {
    "?" == a.charAt(0) && (a = a.substr(1));
    return He(a, "&")
}

function Le(a, b, c) {
    var d = a.split("#", 2);
    a = d[0];
    d = 1 < d.length ? "#" + d[1] : "";
    var e = a.split("?", 2);
    a = e[0];
    e = Ke(e[1] || "");
    for (var f in b) !c && null !== e && f in e || (e[f] = b[f]);
    b = a;
    a = Da(e);
    a ? (c = b.indexOf("#"), 0 > c && (c = b.length), f = b.indexOf("?"), 0 > f || f > c ? (f = c, e = "") : e = b.substring(f + 1, c), b = [b.substr(0, f), e, b.substr(c)], c = b[1], b[1] = a ? c ? c + "&" + a : a : c, a = b[0] + (b[1] ? "?" + b[1] : "") + b[2]) : a = b;
    return a + d
}

function Me(a) {
    if (!b) var b = window.location.href;
    const c = a.match(A)[1] || null,
        d = Ba(a.match(A)[3] || null);
    c && d ? (a = a.match(A), b = b.match(A), a = a[3] == b[3] && a[1] == b[1] && a[4] == b[4]) : a = d ? Ba(b.match(A)[3] || null) == d && (Number(b.match(A)[4] || null) || null) == (Number(a.match(A)[4] || null) || null) : !0;
    return a
}

function Ie(a) {
    return a && a.match(Fe) ? a : decodeURIComponent(a.replace(/\+/g, " "))
};
Date.now();
[...mc];
let Ne = !1;

function Oe(a, b) {
    const c = {
        method: b.method || "GET",
        credentials: "same-origin"
    };
    b.headers && (c.headers = b.headers);
    a = Pe(a, b);
    const d = Qe(a, b);
    d && (c.body = d);
    b.withCredentials && (c.credentials = "include");
    const e = b.context || u;
    let f = !1,
        g;
    fetch(a, c).then(h => {
        if (!f) {
            f = !0;
            g && window.clearTimeout(g);
            var k = h.ok,
                l = m => {
                    m = m || {};
                    k ? b.onSuccess && b.onSuccess.call(e, m, h) : b.onError && b.onError.call(e, m, h);
                    b.onFinish && b.onFinish.call(e, m, h)
                };
            "JSON" == (b.format || "JSON") && (k || 400 <= h.status && 500 > h.status) ? h.json().then(l, function() {
                l(null)
            }): l(null)
        }
    }).catch(() => {
        b.onError && b.onError.call(e, {}, {})
    });
    b.onFetchTimeout && 0 < b.timeout && (g = ye(() => {
        f || (f = !0, window.clearTimeout(g), b.onFetchTimeout.call(b.context || u))
    }, b.timeout))
}

function Pe(a, b) {
    b.includeDomain && (a = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "") + a);
    const c = N("XSRF_FIELD_NAME", void 0);
    if (b = b.urlParams) b[c] && delete b[c], a = Le(a, b || {}, !0);
    return a
}

function Qe(a, b) {
    const c = N("XSRF_FIELD_NAME", void 0),
        d = N("XSRF_TOKEN", void 0);
    var e = b.postBody || "",
        f = b.postParams;
    const g = N("XSRF_FIELD_NAME", void 0);
    let h;
    b.headers && (h = b.headers["Content-Type"]);
    b.excludeXsrf || Ba(a.match(A)[3] || null) && !b.withCredentials && Ba(a.match(A)[3] || null) != document.location.hostname || "POST" != b.method || h && "application/x-www-form-urlencoded" != h || b.postParams && b.postParams[g] || (f || (f = {}), f[c] = d);
    f && "string" === typeof e && (e = Ke(e), ua(e, f), e = b.postBodyFormat && "JSON" == b.postBodyFormat ?
        JSON.stringify(e) : Da(e));
    f = e || f && !ra(f);
    !Ne && f && "POST" != b.method && (Ne = !0, we(Error("AJAX request with postData should use POST")));
    return e
};
u.ytPubsubPubsubInstance || new J;
var P = class extends Error {
    constructor(a, ...b) {
        super(a);
        this.args = [...b]
    }
};
const Re = window;
var Q = Re.ytcsi && Re.ytcsi.now ? Re.ytcsi.now : Re.performance && Re.performance.timing && Re.performance.now && Re.performance.timing.navigationStart ? () => Re.performance.timing.navigationStart + Re.performance.now() : () => (new Date).getTime();
const Se = pe("initial_gel_batch_timeout", 2E3),
    Te = Math.pow(2, 16) - 1;
let R = void 0;
class Ue {
    constructor() {
        this.j = this.h = this.i = 0
    }
}
const Ve = new Ue,
    We = new Ue;
let Xe = !0;
const Ye = u.ytLoggingTransportGELQueue_ || new Map,
    Ze = u.ytLoggingTransportGELProtoQueue_ || new Map,
    $e = u.ytLoggingTransportTokensToCttTargetIds_ || {},
    af = u.ytLoggingTransportTokensToJspbCttTargetIds_ || {};

function bf(a, b) {
    if ("log_event" === a.endpoint) {
        var c = cf(a),
            d = Ye.get(c) || [];
        Ye.set(c, d);
        d.push(a.payload);
        df(b, d, c)
    }
}

function ef(a, b) {
    if ("log_event" === a.endpoint) {
        var c = cf(a, !0),
            d = Ze.get(c) || [];
        Ze.set(c, d);
        a = Ib(a.payload);
        d.push(a);
        df(b, d, c, !0)
    }
}

function df(a, b, c, d = !1) {
    a && (R = new a);
    a = pe("tvhtml5_logging_max_batch") || pe("web_logging_max_batch") || 100;
    const e = Q(),
        f = d ? We.j : Ve.j;
    b.length >= a ? ff({
        writeThenSend: !0
    }, O("flush_only_full_queue") ? c : void 0, d) : 10 <= e - f && (gf(d), d ? We.j = e : Ve.j = e)
}

function hf(a, b) {
    if ("log_event" === a.endpoint) {
        var c = cf(a),
            d = new Map;
        d.set(c, [a.payload]);
        b && (R = new b);
        return new G(e => {
            R && R.isReady() ? jf(d, e, {
                bypassNetworkless: !0
            }, !0) : e()
        })
    }
}

function kf(a, b) {
    if ("log_event" === a.endpoint) {
        var c = cf(a, !0),
            d = new Map;
        d.set(c, [Ib(a.payload)]);
        b && (R = new b);
        return new G(e => {
            R && R.isReady() ? lf(d, e, {
                bypassNetworkless: !0
            }, !0) : e()
        })
    }
}

function cf(a, b = !1) {
    var c = "";
    if (a.L) c = "visitorOnlyApprovedKey";
    else if (a.cttAuthInfo) {
        if (b) {
            b = a.cttAuthInfo.token;
            c = a.cttAuthInfo;
            const d = new Vd;
            c.videoId ? d.setVideoId(c.videoId) : c.playlistId && ub(d, 2, Ud, c.playlistId);
            af[b] = d
        } else b = a.cttAuthInfo, c = {}, b.videoId ? c.videoId = b.videoId : b.playlistId && (c.playlistId = b.playlistId), $e[a.cttAuthInfo.token] = c;
        c = a.cttAuthInfo.token
    }
    return c
}

function ff(a = {}, b, c = !1) {
    new G(d => {
        c ? (window.clearTimeout(We.i), window.clearTimeout(We.h), We.h = 0) : (window.clearTimeout(Ve.i), window.clearTimeout(Ve.h), Ve.h = 0);
        if (R && R.isReady())
            if (void 0 !== b)
                if (c) {
                    var e = new Map,
                        f = Ze.get(b) || [];
                    e.set(b, f);
                    lf(e, d, a);
                    Ze.delete(b)
                } else e = new Map, f = Ye.get(b) || [], e.set(b, f), jf(e, d, a), Ye.delete(b);
        else c ? (lf(Ze, d, a), Ze.clear()) : (jf(Ye, d, a), Ye.clear());
        else gf(c), d()
    })
}

function gf(a = !1) {
    if (O("web_gel_timeout_cap") && (!a && !Ve.h || a && !We.h)) {
        var b = ye(() => {
            ff({
                writeThenSend: !0
            }, void 0, a)
        }, 6E4);
        a ? We.h = b : Ve.h = b
    }
    window.clearTimeout(a ? We.i : Ve.i);
    b = N("LOGGING_BATCH_TIMEOUT", pe("web_gel_debounce_ms", 1E4));
    O("shorten_initial_gel_batch_timeout") && Xe && (b = Se);
    b = ye(() => {
        ff({
            writeThenSend: !0
        }, void 0, a)
    }, b);
    a ? We.i = b : Ve.i = b
}

function jf(a, b, c = {}, d) {
    var e = R;
    const f = Math.round(Q());
    let g = a.size;
    for (const [l, m] of a) {
        var h = l,
            k = m;
        a = sa({
            context: mf(e.config_ || nf())
        });
        a.events = k;
        (k = $e[h]) && of (a, h, k);
        delete $e[h];
        h = "visitorOnlyApprovedKey" === h;
        pf(a, f, h);
        qf(c);
        rf(e, a, sf(c, h, () => {
            g--;
            g || b()
        }, () => {
            g--;
            g || b()
        }, d));
        Xe = !1
    }
}

function lf(a, b, c = {}, d) {
    var e = R;
    const f = Math.round(Q());
    let g = a.size;
    for (const [m, p] of a) {
        var h = m,
            k = p;
        a = new Xd;
        var l = tf(e.config_ || nf());
        D(a, 1, l);
        k = uf(k);
        for (l = 0; l < k.length; l++) zb(a, 3, K, k[l]);
        (k = af[h]) && vf(a, h, k);
        delete af[h];
        h = "visitorOnlyApprovedKey" === h;
        wf(a, f, h);
        qf(c);
        a = Ib(a);
        h = sf(c, h, () => {
            g--;
            g || b()
        }, () => {
            g--;
            g || b()
        }, d);
        h.headers = {
            "Content-Type": "application/json+protobuf"
        };
        h.postBodyFormat = "JSPB";
        h.postBody = a;
        rf(e, "", h);
        Xe = !1
    }
}

function qf(a) {
    O("always_send_and_write") && (a.writeThenSend = !1)
}

function sf(a, b, c, d, e) {
    return {
        retry: !0,
        onSuccess: c,
        onError: d,
        wb: a,
        L: b,
        pb: !!e,
        headers: {},
        postBodyFormat: "",
        postBody: ""
    }
}

function pf(a, b, c) {
    a.requestTimeMs = String(b);
    O("unsplit_gel_payloads_in_logs") && (a.unsplitGelPayloadsInLogs = !0);
    !c && (b = N("EVENT_ID", void 0)) && (c = xf(), a.serializedClientEventId = {
        serializedEventId: b,
        clientCounter: String(c)
    })
}

function wf(a, b, c) {
    C(a, 2, b);
    if (!c && (b = N("EVENT_ID", void 0))) {
        c = xf();
        const d = new Td;
        C(d, 1, b);
        C(d, 2, c);
        D(a, 5, d)
    }
}

function xf() {
    let a = N("BATCH_CLIENT_COUNTER", void 0) || 0;
    a || (a = Math.floor(Math.random() * Te / 2));
    a++;
    a > Te && (a = 1);
    M("BATCH_CLIENT_COUNTER", a);
    return a
}

function of (a, b, c) {
    let d;
    if (c.videoId) d = "VIDEO";
    else if (c.playlistId) d = "PLAYLIST";
    else return;
    a.credentialTransferTokenTargetId = c;
    a.context = a.context || {};
    a.context.user = a.context.user || {};
    a.context.user.credentialTransferTokens = [{
        token: b,
        scope: d
    }]
}

function vf(a, b, c) {
    let d;
    if (B(c, 1 === vb(c, Ud) ? 1 : -1)) d = 1;
    else if (c.getPlaylistId()) d = 2;
    else return;
    D(a, 4, c);
    a = wb(a, qd, 1) || new qd;
    c = wb(a, od, 3) || new od;
    const e = new md;
    e.setToken(b);
    C(e, 1, d);
    zb(c, 12, md, e);
    D(a, 3, c)
}

function uf(a) {
    const b = [];
    for (let h = 0; h < a.length; h++) try {
        var c = b,
            d = c.push;
        a: {
            var e = String(a[h]),
                f = K;
            if (null == e || "" == e) {
                var g = new f;
                break a
            }
            const k = JSON.parse(e);Array.isArray(k) || Hb(Error("Expected to deserialize an Array but got " + ia(k) + ": " + k));Kb = k;
            const l = new f(k);Kb = null;g = l
        }
        d.call(c, g)
    } catch (k) {
        we(new P("Transport failed to deserialize " + String(a[h])))
    }
    return b
};
const yf = u.ytLoggingGelSequenceIdObj_ || {};

function S(a, b, c, d = {}) {
    const e = {},
        f = Math.round(d.timestamp || Q());
    e.eventTimeMs = f < Number.MAX_SAFE_INTEGER ? f : 0;
    e[a] = b;
    a = Ee();
    e.context = {
        lastActivityMs: String(d.timestamp || !isFinite(a) ? -1 : a)
    };
    O("log_sequence_info_on_gel_web") && d.A && (a = e.context, b = d.A, b = {
        index: zf(b),
        groupKey: b
    }, a.sequence = b, d.ka && delete yf[d.A]);
    (d.Ea ? hf : bf)({
        endpoint: "log_event",
        payload: e,
        cttAuthInfo: d.cttAuthInfo,
        L: d.L
    }, c)
}

function zf(a) {
    yf[a] = a in yf ? yf[a] + 1 : 0;
    return yf[a]
};
w("ytglobal.prefsUserPrefsPrefs_", v("ytglobal.prefsUserPrefsPrefs_") || {});

function Af() {
    return "INNERTUBE_API_KEY" in L && "INNERTUBE_API_VERSION" in L
}

function nf() {
    return {
        innertubeApiKey: N("INNERTUBE_API_KEY", void 0),
        innertubeApiVersion: N("INNERTUBE_API_VERSION", void 0),
        Z: N("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),
        xa: N("INNERTUBE_CONTEXT_CLIENT_NAME", "WEB"),
        ya: N("INNERTUBE_CONTEXT_CLIENT_NAME", 1),
        innertubeContextClientVersion: N("INNERTUBE_CONTEXT_CLIENT_VERSION", void 0),
        ma: N("INNERTUBE_CONTEXT_HL", void 0),
        la: N("INNERTUBE_CONTEXT_GL", void 0),
        za: N("INNERTUBE_HOST_OVERRIDE", void 0) || "",
        Ba: !!N("INNERTUBE_USE_THIRD_PARTY_AUTH", !1),
        Aa: !!N("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT", !1),
        appInstallData: N("SERIALIZED_CLIENT_CONFIG_DATA", void 0)
    }
}

function mf(a) {
    const b = {
        client: {
            hl: a.ma,
            gl: a.la,
            clientName: a.xa,
            clientVersion: a.innertubeContextClientVersion,
            configInfo: a.Z
        }
    };
    navigator.userAgent && (b.client.userAgent = String(navigator.userAgent));
    var c = u.devicePixelRatio;
    c && 1 != c && (b.client.screenDensityFloat = String(c));
    c = qe();
    "" !== c && (b.client.experimentsToken = c);
    c = re();
    0 < c.length && (b.request = {
        internalExperimentFlags: c
    });
    Bf(a, void 0, b);
    N("DELEGATED_SESSION_ID") && !O("pageid_as_header_web") && (b.user = {
        onBehalfOfUser: N("DELEGATED_SESSION_ID")
    });
    a = Object;
    c = a.assign;
    var d = b.client,
        e = N("DEVICE", "");
    const f = {};
    for (const [g, h] of Object.entries(Ke(e))) {
        e = g;
        const k = h;
        "cbrand" === e ? f.deviceMake = k : "cmodel" === e ? f.deviceModel = k : "cbr" === e ? f.browserName = k : "cbrver" === e ? f.browserVersion = k : "cos" === e ? f.osName = k : "cosver" === e ? f.osVersion = k : "cplatform" === e && (f.platform = k)
    }
    b.client = c.call(a, d, f);
    return b
}

function tf(a) {
    const b = new qd,
        c = new jd;
    C(c, 1, a.ma);
    C(c, 2, a.la);
    C(c, 16, a.ya);
    C(c, 17, a.innertubeContextClientVersion);
    if (a.Z) {
        var d = a.Z,
            e = new hd;
        d.coldConfigData && C(e, 1, d.coldConfigData);
        d.appInstallData && C(e, 6, d.appInstallData);
        d.coldHashData && C(e, 3, d.coldHashData);
        d.hotHashData && C(e, 5, d.hotHashData);
        D(c, 62, e)
    }(d = u.devicePixelRatio) && 1 != d && C(c, 65, d);
    d = qe();
    "" !== d && C(c, 54, d);
    d = re();
    if (0 < d.length) {
        e = new ld;
        for (let f = 0; f < d.length; f++) {
            const g = new gd;
            C(g, 1, d[f].key);
            g.setValue(d[f].value);
            zb(e, 15, gd, g)
        }
        D(b,
            5, e)
    }
    Bf(a, c);
    N("DELEGATED_SESSION_ID") && !O("pageid_as_header_web") && (a = new od, C(a, 3, N("DELEGATED_SESSION_ID")));
    a = N("DEVICE", "");
    for (const [f, g] of Object.entries(Ke(a))) a = f, d = g, "cbrand" === a ? C(c, 12, d) : "cmodel" === a ? C(c, 13, d) : "cbr" === a ? C(c, 87, d) : "cbrver" === a ? C(c, 88, d) : "cos" === a ? C(c, 18, d) : "cosver" === a ? C(c, 19, d) : "cplatform" === a && C(c, 42, d);
    D(b, 1, c);
    return b
}

function Bf(a, b, c) {
    if (a.appInstallData)
        if (b) {
            let d;
            c = null != (d = wb(b, hd, 62)) ? d : new hd;
            C(c, 6, a.appInstallData);
            D(b, 62, c)
        } else c && (c.client.configInfo = c.client.configInfo || {}, c.client.configInfo.appInstallData = a.appInstallData)
}

function Cf(a, b, c = {}) {
    let d = {};
    O("enable_web_eom_visitor_data") && N("EOM_VISITOR_DATA") ? d = {
        "X-Goog-EOM-Visitor-Id": N("EOM_VISITOR_DATA")
    } : d = {
        "X-Goog-Visitor-Id": c.visitorData || N("VISITOR_DATA", "")
    };
    if (b && b.includes("www.youtube-nocookie.com")) return d;
    (b = c.mb || N("AUTHORIZATION")) || (a ? b = `Bearer ${v("gapi.auth.getToken")().lb}` : b = vc());
    b && (d.Authorization = b, d["X-Goog-AuthUser"] = N("SESSION_INDEX", 0), O("pageid_as_header_web") && (d["X-Goog-PageId"] = N("DELEGATED_SESSION_ID")));
    return d
};
const Df = [];
let Ef, Ff = !1;

function Gf(a) {
    Ff || (Ef ? Ef.handleError(a) : (Df.push({
        type: "ERROR",
        payload: a
    }), 10 < Df.length && Df.shift()))
}

function Hf(a, b) {
    Ff || (Ef ? Ef.T(a, b) : (Df.push({
        type: "EVENT",
        eventType: a,
        payload: b
    }), 10 < Df.length && Df.shift()))
};

function If() {
    if (void 0 !== N("DATASYNC_ID", void 0)) return N("DATASYNC_ID", void 0);
    throw new P("Datasync ID not set", "unknown");
};

function Jf(a) {
    if (0 <= a.indexOf(":")) throw Error("Database name cannot contain ':'");
}

function Kf(a) {
    return a.substr(0, a.indexOf(":")) || a
};
const Lf = {
        AUTH_INVALID: "No user identifier specified.",
        EXPLICIT_ABORT: "Transaction was explicitly aborted.",
        IDB_NOT_SUPPORTED: "IndexedDB is not supported.",
        MISSING_INDEX: "Index not created.",
        MISSING_OBJECT_STORES: "Object stores not created.",
        DB_DELETED_BY_MISSING_OBJECT_STORES: "Database is deleted because expected object stores were not created.",
        DB_REOPENED_BY_MISSING_OBJECT_STORES: "Database is reopened because expected object stores were not created.",
        UNKNOWN_ABORT: "Transaction was aborted for unknown reasons.",
        QUOTA_EXCEEDED: "The current transaction exceeded its quota limitations.",
        QUOTA_MAYBE_EXCEEDED: "The current transaction may have failed because of exceeding quota limitations.",
        EXECUTE_TRANSACTION_ON_CLOSED_DB: "Can't start a transaction on a closed database",
        INCOMPATIBLE_DB_VERSION: "The binary is incompatible with the database version"
    },
    Mf = {
        AUTH_INVALID: "ERROR",
        EXECUTE_TRANSACTION_ON_CLOSED_DB: "WARNING",
        EXPLICIT_ABORT: "IGNORED",
        IDB_NOT_SUPPORTED: "ERROR",
        MISSING_INDEX: "WARNING",
        MISSING_OBJECT_STORES: "ERROR",
        DB_DELETED_BY_MISSING_OBJECT_STORES: "WARNING",
        DB_REOPENED_BY_MISSING_OBJECT_STORES: "WARNING",
        QUOTA_EXCEEDED: "WARNING",
        QUOTA_MAYBE_EXCEEDED: "WARNING",
        UNKNOWN_ABORT: "WARNING",
        INCOMPATIBLE_DB_VERSION: "WARNING"
    },
    Nf = {
        AUTH_INVALID: !1,
        EXECUTE_TRANSACTION_ON_CLOSED_DB: !1,
        EXPLICIT_ABORT: !1,
        IDB_NOT_SUPPORTED: !1,
        MISSING_INDEX: !1,
        MISSING_OBJECT_STORES: !1,
        DB_DELETED_BY_MISSING_OBJECT_STORES: !1,
        DB_REOPENED_BY_MISSING_OBJECT_STORES: !1,
        QUOTA_EXCEEDED: !1,
        QUOTA_MAYBE_EXCEEDED: !0,
        UNKNOWN_ABORT: !0,
        INCOMPATIBLE_DB_VERSION: !1
    };
var T = class extends P {
        constructor(a, b = {}, c = Lf[a], d = Mf[a], e = Nf[a]) {
            super(c, Object.assign({
                name: "YtIdbKnownError",
                isSw: void 0 === self.document,
                isIframe: self !== self.top,
                type: a
            }, b));
            this.type = a;
            this.message = c;
            this.level = d;
            this.h = e;
            Object.setPrototypeOf(this, T.prototype)
        }
    },
    Of = class extends T {
        constructor(a, b) {
            super("MISSING_OBJECT_STORES", {
                expectedObjectStores: b,
                foundObjectStores: a
            }, Lf.MISSING_OBJECT_STORES);
            Object.setPrototypeOf(this, Of.prototype)
        }
    },
    Pf = class extends Error {
        constructor(a, b) {
            super();
            this.index =
                a;
            this.objectStore = b;
            Object.setPrototypeOf(this, Pf.prototype)
        }
    };
const Qf = ["The database connection is closing", "Can't start a transaction on a closed database", "A mutation operation was attempted on a database that did not allow mutations"];

function Rf(a, b, c, d) {
    b = Kf(b);
    let e;
    e = a instanceof Error ? a : Error(`Unexpected error: ${a}`);
    if (e instanceof T) return e;
    a = {
        objectStoreNames: c,
        dbName: b,
        dbVersion: d
    };
    if ("QuotaExceededError" === e.name) return new T("QUOTA_EXCEEDED", a);
    if (La && "UnknownError" === e.name) return new T("QUOTA_MAYBE_EXCEEDED", a);
    if (e instanceof Pf) return new T("MISSING_INDEX", Object.assign(Object.assign({}, a), {
        objectStore: e.objectStore,
        index: e.index
    }));
    if ("InvalidStateError" === e.name && Qf.some(f => e.message.includes(f))) return new T("EXECUTE_TRANSACTION_ON_CLOSED_DB",
        a);
    if ("AbortError" === e.name) return new T("UNKNOWN_ABORT", a, e.message);
    e.args = [Object.assign(Object.assign({}, a), {
        name: "IdbError",
        xb: e.name
    })];
    e.level = "WARNING";
    return e
}

function Sf(a, b, c) {
    return new T("IDB_NOT_SUPPORTED", {
        context: {
            caller: a,
            publicName: b,
            version: c,
            hasSucceededOnce: void 0
        }
    })
};

function Tf(a) {
    if (!a) throw Error();
    throw a;
}

function Wf(a) {
    return a
}
var Xf = class {
    constructor(a) {
        this.h = a
    }
};

function Yf(a) {
    return new Zf(new Xf((b, c) => {
        a instanceof Zf ? a.then(b, c) : b(a)
    }))
}

function $f(a, b, c, d, e) {
    try {
        if ("FULFILLED" !== a.state.status) throw Error("calling handleResolve before the promise is fulfilled.");
        const f = c(a.state.value);
        f instanceof Zf ? ag(a, b, f, d, e) : d(f)
    } catch (f) {
        e(f)
    }
}

function bg(a, b, c, d, e) {
    try {
        if ("REJECTED" !== a.state.status) throw Error("calling handleReject before the promise is rejected.");
        const f = c(a.state.reason);
        f instanceof Zf ? ag(a, b, f, d, e) : d(f)
    } catch (f) {
        e(f)
    }
}

function ag(a, b, c, d, e) {
    b === c ? e(new TypeError("Circular promise chain detected.")) : c.then(f => {
        f instanceof Zf ? ag(a, b, f, d, e) : d(f)
    }, f => {
        e(f)
    })
}
var Zf = class {
    constructor(a) {
        this.state = {
            status: "PENDING"
        };
        this.h = [];
        this.onRejected = [];
        a = a.h;
        const b = d => {
                if ("PENDING" === this.state.status) {
                    this.state = {
                        status: "FULFILLED",
                        value: d
                    };
                    for (const e of this.h) e()
                }
            },
            c = d => {
                if ("PENDING" === this.state.status) {
                    this.state = {
                        status: "REJECTED",
                        reason: d
                    };
                    for (const e of this.onRejected) e()
                }
            };
        try {
            a(b, c)
        } catch (d) {
            c(d)
        }
    }
    static all(a) {
        return new Zf(new Xf((b, c) => {
            const d = [];
            let e = a.length;
            0 === e && b(d);
            for (let f = 0; f < a.length; ++f) Yf(a[f]).then(g => {
                d[f] = g;
                e--;
                0 === e && b(d)
            }).catch(g => {
                c(g)
            })
        }))
    }
    static reject(a) {
        return new Zf(new Xf((b, c) => {
            c(a)
        }))
    }
    then(a, b) {
        const c = null !== a && void 0 !== a ? a : Wf,
            d = null !== b && void 0 !== b ? b : Tf;
        return new Zf(new Xf((e, f) => {
            "PENDING" === this.state.status ? (this.h.push(() => {
                $f(this, this, c, e, f)
            }), this.onRejected.push(() => {
                bg(this, this, d, e, f)
            })) : "FULFILLED" === this.state.status ? $f(this, this, c, e, f) : "REJECTED" === this.state.status && bg(this, this, d, e, f)
        }))
    } catch (a) {
        return this.then(void 0, a)
    }
};

function cg(a, b, c) {
    const d = () => {
            try {
                a.removeEventListener("success", e), a.removeEventListener("error", f)
            } catch (g) {}
        },
        e = () => {
            b(a.result);
            d()
        },
        f = () => {
            c(a.error);
            d()
        };
    a.addEventListener("success", e);
    a.addEventListener("error", f)
}

function dg(a) {
    return new Promise((b, c) => {
        cg(a, b, c)
    })
}

function U(a) {
    return new Zf(new Xf((b, c) => {
        cg(a, b, c)
    }))
};

function eg(a, b) {
    return new Zf(new Xf((c, d) => {
        const e = () => {
            const f = a ? b(a) : null;
            f ? f.then(g => {
                a = g;
                e()
            }, d) : c()
        };
        e()
    }))
};

function fg(a, b, c, d) {
    return r(function*() {
        const e = {
            mode: "readonly",
            H: !1,
            tag: "IDB_TRANSACTION_TAG_UNKNOWN"
        };
        "string" === typeof c ? e.mode = c : Object.assign(e, c);
        a.transactionCount++;
        const f = e.H ? 3 : 1;
        let g = 0,
            h;
        for (; !h;) {
            g++;
            const l = Math.round(Q());
            try {
                const m = a.h.transaction(b, e.mode);
                var k = d;
                const p = new gg(m),
                    t = yield hg(p, k), n = Math.round(Q());
                ig(a, l, n, g, void 0, b.join(), e);
                return t
            } catch (m) {
                k = Math.round(Q());
                const p = Rf(m, a.h.name, b.join(), a.h.version);
                if (p instanceof T && !p.h || g >= f) ig(a, l, k, g, p, b.join(), e),
                    h = p
            }
        }
        return Promise.reject(h)
    })
}

function jg(a, b, c) {
    a = a.h.createObjectStore(b, c);
    return new kg(a)
}

function lg(a, b, c, d) {
    return fg(a, [b], {
        mode: "readwrite",
        H: !0
    }, e => {
        e = e.objectStore(b);
        return U(e.h.put(c, d))
    })
}

function ig(a, b, c, d, e, f, g) {
    b = c - b;
    e ? (e instanceof T && ("QUOTA_EXCEEDED" === e.type || "QUOTA_MAYBE_EXCEEDED" === e.type) && Hf("QUOTA_EXCEEDED", {
        dbName: Kf(a.h.name),
        objectStoreNames: f,
        transactionCount: a.transactionCount,
        transactionMode: g.mode
    }), e instanceof T && "UNKNOWN_ABORT" === e.type && (c -= a.j, 0 > c && c >= Math.pow(2, 31) && (c = 0), Hf("TRANSACTION_UNEXPECTEDLY_ABORTED", {
        objectStoreNames: f,
        transactionDuration: b,
        transactionCount: a.transactionCount,
        dbDuration: c
    }), a.i = !0), mg(a, !1, d, f, b, g.tag), Gf(e)) : mg(a, !0, d, f, b, g.tag)
}

function mg(a, b, c, d, e, f = "IDB_TRANSACTION_TAG_UNKNOWN") {
    Hf("TRANSACTION_ENDED", {
        objectStoreNames: d,
        connectionHasUnknownAbortedTransaction: a.i,
        duration: e,
        isSuccessful: b,
        tryCount: c,
        tag: f
    })
}
var ng = class {
    constructor(a, b) {
        this.h = a;
        this.options = b;
        this.transactionCount = 0;
        this.j = Math.round(Q());
        this.i = !1
    }
    add(a, b, c) {
        return fg(this, [a], {
            mode: "readwrite",
            H: !0
        }, d => d.objectStore(a).add(b, c))
    }
    clear(a) {
        return fg(this, [a], {
            mode: "readwrite",
            H: !0
        }, b => b.objectStore(a).clear())
    }
    close() {
        var a;
        this.h.close();
        (null === (a = this.options) || void 0 === a ? 0 : a.closed) && this.options.closed()
    }
    count(a, b) {
        return fg(this, [a], {
            mode: "readonly",
            H: !0
        }, c => c.objectStore(a).count(b))
    }
    delete(a, b) {
        return fg(this, [a], {
            mode: "readwrite",
            H: !0
        }, c => c.objectStore(a).delete(b))
    }
    get(a, b) {
        return fg(this, [a], {
            mode: "readonly",
            H: !0
        }, c => c.objectStore(a).get(b))
    }
    objectStoreNames() {
        return Array.from(this.h.objectStoreNames)
    }
    getName() {
        return this.h.name
    }
};

function og(a, b, c) {
    a = a.h.openCursor(b.query, b.direction);
    return pg(a).then(d => eg(d, c))
}

function qg(a, b) {
    return og(a, {
        query: b
    }, c => c.delete().then(() => c.continue())).then(() => {})
}
var kg = class {
    constructor(a) {
        this.h = a
    }
    add(a, b) {
        return U(this.h.add(a, b))
    }
    autoIncrement() {
        return this.h.autoIncrement
    }
    clear() {
        return U(this.h.clear()).then(() => {})
    }
    count(a) {
        return U(this.h.count(a))
    }
    delete(a) {
        return a instanceof IDBKeyRange ? qg(this, a) : U(this.h.delete(a))
    }
    get(a) {
        return U(this.h.get(a))
    }
    index(a) {
        try {
            return new rg(this.h.index(a))
        } catch (b) {
            if (b instanceof Error && "NotFoundError" === b.name) throw new Pf(a, this.h.name);
            throw b;
        }
    }
    getName() {
        return this.h.name
    }
    keyPath() {
        return this.h.keyPath
    }
};

function hg(a, b) {
    const c = new Promise((d, e) => {
        try {
            b(a).then(f => {
                d(f)
            }).catch(e)
        } catch (f) {
            e(f), a.abort()
        }
    });
    return Promise.all([c, a.done]).then(([d]) => d)
}
var gg = class {
    constructor(a) {
        this.h = a;
        this.j = new Map;
        this.i = !1;
        this.done = new Promise((b, c) => {
            this.h.addEventListener("complete", () => {
                b()
            });
            this.h.addEventListener("error", d => {
                d.currentTarget === d.target && c(this.h.error)
            });
            this.h.addEventListener("abort", () => {
                var d = this.h.error;
                if (d) c(d);
                else if (!this.i) {
                    d = T;
                    var e = this.h.objectStoreNames;
                    const f = [];
                    for (let g = 0; g < e.length; g++) {
                        const h = e.item(g);
                        if (null === h) throw Error("Invariant: item in DOMStringList is null");
                        f.push(h)
                    }
                    d = new d("UNKNOWN_ABORT", {
                        objectStoreNames: f.join(),
                        dbName: this.h.db.name,
                        mode: this.h.mode
                    });
                    c(d)
                }
            })
        })
    }
    abort() {
        this.h.abort();
        this.i = !0;
        throw new T("EXPLICIT_ABORT");
    }
    objectStore(a) {
        a = this.h.objectStore(a);
        let b = this.j.get(a);
        b || (b = new kg(a), this.j.set(a, b));
        return b
    }
};

function sg(a, b, c) {
    const {
        query: d = null,
        direction: e = "next"
    } = b;
    a = a.h.openCursor(d, e);
    return pg(a).then(f => eg(f, c))
}
var rg = class {
    constructor(a) {
        this.h = a
    }
    count(a) {
        return U(this.h.count(a))
    }
    delete(a) {
        return sg(this, {
            query: a
        }, b => b.delete().then(() => b.continue()))
    }
    get(a) {
        return U(this.h.get(a))
    }
    getKey(a) {
        return U(this.h.getKey(a))
    }
    keyPath() {
        return this.h.keyPath
    }
    unique() {
        return this.h.unique
    }
};

function pg(a) {
    return U(a).then(b => b ? new tg(a, b) : null)
}
var tg = class {
    constructor(a, b) {
        this.request = a;
        this.cursor = b
    }
    advance(a) {
        this.cursor.advance(a);
        return pg(this.request)
    }
    continue (a) {
        this.cursor.continue(a);
        return pg(this.request)
    }
    delete() {
        return U(this.cursor.delete()).then(() => {})
    }
    getKey() {
        return this.cursor.key
    }
    Y() {
        return this.cursor.value
    }
    update(a) {
        return U(this.cursor.update(a))
    }
};

function ug(a, b, c) {
    return new Promise((d, e) => {
        let f;
        f = void 0 !== b ? self.indexedDB.open(a, b) : self.indexedDB.open(a);
        const g = c.blocked,
            h = c.blocking,
            k = c.Ha,
            l = c.upgrade,
            m = c.closed;
        let p;
        const t = () => {
            p || (p = new ng(f.result, {
                closed: m
            }));
            return p
        };
        f.addEventListener("upgradeneeded", n => {
            try {
                if (null === n.newVersion) throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");
                if (null === f.transaction) throw Error("Invariant: transaction on IDbOpenDbRequest is null");
                n.dataLoss && "none" !== n.dataLoss && Hf("IDB_DATA_CORRUPTED", {
                    reason: n.dataLossMessage || "unknown reason",
                    dbName: Kf(a)
                });
                const x = t(),
                    z = new gg(f.transaction);
                l && l(x, H => n.oldVersion < H && n.newVersion >= H, z);
                z.done.catch(H => {
                    e(H)
                })
            } catch (x) {
                e(x)
            }
        });
        f.addEventListener("success", () => {
            const n = f.result;
            h && n.addEventListener("versionchange", () => {
                h(t())
            });
            n.addEventListener("close", () => {
                Hf("IDB_UNEXPECTEDLY_CLOSED", {
                    dbName: Kf(a),
                    dbVersion: n.version
                });
                k && k()
            });
            d(t())
        });
        f.addEventListener("error", () => {
            e(f.error)
        });
        g && f.addEventListener("blocked", () => {
            g()
        })
    })
}

function vg(a, b, c = {}) {
    return ug(a, b, c)
}

function wg(a, b = {}) {
    return r(function*() {
        try {
            const c = self.indexedDB.deleteDatabase(a),
                d = b.blocked;
            d && c.addEventListener("blocked", () => {
                d()
            });
            yield dg(c)
        } catch (c) {
            throw Rf(c, a, "", -1);
        }
    })
};

function xg(a) {
    return new Promise(b => {
        ze(() => {
            b()
        }, a)
    })
}

function yg(a, b) {
    return new T("INCOMPATIBLE_DB_VERSION", {
        dbName: a.name,
        oldVersion: a.options.version,
        newVersion: b
    })
}

function zg(a) {
    if (!a.l) throw yg(a);
    if (a.h) return a.h;
    let b;
    const c = () => {
            a.h === b && (a.h = void 0)
        },
        d = {
            blocking: f => {
                f.close()
            },
            closed: c,
            Ha: c,
            upgrade: a.options.upgrade
        },
        e = () => r(function*() {
            var f, g, h = null !== (f = Error().stack) && void 0 !== f ? f : "";
            try {
                const m = yield a.j(a.name, a.options.version, d);
                var k = m,
                    l = a.options;
                const p = [];
                for (const t of Object.keys(l.M)) {
                    const {
                        O: n,
                        Bb: x = Number.MAX_VALUE
                    } = l.M[t];
                    !(k.h.version >= n) || k.h.version >= x || k.h.objectStoreNames.contains(t) || p.push(t)
                }
                if (0 !== p.length) {
                    const t = Object.keys(a.options.M),
                        n = m.objectStoreNames();
                    if (a.s < pe("ytidb_reopen_db_retries", 0)) return a.s++, m.close(), Gf(new T("DB_REOPENED_BY_MISSING_OBJECT_STORES", {
                        dbName: a.name,
                        expectedObjectStores: t,
                        foundObjectStores: n
                    })), e();
                    if (a.m < pe("ytidb_remake_db_retries", 1)) return a.m++, O("ytidb_remake_db_enable_backoff_delay") && (yield xg(a.i), a.i *= 2), yield a.delete(), Gf(new T("DB_DELETED_BY_MISSING_OBJECT_STORES", {
                        dbName: a.name,
                        expectedObjectStores: t,
                        foundObjectStores: n
                    })), e();
                    throw new Of(n, t);
                }
                return m
            } catch (m) {
                if (m instanceof DOMException ? "VersionError" === m.name : "DOMError" in self && m instanceof DOMError ? "VersionError" === m.name : m instanceof Object && "message" in m &&
                    "An attempt was made to open a database using a lower version than the existing version." === m.message) {
                    h = yield a.j(a.name, void 0, Object.assign(Object.assign({}, d), {
                        upgrade: void 0
                    }));
                    k = h.h.version;
                    if (void 0 !== a.options.version && k > a.options.version + 1) throw h.close(), a.l = !1, yg(a, k);
                    return h
                }
                c();
                m instanceof Error && !O("ytidb_async_stack_killswitch") && (m.stack = `${m.stack}\n${h.substring(h.indexOf("\n")+1)}`);
                throw Rf(m, a.name, "", null !== (g = a.options.version) && void 0 !== g ? g : -1);
            }
        });
    b = e();
    a.h = b;
    return a.h
}

function Ag(a, b) {
    if (!b) throw Sf("openWithToken", Kf(a.name));
    return zg(a)
}
var Bg = class {
    constructor(a, b) {
        this.name = a;
        this.options = b;
        this.l = !0;
        this.s = this.m = 0;
        this.i = 500
    }
    j(a, b, c = {}) {
        return vg(a, b, c)
    }
    delete(a = {}) {
        return wg(this.name, a)
    }
};
const Cg = new Bg("YtIdbMeta", {
    M: {
        databases: {
            O: 1
        }
    },
    upgrade(a, b) {
        b(1) && jg(a, "databases", {
            keyPath: "actualName"
        })
    }
});

function Dg(a, b) {
    return r(function*() {
        return fg(yield Ag(Cg, b), ["databases"], {
            H: !0,
            mode: "readwrite"
        }, c => {
            const d = c.objectStore("databases");
            return d.get(a.actualName).then(e => {
                if (e ? a.actualName !== e.actualName || a.publicName !== e.publicName || a.userIdentifier !== e.userIdentifier : 1) return U(d.h.put(a, void 0)).then(() => {})
            })
        })
    })
}

function Eg(a, b) {
    return r(function*() {
        if (a) return (yield Ag(Cg, b)).delete("databases", a)
    })
};
let Fg;
const Gg = new class {
    constructor() {}
}(new class {
    constructor() {}
});

function Hg() {
    return r(function*() {
        return !0
    })
}

function Ig() {
    if (void 0 !== Fg) return Fg;
    Ff = !0;
    return Fg = Hg().then(a => {
        Ff = !1;
        return a
    })
}

function Jg() {
    const a = v("ytglobal.idbToken_") || void 0;
    return a ? Promise.resolve(a) : Ig().then(b => {
        (b = b ? Gg : void 0) && w("ytglobal.idbToken_", b);
        return b
    })
};
new Nc;

function Kg(a) {
    try {
        If();
        var b = !0
    } catch (c) {
        b = !1
    }
    if (!b) throw a = new T("AUTH_INVALID", {
        dbName: a
    }), Gf(a), a;
    b = If();
    return {
        actualName: `${a}:${b}`,
        publicName: a,
        userIdentifier: b
    }
}

function Lg(a, b, c, d) {
    return r(function*() {
        var e, f = null !== (e = Error().stack) && void 0 !== e ? e : "",
            g = yield Jg();
        if (!g) throw g = Sf("openDbImpl", a, b), O("ytidb_async_stack_killswitch") || (g.stack = `${g.stack}\n${f.substring(f.indexOf("\n")+1)}`), Gf(g), g;
        Jf(a);
        f = c ? {
            actualName: a,
            publicName: a,
            userIdentifier: void 0
        } : Kg(a);
        try {
            return yield Dg(f, g), yield vg(f.actualName, b, d)
        } catch (h) {
            try {
                yield Eg(f.actualName, g)
            } catch (k) {}
            throw h;
        }
    })
}

function Mg(a, b, c = {}) {
    return Lg(a, b, !1, c)
}

function Ng(a, b, c = {}) {
    return Lg(a, b, !0, c)
}

function Og(a, b = {}) {
    return r(function*() {
        const c = yield Jg();
        if (c) {
            Jf(a);
            var d = Kg(a);
            yield wg(d.actualName, b);
            yield Eg(d.actualName, c)
        }
    })
}

function Pg(a, b = {}) {
    return r(function*() {
        const c = yield Jg();
        c && (Jf(a), yield wg(a, b), yield Eg(a, c))
    })
};

function Qg(a) {
    this.version = 1;
    this.args = a
};

function Rg() {
    var a = Sg;
    this.topic = "screen-created";
    this.h = a
}
Rg.prototype.toString = function() {
    return this.topic
};
const Tg = v("ytPubsub2Pubsub2Instance") || new J;
J.prototype.subscribe = J.prototype.subscribe;
J.prototype.unsubscribeByKey = J.prototype.fa;
J.prototype.publish = J.prototype.ca;
J.prototype.clear = J.prototype.clear;
w("ytPubsub2Pubsub2Instance", Tg);
const Ug = v("ytPubsub2Pubsub2SubscribedKeys") || {};
w("ytPubsub2Pubsub2SubscribedKeys", Ug);
const Vg = v("ytPubsub2Pubsub2TopicToKeys") || {};
w("ytPubsub2Pubsub2TopicToKeys", Vg);
const Wg = v("ytPubsub2Pubsub2IsAsync") || {};
w("ytPubsub2Pubsub2IsAsync", Wg);
w("ytPubsub2Pubsub2SkipSubKey", null);

function Xg(a) {
    var b = Yg;
    const c = Zg();
    c && c.publish.call(c, b.toString(), b, a)
}

function $g(a) {
    var b = Yg;
    const c = Zg();
    if (!c) return 0;
    const d = c.subscribe(b.toString(), (e, f) => {
        var g = v("ytPubsub2Pubsub2SkipSubKey");
        g && g == d || (g = () => {
            if (Ug[d]) try {
                if (f && b instanceof Rg && b != e) try {
                    var h = b.h,
                        k = f;
                    if (!k.args || !k.version) throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");
                    try {
                        if (!h.pa) {
                            const n = new h;
                            h.pa = n.version
                        }
                        var l = h.pa
                    } catch (n) {}
                    if (!l || k.version != l) throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");
                    try {
                        l = Reflect;
                        var m = l.construct; {
                            var p = k.args;
                            const n = p.length;
                            if (0 < n) {
                                const x = Array(n);
                                for (k = 0; k < n; k++) x[k] = p[k];
                                var t = x
                            } else t = []
                        }
                        f = m.call(l, h, t)
                    } catch (n) {
                        throw n.message = "yt.pubsub2.Data.deserialize(): " + n.message, n;
                    }
                } catch (n) {
                    throw n.message = "yt.pubsub2.pubsub2 cross-binary conversion error for " + b.toString() + ": " + n.message, n;
                }
                a.call(window, f)
            } catch (n) {
                we(n)
            }
        }, Wg[b.toString()] ? v("yt.scheduler.instance") ? De.h(g) : ye(g, 0) : g())
    });
    Ug[d] = !0;
    Vg[b.toString()] || (Vg[b.toString()] = []);
    Vg[b.toString()].push(d);
    return d
}

function ah() {
    var a = bh;
    const b = $g(function(c) {
        a.apply(void 0, arguments);
        ch(b)
    });
    return b
}

function ch(a) {
    const b = Zg();
    b && ("number" === typeof a && (a = [a]), oa(a, c => {
        b.unsubscribeByKey(c);
        delete Ug[c]
    }))
}

function Zg() {
    return v("ytPubsub2Pubsub2Instance")
};

function dh(a, b) {
    let c;
    return () => {
        c || (c = new eh(a, b));
        return c
    }
}
var eh = class extends Bg {
    constructor(a, b) {
        super(a, b);
        this.options = b;
        Jf(a)
    }
    j(a, b, c = {}) {
        return (this.options.da ? Ng : Mg)(a, b, Object.assign({}, c))
    }
    delete(a = {}) {
        return (this.options.da ? Pg : Og)(this.name, a)
    }
};
const fh = ["client.name", "client.version"];

function gh(a) {
    if (!a.errorMetadata || !a.errorMetadata.kvPairs) return a;
    a.errorMetadata.kvPairs = a.errorMetadata.kvPairs.filter(b => b.key ? fh.includes(b.key) : !1);
    return a
};
var hh;
hh = dh("ServiceWorkerLogsDatabase", {
    M: {
        SWHealthLog: {
            O: 1
        }
    },
    da: !0,
    upgrade: (a, b) => {
        b(1) && jg(a, "SWHealthLog", {
            keyPath: "id",
            autoIncrement: !0
        }).h.createIndex("swHealthNewRequest", ["interface", "timestamp"], {
            unique: !1
        })
    },
    version: 1
});

function ih(a, b) {
    return r(function*() {
        var c = yield Ag(hh(), b), d = N("INNERTUBE_CONTEXT_CLIENT_NAME", 0);
        const e = Object.assign({}, a);
        e.clientError && (e.clientError = gh(e.clientError));
        e.interface = d;
        return lg(c, "SWHealthLog", e)
    })
};
const jh = u.ytNetworklessLoggingInitializationOptions || {
    isNwlInitialized: !1,
    potentialEsfErrorCounter: 0
};
w("ytNetworklessLoggingInitializationOptions", jh);

function rf(a, b, c) {
    !N("VISITOR_DATA") && .01 > Math.random() && xe(new P("Missing VISITOR_DATA when sending innertube request.", "log_event", b, c));
    if (!a.isReady()) throw a = new P("innertube xhrclient not ready", "log_event", b, c), we(a), a;
    const d = {
        headers: c.headers || {},
        method: "POST",
        postParams: b,
        postBody: c.postBody,
        postBodyFormat: c.postBodyFormat || "JSON",
        onTimeout: () => {
            c.onTimeout()
        },
        onFetchTimeout: c.onTimeout,
        onSuccess: (m, p) => {
            if (c.onSuccess) c.onSuccess(p)
        },
        onFetchSuccess: m => {
            if (c.onSuccess) c.onSuccess(m)
        },
        onError: (m, p) => {
            if (c.onError) c.onError(p)
        },
        onFetchError: m => {
            if (c.onError) c.onError(m)
        },
        timeout: c.timeout,
        withCredentials: !0
    };
    d.headers["Content-Type"] || (d.headers["Content-Type"] = "application/json");
    b = "";
    var e = a.config_.za;
    e && (b = e);
    e = Cf(a.config_.Ba || !1, b, c);
    Object.assign(d.headers, e);
    (e = d.headers.Authorization) && !b && (d.headers["x-origin"] = window.location.origin);
    const f = `/${"youtubei"}/${a.config_.innertubeApiVersion}/${"log_event"}`;
    let g = {
            alt: "json"
        },
        h = a.config_.Aa && e;
    h = h && e.startsWith("Bearer");
    h || (g.key = a.config_.innertubeApiKey);
    const k = Le(`${b}${f}`, g || {}, !0),
        l = () => {
            try {
                Oe(k,
                    d)
            } catch (m) {
                if ("InvalidAccessError" == m.name) xe(Error("An extension is blocking network request."));
                else throw m;
            }
        };
    !O("use_new_nwl") && v("ytNetworklessLoggingInitializationOptions") && jh.isNwlInitialized ? Ig().then(m => {
        l(m)
    }) : l(!1)
}
class kh {
    constructor(a) {
        this.config_ = null;
        a ? this.config_ = a : Af() && (this.config_ = nf())
    }
    isReady() {
        !this.config_ && Af() && (this.config_ = nf());
        return !!this.config_
    }
};
let lh = kh;

function V(a, b, c = {}) {
    let d = lh;
    N("ytLoggingEventsDefaultDisabled", !1) && lh == kh && (d = null);
    S(a, b, d, c)
};
let mh = Date.now().toString();
const nh = u.ytLoggingGelSequenceIdObj_ || {};

function oh(a, b, c = {}) {
    var d = Math.round(c.timestamp || Q());
    C(a, 1, d < Number.MAX_SAFE_INTEGER ? d : 0);
    var e = Ee();
    d = new Rd;
    C(d, 1, c.timestamp || !isFinite(e) ? -1 : e);
    if (O("log_sequence_info_on_gel_web") && c.A) {
        e = c.A;
        const f = zf(e),
            g = new Qd;
        C(g, 2, f);
        C(g, 1, e);
        D(d, 3, g);
        c.ka && delete nh[c.A]
    }
    D(a, 33, d);
    (c.Ea ? kf : ef)({
        endpoint: "log_event",
        payload: a,
        cttAuthInfo: c.cttAuthInfo,
        L: c.L
    }, b)
};

function ph(a, b = {}) {
    let c = !1;
    N("ytLoggingEventsDefaultDisabled", !1) && lh === kh && (c = !0);
    oh(a, c ? null : lh, b)
};

function qh(a, b, c) {
    const d = new K;
    E(d, 72, Sd, a);
    c ? oh(d, c, b) : ph(d, b)
}

function rh(a, b, c) {
    const d = new K;
    E(d, 73, Sd, a);
    c ? oh(d, c, b) : ph(d, b)
}

function sh(a, b, c) {
    const d = new K;
    E(d, 78, Sd, a);
    c ? oh(d, c, b) : ph(d, b)
}

function th(a, b, c) {
    const d = new K;
    E(d, 208, Sd, a);
    c ? oh(d, c, b) : ph(d, b)
}

function uh(a, b, c) {
    const d = new K;
    E(d, 156, Sd, a);
    c ? oh(d, c, b) : ph(d, b)
}

function vh(a, b, c) {
    const d = new K;
    E(d, 215, Sd, a);
    c ? oh(d, c, b) : ph(d, b)
}

function wh(a, b, c) {
    const d = new K;
    E(d, 111, Sd, a);
    c ? oh(d, c, b) : ph(d, b)
};
let xh = u.ytLoggingDocDocumentNonce_;
if (!xh) {
    var yh;
    a: {
        if (window.crypto && window.crypto.getRandomValues) try {
            const d = Array(16),
                e = new Uint8Array(16);
            window.crypto.getRandomValues(e);
            for (let f = 0; f < d.length; f++) d[f] = e[f];
            yh = d;
            break a
        } catch (d) {}
        const c = Array(16);
        for (let d = 0; 16 > d; d++) {
            const e = Date.now();
            for (let f = 0; f < e % 23; f++) c[d] = Math.random();
            c[d] = Math.floor(256 * Math.random())
        }
        if (mh) {
            let d = 1;
            for (let e = 0; e < mh.length; e++) c[d % 16] = c[d % 16] ^ c[(d - 1) % 16] / 4 ^ mh.charCodeAt(e), d++
        }
        yh = c
    }
    const a = yh,
        b = [];
    for (let c = 0; c < a.length; c++) b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[c] &
        63));
    xh = b.join("")
}
const zh = xh;
let Ah = kh;
var Bh = {
    Na: 0,
    La: 1,
    Ma: 2,
    gb: 3,
    Oa: 4,
    kb: 5,
    hb: 6,
    jb: 7,
    ib: 8,
    0: "DEFAULT",
    1: "CHAT",
    2: "CONVERSATIONS",
    3: "MINIPLAYER",
    4: "DIALOG",
    5: "VOZ",
    6: "MUSIC_WATCH_TABS",
    7: "SHARE",
    8: "PUSH_NOTIFICATIONS"
};
let Ch = 1;

function Dh(a) {
    const b = Ch++;
    return new Eh({
        veType: a,
        veCounter: b,
        elementIndex: void 0,
        dataElement: void 0,
        youtubeData: void 0,
        jspbYoutubeData: void 0
    })
}
var Eh = class {
    constructor(a) {
        this.h = a
    }
    getAsJson() {
        const a = {};
        void 0 !== this.h.trackingParams ? a.trackingParams = this.h.trackingParams : (a.veType = this.h.veType, void 0 !== this.h.veCounter && (a.veCounter = this.h.veCounter), void 0 !== this.h.elementIndex && (a.elementIndex = this.h.elementIndex));
        void 0 !== this.h.dataElement && (a.dataElement = this.h.dataElement.getAsJson());
        void 0 !== this.h.youtubeData && (a.youtubeData = this.h.youtubeData);
        return a
    }
    getAsJspb() {
        const a = new Dd;
        void 0 !== this.h.trackingParams ? C(a, 1, this.h.trackingParams) :
            (void 0 !== this.h.veType && C(a, 2, this.h.veType), void 0 !== this.h.veCounter && C(a, 6, this.h.veCounter), void 0 !== this.h.elementIndex && C(a, 3, this.h.elementIndex));
        if (void 0 !== this.h.dataElement) {
            var b = this.h.dataElement.getAsJspb();
            D(a, 7, b)
        }
        void 0 !== this.h.youtubeData && D(a, 8, this.h.jspbYoutubeData);
        return a
    }
    toString() {
        return JSON.stringify(this.getAsJson())
    }
    isClientVe() {
        return !this.h.trackingParams && !!this.h.veType
    }
};

function Fh(a = 0) {
    return 0 == a ? "client-screen-nonce" : `${"client-screen-nonce"}.${a}`
}

function Gh(a = 0) {
    return 0 == a ? "ROOT_VE_TYPE" : `${"ROOT_VE_TYPE"}.${a}`
}

function Hh(a = 0) {
    return N(Gh(a), void 0)
}

function Ih(a = 0) {
    return (a = Hh(a)) ? new Eh({
        veType: a,
        youtubeData: void 0,
        jspbYoutubeData: void 0
    }) : null
}

function Jh() {
    let a = N("csn-to-ctt-auth-info");
    a || (a = {}, M("csn-to-ctt-auth-info", a));
    return a
}

function W(a = 0) {
    a = N(Fh(a));
    if (!a && !N("USE_CSN_FALLBACK", !0)) return null;
    a || (a = "UNDEFINED_CSN");
    return a ? a : null
}

function Kh(a, b, c) {
    const d = Jh();
    (c = W(c)) && delete d[c];
    b && (d[a] = b)
}

function Lh(a) {
    return Jh()[a]
}

function Mh(a, b, c = 0, d) {
    if (a !== N(Fh(c)) || b !== N(Gh(c))) Kh(a, d, c), M(Fh(c), a), M(Gh(c), b), b = () => {
        setTimeout(() => {
            if (a)
                if (O("web_time_via_jspb")) {
                    var e = new Ed;
                    C(e, 1, zh);
                    C(e, 2, a);
                    O("use_default_heartbeat_client") ? wh(e) : wh(e, void 0, Ah)
                } else e = {
                    clientDocumentNonce: zh,
                    clientScreenNonce: a
                }, O("use_default_heartbeat_client") ? V("foregroundHeartbeatScreenAssociated", e) : S("foregroundHeartbeatScreenAssociated", e, Ah)
        }, 0)
    }, "requestAnimationFrame" in window ? window.requestAnimationFrame(b) : b()
};
const Nh = [{
    ba: a => `Cannot read property '${a.key}'`,
    U: {
        Error: [{
            v: /(Permission denied) to access property "([^']+)"/,
            groups: ["reason", "key"]
        }],
        TypeError: [{
            v: /Cannot read property '([^']+)' of (null|undefined)/,
            groups: ["key", "value"]
        }, {
            v: /\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,
            groups: ["value", "key"]
        }, {
            v: /\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,
            groups: ["value", "key"]
        }, {
            v: /No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,
            groups: ["key"]
        }, {
            v: /Unable to get property '([^']+)' of (undefined or null) reference/,
            groups: ["key", "value"]
        }, {
            v: /(null) is not an object \(evaluating '(?:([^.]+)\.)?([^']+)'\)/,
            groups: ["value", "base", "key"]
        }]
    }
}, {
    ba: a => `Cannot call '${a.key}'`,
    U: {
        TypeError: [{
            v: /(?:([^ ]+)?\.)?([^ ]+) is not a function/,
            groups: ["base", "key"]
        }, {
            v: /([^ ]+) called on (null or undefined)/,
            groups: ["key", "value"]
        }, {
            v: /Object (.*) has no method '([^ ]+)'/,
            groups: ["base", "key"]
        }, {
            v: /Object doesn't support property or method '([^ ]+)'/,
            groups: ["key"]
        }, {
            v: /\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
            groups: ["key"]
        }, {
            v: /\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,
            groups: ["key"]
        }]
    }
}, {
    ba: a => `${a.key} is not defined`,
    U: {
        ReferenceError: [{
            v: /(.*) is not defined/,
            groups: ["key"]
        }, {
            v: /Can't find variable: (.*)/,
            groups: ["key"]
        }]
    }
}];
var Ph = {
    G: [],
    D: [{
        qa: Oh,
        weight: 500
    }]
};

function Oh(a) {
    if ("JavaException" === a.name) return !0;
    a = a.stack;
    return a.includes("chrome://") || a.includes("chrome-extension://") || a.includes("moz-extension://")
};

function Qh() {
    if (!Rh) {
        var a = Rh = new Sh;
        a.G.length = 0;
        a.D.length = 0;
        Th(a, Ph)
    }
    return Rh
}

function Th(a, b) {
    b.G && a.G.push.apply(a.G, b.G);
    b.D && a.D.push.apply(a.D, b.D)
}
var Sh = class {
        constructor() {
            this.D = [];
            this.G = []
        }
    },
    Rh;
const Uh = new J;

function Vh(a) {
    const b = a.length;
    let c = 0;
    const d = () => a.charCodeAt(c++);
    do {
        var e = Wh(d);
        if (Infinity === e) break;
        const f = e >> 3;
        switch (e & 7) {
            case 0:
                e = Wh(d);
                if (2 === f) return e;
                break;
            case 1:
                if (2 === f) return;
                c += 8;
                break;
            case 2:
                e = Wh(d);
                if (2 === f) return a.substr(c, e);
                c += e;
                break;
            case 5:
                if (2 === f) return;
                c += 4;
                break;
            default:
                return
        }
    } while (c < b)
}

function Wh(a) {
    let b = a(),
        c = b & 127;
    if (128 > b) return c;
    b = a();
    c |= (b & 127) << 7;
    if (128 > b) return c;
    b = a();
    c |= (b & 127) << 14;
    if (128 > b) return c;
    b = a();
    return 128 > b ? c | (b & 127) << 21 : Infinity
};

function Xh(a, b, c, d) {
    if (a)
        if (Array.isArray(a)) {
            var e = d;
            for (d = 0; d < a.length && !(a[d] && (e += Yh(d, a[d], b, c), 500 < e)); d++);
            d = e
        } else if ("object" === typeof a)
        for (e in a) {
            if (a[e]) {
                var f = e;
                var g = a[e],
                    h = b,
                    k = c;
                f = "string" !== typeof g || "clickTrackingParams" !== f && "trackingParams" !== f ? 0 : (g = Vh(atob(g.replace(/-/g, "+").replace(/_/g, "/")))) ? Yh(`${f}.ve`, g, h, k) : 0;
                d += f;
                d += Yh(e, a[e], b, c);
                if (500 < d) break
            }
        } else c[b] = Zh(a), d += c[b].length;
    else c[b] = Zh(a), d += c[b].length;
    return d
}

function Yh(a, b, c, d) {
    c += `.${a}`;
    a = Zh(b);
    d[c] = a;
    return c.length + a.length
}

function Zh(a) {
    try {
        return ("string" === typeof a ? a : String(JSON.stringify(a))).substr(0, 500)
    } catch (b) {
        return `unable to serialize ${typeof a} (${b.message})`
    }
};
var $h = new Set,
    ai = 0,
    bi = 0,
    ci = 0,
    di = [];
const ei = ["PhantomJS", "Googlebot", "TO STOP THIS SECURITY SCAN go/scan"];

function fi(a) {
    gi(a)
}

function hi(a) {
    gi(a, "WARNING")
}

function gi(a, b = "ERROR") {
    var c = {};
    c.name = N("INNERTUBE_CONTEXT_CLIENT_NAME", 1);
    c.version = N("INNERTUBE_CONTEXT_CLIENT_VERSION", void 0);
    ii(a, c || {}, b)
}

function ii(a, b, c = "ERROR") {
    if (a) {
        a.hasOwnProperty("level") && a.level && (c = a.level);
        if (O("console_log_js_exceptions")) {
            var d = [];
            d.push(`Name: ${a.name}`);
            d.push(`Message: ${a.message}`);
            a.hasOwnProperty("params") && d.push(`Error Params: ${JSON.stringify(a.params)}`);
            a.hasOwnProperty("args") && d.push(`Error args: ${JSON.stringify(a.args)}`);
            d.push(`File name: ${a.fileName}`);
            d.push(`Stacktrace: ${a.stack}`);
            window.console.log(d.join("\n"), a)
        }
        if (!(5 <= ai)) {
            d = di;
            var e = yc(a);
            const H = e.message || "Unknown Error",
                Fa = e.name || "UnknownError";
            var f = e.stack || a.i || "Not available";
            if (f.startsWith(`${Fa}: ${H}`)) {
                var g = f.split("\n");
                g.shift();
                f = g.join("\n")
            }
            g = e.lineNumber || "Not available";
            e = e.fileName || "Not available";
            let I = 0;
            if (a.hasOwnProperty("args") && a.args && a.args.length)
                for (var h = 0; h < a.args.length && !(I = Xh(a.args[h], `params.${h}`, b, I), 500 <= I); h++);
            else if (a.hasOwnProperty("params") && a.params) {
                const Z = a.params;
                if ("object" === typeof a.params)
                    for (h in Z) {
                        if (!Z[h]) continue;
                        const Uf = `params.${h}`,
                            Vf = Zh(Z[h]);
                        b[Uf] =
                            Vf;
                        I += Uf.length + Vf.length;
                        if (500 < I) break
                    } else b.params = Zh(Z)
            }
            if (d.length)
                for (h = 0; h < d.length && !(I = Xh(d[h], `params.context.${h}`, b, I), 500 <= I); h++);
            navigator.vendor && !b.hasOwnProperty("vendor") && (b["device.vendor"] = navigator.vendor);
            b = {
                message: H,
                name: Fa,
                lineNumber: g,
                fileName: e,
                stack: f,
                params: b,
                sampleWeight: 1
            };
            d = Number(a.columnNumber);
            isNaN(d) || (b.lineNumber = `${b.lineNumber}:${d}`);
            if ("IGNORED" === a.level) var k = 0;
            else a: {
                a = Qh();d = b;
                for (k of a.G)
                    if (d.message && d.message.match(k.Ca)) {
                        k = k.weight;
                        break a
                    }
                for (var l of a.D)
                    if (l.qa(d)) {
                        k =
                            l.weight;
                        break a
                    }
                k = 1
            }
            b.sampleWeight = k;
            k = b;
            for (var m of Nh)
                if (m.U[k.name]) {
                    l = m.U[k.name];
                    for (var p of l)
                        if (l = k.message.match(p.v)) {
                            k.params["params.error.original"] = l[0];
                            a = p.groups;
                            b = {};
                            for (d = 0; d < a.length; d++) b[a[d]] = l[d + 1], k.params[`params.error.${a[d]}`] = l[d + 1];
                            k.message = m.ba(b);
                            break
                        }
                }
            k.params || (k.params = {});
            m = Qh();
            k.params["params.errorServiceSignature"] = `msg=${m.G.length}&cb=${m.D.length}`;
            k.params["params.serviceWorker"] = "true";
            u.document && u.document.querySelectorAll && (k.params["params.fscripts"] =
                String(document.querySelectorAll("script:not([nonce])").length));
            wa("sample").constructor !== va && (k.params["params.fconst"] = "true");
            window.yterr && "function" === typeof window.yterr && window.yterr(k);
            if (0 !== k.sampleWeight && !$h.has(k.message)) {
                "ERROR" === c ? (Uh.ca("handleError", k), O("record_app_crashed_web") && 0 === ci && 1 === k.sampleWeight && (ci++, O("errors_via_jspb") ? (m = new Cd, C(m, 1, 1), O("report_client_error_with_app_crash_ks") || (l = new xd, C(l, 1, k.message), p = new yd, D(p, 3, l), l = new zd, D(l, 5, p), p = new Bd, D(p, 9, l),
                    D(m, 4, p)), p = new K, E(p, 20, Sd, m), ph(p, void 0)) : (m = {
                    appCrashType: "APP_CRASH_TYPE_BREAKPAD"
                }, O("report_client_error_with_app_crash_ks") || (m.systemHealth = {
                    crashData: {
                        clientError: {
                            logMessage: {
                                message: k.message
                            }
                        }
                    }
                }), V("appCrashed", m))), bi++) : "WARNING" === c && Uh.ca("handleWarning", k);
                a: {
                    if (O("errors_via_jspb")) {
                        if (ji()) var t = void 0;
                        else {
                            m = new ud;
                            C(m, 1, k.stack);
                            k.fileName && C(m, 4, k.fileName);
                            var n = k.lineNumber && k.lineNumber.split ? k.lineNumber.split(":") : [];
                            0 !== n.length && (1 !== n.length || isNaN(Number(n[0])) ? 2 !==
                                n.length || isNaN(Number(n[0])) || isNaN(Number(n[1])) || (C(m, 2, Number(n[0])), C(m, 3, Number(n[1]))) : C(m, 2, Number(n[0])));
                            n = new xd;
                            C(n, 1, k.message);
                            C(n, 3, k.name);
                            C(n, 6, k.sampleWeight);
                            "ERROR" === c ? C(n, 2, 2) : "WARNING" === c ? C(n, 2, 1) : C(n, 2, 0);
                            var x = new vd;
                            C(x, 1, !0);
                            E(x, 3, wd, m);
                            m = new sd;
                            C(m, 3, window.location.href);
                            p = N("FEXP_EXPERIMENTS", []);
                            for (b = 0; b < p.length; b++) l = m, a = p[b], qb(l), tb(l, 5).push(a);
                            p = me();
                            if (!ne() && p)
                                for (var z of Object.keys(p)) l = new td, C(l, 1, z), l.setValue(String(p[z])), zb(m, 4, td, l);
                            if (z = k.params)
                                for (t of Object.keys(z)) p =
                                    new td, C(p, 1, `client.${t}`), p.setValue(String(z[t])), zb(m, 4, td, p);
                            z = N("SERVER_NAME", void 0);
                            t = N("SERVER_VERSION", void 0);
                            z && t && (p = new td, C(p, 1, "server.name"), p.setValue(z), zb(m, 4, td, p), z = new td, C(z, 1, "server.version"), z.setValue(t), zb(m, 4, td, z));
                            t = new yd;
                            D(t, 1, m);
                            D(t, 2, x);
                            D(t, 3, n)
                        }
                        if (!t) break a;
                        z = new K;
                        E(z, 163, Sd, t);
                        ph(z, void 0)
                    } else {
                        if (ji()) t = void 0;
                        else {
                            z = {
                                stackTrace: k.stack
                            };
                            k.fileName && (z.filename = k.fileName);
                            t = k.lineNumber && k.lineNumber.split ? k.lineNumber.split(":") : [];
                            0 !== t.length && (1 !== t.length ||
                                isNaN(Number(t[0])) ? 2 !== t.length || isNaN(Number(t[0])) || isNaN(Number(t[1])) || (z.lineNumber = Number(t[0]), z.columnNumber = Number(t[1])) : z.lineNumber = Number(t[0]));
                            t = {
                                level: "ERROR_LEVEL_UNKNOWN",
                                message: k.message,
                                errorClassName: k.name,
                                sampleWeight: k.sampleWeight
                            };
                            "ERROR" === c ? t.level = "ERROR_LEVEL_ERROR" : "WARNING" === c && (t.level = "ERROR_LEVEL_WARNNING");
                            z = {
                                isObfuscated: !0,
                                browserStackInfo: z
                            };
                            m = {
                                pageUrl: window.location.href,
                                kvPairs: []
                            };
                            N("FEXP_EXPERIMENTS") && (m.experimentIds = N("FEXP_EXPERIMENTS"));
                            p = me();
                            if (!ne() &&
                                p)
                                for (x of Object.keys(p)) m.kvPairs.push({
                                    key: x,
                                    value: String(p[x])
                                });
                            if (x = k.params)
                                for (n of Object.keys(x)) m.kvPairs.push({
                                    key: `client.${n}`,
                                    value: String(x[n])
                                });
                            n = N("SERVER_NAME", void 0);
                            x = N("SERVER_VERSION", void 0);
                            n && x && (m.kvPairs.push({
                                key: "server.name",
                                value: n
                            }), m.kvPairs.push({
                                key: "server.version",
                                value: x
                            }));
                            t = {
                                errorMetadata: m,
                                stackTrace: z,
                                logMessage: t
                            }
                        }
                        if (!t) break a;
                        V("clientError", t)
                    }("ERROR" === c || O("errors_flush_gel_always_killswitch")) && ff()
                }
                try {
                    $h.add(k.message)
                } catch (Z) {}
                ai++
            }
        }
    }
}

function ji() {
    for (const a of ei) {
        const b = za();
        if (b && 0 <= b.toLowerCase().indexOf(a.toLowerCase())) return !0
    }
    return !1
};
class Sg extends Qg {
    constructor(a) {
        super(arguments);
        this.csn = a
    }
}
const Yg = new Rg,
    ki = [];
let mi = li,
    ni = 0;

function oi(a, b, c, d, e, f, g) {
    const h = mi();
    f = new Eh({
        veType: b,
        youtubeData: f,
        jspbYoutubeData: void 0
    });
    e = {
        cttAuthInfo: e,
        A: h
    };
    const k = () => {
        hi(new P("newScreen() parent element does not have a VE - rootVe", b))
    };
    if (O("il_via_jspb")) {
        const l = new Hd;
        l.B(h);
        Gd(l, f.getAsJspb());
        c && c.visualElement ? (f = new Jd, c.clientScreenNonce && C(f, 2, c.clientScreenNonce), Id(f, c.visualElement.getAsJspb()), g && C(f, 4, Fd[g]), D(l, 5, f)) : c && k();
        d && C(l, 3, d);
        uh(l, e, a)
    } else f = {
        csn: h,
        pageVe: f.getAsJson()
    }, c && c.visualElement ? (f.implicitGesture = {
        parentCsn: c.clientScreenNonce,
        gesturedVe: c.visualElement.getAsJson()
    }, g && (f.implicitGesture.gestureType = g)) : c && k(), d && (f.cloneCsn = d), a ? S("screenCreated", f, a, e) : V("screenCreated", f, e);
    Xg(new Sg(h));
    return h
}

function pi(a, b, c, d) {
    const e = d.filter(g => {
            g.csn !== b ? (g.csn = b, g = !0) : g = !1;
            return g
        }),
        f = {
            cttAuthInfo: Lh(b),
            A: b
        };
    for (const g of d) d = g.getAsJson(), (ra(d) || !d.trackingParams && !d.veType) && hi(Error("Child VE logged with no data"));
    if (O("il_via_jspb")) {
        const g = new Md;
        g.B(b);
        Kd(g, c.getAsJspb());
        pa(e, h => {
            h = h.getAsJspb();
            zb(g, 3, Dd, h)
        });
        "UNDEFINED_CSN" == b ? X("visualElementAttached", g, f) : vh(g, f, a)
    } else c = {
        csn: b,
        parentVe: c.getAsJson(),
        childVes: pa(e, g => g.getAsJson())
    }, "UNDEFINED_CSN" == b ? X("visualElementAttached", c, f) : a ? S("visualElementAttached", c, a, f) : V("visualElementAttached", c, f)
}

function qi(a, b, c, d, e) {
    const f = {
        cttAuthInfo: Lh(b),
        A: b
    };
    if (O("il_via_jspb")) {
        const g = new Od;
        g.B(b);
        c = c.getAsJspb();
        D(g, 2, c);
        C(g, 4, 1);
        d && D(g, 3, e);
        "UNDEFINED_CSN" == b ? X("visualElementShown", g, f) : qh(g, f, a)
    } else e = {
        csn: b,
        ve: c.getAsJson(),
        eventType: 1
    }, d && (e.clientData = d), "UNDEFINED_CSN" == b ? X("visualElementShown", e, f) : a ? S("visualElementShown", e, a, f) : V("visualElementShown", e, f)
}

function ri(a, b, c, d = !1) {
    var e = d ? 16 : 8;
    const f = {
        cttAuthInfo: Lh(b),
        A: b,
        ka: d
    };
    O("il_via_jspb") ? (e = new Od, e.B(b), c = c.getAsJspb(), D(e, 2, c), C(e, 4, d ? 16 : 8), "UNDEFINED_CSN" == b ? X("visualElementHidden", e, f) : rh(e, f, a)) : (d = {
        csn: b,
        ve: c.getAsJson(),
        eventType: e
    }, "UNDEFINED_CSN" == b ? X("visualElementHidden", d, f) : a ? S("visualElementHidden", d, a, f) : V("visualElementHidden", d, f))
}

function si(a, b, c, d) {
    var e = "INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK";
    const f = {
        cttAuthInfo: Lh(b),
        A: b
    };
    if (O("il_via_jspb")) {
        const g = new Nd;
        g.B(b);
        c = c.getAsJspb();
        D(g, 2, c);
        C(g, 4, Fd[e]);
        d && D(g, 3, void 0);
        "UNDEFINED_CSN" == b ? X("visualElementGestured", g, f) : sh(g, f, a)
    } else e = {
        csn: b,
        ve: c.getAsJson(),
        gestureType: e
    }, d && (e.clientData = d), "UNDEFINED_CSN" == b ? X("visualElementGestured", e, f) : a ? S("visualElementGestured", e, a, f) : V("visualElementGestured", e, f)
}

function li() {
    for (var a = Math.random() + "", b = [], c = 0, d = 0; d < a.length; d++) {
        var e = a.charCodeAt(d);
        255 < e && (b[c++] = e & 255, e >>= 8);
        b[c++] = e
    }
    return Oa(b, 3)
}

function X(a, b, c) {
    ki.push({
        payloadName: a,
        payload: b,
        options: c
    });
    ni || (ni = ah())
}

function bh(a) {
    if (ki) {
        for (let b of ki)
            if (b.payload)
                if (O("il_via_jspb")) switch (b.payload.B(a.csn), b.payloadName) {
                    case "screenCreated":
                        uh(b.payload, b.options);
                        break;
                    case "visualElementAttached":
                        vh(b.payload, b.options);
                        break;
                    case "visualElementShown":
                        qh(b.payload, b.options);
                        break;
                    case "visualElementHidden":
                        rh(b.payload, b.options);
                        break;
                    case "visualElementGestured":
                        sh(b.payload, b.options);
                        break;
                    case "visualElementStateChanged":
                        th(b.payload, b.options);
                        break;
                    default:
                        hi(new P("flushQueue unable to map payloadName to JSPB setter"))
                } else b.payload.csn =
                    a.csn, S(b.payloadName, b.payload, null, b.options);
        ki.length = 0
    }
    ni = 0
};

function ti(a, b) {
    return b.data && b.data.loggingDirectives ? b.data.loggingDirectives.trackingParams || "" : b.data && b.data.trackingParams || ""
}

function ui(a, b) {
    const c = W(void 0);
    return null !== a.j && c != a.j ? (hi(new P("VisibilityLogger called before newScreen()", {
        caller: b.tagName,
        previous_csn: a.csn,
        current_csn: c
    })), null) : c
}

function vi(a) {
    return parseInt(a.data && a.data.loggingDirectives && a.data.loggingDirectives.visibility && a.data.loggingDirectives.visibility.types || "", 10) || 1
}

function wi(a, b) {
    var c = ti(0, b),
        d = b.visualElement ? b.visualElement : c,
        e = a.m.has(d);
    const f = a.i.get(d);
    a.m.add(d);
    a.i.set(d, !0);
    b.h && !e && b.h();
    if (c || b.visualElement)
        if (d = ui(a, b)) {
            var g = !(!b.data || !b.data.loggingDirectives);
            if (vi(b) || g) {
                var h = b.visualElement ? b.visualElement : new Eh({
                    trackingParams: c
                });
                c = b.i;
                var k = b.j;
                g || e ? vi(b) & 4 ? f || (a = a.h, b = {
                    cttAuthInfo: Lh(d),
                    A: d
                }, O("il_via_jspb") ? (e = new Od, e.B(d), h = h.getAsJspb(), D(e, 2, h), C(e, 4, 4), c && D(e, 3, k), "UNDEFINED_CSN" == d ? X("visualElementShown", e, b) : qh(e, b, a)) : (k = {
                    csn: d,
                    ve: h.getAsJson(),
                    eventType: 4
                }, c && (k.clientData = c), "UNDEFINED_CSN" == d ? X("visualElementShown", k, b) : a ? S("visualElementShown", k, a, b) : V("visualElementShown", k, b))) : vi(b) & 1 && !e && qi(a.h, d, h, c, k) : qi(a.h, d, h, c)
            }
        }
}
class xi {
    constructor() {
        this.m = new Set;
        this.l = new Set;
        this.i = new Map;
        this.j = null;
        this.h = kh
    }
    clear() {
        this.m.clear();
        this.l.clear();
        this.i.clear();
        this.j = null
    }
}(function() {
    var a = xi;
    a.aa = void 0;
    a.u = function() {
        return a.aa ? a.aa : a.aa = new a
    }
})();
var yi = a => self.btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(a)))).replace(/\+/g, "-").replace(/\//g, "_");
var zi = ["notifications_register", "notifications_check_registration"];
let Ai = null;

function Y(a, b) {
    const c = {};
    c.key = a;
    c.value = b;
    return Bi().then(d => new Promise((e, f) => {
        try {
            const g = d.transaction("swpushnotificationsstore", "readwrite").objectStore("swpushnotificationsstore").put(c);
            g.onsuccess = () => {
                e()
            };
            g.onerror = () => {
                f()
            }
        } catch (g) {
            f(g)
        }
    }))
}

function Ci() {
    return Y("IndexedDBCheck", "testing IndexedDB").then(() => Di("IndexedDBCheck")).then(a => "testing IndexedDB" === a ? Promise.resolve() : Promise.reject()).then(() => !0).catch(() => !1)
}

function Di(a) {
    const b = new P("Error accessing DB");
    return Bi().then(c => new Promise((d, e) => {
        try {
            const f = c.transaction("swpushnotificationsstore").objectStore("swpushnotificationsstore").get(a);
            f.onsuccess = () => {
                const g = f.result;
                d(g ? g.value : null)
            };
            f.onerror = () => {
                b.params = {
                    key: a,
                    source: "onerror"
                };
                e(b)
            }
        } catch (f) {
            b.params = {
                key: a,
                thrownError: String(f)
            }, e(b)
        }
    }), () => null)
}

function Bi() {
    return Ai ? Promise.resolve(Ai) : new Promise((a, b) => {
        const c = self.indexedDB.open("swpushnotificationsdb");
        c.onerror = b;
        c.onsuccess = () => {
            const d = c.result;
            if (d.objectStoreNames.contains("swpushnotificationsstore")) Ai = d, a(Ai);
            else return self.indexedDB.deleteDatabase("swpushnotificationsdb"), Bi()
        };
        c.onupgradeneeded = Ei
    })
}

function Ei(a) {
    a = a.target.result;
    a.objectStoreNames.contains("swpushnotificationsstore") && a.deleteObjectStore("swpushnotificationsstore");
    a.createObjectStore("swpushnotificationsstore", {
        keyPath: "key"
    })
};
const Fi = {
    WEB_UNPLUGGED: "^unplugged/",
    WEB_UNPLUGGED_ONBOARDING: "^unplugged/",
    WEB_UNPLUGGED_OPS: "^unplugged/",
    WEB_UNPLUGGED_PUBLIC: "^unplugged/",
    WEB_CREATOR: "^creator/",
    WEB_KIDS: "^kids/",
    WEB_EXPERIMENTS: "^experiments/",
    WEB_MUSIC: "^music/",
    WEB_REMIX: "^music/",
    WEB_MUSIC_EMBEDDED_PLAYER: "^music/",
    WEB_MUSIC_EMBEDDED_PLAYER: "^main_app/|^sfv/"
};

function Gi(a) {
    if (1 === a.length) return a[0];
    var b = Fi.UNKNOWN_INTERFACE;
    if (b) {
        b = new RegExp(b);
        for (var c of a)
            if (b.exec(c)) return c
    }
    const d = [];
    Object.entries(Fi).forEach(([e, f]) => {
        "UNKNOWN_INTERFACE" !== e && d.push(f)
    });
    c = new RegExp(d.join("|"));
    a.sort((e, f) => e.length - f.length);
    for (const e of a)
        if (!c.exec(e)) return e;
    return a[0]
}

function Hi(a) {
    return `/youtubei/v1/${Gi(a)}`
};
const Ii = window;
class Ji {
    constructor() {
        this.timing = {};
        this.clearResourceTimings = () => {};
        this.webkitClearResourceTimings = () => {};
        this.mozClearResourceTimings = () => {};
        this.msClearResourceTimings = () => {};
        this.oClearResourceTimings = () => {}
    }
}
var Ki = Ii.performance || Ii.mozPerformance || Ii.msPerformance || Ii.webkitPerformance || new Ji;
la(Ki.clearResourceTimings || Ki.webkitClearResourceTimings || Ki.mozClearResourceTimings || Ki.msClearResourceTimings || Ki.oClearResourceTimings || ha, Ki);
w("ytLoggingLatencyUsageStats_", u.ytLoggingLatencyUsageStats_ || {});

function Li() {
    Mi.h || (Mi.h = new Mi);
    return Mi.h
}

function Ni(a, b, c = {}) {
    a.i.add(c.layer || 0);
    a.j = () => {
        Oi(a, b, c);
        var d = Ih(c.layer);
        if (d) {
            for (var e of a.m) Pi(a, e[0], e[1] || d, c.layer);
            for (const k of a.C) {
                e = W(0);
                var f = k[0] || Ih(0);
                if (e && f) {
                    d = a.client;
                    var g = f,
                        h = k[1];
                    f = {
                        cttAuthInfo: Lh(e),
                        A: e
                    };
                    O("il_via_jspb") ? (h = new Pd, h.B(e), g = g.getAsJspb(), D(h, 2, g), "UNDEFINED_CSN" == e ? X("visualElementStateChanged", h, f) : th(h, f, d)) : (g = {
                        csn: e,
                        ve: g.getAsJson(),
                        clientData: h
                    }, "UNDEFINED_CSN" == e ? X("visualElementStateChanged", g, f) : d ? S("visualElementStateChanged", g, d, f) : V("visualElementStateChanged",
                        g, f))
                }
            }
        }
    };
    W(c.layer) || a.j();
    if (c.ia)
        for (const d of c.ia) Qi(a, d, c.layer);
    else gi(Error("Delayed screen needs a data promise."))
}

function Oi(a, b, c = {}) {
    c.layer || (c.layer = 0);
    var d = void 0 !== c.Da ? c.Da : c.layer;
    var e = W(d);
    d = Ih(d);
    let f;
    d && (void 0 !== c.parentCsn ? f = {
        clientScreenNonce: c.parentCsn,
        visualElement: d
    } : e && "UNDEFINED_CSN" !== e && (f = {
        clientScreenNonce: e,
        visualElement: d
    }));
    let g;
    const h = N("EVENT_ID");
    "UNDEFINED_CSN" === e && h && (g = {
        servletData: {
            serializedServletEventId: h
        }
    });
    let k;
    try {
        k = oi(a.client, b, f, c.ha, c.cttAuthInfo, g, c.tb)
    } catch (l) {
        a = l;
        c = [{
            Db: b,
            rootVe: d,
            parentVisualElement: void 0,
            rb: e,
            yb: f,
            ha: c.ha
        }];
        a.args || (a.args = []);
        a.args.push(...c);
        gi(l);
        return
    }
    Mh(k, b, c.layer, c.cttAuthInfo);
    if (b = e && "UNDEFINED_CSN" !== e && d) {
        a: {
            for (const l of Object.values(Bh))
                if (W(l) == e) {
                    b = !0;
                    break a
                }
            b = !1
        }
        b = !b
    }
    b && ri(a.client, e, d, !0);
    a.h[a.h.length - 1] && !a.h[a.h.length - 1].csn && (a.h[a.h.length - 1].csn = k || "");
    d = xi.u();
    d.clear();
    d.j = W();
    d = Ih(c.layer);
    e && "UNDEFINED_CSN" !== e && d && (O("web_mark_root_visible") || O("music_web_mark_root_visible")) && qi(void 0, k, d, void 0);
    a.i.delete(c.layer || 0);
    a.j = void 0;
    for (const [l, m] of a.N) e = l, m.has(c.layer) && d && Pi(a, e, d, c.layer);
    for (c = 0; c <
        a.l.length; c++) {
        e = a.l[c];
        try {
            e()
        } catch (l) {
            gi(l)
        }
    }
    a.l.length = 0;
    for (c = 0; c < a.s.length; c++) {
        e = a.s[c];
        try {
            e()
        } catch (l) {
            gi(l)
        }
    }
}

function Ri(a) {
    var b = 28631,
        c = {
            layer: 8
        };
    [28631].includes(b) || (hi(new P("createClientScreen() called with a non-page VE", b)), b = 83769);
    c.isHistoryNavigation || a.h.push({
        rootVe: b,
        key: c.key || ""
    });
    a.m = [];
    a.C = [];
    c.ia ? Ni(a, b, c) : Oi(a, b, c)
}

function Qi(a, b, c = 0) {
    b.then(d => {
        var e, f;
        a.i.has(c) && a.j && a.j();
        const g = W(c),
            h = Ih(c);
        g && h && ((null === (e = null === d || void 0 === d ? void 0 : d.response) || void 0 === e ? 0 : e.trackingParams) && pi(a.client, g, h, [new Eh({
            trackingParams: d.response.trackingParams
        })]), (null === (f = null === d || void 0 === d ? void 0 : d.playerResponse) || void 0 === f ? 0 : f.trackingParams) && pi(a.client, g, h, [new Eh({
            trackingParams: d.playerResponse.trackingParams
        })]))
    })
}

function Pi(a, b, c, d = 0) {
    if (a.i.has(d)) a.m.push([b, c]);
    else {
        var e = W(d);
        c = c || Ih(d);
        e && c && pi(a.client, e, c, [b])
    }
}

function Si(a, b) {
    b = new Eh({
        trackingParams: b
    });
    Pi(a, b, void 0, 8);
    return b
}

function Ti(a, b, c = 0) {
    (c = W(c)) && si(a.client, c, b, void 0)
}

function Ui(a, b, c, d = 0) {
    if (!b) return !1;
    if (O("web_ignore_no_ve_clicks")) {
        const e = Vh(atob(b.replace(/-/g, "+").replace(/_/g, "/")));
        if (!e || 0 === e) return !1
    }
    d = W(d);
    if (!d) return !1;
    si(a.client, d, new Eh({
        trackingParams: b
    }), c);
    return !0
}

function Vi(a, b) {
    const c = b.wa && b.wa();
    b.visualElement ? Ti(a, b.visualElement, c) : (b = ti(xi.u(), b), Ui(a, b, void 0, c))
}
var Mi = class {
    constructor() {
        this.m = [];
        this.C = [];
        this.h = [];
        this.l = [];
        this.s = [];
        this.i = new Set;
        this.N = new Map
    }
    clickCommand(a, b, c = 0) {
        return Ui(this, a.clickTrackingParams, b, c)
    }
};
var Wi = class extends F {
    constructor(a) {
        super(a)
    }
};
var Xi = class extends F {
    constructor(a) {
        super(a)
    }
};
Xi.h = "yt.sw.adr";

function Yi(a) {
    return r(function*() {
        var b = yield u.fetch(a.i);
        if (200 !== b.status) return Promise.reject("Server error when retrieving AmbientData");
        b = yield b.text();
        if (!b.startsWith(")]}'\n")) return Promise.reject("Incorrect JSPB formatting");
        a: {
            b = JSON.parse(b.substring(5));
            for (let c = 0; c < b.length; c++)
                if (b[c][0] === (new Xi).constructor.h) {
                    b = new Xi(b[c]);
                    break a
                }
            b = null
        }
        return b ? b : Promise.reject("AmbientData missing from response")
    })
}

function Zi(a = !1) {
    const b = $i.h;
    return r(function*() {
        if (a || !b.h) b.h = Yi(b).then(b.j).catch(c => {
            delete b.h;
            gi(c)
        });
        return b.h
    })
}
var $i = class {
    constructor() {
        this.i = `${self.location.origin}/sw.js_data`
    }
    j(a) {
        const b = wb(a, Wi, 2);
        if (b) {
            const c = B(b, 5);
            c && (u.__SAPISID = c);
            O("enable_web_eom_visitor_data") && null != B(b, 10) ? M("EOM_VISITOR_DATA", B(b, 10)) : null != B(b, 7) && M("VISITOR_DATA", B(b, 7));
            null != B(b, 4) && M("SESSION_INDEX", String(B(b, 4)));
            null != B(b, 8) && M("DELEGATED_SESSION_ID", B(b, 8))
        }
        return a
    }
};

function aj(a) {
    const b = {};
    var c = vc();
    c && (b.Authorization = c, c = a = null === a || void 0 === a ? void 0 : a.sessionIndex, void 0 === c && (c = Number(N("SESSION_INDEX", 0)), c = isNaN(c) ? 0 : c), b["X-Goog-AuthUser"] = c, "INNERTUBE_HOST_OVERRIDE" in L || (b["X-Origin"] = window.location.origin), void 0 === a && "DELEGATED_SESSION_ID" in L && (b["X-Goog-PageId"] = N("DELEGATED_SESSION_ID")));
    return b
}
var bj = class {
    constructor() {
        this.Ga = !0
    }
};
var cj = {
    identityType: "UNAUTHENTICATED_IDENTITY_TYPE_UNKNOWN"
};

function dj(a, b) {
    b.encryptedTokenJarContents && (a.h[b.encryptedTokenJarContents] = b, "string" === typeof b.expirationSeconds && setTimeout(() => {
        delete a.h[b.encryptedTokenJarContents]
    }, 1E3 * Number(b.expirationSeconds)))
}
var ej = class {
    constructor() {
        this.h = {}
    }
    handleResponse(a, b) {
        var c, d, e;
        b = (null === (d = null === (c = b.I.context) || void 0 === c ? void 0 : c.request) || void 0 === d ? void 0 : d.consistencyTokenJars) || [];
        if (a = null === (e = a.responseContext) || void 0 === e ? void 0 : e.consistencyTokenJar) {
            for (const f of b) delete this.h[f.encryptedTokenJarContents];
            dj(this, a)
        }
    }
};

function fj() {
    var a = N("INNERTUBE_CONTEXT");
    if (!a) return gi(Error("Error: No InnerTubeContext shell provided in ytconfig.")), {};
    a = sa(a);
    O("web_no_tracking_params_in_shell_killswitch") || delete a.clickTracking;
    a.client || (a.client = {});
    var b = a.client;
    b.utcOffsetMinutes = -Math.floor((new Date).getTimezoneOffset());
    var c = qe();
    c ? b.experimentsToken = c : delete b.experimentsToken;
    ej.h || (ej.h = new ej);
    b = ej.h.h;
    c = [];
    let d = 0;
    for (const e in b) c[d++] = b[e];
    a.request = Object.assign(Object.assign({}, a.request), {
        consistencyTokenJars: c
    });
    a.user = Object.assign({}, a.user);
    return a
};

function gj(a) {
    var b = a;
    if (a = N("INNERTUBE_HOST_OVERRIDE")) {
        a = String(a);
        var c = String,
            d = b.match(A);
        b = d[5];
        var e = d[6];
        d = d[7];
        var f = "";
        b && (f += b);
        e && (f += "?" + e);
        d && (f += "#" + d);
        b = a + c(f)
    }
    return b
};
var hj = class {};
const ij = {
    GET_DATASYNC_IDS: function(a) {
        return () => new a
    }(class extends hj {})
};

function jj(a) {
    var b = {
        qb: {}
    };
    bj.h || (bj.h = new bj);
    var c = bj.h;
    if (void 0 !== kj.h) {
        const d = kj.h;
        a = [b !== d.m, a !== d.l, c !== d.j, !1, !1, void 0 !== d.i];
        if (a.some(e => e)) throw new P("InnerTubeTransportService is already initialized", a);
    } else kj.h = new kj(b, a, c)
}

function lj(a, b) {
    return r(function*() {
        var c, d = {
            sessionIndex: null === (c = null === a || void 0 === a ? void 0 : a.ga) || void 0 === c ? void 0 : c.sessionIndex
        };
        d = yield Sc(aj(d));
        return Promise.resolve(Object.assign(Object.assign({}, mj(b)), d))
    })
}

function nj(a, b, c) {
    return r(function*() {
        var d, e, f, g;
        const h = null === (d = b.config) || void 0 === d ? void 0 : d.Cb;
        if (h && a.h.has(h) && O("web_memoize_inflight_requests")) return a.h.get(h);
        if (null === (e = null === b || void 0 === b ? void 0 : b.I) || void 0 === e ? 0 : e.context)
            for (var k of []) k.zb(b.I.context);
        if (null === (f = a.i) || void 0 === f ? 0 : f.l(b.input, b.I)) return a.i.j(b.input, b.I);
        k = JSON.stringify(b.I);
        b.W = Object.assign(Object.assign({}, b.W), {
            headers: c
        });
        let l = Object.assign({}, b.W);
        "POST" === b.W.method && (l = Object.assign(Object.assign({},
            l), {
            body: k
        }));
        k = a.l.fetch(b.input, l, b.config);
        h && a.h.set(h, k);
        k = yield k;
        h && a.h.has(h) && a.h.delete(h);
        !k && (null === (g = a.i) || void 0 === g ? 0 : g.h(b.input, b.I)) && (k = yield a.i.i(b.input, b.I));
        return k
    })
}

function oj(a, b, c) {
    var d = {
        ga: {
            identity: cj
        }
    };
    b.context || (b.context = fj());
    return new G(e => r(function*() {
        var f = gj(c);
        f = Me(f) ? "same-origin" : "cors";
        if (a.j.Ga) {
            var g, h = null === (g = null === d || void 0 === d ? void 0 : d.ga) || void 0 === g ? void 0 : g.sessionIndex;
            g = aj({
                sessionIndex: h
            });
            f = Object.assign(Object.assign({}, mj(f)), g)
        } else f = yield lj(d, f);
        g = gj(c);
        h = {};
        N("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT") && (null === f || void 0 === f ? 0 : f.Authorization) || (h.key = N("INNERTUBE_API_KEY"));
        O("json_condensed_response") && (h.prettyPrint =
            "false");
        g = Le(g, h || {}, !1);
        h = {
            method: "POST",
            mode: Me(g) ? "same-origin" : "cors",
            credentials: Me(g) ? "same-origin" : "include"
        };
        e(nj(a, {
            input: g,
            W: h,
            I: b,
            config: d
        }, f))
    }))
}

function mj(a) {
    const b = {
        "Content-Type": "application/json"
    };
    O("enable_web_eom_visitor_data") && N("EOM_VISITOR_DATA") ? b["X-Goog-EOM-Visitor-Id"] = N("EOM_VISITOR_DATA") : N("VISITOR_DATA") && (b["X-Goog-Visitor-Id"] = N("VISITOR_DATA"));
    "cors" !== a && ((a = N("INNERTUBE_CONTEXT_CLIENT_NAME")) && (b["X-Youtube-Client-Name"] = a), (a = N("INNERTUBE_CONTEXT_CLIENT_VERSION")) && (b["X-Youtube-Client-Version"] = a), (a = N("CHROME_CONNECTED_HEADER")) && (b["X-Youtube-Chrome-Connected"] = a), O("forward_domain_admin_state_on_embeds") && (a =
        N("DOMAIN_ADMIN_STATE")) && (b["X-Youtube-Domain-Admin-State"] = a));
    return b
}
var kj = class {
    constructor(a, b, c) {
        this.m = a;
        this.l = b;
        this.j = c;
        this.i = void 0;
        this.h = new Map;
        a.ea || (a.ea = {});
        a.ea = Object.assign(Object.assign({}, ij), a.ea)
    }
};
let pj;

function qj() {
    pj || (jj({
        fetch: (a, b) => Sc(fetch(new Request(a, b)))
    }), pj = kj.h);
    return pj
};

function rj(a) {
    return r(function*() {
        yield sj();
        hi(a)
    })
}

function tj(a) {
    r(function*() {
        var b = yield Jg();
        b ? yield ih(a, b): (yield Zi(), b = {
            timestamp: a.timestamp
        }, b = a.appShellAssetLoadReport ? {
            payloadName: "appShellAssetLoadReport",
            payload: a.appShellAssetLoadReport,
            options: b
        } : a.clientError ? {
            payloadName: "clientError",
            payload: a.clientError,
            options: b
        } : void 0, b && V(b.payloadName, b.payload))
    })
}

function sj() {
    return r(function*() {
        try {
            yield Zi()
        } catch (a) {}
    })
};
const uj = {
    granted: "GRANTED",
    denied: "DENIED",
    unknown: "UNKNOWN"
};

function vj(a) {
    var b = a.data;
    a = b.type;
    b = b.data;
    "notifications_register" === a ? (Y("IDToken", b), wj()) : "notifications_check_registration" === a && xj(b)
}

function yj() {
    return self.clients.matchAll({
        type: "window",
        includeUncontrolled: !0
    }).then(a => {
        if (a)
            for (const b of a) b.postMessage({
                type: "update_unseen_notifications_count_signal"
            })
    })
}

function zj(a) {
    const b = [];
    a.forEach(c => {
        b.push({
            key: c.key,
            value: c.value
        })
    });
    return b
}

function Aj(a) {
    return r(function*() {
        const b = zj(a.payload.chrome.extraUrlParams),
            c = {
                recipientId: a.recipientId,
                endpoint: a.payload.chrome.endpoint,
                extraUrlParams: b
            },
            d = Hi(Yd);
        return Bj().then(e => oj(e, c, d).then(f => {
            f.json().then(g => {
                if (!g || !g.endpointUrl) return Promise.resolve();
                a.payload.chrome.postedEndpoint && Cj(a.payload.chrome.postedEndpoint);
                return Dj(a, g.endpointUrl)
            })
        }))
    })
}

function Ej(a, b) {
    var c = W(8);
    return null != c && b ? `${a}&parentCsn=${c}&parentTrackingParams=${b}` : a
}

function Dj(a, b) {
    var c;
    a.deviceId && Y("DeviceId", a.deviceId);
    a.timestampSec && Y("TimestampLowerBound", a.timestampSec);
    const d = a.payload.chrome,
        e = Li();
    Ri(e);
    const f = null === (c = d.postedEndpoint) || void 0 === c ? void 0 : c.clickTrackingParams;
    if (f) {
        var g = Si(e, f);
        var h = Dh(82046);
        var k = Dh(74726);
        Pi(e, h, g, 8);
        Pi(e, k, g, 8);
        g = {
            oa: 8,
            visualElement: g
        };
        k = {
            oa: 8,
            visualElement: h
        };
        h = {
            oa: 8,
            visualElement: h
        }
    }
    const l = {
        body: d.body,
        icon: d.iconUrl,
        data: {
            nav: Ej(b, f),
            id: d.notificationId,
            attributionTag: d.attributionTag,
            clickEndpoint: d.clickEndpoint,
            parentElement: g,
            cancelElement: k,
            dismissalElement: h,
            isDismissed: !0
        },
        tag: d.notificationTag || d.title + d.body + d.iconUrl,
        requireInteraction: !0
    };
    return self.registration.showNotification(d.title, l).then(() => {
        var m, p, t;
        (null === (m = l.data) || void 0 === m ? 0 : m.parentElement) && wi(xi.u(), l.data.parentElement);
        (null === (p = l.data) || void 0 === p ? 0 : p.cancelElement) && wi(xi.u(), l.data.cancelElement);
        (null === (t = l.data) || void 0 === t ? 0 : t.dismissalElement) && wi(xi.u(), l.data.dismissalElement);
        Fj(a.displayCap)
    }).catch(() => {})
}

function Cj(a) {
    if (!a.recordNotificationInteractionsEndpoint) return Promise.reject();
    const b = {
            serializedRecordNotificationInteractionsRequest: a.recordNotificationInteractionsEndpoint.serializedInteractionsRequest
        },
        c = Hi(Zd);
    return Bj().then(d => oj(d, b, c))
}

function Fj(a) {
    -1 !== a && self.registration.getNotifications().then(b => {
        var c;
        for (let d = 0; d < b.length - a; d++) b[d].data.isDismissed = !1, b[d].close(), (null === (c = b[d].data) || void 0 === c ? 0 : c.cancelElement) && Vi(Li(), b[d].data.cancelElement)
    })
}

function xj(a) {
    const b = [Gj(a), Di("RegistrationTimestamp").then(Hj), Ij(), Jj(), Kj()];
    Promise.all(b).catch(() => {
        Y("IDToken", a);
        wj();
        return Promise.resolve()
    })
}

function Hj(a) {
    a = a || 0;
    return 9E7 >= Date.now() - a ? Promise.resolve() : Promise.reject()
}

function Gj(a) {
    return Di("IDToken").then(b => a === b ? Promise.resolve() : Promise.reject())
}

function Ij() {
    return Di("Permission").then(a => Notification.permission === a ? Promise.resolve() : Promise.reject())
}

function Jj() {
    return Di("Endpoint").then(a => Lj().then(b => a === b ? Promise.resolve() : Promise.reject()))
}

function Kj() {
    return Di("application_server_key").then(a => Mj().then(b => a === b ? Promise.resolve() : Promise.reject()))
}

function Nj() {
    var a = Notification.permission;
    if (uj[a]) return uj[a]
}

function wj() {
    Y("RegistrationTimestamp", 0);
    Promise.all([Lj(), Oj(), Pj(), Mj()]).then(([a, b, c, d]) => {
        b = b ? yi(b) : null;
        c = c ? yi(c) : null;
        d = d ? Oa(new Uint8Array(d), 4) : null;
        Qj(a, b, c, d)
    }).catch(() => {
        Qj()
    })
}

function Qj(a = null, b = null, c = null, d = null) {
    Ci().then(e => {
        e && (Y("Endpoint", a), Y("P256dhKey", b), Y("AuthKey", c), Y("application_server_key", d), Y("Permission", Notification.permission), Promise.all([Di("DeviceId"), Di("NotificationsDisabled")]).then(([f, g]) => {
            if (null !== f && void 0 !== f) var h = f;
            else {
                f = [];
                var k;
                h = h || ed.length;
                for (k = 0; 256 > k; k++) f[k] = ed[0 | Math.random() * h];
                h = f.join("")
            }
            Rj(h, null !== a && void 0 !== a ? a : void 0, null !== b && void 0 !== b ? b : void 0, null !== c && void 0 !== c ? c : void 0, null !== d && void 0 !== d ? d : void 0, null !==
                g && void 0 !== g ? g : void 0)
        }))
    })
}

function Rj(a, b, c, d, e, f) {
    r(function*() {
        const g = {
                notificationRegistration: {
                    chromeRegistration: {
                        deviceId: a,
                        pushParams: {
                            applicationServerKey: e,
                            authKey: d,
                            p256dhKey: c,
                            browserEndpoint: b
                        },
                        notificationsDisabledInApp: f,
                        permission: Nj()
                    }
                }
            },
            h = Hi($d);
        return Bj().then(k => oj(k, g, h).then(() => {
            Y("DeviceId", a);
            Y("RegistrationTimestamp", Date.now());
            Y("TimestampLowerBound", Date.now())
        }, l => {
            rj(l)
        }))
    })
}

function Lj() {
    return self.registration.pushManager.getSubscription().then(a => a ? Promise.resolve(a.endpoint) : Promise.resolve(null))
}

function Oj() {
    return self.registration.pushManager.getSubscription().then(a => a && a.getKey ? Promise.resolve(a.getKey("p256dh")) : Promise.resolve(null))
}

function Pj() {
    return self.registration.pushManager.getSubscription().then(a => a && a.getKey ? Promise.resolve(a.getKey("auth")) : Promise.resolve(null))
}

function Mj() {
    return self.registration.pushManager.getSubscription().then(a => a ? Promise.resolve(a.options.applicationServerKey) : Promise.resolve(null))
}

function Bj() {
    return r(function*() {
        try {
            return yield Zi(!0), qj()
        } catch (a) {
            return yield rj(a), Promise.reject(a)
        }
    })
};
let Sj = void 0;

function Tj(a) {
    return r(function*() {
        Sj || (Sj = yield a.open("yt-appshell-assets"));
        return Sj
    })
}

function Uj(a, b) {
    return r(function*() {
        const c = yield Tj(a), d = b.map(e => Vj(c, e));
        return Promise.all(d)
    })
}

function Wj(a, b) {
    return r(function*() {
        let c;
        try {
            c = yield a.match(b, {
                cacheName: "yt-appshell-assets"
            })
        } catch (d) {}
        return c
    })
}

function Xj(a, b) {
    return r(function*() {
        const c = yield Tj(a), d = (yield c.keys()).filter(e => !b.includes(e.url)).map(e => c.delete(e));
        return Promise.all(d)
    })
}

function Yj(a, b, c) {
    return r(function*() {
        yield(yield Tj(a)).put(b, c)
    })
}

function Zj(a, b) {
    r(function*() {
        yield(yield Tj(a)).delete(b)
    })
}

function Vj(a, b) {
    return r(function*() {
        return (yield a.match(b)) ? Promise.resolve() : a.add(b)
    })
};
var ak;
ak = dh("yt-serviceworker-metadata", {
    M: {
        auth: {
            O: 1
        },
        ["resource-manifest-assets"]: {
            O: 2
        }
    },
    da: !0,
    upgrade(a, b) {
        b(1) && jg(a, "resource-manifest-assets");
        b(2) && jg(a, "auth")
    },
    version: 2
});
let bk = null;

function ck(a) {
    return Ag(ak(), a)
}

function dk() {
    const a = Date.now();
    return IDBKeyRange.bound(0, a)
}

function ek(a, b) {
    return r(function*() {
        yield fg(yield ck(a.token), ["resource-manifest-assets"], "readwrite", c => {
            const d = c.objectStore("resource-manifest-assets"),
                e = Date.now();
            return U(d.h.put(b, e)).then(() => {
                bk = e;
                let f = !0;
                return og(d, {
                    query: dk(),
                    direction: "prev"
                }, g => f ? (f = !1, g.advance(5)) : d.delete(g.getKey()).then(() => g.continue()))
            })
        })
    })
}

function fk(a, b) {
    return r(function*() {
        let c = !1,
            d = 0;
        yield fg(yield ck(a.token), ["resource-manifest-assets"], "readonly", e => og(e.objectStore("resource-manifest-assets"), {
            query: dk(),
            direction: "prev"
        }, f => {
            if (f.Y().includes(b)) c = !0;
            else return d += 1, f.continue()
        }));
        return c ? d : -1
    })
}

function gk(a) {
    return r(function*() {
        bk || (yield fg(yield ck(a.token), ["resource-manifest-assets"], "readonly", b => og(b.objectStore("resource-manifest-assets"), {
            query: dk(),
            direction: "prev"
        }, c => {
            bk = c.getKey()
        })));
        return bk
    })
}
var hk = class {
    constructor(a) {
        this.token = a
    }
    static u() {
        return r(function*() {
            const a = yield Jg();
            if (a) return hk.h || (hk.h = new hk(a)), hk.h
        })
    }
};

function ik(a, b) {
    return r(function*() {
        yield lg(yield ck(a.token), "auth", b, "shell_identifier_key")
    })
}

function jk(a) {
    return r(function*() {
        return (yield(yield ck(a.token)).get("auth", "shell_identifier_key")) || ""
    })
}

function kk(a) {
    return r(function*() {
        yield(yield ck(a.token)).clear("auth")
    })
}
var lk = class {
    constructor(a) {
        this.token = a
    }
    static u() {
        return r(function*() {
            const a = yield Jg();
            if (a) return lk.h || (lk.h = new lk(a)), lk.h
        })
    }
};

function mk() {
    r(function*() {
        const a = yield lk.u();
        a && (yield kk(a))
    })
};

function nk() {
    return [1, fc]
}
var ok = class extends F {
    constructor(a) {
        super(a)
    }
};

function cc() {
    return [1, gc, ok, nk]
}
var bc = class extends F {
        constructor(a) {
            super(a, -1, pk)
        }
    },
    pk = [1];

function qk(a) {
    return r(function*() {
        const b = a.headers.get("X-Resource-Manifest");
        return b ? Promise.resolve(rk(b)) : Promise.reject(Error("No resource manifest header"))
    })
}

function rk(a) {
    return xb(dc(decodeURIComponent(a)), ok, 1).reduce((b, c) => {
        (c = B(c, 1)) && b.push(c);
        return b
    }, [])
};

function sk(a) {
    return r(function*() {
        const b = yield Zi();
        if (b && null != B(b, 3)) {
            var c = yield lk.u();
            c && (c = yield jk(c), B(b, 3) !== c && (Zj(a.h, a.i), mk()))
        }
    })
}

function tk(a) {
    return r(function*() {
        let b, c;
        try {
            c = yield uk(a.j), b = yield qk(c), yield Uj(a.h, b)
        } catch (d) {
            return Promise.reject(d)
        }
        try {
            yield vk(), yield Yj(a.h, a.i, c)
        } catch (d) {
            return Promise.reject(d)
        }
        if (b) try {
            yield wk(a, b, a.i)
        } catch (d) {}
        return Promise.resolve()
    })
}

function xk(a) {
    return r(function*() {
        yield sk(a);
        return tk(a)
    })
}

function uk(a) {
    return r(function*() {
        try {
            return yield u.fetch(new Request(a))
        } catch (b) {
            return Promise.reject(b)
        }
    })
}

function vk() {
    return r(function*() {
        var a = yield Zi();
        let b;
        a && null != B(a, 3) && (b = B(a, 3));
        return b ? (a = yield lk.u()) ? Promise.resolve(ik(a, b)) : Promise.reject(Error("Could not get AuthMonitor instance")) : Promise.reject(Error("Could not get datasync ID"))
    })
}

function wk(a, b, c) {
    return r(function*() {
        const d = yield hk.u();
        if (d) try {
            yield ek(d, b)
        } catch (e) {
            yield rj(e)
        }
        b.push(c);
        try {
            yield Xj(a.h, b)
        } catch (e) {
            yield rj(e)
        }
        return Promise.resolve()
    })
}

function yk(a, b) {
    return r(function*() {
        return Wj(a.h, b)
    })
}

function zk(a) {
    return r(function*() {
        return Wj(a.h, a.i)
    })
}
var Ak = class {
    constructor() {
        var a = self.location.origin + "/app_shell",
            b = self.location.origin + "/app_shell_home";
        this.h = self.caches;
        this.j = a;
        this.i = b
    }
};

function Bk(a, b) {
    return r(function*() {
        const c = b.request,
            d = yield yk(a.h, c.url);
        if (d) return tj({
            appShellAssetLoadReport: {
                assetPath: c.url,
                cacheHit: !0
            },
            timestamp: Q()
        }), d;
        Ck(c);
        return Dk(b)
    })
}

function Ek(a, b) {
    return r(function*() {
        const c = yield Fk(b);
        if (c.response && (c.response.ok || "opaqueredirect" === c.response.type || 429 === c.response.status || 303 === c.response.status || 300 <= c.response.status && 400 > c.response.status)) return c.response;
        const d = yield zk(a.h);
        if (d) return Gk(a), d;
        Hk(a);
        return c.response ? c.response : Promise.reject(c.error)
    })
}

function Ik(a, b) {
    b = new URL(b);
    if (!a.i.includes(b.pathname)) return !1;
    if (!b.search) return !0;
    for (const c of a.l)
        if (a = b.searchParams.get(c.key), void 0 === c.value || a === c.value)
            if (b.searchParams.delete(c.key), !b.search) return !0;
    return !1
}

function Jk(a, b) {
    return r(function*() {
        const c = yield zk(a.h);
        if (!c) return Hk(a), Dk(b);
        Gk(a);
        var d;
        a: {
            if (c.headers && (d = c.headers.get("date")) && (d = Date.parse(d), !isNaN(d))) {
                d = Math.round(Q() - d);
                break a
            }
            d = -1
        }
        if (!(-1 < d && 7 <= d / 864E5)) return c;
        d = yield Fk(b);
        return d.response && d.response.ok ? d.response : c
    })
}

function Dk(a) {
    return Promise.resolve(a.preloadResponse).then(b => b || u.fetch(a.request))
}

function Ck(a) {
    const b = {
        assetPath: a.url,
        cacheHit: !1
    };
    hk.u().then(c => {
        if (c) {
            var d = gk(c).then(e => {
                e && (b.currentAppBundleTimestampSec = String(Math.floor(e / 1E3)))
            });
            c = fk(c, a.url).then(e => {
                b.appBundleVersionDiffCount = e
            });
            Promise.all([d, c]).catch(e => {
                rj(e)
            }).finally(() => {
                tj({
                    appShellAssetLoadReport: b,
                    timestamp: Q()
                })
            })
        } else tj({
            appShellAssetLoadReport: b,
            timestamp: Q()
        })
    })
}

function Gk(a) {
    tj({
        appShellAssetLoadReport: {
            assetPath: a.h.i,
            cacheHit: !0
        },
        timestamp: Q()
    })
}

function Hk(a) {
    tj({
        appShellAssetLoadReport: {
            assetPath: a.h.i,
            cacheHit: !1
        },
        timestamp: Q()
    })
}

function Fk(a) {
    return r(function*() {
        try {
            return {
                response: yield Dk(a)
            }
        } catch (b) {
            return {
                error: b
            }
        }
    })
}
var Pk = class {
    constructor() {
        var a = Kk,
            b = Lk,
            c = Mk,
            d = Nk;
        const e = [];
        e.push({
            key: "feature",
            value: "ytca"
        });
        for (var f of mc) e.push({
            key: f
        });
        f = Ok();
        this.h = a;
        this.m = b;
        this.s = c;
        this.i = d;
        this.l = e;
        this.j = f
    }
};
var Nk = ["/", "/feed/downloads"];
const Qk = [/^\/$/, /^\/feed\/downloads$/],
    Rk = [/^\/$/, /^\/feed\/\w*/, /^\/results$/, /^\/playlist$/, /^\/watch$/, /^\/channel\/\w*/];

function Ok() {
    return new RegExp((O("kevlar_sw_app_wide_fallback") ? Rk : Qk).map(a => a.source).join("|"))
}
var Lk = /^https:\/\/[\w-]*\.?youtube\.com.*(\.css$|\.js$|\.ico$|\/ytmweb\/_\/js\/|\/ytmweb\/_\/ss\/)/,
    Mk = /^https:\/\/[\w-]*\.?youtube\.com.*(purge_shell=1|\/signin|\/logout)/;
var Sk = class {
    constructor() {
        var a = Kk,
            b = new Pk;
        this.h = self;
        this.i = a;
        this.m = b;
        this.N = zi
    }
    init() {
        this.h.oninstall = this.s.bind(this);
        this.h.onactivate = this.j.bind(this);
        this.h.onfetch = this.l.bind(this);
        this.h.onmessage = this.C.bind(this)
    }
    s(a) {
        this.h.skipWaiting();
        const b = xk(this.i).catch(c => {
            rj(c);
            return Promise.resolve()
        });
        a.waitUntil(b)
    }
    j(a) {
        const b = [this.h.clients.claim()];
        this.h.registration.navigationPreload && b.push(this.h.registration.navigationPreload.enable());
        a.waitUntil(Promise.all(b))
    }
    l(a) {
        const b = this;
        return r(function*() {
            var c = b.m,
                d = !!b.h.registration.navigationPreload;
            const e = a.request;
            if (c.s.test(e.url)) $i.h && (delete $i.h.h, u.__SAPISID = void 0, M("VISITOR_DATA", void 0), M("SESSION_INDEX", void 0), M("DELEGATED_SESSION_ID", void 0)), d = a.respondWith, c = c.h, Zj(c.h, c.i), mk(), c = Dk(a), d.call(a, c);
            else if (c.m.test(e.url)) a.respondWith(Bk(c,
                a));
            else if ("navigate" === e.mode) {
                if (O("sw_nav_request_network_first")) {
                    var f = new URL(e.url);
                    f = c.j.test(f.pathname)
                } else f = !1;
                f ? a.respondWith(Ek(c, a)) : Ik(c, e.url) ? a.respondWith(Jk(c, a)) : d && a.respondWith(Dk(a))
            }
        })
    }
    C(a) {
        const b = a.data;
        this.N.includes(b.type) ? vj(a) : "refresh_shell" === b.type && tk(this.i).catch(c => {
            rj(c)
        })
    }
};
var Tk = class {
    static u() {
        let a = v("ytglobal.storage_");
        a || (a = new Tk, w("ytglobal.storage_", a));
        return a
    }
    estimate() {
        return r(function*() {
            var a, b;
            const c = navigator;
            if (null === (a = c.storage) || void 0 === a ? 0 : a.estimate) return c.storage.estimate();
            if (null === (b = c.webkitTemporaryStorage) || void 0 === b ? 0 : b.queryUsageAndQuota) return Uk()
        })
    }
};

function Uk() {
    const a = navigator;
    return new Promise((b, c) => {
        var d;
        null !== (d = a.webkitTemporaryStorage) && void 0 !== d && d.queryUsageAndQuota ? a.webkitTemporaryStorage.queryUsageAndQuota((e, f) => {
            b({
                usage: e,
                quota: f
            })
        }, e => {
            c(e)
        }) : c(Error("webkitTemporaryStorage is not supported."))
    })
}
w("ytglobal.storageClass_", Tk);

function Vk(a, b) {
    Tk.u().estimate().then(c => {
        c = Object.assign(Object.assign({}, b), {
            isSw: void 0 === self.document,
            isIframe: self !== self.top,
            deviceStorageUsageMbytes: Wk(null === c || void 0 === c ? void 0 : c.usage),
            deviceStorageQuotaMbytes: Wk(null === c || void 0 === c ? void 0 : c.quota)
        });
        a.h("idbQuotaExceeded", c)
    })
}
class Xk {
    constructor() {
        var a = Yk;
        this.handleError = Zk;
        this.h = a;
        this.i = !1;
        void 0 === self.document || self.addEventListener("beforeunload", () => {
            this.i = !0
        });
        this.j = Math.random() <= pe("ytidb_transaction_ended_event_rate_limit", .02)
    }
    T(a, b) {
        switch (a) {
            case "IDB_DATA_CORRUPTED":
                O("idb_data_corrupted_killswitch") || this.h("idbDataCorrupted", b);
                break;
            case "IDB_UNEXPECTEDLY_CLOSED":
                this.h("idbUnexpectedlyClosed", b);
                break;
            case "IS_SUPPORTED_COMPLETED":
                O("idb_is_supported_completed_killswitch") || this.h("idbIsSupportedCompleted", b);
                break;
            case "QUOTA_EXCEEDED":
                Vk(this, b);
                break;
            case "TRANSACTION_ENDED":
                this.j && this.h("idbTransactionEnded", b);
                break;
            case "TRANSACTION_UNEXPECTEDLY_ABORTED":
                a =
                    Object.assign(Object.assign({}, b), {
                        hasWindowUnloaded: this.i
                    }), this.h("idbTransactionAborted", a)
        }
    }
}

function Wk(a) {
    return "undefined" === typeof a ? "-1" : String(Math.ceil(a / 1048576))
};
Th(Qh(), {
    G: [{
        Ca: /Failed to fetch/,
        weight: 500
    }],
    D: []
});
var {
    handleError: Zk = fi,
    T: Yk = V
} = {
    handleError: function(a) {
        return r(function*() {
            yield sj();
            gi(a)
        })
    },
    T: function(a, b) {
        return r(function*() {
            yield sj();
            V(a, b)
        })
    }
};
for (Ef = new Xk; 0 < Df.length;) {
    const a = Df.shift();
    switch (a.type) {
        case "ERROR":
            Ef.handleError(a.payload);
            break;
        case "EVENT":
            Ef.T(a.eventType, a.payload)
    }
}
$i.h = new $i;
self.onnotificationclick = function(a) {
    a.notification.close();
    const b = a.notification.data;
    b.isDismissed = !1;
    const c = self.clients.matchAll({
        type: "window",
        includeUncontrolled: !0
    });
    c.then(d => {
        a: {
            var e = b.nav;
            for (const f of d)
                if (f.url === e) {
                    f.focus();
                    break a
                }
            self.clients.openWindow(e)
        }
    });
    a.waitUntil(c);
    a.waitUntil(Cj(b.clickEndpoint))
};
self.onnotificationclose = function(a) {
    a = a.notification.data;
    if (null === a || void 0 === a ? 0 : a.parentElement) {
        a.isDismissed && (null === a || void 0 === a ? 0 : a.dismissalElement) && Vi(Li(), a.dismissalElement);
        var b = xi.u(),
            c = a.parentElement,
            d = ti(0, c);
        a = c.visualElement ? c.visualElement : d;
        var e = b.l.has(a);
        const f = b.i.get(a);
        b.l.add(a);
        b.i.set(a, !1);
        !1 !== f && (d || c.visualElement) && (!(a = ui(b, c)) || !vi(c) && c.data && c.data.loggingDirectives || (d = c.visualElement ? c.visualElement : new Eh({
                trackingParams: d
            }), vi(c) & 8 ? ri(b.h, a, d) : vi(c) &
            2 && !e && (b = b.h, c = {
                cttAuthInfo: Lh(a),
                A: a
            }, O("il_via_jspb") ? (e = new Od, e.B(a), d = d.getAsJspb(), D(e, 2, d), C(e, 4, 2), "UNDEFINED_CSN" == a ? X("visualElementHidden", e, c) : rh(e, c, b)) : (d = {
                csn: a,
                ve: d.getAsJson(),
                eventType: 2
            }, "UNDEFINED_CSN" == a ? X("visualElementHidden", d, c) : b ? S("visualElementHidden", d, b, c) : V("visualElementHidden", d, c)))))
    }
};
self.onpush = function(a) {
    a.waitUntil(Di("NotificationsDisabled").then(b => {
        if (b) return Promise.resolve();
        if (a.data && a.data.text().length) try {
            return Aj(a.data.json())
        } catch (c) {
            return Promise.resolve(c.message)
        }
        return Promise.resolve()
    }));
    a.waitUntil(yj())
};
self.onpushsubscriptionchange = function() {
    wj()
};
const Kk = new Ak;
(new Sk).init();