
export default class RequestService {

  _apiBase = 'http://smktesting.herokuapp.com/api';


  async postRequest(url, body, token) {

    let dataHeaders = new Headers({
      'Authorization': 'Token ' + token,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    });

    if (!token){
      dataHeaders.delete('Authorization','Token ' + token);
    }

    const res = await fetch(`${this._apiBase}${url}`, {
        method: 'POST',
        body:
         JSON.stringify(
          body
      ),
        headers: dataHeaders,
      });

      if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
          `, received ${res.status}`)
      }
      return await res.json();
    }

    async getRequest(url, token) {
      let dataHeaders = new Headers({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      });

      if (!token){
        dataHeaders.delete('Authorization','Token ' + token);
      }
      const res = await fetch(`${this._apiBase}${url}`,
        {
           headers: dataHeaders,
         }
      );
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
          `, received ${res.status}`)
      }
      return await res.json();
    };

    async registerUser(dataUser) {
      const res = await this.postRequest(`/register/`,dataUser);
      res.success ? console.log("You are registered.") : console.log(res.message);
      return res;
    }

    async loginUser(dataUser) {
      const res = await this.postRequest(`/login/`,dataUser);
      res.success ? console.log("You are logged in.") : console.log(res.message);
      return res;
    }

    async postReview(id, dataReview, token) {
      const res = await this.postRequest(`/reviews/${id}`,dataReview, token);
      return res;
    }

    async  getProduct(idProduct, token){
      const product = await this.getRequest(`/products/`, token)
      const [res] = product.filter((el) => {
        return (el.id === idProduct);
      });
      return this.modelProduct(res)
    }

    async getListProducts(token){
      const res = await this.getRequest(`/products/`, token);
      return res.map(this.modelProduct);
    }

    async getListReviews(id, token) {
      const res = await this.getRequest(`/reviews/${id}`, token);
      return res.map(({id, created_by:{username}, rate, text}) => {
        return this.modelReview({id, username, rate, text})
      });
    }

    modelProduct(product) {
      return {
        id: product.id,
        title: product.title,
        img: product.img,
        text: product.text
      }
    }

    modelReview(review) {
      return {
            id: review.id,
            username:  review.username,
            rate: review.rate,
            text: review.text
      }
    }
  }
