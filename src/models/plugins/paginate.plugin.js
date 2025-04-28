/* eslint-disable no-param-reassign */

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& đại diện cho toàn bộ chuỗi được match
}

const paginate = (schema) => {
  schema.statics.paginate = async function (filter, options) {
    if (filter && filter.searchTerm && options.searchFields) {
      const searchTermEscaped = escapeRegExp(filter.searchTerm);
      // eslint-disable-next-line security/detect-non-literal-regexp
      const regexSearch = new RegExp(searchTermEscaped, 'i'); // 'i' là cờ không phân biệt hoa thường
      const searchCriteria = options.searchFields.map((field) => ({ [field]: regexSearch }));

      // Xóa trường searchTerm vì ko có trường này trong model
      delete filter.searchTerm;

      // Thêm điều kiện search vào điều kiện đã có sẵn
      const finalCriteria = {};
      if (searchCriteria.length > 0) {
        finalCriteria.$and = [{ $or: searchCriteria }];
      }

      // Kết hợp filter và search để tạo ra filter cuối cùng
      filter = {
        ...filter,
        ...finalCriteria,
      };
    }

    // Sort
    let sort = '';
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = '-createdAt';
    }

    // Limit & page
    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
