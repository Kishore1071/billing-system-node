import express from 'express'
import { Bill, BillProducts } from './billModel.js'

const BillRouter = express.Router()


BillRouter.get('/', async(request, response) => {
    const all_bills = await Bill.find({})

    response.send({
        status:true,
        bills:  all_bills
    })
})

BillRouter.post('/', async (request, response) => {
    console.log(request.body)

    const bill_data = request.body[0]
    const bill_product_data = request.body[1]

    const bill =  new Bill({
        bill_no: bill_data.bill_no,
        bill_date: bill_data.date
    })

    await bill.save()

    let final_bill_amount = 0

    for (let x of bill_product_data) {

        final_bill_amount = final_bill_amount + x.total

        const bill_product = new BillProducts({
            bill_id: bill._id,
            product_id: x._id,
            product_code: x.code,
            quantity: Number(x.quantity),
            sub_total: x.total,
        })

        await bill_product.save()
    }

    await Bill.findByIdAndUpdate(bill._id,  {
        total_amount: final_bill_amount
    })


    response.json({
        status: true,
        message: "Data Saved"
    })
})


export default BillRouter