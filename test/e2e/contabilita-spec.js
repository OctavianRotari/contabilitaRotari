// jscs:disable
//jshint ignore: start

describe('Contabilita', function() {

  beforeEach(function (){
    browser.get('http://localhost:8080/#/login');
  })

  describe('When user logs in', function(){

    beforeEach(function (){
      browser.get('http://localhost:8080/#/login');
    });

    it('Displays an error if the user inserts a wrong password or username', function() {
      var username = element(by.name('username'));
      var password = element(by.name('password'));
      username.clear().sendKeys('myemail');
      password.clear().sendKeys('mypassword');
      element(by.name('login')).click();
      var heading = element(by.tagName('h2'));
      expect(heading.getText()).toEqual('Password o username sbagliati');
    });
  })
});
