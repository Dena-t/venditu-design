/** Frontend-only basket. No backend exists yet, so items are kept in localStorage. */
const KEY = "venditu.basket";

export interface BasketItem {
  id: string;
  title: string;
  price: number;
  currency: string;
  image?: string;
  quantity: number;
}

export function getBasket(): BasketItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BasketItem[]) : [];
  } catch {
    return [];
  }
}

export function addToBasket(item: BasketItem) {
  const items = getBasket();
  const existing = items.find((i) => i.id === item.id);
  if (existing) existing.quantity += item.quantity;
  else items.push(item);
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable — basket stays in memory for this view */
  }
  return items;
}
