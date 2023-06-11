import moment from 'moment';

function ExpenseModel({ expense, closeModal }) {
    const delete_record = (async (ipaddress) => {
        const response = await fetch('ipaddress + /deleteExpense', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ expense_id: expense._id }),
        }).then(() => {
            closeModal();
        });
    });

    return (
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
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
                    <td className="px-4 py-3">{expense.amount}</td>
                    <td className="px-4 py-3">{expense.description}</td>
                    <td className="px-4 py-3">{expense.payment_method}</td>
                    <td className="px-4 py-3 text-lg text-gray-900">{moment(expense.date).format('DD-MM-YYYY')}</td>
                </tbody>
            </table>
            <br />
            <button className="absolute top-1 right-1 p-1" onClick={closeModal}>
                <svg className="w-6 h-6 fill-current text-red-500" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
                </svg>
            </button>
            <div className='flex flex-col items-center'>
                <button className="flex items-center text-white bg-red-500 border-0 py-2 px-6 focus:outline-none 
            hover:bg-red-600 rounded" onClick={delete_record}>Delete Record</button>
            </div>
        </div>
    )
}

export default ExpenseModel;
