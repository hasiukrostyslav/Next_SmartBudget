import { useState } from 'react';

// Row selection for one page of the list.
//
// No effect resets it when the URL changes: the page keys the list's Suspense
// boundary on the URL params, so a new query remounts the list and this state
// starts fresh. Ids that are no longer on the page (rows just deleted) are
// ignored, so the bulk toolbar never counts rows that are gone.
export function useCheckbox(ids: string[]) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const selectedIds = new Set(ids.filter((id) => selected.has(id)));
  const isAllSelected = ids.length > 0 && selectedIds.size === ids.length;

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const deselectAll = () => setSelected(new Set());
  const selectAll = () => setSelected(new Set(ids));
  const toggleSelectAll = () => (isAllSelected ? deselectAll() : selectAll());

  return {
    selectedIds,
    isAllSelected,
    toggleSelect,
    toggleSelectAll,
    selectAll,
    deselectAll,
  };
}
