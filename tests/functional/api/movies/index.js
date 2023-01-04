import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Movie from "../../../../api/movies/movieModel";
import api from "../../../../index";
import movies from "../../../../seedData/movies";

const expect = chai.expect;
let db;
let token;
let page;

describe("Movies endpoint", () => {
  before(() => {
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });

  beforeEach(async () => {
    try {
      await Movie.deleteMany();
      await Movie.collection.insertMany(movies);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });
  describe("GET /api/movies ", () => {
    it("should return 20 movies and a status 200", (done) => {
      request(api)
        .get("/api/movies")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
          done();
        });
    });
  });

  describe("GET /api/movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/movies/${movies[0].id}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", movies[0].title);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        return request(api)
          .get("/api/movies/a")
          .set("Accept", "application/json")
          .expect("Content-Type", "text/html; charset=utf-8")
          .expect(500)
      });
    });
  });

describe("GET /api/movies/tmdb/upcoming/:page", () => {
  before(() => {
    token = "BEARER eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M"
  })
  describe("when the page number is valid", () => {
    before(() => {
      page = 1
    })
    it("should return 20 movies of corresponding page from tmdb and a status 200", () => {
      return request(api)
        .get(`/api/movies/tmdb/upcoming/${page}`)
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.property("page", page);
          expect(res.body.results).to.be.a("array");
          expect(res.body.results.length).to.equal(20);
        });
    });
  });
  describe("when the page number is invalid", () => {
    before(() => {
      page = 0
    })
    it("should return a empty result", () => {
      return request(api)
        .get(`/api/movies/tmdb/upcoming/${page}`)
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect({});
    });
  });
});

describe("GET /api/movies/tmdb/topRated/:page", () => {
  before(() => {
    token = "BEARER eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M"
  })
  describe("when the page number is valid", () => {
    before(() => {
      page = 1
    })
    it("should return 20 movies of corresponding page from tmdb and a status 200", () => {
      return request(api)
        .get(`/api/movies/tmdb/upcoming/${page}`)
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.property("page", page);
          expect(res.body.results).to.be.a("array");
          expect(res.body.results.length).to.equal(20);
        });
    });
  });
  describe("when the page number is invalid", () => {
    before(() => {
      page = 0
    })
    it("should return a empty result", () => {
      return request(api)
        .get(`/api/movies/tmdb/toprated/${page}`)
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect({});
    });
  });
});
});