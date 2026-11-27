import { UserModel } from "../../../DB/models/User.model.js";
import { updateFields_enum } from "../../../utils/enums/user.enum.js";
import { compareHash, generateHash } from "../../../utils/hash/hash.js";
export const profile = async (id) => {
  if (!id) {
    throw new Error("id is missing", {
      cause: {
        status: 400,
      },
    });
  }
  const user = await UserModel.findById(id, {
    password: 0,
    role: 0,
    confirm: 0,
  });
  if (!user) {
    throw new Error("not existed", {
      cause: {
        status: 404,
      },
    });
  }
  return user;
};

export const updateProfile = async (user, updateField, newData) => {
  if (!user._id || !updateField || !newData) {
    throw new Error("missing fields", {
      cause: {
        status: 400,
      },
    });
  }
  if (!Object.values(updateFields_enum).includes(updateField)) {
    throw new Error("invalid update  field", { cause: { status: 422 } });
  }

  const existUser = await UserModel.findByIdAndUpdate(
    user._id,
    {
      [updateField]: newData,
    },
    {
      projection: [updateField],
      returnDocument: "after",
    },
  );

  return existUser;
};
export const updatePassword = async (
  user,
  { oldPass, newPass, confirmPass },
) => {
  if (!user._id || !oldPass || !newPass || confirmPass) {
    throw new Error("missing fields", {
      cause: {
        status: 400,
      },
    });
  }
  if (newPass !== confirmPass) {
    throw new Error("passwords sont match ");
  }
  const existUser = await UserModel.findById(user._id, {
    password: 1,
    email: 1,
  });

  if (!existUser) {
    throw new Error("user not found", {
      cause: {
        status: 404,
      },
    });
  }

  if (!compareHash(oldPass, user.password)) {
    throw new Error("invalid password ", {
      cause: {
        status: 401,
      },
    });
  }
  const hashedPassword = generateHash(newPass);

  await UserModel.updateOne(
    { _id: existUser._id },
    {
      password: hashedPassword,
    },
    {
      runValidators: true,
    },
  );
  return;
};
