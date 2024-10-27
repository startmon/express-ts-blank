// env.config.js
const dotenv = import("dotenv");

// Load environment variables from the .env file
dotenv.then((d) => d.config({
    path: ".env"
}));

// // const {config} = await import("dotenv");

// // config({
// //     path: ".env"
// // })

// env.config.ts
// import dotenv from "dotenv";

// // Load environment variables from the .env file synchronously
// dotenv.config({ path: ".env" });
