import { NotFoundError } from '../../utils/error.js';
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

  const { created_at, updated_at, ...categoryWithoutDates } = category;

  return categoryWithoutDates;
};

export { getCategoriesService, getCategoryBySlugService };
