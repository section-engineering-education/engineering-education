var search = (function() {

  var idx;

  function init() {
    if (!!document.getElementById("blogSearchApp")) {
      vueSearch("blog");
    }

    if (!!document.getElementById("videoSearchApp")) {
      vueSearch("video");
    }

    if (!!document.getElementById("educationSearchApp")) {
      vueSearch("education");
    }

    if (!!document.getElementById("blogSearch")) {
      searchInput("blog");
    }

    if (!!document.getElementById("videoSearch")) {
      searchInput("video");
    }

    if (!!document.getElementById("educationSearch")) {
      searchInput("education");
    }
  }

  function vueSearch(tag) {
    new Vue({
      el: '#' + tag + 'SearchApp',
      data: {
        documents: [],
        searchTerm: '',
        currentSearch: '',
        perPage: 5,
        shown: false,
        currentPage: 1,
        pagination: {

        }
      },
      created: function() {
        this.executeSearch();
      },
      methods: {

        executeSearch: function() {
          var self = this;
          var searchTerm = this.searchTerm.length ? this.searchTerm : this.parseQuery('q');
          var websitePipeline = new SajariSearch.Client("1568234116078614868", "section-io").pipeline("website");
          var clickTrackedSession = new SajariSearch.InteractiveSession("q", new SajariSearch.DefaultSession(SajariSearch.TrackingType.Click, "url", {}));
          websitePipeline.search({ q: searchTerm, "resultsPerPage": "100000", "filter": "dir1='" + self.searchDir + "'" }, clickTrackedSession, (error, response, values) => {
            self.documents = [];
            response.results.forEach(function(r) {
              self.documents.push(r);
            });
            self.setSearchTerm();
            this.pollSearch();
          });
        },

        pollSearch: function() {
          var self = this;
          var poll = setInterval(function() {
            if (self.currentSearch != self.parseQuery('q')) {
              self.executeSearch();
              clearInterval(poll);
            }
          }, 200);
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
          this.documents = [];
          this.currentSearch = this.searchTerm;
          this.updateWindowHistory();
          this.executeSearch();
        },

        updateWindowHistory: function() {
          var location = window.location.origin + window.location.pathname + '?q=' + this.searchTerm;
          history.pushState({
            id: tag + '-search'
          }, 'Search | Section', location);
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
            return self.documents;
          }
          return [];
        },

        searchDir: function() {
          switch (tag) {
            case 'blog':
              return 'blog'
              break;
            case 'video':
              return 'videos'
              break;
            case 'education':
              return 'articles'
              break;
            default:
              break;
          }
        },

        searchTitle: function() {
          switch (tag) {
            case 'blog':
              return 'Blog Search'
              break;
            case 'video':
              return 'Video Search'
              break;
            case 'education':
              return 'Education Search'
              break;
            default:
              break;
          }
        },

        backUrl: function() {
          switch (tag) {
            case 'blog':
              return '/blog'
              break;
            case 'video':
              return '/videos'
              break;
            case 'education':
              return '/engineering-education'
              break;
            default:
              break;
          }
        },

        backText: function() {
          switch (tag) {
            case 'blog':
              return 'Back to Blog'
              break;
            case 'video':
              return 'Back to Videos'
              break;
            case 'education':
              return 'Back to Education'
              break;
            default:
              break;
          }
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
        },

        headerBackground: function() {
          switch (tag) {
            case 'blog':
              return "fill-green"
              break;
            case 'video':
              return "fill-green"
              break;
            case 'education':
              return "fill-blue"
              break;
            default:
              return "fill-green"
              break;
          }
        },
        inputButtonClass: function() {
          switch (tag) {
            case 'blog':
              return "button button-green"
              break;
            case 'video':
              return "button button-green"
              break;
            case 'education':
              return "button-enged"
              break;
            default:
              return "button button-green"
              break;
          }
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
        },
        stripTitle: function(str) {
          return str.replace(' | Section', '');
        }
      },
      
      template: "
        <div>
          <article>
            <header>
              <section class='hero-color flex align-center justify-center' :class='headerBackground'>
                <div class='hero-color-left relative'>
                  <div class='hero-color-left-large-stripe'></div>
                  <div class='hero-color-left-small-color'></div>
                  <div class='hero-color-left-small-stripe'></div>
                </div>
                <div class='hero-color-middle flex align-center justify-center relative'>
                  <div class='hero-color-middle-left-stripes'></div>
                  <div>
                    <h2 class='title-2 text-white xs-mb-10'>{{ searchTitle }}</h2>
                    <p class='text-22-regular text-white xs-mb-20'>{{ subTitle }}</p>
                    <a class='xs-mt-30 text-white' :href='backUrl' >{{ backText }}</a>
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
                  <button class='-active' :class='inputButtonClass' type='submit' @click='searchExecute' >Search</button>
                </div>
              </div>
            </div>
          </article>
          <section class='blog-listing-posts'>
            <div class='section-container blog-listing-posts-container'>
              <div class='blog-listing-posts-content'>
                <ul v-if='results.length' class='list-unstyled xs-mb-80'>

                    <li v-for='post in paginatedResults' class='blog-listing-posts-item'>
                      <a class='decoration-none xs-pb-40 xs-pt-40 prl-25 flex flex-wrap' :href='post.token.click' >
                        <div class='blog-listing-posts-item-image'>
                          <img v-if='post.values.image' :src='post.values.image' >
                        </div>
                        <div class='blog-listing-posts-item-content'>
                          <h3 class='title-3 text-link xs-mb-10'>{{ post.values.title | stripTitle }}</h3>
                          <p class='text-18-regular text-color xs-mb-10'>{{ post.values.description | truncate }}</p>
                          <p class='text-18-regular text-blue'>{{ post.values.url }}</p>
                        </div>
                      </a>
                    </li>

                </ul>
                <div is='uib-pagination' v-model='pagination' :boundary-links='true' :force-ellipses='true' :max-size='5' :boundary-link-numbers='true' :total-items='results.length' ></div>

              </div>
            </div>
          </section>
        </div>
      "
    })
  }


  function searchInput(tag) {

    new Vue({
      el: '#' + tag + 'Search',
      data: {
        searchTerm: '',
      },
      computed: {
        searchURL: function() {
          switch (tag) {
            case 'blog':
              return '/blog/search/?q=' + this.searchTerm
              break;
            case 'video':
              return '/videos/search/?q=' + this.searchTerm
              break;
            case 'education':
              return '/engineering-education/search/?q=' + this.searchTerm
              break;
            default:
              break;
          }

        },
        inputPlaceholder: function() {
          switch (tag) {
            case 'blog':
              return "Search Blog"
              break;
            case 'video':
              return "Search Videos"
              break;
            case 'education':
              return "Search Education"
              break;
            default:
              return "Search"
              break;
          }
        },
        inputButtonClass: function() {
          switch (tag) {
            case 'blog':
              return "button button-green"
              break;
            case 'video':
              return "button button-green"
              break;
            case 'education':
              return "button-enged"
              break;
            default:
              return "button button-green"
              break;
          }
        }
      },
      methods: {
        searchExecute: function() {
          this.$refs.searchButton.click();
        }
      },
      template: "
      <div class='blog-listing-search-form flex flex-wrap'>
        <input v-on:keyup.enter='searchExecute' v-model='searchTerm' :placeholder='inputPlaceholder' type='search' class='xs-pl-30 sm-pl-60 xs-mb-20 sm-mb-0'>
        <a v-bind:href='searchURL' :class='inputButtonClass' ref='searchButton'>Search</a>
      </div>
      "
    })
  }

  return {
    start: init
  };
})();

search.start();



