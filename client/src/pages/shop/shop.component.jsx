import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';

import {connect} from 'react-redux';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionContainer from '../../pages/collection/collection.container';


const Shop = ({fetchCollectionsStart,match})=>{ 
    
    useEffect(()=>{
        fetchCollectionsStart();
    },[fetchCollectionsStart])
      
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



const mapDispatchToProps = dispatch =>({
    fetchCollectionsStart: ()=>dispatch(fetchCollectionsStart())
})

export default connect(null,mapDispatchToProps)(Shop);