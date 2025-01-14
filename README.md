## Webz News

This project is a Node.js application designed to connect to the Webhose.io News API, fetch posts, and save them to a PostgreSQL database. It uses Docker Compose for the database setup and pnpm as the package manager.

### Getting Started

1. Clone the Repository

```
  git clone git@github.com:bipinparajuli/webz-news.git
  cd webz-news
```

2. Set Up Environment Variables

Create a .env file in the project root and add the following:

```
DB_HOST=localhost
DB_PORT=5555
DB_USER=
DB_PASSWORD=
DB_NAME=
WEBHOSE_API_KEY=
```

3. Install Dependencies

```
  pnpm install
```

4. Start the Database

Run the following command to spin up the PostgreSQL database:

```
  docker-compose up -d
```

5. Run Migrations

```
   ts-node tools/migration
```

6. Start the Application

```
  pnpm run dev
```

7. Run Tests

```
  pnpm test
```
