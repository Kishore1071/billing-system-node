import mongoose from "mongoose";

const BillSchema = mongoose.Schema(
    {
        bill_no: {
            type: String,
            required: true
        },
        bill_date: {
            type: Date,
            required: true
        },
        total_amount: {
            type: Number,
        }
    }
)

export const Bill = mongoose.model('Bill', BillSchema)


const BillProductsSchema = mongoose.Schema(
    {
        bill_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bill'
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        product_code: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        sub_total: {
            type: Number,
        }

    }
)

export const BillProducts = mongoose.model('BillProducts', BillProductsSchema)