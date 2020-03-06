
exports.seed = function(knex, Promise) {
  // we want to remove all data before seeding
  // truncate will reset the primary key each time
  return knex('cars').truncate()
    .then(function () {
      // add data into insert
      return knex('cars').insert([
        { vin: 7654321, make: "honda", model: "accord", mileage: "076771", transmission_type: "foreign", title_status: "new" },
        { vin: 1234567, make: "toyota", model: "camry", mileage: "177283", transmission_type: "american", title_status: "expired" },
        { vin: 1002938, make: "honda", model: "pilot", mileage: "115758", transmission_type: "foreign", title_status: "new" },
      ]);
    });
};