import server from "./server";
import { ENV } from "../config/env";

server.listen(ENV.PORT, () => {
  console.log(`Server started on port ${ENV.PORT}`);
});
