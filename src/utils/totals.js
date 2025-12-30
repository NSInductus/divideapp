export function calculateTotals(people, items) {
  const totals = {};
  people.forEach(p => totals[p.id] = 0);

  items.forEach(it => {
    if (!it.people?.length) return;

    const share = it.price / it.people.length;

    it.people.forEach(pId => {
      totals[pId] += share;
    });
  });

  return totals;
}
