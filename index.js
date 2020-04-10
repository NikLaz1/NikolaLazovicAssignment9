const readline = require("readline");
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// console.log("Before asking Question");

var outputReadMeFileName = "READ-ME.md";
var gitHubUserName;
var projectTitle;
var projectDescription;

rl.question("What is your GitHub Username? ", function(userInput) {
    gitHubUserName = userInput;
    console.log("User Entered the following: " + gitHubUserName);

    rl.question("Enter your Project Title ", function(userInput) {
        projectTitle = userInput;
        console.log("User Entered the following: " + projectTitle);
        
        rl.question("Enter your Project Description ", function(userInput) {
            projectDescription = userInput;
            console.log("User Entered the following: " + projectDescription);

            generateReadMe();

            rl.close();
        });
    });
});

function generateReadMe(){
    console.log("Generating Read Me...");

    var fileContent = "# " + projectTitle + "\n" + projectDescription;

    fs.writeFile(outputReadMeFileName, fileContent, function (err) {
        if (err) return console.log(err);
        console.log(outputReadMeFileName + " Generated");
    });
}
// console.log("\nAfter Calling rl.question");