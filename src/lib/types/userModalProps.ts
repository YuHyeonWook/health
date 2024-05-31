export interface userInBodyModalProps {
  isOpen: boolean;
  onClose: () => void;
  setUserBodyData: React.Dispatch<
    React.SetStateAction<{
      muscleMass: string;
      bmi: string;
      height: string;
      weight: string;
    }>
  >;
}

export interface userInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  setUserInfoData: React.Dispatch<
    React.SetStateAction<{
      photoURL: string;
      birthday: string;
      phoneNumber: string;
      email: string;
    }>
  >;
}
