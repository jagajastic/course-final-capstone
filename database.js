import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon.db');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text);',
        );
      },
      reject,
      resolve,
    );
  });
}

export async function createUserTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'create table if not exists user (id integer primary key not null, uuid text, first_name text, last_name text, email text, phone text, order_status boolean, password_changes boolean, special_offers boolean, newsletter boolean);',
        );
      },
      reject,
      resolve,
    );
  });
}

export async function getMenuItems() {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export async function getUserInformation(email) {
  console.log(email)
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from user where email like '%${email}%'`,
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction(tx => {
    // 2. Implement a single SQL statement to save all menu data in a table called menuitems.
    // Check the createTable() function above to see all the different columns the table has
    // Hint: You need a SQL statement to insert multiple rows at once.
    db.transaction(tx => {
      const values = menuItems.map(
        ({ id, uuid, title, price, category }) =>
          `(${id}, '${uuid}', '${title}', '${price}', '${category}')`,
      );
      const sql = `INSERT INTO menuitems (id, uuid, title, price, category) VALUES ${values.join(
        ', ',
      )};`;
      tx.executeSql(sql);
    });
  });
}

export function saveUserInformation(values) {
  db.transaction(tx => {
    db.transaction(tx => {
      const sql = `INSERT INTO user (id, uuid, first_name, last_name, email, phone, order_status, password_changes, special_offers, newsletter) VALUES ${values}`;
      tx.executeSql(sql,  (err, result) => {
        console.log("result--->", err, result.rows)
      });
    });
  });
}

/**
 * 4. Implement a transaction that executes a SQL statement to filter the menu by 2 criteria:
 * a query string and a list of categories.
 *
 * The query string should be matched against the menu item titles to see if it's a substring.
 * For example, if there are 4 items in the database with titles: 'pizza, 'pasta', 'french fries' and 'salad'
 * the query 'a' should return 'pizza' 'pasta' and 'salad', but not 'french fries'
 * since the latter does not contain any 'a' substring anywhere in the sequence of characters.
 *
 * The activeCategories parameter represents an array of selected 'categories' from the filter component
 * All results should belong to an active category to be retrieved.
 * For instance, if 'pizza' and 'pasta' belong to the 'Main Dishes' category and 'french fries' and 'salad' to the 'Sides' category,
 * a value of ['Main Dishes'] for active categories should return  only'pizza' and 'pasta'
 *
 * Finally, the SQL statement must support filtering by both criteria at the same time.
 * That means if the query is 'a' and the active category 'Main Dishes', the SQL statement should return only 'pizza' and 'pasta'
 * 'french fries' is excluded because it's part of a different category and 'salad' is excluded due to the same reason,
 * even though the query 'a' it's a substring of 'salad', so the combination of the two filters should be linked with the AND keyword
 *
 */
function convertToString(data) {
  return JSON.parse(
    JSON.stringify(data, function (key, value) {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    }),
  );
}
export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        // const activeCategoriesStr = activeCategories.map((category) => `${category}`).join(',');
        // const queryStr = `%${query}%`;
        // const whereClause = activeCategories.length > 0 ? `WHERE category IN (${activeCategoriesStr}) AND title LIKE ?` : `WHERE title LIKE ?`;
        // const sql = `SELECT id, title, price, category FROM menuitems ${whereClause}`;
        // const params = activeCategories.length > 0 ? [...activeCategories, queryStr] : [queryStr];

        tx.executeSql(
          `SELECT * FROM menuitems WHERE title LIKE '%${query}%' AND category IN (${activeCategories
            .map(category => `'${category}'`)
            .join(',')})`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          },
        );
      },
      reject,
      resolve,
    );
  });
}
