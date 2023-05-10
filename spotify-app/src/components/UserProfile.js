import React, {useState, useEffect} from 'react';
import spotifyApi from '../spotify';

function UserProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        spotifyApi.getMe().then((res) => {
            setUser(res);
        });
    }, []);

    return (
        <div>
            {user && (
                <div>
                    <h1>{user.display_name}</h1>
                    <img src={user.images[0].url} alt={user.display_name} />
                </div>
            )}
        </div>
    );
}

export default UserProfile;