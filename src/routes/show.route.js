const ShowController = require('../controllers/show.controller');
const { isAdmin, isSaleStaff, isLogictisStaff } = require('../middleware/decentralization');
const auth = require('../middleware/auth.middleware');
const router = require('express').Router();


router.get('/', ShowController.getAllShow);
router.get('/:id', ShowController.getShowById);
router.get('/movie/:movieId', ShowController.getShowByMovieId);
router.get('/cinema/:cinemaId', ShowController.getShowByCinemaId);
router.post('/', ShowController.createShow);
router.put('/:id', ShowController.updateShow);
router.delete('/:id', ShowController.deleteShow);
router.post('/checkExist/', ShowController.checkIsExist);
router.get('/listShowTime/isPassed', ShowController.getListShowTimeIsPass);
router.put('/status/:id', ShowController.updateStatusShow);

module.exports = router;