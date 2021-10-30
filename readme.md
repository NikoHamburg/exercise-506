# Create Supplier API and Supplier Management Website

Using Express and Express.Router, build an API which exposes endpoints to read, add, change and delete items from the Northwind supplier JSON file, and create a frontend which allows a user to change and add to the file via a browser.

## Create API

- make a basic create-react-app
- in `/backend/server.js` create an basic Express backend that listens on port 3030
- save [this Northwind supplier JSON](https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/json/suppliers.json) to a JSON file
- make the backend an API which has the following endpoints, create a file `routes/suppliers.js` and use Express.Router and lowdb:

   - `GET` **/getinfo** - returns a sentence of information about the API: **This is information about all the suppliers for company XYZ.**
   - `GET` **/suppliers/all** - returns an array of all suppliers
   - `GET` **/suppliers/{id}** - returns a supplier object which has supplierID = id
   - `POST` **/suppliers** - adds a supplier object
   - `DELETE` **/suppliers/id** - deletes the supplier with supplierID = id
   - `PUT` **/suppliers/id** - replaces the supplier object that has supplierID = id with a new supplier object with the same supplierID

- create a `supplier.rest` file that allows you to test each of the endpoints with the VSCode REST Client

## Bonus: Create Frontend that uses the API :medal_sports:

- in `App.js` of the React app, list the info sentence and all suppliers on page load (two API calls)
- add a form that allows the user to add a new supplier
- add a Delete button next to each supplier that allows the user to remove that supplier from the JSON file
- add an Edit button next to each supplier that allows the user to edit that supplier in the JSON file
