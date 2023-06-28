import userReducer from '@app/store/slices/userSlice';
import authReducer from '@app/store/slices/authSlice';
import themeReducer from '@app/store/slices/themeSlice';
import pwaReducer from '@app/store/slices/pwaSlice';
import subjSlice from '@app/store/slices/subjSlice';

export default {
  user: userReducer,
  auth: authReducer,
  theme: themeReducer,
  pwa: pwaReducer,
  subj: subjSlice,
};
