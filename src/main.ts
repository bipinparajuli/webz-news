import "./config/config";
import { handler } from "./services";

async function main() {
  function handlerCallBack(retrievedCount: number, totalCount: number) {
    console.log(`Retrieved ${retrievedCount} posts out of ${totalCount}`);
  }

  const query = `site_type:news language:english category:"Economy, Business and Finance" domain_rank:<45`;
  await handler({ queryString: query, limit: 200 }, handlerCallBack);
}

main();
