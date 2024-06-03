interface userModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface userInBodyModalProps extends userModalProps {
  setUserBodyData: React.Dispatch<
    React.SetStateAction<{
      muscleMass: string;
      bmi: string;
      height: string;
      weight: string;
    }>
  >;
}

export interface userInfoModalProps extends userModalProps {
  setUserInfoData: React.Dispatch<
    React.SetStateAction<{
      photoURL: string;
      birthday: string;
      phoneNumber: string;
      email: string;
      userName: string;
    }>
  >;
}
