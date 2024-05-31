import { atom } from 'recoil';

export const userNameState = atom<string>({
  key: 'userNameState',
  default: '',
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      const savedData = sessionStorage.getItem('userNameState');
      if (savedData != null) {
        setSelf(savedData);
      }

      onSet((newValue) => {
        if (newValue) {
          sessionStorage.setItem('userNameState', newValue);
        } else {
          sessionStorage.removeItem('userNameState');
        }
      });
    },
  ],
});
