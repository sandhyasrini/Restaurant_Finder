import React,{Component} from 'react';
import ReactStars from 'react-stars';
import proto_img from '../public/proto_img.jpg';
import axios from 'axios';
import { render } from '@testing-library/react';
import { Loading } from './LoadingComponent';
import InfiniteScroll from "react-infinite-scroll-component";

const baseUrl='https://developers.zomato.com/api/v2.1/';
const API_KEY='505272870e7baedae710c4dd5e403d80';

class Display extends Component{
    constructor(props){
        super(props);

        this.state={
            list: [],
            start: 0,
            count: 10,
            checkMore: true,
            err: false
        };

    }

    handleScroll = () => { 
        if(window.innerHeight + window.scrollY === document.height){
            this.fetchMoreData();
        }
      };

      fetchMoreData = () => {
            var city_id,search_url;
            axios({
                method: "GET",
                url:baseUrl+'cities?q='+this.props.city,
                headers: {
                "user-key": API_KEY,
                "content-type": "application/json"
                }
            })
            .then(res=> {
              city_id=res.data.location_suggestions[0].id;
              search_url=baseUrl+'search?city_id='+city_id+'&q='+this.props.search+'&start='+this.state.start+'&count='+this.state.count;
                axios({
                        method:"GET",
                        url: search_url,
                        headers:{
                            "user-key": API_KEY,
                            "content-type": "application/json"
                        }
                })
                .then(res=>{
                    if(res.data.restaurants.length){
                        this.setState({checkMore: true});
                    }
                    else{
                        this.setState({checkMore: false});
                    }
                    this.setState({
                        list: [...this.state.list,...res.data.restaurants],
                        isLoading: true,
                        start: this.state.start+this.state.count-1
                    });
                })
                .catch(error=>{
                    this.setState({err: true});
                    return;
                });
            })
            .catch(error => {
              this.setState({err:true});
              return;
            });
    }

    componentDidUpdate(prevProps){
        if(prevProps!==this.props)
            this.componentDidMount();
        
    }

    componentDidMount(){
        this.setState({
            checkMore: true,
            err: false,
            list: [],
            start: 0
        });
        this.fetchMoreData();
        this.scrollListener = window.addEventListener("scroll", e => {
            this.handleScroll(e);
          });
    }

    render(){

        return(
           
                      !this.state.err?
                                <InfiniteScroll
                                dataLength={this.state.list.length}
                                next={this.fetchMoreData}
                                hasMore={this.state.checkMore}
                                loader={<span className="fa fa-spinner fa-pulse fa-3x fa-fw loadInfinite" style={{color: "#010067"}}></span>}
                                endMessage={<h5 className="resDetail" align="center" style={{fontFamily: "Sacramento"}}>
                                    <strong>That's it!</strong></h5>}
                              >
                            {this.state.list.map((res,i)=>{
                                return(
                                    <a href={res.restaurant.url} target="_blank" key={i}>
                                        <center>
                                        <div className="row mt-4 detailCard col-10" align="left">
                                            <div className="col-md-3">
                                                    <img src={res.restaurant.thumb===""?proto_img:res.restaurant.thumb} className="detailCard" 
                                                    width="200" height="200"  />
                                            </div>
                                            <div className="col-md-8 col-lg-9 resDetail ml-sm-auto mr-auto">
                                                <h4><strong>{res.restaurant.name}</strong></h4>
                                                <address>{res.restaurant.location.address}</address>
                                                {res.restaurant.cuisines}<br/>
                                                {res.restaurant.timings}<br/><br/>
                                                <ReactStars edit={false} count='5' value={res.restaurant.user_rating.aggregate_rating} 
                                                    size="22" />
                                            </div>
                                        </div>
                                        </center>
                                    </a>
                                );
                            })}
                            </InfiniteScroll>
                        :
                        <div className="row mt-4"><strong>Oops! Some error Occurred</strong></div>     
                   
        );
    }
}

export default Display;