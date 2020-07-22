const fse = require("fs-extra");
const os = require("os");
const homedir = os.homedir;
const execa = require("execa");
const express = require("express");

const router = express.Router();

//function to save file
const saveFile = async (name, data) => {
  try {
    await fse.outputFile(`${homedir}/${name}`, data);
    console.log("File Saved!");
  } catch (error) {
    console.log(error);
  }
};

//execute C code
const cExecute = async (data, input) => {
  const filename = "code.c";
  try {
    //create C file
    await saveFile(filename, data);

    //create input file
    // await saveFile(`input.txt`, input);

    //When successful, generate output file
    const codePath = `${homedir}/${filename}`;

    //compile C program
    await execa.command("gcc " + codePath);

    //run a.out w/ or w/out arguments
    const datar = await execa.command(`./a.out "${input ? input : ""}"`, {
      shell: true,
    });

    //return
    return datar.stdout;
  } catch (err) {
    return err;
  }
};

//cppExecute
//pyExecute
//javaExecute

//route --------------------------------------------------
router.post("/submit", async (req, res) => {
  const { code, input, lang } = req.body;
  const data = await cExecute(code, input);
  return res.status(200).send(data);
});

module.exports = { router };
