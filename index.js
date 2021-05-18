const app ={
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
                if(res.data.success===true){
                    console.log(res);
                    const token = res.data.token;
                    const expired = res.data.expired;
                    document.cookie = `v268018=${token}; expires=${new Date(expired)}; path=/`;//建立cookie
                    alert('登入成功');
                    window.location='backstage.html';
                }else{
                    alert('登入失敗，請檢查帳號密碼輸入錯誤');
                }  
            }).catch(err=>{
                console.log(err);
            })
    },
    init(){
        const loginBtn =document.querySelector('#loginBtn');
        loginBtn.addEventListener('click',this.login);
    }
}
app.init();