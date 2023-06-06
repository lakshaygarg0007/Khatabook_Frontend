import React, {useState} from 'react'
import moment from 'moment';
import ReactModal from 'react-modal';
import ExpenseModel from './ExpenseModel';

export default function ExpenseRecord(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState({});

    function openPopup(expense) {
        setModalIsOpen(true);
        selectedExpense(expense);
    }

    function closeModel() {
        setModalIsOpen(false);
        props.refresh(true);
    }



    return (
        <>
            <tr key={props.index}>
                <td className="px-4 py-3">{props.expense.amount}</td>
                <td className="px-4 py-3">{props.expense.description}</td>
                <td className="px-4 py-3">{props.expense.payment_method}</td>
                <td className="px-4 py-3 text-lg text-gray-900">{moment(props.expense.date).format('DD-MM-YYYY')}</td>
                <td className="px-4 py-3">
                    <button className="w-6 h-6 rounded-lg mr-2 p-1 bg-gray-300 hover:bg-gray-400 
                        flex items-center justify-center" onClick={() => setModalIsOpen(true)}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" 
                        strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                </td>
            </tr>
            <ReactModal 
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '48%',
                        height: '30%',
                        padding: '0'
                    }
                }}
            >
                <ExpenseModel expense={props.expense} closeModal={closeModel} />
            </ReactModal >
        </>
    )
}