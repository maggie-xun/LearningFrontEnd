
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

export default [
    {
        url:'/vue-code/user/login',
        type:'post',
        response:config=>{
            const {username}=config.body;
            const token=tokens[username]

                  // mock error
            if (!token) {
                return {
                code: 60204,
                message: 'Account and password are incorrect.'
                }
            }

            return{
                code:20000,
                data:token
            }
        }
    }
]