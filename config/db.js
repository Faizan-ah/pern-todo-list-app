const { Client } = require("pg");
require("dotenv").config();

// const devConfig = {
//    host: process.env.PG_HOST,
//    user: process.env.PG_USER,
//    port: process.env.PG_PORT,
//    password: process.env.PG_PASSWORD,
//    database: process.env.PG_DATABASE,
// };

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const prodConfig = process.env.DATABASE_URL; //heroku addons

const client = new Client({
   connectionString:
      process.env.NODE_ENV === "production" ? prodConfig : devConfig,
});

const dbConnection = async () => {
   try {
      await client.connect();
      console.log("db connected");
   } catch (err) {
      console.error(err.message);
      process.exit(1);
   }
};
// const dbConnection = async () => {
//   try {
//     await mongoose.connect(config.get("mongoURI"), {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("db connected");
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

module.exports = { dbConnection, client };
