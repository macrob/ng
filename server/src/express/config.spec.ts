import { mysql, host, port } from './config';

describe("A suite", () => {
  it("contains spec with an expectation", () => {
    console.log(mysql('test'), host, port);
    expect(true).toBe(true);
  });
});
