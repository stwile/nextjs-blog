import styles from './layout.module.css';
import Link from 'next/link';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import Sidebar from './Sidebar';
import Header from './Header';
import React from 'react';

export const siteTitle = 'Volare Viah';

const useStyles = makeStyles((theme: Theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

type Props = {
  children: React.ReactNode;
  home?: boolean;
};

const Layout: React.FC<Props> = ({ children, home }: Props) => {
  const classes = useStyles();

  return (
    <div className={styles.container}>
      <Header home={home} />
      <main>
        <Grid container spacing={8} className={classes.mainGrid}>
          <Grid item xs={12} md={8}>
            {children}
          </Grid>
          <Sidebar />
        </Grid>
      </main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
