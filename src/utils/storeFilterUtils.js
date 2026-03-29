import { hasIntersection, matchQuery } from '@/utils/storeSearchUtils';
import { PAGE_SIZE, DEFAULT_FILTERS } from '@/constants/storeOptions';

import { parseFilters } from '@/utils/storeSearchUtils';

export function applyFilters(allStores, nextFilters) {
  const areaFiltered =
    nextFilters.area === ''
      ? allStores
      : allStores.filter((s) => s.area === nextFilters.area);

  const queryFiltered = areaFiltered.filter((s) =>
    matchQuery(s, nextFilters.query)
  );

  const storeTypeFiltered = queryFiltered.filter((s) =>
    hasIntersection(Array.isArray(s.type) ? s.type : [], nextFilters.storeType)
  );

  const final = storeTypeFiltered.filter((s) =>
    hasIntersection(
      Array.isArray(s.petTypes) ? s.petTypes : [],
      nextFilters.petType
    )
  );

  return final;
}

export function paginate(list, page, pageSize) {
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const items = list.slice(start, start + pageSize);

  return {
    items,
    total,
    totalPages,
    safePage,
  };
}

export const processSearch = (params, stores) => {
  const nextFilters = {
    ...DEFAULT_FILTERS,
    ...parseFilters(params),
  };

  const filtered = applyFilters(stores, nextFilters);
  const { items, total, totalPages } = paginate(
    filtered,
    nextFilters.page,
    PAGE_SIZE
  );

  return { nextFilters, items, total, totalPages };
};
