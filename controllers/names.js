const dylanRoute = (req, res) => {
    res.send('Dylan');
  };

const derekRoute = (req, res) => {
    res.send('Derek')
}
  
  module.exports = { dylanRoute, derekRoute };