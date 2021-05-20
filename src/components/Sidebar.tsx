import { Grid, Typography, Theme } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { SvgIconComponent, GitHub, Twitter } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

type Social = {
  name: string;
  icon: SvgIconComponent;
  url: string;
};

const social: Array<Social> = [
  {
    name: 'GitHub',
    icon: GitHub,
    url: 'https://github.com/hyroky867',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/handm871',
  },
];

export const Sidebar: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={4}>
      <Typography variant="h6" className={classes.sidebarSection}>
        Social
      </Typography>
      {social.map((network: Social) => (
        <Link display="block" variant="body1" href={network.url} key={network.name}>
          <Grid container direction="row" spacing={1} alignItems="center">
            <Grid item>
              <network.icon />
            </Grid>
            <Grid item>{network.name}</Grid>
          </Grid>
        </Link>
      ))}
    </Grid>
  );
};
