let myModal ='';
const app ={
  //資料
  data(){
    return{
      url:'https://vue3-course-api.hexschool.io',
      path:'v268018',
      productData:[],//產品資訊
      editProductData:{},//編輯產品內容
      token:{//存放uesr的token
        headers:{
          Authorization:'',
        },
      },
    }
  },
  //方法
  methods:{
    removeProducts(id){//刪除單筆產品訂單
      console.log(id);
      axios.delete(`${this.url}/api/${this.path}/admin/product/${id}`,this.token)
      .then(res=>{
          console.log(res);
          this.getProducts();
      }).catch(err=>{
          console.log(err);
      })
    },
    setEditProducts(){//設定編輯商品訂單
      let putEditData={//定義傳送的修改格式
        data:{
          ...this.editProductData,
        }
      }
      console.log(putEditData);
      axios.put(`${this.url}/api/${this.path}/admin/product/${this.editProductData.id}`,putEditData,this.token)
      .then(res=>{
        console.log(res);
        if(res.data.success){
          alert('訂單資料修改成功');
          this.getProducts();
        }
        else{
          alert('訂單資料修改失敗');
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    editProducts(item){//編輯商品訂單
      this.editProductData={...item};
      myModal.show();
    },
    getProducts(){//取得產品資料
      axios.get(`${this.url}/api/${this.path}/admin/products`,this.token)
      .then(res=>{
          console.log(res);
          this.productData=res.data.products;
      }).catch(err=>{
          console.log(err);
      })
    },
  },
  //初始化(生命週期)
  created(){
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)v268018\s*\=\s*([^;]*).*$)|^.*$/, "$1");//取得cookie的token
    this.token.headers.Authorization=myCookie;//定義token資料內容
    this.getProducts();
  },
  mounted(){
    myModal = new bootstrap.Modal(document.getElementById('productModal'));
  }
}
Vue.createApp(app).mount('#app')   ;




