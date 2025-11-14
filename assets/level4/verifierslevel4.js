

function A(t,s,c){
    if(t%2==0) return true;
    else return false;
}

function B(t,s,c){
    if(s>t) return true;
    else return false;
}

function C(t,s,c){
    if(t%2+s%2+c%2>1) return true;
    else return false;
}

function D(t,s,c){
    if(t+s<6) return true;
    else return false;
}

function E(t,s,c){
    if(t==s && c!=s) return true;
    else if(t==c && c!=s) return true;
    else if(s==c && t!=s) return true;
    else return false;
}
