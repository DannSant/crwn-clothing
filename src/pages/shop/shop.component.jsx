import React from 'react';
import {Route} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';



import {connect} from 'react-redux';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';
import {selectCollectionsLoaded} from '../../redux/shop/shop.selectors';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionContainer from '../../pages/collection/collection.container';


class Shop extends React.Component { 

    

    componentDidMount(){
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
        
    }
    
    render(){  
        const {match} = this.props;
      
        return (
            <div className='shop-page'>
                <Route exact 
                       path={`${match.path}`} 
                       component={CollectionsOverviewContainer}
                >
                </Route>

                <Route path={`${match.path}/:collection`} 
                       component={CollectionContainer}
                >                        
                </Route>
                
            </div>
        );
    }
    
}



const mapDispatchToProps = dispatch =>({
    fetchCollectionsStartAsync: ()=>dispatch(fetchCollectionsStartAsync())
})

export default connect(null,mapDispatchToProps)(Shop);