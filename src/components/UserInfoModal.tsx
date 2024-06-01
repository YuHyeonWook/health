import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ref, set, get } from 'firebase/database';
import { auth, db, storage } from '@/firebase';
import Button from '@/components/Button';
import { userInfoModalProps } from '@/lib/types/userModalProps';
import { UserModalBtnBoxProps } from '@/lib/types/userInfoModalType';
import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { CgProfile } from 'react-icons/cg';

const UserInfoModal = ({ isOpen, onClose, setUserInfoData }: userInfoModalProps) => {
  const [email, setEmail] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>('');

  const loadData = async () => {
    try {
      const userId = auth.currentUser?.uid;
      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setEmail(data.email || '');
        setBirthday(data.birthday || '');
        setPhoneNumber(data.phoneNumber || '');
      }
    } catch (error) {
      console.error(error, '데이터를 불러오는데 실패했습니다.');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async () => {
    try {
      if (phoneNumber.length !== 11) {
        alert('전화번호를 11자리를 눌러주세요');
        return;
      }
      const userId = auth.currentUser?.uid;
      const userRef = ref(db, `users/${userId}`);
      let photoURL = '';

      if (file) {
        const fileRef = storageRef(storage, `/${userId}/${file.name}`);
        await uploadBytes(fileRef, file);
        photoURL = await getDownloadURL(fileRef);
      }

      await set(userRef, {
        email,
        birthday,
        phoneNumber,
        photoURL,
      });

      setUserInfoData({ email, birthday, phoneNumber, photoURL });
      onClose();
    } catch (error) {
      console.error(error, '저장에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const hanldUpload = async () => {
    try {
      const userId = auth.currentUser?.uid;
      let photoURL = '';

      if (file && userId) {
        const fileRef = storageRef(storage, `/${userId}/${file.name}`);
        await uploadBytes(fileRef, file);
        photoURL = await getDownloadURL(fileRef);
        setPreviewURL(photoURL);
      }
    } catch (error) {
      console.error(error, '업로드에 실패했습니다.');
    }
  };

  return (
    <>
      {isOpen && <ModalBackground isOpen={isOpen} onClose={onClose} onClick={onClose} />}
      <UserInfoModalBox isOpen={isOpen} onClose={onClose}>
        <h2>개인정보 수정</h2>
        <ProfileLabel>
          {previewURL ? <ProfileImage src={previewURL} alt="프로필 이미지" /> : <ProfileIcon />}
          <ProfileInput type="file" onChange={handleFileChange} />
        </ProfileLabel>
        <FileUploadBox>
          <FileUploadBtn onClick={hanldUpload}>업로드</FileUploadBtn>
        </FileUploadBox>
        <label>
          이메일:
          <UserInfoInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly />
        </label>
        <label>
          생년월일:
          <UserInfoInput type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        </label>
        <label>
          전화번호:
          <UserInfoInput
            type="tel"
            pattern="[0-9]{11}"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder=" -없이 입력해주세요"
            maxLength={11}
          />
        </label>
        <UserInfoModalBtnBox>
          <Button onClick={handleSave}>저장</Button>
          <Button onClick={onClose}>취소</Button>
        </UserInfoModalBtnBox>
      </UserInfoModalBox>
    </>
  );
};

export default UserInfoModal;

const ProfileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileIcon = styled(CgProfile)`
  width: 10rem;
  height: 10rem;
  margin: 2rem auto;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 20%;
  margin: 2rem auto;
  cursor: pointer;
`;

const ProfileInput = styled.input`
  display: none;
`;

const FileUploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FileUploadBtn = styled.button`
  border: 1px solid var(--color-primary);
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 1.6rem;
  font-weight: 600;
  padding: 0.5rem;
`;

const UserInfoModalBox = styled.div<UserModalBtnBoxProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const ModalBackground = styled.div<UserModalBtnBoxProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const UserInfoInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const UserInfoModalBtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`;
