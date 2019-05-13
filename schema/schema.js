const graphgl = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
} = graphgl;

const books = [
    {name: 'book1', id: '1', genre: 'Fantasy', authorID: 1},
    {name: 'book2', id: '2', genre: 'Fantasy', authorID: 2},
    {name: 'book3', id: '3', genre: 'Sci-Fi', authorID: 3},
    {name: 'book4', id: '4', genre: 'Sci-Fi', authorID: 3},
];
const authors = [
    {name: 'author1', id: '1', age: '1'},
    {name: 'author2', id: '2', age: '2'},
    {name: 'author3', id: '3', age: '3'},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find((author) => parent.authorID.toString() === author.id.toString());
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter((book) => book.authorID.toString() === parent.id.toString());
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //code to get data from db
                return books.find((book)=> book.id === args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return authors.find((author=> author.id === args.id));
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args) {
                return books;
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});


