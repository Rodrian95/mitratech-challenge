# Mitratech Coding Challenge

This project is designed as a MVC API, utilizing Typescript and PostgreSQL for backend operations, paired with an Angular frontend application. The development environment is supported by Node 18 LTS.

## Core Functionality

- Full Product CRUD operations.
- Validation of attributes on both the client and server sides.

## Setup Guide

The project is organized into two main directories: `API` for backend operations and `Client` for the frontend interface.

### API Setup:

1. Global installation of Nodemon:

```bash
npm install -g nodemon
```

Proceed by installing the necessary npm packages within the API directory:

```bash
  npm install
```

The project can be executed using the following commands:

```bash
  npm start
```

Note: The database is hosted on a free ElephantSQL instance, eliminating the need for local database configuration.

### Running the Client project:

The client side is developed with Angular 15. Setting it up involves installing dependencies and launching the application.

1. Navigate to the Client directory and install npm dependencies:

```bash
  npm install
```

2. To start the client application:

```bash
  npm start
```

## Testing Instructions

- Upon accessing the home page, a table displaying the current product list and a button for adding new products are visible.
- To add a product, click the "New product" button and enter the product details. Submission is restricted if the data entered is invalid.
- For viewing product details, use the "See details" button corresponding to your chosen product.
- To edit the product, select the "Edit" button and submit new product data.
- To remove a product, select the "Remove" button beside the relevant product entry.

Aditionally yu can run jest testing for the API by running this command in API folder:

```bash
  npm test
```
