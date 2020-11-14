const router = require('express').Router();
const { Appointment, Customer } = require('../../models');

router.get("/", async(req, res, next) => {
    try {
        let projectid = '2188'
        let users = await req.app.locals.db.getRate(projectid);
        res.render("listview", {
            title: "Calendar",
            rows: users,
            scripts: ["/js/views/calendar.js"]
        });
    } catch (ex) {
        return next(ex);
    }
});






module.exports = router;