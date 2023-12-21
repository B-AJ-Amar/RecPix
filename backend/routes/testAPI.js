const express = require('express');
const router = express.Router();



router.get('/home', async (req, res) => {
    
      return res.status(200).json({
        data:[
            { "id":1,
              "img":"http://localhost:3000/static/images/img-1.jpg"
            },
            { "id":2,
              "img":"http://localhost:3000/static/images/img-2.jpg"
            },
            { "id":3,
              "img":"http://localhost:3000/static/images/img-3.jpg"
            },
            { "id":4,
              "img":"http://localhost:3000/static/images/img-4.jpg"
            },
            { "id":5,
              "img":"http://localhost:3000/static/images/img-5.jpg"
            },
            { "id":6,
              "img":"http://localhost:3000/static/images/img-6.jpg"
            },
        ]
      });
});
  

module.exports = router;