import { UseBoundStore } from "zustand";
import { RootState, EventManager } from "@react-three/fiber";
import { Emitter } from "mitt";
export declare const EVENTS: {
    readonly onClick: readonly ["click", false];
    readonly onContextMenu: readonly ["contextmenu", false];
    readonly onDoubleClick: readonly ["dblclick", false];
    readonly onWheel: readonly ["wheel", true];
    readonly onPointerDown: readonly ["pointerdown", true];
    readonly onPointerUp: readonly ["pointerup", true];
    readonly onPointerLeave: readonly ["pointerleave", true];
    readonly onPointerMove: readonly ["pointermove", true];
    readonly onPointerCancel: readonly ["pointercancel", true];
    readonly onLostPointerCapture: readonly ["lostpointercapture", true];
};
export declare function createPointerEvents(emitter: Emitter<Record<any, unknown>>): (store: UseBoundStore<RootState | any>) => EventManager<HTMLElement>;
