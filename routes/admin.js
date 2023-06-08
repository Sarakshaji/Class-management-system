var express = require('express');
var router = express.Router();
var adminhelpers = require("../helpers/adminhelper")



router.get('/', (req, res) => {
  res.render('admin/login')
});

router.get('/front', (req, res) => {
  adminhelpers.getProduct().then((product) => {
    let admin = req.session.admin

    res.render('admin/front', { admin, product })
  })
})



router.post("/login", (req, res) => {
  adminhelpers.Login(req.body).then((response) => {
    if (response.status) {

      req.session.admin = response.user
      req.session.loggedin = true
      res.redirect('/admin/front')
    }
    else {
      console.log("wrog")
      res.redirect('/admin')
    }
  })
})



router.get('/add-student', (req, res) => {
  res.render("admin/add-student")
})

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect('/admin');
  });
})

router.post("/add-student", (req, res) => {
  adminhelpers.StudentDeatails(req.body).then((id) => {
    let file = req.files.photo

    file.mv('./public/student-images/' + id + '.jpg', function (err, result) {
      if (!err) {
        res.redirect("/admin/add-student")
      }
      else {
        console.log(err)
      }
    })

  })
})

router.get('/teacher', (req, res) => {
  let teacher = [
    {
      no: 1,
      name: "jins joseph",
      email: "jins2rieu@gmail.com",
      subject: "physics"
    },
    {
      no: 2,
      name: "sanju binu raj",
      email: "sanju123@gmail.com",
      subject: "mathematics"
    },
    {
      no: 3,
      name: "nibin haridas",
      email: "nibin@18gmail.com",
      subject: "chemisrty"
    }
  ]
  res.render('admin/teacher', { teacher })
})

router.get('/add-notes', (req, res) => {
  res.render('admin/add-notes')
})

router.post('/physics', (req, res) => {
  adminhelpers.sendPhysics(req.body).then((id) => {
    let file = req.files.myfile
    file.mv('./public/notes-added/' + id + ".pdf", function (err, result) {
      if (!err) {
        res.redirect('/admin/front')
      }
      else {
        console.log(err)
      }
    })

  })



})

router.post('/chemistry', (req, res) => {
  adminhelpers.sendChemistry(req.body).then((id) => {
    let chemistry = req.files.myfile
    chemistry.mv('./public/chemistry-notes/' + id + '.pdf', function (err, result) {
      if (!err) {
        res.redirect('/admin/front')
      }
      else {
        console.log(err)
      }
    })

  })
})

router.post('/mathematics', (req, res) => {
  adminhelpers.sendMaths(req.body).then((id) => {
    let mathe = req.files.myfile
    mathe.mv('./public/maths-notes/' + id + '.pdf', function (err, result) {
      if (!err) {
        res.redirect('/admin/front')
      }
      else {
        console.log(err)
      }
    })

  })


})

router.get('/assignment', (req, res) => {
  res.render('admin/assignment')
})

router.get('/assignment-chemistry', (req, res) => {
  adminhelpers.GetAssignmentChemistry().then((getassignment) => {
    res.render('admin/assignment-chemistry', { getassignment })
  })

})

router.get('/edit/:id', async (req, res) => {
  let student = await adminhelpers.EditDetails(req.params.id)
  res.render('admin/edit', { student })
})

router.post('/edit-student/:id', (req, res) => {
  let id = req.params.id
  adminhelpers.UpdateStudent(req.params.id, req.body).then(() => {

    res.redirect('/admin/front')
    if (req.files.photo) {
      let image = req.files.photo
      image.mv('./public/student-images/' + id + '.jpg')
    }
  })
})

router.get('/delete/:id', (req, res) => {
  adminhelpers.Deleteitem(req.params.id).then(() => {
    res.redirect('/admin/front')
  })
})


module.exports = router;



