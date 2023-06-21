const validatorUnp = async (_: any, names: string) => {
  console.log(names);

  if (!names || names.length < 9 || names.length > 9) {
    return Promise.reject(new Error('Унп состоит только из 9 цифр '));
  } else if (!/^\d+$/.test(names)) {
    return Promise.reject(new Error('Унп состоит только из цифр '));
  }
  return Promise.resolve();
};

const cannotBeLessThanZero = async (_: any, names: string) => {
  if (parseInt(names) < 0) {
    return Promise.reject(new Error('не может быть меньше 0 '));
  }
  return Promise.resolve();
};

const maxLength = (length: number) => (rule: any, value: any) => {
  if (value.length > length) {
    return Promise.reject(new Error(`Не должно превышать ${length} символов`));
  }
  return Promise.resolve();
};

export const validatorCustom = {
  unp: validatorUnp,
  cannotBeLessThanZero: cannotBeLessThanZero,
  maxLength,
};
