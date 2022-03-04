export const randomString = () => {
  let string = (Math.random() + 1).toString(36).substring(7);
  return string;
}