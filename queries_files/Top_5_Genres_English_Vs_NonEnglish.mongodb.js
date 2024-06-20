// Top5GenresEnglishVsNonEnglishExcludingEmpty.mongodb
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
      },
      is_english: {
        $cond: {
          if: { $eq: ["$original_language", "en"] },
          then: "English",
          else: "Non-English"
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
      _id: {
        language: "$is_english",
        genre: "$genres"
      },
      number_of_movies: { $sum: 1 },
      average_rating: { $avg: "$vote_average" }
    }
  },
  {
    $sort: {
      "_id.language": 1,
      number_of_movies: -1,
      average_rating: -1
    }
  },
  {
    $group: {
      _id: "$_id.language",
      top_genres: {
        $push: {
          genre: "$_id.genre",
          number_of_movies: "$number_of_movies",
          average_rating: { $round: ["$average_rating", 2] }
        }
      }
    }
  },
  {
    $project: {
      _id: 1,
      top_genres: { $slice: ["$top_genres", 5] }
    }
  }
]).explain("executionStats");