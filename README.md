# eMJay Shoes

## Node.js / express shop application

### Not production ready!!! This is just a proof of concept, needs more work...

---

### Using Postgres:

-   uses npm module `pg` to connect with Postgress database
-   use envirnoment variables to connect to the DB: `PGUSER`, `PGHOST`, `PGDATABASE`, `PGPORT`
-   for modern PostgreSQL versions (9.1 and newer) install the `uuid-ossp` extension

```bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

-   create `products` table (only if you're not using Sequelize)

```bash
CREATE TABLE products (
    product_id uuid DEFAULT uuid_generate_v4 (),
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    image_url VARCHAR NOT NULL,
    price NUMERIC NOT NULL,
    PRIMARY KEY (product_id)
);
```

-   use `sequelize` to connect to the DB and manage your Models
-   to copy data between databases use `pg_dump -t table_to_copy source_db | psql target_db`
-   to copy data between tables use

```
   INSERT INTO table(column1,column2,...)
   SELECT column1,column2,...
   FROM another_table
   WHERE condition;
```

### TIPS & TRICKS

`CREATE TABLE products_tmp (LIKE products);` quickly duplicate a table

`INSERT INTO products_tmp SELECT * FROM products;` and then fill it with data from the original table

`TABLE products ADD COLUMN created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW();` to add column with default values and NOT NULL constraint
