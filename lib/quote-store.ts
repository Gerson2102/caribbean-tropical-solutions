"use client";

// ============================================================
// Quote Cart (Cotización) — client-side store
// ------------------------------------------------------------
// A tiny module-level store consumed via `useSyncExternalStore`
// (matching the repo's SSR-safe pattern in Hero.tsx). No backend,
// no database: selected products live in the browser and persist
// to localStorage. The source of truth for product data is always
// PRODUCTS in lib/constants.ts — storage only ever holds ids + qty.
// ============================================================

import { useSyncExternalStore } from "react";
import { PRODUCTS, WHATSAPP_URL } from "@/lib/constants";

export interface QuoteItem {
  id: string;
  qty: number;
}

export const MAX_QTY = 999;
const STORAGE_KEY = "cts_quote_v1";
const MAX_NAME_LEN = 80;
const MAX_PHONE_LEN = 30;

// Only ids that exist in the catalog are ever accepted into the cart.
const VALID_IDS = new Set(PRODUCTS.map((p) => p.id));

// --- Internal state (insertion order preserved by Map) ---
const items = new Map<string, number>();
let drawerOpen = false;

const itemListeners = new Set<() => void>();
const openListeners = new Set<() => void>();

// Snapshot caching: useSyncExternalStore requires a referentially
// stable value that only changes identity when the data changes.
const EMPTY: readonly QuoteItem[] = Object.freeze([]);
let itemsSnapshot: QuoteItem[] = [];
let snapshotDirty = true;

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
function clampQty(value: unknown): number {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n < 1) return 1;
  return n > MAX_QTY ? MAX_QTY : n;
}

function getItemsSnapshot(): QuoteItem[] {
  if (snapshotDirty) {
    itemsSnapshot = Array.from(items, ([id, qty]) => ({ id, qty }));
    snapshotDirty = false;
  }
  return itemsSnapshot;
}

function getServerSnapshot(): QuoteItem[] {
  return EMPTY as QuoteItem[];
}

function persist(): void {
  if (typeof window === "undefined") return;
  try {
    const payload = Array.from(items, ([id, qty]) => ({ id, qty }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // storage unavailable/full — cart keeps working in memory
  }
}

function emitItems(): void {
  snapshotDirty = true;
  persist();
  itemListeners.forEach((l) => l());
}

function emitOpen(): void {
  openListeners.forEach((l) => l());
}

// Rebuild in-memory state from storage, dropping anything that no
// longer matches the catalog or fails validation.
function hydrate(): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    items.clear();
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        for (const entry of parsed) {
          if (!entry || typeof entry !== "object") continue;
          const id = (entry as { id?: unknown }).id;
          const qty = (entry as { qty?: unknown }).qty;
          if (typeof id === "string" && VALID_IDS.has(id) && !items.has(id)) {
            items.set(id, clampQty(qty));
          }
        }
      }
    }
  } catch {
    items.clear(); // malformed storage — start clean
  } finally {
    snapshotDirty = true;
  }
}

// Initialize once on the client and keep multiple tabs in sync.
if (typeof window !== "undefined") {
  hydrate();
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      hydrate();
      itemListeners.forEach((l) => l());
    }
  });
}

// ------------------------------------------------------------
// Mutations
// ------------------------------------------------------------
export function removeItem(id: string): void {
  if (items.delete(id)) emitItems();
}

export function toggleItem(id: string): void {
  if (!VALID_IDS.has(id)) return;
  if (items.has(id)) items.delete(id);
  else items.set(id, 1);
  emitItems();
}

export function incrementItem(id: string): void {
  const current = items.get(id);
  if (current === undefined) return;
  items.set(id, clampQty(current + 1));
  emitItems();
}

export function decrementItem(id: string): void {
  const current = items.get(id);
  if (current === undefined || current <= 1) return; // floor at 1; removal is explicit
  items.set(id, current - 1);
  emitItems();
}

export function clearQuote(): void {
  if (items.size === 0) return;
  items.clear();
  emitItems();
}

export function openDrawer(): void {
  if (drawerOpen) return;
  drawerOpen = true;
  emitOpen();
}

export function closeDrawer(): void {
  if (!drawerOpen) return;
  drawerOpen = false;
  emitOpen();
}

// ------------------------------------------------------------
// Subscriptions
// ------------------------------------------------------------
function subscribeItems(cb: () => void): () => void {
  itemListeners.add(cb);
  return () => {
    itemListeners.delete(cb);
  };
}

function subscribeOpen(cb: () => void): () => void {
  openListeners.add(cb);
  return () => {
    openListeners.delete(cb);
  };
}

// ------------------------------------------------------------
// React hooks
// ------------------------------------------------------------
export function useQuoteItems(): QuoteItem[] {
  return useSyncExternalStore(subscribeItems, getItemsSnapshot, getServerSnapshot);
}

/** Distinct product count — used by the navbar badge. */
export function useQuoteCount(): number {
  return useQuoteItems().length;
}

/**
 * Whether a single product is in the cart. Returns a primitive, so a card
 * only re-renders when its own membership flips — not on every cart change.
 */
export function useIsInQuote(id: string): boolean {
  return useSyncExternalStore(
    subscribeItems,
    () => items.has(id),
    () => false,
  );
}

export function useDrawerOpen(): boolean {
  return useSyncExternalStore(
    subscribeOpen,
    () => drawerOpen,
    () => false,
  );
}

// ------------------------------------------------------------
// WhatsApp message
// ------------------------------------------------------------
export function buildQuoteUrl(
  contact: { nombre: string; telefono?: string },
  list: QuoteItem[],
): string {
  const nombre = contact.nombre.trim().slice(0, MAX_NAME_LEN);
  const telefono = (contact.telefono ?? "").trim().slice(0, MAX_PHONE_LEN);

  const lines = list.map((item, i) => {
    // Product name always comes from the catalog, never from storage.
    const product = PRODUCTS.find((p) => p.id === item.id);
    return `${i + 1}. ${product?.name ?? item.id} (x${item.qty})`;
  });

  const intro = telefono
    ? `Hola, soy ${nombre} (tel: ${telefono}).`
    : `Hola, soy ${nombre}.`;

  const message = `${intro}\nMe gustaría cotizar los siguientes productos:\n${lines.join("\n")}`;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
