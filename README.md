## Prisma + tRPC + TypeScript + TailwindCSS

### Features
* ✅ E2E typesafety with tRPC
* ✅ Full-stack React with Next.js
* ✅ Database with Prisma (Postgres), both dev and prod
* ✅ Full Authentication with JWT
  * ✅ Integrated with nodemailer for password reset functionality
* ✅ CI setup using GitHub Actions
* ✅ TailwindCSS
* ✅ Validates types with Zod library
* TODO: Image upload
* TODO: Docker-compose

#### <a href="https://expense-tracker-app-two.vercel.app/">DEMO</a>

<img src="screenshots/mobile.png" height="500" width="250"/>

### Installation
```
yarn install
```

#### optional, you can run ```prisma migration```

```
yarn prisma migrate dev --name user
```

Make sure you have update the .env file for DATABASE_URL and EMAIL, PASSWORD for nodemailer

#### DATABASE_URL would look something like this,
DATABASE_URL="postgresql://<b>user</b>:<b>password</b>@localhost:5432/expense?schema=public"

For EMAIL, it should be your gmail and to get the password, go to your Google manage account and add '<a href="https://support.google.com/accounts/answer/185833?hl=en">App password</a>'

When you have everything setup on env file and database, run.
```
yarn run dev
```
