const Jimp = require('jimp');
const getStat = require('./getData');

const x = [480, 2540];
const y = [143, 670, 1190, 1710, 143, 670, 1193, 1695];

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
        y[Math.floor(index / 4)] + ((index % 4) * 110),
        allScore[index],
      );
      return 0;
    });
    // image.print(font, x[0], 143, result.russia[0].toString());// russia
    // image.print(font, x[0], 253, result['saudi arabia'][0].toString());// arabia
    // image.print(font, x[0], 363, result.egypt[0].toString());// egypt
    // image.print(font, x[0], 473, result.uruguay[0].toString());// urugway

    // image.print(font, x[0], 670, result.portugal[0].toString());// portugal
    // image.print(font, x[0], 780, result.spain[0].toString());// spain
    // image.print(font, x[0], 890, result.morocco[0].toString());// monaco
    // image.print(font, x[0], 1000, result.iran[0].toString());// iran

    // image.print(font, x[0], 1190, result.france[0].toString());// france
    // image.print(font, x[0], 1300, result.australia[0].toString());// australia
    // image.print(font, x[0], 1410, result.peru[0].toString());// peru
    // image.print(font, x[0], 1520, result.denmark[0].toString());// denmark

    // image.print(font, x[0], 1710, result.argentina[0].toString());// argentina
    // image.print(font, x[0], 1820, result.iceland[0].toString());// iceland
    // image.print(font, x[0], 1930, result.croatia[0].toString());// croatia
    // image.print(font, x[0], 2040, result.nigeria[0].toString());// nigeria

    // image.print(font, x[1], 143, result.brazil[0].toString());// brazil
    // image.print(font, x[1], 253, result.switzerland[0].toString());// switzerland
    // image.print(font, x[1], 363, result['costa rica'][0].toString());// costa rica
    // image.print(font, x[1], 473, result.serbia[0].toString());// serbia

    // image.print(font, x[1], 670, result.germany[0].toString());// germany
    // image.print(font, x[1], 780, result.mexico[0].toString());// mexico
    // image.print(font, x[1], 890, result.sweden[0].toString());// sweden
    // image.print(font, x[1], 1000, result['korea republic'][0].toString());// korea

    // image.print(font, x[1], 1193, result.belgium[0].toString());// belgium
    // image.print(font, x[1], 1303, result.panama[0].toString());// panama
    // image.print(font, x[1], 1413, result.tunisia[0].toString());// tunisia
    // image.print(font, x[1], 1523, result.england[0].toString());// england

    // image.print(font, x[1], 1695, result.poland[0].toString());// poland
    // image.print(font, x[1], 1805, result.senegal[0].toString());// senegal
    // image.print(font, x[1], 1915, result.colombia[0].toString());// colombia
    // image.print(font, x[1], 2025, result.japan[0].toString());// japan

    const file = `new_name.${image.getExtension()}`;
    image.write(file);
  }));
}).catch(err => console.log(err));

