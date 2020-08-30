import { Tag } from '../../types/tag';
import { Chip } from '@material-ui/core';
import { LaptopMac } from '@material-ui/icons';

const Technology = (tag: Tag): JSX.Element => {
  return (
    <Chip
      icon={<LaptopMac />}
      label={tag.name}
      // color="secondary"
    />
  );
}

export default Technology;