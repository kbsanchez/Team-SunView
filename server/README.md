# Team SunView API Docs (v 1.0) <img src="https://cdn-icons.flaticon.com/png/512/2995/premium/2995489.png?token=exp=1634671390~hmac=62e0939e9ed7d434ee52fa7ad5f9d65c" alt="icon by flaticon" width="35" height="35" />
Before you begin, make sure you have [node](https://nodejs.org/en/download/ "Node Installation") installed. 
## Installing Dependencies
Then open up your terminal and run the following command:
```JavaScript
npm install
```
This will install all of the dependencies for this project, such as, express and cors. 
## Running ElasticSearch
Next, we need to download [Elasticsearch](https://www.elastic.co/elasticsearch/ "Elasticsearch Installation"). After downloading, run the batch file found in the bin folder. This will run elasticsearch on your local machine.
## Running Express
To test the api, you first need to run the express app on your local machine.
1. Fork the repo [here](https://github.com/kbsanchez/Team-SunView.git "Github Repo")
2. Open up your terminal and navigate to the project folder
3. Run the following command:
```Javascript
npm start
```
This will run the express app in localhost:5000
***
## Using the API 
You can test the api by making the http requests to the backend inside your application or by using [postman](https://www.postman.com/downloads/ "Postman Download"). Postman is an API platform for building and using APIs.

### **Current Supported Functions:**

Creating an Index
```JavaScript
PUT http://localhost:5000/api/index/my_first_index
```
Getting an Index
```JavaScript
GET http://localhost:5000/api/index/my_first_index
```
Getting All Indices
```JavaScript
GET http://localhost:5000/api/index
```
Deleting an Index
```JavaScript
DELETE http://localhost:5000/api/index/my_first_index
```
