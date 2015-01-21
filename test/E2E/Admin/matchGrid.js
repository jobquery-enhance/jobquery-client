var loginCredentials = require('../privateInfo.js').admin;

describe('Match grid', function() {
  var ApolloLightspeed = 'http://localhost:8000/admin/opportunities/53b1ea816ecb92340e865aa6';
  var Beatsmusic = 'http://localhost:8000/admin/opportunities/53b1a55a6ecb92340e865929';

  // beforeEach(function() {
  //   browser.get('http://localhost:8000/login');
  //   element(by.model('email')).sendKeys(loginCredentials[0]);
  //   element(by.model('password')).sendKeys(loginCredentials[1]);
  //   element(by.css('input.login-button')).click();
  // });

  it('should be hidden at first', function() {
    browser.get(ApolloLightspeed);
    var rows = element.all(by.css('tbody tr th'));
    expect( rows.count() ).toBe(0);
  });

  it('should show when the "Show Match Grid" button is clicked', function() {
    element(by.buttonText('Show Match Grid')).click();
    element.all(by.repeater('user in attending | filter:ExcludeAccepted() | orderBy:sorter:reverse'))
      .then(function(users) {
        expect(users.length).not.toBe(0);
      });
  });

  it('should disable "Show Match Grid" button after one click', function() {
    var matchGridButton = element(by.buttonText('Show Match Grid'));
    expect( matchGridButton.isEnabled() ).toBe(false);
  });

  it('should not have duplicates within the match grid', function() {
    var duplicate = false;
    element.all(by.css('div.row table tbody tr td a')).then(function(links) {
      for(var i = 1; i < links.length; i++) {
        var link = links[i].getAttribute('href');
        for(var j = i + 1; j < links.length; j++) {
          if( links[j] === link) {
            duplicate = true;
          }
        }
      }
      expect(duplicate).toBe(false);
    });


  });

  xit('should display the correct data', function() {
    /* There is currently an issue where the match grid shows information 
    from the previous opportunity's match grid.
    */

    // Navigate to job A.
    // Show match grid for job A.
    // Save ng-repeat candidates
    // Navigate to match grid for job B.
    // Show match grid for job B.
    // Save ng-repeat candidates
    // Compare candidates, they should be dissimilar
    expect(expecation).to.be(equal);
  });
});