export const Login = () =>{
    return(<div className="from_wrapper">
    <div className="header">
       login
    </div>
    <div className="input_wrapper">
        <div className="broder_wrapper">
            <input type="text" name="username" placeholder="username" className="broder_item" />
        </div>
        <div className="broder_wrapper">
            <input type="password" name="password" placeholder="password" className="broder_item" />
        </div>
    </div> 
    <div className="active">
        <div className="btn">Entrar</div>
    </div>
</div>);
}