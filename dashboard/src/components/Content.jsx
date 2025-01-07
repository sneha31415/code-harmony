import React from 'react'
import { ContentHeader } from './ContentHeader';
import { EasyButtons } from './EasyButtons';

import './Content.css';
import { Previous } from './Previous';
import { Stats } from './Stats';

export const Content = () => {
 
  return (
    <div className="content">
      <ContentHeader/>
    <div className="bottom-content">
    <div className="previous">
      <Previous/>
    </div>
    <div className="stats">
      <Stats/>
    </div>
    </div>
       
    </div>
  )
}
