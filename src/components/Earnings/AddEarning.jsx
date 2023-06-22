import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import ipaddress from 'C:/Users/HP/OneDrive/Desktop/git/Khatabook_Frontend/src/setip.jsx';

export default function AddEarning(props) {
    let navigate = useNavigate();
    const [amount, set_amount] = useState("");
    const [description, set_description] = useState("");
    const [payment_methods, set_payment_methods] = useState([]);
    const [date, set_date] = useState(null);
    const location = useLocation();
    const user_data = JSON.parse(sessionStorage.getItem('user_data')) ?? {};
    
    
  
    const refreshPage = (() => {
      window.location.reload(false);
    });

    const add_record = (() => {
        const ip = ipaddress();
        if (!amount || !description || !date) {
            alert("Please Fill all details before adding Record");
            return;
        }
        const data = {
            "user_id": user_data.id,
            "amount": amount,
            "description": description,
            "payment_method": 'UPI',
            "date": date
        };

        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }

        const res = fetch(ip + '/addEarning', options);
        const new_amount = amount + parseFloat(user_data.earning);
        console.log(new_amount);
        sessionStorage.setItem('user_data', JSON.stringify({ name: user_data.name, id: user_data.id,  
            earning: new_amount, expense: user_data.expense}));
        navigate('/earnings');  
    });

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }

        async function fetch_payment_methods() {
            const res = await fetch( 'http://192.168.43.225:8000/getPaymentMethods', options);
            const data = await res.json();
            set_payment_methods(data);
        }

        fetch_payment_methods()
    }, []);

    return (
        <>
            <section class="text-gray-600 body-font relative">
                <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-col text-center w-full mb-12">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add Earning</h1>
                    </div>
                    <div class="lg:w-1/2 md:w-2/3 mx-auto">
                        <div class="flex flex-wrap -m-2">
                            <div class="p-2 w-1/4">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-sm text-gray-600">Amount</label>
                                    <input type="number" pattern="^\d*\.?\d*$" id="name" name="name" className="appearance-none w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => set_amount(e.target.value)} />
                                </div>
                            </div>
                            <div class="p-2 w-1/4">
                                <div class="relative">
                                    <label for="email" class="leading-7 text-sm text-gray-600">Description</label>
                                    <input type="text" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => set_description(e.target.value)} />
                                </div>
                            </div>
                            <div class="p-2 w-1/4">
                                <div class="relative">
                                    <label for="email" class="leading-7 text-sm text-gray-600">Payment Method</label>
                                    <select id = "payment_method" className="form-select form-select-lg w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base  outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out py-2 px-3" onChange={(e) => set_payment_methods(e.target.value)}>
                                        {
                                            payment_methods.map(payment_method => (
                                                <option key="{payment_method.payment_methods}" value={payment_method.payment_methods} className="py-2"> {payment_method.payment_methods}</option>
                                            ))
                                        };
                                    </select>
                                </div>
                            </div>
                            <div class="p-2 w-1/4">
                                <div class="relative">
                                    <label for="email" class="leading-7 text-sm text-gray-600">Date</label>
                                    <input type="date" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => set_date(e.target.value)} required />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <button class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg" onClick={() => { add_record(); refreshPage(); }}>Add Earning</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
// add_record