const userAuthorization = require("../../midleware/authorization");
const httpMocks = require("node-mocks-http");
const db = require("../../config/db").pool;

jest.mock("../../config/db");
jest.mock("../../midleware/authentication");

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("userController signUP", () => {
    it("authorization should return 401 ", async() => {
        db.query.mockResolvedValueOnce({ rows: [] });
        await userAuthorization.authorization(req, res);
        expect(res.statusCode).toBe(401);
    });

    it("authorization should return error 402", async() => {
        req.headers["x-access-token"] =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODAsImVtYWlsIjoiYWd1ZXJvQGdtYWlsLmNvbSIsImlhdCI6MTY1MTA4ODQ5OSwiZXhwIjoxNjUxMDkyMDk5fQ.OTWXoQganeWYYR9itpxahU12iK-3-vDa1OyRrZ9T8Co";
        const owner_id = "email@gmail.com";
        db.query.mockResolvedValue({ rows: [{ owner_id }] });
        await userAuthorization.authorization(req, res);
        expect(res.statusCode).toBe(402);
    });

    it("authorization should return 503 ", async() => {
        const email = "email@gmail.com";
        db.query.mockResolvedValue({ rows: [email] });
        await userAuthorization.authorization(req, res);
        expect(res.statusCode).toBe(503);
    });
});