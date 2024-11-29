# POS Backend

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [API Endpoints](#api-endpoints)
- [Useful Commands](#useful-commands)
- [License](#license)

## Introduction
This is the backend for a Point-of-Sale (POS) system. It provides API endpoints for managing customers, suppliers, products, invoices, and more.

## Project Structure
```
pos-backend
├── package-lock.json
├── package.json
└── src
    ├── app.js
    ├── config
    │   ├── db.js
    │   └── db.sql
    ├── controllers
    │   ├── CustomerController.js
    │   ├── InvoiceController.js
    │   ├── InvoiceLineController.js
    │   ├── ProductController.js
    │   ├── ProductVariantController.js
    │   ├── SupplierController.js
    │   └── UserController.js
    ├── middleware
    │   └── auth.js
    ├── models
    │   ├── Customer.js
    │   ├── Invoice.js
    │   ├── InvoiceLine.js
    │   ├── Product.js
    │   ├── ProductVariant.js
    │   ├── Supplier.js
    │   └── User.js
    ├── routes
    │   ├── CustomerRoutes.js
    │   ├── InvoiceLineRoutes.js
    │   ├── InvoiceRoutes.js
    │   ├── ProductRoutes.js
    │   ├── ProductVariantRoutes.js
    │   ├── SupplierRoutes.js
    │   └── UserRoutes.js
    ├── server.js
    ├── services
    └── utils
```

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/Hyp3rSWE/pos-backend.git
    ```
2. Navigate to the project directory:
    ```sh
    cd pos-backend
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Environment Variables
Create a `.env` file in the root directory of the project and add the following variables:
```bash
DB_HOST=aws-0-eu-west-3.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres.ijkgisrzywgfletusbqd
DB_PASSWORD=dAll4IuJ6RxB8bDo
SECRET=a2d8f37c41e9eaa2fe39fb4c6f6e7e79b7f1e9d9b0e5e6d5b951c5d55cb684e1
```

## Database
The database schema is defined in the file [`src/config/db.sql`](src/config/db.sql). It includes tables for customers, users, suppliers, products, product variants, invoices, and invoice lines.

## API Endpoints
Run the project and visit [`localhost:3000/api-docs`](http://localhost:3000/api-docs) for the API documentation

## Useful Commands
- Start the server:
    ```sh
    npm start
    ```
- Start the server in development mode:
    ```sh
    npm run dev
    ```
- Build the project:
    ```sh
    npm run build
    ```
- Lint the project:
    ```sh
    npm run lint
    ```
- Format the code:
    ```sh
    npm run format
    ```
