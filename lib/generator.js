'use strict';

var pagination = require('hexo-pagination');

module.exports = function(locals) {
  var config = this.config;
  var posts = locals.categories.findOne({name: 'news'}).posts.sort('-date');
  var languages = [].concat(config.language || []).filter(lang => lang !== 'default');
  var defaultLanguage = languages[0];

  let indexPages = [].concat.apply([],
    languages.map(lang => {
      if (lang === defaultLanguage) {
        return getIndexPages("", lang, posts, config)
      } else {
        return getIndexPages(lang, lang, posts, config)
      }
    })
  );

  return indexPages;

};

function getIndexPages(baseUrl, lang, posts, config) {
  var basePath = baseUrl + "/" + (config.news_generator.page || 'news');
  var paginationDir = config.pagination_dir || 'page';
  var translatedPosts = posts.filter(post => post.lang === lang);

  return pagination(basePath, translatedPosts, {
    perPage: config.news_generator.per_page,
    layout: ['news'],
    format: paginationDir + '/%d/',
    data: {
      __index: true,
    },
  });
}
