const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    imageNane: {
        type: String,
        require: true
    }
})

const Product = model('Product', productSchema);

module.exports = Product