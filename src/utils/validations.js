const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email)=>{
    return emailRegex.test(email);
}

export const isValidUserName = (username)=>{
   
     if (username.length < 3 || username.length > 9) {
        return false;
    }

    if (!/^[a-zA-Z]/.test(username)) {
        return false;
    }
    
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return false;
    }
    
    return true;
}

export const isValidPassword = (password)=>{
    
}