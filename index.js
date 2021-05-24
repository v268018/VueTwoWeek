const app = {
    //定義資料
    data() {
      return {
       
      }
    },
    //方法
    methods:{
        login(){//登入
            const url ='https://vue3-course-api.hexschool.io';
            const path ='v268018';
            const username =document.querySelector('#username').value;
            const password =document.querySelector('#password').value;
            const user = {
                username,
                password
            }
            axios.post(`${url}/admin/signin`,user)
            .then(res=>{
                if(res.data.success){
                    const {token,expired} =res.data;
                    document.cookie = `v268018=${token}; expires=${new Date(expired)}; path=/`;//建立cookie
                    alert('登入成功');
                    window.location='backstage.html';//轉跳頁面
                }else{
                    alert('登入失敗，請檢查帳號密碼輸入錯誤');
                }  
            }).catch(err=>{
                console.log(err);
            })
        },
    },
    //初始化(生命週期)
    created(){
        console.log(1);
    }
}
Vue.createApp(app).mount('#app')
