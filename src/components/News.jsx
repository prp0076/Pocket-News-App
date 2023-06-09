import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const updateNews = async () => {
    props.setProgress(10);
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    let mon=parseInt(month);
    if(mon<10){
      month='0'+(mon-1);
    }
    let d=parseInt(day);
    if(d<10){
      day='0'+day;
    }
    let newdate = year + "-" + month + "-" + day;
    const url =`https://newsapi.org/v2/everything?q=${props?.category}&from=${newdate}&language=en&sortBy=publishedAt&apiKey=${props?.apiKey}`
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props?.category)} - POCKET`;
    updateNews();
  }, []);
  const fetchMoreData = async () => {
    setLoading(true);
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    let mon=parseInt(month);
    if(mon<10){
      month='0'+(mon-1);
    }
    let d=parseInt(day);
    if(d<10){
      day='0'+day;
    }
    let newdate = year + "-" + month + "-" + day;
    const url =`https://newsapi.org/v2/everything?q=${props?.category}&from=${newdate}&language=en&sortBy=publishedAt&apiKey=${props?.apiKey}`
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setLoading(false);
    setArticles(articles.concat(parsedData?.articles));
    setTotalResults(parsedData?.totalResults);
  };
  console.log(articles)
  return (
    <>
      <h1
        className="text-center"
        style={{
          marginTop: "20px",
          color: props.mode === "dark" ? "#bbe4e7" : "black",
        }}
      >
        Pocket-News- Top {capitalizeFirstLetter(props?.category)} Headlines
      </h1>
      {loading && <Spinner />}
      
      <InfiniteScroll
        dataLength = { articles?.length }
        next={fetchMoreData}
        hasMore={articles?.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles?.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    mode={props.mode}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
