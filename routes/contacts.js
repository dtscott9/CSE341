const router = require("express").Router();
const contactController = require("../controllers/contacts");

router.get("/", contactController.getAllContacts);
router.get("/:id", contactController.getOneContact);
router.post("/", contactController.addContact);
router.put("/update/:id", contactController.updateContact);
router.delete("/delete/:id", contactController.deleteContact);

module.exports = router;
