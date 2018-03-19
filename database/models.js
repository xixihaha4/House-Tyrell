const Sequelize = require('sequelize');
const {
  DB_NAME, DB_PORT, DB_UN, DB_PW, DB_URL
} = require('../config.js');

const db = new Sequelize(DB_NAME, DB_UN, DB_PW, {
  host: DB_URL,
  port: DB_PORT,
  dialect: 'mysql',
});

const Employee = db.define('Employees', {
  employee_id: Sequelize.INTEGER,
  employee_img: Sequelize.STRING,
  manager_password: Sequelize.STRING,
  manager_privilege: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  employee_name: Sequelize.STRING,
});

const Item = db.define('Items', {
  item_name: Sequelize.STRING,
  item_price: Sequelize.DECIMAL,
  item_image: Sequelize.STRING,
  item_ingredients: Sequelize.STRING,
  item_category: Sequelize.INTEGER,
});

const Category = db.define('Categories', {
  category_name: Sequelize.STRING,
});

const Sale = db.define('Sales', {
  sale_date: Sequelize.STRING,
  item_id: Sequelize.STRING,
  employee_id: Sequelize.INTEGER,
  sale_amount: Sequelize.DECIMAL,
  sale_cost: Sequelize.DECIMAL,
  sale_discount: Sequelize.INTEGER,
});

const Ingredient = db.define('Ingredients', {
  ingredient_name: Sequelize.STRING,
  order_number: Sequelize.STRING,
  ingredient_left: Sequelize.DECIMAL,
  ingredient_initial: Sequelize.DECIMAL,
  ingredient_cost: Sequelize.DECIMAL,
  ingredient_expire: Sequelize.STRING,
});

const Order = db.define('Orders', {
  order_date: Sequelize.STRING,
  order_id: Sequelize.INTEGER,
  order_initial: Sequelize.DECIMAL,
  order_left: Sequelize.DECIMAL,
  order_price: Sequelize.DECIMAL,
});

const Timesheet = db.define('Timesheets', {
  employee_id: Sequelize.INTEGER,
  check_in: Sequelize.STRING,
  check_out: Sequelize.STRING,
});


// db.sync({ force: true }).then(() => {
//   Ingredient.create({
//     ingredient_name: 'Ground Beef', order_number: 5, ingredient_left: 5.5, ingredient_initial: 10.5, ingredient_cost: 5, ingredient_expire: '03/25/2018',
//   });
//   Ingredient.create({
//     ingredient_name: 'Lettuce', order_number: 6, ingredient_left: 5.5, ingredient_initial: 10.5, ingredient_cost: 0.10, ingredient_expire: '03/25/2018',
//   });
//   Ingredient.create({
//     ingredient_name: 'Tomatoes', order_number: 10, ingredient_left: 5.5, ingredient_initial: 10.5, ingredient_cost: 0.25, ingredient_expire: '03/25/2018',
//   });
//   Ingredient.create({
//     ingredient_name: 'Onions', order_number: 9, ingredient_left: 5.5, ingredient_initial: 10.5, ingredient_cost: 0.15, ingredient_expire: '03/25/2018',
//   });
//   Ingredient.create({
//     ingredient_name: 'Pickles', order_number: 8, ingredient_left: 5.5, ingredient_initial: 10.5, ingredient_cost: 0.5, ingredient_expire: '03/25/2018',
//   });
//   Ingredient.create({
//     ingredient_name: 'Ketchup', order_number: 11, ingredient_left: 5.5, ingredient_initial: 10.5, ingredient_cost: 1, ingredient_expire: '03/25/2018',
//   });
//   Ingredient.create({
//     ingredient_name: 'Coca-Cola Cans', order_number: 12, ingredient_left: 80, ingredient_initial: 100, ingredient_cost: 0.10, ingredient_expire: '03/23/2018',
//   });
//   Category.create({
//     category_name: 'Drinks',
//   });
//   Category.create({
//     category_name: 'Burgers',
//   });
//   Category.create({
//     category_name: 'Salad',
//   });
//   Category.create({
//     category_name: 'Soup',
//   });
//   Category.create({
//     category_name: 'Steak',
//   });
//   Category.create({
//     category_name: 'Breakfast',
//   });
//   Item.create({
//     item_name: 'Hamburger', item_price: 5, item_image: 'https://www.rallys.com/wp-content/uploads/2017/03/BigBuford_Feature_1000x1000-600x600.jpg', item_ingredients: '[1, 2, 3, 4, 5, 6]', item_category: 2,
//   });
//   Item.create({
//     item_name: 'Coca-Cola', item_price: 1, item_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY2B_5VgeOlPdpGZLz3H4SBmazfFS1gsoxtcBddF0awQux3EiY', item_ingredients: '[7]', item_category: 1,
//   });
//   Item.create({
//     item_name: 'Basic Salad', item_price: 6, item_image: 'https://recipes.heart.org/-/media/aha/recipe/recipe-images/mediterranean-salad.jpg', item_ingredients: '[2, 3, 4]', item_category: 3,
//   });
//   Item.create({
//     item_name: 'Chicken Noodle Soup', item_price: 4, item_ingredients: '[6]', item_category: 4,
//   });
//   Item.create({
//     item_name: 'Egg and Cheese Sandwich', item_price: 3, item_ingredients: '[6]', item_category: 6,
//   });
// });

exports.Employee = Employee;
exports.Item = Item;
exports.Category = Category;
exports.Sale = Sale;
exports.Ingredient = Ingredient;
exports.Order = Order;
exports.Timesheet = Timesheet;
