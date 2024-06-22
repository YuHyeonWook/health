import React, { useState, useEffect } from 'react';
import { ref, set, get } from 'firebase/database';
import { auth, db } from '@/firebase';
import { UserInBodyData, userInBodyModalProps } from '@/lib/types/userInformation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import {
  LabelBox,
  ModalBackgroundBox,
  UserInformationModalBox,
  UserInformationModalBtnBox,
  UserModalInformationH2,
} from '@/styles/userInformation';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';

const UserInBodyModal = React.memo(({ isOpen, onClose, setUserBodyData }: userInBodyModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      muscleMass: 0,
      bmi: 0,
      height: 0,
      weight: 0,
      fatPercentage: 0,
    },
  });

  const loadData = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error('사용자 정보를 찾을 수 없습니다.');
      }

      const userRef = ref(db, `users/${userId}/body`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        reset({
          muscleMass: data.muscleMass ?? 0,
          bmi: data.bmi ?? 0,
          height: data.height ?? 0,
          weight: data.weight ?? 0,
          fatPercentage: data.fatPercentage ?? 0,
        });
      } else {
        console.error('사용자 정보를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: UserInBodyData) => {
    try {
      const userId = auth.currentUser?.uid;
      const userRef = ref(db, `users/${userId}/body`);
      await set(userRef, data);

      setUserBodyData(data);
      toast.success('저장되었습니다.', {
        autoClose: 2000,
      });
      onClose();
    } catch (error) {
      toast.error('저장하는데 실패했습니다.', {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && <ModalBackgroundBox $isOpen={isOpen} onClick={onClose} />}
      <UserInformationModalBox $isOpen={isOpen}>
        <UserModalInformationH2>신체정보 수정</UserModalInformationH2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelBox>
            <label htmlFor="height">
              키 (cm):
              <Controller
                name="height"
                control={control}
                rules={{ required: '키를 입력해주세요.' }}
                render={({ field }) => (
                  <>
                    <Input type="number" {...field} placeholder="cm" />
                    {errors.height && <span>{errors.height.message}</span>}
                  </>
                )}
              />
            </label>
            <label htmlFor="weight">
              체중 (kg):
              <Controller
                name="weight"
                control={control}
                rules={{ required: '체중을 입력해주세요.' }}
                render={({ field }) => (
                  <>
                    <Input type="number" {...field} placeholder="kg" />
                    {errors.weight && <span>{errors.weight.message}</span>}
                  </>
                )}
              />
            </label>
            <label htmlFor="bmi">
              BMI (kg/㎡):
              <Controller
                name="bmi"
                control={control}
                rules={{ required: 'BMI를 입력해주세요.' }}
                render={({ field }) => (
                  <>
                    <Input type="number" {...field} placeholder="kg/㎡" />
                    {errors.bmi && <span>{errors.bmi.message}</span>}
                  </>
                )}
              />
            </label>
            <label htmlFor="muscleMass">
              근육량 (kg):
              <Controller
                name="muscleMass"
                control={control}
                rules={{ required: '근육량을 입력해주세요.' }}
                render={({ field }) => (
                  <>
                    <Input type="number" {...field} placeholder="kg" />
                    {errors.muscleMass && <span>{errors.muscleMass.message}</span>}
                  </>
                )}
              />
            </label>
            <label htmlFor="fatPercentage">
              체지방률 (%):
              <Controller
                name="fatPercentage"
                control={control}
                rules={{ required: '체지방률을 입력해주세요.' }}
                render={({ field }) => (
                  <>
                    <Input type="number" {...field} placeholder="%" />
                    {errors.fatPercentage && <span>{errors.fatPercentage.message}</span>}
                  </>
                )}
              />
            </label>
          </LabelBox>
          <UserInformationModalBtnBox>
            <Button onClick={onClose} mode="white" type="button">
              취소
            </Button>
            <Button type="submit">저장</Button>
          </UserInformationModalBtnBox>
        </form>
      </UserInformationModalBox>
    </>
  );
});

export default UserInBodyModal;
