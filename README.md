#MongoDB


db.getMongo() : returns the connection to the database

use test -switches to the test database

db.restaurants.remove()  removes someethign from the resraurants collection


db.restaurants.update({"name":"jack"}, $set{"name":"rudy"})
this will the first document that matches those attributes

Using the multi option in the method you can update  multiple documents and set what you want to update


db.restaurants.update(
  { "address.zipcode": "10016", cuisine: "Other" },
  {
    $set: { cuisine: "Category To Be Determined" },
    $currentDate: { "lastModified": true }
  },
  { multi: true}
)

db.restaurants.find({"name":"jack"}) will find document with name jack
