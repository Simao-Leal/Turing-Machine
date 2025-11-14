

function A(t,s,c){
    if(s<4) return true;
    else return false;
}

function B(t,s,c){
    if(c%2==0) return true;
    else return false;
}

function C(t,s,c){
    if(t!=4 && s!=4 && c!=4) return true;
    else return false;
}

function D(t,s,c){
    if(s>c) return true;
    else return false;
}

function E(t,s,c){
    if(t%2+s%2+c%2<=1) return true;
    else return false;
}