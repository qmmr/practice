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

-   create `products` table

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
