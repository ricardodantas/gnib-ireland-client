import gnibIreland from '../../src';

describe("******* gnibIreland function *******", function () {

  it("should return a success response", async(done) => {
    const response = await gnibIreland.checkSlotsAvailability();
    expect(response.status).toEqual('success');
    console.log('====> response: ', response);
    done();
  });

});
