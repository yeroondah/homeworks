'use strict';

function handleTableClick(event) {
  if (event.target.tagName !== 'TH') {
    return;
  }

  const currentTh = event.target;
  const propName = currentTh.dataset.propName;

  table.dataset.sortBy = propName;

  if (currentTh.dataset.dir === undefined || currentTh.dataset.dir === '-1') {
    currentTh.dataset.dir = '1';
  }
  else {
    currentTh.dataset.dir = '-1';
  }

  sortTable(propName, currentTh.dataset.dir);
}
