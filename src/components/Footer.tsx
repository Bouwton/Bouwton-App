import * as React from "react";
import { Row, RowProps } from "react-bootstrap";
import styled from 'styled-components';

const FooterRow = styled(Row)`
  padding: .25rem;
  box-shadow: 0 -1rem 3rem rgba(0,0,0,.175)!important;
`;

export const Footer = (props: RowProps) => {
  let year = new Date().getFullYear();
  
  return <FooterRow {...props}>
    <div className="copyright text-center">
      <span>Copyright ©2020{ year != 2020 ? " - " + year : ""}; Bouwton BV.</span>
    </div>
  </FooterRow>
}