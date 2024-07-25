import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ref, set, get } from 'firebase/database';
import { auth, db, storage } from '@/firebase';
import { UserInfoData, userInfoModalProps } from '@/lib/types/userInformation';
import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';
import iconUser from '@/assets/images/icon-user.png';
import Input from '@/components/Input';
import {
  LabelBox,
  ModalBackgroundBox,
  UserInformationModalBox,
  UserInformationModalBtnBox,
  UserModalInformationH2,
} from '@/styles/userInformation';
import { toast } from 'react-toastify';
import { useUserNameStore } from '@/lib/store/useUserNameStore';
import { Controller, useForm } from 'react-hook-form';
import Button from './Button';
const UserInfoModal = React.memo(({ isOpen, onClose, setUserInfoData }: userInfoModalProps) => {
  const { userName: storeUserName, setUserName: setStoreUserName } = useUserNameStore();
  const [localUserName, setLocalUserName] = useState(storeUserName);
  const [previewURL, setPreviewURL] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      birthday: '',
      phoneNumber: '',
      photoURL: '',
      userName: '',
    },
  });

  const loadData = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setLocalUserName(data.userName || '');
          setPreviewURL(data.photoURL || '');
          reset({
            email: data.email || '',
            birthday: data.birthday || '',
            phoneNumber: data.phoneNumber || '',
            photoURL: data.photoURL || '',
          });
        } else {
          console.error('사용자 정보를 찾을 수 없습니다.');
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

  const onSubmit = async (data: UserInfoData) => {
    try {
      if (!file && !isFileUploaded && !previewURL) {
        toast.info('파일을 업로드해주세요', { autoClose: 2000 });
        return;
      }

      const userId = auth.currentUser?.uid;
      const userRef = ref(db, `users/${userId}`);
      let photoURL = data.photoURL;

      if (file && !isFileUploaded) {
        const fileRef = storageRef(storage, `/${userId}/${file.name}`);
        await uploadBytes(fileRef, file);
        photoURL = await getDownloadURL(fileRef);
      }

      const updatedData = { ...data, photoURL, userName: localUserName };
      await set(userRef, updatedData);

      setUserInfoData(updatedData);
      setStoreUserName(localUserName); // Zustand store 업데이트
      toast.success('저장되었습니다.', { autoClose: 2000 });
      onClose();
    } catch (error) {
      console.error(error, '저장에 실패했습니다.');
      toast.error('저장에 실패했습니다.', { autoClose: 2000 });
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
      if (file && userId) {
        const fileRef = storageRef(storage, `/${userId}/${file.name}`);
        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        setPreviewURL(photoURL);
        setValue('photoURL', photoURL);
        setIsFileUploaded(true);
        toast.success('업로드에 성공했습니다.', { autoClose: 2000 });
      }
    } catch (error) {
      console.error(error);
      toast.error('업로드에 실패했습니다.', { autoClose: 2000 });
    }
  };

  const handleClose = () => {
    setLocalUserName(storeUserName); // 로컬 상태를 store의 값으로 되돌립니다.
    onClose();
  };

  return (
    <>
      {isOpen && <ModalBackgroundBox $isOpen={isOpen} onClick={handleClose} />}
      <UserInformationModalBox $isOpen={isOpen}>
        <UserModalInformationH2>개인정보 수정</UserModalInformationH2>
        <ProfileLabel>
          {previewURL ? <ProfileImage src={previewURL} alt="프로필 이미지" /> : <ProfileIcon />}
          <ProfileInput type="file" onChange={handleFileChange} />
        </ProfileLabel>
        <FileUploadBox>
          <FileUploadBtn onClick={handleUpload}>이미지 업로드</FileUploadBtn>
        </FileUploadBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelBox>
            <label>
              이메일:
              <Controller
                name="email"
                control={control}
                rules={{ required: '이메일을 입력해주세요' }}
                render={({ field }) => (
                  <>
                    <Input type="email" {...field} readOnly />
                    {errors.email && <span>{errors.email.message}</span>}
                  </>
                )}
              />
            </label>
            <label>
              닉네임:
              <Input type="text" value={localUserName} onChange={(e) => setLocalUserName(e.target.value)} />
            </label>
            <label>
              생년월일:
              <Controller
                name="birthday"
                control={control}
                rules={{ required: '생년월일을 입력해주세요' }}
                render={({ field }) => (
                  <>
                    <Input type="date" {...field} />
                    {errors.birthday && <span>{errors.birthday.message}</span>}
                  </>
                )}
              />
            </label>
            <label>
              전화번호:
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  required: '전화번호를 입력해주세요',
                  pattern: { value: /^[0-9]{11}$/, message: '전화번호를 11자리를 입력해주세요' },
                }}
                render={({ field }) => (
                  <>
                    <Input type="tel" {...field} placeholder=" -없이 입력해주세요" />
                    {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
                  </>
                )}
              />
            </label>
          </LabelBox>
          <UserInformationModalBtnBox>
            <Button onClick={handleClose} variant="white">
              취소
            </Button>
            <Button type="submit">저장</Button>
          </UserInformationModalBtnBox>
        </form>
      </UserInformationModalBox>
    </>
  );
});

export default UserInfoModal;

const ProfileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileIcon = styled.div`
  width: 10rem;
  height: 10rem;
  margin: 2rem auto;
  background: url(${iconUser}) no-repeat center / contain;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 20%;
  margin: 0 auto 1.6rem;
  object-fit: cover;
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
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.8rem 1.2rem;
  margin-bottom: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-primary-dark);
  }
`;
