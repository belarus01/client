const validatorUnp = async (_: any, names: string) => {
  if (!names || names.length < 9 || names.length > 9) {
    return Promise.reject(new Error('Унп состоит только из 9 цифр '));
  } else if (!/^\d+$/.test(names)) {
    return Promise.reject(new Error('Унп состоит только из цифр '));
  }
};

const cannotBeLessThanZero = async (_: any, names: string) => {
  if (parseInt(names) < 0) {
    return Promise.reject(new Error('не может быть меньше 0 '));
  } else if (!/^\d+$/.test(names)) {
    return Promise.reject(new Error('Только числа '));
  }
};

export const validatorCustom = {
  unp: validatorUnp,
  cannotBeLessThanZero: cannotBeLessThanZero,
};
