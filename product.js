const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopApp') 
.then(() => {
    console.log("CONNECTION OPEN");
})
.catch(err => {
    console.log("CONNECTION ERROR");
    console.log(err);
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    }, 
    price: {
        type: Number,
        required: true,
        min: 0
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        },
        size: {
            type: String,
            enum: ['S', 'M', 'L']
        }
    }

})

const Product = mongoose.model("Product", productSchema);

const bike = new Product({name: 'Cycling Jersey', price: 29.99, categories: ['Cycling', 'Clothing'], size: 'XS'})

bike.save() 
    .then(data => {
        console.log("Product Saved");
        console.log(data);
    })
    .catch(err => {
        console.log("ERROR: Product Not Saved");
        console.log(err);
    })