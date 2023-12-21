import React from "react";
import './ImageList.css';



const data = [
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
    { "id":11,
      "img":"http://localhost:3000/static/images/img-1.jpg"
    },
    { "id":12,
      "img":"http://localhost:3000/static/images/img-2.jpg"
    },
    { "id":13,
      "img":"http://localhost:3000/static/images/img-3.jpg"
    },
    { "id":14,
      "img":"http://localhost:3000/static/images/img-4.jpg"
    },
    { "id":15,
      "img":"http://localhost:3000/static/images/img-5.jpg"
    },
    { "id":16,
      "img":"http://localhost:3000/static/images/img-6.jpg"
    },
]

const ImageField = (props) => (
  <div key={props.id} className="img-div">
    <img className="image" src={props.img} alt="" />
    <i className="heart_btn fas fa-heart heart-icon"></i>
    <i className="menu fa fa-ellipsis-h"></i>
  </div>
);

const ImageList = () => (
  <div className="image-container">
    {data.map(item => (
      <ImageField key={item.id} {...item} />
    ))}
  </div>
);

export default ImageList;