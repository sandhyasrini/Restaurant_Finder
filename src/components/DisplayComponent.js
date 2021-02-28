import React,{Component} from 'react';
import ReactStars from 'react-stars';
import proto_img from '../public/proto_img.jpg';
import axios from 'axios';
import { render } from '@testing-library/react';
import { Loading } from './LoadingComponent';

const baseUrl='https://developers.zomato.com/api/v2.1/';
const API_KEY='505272870e7baedae710c4dd5e403d80';

class Display extends Component{
    constructor(props){
        super(props);

        this.state={
            list: [],
            isLoading: false
        };

    }

    componentDidUpdate(prevProps){
        if(prevProps!==this.props)
            this.componentDidMount();
        
    }

    componentDidMount(){
        var city_id,search_url;
        this.setState({isLoading: false,list: []});
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
              search_url=baseUrl+'search?city_id='+city_id+'&q='+this.props.search;
                axios({
                        method:"GET",
                        url: search_url,
                        headers:{
                            "user-key": API_KEY,
                            "content-type": "application/json"
                        }
                })
                .then(res=>{
                    console.log(res.data);
                    this.setState({list: res.data.restaurants,isLoading: true});
                })
                .catch(error=>{
                    this.setState({isLoading:true});
                    return;
                });
            })
            .catch(error => {
              this.setState({isLoading:true});
              return;
            });
    }

    render(){

        return(
            <>
            {this.state.isLoading?
                <>
                    {   this.state.list.length?
                            this.state.list.map((res,i)=>{
                                return(
                                    <a href={res.restaurant.url} target="_blank" key={i}>
                                        <div className="row mt-4 detailCard">
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
                                    </a>
                                );
                            })
                        :
                        <div className="row mt-4"><strong>Oops! Some error Occurred</strong></div>     
                    }
                </>
            :
            <Loading />
            }
            </>
        );
    }
}

export default Display;