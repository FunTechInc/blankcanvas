import { jsx as b } from "react/jsx-runtime";
import Y, { useRef as w, useEffect as x } from "react";
import { createEvents as M, Canvas as O, extend as S, createRoot as T } from "@react-three/fiber";
import * as C from "three";
import I from "mitt";
const P = {
  onClick: ["click", !1],
  onContextMenu: ["contextmenu", !1],
  onDoubleClick: ["dblclick", !1],
  onWheel: ["wheel", !0],
  onPointerDown: ["pointerdown", !0],
  onPointerUp: ["pointerup", !0],
  onPointerLeave: ["pointerleave", !0],
  onPointerMove: ["pointermove", !0],
  onPointerCancel: ["pointercancel", !0],
  onLostPointerCapture: ["lostpointercapture", !0]
};
function L(l) {
  return (n) => {
    const { handlePointer: u } = M(n);
    return {
      priority: 1,
      enabled: !0,
      compute(s, o) {
        o.pointer.set(
          s.offsetX / o.size.width * 2 - 1,
          -(s.offsetY / o.size.height) * 2 + 1
        ), o.raycaster.setFromCamera(o.pointer, o.camera);
      },
      connected: void 0,
      handlers: Object.keys(P).reduce(
        (s, o) => ({ ...s, [o]: u(o) }),
        {}
      ),
      connect: (s) => {
        var d;
        const { set: o, events: c } = n.getState();
        (d = c.disconnect) == null || d.call(c), o((m) => ({
          events: { ...m.events, connected: s }
        })), Object.entries((c == null ? void 0 : c.handlers) ?? []).forEach(([m, v]) => {
          const [g] = P[m];
          l.on(g, v);
        });
      },
      disconnect: () => {
        const { set: s, events: o } = n.getState();
        o.connected && (Object.entries(o.handlers ?? []).forEach(
          ([c, d]) => {
            const [m] = P[c];
            l.off(m, d);
          }
        ), s((c) => ({
          events: { ...c.events, connected: void 0 }
        })));
      }
    };
  };
}
function K(l) {
  return l && l.current !== void 0;
}
function W({
  eventSource: l,
  worker: n,
  fallback: u,
  style: s,
  className: o,
  id: c,
  ...d
}) {
  const [m, v] = Y.useState(!1), g = w(null), t = w(!1);
  return x(() => {
    if (!n)
      return;
    const i = g.current;
    try {
      if (!t.current) {
        const r = g.current.transferControlToOffscreen();
        t.current = !0, n.postMessage(
          {
            type: "init",
            payload: {
              props: d,
              drawingSurface: r,
              width: i.clientWidth,
              height: i.clientHeight,
              top: i.offsetTop,
              left: i.offsetLeft,
              pixelRatio: window.devicePixelRatio
            }
          },
          [r]
        );
      }
    } catch {
      v(!0);
      return;
    }
    n.onmessage = (r) => {
      r.data.type === "error" && v(!0);
    };
    const a = K(l) ? l.current : l || i;
    Object.values(P).forEach(([r, p]) => {
      a.addEventListener(
        r,
        (e) => {
          p || e.preventDefault(), r === "pointerdown" ? e.target.setPointerCapture(e.pointerId) : r === "pointerup" && e.target.releasePointerCapture(e.pointerId), n.postMessage({
            type: "dom_events",
            payload: {
              eventName: r,
              deltaX: e.deltaX,
              deltaY: e.deltaY,
              pointerId: e.pointerId,
              pointerType: e.pointerType,
              button: e.button,
              buttons: e.buttons,
              altKey: e.altKey,
              ctrlKey: e.ctrlKey,
              metaKey: e.metaKey,
              shiftKey: e.shiftKey,
              movementX: e.movementX,
              movementY: e.movementY,
              clientX: e.clientX,
              clientY: e.clientY,
              offsetX: e.offsetX,
              offsetY: e.offsetY,
              pageX: e.pageX,
              pageY: e.pageY,
              x: e.x,
              y: e.y
            }
          });
        },
        { passive: p }
      );
    });
    const f = () => {
      n.postMessage({
        type: "resize",
        payload: {
          width: a.clientWidth,
          height: a.clientHeight,
          top: a.offsetTop,
          left: a.offsetLeft
        }
      });
    };
    return window.addEventListener("resize", f), () => {
      window.removeEventListener("resize", f);
    };
  }, [n]), x(() => {
    n && n.postMessage({ type: "props", payload: d });
  }, [n, d]), m ? /* @__PURE__ */ b(O, { id: c, className: o, style: s, ...d, children: u }) : /* @__PURE__ */ b(
    "canvas",
    {
      id: c,
      className: o,
      style: {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "block",
        ...s
      },
      ref: g
    }
  );
}
function A(l) {
  S(C);
  let n, u = [1, 2], s = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    updateStyle: !1
  };
  const o = I(), g = {
    resize: ({ width: t, height: i, top: a, left: f }) => {
      n && n.configure({
        size: s = { width: t, height: i, top: a, left: f, updateStyle: !1 },
        dpr: u
      });
    },
    init: (t) => {
      const {
        props: i,
        drawingSurface: a,
        width: f,
        top: r,
        left: p,
        height: e,
        pixelRatio: z
      } = t;
      try {
        n && n.unmount(), Object.assign(a, {
          pageXOffset: p,
          pageYOffset: r,
          clientLeft: p,
          clientTop: r,
          clientWidth: f,
          clientHeight: e,
          style: { touchAction: "none" },
          ownerDocument: a,
          documentElement: a,
          getBoundingClientRect() {
            return s;
          },
          setAttribute() {
          },
          setPointerCapture() {
          },
          releasePointerCapture() {
          },
          addEventListener(h, y) {
            o.on(h, y);
          },
          removeEventListener(h, y) {
            o.off(h, y);
          }
        }), n = T(a), n.configure({
          events: L(o),
          size: s = { width: f, height: e, top: r, left: p, updateStyle: !1 },
          dpr: u = Math.min(Math.max(1, z), 2),
          ...i,
          onCreated: (h) => {
            i.eventPrefix && h.setEvents({
              compute: (y, E) => {
                const R = y[i.eventPrefix + "X"], X = y[i.eventPrefix + "Y"];
                E.pointer.set(
                  R / E.size.width * 2 - 1,
                  -(X / E.size.height) * 2 + 1
                ), E.raycaster.setFromCamera(
                  E.pointer,
                  E.camera
                );
              }
            });
          }
        }), n.render(l);
      } catch (h) {
        postMessage({ type: "error", payload: h == null ? void 0 : h.message });
      }
      self.window = a;
    },
    dom_events: (t) => {
      o.emit(t.eventName, {
        ...t,
        preventDefault() {
        },
        stopPropagation() {
        }
      });
    },
    props: (t) => {
      n && (t.dpr && (u = t.dpr), n.configure({ size: s, dpr: u, ...t }));
    }
  };
  self.onmessage = (t) => {
    const { type: i, payload: a } = t.data, f = g[i];
    f && f(a);
  }, C.ImageLoader.prototype.load = function(t, i, a, f) {
    this.path !== void 0 && (t = this.path + t), t = this.manager.resolveURL(t);
    const r = this, p = C.Cache.get(t);
    return p !== void 0 ? (r.manager.itemStart(t), i && i(p), r.manager.itemEnd(t), p) : (fetch(t).then((e) => e.blob()).then(
      (e) => createImageBitmap(e, {
        premultiplyAlpha: "none",
        colorSpaceConversion: "none"
      })
    ).then((e) => {
      C.Cache.add(t, e), i && i(e), r.manager.itemEnd(t);
    }).catch(f), {});
  }, self.window = {}, self.document = {}, self.Image = class {
    constructor() {
      this.height = 1, this.width = 1;
    }
    set onload(t) {
      t(!0);
    }
  };
}
export {
  W as Canvas,
  A as render
};
//# sourceMappingURL=r3f-offscreen.js.map
