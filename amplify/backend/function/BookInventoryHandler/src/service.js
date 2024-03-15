const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const crypto = require("crypto");
const Book = require('./models/Book');

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = "books";

if (process.env.ENV && process.env.ENV !== "NONE") {
    tableName = tableName + '-' + process.env.ENV;
}

const services = {
    create: async (req, res) => {
        try {
            const uuid = crypto.randomUUID();
            const body = new Book(uuid, req.body.title, req.body.author, req.body.quantity);
            const putItemParams = {
                TableName: tableName,
                Item: body
            }

            const book = await ddbDocClient.send(new PutCommand(putItemParams));

            res.json(book);
        } catch (err) {
            res.status(400).send(`Error creating book: ${err}`);
        }
    },

    findAll: async (req, res) => {
        try {
            var params = {
                TableName: tableName,
                Select: 'ALL_ATTRIBUTES',
            };
            const data = await ddbDocClient.send(new ScanCommand(params));
            res.json(data.Items);
        } catch (err) {
            res.status(400).send(`Error fetching books: ${err}`);
        }
    },

    findOne: async (req, res) => {
        try {
            const id = req.params.id;

            let getItemParams = {
                TableName: tableName,
                Key: {
                    id
                }
            }

            const data = await ddbDocClient.send(new GetCommand(getItemParams));

            res.json(data.Item);
        } catch (err) {
            res.status(400).send(`Error fetching books: ${err}`);
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;

            let putItemParams = {
                TableName: tableName,
                Item: req.body,
                Key: {
                    id
                }
            }

            const data = await ddbDocClient.send(new PutCommand(putItemParams));
            res.json({ success: 'put call succeed!', url: req.url, data: data });

        } catch (err) {
            res.status(400).send(`Error fetching books: ${err}`);
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;

            let removeItemParams = {
                TableName: tableName,
                Key: {
                    id
                }
            }

            const data = await ddbDocClient.send(new DeleteCommand(removeItemParams));
            res.json({url: req.url, data: data});

        } catch (err) {
            res.status(400).send(`Error fetching books: ${err}`);
        }
    }


}

async function findAll(req, res) {
    /*         try {
                const books = await bookService.findAll();
                res.json(books);
            } catch (err) {
                res.status(400).send(`Error fetching books: ${err}`);
            } */

    var params = {
        TableName: tableName,
        Select: 'ALL_ATTRIBUTES',
    };

    try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        res.json(data.Items);
    } catch (err) {
        res.statusCode = 500;
        res.json({ error: 'Could not load items: ' + err.message + "hello" + process.env.TABLE_REGION, region: process.env.TABLE_REGION });
    }
}

module.exports = services