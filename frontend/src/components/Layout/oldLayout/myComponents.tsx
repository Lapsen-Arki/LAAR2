{/*import Footer from "../Footer";
import Header from "../../header/Header";
import React from 'react';
import { styled } from '@mui/material/styles';

const StatRoot = styled('div', {
  name: 'MuiLayoutRoot',
  slot: 'root',
})(() => ({
}));

const StatInner = styled('div', {
    name: 'MuiStatInner',
    slot: 'inner',
  })(() => ({
  }));

const StatPage = styled('div', {
    name: 'MuiStatPage',
    slot: 'page',
    })(() => ({
    }));


interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
    return (
    <StatRoot>
        <Header />
        <StatInner>
            <StatPage>{props.children}</StatPage>
        </StatInner>
        <Footer />
    </StatRoot>
    );
}
*/}


/*import * as React from 'react';
import { styled } from '@mui/material/styles';

const StatRoot = styled('div', {
  name: 'MuiStat',
  slot: 'root',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(3, 4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const StatValue = styled('div', {
  name: 'MuiStat',
  slot: 'value',
})(({ theme }) => ({
  ...theme.typography.h3,
}));

const StatUnit = styled('div', {
  name: 'MuiStat',
  slot: 'unit',
})(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

interface StatProps {
    value: string;
    unit: string; 
  }

const Stat = React.forwardRef<HTMLDivElement, StatProps>((props, ref) => {
  const { value, unit, ...other } = props;

  return (
    <StatRoot ref={ref} {...other}>
      <StatValue>{value}</StatValue>
      <StatUnit>{unit}</StatUnit>
    </StatRoot>
  );
});

export default Stat; */