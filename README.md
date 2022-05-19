# TShirt Company

Backend application used as submission project to the shopify internship program (backend position).

## Requirements

This application implements CRUD functionality and transfer inventory to and from specific locations (warehouses).

### Introduction

This app is a representation of a company that sells tshirts. 

The tshirts come in different sizes and colors. The company is doing well and expanding into different locations. Warehousing needs are introduced as stock needs to move from one location to another. Each location handles its own inventory levels. The total amount of inventory for a single item is a calculated field based on each location with the use of MongoDB aggregate queries.

### Item

The tshirts have the following attributes:
- size (small, medium, large)
- color (blue, green, red, orange, black, white, etc)
- quantity (total calculated based on all locations)
- SKU (unique SKU ex: TSH-BLU-S, TSH-BLA-L)
- location


## Running the app

To run the app, do the following tasks:
1. Run `npm install`
2. Run the seeder script 
   1. `npm run data:delete` to clear the data in the database
   2. `npm run data:create` to create the data in the database
3. Verify that the test credentials are in the `config.env` file (MONGO_URI)
4. Run the app `npm run start`


## Backlog

The application's CRUD features are functional on inventory items, however there are limitations with the inventory warehouse features. The application currently does not support creating/deleting warehouses. The code for transferring inventory from locations is done but not functional.

Unfortunately, I was not able to complete the functionality of the app due to time constraints. However if I had more time to work on this project, I would tackle the following tasks:
- Complete the inventory transfer from one warehouse to anoter
- Add creating/deleting warehouses
- Complete calculated fields such as total inventory per item (aggregated by location)
- Create automated testing to develop features safely and more efficently
- Learn and improve the use of MongoDB queries (and mongoose) since this is a new technology for me