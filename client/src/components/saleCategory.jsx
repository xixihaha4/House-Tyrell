import React from 'react';

const SaleCategory = ({ menuCategories, filterByCategory }) => (
  <div >
        <button type="button" className={`category_0`} onClick={() => filterByCategory()}>All</button>
    {
      menuCategories.map((category, i) =>
        <button key={i} type="button" className={`category_${i + 1}`} onClick={() => filterByCategory(category)}>{category.category_name}</button>)
    }
    {
      menuCategories.map((category, i) =>
        <button key={i} type="button" className={`category_${i + 1}`} onClick={() => filterByCategory(category)}>{category.category_name}</button>)
    }
  </div>
);

export default SaleCategory;
