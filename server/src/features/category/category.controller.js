import {
  getCategoriesService,
  getCategoryBySlugService,
} from './category.service.js';

const getCategories = async (req, res, next) => {
  try {
    const categories = await getCategoriesService();

    res.send({
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryBySlug = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const category = await getCategoryBySlugService(slug);

    res.send({
      message: 'Category fetched successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export { getCategories, getCategoryBySlug };
