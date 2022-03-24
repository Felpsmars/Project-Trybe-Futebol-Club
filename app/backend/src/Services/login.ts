import { compareSync } from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUsers';
import Users from '../database/models/Users';

const findUser = async ({ email, password } : ILogin): Promise<IUser> => {
  const findedUser = await Users.findOne({ where: { email } });
  const errorMessage = 'Incorrect email or password';

  if (findedUser === null) throw new Error(errorMessage);

  const { id, username, role } = findedUser;

  const validatePassword = compareSync(password, findedUser.password);

  if (!validatePassword) throw new Error(errorMessage);

  if (password.length < 6) throw new Error(errorMessage);

  return { id, username, role, email };
};

export default {
  findUser,
};
