import { UpdatedInfo } from '@/lib/types/mypageType';

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
