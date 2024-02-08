const axios = require("axios");
const cheerio = require("cheerio");

async function getChampionData(champion) {
  champion = champion.toLowerCase();
  let result,
    url,
    url2 = "";
  console.log(champion);

  if (champion.includes(" ")) {
    champion = champion.replace(" ", "-");
    console.log(champion);
  }

  try {
    if (champion === "nunu") {
      url = "https://lolwildriftbuild.com/champion/" + "nunu-willump";
      url2 = "https://www.wildriftfire.com/guide/" + "nunu-amp-willump";
    } else {
      url = "https://lolwildriftbuild.com/champion/" + champion;
      url2 = "https://www.wildriftfire.com/guide/" + champion;
    }

    const response = await axios(url);
    const html = await response.data;
    const $ = cheerio.load(html);
    console.log(response.status);

    const response2 = await axios(url2);
    const html2 = await response2.data;
    const $2 = cheerio.load(html2);
    console.log(response2.status);

    const img = $(".hero-img");
    const thumbnail = img.contents()["1"].attribs["data-lazy-src"];

    const lane = $(".recommended-lane").children().text();

    let allSpells = $2(".section.spells").text();
    allSpells = allSpells.split("\n");
    allSpells = allSpells.filter((e) => e !== "");
    let spells = "";
    for (let i = 1; i < 3; i++) {
      spells += allSpells[i] + "\n";
    }

    const allRunes = $(".characters-rune");
    let runes = "";
    for (let i = 0; i < 4; i++) {
      runes += `${allRunes[i.toString()].attribs.title}\n`;
    }

    const items = $(".build-item");
    const startingItem = items["0"].attribs.title;
    let coreItems = "";
    for (let i = 3; i < 6; i++) {
      coreItems += `${items[i.toString()].attribs.title}\n`;
    }

    const allSkills = $2(".skills-mod__quick__order")
      .children(".ico-holder")
      .children()
      .children("img");
    let skillsArr = [];
    let skills = "";
    for (const i of allSkills) {
      skillsArr.push(i.attribs.alt + " > ");
    }
    for (let i = 0; i < 3; i++) {
      skills += skillsArr[i];
    }
    skills = skills.slice(0, skills.length - 2);

    const allCounters = $(".hero-counters").children("p");
    let counters = "";
    for (let i = 2; i < allCounters.length; i++) {
      if ($(allCounters[i]).text()[0] !== "<") {
        counters += `\n${$(allCounters[i])
          .text()
          .replace(/(<([^>]+)>)/gi, "")}\n`;
      }
    }

    champion = champion.charAt(0).toUpperCase() + champion.slice(1);
    result = {
      thumbnail: thumbnail,
      name: champion,
      lane: lane,
      spells: spells,
      runes: runes,
      startingItem: startingItem,
      coreItems: coreItems,
      skills: skills,
      counters: counters,
    };
    if (result.counters.length > 1024) {
      result.counters = result.counters.slice(0, 1025);
    }
    return result;
  } catch (error) {
    console.log(`No results for ${champion}. ${error.message}`);
    return `No results`;
  }
}
module.exports = { getChampionData };
