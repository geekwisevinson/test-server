const graphgl = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphgl;



const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorID);
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
            args: {name: {type: GraphQLString}},
            resolve(parent, args) {
                const query = {authorID: parent.id};
                if (args.name) {
                    query.name = {$regex: args.name, $options: "ig"}
                }
                return Book.find(query);
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
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return Author.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            args: {name: {type: GraphQLString}},
            resolve(parent,args) {
                const query = {};
                if (args.name) {
                    query.name = {$regex: args.name, $options: "ig"}
                }
                return Book.find(query);
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            args: {name: {type: GraphQLString}},
            resolve(parent,args) {
                const query = {};
                if (args.name) {
                    query.name = {$regex: args.name, $options: "ig"}
                }
                return Author.find(query);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age,
                });
                return author.save();
            }
        },
        deleteAuthor: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                Author.findOneAndRemove({_id: args.id});
            }
        },
        addBook: {
            type: BookType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorID: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorID: args.authorID,
                });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});


