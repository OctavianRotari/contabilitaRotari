// jscs:disable
//jshint ignore: start

describe('Contabilita', function() {
  it('has a title', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('Contabilita');
  });
});
