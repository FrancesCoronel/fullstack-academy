var marked = require('marked')

module.exports = function(swig) {
	var page_link = function(page) {
		return "<a href='" + page.full_route + "'>" + page.title + "</a>"; 
	}

	page_link.safe = true;

	swig.setFilter('page_link', page_link)

	var markedFilter = function(text_body) {
		return marked(text_body)
	}

	markedFilter.safe = true;

	swig.setFilter("marked", markedFilter)

}