 export default {
  name: 'autocomplete',
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
      isLoading: false,
      arrowCounter: -1
    };
  },
  methods: {
    onChange() {
        // Let's warn the parent that a change was made
        this.$emit('input', this.search);

        // Is the data given by an outside ajax request?
        if (this.isAsync) {
          this.isLoading = true;
        } else {
          // Data is sync, we can search our flat array
          this.filterResults();
          this.isOpen = true;
        }
      },      
      filterResults() {
        this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      },
      setResult(result) {
        this.search = result;
        this.isOpen = false;
      },
      handleClickOutside(evt) {
        if (!this.$el.contains(evt.target)) {
          this.isOpen = false;
          this.arrowCounter = -1;
        }
      },
      onArrowDown() {
        if (this.arrowCounter < this.results.length) {
          this.arrowCounter = this.arrowCounter + 1;
        }
      },
      onArrowUp() {
        if (this.arrowCounter > 0) {
          this.arrowCounter = this.arrowCounter - 1;
        }
      },
      onEnter() {
        this.search = this.results[this.arrowCounter];
        this.isOpen = false;
        this.arrowCounter = -1;
      },
    },
    watch: {
      // Once the items content changes, it means the parent component
      // provided the needed data
      items: function (value, oldValue) {
        // we want to make sure we only do this when it's an async request
        if (this.isAsync) {
          this.results = value;
          this.isOpen = true;
          this.isLoading = false;
        }
      }
    },
    mounted() {
      document.addEventListener('click', this.handleClickOutside);
    },
    destroyed() {
      document.removeEventListener('click', this.handleClickOutside);
    }
  };