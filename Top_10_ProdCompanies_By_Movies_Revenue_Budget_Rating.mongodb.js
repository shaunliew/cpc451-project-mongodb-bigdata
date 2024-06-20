  // Select the database to use.
  use('movies');

  db.getCollection('movie').aggregate([
    {
      $addFields: {
        production_companies: {
          $split: [
            { $toString: "$production_companies" },
            ", "
          ]
        }
      }
    },
    { $unwind: "$production_companies" },
    {
      $group: {
        _id: "$production_companies",
        total_movies: { $sum: 1 },
        average_revenue: { $avg: "$revenue" },
        average_budget: { $avg: "$budget" },
        average_rating: { $avg: "$vote_average" }
      }
    },
    {
      $match: {
        average_revenue: { $gte: 10000000 }
      }
    },
    {
      $project: {
        _id: 1,
        total_movies: 1,
        average_revenue: 1,
        average_budget: 1,
        average_rating: 1
      }
    },
    {
      $sort: {
        total_movies: -1,
        average_revenue: -1,
        average_budget: -1,
        average_rating: -1
      }
    },
    { $limit: 10 }
  ])
