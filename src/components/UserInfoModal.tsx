import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ref, set, get } from 'firebase/database';
import { auth, db, storage } from '@/firebase';
import Button from '@/components/Button';
import { userInfoModalProps } from '@/lib/types/userInformation';
import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { CgProfile } from 'react-icons/cg';
import Input from '@/components/Input';
import {
  LabelBox,
  ModalBackgroundBox,
  UserInformationModalBox,
  UserInformationModalBtnBox,
  UserModalInformationH2,
} from '@/styles/userInformation';

const UserInfoModal = ({ isOpen, onClose, setUserInfoData }: userInfoModalProps) => {
  const [email, setEmail] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [previewURL, setPreviewURL] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);

  const loadData = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserName(data.userName || '');
          setEmail(data.email || '');
          setBirthday(data.birthday || '');
          setPhoneNumber(data.phoneNumber || '');
          setPreviewURL(data.photoURL || '');
        }
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
      setIsFileUploaded(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!userName) {
        alert('닉네임을 입력해주세요');
        return;
      }
      if (!birthday) {
        alert('생년월일을 입력해주세요');
        return;
      }
      if (phoneNumber.length !== 11) {
        alert('전화번호를 11자리를 눌러주세요');
        return;
      }
      if (!file) {
        alert('파일을 업로드해주세요');
        return;
      }
      if (!isFileUploaded) {
        alert('파일 업로드 버튼을 클릭해주세요');
        return;
      }
      setIsFileUploaded(false);

      const userId = auth.currentUser?.uid;
      const userRef = ref(db, `users/${userId}`);
      let photoURL = '';

      if (file) {
        const fileRef = storageRef(storage, `/${userId}/${file.name}`);
        await uploadBytes(fileRef, file);
        photoURL = await getDownloadURL(fileRef);
      }

      await set(userRef, {
        userName,
        email,
        birthday,
        phoneNumber,
        photoURL,
      });

      setUserInfoData({ userName, email, birthday, phoneNumber, photoURL });
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

  const handleUpload = async () => {
    try {
      const userId = auth.currentUser?.uid;
      let photoURL = '';

      if (file && userId) {
        const fileRef = storageRef(storage, `/${userId}/${file.name}`);
        await uploadBytes(fileRef, file);
        photoURL = await getDownloadURL(fileRef);
        setPreviewURL(photoURL);
        setIsFileUploaded(true);
      }
      alert('업로드에 성공했습니다.');
    } catch (error) {
      console.error(error, '업로드에 실패했습니다.');
    }
  };

  return (
    <>
      {isOpen && <ModalBackgroundBox isOpen={isOpen} onClose={onClose} onClick={onClose} />}
      <UserInformationModalBox isOpen={isOpen} onClose={onClose}>
        <UserModalInformationH2>개인정보 수정</UserModalInformationH2>
        <ProfileLabel>
          {previewURL ? <ProfileImage src={previewURL} alt="프로필 이미지" /> : <ProfileIcon />}
          <ProfileInput type="file" onChange={handleFileChange} />
        </ProfileLabel>
        <FileUploadBox>
          <FileUploadBtn onClick={handleUpload}>업로드</FileUploadBtn>
        </FileUploadBox>
        <LabelBox>
          <label>
            이메일:
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly />
          </label>
          <label>
            닉네임:
            <Input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </label>
          <label>
            생년월일:
            <Input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
          </label>
          <label>
            전화번호:
            <Input
              type="tel"
              pattern="[0-9]{11}"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder=" -없이 입력해주세요"
              maxLength={11}
            />
          </label>
        </LabelBox>
        <UserInformationModalBtnBox>
          <Button onClick={handleSave}>저장</Button>
          <Button onClick={onClose}>취소</Button>
        </UserInformationModalBtnBox>
      </UserInformationModalBox>
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
