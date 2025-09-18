export const replaceTitle = (title: string) => {
  const templateTitle = import.meta.env.VITE_TITLE;

  if (title) {
    document.title = `${title} | ${templateTitle}`;
  } else {
    document.title = templateTitle;
  }
};
