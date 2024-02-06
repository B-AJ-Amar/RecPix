import React from "react";
import { DropdownList } from "../DropDown/DropDown";

import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from "../ui/button";

// todo : background color on hover, add user profile on top left 
function ImageField(props) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  
  const clickHandler = () => {
    setIsLiked(!isLiked);
  }
  return (
    <div 
      key={props.id}
      className=" relative"
      onMouseEnter={()=>{setIsHovered(true)}}
      onMouseLeave={()=>{setIsHovered(false)}}
    >
      <span className="absolute top-3 right-3 " style={{ opacity: isHovered ? 1 : 0.5 }} >
        <DropdownList  />
      </span>
      <Button 
        className="  p-0 w-10 h-10 rounded-full absolute left-3 bottom-2" 
        style={{ opacity: isHovered ? 1 : 0.5 }} 
        variant="outline" 
        onClick={clickHandler}
      >
        <FontAwesomeIcon icon={faHeart} color={isLiked? "#E11D48":""}/>
      </Button>
      <img className=" w-full mb-4 rounded-md "  src={props.img} alt="" />
    </div>
  )
}

interface postType{
  id: string,
  img: string

}

interface ImageListProps {
  data: postType[];
}

function ImageList({data}: ImageListProps) {
  return (
    <div className=" px-9  cloumns-1  min-[480px]:columns-2  md:columns-3  lg:columns-4">
      {data.map(item => (
        <ImageField key={item.id} {...item} />
      ))}
    </div>
  )
}


export default ImageList;