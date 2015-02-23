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
    var opportunities = element(by.css('div#sidebar-opportunities'))
    browser.sleep(1000);
    opportunities.click();

    // click on the first company
    var apollo = element(by.cssContainingText('a.ng-binding', 'Apollo Lightspeed'));
    browser.sleep(1000);
    apollo.click();
    
    expect( browser.getCurrentUrl() ).toBe( 'http://localhost:8000/users/opportunities/53b1ea816ecb92340e865aa6' );
  });

  it('should submit a interest', function() {
    var beforeSelection;
    var afterSelection;

    // get current interest selection
    element(by.css('div.dashbox-icon-active'))
      .then(function(selectedInterest) {
        if( selectedInterest ) {
          selectedInterest.getText()
            .then(function(text) {
              beforeSelection = text;
            });
        // no selection has been made yet
        } else {
          beforeSelection = undefined;
        }
      });
    

    // click on an interest that is different than the interest already selected
    element.all(by.css('div.dashbox-icon.ng-scope'))
      .each(function(box) {
        box.getText()
          .then(function(text) {
            if(text !== beforeSelection) {
              afterSelection = text;
            }
          })
      })
      .then(function() {
        expect(beforeSelection).not.toBe(afterSelection);
        console.log('before', beforeSelection);
        console.log('after', afterSelection);
      });
      
      
          




    // navigate back to opportunities

    // expect your interest for that position to be the number selected
  });

  xit('should still have the interest when navigating back to the opportunity for a second time', function() {
    // click on same first company
    // expect correct number to be highlighted
    expect(expecation).to.be(equal);
  });

});