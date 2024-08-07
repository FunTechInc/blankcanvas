import React from "react";
import type { Options as ResizeOptions } from "react-use-measure";
import { RenderProps } from "@react-three/fiber";
export interface CanvasProps extends Omit<RenderProps<HTMLCanvasElement>, "size">, React.HTMLAttributes<HTMLDivElement> {
    worker: Worker;
    fallback?: React.ReactNode;
    /**
     * Options to pass to useMeasure.
     * @see https://github.com/pmndrs/react-use-measure#api
     */
    resize?: ResizeOptions;
    /** The target where events are being subscribed to, default: the div that wraps canvas */
    eventSource?: HTMLElement | React.MutableRefObject<HTMLElement>;
    /** The event prefix that is cast into canvas pointer x/y events, default: "offset" */
    eventPrefix?: "offset" | "client" | "page" | "layer" | "screen";
}
export declare function Canvas({ eventSource, worker, fallback, style, className, id, ...props }: CanvasProps): import("react/jsx-runtime").JSX.Element;
