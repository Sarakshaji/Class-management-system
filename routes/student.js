var express = require('express');
var router = express.Router();
var studenthelpers = require("../helpers/studenthelper")
var adminhelpers = require("../helpers/adminhelper")


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Little flower school' });
});

router.post('/login', (req, res) => {
  adminhelpers.StudentLogin(req.body).then((response) => {
    if (response.status) {
      req.session.student = response.student
      
      req.session.student.loggedin = true
      res.redirect("student_front")

    }
    else {
      res.redirect("/")
    }
  })


})
router.get('/student_front', (req, res) => {
  let student = req.session.student
  
  res.render('student_front', { student })
})

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
})

router.get('/about', (req, res) => {
  res.render('about')
})

router.get('/event', (req, res) => {
  res.render('event')
})

router.get('/physics', (req, res) => {
  studenthelpers.physicsPdf().then((physicsDetail) => {
    res.render('physics', { physicsDetail })
  })

})

router.get('/chemistry', (req, res) => {
  studenthelpers.chemistryPdf().then((chemistryDetails) => {
    res.render('chemistry', { chemistryDetails })

  })

})

router.get('/mathematics', (req, res) => {
  studenthelpers.mathPdf().then((mathDetails) => {
    res.render('mathematics', { mathDetails })

  })

})

router.get('/language', (req, res) => {
  res.render('language')
})

router.get('/social-science', (req, res) => {
  res.render('social-science')
})

router.get('/assignment', (req, res) => {
  res.render('assignment')
})

router.get('/assignment-chemistry', (req, res) => {
  res.render('assignment-chemistry')
})

router.get('/assignment-physics', (req, res) => {
  res.render('assignment-physics')
})

router.get('/assignment-maths', (req, res) => {
  res.render('assignment-maths')
})

router.post('/submit-chemistry', (req, res) => {
  studenthelpers.SubmitChemistry(req.body).then((id) => {
    let chemistry = req.files.myfile
    chemistry.mv('./public/assignment-chemistry/' + id + '.pdf', function (err, result) {
      if (!err) {
        res.redirect('/student_front')
      }
      else {
        console.log(err)
      }
    })


  })


})

module.exports = router;
