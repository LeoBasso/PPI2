import ProfileCard from '../../../components/pages/profile/ProfileCard.jsx';
import React from 'react';
import { getUserFromLocalStorage } from '../../../utils/localStorage';

const Profile = () => {
    const user = getUserFromLocalStorage();
console.log(user);
    return (
        <div className="max-w-sm p-6 bg-[#1c1917] border border-gray-200 rounded-lg shadow ">
            <div className="mb-4">
                <h1 className="text-gray-300 mb-4">MEU PERFIL</h1>
                <ProfileCard user={user} />
            </div>
        </div>
    );
};

export default Profile;