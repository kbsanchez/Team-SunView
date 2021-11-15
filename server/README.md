# Team SunView API Docs (v2.0) 
Before you begin, make sure you have [node](https://nodejs.org/en/download/ "Node Installation") installed and have cloned the server folder into your project. Here is a link to our [repo](https://github.com/kbsanchez/Team-SunView.git "Github Repo").
## Installing Dependencies
Navigate to your project and run the following command:
```JavaScript
npm install
```
This will install all of the dependencies for the api, such as, express and cors. 
## Running ElasticSearch
Next, we need to download [Elasticsearch](https://www.elastic.co/elasticsearch/ "Elasticsearch Installation"). After downloading, run the batch file found in the bin folder. This will run elasticsearch on your local machine.
## Running Express
Lastly, navigate to the root folder where the server.js file is and run the following command:
```Javascript
npm start
```
This will start the express app in localhost:5000
***
## Using the API 
You can test the api by making the http requests to the backend inside your application or by using [postman](https://www.postman.com/downloads/ "Postman Download"). Postman is an API platform for building and using APIs.

### **Current Supported Functions:**

Creating an Index

    PUT localhost:5000/api/index/my_first_index

```JavaScript
// and for the index configuration. A new doc will be inserted after the index is created with the field name indexType.
{
    "config": {
        "settings": {
            "number_of_shards": 3,
            "number_of_replicas": 2
        },
        "indexType": "Article"
    }
}
```
Getting an Index

    GET localhost:5000/api/index/my_first_index

Getting All Indices

    GET localhost:5000/api/index

Deleting an Index

    DELETE localhost:5000/api/index/my_first_index

Troubleshooting a search query

    POST localhost:5000/api/explain/my_first_index/0

```JavaScript
// and for the search query
{
  "query" : {
    "match" : { "category" : "Men's Clothing" }
  }
}
```
Re indexing

    POST localhost:5000/api/reindex/my_source_index/my_dest_index

Bulk indexing

    POST localhost:5000/api/bulk/my_dest_index

```JavaScript
// will index all of the documents from the indices array into the dest index
{
    "indices": ["my_first_index", "my_second_index", "my_third_index"]
}
```
Searching an index

    GET localhost:5000/api/index/my_amazing_index/search
```JavaScript
// searches an index against the specified query
{
  "query": {
    "match": {
      "category": "Men's Clothing"
    }
  }
}
```