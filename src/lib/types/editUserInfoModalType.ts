import { UpdatedInfo } from '@/lib/types/mypageType';

export interface ModalProps {
  isOpen: boolean;
}

export interface EditUserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedInfo: UpdatedInfo) => void;
  user: UpdatedInfo | null;
}
