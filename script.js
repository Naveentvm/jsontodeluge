const mapName = document.querySelector("#mapName");
const jsonInput = document.querySelector("#jsonInput");
const convertBtn = document.querySelector("#convertBtn");
const jsonOutput = document.querySelector("#jsonOutput");

convertBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let jsonValue = JSON.parse(jsonInput.value);
  let mapValue = mapName.value;

  let outputValue = "";

  let result = Object.keys(jsonValue).map((key) => [key, jsonValue[key]]);

  result.forEach((item) => {
    if (typeof item[1] !== "object") {
      outputValue += `${mapValue}.put("${item[0]}", "${item[1]}");\n`;
    } else {
      outputValue += `${mapValue}.put("${item[0]}", []);\n`;
    }
  });
  jsonOutput.value = outputValue;
  jsonOutput.scrollIntoView({ behavior: "smooth" });
});
