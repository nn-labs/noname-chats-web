export const isValidPassword = (pass: string): boolean => {
  let hasMinLen = false;
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;

  if (pass.length > 7) {
    hasMinLen = true;
  }

  for (const char of pass) {
    if (char === char.toUpperCase() && !Number(char)) {
      hasUpper = true;
    }

    if (char === char.toLowerCase() && !Number(char)) {
      hasLower = true;
    }

    if (Number(char)) {
      hasNumber = true;
    }
  }

  return hasMinLen && hasUpper && hasLower && hasNumber;
};
