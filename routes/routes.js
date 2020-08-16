const express = require('express');
const router = express.Router();

// Helpers
const upload = require('../helpers/multer');

// Controllers
const profilesController = require('../controllers/profilesController');

/* ===============================================================
												GENERAL ROUTES
=============================================================== */
router.get('/', (req, res) => {
  res.status(200).json({ message: 'BARANGAY DATABASE' });
});
router.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
router.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error : {
      message : error.message
    }
  });
});

/* ===============================================================
												PROFILES ROUTES
=============================================================== */
router.get('/profiles/', profilesController.getAllProfiles);
router.get('/profiles/:profileId', profilesController.findProfile);
router.post('/profiles/', upload.single('picture'), profilesController.postProfile);
router.put('/profiles/:profileId', upload.single('picture'), profilesController.editProfile);
router.delete('/profiles/:profileId', profilesController.deleteProfile);

module.exports = router;
