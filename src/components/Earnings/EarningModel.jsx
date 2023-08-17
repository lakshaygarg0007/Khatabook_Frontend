import moment from 'moment';
import { useState } from 'react';
import ipaddress from "../../setip";

function EarningModel({ earning, closeModal }) {
    const [isEditable, setIsEditable] = useState(false);
    const [amount, setAmount] = useState(earning.amount);
    const [description, setDescription] = useState(earning.description);
    const [paymentMethod, setPaymentMethod] = useState(earning.payment_method);
    const [date, setDate] = useState(earning.date);
    const delete_record = (async () => {
        const response = await fetch( ipaddress + '/deleteEarning', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ earning_id: earning._id }),
        }).then(() => {
            closeModal();
        });
    });

    const handleAmountChange = (e) => {
        setAmount(e.target.textContent);
    };


    const edit_record = (async () => {
        const response = await fetch(ipaddress + '/updateEarning', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                earning_id: earning._id,
                amount : amount
            }),
        }).then(() => {
            closeModal();
            window.location.reload();
        });
    });

    console.log(document.getElementById('description'))

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
                    <td className="px-4 py-3 border-2 border-grey-300" contentEditable={true} onBlur={handleAmountChange}>{earning.amount}</td>
                    <td className="px-4 py-2 border-2 border-grey-300"  id="description">{earning.description}</td>
                    <td className="px-4 py-3 border-2 border-grey-300" >{earning.payment_method}</td>
                    <td className="px-4 py-3 text-lg text-gray-900 border-2 border-grey-300">{moment(earning.date).format('DD-MM-YYYY')}</td>
                </tbody>
            </table>
            <br />
            <button className="absolute top-1 right-1 p-1" onClick={closeModal}>
                <svg className="w-6 h-6 fill-current text-red-500" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>
            </button>
            <div className='flex flex-col items-center'>
                <div className="flex">
                    <button className="flex mr-5 items-center text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={delete_record}>Delete Record</button>
                    <button className="flex items-center text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                            onClick={() => edit_record()}>Edit Record</button>
                </div>
            </div>
        </div>
    )
}

export default EarningModel;
