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

  it('should navigate to an opportunity', function() {
    // click on opportunities
    // click on the first company

  it('should submit a interest', function() {
    // click on an interest that is different than the interest already selected
    // navigate back to opportunities

    // expect your interest for that position to be the number selected
  });

  it('should still have the interest when navigating back to the opportunity for a second time', function() {
    // click on same first company
    // expect correct number to be highlighted
    expect(expecation).to.be(equal);
  });

});