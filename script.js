const mapName = document.querySelector("#mapName");
const jsonInput = document.querySelector("#jsonInput");
const convertBtn = document.querySelector("#convertBtn");
const jsonOutput = document.querySelector("#jsonOutput");

new ClipboardJS(".copy");

convertBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (jsonInput.value == "" && mapName.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter JSON and map name...",
    });
  } else if (jsonInput.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter the JSON...",
    });
  } else if (mapName.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter the map name...",
    });
  } else {
    try {
      let jsonValue = JSON.parse(jsonInput.value);
      console.log("jsonValue:", jsonValue);
      let mapValue = mapName.value;

      let outputValue = convertJSONToDeluge(jsonValue, mapValue);
      console.log("outputValue:", outputValue);

      jsonOutput.value = outputValue;
      jsonOutput.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please check the JSON you entered...",
      });
    }
  }
});

function convertJSONToDeluge(jsonValue, mapValue) {
  let outputValue = "";

  let result = Object.keys(jsonValue).map((key) => [key, jsonValue[key]]);

  result.forEach((item) => {
    if (typeof item[1] !== "object") {
      outputValue += `${mapValue}.put("${item[0]}", "${item[1]}");\n`;
    } else {
      outputValue += `${mapValue}.put("${item[0]}", []);\n`;
    }
  });

  return outputValue;
}
