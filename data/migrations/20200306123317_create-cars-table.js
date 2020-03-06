
// UP represents changes made to our database
// in this case I am building a table
exports.up = async function(knex) {
  // createTable is a method that takes in two arguments,a table name and a callback. 
  // within this callback we can define what tables we want and constraints
    await knex.schema.createTable("cars", (tbl) => {

      //auto-increment primary key: increments is a built in method which creates a auto increment method key
    tbl.increments("id")
    // text field called vin. 
    //we want this data type to be unique and not nullable
		tbl.text("vin")
			.unique()
            .notNullable()
        tbl.text("make")
        tbl.text("model")
        tbl.numeric("mileage")
        tbl.text("transmission_type")
        tbl.text("title_status")    
	})
};

// This refreshes the data table and resets the table. 
// essentially undo any changes.
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("cars")
};
