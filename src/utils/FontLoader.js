const FFO = require("fontfaceobserver/fontfaceobserver");

export default function() {
  // Add project font families
  const families = [
    {
      family: 'SofiaProRegular',
      weight: 400
    },
    {
      family: 'SofiaPro-Bold',
      weight: 400
    },
    {
      family: 'SofiaProSemiBold',
      weight: 400
    }
  ];

  const promises = families.map((f) => {
    const font = new FFO(f.family);

    // console.group('Loaded Fonts');
    // console.log('font:', font);
    // console.groupEnd();

    font.load(null, 4000);
  });

  return Promise.all(promises);
}
