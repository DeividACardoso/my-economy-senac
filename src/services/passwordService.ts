export const generatePassword = () => {
  let password: string = "";
  let structure: string = "wejwk232@#$!sxdEJERJ9_*@#KF";
  let passwordLength = 8;

  for (let i = 0; i < passwordLength; i++) {
    password += structure.charAt(Math.floor(Math.random() * structure.length));
  }

  return password;
};
