function exibeSenha()
{
  var passwordInput = document.getElementById('senha');
  var passStatus = document.getElementById('status-senha');
 
  if (passwordInput.type == 'password'){
    passwordInput.type='text';
    passStatus.className='fa fa-eye-slash';
    
  }
  else{
    passwordInput.type='password';
    passStatus.className='fa fa-eye';
  }
}