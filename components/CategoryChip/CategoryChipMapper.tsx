import { Tag } from '../../types/tag';
import BookReview from './BookReview';
import Technology from './Technology';

const CategoryChipMapper = (tag: Tag) => {
  if (tag.name === '読書感想') return BookReview(tag);
  if (tag.name === '技術書') return Technology(tag);
}
export default CategoryChipMapper;