/**
 * First, let's create a few global utility functions
 * that will help us out. We will later use this merge function for 
 * left joining tables
 */
describe('Utility functions', function () {
  it('should have an object merge function', function () {
    var obj1 = {a: 1};
    var obj2 = {b: 2};
    var obj3 = {};
    obj3 = merge(obj3, obj2);
    obj3 = merge(obj3, obj1);
    expect(obj3).toEqual({a:1, b:2});
  });
});


/**
 * We'll create a functional query language similar to SQL
 * Called FQL
 * We've already populated three large JS arrays that will
 * act as our "tables".  If you check 0_movies.js you'll see:
 * movies, actors and roles as large JS arrays
 * 
 */
describe('Functional Query Language', function () {

  /**
   * Read in the movies JS Array
   *  and store the data somewhere inside the new FQL object.  
   */
  var moviesTable;

  beforeEach(function() {
    moviesTable = new FQL(movies);
  });

  /**
   * Should have an exec() function that returns the
   * current internal data set of the FQL class
   */
  it('should have an exec function', function () {
    var all_movies = moviesTable.exec();
    expect(all_movies).toEqual(movies);
  });

  it('should have a count method', function () {
    // count() returns how many records are in the movies array
    // check 0_movies.js for the data set
    // 
    // There are 36 movies in the movies Array
    expect(moviesTable.count()).toEqual(36);
  });

  /**
   * Should have a limit(X) method that will 
   *  cut out the first X rows.  count() should 
   *  then show only those rows.
   */
  it('should have a limit() method', function () {
    expect(moviesTable.limit(5).count()).toEqual(5);
  });

  /**
   * The exec() function should returns the
   * current result of the chained query
   */
  it('should limit and have chained exec function', function () {
    // this will return the first movie row, Aliens
    var first_movie = moviesTable.limit(1).exec();
    expect(first_movie.length).toEqual(1);
    expect(first_movie[0].name).toEqual("Aliens");
  });

  it('should reset to original data after exec', function () {
    moviesTable.limit(1).exec();
    var all_movies = moviesTable.exec();
    expect(all_movies).toEqual(movies);
  });

  /** 
   * Should have a where(truthFunction) method that
   * will select rows of the table where the function
   * returns true - similar to Array#filter
   *
   * this would be similar to 
   * SELECT * FROM movies WHERE name = "Shrek"
   */
  it('should support where queries', function() {
    var results = moviesTable.where({name: "Shrek"}).exec();
    // results should look like this:
    // [{"id":300229,"name":"Shrek","year":2001,"rank":8.1}] 
    expect(results[0].year).toEqual(2001);
    expect(results[0].id).toEqual(300229);
  });

  /**
   * where quries can specify a function
   * instead of a value for any given field
   */
  it('should support predicates in where queries', function() {
    var results = moviesTable
                    .where({year: function(v) {
                      return v > 2000;
                    }})
                    .exec();

    expect(results.length).toEqual(10);
  });

  /** 
   * where queries can return more than 1 row
   *
   * SELECT * FROM movies where year = 2001;
   */
  it('should support where queries that return multiple rows', function () {
    var results = moviesTable.where({year: 2001}).exec();
    var expectedResults = [{"id":238072,"name":"Ocean's Eleven","year":2001,"rank":7.5},{"id":300229,"name":"Shrek","year":2001,"rank":8.1},{"id":350424,"name":"Vanilla Sky","year":2001,"rank":6.9}];
    expect(results).toEqual(expectedResults);    
  });


  /**
   * where queries can be grouped together
   *
   * SELECT * FROM movies WHERE year = 2001 and rank > 8;
   */
  it('should support multiple where queries that return multiple rows', function () {
    var results = moviesTable
                    .where({
                      year: 2001,
                      rank: function (v) {return v > 8;}
                    })
                    .exec();
    var expectedResults = [{"id":300229,"name":"Shrek","year":2001,"rank":8.1}];    expect(results).toEqual(expectedResults);    
    expect(results).toEqual(expectedResults);
  });
  
  /** 
   * FQL.select(keysArray) can limit which values come back in the query
   * SELECT id, name FROM movies WHERE rank > 8;
   */
  it('should support select() queries that limit which values come back', function () {
    var results = moviesTable
                    .where({rank: function (v) {return v > 8;}})
                    .select(["id", "name"])
                    .limit(3)
                    .exec();
    var expectedResults = [{"id":10920,"name":"Aliens"},{"id":46169,"name":"Braveheart"},{"id":109093,"name":"Fargo"}];
    expect(results).toEqual(expectedResults);
  });

  /** 
   * FQL.order() should simply take a column and re-order 
   * the data in ascending order based on each row's value 
   * for that column.
   *
   * Refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
   * on how to implement custom sort functions
   */
  it('should support order queries that sort by a given row', function () {
    var results = moviesTable
                    .where({rank: function (v) { return v !== null; }})
                    .order('rank')
                    .limit(3)
                    .exec();
    var expectedResults = [ { id: 147603, name: 'Hollow Man', year: 2000, rank: 5.3 }, { id: 116907, name: 'Footloose', year: 1984, rank: 5.8 }, { id: 344203, name: 'UHF', year: 1989, rank: 6.6 } ];
    expect(results).toEqual(expectedResults);
  });

  it('ordering should not change the order for subsequent queries', function () {
    var resultsA = moviesTable
                    .where({year: 1999})
                    .order('rank')
                    .limit(1)
                    .exec();
    var resultsB = moviesTable
                    .where({year: 1999})
                    .limit(1)
                    .exec();
    expect(resultsA).toEqual([ { id: 314965, name: 'Stir of Echoes', year: 1999, rank: 7 } ]);
    expect(resultsB).toEqual([ { id: 112290, name: 'Fight Club', year: 1999, rank: 8.5 } ]);
  });

});

/**
  These are a bit more difficult.                                                                      
 */

describe('Functional Query Language - Level 2', function () {

  var moviesTable;

  beforeEach(function() {
    moviesTable = new FQL(movies);
  });

  /** 
   * Similar to LEFT OUTER JOIN in SQL, this combines on FQL data set with another
   * Let's see if we can see how many roles were in the movie Hollow Man
   *
   * FQL.left_join takes two parameters, first a new FQL data set, and secondly
   * a function that returns true if you want to combine the right data set with the left
   * data set
   *
   * It's an outer join because every row in the left data set can be combined with multiple 
   * rows in the right data set (the joined data set)
   */
  it('should support left outer joining the results with a limit', function () {
    var rolesTable = new FQL(roles);

    var results = moviesTable
                    .where({rank: function(v) {return v !== null;}})
                    .order('rank')
                    .limit(1) // this should give us Hollow Man, the lowest ranked movie
                    .left_join(rolesTable, function(movie_row, role_row) {
                      return movie_row.id === role_row.movie_id;
                    })
                    .limit(2)
                    .exec();

    // First 2 roles in the movie
    // you can verify this be search in the roles array for anything with movie_id === 147603
    var expectedResults = [
      {"id":147603,"name":"Hollow Man","year":2000,"rank":5.3,"actor_id":9184,"movie_id":147603,"role":"Dad"},
      {"id":147603,"name":"Hollow Man","year":2000,"rank":5.3,"actor_id":22591,"movie_id":147603,"role":"Sebastian Caine"}] ;
    expect(results).toEqual(expectedResults);
  });

  it('should support left outer joining the results with a count', function () {
    var rolesTable = new FQL(roles);

    var results = moviesTable
                    .where({rank: function(v) {return v !== null;}})
                    .order('rank')
                    .limit(1) // this should give us Hollow Man, the lowest ranked movie
                    .left_join(rolesTable, function(movie_row, role_row) {
                      return movie_row.id === role_row.movie_id;
                    })
                    .count();
    // 21 roles were in the movie
    // you can verify this be search in the roles array for anything with movie_id === 147603
    expect(results).toEqual(21);
  });

  /**
   * A double left join!  Let's get the actors in the movie
   */
  it('should support double left outer joining the results', function () {
    var rolesTable = new FQL(roles);
    var actorsTable = new FQL(actors);

    var results = moviesTable
                    .where({rank: function(v) {return v !== null;}})
                    .order('rank')
                    .limit(1) // this should give us Hollow Man, the lowest ranked movie
                    .left_join(rolesTable, function(movie_row, role_row) {
                      return movie_row.id === role_row.movie_id;
                    })
                    .left_join(actorsTable, function(movie_role_row, actor_row) {
                      return movie_role_row.actor_id === actor_row.id;
                    })
                    .select(["name", "first_name", "last_name", "role"])
                    .limit(3)
                    .exec();
    var expectedResults = [
        {"name":"Hollow Man","first_name":"Steve","last_name":"Altes","role":"Dad"},
        {"name":"Hollow Man","first_name":"Kevin","last_name":"Bacon","role":"Sebastian Caine"},
        {"name":"Hollow Man","first_name":"Josh","last_name":"Brolin","role":"Matthew Kensington"}];
    expect(results).toEqual(expectedResults);
  });

});

describe('Functional Query Language - Indexing', function () {

  var moviesTable, actorsTable, rolesTable;

  beforeEach(function() {
    moviesTable = new FQL(movies);
    actorsTable = new FQL(actors);
    rolesTable = new FQL(roles);
  });


  /**
   * Let's add an indexing function to the movies table.
   * 
   * Think of an index table as a kind of reverse look up table: 
   * the keys are entry values (e.g. 'Shrek'), and the values are 
   * the indices of those entry values (e.g. 4).
   *
   * When a row gets indexed (but not before), you should construct 
   * and store an index table for that row name. You will need to 
   * loop through all the entries for that row.
   *
   * Remember, though, that entry values are not necessarily 
   * unique. For example, the gender row in the actors table--there 
   * are many indices with gender 'M'. So make sure to store the 
   * indices as an array of numbers.
   */
  it('should support a function to add an index to the FQL class', function() {
    // it should not be possible to look up the index of an entry
    // in a row prior to `addIndex` on that row
    expect( moviesTable.getIndicesOf('name', 'Apollo 13') ).toEqual( undefined );
    moviesTable.addIndex('name');
    expect( moviesTable.getIndicesOf('name', 'Apollo 13') ).toEqual( [2] );
  });


  /**
   * Let's add an index to the actors table for the last_name field
   *
   * If you look at the actors table, you'll see that the 14th, 15th and 16th row have an actor named Allison.
   *
   * You can verify this with something like: actors.forEach(function(el, i) { if(el.last_name == 'Allison') { console.log(i) } })
   */
  it('should support indexing a value that exists in multiple rows', function() {
    
    actorsTable.addIndex('last_name');
    expect( actorsTable.getIndicesOf('last_name', 'Allison') ).toEqual( [14, 15, 16] );
  });


  /**
   * Indices are only useful because they allow you to retrieve data 
   * faster than naive searching.
   *
   * Once a field is indexed, where queries on that field should make
   * use of that index. Instead of naively searching through all data, 
   * the where should simply reach into the indices and pluck those 
   * out of the data.
   */
  it('should use available indices during where queries', function() {
    actorsTable.addIndex('last_name');

    spyOn(actorsTable, 'getIndicesOf').andCallThrough();
    var results = actorsTable.where({last_name: "Russell"}).exec();
    expect( results.length ).toEqual( 4 );
    expect( actorsTable.getIndicesOf ).toHaveBeenCalledWith( 'last_name', 'Russell' );
  });

  it('should produce the same query results with significantly faster look up times', function() {
    console.time('Without index');
    for (var timesToRun = 1000; timesToRun--;) {
      var noIndexResults = rolesTable.where({movie_id: 30959}).exec();
    }
    console.timeEnd('Without index');

    rolesTable.addIndex('movie_id');

    console.time('With index');
    for (var timesToRun = 1000; timesToRun--;) {
      var indexResults = rolesTable.where({movie_id: 30959}).exec();
    }
    console.timeEnd('With index');

    expect( noIndexResults ).toEqual( indexResults );
  });

});



