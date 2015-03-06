var userLogin = require('../privateInfo.js').user;

describe('Submit interest', function() {
  var oldInterest;
  var newInterest;

  it('should login as a user', function() {
    browser.get( 'http://localhost:8000/login' );
    expect( element(by.css('div.login-box')).isPresent() ).toBe( true );
    element(by.model('email')).sendKeys( userLogin[0] );
    element(by.model('password')).sendKeys( userLogin[1] );
    element(by.css('input.login-button')).click();
    expect( browser.getCurrentUrl() ).toBe( 'http://localhost:8000/users/dashboard' );
  });

  it('should navigate to an opportunity', function() {
    var opportunities = element(by.css('div#sidebar-opportunities'));
    // wait for page to load
    browser.sleep(1000);
    opportunities.click();

    // get the number current number rating of the first job
    element(by.css('body > div.content-container > div.ng-scope > div > ui-view > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(4) > span.tablebox-important.ng-binding'))
      .getText()
        .then(function(selection) {
          // In the console, the element's text appears to have a space in front of it: ' 2' not '2'
          // Selection, however, only returns the number: '2'
          oldInterest = selection;
        });

    // click on the first company
    var first = element(by.css('body > div.content-container > div.ng-scope > div > ui-view > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1)'));
    browser.sleep(1000);
    // console.log(first);
    first.getAttribute('href')
      .then(function (href) {
        first.click();
        expect( browser.getCurrentUrl() ).toBe( 'http://localhost:8000' + href );

      })


  });

  it('should submit a interest', function() {
    var beforeSelection;
    var afterSelection;
    var clicked = false;

    // get current interest selection
    element(by.css('div.dashbox-icon-active')).isPresent().then(function(result) {
      if ( result ) {
        element(by.css('div.dashbox-icon-active'))
          .then(function(selectedInterest) {
            // if there is an interest already
            selectedInterest.getText()
              .then(function(text) {
                beforeSelection = text;
              });
          })
      } else {
        // no selection has been made yet
        beforeSelection = undefined;
      }
    })

    // get all of the non-selected options
    element.all(by.css('div.dashbox-icon.ng-scope'))
      // for each of them
      .each(function(box) {
        // get the text
        box.getText()
          .then(function(text) {
            // if the interest is not the same as the one already selected
            // clicked === false effectively breaks this loop,
            // otherwise the selection would always go to the end of the ElementArrayFinder
            if(text !== beforeSelection && clicked === false) {
              afterSelection = text;
              // make a new interest selection
              box.click();
              clicked = true;

              // translate the new selection to a number
              newInterest = translateInterestIntoNumber(afterSelection);
            }
          });
      })
      .then(function() {
        // confirm we're not just selecting the same interest
        expect( beforeSelection ).not.toBe( afterSelection );

        // look for the active box to have changed css styles
        element(by.css('div.dashbox-icon-active'))
          .then(function(selectedInterest) {
            expect( selectedInterest.getText() ).toBe( afterSelection );
          });
      });
  });

  it('should update the opportunity interest on the opportunities page', function() {
    browser.sleep(1000);
    // navigate back to opportunities
    element(by.css('div#sidebar-opportunities')).click();
    expect( browser.getCurrentUrl() ).toBe( 'http://localhost:8000/users/opportunities' );

    // get the number rating
    element(by.css('body > div.content-container > div.ng-scope > div > ui-view > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(4) > span.tablebox-important.ng-binding'))
      .getText()
        .then(function(number) {
          expect( number ).not.toBe( oldInterest );
          // expect your interest for that position to be the number selected
          expect( number ).toBe( newInterest );
        });
  });

  it('should still have the interest when navigating back to the opportunity for a second time', function() {
    // click on same first company
    var apollo = element(by.cssContainingText('a.ng-binding', 'Apollo Lightspeed'));
    browser.sleep(1000);
    apollo.click();
    expect( browser.getCurrentUrl() ).toBe( 'http://localhost:8000/users/opportunities/53b1ea816ecb92340e865aa6' );

    // get the highlighted interest box
    element(by.css('div.dashbox-icon-active'))
      .then(function(selectedInterest) {
        selectedInterest.getText()
          .then(function(text) {
            // expect correct number to be highlighted
            expect( translateInterestIntoNumber(text) ).toBe( newInterest );
          })
      });
  });

});

var translateInterestIntoNumber = function(interestText) {
  var cases = {
    1: /NONE/,
    2: /LOW/,
    3: /MIS\//,
    4: /VERY/
  };

  for(var key in cases) {
    if( interestText.match(cases[key]) !== null ) {
      return key;
    }
  }
};
