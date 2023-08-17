import Pool from 'pg-pool'

//pooling connection
export const pool = new Pool({
    database: "postgres",
    connectionString: process.env.DATABASE_CONNECTION_URL,
    allowExitOnIdle: true,
});

