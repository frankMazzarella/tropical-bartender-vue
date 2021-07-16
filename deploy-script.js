const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

const inputPath = path.join(__dirname, 'dist');
const outputPath = path.join(__dirname, '..', 'tropical-bartender-server', 'public');

if (fs.existsSync(outputPath)) {
  try {
    console.log(`Emptying ${outputPath}`);
    fsExtra.emptyDirSync(outputPath);
  } catch (err) {
    throw new Error(err);
  }
} else {
  try {
    console.log(`Creating ${outputPath}`);
    fs.mkdirSync(outputPath);
  } catch(err) {
    throw new Error(err);
  }
}

try {
  console.log(`Copying ${inputPath}\n    -to ${outputPath}`)
  fsExtra.copySync(inputPath, outputPath);
} catch (err) {
  throw new Error(err);
}
