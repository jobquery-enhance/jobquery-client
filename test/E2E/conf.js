exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    './Admin/adminLogin.js',
    './Admin/matchGrid.js'
  ]
};