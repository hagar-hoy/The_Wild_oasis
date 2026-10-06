import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: orangered;
  padding: 1.2rem 4.8rem;
  background-color: var(--color-grey-0);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid var(--color-grey-100);
`;
function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
