const {Router} = require('express');
const { getMethod, postMethod, putMethod, deleteMethod } = require('../controllers/user.controller');
const router = Router();

router.get('/', getMethod);
router.post('/', postMethod);
router.put('/:id', putMethod);
router.delete('/', deleteMethod);

module.exports = router;