import { NotFoundError } from '../../utils/error.js';
import { calculatedReadTime, truncateText } from '../../utils/helper.js';
import {
  findAllCategories,
  findCategoryBySlug,
} from './category.repository.js';

const getCategoriesService = async () => {
  const results = await findAllCategories();

  const resultWithoutDates = results?.map(
    ({ created_at, updated_at, ...category }) => category
  );

  return resultWithoutDates;
};

const getCategoryBySlugService = async (slug) => {
  const category = await findCategoryBySlug(slug);

  if (!category) {
    throw new NotFoundError(
      `Sorry, we couldn't find the category you're looking for`
    );
  }

  if (category.posts.length > 0) {
    category.posts = category.posts.map((post) => {
      return {
        ...post,
        short_content: truncateText(post.content, 100),
        estimated_read_time: calculatedReadTime(post.content),
      };
    });
  }

  const { created_at, updated_at, ...categoryWithoutDates } = category;

  return categoryWithoutDates;
};

export { getCategoriesService, getCategoryBySlugService };
