import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/profileMenu.css";
import defaultProfileImg from "../assets/image/default-profile.png";
import flechaAbajo from "../assets/image/flecha hacia abajo.svg";
import flechaLado from "../assets/image/flecha de lado.svg";

interface ProfileMenuProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  profileImage?: string;
  username?: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  isLoggedIn,
  onLogout,
  profileImage,
  username,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileImgSrc = profileImage || defaultProfileImg;

  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  
  const toggleSubmenu = (submenuId: string) => {
    setActiveSubmenu(activeSubmenu === submenuId ? null : submenuId);
  };

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="profile-menu" ref={dropdownRef}>
      <div
        className="profile-info"
        onClick={toggleDropdown} 
      >
        {isLoggedIn ? (
          <h6 className="profile-username">{username}</h6>
        ) : (
          <h6 className="profile-login-text">
            Ingresar {}
            {}
            <span
              className={`dropdown-arrow ${isDropdownOpen ? "active" : ""}`}
            >
              {isDropdownOpen ? (
                <img src={flechaAbajo} alt="Flecha abajo" />
              ) : (
                <img src={flechaLado} alt="Flecha lado" />
              )}
            </span>
          </h6>
        )}
        <img
          src={profileImgSrc}
          alt="Profile"
          className="profile-image profile-icon"
        />
      </div>

      {}
      <div className={`profile-dropdown ${isDropdownOpen ? "active" : ""}`}>
        {isLoggedIn ? (
          <>
            {}
            <button
              className={`has-submenu ${
                activeSubmenu === "settings" ? "active" : ""
              }`}
              onClick={() => toggleSubmenu("settings")}
            >
              Account Settings
            </button>
            {}
            <div
              className={`submenu ${
                activeSubmenu === "settings" ? "active" : ""
              }`}
            >
              <Link to="/profile" onClick={toggleDropdown}>
                Profile
              </Link>
              <Link to="/preferences" onClick={toggleDropdown}>
                Preferences
              </Link>
            </div>

            <button
              onClick={() => {
                onLogout();
                toggleDropdown();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" onClick={toggleDropdown} className="login-link">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
