import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'

import InfiniteScroll from "react-infinite-scroll-component";
import Spinners from './Spinners';

export default class News extends Component {
  static defaultProps={
     country:"in",
     pageSize:6,
     category:"general"
  }
  static propTypes = {
   country:PropTypes.string,
   pageSize:PropTypes.number,
   category:PropTypes.string,
  }

constructor(props){
    super(props);
    this.state={
        articles:[],
        loading:false,
        page:1,
        totalResults:0
    }
    document.title=`NewsMonkey - ${this.props.category}`
}
handleNext=async ()=>{
     this.props.setProgress(25);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
    let data=await fetch(url);
    this.props.setProgress(60);
    let parsedData=await data.json();
   // console.log(parsedData)
   
   this.setState({
     page:this.state.page+1,
     articles:parsedData.articles,
     loading:false,
   })
   this.props.setProgress(100);
}

handlePrev=async ()=>{
  this.props.setProgress(25);
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
  // let url=`https://newsapi.org/v2/everything?q=tesla&from=2024-02-09&sortBy=publishedAt&apiKey=b2e289f2ff8f4404bb770cf80f01d334&page=${this.state.page-1}&pageSize=6`
  let data=await fetch(url);
  this.props.setProgress(60);
  let parsedData=await data.json();
   // console.log(parsedData)
   this.setState({
     page:this.state.page-1,
     articles:parsedData.articles
   })
   this.props.setProgress(100);
}
fetchMoreData = async() => {
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
  this.setState({loading:true})
let data=await fetch(url);
let parsedData=await data.json();
// console.log(parsedData)

this.setState({
 page:this.state.page+1,
 articles:this.state.articles.concat(parsedData.articles),
 loading:false,
})
};
async componentDidMount(){
  // console.log(this.props.country)
  // console.log(this.props.category)
  // console.log(this.props.pageSize)
  this.props.setProgress(25);
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`
    //let url="https://newsapi.org/v2/everything?q=tesla&from=2024-02-09&sortBy=publishedAt&apiKey=b2e289f2ff8f4404bb770cf80f01d334&page=1&pageSize=6"
    let data=await fetch(url);
   // console.log(data)
   this.props.setProgress(60);
    let parsedData=await data.json();
      //console.log(parsedData)
      this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})
      this.props.setProgress(100);
  }
  render() {
    return (
      <div className='container my-3' >
        <h1 className='text-center'>{`NewsMonkey - Top HeadLines from ${this.props.category}`}</h1>
         {/* remove because of infinite scroll */}
        {this.state.loading && <Spinners/> }
        {/* <InfiniteScroll style={{overflow:"hidden"}}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinners/>}
        > */}
          <div className="container">
        <div className="row">
        {!this.state.loading && this.state.articles?.map((ele)=>{
           return <div className="col-md-4" key={ele.url}>
           <NewsItem  title={ele.title?ele.title.slice(0,45):""} 
           description={ele.description?ele.description.slice(0,98):""} imgUrl={ele.urlToImage?ele.urlToImage:"https://images.moneycontrol.com/static-mcnews/2019/06/SpaceX-770x433.jpg"} newsUrl={ele.url}/>
               </div>
        })}    
         </div>
         </div>
         {/* </InfiniteScroll> */}
         {/* prev and next button logic but it is not work  */} 
          <div className="container d-flex justify-content-between">
         <button disable={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrev}>&larr; Prev</button>
         <button type="button" className="btn btn-success" onClick={this.handleNext}>Next &rarr;</button>
         </div>
      </div> 
    )
  }
}
