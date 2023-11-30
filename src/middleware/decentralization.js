const RoleRepository = require("../repositories/role.repository");

isAdmin = async (req, res, next) => {
  const role = await RoleRepository.GetNameRoleByStaffId(req.user.id);
  if (role.nameRole !== "ADMIN") {
    res.status(401).send({
      status: 401,
      error: "Unauthorized to access this resource",
    });
  }

  next();
};

isSaleStaff = async (req, res, next) => {
  const role = await RoleRepository.GetNameRoleByStaffId(req.user.id);

  if (role.nameRole !== "SALE") {
    res.status(401).send({
      status: 401,
      error: "Unauthorized to access this resource",
    });
  }

  next();
};

isLogictisStaff = async (req, res, next) => {
  const role = await RoleRepository.GetNameRoleByStaffId(req.user.id);

  if (role.nameRole !== "LOGISTICS") {
    res.status(401).send({
      status: 401,
      error: "Unauthorized to access this resource",
    });
  }

  next();
};

module.exports = {
  isAdmin,
  isSaleStaff,
  isLogictisStaff,
};
