// Select the database to use.
use('movies');

db.getCollection('movie').aggregate([
    { 
      $addFields: { 
        genres: { 
          $cond: { 
            if: { $eq: [{ $type: "$genres" }, "string"] }, 
            then: { $split: ["$genres", ", "] }, 
            else: [] 
          } 
        } 
      } 
    },
    { $unwind: "$genres" },
    { $match: { popularity: { $gte:10 } } }, // Filtering based on a popularity threshold
    { $sort: { popularity: -1 } },
    { $group: { _id: "$genres", top_movies: { $push: { title: "$title", popularity: "$popularity" } } } },
    { $project: { _id: 1, top_movies: { $slice: ["$top_movies", 5] } } }
  ]).explain("executionStats");