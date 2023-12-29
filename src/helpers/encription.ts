import bcrypt from 'bcrypt';
import config from '../config';
export const encryptPassword = (password: string) => {
  const result = bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
  return result;
};

export const isPasswordMatched = (
  givenPassword: string,
  savedPassword: string
) => {
  console.log(givenPassword, savedPassword);

  if (!givenPassword || !savedPassword) {
    return false;
  }
  const result = bcrypt.compare(givenPassword, savedPassword);
  return result;
};
