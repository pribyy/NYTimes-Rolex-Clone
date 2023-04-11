import { listOfLeaders } from "./ArrayofLeaders";
import { useState, useRef } from "react";

export function EachLeaderName(props) {
  //the fullName variable allows us to render the full name of each leader, dependent on whether or not they have a middle name
  let fullName = `${props.leader.firstName} ${props.leader.lastName}`;

  if (props.leader.middleName) {
    fullName = `${props.leader.firstName} ${props.leader.middleName} ${props.leader.lastName}`;
  }

  /*console.log(`this is props: `, props); */

  const imageRef = useRef(null);

  const handleCursorImageHorizontalMove = (e) => {
    imageRef.current.style.top = `${e.clientY - 320}px`;
    imageRef.current.style.left = `${e.clientX + 70}px`;
    console.log(`${e.clientX}px, ${e.clientY}px`);
  };

  return (
    <>
      <a href={props.leader.profileUrl}>
        <li
          className="list-item"
          key={props.leader.id}
          onMouseOver={props.handleMouseOver}
          onMouseOut={props.handleMouseOut}
          onMouseMove={handleCursorImageHorizontalMove}
          style={{
            opacity: props.opacityOfItem,
            transition: "opacity .2s ease-in-out"
          }}
        >
          <div className="leader-id-box">0{props.leader.id}</div>
          <div className="leader-name">{fullName}</div>

          <div
            ref={imageRef}
            className={`image-box ${
              props.showLeaderImage ? "image-box-expanded" : ""
            }`}
          >
            <img
              className="leader-image"
              src={props.leader.imageUrl}
              alt={`${props.leader.firstName}${props.leader.middleName} ${props.leader.lastName} `}
            />
          </div>
        </li>
      </a>
    </>
  );
}

export function LeadersListBox() {
  const NOTHING_IS_HOVERED = -1;
  const [hoveredIndex, setHoveredIndex] = useState(NOTHING_IS_HOVERED);

  const handleMouseOver = (i) => {
    setHoveredIndex(i);
    console.log(`I entered ${hoveredIndex}`);
  };

  const handleMouseOut = () => {
    setHoveredIndex(NOTHING_IS_HOVERED);
    console.log(`I left ${hoveredIndex} `);
  };

  const leaders = listOfLeaders.map((leader, i) => {
    function getOpacityOfItem() {
      if (hoveredIndex === NOTHING_IS_HOVERED) {
        return 1; // white
      } else {
        // somethign is hovered
        // is the current item hovered?
        if (hoveredIndex === i) {
          // current item is hovered
          return 1;
        } else {
          // not hovered, but something else is
          return 0.5;
        }
      }
    }

    return (
      <EachLeaderName
        leader={leader}
        handleMouseOver={() => handleMouseOver(i)}
        handleMouseOut={handleMouseOut}
        opacityOfItem={getOpacityOfItem()}
        showLeaderImage={hoveredIndex === i ? true : false}
      />
    );
  });

  return (
    <div className="mapped-leaders-box">
      <ul>{leaders}</ul>
    </div>
  );
}
