const router = require("express").Router();
const admin = require("firebase-admin");


router.get("/", (req, res) => {
  return res.send("Inside the user router");
});

router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "Token Not Found" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res.status(500).json({ success: false, msg: "Unauthorized Access" });
    }
    return res.status(200).json({ success: true, data: decodedValue });
  } catch (err) {
    return res.send({ success: false, msg: `Error in extracting the token: ${err}` });
  }
});

const listAllUsers = async (nextPageToken) => {
  const data = []; // Define the data array

  const getUsers = async (nextPageToken) => {
    try {
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);

      listUsersResult.users.forEach((rec) => {
        data.push(rec.toJSON());
      });

      if (listUsersResult.pageToken) {
        await getUsers(listUsersResult.pageToken);
      }
    } catch (error) {
      console.log('Error listing users:', error);
    }
  };

  await getUsers(nextPageToken);

  return data;
};

listAllUsers();

router.get("/all", async (req, res) => {
  try {
    const dataCount = await listAllUsers(); // Assuming you want to use the count of data
    return res.status(200).send({ success: true, data: dataCount });
  } catch (err) {
    return res.send({ success: false, msg: `Error in listing users: ${err}` });
  }
});

module.exports = router;
