const httpMocks = require("node-mocks-http");
const auth = require("../../midleware/authentication");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});
describe("userController.verify", () => {
    it("should return 200 ", async() => {
        jwt.verify = jest.fn().mockImplementation((token, secretKey, cb) => {
            cb(null, {
                id: "2",
                name: "Dodi",
                email: "dodi@gmail.com",
            });
        });

        await auth.verify(req, res, next);
        expect(jwt.verify).toHaveBeenCalled();
        expect(req).toHaveProperty("id", "name", "email");
        expect(res.statusCode).toEqual(200);
        expect(next).toHaveBeenCalled();
    });
    it("should return 401", async() => {
        jwt.verify = jest.fn().mockImplementation((token, privatKey, cb) => {
            cb({ id: "2", name: "Dodi", email: "dody@gmail.com" }, null);
        });
        await auth.verify(req, res, next);
        expect(jwt.verify).toHaveBeenCalled();
        expect(res.statusCode).toEqual(401);
    });
});
describe("userController.generateToken", () => {
    it("should return 200 ", async() => {
        jwt.generateToken = jest.fn().mockImplementation((token, privatKey, cb) => {
            cb(null, {
                id: "2",
                name: "Dodi",
                email: "dody@gmail.com",
            });
        });
        await auth.generateToken(req, res, next);
        expect(jwt.sign).toHaveBeenCalled();
    });
});