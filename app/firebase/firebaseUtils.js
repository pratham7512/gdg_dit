import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './config'; // Ensure Firebase is initialized

const storage = getStorage(app);

export const uploadFileToFirebase = async (file,filedirectory) => {
  const fileRef = ref(storage, `${filedirectory}/` + file.name);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
};
