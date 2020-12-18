# FEUP-SINF

## Final Project - P1 Intercompany

This WebApp was developed within the course project for Information Systems (SINF - EIC0040) of the Integrated Masters in Informatics and Computing Engineering (MIEIC) at the Faculty of Engineering of the University of Porto (FEUP), supervised by Professor Luís Barros.

## Technologies used

Backend:
 * NodeJS
 * Koa (router)
 * Sequelize (ORM)

Frontend
 * React (create-react-app)
 * Bootstrap (reactstrap)

Database
 * PostgreSQL
 * pgadmin

Gateway: Caddy in reverse-proxy mode
## About our WebApp

<img align="left" height="170" src="/docs/resources/besinf_logo.png">

**BESINF** is based on a fundamental pillar: **garantee our customer's comfort**. We provide a service that automates the business interaction between companies and integrates with **PRIMAVERA's ERP software**.

The **main aim of BESINF** is to develop an interface that allows companies to **define a set of reactive processes** that are integrated with the **Jasmin platform**: that is, processes that are executed in response to specific user-driven events, such as an invoice being generated or new stock being registered, and admit the concept of continuations, which define a sequence of trigger-process-stop steps within a single automated process.

**BESINF** uses **Jasmin** to deal with all the data and processes surrounding transactions, inventory and information about each product.

For the validation of the project, we used two fictitious companies both utilizing Jasmin. These companies are **Ksede**, which bottles up and sells beverages, and **BottleFlip**, that sells bottles. The companies **interact in two key ways**, **KSede buys bottles from BottleFlip** for the production of their products and **BottleFlip rents their factory space from KSede**, who owns the building where they both operate.

### Run
Provide a .env file in the root of the backend folder, with the following information:

```bash
# app-specific settings
# this secret is used to sign the JSON web tokens used for auhtenticating backend users
JWT_SECRET=a-secret-key
APP_PORT=3000
# company 1 credentials
# you can get these credentials after creating your app on the Primavera publisher website
JASMIN_APP1_KEY=your-app-key
JASMIN_APP1_SECRET=your-app-secret
# these are the account details of a company in Jasmin
JASMIN_ACCOUNT1=012345
JASMIN_SUBSCRIPTION1=012345-0001
# company 2 credentials
JASMIN_APP2_KEY=your-app-key
JASMIN_APP2_SECRET=your-app-secret
JASMIN_ACCOUNT2=012345
JASMIN_SUBSCRIPTION2=012345-0001
```

Build the containers with `docker-compose build`

Run `docker-compose up` in the root of the project to start up the frontend and backend.
This will also start up a postgres database, run migrations and seeding on it, a pgadmin
instance, as well as a reverse proxy (Caddy).

## :wrench: Features

- **Processes List**
    - View or edit the processes between the two selected companies.
- **Add Step**
    - Create a new step in a process, specifying the type (“Emit” or “Wait”) and the document type. 
- **Add Process**
    - Create a new process
- **Log List**
    - Check the status of the processes and the requests made to Jasmin. 
    - Initiate automated executions.
- **Data Sync Management**
    - Check common products in both companies. 
    - Establish a correspondence between the products. 
    - Add/remove correspondences.

## :page_facing_up: Supported Documents

- **Buy Order** - Detect
- **Sell Order** - Publish
- **Delivery Note** - Detect
- **Order Receipt** - Publish
- **Invoice** - Detect
- **Supplier Invoice** - Publish
- **Proof of Payment** - Detect
- **Payment Receipt** - Publish

## :computer: Core Views
<p align="center">
  <img src="/docs/resources/views/login.png" width="450" />
  <img src="/docs/resources/views/info.png" width="450" /> 
</p>
<p align="center">
  <img src="/docs/resources/views/process.png" width="450" />
  <img src="/docs/resources/views/step.png" width="450" />     
</p>
<p align="center">
  <img src="/docs/resources/views/sync.png" width="450" />
  <img src="/docs/resources/views/log.png" width="450" />     
</p>


