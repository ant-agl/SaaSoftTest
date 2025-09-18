export const getRules = (
  isEdit: boolean = true,
  isRequiredPassword: boolean = true
) => {
  return {
    tags: [
      {
        validator: (_: any, value: string[]) => {
          if (!value || value.length === 0) return Promise.resolve();

          const invalidTags = value.filter((tag) => tag.length > 50);
          if (invalidTags.length > 0) {
            return Promise.reject(new Error("Каждый тег максимум 50 символов"));
          }
          return Promise.resolve();
        },
        trigger: "change",
      },
    ],
    login: [
      {
        max: 100,
        message: "Максимум 100 символов",
        trigger: "blur",
      },
      {
        required: isEdit,
        message: "Введите логин",
        trigger: "blur",
      },
    ],
    password: [
      {
        min: 6,
        max: 100,
        message: "От 6 до 100 символов",
        trigger: "blur",
      },
      {
        required: isEdit && isRequiredPassword,
        message: "Введите пароль",
        trigger: "blur",
      },
    ],
  };
};
