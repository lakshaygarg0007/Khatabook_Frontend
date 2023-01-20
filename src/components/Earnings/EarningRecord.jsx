import React from 'react'
import moment from 'moment';

export default function EarningRecord(props) {
    return (
        <>
            <tr key={props.index}>
                <td className="px-4 py-3">{props.earning.amount}</td>
                <td className="px-4 py-3">{props.earning.description}</td>
                <td className="px-4 py-3">{props.earning.payment_method}</td>
                <td className="px-4 py-3 text-lg text-gray-900">{moment(props.earning.date).format('DD-MM-YYYY')}</td>
                <td className="w-10 text-center">
                    <input name="plan" type="radio" />
                </td>
            </tr>
        </>
    )
}
