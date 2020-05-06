// const Sequelize = require('sequelize');

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'library.db',
//   logging: false,
//   // global options
//   define: {
//     freezeTableName: true,
//     timestamps: false,
//   },
// });

// const db = {
//   sequelize,
//   Sequelize,
//   models: {},
// };

// db.models.book = require('./models/book.js')(sequelize);

// module.exports = db;


// PROMISES
// function getUsers() {

//   return new Promise( (resolve, reject)=> {
//       ...if(err) reject
//       ...else doSomething...
//         return resolve
//   })
// };

// app.get('/', ( req, res, next ) => {
//   getUsers().then().then.catch()

// });