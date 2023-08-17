import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { db } from ".";
 
const main = async()=>{
    console.log(`migrations in process..`)
    await migrate(db, {migrationsFolder: "migrations"});
    console.log(`migration finished ...`)
}

main()
.then(()=>{
    console.log(`finished`)
})
.catch((e)=>{
console.log(e)
})
.finally(()=>{
    process.exit();
})