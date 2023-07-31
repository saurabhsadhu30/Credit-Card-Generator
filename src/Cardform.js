import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import Cardfront from './CardComponents/Cardfront';
import Cardback from './CardComponents/Cardback';
import 'react-toastify/dist/ReactToastify.css';
import '../src/Cardform.css';


function Cardform() {

    const [valid, setValid] = useState(false);
    const [error, setError] = useState(false);
    const [inputs, setInputs] = useState({
        cardholdername: "",
        cardholdernumber: "",
        month: "",
        year: "",
        cvc: ""
    });


    const ToastMessages = (msg) => {
        if (msg === "succeed") {
            toast('Card Successfully Created !', {
                position: toast.POSITION.TOP_CENTER,
                className: 'toast-message'
            });
        }
        else if (msg === "errored") {
            toast.error('Please Enter Valid Details !', {
                position: toast.POSITION.TOP_CENTER,
            })
        }
    };

    function cardnum_format(cardnumber) {
        const v = cardnumber
            .replace(/\s+/g, "")
            .replace(/[^0-9]/gi, "")
            .substr(0, 16);
        const parts = [];

        for (let i = 0; i < v.length; i += 4) {
            parts.push(v.substr(i, 4));
        }

        return parts.length > 1 ? parts.join(" ") : cardnumber;
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value.toUpperCase() }))
    }

    function validateForm() {
        if (inputs.cardholdername.length === 0 || inputs.cardholdernumber.length === 0 || inputs.month.length === 0 || inputs.year.length === 0 || inputs.cvc.length === 0 || inputs.cardholdername.length >= 30 || inputs.cardholdernumber.length < 19 || inputs.cvc.length < 3 || inputs.month.length < 2 || inputs.year.length < 2 || !inputs.cardholdername.match(/^[A-Za-z]+$/) || !inputs.cvc.match(/^[0-9]+$/) || !inputs.cardholdernumber.match(/^[0-9\s]*$/) || !inputs.month.match(/^[0-9]+$/) || !inputs.year.match(/^[0-9]+$/)) {
            setError(true);
            ToastMessages("errored")
        }
        else {
            setError(false)
            ToastMessages("succeed")
            setValid(true)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        validateForm()
    }


    return (
        <>
            <ToastContainer />
            <div className='card'>{valid && <Cardfront data={inputs} />}</div>
            <div className='cardback-face'>{valid && <Cardback cvc={inputs.cvc} />}</div>
            <main>
                <div className='img'>
                </div>
                <div className='rightsection'>
                    <form action="" >
                        <div >
                            {/*card name */}
                            <div className='card-n'>
                                <label htmlFor="">CARDHOLDER NAME</label>
                                <input type="text" required placeholder='e.g. Jane Appleseed' name="cardholdername" value={inputs.cardholdername} onChange={handleChange} autoComplete='off' />
                                <p className='error'>{error && inputs.cardholdername.length <= 0 ? "Cardholder name required" : error && !inputs.cardholdername.match(/^[A-Za-z]+$/) ? "Cardname must be alphabetic" : error && inputs.cardholdername.length >= 30 ? "card number max character 30" : ""}</p>
                            </div>
                        </div>
                        <div >
                            {/*card number */}
                            <div className='card-n'>
                                <label htmlFor="">CARD NUMBER</label>
                                <input type='tel' placeholder='e.g. 1234 5678 9123 0000' name="cardholdernumber" value={cardnum_format(inputs.cardholdernumber)} onChange={handleChange} minLength="16" maxLength="19" required />
                                <p className='error'>{error && inputs.cardholdernumber.length <= 0 ? "Card number required" : error && !inputs.cardholdernumber.match(/^[0-9\s]*$/) ? "Cardnumber must be numeric" : error && inputs.cardholdernumber.length < 19 ? "Card number must be 16 digit" : ""}</p>
                            </div>
                        </div>
                        <div className='expiry'>
                            <div >
                                {/*expiry date */}
                                <div className='crd-date'>
                                    <label htmlFor="">EXP.DATE (MM/YY)</label>
                                    <input type="text" pattern="^[0-9\b]+$" placeholder='MM' name="month" value={inputs.month} onChange={handleChange} minLength="2" maxLength="2" required />
                                    <input type="text" pattern="^[0-9\b]+$" placeholder='YY' name="year" value={inputs.year} onChange={handleChange} minLength="2" maxLength="2" required />
                                    <p className='error'>{error && inputs.month.length <= 0 ? "Expiry required" : error && inputs.year.length <= 0 ? "Expiry required" : error && !inputs.month.match(/^[0-9]+$/) ? "expiry must be numeric" : error && !inputs.year.match(/^[0-9]+$/) ? "expiry must be numeric" : error && inputs.month.length < 2 ? "Fill expiry" : error && inputs.year.length < 2 ? "Fill expiry" : ""}</p>
                                </div>
                            </div>
                            <div >
                                {/*cvc*/}
                                <div className='crd-cvc'>
                                    <label htmlFor="">CVC</label>
                                    <input type="text" pattern="^[0-9\b]+$" placeholder='e.g. 123' name="cvc" value={inputs.cvc} onChange={handleChange} minLength="3" maxLength="3" required />
                                    <p className='error'>{error && inputs.cvc.length <= 0 ? "CVC required" : error && !inputs.cvc.match(/^[0-9]+$/) ? "CVC must be numeric" : error && inputs.cvc.length < 3 ? "CVC must be 3 digit" : ""}</p>
                                </div>
                            </div>
                        </div>
                        <div className='btn-cnf'>
                            <button onClick={handleSubmit} >Confirm</button>
                        </div>
                    </form>
                </div>

            </main>

        </>
    )
}

export default Cardform