use('movies');
// Top10GenresByAvgRatingAndMovieCount.mongodb

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
  {
    $match: {
      genres: { $ne: "" }
    }
  },
  {
    $group: {
      _id: "$genres",
      number_of_movies: { $sum: 1 },
      average_rating: { $avg: "$vote_average" },
      average_revenue: { $avg: "$revenue" },
      average_budget: { $avg: "$budget" }
    }
  },
  {
    $project: {
      _id: 1,
      number_of_movies: 1,
      average_rating: { $round: ["$average_rating", 2] },
      average_revenue: { $round: ["$average_revenue", 2] },
      average_budget: { $round: ["$average_budget", 2] }
    }
  },
  {
    $sort: {
      average_rating: -1,
      number_of_movies: -1
    }
  },
  { $limit: 10 }
]).explain("executionStats");