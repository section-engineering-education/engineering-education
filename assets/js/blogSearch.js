var search = (function() {

  var idx;

  function init() {
    if (!!document.getElementById("searchApp")) {
      vueSearch();
    }

    if (!!document.getElementById("blogSearch")) {
      blogSearch();
    }
  }

  function vueSearch() {
    new Vue({
      el: '#searchApp',
      data: {
        documents: [],
        searchTerm: '',
        currentSearch: '',
        shown: false,
        perPage: 5,
        pagination: {

        }
      },
      created: function() {
        this.getTerms();
      },
      methods: {
        getTerms: function() {
          var self = this;
          axios.get('/search-index.json')
          .then(function (r) {
            idx = lunr.Index.load(JSON.parse(JSON.stringify(r.data)));

            axios.get('/search-documents.json')
            .then(function (r) {
              documents = r.data;
              self.setSearchTerm();
            });
          });
        },

        convertDate: function(date) {
          var options = { year: 'numeric', month: 'long', day: 'numeric' };

          var dateParse = new Date(date);

          if (!!dateParse) {
            return dateParse.toLocaleDateString("en-US", options);
          }
          return null;
        },

        blogify: function(url) {
          return '/blog' + url;
        },

        parseQuery: function(name) {
          name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
          var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
          var results = regex.exec(location.search);
          return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        },

        searchExecute: function() {
          this.currentSearch = this.searchTerm;
        },

        setSearchTerm: function() {
          var term = this.parseQuery('q');

          if (term.length) {
            this.searchTerm = term;
            this.currentSearch = term;
          }
          this.shown = true;
        }
      },
      computed: {
        results: function() {
          var self = this;
          if (self.currentSearch.length > 0) {
            return idx.search(this.currentSearch).map(function(result) {
              return documents.filter(function(page) {
                try {
                  return page.uri === result.ref;
                } catch (e) {
                  console.log(e);
                }
              })[0]
            });
          }
          return [];
        },

        paginatedResults: function() {
          let from = (this.pagination.currentPage * this.perPage) - this.perPage;
          let to = (this.pagination.currentPage * this.perPage);
          return  this.results.slice(from, to);
        },

        subTitle: function() {
          if (this.results.length) {
            return '\"' + this.currentSearch + '\" - ' + this.results.length + ' results'
          }
          return "No results";
        }
      },
      filters: {
        truncate: function(string) {
          if (!!string && string.length > 210) {
            string = string.substring(0, 210) + '...';
          }
          return string;
        },
        titleCase: function(str) {
          str = str.toLowerCase().replace("-","").split(' ');
          for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
          }
          return str.join(' ');
        }
      },
      template: "
        <div>
          <article>
            <header>
              <section class='hero-color flex align-center justify-center fill-green'>
                <div class='hero-color-left relative'>
                  <div class='hero-color-left-large-stripe'></div>
                  <div class='hero-color-left-small-color'></div>
                  <div class='hero-color-left-small-stripe'></div>
                </div>
                <div class='hero-color-middle flex align-center justify-center relative'>
                  <div class='hero-color-middle-left-stripes'></div>
                  <div>
                    <h2 class='title-2 text-white xs-mb-10'>Blog Search</h2>
                    <p class='text-22-regular text-white xs-mb-20'>{{ subTitle }}</p>
                    <a class='xs-mt-30 text-white' href='/blog'>Back to Blog</a>
                  </div>
                  <div class='hero-color-middle-right-stripes'></div>
                </div>
                <div class='hero-color-right relative'>
                  <div class='hero-color-right-large-stripe'></div>
                  <div class='hero-color-right-small-color'></div>
                </div>
              </section>
            </header>
            <div class='section blog-listing-search flex align-center xs-pb-20 xs-pt-40 sm-pb-300 sm-pt-60 md-pt-80'>
              <div class='section-container blog-listing-search-container xs-mb-20'>
                <div class='blog-listing-search-form flex flex-wrap'>
                  <input v-model='searchTerm' aria-label='Blog search input' placeholder='Search Blog' type='search'  v-on:keyup.enter='searchExecute' class='xs-pl-30 sm-pl-60'>
                  <button class='-active' type='submit' @click='searchExecute' >Search</button>
                </div>
              </div>
            </div>
          </article>
          <section class='blog-listing-posts'>
            <div class='section-container blog-listing-posts-container'>
              <div class='blog-listing-posts-content'>
                <ul v-if='results.length' class='list-unstyled xs-mb-80'>

                    <li v-for='post in paginatedResults' class='blog-listing-posts-item'>
                      <a class='decoration-none xs-pb-40 xs-pt-40 prl-25 flex flex-wrap' :href='blogify(post.uri)' >
                        <div class='blog-listing-posts-item-image'>
                          <img v-if='post.image' :src='post.image' >
                        </div>
                        <div class='blog-listing-posts-item-content'>
                          <h3 class='title-3 text-link xs-mb-10'>{{ post.title }}</h3>
                          <p class='text-blockquote xs-mb-20'>{{ convertDate(post.date) }}</p>
                          <p class='text-18-regular text-color'>{{ post.content | truncate }}</p>
                          <ul v-if='post.tags.length' class='list-flex xs-mt-20 xs-mb-20'>
                            <li class='text-blockquote' style='margin-right: 6px;'>Categories:</li>
                            <li v-for='(tag, i) in post.tags' class='xs-mr-20 text-blockquote'>{{ tag | titleCase }}</li>
                          </ul>
                        </div>
                      </a>
                    </li>

                </ul>
                <div is='uib-pagination' v-model='pagination' :boundary-links='true' :force-ellipses='true' :total-items='results.length' ></div>

              </div>
            </div>
          </section>
        </div>
      "
    })
  }


  function blogSearch() {
    new Vue({
      el: '#blogSearch',
      data: {
        searchTerm: '',
      },
      computed: {
        searchURL: function() {
          return '/search/?q=' + this.searchTerm;
        }
      },
      methods: {
        searchExecute: function() {
          this.$refs.searchButton.click();
        }
      },
      template: "
      <div class='blog-listing-search-form flex flex-wrap'>
        <input v-on:keyup.enter='searchExecute' v-model='searchTerm' placeholder='Search Blog' type='search' class='xs-pl-30 sm-pl-60 xs-mb-20 sm-mb-0'>
        <a v-bind:href='searchURL' class='button button-green' ref='searchButton'>Search</a>
      </div>
      "
    })
  }

  return {
    start: init
  };
})();

search.start();



