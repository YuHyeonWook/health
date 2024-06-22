export type UpdatedInfo = {
  displayName?: string;
  email?: string;
  birthday?: string;
  phoneNumber: string;
};

export type ModalProps = {
  isOpen: boolean;
};

export type UserInfoModalType = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedInfo: UpdatedInfo) => void;
  user: UpdatedInfo | null;
};

export type UserInfoData = {
  photoURL: string;
  userName: string;
  phoneNumber: string;
  birthday: string;
  email: string;
};

export type UserInBodyData = {
  muscleMass: number;
  bmi: number;
  height: number;
  weight: number;
  fatPercentage: number;
};

type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export interface userInBodyModalProps extends UserModalProps {
  setUserBodyData: React.Dispatch<
    React.SetStateAction<{
      muscleMass: number;
      bmi: number;
      height: number;
      weight: number;
      fatPercentage: number;
    }>
  >;
}

export interface userInfoModalProps extends UserModalProps {
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
