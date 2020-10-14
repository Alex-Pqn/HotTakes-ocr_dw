const express = require('express');

const router = express.Router();

const saucesController = require('../controllers/sauces');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/', auth, multer, saucesController.createSauce);
router.put('/:id', auth, multer, saucesController.modifySauce);
router.delete('/:id', auth, saucesController.deleteSauce);
router.get('/:id', auth, saucesController.getOneSauce);
router.get('/', auth, saucesController.getAllSauces);
router.post('/:id/like', auth, saucesController.likeOneSauce);

module.exports = router;
