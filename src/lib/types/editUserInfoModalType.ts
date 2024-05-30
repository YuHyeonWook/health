import { UpdatedInfo } from '@/lib/types/mypageType';

export interface ModalProps {
  isOpen: boolean;
}

export interface EditUserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { birthday: string; phoneNumber: string }) => void;
  user: UpdatedInfo | null;
}
