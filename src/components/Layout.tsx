import { Grid, makeStyles, Theme } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

import Header from './Header';
import { Meta } from './Meta';
import { Sidebar } from './Sidebar';
import styles from './layout.module.css';

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

export const Layout: React.FC<Props> = ({ children, home }: Props) => {
  const classes = useStyles();

  return (
    <>
      <Meta />
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
    </>
  );
};

export default Layout;
