export function calculateTotals(people, items) {
  const totals = {};
  people.forEach(p => {
    totals[p.id] = 0;
  });

  items.forEach(item => {
    if (!item.parts || Object.keys(item.parts).length === 0) return;

    const totalParts = Object.values(item.parts).reduce(
      (sum, v) => sum + v,
      0
    );

    Object.entries(item.parts).forEach(([personId, part]) => {
      totals[personId] += (item.price * part) / totalParts;
    });
  });

  return totals;
}

export function calculateItemsTotal(items) {
  return items.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );
}

export function sumTotals(totals) {
  return Object.values(totals).reduce(
    (sum, value) => sum + value,
    0
  );
}
