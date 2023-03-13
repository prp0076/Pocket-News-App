import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source,mode } = props;
  return (
    <div className="my-3" style={{color:mode==='dark'?'white':'black'}}>
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill" style={{color:'#57e7e9',backgroundColor:'black'}}> {source} </span>
        </div>
        <img
          src={
            !imageUrl
              ? "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2023/02/breaking-news-template-3-1677286655.jpg"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body" style={{backgroundColor:mode==='dark'?'#020230':'white'}}>
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
