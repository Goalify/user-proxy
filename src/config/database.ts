import mongoose from "mongoose";

const { MONGO_URI } = process.env;

const databaseConnect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      // tslint:disable-next-line:no-console
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      // tslint:disable-next-line:no-console
      console.log("database connection failed. exiting now...");
      // tslint:disable-next-line:no-console
      console.error(error);
      process.exit(1);
    });
};

export default databaseConnect;