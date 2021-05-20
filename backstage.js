const app={
    data:{
        url:'https://vue3-course-api.hexschool.io',
        path:'v268018',
        productData:[],//產品資訊
        token:{//存放uesr的token
          headers:{
            Authorization:'',
          },
        },
    },
    //methods
    removeData(e,vm){//刪除單筆產品訂單
            const id = e.target.dataset.id;
            axios.delete(`${vm.data.url}/api/${vm.data.path}/admin/product/${id}`,this.data.token)
            .then(res=>{
                console.log(res);
                vm.getData();
            }).catch(err=>{
                console.log(err);
            })
    },
    getData(){//取得產品資料
        axios.get(`${this.data.url}/api/${this.data.path}/admin/products`,this.data.token)
        .then(res=>{
            this.data.productData=res.data.products;
            console.log(this.data.productData);
            this.render();
        }).catch(err=>{
            console.log(err);
        })
    },
    render(){//畫面輸出
            const productCount =document.querySelector('#productCount');
            let str = '';
            this.data.productData.forEach(item=>{
            str+=
            `<tr>
                <td>${item.title}</td>
                <td width="120">
                  ${item.price}
                </td>
                <td width="120">
                  ${item.origin_price}
                </td>
                <td width="100">
                  <span class="">${item.is_enabled}</span>
                </td>
                <td width="120">
                  <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
                </td>
              </tr>`
            })
            productList.innerHTML=str;
            productCount.textContent=this.data.productData.length;
    },
    init(){//初始化
      const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)v268018\s*\=\s*([^;]*).*$)|^.*$/, "$1");//取得cookie的token
      this.data.token.headers.Authorization=myCookie;
      const productList = document.querySelector('#productList');
      productList.addEventListener('click',(e)=>{
        this.removeData(e,this)
      });
      this.getData();
    }
};
app.init();