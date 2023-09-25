import app from "./app.js";
import db from "./db/index.js";

//
import { generateFakeData } from "./fakeData/fakeData.js";
//

db.sync({
  force: false,
}).then(() => {
  console.log("DB is connected");
  const PORT = 5001;
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  //
  generateFakeData();
}).catch((err)=>{
  console.log(err)
})
