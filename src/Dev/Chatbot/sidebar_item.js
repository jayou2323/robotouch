import styled from "styled-components";

const Item = styled.div`
  margin: 25px 0px;
  font-weight: 500;
  font-size:24px;
`;

function SidebarItem({children}) {
    return(
        <Item>{children}</Item>
    )
}

export default SidebarItem;