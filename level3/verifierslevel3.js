

function A(t,s,c){
    if(t>c) return true;
    else return false;
}

function B(t,s,c){
    if(s<c && s<t) return true;
    else return false;
}

function C(t,s,c){
    if((t+s+c)%2==1) return true;
    else return false;
}

function D(t,s,c){
    if(t+s<6) return true;
    else return false;
}

