exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    // Admin tests
    './Admin/adminLogin.js',
    './Admin/matchGrid.js',

    // User tests
    './User/SubmitInterest.js'
  ]
};