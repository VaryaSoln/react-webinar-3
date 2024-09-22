import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PageLayout({ children }) {
  console.log("PageLayout");
  const cn = bem('PageLayout');
  console.log(children);

  return (
    <div className={cn()}>
      <div className={cn('center')}>{children}</div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(PageLayout);
