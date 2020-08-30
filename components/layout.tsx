import Head from 'next/head';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import Sidebar from './Sidebar';

export const siteTitle = 'Volare Viah'

const useStyles = makeStyles((theme: Theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const Layout = ({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) => {
  const classes = useStyles();

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.jpg"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={siteTitle}
            />
            <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={siteTitle}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{siteTitle}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>
        <Grid
          container
          spacing={8}
          className={classes.mainGrid}
        >
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
  )
}

export default Layout;