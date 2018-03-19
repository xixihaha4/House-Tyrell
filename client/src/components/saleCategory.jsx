import React from 'react';

const SaleCategory = ({ menuCategories }) => (
  <div className="saleCategoryGrid">
    {
      menuCategories.map((category, i) =>
        <button type="button" className={`category_${i}`}>{category.category_name}</button>)
    }
    {
      menuCategories.map((category, i) =>
        <button type="button" className={`category_${i}`}>{category.category_name}</button>)
    }
  </div>
);

export default SaleCategory;
