const userController = require("../../controller/user-controller");
const httpMocks = require("node-mocks-http");
const bcrypt = require("bcrypt");
const db = require("../../config/db").pool;
const generate = require("../../midleware/authentication").generateToken;

jest.mock("../../config/db");
jest.mock("../../midleware/authentication");

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    bcrypt.compareSync = jest.fn().mockImplementation(() => true);
});

describe("userController signUP", () => {
    beforeAll(() => {
        bcrypt.hashSync = jest.fn();
        generate.mockReturnValue("get Token");
    });

    it("signUp should return 402 ", async() => {
        const email = "email@gmail.com";
        db.query.mockResolvedValue({ rows: [email] });
        await userController.register(req, res);
        expect(res.statusCode).toBe(402);
    });

    it("signUp should return 200 ", async() => {
        db.query.mockResolvedValueOnce({ rows: [] });
        db.query.mockResolvedValueOnce({
            rows: [{
                email: "email@gmail.com",
                password: "password",
            }, ],
        });
        await userController.register(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("signUp should return error 503", async() => {
        const rejected = { message: "can't sign up" };
        db.query.mockRejectedValue(rejected);
        await userController.register(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("userController signIn", () => {
    beforeAll(() => {
        bcrypt.hashSync = jest.fn();
        generate.mockReturnValue("get Token");
    });
    it("signUp should return 400 ", async() => {
        db.query.mockResolvedValue({ rows: [] });
        await userController.login(req, res);
        expect(res.statusCode).toBe(400);
    });

    it("signUp should return 401 ", async() => {
        db.query.mockResolvedValue({
            rows: [{
                email: "email@gmail.com",
                password: "password",
            }, ],
        });
        bcrypt.compareSync.mockReturnValue(false);
        await userController.login(req, res);
        expect(res.statusCode).toBe(401);
    });

    it("signUp should return 200 ", async() => {
        db.query.mockResolvedValue({
            rows: [{
                email: "email@gmail.com",
                password: "password",
            }, ],
        });
        await userController.login(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("signUp should return error 503", async() => {
        const rejected = Promise.reject({ message: "can't sign in" });
        db.query.mockResolvedValueOnce(rejected);
        await userController.login(req, res);
        expect(res.statusCode).toBe(503);
    });
});