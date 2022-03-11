# Elasticsearch management utility for Sunview Software
### CSE Capstone Project - Fall 2021  
#### Collaborators: 
- Barath Dandu
- Keylin Sanchez
- Alexander Logorz   
#### This repository contains the files for a web utility that automates the index management procedures that help clients maintain their Elasticsearch distribution.
## Application Structure
    .
    |—client/
    |  |—node_modules/
    |  |  |—***node configuration files***
    |  |—src/
    |  |  |—app/
    |  |  |  |—dashboard-page/
    |  |  |  |  |—bulk/
    |  |  |  |  |  |—***bulk component files***
    |  |  |  |  |—indexes/
    |  |  |  |  |  |—index/
    |  |  |  |  |  |  |—***index component files***
    |  |  |  |  |  |—index-list/
    |  |  |  |  |  |  |—***index list component files***
    |  |  |  |  |—mat-confirm-dialog/
    |  |  |  |  |  |—***mat confirm dialogue files***
    |  |  |  |  |—reindex/
    |  |  |  |  |  |—***reindex component files***
    |  |  |  |  |—***dashboard page files***
    |  |  |  |—material/
    |  |  |  |  |—***material module file***
    |  |  |  |—page1/
    |  |  |  |  |—***page1 component files***
    |  |  |  |—rispage/
    |  |  |  |  |—***reindex scheduler component files***
    |  |  |  |—shared/
    |  |  |  |  |—***all service files***
    |  |  |  |—tsqpage/
    |  |  |  |  |—***troubleshooting search queries component files***
    |  |  |  |—***app module, app routing module, and app component files***
    |  |  |—assets/
    |  |  |  |—***Sunview logo png***
    |  |  |—environments/
    |  |  |  |—***environment files***
    |  |  |—***index html, main, polyfills, styles, and testing files***
    |  |—***README file, .gitignore file, and JSON files***
    |—server/
    |  |—client/
    |  |  |—public/
    |  |  |  |—***icon and manifest files***
    |  |  |—src/
    |  |  |  |—components/
    |  |  |  |  |—***IndicesList file***
    |  |  |  |—css/
    |  |  |  |  |—***App file***
    |  |  |—***javascript files***
    |  |—node_modules/
    |  |  |—***imported node module files***
    |  |—routes/
    |  |  |—***Index router file***
    |  |—***README file, .gitignore file, and JSON files***
    |—***README file***

## How to run
#### The following will be needed:
- NodeJS
- Angular
- Elasticsearch
- Kibana
### Install NodeJS
#### NodeJS can be downloaded from https://nodejs.org/en/. The version needed to run this application is the LTS version. Follow the steps for installation, making sure not to select "Automatically install the necessary tools"
#### Once NodeJS is installed, open a new terminal to see if it has installed properly.
#### To test which version of node you have, run the following command:
    node -v
#### If the version number appears, then you have successfully installed NodeJS.
### Install Angular
#### In the same terminal, enter the following command:
    npm install -g @angular/cli
#### This command should install Angular. To check to see if it has installed properly, run the following command:
    ng --version
#### If angular has been properly installed, your terminal will print the version of Angular you have installed.
### Navigate to your project files
#### Specifically, navigate to the server directory.
#### Enter the following command:
    npm install
#### This will install any dependencies needed to your device in order to run the program.
#### Once this has been completed, enter the following command:
    npm start
#### This command will start running the server. Once the server is running, the application may ask you to allow access to some of the blocked content. Select 'Allow access'.
### Install Elasticsearch and Kibana
#### Elasticsearch and Kibana can both be downloaded from https://www.elastic.co/start.
#### Once downloaded, extract Elasticsearch and navigate to the bin directory. Run the batch file. This will open a new terminal. It may take between 2-5 minutes to start up.
#### After that, extract Kibana and navigate to the bin directory. Run the batch file. This will open a new terminal. It may take between 2-5 minutes to start up.
### After all three terminals are set up and running:
#### Open "localhost:5601" in your browser.
#### When the page opens, it will ask if you want to add data, click on add data, then navigate to sample data and click add data on sample eCommerce orders. This will add sample data to your Elasticsearch.
### Running the project:
#### Open a new terminal and navigate to the main client directory from your project files. Enter the following command:
    ng serve -o
#### This will take approximately 1-3 minutes to run, and will open a browser window which will have the application running.
## Running example:
### Dashboard view
![Screen Shot 2022-03-11 at 5 42 44 PM](https://user-images.githubusercontent.com/66031870/157984779-24993e02-3c93-47e6-adbb-797f0acf0834.png)

