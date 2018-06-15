const Jimp = require('jimp');
const { exec } = require('child_process');
const getStat = require('./getData');
const { x, y, teamList } = require('./constant');

const file = `${new Date().getTime()}.png`;
const removeExistingFile = 'rm -rf [0-9]*.png';
const setWallpaper = `osascript -e 'tell application "Finder" to set desktop picture to POSIX file "${__dirname}/${file}"'`;

const fillRow = (image, font, x1, y1, stat) => {
  let k = 0;
  for (let i = 0; i < stat.length; i += 1) {
    image.print(font, x1 + k, y1, stat[i].toString());
    k += 108;
  }
};

getStat().then((result) => {
  console.log(result);
  exec(removeExistingFile, (err) => {
    if (!err) {
      console.log('File deleted');
    } else {
      console.log('Error: ', err);
    }
  });
  Jimp.read('./fifa.png').then(image => Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then((font) => {
    const allScore = Object.values(result);
    const teams = Object.keys(result);
    teams.map((eachTeam, index) => {
      allScore[index].splice(4, 0, '-', '-');
      fillRow(
        image,
        font,
        x[Math.floor(index / 16)],
        y[Math.floor(teamList.indexOf(eachTeam) / 4)] + ((teamList.indexOf(eachTeam) % 4) * 110),
        allScore[index],
        eachTeam,
      );
      return 0;
    });
    image.write(file, (status) => {
      console.log(status);
      exec(setWallpaper, (err) => {
        if (!err) {
          console.log('Wallpaper updated');
        } else {
          console.log('Error: ', err);
        }
      });
    });
  }));
}).catch(err => console.log(err));
