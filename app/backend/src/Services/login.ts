import { compareSync } from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUsers';
import Users from '../database/models/Users';

const incorrectLoginMessage = 'Incorrect email or password';
const incorrectField = 'All fields must be filled';

const findUser = async ({ email, password } : ILogin): Promise<IUser> => {
  const findedUser = await Users.findOne({ where: { email } });

  if (!email) throw new Error(incorrectField);
  if (!password) throw new Error(incorrectField);

  if (findedUser === null) throw new Error(incorrectLoginMessage);

  const { id, username, role } = findedUser;

  const validatePassword = compareSync(password, findedUser.password);

  if (!validatePassword) throw new Error(incorrectLoginMessage);

  if (password.length < 6) throw new Error(incorrectLoginMessage);

  return { id, username, role, email };
};

const validate = async ({ email } : ILogin) => {
  const findedUser = await Users.findOne({ where: { email } });

  if (findedUser) {
    const { role } = findedUser;
    return role;
  }
};

export default {
  findUser,
  validate,
};
