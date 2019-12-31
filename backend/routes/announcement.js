const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const user = require("../models/user.js");
const fs = require("fs");
var validator = require("validator");
var multipart = require("connect-multiparty");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var multipartMiddleware = multipart();

let router = express.Router(),
  constants = require("../utils/constant"),
  insert = require("../db-functions/insert"),
  db_delete = require("../db-functions/delete"),
  read = require("../db-functions/read"),
  update = require("../db-functions/update"),
  utilsFunction = require("../utils/functions");

/**
 * @api {post}
 * @apiName addAnnouncement
 
 *
 * @apiParam {due_date}
 * @apiParam {grade_id}
 * @apiParam {section_id}
 * @apiParam {subject_id}
 * @apiParam {teacher_id}
 * @apiParam {title}
 * @apiParam {description}
 * @apiParam {attachment}
 * @apiParam {suggestion}
 * @apiParam {subject}
 * @apiParam {section}
 * @apiParam {grade}

 * @apiSuccess {JSON object} 
 * 
 */
app.post("/addAnnouncement", async (req, res) => {
  if (
    req.body.teacher_id.trim() == "" ||
    req.body.title.trim() == "" ||
    !validator.isLength(req.body.title, (min = 1), (max = 60)) ||
    req.body.description.trim() == "" ||
    !validator.isLength(req.body.description, (min = 0), (max = 1000)) ||
    req.body.grade_id.trim() == "" ||
    req.body.section_id.trim() == "" ||
    req.body.subject_id.trim() == "" ||
    req.body.due_date.trim() == "" ||
    req.body.subject.trim() == "" ||
    req.body.section == [] ||
    req.body.grade == []
  ) {
    return res
      .status(200)
      .send({ result: "Please fill all the fields properly !" });
  }

  ret = await insert.addAnnouncement(
    req.body.due_date,
    req.body.grade_id,
    req.body.section_id,
    req.body.subject_id,
    req.body.teacher_id,
    req.body.title,
    req.body.description,
    req.body.attachment,
    req.body.suggestion,
    req.body.subject,
    req.body.section,
    req.body.grade
  );

  req.body.time = ret[0];
  req.body.id = ret[1];
  req.body.student_id = ret[2];

  res.send({
    result: req.body
  });
});

/**
 * @api {get}
 * @apiName announcements
 *
 * @apiSuccess {string array} array of announcements
 */
app.get("/announcements", (req, res) => {
  user.db
    .collection("announcements")
    .get()
    .then(snapshot => {
      let data = [];
      snapshot.docs.forEach(doc => {
        data.push(doc.data());
      });

      //data = JSON.stringify(data)
      res.send({
        resources: data
      });
    });
});

const addingclass = (snapshot, test) =>
  new Promise((resolve, reject) => {
    test = [];
    snapshot.docs.forEach(doc => {
      test.push(doc.data());
    });
    resolve(test);
  });

/**
 * @api {get}
 * @apiName json
 *
 * @apiSuccess {JSON object} json object of classes, sections, subjects.
 */
app.get("/json", async (req, res) => {
  var grade = [];
  var sec = [];
  var subj = [];
  await user.db
    .collection("grades")
    .get()
    .then(async classes => {
      grade = await addingclass(classes, grade);
    });

  await user.db
    .collection("sections")
    .get()
    .then(async sections => {
      sec = await addingclass(sections, sec);
    });

  await user.db
    .collection("subjects")
    .get()
    .then(async subjs => {
      subj = await addingclass(subjs, subj);
    });

  await sec.map(g => {
    var subjects_list = g.subjects;
    g.subjects = [];
    subj.map(s => {
      subjects_list.map(temp => {
        if (temp == s.id) {
          return g.subjects.push(s);
        }
      });
    });
  });

  await grade.map(g => {
    var sections_list = g.sections;
    g.sections = [];
    sec.map(s => {
      sections_list.map(temp => {
        if (temp == s.id) {
          return g.sections.push(s);
        }
      });
    });
  });

  // grade = await JSON.stringify(grade)
  res.send(grade);
});

const tclasses = (teach, subj) => {
  user.db
    .collection("users")
    .doc(teach)
    .get()
    .then(snapshot => {
      let data = snapshot.data();
      console.log(data);
      data.classes
        ? (data.classes = [...data.classes, subj])
        : (data.classes = [subj]);

      user.db
        .collection("users")
        .doc(teach)
        .set(data);
    });
};
// tclasses('wb9QYogCoGbSdwwqRm3L2zxKDnC2', 'GQKaZWMba6gaJI8kfSz2')

/**
 * @api {get}
 * @apiName broadcastAnnouncement
 
 *
 * @apiParam {id} id Users unique ID.
 *
 * @apiSuccess {String array} array of announcements 
 * 
 */
app.get("/broadcastAnnouncement", async (req, res) => {
  let gdata = [];
  let sdata = [];
  let data = [];
  await user.db
    .collection("announcements")
    .doc(req.query.id)
    .get()
    .then(snapshot => {
      gdata = snapshot.data().grade_id;
      sdata = snapshot.data().section_id;
    });

  // await gdata.map(s => {
  //     user.db.collection('grades').doc(s).get().then(snapshot => {
  //         return data.push(snapshot.data())
  //     })
  // })

  await sdata.map(s => {
    user.db
      .collection("sections")
      .doc(s)
      .get()
      .then(snapshot => {
        return data.push(snapshot.data());
      });
  });

  res.send({
    resources: data
  });
});

/**
 * @api {get}
 * @apiName myAnnouncements
 
 *
 * @apiParam {id} id Users unique ID.
 *
 * @apiSuccess {String array} array of announcements 
 */
app.get("/myAnnouncements", (req, res) => {
  let data = [];
  user.db
    .collection("announcements")
    .where("student_id", "array-contains", req.query.id)
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        data.push(doc.data());
      });

      res.send({
        resources: data
      });
    });
});

/**
 * @api {get}
 * @apiName pAnnouncements
 
 *
 * @apiParam {id} id Users unique ID.
 *
 * @apiSuccess {String array} array of announcements 
 */
app.get("/pAnnouncements", async (req, res) => {
  let sdata = [];
  let announc = [];
  let data = [];
  await user.db
    .collection("users")
    .doc(req.query.id)
    .get()
    .then(snapshot => {
      sdata = snapshot.data().student_id;
    });

  await user.db
    .collection("announcements")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        announc.push(doc.data());
      });
    });

  await sdata.map(s => {
    announc.map(a => {
      a.student_id.find(d => {
        if (d == s) {
          data.push(a);
        }
      });
    });
  });

  res.send({
    resources: data
  });
});

module.exports = app;
