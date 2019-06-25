var args = process.argv.slice(2);
let file = args[0];
const output = args[1];
console.log(args);
//let depth = args[1];
let toc = "";
let counter = 1;
var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream(file)
});

lineReader.on("line", function(line) {
  let clean = line.trim();
  let href = "";

  if (
    !clean.startsWith("#") ||
    clean.startsWith("####") ||
    clean.startsWith("# ") ||
    clean.startsWith("#####")
  ) {
    return;
  }
  clean = clean.replace(/`/g, "");
  if (clean.startsWith("###")) {
    //add tab character
    //clean=clean.replace("###","").trim();
  } else if (clean.startsWith("##")) {
    clean = clean.replace("##", "").trim();
  }
  href = clean.replace(/[\. ,()&#]/g, ""); //burde liste tilladte i stedet
  if (clean.startsWith("###")) {
    clean = clean.replace(/#/g, "").trim();
    //toc+=`\t* [${clean}](#${href.trim().toLowerCase()})\n`;
  } else {
    toc += `${counter}. [${clean}](#${href.trim().toLowerCase()})\n`;
    counter++;
  }
});
lineReader.on("close", function(e) {
  var fs = require("fs");
  console.log(toc);
  fs.writeFile(output, toc, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
});
