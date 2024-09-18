import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/profileMenu.css'; // Asegúrate de tener este archivo CSS
import defaultProfileImg from '../assets/image/default-profile.png'; // Ruta a tu imagen predeterminada

interface ProfileMenuProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  profileImage?: string; // Propiedad opcional para la imagen de perfil
  username?: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ isLoggedIn, onLogout, profileImage, username }) => {
  const profileImgSrc = profileImage || defaultProfileImg;

  return (
    <div className="profile-menu">
      <div className="profile-info">
        {isLoggedIn ? (
          <h6 className="profile-username">{username}</h6>
        ) : (
          <h6 className="profile-login-text">Ingresar</h6>
        )}
        <img
          src={profileImgSrc}
          alt="Profile"
          className="profile-image profile-icon"
        />
      </div>

      <div className="profile-dropdown">
        {isLoggedIn ? (
          <>
            <Link to="/account-settings">Account Settings</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
