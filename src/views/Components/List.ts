import Vue from "vue";
import { Watch, Component } from "vue-property-decorator";
import { Model } from "@/resources/interfaces";
import Resource from "@/resources/Resource";

@Component
export default class List<M extends Model> extends Vue {
  resource: Resource<M> | null = null;
  name = "list";
  autoCompletes: { key: string; minLength: number }[] = [];
  currentSort = "createdAt";
  currentSortOrder = "desc";
  perPage = Math.max(Math.floor((window.innerHeight - 410) / 48), 5);
  currentPage = 1;
  total = 0;
  searchQuery: Record<string, any> = {};
  searchDelayTimeout = 0;
  items: M[] = [];
  loading = false;
  minQueryInterval = 0;
  queryCoolingDown = false;
  activated() {
    // console.log("activated", JSON.stringify(this.searchQuery));
    this.queryData();
  }
  get query() {
    const searchQuery: Record<string, any> = {
      ...this.searchQuery,
      limit: this.perPage,
      skip: (this.currentPage - 1) * this.perPage,
      order: this.currentSort
        ? `${this.currentSortOrder === "desc" ? "-" : ""}${this.currentSort}`
        : undefined,
    };

    for (const autoComplete of this.autoCompletes) {
      if (
        searchQuery[autoComplete.key] &&
        searchQuery[autoComplete.key].length < autoComplete.minLength
      ) {
        delete searchQuery[autoComplete.key];
      }
    }

    for (const field of Object.keys(searchQuery) as Array<
      keyof typeof searchQuery
    >) {
      const value = searchQuery[field];
      if (value instanceof Array) {
        (searchQuery[field] as string) = value.join(",");
      }
    }

    return searchQuery;
  }
  get from() {
    return Math.min(this.perPage * (this.currentPage - 1) + 1, this.total);
  }
  get to() {
    return Math.min(this.from + this.perPage - 1, this.total);
  }
  get totalPages() {
    return Math.ceil(this.total / this.perPage);
  }
  async queryData(): Promise<M[] | undefined> {
    if (this.queryCoolingDown) return;
    this.queryCoolingDown = true;
    setTimeout(() => {
      this.queryCoolingDown = false;
    }, this.minQueryInterval);
    if (!this.resource) throw Error("invalid_resource");
    this.loading = true;
    const listData = await this.resource.query(this.query);
    this.items = listData;
    this.loading = false;
    this.total = Number(listData.$headers["items-total"]);
    return this.items;
  }
  showDetail(item: M) {
    this.$router.push(`/${this.name}/${item.id}`);
  }
  showCreate() {
    this.$router.push(`/${this.name}/add`);
  }
  @Watch("currentPage")
  onCurrentPageUpdate() {
    console.log("onCurrentPageUpdate");
    this.queryData();
  }
  @Watch("searchQuery", { deep: true })
  onSearchQueryUpdate(n: Record<string, any>, o: Record<string, any>) {
    // for first time init, query is done in activated
    if (Object.keys(o).length === 0) return;
    console.log("onSearchQueryUpdate", JSON.stringify(n), JSON.stringify(o));
    clearTimeout(this.searchDelayTimeout);
    this.searchDelayTimeout = setTimeout(() => {
      this.queryData();
    }, 200);
  }
  @Watch("currentSort")
  onCurrentSortUpdate() {
    console.log("onCurrentSortUpdate");
    this.queryData();
  }
  @Watch("currentSortOrder")
  onCurrentSortOrderUpdate() {
    console.log("onCurrentSortOrderUpdate");
    this.queryData();
  }
  created() {
    if (this.$isDev) {
      // no keep-alive in dev mode, queryData once on create
      this.queryData();
    }
  }
}
