var loginCredentials = require('../privateInfo.js').admin;

describe('Administrator login', function() {
  it('should navigate to opportunities on success', function() {
    browser.get('http://localhost:8000/login');
    expect( element(by.css('div.login-box')).isPresent() ).toBe(true);
    element(by.model('email')).sendKeys(loginCredentials[0]);
    element(by.model('password')).sendKeys(loginCredentials[1]);
    element(by.css('input.login-button')).click();
    expect( browser.getCurrentUrl() ).toBe( 'http://localhost:8000/admin/opportunities' );
  });
});