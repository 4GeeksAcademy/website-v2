// this is your test function, you can throw an Error when you want it to fail
module.exports = (file) => {
  const { yaml, name, lang } = file;
  yaml.staff.forEach((s) => {
    // throw an error if the validation is not successfull
    if (s.bio && s.bio.length > 270)
      throw Error("Staff members bio needs to be less than 270");
  });

  return true;
};
