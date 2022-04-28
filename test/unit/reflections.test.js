const reflectionsController = require("../../controller/reflections-controller");
const httpMocks = require("node-mocks-http");
const db = require("../../config/db").pool;

jest.mock("../../config/db");
jest.mock("../../midleware/authentication");

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("reflections get reflections", () => {
    it("gett all  should return 200 ", async() => {
        db.query.mockResolvedValue({ id: 5 });
        await reflectionsController.getReflections(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("gett all  should return 503 ", async() => {
        const rejected = Promise.reject({ message: "can't sign up" });
        db.query.mockResolvedValue(rejected);
        await reflectionsController.getReflections(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("reflections post reflections", () => {
    it("post should return 200 ", async() => {
        db.query.mockResolvedValue({
            rows: [{
                email: "email@gmail.com",
                password: "password",
            }, ],
        });
        await reflectionsController.postReflections(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("post should return 503 ", async() => {
        const rejected = Promise.reject({ message: "can't sign up" });
        db.query.mockResolvedValue(rejected);
        await reflectionsController.postReflections(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("reflections update reflections", () => {
    it("update should return 200 ", async() => {
        db.query.mockResolvedValue({
            rows: [{
                email: "email@gmail.com",
                password: "password",
            }, ],
        });
        await reflectionsController.updateReflections(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("update should return 503 ", async() => {
        const rejected = Promise.reject({ message: "can't sign up" });
        db.query.mockResolvedValue(rejected);
        await reflectionsController.updateReflections(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("reflections delete reflections", () => {
    it("delete should return 200 ", async() => {
        db.query.mockResolvedValue({
            rows: [{
                email: "email@gmail.com",
                password: "password",
            }, ],
        });
        await reflectionsController.deleteReflections(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("delete should return 503 ", async() => {
        const rejected = Promise.reject({ message: "can't sign up" });
        db.query.mockResolvedValue(rejected);
        await reflectionsController.deleteReflections(req, res);
        expect(res.statusCode).toBe(503);
    });
});