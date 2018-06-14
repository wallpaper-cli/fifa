const Xray = require('x-ray');

const getCurrentStat = () => {
  const x = Xray();
  const finalJSON = {};
  return new Promise((resolve, reject) => {
    x('http://www.goal.com/en-in/world-cup/table/70excpe1synn9kadnbppahdn7', '.table__body', [{
      group: x('.table__row', [['.table__cell']]),
    }])((err, content) => {
      if (err) {
        reject(err);
      }
      content.map((eachGroup) => {
        eachGroup.group.map((eachTeamInfo) => {
          finalJSON[eachTeamInfo[2].toLowerCase()] = eachTeamInfo.slice(3);
          return 0;
        });
        return 0;
      });
      resolve(finalJSON);
    });
  });
};
module.exports = getCurrentStat;
