import React from 'react'

export default function ExpenseRecord(props) {

    return (
        <>
            <tr>
                <td className="px-4 py-3">{props.expense.amount}</td>
                <td className="px-4 py-3">{props.expense.description}</td>
                <td className="px-4 py-3">{props.expense.payment_method}</td>
                <td className="px-4 py-3 text-lg text-gray-900">{props.expense.date}</td>
                <td className="w-10 text-center">
                    <input name="plan" type="radio" id='radio-button' onChange={() => { props.getIndex(props.expense) }} />
                </td>
            </tr>
        </>
    )
}
