import app from "./app";
import "../env.config"; // Load environment variables from the .env file
 
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});