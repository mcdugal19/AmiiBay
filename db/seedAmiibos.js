const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function fetchAmiibos() {
  try {
    const response = await fetch("https://amiiboapi.com/api/amiibo/");
    const { amiibo } = await response.json();

    const optimizedArray = await Promise.all(
      amiibo.map((amiiboObj) => {
        const newObj = {
          name: amiiboObj.character,
        };

        amiiboObj.character === amiiboObj.name
          ? (newObj.variation = null)
          : (newObj.variation = amiiboObj.name);

        newObj.game = amiiboObj.gameSeries;
        newObj.image = amiiboObj.image;

        amiiboObj.release.na
          ? (newObj.description = `Released in North America ${new Date(
              amiiboObj.release.na
            ).toDateString()}, this ${
              amiiboObj.character
            } ${amiiboObj.type.toLowerCase()} amiibo was produced as part of the ${
              amiiboObj.amiiboSeries
            } collection.`)
          : amiiboObj.release.jp
          ? (newObj.description = `Released in Japan ${new Date(
              amiiboObj.release.jp
            ).toDateString()} without a North American release, this ${
              amiiboObj.character
            } ${amiiboObj.type.toLowerCase()} amiibo was produced as part of the ${
              amiiboObj.amiiboSeries
            } collection.`)
          : (newObj.description = `This ${amiiboObj.character} amiibo was produced as part of the ${amiiboObj.amiiboSeries} collection.`);

        amiiboObj.release.na ? (newObj.price = 19.99) : (newObj.price = 39.99);
        newObj.inventory = 10;

        return newObj;
      })
    );
    return optimizedArray;
  } catch (error) {
    console.error(error);
  }
}

module.exports = fetchAmiibos;
