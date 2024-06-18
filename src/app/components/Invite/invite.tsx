import React, {useState} from 'react'



const Invite = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('')

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({firstName, lastName, email}),
        });
        if(response.ok){
            alert('Invitation Complete')
        }else{
            alert('Invitation Failed')
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            />
            <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            />
            <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <button type="submit">Request Verification</button>
        </form>
    )
}

export default Invite