import React from 'react';

const SaleCategory = ({ menuCategories, filterByCategory }) => (
  <div className="saleCategoryGrid">
    {
      menuCategories.map((category, i) =>
        <button key={i} type="button" className={`category_${i}`} onClick={() => filterByCategory(category)}>{category.category_name}</button>)
    }
    {
      menuCategories.map((category, i) =>
        <button key={i} type="button" className={`category_${i}`} onClick={() => filterByCategory(category)}>{category.category_name}</button>)
    }
  </div>
);

export default SaleCategory;
