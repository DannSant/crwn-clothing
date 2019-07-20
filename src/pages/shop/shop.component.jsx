import React from 'react';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

const Shop = ({collections}) =>{       
        return (
            <div className='shop-page'>
                <CollectionsOverview></CollectionsOverview>
                
            </div>
        )
    
}


export default Shop;