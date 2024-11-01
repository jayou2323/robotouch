// sidebar_item.js

import React from 'react';
import styled from 'styled-components';

const SidebarItemWrapper = styled.div`
  padding: 10px 0;
  font-size: 18px;
  cursor: pointer; /* 클릭 가능한 요소임을 나타냅니다 */
  &:hover {
    text-decoration: underline;
  }
`;

function SidebarItem({ onClick, children }) {
  return (
    <SidebarItemWrapper onClick={onClick}>
      {children}
    </SidebarItemWrapper>
  );
}

export default SidebarItem;
