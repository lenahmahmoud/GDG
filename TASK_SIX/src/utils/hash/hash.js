import bcrypt from "bcrypt";
export const generateHash = (pass) => {
  return bcrypt.hashSync(pass);
};

export const compareHash = (pass, hashedPass) => {
  return bcrypt.compareSync(pass, hashedPass);
};