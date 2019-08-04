import React, {useEffect,lazy, Suspense} from 'react';
import {Route} from 'react-router-dom';

import {connect} from 'react-redux';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions';

//import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
//import CollectionContainer from '../../pages/collection/collection.container';

import Spinner from '../../components/spinner/spinner.component';

const CollectionsOverviewContainer= lazy(()=> import('../../components/collections-overview/collections-overview.container'));
const CollectionContainer = lazy(()=> import('../../pages/collection/collection.container'));

const Shop = ({fetchCollectionsStart,match})=>{ 
    
    useEffect(()=>{
        fetchCollectionsStart();
    },[fetchCollectionsStart])
    
    return (
        <div className='shop-page'>
            <Suspense fallback={<Spinner></Spinner>}>
            <Route exact 
                    path={`${match.path}`} 
                    component={CollectionsOverviewContainer}
            >
            </Route>

            <Route path={`${match.path}/:collection`} 
                    component={CollectionContainer}
            >                        
            </Route>
            </Suspense>
            
        </div>
    );
    
    
}



const mapDispatchToProps = dispatch =>({
    fetchCollectionsStart: ()=>dispatch(fetchCollectionsStart())
})

export default connect(null,mapDispatchToProps)(Shop);