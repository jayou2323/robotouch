// stats_page.js

import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  font-size: 20px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 20px;
  width: 80%;
  max-width: 800px;
`;

const StatItem = styled.div`
  margin: 20px 0;
  width: 100%;
  padding: 20px;
  background-color: ${props => props.theme.colors.primary_bright};
  border-radius: 10px;
  font-weight: bold;
`;

function StatsPage() {
  return (
    <StatsContainer>
      <h2>사용자 스탯 정보</h2>
      <StatItem>대화 횟수: 30회</StatItem>
      <StatItem>총 사용 시간: 5시간 20분</StatItem>
      <StatItem>성장률: 75%</StatItem>
    </StatsContainer>
  );
}

export default StatsPage;
