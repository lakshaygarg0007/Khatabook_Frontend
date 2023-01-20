import React from 'react'

const Records = ({ data }) => {

    return (
        <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
                <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Amount</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Description</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Payment Method</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Date</th>
                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                </tr>
            </thead>
            <tbody>
                {/* {
                    data.map(
                        (data) => {
                            return <ExpenseRecord expense={expense} getIndex={getIndex} />
                        }
                    )
                } */}
                 {data.map(item => (
                <tr>
                    <td>{item.id} </td>
                    <td>{item.first_name} </td>
                    <td>{item.last_name} </td>
                    <td>{item.city} </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Records  