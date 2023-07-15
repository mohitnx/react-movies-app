import React from "react";

import "./style.scss";

//just making life easer...
//what ever component is passed to this component as childred
//they will be inside a div and that div will have styling from 'contentWrapper' class in css
//so say contentWrappper is just used to make things algn to center
//then wehver we use ContentWrapper with other compoentns as childred like say
//movie title component, then it will automaitcally be centered

//remembr children is a special prop name if we use childred like this..
//anything that is insdie the <Contenwrapper> {compoentns} </contentwrapper> like this
//will be childred

const ContentWrapper = ({ children }) => {
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
