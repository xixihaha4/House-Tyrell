import React from 'react';

const SaleCategory = ({ menuCategories, filterByCategory, removeCategoryConfirm, openModal }) => (
  <div>
        <button type="button" className="createButton" onClick={() => openModal('categoryModal')}>Create</button>
        <button type="button" className="allButton" onClick={() => filterByCategory()}>All</button>
        <button type="button" className="allButton" onClick={() => console.log('hello')}>Popularity</button>
    {
      menuCategories.map((category, i) =>
        <button key={i} type="button">{category.category_name}<div onClick={() => removeCategoryConfirm(category)}><i className="fas fa-times-circle"></i></div></button>)
    }
  </div>
);

export default SaleCategory;
