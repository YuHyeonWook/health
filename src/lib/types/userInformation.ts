export interface UpdatedInfo {
  displayName?: string | null;
  email?: string | null;
  birthday?: string | null;
  phoneNumber: string | null;
}

export interface ModalProps {
  isOpen: boolean;
}

export interface UserInfoModalType {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedInfo: UpdatedInfo) => void;
  user: UpdatedInfo | null;
}

export interface UserModalBtnBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface UserInfoData {
  photoURL: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  userName: string;
}

export interface UserInBodyData {
  muscleMass: string;
  bmi: string;
  height: string;
  weight: string;
}

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
