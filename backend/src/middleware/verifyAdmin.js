export const verifyAdmin = (req, res, next) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
    next();
  } catch (error) {
    console.log("Error while verifying admin", error);
    return res.status(401).send({ message: "Error while verifying Admin" });
  }
};
