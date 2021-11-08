import React, { useState } from 'react';
import { validateUser } from 'utils/registrationValidator'
import { Box } from '@chakra-ui/react'

const RegisterUser: React.FC = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState<undefined | number>();
    const [email, setEmail] = useState('');
    const [date, setDate] = useState<string>('');

    const [regErr, setRegErr] = useState<undefined | string []>();

    const newUser = { 
        name: name, 
        lastName: lastName, 
        email: email,
        mobileNumber: mobileNumber,
        date: date,
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const errMsg = validateUser(newUser);
        console.log(errMsg);
        if (errMsg.length) {
            setRegErr(errMsg);
            return;
        }

        alert(`Submitting name ${lastName}, ${name}`)
    }
    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <label>
                    <input name='name' type='text' value={name} onChange={e => setName(e.target.value)}
                        placeholder='First name' required />
                    <input name='lastName' type='text' value={lastName} onChange={e => setLastName(e.target.value)}
                        placeholder='Last name' required />
                    <input name='mobileNumber' type='number' value={mobileNumber} onChange={e => setMobileNumber(parseInt(e.target.value,10))}
                        placeholder='Mobile number' required />
                    <input name='date' type='date' value={date} onChange={e => setDate(e.target.value)}
                        placeholder='date' required />
                    <input name='email' type='text' value={email} onChange={e => setEmail(e.target.value)}
                        placeholder='e-mail' required />
                </label>
                <input type='submit' value='Submit' />
            </form>
            {regErr && (
                <p>{regErr}</p>
            )}
        </Box>
    );
}

export default RegisterUser;