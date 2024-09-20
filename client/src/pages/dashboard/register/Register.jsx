import React from 'react';
import { getUserFromLocalStorage } from '../../../utils/localStorage';
import RegisterCard from '../../../components/pages/register/RegisterCard.jsx';

const Register = () => {
    const user = getUserFromLocalStorage();
console.log(user);
    return (
        <div className="max-w-sm p-6 bg-[#1c1917] border border-gray-200 rounded-lg shadow ">
            <div className="mb-4">
                <h1 className="text-gray-300 mb-4">REGISTRAR USUÁRIO</h1>
                <RegisterCard user={user} />
            </div>
        </div>
    );
};

export default Register;