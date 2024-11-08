import ProfileCard from '../../../components/pages/profile/ProfileCard.jsx';
import React from 'react';
import { getUserFromLocalStorage } from '../../../utils/localStorage';

const Profile = () => {
    const user = getUserFromLocalStorage();
console.log(user);
    return (
        <div className="max-w-sm p-6 bg-[#363636] border rounded-lg shadow-lg ">
            <div className="mb-4">
                <h1 className="text-white mb-4">MEU PERFIL</h1>
                <ProfileCard user={user} />
            </div>
        </div>
    );
};

export default Profile;