var userLogin = require('../privateInfo.js').user;

describe('Submit interest', function() {
  it('should login as a user', function() {
    browser.get('http://localhost:8000/login');
    expect( element(by.css('div.login-box')).isPresent() ).toBe(true);
    element(by.model('email')).sendKeys(userLogin[0]);
    element(by.model('password')).sendKeys(userLogin[1]);
    element(by.css('input.login-button')).click();
    expect( browser.getCurrentUrl() ).toBe( 'http://localhost:8000/users/dashboard' );
  });

  xit('should click the number 2 and submit without a second button', function() {
    
  });
});