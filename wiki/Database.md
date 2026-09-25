# Database
## Relational Database
Relational databases store data in tables with columns and rows. Each column represents a specific data attribute and each row represents an instance of that data. Benefits include clear structure and ACID-compliance. Being ACID-compliance means that a set of consequent operations will always be completed together. If a single operation fails, the entire set of operations fail. This guarantees data accuracy at all times. However, it'd be complicated to write data parallelly in this case to ensure data integrity. (Imagining that two consecutive operations are being written to the same row. We don't know if the first operation would fail until finishing it, and that means the second operationw would always need to wait for the first operation to complete.) The rigid schema of a relational database system can also present challenges at scale, for example, in order to add a column, all the rows in a table need to be updated.

## Non-relational Database
Non-relational databases are schema-less databases, examples include document databases (json) and graph databases. It offers more flexible data model. It guarantees availability but not immediate consistency. They are optimized specifically for applications that require large data volume, low latency, and flexibility, which is achieved by relaxing some of the data consistency restrictions of relational databases.

## Reference
https://aws.amazon.com/compare/the-difference-between-relational-and-non-relational-databases/

VERY INTERESTING: https://aws.amazon.com/compare/