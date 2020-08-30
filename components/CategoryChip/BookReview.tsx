import { Tag } from '../../types/tag';
import { Chip } from '@material-ui/core';
import { MenuBook } from '@material-ui/icons';

const BookReview = (tag: Tag): JSX.Element => {
  return (
    <Chip
      icon={<MenuBook />}
      label={tag.name}
      color="primary"
    />
  );
}

export default BookReview;