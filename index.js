const readline = require("readline");
const fs = require('fs');
const https = require('https');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// console.log("Before asking Question");

var outputReadMeFileName = "READ-ME.md";
var gitHubUserName;
var gitHubUserEmail;
var gitHubUserAvatarUrl;
var projectTitle;
var projectDescription;
var tableOfContents;
var installation;
var usage;
var licence;
var contributors;
var tests;

rl.question("What is your GitHub Username? ", function(userInput) {
    gitHubUserName = userInput;
    console.log("User Entered the following: " + gitHubUserName);

    rl.question("Enter your Project Title ", function(userInput) {
        projectTitle = userInput;
        console.log("User Entered the following: " + projectTitle);
        
        rl.question("Enter your Project Description ", function(userInput) {
            projectDescription = userInput;
            console.log("User Entered the following: " + projectDescription);

            rl.question("Enter your Table of Contents ", function(userInput) {
                tableOfContents = userInput;
                console.log("User Entered the following: " + tableOfContents);

                rl.question("Enter your installation steps ", function(userInput) {
                    installation = userInput;
                    console.log("User Entered the following: " + installation);
            
                    rl.question("Enter usage terms ", function(userInput) {
                        usage = userInput;
                        console.log("User Entered the following: " + usage);

                        rl.question("Enter licence ", function(userInput) {
                            licence = userInput;
                            console.log("User Entered the following: " + licence);

                            rl.question("Enter contributors name's ", function(userInput) {
                                contributors = userInput;
                                console.log("User Entered the following: " + contributors);

                                rl.question("Explain how to run the automated tests for this system ", function(userInput) {
                                    tests = userInput;
                                    console.log("User Entered the following: " + tests);
                                
                                    //make HTTPS GET call to github to get user email and avatar url
                                    var opts = {
                                        headers: {
                                            'user-agent': "Nikola's node http client"
                                        },
                                        host: 'api.github.com', 
                                        path: '/users/' + gitHubUserName,
                                        method: 'GET'
                                    };

                                    https.get(opts, function (resp) {
                                    let data = '';

                                    // A chunk of data has been recieved.
                                    resp.on('data', (chunk) => {
                                        data += chunk;
                                    });

                                    // The whole response has been received. Print out the result.
                                    resp.on('end', () => {
                                    //    console.log(data);
                                        var jsonData = JSON.parse(data);

                                        gitHubUserEmail = jsonData.email;
                                        gitHubUserAvatarUrl = jsonData.avatar_url;

                                        console.log("email: " + jsonData.email);
                                        console.log("avatar url: " + jsonData.avatar_url);

                                        generateReadMe();

                                    });
                                    }).on("error", (err) => {
                                        console.log("Error: " + err.message);
                                    });

                                    rl.close();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

function generateReadMe(){
    console.log("Generating Read Me...");

    // 1 badge only for now: Licence //
    var badges = "[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)";


    var userImage = "![alt text](" + gitHubUserAvatarUrl + " 'user image')";
 //   var userImage = "<img src='" + gitHubUserAvatarUrl + "' width=200 height=200 />";

    var fileContent = 
        userImage + "\n" +
        "Email: " + gitHubUserEmail + "\n" +
        "# " + projectTitle + "\n" + 
        projectDescription + "\n" + 
        badges + "\n" + 
        "## Table of Contents \n" + tableOfContents + "\n" +
        "## Installation \n" + installation + "\n" + 
        "## Usage \n" + usage + "\n" + 
        "## Licence \n" + licence + "\n" +
        "## Contributors \n" + contributors + "\n" +
        "## Testing \n" + tests + "\n";

    fs.writeFile(outputReadMeFileName, fileContent, function (err) {
        if (err) return console.log(err);
        console.log(outputReadMeFileName + " Generated");
    });
}
