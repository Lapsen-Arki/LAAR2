import React, { useState, useEffect } from 'react';
import './Profile.css';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// Import AnimalAvatarWidget
import AnimalAvatarWidget from '../components/AnimalAvatarWidget';

interface ProfileProps {}

interface ProfileData {
  name: string;
  birthdate: Date;
  avatar: string;
  access: boolean;
}

const ProfileDemo: React.FC<ProfileProps> = () => {
  const [Access, setAccess] = useState(false);
  const [showProfileModification, setShowProfileModification] = useState(false);
  const [showAvatarWidget, setShowAvatarWidget] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("/broken-image.jpg");
  const [isChooseButtonVisible, setIsChooseButtonVisible] = useState(true);
  const [childName, setChildName] = useState("");
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [profiles, setProfiles] = useState<ProfileData[]>([]);

	const handleAccessChange = () => {
		setAccess(!Access);
	};

  const [editingProfileIndex, setEditingProfileIndex] = useState<number | null>(null);

  const handleEditClick = (index: number) => {
    setEditingProfileIndex(index);
    setShowProfileModification(true);
  };

  const handleSaveClick = () => {
    if (childName && birthdate) {
      if (editingProfileIndex !== null) {
        // Päivitä olemassa olevaa profiilia
        const updatedProfile: ProfileData = {
          name: childName,
          birthdate: birthdate,
          avatar: selectedAvatar,
          access: Access,
        };

        const updatedProfiles = [...profiles];
        updatedProfiles[editingProfileIndex] = updatedProfile;

        setProfiles(updatedProfiles);
        setShowProfileModification(false);
        setEditingProfileIndex(null);
      } else {
        // Lisää uusi profiili
        const newProfile: ProfileData = {
          name: childName,
          birthdate: birthdate,
          avatar: selectedAvatar,
          access: Access,
        };

        setProfiles([...profiles, newProfile]);
        setShowProfileModification(false);
      }
      // Tyhjennä syötteet
      setChildName("");
      setBirthdate(null);
      setSelectedAvatar("/broken-image.jpg");
      setAccess(false);
    }
  };

  useEffect(() => {
    if (editingProfileIndex !== null) {
      // Täytä lomakkeen kentät vanhoilla tiedoilla, kun muokkaat profiilia
      const profileToEdit = profiles[editingProfileIndex];
      if (profileToEdit) {
        setChildName(profileToEdit.name);
        setBirthdate(profileToEdit.birthdate);
        setSelectedAvatar(profileToEdit.avatar);
        setAccess(profileToEdit.access);
      }
    }
  }, [editingProfileIndex, profiles]);

  const handleOpenAvatarWidget = () => {
    setShowAvatarWidget(true);
    setIsChooseButtonVisible(false);
  };

  const handleAvatarSelect = (selectedAvatarUrl: string) => {
    setSelectedAvatar(selectedAvatarUrl);
    setShowAvatarWidget(false);
    setIsChooseButtonVisible(true);
  };

  const handleRemoveProfileClick = (index: number) => {
    const updatedProfiles = [...profiles];
    updatedProfiles.splice(index, 1);
    setProfiles(updatedProfiles);
  };

  const handleAddProfileClick = () => {
    setShowProfileModification(true);
  };

  return (
    <div className="profile-container">
      {showProfileModification ? (
        <div className="profile-modification">
          <form>
            <div className="input-group">
              <h3>Lapsen nimi tai lempinimi</h3>
              <input
                type="text"
                id="childName"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <h3>Lapsen syntymäaika</h3>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={birthdate}
                  onChange={(date) => setBirthdate(date)}
                />
              </LocalizationProvider>
            </div>

            <div
              className="input-group"
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <h3>Valitse lapselle avatar</h3>
              {showAvatarWidget ? (
                <AnimalAvatarWidget onSelect={handleAvatarSelect} />
              ) : (
                <Avatar src={selectedAvatar} className="ChooseAvatar" />
              )}
              {isChooseButtonVisible && (
                <Button
                  variant="contained"
                  className="custom-button"
                  onClick={handleOpenAvatarWidget}
                >
                  Valitse kuva
                </Button>
              )}
            </div>

            <div className="input-group">
              <h5>Tarvitsetko pääsyoikeudet myös muille ihmisille?</h5>
              <div className="switch-group">
                <span>Ei</span>
                <Switch checked={Access} onChange={handleAccessChange} />
                <span>Kyllä</span>
              </div>
            </div>

            <div className="input-group">
              <Button
                variant="contained"
                className="custom-button"
                onClick={handleSaveClick}
              >
                Tallenna
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="profile-view">
          <div className="input-group">
            <Button variant="contained" className="custom-button" onClick={handleAddProfileClick}>
              Lisää profiili
            </Button>
          </div>

          <label>Lapset:</label>
          <div className="children">
            {profiles.map((profile, index) => (
              <Card key={index}>
                <CardContent className="card-content">
                  <div className="avatar-section">
                    <Avatar src={profile.avatar} className="avatar" />
                  </div>
                  <div className="text-section">
                    <Typography variant="h5">{profile.name}</Typography>
                    <Typography variant="body2">{calculateAge(profile.birthdate)}</Typography>
                  </div>
                  <div className="edit-icon-section">
                    <Tooltip title="Muokkaa profiilia">
                      <Button
                        variant="text"
                        className="edit-button"
                        onClick={() => handleEditClick(index)}
                      >
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Poista profiili">
                      <Button
                        variant="text"
                        className="remove-button"
                        onClick={() => handleRemoveProfileClick(index)}
                      >
                        <RemoveCircleOutlineIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function calculateAge(birthdate: Date): string {
  if (!birthdate) return '';

  const today = new Date();
  const birthDate = new Date(birthdate);

  if (
    birthDate.getDate() === today.getDate() &&
    birthDate.getMonth() === today.getMonth()
  ) {
    const ageInMilliseconds = today.getTime() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Huomioi karkausvuodet

    const years = Math.floor(ageInYears);
    const monthsInMilliseconds = (ageInYears - years) * (365.25 * 24 * 60 * 60 * 1000);
    const months = Math.floor(monthsInMilliseconds / (1000 * 60 * 60 * 24 * (365.25 / 12)));
    const daysInMilliseconds = monthsInMilliseconds % (1000 * 60 * 60 * 24 * (365.25 / 12));
    const days = Math.floor(daysInMilliseconds / (1000 * 60 * 60 * 24));

    const yearLabel = years === 1 ? 'v' : 'v';
    const monthLabel = months === 1 ? 'kk' : 'kk';
    const dayLabel = days === 1 ? 'pv' : 'pv';

    return `${years}${yearLabel} ${months}${monthLabel} ${days}${dayLabel}, Hyvää Syntymäpäivää! 🥳🎈`;
  }

  if (birthDate.getTime() > today.getTime()) {
    // Syntymäpäivä on tulevaisuudessa
    const timeDifference = birthDate.getTime() - today.getTime();
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const daysRemaining = Math.floor(timeDifference / millisecondsInDay);
    const monthsRemaining = Math.floor(daysRemaining / 30);
    const yearsRemaining = Math.floor(monthsRemaining / 12);

    return `Syntymään jäljellä: ${yearsRemaining}v ${monthsRemaining % 12}kk ${daysRemaining % 30}pv`;
  }

  const ageInMilliseconds = today.getTime() - birthDate.getTime();
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Huomioi karkausvuodet

  const years = Math.floor(ageInYears);
  const monthsInMilliseconds = (ageInYears - years) * (365.25 * 24 * 60 * 60 * 1000);
  const months = Math.floor(monthsInMilliseconds / (1000 * 60 * 60 * 24 * (365.25 / 12)));
  const daysInMilliseconds = monthsInMilliseconds % (1000 * 60 * 60 * 24 * (365.25 / 12));
  const days = Math.floor(daysInMilliseconds / (1000 * 60 * 60 * 24));

  const yearLabel = years === 1 ? 'v' : 'v';
  const monthLabel = months === 1 ? 'kk' : 'kk';
  const dayLabel = days === 1 ? 'pv' : 'pv';

  return `${years}${yearLabel} ${months}${monthLabel} ${days}${dayLabel}`;
}





{/*
          <div className="children">
            <Card>
              <CardContent className="card-content">
                <div className="avatar-section">
                  <Avatar src={selectedAvatar} className="avatar" />
                </div>
                <div className="text-section">
                  <Typography variant="h5">Ulpukka</Typography>
                  <Typography variant="body2">24 kk</Typography>
                </div>
                <div className="edit-icon-section">
                  <Tooltip title="Muokkaa profiilia">
                    <Button
                      variant="text"
                      className="edit-button"
                      onClick={handleEditClick}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Poista profiili">
                    <Button
                      variant="text"
                      className="remove-button"
                      onClick={handleRemoveProfileClick}
                    >
                      <RemoveCircleOutlineIcon />
                    </Button>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="card-content">
                <div className="avatar-section">
                  <Avatar src={selectedAvatar} className="avatar" />
                </div>
                <div className="text-section">
                  <Typography variant="h5">Kullervo</Typography>
                  <Typography variant="body2">24 kk</Typography>
                </div>
                <div className="edit-icon-section">
                  <Tooltip title="Muokkaa profiilia">
                    <Button
                      variant="text"
                      className="edit-button"
                      onClick={handleEditClick}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Poista profiili">
                    <Button
                      variant="text"
                      className="remove-button"
                      onClick={handleRemoveProfileClick}
                    >
                      <RemoveCircleOutlineIcon />
                    </Button>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </div>
*/}
{/*
          <label>Hoitajat:</label>
          <div className="caretakers">
            <Card>
              <CardContent className="card-content">
                <div className="avatar-section">
                  <Avatar src={selectedAvatar} className="avatar" />
                </div>
                <div className="text-section">
                  <Typography variant="h5">Matti</Typography>
                  <Typography variant="body2">isä</Typography>
                </div>
                <div className="edit-icon-section">
                  <Tooltip title="Muokkaa profiilia">
                    <Button
                      variant="text"
                      className="edit-button"
                      onClick={() => handleEditClick(index)}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Poista profiili">
                    <Button
                      variant="text"
                      className="remove-button"
                      onClick={handleRemoveProfileClick}
                    >
                      <RemoveCircleOutlineIcon />
                    </Button>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="card-content">
                <div className="avatar-section">
                  <Avatar src={selectedAvatar} className="avatar" />
                </div>
                <div className="text-section">
                  <Typography variant="h5">Heidi</Typography>
                  <Typography variant="body2">äiti</Typography>
                </div>
                <div className="edit-icon-section">
                  <Tooltip title="Muokkaa profiilia">
                    <Button
                      variant="text"
                      className="edit-button"
                      onClick={() => handleEditClick(index)}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Poista profiili">
                    <Button
                      variant="text"
                      className="remove-button"
                      onClick={handleRemoveProfileClick}
                    >
                      <RemoveCircleOutlineIcon />
                    </Button>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </div>
        */}

export default ProfileDemo;
