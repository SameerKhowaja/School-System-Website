var exports = (module.exports = {}),
  utilsFunctions = require("../utils/functions"),
  constants = require("../utils/constant");

const user = require("../models/user.js");

const signinAdmin = (nic, pwd) => {
  try {
    return new Promise((resolve, reject) => {
      user.db
        .collection("admin")
        .doc(nic)
        .get()
        .then(res => {
          let userData = res.data();
          if (userData.pwd == pwd) {
            resolve(userData);
          } else {
            resolve("Invalid nic or password");
          }
        })
        .catch(e => {
          const mess = e.message;
          reject({ message: mess });
        });
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const signinTeacher = (nic, pwd) => {
  try {
    return new Promise((resolve, reject) => {
      user.db
        .collection("teachers")
        .doc(nic)
        .get()
        .then(res => {
          let userData = res.data();
          if (userData.pwd == pwd) {
            resolve(userData);
          } else {
            resolve("Invalid nic or password");
          }
        })
        .catch(e => {
          const mess = e.message;
          reject({ message: mess });
        });
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

signinStudent = (nic, pwd) => {
  return new Promise((resolve, reject) => {
    user.db
      .collection("students")
      .doc(nic)
      .get()
      .then(res => {
        let userData = res.data();
        console.log(userData);
        if (userData.pwd == pwd) {
          resolve(userData);
        } else {
          resolve("Invalid nic or password");
        }
      })
      .catch(e => {
        const mess = e.message;
        reject({ message: mess });
      });
  });
};

signinParent = (nic, pwd) => {
  return new Promise((resolve, reject) => {
    user.db
      .collection("parents")
      .doc(nic)
      .get()
      .then(res => {
        let userData = res.data();
        if (userData.pwd == pwd) {
          resolve(userData);
        } else {
          resolve("Invalid nic or password");
        }
      })
      .catch(e => {
        const mess = e.message;
        reject({ message: mess });
      });
  });
};

module.exports = {
  signinTeacher: signinTeacher,
  signinStudent: signinStudent,
  signinParent: signinParent,
  signinAdmin: signinAdmin
};
