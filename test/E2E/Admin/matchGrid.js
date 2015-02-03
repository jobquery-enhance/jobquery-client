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

  it('should not have duplicates within the match grid', function() {
    // Already on job A, with match grid shown.
    var duplicate = false;
    var linkStorage = {};

    // Save unique links
    var uniqueUserLinks = element.all(by.css('div.row table tbody tr td a'));
    
    // get an array of href attributes
    uniqueUserLinks.getAttribute('href')
      .then(function(hrefs) {
        // add the links to the linkStorage object
        for (var i = 0; i < hrefs.length; i++) {
          // if the link is already there
          if( linkStorage[ hrefs[i] ] ) {
            // update its counter
            linkStorage[hrefs[i]] += 1
            duplicate = true;
            // there's already one duplicate, which will fail the test
            break;
          } else {
            // create a link and start a counter
            linkStorage[hrefs[i]] = 1;
          }
        };
      }).then(function() {
        expect(duplicate).toBe(false);
      });
  });

  it('should display the correct data', function() {
    /* There is currently an issue where the match grid shows information 
    from the previous opportunity's match grid.
    */

    // Matches start as webelements (for counting), 
    // but are then turned into objects to be used for comparison
    var jobAMatches;
    var jobBMatches;

    // Already on job A, with match grid shown.
    // Save ng-repeat candidates
    jobAMatches = element.all(by.repeater('user in attending | filter:ExcludeAccepted() | orderBy:sorter:reverse'));
    expect( jobAMatches.count() ).not.toBe(0);

    jobAMatches = {};
    element.all(by.repeater('user in attending | filter:ExcludeAccepted() | orderBy:sorter:reverse'))
      .each(function(row) {
        // An array with format: [href, name, rating]
        var hrefNameRating;

        row.getInnerHtml()
          .then(function(columns) {
            hrefNameRating = extractRowData(columns);

            if( hrefNameRating ) {
              var href = hrefNameRating[0];
              var name = hrefNameRating[1];
              var rating = hrefNameRating[2];

              jobAMatches[href] = 
                { name: rating };
            }
          });
      });
  
    // // Navigate to job B.
    browser.get(Beatsmusic);
    var matchGridButton = element(by.buttonText('Show Match Grid'));

    // // Match grid should be hidden
    jobBMatches = element.all(by.repeater('user in attending | filter:ExcludeAccepted() | orderBy:sorter:reverse'));
    expect( jobBMatches.count() ).toBe(0);

    // // The match grid button should be enabled, bc it hasn't been clicked yet
    expect( matchGridButton.isEnabled() ).toBe(true);
    // // Show match grid for job B.
    matchGridButton.click()
    // // Now button should be disabled an match grid showing
    expect( matchGridButton.isEnabled() ).toBe(false);

    // // The match grid should be showing
    jobBMatches = element.all(by.repeater('user in attending | filter:ExcludeAccepted() | orderBy:sorter:reverse'));
    expect( jobBMatches.count() ).not.toBe(0);

    // Get the name and rating of each repeat
    // Store in an object

    // Recreate for jobB

    // Loop through both objects, comparing.

    // // // Compare candidates' links, they should be dissimilar
    // jobAMatches.count()
    //   .then(function(numberOfJobs) {
      
    //     for(var i = 0; i < numberOfJobs; i++) {
    //       if( jobAMatches[i] != jobBMatches[i] ) {
    //         same = false;
    //       } else if( i === 1 ) {
    //         jobAMatches.get(1)
    //           .then(function(one) {
    //             console.log('message', one.getText() );
    //           });

    //         // jobBMatches.get(1)
    //         //   .then(function(one) {
    //         //     console.log('first job B', one.getText());
    //         //   });
    //       }
    //     };
    //   });


  });
});

var extractRowData = function(ngRepeatColumns) {
  var href;
  var name;
  var rating;

  // Catches each user's unique href identifier
  var hrefRegEx = /\/admin\/candidates\/+(\d|\w){10,}/;
  // Catches first-and-last names
  var nameRegEx = />+\w+\s+\w+</;
  // Catches the user's numerical rating of the position
  var ratingRegEx = />+\d+</;

  if( ngRepeatColumns.match(nameRegEx) !== null ) {
    // Href identifier
    href = ngRepeatColumns.match(hrefRegEx)[0];
    href = href.substring(18);

    // Name
    name = ngRepeatColumns.match(nameRegEx)[0];
    // Remove html carrots from <User Name>
    name = name.substring(1, name.length - 1);
  
    // Rating
    if( ngRepeatColumns.match(ratingRegEx) !== null ) {
      rating = ngRepeatColumns.match(ratingRegEx)[0];
      rating = rating.substring(1, rating.length - 1);
    } else {
      rating = 'N/A';
    }

    return [href, name, rating];
  } else {
    return false;
  }
};