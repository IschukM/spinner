export class UnspleshAPI {
  #page = 1;
  #query = '';
  getPhotos() {
    const url = `https://api.unsplash.com/search/photos?${this.#page}&query=${
      this.#query
    }&client_id=HslRljVAXx39xscZAgKySpNimL5ReEsXBSo8WuJOyvk&per_page=12
    }
    &color=orange`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

  incrementPage() {
    this.#page += 1;
  }

  get query() {
    return this.#query;
  }
  set query(newQuery) {
    this.#query = newQuery;
  }
}
