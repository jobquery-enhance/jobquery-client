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
    var clicked = false;

    // get current interest selection
    element(by.css('div.dashbox-icon-active'))
      .then(function(selectedInterest) {
        // if there is an interest already
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
    
    // get all of the non-selected options
    element.all(by.css('div.dashbox-icon.ng-scope'))
      .each(function(box) {
        box.getText()
          .then(function(text) {
            // if the interest is not the same as the one already selected
            if(text !== beforeSelection && clicked === false) {
              afterSelection = text;
              box.click();
              clicked = true;
            }
          });
      })
      .then(function() {
        // confirm we're not just selecting the same interest
        expect(beforeSelection).not.toBe(afterSelection);

        // look for the active box to have changed css styles
        element(by.css('div.dashbox-icon-active'))
          .then(function(selectedInterest) {
            expect(selectedInterest.getText()).toBe(afterSelection);
          });
      });
      
  });
    
  it('should update the opportunity interest on the opportunities page', function() {
    // navigate back to opportunities
    // expect your interest for that position to be the number selected
    expect(expecation).to.be(equal);
  });

  xit('should still have the interest when navigating back to the opportunity for a second time', function() {
    // click on same first company
    // expect correct number to be highlighted
    expect(expecation).to.be(equal);
  });

});