function validateEditProfileData(req) {
  const allowedFields = [firstName, lastName, photoUrl, about, age];

  return Object.keys(req.body).every((field) => allowedFields.includes(field));
}

module.exports = { validateEditProfileData };
