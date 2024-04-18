# MongoDVB


MongoDB is a source-available, cross-platform, *document-oriented* database program. 

Classified as a *NoSQL* database product, MongoDB utilizes JSON-like documents with optional schemas. 

NoSQL is used as an alternative to traditional relational databases. NoSQL databases are quite useful for working with large sets of distributed data. 

Structured Query Language (SQL) is a standardized programming language that is used to manage relational databases. 
SQL normalizes data as schemas and tables, and every table has a fixed structure.

Instead of using tables and rows as in relational databases, as a NoSQL database, the MongoDB architecture is made up of collections and documents. 
Documents are made up of Key-value pairs -- MongoDB's basic unit of data. Collections, the equivalent of SQL tables, contain document sets. 


##  How does MongoDB work

MongoDB environments provide users with a server to create databases with MongoDB. MongoDB stores data as records that are made up of collections and documents.

Documents contain the data the user wants to store in the MongoDB database. Documents are composed of field and value pairs. 

They are the basic unit of data in MongoDB. The documents are similar to JavaScript Object Notation (JSON) but use a variant called Binary JSON (BSON). 

The benefit of using BSON is that it accommodates more data types. The fields in these documents are like the columns in a relational database. 

Values contained can be a variety of data types, including other documents, arrays and arrays of documents, according to the MongoDB user manual. 

Documents will also incorporate a primary key as a unique identifier. A document's structure is changed by adding or deleting new or existing fields.

Sets of documents are called collections, which function as the equivalent of relational database tables. 

Collections can contain any type of data, but the restriction is the data in a collection cannot be spread across different databases. 

Users of MongoDB can create multiple databases with multiple collections.


###  commands

 - **show databases** | **show dbs** : a list of all existing databases

 - **db.adminCommand( { listDatabases: 1 } )** : a list of all existing databases along with basic statistics about them. 

 - **use [database]** :  create new database or switch to existing one

 - **db.dropDatabase()** :  delete current database

 - **db.createCollection(name)** :  create new collection in current database

 - **show collections** :  show all collections in current database

 - **db.[collection].insertOne(object)** :  insert single document

 - **db.[collection].insertMany([])** :  insert documents

 - **db.[collection].find()**:  find all

 - **db.[collection].find({age:33})**:  find with exact criretia

 - **db.[collection].find({age:{$lt:40}})**:  find with criretia *lt* | *lte* | *gt* | *gte* | *ne*

 - **db.[collection].find( {$or: [{age:33}, name:"Mike"] } )**:  find with OR criretia

 - **db.[collection].find().sort({age:-1})**:  sort  -1 | 1

 - **db.[collection].find().limit(num)**:  limit output 

 - **db.[collection].updateOne | updateMany**:  update

 - **db.[collection].deleteOne | deleteMany**:  delete

 - **db.[collection].bulkWrite**:  several different actions in one query

      ```
	  b.collection.bulkWrite(
   			 [ <operation 1>, <operation 2>, ... ],
   			 {
     			 writeConcern : <document>,
      			ordered : <boolean>
    		 }
	  )
	  ```