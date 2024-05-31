import { atom } from 'recoil';

export const userNameState = atom<string>({
  key: 'userNameState',
  default: '',
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      const savedData = sessionStorage.getItem('userNameState');
      if (savedData != null) {
        try {
          setSelf(savedData);
        } catch (e) {
          console.error('Failed to parse sessionStorage item "userNameState"', e);
        }
      }

      onSet((newValue) => {
        if (newValue != null) {
          sessionStorage.setItem('userNameState', newValue);
        } else {
          sessionStorage.removeItem('userNameState');
        }
      });
    },
  ],
});
