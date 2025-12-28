import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLowPerfDevice(): boolean {
  try {
    // Allow user override via query string or localStorage
    const params = new URLSearchParams(window.location.search);
    const overrideParam = params.get("effects"); // "on" | "off"
    const overrideStore = (localStorage.getItem("tp-effects") || "").toLowerCase();
    const override = (overrideParam || overrideStore) as "on" | "off" | "";
    if (override === "on") return false;
    if (override === "off") return true;

    const cores = (navigator as any).hardwareConcurrency || 4;
    const mem = (navigator as any).deviceMemory || 4;
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    const hasWebGL = !!gl;
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Relaxed thresholds: treat devices as low-perf only if clearly constrained
    return reduced || !hasWebGL || cores <= 2 || mem <= 2;
  } catch {
    return false;
  }
}
