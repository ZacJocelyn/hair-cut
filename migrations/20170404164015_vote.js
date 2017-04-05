exports.up = function(knex, Promise) {
  return knex.schema.createTable('vote', (table) =>{
    table.increments();
    table.string('name');
    table.string('style');
    table.string('color');
    table.text('comment');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('vote');
};
