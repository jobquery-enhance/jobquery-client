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
    element.all(by.repeater('user in attending | filter:ExcludeAccepted() | orderBy:sorter:reverse'))
      .then(function(users) {
        expect(users.length).toBe(0);
      });
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

  xit('should not have duplicates within the match grid', function() {
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

  it('should display the correct data', function() {
    /* There is currently an issue where the match grid shows information 
    from the previous opportunity's match grid.
    */
    var jobAMatches;
    var jobBMatches;

    // Already on job A, with match grid shown.
    // Save ng-repeat candidates
    jobAMatches = element.all(by.css('div.row table tbody tr td a'));
    expect( jobAMatches.count() ).not.toBe(0);

    // Navigate to job B.
    browser.get(Beatsmusic);
    var matchGridButton = element(by.buttonText('Show Match Grid'));

    // Match grid should be hidden
    jobBMatches = element.all(by.repeater('div.row table tbody tr td a'))
    expect( jobBMatches.count() ).toBe(0);

    // The match grid button should be enabled, bc it hasn't been clicked yet
    expect( matchGridButton.isEnabled() ).toBe(true);
    // Show match grid for job B.
    matchGridButton.click()
    // Now button should be disabled an match grid showing
    expect( matchGridButton.isEnabled() ).toBe(false);

    // The match grid should be showing
    jobBMatches = element.all(by.css('div.row table tbody tr td a'));
    expect( jobBMatches.count() ).not.toBe(0);

    // Compare candidates' links, they should be dissimilar
    expect(jobAMatches.getAttribute('href')).not.toEqual(jobBMatches.getAttribute('href'));
  });
});