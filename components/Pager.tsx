import { Content } from '../types/content';
import { Grid } from '@material-ui/core';
import Link from 'next/link';

type Props = {
  prevContent?: Content;
  nextContent?: Content;
}

const Pager: React.FC<Props> = (props: Props) => {
  const { prevContent, nextContent } = props;

  return (
    <Grid
      container
      justify="space-between"
    >
      <Grid>
        {
          prevContent === undefined ? '' : <Link
            href="/blogs/[id]"
            as={`blogs/${prevContent.id}`}
          >
            <a>Prev Page</a>
          </Link>
        }
      </Grid>
      <Grid>
        {
          nextContent === undefined ? '' : <Link
            href="/blogs/[id]"
            as={`blogs/${nextContent.id}`}
          >
            <a>Next Page</a>
          </Link>
        }
      </Grid>
    </Grid>
  );
}

export default Pager;