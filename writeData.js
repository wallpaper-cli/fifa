const Jimp = require('jimp');
const { exec } = require('child_process');
const getStat = require('./getData');

const x = [480, 2540];
const y = [143, 670, 1190, 1710, 143, 670, 1193, 1695];
const teamList = ['russia',
  'saudi arabia',
  'egypt',
  'uruguay',
  'portugal',
  'spain',
  'morocco',
  'iran',
  'france',
  'australia',
  'peru',
  'denmark',
  'argentina',
  'iceland',
  'croatia',
  'nigeria',
  'brazil',
  'switzerland',
  'costa rica',
  'serbia',
  'germany',
  'mexico',
  'sweden',
  'korea republic',
  'belgium',
  'panama',
  'tunisia',
  'england',
  'poland',
  'senegal',
  'colombia',
  'japan'];

const setWallpaper = 'wallpaper new_file.png';

const fillRow = (image, font, x1, y1, stat) => {
  let k = 0;
  console.log(stat);
  for (let i = 0; i < stat.length; i += 1) {
    image.print(font, x1 + k, y1, stat[i].toString());
    k += 108;
  }
};

getStat().then((result) => {
  console.log(result);
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
    const file = 'new_file.png';
    image.write(file, () => {
      exec(setWallpaper, (err) => {
        if (!err) {
          console.log('Wallpaper updated');
        } else {
          console.log('Error: ', err);
        }
      });
    });

    // setTimeout(() => {
    //   exec(resetWallpaper, (err, data) => {
    //     if (!err) {
    //       console.log('Wallpaper updated: ', data);
    //     } else {
    //       console.log('Error: ', err);
    //     }
    //   });
    // }, 2000);

    // setTimeout(() => {
    //   exec(setWallpaper, (err, data) => {
    //     if (!err) {
    //       console.log('Wallpaper updated: ', data);
    //     } else {
    //       console.log('Error: ', err);
    //     }
    //   });
    // }, 2000);
  }));
}).catch(err => console.log(err));
