import React from 'react';
import MenuItem from '../menu-item/menu-item';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectDirectorySections} from '../../redux/directory/directory.selectors';

import './directory.styles.scss';

const Directory =(props)=>  {
  console.log(props);
  return (
      <div className="directory-menu">
          {
              props.sections.map(({id,...otherSectionProps})=>(
                  <MenuItem key={id} {...otherSectionProps}/>
              ))                    
          }
      </div>
    )}
    
const mapStateToProps =  createStructuredSelector({
      sections: selectDirectorySections
  })

export default connect(mapStateToProps)(Directory);