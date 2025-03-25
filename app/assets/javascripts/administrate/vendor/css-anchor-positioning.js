// CSS Anchor Positioning Polyfill
// https://github.com/oddbird/css-anchor-positioning

var fa = Object.defineProperty, da = Object.defineProperties;
var ma = Object.getOwnPropertyDescriptors;
var Mr = Object.getOwnPropertySymbols;
var ga = Object.prototype.hasOwnProperty, ba = Object.prototype.propertyIsEnumerable;
var Nr = (e, t, n) => t in e ? fa(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, _ = (e, t) => {
  for (var n in t || (t = {}))
    ga.call(t, n) && Nr(e, n, t[n]);
  if (Mr)
    for (var n of Mr(t))
      ba.call(t, n) && Nr(e, n, t[n]);
  return e;
}, Z = (e, t) => da(e, ma(t));
var ya = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var H = (e, t, n) => new Promise((r, i) => {
  var o = (l) => {
    try {
      c(n.next(l));
    } catch (a) {
      i(a);
    }
  }, s = (l) => {
    try {
      c(n.throw(l));
    } catch (a) {
      i(a);
    }
  }, c = (l) => l.done ? r(l.value) : Promise.resolve(l.value).then(o, s);
  c((n = n.apply(e, t)).next());
});
var Qg = ya((Rr) => {
  const Gn = Math.min, lt = Math.max, Zt = Math.round, Mt = Math.floor, $e = (e) => ({
    x: e,
    y: e
  });
  function ka(e, t) {
    return typeof e == "function" ? e(t) : e;
  }
  function xa(e) {
    return _({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }, e);
  }
  function wa(e) {
    return typeof e != "number" ? xa(e) : {
      top: e,
      right: e,
      bottom: e,
      left: e
    };
  }
  function Jt(e) {
    const {
      x: t,
      y: n,
      width: r,
      height: i
    } = e;
    return {
      width: r,
      height: i,
      top: n,
      left: t,
      right: t + r,
      bottom: n + i,
      x: t,
      y: n
    };
  }
  function va(e, t) {
    return H(this, null, function* () {
      var n;
      t === void 0 && (t = {});
      const {
        x: r,
        y: i,
        platform: o,
        rects: s,
        elements: c,
        strategy: l
      } = e, {
        boundary: a = "clippingAncestors",
        rootBoundary: u = "viewport",
        elementContext: h = "floating",
        altBoundary: d = !1,
        padding: m = 0
      } = ka(t, e), w = wa(m), C = c[d ? h === "floating" ? "reference" : "floating" : h], b = Jt(yield o.getClippingRect({
        element: (n = yield o.isElement == null ? void 0 : o.isElement(C)) == null || n ? C : C.contextElement || (yield o.getDocumentElement == null ? void 0 : o.getDocumentElement(c.floating)),
        boundary: a,
        rootBoundary: u,
        strategy: l
      })), x = h === "floating" ? {
        x: r,
        y: i,
        width: s.floating.width,
        height: s.floating.height
      } : s.reference, T = yield o.getOffsetParent == null ? void 0 : o.getOffsetParent(c.floating), v = (yield o.isElement == null ? void 0 : o.isElement(T)) ? (yield o.getScale == null ? void 0 : o.getScale(T)) || {
        x: 1,
        y: 1
      } : {
        x: 1,
        y: 1
      }, A = Jt(o.convertOffsetParentRelativeRectToViewportRelativeRect ? yield o.convertOffsetParentRelativeRectToViewportRelativeRect({
        elements: c,
        rect: x,
        offsetParent: T,
        strategy: l
      }) : x);
      return {
        top: (b.top - A.top + w.top) / v.y,
        bottom: (A.bottom - b.bottom + w.bottom) / v.y,
        left: (b.left - A.left + w.left) / v.x,
        right: (A.right - b.right + w.right) / v.x
      };
    });
  }
  function hn() {
    return typeof window != "undefined";
  }
  function bt(e) {
    return ro(e) ? (e.nodeName || "").toLowerCase() : "#document";
  }
  function pe(e) {
    var t;
    return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
  }
  function Pe(e) {
    var t;
    return (t = (ro(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
  }
  function ro(e) {
    return hn() ? e instanceof Node || e instanceof pe(e).Node : !1;
  }
  function we(e) {
    return hn() ? e instanceof Element || e instanceof pe(e).Element : !1;
  }
  function _e(e) {
    return hn() ? e instanceof HTMLElement || e instanceof pe(e).HTMLElement : !1;
  }
  function Dr(e) {
    return !hn() || typeof ShadowRoot == "undefined" ? !1 : e instanceof ShadowRoot || e instanceof pe(e).ShadowRoot;
  }
  function It(e) {
    const {
      overflow: t,
      overflowX: n,
      overflowY: r,
      display: i
    } = ve(e);
    return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(i);
  }
  function Sa(e) {
    return ["table", "td", "th"].includes(bt(e));
  }
  function pn(e) {
    return [":popover-open", ":modal"].some((t) => {
      try {
        return e.matches(t);
      } catch (n) {
        return !1;
      }
    });
  }
  function ur(e) {
    const t = hr(), n = we(e) ? ve(e) : e;
    return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
  }
  function Ca(e) {
    let t = We(e);
    for (; _e(t) && !pt(t); ) {
      if (ur(t))
        return t;
      if (pn(t))
        return null;
      t = We(t);
    }
    return null;
  }
  function hr() {
    return typeof CSS == "undefined" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
  }
  function pt(e) {
    return ["html", "body", "#document"].includes(bt(e));
  }
  function ve(e) {
    return pe(e).getComputedStyle(e);
  }
  function fn(e) {
    return we(e) ? {
      scrollLeft: e.scrollLeft,
      scrollTop: e.scrollTop
    } : {
      scrollLeft: e.scrollX,
      scrollTop: e.scrollY
    };
  }
  function We(e) {
    if (bt(e) === "html")
      return e;
    const t = (
      // Step into the shadow DOM of the parent of a slotted node.
      e.assignedSlot || // DOM Element detected.
      e.parentNode || // ShadowRoot detected.
      Dr(e) && e.host || // Fallback.
      Pe(e)
    );
    return Dr(t) ? t.host : t;
  }
  function io(e) {
    const t = We(e);
    return pt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : _e(t) && It(t) ? t : io(t);
  }
  function Lt(e, t, n) {
    var r;
    t === void 0 && (t = []), n === void 0 && (n = !0);
    const i = io(e), o = i === ((r = e.ownerDocument) == null ? void 0 : r.body), s = pe(i);
    if (o) {
      const c = Vn(s);
      return t.concat(s, s.visualViewport || [], It(i) ? i : [], c && n ? Lt(c) : []);
    }
    return t.concat(i, Lt(i, [], n));
  }
  function Vn(e) {
    return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
  }
  function oo(e) {
    const t = ve(e);
    let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
    const i = _e(e), o = i ? e.offsetWidth : n, s = i ? e.offsetHeight : r, c = Zt(n) !== o || Zt(r) !== s;
    return c && (n = o, r = s), {
      width: n,
      height: r,
      $: c
    };
  }
  function pr(e) {
    return we(e) ? e : e.contextElement;
  }
  function ct(e) {
    const t = pr(e);
    if (!_e(t))
      return $e(1);
    const n = t.getBoundingClientRect(), {
      width: r,
      height: i,
      $: o
    } = oo(t);
    let s = (o ? Zt(n.width) : n.width) / r, c = (o ? Zt(n.height) : n.height) / i;
    return (!s || !Number.isFinite(s)) && (s = 1), (!c || !Number.isFinite(c)) && (c = 1), {
      x: s,
      y: c
    };
  }
  const Ta = /* @__PURE__ */ $e(0);
  function so(e) {
    const t = pe(e);
    return !hr() || !t.visualViewport ? Ta : {
      x: t.visualViewport.offsetLeft,
      y: t.visualViewport.offsetTop
    };
  }
  function Aa(e, t, n) {
    return t === void 0 && (t = !1), !n || t && n !== pe(e) ? !1 : t;
  }
  function Qe(e, t, n, r) {
    t === void 0 && (t = !1), n === void 0 && (n = !1);
    const i = e.getBoundingClientRect(), o = pr(e);
    let s = $e(1);
    t && (r ? we(r) && (s = ct(r)) : s = ct(e));
    const c = Aa(o, n, r) ? so(o) : $e(0);
    let l = (i.left + c.x) / s.x, a = (i.top + c.y) / s.y, u = i.width / s.x, h = i.height / s.y;
    if (o) {
      const d = pe(o), m = r && we(r) ? pe(r) : r;
      let w = d, k = Vn(w);
      for (; k && r && m !== w; ) {
        const C = ct(k), b = k.getBoundingClientRect(), x = ve(k), T = b.left + (k.clientLeft + parseFloat(x.paddingLeft)) * C.x, v = b.top + (k.clientTop + parseFloat(x.paddingTop)) * C.y;
        l *= C.x, a *= C.y, u *= C.x, h *= C.y, l += T, a += v, w = pe(k), k = Vn(w);
      }
    }
    return Jt({
      width: u,
      height: h,
      x: l,
      y: a
    });
  }
  function fr(e, t) {
    const n = fn(e).scrollLeft;
    return t ? t.left + n : Qe(Pe(e)).left + n;
  }
  function ao(e, t, n) {
    n === void 0 && (n = !1);
    const r = e.getBoundingClientRect(), i = r.left + t.scrollLeft - (n ? 0 : (
      // RTL <body> scrollbar.
      fr(e, r)
    )), o = r.top + t.scrollTop;
    return {
      x: i,
      y: o
    };
  }
  function Oa(e) {
    let {
      elements: t,
      rect: n,
      offsetParent: r,
      strategy: i
    } = e;
    const o = i === "fixed", s = Pe(r), c = t ? pn(t.floating) : !1;
    if (r === s || c && o)
      return n;
    let l = {
      scrollLeft: 0,
      scrollTop: 0
    }, a = $e(1);
    const u = $e(0), h = _e(r);
    if ((h || !h && !o) && ((bt(r) !== "body" || It(s)) && (l = fn(r)), _e(r))) {
      const m = Qe(r);
      a = ct(r), u.x = m.x + r.clientLeft, u.y = m.y + r.clientTop;
    }
    const d = s && !h && !o ? ao(s, l, !0) : $e(0);
    return {
      width: n.width * a.x,
      height: n.height * a.y,
      x: n.x * a.x - l.scrollLeft * a.x + u.x + d.x,
      y: n.y * a.y - l.scrollTop * a.y + u.y + d.y
    };
  }
  function Ea(e) {
    return Array.from(e.getClientRects());
  }
  function La(e) {
    const t = Pe(e), n = fn(e), r = e.ownerDocument.body, i = lt(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), o = lt(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
    let s = -n.scrollLeft + fr(e);
    const c = -n.scrollTop;
    return ve(r).direction === "rtl" && (s += lt(t.clientWidth, r.clientWidth) - i), {
      width: i,
      height: o,
      x: s,
      y: c
    };
  }
  function $a(e, t) {
    const n = pe(e), r = Pe(e), i = n.visualViewport;
    let o = r.clientWidth, s = r.clientHeight, c = 0, l = 0;
    if (i) {
      o = i.width, s = i.height;
      const a = hr();
      (!a || a && t === "fixed") && (c = i.offsetLeft, l = i.offsetTop);
    }
    return {
      width: o,
      height: s,
      x: c,
      y: l
    };
  }
  function _a(e, t) {
    const n = Qe(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, o = _e(e) ? ct(e) : $e(1), s = e.clientWidth * o.x, c = e.clientHeight * o.y, l = i * o.x, a = r * o.y;
    return {
      width: s,
      height: c,
      x: l,
      y: a
    };
  }
  function jr(e, t, n) {
    let r;
    if (t === "viewport")
      r = $a(e, n);
    else if (t === "document")
      r = La(Pe(e));
    else if (we(t))
      r = _a(t, n);
    else {
      const i = so(e);
      r = {
        x: t.x - i.x,
        y: t.y - i.y,
        width: t.width,
        height: t.height
      };
    }
    return Jt(r);
  }
  function lo(e, t) {
    const n = We(e);
    return n === t || !we(n) || pt(n) ? !1 : ve(n).position === "fixed" || lo(n, t);
  }
  function Pa(e, t) {
    const n = t.get(e);
    if (n)
      return n;
    let r = Lt(e, [], !1).filter((c) => we(c) && bt(c) !== "body"), i = null;
    const o = ve(e).position === "fixed";
    let s = o ? We(e) : e;
    for (; we(s) && !pt(s); ) {
      const c = ve(s), l = ur(s);
      !l && c.position === "fixed" && (i = null), (o ? !l && !i : !l && c.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || It(s) && !l && lo(e, s)) ? r = r.filter((u) => u !== s) : i = c, s = We(s);
    }
    return t.set(e, r), r;
  }
  function za(e) {
    let {
      element: t,
      boundary: n,
      rootBoundary: r,
      strategy: i
    } = e;
    const s = [...n === "clippingAncestors" ? pn(t) ? [] : Pa(t, this._c) : [].concat(n), r], c = s[0], l = s.reduce((a, u) => {
      const h = jr(t, u, i);
      return a.top = lt(h.top, a.top), a.right = Gn(h.right, a.right), a.bottom = Gn(h.bottom, a.bottom), a.left = lt(h.left, a.left), a;
    }, jr(t, c, i));
    return {
      width: l.right - l.left,
      height: l.bottom - l.top,
      x: l.left,
      y: l.top
    };
  }
  function Ia(e) {
    const {
      width: t,
      height: n
    } = oo(e);
    return {
      width: t,
      height: n
    };
  }
  function Ra(e, t, n) {
    const r = _e(t), i = Pe(t), o = n === "fixed", s = Qe(e, !0, o, t);
    let c = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const l = $e(0);
    if (r || !r && !o)
      if ((bt(t) !== "body" || It(i)) && (c = fn(t)), r) {
        const d = Qe(t, !0, o, t);
        l.x = d.x + t.clientLeft, l.y = d.y + t.clientTop;
      } else i && (l.x = fr(i));
    const a = i && !r && !o ? ao(i, c) : $e(0), u = s.left + c.scrollLeft - l.x - a.x, h = s.top + c.scrollTop - l.y - a.y;
    return {
      x: u,
      y: h,
      width: s.width,
      height: s.height
    };
  }
  function Sn(e) {
    return ve(e).position === "static";
  }
  function Fr(e, t) {
    if (!_e(e) || ve(e).position === "fixed")
      return null;
    if (t)
      return t(e);
    let n = e.offsetParent;
    return Pe(e) === n && (n = n.ownerDocument.body), n;
  }
  function co(e, t) {
    const n = pe(e);
    if (pn(e))
      return n;
    if (!_e(e)) {
      let i = We(e);
      for (; i && !pt(i); ) {
        if (we(i) && !Sn(i))
          return i;
        i = We(i);
      }
      return n;
    }
    let r = Fr(e, t);
    for (; r && Sa(r) && Sn(r); )
      r = Fr(r, t);
    return r && pt(r) && Sn(r) && !ur(r) ? n : r || Ca(e) || n;
  }
  const Ma = function(e) {
    return H(this, null, function* () {
      const t = this.getOffsetParent || co, n = this.getDimensions, r = yield n(e.floating);
      return {
        reference: Ra(e.reference, yield t(e.floating), e.strategy),
        floating: {
          x: 0,
          y: 0,
          width: r.width,
          height: r.height
        }
      };
    });
  };
  function Na(e) {
    return ve(e).direction === "rtl";
  }
  const ee = {
    convertOffsetParentRelativeRectToViewportRelativeRect: Oa,
    getDocumentElement: Pe,
    getClippingRect: za,
    getOffsetParent: co,
    getElementRects: Ma,
    getClientRects: Ea,
    getDimensions: Ia,
    getScale: ct,
    isElement: we,
    isRTL: Na
  };
  function Da(e, t) {
    let n = null, r;
    const i = Pe(e);
    function o() {
      var c;
      clearTimeout(r), (c = n) == null || c.disconnect(), n = null;
    }
    function s(c, l) {
      c === void 0 && (c = !1), l === void 0 && (l = 1), o();
      const {
        left: a,
        top: u,
        width: h,
        height: d
      } = e.getBoundingClientRect();
      if (c || t(), !h || !d)
        return;
      const m = Mt(u), w = Mt(i.clientWidth - (a + h)), k = Mt(i.clientHeight - (u + d)), C = Mt(a), x = {
        rootMargin: -m + "px " + -w + "px " + -k + "px " + -C + "px",
        threshold: lt(0, Gn(1, l)) || 1
      };
      let T = !0;
      function v(A) {
        const P = A[0].intersectionRatio;
        if (P !== l) {
          if (!T)
            return s();
          P ? s(!1, P) : r = setTimeout(() => {
            s(!1, 1e-7);
          }, 1e3);
        }
        T = !1;
      }
      try {
        n = new IntersectionObserver(v, Z(_({}, x), {
          // Handle <iframe>s
          root: i.ownerDocument
        }));
      } catch (A) {
        n = new IntersectionObserver(v, x);
      }
      n.observe(e);
    }
    return s(!0), o;
  }
  function uo(e, t, n, r) {
    r === void 0 && (r = {});
    const {
      ancestorScroll: i = !0,
      ancestorResize: o = !0,
      elementResize: s = typeof ResizeObserver == "function",
      layoutShift: c = typeof IntersectionObserver == "function",
      animationFrame: l = !1
    } = r, a = pr(e), u = i || o ? [...a ? Lt(a) : [], ...Lt(t)] : [];
    u.forEach((b) => {
      i && b.addEventListener("scroll", n, {
        passive: !0
      }), o && b.addEventListener("resize", n);
    });
    const h = a && c ? Da(a, n) : null;
    let d = -1, m = null;
    s && (m = new ResizeObserver((b) => {
      let [x] = b;
      x && x.target === a && m && (m.unobserve(t), cancelAnimationFrame(d), d = requestAnimationFrame(() => {
        var T;
        (T = m) == null || T.observe(t);
      })), n();
    }), a && !l && m.observe(a), m.observe(t));
    let w, k = l ? Qe(e) : null;
    l && C();
    function C() {
      const b = Qe(e);
      k && (b.x !== k.x || b.y !== k.y || b.width !== k.width || b.height !== k.height) && n(), k = b, w = requestAnimationFrame(C);
    }
    return n(), () => {
      var b;
      u.forEach((x) => {
        i && x.removeEventListener("scroll", n), o && x.removeEventListener("resize", n);
      }), h == null || h(), (b = m) == null || b.disconnect(), m = null, l && cancelAnimationFrame(w);
    };
  }
  const ja = va, De = 0, y = 1, $ = 2, G = 3, F = 4, Te = 5, dn = 6, te = 7, se = 8, I = 9, L = 10, B = 11, z = 12, W = 13, Rt = 14, ae = 15, ne = 16, re = 17, ce = 18, fe = 19, Se = 20, M = 21, E = 22, V = 23, ue = 24, X = 25, Fa = 0;
  function Q(e) {
    return e >= 48 && e <= 57;
  }
  function He(e) {
    return Q(e) || // 0 .. 9
    e >= 65 && e <= 70 || // A .. F
    e >= 97 && e <= 102;
  }
  function dr(e) {
    return e >= 65 && e <= 90;
  }
  function Ba(e) {
    return e >= 97 && e <= 122;
  }
  function Wa(e) {
    return dr(e) || Ba(e);
  }
  function Ha(e) {
    return e >= 128;
  }
  function en(e) {
    return Wa(e) || Ha(e) || e === 95;
  }
  function ho(e) {
    return en(e) || Q(e) || e === 45;
  }
  function Ua(e) {
    return e >= 0 && e <= 8 || e === 11 || e >= 14 && e <= 31 || e === 127;
  }
  function tn(e) {
    return e === 10 || e === 13 || e === 12;
  }
  function Xe(e) {
    return tn(e) || e === 32 || e === 9;
  }
  function Le(e, t) {
    return !(e !== 92 || tn(t) || t === Fa);
  }
  function qt(e, t, n) {
    return e === 45 ? en(t) || t === 45 || Le(t, n) : en(e) ? !0 : e === 92 ? Le(e, t) : !1;
  }
  function Cn(e, t, n) {
    return e === 43 || e === 45 ? Q(t) ? 2 : t === 46 && Q(n) ? 3 : 0 : e === 46 ? Q(t) ? 2 : 0 : Q(e) ? 1 : 0;
  }
  function po(e) {
    return e === 65279 || e === 65534 ? 1 : 0;
  }
  const Kn = new Array(128), qa = 128, Gt = 130, fo = 131, mr = 132, mo = 133;
  for (let e = 0; e < Kn.length; e++)
    Kn[e] = Xe(e) && Gt || Q(e) && fo || en(e) && mr || Ua(e) && mo || e || qa;
  function Tn(e) {
    return e < 128 ? Kn[e] : mr;
  }
  function ut(e, t) {
    return t < e.length ? e.charCodeAt(t) : 0;
  }
  function Yn(e, t, n) {
    return n === 13 && ut(e, t + 1) === 10 ? 2 : 1;
  }
  function ht(e, t, n) {
    let r = e.charCodeAt(t);
    return dr(r) && (r = r | 32), r === n;
  }
  function $t(e, t, n, r) {
    if (n - t !== r.length || t < 0 || n > e.length)
      return !1;
    for (let i = t; i < n; i++) {
      const o = r.charCodeAt(i - t);
      let s = e.charCodeAt(i);
      if (dr(s) && (s = s | 32), s !== o)
        return !1;
    }
    return !0;
  }
  function Ga(e, t) {
    for (; t >= 0 && Xe(e.charCodeAt(t)); t--)
      ;
    return t + 1;
  }
  function Nt(e, t) {
    for (; t < e.length && Xe(e.charCodeAt(t)); t++)
      ;
    return t;
  }
  function An(e, t) {
    for (; t < e.length && Q(e.charCodeAt(t)); t++)
      ;
    return t;
  }
  function ft(e, t) {
    if (t += 2, He(ut(e, t - 1))) {
      for (const r = Math.min(e.length, t + 5); t < r && He(ut(e, t)); t++)
        ;
      const n = ut(e, t);
      Xe(n) && (t += Yn(e, t, n));
    }
    return t;
  }
  function Dt(e, t) {
    for (; t < e.length; t++) {
      const n = e.charCodeAt(t);
      if (!ho(n)) {
        if (Le(n, ut(e, t + 1))) {
          t = ft(e, t) - 1;
          continue;
        }
        break;
      }
    }
    return t;
  }
  function mn(e, t) {
    let n = e.charCodeAt(t);
    if ((n === 43 || n === 45) && (n = e.charCodeAt(t += 1)), Q(n) && (t = An(e, t + 1), n = e.charCodeAt(t)), n === 46 && Q(e.charCodeAt(t + 1)) && (t += 2, t = An(e, t)), ht(
      e,
      t,
      101
      /* e */
    )) {
      let r = 0;
      n = e.charCodeAt(t + 1), (n === 45 || n === 43) && (r = 1, n = e.charCodeAt(t + 2)), Q(n) && (t = An(e, t + 1 + r + 1));
    }
    return t;
  }
  function On(e, t) {
    for (; t < e.length; t++) {
      const n = e.charCodeAt(t);
      if (n === 41) {
        t++;
        break;
      }
      Le(n, ut(e, t + 1)) && (t = ft(e, t));
    }
    return t;
  }
  function go(e) {
    if (e.length === 1 && !He(e.charCodeAt(0)))
      return e[0];
    let t = parseInt(e, 16);
    return (t === 0 || // If this number is zero,
    t >= 55296 && t <= 57343 || // or is for a surrogate,
    t > 1114111) && (t = 65533), String.fromCodePoint(t);
  }
  const bo = [
    "EOF-token",
    "ident-token",
    "function-token",
    "at-keyword-token",
    "hash-token",
    "string-token",
    "bad-string-token",
    "url-token",
    "bad-url-token",
    "delim-token",
    "number-token",
    "percentage-token",
    "dimension-token",
    "whitespace-token",
    "CDO-token",
    "CDC-token",
    "colon-token",
    "semicolon-token",
    "comma-token",
    "[-token",
    "]-token",
    "(-token",
    ")-token",
    "{-token",
    "}-token",
    "comment-token"
  ], Va = 16 * 1024;
  function nn(e = null, t) {
    return e === null || e.length < t ? new Uint32Array(Math.max(t + 1024, Va)) : e;
  }
  const Br = 10, Ka = 12, Wr = 13;
  function Hr(e) {
    const t = e.source, n = t.length, r = t.length > 0 ? po(t.charCodeAt(0)) : 0, i = nn(e.lines, n), o = nn(e.columns, n);
    let s = e.startLine, c = e.startColumn;
    for (let l = r; l < n; l++) {
      const a = t.charCodeAt(l);
      i[l] = s, o[l] = c++, (a === Br || a === Wr || a === Ka) && (a === Wr && l + 1 < n && t.charCodeAt(l + 1) === Br && (l++, i[l] = s, o[l] = c), s++, c = 1);
    }
    i[n] = s, o[n] = c, e.lines = i, e.columns = o, e.computed = !0;
  }
  class Ya {
    constructor() {
      this.lines = null, this.columns = null, this.computed = !1;
    }
    setSource(t, n = 0, r = 1, i = 1) {
      this.source = t, this.startOffset = n, this.startLine = r, this.startColumn = i, this.computed = !1;
    }
    getLocation(t, n) {
      return this.computed || Hr(this), {
        source: n,
        offset: this.startOffset + t,
        line: this.lines[t],
        column: this.columns[t]
      };
    }
    getLocationRange(t, n, r) {
      return this.computed || Hr(this), {
        source: r,
        start: {
          offset: this.startOffset + t,
          line: this.lines[t],
          column: this.columns[t]
        },
        end: {
          offset: this.startOffset + n,
          line: this.lines[n],
          column: this.columns[n]
        }
      };
    }
  }
  const de = 16777215, Ae = 24, Qa = /* @__PURE__ */ new Map([
    [$, E],
    [M, E],
    [fe, Se],
    [V, ue]
  ]);
  class Xa {
    constructor(t, n) {
      this.setSource(t, n);
    }
    reset() {
      this.eof = !1, this.tokenIndex = -1, this.tokenType = 0, this.tokenStart = this.firstCharOffset, this.tokenEnd = this.firstCharOffset;
    }
    setSource(t = "", n = () => {
    }) {
      t = String(t || "");
      const r = t.length, i = nn(this.offsetAndType, t.length + 1), o = nn(this.balance, t.length + 1);
      let s = 0, c = 0, l = 0, a = -1;
      for (this.offsetAndType = null, this.balance = null, n(t, (u, h, d) => {
        switch (u) {
          default:
            o[s] = r;
            break;
          case c: {
            let m = l & de;
            for (l = o[m], c = l >> Ae, o[s] = m, o[m++] = s; m < s; m++)
              o[m] === r && (o[m] = s);
            break;
          }
          case M:
          case $:
          case fe:
          case V:
            o[s] = l, c = Qa.get(u), l = c << Ae | s;
            break;
        }
        i[s++] = u << Ae | d, a === -1 && (a = h);
      }), i[s] = De << Ae | r, o[s] = r, o[r] = r; l !== 0; ) {
        const u = l & de;
        l = o[u], o[u] = r;
      }
      this.source = t, this.firstCharOffset = a === -1 ? 0 : a, this.tokenCount = s, this.offsetAndType = i, this.balance = o, this.reset(), this.next();
    }
    lookupType(t) {
      return t += this.tokenIndex, t < this.tokenCount ? this.offsetAndType[t] >> Ae : De;
    }
    lookupTypeNonSC(t) {
      for (let n = this.tokenIndex; n < this.tokenCount; n++) {
        const r = this.offsetAndType[n] >> Ae;
        if (r !== W && r !== X && t-- === 0)
          return r;
      }
      return De;
    }
    lookupOffset(t) {
      return t += this.tokenIndex, t < this.tokenCount ? this.offsetAndType[t - 1] & de : this.source.length;
    }
    lookupOffsetNonSC(t) {
      for (let n = this.tokenIndex; n < this.tokenCount; n++) {
        const r = this.offsetAndType[n] >> Ae;
        if (r !== W && r !== X && t-- === 0)
          return n - this.tokenIndex;
      }
      return De;
    }
    lookupValue(t, n) {
      return t += this.tokenIndex, t < this.tokenCount ? $t(
        this.source,
        this.offsetAndType[t - 1] & de,
        this.offsetAndType[t] & de,
        n
      ) : !1;
    }
    getTokenStart(t) {
      return t === this.tokenIndex ? this.tokenStart : t > 0 ? t < this.tokenCount ? this.offsetAndType[t - 1] & de : this.offsetAndType[this.tokenCount] & de : this.firstCharOffset;
    }
    substrToCursor(t) {
      return this.source.substring(t, this.tokenStart);
    }
    isBalanceEdge(t) {
      return this.balance[this.tokenIndex] < t;
    }
    isDelim(t, n) {
      return n ? this.lookupType(n) === I && this.source.charCodeAt(this.lookupOffset(n)) === t : this.tokenType === I && this.source.charCodeAt(this.tokenStart) === t;
    }
    skip(t) {
      let n = this.tokenIndex + t;
      n < this.tokenCount ? (this.tokenIndex = n, this.tokenStart = this.offsetAndType[n - 1] & de, n = this.offsetAndType[n], this.tokenType = n >> Ae, this.tokenEnd = n & de) : (this.tokenIndex = this.tokenCount, this.next());
    }
    next() {
      let t = this.tokenIndex + 1;
      t < this.tokenCount ? (this.tokenIndex = t, this.tokenStart = this.tokenEnd, t = this.offsetAndType[t], this.tokenType = t >> Ae, this.tokenEnd = t & de) : (this.eof = !0, this.tokenIndex = this.tokenCount, this.tokenType = De, this.tokenStart = this.tokenEnd = this.source.length);
    }
    skipSC() {
      for (; this.tokenType === W || this.tokenType === X; )
        this.next();
    }
    skipUntilBalanced(t, n) {
      let r = t, i, o;
      e:
        for (; r < this.tokenCount; r++) {
          if (i = this.balance[r], i < t)
            break e;
          switch (o = r > 0 ? this.offsetAndType[r - 1] & de : this.firstCharOffset, n(this.source.charCodeAt(o))) {
            case 1:
              break e;
            case 2:
              r++;
              break e;
            default:
              this.balance[i] === r && (r = i);
          }
        }
      this.skip(r - this.tokenIndex);
    }
    forEachToken(t) {
      for (let n = 0, r = this.firstCharOffset; n < this.tokenCount; n++) {
        const i = r, o = this.offsetAndType[n], s = o & de, c = o >> Ae;
        r = s, t(c, i, s, n);
      }
    }
    dump() {
      const t = new Array(this.tokenCount);
      return this.forEachToken((n, r, i, o) => {
        t[o] = {
          idx: o,
          type: bo[n],
          chunk: this.source.substring(r, i),
          balance: this.balance[o]
        };
      }), t;
    }
  }
  function gn(e, t) {
    function n(h) {
      return h < c ? e.charCodeAt(h) : 0;
    }
    function r() {
      if (a = mn(e, a), qt(n(a), n(a + 1), n(a + 2))) {
        u = z, a = Dt(e, a);
        return;
      }
      if (n(a) === 37) {
        u = B, a++;
        return;
      }
      u = L;
    }
    function i() {
      const h = a;
      if (a = Dt(e, a), $t(e, h, a, "url") && n(a) === 40) {
        if (a = Nt(e, a + 1), n(a) === 34 || n(a) === 39) {
          u = $, a = h + 4;
          return;
        }
        s();
        return;
      }
      if (n(a) === 40) {
        u = $, a++;
        return;
      }
      u = y;
    }
    function o(h) {
      for (h || (h = n(a++)), u = Te; a < e.length; a++) {
        const d = e.charCodeAt(a);
        switch (Tn(d)) {
          case h:
            a++;
            return;
          case Gt:
            if (tn(d)) {
              a += Yn(e, a, d), u = dn;
              return;
            }
            break;
          case 92:
            if (a === e.length - 1)
              break;
            const m = n(a + 1);
            tn(m) ? a += Yn(e, a + 1, m) : Le(d, m) && (a = ft(e, a) - 1);
            break;
        }
      }
    }
    function s() {
      for (u = te, a = Nt(e, a); a < e.length; a++) {
        const h = e.charCodeAt(a);
        switch (Tn(h)) {
          case 41:
            a++;
            return;
          case Gt:
            if (a = Nt(e, a), n(a) === 41 || a >= e.length) {
              a < e.length && a++;
              return;
            }
            a = On(e, a), u = se;
            return;
          case 34:
          case 39:
          case 40:
          case mo:
            a = On(e, a), u = se;
            return;
          case 92:
            if (Le(h, n(a + 1))) {
              a = ft(e, a) - 1;
              break;
            }
            a = On(e, a), u = se;
            return;
        }
      }
    }
    e = String(e || "");
    const c = e.length;
    let l = po(n(0)), a = l, u;
    for (; a < c; ) {
      const h = e.charCodeAt(a);
      switch (Tn(h)) {
        case Gt:
          u = W, a = Nt(e, a + 1);
          break;
        case 34:
          o();
          break;
        case 35:
          ho(n(a + 1)) || Le(n(a + 1), n(a + 2)) ? (u = F, a = Dt(e, a + 1)) : (u = I, a++);
          break;
        case 39:
          o();
          break;
        case 40:
          u = M, a++;
          break;
        case 41:
          u = E, a++;
          break;
        case 43:
          Cn(h, n(a + 1), n(a + 2)) ? r() : (u = I, a++);
          break;
        case 44:
          u = ce, a++;
          break;
        case 45:
          Cn(h, n(a + 1), n(a + 2)) ? r() : n(a + 1) === 45 && n(a + 2) === 62 ? (u = ae, a = a + 3) : qt(h, n(a + 1), n(a + 2)) ? i() : (u = I, a++);
          break;
        case 46:
          Cn(h, n(a + 1), n(a + 2)) ? r() : (u = I, a++);
          break;
        case 47:
          n(a + 1) === 42 ? (u = X, a = e.indexOf("*/", a + 2), a = a === -1 ? e.length : a + 2) : (u = I, a++);
          break;
        case 58:
          u = ne, a++;
          break;
        case 59:
          u = re, a++;
          break;
        case 60:
          n(a + 1) === 33 && n(a + 2) === 45 && n(a + 3) === 45 ? (u = Rt, a = a + 4) : (u = I, a++);
          break;
        case 64:
          qt(n(a + 1), n(a + 2), n(a + 3)) ? (u = G, a = Dt(e, a + 1)) : (u = I, a++);
          break;
        case 91:
          u = fe, a++;
          break;
        case 92:
          Le(h, n(a + 1)) ? i() : (u = I, a++);
          break;
        case 93:
          u = Se, a++;
          break;
        case 123:
          u = V, a++;
          break;
        case 125:
          u = ue, a++;
          break;
        case fo:
          r();
          break;
        case mr:
          i();
          break;
        default:
          u = I, a++;
      }
      t(u, l, l = a);
    }
  }
  let nt = null;
  class q {
    static createItem(t) {
      return {
        prev: null,
        next: null,
        data: t
      };
    }
    constructor() {
      this.head = null, this.tail = null, this.cursor = null;
    }
    createItem(t) {
      return q.createItem(t);
    }
    // cursor helpers
    allocateCursor(t, n) {
      let r;
      return nt !== null ? (r = nt, nt = nt.cursor, r.prev = t, r.next = n, r.cursor = this.cursor) : r = {
        prev: t,
        next: n,
        cursor: this.cursor
      }, this.cursor = r, r;
    }
    releaseCursor() {
      const { cursor: t } = this;
      this.cursor = t.cursor, t.prev = null, t.next = null, t.cursor = nt, nt = t;
    }
    updateCursors(t, n, r, i) {
      let { cursor: o } = this;
      for (; o !== null; )
        o.prev === t && (o.prev = n), o.next === r && (o.next = i), o = o.cursor;
    }
    *[Symbol.iterator]() {
      for (let t = this.head; t !== null; t = t.next)
        yield t.data;
    }
    // getters
    get size() {
      let t = 0;
      for (let n = this.head; n !== null; n = n.next)
        t++;
      return t;
    }
    get isEmpty() {
      return this.head === null;
    }
    get first() {
      return this.head && this.head.data;
    }
    get last() {
      return this.tail && this.tail.data;
    }
    // convertors
    fromArray(t) {
      let n = null;
      this.head = null;
      for (let r of t) {
        const i = q.createItem(r);
        n !== null ? n.next = i : this.head = i, i.prev = n, n = i;
      }
      return this.tail = n, this;
    }
    toArray() {
      return [...this];
    }
    toJSON() {
      return [...this];
    }
    // array-like methods
    forEach(t, n = this) {
      const r = this.allocateCursor(null, this.head);
      for (; r.next !== null; ) {
        const i = r.next;
        r.next = i.next, t.call(n, i.data, i, this);
      }
      this.releaseCursor();
    }
    forEachRight(t, n = this) {
      const r = this.allocateCursor(this.tail, null);
      for (; r.prev !== null; ) {
        const i = r.prev;
        r.prev = i.prev, t.call(n, i.data, i, this);
      }
      this.releaseCursor();
    }
    reduce(t, n, r = this) {
      let i = this.allocateCursor(null, this.head), o = n, s;
      for (; i.next !== null; )
        s = i.next, i.next = s.next, o = t.call(r, o, s.data, s, this);
      return this.releaseCursor(), o;
    }
    reduceRight(t, n, r = this) {
      let i = this.allocateCursor(this.tail, null), o = n, s;
      for (; i.prev !== null; )
        s = i.prev, i.prev = s.prev, o = t.call(r, o, s.data, s, this);
      return this.releaseCursor(), o;
    }
    some(t, n = this) {
      for (let r = this.head; r !== null; r = r.next)
        if (t.call(n, r.data, r, this))
          return !0;
      return !1;
    }
    map(t, n = this) {
      const r = new q();
      for (let i = this.head; i !== null; i = i.next)
        r.appendData(t.call(n, i.data, i, this));
      return r;
    }
    filter(t, n = this) {
      const r = new q();
      for (let i = this.head; i !== null; i = i.next)
        t.call(n, i.data, i, this) && r.appendData(i.data);
      return r;
    }
    nextUntil(t, n, r = this) {
      if (t === null)
        return;
      const i = this.allocateCursor(null, t);
      for (; i.next !== null; ) {
        const o = i.next;
        if (i.next = o.next, n.call(r, o.data, o, this))
          break;
      }
      this.releaseCursor();
    }
    prevUntil(t, n, r = this) {
      if (t === null)
        return;
      const i = this.allocateCursor(t, null);
      for (; i.prev !== null; ) {
        const o = i.prev;
        if (i.prev = o.prev, n.call(r, o.data, o, this))
          break;
      }
      this.releaseCursor();
    }
    // mutation
    clear() {
      this.head = null, this.tail = null;
    }
    copy() {
      const t = new q();
      for (let n of this)
        t.appendData(n);
      return t;
    }
    prepend(t) {
      return this.updateCursors(null, t, this.head, t), this.head !== null ? (this.head.prev = t, t.next = this.head) : this.tail = t, this.head = t, this;
    }
    prependData(t) {
      return this.prepend(q.createItem(t));
    }
    append(t) {
      return this.insert(t);
    }
    appendData(t) {
      return this.insert(q.createItem(t));
    }
    insert(t, n = null) {
      if (n !== null)
        if (this.updateCursors(n.prev, t, n, t), n.prev === null) {
          if (this.head !== n)
            throw new Error("before doesn't belong to list");
          this.head = t, n.prev = t, t.next = n, this.updateCursors(null, t);
        } else
          n.prev.next = t, t.prev = n.prev, n.prev = t, t.next = n;
      else
        this.updateCursors(this.tail, t, null, t), this.tail !== null ? (this.tail.next = t, t.prev = this.tail) : this.head = t, this.tail = t;
      return this;
    }
    insertData(t, n) {
      return this.insert(q.createItem(t), n);
    }
    remove(t) {
      if (this.updateCursors(t, t.prev, t, t.next), t.prev !== null)
        t.prev.next = t.next;
      else {
        if (this.head !== t)
          throw new Error("item doesn't belong to list");
        this.head = t.next;
      }
      if (t.next !== null)
        t.next.prev = t.prev;
      else {
        if (this.tail !== t)
          throw new Error("item doesn't belong to list");
        this.tail = t.prev;
      }
      return t.prev = null, t.next = null, t;
    }
    push(t) {
      this.insert(q.createItem(t));
    }
    pop() {
      return this.tail !== null ? this.remove(this.tail) : null;
    }
    unshift(t) {
      this.prepend(q.createItem(t));
    }
    shift() {
      return this.head !== null ? this.remove(this.head) : null;
    }
    prependList(t) {
      return this.insertList(t, this.head);
    }
    appendList(t) {
      return this.insertList(t);
    }
    insertList(t, n) {
      return t.head === null ? this : (n != null ? (this.updateCursors(n.prev, t.tail, n, t.head), n.prev !== null ? (n.prev.next = t.head, t.head.prev = n.prev) : this.head = t.head, n.prev = t.tail, t.tail.next = n) : (this.updateCursors(this.tail, t.tail, null, t.head), this.tail !== null ? (this.tail.next = t.head, t.head.prev = this.tail) : this.head = t.head, this.tail = t.tail), t.head = null, t.tail = null, this);
    }
    replace(t, n) {
      "head" in n ? this.insertList(n, t) : this.insert(n, t), this.remove(t);
    }
  }
  function bn(e, t) {
    const n = Object.create(SyntaxError.prototype), r = new Error();
    return Object.assign(n, {
      name: e,
      message: t,
      get stack() {
        return (r.stack || "").replace(/^(.+\n){1,3}/, `${e}: ${t}
`);
      }
    });
  }
  const En = 100, Ur = 60, qr = "    ";
  function Gr({ source: e, line: t, column: n, baseLine: r, baseColumn: i }, o) {
    function s(w, k) {
      return a.slice(w, k).map(
        (C, b) => String(w + b + 1).padStart(d) + " |" + C
      ).join(`
`);
    }
    const c = `
`.repeat(Math.max(r - 1, 0)), l = " ".repeat(Math.max(i - 1, 0)), a = (c + l + e).split(/\r\n?|\n|\f/), u = Math.max(1, t - o) - 1, h = Math.min(t + o, a.length + 1), d = Math.max(4, String(h).length) + 1;
    let m = 0;
    n += (qr.length - 1) * (a[t - 1].substr(0, n - 1).match(/\t/g) || []).length, n > En && (m = n - Ur + 3, n = Ur - 2);
    for (let w = u; w <= h; w++)
      w >= 0 && w < a.length && (a[w] = a[w].replace(/\t/g, qr), a[w] = (m > 0 && a[w].length > m ? "…" : "") + a[w].substr(m, En - 2) + (a[w].length > m + En - 1 ? "…" : ""));
    return [
      s(u, t),
      new Array(n + d + 2).join("-") + "^",
      s(t, h)
    ].filter(Boolean).join(`
`).replace(/^(\s+\d+\s+\|\n)+/, "").replace(/\n(\s+\d+\s+\|)+$/, "");
  }
  function Vr(e, t, n, r, i, o = 1, s = 1) {
    return Object.assign(bn("SyntaxError", e), {
      source: t,
      offset: n,
      line: r,
      column: i,
      sourceFragment(l) {
        return Gr({ source: t, line: r, column: i, baseLine: o, baseColumn: s }, isNaN(l) ? 0 : l);
      },
      get formattedMessage() {
        return `Parse error: ${e}
` + Gr({ source: t, line: r, column: i, baseLine: o, baseColumn: s }, 2);
      }
    });
  }
  function Za(e) {
    const t = this.createList();
    let n = !1;
    const r = {
      recognizer: e
    };
    for (; !this.eof; ) {
      switch (this.tokenType) {
        case X:
          this.next();
          continue;
        case W:
          n = !0, this.next();
          continue;
      }
      let i = e.getNode.call(this, r);
      if (i === void 0)
        break;
      n && (e.onWhiteSpace && e.onWhiteSpace.call(this, i, t, r), n = !1), t.push(i);
    }
    return n && e.onWhiteSpace && e.onWhiteSpace.call(this, null, t, r), t;
  }
  const Kr = () => {
  }, Ja = 33, el = 35, Ln = 59, Yr = 123, Qr = 0;
  function tl(e) {
    return function() {
      return this[e]();
    };
  }
  function $n(e) {
    const t = /* @__PURE__ */ Object.create(null);
    for (const n of Object.keys(e)) {
      const r = e[n], i = r.parse || r;
      i && (t[n] = i);
    }
    return t;
  }
  function nl(e) {
    const t = {
      context: /* @__PURE__ */ Object.create(null),
      features: Object.assign(/* @__PURE__ */ Object.create(null), e.features),
      scope: Object.assign(/* @__PURE__ */ Object.create(null), e.scope),
      atrule: $n(e.atrule),
      pseudo: $n(e.pseudo),
      node: $n(e.node)
    };
    for (const [n, r] of Object.entries(e.parseContext))
      switch (typeof r) {
        case "function":
          t.context[n] = r;
          break;
        case "string":
          t.context[n] = tl(r);
          break;
      }
    return _(_({
      config: t
    }, t), t.node);
  }
  function rl(e) {
    let t = "", n = "<unknown>", r = !1, i = Kr, o = !1;
    const s = new Ya(), c = Object.assign(new Xa(), nl(e || {}), {
      parseAtrulePrelude: !0,
      parseRulePrelude: !0,
      parseValue: !0,
      parseCustomProperty: !1,
      readSequence: Za,
      consumeUntilBalanceEnd: () => 0,
      consumeUntilLeftCurlyBracket(a) {
        return a === Yr ? 1 : 0;
      },
      consumeUntilLeftCurlyBracketOrSemicolon(a) {
        return a === Yr || a === Ln ? 1 : 0;
      },
      consumeUntilExclamationMarkOrSemicolon(a) {
        return a === Ja || a === Ln ? 1 : 0;
      },
      consumeUntilSemicolonIncluded(a) {
        return a === Ln ? 2 : 0;
      },
      createList() {
        return new q();
      },
      createSingleNodeList(a) {
        return new q().appendData(a);
      },
      getFirstListNode(a) {
        return a && a.first;
      },
      getLastListNode(a) {
        return a && a.last;
      },
      parseWithFallback(a, u) {
        const h = this.tokenIndex;
        try {
          return a.call(this);
        } catch (d) {
          if (o)
            throw d;
          this.skip(h - this.tokenIndex);
          const m = u.call(this);
          return o = !0, i(d, m), o = !1, m;
        }
      },
      lookupNonWSType(a) {
        let u;
        do
          if (u = this.lookupType(a++), u !== W && u !== X)
            return u;
        while (u !== Qr);
        return Qr;
      },
      charCodeAt(a) {
        return a >= 0 && a < t.length ? t.charCodeAt(a) : 0;
      },
      substring(a, u) {
        return t.substring(a, u);
      },
      substrToCursor(a) {
        return this.source.substring(a, this.tokenStart);
      },
      cmpChar(a, u) {
        return ht(t, a, u);
      },
      cmpStr(a, u, h) {
        return $t(t, a, u, h);
      },
      consume(a) {
        const u = this.tokenStart;
        return this.eat(a), this.substrToCursor(u);
      },
      consumeFunctionName() {
        const a = t.substring(this.tokenStart, this.tokenEnd - 1);
        return this.eat($), a;
      },
      consumeNumber(a) {
        const u = t.substring(this.tokenStart, mn(t, this.tokenStart));
        return this.eat(a), u;
      },
      eat(a) {
        if (this.tokenType !== a) {
          const u = bo[a].slice(0, -6).replace(/-/g, " ").replace(/^./, (m) => m.toUpperCase());
          let h = `${/[[\](){}]/.test(u) ? `"${u}"` : u} is expected`, d = this.tokenStart;
          switch (a) {
            case y:
              this.tokenType === $ || this.tokenType === te ? (d = this.tokenEnd - 1, h = "Identifier is expected but function found") : h = "Identifier is expected";
              break;
            case F:
              this.isDelim(el) && (this.next(), d++, h = "Name is expected");
              break;
            case B:
              this.tokenType === L && (d = this.tokenEnd, h = "Percent sign is expected");
              break;
          }
          this.error(h, d);
        }
        this.next();
      },
      eatIdent(a) {
        (this.tokenType !== y || this.lookupValue(0, a) === !1) && this.error(`Identifier "${a}" is expected`), this.next();
      },
      eatDelim(a) {
        this.isDelim(a) || this.error(`Delim "${String.fromCharCode(a)}" is expected`), this.next();
      },
      getLocation(a, u) {
        return r ? s.getLocationRange(
          a,
          u,
          n
        ) : null;
      },
      getLocationFromList(a) {
        if (r) {
          const u = this.getFirstListNode(a), h = this.getLastListNode(a);
          return s.getLocationRange(
            u !== null ? u.loc.start.offset - s.startOffset : this.tokenStart,
            h !== null ? h.loc.end.offset - s.startOffset : this.tokenStart,
            n
          );
        }
        return null;
      },
      error(a, u) {
        const h = typeof u != "undefined" && u < t.length ? s.getLocation(u) : this.eof ? s.getLocation(Ga(t, t.length - 1)) : s.getLocation(this.tokenStart);
        throw new Vr(
          a || "Unexpected input",
          t,
          h.offset,
          h.line,
          h.column,
          s.startLine,
          s.startColumn
        );
      }
    });
    return Object.assign(function(a, u) {
      t = a, u = u || {}, c.setSource(t, gn), s.setSource(
        t,
        u.offset,
        u.line,
        u.column
      ), n = u.filename || "<unknown>", r = !!u.positions, i = typeof u.onParseError == "function" ? u.onParseError : Kr, o = !1, c.parseAtrulePrelude = "parseAtrulePrelude" in u ? !!u.parseAtrulePrelude : !0, c.parseRulePrelude = "parseRulePrelude" in u ? !!u.parseRulePrelude : !0, c.parseValue = "parseValue" in u ? !!u.parseValue : !0, c.parseCustomProperty = "parseCustomProperty" in u ? !!u.parseCustomProperty : !1;
      const { context: h = "default", onComment: d } = u;
      if (!(h in c.context))
        throw new Error("Unknown context `" + h + "`");
      typeof d == "function" && c.forEachToken((w, k, C) => {
        if (w === X) {
          const b = c.getLocation(k, C), x = $t(t, C - 2, C, "*/") ? t.slice(k + 2, C - 2) : t.slice(k + 2, C);
          d(x, b);
        }
      });
      const m = c.context[h].call(c, u);
      return c.eof || c.error(), m;
    }, {
      SyntaxError: Vr,
      config: c.config
    });
  }
  var gr = {}, br = {}, Xr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  br.encode = function(e) {
    if (0 <= e && e < Xr.length)
      return Xr[e];
    throw new TypeError("Must be between 0 and 63: " + e);
  };
  br.decode = function(e) {
    var t = 65, n = 90, r = 97, i = 122, o = 48, s = 57, c = 43, l = 47, a = 26, u = 52;
    return t <= e && e <= n ? e - t : r <= e && e <= i ? e - r + a : o <= e && e <= s ? e - o + u : e == c ? 62 : e == l ? 63 : -1;
  };
  var yo = br, yr = 5, ko = 1 << yr, xo = ko - 1, wo = ko;
  function il(e) {
    return e < 0 ? (-e << 1) + 1 : (e << 1) + 0;
  }
  function ol(e) {
    var t = (e & 1) === 1, n = e >> 1;
    return t ? -n : n;
  }
  gr.encode = function(t) {
    var n = "", r, i = il(t);
    do
      r = i & xo, i >>>= yr, i > 0 && (r |= wo), n += yo.encode(r);
    while (i > 0);
    return n;
  };
  gr.decode = function(t, n, r) {
    var i = t.length, o = 0, s = 0, c, l;
    do {
      if (n >= i)
        throw new Error("Expected more digits in base 64 VLQ value.");
      if (l = yo.decode(t.charCodeAt(n++)), l === -1)
        throw new Error("Invalid base64 digit: " + t.charAt(n - 1));
      c = !!(l & wo), l &= xo, o = o + (l << s), s += yr;
    } while (c);
    r.value = ol(o), r.rest = n;
  };
  var yn = {};
  (function(e) {
    function t(p, f, S) {
      if (f in p)
        return p[f];
      if (arguments.length === 3)
        return S;
      throw new Error('"' + f + '" is a required argument.');
    }
    e.getArg = t;
    var n = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, r = /^data:.+\,.+$/;
    function i(p) {
      var f = p.match(n);
      return f ? {
        scheme: f[1],
        auth: f[2],
        host: f[3],
        port: f[4],
        path: f[5]
      } : null;
    }
    e.urlParse = i;
    function o(p) {
      var f = "";
      return p.scheme && (f += p.scheme + ":"), f += "//", p.auth && (f += p.auth + "@"), p.host && (f += p.host), p.port && (f += ":" + p.port), p.path && (f += p.path), f;
    }
    e.urlGenerate = o;
    var s = 32;
    function c(p) {
      var f = [];
      return function(S) {
        for (var g = 0; g < f.length; g++)
          if (f[g].input === S) {
            var K = f[0];
            return f[0] = f[g], f[g] = K, f[0].result;
          }
        var R = p(S);
        return f.unshift({
          input: S,
          result: R
        }), f.length > s && f.pop(), R;
      };
    }
    var l = c(function(f) {
      var S = f, g = i(f);
      if (g) {
        if (!g.path)
          return f;
        S = g.path;
      }
      for (var K = e.isAbsolute(S), R = [], be = 0, Y = 0; ; )
        if (be = Y, Y = S.indexOf("/", be), Y === -1) {
          R.push(S.slice(be));
          break;
        } else
          for (R.push(S.slice(be, Y)); Y < S.length && S[Y] === "/"; )
            Y++;
      for (var ze, Ue = 0, Y = R.length - 1; Y >= 0; Y--)
        ze = R[Y], ze === "." ? R.splice(Y, 1) : ze === ".." ? Ue++ : Ue > 0 && (ze === "" ? (R.splice(Y + 1, Ue), Ue = 0) : (R.splice(Y, 2), Ue--));
      return S = R.join("/"), S === "" && (S = K ? "/" : "."), g ? (g.path = S, o(g)) : S;
    });
    e.normalize = l;
    function a(p, f) {
      p === "" && (p = "."), f === "" && (f = ".");
      var S = i(f), g = i(p);
      if (g && (p = g.path || "/"), S && !S.scheme)
        return g && (S.scheme = g.scheme), o(S);
      if (S || f.match(r))
        return f;
      if (g && !g.host && !g.path)
        return g.host = f, o(g);
      var K = f.charAt(0) === "/" ? f : l(p.replace(/\/+$/, "") + "/" + f);
      return g ? (g.path = K, o(g)) : K;
    }
    e.join = a, e.isAbsolute = function(p) {
      return p.charAt(0) === "/" || n.test(p);
    };
    function u(p, f) {
      p === "" && (p = "."), p = p.replace(/\/$/, "");
      for (var S = 0; f.indexOf(p + "/") !== 0; ) {
        var g = p.lastIndexOf("/");
        if (g < 0 || (p = p.slice(0, g), p.match(/^([^\/]+:\/)?\/*$/)))
          return f;
        ++S;
      }
      return Array(S + 1).join("../") + f.substr(p.length + 1);
    }
    e.relative = u;
    var h = function() {
      var p = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in p);
    }();
    function d(p) {
      return p;
    }
    function m(p) {
      return k(p) ? "$" + p : p;
    }
    e.toSetString = h ? d : m;
    function w(p) {
      return k(p) ? p.slice(1) : p;
    }
    e.fromSetString = h ? d : w;
    function k(p) {
      if (!p)
        return !1;
      var f = p.length;
      if (f < 9 || p.charCodeAt(f - 1) !== 95 || p.charCodeAt(f - 2) !== 95 || p.charCodeAt(f - 3) !== 111 || p.charCodeAt(f - 4) !== 116 || p.charCodeAt(f - 5) !== 111 || p.charCodeAt(f - 6) !== 114 || p.charCodeAt(f - 7) !== 112 || p.charCodeAt(f - 8) !== 95 || p.charCodeAt(f - 9) !== 95)
        return !1;
      for (var S = f - 10; S >= 0; S--)
        if (p.charCodeAt(S) !== 36)
          return !1;
      return !0;
    }
    function C(p, f, S) {
      var g = v(p.source, f.source);
      return g !== 0 || (g = p.originalLine - f.originalLine, g !== 0) || (g = p.originalColumn - f.originalColumn, g !== 0 || S) || (g = p.generatedColumn - f.generatedColumn, g !== 0) || (g = p.generatedLine - f.generatedLine, g !== 0) ? g : v(p.name, f.name);
    }
    e.compareByOriginalPositions = C;
    function b(p, f, S) {
      var g;
      return g = p.originalLine - f.originalLine, g !== 0 || (g = p.originalColumn - f.originalColumn, g !== 0 || S) || (g = p.generatedColumn - f.generatedColumn, g !== 0) || (g = p.generatedLine - f.generatedLine, g !== 0) ? g : v(p.name, f.name);
    }
    e.compareByOriginalPositionsNoSource = b;
    function x(p, f, S) {
      var g = p.generatedLine - f.generatedLine;
      return g !== 0 || (g = p.generatedColumn - f.generatedColumn, g !== 0 || S) || (g = v(p.source, f.source), g !== 0) || (g = p.originalLine - f.originalLine, g !== 0) || (g = p.originalColumn - f.originalColumn, g !== 0) ? g : v(p.name, f.name);
    }
    e.compareByGeneratedPositionsDeflated = x;
    function T(p, f, S) {
      var g = p.generatedColumn - f.generatedColumn;
      return g !== 0 || S || (g = v(p.source, f.source), g !== 0) || (g = p.originalLine - f.originalLine, g !== 0) || (g = p.originalColumn - f.originalColumn, g !== 0) ? g : v(p.name, f.name);
    }
    e.compareByGeneratedPositionsDeflatedNoLine = T;
    function v(p, f) {
      return p === f ? 0 : p === null ? 1 : f === null ? -1 : p > f ? 1 : -1;
    }
    function A(p, f) {
      var S = p.generatedLine - f.generatedLine;
      return S !== 0 || (S = p.generatedColumn - f.generatedColumn, S !== 0) || (S = v(p.source, f.source), S !== 0) || (S = p.originalLine - f.originalLine, S !== 0) || (S = p.originalColumn - f.originalColumn, S !== 0) ? S : v(p.name, f.name);
    }
    e.compareByGeneratedPositionsInflated = A;
    function P(p) {
      return JSON.parse(p.replace(/^\)]}'[^\n]*\n/, ""));
    }
    e.parseSourceMapInput = P;
    function O(p, f, S) {
      if (f = f || "", p && (p[p.length - 1] !== "/" && f[0] !== "/" && (p += "/"), f = p + f), S) {
        var g = i(S);
        if (!g)
          throw new Error("sourceMapURL could not be parsed");
        if (g.path) {
          var K = g.path.lastIndexOf("/");
          K >= 0 && (g.path = g.path.substring(0, K + 1));
        }
        f = a(o(g), f);
      }
      return l(f);
    }
    e.computeSourceURL = O;
  })(yn);
  var vo = {}, kr = yn, xr = Object.prototype.hasOwnProperty, Ye = typeof Map != "undefined";
  function Re() {
    this._array = [], this._set = Ye ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
  }
  Re.fromArray = function(t, n) {
    for (var r = new Re(), i = 0, o = t.length; i < o; i++)
      r.add(t[i], n);
    return r;
  };
  Re.prototype.size = function() {
    return Ye ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  };
  Re.prototype.add = function(t, n) {
    var r = Ye ? t : kr.toSetString(t), i = Ye ? this.has(t) : xr.call(this._set, r), o = this._array.length;
    (!i || n) && this._array.push(t), i || (Ye ? this._set.set(t, o) : this._set[r] = o);
  };
  Re.prototype.has = function(t) {
    if (Ye)
      return this._set.has(t);
    var n = kr.toSetString(t);
    return xr.call(this._set, n);
  };
  Re.prototype.indexOf = function(t) {
    if (Ye) {
      var n = this._set.get(t);
      if (n >= 0)
        return n;
    } else {
      var r = kr.toSetString(t);
      if (xr.call(this._set, r))
        return this._set[r];
    }
    throw new Error('"' + t + '" is not in the set.');
  };
  Re.prototype.at = function(t) {
    if (t >= 0 && t < this._array.length)
      return this._array[t];
    throw new Error("No element indexed by " + t);
  };
  Re.prototype.toArray = function() {
    return this._array.slice();
  };
  vo.ArraySet = Re;
  var So = {}, Co = yn;
  function sl(e, t) {
    var n = e.generatedLine, r = t.generatedLine, i = e.generatedColumn, o = t.generatedColumn;
    return r > n || r == n && o >= i || Co.compareByGeneratedPositionsInflated(e, t) <= 0;
  }
  function kn() {
    this._array = [], this._sorted = !0, this._last = { generatedLine: -1, generatedColumn: 0 };
  }
  kn.prototype.unsortedForEach = function(t, n) {
    this._array.forEach(t, n);
  };
  kn.prototype.add = function(t) {
    sl(this._last, t) ? (this._last = t, this._array.push(t)) : (this._sorted = !1, this._array.push(t));
  };
  kn.prototype.toArray = function() {
    return this._sorted || (this._array.sort(Co.compareByGeneratedPositionsInflated), this._sorted = !0), this._array;
  };
  So.MappingList = kn;
  var yt = gr, U = yn, rn = vo.ArraySet, al = So.MappingList;
  function ge(e) {
    e || (e = {}), this._file = U.getArg(e, "file", null), this._sourceRoot = U.getArg(e, "sourceRoot", null), this._skipValidation = U.getArg(e, "skipValidation", !1), this._ignoreInvalidMapping = U.getArg(e, "ignoreInvalidMapping", !1), this._sources = new rn(), this._names = new rn(), this._mappings = new al(), this._sourcesContents = null;
  }
  ge.prototype._version = 3;
  ge.fromSourceMap = function(t, n) {
    var r = t.sourceRoot, i = new ge(Object.assign(n || {}, {
      file: t.file,
      sourceRoot: r
    }));
    return t.eachMapping(function(o) {
      var s = {
        generated: {
          line: o.generatedLine,
          column: o.generatedColumn
        }
      };
      o.source != null && (s.source = o.source, r != null && (s.source = U.relative(r, s.source)), s.original = {
        line: o.originalLine,
        column: o.originalColumn
      }, o.name != null && (s.name = o.name)), i.addMapping(s);
    }), t.sources.forEach(function(o) {
      var s = o;
      r !== null && (s = U.relative(r, o)), i._sources.has(s) || i._sources.add(s);
      var c = t.sourceContentFor(o);
      c != null && i.setSourceContent(o, c);
    }), i;
  };
  ge.prototype.addMapping = function(t) {
    var n = U.getArg(t, "generated"), r = U.getArg(t, "original", null), i = U.getArg(t, "source", null), o = U.getArg(t, "name", null);
    !this._skipValidation && this._validateMapping(n, r, i, o) === !1 || (i != null && (i = String(i), this._sources.has(i) || this._sources.add(i)), o != null && (o = String(o), this._names.has(o) || this._names.add(o)), this._mappings.add({
      generatedLine: n.line,
      generatedColumn: n.column,
      originalLine: r != null && r.line,
      originalColumn: r != null && r.column,
      source: i,
      name: o
    }));
  };
  ge.prototype.setSourceContent = function(t, n) {
    var r = t;
    this._sourceRoot != null && (r = U.relative(this._sourceRoot, r)), n != null ? (this._sourcesContents || (this._sourcesContents = /* @__PURE__ */ Object.create(null)), this._sourcesContents[U.toSetString(r)] = n) : this._sourcesContents && (delete this._sourcesContents[U.toSetString(r)], Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null));
  };
  ge.prototype.applySourceMap = function(t, n, r) {
    var i = n;
    if (n == null) {
      if (t.file == null)
        throw new Error(
          `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
        );
      i = t.file;
    }
    var o = this._sourceRoot;
    o != null && (i = U.relative(o, i));
    var s = new rn(), c = new rn();
    this._mappings.unsortedForEach(function(l) {
      if (l.source === i && l.originalLine != null) {
        var a = t.originalPositionFor({
          line: l.originalLine,
          column: l.originalColumn
        });
        a.source != null && (l.source = a.source, r != null && (l.source = U.join(r, l.source)), o != null && (l.source = U.relative(o, l.source)), l.originalLine = a.line, l.originalColumn = a.column, a.name != null && (l.name = a.name));
      }
      var u = l.source;
      u != null && !s.has(u) && s.add(u);
      var h = l.name;
      h != null && !c.has(h) && c.add(h);
    }, this), this._sources = s, this._names = c, t.sources.forEach(function(l) {
      var a = t.sourceContentFor(l);
      a != null && (r != null && (l = U.join(r, l)), o != null && (l = U.relative(o, l)), this.setSourceContent(l, a));
    }, this);
  };
  ge.prototype._validateMapping = function(t, n, r, i) {
    if (n && typeof n.line != "number" && typeof n.column != "number") {
      var o = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
      if (this._ignoreInvalidMapping)
        return typeof console != "undefined" && console.warn && console.warn(o), !1;
      throw new Error(o);
    }
    if (!(t && "line" in t && "column" in t && t.line > 0 && t.column >= 0 && !n && !r && !i)) {
      if (t && "line" in t && "column" in t && n && "line" in n && "column" in n && t.line > 0 && t.column >= 0 && n.line > 0 && n.column >= 0 && r)
        return;
      var o = "Invalid mapping: " + JSON.stringify({
        generated: t,
        source: r,
        original: n,
        name: i
      });
      if (this._ignoreInvalidMapping)
        return typeof console != "undefined" && console.warn && console.warn(o), !1;
      throw new Error(o);
    }
  };
  ge.prototype._serializeMappings = function() {
    for (var t = 0, n = 1, r = 0, i = 0, o = 0, s = 0, c = "", l, a, u, h, d = this._mappings.toArray(), m = 0, w = d.length; m < w; m++) {
      if (a = d[m], l = "", a.generatedLine !== n)
        for (t = 0; a.generatedLine !== n; )
          l += ";", n++;
      else if (m > 0) {
        if (!U.compareByGeneratedPositionsInflated(a, d[m - 1]))
          continue;
        l += ",";
      }
      l += yt.encode(a.generatedColumn - t), t = a.generatedColumn, a.source != null && (h = this._sources.indexOf(a.source), l += yt.encode(h - s), s = h, l += yt.encode(a.originalLine - 1 - i), i = a.originalLine - 1, l += yt.encode(a.originalColumn - r), r = a.originalColumn, a.name != null && (u = this._names.indexOf(a.name), l += yt.encode(u - o), o = u)), c += l;
    }
    return c;
  };
  ge.prototype._generateSourcesContent = function(t, n) {
    return t.map(function(r) {
      if (!this._sourcesContents)
        return null;
      n != null && (r = U.relative(n, r));
      var i = U.toSetString(r);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, i) ? this._sourcesContents[i] : null;
    }, this);
  };
  ge.prototype.toJSON = function() {
    var t = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    return this._file != null && (t.file = this._file), this._sourceRoot != null && (t.sourceRoot = this._sourceRoot), this._sourcesContents && (t.sourcesContent = this._generateSourcesContent(t.sources, t.sourceRoot)), t;
  };
  ge.prototype.toString = function() {
    return JSON.stringify(this.toJSON());
  };
  var ll = ge;
  const Zr = /* @__PURE__ */ new Set(["Atrule", "Selector", "Declaration"]);
  function cl(e) {
    const t = new ll(), n = {
      line: 1,
      column: 0
    }, r = {
      line: 0,
      // should be zero to add first mapping
      column: 0
    }, i = {
      line: 1,
      column: 0
    }, o = {
      generated: i
    };
    let s = 1, c = 0, l = !1;
    const a = e.node;
    e.node = function(d) {
      if (d.loc && d.loc.start && Zr.has(d.type)) {
        const m = d.loc.start.line, w = d.loc.start.column - 1;
        (r.line !== m || r.column !== w) && (r.line = m, r.column = w, n.line = s, n.column = c, l && (l = !1, (n.line !== i.line || n.column !== i.column) && t.addMapping(o)), l = !0, t.addMapping({
          source: d.loc.source,
          original: r,
          generated: n
        }));
      }
      a.call(this, d), l && Zr.has(d.type) && (i.line = s, i.column = c);
    };
    const u = e.emit;
    e.emit = function(d, m, w) {
      for (let k = 0; k < d.length; k++)
        d.charCodeAt(k) === 10 ? (s++, c = 0) : c++;
      u(d, m, w);
    };
    const h = e.result;
    return e.result = function() {
      return l && t.addMapping(o), {
        css: h(),
        map: t
      };
    }, e;
  }
  const ul = 43, hl = 45, _n = (e, t) => {
    if (e === I && (e = t), typeof e == "string") {
      const n = e.charCodeAt(0);
      return n > 127 ? 32768 : n << 8;
    }
    return e;
  }, To = [
    [y, y],
    [y, $],
    [y, te],
    [y, se],
    [y, "-"],
    [y, L],
    [y, B],
    [y, z],
    [y, ae],
    [y, M],
    [G, y],
    [G, $],
    [G, te],
    [G, se],
    [G, "-"],
    [G, L],
    [G, B],
    [G, z],
    [G, ae],
    [F, y],
    [F, $],
    [F, te],
    [F, se],
    [F, "-"],
    [F, L],
    [F, B],
    [F, z],
    [F, ae],
    [z, y],
    [z, $],
    [z, te],
    [z, se],
    [z, "-"],
    [z, L],
    [z, B],
    [z, z],
    [z, ae],
    ["#", y],
    ["#", $],
    ["#", te],
    ["#", se],
    ["#", "-"],
    ["#", L],
    ["#", B],
    ["#", z],
    ["#", ae],
    // https://github.com/w3c/csswg-drafts/pull/6874
    ["-", y],
    ["-", $],
    ["-", te],
    ["-", se],
    ["-", "-"],
    ["-", L],
    ["-", B],
    ["-", z],
    ["-", ae],
    // https://github.com/w3c/csswg-drafts/pull/6874
    [L, y],
    [L, $],
    [L, te],
    [L, se],
    [L, L],
    [L, B],
    [L, z],
    [L, "%"],
    [L, ae],
    // https://github.com/w3c/csswg-drafts/pull/6874
    ["@", y],
    ["@", $],
    ["@", te],
    ["@", se],
    ["@", "-"],
    ["@", ae],
    // https://github.com/w3c/csswg-drafts/pull/6874
    [".", L],
    [".", B],
    [".", z],
    ["+", L],
    ["+", B],
    ["+", z],
    ["/", "*"]
  ], pl = To.concat([
    [y, F],
    [z, F],
    [F, F],
    [G, M],
    [G, Te],
    [G, ne],
    [B, B],
    [B, z],
    [B, $],
    [B, "-"],
    [E, y],
    [E, $],
    [E, B],
    [E, z],
    [E, F],
    [E, "-"]
  ]);
  function Ao(e) {
    const t = new Set(
      e.map(([n, r]) => _n(n) << 16 | _n(r))
    );
    return function(n, r, i) {
      const o = _n(r, i), s = i.charCodeAt(0);
      return (s === hl && r !== y && r !== $ && r !== ae || s === ul ? t.has(n << 16 | s << 8) : t.has(n << 16 | o)) && this.emit(" ", W, !0), o;
    };
  }
  const fl = Ao(To), Oo = Ao(pl), Jr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    safe: Oo,
    spec: fl
  }, Symbol.toStringTag, { value: "Module" })), dl = 92;
  function ml(e, t) {
    if (typeof t == "function") {
      let n = null;
      e.children.forEach((r) => {
        n !== null && t.call(this, n), this.node(r), n = r;
      });
      return;
    }
    e.children.forEach(this.node, this);
  }
  function gl(e) {
    gn(e, (t, n, r) => {
      this.token(t, e.slice(n, r));
    });
  }
  function bl(e) {
    const t = /* @__PURE__ */ new Map();
    for (let [n, r] of Object.entries(e.node))
      typeof (r.generate || r) == "function" && t.set(n, r.generate || r);
    return function(n, r) {
      let i = "", o = 0, s = {
        node(l) {
          if (t.has(l.type))
            t.get(l.type).call(c, l);
          else
            throw new Error("Unknown node type: " + l.type);
        },
        tokenBefore: Oo,
        token(l, a) {
          o = this.tokenBefore(o, l, a), this.emit(a, l, !1), l === I && a.charCodeAt(0) === dl && this.emit(`
`, W, !0);
        },
        emit(l) {
          i += l;
        },
        result() {
          return i;
        }
      };
      r && (typeof r.decorator == "function" && (s = r.decorator(s)), r.sourceMap && (s = cl(s)), r.mode in Jr && (s.tokenBefore = Jr[r.mode]));
      const c = {
        node: (l) => s.node(l),
        children: ml,
        token: (l, a) => s.token(l, a),
        tokenize: gl
      };
      return s.node(n), s.result();
    };
  }
  function yl(e) {
    return {
      fromPlainObject(t) {
        return e(t, {
          enter(n) {
            n.children && !(n.children instanceof q) && (n.children = new q().fromArray(n.children));
          }
        }), t;
      },
      toPlainObject(t) {
        return e(t, {
          leave(n) {
            n.children && n.children instanceof q && (n.children = n.children.toArray());
          }
        }), t;
      }
    };
  }
  const { hasOwnProperty: wr } = Object.prototype, xt = function() {
  };
  function ei(e) {
    return typeof e == "function" ? e : xt;
  }
  function ti(e, t) {
    return function(n, r, i) {
      n.type === t && e.call(this, n, r, i);
    };
  }
  function kl(e, t) {
    const n = t.structure, r = [];
    for (const i in n) {
      if (wr.call(n, i) === !1)
        continue;
      let o = n[i];
      const s = {
        name: i,
        type: !1,
        nullable: !1
      };
      Array.isArray(o) || (o = [o]);
      for (const c of o)
        c === null ? s.nullable = !0 : typeof c == "string" ? s.type = "node" : Array.isArray(c) && (s.type = "list");
      s.type && r.push(s);
    }
    return r.length ? {
      context: t.walkContext,
      fields: r
    } : null;
  }
  function xl(e) {
    const t = {};
    for (const n in e.node)
      if (wr.call(e.node, n)) {
        const r = e.node[n];
        if (!r.structure)
          throw new Error("Missed `structure` field in `" + n + "` node type definition");
        t[n] = kl(n, r);
      }
    return t;
  }
  function ni(e, t) {
    const n = e.fields.slice(), r = e.context, i = typeof r == "string";
    return t && n.reverse(), function(o, s, c, l) {
      let a;
      i && (a = s[r], s[r] = o);
      for (const u of n) {
        const h = o[u.name];
        if (!u.nullable || h) {
          if (u.type === "list") {
            if (t ? h.reduceRight(l, !1) : h.reduce(l, !1))
              return !0;
          } else if (c(h))
            return !0;
        }
      }
      i && (s[r] = a);
    };
  }
  function ri({
    StyleSheet: e,
    Atrule: t,
    Rule: n,
    Block: r,
    DeclarationList: i
  }) {
    return {
      Atrule: {
        StyleSheet: e,
        Atrule: t,
        Rule: n,
        Block: r
      },
      Rule: {
        StyleSheet: e,
        Atrule: t,
        Rule: n,
        Block: r
      },
      Declaration: {
        StyleSheet: e,
        Atrule: t,
        Rule: n,
        Block: r,
        DeclarationList: i
      }
    };
  }
  function wl(e) {
    const t = xl(e), n = {}, r = {}, i = Symbol("break-walk"), o = Symbol("skip-node");
    for (const a in t)
      wr.call(t, a) && t[a] !== null && (n[a] = ni(t[a], !1), r[a] = ni(t[a], !0));
    const s = ri(n), c = ri(r), l = function(a, u) {
      function h(b, x, T) {
        const v = d.call(C, b, x, T);
        return v === i ? !0 : v === o ? !1 : !!(w.hasOwnProperty(b.type) && w[b.type](b, C, h, k) || m.call(C, b, x, T) === i);
      }
      let d = xt, m = xt, w = n, k = (b, x, T, v) => b || h(x, T, v);
      const C = {
        break: i,
        skip: o,
        root: a,
        stylesheet: null,
        atrule: null,
        atrulePrelude: null,
        rule: null,
        selector: null,
        block: null,
        declaration: null,
        function: null
      };
      if (typeof u == "function")
        d = u;
      else if (u && (d = ei(u.enter), m = ei(u.leave), u.reverse && (w = r), u.visit)) {
        if (s.hasOwnProperty(u.visit))
          w = u.reverse ? c[u.visit] : s[u.visit];
        else if (!t.hasOwnProperty(u.visit))
          throw new Error("Bad value `" + u.visit + "` for `visit` option (should be: " + Object.keys(t).sort().join(", ") + ")");
        d = ti(d, u.visit), m = ti(m, u.visit);
      }
      if (d === xt && m === xt)
        throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
      h(a);
    };
    return l.break = i, l.skip = o, l.find = function(a, u) {
      let h = null;
      return l(a, function(d, m, w) {
        if (u.call(this, d, m, w))
          return h = d, i;
      }), h;
    }, l.findLast = function(a, u) {
      let h = null;
      return l(a, {
        reverse: !0,
        enter(d, m, w) {
          if (u.call(this, d, m, w))
            return h = d, i;
        }
      }), h;
    }, l.findAll = function(a, u) {
      const h = [];
      return l(a, function(d, m, w) {
        u.call(this, d, m, w) && h.push(d);
      }), h;
    }, l;
  }
  function vl(e) {
    return e;
  }
  function Sl(e) {
    const { min: t, max: n, comma: r } = e;
    return t === 0 && n === 0 ? r ? "#?" : "*" : t === 0 && n === 1 ? "?" : t === 1 && n === 0 ? r ? "#" : "+" : t === 1 && n === 1 ? "" : (r ? "#" : "") + (t === n ? "{" + t + "}" : "{" + t + "," + (n !== 0 ? n : "") + "}");
  }
  function Cl(e) {
    switch (e.type) {
      case "Range":
        return " [" + (e.min === null ? "-∞" : e.min) + "," + (e.max === null ? "∞" : e.max) + "]";
      default:
        throw new Error("Unknown node type `" + e.type + "`");
    }
  }
  function Tl(e, t, n, r) {
    const i = e.combinator === " " || r ? e.combinator : " " + e.combinator + " ", o = e.terms.map((s) => vr(s, t, n, r)).join(i);
    return e.explicit || n ? (r || o[0] === "," ? "[" : "[ ") + o + (r ? "]" : " ]") : o;
  }
  function vr(e, t, n, r) {
    let i;
    switch (e.type) {
      case "Group":
        i = Tl(e, t, n, r) + (e.disallowEmpty ? "!" : "");
        break;
      case "Multiplier":
        return vr(e.term, t, n, r) + t(Sl(e), e);
      case "Type":
        i = "<" + e.name + (e.opts ? t(Cl(e.opts), e.opts) : "") + ">";
        break;
      case "Property":
        i = "<'" + e.name + "'>";
        break;
      case "Keyword":
        i = e.name;
        break;
      case "AtKeyword":
        i = "@" + e.name;
        break;
      case "Function":
        i = e.name + "(";
        break;
      case "String":
      case "Token":
        i = e.value;
        break;
      case "Comma":
        i = ",";
        break;
      default:
        throw new Error("Unknown node type `" + e.type + "`");
    }
    return t(i, e);
  }
  function Sr(e, t) {
    let n = vl, r = !1, i = !1;
    return typeof t == "function" ? n = t : t && (r = !!t.forceBraces, i = !!t.compact, typeof t.decorate == "function" && (n = t.decorate)), vr(e, n, r, i);
  }
  const ii = { offset: 0, line: 1, column: 1 };
  function Al(e, t) {
    const n = e.tokens, r = e.longestMatch, i = r < n.length && n[r].node || null, o = i !== t ? i : null;
    let s = 0, c = 0, l = 0, a = "", u, h;
    for (let d = 0; d < n.length; d++) {
      const m = n[d].value;
      d === r && (c = m.length, s = a.length), o !== null && n[d].node === o && (d <= r ? l++ : l = 0), a += m;
    }
    return r === n.length || l > 1 ? (u = jt(o || t, "end") || wt(ii, a), h = wt(u)) : (u = jt(o, "start") || wt(jt(t, "start") || ii, a.slice(0, s)), h = jt(o, "end") || wt(u, a.substr(s, c))), {
      css: a,
      mismatchOffset: s,
      mismatchLength: c,
      start: u,
      end: h
    };
  }
  function jt(e, t) {
    const n = e && e.loc && e.loc[t];
    return n ? "line" in n ? wt(n) : n : null;
  }
  function wt({ offset: e, line: t, column: n }, r) {
    const i = {
      offset: e,
      line: t,
      column: n
    };
    if (r) {
      const o = r.split(/\n|\r\n?|\f/);
      i.offset += r.length, i.line += o.length - 1, i.column = o.length === 1 ? i.column + r.length : o.pop().length + 1;
    }
    return i;
  }
  const kt = function(e, t) {
    const n = bn(
      "SyntaxReferenceError",
      e + (t ? " `" + t + "`" : "")
    );
    return n.reference = t, n;
  }, Ol = function(e, t, n, r) {
    const i = bn("SyntaxMatchError", e), {
      css: o,
      mismatchOffset: s,
      mismatchLength: c,
      start: l,
      end: a
    } = Al(r, n);
    return i.rawMessage = e, i.syntax = t ? Sr(t) : "<generic>", i.css = o, i.mismatchOffset = s, i.mismatchLength = c, i.message = e + `
  syntax: ` + i.syntax + `
   value: ` + (o || "<empty string>") + `
  --------` + new Array(i.mismatchOffset + 1).join("-") + "^", Object.assign(i, l), i.loc = {
      source: n && n.loc && n.loc.source || "<unknown>",
      start: l,
      end: a
    }, i;
  }, Ft = /* @__PURE__ */ new Map(), rt = /* @__PURE__ */ new Map(), on = 45, Pn = El, oi = Ll;
  function Cr(e, t) {
    return t = t || 0, e.length - t >= 2 && e.charCodeAt(t) === on && e.charCodeAt(t + 1) === on;
  }
  function Eo(e, t) {
    if (t = t || 0, e.length - t >= 3 && e.charCodeAt(t) === on && e.charCodeAt(t + 1) !== on) {
      const n = e.indexOf("-", t + 2);
      if (n !== -1)
        return e.substring(t, n + 1);
    }
    return "";
  }
  function El(e) {
    if (Ft.has(e))
      return Ft.get(e);
    const t = e.toLowerCase();
    let n = Ft.get(t);
    if (n === void 0) {
      const r = Cr(t, 0), i = r ? "" : Eo(t, 0);
      n = Object.freeze({
        basename: t.substr(i.length),
        name: t,
        prefix: i,
        vendor: i,
        custom: r
      });
    }
    return Ft.set(e, n), n;
  }
  function Ll(e) {
    if (rt.has(e))
      return rt.get(e);
    let t = e, n = e[0];
    n === "/" ? n = e[1] === "/" ? "//" : "/" : n !== "_" && n !== "*" && n !== "$" && n !== "#" && n !== "+" && n !== "&" && (n = "");
    const r = Cr(t, n.length);
    if (!r && (t = t.toLowerCase(), rt.has(t))) {
      const c = rt.get(t);
      return rt.set(e, c), c;
    }
    const i = r ? "" : Eo(t, n.length), o = t.substr(0, n.length + i.length), s = Object.freeze({
      basename: t.substr(o.length),
      name: t.substr(n.length),
      hack: n,
      vendor: i,
      prefix: o,
      custom: r
    });
    return rt.set(e, s), s;
  }
  const Lo = [
    "initial",
    "inherit",
    "unset",
    "revert",
    "revert-layer"
  ], _t = 43, Oe = 45, zn = 110, it = !0, $l = !1;
  function Qn(e, t) {
    return e !== null && e.type === I && e.value.charCodeAt(0) === t;
  }
  function Tt(e, t, n) {
    for (; e !== null && (e.type === W || e.type === X); )
      e = n(++t);
    return t;
  }
  function Ne(e, t, n, r) {
    if (!e)
      return 0;
    const i = e.value.charCodeAt(t);
    if (i === _t || i === Oe) {
      if (n)
        return 0;
      t++;
    }
    for (; t < e.value.length; t++)
      if (!Q(e.value.charCodeAt(t)))
        return 0;
    return r + 1;
  }
  function In(e, t, n) {
    let r = !1, i = Tt(e, t, n);
    if (e = n(i), e === null)
      return t;
    if (e.type !== L)
      if (Qn(e, _t) || Qn(e, Oe)) {
        if (r = !0, i = Tt(n(++i), i, n), e = n(i), e === null || e.type !== L)
          return 0;
      } else
        return t;
    if (!r) {
      const o = e.value.charCodeAt(0);
      if (o !== _t && o !== Oe)
        return 0;
    }
    return Ne(e, r ? 0 : 1, r, i);
  }
  function _l(e, t) {
    let n = 0;
    if (!e)
      return 0;
    if (e.type === L)
      return Ne(e, 0, $l, n);
    if (e.type === y && e.value.charCodeAt(0) === Oe) {
      if (!ht(e.value, 1, zn))
        return 0;
      switch (e.value.length) {
        case 2:
          return In(t(++n), n, t);
        case 3:
          return e.value.charCodeAt(2) !== Oe ? 0 : (n = Tt(t(++n), n, t), e = t(n), Ne(e, 0, it, n));
        default:
          return e.value.charCodeAt(2) !== Oe ? 0 : Ne(e, 3, it, n);
      }
    } else if (e.type === y || Qn(e, _t) && t(n + 1).type === y) {
      if (e.type !== y && (e = t(++n)), e === null || !ht(e.value, 0, zn))
        return 0;
      switch (e.value.length) {
        case 1:
          return In(t(++n), n, t);
        case 2:
          return e.value.charCodeAt(1) !== Oe ? 0 : (n = Tt(t(++n), n, t), e = t(n), Ne(e, 0, it, n));
        default:
          return e.value.charCodeAt(1) !== Oe ? 0 : Ne(e, 2, it, n);
      }
    } else if (e.type === z) {
      let r = e.value.charCodeAt(0), i = r === _t || r === Oe ? 1 : 0, o = i;
      for (; o < e.value.length && Q(e.value.charCodeAt(o)); o++)
        ;
      return o === i || !ht(e.value, o, zn) ? 0 : o + 1 === e.value.length ? In(t(++n), n, t) : e.value.charCodeAt(o + 1) !== Oe ? 0 : o + 2 === e.value.length ? (n = Tt(t(++n), n, t), e = t(n), Ne(e, 0, it, n)) : Ne(e, o + 2, it, n);
    }
    return 0;
  }
  const Pl = 43, $o = 45, _o = 63, zl = 117;
  function Xn(e, t) {
    return e !== null && e.type === I && e.value.charCodeAt(0) === t;
  }
  function Il(e, t) {
    return e.value.charCodeAt(0) === t;
  }
  function vt(e, t, n) {
    let r = 0;
    for (let i = t; i < e.value.length; i++) {
      const o = e.value.charCodeAt(i);
      if (o === $o && n && r !== 0)
        return vt(e, t + r + 1, !1), 6;
      if (!He(o) || ++r > 6)
        return 0;
    }
    return r;
  }
  function Bt(e, t, n) {
    if (!e)
      return 0;
    for (; Xn(n(t), _o); ) {
      if (++e > 6)
        return 0;
      t++;
    }
    return t;
  }
  function Rl(e, t) {
    let n = 0;
    if (e === null || e.type !== y || !ht(e.value, 0, zl) || (e = t(++n), e === null))
      return 0;
    if (Xn(e, Pl))
      return e = t(++n), e === null ? 0 : e.type === y ? Bt(vt(e, 0, !0), ++n, t) : Xn(e, _o) ? Bt(1, ++n, t) : 0;
    if (e.type === L) {
      const r = vt(e, 1, !0);
      return r === 0 ? 0 : (e = t(++n), e === null ? n : e.type === z || e.type === L ? !Il(e, $o) || !vt(e, 1, !1) ? 0 : n + 1 : Bt(r, n, t));
    }
    return e.type === z ? Bt(vt(e, 1, !0), ++n, t) : 0;
  }
  const Ml = ["calc(", "-moz-calc(", "-webkit-calc("], Tr = /* @__PURE__ */ new Map([
    [$, E],
    [M, E],
    [fe, Se],
    [V, ue]
  ]);
  function xe(e, t) {
    return t < e.length ? e.charCodeAt(t) : 0;
  }
  function Po(e, t) {
    return $t(e, 0, e.length, t);
  }
  function zo(e, t) {
    for (let n = 0; n < t.length; n++)
      if (Po(e, t[n]))
        return !0;
    return !1;
  }
  function Io(e, t) {
    return t !== e.length - 2 ? !1 : xe(e, t) === 92 && // U+005C REVERSE SOLIDUS (\)
    Q(xe(e, t + 1));
  }
  function xn(e, t, n) {
    if (e && e.type === "Range") {
      const r = Number(
        n !== void 0 && n !== t.length ? t.substr(0, n) : t
      );
      if (isNaN(r) || e.min !== null && r < e.min && typeof e.min != "string" || e.max !== null && r > e.max && typeof e.max != "string")
        return !0;
    }
    return !1;
  }
  function Nl(e, t) {
    let n = 0, r = [], i = 0;
    e:
      do {
        switch (e.type) {
          case ue:
          case E:
          case Se:
            if (e.type !== n)
              break e;
            if (n = r.pop(), r.length === 0) {
              i++;
              break e;
            }
            break;
          case $:
          case M:
          case fe:
          case V:
            r.push(n), n = Tr.get(e.type);
            break;
        }
        i++;
      } while (e = t(i));
    return i;
  }
  function me(e) {
    return function(t, n, r) {
      return t === null ? 0 : t.type === $ && zo(t.value, Ml) ? Nl(t, n) : e(t, n, r);
    };
  }
  function j(e) {
    return function(t) {
      return t === null || t.type !== e ? 0 : 1;
    };
  }
  function Dl(e) {
    if (e === null || e.type !== y)
      return 0;
    const t = e.value.toLowerCase();
    return zo(t, Lo) || Po(t, "default") ? 0 : 1;
  }
  function Ro(e) {
    return e === null || e.type !== y || xe(e.value, 0) !== 45 || xe(e.value, 1) !== 45 ? 0 : 1;
  }
  function jl(e) {
    return !Ro(e) || e.value === "--" ? 0 : 1;
  }
  function Fl(e) {
    if (e === null || e.type !== F)
      return 0;
    const t = e.value.length;
    if (t !== 4 && t !== 5 && t !== 7 && t !== 9)
      return 0;
    for (let n = 1; n < t; n++)
      if (!He(xe(e.value, n)))
        return 0;
    return 1;
  }
  function Bl(e) {
    return e === null || e.type !== F || !qt(xe(e.value, 1), xe(e.value, 2), xe(e.value, 3)) ? 0 : 1;
  }
  function Wl(e, t) {
    if (!e)
      return 0;
    let n = 0, r = [], i = 0;
    e:
      do {
        switch (e.type) {
          case dn:
          case se:
            break e;
          case ue:
          case E:
          case Se:
            if (e.type !== n)
              break e;
            n = r.pop();
            break;
          case re:
            if (n === 0)
              break e;
            break;
          case I:
            if (n === 0 && e.value === "!")
              break e;
            break;
          case $:
          case M:
          case fe:
          case V:
            r.push(n), n = Tr.get(e.type);
            break;
        }
        i++;
      } while (e = t(i));
    return i;
  }
  function Hl(e, t) {
    if (!e)
      return 0;
    let n = 0, r = [], i = 0;
    e:
      do {
        switch (e.type) {
          case dn:
          case se:
            break e;
          case ue:
          case E:
          case Se:
            if (e.type !== n)
              break e;
            n = r.pop();
            break;
          case $:
          case M:
          case fe:
          case V:
            r.push(n), n = Tr.get(e.type);
            break;
        }
        i++;
      } while (e = t(i));
    return i;
  }
  function Ie(e) {
    return e && (e = new Set(e)), function(t, n, r) {
      if (t === null || t.type !== z)
        return 0;
      const i = mn(t.value, 0);
      if (e !== null) {
        const o = t.value.indexOf("\\", i), s = o === -1 || !Io(t.value, o) ? t.value.substr(i) : t.value.substring(i, o);
        if (e.has(s.toLowerCase()) === !1)
          return 0;
      }
      return xn(r, t.value, i) ? 0 : 1;
    };
  }
  function Ul(e, t, n) {
    return e === null || e.type !== B || xn(n, e.value, e.value.length - 1) ? 0 : 1;
  }
  function Mo(e) {
    return typeof e != "function" && (e = function() {
      return 0;
    }), function(t, n, r) {
      return t !== null && t.type === L && Number(t.value) === 0 ? 1 : e(t, n, r);
    };
  }
  function ql(e, t, n) {
    if (e === null)
      return 0;
    const r = mn(e.value, 0);
    return !(r === e.value.length) && !Io(e.value, r) || xn(n, e.value, r) ? 0 : 1;
  }
  function Gl(e, t, n) {
    if (e === null || e.type !== L)
      return 0;
    let r = xe(e.value, 0) === 43 || // U+002B PLUS SIGN (+)
    xe(e.value, 0) === 45 ? 1 : 0;
    for (; r < e.value.length; r++)
      if (!Q(xe(e.value, r)))
        return 0;
    return xn(n, e.value, r) ? 0 : 1;
  }
  const Vl = {
    "ident-token": j(y),
    "function-token": j($),
    "at-keyword-token": j(G),
    "hash-token": j(F),
    "string-token": j(Te),
    "bad-string-token": j(dn),
    "url-token": j(te),
    "bad-url-token": j(se),
    "delim-token": j(I),
    "number-token": j(L),
    "percentage-token": j(B),
    "dimension-token": j(z),
    "whitespace-token": j(W),
    "CDO-token": j(Rt),
    "CDC-token": j(ae),
    "colon-token": j(ne),
    "semicolon-token": j(re),
    "comma-token": j(ce),
    "[-token": j(fe),
    "]-token": j(Se),
    "(-token": j(M),
    ")-token": j(E),
    "{-token": j(V),
    "}-token": j(ue)
  }, Kl = {
    // token type aliases
    string: j(Te),
    ident: j(y),
    // percentage
    percentage: me(Ul),
    // numeric
    zero: Mo(),
    number: me(ql),
    integer: me(Gl),
    // complex types
    "custom-ident": Dl,
    "dashed-ident": Ro,
    "custom-property-name": jl,
    "hex-color": Fl,
    "id-selector": Bl,
    // element( <id-selector> )
    "an-plus-b": _l,
    urange: Rl,
    "declaration-value": Wl,
    "any-value": Hl
  };
  function Yl(e) {
    const {
      angle: t,
      decibel: n,
      frequency: r,
      flex: i,
      length: o,
      resolution: s,
      semitones: c,
      time: l
    } = e || {};
    return {
      dimension: me(Ie(null)),
      angle: me(Ie(t)),
      decibel: me(Ie(n)),
      frequency: me(Ie(r)),
      flex: me(Ie(i)),
      length: me(Mo(Ie(o))),
      resolution: me(Ie(s)),
      semitones: me(Ie(c)),
      time: me(Ie(l))
    };
  }
  function Ql(e) {
    return _(_(_({}, Vl), Kl), Yl(e));
  }
  const Xl = [
    // absolute length units https://www.w3.org/TR/css-values-3/#lengths
    "cm",
    "mm",
    "q",
    "in",
    "pt",
    "pc",
    "px",
    // font-relative length units https://drafts.csswg.org/css-values-4/#font-relative-lengths
    "em",
    "rem",
    "ex",
    "rex",
    "cap",
    "rcap",
    "ch",
    "rch",
    "ic",
    "ric",
    "lh",
    "rlh",
    // viewport-percentage lengths https://drafts.csswg.org/css-values-4/#viewport-relative-lengths
    "vw",
    "svw",
    "lvw",
    "dvw",
    "vh",
    "svh",
    "lvh",
    "dvh",
    "vi",
    "svi",
    "lvi",
    "dvi",
    "vb",
    "svb",
    "lvb",
    "dvb",
    "vmin",
    "svmin",
    "lvmin",
    "dvmin",
    "vmax",
    "svmax",
    "lvmax",
    "dvmax",
    // container relative lengths https://drafts.csswg.org/css-contain-3/#container-lengths
    "cqw",
    "cqh",
    "cqi",
    "cqb",
    "cqmin",
    "cqmax"
  ], Zl = ["deg", "grad", "rad", "turn"], Jl = ["s", "ms"], ec = ["hz", "khz"], tc = ["dpi", "dpcm", "dppx", "x"], nc = ["fr"], rc = ["db"], ic = ["st"], si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    angle: Zl,
    decibel: rc,
    flex: nc,
    frequency: ec,
    length: Xl,
    resolution: tc,
    semitones: ic,
    time: Jl
  }, Symbol.toStringTag, { value: "Module" }));
  function oc(e, t, n) {
    return Object.assign(bn("SyntaxError", e), {
      input: t,
      offset: n,
      rawMessage: e,
      message: e + `
  ` + t + `
--` + new Array((n || t.length) + 1).join("-") + "^"
    });
  }
  const sc = 9, ac = 10, lc = 12, cc = 13, uc = 32;
  class hc {
    constructor(t) {
      this.str = t, this.pos = 0;
    }
    charCodeAt(t) {
      return t < this.str.length ? this.str.charCodeAt(t) : 0;
    }
    charCode() {
      return this.charCodeAt(this.pos);
    }
    nextCharCode() {
      return this.charCodeAt(this.pos + 1);
    }
    nextNonWsCode(t) {
      return this.charCodeAt(this.findWsEnd(t));
    }
    skipWs() {
      this.pos = this.findWsEnd(this.pos);
    }
    findWsEnd(t) {
      for (; t < this.str.length; t++) {
        const n = this.str.charCodeAt(t);
        if (n !== cc && n !== ac && n !== lc && n !== uc && n !== sc)
          break;
      }
      return t;
    }
    substringToPos(t) {
      return this.str.substring(this.pos, this.pos = t);
    }
    eat(t) {
      this.charCode() !== t && this.error("Expect `" + String.fromCharCode(t) + "`"), this.pos++;
    }
    peek() {
      return this.pos < this.str.length ? this.str.charAt(this.pos++) : "";
    }
    error(t) {
      throw new oc(t, this.str, this.pos);
    }
  }
  const pc = 9, fc = 10, dc = 12, mc = 13, gc = 32, No = 33, Ar = 35, ai = 38, sn = 39, Do = 40, bc = 41, jo = 42, Or = 43, Er = 44, li = 45, Lr = 60, Fo = 62, Zn = 63, yc = 64, wn = 91, $r = 93, an = 123, ci = 124, ui = 125, hi = 8734, Pt = new Uint8Array(128).map(
    (e, t) => /[a-zA-Z0-9\-]/.test(String.fromCharCode(t)) ? 1 : 0
  ), pi = {
    " ": 1,
    "&&": 2,
    "||": 3,
    "|": 4
  };
  function ln(e) {
    return e.substringToPos(
      e.findWsEnd(e.pos)
    );
  }
  function dt(e) {
    let t = e.pos;
    for (; t < e.str.length; t++) {
      const n = e.str.charCodeAt(t);
      if (n >= 128 || Pt[n] === 0)
        break;
    }
    return e.pos === t && e.error("Expect a keyword"), e.substringToPos(t);
  }
  function cn(e) {
    let t = e.pos;
    for (; t < e.str.length; t++) {
      const n = e.str.charCodeAt(t);
      if (n < 48 || n > 57)
        break;
    }
    return e.pos === t && e.error("Expect a number"), e.substringToPos(t);
  }
  function kc(e) {
    const t = e.str.indexOf("'", e.pos + 1);
    return t === -1 && (e.pos = e.str.length, e.error("Expect an apostrophe")), e.substringToPos(t + 1);
  }
  function fi(e) {
    let t = null, n = null;
    return e.eat(an), e.skipWs(), t = cn(e), e.skipWs(), e.charCode() === Er ? (e.pos++, e.skipWs(), e.charCode() !== ui && (n = cn(e), e.skipWs())) : n = t, e.eat(ui), {
      min: Number(t),
      max: n ? Number(n) : 0
    };
  }
  function xc(e) {
    let t = null, n = !1;
    switch (e.charCode()) {
      case jo:
        e.pos++, t = {
          min: 0,
          max: 0
        };
        break;
      case Or:
        e.pos++, t = {
          min: 1,
          max: 0
        };
        break;
      case Zn:
        e.pos++, t = {
          min: 0,
          max: 1
        };
        break;
      case Ar:
        e.pos++, n = !0, e.charCode() === an ? t = fi(e) : e.charCode() === Zn ? (e.pos++, t = {
          min: 0,
          max: 0
        }) : t = {
          min: 1,
          max: 0
        };
        break;
      case an:
        t = fi(e);
        break;
      default:
        return null;
    }
    return {
      type: "Multiplier",
      comma: n,
      min: t.min,
      max: t.max,
      term: null
    };
  }
  function mt(e, t) {
    const n = xc(e);
    return n !== null ? (n.term = t, e.charCode() === Ar && e.charCodeAt(e.pos - 1) === Or ? mt(e, n) : n) : t;
  }
  function Rn(e) {
    const t = e.peek();
    return t === "" ? null : {
      type: "Token",
      value: t
    };
  }
  function wc(e) {
    let t;
    return e.eat(Lr), e.eat(sn), t = dt(e), e.eat(sn), e.eat(Fo), mt(e, {
      type: "Property",
      name: t
    });
  }
  function vc(e) {
    let t = null, n = null, r = 1;
    return e.eat(wn), e.charCode() === li && (e.peek(), r = -1), r == -1 && e.charCode() === hi ? e.peek() : (t = r * Number(cn(e)), Pt[e.charCode()] !== 0 && (t += dt(e))), ln(e), e.eat(Er), ln(e), e.charCode() === hi ? e.peek() : (r = 1, e.charCode() === li && (e.peek(), r = -1), n = r * Number(cn(e)), Pt[e.charCode()] !== 0 && (n += dt(e))), e.eat($r), {
      type: "Range",
      min: t,
      max: n
    };
  }
  function Sc(e) {
    let t, n = null;
    return e.eat(Lr), t = dt(e), e.charCode() === Do && e.nextCharCode() === bc && (e.pos += 2, t += "()"), e.charCodeAt(e.findWsEnd(e.pos)) === wn && (ln(e), n = vc(e)), e.eat(Fo), mt(e, {
      type: "Type",
      name: t,
      opts: n
    });
  }
  function Cc(e) {
    const t = dt(e);
    return e.charCode() === Do ? (e.pos++, {
      type: "Function",
      name: t
    }) : mt(e, {
      type: "Keyword",
      name: t
    });
  }
  function Tc(e, t) {
    function n(i, o) {
      return {
        type: "Group",
        terms: i,
        combinator: o,
        disallowEmpty: !1,
        explicit: !1
      };
    }
    let r;
    for (t = Object.keys(t).sort((i, o) => pi[i] - pi[o]); t.length > 0; ) {
      r = t.shift();
      let i = 0, o = 0;
      for (; i < e.length; i++) {
        const s = e[i];
        s.type === "Combinator" && (s.value === r ? (o === -1 && (o = i - 1), e.splice(i, 1), i--) : (o !== -1 && i - o > 1 && (e.splice(
          o,
          i - o,
          n(e.slice(o, i), r)
        ), i = o + 1), o = -1));
      }
      o !== -1 && t.length && e.splice(
        o,
        i - o,
        n(e.slice(o, i), r)
      );
    }
    return r;
  }
  function Bo(e) {
    const t = [], n = {};
    let r, i = null, o = e.pos;
    for (; r = Oc(e); )
      r.type !== "Spaces" && (r.type === "Combinator" ? ((i === null || i.type === "Combinator") && (e.pos = o, e.error("Unexpected combinator")), n[r.value] = !0) : i !== null && i.type !== "Combinator" && (n[" "] = !0, t.push({
        type: "Combinator",
        value: " "
      })), t.push(r), i = r, o = e.pos);
    return i !== null && i.type === "Combinator" && (e.pos -= o, e.error("Unexpected combinator")), {
      type: "Group",
      terms: t,
      combinator: Tc(t, n) || " ",
      disallowEmpty: !1,
      explicit: !1
    };
  }
  function Ac(e) {
    let t;
    return e.eat(wn), t = Bo(e), e.eat($r), t.explicit = !0, e.charCode() === No && (e.pos++, t.disallowEmpty = !0), t;
  }
  function Oc(e) {
    let t = e.charCode();
    if (t < 128 && Pt[t] === 1)
      return Cc(e);
    switch (t) {
      case $r:
        break;
      case wn:
        return mt(e, Ac(e));
      case Lr:
        return e.nextCharCode() === sn ? wc(e) : Sc(e);
      case ci:
        return {
          type: "Combinator",
          value: e.substringToPos(
            e.pos + (e.nextCharCode() === ci ? 2 : 1)
          )
        };
      case ai:
        return e.pos++, e.eat(ai), {
          type: "Combinator",
          value: "&&"
        };
      case Er:
        return e.pos++, {
          type: "Comma"
        };
      case sn:
        return mt(e, {
          type: "String",
          value: kc(e)
        });
      case gc:
      case pc:
      case fc:
      case mc:
      case dc:
        return {
          type: "Spaces",
          value: ln(e)
        };
      case yc:
        return t = e.nextCharCode(), t < 128 && Pt[t] === 1 ? (e.pos++, {
          type: "AtKeyword",
          name: dt(e)
        }) : Rn(e);
      case jo:
      case Or:
      case Zn:
      case Ar:
      case No:
        break;
      case an:
        if (t = e.nextCharCode(), t < 48 || t > 57)
          return Rn(e);
        break;
      default:
        return Rn(e);
    }
  }
  function Wo(e) {
    const t = new hc(e), n = Bo(t);
    return t.pos !== e.length && t.error("Unexpected input"), n.terms.length === 1 && n.terms[0].type === "Group" ? n.terms[0] : n;
  }
  const St = function() {
  };
  function di(e) {
    return typeof e == "function" ? e : St;
  }
  function Ec(e, t, n) {
    function r(s) {
      switch (i.call(n, s), s.type) {
        case "Group":
          s.terms.forEach(r);
          break;
        case "Multiplier":
          r(s.term);
          break;
        case "Type":
        case "Property":
        case "Keyword":
        case "AtKeyword":
        case "Function":
        case "String":
        case "Token":
        case "Comma":
          break;
        default:
          throw new Error("Unknown type: " + s.type);
      }
      o.call(n, s);
    }
    let i = St, o = St;
    if (typeof t == "function" ? i = t : t && (i = di(t.enter), o = di(t.leave)), i === St && o === St)
      throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
    r(e);
  }
  const Lc = {
    decorator(e) {
      const t = [];
      let n = null;
      return Z(_({}, e), {
        node(r) {
          const i = n;
          n = r, e.node.call(this, r), n = i;
        },
        emit(r, i, o) {
          t.push({
            type: i,
            value: r,
            node: o ? null : n
          });
        },
        result() {
          return t;
        }
      });
    }
  };
  function $c(e) {
    const t = [];
    return gn(
      e,
      (n, r, i) => t.push({
        type: n,
        value: e.slice(r, i),
        node: null
      })
    ), t;
  }
  function _c(e, t) {
    return typeof e == "string" ? $c(e) : t.generate(e, Lc);
  }
  const N = { type: "Match" }, D = { type: "Mismatch" }, _r = { type: "DisallowEmpty" }, Pc = 40, zc = 41;
  function J(e, t, n) {
    return t === N && n === D || e === N && t === N && n === N ? e : (e.type === "If" && e.else === D && t === N && (t = e.then, e = e.match), {
      type: "If",
      match: e,
      then: t,
      else: n
    });
  }
  function Ho(e) {
    return e.length > 2 && e.charCodeAt(e.length - 2) === Pc && e.charCodeAt(e.length - 1) === zc;
  }
  function mi(e) {
    return e.type === "Keyword" || e.type === "AtKeyword" || e.type === "Function" || e.type === "Type" && Ho(e.name);
  }
  function Jn(e, t, n) {
    switch (e) {
      case " ": {
        let r = N;
        for (let i = t.length - 1; i >= 0; i--) {
          const o = t[i];
          r = J(
            o,
            r,
            D
          );
        }
        return r;
      }
      case "|": {
        let r = D, i = null;
        for (let o = t.length - 1; o >= 0; o--) {
          let s = t[o];
          if (mi(s) && (i === null && o > 0 && mi(t[o - 1]) && (i = /* @__PURE__ */ Object.create(null), r = J(
            {
              type: "Enum",
              map: i
            },
            N,
            r
          )), i !== null)) {
            const c = (Ho(s.name) ? s.name.slice(0, -1) : s.name).toLowerCase();
            if (!(c in i)) {
              i[c] = s;
              continue;
            }
          }
          i = null, r = J(
            s,
            N,
            r
          );
        }
        return r;
      }
      case "&&": {
        if (t.length > 5)
          return {
            type: "MatchOnce",
            terms: t,
            all: !0
          };
        let r = D;
        for (let i = t.length - 1; i >= 0; i--) {
          const o = t[i];
          let s;
          t.length > 1 ? s = Jn(
            e,
            t.filter(function(c) {
              return c !== o;
            }),
            !1
          ) : s = N, r = J(
            o,
            s,
            r
          );
        }
        return r;
      }
      case "||": {
        if (t.length > 5)
          return {
            type: "MatchOnce",
            terms: t,
            all: !1
          };
        let r = n ? N : D;
        for (let i = t.length - 1; i >= 0; i--) {
          const o = t[i];
          let s;
          t.length > 1 ? s = Jn(
            e,
            t.filter(function(c) {
              return c !== o;
            }),
            !0
          ) : s = N, r = J(
            o,
            s,
            r
          );
        }
        return r;
      }
    }
  }
  function Ic(e) {
    let t = N, n = Pr(e.term);
    if (e.max === 0)
      n = J(
        n,
        _r,
        D
      ), t = J(
        n,
        null,
        // will be a loop
        D
      ), t.then = J(
        N,
        N,
        t
        // make a loop
      ), e.comma && (t.then.else = J(
        { type: "Comma", syntax: e },
        t,
        D
      ));
    else
      for (let r = e.min || 1; r <= e.max; r++)
        e.comma && t !== N && (t = J(
          { type: "Comma", syntax: e },
          t,
          D
        )), t = J(
          n,
          J(
            N,
            N,
            t
          ),
          D
        );
    if (e.min === 0)
      t = J(
        N,
        N,
        t
      );
    else
      for (let r = 0; r < e.min - 1; r++)
        e.comma && t !== N && (t = J(
          { type: "Comma", syntax: e },
          t,
          D
        )), t = J(
          n,
          t,
          D
        );
    return t;
  }
  function Pr(e) {
    if (typeof e == "function")
      return {
        type: "Generic",
        fn: e
      };
    switch (e.type) {
      case "Group": {
        let t = Jn(
          e.combinator,
          e.terms.map(Pr),
          !1
        );
        return e.disallowEmpty && (t = J(
          t,
          _r,
          D
        )), t;
      }
      case "Multiplier":
        return Ic(e);
      case "Type":
      case "Property":
        return {
          type: e.type,
          name: e.name,
          syntax: e
        };
      case "Keyword":
        return {
          type: e.type,
          name: e.name.toLowerCase(),
          syntax: e
        };
      case "AtKeyword":
        return {
          type: e.type,
          name: "@" + e.name.toLowerCase(),
          syntax: e
        };
      case "Function":
        return {
          type: e.type,
          name: e.name.toLowerCase() + "(",
          syntax: e
        };
      case "String":
        return e.value.length === 3 ? {
          type: "Token",
          value: e.value.charAt(1),
          syntax: e
        } : {
          type: e.type,
          value: e.value.substr(1, e.value.length - 2).replace(/\\'/g, "'"),
          syntax: e
        };
      case "Token":
        return {
          type: e.type,
          value: e.value,
          syntax: e
        };
      case "Comma":
        return {
          type: e.type,
          syntax: e
        };
      default:
        throw new Error("Unknown node type:", e.type);
    }
  }
  function Vt(e, t) {
    return typeof e == "string" && (e = Wo(e)), {
      type: "MatchGraph",
      match: Pr(e),
      syntax: t || null,
      source: e
    };
  }
  const { hasOwnProperty: gi } = Object.prototype, Rc = 0, Mc = 1, er = 2, Uo = 3, bi = "Match", Nc = "Mismatch", Dc = "Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)", yi = 15e3;
  function jc(e) {
    let t = null, n = null, r = e;
    for (; r !== null; )
      n = r.prev, r.prev = t, t = r, r = n;
    return t;
  }
  function Mn(e, t) {
    if (e.length !== t.length)
      return !1;
    for (let n = 0; n < e.length; n++) {
      const r = t.charCodeAt(n);
      let i = e.charCodeAt(n);
      if (i >= 65 && i <= 90 && (i = i | 32), i !== r)
        return !1;
    }
    return !0;
  }
  function Fc(e) {
    return e.type !== I ? !1 : e.value !== "?";
  }
  function ki(e) {
    return e === null ? !0 : e.type === ce || e.type === $ || e.type === M || e.type === fe || e.type === V || Fc(e);
  }
  function xi(e) {
    return e === null ? !0 : e.type === E || e.type === Se || e.type === ue || e.type === I && e.value === "/";
  }
  function Bc(e, t, n) {
    function r() {
      do
        x++, b = x < e.length ? e[x] : null;
      while (b !== null && (b.type === W || b.type === X));
    }
    function i(A) {
      const P = x + A;
      return P < e.length ? e[P] : null;
    }
    function o(A, P) {
      return {
        nextState: A,
        matchStack: v,
        syntaxStack: h,
        thenStack: d,
        tokenIndex: x,
        prev: P
      };
    }
    function s(A) {
      d = {
        nextState: A,
        matchStack: v,
        syntaxStack: h,
        prev: d
      };
    }
    function c(A) {
      m = o(A, m);
    }
    function l() {
      v = {
        type: Mc,
        syntax: t.syntax,
        token: b,
        prev: v
      }, r(), w = null, x > T && (T = x);
    }
    function a() {
      h = {
        syntax: t.syntax,
        opts: t.syntax.opts || h !== null && h.opts || null,
        prev: h
      }, v = {
        type: er,
        syntax: t.syntax,
        token: v.token,
        prev: v
      };
    }
    function u() {
      v.type === er ? v = v.prev : v = {
        type: Uo,
        syntax: h.syntax,
        token: v.token,
        prev: v
      }, h = h.prev;
    }
    let h = null, d = null, m = null, w = null, k = 0, C = null, b = null, x = -1, T = 0, v = {
      type: Rc,
      syntax: null,
      token: null,
      prev: null
    };
    for (r(); C === null && ++k < yi; )
      switch (t.type) {
        case "Match":
          if (d === null) {
            if (b !== null && (x !== e.length - 1 || b.value !== "\\0" && b.value !== "\\9")) {
              t = D;
              break;
            }
            C = bi;
            break;
          }
          if (t = d.nextState, t === _r)
            if (d.matchStack === v) {
              t = D;
              break;
            } else
              t = N;
          for (; d.syntaxStack !== h; )
            u();
          d = d.prev;
          break;
        case "Mismatch":
          if (w !== null && w !== !1)
            (m === null || x > m.tokenIndex) && (m = w, w = !1);
          else if (m === null) {
            C = Nc;
            break;
          }
          t = m.nextState, d = m.thenStack, h = m.syntaxStack, v = m.matchStack, x = m.tokenIndex, b = x < e.length ? e[x] : null, m = m.prev;
          break;
        case "MatchGraph":
          t = t.match;
          break;
        case "If":
          t.else !== D && c(t.else), t.then !== N && s(t.then), t = t.match;
          break;
        case "MatchOnce":
          t = {
            type: "MatchOnceBuffer",
            syntax: t,
            index: 0,
            mask: 0
          };
          break;
        case "MatchOnceBuffer": {
          const O = t.syntax.terms;
          if (t.index === O.length) {
            if (t.mask === 0 || t.syntax.all) {
              t = D;
              break;
            }
            t = N;
            break;
          }
          if (t.mask === (1 << O.length) - 1) {
            t = N;
            break;
          }
          for (; t.index < O.length; t.index++) {
            const p = 1 << t.index;
            if (!(t.mask & p)) {
              c(t), s({
                type: "AddMatchOnce",
                syntax: t.syntax,
                mask: t.mask | p
              }), t = O[t.index++];
              break;
            }
          }
          break;
        }
        case "AddMatchOnce":
          t = {
            type: "MatchOnceBuffer",
            syntax: t.syntax,
            index: 0,
            mask: t.mask
          };
          break;
        case "Enum":
          if (b !== null) {
            let O = b.value.toLowerCase();
            if (O.indexOf("\\") !== -1 && (O = O.replace(/\\[09].*$/, "")), gi.call(t.map, O)) {
              t = t.map[O];
              break;
            }
          }
          t = D;
          break;
        case "Generic": {
          const O = h !== null ? h.opts : null, p = x + Math.floor(t.fn(b, i, O));
          if (!isNaN(p) && p > x) {
            for (; x < p; )
              l();
            t = N;
          } else
            t = D;
          break;
        }
        case "Type":
        case "Property": {
          const O = t.type === "Type" ? "types" : "properties", p = gi.call(n, O) ? n[O][t.name] : null;
          if (!p || !p.match)
            throw new Error(
              "Bad syntax reference: " + (t.type === "Type" ? "<" + t.name + ">" : "<'" + t.name + "'>")
            );
          if (w !== !1 && b !== null && t.type === "Type" && // https://drafts.csswg.org/css-values-4/#custom-idents
          // When parsing positionally-ambiguous keywords in a property value, a <custom-ident> production
          // can only claim the keyword if no other unfulfilled production can claim it.
          (t.name === "custom-ident" && b.type === y || // https://drafts.csswg.org/css-values-4/#lengths
          // ... if a `0` could be parsed as either a <number> or a <length> in a property (such as line-height),
          // it must parse as a <number>
          t.name === "length" && b.value === "0")) {
            w === null && (w = o(t, m)), t = D;
            break;
          }
          a(), t = p.matchRef || p.match;
          break;
        }
        case "Keyword": {
          const O = t.name;
          if (b !== null) {
            let p = b.value;
            if (p.indexOf("\\") !== -1 && (p = p.replace(/\\[09].*$/, "")), Mn(p, O)) {
              l(), t = N;
              break;
            }
          }
          t = D;
          break;
        }
        case "AtKeyword":
        case "Function":
          if (b !== null && Mn(b.value, t.name)) {
            l(), t = N;
            break;
          }
          t = D;
          break;
        case "Token":
          if (b !== null && b.value === t.value) {
            l(), t = N;
            break;
          }
          t = D;
          break;
        case "Comma":
          b !== null && b.type === ce ? ki(v.token) ? t = D : (l(), t = xi(b) ? D : N) : t = ki(v.token) || xi(b) ? N : D;
          break;
        case "String":
          let A = "", P = x;
          for (; P < e.length && A.length < t.value.length; P++)
            A += e[P].value;
          if (Mn(A, t.value)) {
            for (; x < P; )
              l();
            t = N;
          } else
            t = D;
          break;
        default:
          throw new Error("Unknown node type: " + t.type);
      }
    switch (C) {
      case null:
        console.warn("[csstree-match] BREAK after " + yi + " iterations"), C = Dc, v = null;
        break;
      case bi:
        for (; h !== null; )
          u();
        break;
      default:
        v = null;
    }
    return {
      tokens: e,
      reason: C,
      iterations: k,
      match: v,
      longestMatch: T
    };
  }
  function wi(e, t, n) {
    const r = Bc(e, t, n || {});
    if (r.match === null)
      return r;
    let i = r.match, o = r.match = {
      syntax: t.syntax || null,
      match: []
    };
    const s = [o];
    for (i = jc(i).prev; i !== null; ) {
      switch (i.type) {
        case er:
          o.match.push(o = {
            syntax: i.syntax,
            match: []
          }), s.push(o);
          break;
        case Uo:
          s.pop(), o = s[s.length - 1];
          break;
        default:
          o.match.push({
            syntax: i.syntax || null,
            token: i.token.value,
            node: i.token.node
          });
      }
      i = i.prev;
    }
    return r;
  }
  function qo(e) {
    function t(i) {
      return i === null ? !1 : i.type === "Type" || i.type === "Property" || i.type === "Keyword";
    }
    function n(i) {
      if (Array.isArray(i.match)) {
        for (let o = 0; o < i.match.length; o++)
          if (n(i.match[o]))
            return t(i.syntax) && r.unshift(i.syntax), !0;
      } else if (i.node === e)
        return r = t(i.syntax) ? [i.syntax] : [], !0;
      return !1;
    }
    let r = null;
    return this.matched !== null && n(this.matched), r;
  }
  function Wc(e, t) {
    return zr(this, e, (n) => n.type === "Type" && n.name === t);
  }
  function Hc(e, t) {
    return zr(this, e, (n) => n.type === "Property" && n.name === t);
  }
  function Uc(e) {
    return zr(this, e, (t) => t.type === "Keyword");
  }
  function zr(e, t, n) {
    const r = qo.call(e, t);
    return r === null ? !1 : r.some(n);
  }
  const qc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    getTrace: qo,
    isKeyword: Uc,
    isProperty: Hc,
    isType: Wc
  }, Symbol.toStringTag, { value: "Module" }));
  function Go(e) {
    return "node" in e ? e.node : Go(e.match[0]);
  }
  function Vo(e) {
    return "node" in e ? e.node : Vo(e.match[e.match.length - 1]);
  }
  function vi(e, t, n, r, i) {
    function o(c) {
      if (c.syntax !== null && c.syntax.type === r && c.syntax.name === i) {
        const l = Go(c), a = Vo(c);
        e.syntax.walk(t, function(u, h, d) {
          if (u === l) {
            const m = new q();
            do {
              if (m.appendData(h.data), h.data === a)
                break;
              h = h.next;
            } while (h !== null);
            s.push({
              parent: d,
              nodes: m
            });
          }
        });
      }
      Array.isArray(c.match) && c.match.forEach(o);
    }
    const s = [];
    return n.matched !== null && o(n.matched), s;
  }
  const { hasOwnProperty: At } = Object.prototype;
  function Nn(e) {
    return typeof e == "number" && isFinite(e) && Math.floor(e) === e && e >= 0;
  }
  function Si(e) {
    return !!e && Nn(e.offset) && Nn(e.line) && Nn(e.column);
  }
  function Gc(e, t) {
    return function(r, i) {
      if (!r || r.constructor !== Object)
        return i(r, "Type of node should be an Object");
      for (let o in r) {
        let s = !0;
        if (At.call(r, o) !== !1) {
          if (o === "type")
            r.type !== e && i(r, "Wrong node type `" + r.type + "`, expected `" + e + "`");
          else if (o === "loc") {
            if (r.loc === null)
              continue;
            if (r.loc && r.loc.constructor === Object)
              if (typeof r.loc.source != "string")
                o += ".source";
              else if (!Si(r.loc.start))
                o += ".start";
              else if (!Si(r.loc.end))
                o += ".end";
              else
                continue;
            s = !1;
          } else if (t.hasOwnProperty(o)) {
            s = !1;
            for (let c = 0; !s && c < t[o].length; c++) {
              const l = t[o][c];
              switch (l) {
                case String:
                  s = typeof r[o] == "string";
                  break;
                case Boolean:
                  s = typeof r[o] == "boolean";
                  break;
                case null:
                  s = r[o] === null;
                  break;
                default:
                  typeof l == "string" ? s = r[o] && r[o].type === l : Array.isArray(l) && (s = r[o] instanceof q);
              }
            }
          } else
            i(r, "Unknown field `" + o + "` for " + e + " node type");
          s || i(r, "Bad value for `" + e + "." + o + "`");
        }
      }
      for (const o in t)
        At.call(t, o) && At.call(r, o) === !1 && i(r, "Field `" + e + "." + o + "` is missed");
    };
  }
  function Ko(e, t) {
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const i = e[r];
      if (i === String || i === Boolean)
        n.push(i.name.toLowerCase());
      else if (i === null)
        n.push("null");
      else if (typeof i == "string")
        n.push(i);
      else if (Array.isArray(i))
        n.push("List<" + (Ko(i, t) || "any") + ">");
      else
        throw new Error("Wrong value `" + i + "` in `" + t + "` structure definition");
    }
    return n.join(" | ");
  }
  function Vc(e, t) {
    const n = t.structure, r = {
      type: String,
      loc: !0
    }, i = {
      type: '"' + e + '"'
    };
    for (const o in n) {
      if (At.call(n, o) === !1)
        continue;
      const s = r[o] = Array.isArray(n[o]) ? n[o].slice() : [n[o]];
      i[o] = Ko(s, e + "." + o);
    }
    return {
      docs: i,
      check: Gc(e, r)
    };
  }
  function Kc(e) {
    const t = {};
    if (e.node) {
      for (const n in e.node)
        if (At.call(e.node, n)) {
          const r = e.node[n];
          if (r.structure)
            t[n] = Vc(n, r);
          else
            throw new Error("Missed `structure` field in `" + n + "` node type definition");
        }
    }
    return t;
  }
  const Yc = Vt(Lo.join(" | "));
  function tr(e, t, n) {
    const r = {};
    for (const i in e)
      e[i].syntax && (r[i] = n ? e[i].syntax : Sr(e[i].syntax, { compact: t }));
    return r;
  }
  function Qc(e, t, n) {
    const r = {};
    for (const [i, o] of Object.entries(e))
      r[i] = {
        prelude: o.prelude && (n ? o.prelude.syntax : Sr(o.prelude.syntax, { compact: t })),
        descriptors: o.descriptors && tr(o.descriptors, t, n)
      };
    return r;
  }
  function Xc(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].value.toLowerCase() === "var(")
        return !0;
    return !1;
  }
  function Zc(e) {
    const t = e.terms[0];
    return e.explicit === !1 && e.terms.length === 1 && t.type === "Multiplier" && t.comma === !0;
  }
  function ye(e, t, n) {
    return _({
      matched: e,
      iterations: n,
      error: t
    }, qc);
  }
  function ot(e, t, n, r) {
    const i = _c(n, e.syntax);
    let o;
    return Xc(i) ? ye(null, new Error("Matching for a tree with var() is not supported")) : (r && (o = wi(i, e.cssWideKeywordsSyntax, e)), (!r || !o.match) && (o = wi(i, t.match, e), !o.match) ? ye(
      null,
      new Ol(o.reason, t.syntax, n, o),
      o.iterations
    ) : ye(o.match, null, o.iterations));
  }
  class Ci {
    constructor(t, n, r) {
      if (this.cssWideKeywordsSyntax = Yc, this.syntax = n, this.generic = !1, this.units = _({}, si), this.atrules = /* @__PURE__ */ Object.create(null), this.properties = /* @__PURE__ */ Object.create(null), this.types = /* @__PURE__ */ Object.create(null), this.structure = r || Kc(t), t) {
        if (t.units)
          for (const i of Object.keys(si))
            Array.isArray(t.units[i]) && (this.units[i] = t.units[i]);
        if (t.types)
          for (const [i, o] of Object.entries(t.types))
            this.addType_(i, o);
        if (t.generic) {
          this.generic = !0;
          for (const [i, o] of Object.entries(Ql(this.units)))
            this.addType_(i, o);
        }
        if (t.atrules)
          for (const [i, o] of Object.entries(t.atrules))
            this.addAtrule_(i, o);
        if (t.properties)
          for (const [i, o] of Object.entries(t.properties))
            this.addProperty_(i, o);
      }
    }
    checkStructure(t) {
      function n(o, s) {
        i.push({ node: o, message: s });
      }
      const r = this.structure, i = [];
      return this.syntax.walk(t, function(o) {
        r.hasOwnProperty(o.type) ? r[o.type].check(o, n) : n(o, "Unknown node type `" + o.type + "`");
      }), i.length ? i : !1;
    }
    createDescriptor(t, n, r, i = null) {
      const o = {
        type: n,
        name: r
      }, s = {
        type: n,
        name: r,
        parent: i,
        serializable: typeof t == "string" || t && typeof t.type == "string",
        syntax: null,
        match: null,
        matchRef: null
        // used for properties when a syntax referenced as <'property'> in other syntax definitions
      };
      return typeof t == "function" ? s.match = Vt(t, o) : (typeof t == "string" ? Object.defineProperty(s, "syntax", {
        get() {
          return Object.defineProperty(s, "syntax", {
            value: Wo(t)
          }), s.syntax;
        }
      }) : s.syntax = t, Object.defineProperty(s, "match", {
        get() {
          return Object.defineProperty(s, "match", {
            value: Vt(s.syntax, o)
          }), s.match;
        }
      }), n === "Property" && Object.defineProperty(s, "matchRef", {
        get() {
          const c = s.syntax, l = Zc(c) ? Vt(Z(_({}, c), {
            terms: [c.terms[0].term]
          }), o) : null;
          return Object.defineProperty(s, "matchRef", {
            value: l
          }), l;
        }
      })), s;
    }
    addAtrule_(t, n) {
      n && (this.atrules[t] = {
        type: "Atrule",
        name: t,
        prelude: n.prelude ? this.createDescriptor(n.prelude, "AtrulePrelude", t) : null,
        descriptors: n.descriptors ? Object.keys(n.descriptors).reduce(
          (r, i) => (r[i] = this.createDescriptor(n.descriptors[i], "AtruleDescriptor", i, t), r),
          /* @__PURE__ */ Object.create(null)
        ) : null
      });
    }
    addProperty_(t, n) {
      n && (this.properties[t] = this.createDescriptor(n, "Property", t));
    }
    addType_(t, n) {
      n && (this.types[t] = this.createDescriptor(n, "Type", t));
    }
    checkAtruleName(t) {
      if (!this.getAtrule(t))
        return new kt("Unknown at-rule", "@" + t);
    }
    checkAtrulePrelude(t, n) {
      const r = this.checkAtruleName(t);
      if (r)
        return r;
      const i = this.getAtrule(t);
      if (!i.prelude && n)
        return new SyntaxError("At-rule `@" + t + "` should not contain a prelude");
      if (i.prelude && !n && !ot(this, i.prelude, "", !1).matched)
        return new SyntaxError("At-rule `@" + t + "` should contain a prelude");
    }
    checkAtruleDescriptorName(t, n) {
      const r = this.checkAtruleName(t);
      if (r)
        return r;
      const i = this.getAtrule(t), o = Pn(n);
      if (!i.descriptors)
        return new SyntaxError("At-rule `@" + t + "` has no known descriptors");
      if (!i.descriptors[o.name] && !i.descriptors[o.basename])
        return new kt("Unknown at-rule descriptor", n);
    }
    checkPropertyName(t) {
      if (!this.getProperty(t))
        return new kt("Unknown property", t);
    }
    matchAtrulePrelude(t, n) {
      const r = this.checkAtrulePrelude(t, n);
      if (r)
        return ye(null, r);
      const i = this.getAtrule(t);
      return i.prelude ? ot(this, i.prelude, n || "", !1) : ye(null, null);
    }
    matchAtruleDescriptor(t, n, r) {
      const i = this.checkAtruleDescriptorName(t, n);
      if (i)
        return ye(null, i);
      const o = this.getAtrule(t), s = Pn(n);
      return ot(this, o.descriptors[s.name] || o.descriptors[s.basename], r, !1);
    }
    matchDeclaration(t) {
      return t.type !== "Declaration" ? ye(null, new Error("Not a Declaration node")) : this.matchProperty(t.property, t.value);
    }
    matchProperty(t, n) {
      if (oi(t).custom)
        return ye(null, new Error("Lexer matching doesn't applicable for custom properties"));
      const r = this.checkPropertyName(t);
      return r ? ye(null, r) : ot(this, this.getProperty(t), n, !0);
    }
    matchType(t, n) {
      const r = this.getType(t);
      return r ? ot(this, r, n, !1) : ye(null, new kt("Unknown type", t));
    }
    match(t, n) {
      return typeof t != "string" && (!t || !t.type) ? ye(null, new kt("Bad syntax")) : ((typeof t == "string" || !t.match) && (t = this.createDescriptor(t, "Type", "anonymous")), ot(this, t, n, !1));
    }
    findValueFragments(t, n, r, i) {
      return vi(this, n, this.matchProperty(t, n), r, i);
    }
    findDeclarationValueFragments(t, n, r) {
      return vi(this, t.value, this.matchDeclaration(t), n, r);
    }
    findAllFragments(t, n, r) {
      const i = [];
      return this.syntax.walk(t, {
        visit: "Declaration",
        enter: (o) => {
          i.push.apply(i, this.findDeclarationValueFragments(o, n, r));
        }
      }), i;
    }
    getAtrule(t, n = !0) {
      const r = Pn(t);
      return (r.vendor && n ? this.atrules[r.name] || this.atrules[r.basename] : this.atrules[r.name]) || null;
    }
    getAtrulePrelude(t, n = !0) {
      const r = this.getAtrule(t, n);
      return r && r.prelude || null;
    }
    getAtruleDescriptor(t, n) {
      return this.atrules.hasOwnProperty(t) && this.atrules.declarators && this.atrules[t].declarators[n] || null;
    }
    getProperty(t, n = !0) {
      const r = oi(t);
      return (r.vendor && n ? this.properties[r.name] || this.properties[r.basename] : this.properties[r.name]) || null;
    }
    getType(t) {
      return hasOwnProperty.call(this.types, t) ? this.types[t] : null;
    }
    validate() {
      function t(i, o, s, c) {
        if (s.has(o))
          return s.get(o);
        s.set(o, !1), c.syntax !== null && Ec(c.syntax, function(l) {
          if (l.type !== "Type" && l.type !== "Property")
            return;
          const a = l.type === "Type" ? i.types : i.properties, u = l.type === "Type" ? n : r;
          (!hasOwnProperty.call(a, l.name) || t(i, l.name, u, a[l.name])) && s.set(o, !0);
        }, this);
      }
      let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
      for (const i in this.types)
        t(this, i, n, this.types[i]);
      for (const i in this.properties)
        t(this, i, r, this.properties[i]);
      return n = [...n.keys()].filter((i) => n.get(i)), r = [...r.keys()].filter((i) => r.get(i)), n.length || r.length ? {
        types: n,
        properties: r
      } : null;
    }
    dump(t, n) {
      return {
        generic: this.generic,
        units: this.units,
        types: tr(this.types, !n, t),
        properties: tr(this.properties, !n, t),
        atrules: Qc(this.atrules, !n, t)
      };
    }
    toString() {
      return JSON.stringify(this.dump());
    }
  }
  function Dn(e, t) {
    return typeof t == "string" && /^\s*\|/.test(t) ? typeof e == "string" ? e + t : t.replace(/^\s*\|\s*/, "") : t || null;
  }
  function Ti(e, t) {
    const n = /* @__PURE__ */ Object.create(null);
    for (const [r, i] of Object.entries(e))
      if (i) {
        n[r] = {};
        for (const o of Object.keys(i))
          t.includes(o) && (n[r][o] = i[o]);
      }
    return n;
  }
  function nr(e, t) {
    const n = _({}, e);
    for (const [r, i] of Object.entries(t))
      switch (r) {
        case "generic":
          n[r] = !!i;
          break;
        case "units":
          n[r] = _({}, e[r]);
          for (const [o, s] of Object.entries(i))
            n[r][o] = Array.isArray(s) ? s : [];
          break;
        case "atrules":
          n[r] = _({}, e[r]);
          for (const [o, s] of Object.entries(i)) {
            const c = n[r][o] || {}, l = n[r][o] = {
              prelude: c.prelude || null,
              descriptors: _({}, c.descriptors)
            };
            if (s) {
              l.prelude = s.prelude ? Dn(l.prelude, s.prelude) : l.prelude || null;
              for (const [a, u] of Object.entries(s.descriptors || {}))
                l.descriptors[a] = u ? Dn(l.descriptors[a], u) : null;
              Object.keys(l.descriptors).length || (l.descriptors = null);
            }
          }
          break;
        case "types":
        case "properties":
          n[r] = _({}, e[r]);
          for (const [o, s] of Object.entries(i))
            n[r][o] = Dn(n[r][o], s);
          break;
        case "scope":
        case "features":
          n[r] = _({}, e[r]);
          for (const [o, s] of Object.entries(i))
            n[r][o] = _(_({}, n[r][o]), s);
          break;
        case "parseContext":
          n[r] = _(_({}, e[r]), i);
          break;
        case "atrule":
        case "pseudo":
          n[r] = _(_({}, e[r]), Ti(i, ["parse"]));
          break;
        case "node":
          n[r] = _(_({}, e[r]), Ti(i, ["name", "structure", "parse", "generate", "walkContext"]));
          break;
      }
    return n;
  }
  function Yo(e) {
    const t = rl(e), n = wl(e), r = bl(e), { fromPlainObject: i, toPlainObject: o } = yl(n), s = {
      lexer: null,
      createLexer: (c) => new Ci(c, s, s.lexer.structure),
      tokenize: gn,
      parse: t,
      generate: r,
      walk: n,
      find: n.find,
      findLast: n.findLast,
      findAll: n.findAll,
      fromPlainObject: i,
      toPlainObject: o,
      fork(c) {
        const l = nr({}, e);
        return Yo(
          typeof c == "function" ? c(l, Object.assign) : nr(l, c)
        );
      }
    };
    return s.lexer = new Ci({
      generic: e.generic,
      units: e.units,
      types: e.types,
      atrules: e.atrules,
      properties: e.properties,
      node: e.node
    }, s), s;
  }
  const Jc = (e) => Yo(nr({}, e)), eu = {
    generic: !0,
    units: {
      angle: [
        "deg",
        "grad",
        "rad",
        "turn"
      ],
      decibel: [
        "db"
      ],
      flex: [
        "fr"
      ],
      frequency: [
        "hz",
        "khz"
      ],
      length: [
        "cm",
        "mm",
        "q",
        "in",
        "pt",
        "pc",
        "px",
        "em",
        "rem",
        "ex",
        "rex",
        "cap",
        "rcap",
        "ch",
        "rch",
        "ic",
        "ric",
        "lh",
        "rlh",
        "vw",
        "svw",
        "lvw",
        "dvw",
        "vh",
        "svh",
        "lvh",
        "dvh",
        "vi",
        "svi",
        "lvi",
        "dvi",
        "vb",
        "svb",
        "lvb",
        "dvb",
        "vmin",
        "svmin",
        "lvmin",
        "dvmin",
        "vmax",
        "svmax",
        "lvmax",
        "dvmax",
        "cqw",
        "cqh",
        "cqi",
        "cqb",
        "cqmin",
        "cqmax"
      ],
      resolution: [
        "dpi",
        "dpcm",
        "dppx",
        "x"
      ],
      semitones: [
        "st"
      ],
      time: [
        "s",
        "ms"
      ]
    },
    types: {
      "abs()": "abs( <calc-sum> )",
      "absolute-size": "xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large",
      "acos()": "acos( <calc-sum> )",
      "alpha-value": "<number>|<percentage>",
      "angle-percentage": "<angle>|<percentage>",
      "angular-color-hint": "<angle-percentage>",
      "angular-color-stop": "<color>&&<color-stop-angle>?",
      "angular-color-stop-list": "[<angular-color-stop> [, <angular-color-hint>]?]# , <angular-color-stop>",
      "animateable-feature": "scroll-position|contents|<custom-ident>",
      "asin()": "asin( <calc-sum> )",
      "atan()": "atan( <calc-sum> )",
      "atan2()": "atan2( <calc-sum> , <calc-sum> )",
      attachment: "scroll|fixed|local",
      "attr()": "attr( <attr-name> <type-or-unit>? [, <attr-fallback>]? )",
      "attr-matcher": "['~'|'|'|'^'|'$'|'*']? '='",
      "attr-modifier": "i|s",
      "attribute-selector": "'[' <wq-name> ']'|'[' <wq-name> <attr-matcher> [<string-token>|<ident-token>] <attr-modifier>? ']'",
      "auto-repeat": "repeat( [auto-fill|auto-fit] , [<line-names>? <fixed-size>]+ <line-names>? )",
      "auto-track-list": "[<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>? <auto-repeat> [<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>?",
      axis: "block|inline|vertical|horizontal",
      "baseline-position": "[first|last]? baseline",
      "basic-shape": "<inset()>|<circle()>|<ellipse()>|<polygon()>|<path()>",
      "bg-image": "none|<image>",
      "bg-layer": "<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>",
      "bg-position": "[[left|center|right|top|bottom|<length-percentage>]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]|[center|[left|right] <length-percentage>?]&&[center|[top|bottom] <length-percentage>?]]",
      "bg-size": "[<length-percentage>|auto]{1,2}|cover|contain",
      "blur()": "blur( <length> )",
      "blend-mode": "normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity",
      box: "border-box|padding-box|content-box",
      "brightness()": "brightness( <number-percentage> )",
      "calc()": "calc( <calc-sum> )",
      "calc-sum": "<calc-product> [['+'|'-'] <calc-product>]*",
      "calc-product": "<calc-value> ['*' <calc-value>|'/' <number>]*",
      "calc-value": "<number>|<dimension>|<percentage>|<calc-constant>|( <calc-sum> )",
      "calc-constant": "e|pi|infinity|-infinity|NaN",
      "cf-final-image": "<image>|<color>",
      "cf-mixing-image": "<percentage>?&&<image>",
      "circle()": "circle( [<shape-radius>]? [at <position>]? )",
      "clamp()": "clamp( <calc-sum>#{3} )",
      "class-selector": "'.' <ident-token>",
      "clip-source": "<url>",
      color: "<color-base>|currentColor|<system-color>|<device-cmyk()>|<light-dark()>|<-non-standard-color>",
      "color-stop": "<color-stop-length>|<color-stop-angle>",
      "color-stop-angle": "<angle-percentage>{1,2}",
      "color-stop-length": "<length-percentage>{1,2}",
      "color-stop-list": "[<linear-color-stop> [, <linear-color-hint>]?]# , <linear-color-stop>",
      combinator: "'>'|'+'|'~'|['|' '|']",
      "common-lig-values": "[common-ligatures|no-common-ligatures]",
      "compat-auto": "searchfield|textarea|push-button|slider-horizontal|checkbox|radio|square-button|menulist|listbox|meter|progress-bar|button",
      "composite-style": "clear|copy|source-over|source-in|source-out|source-atop|destination-over|destination-in|destination-out|destination-atop|xor",
      "compositing-operator": "add|subtract|intersect|exclude",
      "compound-selector": "[<type-selector>? <subclass-selector>*]!",
      "compound-selector-list": "<compound-selector>#",
      "complex-selector": "<complex-selector-unit> [<combinator>? <complex-selector-unit>]*",
      "complex-selector-list": "<complex-selector>#",
      "conic-gradient()": "conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )",
      "contextual-alt-values": "[contextual|no-contextual]",
      "content-distribution": "space-between|space-around|space-evenly|stretch",
      "content-list": "[<string>|contents|<image>|<counter>|<quote>|<target>|<leader()>|<attr()>]+",
      "content-position": "center|start|end|flex-start|flex-end",
      "content-replacement": "<image>",
      "contrast()": "contrast( [<number-percentage>] )",
      "cos()": "cos( <calc-sum> )",
      counter: "<counter()>|<counters()>",
      "counter()": "counter( <counter-name> , <counter-style>? )",
      "counter-name": "<custom-ident>",
      "counter-style": "<counter-style-name>|symbols( )",
      "counter-style-name": "<custom-ident>",
      "counters()": "counters( <counter-name> , <string> , <counter-style>? )",
      "cross-fade()": "cross-fade( <cf-mixing-image> , <cf-final-image>? )",
      "cubic-bezier-timing-function": "ease|ease-in|ease-out|ease-in-out|cubic-bezier( <number [0,1]> , <number> , <number [0,1]> , <number> )",
      "deprecated-system-color": "ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonFace|ButtonHighlight|ButtonShadow|ButtonText|CaptionText|GrayText|Highlight|HighlightText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText",
      "discretionary-lig-values": "[discretionary-ligatures|no-discretionary-ligatures]",
      "display-box": "contents|none",
      "display-inside": "flow|flow-root|table|flex|grid|ruby",
      "display-internal": "table-row-group|table-header-group|table-footer-group|table-row|table-cell|table-column-group|table-column|table-caption|ruby-base|ruby-text|ruby-base-container|ruby-text-container",
      "display-legacy": "inline-block|inline-list-item|inline-table|inline-flex|inline-grid",
      "display-listitem": "<display-outside>?&&[flow|flow-root]?&&list-item",
      "display-outside": "block|inline|run-in",
      "drop-shadow()": "drop-shadow( <length>{2,3} <color>? )",
      "east-asian-variant-values": "[jis78|jis83|jis90|jis04|simplified|traditional]",
      "east-asian-width-values": "[full-width|proportional-width]",
      "element()": "element( <custom-ident> , [first|start|last|first-except]? )|element( <id-selector> )",
      "ellipse()": "ellipse( [<shape-radius>{2}]? [at <position>]? )",
      "ending-shape": "circle|ellipse",
      "env()": "env( <custom-ident> , <declaration-value>? )",
      "exp()": "exp( <calc-sum> )",
      "explicit-track-list": "[<line-names>? <track-size>]+ <line-names>?",
      "family-name": "<string>|<custom-ident>+",
      "feature-tag-value": "<string> [<integer>|on|off]?",
      "feature-type": "@stylistic|@historical-forms|@styleset|@character-variant|@swash|@ornaments|@annotation",
      "feature-value-block": "<feature-type> '{' <feature-value-declaration-list> '}'",
      "feature-value-block-list": "<feature-value-block>+",
      "feature-value-declaration": "<custom-ident> : <integer>+ ;",
      "feature-value-declaration-list": "<feature-value-declaration>",
      "feature-value-name": "<custom-ident>",
      "fill-rule": "nonzero|evenodd",
      "filter-function": "<blur()>|<brightness()>|<contrast()>|<drop-shadow()>|<grayscale()>|<hue-rotate()>|<invert()>|<opacity()>|<saturate()>|<sepia()>",
      "filter-function-list": "[<filter-function>|<url>]+",
      "final-bg-layer": "<'background-color'>||<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>",
      "fixed-breadth": "<length-percentage>",
      "fixed-repeat": "repeat( [<integer [1,∞]>] , [<line-names>? <fixed-size>]+ <line-names>? )",
      "fixed-size": "<fixed-breadth>|minmax( <fixed-breadth> , <track-breadth> )|minmax( <inflexible-breadth> , <fixed-breadth> )",
      "font-stretch-absolute": "normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded|<percentage>",
      "font-variant-css21": "[normal|small-caps]",
      "font-weight-absolute": "normal|bold|<number [1,1000]>",
      "frequency-percentage": "<frequency>|<percentage>",
      "general-enclosed": "[<function-token> <any-value>? )]|[( <any-value>? )]",
      "generic-family": "<generic-script-specific>|<generic-complete>|<generic-incomplete>|<-non-standard-generic-family>",
      "generic-name": "serif|sans-serif|cursive|fantasy|monospace",
      "geometry-box": "<shape-box>|fill-box|stroke-box|view-box",
      gradient: "<linear-gradient()>|<repeating-linear-gradient()>|<radial-gradient()>|<repeating-radial-gradient()>|<conic-gradient()>|<repeating-conic-gradient()>|<-legacy-gradient>",
      "grayscale()": "grayscale( <number-percentage> )",
      "grid-line": "auto|<custom-ident>|[<integer>&&<custom-ident>?]|[span&&[<integer>||<custom-ident>]]",
      "historical-lig-values": "[historical-ligatures|no-historical-ligatures]",
      "hsl()": "hsl( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsl( <hue> , <percentage> , <percentage> , <alpha-value>? )",
      "hsla()": "hsla( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsla( <hue> , <percentage> , <percentage> , <alpha-value>? )",
      hue: "<number>|<angle>",
      "hue-rotate()": "hue-rotate( <angle> )",
      "hwb()": "hwb( [<hue>|none] [<percentage>|none] [<percentage>|none] [/ [<alpha-value>|none]]? )",
      "hypot()": "hypot( <calc-sum># )",
      image: "<url>|<image()>|<image-set()>|<element()>|<paint()>|<cross-fade()>|<gradient>",
      "image()": "image( <image-tags>? [<image-src>? , <color>?]! )",
      "image-set()": "image-set( <image-set-option># )",
      "image-set-option": "[<image>|<string>] [<resolution>||type( <string> )]",
      "image-src": "<url>|<string>",
      "image-tags": "ltr|rtl",
      "inflexible-breadth": "<length-percentage>|min-content|max-content|auto",
      "inset()": "inset( <length-percentage>{1,4} [round <'border-radius'>]? )",
      "invert()": "invert( <number-percentage> )",
      "keyframes-name": "<custom-ident>|<string>",
      "keyframe-block": "<keyframe-selector># { <declaration-list> }",
      "keyframe-block-list": "<keyframe-block>+",
      "keyframe-selector": "from|to|<percentage>|<timeline-range-name> <percentage>",
      "lab()": "lab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
      "layer()": "layer( <layer-name> )",
      "layer-name": "<ident> ['.' <ident>]*",
      "lch()": "lch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )",
      "leader()": "leader( <leader-type> )",
      "leader-type": "dotted|solid|space|<string>",
      "length-percentage": "<length>|<percentage>",
      "light-dark()": "light-dark( <color> , <color> )",
      "line-names": "'[' <custom-ident>* ']'",
      "line-name-list": "[<line-names>|<name-repeat>]+",
      "line-style": "none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset",
      "line-width": "<length>|thin|medium|thick",
      "linear-color-hint": "<length-percentage>",
      "linear-color-stop": "<color> <color-stop-length>?",
      "linear-gradient()": "linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )",
      "log()": "log( <calc-sum> , <calc-sum>? )",
      "mask-layer": "<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||<geometry-box>||[<geometry-box>|no-clip]||<compositing-operator>||<masking-mode>",
      "mask-position": "[<length-percentage>|left|center|right] [<length-percentage>|top|center|bottom]?",
      "mask-reference": "none|<image>|<mask-source>",
      "mask-source": "<url>",
      "masking-mode": "alpha|luminance|match-source",
      "matrix()": "matrix( <number>#{6} )",
      "matrix3d()": "matrix3d( <number>#{16} )",
      "max()": "max( <calc-sum># )",
      "media-and": "<media-in-parens> [and <media-in-parens>]+",
      "media-condition": "<media-not>|<media-and>|<media-or>|<media-in-parens>",
      "media-condition-without-or": "<media-not>|<media-and>|<media-in-parens>",
      "media-feature": "( [<mf-plain>|<mf-boolean>|<mf-range>] )",
      "media-in-parens": "( <media-condition> )|<media-feature>|<general-enclosed>",
      "media-not": "not <media-in-parens>",
      "media-or": "<media-in-parens> [or <media-in-parens>]+",
      "media-query": "<media-condition>|[not|only]? <media-type> [and <media-condition-without-or>]?",
      "media-query-list": "<media-query>#",
      "media-type": "<ident>",
      "mf-boolean": "<mf-name>",
      "mf-name": "<ident>",
      "mf-plain": "<mf-name> : <mf-value>",
      "mf-range": "<mf-name> ['<'|'>']? '='? <mf-value>|<mf-value> ['<'|'>']? '='? <mf-name>|<mf-value> '<' '='? <mf-name> '<' '='? <mf-value>|<mf-value> '>' '='? <mf-name> '>' '='? <mf-value>",
      "mf-value": "<number>|<dimension>|<ident>|<ratio>",
      "min()": "min( <calc-sum># )",
      "minmax()": "minmax( [<length-percentage>|min-content|max-content|auto] , [<length-percentage>|<flex>|min-content|max-content|auto] )",
      "mod()": "mod( <calc-sum> , <calc-sum> )",
      "name-repeat": "repeat( [<integer [1,∞]>|auto-fill] , <line-names>+ )",
      "named-color": "transparent|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen",
      "namespace-prefix": "<ident>",
      "ns-prefix": "[<ident-token>|'*']? '|'",
      "number-percentage": "<number>|<percentage>",
      "numeric-figure-values": "[lining-nums|oldstyle-nums]",
      "numeric-fraction-values": "[diagonal-fractions|stacked-fractions]",
      "numeric-spacing-values": "[proportional-nums|tabular-nums]",
      nth: "<an-plus-b>|even|odd",
      "opacity()": "opacity( [<number-percentage>] )",
      "overflow-position": "unsafe|safe",
      "outline-radius": "<length>|<percentage>",
      "page-body": "<declaration>? [; <page-body>]?|<page-margin-box> <page-body>",
      "page-margin-box": "<page-margin-box-type> '{' <declaration-list> '}'",
      "page-margin-box-type": "@top-left-corner|@top-left|@top-center|@top-right|@top-right-corner|@bottom-left-corner|@bottom-left|@bottom-center|@bottom-right|@bottom-right-corner|@left-top|@left-middle|@left-bottom|@right-top|@right-middle|@right-bottom",
      "page-selector-list": "[<page-selector>#]?",
      "page-selector": "<pseudo-page>+|<ident> <pseudo-page>*",
      "page-size": "A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger",
      "path()": "path( [<fill-rule> ,]? <string> )",
      "paint()": "paint( <ident> , <declaration-value>? )",
      "perspective()": "perspective( [<length [0,∞]>|none] )",
      "polygon()": "polygon( <fill-rule>? , [<length-percentage> <length-percentage>]# )",
      position: "[[left|center|right]||[top|center|bottom]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]?|[[left|right] <length-percentage>]&&[[top|bottom] <length-percentage>]]",
      "pow()": "pow( <calc-sum> , <calc-sum> )",
      "pseudo-class-selector": "':' <ident-token>|':' <function-token> <any-value> ')'",
      "pseudo-element-selector": "':' <pseudo-class-selector>|<legacy-pseudo-element-selector>",
      "pseudo-page": ": [left|right|first|blank]",
      quote: "open-quote|close-quote|no-open-quote|no-close-quote",
      "radial-gradient()": "radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )",
      ratio: "<number [0,∞]> [/ <number [0,∞]>]?",
      "ray()": "ray( <angle>&&<ray-size>?&&contain?&&[at <position>]? )",
      "ray-size": "closest-side|closest-corner|farthest-side|farthest-corner|sides",
      "relative-selector": "<combinator>? <complex-selector>",
      "relative-selector-list": "<relative-selector>#",
      "relative-size": "larger|smaller",
      "rem()": "rem( <calc-sum> , <calc-sum> )",
      "repeat-style": "repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}",
      "repeating-conic-gradient()": "repeating-conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )",
      "repeating-linear-gradient()": "repeating-linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )",
      "repeating-radial-gradient()": "repeating-radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )",
      "reversed-counter-name": "reversed( <counter-name> )",
      "rgb()": "rgb( <percentage>{3} [/ <alpha-value>]? )|rgb( <number>{3} [/ <alpha-value>]? )|rgb( <percentage>#{3} , <alpha-value>? )|rgb( <number>#{3} , <alpha-value>? )",
      "rgba()": "rgba( <percentage>{3} [/ <alpha-value>]? )|rgba( <number>{3} [/ <alpha-value>]? )|rgba( <percentage>#{3} , <alpha-value>? )|rgba( <number>#{3} , <alpha-value>? )",
      "rotate()": "rotate( [<angle>|<zero>] )",
      "rotate3d()": "rotate3d( <number> , <number> , <number> , [<angle>|<zero>] )",
      "rotateX()": "rotateX( [<angle>|<zero>] )",
      "rotateY()": "rotateY( [<angle>|<zero>] )",
      "rotateZ()": "rotateZ( [<angle>|<zero>] )",
      "round()": "round( <rounding-strategy>? , <calc-sum> , <calc-sum> )",
      "rounding-strategy": "nearest|up|down|to-zero",
      "saturate()": "saturate( <number-percentage> )",
      "scale()": "scale( [<number>|<percentage>]#{1,2} )",
      "scale3d()": "scale3d( [<number>|<percentage>]#{3} )",
      "scaleX()": "scaleX( [<number>|<percentage>] )",
      "scaleY()": "scaleY( [<number>|<percentage>] )",
      "scaleZ()": "scaleZ( [<number>|<percentage>] )",
      "scroll()": "scroll( [<axis>||<scroller>]? )",
      scroller: "root|nearest",
      "self-position": "center|start|end|self-start|self-end|flex-start|flex-end",
      "shape-radius": "<length-percentage>|closest-side|farthest-side",
      "sign()": "sign( <calc-sum> )",
      "skew()": "skew( [<angle>|<zero>] , [<angle>|<zero>]? )",
      "skewX()": "skewX( [<angle>|<zero>] )",
      "skewY()": "skewY( [<angle>|<zero>] )",
      "sepia()": "sepia( <number-percentage> )",
      shadow: "inset?&&<length>{2,4}&&<color>?",
      "shadow-t": "[<length>{2,3}&&<color>?]",
      shape: "rect( <top> , <right> , <bottom> , <left> )|rect( <top> <right> <bottom> <left> )",
      "shape-box": "<box>|margin-box",
      "side-or-corner": "[left|right]||[top|bottom]",
      "sin()": "sin( <calc-sum> )",
      "single-animation": "<'animation-duration'>||<easing-function>||<'animation-delay'>||<single-animation-iteration-count>||<single-animation-direction>||<single-animation-fill-mode>||<single-animation-play-state>||[none|<keyframes-name>]||<single-animation-timeline>",
      "single-animation-direction": "normal|reverse|alternate|alternate-reverse",
      "single-animation-fill-mode": "none|forwards|backwards|both",
      "single-animation-iteration-count": "infinite|<number>",
      "single-animation-play-state": "running|paused",
      "single-animation-timeline": "auto|none|<dashed-ident>|<scroll()>|<view()>",
      "single-transition": "[none|<single-transition-property>]||<time>||<easing-function>||<time>||<transition-behavior-value>",
      "single-transition-property": "all|<custom-ident>",
      size: "closest-side|farthest-side|closest-corner|farthest-corner|<length>|<length-percentage>{2}",
      "sqrt()": "sqrt( <calc-sum> )",
      "step-position": "jump-start|jump-end|jump-none|jump-both|start|end",
      "step-timing-function": "step-start|step-end|steps( <integer> [, <step-position>]? )",
      "subclass-selector": "<id-selector>|<class-selector>|<attribute-selector>|<pseudo-class-selector>",
      "supports-condition": "not <supports-in-parens>|<supports-in-parens> [and <supports-in-parens>]*|<supports-in-parens> [or <supports-in-parens>]*",
      "supports-in-parens": "( <supports-condition> )|<supports-feature>|<general-enclosed>",
      "supports-feature": "<supports-decl>|<supports-selector-fn>",
      "supports-decl": "( <declaration> )",
      "supports-selector-fn": "selector( <complex-selector> )",
      symbol: "<string>|<image>|<custom-ident>",
      "tan()": "tan( <calc-sum> )",
      target: "<target-counter()>|<target-counters()>|<target-text()>",
      "target-counter()": "target-counter( [<string>|<url>] , <custom-ident> , <counter-style>? )",
      "target-counters()": "target-counters( [<string>|<url>] , <custom-ident> , <string> , <counter-style>? )",
      "target-text()": "target-text( [<string>|<url>] , [content|before|after|first-letter]? )",
      "time-percentage": "<time>|<percentage>",
      "timeline-range-name": "cover|contain|entry|exit|entry-crossing|exit-crossing",
      "easing-function": "linear|<cubic-bezier-timing-function>|<step-timing-function>",
      "track-breadth": "<length-percentage>|<flex>|min-content|max-content|auto",
      "track-list": "[<line-names>? [<track-size>|<track-repeat>]]+ <line-names>?",
      "track-repeat": "repeat( [<integer [1,∞]>] , [<line-names>? <track-size>]+ <line-names>? )",
      "track-size": "<track-breadth>|minmax( <inflexible-breadth> , <track-breadth> )|fit-content( <length-percentage> )",
      "transform-function": "<matrix()>|<translate()>|<translateX()>|<translateY()>|<scale()>|<scaleX()>|<scaleY()>|<rotate()>|<skew()>|<skewX()>|<skewY()>|<matrix3d()>|<translate3d()>|<translateZ()>|<scale3d()>|<scaleZ()>|<rotate3d()>|<rotateX()>|<rotateY()>|<rotateZ()>|<perspective()>",
      "transform-list": "<transform-function>+",
      "transition-behavior-value": "normal|allow-discrete",
      "translate()": "translate( <length-percentage> , <length-percentage>? )",
      "translate3d()": "translate3d( <length-percentage> , <length-percentage> , <length> )",
      "translateX()": "translateX( <length-percentage> )",
      "translateY()": "translateY( <length-percentage> )",
      "translateZ()": "translateZ( <length> )",
      "type-or-unit": "string|color|url|integer|number|length|angle|time|frequency|cap|ch|em|ex|ic|lh|rlh|rem|vb|vi|vw|vh|vmin|vmax|mm|Q|cm|in|pt|pc|px|deg|grad|rad|turn|ms|s|Hz|kHz|%",
      "type-selector": "<wq-name>|<ns-prefix>? '*'",
      "var()": "var( <custom-property-name> , <declaration-value>? )",
      "view()": "view( [<axis>||<'view-timeline-inset'>]? )",
      "viewport-length": "auto|<length-percentage>",
      "visual-box": "content-box|padding-box|border-box",
      "wq-name": "<ns-prefix>? <ident-token>",
      "-legacy-gradient": "<-webkit-gradient()>|<-legacy-linear-gradient>|<-legacy-repeating-linear-gradient>|<-legacy-radial-gradient>|<-legacy-repeating-radial-gradient>",
      "-legacy-linear-gradient": "-moz-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-linear-gradient( <-legacy-linear-gradient-arguments> )",
      "-legacy-repeating-linear-gradient": "-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )",
      "-legacy-linear-gradient-arguments": "[<angle>|<side-or-corner>]? , <color-stop-list>",
      "-legacy-radial-gradient": "-moz-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-radial-gradient( <-legacy-radial-gradient-arguments> )",
      "-legacy-repeating-radial-gradient": "-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )",
      "-legacy-radial-gradient-arguments": "[<position> ,]? [[[<-legacy-radial-gradient-shape>||<-legacy-radial-gradient-size>]|[<length>|<percentage>]{2}] ,]? <color-stop-list>",
      "-legacy-radial-gradient-size": "closest-side|closest-corner|farthest-side|farthest-corner|contain|cover",
      "-legacy-radial-gradient-shape": "circle|ellipse",
      "-non-standard-font": "-apple-system-body|-apple-system-headline|-apple-system-subheadline|-apple-system-caption1|-apple-system-caption2|-apple-system-footnote|-apple-system-short-body|-apple-system-short-headline|-apple-system-short-subheadline|-apple-system-short-caption1|-apple-system-short-footnote|-apple-system-tall-body",
      "-non-standard-color": "-moz-ButtonDefault|-moz-ButtonHoverFace|-moz-ButtonHoverText|-moz-CellHighlight|-moz-CellHighlightText|-moz-Combobox|-moz-ComboboxText|-moz-Dialog|-moz-DialogText|-moz-dragtargetzone|-moz-EvenTreeRow|-moz-Field|-moz-FieldText|-moz-html-CellHighlight|-moz-html-CellHighlightText|-moz-mac-accentdarkestshadow|-moz-mac-accentdarkshadow|-moz-mac-accentface|-moz-mac-accentlightesthighlight|-moz-mac-accentlightshadow|-moz-mac-accentregularhighlight|-moz-mac-accentregularshadow|-moz-mac-chrome-active|-moz-mac-chrome-inactive|-moz-mac-focusring|-moz-mac-menuselect|-moz-mac-menushadow|-moz-mac-menutextselect|-moz-MenuHover|-moz-MenuHoverText|-moz-MenuBarText|-moz-MenuBarHoverText|-moz-nativehyperlinktext|-moz-OddTreeRow|-moz-win-communicationstext|-moz-win-mediatext|-moz-activehyperlinktext|-moz-default-background-color|-moz-default-color|-moz-hyperlinktext|-moz-visitedhyperlinktext|-webkit-activelink|-webkit-focus-ring-color|-webkit-link|-webkit-text",
      "-non-standard-image-rendering": "optimize-contrast|-moz-crisp-edges|-o-crisp-edges|-webkit-optimize-contrast",
      "-non-standard-overflow": "overlay|-moz-scrollbars-none|-moz-scrollbars-horizontal|-moz-scrollbars-vertical|-moz-hidden-unscrollable",
      "-non-standard-size": "intrinsic|min-intrinsic|-webkit-fill-available|-webkit-fit-content|-webkit-min-content|-webkit-max-content|-moz-available|-moz-fit-content|-moz-min-content|-moz-max-content",
      "-webkit-gradient()": "-webkit-gradient( <-webkit-gradient-type> , <-webkit-gradient-point> [, <-webkit-gradient-point>|, <-webkit-gradient-radius> , <-webkit-gradient-point>] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )",
      "-webkit-gradient-color-stop": "from( <color> )|color-stop( [<number-zero-one>|<percentage>] , <color> )|to( <color> )",
      "-webkit-gradient-point": "[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]",
      "-webkit-gradient-radius": "<length>|<percentage>",
      "-webkit-gradient-type": "linear|radial",
      "-webkit-mask-box-repeat": "repeat|stretch|round",
      "-ms-filter-function-list": "<-ms-filter-function>+",
      "-ms-filter-function": "<-ms-filter-function-progid>|<-ms-filter-function-legacy>",
      "-ms-filter-function-progid": "'progid:' [<ident-token> '.']* [<ident-token>|<function-token> <any-value>? )]",
      "-ms-filter-function-legacy": "<ident-token>|<function-token> <any-value>? )",
      "absolute-color-base": "<hex-color>|<absolute-color-function>|<named-color>|transparent",
      "absolute-color-function": "rgb( ) >|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<oklab()>|<oklch()>|<color()>",
      age: "child|young|old",
      "attr-name": "<wq-name>",
      "attr-fallback": "<any-value>",
      "bg-clip": "<box>|border|text",
      bottom: "<length>|auto",
      "container-name": "<custom-ident>",
      "container-condition": "not <query-in-parens>|<query-in-parens> [[and <query-in-parens>]*|[or <query-in-parens>]*]",
      "coord-box": "content-box|padding-box|border-box|fill-box|stroke-box|view-box",
      "generic-voice": "[<age>? <gender> <integer>?]",
      gender: "male|female|neutral",
      "generic-script-specific": "generic( kai )|generic( fangsong )|generic( nastaliq )",
      "generic-complete": "serif|sans-serif|system-ui|cursive|fantasy|math|monospace",
      "generic-incomplete": "ui-serif|ui-sans-serif|ui-monospace|ui-rounded",
      "-non-standard-generic-family": "-apple-system|BlinkMacSystemFont",
      left: "<length>|auto",
      "color-base": "<hex-color>|<color-function>|<named-color>|<color-mix()>|transparent",
      "color-function": "<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<oklab()>|<oklch()>|<color()>",
      "system-color": "AccentColor|AccentColorText|ActiveText|ButtonBorder|ButtonFace|ButtonText|Canvas|CanvasText|Field|FieldText|GrayText|Highlight|HighlightText|LinkText|Mark|MarkText|SelectedItem|SelectedItemText|VisitedText",
      "device-cmyk()": "<legacy-device-cmyk-syntax>|<modern-device-cmyk-syntax>",
      "legacy-device-cmyk-syntax": "device-cmyk( <number>#{4} )",
      "modern-device-cmyk-syntax": "device-cmyk( <cmyk-component>{4} [/ [<alpha-value>|none]]? )",
      "cmyk-component": "<number>|<percentage>|none",
      "color-mix()": "color-mix( <color-interpolation-method> , [<color>&&<percentage [0,100]>?]#{2} )",
      "color-interpolation-method": "in [<rectangular-color-space>|<polar-color-space> <hue-interpolation-method>?|<custom-color-space>]",
      "color-space": "<rectangular-color-space>|<polar-color-space>|<custom-color-space>",
      "rectangular-color-space": "srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020|lab|oklab|xyz|xyz-d50|xyz-d65",
      "polar-color-space": "hsl|hwb|lch|oklch",
      "custom-color-space": "<dashed-ident>",
      "hue-interpolation-method": "[shorter|longer|increasing|decreasing] hue",
      paint: "none|<color>|<url> [none|<color>]?|context-fill|context-stroke",
      "palette-identifier": "<dashed-ident>",
      right: "<length>|auto",
      "scope-start": "<forgiving-selector-list>",
      "scope-end": "<forgiving-selector-list>",
      "forgiving-selector-list": "<complex-real-selector-list>",
      "forgiving-relative-selector-list": "<relative-real-selector-list>",
      "selector-list": "<complex-selector-list>",
      "complex-real-selector-list": "<complex-real-selector>#",
      "simple-selector-list": "<simple-selector>#",
      "relative-real-selector-list": "<relative-real-selector>#",
      "complex-selector-unit": "[<compound-selector>? <pseudo-compound-selector>*]!",
      "complex-real-selector": "<compound-selector> [<combinator>? <compound-selector>]*",
      "relative-real-selector": "<combinator>? <complex-real-selector>",
      "pseudo-compound-selector": "<pseudo-element-selector> <pseudo-class-selector>*",
      "simple-selector": "<type-selector>|<subclass-selector>",
      "legacy-pseudo-element-selector": "':' [before|after|first-line|first-letter]",
      "single-animation-composition": "replace|add|accumulate",
      "svg-length": "<percentage>|<length>|<number>",
      "svg-writing-mode": "lr-tb|rl-tb|tb-rl|lr|rl|tb",
      top: "<length>|auto",
      x: "<number>",
      y: "<number>",
      declaration: "<ident-token> : <declaration-value>? ['!' important]?",
      "declaration-list": "[<declaration>? ';']* <declaration>?",
      url: "url( <string> <url-modifier>* )|<url-token>",
      "url-modifier": "<ident>|<function-token> <any-value> )",
      "number-zero-one": "<number [0,1]>",
      "number-one-or-greater": "<number [1,∞]>",
      "color()": "color( <colorspace-params> [/ [<alpha-value>|none]]? )",
      "colorspace-params": "[<predefined-rgb-params>|<xyz-params>]",
      "predefined-rgb-params": "<predefined-rgb> [<number>|<percentage>|none]{3}",
      "predefined-rgb": "srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020",
      "xyz-params": "<xyz-space> [<number>|<percentage>|none]{3}",
      "xyz-space": "xyz|xyz-d50|xyz-d65",
      "oklab()": "oklab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
      "oklch()": "oklch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )",
      "offset-path": "<ray()>|<url>|<basic-shape>",
      "query-in-parens": "( <container-condition> )|( <size-feature> )|style( <style-query> )|<general-enclosed>",
      "size-feature": "<mf-plain>|<mf-boolean>|<mf-range>",
      "style-feature": "<declaration>",
      "style-query": "<style-condition>|<style-feature>",
      "style-condition": "not <style-in-parens>|<style-in-parens> [[and <style-in-parens>]*|[or <style-in-parens>]*]",
      "style-in-parens": "( <style-condition> )|( <style-feature> )|<general-enclosed>",
      "-non-standard-display": "-ms-inline-flexbox|-ms-grid|-ms-inline-grid|-webkit-flex|-webkit-inline-flex|-webkit-box|-webkit-inline-box|-moz-inline-stack|-moz-box|-moz-inline-box",
      "inset-area": "[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]",
      "position-area": "[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|center|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|center|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]",
      "anchor()": "anchor( <anchor-element>?&&<anchor-side> , <length-percentage>? )",
      "anchor-side": "inside|outside|top|left|right|bottom|start|end|self-start|self-end|<percentage>|center",
      "anchor-size()": "anchor-size( [<anchor-element>||<anchor-size>]? , <length-percentage>? )",
      "anchor-size": "width|height|block|inline|self-block|self-inline",
      "anchor-element": "<dashed-ident>",
      "try-size": "most-width|most-height|most-block-size|most-inline-size",
      "try-tactic": "flip-block||flip-inline||flip-start",
      "font-variant-css2": "normal|small-caps",
      "font-width-css3": "normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded",
      "system-family-name": "caption|icon|menu|message-box|small-caption|status-bar"
    },
    properties: {
      "--*": "<declaration-value>",
      "-ms-accelerator": "false|true",
      "-ms-block-progression": "tb|rl|bt|lr",
      "-ms-content-zoom-chaining": "none|chained",
      "-ms-content-zooming": "none|zoom",
      "-ms-content-zoom-limit": "<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>",
      "-ms-content-zoom-limit-max": "<percentage>",
      "-ms-content-zoom-limit-min": "<percentage>",
      "-ms-content-zoom-snap": "<'-ms-content-zoom-snap-type'>||<'-ms-content-zoom-snap-points'>",
      "-ms-content-zoom-snap-points": "snapInterval( <percentage> , <percentage> )|snapList( <percentage># )",
      "-ms-content-zoom-snap-type": "none|proximity|mandatory",
      "-ms-filter": "<string>",
      "-ms-flow-from": "[none|<custom-ident>]#",
      "-ms-flow-into": "[none|<custom-ident>]#",
      "-ms-grid-columns": "none|<track-list>|<auto-track-list>",
      "-ms-grid-rows": "none|<track-list>|<auto-track-list>",
      "-ms-high-contrast-adjust": "auto|none",
      "-ms-hyphenate-limit-chars": "auto|<integer>{1,3}",
      "-ms-hyphenate-limit-lines": "no-limit|<integer>",
      "-ms-hyphenate-limit-zone": "<percentage>|<length>",
      "-ms-ime-align": "auto|after",
      "-ms-overflow-style": "auto|none|scrollbar|-ms-autohiding-scrollbar",
      "-ms-scrollbar-3dlight-color": "<color>",
      "-ms-scrollbar-arrow-color": "<color>",
      "-ms-scrollbar-base-color": "<color>",
      "-ms-scrollbar-darkshadow-color": "<color>",
      "-ms-scrollbar-face-color": "<color>",
      "-ms-scrollbar-highlight-color": "<color>",
      "-ms-scrollbar-shadow-color": "<color>",
      "-ms-scrollbar-track-color": "<color>",
      "-ms-scroll-chaining": "chained|none",
      "-ms-scroll-limit": "<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>",
      "-ms-scroll-limit-x-max": "auto|<length>",
      "-ms-scroll-limit-x-min": "<length>",
      "-ms-scroll-limit-y-max": "auto|<length>",
      "-ms-scroll-limit-y-min": "<length>",
      "-ms-scroll-rails": "none|railed",
      "-ms-scroll-snap-points-x": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
      "-ms-scroll-snap-points-y": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
      "-ms-scroll-snap-type": "none|proximity|mandatory",
      "-ms-scroll-snap-x": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>",
      "-ms-scroll-snap-y": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>",
      "-ms-scroll-translation": "none|vertical-to-horizontal",
      "-ms-text-autospace": "none|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space",
      "-ms-touch-select": "grippers|none",
      "-ms-user-select": "none|element|text",
      "-ms-wrap-flow": "auto|both|start|end|maximum|clear",
      "-ms-wrap-margin": "<length>",
      "-ms-wrap-through": "wrap|none",
      "-moz-appearance": "none|button|button-arrow-down|button-arrow-next|button-arrow-previous|button-arrow-up|button-bevel|button-focus|caret|checkbox|checkbox-container|checkbox-label|checkmenuitem|dualbutton|groupbox|listbox|listitem|menuarrow|menubar|menucheckbox|menuimage|menuitem|menuitemtext|menulist|menulist-button|menulist-text|menulist-textfield|menupopup|menuradio|menuseparator|meterbar|meterchunk|progressbar|progressbar-vertical|progresschunk|progresschunk-vertical|radio|radio-container|radio-label|radiomenuitem|range|range-thumb|resizer|resizerpanel|scale-horizontal|scalethumbend|scalethumb-horizontal|scalethumbstart|scalethumbtick|scalethumb-vertical|scale-vertical|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|separator|sheet|spinner|spinner-downbutton|spinner-textfield|spinner-upbutton|splitter|statusbar|statusbarpanel|tab|tabpanel|tabpanels|tab-scroll-arrow-back|tab-scroll-arrow-forward|textfield|textfield-multiline|toolbar|toolbarbutton|toolbarbutton-dropdown|toolbargripper|toolbox|tooltip|treeheader|treeheadercell|treeheadersortarrow|treeitem|treeline|treetwisty|treetwistyopen|treeview|-moz-mac-unified-toolbar|-moz-win-borderless-glass|-moz-win-browsertabbar-toolbox|-moz-win-communicationstext|-moz-win-communications-toolbox|-moz-win-exclude-glass|-moz-win-glass|-moz-win-mediatext|-moz-win-media-toolbox|-moz-window-button-box|-moz-window-button-box-maximized|-moz-window-button-close|-moz-window-button-maximize|-moz-window-button-minimize|-moz-window-button-restore|-moz-window-frame-bottom|-moz-window-frame-left|-moz-window-frame-right|-moz-window-titlebar|-moz-window-titlebar-maximized",
      "-moz-binding": "<url>|none",
      "-moz-border-bottom-colors": "<color>+|none",
      "-moz-border-left-colors": "<color>+|none",
      "-moz-border-right-colors": "<color>+|none",
      "-moz-border-top-colors": "<color>+|none",
      "-moz-context-properties": "none|[fill|fill-opacity|stroke|stroke-opacity]#",
      "-moz-float-edge": "border-box|content-box|margin-box|padding-box",
      "-moz-force-broken-image-icon": "0|1",
      "-moz-image-region": "<shape>|auto",
      "-moz-orient": "inline|block|horizontal|vertical",
      "-moz-outline-radius": "<outline-radius>{1,4} [/ <outline-radius>{1,4}]?",
      "-moz-outline-radius-bottomleft": "<outline-radius>",
      "-moz-outline-radius-bottomright": "<outline-radius>",
      "-moz-outline-radius-topleft": "<outline-radius>",
      "-moz-outline-radius-topright": "<outline-radius>",
      "-moz-stack-sizing": "ignore|stretch-to-fit",
      "-moz-text-blink": "none|blink",
      "-moz-user-focus": "ignore|normal|select-after|select-before|select-menu|select-same|select-all|none",
      "-moz-user-input": "auto|none|enabled|disabled",
      "-moz-user-modify": "read-only|read-write|write-only",
      "-moz-window-dragging": "drag|no-drag",
      "-moz-window-shadow": "default|menu|tooltip|sheet|none",
      "-webkit-appearance": "none|button|button-bevel|caps-lock-indicator|caret|checkbox|default-button|inner-spin-button|listbox|listitem|media-controls-background|media-controls-fullscreen-background|media-current-time-display|media-enter-fullscreen-button|media-exit-fullscreen-button|media-fullscreen-button|media-mute-button|media-overlay-play-button|media-play-button|media-seek-back-button|media-seek-forward-button|media-slider|media-sliderthumb|media-time-remaining-display|media-toggle-closed-captions-button|media-volume-slider|media-volume-slider-container|media-volume-sliderthumb|menulist|menulist-button|menulist-text|menulist-textfield|meter|progress-bar|progress-bar-value|push-button|radio|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbargripper-horizontal|scrollbargripper-vertical|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|searchfield-cancel-button|searchfield-decoration|searchfield-results-button|searchfield-results-decoration|slider-horizontal|slider-vertical|sliderthumb-horizontal|sliderthumb-vertical|square-button|textarea|textfield|-apple-pay-button",
      "-webkit-border-before": "<'border-width'>||<'border-style'>||<color>",
      "-webkit-border-before-color": "<color>",
      "-webkit-border-before-style": "<'border-style'>",
      "-webkit-border-before-width": "<'border-width'>",
      "-webkit-box-reflect": "[above|below|right|left]? <length>? <image>?",
      "-webkit-line-clamp": "none|<integer>",
      "-webkit-mask": "[<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||[<box>|border|padding|content|text]||[<box>|border|padding|content]]#",
      "-webkit-mask-attachment": "<attachment>#",
      "-webkit-mask-clip": "[<box>|border|padding|content|text]#",
      "-webkit-mask-composite": "<composite-style>#",
      "-webkit-mask-image": "<mask-reference>#",
      "-webkit-mask-origin": "[<box>|border|padding|content]#",
      "-webkit-mask-position": "<position>#",
      "-webkit-mask-position-x": "[<length-percentage>|left|center|right]#",
      "-webkit-mask-position-y": "[<length-percentage>|top|center|bottom]#",
      "-webkit-mask-repeat": "<repeat-style>#",
      "-webkit-mask-repeat-x": "repeat|no-repeat|space|round",
      "-webkit-mask-repeat-y": "repeat|no-repeat|space|round",
      "-webkit-mask-size": "<bg-size>#",
      "-webkit-overflow-scrolling": "auto|touch",
      "-webkit-tap-highlight-color": "<color>",
      "-webkit-text-fill-color": "<color>",
      "-webkit-text-stroke": "<length>||<color>",
      "-webkit-text-stroke-color": "<color>",
      "-webkit-text-stroke-width": "<length>",
      "-webkit-touch-callout": "default|none",
      "-webkit-user-modify": "read-only|read-write|read-write-plaintext-only",
      "accent-color": "auto|<color>",
      "align-content": "normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>",
      "align-items": "normal|stretch|<baseline-position>|[<overflow-position>? <self-position>]",
      "align-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? <self-position>",
      "align-tracks": "[normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>]#",
      all: "initial|inherit|unset|revert|revert-layer",
      "anchor-name": "none|<dashed-ident>#",
      "anchor-scope": "none|all|<dashed-ident>#",
      animation: "<single-animation>#",
      "animation-composition": "<single-animation-composition>#",
      "animation-delay": "<time>#",
      "animation-direction": "<single-animation-direction>#",
      "animation-duration": "<time>#",
      "animation-fill-mode": "<single-animation-fill-mode>#",
      "animation-iteration-count": "<single-animation-iteration-count>#",
      "animation-name": "[none|<keyframes-name>]#",
      "animation-play-state": "<single-animation-play-state>#",
      "animation-range": "[<'animation-range-start'> <'animation-range-end'>?]#",
      "animation-range-end": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
      "animation-range-start": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
      "animation-timing-function": "<easing-function>#",
      "animation-timeline": "<single-animation-timeline>#",
      appearance: "none|auto|textfield|menulist-button|<compat-auto>",
      "aspect-ratio": "auto|<ratio>",
      azimuth: "<angle>|[[left-side|far-left|left|center-left|center|center-right|right|far-right|right-side]||behind]|leftwards|rightwards",
      "backdrop-filter": "none|<filter-function-list>",
      "backface-visibility": "visible|hidden",
      background: "[<bg-layer> ,]* <final-bg-layer>",
      "background-attachment": "<attachment>#",
      "background-blend-mode": "<blend-mode>#",
      "background-clip": "<bg-clip>#",
      "background-color": "<color>",
      "background-image": "<bg-image>#",
      "background-origin": "<box>#",
      "background-position": "<bg-position>#",
      "background-position-x": "[center|[[left|right|x-start|x-end]? <length-percentage>?]!]#",
      "background-position-y": "[center|[[top|bottom|y-start|y-end]? <length-percentage>?]!]#",
      "background-repeat": "<repeat-style>#",
      "background-size": "<bg-size>#",
      "block-size": "<'width'>",
      border: "<line-width>||<line-style>||<color>",
      "border-block": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-block-color": "<'border-top-color'>{1,2}",
      "border-block-style": "<'border-top-style'>",
      "border-block-width": "<'border-top-width'>",
      "border-block-end": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-block-end-color": "<'border-top-color'>",
      "border-block-end-style": "<'border-top-style'>",
      "border-block-end-width": "<'border-top-width'>",
      "border-block-start": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-block-start-color": "<'border-top-color'>",
      "border-block-start-style": "<'border-top-style'>",
      "border-block-start-width": "<'border-top-width'>",
      "border-bottom": "<line-width>||<line-style>||<color>",
      "border-bottom-color": "<'border-top-color'>",
      "border-bottom-left-radius": "<length-percentage>{1,2}",
      "border-bottom-right-radius": "<length-percentage>{1,2}",
      "border-bottom-style": "<line-style>",
      "border-bottom-width": "<line-width>",
      "border-collapse": "collapse|separate",
      "border-color": "<color>{1,4}",
      "border-end-end-radius": "<length-percentage>{1,2}",
      "border-end-start-radius": "<length-percentage>{1,2}",
      "border-image": "<'border-image-source'>||<'border-image-slice'> [/ <'border-image-width'>|/ <'border-image-width'>? / <'border-image-outset'>]?||<'border-image-repeat'>",
      "border-image-outset": "[<length>|<number>]{1,4}",
      "border-image-repeat": "[stretch|repeat|round|space]{1,2}",
      "border-image-slice": "<number-percentage>{1,4}&&fill?",
      "border-image-source": "none|<image>",
      "border-image-width": "[<length-percentage>|<number>|auto]{1,4}",
      "border-inline": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-inline-end": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-inline-color": "<'border-top-color'>{1,2}",
      "border-inline-style": "<'border-top-style'>",
      "border-inline-width": "<'border-top-width'>",
      "border-inline-end-color": "<'border-top-color'>",
      "border-inline-end-style": "<'border-top-style'>",
      "border-inline-end-width": "<'border-top-width'>",
      "border-inline-start": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-inline-start-color": "<'border-top-color'>",
      "border-inline-start-style": "<'border-top-style'>",
      "border-inline-start-width": "<'border-top-width'>",
      "border-left": "<line-width>||<line-style>||<color>",
      "border-left-color": "<color>",
      "border-left-style": "<line-style>",
      "border-left-width": "<line-width>",
      "border-radius": "<length-percentage>{1,4} [/ <length-percentage>{1,4}]?",
      "border-right": "<line-width>||<line-style>||<color>",
      "border-right-color": "<color>",
      "border-right-style": "<line-style>",
      "border-right-width": "<line-width>",
      "border-spacing": "<length> <length>?",
      "border-start-end-radius": "<length-percentage>{1,2}",
      "border-start-start-radius": "<length-percentage>{1,2}",
      "border-style": "<line-style>{1,4}",
      "border-top": "<line-width>||<line-style>||<color>",
      "border-top-color": "<color>",
      "border-top-left-radius": "<length-percentage>{1,2}",
      "border-top-right-radius": "<length-percentage>{1,2}",
      "border-top-style": "<line-style>",
      "border-top-width": "<line-width>",
      "border-width": "<line-width>{1,4}",
      bottom: "<length>|<percentage>|auto",
      "box-align": "start|center|end|baseline|stretch",
      "box-decoration-break": "slice|clone",
      "box-direction": "normal|reverse|inherit",
      "box-flex": "<number>",
      "box-flex-group": "<integer>",
      "box-lines": "single|multiple",
      "box-ordinal-group": "<integer>",
      "box-orient": "horizontal|vertical|inline-axis|block-axis|inherit",
      "box-pack": "start|center|end|justify",
      "box-shadow": "none|<shadow>#",
      "box-sizing": "content-box|border-box",
      "break-after": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
      "break-before": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
      "break-inside": "auto|avoid|avoid-page|avoid-column|avoid-region",
      "caption-side": "top|bottom|block-start|block-end|inline-start|inline-end",
      caret: "<'caret-color'>||<'caret-shape'>",
      "caret-color": "auto|<color>",
      "caret-shape": "auto|bar|block|underscore",
      clear: "none|left|right|both|inline-start|inline-end",
      clip: "<shape>|auto",
      "clip-path": "<clip-source>|[<basic-shape>||<geometry-box>]|none",
      "clip-rule": "nonzero|evenodd",
      color: "<color>",
      "color-interpolation-filters": "auto|sRGB|linearRGB",
      "color-scheme": "normal|[light|dark|<custom-ident>]+&&only?",
      "column-count": "<integer>|auto",
      "column-fill": "auto|balance|balance-all",
      "column-gap": "normal|<length-percentage>",
      "column-rule": "<'column-rule-width'>||<'column-rule-style'>||<'column-rule-color'>",
      "column-rule-color": "<color>",
      "column-rule-style": "<'border-style'>",
      "column-rule-width": "<'border-width'>",
      "column-span": "none|all",
      "column-width": "<length>|auto",
      columns: "<'column-width'>||<'column-count'>",
      contain: "none|strict|content|[[size||inline-size]||layout||style||paint]",
      "contain-intrinsic-size": "[auto? [none|<length>]]{1,2}",
      "contain-intrinsic-block-size": "auto? [none|<length>]",
      "contain-intrinsic-height": "auto? [none|<length>]",
      "contain-intrinsic-inline-size": "auto? [none|<length>]",
      "contain-intrinsic-width": "auto? [none|<length>]",
      container: "<'container-name'> [/ <'container-type'>]?",
      "container-name": "none|<custom-ident>+",
      "container-type": "normal||[size|inline-size]",
      content: "normal|none|[<content-replacement>|<content-list>] [/ [<string>|<counter>]+]?",
      "content-visibility": "visible|auto|hidden",
      "counter-increment": "[<counter-name> <integer>?]+|none",
      "counter-reset": "[<counter-name> <integer>?|<reversed-counter-name> <integer>?]+|none",
      "counter-set": "[<counter-name> <integer>?]+|none",
      cursor: "[[<url> [<x> <y>]? ,]* [auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing|hand|-webkit-grab|-webkit-grabbing|-webkit-zoom-in|-webkit-zoom-out|-moz-grab|-moz-grabbing|-moz-zoom-in|-moz-zoom-out]]",
      d: "none|path( <string> )",
      cx: "<length>|<percentage>",
      cy: "<length>|<percentage>",
      direction: "ltr|rtl",
      display: "[<display-outside>||<display-inside>]|<display-listitem>|<display-internal>|<display-box>|<display-legacy>|<-non-standard-display>",
      "dominant-baseline": "auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge",
      "empty-cells": "show|hide",
      "field-sizing": "content|fixed",
      fill: "<paint>",
      "fill-opacity": "<number-zero-one>",
      "fill-rule": "nonzero|evenodd",
      filter: "none|<filter-function-list>|<-ms-filter-function-list>",
      flex: "none|[<'flex-grow'> <'flex-shrink'>?||<'flex-basis'>]",
      "flex-basis": "content|<'width'>",
      "flex-direction": "row|row-reverse|column|column-reverse",
      "flex-flow": "<'flex-direction'>||<'flex-wrap'>",
      "flex-grow": "<number>",
      "flex-shrink": "<number>",
      "flex-wrap": "nowrap|wrap|wrap-reverse",
      float: "left|right|none|inline-start|inline-end",
      font: "[[<'font-style'>||<font-variant-css2>||<'font-weight'>||<font-width-css3>]? <'font-size'> [/ <'line-height'>]? <'font-family'>#]|<system-family-name>|<-non-standard-font>",
      "font-family": "[<family-name>|<generic-family>]#",
      "font-feature-settings": "normal|<feature-tag-value>#",
      "font-kerning": "auto|normal|none",
      "font-language-override": "normal|<string>",
      "font-optical-sizing": "auto|none",
      "font-palette": "normal|light|dark|<palette-identifier>",
      "font-variation-settings": "normal|[<string> <number>]#",
      "font-size": "<absolute-size>|<relative-size>|<length-percentage>",
      "font-size-adjust": "none|[ex-height|cap-height|ch-width|ic-width|ic-height]? [from-font|<number>]",
      "font-smooth": "auto|never|always|<absolute-size>|<length>",
      "font-stretch": "<font-stretch-absolute>",
      "font-style": "normal|italic|oblique <angle>?",
      "font-synthesis": "none|[weight||style||small-caps||position]",
      "font-synthesis-position": "auto|none",
      "font-synthesis-small-caps": "auto|none",
      "font-synthesis-style": "auto|none",
      "font-synthesis-weight": "auto|none",
      "font-variant": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]",
      "font-variant-alternates": "normal|[stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )]",
      "font-variant-caps": "normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps",
      "font-variant-east-asian": "normal|[<east-asian-variant-values>||<east-asian-width-values>||ruby]",
      "font-variant-emoji": "normal|text|emoji|unicode",
      "font-variant-ligatures": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>]",
      "font-variant-numeric": "normal|[<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero]",
      "font-variant-position": "normal|sub|super",
      "font-weight": "<font-weight-absolute>|bolder|lighter",
      "forced-color-adjust": "auto|none",
      gap: "<'row-gap'> <'column-gap'>?",
      grid: "<'grid-template'>|<'grid-template-rows'> / [auto-flow&&dense?] <'grid-auto-columns'>?|[auto-flow&&dense?] <'grid-auto-rows'>? / <'grid-template-columns'>",
      "grid-area": "<grid-line> [/ <grid-line>]{0,3}",
      "grid-auto-columns": "<track-size>+",
      "grid-auto-flow": "[row|column]||dense",
      "grid-auto-rows": "<track-size>+",
      "grid-column": "<grid-line> [/ <grid-line>]?",
      "grid-column-end": "<grid-line>",
      "grid-column-gap": "<length-percentage>",
      "grid-column-start": "<grid-line>",
      "grid-gap": "<'grid-row-gap'> <'grid-column-gap'>?",
      "grid-row": "<grid-line> [/ <grid-line>]?",
      "grid-row-end": "<grid-line>",
      "grid-row-gap": "<length-percentage>",
      "grid-row-start": "<grid-line>",
      "grid-template": "none|[<'grid-template-rows'> / <'grid-template-columns'>]|[<line-names>? <string> <track-size>? <line-names>?]+ [/ <explicit-track-list>]?",
      "grid-template-areas": "none|<string>+",
      "grid-template-columns": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
      "grid-template-rows": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
      "hanging-punctuation": "none|[first||[force-end|allow-end]||last]",
      height: "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "hyphenate-character": "auto|<string>",
      "hyphenate-limit-chars": "[auto|<integer>]{1,3}",
      hyphens: "none|manual|auto",
      "image-orientation": "from-image|<angle>|[<angle>? flip]",
      "image-rendering": "auto|crisp-edges|pixelated|optimizeSpeed|optimizeQuality|<-non-standard-image-rendering>",
      "image-resolution": "[from-image||<resolution>]&&snap?",
      "ime-mode": "auto|normal|active|inactive|disabled",
      "initial-letter": "normal|[<number> <integer>?]",
      "initial-letter-align": "[auto|alphabetic|hanging|ideographic]",
      "inline-size": "<'width'>",
      "input-security": "auto|none",
      inset: "<'top'>{1,4}",
      "inset-area": "none|<inset-area>",
      "inset-block": "<'top'>{1,2}",
      "inset-block-end": "<'top'>",
      "inset-block-start": "<'top'>",
      "inset-inline": "<'top'>{1,2}",
      "inset-inline-end": "<'top'>",
      "inset-inline-start": "<'top'>",
      isolation: "auto|isolate",
      "justify-content": "normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]",
      "justify-items": "normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|legacy|legacy&&[left|right|center]",
      "justify-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]",
      "justify-tracks": "[normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]]#",
      left: "<length>|<percentage>|auto",
      "letter-spacing": "normal|<length-percentage>",
      "line-break": "auto|loose|normal|strict|anywhere",
      "line-clamp": "none|<integer>",
      "line-height": "normal|<number>|<length>|<percentage>",
      "line-height-step": "<length>",
      "list-style": "<'list-style-type'>||<'list-style-position'>||<'list-style-image'>",
      "list-style-image": "<image>|none",
      "list-style-position": "inside|outside",
      "list-style-type": "<counter-style>|<string>|none",
      margin: "[<length>|<percentage>|auto]{1,4}",
      "margin-block": "<'margin-left'>{1,2}",
      "margin-block-end": "<'margin-left'>",
      "margin-block-start": "<'margin-left'>",
      "margin-bottom": "<length>|<percentage>|auto",
      "margin-inline": "<'margin-left'>{1,2}",
      "margin-inline-end": "<'margin-left'>",
      "margin-inline-start": "<'margin-left'>",
      "margin-left": "<length>|<percentage>|auto",
      "margin-right": "<length>|<percentage>|auto",
      "margin-top": "<length>|<percentage>|auto",
      "margin-trim": "none|in-flow|all",
      marker: "none|<url>",
      "marker-end": "none|<url>",
      "marker-mid": "none|<url>",
      "marker-start": "none|<url>",
      mask: "<mask-layer>#",
      "mask-border": "<'mask-border-source'>||<'mask-border-slice'> [/ <'mask-border-width'>? [/ <'mask-border-outset'>]?]?||<'mask-border-repeat'>||<'mask-border-mode'>",
      "mask-border-mode": "luminance|alpha",
      "mask-border-outset": "[<length>|<number>]{1,4}",
      "mask-border-repeat": "[stretch|repeat|round|space]{1,2}",
      "mask-border-slice": "<number-percentage>{1,4} fill?",
      "mask-border-source": "none|<image>",
      "mask-border-width": "[<length-percentage>|<number>|auto]{1,4}",
      "mask-clip": "[<geometry-box>|no-clip]#",
      "mask-composite": "<compositing-operator>#",
      "mask-image": "<mask-reference>#",
      "mask-mode": "<masking-mode>#",
      "mask-origin": "<geometry-box>#",
      "mask-position": "<position>#",
      "mask-repeat": "<repeat-style>#",
      "mask-size": "<bg-size>#",
      "mask-type": "luminance|alpha",
      "masonry-auto-flow": "[pack|next]||[definite-first|ordered]",
      "math-depth": "auto-add|add( <integer> )|<integer>",
      "math-shift": "normal|compact",
      "math-style": "normal|compact",
      "max-block-size": "<'max-width'>",
      "max-height": "none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "max-inline-size": "<'max-width'>",
      "max-lines": "none|<integer>",
      "max-width": "none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "min-block-size": "<'min-width'>",
      "min-height": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "min-inline-size": "<'min-width'>",
      "min-width": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "mix-blend-mode": "<blend-mode>|plus-lighter",
      "object-fit": "fill|contain|cover|none|scale-down",
      "object-position": "<position>",
      offset: "[<'offset-position'>? [<'offset-path'> [<'offset-distance'>||<'offset-rotate'>]?]?]! [/ <'offset-anchor'>]?",
      "offset-anchor": "auto|<position>",
      "offset-distance": "<length-percentage>",
      "offset-path": "none|<offset-path>||<coord-box>",
      "offset-position": "normal|auto|<position>",
      "offset-rotate": "[auto|reverse]||<angle>",
      opacity: "<alpha-value>",
      order: "<integer>",
      orphans: "<integer>",
      outline: "[<'outline-width'>||<'outline-style'>||<'outline-color'>]",
      "outline-color": "auto|<color>",
      "outline-offset": "<length>",
      "outline-style": "auto|<'border-style'>",
      "outline-width": "<line-width>",
      overflow: "[visible|hidden|clip|scroll|auto]{1,2}|<-non-standard-overflow>",
      "overflow-anchor": "auto|none",
      "overflow-block": "visible|hidden|clip|scroll|auto",
      "overflow-clip-box": "padding-box|content-box",
      "overflow-clip-margin": "<visual-box>||<length [0,∞]>",
      "overflow-inline": "visible|hidden|clip|scroll|auto",
      "overflow-wrap": "normal|break-word|anywhere",
      "overflow-x": "visible|hidden|clip|scroll|auto",
      "overflow-y": "visible|hidden|clip|scroll|auto",
      overlay: "none|auto",
      "overscroll-behavior": "[contain|none|auto]{1,2}",
      "overscroll-behavior-block": "contain|none|auto",
      "overscroll-behavior-inline": "contain|none|auto",
      "overscroll-behavior-x": "contain|none|auto",
      "overscroll-behavior-y": "contain|none|auto",
      padding: "[<length>|<percentage>]{1,4}",
      "padding-block": "<'padding-left'>{1,2}",
      "padding-block-end": "<'padding-left'>",
      "padding-block-start": "<'padding-left'>",
      "padding-bottom": "<length>|<percentage>",
      "padding-inline": "<'padding-left'>{1,2}",
      "padding-inline-end": "<'padding-left'>",
      "padding-inline-start": "<'padding-left'>",
      "padding-left": "<length>|<percentage>",
      "padding-right": "<length>|<percentage>",
      "padding-top": "<length>|<percentage>",
      page: "auto|<custom-ident>",
      "page-break-after": "auto|always|avoid|left|right|recto|verso",
      "page-break-before": "auto|always|avoid|left|right|recto|verso",
      "page-break-inside": "auto|avoid",
      "paint-order": "normal|[fill||stroke||markers]",
      perspective: "none|<length>",
      "perspective-origin": "<position>",
      "place-content": "<'align-content'> <'justify-content'>?",
      "place-items": "<'align-items'> <'justify-items'>?",
      "place-self": "<'align-self'> <'justify-self'>?",
      "pointer-events": "auto|none|visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|inherit",
      position: "static|relative|absolute|sticky|fixed|-webkit-sticky",
      "position-anchor": "<anchor-element>",
      "position-try": "<'position-try-order'>? <'position-try-fallbacks'>",
      "position-try-fallbacks": "none|[[<dashed-ident>||<try-tactic>]|<'position-area'>]#",
      "position-try-order": "normal|<try-size>",
      "position-visibility": "always|[anchors-valid||anchors-visible||no-overflow]",
      "print-color-adjust": "economy|exact",
      quotes: "none|auto|[<string> <string>]+",
      r: "<length>|<percentage>",
      resize: "none|both|horizontal|vertical|block|inline",
      right: "<length>|<percentage>|auto",
      rotate: "none|<angle>|[x|y|z|<number>{3}]&&<angle>",
      "row-gap": "normal|<length-percentage>",
      "ruby-align": "start|center|space-between|space-around",
      "ruby-merge": "separate|collapse|auto",
      "ruby-position": "[alternate||[over|under]]|inter-character",
      rx: "<length>|<percentage>",
      ry: "<length>|<percentage>",
      scale: "none|<number>{1,3}",
      "scrollbar-color": "auto|<color>{2}",
      "scrollbar-gutter": "auto|stable&&both-edges?",
      "scrollbar-width": "auto|thin|none",
      "scroll-behavior": "auto|smooth",
      "scroll-margin": "<length>{1,4}",
      "scroll-margin-block": "<length>{1,2}",
      "scroll-margin-block-start": "<length>",
      "scroll-margin-block-end": "<length>",
      "scroll-margin-bottom": "<length>",
      "scroll-margin-inline": "<length>{1,2}",
      "scroll-margin-inline-start": "<length>",
      "scroll-margin-inline-end": "<length>",
      "scroll-margin-left": "<length>",
      "scroll-margin-right": "<length>",
      "scroll-margin-top": "<length>",
      "scroll-padding": "[auto|<length-percentage>]{1,4}",
      "scroll-padding-block": "[auto|<length-percentage>]{1,2}",
      "scroll-padding-block-start": "auto|<length-percentage>",
      "scroll-padding-block-end": "auto|<length-percentage>",
      "scroll-padding-bottom": "auto|<length-percentage>",
      "scroll-padding-inline": "[auto|<length-percentage>]{1,2}",
      "scroll-padding-inline-start": "auto|<length-percentage>",
      "scroll-padding-inline-end": "auto|<length-percentage>",
      "scroll-padding-left": "auto|<length-percentage>",
      "scroll-padding-right": "auto|<length-percentage>",
      "scroll-padding-top": "auto|<length-percentage>",
      "scroll-snap-align": "[none|start|end|center]{1,2}",
      "scroll-snap-coordinate": "none|<position>#",
      "scroll-snap-destination": "<position>",
      "scroll-snap-points-x": "none|repeat( <length-percentage> )",
      "scroll-snap-points-y": "none|repeat( <length-percentage> )",
      "scroll-snap-stop": "normal|always",
      "scroll-snap-type": "none|[x|y|block|inline|both] [mandatory|proximity]?",
      "scroll-snap-type-x": "none|mandatory|proximity",
      "scroll-snap-type-y": "none|mandatory|proximity",
      "scroll-timeline": "[<'scroll-timeline-name'>||<'scroll-timeline-axis'>]#",
      "scroll-timeline-axis": "[block|inline|x|y]#",
      "scroll-timeline-name": "[none|<dashed-ident>]#",
      "shape-image-threshold": "<alpha-value>",
      "shape-margin": "<length-percentage>",
      "shape-outside": "none|[<shape-box>||<basic-shape>]|<image>",
      "shape-rendering": "auto|optimizeSpeed|crispEdges|geometricPrecision",
      "tab-size": "<integer>|<length>",
      "table-layout": "auto|fixed",
      "text-align": "start|end|left|right|center|justify|match-parent",
      "text-align-last": "auto|start|end|left|right|center|justify",
      "text-anchor": "start|middle|end",
      "text-combine-upright": "none|all|[digits <integer>?]",
      "text-decoration": "<'text-decoration-line'>||<'text-decoration-style'>||<'text-decoration-color'>||<'text-decoration-thickness'>",
      "text-decoration-color": "<color>",
      "text-decoration-line": "none|[underline||overline||line-through||blink]|spelling-error|grammar-error",
      "text-decoration-skip": "none|[objects||[spaces|[leading-spaces||trailing-spaces]]||edges||box-decoration]",
      "text-decoration-skip-ink": "auto|all|none",
      "text-decoration-style": "solid|double|dotted|dashed|wavy",
      "text-decoration-thickness": "auto|from-font|<length>|<percentage>",
      "text-emphasis": "<'text-emphasis-style'>||<'text-emphasis-color'>",
      "text-emphasis-color": "<color>",
      "text-emphasis-position": "[over|under]&&[right|left]",
      "text-emphasis-style": "none|[[filled|open]||[dot|circle|double-circle|triangle|sesame]]|<string>",
      "text-indent": "<length-percentage>&&hanging?&&each-line?",
      "text-justify": "auto|inter-character|inter-word|none",
      "text-orientation": "mixed|upright|sideways",
      "text-overflow": "[clip|ellipsis|<string>]{1,2}",
      "text-rendering": "auto|optimizeSpeed|optimizeLegibility|geometricPrecision",
      "text-shadow": "none|<shadow-t>#",
      "text-size-adjust": "none|auto|<percentage>",
      "text-spacing-trim": "space-all|normal|space-first|trim-start|trim-both|trim-all|auto",
      "text-transform": "none|capitalize|uppercase|lowercase|full-width|full-size-kana",
      "text-underline-offset": "auto|<length>|<percentage>",
      "text-underline-position": "auto|from-font|[under||[left|right]]",
      "text-wrap": "wrap|nowrap|balance|stable|pretty",
      "text-wrap-mode": "auto|wrap|nowrap",
      "text-wrap-style": "auto|balance|stable|pretty",
      "timeline-scope": "none|<dashed-ident>#",
      top: "<length>|<percentage>|auto",
      "touch-action": "auto|none|[[pan-x|pan-left|pan-right]||[pan-y|pan-up|pan-down]||pinch-zoom]|manipulation",
      transform: "none|<transform-list>",
      "transform-box": "content-box|border-box|fill-box|stroke-box|view-box",
      "transform-origin": "[<length-percentage>|left|center|right|top|bottom]|[[<length-percentage>|left|center|right]&&[<length-percentage>|top|center|bottom]] <length>?",
      "transform-style": "flat|preserve-3d",
      transition: "<single-transition>#",
      "transition-behavior": "<transition-behavior-value>#",
      "transition-delay": "<time>#",
      "transition-duration": "<time>#",
      "transition-property": "none|<single-transition-property>#",
      "transition-timing-function": "<easing-function>#",
      translate: "none|<length-percentage> [<length-percentage> <length>?]?",
      "unicode-bidi": "normal|embed|isolate|bidi-override|isolate-override|plaintext|-moz-isolate|-moz-isolate-override|-moz-plaintext|-webkit-isolate|-webkit-isolate-override|-webkit-plaintext",
      "user-select": "auto|text|none|contain|all",
      "vector-effect": "none|non-scaling-stroke|non-scaling-size|non-rotation|fixed-position",
      "vertical-align": "baseline|sub|super|text-top|text-bottom|middle|top|bottom|<percentage>|<length>",
      "view-timeline": "[<'view-timeline-name'> <'view-timeline-axis'>?]#",
      "view-timeline-axis": "[block|inline|x|y]#",
      "view-timeline-inset": "[[auto|<length-percentage>]{1,2}]#",
      "view-timeline-name": "none|<dashed-ident>#",
      "view-transition-name": "none|<custom-ident>",
      visibility: "visible|hidden|collapse",
      "white-space": "normal|pre|nowrap|pre-wrap|pre-line|break-spaces|[<'white-space-collapse'>||<'text-wrap'>||<'white-space-trim'>]",
      "white-space-collapse": "collapse|discard|preserve|preserve-breaks|preserve-spaces|break-spaces",
      widows: "<integer>",
      width: "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "will-change": "auto|<animateable-feature>#",
      "word-break": "normal|break-all|keep-all|break-word|auto-phrase",
      "word-spacing": "normal|<length>",
      "word-wrap": "normal|break-word",
      "writing-mode": "horizontal-tb|vertical-rl|vertical-lr|sideways-rl|sideways-lr|<svg-writing-mode>",
      x: "<length>|<percentage>",
      y: "<length>|<percentage>",
      "z-index": "auto|<integer>",
      zoom: "normal|reset|<number>|<percentage>",
      "-moz-background-clip": "padding|border",
      "-moz-border-radius-bottomleft": "<'border-bottom-left-radius'>",
      "-moz-border-radius-bottomright": "<'border-bottom-right-radius'>",
      "-moz-border-radius-topleft": "<'border-top-left-radius'>",
      "-moz-border-radius-topright": "<'border-bottom-right-radius'>",
      "-moz-control-character-visibility": "visible|hidden",
      "-moz-osx-font-smoothing": "auto|grayscale",
      "-moz-user-select": "none|text|all|-moz-none",
      "-ms-flex-align": "start|end|center|baseline|stretch",
      "-ms-flex-item-align": "auto|start|end|center|baseline|stretch",
      "-ms-flex-line-pack": "start|end|center|justify|distribute|stretch",
      "-ms-flex-negative": "<'flex-shrink'>",
      "-ms-flex-pack": "start|end|center|justify|distribute",
      "-ms-flex-order": "<integer>",
      "-ms-flex-positive": "<'flex-grow'>",
      "-ms-flex-preferred-size": "<'flex-basis'>",
      "-ms-interpolation-mode": "nearest-neighbor|bicubic",
      "-ms-grid-column-align": "start|end|center|stretch",
      "-ms-grid-row-align": "start|end|center|stretch",
      "-ms-hyphenate-limit-last": "none|always|column|page|spread",
      "-webkit-background-clip": "[<box>|border|padding|content|text]#",
      "-webkit-column-break-after": "always|auto|avoid",
      "-webkit-column-break-before": "always|auto|avoid",
      "-webkit-column-break-inside": "always|auto|avoid",
      "-webkit-font-smoothing": "auto|none|antialiased|subpixel-antialiased",
      "-webkit-mask-box-image": "[<url>|<gradient>|none] [<length-percentage>{4} <-webkit-mask-box-repeat>{2}]?",
      "-webkit-print-color-adjust": "economy|exact",
      "-webkit-text-security": "none|circle|disc|square",
      "-webkit-user-drag": "none|element|auto",
      "-webkit-user-select": "auto|none|text|all",
      "alignment-baseline": "auto|baseline|before-edge|text-before-edge|middle|central|after-edge|text-after-edge|ideographic|alphabetic|hanging|mathematical",
      "baseline-shift": "baseline|sub|super|<svg-length>",
      behavior: "<url>+",
      cue: "<'cue-before'> <'cue-after'>?",
      "cue-after": "<url> <decibel>?|none",
      "cue-before": "<url> <decibel>?|none",
      "glyph-orientation-horizontal": "<angle>",
      "glyph-orientation-vertical": "<angle>",
      kerning: "auto|<svg-length>",
      pause: "<'pause-before'> <'pause-after'>?",
      "pause-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
      "pause-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
      rest: "<'rest-before'> <'rest-after'>?",
      "rest-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
      "rest-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
      src: "[<url> [format( <string># )]?|local( <family-name> )]#",
      speak: "auto|never|always",
      "speak-as": "normal|spell-out||digits||[literal-punctuation|no-punctuation]",
      stroke: "<paint>",
      "stroke-dasharray": "none|[<svg-length>+]#",
      "stroke-dashoffset": "<svg-length>",
      "stroke-linecap": "butt|round|square",
      "stroke-linejoin": "miter|round|bevel",
      "stroke-miterlimit": "<number-one-or-greater>",
      "stroke-opacity": "<number-zero-one>",
      "stroke-width": "<svg-length>",
      "unicode-range": "<urange>#",
      "voice-balance": "<number>|left|center|right|leftwards|rightwards",
      "voice-duration": "auto|<time>",
      "voice-family": "[[<family-name>|<generic-voice>] ,]* [<family-name>|<generic-voice>]|preserve",
      "voice-pitch": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
      "voice-range": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
      "voice-rate": "[normal|x-slow|slow|medium|fast|x-fast]||<percentage>",
      "voice-stress": "normal|strong|moderate|none|reduced",
      "voice-volume": "silent|[[x-soft|soft|medium|loud|x-loud]||<decibel>]",
      "white-space-trim": "none|discard-before||discard-after||discard-inner",
      "position-area": "none|<position-area>"
    },
    atrules: {
      charset: {
        prelude: "<string>",
        descriptors: null
      },
      "counter-style": {
        prelude: "<counter-style-name>",
        descriptors: {
          "additive-symbols": "[<integer>&&<symbol>]#",
          fallback: "<counter-style-name>",
          negative: "<symbol> <symbol>?",
          pad: "<integer>&&<symbol>",
          prefix: "<symbol>",
          range: "[[<integer>|infinite]{2}]#|auto",
          "speak-as": "auto|bullets|numbers|words|spell-out|<counter-style-name>",
          suffix: "<symbol>",
          symbols: "<symbol>+",
          system: "cyclic|numeric|alphabetic|symbolic|additive|[fixed <integer>?]|[extends <counter-style-name>]"
        }
      },
      document: {
        prelude: "[<url>|url-prefix( <string> )|domain( <string> )|media-document( <string> )|regexp( <string> )]#",
        descriptors: null
      },
      "font-palette-values": {
        prelude: "<dashed-ident>",
        descriptors: {
          "base-palette": "light|dark|<integer [0,∞]>",
          "font-family": "<family-name>#",
          "override-colors": "[<integer [0,∞]> <absolute-color-base>]#"
        }
      },
      "font-face": {
        prelude: null,
        descriptors: {
          "ascent-override": "normal|<percentage>",
          "descent-override": "normal|<percentage>",
          "font-display": "[auto|block|swap|fallback|optional]",
          "font-family": "<family-name>",
          "font-feature-settings": "normal|<feature-tag-value>#",
          "font-variation-settings": "normal|[<string> <number>]#",
          "font-stretch": "<font-stretch-absolute>{1,2}",
          "font-style": "normal|italic|oblique <angle>{0,2}",
          "font-weight": "<font-weight-absolute>{1,2}",
          "line-gap-override": "normal|<percentage>",
          "size-adjust": "<percentage>",
          src: "[<url> [format( <string># )]?|local( <family-name> )]#",
          "unicode-range": "<urange>#"
        }
      },
      "font-feature-values": {
        prelude: "<family-name>#",
        descriptors: null
      },
      import: {
        prelude: "[<string>|<url>] [layer|layer( <layer-name> )]? [supports( [<supports-condition>|<declaration>] )]? <media-query-list>?",
        descriptors: null
      },
      keyframes: {
        prelude: "<keyframes-name>",
        descriptors: null
      },
      layer: {
        prelude: "[<layer-name>#|<layer-name>?]",
        descriptors: null
      },
      media: {
        prelude: "<media-query-list>",
        descriptors: null
      },
      namespace: {
        prelude: "<namespace-prefix>? [<string>|<url>]",
        descriptors: null
      },
      page: {
        prelude: "<page-selector-list>",
        descriptors: {
          bleed: "auto|<length>",
          marks: "none|[crop||cross]",
          "page-orientation": "upright|rotate-left|rotate-right",
          size: "<length>{1,2}|auto|[<page-size>||[portrait|landscape]]"
        }
      },
      "position-try": {
        prelude: "<dashed-ident>",
        descriptors: {
          top: "<'top'>",
          left: "<'left'>",
          bottom: "<'bottom'>",
          right: "<'right'>",
          "inset-block-start": "<'inset-block-start'>",
          "inset-block-end": "<'inset-block-end'>",
          "inset-inline-start": "<'inset-inline-start'>",
          "inset-inline-end": "<'inset-inline-end'>",
          "inset-block": "<'inset-block'>",
          "inset-inline": "<'inset-inline'>",
          inset: "<'inset'>",
          "margin-top": "<'margin-top'>",
          "margin-left": "<'margin-left'>",
          "margin-bottom": "<'margin-bottom'>",
          "margin-right": "<'margin-right'>",
          "margin-block-start": "<'margin-block-start'>",
          "margin-block-end": "<'margin-block-end'>",
          "margin-inline-start": "<'margin-inline-start'>",
          "margin-inline-end": "<'margin-inline-end'>",
          margin: "<'margin'>",
          "margin-block": "<'margin-block'>",
          "margin-inline": "<'margin-inline'>",
          width: "<'width'>",
          height: "<'height'>",
          "min-width": "<'min-width'>",
          "min-height": "<'min-height'>",
          "max-width": "<'max-width'>",
          "max-height": "<'max-height'>",
          "block-size": "<'block-size'>",
          "inline-size": "<'inline-size'>",
          "min-block-size": "<'min-block-size'>",
          "min-inline-size": "<'min-inline-size'>",
          "max-block-size": "<'max-block-size'>",
          "max-inline-size": "<'max-inline-size'>",
          "align-self": "<'align-self'>|anchor-center",
          "justify-self": "<'justify-self'>|anchor-center"
        }
      },
      property: {
        prelude: "<custom-property-name>",
        descriptors: {
          syntax: "<string>",
          inherits: "true|false",
          "initial-value": "<declaration-value>?"
        }
      },
      scope: {
        prelude: "[( <scope-start> )]? [to ( <scope-end> )]?",
        descriptors: null
      },
      "starting-style": {
        prelude: null,
        descriptors: null
      },
      supports: {
        prelude: "<supports-condition>",
        descriptors: null
      },
      container: {
        prelude: "[<container-name>]? <container-condition>",
        descriptors: null
      },
      nest: {
        prelude: "<complex-selector-list>",
        descriptors: null
      }
    }
  }, Ee = 43, he = 45, Kt = 110, Ge = !0, tu = !1;
  function Yt(e, t) {
    let n = this.tokenStart + e;
    const r = this.charCodeAt(n);
    for ((r === Ee || r === he) && (t && this.error("Number sign is not allowed"), n++); n < this.tokenEnd; n++)
      Q(this.charCodeAt(n)) || this.error("Integer is expected", n);
  }
  function st(e) {
    return Yt.call(this, 0, e);
  }
  function Me(e, t) {
    if (!this.cmpChar(this.tokenStart + e, t)) {
      let n = "";
      switch (t) {
        case Kt:
          n = "N is expected";
          break;
        case he:
          n = "HyphenMinus is expected";
          break;
      }
      this.error(n, this.tokenStart + e);
    }
  }
  function jn() {
    let e = 0, t = 0, n = this.tokenType;
    for (; n === W || n === X; )
      n = this.lookupType(++e);
    if (n !== L)
      if (this.isDelim(Ee, e) || this.isDelim(he, e)) {
        t = this.isDelim(Ee, e) ? Ee : he;
        do
          n = this.lookupType(++e);
        while (n === W || n === X);
        n !== L && (this.skip(e), st.call(this, Ge));
      } else
        return null;
    return e > 0 && this.skip(e), t === 0 && (n = this.charCodeAt(this.tokenStart), n !== Ee && n !== he && this.error("Number sign is expected")), st.call(this, t !== 0), t === he ? "-" + this.consume(L) : this.consume(L);
  }
  const nu = "AnPlusB", ru = {
    a: [String, null],
    b: [String, null]
  };
  function Qo() {
    const e = this.tokenStart;
    let t = null, n = null;
    if (this.tokenType === L)
      st.call(this, tu), n = this.consume(L);
    else if (this.tokenType === y && this.cmpChar(this.tokenStart, he))
      switch (t = "-1", Me.call(this, 1, Kt), this.tokenEnd - this.tokenStart) {
        case 2:
          this.next(), n = jn.call(this);
          break;
        case 3:
          Me.call(this, 2, he), this.next(), this.skipSC(), st.call(this, Ge), n = "-" + this.consume(L);
          break;
        default:
          Me.call(this, 2, he), Yt.call(this, 3, Ge), this.next(), n = this.substrToCursor(e + 2);
      }
    else if (this.tokenType === y || this.isDelim(Ee) && this.lookupType(1) === y) {
      let r = 0;
      switch (t = "1", this.isDelim(Ee) && (r = 1, this.next()), Me.call(this, 0, Kt), this.tokenEnd - this.tokenStart) {
        case 1:
          this.next(), n = jn.call(this);
          break;
        case 2:
          Me.call(this, 1, he), this.next(), this.skipSC(), st.call(this, Ge), n = "-" + this.consume(L);
          break;
        default:
          Me.call(this, 1, he), Yt.call(this, 2, Ge), this.next(), n = this.substrToCursor(e + r + 1);
      }
    } else if (this.tokenType === z) {
      const r = this.charCodeAt(this.tokenStart), i = r === Ee || r === he;
      let o = this.tokenStart + i;
      for (; o < this.tokenEnd && Q(this.charCodeAt(o)); o++)
        ;
      o === this.tokenStart + i && this.error("Integer is expected", this.tokenStart + i), Me.call(this, o - this.tokenStart, Kt), t = this.substring(e, o), o + 1 === this.tokenEnd ? (this.next(), n = jn.call(this)) : (Me.call(this, o - this.tokenStart + 1, he), o + 2 === this.tokenEnd ? (this.next(), this.skipSC(), st.call(this, Ge), n = "-" + this.consume(L)) : (Yt.call(this, o - this.tokenStart + 2, Ge), this.next(), n = this.substrToCursor(o + 1)));
    } else
      this.error();
    return t !== null && t.charCodeAt(0) === Ee && (t = t.substr(1)), n !== null && n.charCodeAt(0) === Ee && (n = n.substr(1)), {
      type: "AnPlusB",
      loc: this.getLocation(e, this.tokenStart),
      a: t,
      b: n
    };
  }
  function iu(e) {
    if (e.a) {
      const t = e.a === "+1" && "n" || e.a === "1" && "n" || e.a === "-1" && "-n" || e.a + "n";
      if (e.b) {
        const n = e.b[0] === "-" || e.b[0] === "+" ? e.b : "+" + e.b;
        this.tokenize(t + n);
      } else
        this.tokenize(t);
    } else
      this.tokenize(e.b);
  }
  const ou = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: iu,
    name: nu,
    parse: Qo,
    structure: ru
  }, Symbol.toStringTag, { value: "Module" }));
  function Ai() {
    return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon, !0);
  }
  function su() {
    for (let e = 1, t; t = this.lookupType(e); e++) {
      if (t === ue)
        return !0;
      if (t === V || t === G)
        return !1;
    }
    return !1;
  }
  const au = "Atrule", lu = "atrule", cu = {
    name: String,
    prelude: ["AtrulePrelude", "Raw", null],
    block: ["Block", null]
  };
  function Xo(e = !1) {
    const t = this.tokenStart;
    let n, r, i = null, o = null;
    switch (this.eat(G), n = this.substrToCursor(t + 1), r = n.toLowerCase(), this.skipSC(), this.eof === !1 && this.tokenType !== V && this.tokenType !== re && (this.parseAtrulePrelude ? i = this.parseWithFallback(this.AtrulePrelude.bind(this, n, e), Ai) : i = Ai.call(this, this.tokenIndex), this.skipSC()), this.tokenType) {
      case re:
        this.next();
        break;
      case V:
        this.eat(V), hasOwnProperty.call(this.atrule, r) && typeof this.atrule[r].block == "function" ? o = this.atrule[r].block.call(this, e) : o = this.Block(su.call(this)), this.eof || this.eat(ue);
        break;
    }
    return {
      type: "Atrule",
      loc: this.getLocation(t, this.tokenStart),
      name: n,
      prelude: i,
      block: o
    };
  }
  function uu(e) {
    this.token(G, "@" + e.name), e.prelude !== null && this.node(e.prelude), e.block ? (this.token(V, "{"), this.node(e.block), this.token(ue, "}")) : this.token(re, ";");
  }
  const hu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: uu,
    name: au,
    parse: Xo,
    structure: cu,
    walkContext: lu
  }, Symbol.toStringTag, { value: "Module" })), pu = "AtrulePrelude", fu = "atrulePrelude", du = {
    children: [[]]
  };
  function Zo(e) {
    let t = null;
    return e !== null && (e = e.toLowerCase()), this.skipSC(), hasOwnProperty.call(this.atrule, e) && typeof this.atrule[e].prelude == "function" ? t = this.atrule[e].prelude.call(this) : t = this.readSequence(this.scope.AtrulePrelude), this.skipSC(), this.eof !== !0 && this.tokenType !== V && this.tokenType !== re && this.error("Semicolon or block is expected"), {
      type: "AtrulePrelude",
      loc: this.getLocationFromList(t),
      children: t
    };
  }
  function mu(e) {
    this.children(e);
  }
  const gu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: mu,
    name: pu,
    parse: Zo,
    structure: du,
    walkContext: fu
  }, Symbol.toStringTag, { value: "Module" })), bu = 36, Jo = 42, Qt = 61, yu = 94, rr = 124, ku = 126;
  function xu() {
    this.eof && this.error("Unexpected end of input");
    const e = this.tokenStart;
    let t = !1;
    return this.isDelim(Jo) ? (t = !0, this.next()) : this.isDelim(rr) || this.eat(y), this.isDelim(rr) ? this.charCodeAt(this.tokenStart + 1) !== Qt ? (this.next(), this.eat(y)) : t && this.error("Identifier is expected", this.tokenEnd) : t && this.error("Vertical line is expected"), {
      type: "Identifier",
      loc: this.getLocation(e, this.tokenStart),
      name: this.substrToCursor(e)
    };
  }
  function wu() {
    const e = this.tokenStart, t = this.charCodeAt(e);
    return t !== Qt && // =
    t !== ku && // ~=
    t !== yu && // ^=
    t !== bu && // $=
    t !== Jo && // *=
    t !== rr && this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"), this.next(), t !== Qt && (this.isDelim(Qt) || this.error("Equal sign is expected"), this.next()), this.substrToCursor(e);
  }
  const vu = "AttributeSelector", Su = {
    name: "Identifier",
    matcher: [String, null],
    value: ["String", "Identifier", null],
    flags: [String, null]
  };
  function es() {
    const e = this.tokenStart;
    let t, n = null, r = null, i = null;
    return this.eat(fe), this.skipSC(), t = xu.call(this), this.skipSC(), this.tokenType !== Se && (this.tokenType !== y && (n = wu.call(this), this.skipSC(), r = this.tokenType === Te ? this.String() : this.Identifier(), this.skipSC()), this.tokenType === y && (i = this.consume(y), this.skipSC())), this.eat(Se), {
      type: "AttributeSelector",
      loc: this.getLocation(e, this.tokenStart),
      name: t,
      matcher: n,
      value: r,
      flags: i
    };
  }
  function Cu(e) {
    this.token(I, "["), this.node(e.name), e.matcher !== null && (this.tokenize(e.matcher), this.node(e.value)), e.flags !== null && this.token(y, e.flags), this.token(I, "]");
  }
  const Tu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Cu,
    name: vu,
    parse: es,
    structure: Su
  }, Symbol.toStringTag, { value: "Module" })), Au = 38;
  function ts() {
    return this.Raw(null, !0);
  }
  function Oi() {
    return this.parseWithFallback(this.Rule, ts);
  }
  function Ei() {
    return this.Raw(this.consumeUntilSemicolonIncluded, !0);
  }
  function Ou() {
    if (this.tokenType === re)
      return Ei.call(this, this.tokenIndex);
    const e = this.parseWithFallback(this.Declaration, Ei);
    return this.tokenType === re && this.next(), e;
  }
  const Eu = "Block", Lu = "block", $u = {
    children: [[
      "Atrule",
      "Rule",
      "Declaration"
    ]]
  };
  function ns(e) {
    const t = e ? Ou : Oi, n = this.tokenStart;
    let r = this.createList();
    e:
      for (; !this.eof; )
        switch (this.tokenType) {
          case ue:
            break e;
          case W:
          case X:
            this.next();
            break;
          case G:
            r.push(this.parseWithFallback(this.Atrule.bind(this, e), ts));
            break;
          default:
            e && this.isDelim(Au) ? r.push(Oi.call(this)) : r.push(t.call(this));
        }
    return {
      type: "Block",
      loc: this.getLocation(n, this.tokenStart),
      children: r
    };
  }
  function _u(e) {
    this.children(e, (t) => {
      t.type === "Declaration" && this.token(re, ";");
    });
  }
  const Pu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: _u,
    name: Eu,
    parse: ns,
    structure: $u,
    walkContext: Lu
  }, Symbol.toStringTag, { value: "Module" })), zu = "Brackets", Iu = {
    children: [[]]
  };
  function rs(e, t) {
    const n = this.tokenStart;
    let r = null;
    return this.eat(fe), r = e.call(this, t), this.eof || this.eat(Se), {
      type: "Brackets",
      loc: this.getLocation(n, this.tokenStart),
      children: r
    };
  }
  function Ru(e) {
    this.token(I, "["), this.children(e), this.token(I, "]");
  }
  const Mu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Ru,
    name: zu,
    parse: rs,
    structure: Iu
  }, Symbol.toStringTag, { value: "Module" })), Nu = "CDC", Du = [];
  function is() {
    const e = this.tokenStart;
    return this.eat(ae), {
      type: "CDC",
      loc: this.getLocation(e, this.tokenStart)
    };
  }
  function ju() {
    this.token(ae, "-->");
  }
  const Fu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: ju,
    name: Nu,
    parse: is,
    structure: Du
  }, Symbol.toStringTag, { value: "Module" })), Bu = "CDO", Wu = [];
  function os() {
    const e = this.tokenStart;
    return this.eat(Rt), {
      type: "CDO",
      loc: this.getLocation(e, this.tokenStart)
    };
  }
  function Hu() {
    this.token(Rt, "<!--");
  }
  const Uu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Hu,
    name: Bu,
    parse: os,
    structure: Wu
  }, Symbol.toStringTag, { value: "Module" })), qu = 46, Gu = "ClassSelector", Vu = {
    name: String
  };
  function ss() {
    return this.eatDelim(qu), {
      type: "ClassSelector",
      loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
      name: this.consume(y)
    };
  }
  function Ku(e) {
    this.token(I, "."), this.token(y, e.name);
  }
  const Yu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Ku,
    name: Gu,
    parse: ss,
    structure: Vu
  }, Symbol.toStringTag, { value: "Module" })), Qu = 43, Li = 47, Xu = 62, Zu = 126, Ju = "Combinator", eh = {
    name: String
  };
  function as() {
    const e = this.tokenStart;
    let t;
    switch (this.tokenType) {
      case W:
        t = " ";
        break;
      case I:
        switch (this.charCodeAt(this.tokenStart)) {
          case Xu:
          case Qu:
          case Zu:
            this.next();
            break;
          case Li:
            this.next(), this.eatIdent("deep"), this.eatDelim(Li);
            break;
          default:
            this.error("Combinator is expected");
        }
        t = this.substrToCursor(e);
        break;
    }
    return {
      type: "Combinator",
      loc: this.getLocation(e, this.tokenStart),
      name: t
    };
  }
  function th(e) {
    this.tokenize(e.name);
  }
  const nh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: th,
    name: Ju,
    parse: as,
    structure: eh
  }, Symbol.toStringTag, { value: "Module" })), rh = 42, ih = 47, oh = "Comment", sh = {
    value: String
  };
  function ls() {
    const e = this.tokenStart;
    let t = this.tokenEnd;
    return this.eat(X), t - e + 2 >= 2 && this.charCodeAt(t - 2) === rh && this.charCodeAt(t - 1) === ih && (t -= 2), {
      type: "Comment",
      loc: this.getLocation(e, this.tokenStart),
      value: this.substring(e + 2, t)
    };
  }
  function ah(e) {
    this.token(X, "/*" + e.value + "*/");
  }
  const lh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: ah,
    name: oh,
    parse: ls,
    structure: sh
  }, Symbol.toStringTag, { value: "Module" })), ch = /* @__PURE__ */ new Set([ne, E, De]), uh = "Condition", hh = {
    kind: String,
    children: [[
      "Identifier",
      "Feature",
      "FeatureFunction",
      "FeatureRange",
      "SupportsDeclaration"
    ]]
  };
  function $i(e) {
    return this.lookupTypeNonSC(1) === y && ch.has(this.lookupTypeNonSC(2)) ? this.Feature(e) : this.FeatureRange(e);
  }
  const ph = {
    media: $i,
    container: $i,
    supports() {
      return this.SupportsDeclaration();
    }
  };
  function cs(e = "media") {
    const t = this.createList();
    e: for (; !this.eof; )
      switch (this.tokenType) {
        case X:
        case W:
          this.next();
          continue;
        case y:
          t.push(this.Identifier());
          break;
        case M: {
          let n = this.parseWithFallback(
            () => ph[e].call(this, e),
            () => null
          );
          n || (n = this.parseWithFallback(
            () => {
              this.eat(M);
              const r = this.Condition(e);
              return this.eat(E), r;
            },
            () => this.GeneralEnclosed(e)
          )), t.push(n);
          break;
        }
        case $: {
          let n = this.parseWithFallback(
            () => this.FeatureFunction(e),
            () => null
          );
          n || (n = this.GeneralEnclosed(e)), t.push(n);
          break;
        }
        default:
          break e;
      }
    return t.isEmpty && this.error("Condition is expected"), {
      type: "Condition",
      loc: this.getLocationFromList(t),
      kind: e,
      children: t
    };
  }
  function fh(e) {
    e.children.forEach((t) => {
      t.type === "Condition" ? (this.token(M, "("), this.node(t), this.token(E, ")")) : this.node(t);
    });
  }
  const dh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: fh,
    name: uh,
    parse: cs,
    structure: hh
  }, Symbol.toStringTag, { value: "Module" })), us = 33, mh = 35, gh = 36, bh = 38, yh = 42, kh = 43, _i = 47;
  function xh() {
    return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, !0);
  }
  function wh() {
    return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, !1);
  }
  function vh() {
    const e = this.tokenIndex, t = this.Value();
    return t.type !== "Raw" && this.eof === !1 && this.tokenType !== re && this.isDelim(us) === !1 && this.isBalanceEdge(e) === !1 && this.error(), t;
  }
  const Sh = "Declaration", Ch = "declaration", Th = {
    important: [Boolean, String],
    property: String,
    value: ["Value", "Raw"]
  };
  function hs() {
    const e = this.tokenStart, t = this.tokenIndex, n = Oh.call(this), r = Cr(n), i = r ? this.parseCustomProperty : this.parseValue, o = r ? wh : xh;
    let s = !1, c;
    this.skipSC(), this.eat(ne);
    const l = this.tokenIndex;
    if (r || this.skipSC(), i ? c = this.parseWithFallback(vh, o) : c = o.call(this, this.tokenIndex), r && c.type === "Value" && c.children.isEmpty) {
      for (let a = l - this.tokenIndex; a <= 0; a++)
        if (this.lookupType(a) === W) {
          c.children.appendData({
            type: "WhiteSpace",
            loc: null,
            value: " "
          });
          break;
        }
    }
    return this.isDelim(us) && (s = Eh.call(this), this.skipSC()), this.eof === !1 && this.tokenType !== re && this.isBalanceEdge(t) === !1 && this.error(), {
      type: "Declaration",
      loc: this.getLocation(e, this.tokenStart),
      important: s,
      property: n,
      value: c
    };
  }
  function Ah(e) {
    this.token(y, e.property), this.token(ne, ":"), this.node(e.value), e.important && (this.token(I, "!"), this.token(y, e.important === !0 ? "important" : e.important));
  }
  function Oh() {
    const e = this.tokenStart;
    if (this.tokenType === I)
      switch (this.charCodeAt(this.tokenStart)) {
        case yh:
        case gh:
        case kh:
        case mh:
        case bh:
          this.next();
          break;
        case _i:
          this.next(), this.isDelim(_i) && this.next();
          break;
      }
    return this.tokenType === F ? this.eat(F) : this.eat(y), this.substrToCursor(e);
  }
  function Eh() {
    this.eat(I), this.skipSC();
    const e = this.consume(y);
    return e === "important" ? !0 : e;
  }
  const Lh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Ah,
    name: Sh,
    parse: hs,
    structure: Th,
    walkContext: Ch
  }, Symbol.toStringTag, { value: "Module" })), $h = 38;
  function Fn() {
    return this.Raw(this.consumeUntilSemicolonIncluded, !0);
  }
  const _h = "DeclarationList", Ph = {
    children: [[
      "Declaration",
      "Atrule",
      "Rule"
    ]]
  };
  function ps() {
    const e = this.createList();
    for (; !this.eof; )
      switch (this.tokenType) {
        case W:
        case X:
        case re:
          this.next();
          break;
        case G:
          e.push(this.parseWithFallback(this.Atrule.bind(this, !0), Fn));
          break;
        default:
          this.isDelim($h) ? e.push(this.parseWithFallback(this.Rule, Fn)) : e.push(this.parseWithFallback(this.Declaration, Fn));
      }
    return {
      type: "DeclarationList",
      loc: this.getLocationFromList(e),
      children: e
    };
  }
  function zh(e) {
    this.children(e, (t) => {
      t.type === "Declaration" && this.token(re, ";");
    });
  }
  const Ih = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: zh,
    name: _h,
    parse: ps,
    structure: Ph
  }, Symbol.toStringTag, { value: "Module" })), Rh = "Dimension", Mh = {
    value: String,
    unit: String
  };
  function fs() {
    const e = this.tokenStart, t = this.consumeNumber(z);
    return {
      type: "Dimension",
      loc: this.getLocation(e, this.tokenStart),
      value: t,
      unit: this.substring(e + t.length, this.tokenStart)
    };
  }
  function Nh(e) {
    this.token(z, e.value + e.unit);
  }
  const Dh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Nh,
    name: Rh,
    parse: fs,
    structure: Mh
  }, Symbol.toStringTag, { value: "Module" })), jh = 47, Fh = "Feature", Bh = {
    kind: String,
    name: String,
    value: ["Identifier", "Number", "Dimension", "Ratio", "Function", null]
  };
  function ds(e) {
    const t = this.tokenStart;
    let n, r = null;
    if (this.eat(M), this.skipSC(), n = this.consume(y), this.skipSC(), this.tokenType !== E) {
      switch (this.eat(ne), this.skipSC(), this.tokenType) {
        case L:
          this.lookupNonWSType(1) === I ? r = this.Ratio() : r = this.Number();
          break;
        case z:
          r = this.Dimension();
          break;
        case y:
          r = this.Identifier();
          break;
        case $:
          r = this.parseWithFallback(
            () => {
              const i = this.Function(this.readSequence, this.scope.Value);
              return this.skipSC(), this.isDelim(jh) && this.error(), i;
            },
            () => this.Ratio()
          );
          break;
        default:
          this.error("Number, dimension, ratio or identifier is expected");
      }
      this.skipSC();
    }
    return this.eof || this.eat(E), {
      type: "Feature",
      loc: this.getLocation(t, this.tokenStart),
      kind: e,
      name: n,
      value: r
    };
  }
  function Wh(e) {
    this.token(M, "("), this.token(y, e.name), e.value !== null && (this.token(ne, ":"), this.node(e.value)), this.token(E, ")");
  }
  const Hh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Wh,
    name: Fh,
    parse: ds,
    structure: Bh
  }, Symbol.toStringTag, { value: "Module" })), Uh = "FeatureFunction", qh = {
    kind: String,
    feature: String,
    value: ["Declaration", "Selector"]
  };
  function Gh(e, t) {
    const r = (this.features[e] || {})[t];
    return typeof r != "function" && this.error(`Unknown feature ${t}()`), r;
  }
  function ms(e = "unknown") {
    const t = this.tokenStart, n = this.consumeFunctionName(), r = Gh.call(this, e, n.toLowerCase());
    this.skipSC();
    const i = this.parseWithFallback(
      () => {
        const o = this.tokenIndex, s = r.call(this);
        return this.eof === !1 && this.isBalanceEdge(o) === !1 && this.error(), s;
      },
      () => this.Raw(null, !1)
    );
    return this.eof || this.eat(E), {
      type: "FeatureFunction",
      loc: this.getLocation(t, this.tokenStart),
      kind: e,
      feature: n,
      value: i
    };
  }
  function Vh(e) {
    this.token($, e.feature + "("), this.node(e.value), this.token(E, ")");
  }
  const Kh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Vh,
    name: Uh,
    parse: ms,
    structure: qh
  }, Symbol.toStringTag, { value: "Module" })), Pi = 47, Yh = 60, zi = 61, Qh = 62, Xh = "FeatureRange", Zh = {
    kind: String,
    left: ["Identifier", "Number", "Dimension", "Ratio", "Function"],
    leftComparison: String,
    middle: ["Identifier", "Number", "Dimension", "Ratio", "Function"],
    rightComparison: [String, null],
    right: ["Identifier", "Number", "Dimension", "Ratio", "Function", null]
  };
  function Bn() {
    switch (this.skipSC(), this.tokenType) {
      case L:
        return this.isDelim(Pi, this.lookupOffsetNonSC(1)) ? this.Ratio() : this.Number();
      case z:
        return this.Dimension();
      case y:
        return this.Identifier();
      case $:
        return this.parseWithFallback(
          () => {
            const e = this.Function(this.readSequence, this.scope.Value);
            return this.skipSC(), this.isDelim(Pi) && this.error(), e;
          },
          () => this.Ratio()
        );
      default:
        this.error("Number, dimension, ratio or identifier is expected");
    }
  }
  function Ii(e) {
    if (this.skipSC(), this.isDelim(Yh) || this.isDelim(Qh)) {
      const t = this.source[this.tokenStart];
      return this.next(), this.isDelim(zi) ? (this.next(), t + "=") : t;
    }
    if (this.isDelim(zi))
      return "=";
    this.error(`Expected ${e ? '":", ' : ""}"<", ">", "=" or ")"`);
  }
  function gs(e = "unknown") {
    const t = this.tokenStart;
    this.skipSC(), this.eat(M);
    const n = Bn.call(this), r = Ii.call(this, n.type === "Identifier"), i = Bn.call(this);
    let o = null, s = null;
    return this.lookupNonWSType(0) !== E && (o = Ii.call(this), s = Bn.call(this)), this.skipSC(), this.eat(E), {
      type: "FeatureRange",
      loc: this.getLocation(t, this.tokenStart),
      kind: e,
      left: n,
      leftComparison: r,
      middle: i,
      rightComparison: o,
      right: s
    };
  }
  function Jh(e) {
    this.token(M, "("), this.node(e.left), this.tokenize(e.leftComparison), this.node(e.middle), e.right && (this.tokenize(e.rightComparison), this.node(e.right)), this.token(E, ")");
  }
  const ep = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Jh,
    name: Xh,
    parse: gs,
    structure: Zh
  }, Symbol.toStringTag, { value: "Module" })), tp = "Function", np = "function", rp = {
    name: String,
    children: [[]]
  };
  function bs(e, t) {
    const n = this.tokenStart, r = this.consumeFunctionName(), i = r.toLowerCase();
    let o;
    return o = t.hasOwnProperty(i) ? t[i].call(this, t) : e.call(this, t), this.eof || this.eat(E), {
      type: "Function",
      loc: this.getLocation(n, this.tokenStart),
      name: r,
      children: o
    };
  }
  function ip(e) {
    this.token($, e.name + "("), this.children(e), this.token(E, ")");
  }
  const op = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: ip,
    name: tp,
    parse: bs,
    structure: rp,
    walkContext: np
  }, Symbol.toStringTag, { value: "Module" })), sp = "GeneralEnclosed", ap = {
    kind: String,
    function: [String, null],
    children: [[]]
  };
  function ys(e) {
    const t = this.tokenStart;
    let n = null;
    this.tokenType === $ ? n = this.consumeFunctionName() : this.eat(M);
    const r = this.parseWithFallback(
      () => {
        const i = this.tokenIndex, o = this.readSequence(this.scope.Value);
        return this.eof === !1 && this.isBalanceEdge(i) === !1 && this.error(), o;
      },
      () => this.createSingleNodeList(
        this.Raw(null, !1)
      )
    );
    return this.eof || this.eat(E), {
      type: "GeneralEnclosed",
      loc: this.getLocation(t, this.tokenStart),
      kind: e,
      function: n,
      children: r
    };
  }
  function lp(e) {
    e.function ? this.token($, e.function + "(") : this.token(M, "("), this.children(e), this.token(E, ")");
  }
  const cp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: lp,
    name: sp,
    parse: ys,
    structure: ap
  }, Symbol.toStringTag, { value: "Module" })), up = "XXX", hp = "Hash", pp = {
    value: String
  };
  function ks() {
    const e = this.tokenStart;
    return this.eat(F), {
      type: "Hash",
      loc: this.getLocation(e, this.tokenStart),
      value: this.substrToCursor(e + 1)
    };
  }
  function fp(e) {
    this.token(F, "#" + e.value);
  }
  const dp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: fp,
    name: hp,
    parse: ks,
    structure: pp,
    xxx: up
  }, Symbol.toStringTag, { value: "Module" })), mp = "Identifier", gp = {
    name: String
  };
  function xs() {
    return {
      type: "Identifier",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      name: this.consume(y)
    };
  }
  function bp(e) {
    this.token(y, e.name);
  }
  const yp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: bp,
    name: mp,
    parse: xs,
    structure: gp
  }, Symbol.toStringTag, { value: "Module" })), kp = "IdSelector", xp = {
    name: String
  };
  function ws() {
    const e = this.tokenStart;
    return this.eat(F), {
      type: "IdSelector",
      loc: this.getLocation(e, this.tokenStart),
      name: this.substrToCursor(e + 1)
    };
  }
  function wp(e) {
    this.token(I, "#" + e.name);
  }
  const vp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: wp,
    name: kp,
    parse: ws,
    structure: xp
  }, Symbol.toStringTag, { value: "Module" })), Sp = 46, Cp = "Layer", Tp = {
    name: String
  };
  function vs() {
    let e = this.consume(y);
    for (; this.isDelim(Sp); )
      this.eat(I), e += "." + this.consume(y);
    return {
      type: "Layer",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      name: e
    };
  }
  function Ap(e) {
    this.tokenize(e.name);
  }
  const Op = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Ap,
    name: Cp,
    parse: vs,
    structure: Tp
  }, Symbol.toStringTag, { value: "Module" })), Ep = "LayerList", Lp = {
    children: [[
      "Layer"
    ]]
  };
  function Ss() {
    const e = this.createList();
    for (this.skipSC(); !this.eof && (e.push(this.Layer()), this.lookupTypeNonSC(0) === ce); )
      this.skipSC(), this.next(), this.skipSC();
    return {
      type: "LayerList",
      loc: this.getLocationFromList(e),
      children: e
    };
  }
  function $p(e) {
    this.children(e, () => this.token(ce, ","));
  }
  const _p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: $p,
    name: Ep,
    parse: Ss,
    structure: Lp
  }, Symbol.toStringTag, { value: "Module" })), Pp = "MediaQuery", zp = {
    modifier: [String, null],
    mediaType: [String, null],
    condition: ["Condition", null]
  };
  function Cs() {
    const e = this.tokenStart;
    let t = null, n = null, r = null;
    if (this.skipSC(), this.tokenType === y && this.lookupTypeNonSC(1) !== M) {
      const i = this.consume(y), o = i.toLowerCase();
      switch (o === "not" || o === "only" ? (this.skipSC(), t = o, n = this.consume(y)) : n = i, this.lookupTypeNonSC(0)) {
        case y: {
          this.skipSC(), this.eatIdent("and"), r = this.Condition("media");
          break;
        }
        case V:
        case re:
        case ce:
        case De:
          break;
        default:
          this.error("Identifier or parenthesis is expected");
      }
    } else
      switch (this.tokenType) {
        case y:
        case M:
        case $: {
          r = this.Condition("media");
          break;
        }
        case V:
        case re:
        case De:
          break;
        default:
          this.error("Identifier or parenthesis is expected");
      }
    return {
      type: "MediaQuery",
      loc: this.getLocation(e, this.tokenStart),
      modifier: t,
      mediaType: n,
      condition: r
    };
  }
  function Ip(e) {
    e.mediaType ? (e.modifier && this.token(y, e.modifier), this.token(y, e.mediaType), e.condition && (this.token(y, "and"), this.node(e.condition))) : e.condition && this.node(e.condition);
  }
  const Rp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Ip,
    name: Pp,
    parse: Cs,
    structure: zp
  }, Symbol.toStringTag, { value: "Module" })), Mp = "MediaQueryList", Np = {
    children: [[
      "MediaQuery"
    ]]
  };
  function Ts() {
    const e = this.createList();
    for (this.skipSC(); !this.eof && (e.push(this.MediaQuery()), this.tokenType === ce); )
      this.next();
    return {
      type: "MediaQueryList",
      loc: this.getLocationFromList(e),
      children: e
    };
  }
  function Dp(e) {
    this.children(e, () => this.token(ce, ","));
  }
  const jp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Dp,
    name: Mp,
    parse: Ts,
    structure: Np
  }, Symbol.toStringTag, { value: "Module" })), Fp = 38, Bp = "NestingSelector", Wp = {};
  function As() {
    const e = this.tokenStart;
    return this.eatDelim(Fp), {
      type: "NestingSelector",
      loc: this.getLocation(e, this.tokenStart)
    };
  }
  function Hp() {
    this.token(I, "&");
  }
  const Up = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Hp,
    name: Bp,
    parse: As,
    structure: Wp
  }, Symbol.toStringTag, { value: "Module" })), qp = "Nth", Gp = {
    nth: ["AnPlusB", "Identifier"],
    selector: ["SelectorList", null]
  };
  function Os() {
    this.skipSC();
    const e = this.tokenStart;
    let t = e, n = null, r;
    return this.lookupValue(0, "odd") || this.lookupValue(0, "even") ? r = this.Identifier() : r = this.AnPlusB(), t = this.tokenStart, this.skipSC(), this.lookupValue(0, "of") && (this.next(), n = this.SelectorList(), t = this.tokenStart), {
      type: "Nth",
      loc: this.getLocation(e, t),
      nth: r,
      selector: n
    };
  }
  function Vp(e) {
    this.node(e.nth), e.selector !== null && (this.token(y, "of"), this.node(e.selector));
  }
  const Kp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Vp,
    name: qp,
    parse: Os,
    structure: Gp
  }, Symbol.toStringTag, { value: "Module" })), Yp = "Number", Qp = {
    value: String
  };
  function Es() {
    return {
      type: "Number",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      value: this.consume(L)
    };
  }
  function Xp(e) {
    this.token(L, e.value);
  }
  const Zp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Xp,
    name: Yp,
    parse: Es,
    structure: Qp
  }, Symbol.toStringTag, { value: "Module" })), Jp = "Operator", ef = {
    value: String
  };
  function Ls() {
    const e = this.tokenStart;
    return this.next(), {
      type: "Operator",
      loc: this.getLocation(e, this.tokenStart),
      value: this.substrToCursor(e)
    };
  }
  function tf(e) {
    this.tokenize(e.value);
  }
  const nf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: tf,
    name: Jp,
    parse: Ls,
    structure: ef
  }, Symbol.toStringTag, { value: "Module" })), rf = "Parentheses", of = {
    children: [[]]
  };
  function $s(e, t) {
    const n = this.tokenStart;
    let r = null;
    return this.eat(M), r = e.call(this, t), this.eof || this.eat(E), {
      type: "Parentheses",
      loc: this.getLocation(n, this.tokenStart),
      children: r
    };
  }
  function sf(e) {
    this.token(M, "("), this.children(e), this.token(E, ")");
  }
  const af = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: sf,
    name: rf,
    parse: $s,
    structure: of
  }, Symbol.toStringTag, { value: "Module" })), lf = "Percentage", cf = {
    value: String
  };
  function _s() {
    return {
      type: "Percentage",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      value: this.consumeNumber(B)
    };
  }
  function uf(e) {
    this.token(B, e.value + "%");
  }
  const hf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: uf,
    name: lf,
    parse: _s,
    structure: cf
  }, Symbol.toStringTag, { value: "Module" })), pf = "PseudoClassSelector", ff = "function", df = {
    name: String,
    children: [["Raw"], null]
  };
  function Ps() {
    const e = this.tokenStart;
    let t = null, n, r;
    return this.eat(ne), this.tokenType === $ ? (n = this.consumeFunctionName(), r = n.toLowerCase(), this.lookupNonWSType(0) == E ? t = this.createList() : hasOwnProperty.call(this.pseudo, r) ? (this.skipSC(), t = this.pseudo[r].call(this), this.skipSC()) : (t = this.createList(), t.push(
      this.Raw(null, !1)
    )), this.eat(E)) : n = this.consume(y), {
      type: "PseudoClassSelector",
      loc: this.getLocation(e, this.tokenStart),
      name: n,
      children: t
    };
  }
  function mf(e) {
    this.token(ne, ":"), e.children === null ? this.token(y, e.name) : (this.token($, e.name + "("), this.children(e), this.token(E, ")"));
  }
  const gf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: mf,
    name: pf,
    parse: Ps,
    structure: df,
    walkContext: ff
  }, Symbol.toStringTag, { value: "Module" })), bf = "PseudoElementSelector", yf = "function", kf = {
    name: String,
    children: [["Raw"], null]
  };
  function zs() {
    const e = this.tokenStart;
    let t = null, n, r;
    return this.eat(ne), this.eat(ne), this.tokenType === $ ? (n = this.consumeFunctionName(), r = n.toLowerCase(), this.lookupNonWSType(0) == E ? t = this.createList() : hasOwnProperty.call(this.pseudo, r) ? (this.skipSC(), t = this.pseudo[r].call(this), this.skipSC()) : (t = this.createList(), t.push(
      this.Raw(null, !1)
    )), this.eat(E)) : n = this.consume(y), {
      type: "PseudoElementSelector",
      loc: this.getLocation(e, this.tokenStart),
      name: n,
      children: t
    };
  }
  function xf(e) {
    this.token(ne, ":"), this.token(ne, ":"), e.children === null ? this.token(y, e.name) : (this.token($, e.name + "("), this.children(e), this.token(E, ")"));
  }
  const wf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: xf,
    name: bf,
    parse: zs,
    structure: kf,
    walkContext: yf
  }, Symbol.toStringTag, { value: "Module" })), Ri = 47;
  function Mi() {
    switch (this.skipSC(), this.tokenType) {
      case L:
        return this.Number();
      case $:
        return this.Function(this.readSequence, this.scope.Value);
      default:
        this.error("Number of function is expected");
    }
  }
  const vf = "Ratio", Sf = {
    left: ["Number", "Function"],
    right: ["Number", "Function", null]
  };
  function Is() {
    const e = this.tokenStart, t = Mi.call(this);
    let n = null;
    return this.skipSC(), this.isDelim(Ri) && (this.eatDelim(Ri), n = Mi.call(this)), {
      type: "Ratio",
      loc: this.getLocation(e, this.tokenStart),
      left: t,
      right: n
    };
  }
  function Cf(e) {
    this.node(e.left), this.token(I, "/"), e.right ? this.node(e.right) : this.node(L, 1);
  }
  const Tf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Cf,
    name: vf,
    parse: Is,
    structure: Sf
  }, Symbol.toStringTag, { value: "Module" }));
  function Af() {
    return this.tokenIndex > 0 && this.lookupType(-1) === W ? this.tokenIndex > 1 ? this.getTokenStart(this.tokenIndex - 1) : this.firstCharOffset : this.tokenStart;
  }
  const Of = "Raw", Ef = {
    value: String
  };
  function Rs(e, t) {
    const n = this.getTokenStart(this.tokenIndex);
    let r;
    return this.skipUntilBalanced(this.tokenIndex, e || this.consumeUntilBalanceEnd), t && this.tokenStart > n ? r = Af.call(this) : r = this.tokenStart, {
      type: "Raw",
      loc: this.getLocation(n, r),
      value: this.substring(n, r)
    };
  }
  function Lf(e) {
    this.tokenize(e.value);
  }
  const $f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Lf,
    name: Of,
    parse: Rs,
    structure: Ef
  }, Symbol.toStringTag, { value: "Module" }));
  function Ni() {
    return this.Raw(this.consumeUntilLeftCurlyBracket, !0);
  }
  function _f() {
    const e = this.SelectorList();
    return e.type !== "Raw" && this.eof === !1 && this.tokenType !== V && this.error(), e;
  }
  const Pf = "Rule", zf = "rule", If = {
    prelude: ["SelectorList", "Raw"],
    block: ["Block"]
  };
  function Ms() {
    const e = this.tokenIndex, t = this.tokenStart;
    let n, r;
    return this.parseRulePrelude ? n = this.parseWithFallback(_f, Ni) : n = Ni.call(this, e), this.skipSC(), this.eat(V), r = this.Block(!0), this.eof || this.eat(ue), {
      type: "Rule",
      loc: this.getLocation(t, this.tokenStart),
      prelude: n,
      block: r
    };
  }
  function Rf(e) {
    this.node(e.prelude), this.token(V, "{"), this.node(e.block), this.token(ue, "}");
  }
  const Mf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Rf,
    name: Pf,
    parse: Ms,
    structure: If,
    walkContext: zf
  }, Symbol.toStringTag, { value: "Module" })), Nf = "Scope", Df = {
    root: ["SelectorList", "Raw", null],
    limit: ["SelectorList", "Raw", null]
  };
  function Ns() {
    let e = null, t = null;
    this.skipSC();
    const n = this.tokenStart;
    return this.tokenType === M && (this.next(), this.skipSC(), e = this.parseWithFallback(
      this.SelectorList,
      () => this.Raw(!1, !0)
    ), this.skipSC(), this.eat(E)), this.lookupNonWSType(0) === y && (this.skipSC(), this.eatIdent("to"), this.skipSC(), this.eat(M), this.skipSC(), t = this.parseWithFallback(
      this.SelectorList,
      () => this.Raw(!1, !0)
    ), this.skipSC(), this.eat(E)), {
      type: "Scope",
      loc: this.getLocation(n, this.tokenStart),
      root: e,
      limit: t
    };
  }
  function jf(e) {
    e.root && (this.token(M, "("), this.node(e.root), this.token(E, ")")), e.limit && (this.token(y, "to"), this.token(M, "("), this.node(e.limit), this.token(E, ")"));
  }
  const Ff = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: jf,
    name: Nf,
    parse: Ns,
    structure: Df
  }, Symbol.toStringTag, { value: "Module" })), Bf = "Selector", Wf = {
    children: [[
      "TypeSelector",
      "IdSelector",
      "ClassSelector",
      "AttributeSelector",
      "PseudoClassSelector",
      "PseudoElementSelector",
      "Combinator"
    ]]
  };
  function Ds() {
    const e = this.readSequence(this.scope.Selector);
    return this.getFirstListNode(e) === null && this.error("Selector is expected"), {
      type: "Selector",
      loc: this.getLocationFromList(e),
      children: e
    };
  }
  function Hf(e) {
    this.children(e);
  }
  const Uf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Hf,
    name: Bf,
    parse: Ds,
    structure: Wf
  }, Symbol.toStringTag, { value: "Module" })), qf = "SelectorList", Gf = "selector", Vf = {
    children: [[
      "Selector",
      "Raw"
    ]]
  };
  function js() {
    const e = this.createList();
    for (; !this.eof; ) {
      if (e.push(this.Selector()), this.tokenType === ce) {
        this.next();
        continue;
      }
      break;
    }
    return {
      type: "SelectorList",
      loc: this.getLocationFromList(e),
      children: e
    };
  }
  function Kf(e) {
    this.children(e, () => this.token(ce, ","));
  }
  const Yf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Kf,
    name: qf,
    parse: js,
    structure: Vf,
    walkContext: Gf
  }, Symbol.toStringTag, { value: "Module" })), ir = 92, Fs = 34, Qf = 39;
  function Bs(e) {
    const t = e.length, n = e.charCodeAt(0), r = n === Fs || n === Qf ? 1 : 0, i = r === 1 && t > 1 && e.charCodeAt(t - 1) === n ? t - 2 : t - 1;
    let o = "";
    for (let s = r; s <= i; s++) {
      let c = e.charCodeAt(s);
      if (c === ir) {
        if (s === i) {
          s !== t - 1 && (o = e.substr(s + 1));
          break;
        }
        if (c = e.charCodeAt(++s), Le(ir, c)) {
          const l = s - 1, a = ft(e, l);
          s = a - 1, o += go(e.substring(l + 1, a));
        } else
          c === 13 && e.charCodeAt(s + 1) === 10 && s++;
      } else
        o += e[s];
    }
    return o;
  }
  function Xf(e, t) {
    const n = '"', r = Fs;
    let i = "", o = !1;
    for (let s = 0; s < e.length; s++) {
      const c = e.charCodeAt(s);
      if (c === 0) {
        i += "�";
        continue;
      }
      if (c <= 31 || c === 127) {
        i += "\\" + c.toString(16), o = !0;
        continue;
      }
      c === r || c === ir ? (i += "\\" + e.charAt(s), o = !1) : (o && (He(c) || Xe(c)) && (i += " "), i += e.charAt(s), o = !1);
    }
    return n + i + n;
  }
  const Zf = "String", Jf = {
    value: String
  };
  function Ws() {
    return {
      type: "String",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      value: Bs(this.consume(Te))
    };
  }
  function ed(e) {
    this.token(Te, Xf(e.value));
  }
  const td = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: ed,
    name: Zf,
    parse: Ws,
    structure: Jf
  }, Symbol.toStringTag, { value: "Module" })), nd = 33;
  function Di() {
    return this.Raw(null, !1);
  }
  const rd = "StyleSheet", id = "stylesheet", od = {
    children: [[
      "Comment",
      "CDO",
      "CDC",
      "Atrule",
      "Rule",
      "Raw"
    ]]
  };
  function Hs() {
    const e = this.tokenStart, t = this.createList();
    let n;
    for (; !this.eof; ) {
      switch (this.tokenType) {
        case W:
          this.next();
          continue;
        case X:
          if (this.charCodeAt(this.tokenStart + 2) !== nd) {
            this.next();
            continue;
          }
          n = this.Comment();
          break;
        case Rt:
          n = this.CDO();
          break;
        case ae:
          n = this.CDC();
          break;
        case G:
          n = this.parseWithFallback(this.Atrule, Di);
          break;
        default:
          n = this.parseWithFallback(this.Rule, Di);
      }
      t.push(n);
    }
    return {
      type: "StyleSheet",
      loc: this.getLocation(e, this.tokenStart),
      children: t
    };
  }
  function sd(e) {
    this.children(e);
  }
  const ad = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: sd,
    name: rd,
    parse: Hs,
    structure: od,
    walkContext: id
  }, Symbol.toStringTag, { value: "Module" })), ld = "SupportsDeclaration", cd = {
    declaration: "Declaration"
  };
  function Us() {
    const e = this.tokenStart;
    this.eat(M), this.skipSC();
    const t = this.Declaration();
    return this.eof || this.eat(E), {
      type: "SupportsDeclaration",
      loc: this.getLocation(e, this.tokenStart),
      declaration: t
    };
  }
  function ud(e) {
    this.token(M, "("), this.node(e.declaration), this.token(E, ")");
  }
  const hd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: ud,
    name: ld,
    parse: Us,
    structure: cd
  }, Symbol.toStringTag, { value: "Module" })), pd = 42, ji = 124;
  function Wn() {
    this.tokenType !== y && this.isDelim(pd) === !1 && this.error("Identifier or asterisk is expected"), this.next();
  }
  const fd = "TypeSelector", dd = {
    name: String
  };
  function qs() {
    const e = this.tokenStart;
    return this.isDelim(ji) ? (this.next(), Wn.call(this)) : (Wn.call(this), this.isDelim(ji) && (this.next(), Wn.call(this))), {
      type: "TypeSelector",
      loc: this.getLocation(e, this.tokenStart),
      name: this.substrToCursor(e)
    };
  }
  function md(e) {
    this.tokenize(e.name);
  }
  const gd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: md,
    name: fd,
    parse: qs,
    structure: dd
  }, Symbol.toStringTag, { value: "Module" })), Gs = 43, Vs = 45, or = 63;
  function Ct(e, t) {
    let n = 0;
    for (let r = this.tokenStart + e; r < this.tokenEnd; r++) {
      const i = this.charCodeAt(r);
      if (i === Vs && t && n !== 0)
        return Ct.call(this, e + n + 1, !1), -1;
      He(i) || this.error(
        t && n !== 0 ? "Hyphen minus" + (n < 6 ? " or hex digit" : "") + " is expected" : n < 6 ? "Hex digit is expected" : "Unexpected input",
        r
      ), ++n > 6 && this.error("Too many hex digits", r);
    }
    return this.next(), n;
  }
  function Wt(e) {
    let t = 0;
    for (; this.isDelim(or); )
      ++t > e && this.error("Too many question marks"), this.next();
  }
  function bd(e) {
    this.charCodeAt(this.tokenStart) !== e && this.error((e === Gs ? "Plus sign" : "Hyphen minus") + " is expected");
  }
  function yd() {
    let e = 0;
    switch (this.tokenType) {
      case L:
        if (e = Ct.call(this, 1, !0), this.isDelim(or)) {
          Wt.call(this, 6 - e);
          break;
        }
        if (this.tokenType === z || this.tokenType === L) {
          bd.call(this, Vs), Ct.call(this, 1, !1);
          break;
        }
        break;
      case z:
        e = Ct.call(this, 1, !0), e > 0 && Wt.call(this, 6 - e);
        break;
      default:
        if (this.eatDelim(Gs), this.tokenType === y) {
          e = Ct.call(this, 0, !0), e > 0 && Wt.call(this, 6 - e);
          break;
        }
        if (this.isDelim(or)) {
          this.next(), Wt.call(this, 5);
          break;
        }
        this.error("Hex digit or question mark is expected");
    }
  }
  const kd = "UnicodeRange", xd = {
    value: String
  };
  function Ks() {
    const e = this.tokenStart;
    return this.eatIdent("u"), yd.call(this), {
      type: "UnicodeRange",
      loc: this.getLocation(e, this.tokenStart),
      value: this.substrToCursor(e)
    };
  }
  function wd(e) {
    this.tokenize(e.value);
  }
  const vd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: wd,
    name: kd,
    parse: Ks,
    structure: xd
  }, Symbol.toStringTag, { value: "Module" })), Sd = 32, sr = 92, Cd = 34, Td = 39, Ad = 40, Ys = 41;
  function Od(e) {
    const t = e.length;
    let n = 4, r = e.charCodeAt(t - 1) === Ys ? t - 2 : t - 1, i = "";
    for (; n < r && Xe(e.charCodeAt(n)); )
      n++;
    for (; n < r && Xe(e.charCodeAt(r)); )
      r--;
    for (let o = n; o <= r; o++) {
      let s = e.charCodeAt(o);
      if (s === sr) {
        if (o === r) {
          o !== t - 1 && (i = e.substr(o + 1));
          break;
        }
        if (s = e.charCodeAt(++o), Le(sr, s)) {
          const c = o - 1, l = ft(e, c);
          o = l - 1, i += go(e.substring(c + 1, l));
        } else
          s === 13 && e.charCodeAt(o + 1) === 10 && o++;
      } else
        i += e[o];
    }
    return i;
  }
  function Ed(e) {
    let t = "", n = !1;
    for (let r = 0; r < e.length; r++) {
      const i = e.charCodeAt(r);
      if (i === 0) {
        t += "�";
        continue;
      }
      if (i <= 31 || i === 127) {
        t += "\\" + i.toString(16), n = !0;
        continue;
      }
      i === Sd || i === sr || i === Cd || i === Td || i === Ad || i === Ys ? (t += "\\" + e.charAt(r), n = !1) : (n && He(i) && (t += " "), t += e.charAt(r), n = !1);
    }
    return "url(" + t + ")";
  }
  const Ld = "Url", $d = {
    value: String
  };
  function Qs() {
    const e = this.tokenStart;
    let t;
    switch (this.tokenType) {
      case te:
        t = Od(this.consume(te));
        break;
      case $:
        this.cmpStr(this.tokenStart, this.tokenEnd, "url(") || this.error("Function name must be `url`"), this.eat($), this.skipSC(), t = Bs(this.consume(Te)), this.skipSC(), this.eof || this.eat(E);
        break;
      default:
        this.error("Url or Function is expected");
    }
    return {
      type: "Url",
      loc: this.getLocation(e, this.tokenStart),
      value: t
    };
  }
  function _d(e) {
    this.token(te, Ed(e.value));
  }
  const Pd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: _d,
    name: Ld,
    parse: Qs,
    structure: $d
  }, Symbol.toStringTag, { value: "Module" })), zd = "Value", Id = {
    children: [[]]
  };
  function Xs() {
    const e = this.tokenStart, t = this.readSequence(this.scope.Value);
    return {
      type: "Value",
      loc: this.getLocation(e, this.tokenStart),
      children: t
    };
  }
  function Rd(e) {
    this.children(e);
  }
  const Md = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Rd,
    name: zd,
    parse: Xs,
    structure: Id
  }, Symbol.toStringTag, { value: "Module" })), Nd = Object.freeze({
    type: "WhiteSpace",
    loc: null,
    value: " "
  }), Dd = "WhiteSpace", jd = {
    value: String
  };
  function Zs() {
    return this.eat(W), Nd;
  }
  function Fd(e) {
    this.token(W, e.value);
  }
  const Bd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Fd,
    name: Dd,
    parse: Zs,
    structure: jd
  }, Symbol.toStringTag, { value: "Module" })), Js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    AnPlusB: ou,
    Atrule: hu,
    AtrulePrelude: gu,
    AttributeSelector: Tu,
    Block: Pu,
    Brackets: Mu,
    CDC: Fu,
    CDO: Uu,
    ClassSelector: Yu,
    Combinator: nh,
    Comment: lh,
    Condition: dh,
    Declaration: Lh,
    DeclarationList: Ih,
    Dimension: Dh,
    Feature: Hh,
    FeatureFunction: Kh,
    FeatureRange: ep,
    Function: op,
    GeneralEnclosed: cp,
    Hash: dp,
    IdSelector: vp,
    Identifier: yp,
    Layer: Op,
    LayerList: _p,
    MediaQuery: Rp,
    MediaQueryList: jp,
    NestingSelector: Up,
    Nth: Kp,
    Number: Zp,
    Operator: nf,
    Parentheses: af,
    Percentage: hf,
    PseudoClassSelector: gf,
    PseudoElementSelector: wf,
    Ratio: Tf,
    Raw: $f,
    Rule: Mf,
    Scope: Ff,
    Selector: Uf,
    SelectorList: Yf,
    String: td,
    StyleSheet: ad,
    SupportsDeclaration: hd,
    TypeSelector: gd,
    UnicodeRange: vd,
    Url: Pd,
    Value: Md,
    WhiteSpace: Bd
  }, Symbol.toStringTag, { value: "Module" })), Wd = Z(_({
    generic: !0
  }, eu), {
    node: Js
  }), Hd = 35, Ud = 42, Fi = 43, qd = 45, Gd = 47, Vd = 117;
  function ea(e) {
    switch (this.tokenType) {
      case F:
        return this.Hash();
      case ce:
        return this.Operator();
      case M:
        return this.Parentheses(this.readSequence, e.recognizer);
      case fe:
        return this.Brackets(this.readSequence, e.recognizer);
      case Te:
        return this.String();
      case z:
        return this.Dimension();
      case B:
        return this.Percentage();
      case L:
        return this.Number();
      case $:
        return this.cmpStr(this.tokenStart, this.tokenEnd, "url(") ? this.Url() : this.Function(this.readSequence, e.recognizer);
      case te:
        return this.Url();
      case y:
        return this.cmpChar(this.tokenStart, Vd) && this.cmpChar(this.tokenStart + 1, Fi) ? this.UnicodeRange() : this.Identifier();
      case I: {
        const t = this.charCodeAt(this.tokenStart);
        if (t === Gd || t === Ud || t === Fi || t === qd)
          return this.Operator();
        t === Hd && this.error("Hex or identifier is expected", this.tokenStart + 1);
        break;
      }
    }
  }
  const Kd = {
    getNode: ea
  }, Yd = 35, Qd = 38, Xd = 42, Zd = 43, Jd = 47, Bi = 46, em = 62, tm = 124, nm = 126;
  function rm(e, t) {
    t.last !== null && t.last.type !== "Combinator" && e !== null && e.type !== "Combinator" && t.push({
      // FIXME: this.Combinator() should be used instead
      type: "Combinator",
      loc: null,
      name: " "
    });
  }
  function im() {
    switch (this.tokenType) {
      case fe:
        return this.AttributeSelector();
      case F:
        return this.IdSelector();
      case ne:
        return this.lookupType(1) === ne ? this.PseudoElementSelector() : this.PseudoClassSelector();
      case y:
        return this.TypeSelector();
      case L:
      case B:
        return this.Percentage();
      case z:
        this.charCodeAt(this.tokenStart) === Bi && this.error("Identifier is expected", this.tokenStart + 1);
        break;
      case I: {
        switch (this.charCodeAt(this.tokenStart)) {
          case Zd:
          case em:
          case nm:
          case Jd:
            return this.Combinator();
          case Bi:
            return this.ClassSelector();
          case Xd:
          case tm:
            return this.TypeSelector();
          case Yd:
            return this.IdSelector();
          case Qd:
            return this.NestingSelector();
        }
        break;
      }
    }
  }
  const om = {
    onWhiteSpace: rm,
    getNode: im
  };
  function sm() {
    return this.createSingleNodeList(
      this.Raw(null, !1)
    );
  }
  function am() {
    const e = this.createList();
    if (this.skipSC(), e.push(this.Identifier()), this.skipSC(), this.tokenType === ce) {
      e.push(this.Operator());
      const t = this.tokenIndex, n = this.parseCustomProperty ? this.Value(null) : this.Raw(this.consumeUntilExclamationMarkOrSemicolon, !1);
      if (n.type === "Value" && n.children.isEmpty) {
        for (let r = t - this.tokenIndex; r <= 0; r++)
          if (this.lookupType(r) === W) {
            n.children.appendData({
              type: "WhiteSpace",
              loc: null,
              value: " "
            });
            break;
          }
      }
      e.push(n);
    }
    return e;
  }
  function Wi(e) {
    return e !== null && e.type === "Operator" && (e.value[e.value.length - 1] === "-" || e.value[e.value.length - 1] === "+");
  }
  const lm = {
    getNode: ea,
    onWhiteSpace(e, t) {
      Wi(e) && (e.value = " " + e.value), Wi(t.last) && (t.last.value += " ");
    },
    expression: sm,
    var: am
  }, cm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    AtrulePrelude: Kd,
    Selector: om,
    Value: lm
  }, Symbol.toStringTag, { value: "Module" })), um = /* @__PURE__ */ new Set(["none", "and", "not", "or"]), hm = {
    parse: {
      prelude() {
        const e = this.createList();
        if (this.tokenType === y) {
          const t = this.substring(this.tokenStart, this.tokenEnd);
          um.has(t.toLowerCase()) || e.push(this.Identifier());
        }
        return e.push(this.Condition("container")), e;
      },
      block(e = !1) {
        return this.Block(e);
      }
    }
  }, pm = {
    parse: {
      prelude: null,
      block() {
        return this.Block(!0);
      }
    }
  };
  function Hn(e, t) {
    return this.parseWithFallback(
      () => {
        try {
          return e.call(this);
        } finally {
          this.skipSC(), this.lookupNonWSType(0) !== E && this.error();
        }
      },
      t || (() => this.Raw(null, !0))
    );
  }
  const Hi = {
    layer() {
      this.skipSC();
      const e = this.createList(), t = Hn.call(this, this.Layer);
      return (t.type !== "Raw" || t.value !== "") && e.push(t), e;
    },
    supports() {
      this.skipSC();
      const e = this.createList(), t = Hn.call(
        this,
        this.Declaration,
        () => Hn.call(this, () => this.Condition("supports"))
      );
      return (t.type !== "Raw" || t.value !== "") && e.push(t), e;
    }
  }, fm = {
    parse: {
      prelude() {
        const e = this.createList();
        switch (this.tokenType) {
          case Te:
            e.push(this.String());
            break;
          case te:
          case $:
            e.push(this.Url());
            break;
          default:
            this.error("String or url() is expected");
        }
        return this.skipSC(), this.tokenType === y && this.cmpStr(this.tokenStart, this.tokenEnd, "layer") ? e.push(this.Identifier()) : this.tokenType === $ && this.cmpStr(this.tokenStart, this.tokenEnd, "layer(") && e.push(this.Function(null, Hi)), this.skipSC(), this.tokenType === $ && this.cmpStr(this.tokenStart, this.tokenEnd, "supports(") && e.push(this.Function(null, Hi)), (this.lookupNonWSType(0) === y || this.lookupNonWSType(0) === M) && e.push(this.MediaQueryList()), e;
      },
      block: null
    }
  }, dm = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.LayerList()
        );
      },
      block() {
        return this.Block(!1);
      }
    }
  }, mm = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.MediaQueryList()
        );
      },
      block(e = !1) {
        return this.Block(e);
      }
    }
  }, gm = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.SelectorList()
        );
      },
      block() {
        return this.Block(!0);
      }
    }
  }, bm = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.SelectorList()
        );
      },
      block() {
        return this.Block(!0);
      }
    }
  }, ym = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.Scope()
        );
      },
      block(e = !1) {
        return this.Block(e);
      }
    }
  }, km = {
    parse: {
      prelude: null,
      block(e = !1) {
        return this.Block(e);
      }
    }
  }, xm = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.Condition("supports")
        );
      },
      block(e = !1) {
        return this.Block(e);
      }
    }
  }, wm = {
    container: hm,
    "font-face": pm,
    import: fm,
    layer: dm,
    media: mm,
    nest: gm,
    page: bm,
    scope: ym,
    "starting-style": km,
    supports: xm
  };
  function vm() {
    const e = this.createList();
    this.skipSC();
    e: for (; !this.eof; ) {
      switch (this.tokenType) {
        case y:
          e.push(this.Identifier());
          break;
        case Te:
          e.push(this.String());
          break;
        case ce:
          e.push(this.Operator());
          break;
        case E:
          break e;
        default:
          this.error("Identifier, string or comma is expected");
      }
      this.skipSC();
    }
    return e;
  }
  const qe = {
    parse() {
      return this.createSingleNodeList(
        this.SelectorList()
      );
    }
  }, Un = {
    parse() {
      return this.createSingleNodeList(
        this.Selector()
      );
    }
  }, Sm = {
    parse() {
      return this.createSingleNodeList(
        this.Identifier()
      );
    }
  }, Cm = {
    parse: vm
  }, Ht = {
    parse() {
      return this.createSingleNodeList(
        this.Nth()
      );
    }
  }, Tm = {
    dir: Sm,
    has: qe,
    lang: Cm,
    matches: qe,
    is: qe,
    "-moz-any": qe,
    "-webkit-any": qe,
    where: qe,
    not: qe,
    "nth-child": Ht,
    "nth-last-child": Ht,
    "nth-last-of-type": Ht,
    "nth-of-type": Ht,
    slotted: Un,
    host: Un,
    "host-context": Un
  }, Am = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    AnPlusB: Qo,
    Atrule: Xo,
    AtrulePrelude: Zo,
    AttributeSelector: es,
    Block: ns,
    Brackets: rs,
    CDC: is,
    CDO: os,
    ClassSelector: ss,
    Combinator: as,
    Comment: ls,
    Condition: cs,
    Declaration: hs,
    DeclarationList: ps,
    Dimension: fs,
    Feature: ds,
    FeatureFunction: ms,
    FeatureRange: gs,
    Function: bs,
    GeneralEnclosed: ys,
    Hash: ks,
    IdSelector: ws,
    Identifier: xs,
    Layer: vs,
    LayerList: Ss,
    MediaQuery: Cs,
    MediaQueryList: Ts,
    NestingSelector: As,
    Nth: Os,
    Number: Es,
    Operator: Ls,
    Parentheses: $s,
    Percentage: _s,
    PseudoClassSelector: Ps,
    PseudoElementSelector: zs,
    Ratio: Is,
    Raw: Rs,
    Rule: Ms,
    Scope: Ns,
    Selector: Ds,
    SelectorList: js,
    String: Ws,
    StyleSheet: Hs,
    SupportsDeclaration: Us,
    TypeSelector: qs,
    UnicodeRange: Ks,
    Url: Qs,
    Value: Xs,
    WhiteSpace: Zs
  }, Symbol.toStringTag, { value: "Module" })), Om = {
    parseContext: {
      default: "StyleSheet",
      stylesheet: "StyleSheet",
      atrule: "Atrule",
      atrulePrelude(e) {
        return this.AtrulePrelude(e.atrule ? String(e.atrule) : null);
      },
      mediaQueryList: "MediaQueryList",
      mediaQuery: "MediaQuery",
      condition(e) {
        return this.Condition(e.kind);
      },
      rule: "Rule",
      selectorList: "SelectorList",
      selector: "Selector",
      block() {
        return this.Block(!0);
      },
      declarationList: "DeclarationList",
      declaration: "Declaration",
      value: "Value"
    },
    features: {
      supports: {
        selector() {
          return this.Selector();
        }
      },
      container: {
        style() {
          return this.Declaration();
        }
      }
    },
    scope: cm,
    atrule: wm,
    pseudo: Tm,
    node: Am
  }, Em = {
    node: Js
  }, Lm = Jc(_(_(_({}, Wd), Om), Em));
  function un(e) {
    const t = {};
    for (const n of Object.keys(e)) {
      let r = e[n];
      r && (Array.isArray(r) || r instanceof q ? r = r.map(un) : r.constructor === Object && (r = un(r))), t[n] = r;
    }
    return t;
  }
  const {
    tokenize: Zg,
    parse: $m,
    generate: _m,
    lexer: Jg,
    createLexer: eb,
    walk: Fe,
    find: tb,
    findLast: nb,
    findAll: rb,
    toPlainObject: ib,
    fromPlainObject: ob,
    fork: sb
  } = Lm;
  let Pm = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", ke = (e = 21) => {
    let t = "", n = e;
    for (; n--; )
      t += Pm[Math.random() * 64 | 0];
    return t;
  };
  const oe = ke();
  function Ir(e) {
    return !!(e && e.type === "Function" && e.name === "anchor");
  }
  function Be(e) {
    return $m(e, {
      parseAtrulePrelude: !1,
      parseCustomProperty: !0
    });
  }
  function le(e) {
    return _m(e, {
      // Default `safe` adds extra (potentially breaking) spaces for compatibility
      // with old browsers.
      mode: "spec"
    });
  }
  function zm(e) {
    return e.type === "Declaration";
  }
  function Im(e) {
    return e.toArray().reduce(
      (t, n) => n.type === "Operator" && n.value === "," ? (t.push([]), t) : (n.type === "Identifier" && t[t.length - 1].push(n), t),
      [[]]
    );
  }
  function ar(e) {
    return e ? e.children.map((t) => {
      var i;
      let n;
      ((i = t.children.last) == null ? void 0 : i.type) === "PseudoElementSelector" && (t = un(t), n = le(t.children.last), t.children.pop());
      const r = le(t);
      return {
        selector: r + (n != null ? n : ""),
        elementPart: r,
        pseudoElementPart: n
      };
    }).toArray() : [];
  }
  const lr = {
    "position-anchor": `--position-anchor-${oe}`,
    "anchor-scope": `--anchor-scope-${oe}`,
    "anchor-name": `--anchor-name-${oe}`,
    left: `--left-${oe}`,
    right: `--right-${oe}`,
    top: `--top-${oe}`,
    bottom: `--bottom-${oe}`,
    "inset-block-start": `--inset-block-start-${oe}`,
    "inset-block-end": `--inset-block-end-${oe}`,
    "inset-inline-start": `--inset-inline-start-${oe}`,
    "inset-inline-end": `--inset-inline-end-${oe}`,
    "inset-block": `--inset-block-${oe}`,
    "inset-inline": `--inset-inline-${oe}`,
    inset: `--inset-${oe}`
  };
  function Rm(e, t) {
    return zm(e) && lr[e.property] && t ? (t.children.appendData(Z(_({}, e), {
      property: lr[e.property]
    })), { updated: !0 }) : {};
  }
  function Mm(e) {
    for (const t of e) {
      let n = !1;
      const r = Be(t.css);
      Fe(r, {
        visit: "Declaration",
        enter(i) {
          var c;
          const o = (c = this.rule) == null ? void 0 : c.block, { updated: s } = Rm(i, o);
          s && (n = !0);
        }
      }), n && (t.css = le(r), t.changed = !0);
    }
    return e.some((t) => t.changed === !0);
  }
  var ta = /* @__PURE__ */ ((e) => (e.All = "all", e.None = "none", e))(ta || {});
  function Ce(e, t) {
    var r;
    return t = (r = lr[t]) != null ? r : t, (e instanceof HTMLElement ? getComputedStyle(e) : e.computedStyle).getPropertyValue(t).trim();
  }
  function gt(e, t, n) {
    return Ce(e, t) === n;
  }
  function Nm(e, { selector: t, pseudoElementPart: n }) {
    const r = getComputedStyle(e, n), i = document.createElement("div"), o = document.createElement("style");
    i.id = `fake-pseudo-element-${ke()}`;
    for (const c of Array.from(r)) {
      const l = r.getPropertyValue(c);
      i.style.setProperty(c, l);
    }
    o.textContent += `#${i.id}${n} { content: ${r.content}; }`, o.textContent += `${t} { display: none !important; }`, document.head.append(o);
    const s = n === "::before" ? "afterbegin" : "beforeend";
    return e.insertAdjacentElement(s, i), { fakePseudoElement: i, sheet: o, computedStyle: r };
  }
  function Dm(e) {
    let t = e;
    for (; t; ) {
      if (gt(t, "overflow", "scroll"))
        return t;
      t = t.parentElement;
    }
    return t;
  }
  function jm(e) {
    let t = Dm(e);
    return t === document.documentElement && (t = null), t != null ? t : { scrollTop: 0, scrollLeft: 0 };
  }
  function Fm(e) {
    const { elementPart: t, pseudoElementPart: n } = e, r = [];
    if (n && !(n === "::before" || n === "::after")) return r;
    const s = Array.from(
      document.querySelectorAll(t)
    );
    if (!n)
      return r.push(...s), r;
    for (const c of s) {
      const { fakePseudoElement: l, sheet: a, computedStyle: u } = Nm(
        c,
        e
      ), h = l.getBoundingClientRect(), { scrollY: d, scrollX: m } = globalThis, w = jm(c);
      r.push({
        fakePseudoElement: l,
        computedStyle: u,
        removeFakePseudoElement() {
          l.remove(), a.remove();
        },
        // For https://floating-ui.com/docs/autoupdate#ancestorscroll to work on
        // `VirtualElement`s.
        contextElement: c,
        // https://floating-ui.com/docs/virtual-elements
        getBoundingClientRect() {
          const { scrollY: k, scrollX: C } = globalThis, { scrollTop: b, scrollLeft: x } = w;
          return DOMRect.fromRect({
            y: h.y + (d - k) + (w.scrollTop - b),
            x: h.x + (m - C) + (w.scrollLeft - x),
            width: h.width,
            height: h.height
          });
        }
      });
    }
    return r;
  }
  function Bm(e, t) {
    const n = Ce(e, "anchor-name");
    return t ? n.split(",").map((r) => r.trim()).includes(t) : !n;
  }
  function Wm(e, t) {
    const n = Ce(e, "anchor-scope");
    return n === t || n === "all";
  }
  const Ui = "InvalidMimeType";
  function Hm(e) {
    return !!((e.type === "text/css" || e.rel === "stylesheet") && e.href);
  }
  function Um(e) {
    const t = new URL(e.href, document.baseURI);
    if (Hm(e) && t.origin === location.origin)
      return t;
  }
  function qm(e) {
    return H(this, null, function* () {
      return (yield Promise.all(
        e.map((n) => H(this, null, function* () {
          var r;
          if (!n.url)
            return n;
          if ((r = n.el) != null && r.disabled)
            return null;
          try {
            const i = yield fetch(n.url.toString()), o = i.headers.get("content-type");
            if (!(o != null && o.startsWith("text/css"))) {
              const c = new Error(
                `Error loading ${n.url}: expected content-type "text/css", got "${o}".`
              );
              throw c.name = Ui, c;
            }
            const s = yield i.text();
            return Z(_({}, n), { css: s });
          } catch (i) {
            if (i instanceof Error && i.name === Ui)
              return console.warn(i), null;
            throw i;
          }
        }))
      )).filter((n) => n !== null);
    });
  }
  const qi = '[style*="anchor"]';
  function Gm(e) {
    const t = e ? e.filter(
      (r) => r instanceof HTMLElement && r.matches(qi)
    ) : Array.from(
      document.querySelectorAll(qi)
    ), n = [];
    return t.filter((r) => r instanceof HTMLElement).forEach((r) => {
      const i = ke(12), o = "data-has-inline-styles";
      r.setAttribute(o, i);
      const s = r.getAttribute("style"), c = `[${o}="${i}"] { ${s} }`;
      n.push({ el: r, css: c });
    }), n;
  }
  function Vm(e, t) {
    return H(this, null, function* () {
      const n = e != null ? e : Array.from(document.querySelectorAll("link, style")), r = [];
      n.filter((s) => s instanceof HTMLElement).forEach((s) => {
        if (s.tagName.toLowerCase() === "link") {
          const c = Um(s);
          c && r.push({ el: s, url: c });
        }
        s.tagName.toLowerCase() === "style" && r.push({ el: s, css: s.innerHTML });
      });
      const i = t ? e != null ? e : [] : void 0, o = Gm(i);
      return yield qm([...r, ...o]);
    });
  }
  const na = [
    "left",
    "right",
    "top",
    "bottom",
    "inset-block-start",
    "inset-block-end",
    "inset-inline-start",
    "inset-inline-end",
    "inset-block",
    "inset-inline",
    "inset"
  ];
  function zt(e) {
    return na.includes(e);
  }
  const ra = [
    "margin-block-start",
    "margin-block-end",
    "margin-block",
    "margin-inline-start",
    "margin-inline-end",
    "margin-inline",
    "margin-bottom",
    "margin-left",
    "margin-right",
    "margin-top",
    "margin"
  ];
  function Km(e) {
    return ra.includes(e);
  }
  const ia = [
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "block-size",
    "inline-size",
    "min-block-size",
    "min-inline-size",
    "max-block-size",
    "max-inline-size"
  ];
  function vn(e) {
    return ia.includes(e);
  }
  const oa = [
    "justify-self",
    "align-self",
    "place-self"
  ];
  function Ym(e) {
    return oa.includes(e);
  }
  const Qm = [
    ...na,
    ...ra,
    ...ia,
    ...oa,
    "position-anchor",
    "position-area"
  ], Xm = [
    "top",
    "left",
    "right",
    "bottom",
    "start",
    "end",
    "self-start",
    "self-end",
    "center"
  ];
  function sa(e) {
    return Xm.includes(e);
  }
  const Zm = [
    "width",
    "height",
    "block",
    "inline",
    "self-block",
    "self-inline"
  ];
  function Jm(e) {
    return Zm.includes(e);
  }
  const eg = [
    "left",
    "center",
    "right",
    "span-left",
    "span-right",
    "x-start",
    "x-end",
    "span-x-start",
    "span-x-end",
    "x-self-start",
    "x-self-end",
    "span-x-self-start",
    "span-x-self-end",
    "span-all",
    "top",
    "bottom",
    "span-top",
    "span-bottom",
    "y-start",
    "y-end",
    "span-y-start",
    "span-y-end",
    "y-self-start",
    "y-self-end",
    "span-y-self-start",
    "span-y-self-end",
    "block-start",
    "block-end",
    "span-block-start",
    "span-block-end",
    "inline-start",
    "inline-end",
    "span-inline-start",
    "span-inline-end",
    "self-block-start",
    "self-block-end",
    "span-self-block-start",
    "span-self-block-end",
    "self-inline-start",
    "self-inline-end",
    "span-self-inline-start",
    "span-self-inline-end",
    "start",
    "end",
    "span-start",
    "span-end",
    "self-start",
    "self-end",
    "span-self-start",
    "span-self-end"
  ], tg = [
    "normal",
    "most-width",
    "most-height",
    "most-block-size",
    "most-inline-size"
  ], ng = [
    "flip-block",
    "flip-inline",
    "flip-start"
  ];
  function aa(e) {
    return eg.includes(e);
  }
  function rg(e) {
    return e.type === "Declaration";
  }
  function ig(e) {
    return e.type === "Declaration" && e.property === "position-try-fallbacks";
  }
  function og(e) {
    return e.type === "Declaration" && e.property === "position-try-order";
  }
  function sg(e) {
    return e.type === "Declaration" && e.property === "position-try";
  }
  function ag(e) {
    return e.type === "Atrule" && e.name === "position-try";
  }
  function lg(e) {
    return ng.includes(e);
  }
  function cg(e) {
    return tg.includes(e);
  }
  function ug(e, t) {
    const n = document.querySelector(e);
    if (n) {
      let r = pg(n);
      return t.forEach((i) => {
        r = la(r, i);
      }), r;
    }
  }
  function hg(e, t) {
    let n = e.declarations;
    return t.forEach((r) => {
      n = la(n, r);
    }), n;
  }
  function pg(e) {
    const t = {};
    return Qm.forEach((n) => {
      const r = Ce(
        e,
        `--${n}-${oe}`
      );
      r && (t[n] = r);
    }), t;
  }
  const fg = {
    "flip-block": {
      top: "bottom",
      bottom: "top",
      "inset-block-start": "inset-block-end",
      "inset-block-end": "inset-block-start",
      "margin-top": "margin-bottom",
      "margin-bottom": "margin-top"
    },
    "flip-inline": {
      left: "right",
      right: "left",
      "inset-inline-start": "inset-inline-end",
      "inset-inline-end": "inset-inline-start",
      "margin-left": "margin-right",
      "margin-right": "margin-left"
    },
    "flip-start": {
      left: "top",
      right: "bottom",
      top: "left",
      bottom: "right",
      "inset-block-start": "inset-block-end",
      "inset-block-end": "inset-block-start",
      "inset-inline-start": "inset-inline-end",
      "inset-inline-end": "inset-inline-start",
      "inset-block": "inset-inline",
      "inset-inline": "inset-block"
    }
  }, dg = {
    "flip-block": {
      top: "bottom",
      bottom: "top",
      start: "end",
      end: "start",
      "self-end": "self-start",
      "self-start": "self-end"
    },
    "flip-inline": {
      left: "right",
      right: "left",
      start: "end",
      end: "start",
      "self-end": "self-start",
      "self-start": "self-end"
    },
    "flip-start": {
      top: "left",
      left: "top",
      right: "bottom",
      bottom: "right"
    }
  }, mg = {
    "flip-block": {
      top: "bottom",
      bottom: "top",
      start: "end",
      end: "start"
    },
    "flip-inline": {
      left: "right",
      right: "left",
      start: "end",
      end: "start"
    },
    "flip-start": {
      // TODO: Requires fuller logic
    }
  };
  function gg(e, t) {
    return fg[t][e] || e;
  }
  function bg(e, t) {
    return dg[t][e] || e;
  }
  function yg(e, t) {
    if (t === "flip-start")
      return e;
    {
      const n = mg[t];
      return e.split("-").map((r) => n[r] || r).join("-");
    }
  }
  function kg(e, t, n) {
    if (e === "margin") {
      const [r, i, o, s] = t.children.toArray();
      n === "flip-block" ? s ? t.children.fromArray([o, i, r, s]) : o && t.children.fromArray([o, i, r]) : n === "flip-inline" && s && t.children.fromArray([r, s, o, i]);
    } else if (e === "margin-block") {
      const [r, i] = t.children.toArray();
      n === "flip-block" && i && t.children.fromArray([i, r]);
    } else if (e === "margin-inline") {
      const [r, i] = t.children.toArray();
      n === "flip-inline" && i && t.children.fromArray([i, r]);
    }
  }
  const xg = (e, t) => {
    var i;
    return ((i = Be(`#id{${e}: ${t};}`).children.first) == null ? void 0 : i.block.children.first).value;
  };
  function la(e, t) {
    const n = {};
    return Object.entries(e).forEach(([r, i]) => {
      var l;
      const o = r, s = xg(o, i), c = gg(o, t);
      c !== o && ((l = n[o]) != null || (n[o] = "revert")), Fe(s, {
        visit: "Function",
        enter(a) {
          Ir(a) && a.children.forEach((u) => {
            Ot(u) && sa(u.name) && (u.name = bg(u.name, t));
          });
        }
      }), o === "position-area" && s.children.forEach((a) => {
        Ot(a) && aa(a.name) && (a.name = yg(a.name, t));
      }), o.startsWith("margin") && kg(o, s, t), n[c] = le(s);
    }), n;
  }
  function ca(e) {
    const t = Im(e), n = [];
    return t.forEach((r) => {
      const i = {
        atRules: [],
        tactics: [],
        positionAreas: []
      };
      r.forEach((o) => {
        lg(o.name) ? i.tactics.push(o.name) : o.name.startsWith("--") ? i.atRules.push(o.name) : aa(o.name) && i.positionAreas.push(o.name);
      }), i.positionAreas.length ? n.push({
        positionArea: i.positionAreas[0],
        type: "position-area"
      }) : i.atRules.length && i.tactics.length ? n.push({
        tactics: i.tactics,
        atRule: i.atRules[0],
        type: "at-rule-with-try-tactic"
      }) : i.atRules.length ? n.push({
        atRule: i.atRules[0],
        type: "at-rule"
      }) : i.tactics.length && n.push({
        tactics: i.tactics,
        type: "try-tactic"
      });
    }), n;
  }
  function wg(e) {
    return ig(e) && e.value.children.first ? ca(e.value.children) : [];
  }
  function vg(e) {
    if (sg(e) && e.value.children.first) {
      const t = un(e);
      let n;
      const r = t.value.children.first.name;
      r && cg(r) && (n = r, t.value.children.shift());
      const i = ca(t.value.children);
      return { order: n, options: i };
    }
    return {};
  }
  function Sg(e) {
    return og(e) && e.value.children.first ? {
      order: e.value.children.first.name
    } : {};
  }
  function Cg(e) {
    const { order: t, options: n } = vg(e);
    if (t || n)
      return { order: t, options: n };
    const { order: r } = Sg(e), i = wg(e);
    return r || i ? { order: r, options: i } : {};
  }
  function Tg(e) {
    return zt(e.property) || Km(e.property) || vn(e.property) || Ym(e.property) || ["position-anchor", "position-area"].includes(e.property);
  }
  function Ag(e) {
    var t, n;
    if (ag(e) && ((t = e.prelude) != null && t.value) && ((n = e.block) != null && n.children)) {
      const r = e.prelude.value, i = e.block.children.filter(
        (s) => rg(s) && Tg(s)
      ), o = {
        uuid: `${r}-try-${ke(12)}`,
        declarations: Object.fromEntries(
          i.map((s) => [s.property, le(s.value)])
        )
      };
      return { name: r, tryBlock: o };
    }
    return {};
  }
  function Og(e) {
    const t = {}, n = {}, r = {};
    for (const i of e) {
      const o = Be(i.css);
      Fe(o, {
        visit: "Atrule",
        enter(s) {
          const { name: c, tryBlock: l } = Ag(s);
          c && l && (t[c] = l);
        }
      });
    }
    for (const i of e) {
      let o = !1;
      const s = /* @__PURE__ */ new Set(), c = Be(i.css);
      Fe(c, {
        visit: "Declaration",
        enter(l) {
          var w;
          const a = (w = this.rule) == null ? void 0 : w.prelude, u = ar(a);
          if (!u.length) return;
          const { order: h, options: d } = Cg(l), m = {};
          h && (m.order = h), u.forEach(({ selector: k }) => {
            var C, b;
            d == null || d.forEach((x) => {
              var v, A, P;
              let T;
              if (x.type === "at-rule")
                T = x.atRule;
              else if (x.type === "try-tactic") {
                T = `${k}-${x.tactics.join("-")}`;
                const O = ug(
                  k,
                  x.tactics
                );
                O && (t[T] = {
                  uuid: `${k}-${x.tactics.join("-")}-try-${ke(12)}`,
                  declarations: O
                });
              } else if (x.type === "at-rule-with-try-tactic") {
                T = `${k}-${x.atRule}-${x.tactics.join("-")}`;
                const O = t[x.atRule], p = hg(
                  O,
                  x.tactics
                );
                p && (t[T] = {
                  uuid: `${k}-${x.atRule}-${x.tactics.join("-")}-try-${ke(12)}`,
                  declarations: p
                });
              }
              if (T && t[T]) {
                const O = `[data-anchor-polyfill="${t[T].uuid}"]`;
                (v = n[O]) != null || (n[O] = []), n[O].push(k), s.has(T) || ((A = m.fallbacks) != null || (m.fallbacks = []), m.fallbacks.push(t[T]), s.add(T), (P = this.stylesheet) == null || P.children.prependData({
                  type: "Rule",
                  prelude: {
                    type: "Raw",
                    value: O
                  },
                  block: {
                    type: "Block",
                    children: new q().fromArray(
                      Object.entries(t[T].declarations).map(
                        ([p, f]) => ({
                          type: "Declaration",
                          important: !0,
                          property: p,
                          value: {
                            type: "Raw",
                            value: f
                          }
                        })
                      )
                    )
                  }
                }), o = !0);
              }
            }), Object.keys(m).length > 0 && (r[k] ? (m.order && (r[k].order = m.order), m.fallbacks && ((b = (C = r[k]).fallbacks) != null || (C.fallbacks = []), r[k].fallbacks.push(
              ...m.fallbacks
            ))) : r[k] = m);
          });
        }
      }), o && (i.css = le(c), i.changed = !0);
    }
    return { fallbackTargets: n, validPositions: r };
  }
  function Eg(e, t) {
    return !e || e === t ? !1 : ua(e) ? e.document.contains(t) : e.contains(t);
  }
  function ua(e) {
    return !!(e && e === e.window);
  }
  function Lg(e) {
    return gt(e, "position", "fixed");
  }
  function cr(e) {
    return !!(e && (Lg(e) || gt(e, "position", "absolute")));
  }
  function Gi(e, t) {
    return e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING;
  }
  function $g(e) {
    return H(this, null, function* () {
      return yield ee.getOffsetParent(e);
    });
  }
  function qn(e) {
    return H(this, null, function* () {
      if (!["absolute", "fixed"].includes(Ce(e, "position")))
        return yield $g(e);
      let t = e.parentElement;
      for (; t; ) {
        if (!gt(t, "position", "static") && gt(t, "display", "block"))
          return t;
        t = t.parentElement;
      }
      return window;
    });
  }
  function _g(e, t, n, r) {
    return H(this, null, function* () {
      const i = yield qn(e), o = yield qn(n);
      if (!(Eg(o, e) || ua(o)) || i === o && !(!cr(e) || Gi(e, n)))
        return !1;
      if (i !== o) {
        let s;
        const c = [];
        for (s = i; s && s !== o && s !== window; )
          c.push(s), s = yield qn(s);
        const l = c[c.length - 1];
        if (l instanceof HTMLElement && !(!cr(l) || Gi(l, n)))
          return !1;
      }
      {
        let s = e.parentElement;
        for (; s; ) {
          if (gt(s, "content-visibility", "hidden"))
            return !1;
          s = s.parentElement;
        }
      }
      return !(t && r && Vi(e, t, r) !== Vi(n, t, r));
    });
  }
  function Vi(e, t, n) {
    for (; !(e.matches(n) && Wm(e, t)); ) {
      if (!e.parentElement)
        return null;
      e = e.parentElement;
    }
    return e;
  }
  function Pg(e, t, n, r) {
    return H(this, null, function* () {
      if (!(e instanceof HTMLElement && n.length && cr(e)))
        return null;
      const i = n.flatMap(Fm).filter((s) => Bm(s, t)), o = r.map((s) => s.selector).join(",") || null;
      for (let s = i.length - 1; s >= 0; s--) {
        const c = i[s], l = "fakePseudoElement" in c;
        if (yield _g(
          l ? c.fakePseudoElement : c,
          t,
          e,
          o
        ))
          return l && c.removeFakePseudoElement(), c;
      }
      return null;
    });
  }
  function zg(e) {
    return e.type === "Declaration" && e.property === "anchor-name";
  }
  function Ig(e) {
    return e.type === "Declaration" && e.property === "anchor-scope";
  }
  function ha(e) {
    return !!(e && e.type === "Function" && e.name === "anchor-size");
  }
  function Xt(e) {
    return !!(e && e.type === "Function" && e.name === "var");
  }
  function Ot(e) {
    return !!(e.type === "Identifier" && e.name);
  }
  function Rg(e) {
    return !!(e.type === "Percentage" && e.value);
  }
  function Ki(e, t) {
    let n, r, i, o = "", s = !1, c;
    const l = [];
    e.children.toArray().forEach((d) => {
      if (s) {
        o = `${o}${le(d)}`;
        return;
      }
      if (d.type === "Operator" && d.value === ",") {
        s = !0;
        return;
      }
      l.push(d);
    });
    let [a, u] = l;
    if (u || (u = a, a = void 0), a && (Ot(a) && a.name.startsWith("--") ? n = a.name : Xt(a) && a.children.first && (c = a.children.first.name)), u)
      if (Ir(e)) {
        if (Ot(u) && sa(u.name))
          r = u.name;
        else if (Rg(u)) {
          const d = Number(u.value);
          r = Number.isNaN(d) ? void 0 : d;
        }
      } else ha(e) && Ot(u) && Jm(u.name) && (i = u.name);
    const h = `--anchor-${ke(12)}`;
    return Object.assign(e, {
      type: "Raw",
      value: `var(${h})`,
      children: null
    }), Reflect.deleteProperty(e, "name"), {
      anchorName: n,
      anchorSide: r,
      anchorSize: i,
      fallbackValue: o || "0px",
      customPropName: c,
      uuid: h
    };
  }
  function Yi(e) {
    return e.value.children.map(
      ({ name: t }) => t
    );
  }
  let at = {}, je = {}, Ke = {}, Et = {}, Ve = {};
  function Mg() {
    at = {}, je = {}, Ke = {}, Et = {}, Ve = {};
  }
  function Ng(e, t) {
    var n;
    if ((Ir(e) || ha(e)) && t) {
      if (t.property.startsWith("--")) {
        const r = le(t.value), i = Ki(e);
        return Et[i.uuid] = r, Ke[t.property] = [
          ...(n = Ke[t.property]) != null ? n : [],
          i
        ], { changed: !0 };
      }
      if (zt(t.property) || vn(t.property)) {
        const r = Ki(e);
        return { prop: t.property, data: r, changed: !0 };
      }
    }
    return {};
  }
  function Dg(e, t) {
    return H(this, null, function* () {
      let n = t.anchorName;
      const r = t.customPropName;
      if (e && !n) {
        const c = Ce(
          e,
          "position-anchor"
        );
        c ? n = c : r && (n = Ce(e, r));
      }
      const i = n ? at[n] || [] : [], o = n ? je[ta.All] || [] : [], s = n ? je[n] || [] : [];
      return yield Pg(
        e,
        n || null,
        i,
        [...o, ...s]
      );
    });
  }
  function jg(e) {
    return H(this, null, function* () {
      var l, a, u, h, d, m, w;
      const t = {};
      Mg();
      const { fallbackTargets: n, validPositions: r } = Og(e);
      for (const k of e) {
        let C = !1;
        const b = Be(k.css);
        Fe(b, function(x) {
          var p, f, S, g, K;
          const T = (p = this.rule) == null ? void 0 : p.prelude, v = ar(T);
          if (zg(x) && v.length)
            for (const R of Yi(x))
              (f = at[R]) != null || (at[R] = []), at[R].push(...v);
          if (Ig(x) && v.length)
            for (const R of Yi(x))
              (S = je[R]) != null || (je[R] = []), je[R].push(...v);
          const {
            prop: A,
            data: P,
            changed: O
          } = Ng(x, this.declaration);
          if (A && P && v.length)
            for (const { selector: R } of v)
              t[R] = Z(_({}, t[R]), {
                [A]: [...(K = (g = t[R]) == null ? void 0 : g[A]) != null ? K : [], P]
              });
          O && (C = !0);
        }), C && (k.css = le(b), k.changed = !0);
      }
      const i = new Set(Object.keys(Ke)), o = {}, s = (k) => {
        var x, T, v, A, P;
        const C = [], b = new Set((T = (x = o[k]) == null ? void 0 : x.names) != null ? T : []);
        for (; b.size > 0; )
          for (const O of b)
            C.push(...(v = Ke[O]) != null ? v : []), b.delete(O), (P = (A = o[O]) == null ? void 0 : A.names) != null && P.length && o[O].names.forEach((p) => b.add(p));
        return C;
      };
      for (; i.size > 0; ) {
        const k = [];
        for (const C of e) {
          let b = !1;
          const x = Be(C.css);
          Fe(x, {
            visit: "Function",
            enter(T) {
              var O, p;
              const v = (O = this.rule) == null ? void 0 : O.prelude, A = this.declaration, P = A == null ? void 0 : A.property;
              if ((v == null ? void 0 : v.children.isEmpty) === !1 && Xt(T) && A && P && T.children.first && i.has(
                T.children.first.name
              ) && // For now, we only want assignments to other CSS custom properties
              P.startsWith("--")) {
                const f = T.children.first, S = (p = Ke[f.name]) != null ? p : [], g = s(f.name);
                if (!(S.length || g.length))
                  return;
                const K = `${f.name}-anchor-${ke(12)}`, R = le(A.value);
                Et[K] = R, o[P] || (o[P] = { names: [], uuids: [] });
                const be = o[P];
                be.names.includes(f.name) || be.names.push(f.name), be.uuids.push(K), k.push(P), f.name = K, b = !0;
              }
            }
          }), b && (C.css = le(x), C.changed = !0);
        }
        i.clear(), k.forEach((C) => i.add(C));
      }
      for (const k of e) {
        let C = !1;
        const b = Be(k.css);
        Fe(b, {
          visit: "Function",
          enter(x) {
            var P, O, p, f, S, g, K;
            const T = (P = this.rule) == null ? void 0 : P.prelude, v = this.declaration, A = v == null ? void 0 : v.property;
            if ((T == null ? void 0 : T.children.isEmpty) === !1 && Xt(x) && v && A && x.children.first && // Now we only want assignments to inset/sizing properties
            (zt(A) || vn(A))) {
              const R = x.children.first, be = (O = Ke[R.name]) != null ? O : [], Y = s(R.name);
              if (!(be.length || Y.length))
                return;
              const ze = `${A}-${ke(12)}`;
              if (Y.length) {
                const Ze = /* @__PURE__ */ new Set([R.name]);
                for (; Ze.size > 0; )
                  for (const Je of Ze) {
                    const ie = o[Je];
                    if ((p = ie == null ? void 0 : ie.names) != null && p.length && ((f = ie == null ? void 0 : ie.uuids) != null && f.length))
                      for (const et of ie.names)
                        for (const tt of ie.uuids)
                          Ve[tt] = Z(_({}, Ve[tt]), {
                            // - `key` (`propUuid`) is the property-specific
                            //   uuid to append to the new custom property name
                            // - `value` is the new property-specific custom
                            //   property value to use
                            [ze]: `${et}-${ze}`
                          });
                    Ze.delete(Je), (S = ie == null ? void 0 : ie.names) != null && S.length && ie.names.forEach((et) => Ze.add(et));
                  }
              }
              const Ue = ar(T);
              for (const Ze of [...be, ...Y]) {
                const Je = _({}, Ze), ie = `--anchor-${ke(12)}-${A}`, et = Je.uuid;
                Je.uuid = ie;
                for (const { selector: tt } of Ue)
                  t[tt] = Z(_({}, t[tt]), {
                    [A]: [...(K = (g = t[tt]) == null ? void 0 : g[A]) != null ? K : [], Je]
                  });
                Ve[et] = Z(_({}, Ve[et]), {
                  // - `key` (`propUuid`) is the property-specific
                  //   uuid to append to the new custom property name
                  // - `value` is the new property-specific custom
                  //   property value to use
                  [ze]: ie
                });
              }
              R.name = `${R.name}-${ze}`, C = !0;
            }
          }
        }), C && (k.css = le(b), k.changed = !0);
      }
      if (Object.keys(Ve).length > 0)
        for (const k of e) {
          let C = !1;
          const b = Be(k.css);
          Fe(b, {
            visit: "Function",
            enter(x) {
              var T, v, A, P;
              if (Xt(x) && ((v = (T = x.children.first) == null ? void 0 : T.name) != null && v.startsWith(
                "--"
              )) && ((P = (A = this.declaration) == null ? void 0 : A.property) != null && P.startsWith("--")) && this.block) {
                const O = x.children.first, p = Ve[O.name];
                if (p)
                  for (const [f, S] of Object.entries(p))
                    this.block.children.appendData({
                      type: "Declaration",
                      important: !1,
                      property: `${this.declaration.property}-${f}`,
                      value: {
                        type: "Raw",
                        value: le(this.declaration.value).replace(
                          `var(${O.name})`,
                          `var(${S})`
                        )
                      }
                    }), C = !0;
                Et[O.name] && (this.declaration.value = {
                  type: "Raw",
                  value: Et[O.name]
                }, C = !0);
              }
            }
          }), C && (k.css = le(b), k.changed = !0);
        }
      const c = /* @__PURE__ */ new Map();
      for (const [k, C] of Object.entries(t)) {
        let b;
        k.startsWith("[data-anchor-polyfill=") && ((l = n[k]) != null && l.length) ? b = document.querySelectorAll(n[k].join(",")) : b = document.querySelectorAll(k);
        for (const [x, T] of Object.entries(C))
          for (const v of T)
            for (const A of b) {
              const P = yield Dg(A, v), O = `--anchor-${ke(12)}`;
              c.set(A, Z(_({}, (a = c.get(A)) != null ? a : {}), {
                [v.uuid]: O
              })), A.setAttribute(
                "style",
                `${v.uuid}: var(${O}); ${(u = A.getAttribute("style")) != null ? u : ""}`
              ), r[k] = Z(_({}, r[k]), {
                declarations: Z(_({}, (h = r[k]) == null ? void 0 : h.declarations), {
                  [x]: [
                    ...(w = (m = (d = r[k]) == null ? void 0 : d.declarations) == null ? void 0 : m[x]) != null ? w : [],
                    Z(_({}, v), { anchorEl: P, targetEl: A, uuid: O })
                  ]
                })
              });
            }
      }
      return { rules: r, inlineStyles: c, anchorScopes: je };
    });
  }
  const Fg = [
    "crossorigin",
    "href",
    "integrity",
    "referrerpolicy"
  ];
  function Qi(e, t, n = !1) {
    return H(this, null, function* () {
      const r = [];
      for (const { el: i, css: o, changed: s } of e) {
        const c = { el: i, css: o, changed: !1 };
        if (s) {
          if (i.tagName.toLowerCase() === "style")
            i.innerHTML = o;
          else if (i instanceof HTMLLinkElement) {
            const l = new Blob([o], { type: "text/css" }), a = URL.createObjectURL(l), u = document.createElement("link");
            for (const d of i.getAttributeNames())
              if (!d.startsWith("on") && !Fg.includes(d)) {
                const m = i.getAttribute(d);
                m !== null && u.setAttribute(d, m);
              }
            u.setAttribute("href", a);
            const h = new Promise((d) => {
              u.onload = d;
            });
            i.insertAdjacentElement("beforebegin", u), yield h, i.remove(), c.el = u;
          } else if (i.hasAttribute("data-has-inline-styles")) {
            const l = i.getAttribute("data-has-inline-styles");
            if (l) {
              const a = `[data-has-inline-styles="${l}"]{`;
              let h = o.slice(a.length, 0 - "}".length);
              const d = t == null ? void 0 : t.get(i);
              if (d)
                for (const [m, w] of Object.entries(d))
                  h = `${m}: var(${w}); ${h}`;
              i.setAttribute("style", h);
            }
          }
        }
        n && i.hasAttribute("data-has-inline-styles") && i.removeAttribute("data-has-inline-styles"), r.push(c);
      }
      return r;
    });
  }
  const Bg = Z(_({}, ee), { _c: /* @__PURE__ */ new Map() }), pa = (e) => H(Rr, null, function* () {
    var n, r, i;
    let t = yield (n = ee.getOffsetParent) == null ? void 0 : n.call(ee, e);
    return (yield (r = ee.isElement) == null ? void 0 : r.call(ee, t)) || (t = (yield (i = ee.getDocumentElement) == null ? void 0 : i.call(ee, e)) || window.document.documentElement), t;
  }), Wg = (e, t) => {
    let n;
    switch (e) {
      case "start":
      case "self-start":
        n = 0;
        break;
      case "end":
      case "self-end":
        n = 100;
        break;
      default:
        typeof e == "number" && !Number.isNaN(e) && (n = e);
    }
    if (n !== void 0)
      return t ? 100 - n : n;
  }, Hg = (e, t) => {
    let n;
    switch (e) {
      case "block":
      case "self-block":
        n = t ? "width" : "height";
        break;
      case "inline":
      case "self-inline":
        n = t ? "height" : "width";
        break;
    }
    return n;
  }, Xi = (e) => {
    switch (e) {
      case "top":
      case "bottom":
        return "y";
      case "left":
      case "right":
        return "x";
    }
    return null;
  }, Ug = (e) => {
    switch (e) {
      case "x":
        return "width";
      case "y":
        return "height";
    }
    return null;
  }, Zi = (e) => Ce(e, "display") === "inline", Ji = (e, t) => (t === "x" ? ["border-left-width", "border-right-width"] : ["border-top-width", "border-bottom-width"]).reduce(
    (r, i) => r + parseInt(Ce(e, i), 10),
    0
  ) || 0, Ut = (e, t) => parseInt(Ce(e, `margin-${t}`), 10) || 0, qg = (e) => ({
    top: Ut(e, "top"),
    right: Ut(e, "right"),
    bottom: Ut(e, "bottom"),
    left: Ut(e, "left")
  }), eo = (s) => H(Rr, [s], function* ({
    targetEl: e,
    targetProperty: t,
    anchorRect: n,
    anchorSide: r,
    anchorSize: i,
    fallback: o
  }) {
    var c;
    if (!((i || r !== void 0) && e && n))
      return o;
    if (i) {
      if (!vn(t))
        return o;
      let l;
      switch (i) {
        case "width":
        case "height":
          l = i;
          break;
        default: {
          let a = !1;
          const u = Ce(e, "writing-mode");
          a = u.startsWith("vertical-") || u.startsWith("sideways-"), l = Hg(i, a);
        }
      }
      return l ? `${n[l]}px` : o;
    }
    if (r !== void 0) {
      let l, a;
      const u = Xi(t);
      if (!(zt(t) && u && (!zt(r) || u === Xi(r))))
        return o;
      switch (r) {
        case "left":
          l = 0;
          break;
        case "right":
          l = 100;
          break;
        case "top":
          l = 0;
          break;
        case "bottom":
          l = 100;
          break;
        case "center":
          l = 50;
          break;
        default:
          if (e) {
            const m = (yield (c = ee.isRTL) == null ? void 0 : c.call(ee, e)) || !1;
            l = Wg(r, m);
          }
      }
      const h = typeof l == "number" && !Number.isNaN(l), d = Ug(u);
      if (h && d) {
        (t === "bottom" || t === "right") && (a = yield pa(e));
        let m = n[u] + n[d] * (l / 100);
        switch (t) {
          case "bottom": {
            if (!a)
              break;
            let w = a.clientHeight;
            if (w === 0 && Zi(a)) {
              const k = Ji(a, u);
              w = a.offsetHeight - k;
            }
            m = w - m;
            break;
          }
          case "right": {
            if (!a)
              break;
            let w = a.clientWidth;
            if (w === 0 && Zi(a)) {
              const k = Ji(a, u);
              w = a.offsetWidth - k;
            }
            m = w - m;
            break;
          }
        }
        return `${m}px`;
      }
    }
    return o;
  });
  function Gg(e, t = !1) {
    return H(this, null, function* () {
      const n = document.documentElement;
      for (const [r, i] of Object.entries(e))
        for (const o of i) {
          const s = o.anchorEl, c = o.targetEl;
          if (s && c)
            uo(
              s,
              c,
              () => H(this, null, function* () {
                const l = yield ee.getElementRects({
                  reference: s,
                  floating: c,
                  strategy: "absolute"
                }), a = yield eo({
                  targetEl: c,
                  targetProperty: r,
                  anchorRect: l.reference,
                  anchorSide: o.anchorSide,
                  anchorSize: o.anchorSize,
                  fallback: o.fallbackValue
                });
                n.style.setProperty(o.uuid, a);
              }),
              { animationFrame: t }
            );
          else {
            const l = yield eo({
              targetProperty: r,
              anchorSide: o.anchorSide,
              anchorSize: o.anchorSize,
              fallback: o.fallbackValue
            });
            n.style.setProperty(o.uuid, l);
          }
        }
    });
  }
  function to(e, t) {
    return H(this, null, function* () {
      const n = yield ee.getElementRects({
        reference: e,
        floating: e,
        strategy: "absolute"
      });
      return yield ja(
        {
          x: e.offsetLeft,
          y: e.offsetTop,
          platform: Bg,
          rects: n,
          elements: { floating: e },
          strategy: "absolute"
        },
        {
          boundary: t,
          rootBoundary: "document",
          padding: qg(e)
        }
      );
    });
  }
  function Vg(e, t, n = !1) {
    return H(this, null, function* () {
      if (!t.length)
        return;
      const r = document.querySelectorAll(e);
      for (const i of r) {
        let o = !1;
        const s = yield pa(i);
        uo(
          // We're just checking whether the target element overflows, so we don't
          // care about the position of the anchor element in this case. Passing in
          // an empty object instead of a reference element avoids unnecessarily
          // watching for irrelevant changes.
          {},
          i,
          () => H(this, null, function* () {
            if (o)
              return;
            o = !0, i.removeAttribute("data-anchor-polyfill");
            const c = yield to(i, s);
            if (Object.values(c).every((l) => l <= 0)) {
              i.removeAttribute("data-anchor-polyfill-last-successful"), o = !1;
              return;
            }
            for (const [l, { uuid: a }] of t.entries()) {
              i.setAttribute("data-anchor-polyfill", a);
              const u = yield to(i, s);
              if (Object.values(u).every((h) => h <= 0)) {
                i.setAttribute("data-anchor-polyfill-last-successful", a), o = !1;
                break;
              }
              if (l === t.length - 1) {
                const h = i.getAttribute(
                  "data-anchor-polyfill-last-successful"
                );
                h ? i.setAttribute("data-anchor-polyfill", h) : i.removeAttribute("data-anchor-polyfill"), o = !1;
                break;
              }
            }
          }),
          { animationFrame: n, layoutShift: !1 }
        );
      }
    });
  }
  function Kg(e, t = !1) {
    return H(this, null, function* () {
      var n, r;
      for (const i of Object.values(e))
        yield Gg((n = i.declarations) != null ? n : {}, t);
      for (const [i, o] of Object.entries(e))
        yield Vg(
          i,
          (r = o.fallbacks) != null ? r : [],
          t
        );
    });
  }
  function Yg(e = {}) {
    const t = typeof e == "boolean" ? { useAnimationFrame: e } : e, n = t.useAnimationFrame === void 0 ? !!window.UPDATE_ANCHOR_ON_ANIMATION_FRAME : t.useAnimationFrame;
    return Array.isArray(t.elements) || (t.elements = void 0), Object.assign(t, { useAnimationFrame: n });
  }
  function no(e) {
    return H(this, null, function* () {
      const t = Yg(
        window.ANCHOR_POSITIONING_POLYFILL_OPTIONS
      );
      let n = yield Vm(t.elements, t.excludeInlineStyles);
      (yield Mm(n)) && (n = yield Qi(n));
      const { rules: i, inlineStyles: o } = yield jg(n);
      return Object.values(i).length && (yield Qi(n, o, !0), yield Kg(i, t.useAnimationFrame)), i;
    });
  }
  document.readyState !== "complete" ? window.addEventListener("load", () => {
    no();
  }) : no();
});
export default Qg();
//# sourceMappingURL=css-anchor-positioning.js.map
